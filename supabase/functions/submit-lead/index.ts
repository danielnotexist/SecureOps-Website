/**
 * submit-lead — receives a contact form submission, stores it, emails it.
 *
 * Runs server-side so RESEND_API_KEY and the service-role key never reach the
 * browser. The lead is written to the DB *before* the email is attempted: if
 * Resend is down or the domain isn't verified yet, the lead is still captured
 * and the visitor still gets a success response. A lost email is recoverable
 * from the table; a lost lead is not.
 */

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS'
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...CORS, 'Content-Type': 'application/json' } });

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS });
  if (req.method !== 'POST') return json({ error: 'method not allowed' }, 405);

  let body: Record<string, string>;
  try {
    body = await req.json();
  } catch {
    return json({ error: 'bad json' }, 400);
  }

  // Honeypot: a field hidden from humans. Bots fill everything in, so anything
  // here means automation -- answer 200 so the bot doesn't learn to retry.
  if (body.company_website) return json({ ok: true });

  const name = (body.name ?? '').trim();
  const phone = (body.phone ?? '').trim();
  const email = (body.email ?? '').trim();
  const companySize = (body.company_size ?? '').trim();
  const topic = (body.topic ?? '').trim();
  const message = (body.message ?? '').trim();
  const source = (body.source ?? 'unknown').trim();

  if (!name || !phone || !email) return json({ error: 'missing required fields' }, 400);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json({ error: 'invalid email' }, 400);
  if (name.length > 200 || email.length > 200 || message.length > 5000) {
    return json({ error: 'field too long' }, 400);
  }

  const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
  const SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
  const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
  const LEAD_TO = Deno.env.get('LEAD_NOTIFY_TO') ?? 'sales@secureops.co.il';
  const LEAD_FROM = Deno.env.get('LEAD_NOTIFY_FROM') ?? 'onboarding@resend.dev';

  let stored = false;
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/leads`, {
      method: 'POST',
      headers: {
        apikey: SERVICE_KEY,
        Authorization: `Bearer ${SERVICE_KEY}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal'
      },
      body: JSON.stringify({
        name, phone, email,
        company_size: companySize || null,
        topic: topic || null,
        message: message || null,
        source,
        user_agent: req.headers.get('user-agent')?.slice(0, 500) ?? null
      })
    });
    stored = res.ok;
    if (!res.ok) console.error('lead insert failed', res.status, await res.text());
  } catch (e) {
    console.error('lead insert threw', e);
  }

  let emailed = false;
  if (RESEND_API_KEY) {
    const rows: [string, string][] = [
      ['שם', name], ['טלפון', phone], ['דוא"ל', email],
      ['גודל החברה', companySize || '—'], ['נושא', topic || '—'],
      ['הודעה', message || '—'], ['מקור', source]
    ];
    const html = `<div dir="rtl" style="font-family:Arial,sans-serif;font-size:15px;color:#1E2438">
<h2 style="color:#6C5CA8;margin:0 0 16px">פנייה חדשה מהאתר</h2>
<table cellpadding="8" style="border-collapse:collapse;width:100%;max-width:560px">
${rows.map(([k, v], i) => `<tr style="background:${i % 2 ? '#F7F8FC' : '#fff'}">
<td style="font-weight:700;width:130px;vertical-align:top">${k}</td>
<td style="white-space:pre-wrap">${esc(v)}</td></tr>`).join('')}
</table>
${stored ? '' : '<p style="color:#B00">⚠️ שמירת הליד במסד הנתונים נכשלה — הפרטים במייל זה בלבד.</p>'}
</div>`;

    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: `SecureOps Website <${LEAD_FROM}>`,
          to: [LEAD_TO],
          // so hitting reply in the inbox answers the customer, not the robot
          reply_to: email,
          subject: `פנייה חדשה מהאתר — ${name}`,
          html
        })
      });
      emailed = res.ok;
      if (!res.ok) console.error('resend failed', res.status, await res.text());
    } catch (e) {
      console.error('resend threw', e);
    }
  }

  // Only a total failure is reported to the visitor -- if either path worked,
  // the lead reached us and they should see the success state.
  if (!stored && !emailed) return json({ error: 'delivery failed' }, 502);
  return json({ ok: true });
});
