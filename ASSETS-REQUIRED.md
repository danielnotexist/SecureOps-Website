# Assets Required — SecureOps Website (Redesign v4)

כל נכס גרפי שהעיצוב החדש מבקש ושעדיין לא קיים בפרויקט. לא נוצרו נכסים זמניים —
בכל מקום שבו חסר נכס, השתמשתי בנכס קיים של המותג כמציין מקום (placeholder) ותייגתי
אותו בקוד ב-`ASSET SLOT`.

**קונבנציות משותפות לכל הפרומפטים:**

- Brand violet `#6C5CA8` · deep violet `#473B78` · cyan `#79D7ED` · ink navy `#0F1528`
- רקע: לבן / כמעט-לבן (`#FBFBFE`) או שקוף — **אף פעם לא רקע כהה** (חוץ מפריט 5)
- סגנון: soft-3D render, matte-glossy hybrid, soft studio lighting, no harsh shadows
- ללא טקסט, ללא לוגואים של חברות, ללא דגלים, ללא אנשים מזוהים
- פורמט: PNG-24 עם שקיפות (או WebP), ואז לדחוס ל-**מקסימום 80KB לקובץ**

> ⚠️ **הערת ביצועים:** הנכסים הקיימים ב-`public/images/icons/` שוקלים 130–245KB כל אחד
> (סה"כ ~2.1MB). כשמחליפים אותם — לייצא ב-WebP ולדחוס. זה השיפור הכי גדול ל-Core Web Vitals באתר.

---

## 1. `hero-illustration` — האיור הראשי של ה-Hero

| | |
|---|---|
| **שם קובץ** | `public/images/hero-illustration.png` |
| **היכן מופיע** | עמודה שמאלית של ה-Hero, מעל הקפל. הנכס הכי חשוב באתר. |
| **מידות** | 1600 × 1400 px, רקע שקוף |
| **מה יש שם עכשיו** | קומפוזיציה זמנית: `hero_3d_bg.jpg` כרקע + `svc-cyber.png` במרכז + 3 צ'יפים ב-CSS. הקוד מסומן ב-`ASSET SLOT hero-illustration` ב-`src/App.jsx`. |
| **איך מחליפים** | להחליף את שני ה-`<img>` בתוך `.hero-stage` ב-`<img className="hero-stage-art">` יחיד, ולהעלות את `width` ב-CSS מ-46% ל-88%. |

**סגנון:** isometric soft-3D scene, clean SaaS marketing illustration, matte pastel
surfaces with glossy glass accents, floating elements with soft drop shadows.

**Prompt:**

```
Isometric 3D illustration of a modern managed IT and cloud security stack, floating
on a pure white background. Center: a large rounded cloud in matte violet (#6C5CA8)
with a glossy translucent cyan shield (#79D7ED) embedded in its face. Around it,
floating at slight angles: a sleek laptop showing an abstract dark monitoring
dashboard with faint line charts and a donut gauge, two stacked server racks in
frosted glass and violet, a small smartphone tile with a lock glyph, and three thin
translucent data-flow lines connecting them with tiny glowing cyan nodes. Soft studio
lighting from the upper left, gentle contact shadows, subtle depth of field on the
rear elements. Matte-glossy hybrid finish, no metal reflections, no text, no logos,
no people. Color palette strictly: violet #6C5CA8, deep violet #473B78, cyan #79D7ED,
white, light lavender grey. Premium enterprise SaaS aesthetic, clean and uncluttered,
generous negative space, 3D render, octane style, 8k, transparent background.
```

---

## 2. `service-icons` — סט 6 אייקוני שירות (רענון)

| | |
|---|---|
| **שמות קבצים** | `public/images/icons/svc-cloud.png`, `svc-support.png`, `svc-cyber.png`, `svc-firewall.png`, `svc-backup.png`, `svc-infra.png` |
| **היכן מופיע** | תוך "אריח" 68×68 בכרטיסי השירותים (סקשן `#services`) וגם בכותרת של מודאל השירות |
| **מידות** | 512 × 512 px, רקע שקוף, מוצג ב-44px |
| **מה יש שם עכשיו** | הסט הקיים — עובד ונראה טוב, אבל לא אחיד לגמרי בזווית ובגודל האופטי, וכל קובץ 200KB+ |

**סגנון:** אותה משפחה ויזואלית לכל השישה — אותה זווית, אותו מקור אור, אותו "משקל אופטי".

**Prompt (להריץ 6 פעמים, להחליף רק את המשפט המודגש):**

```
A single soft-3D icon centered on a transparent background, isometric 3/4 view at a
consistent 30-degree angle, lit from the upper left with one soft studio light.
Subject: **[SUBJECT]**. Matte violet (#6C5CA8) primary body with a translucent glossy
cyan (#79D7ED) secondary element, rounded organic edges, no hard corners, subtle
contact shadow beneath. Clean minimal shape language, high optical weight in the
center of the frame with even margins on all sides. No text, no background, no
gradient backdrop, no outlines. 3D render, product-icon style, 8k, transparent PNG.

[SUBJECT] per icon:
1. svc-cloud    — a rounded cloud floating above two stacked translucent data plates
2. svc-support  — a headset with a soft microphone boom and a small floating chat bubble
3. svc-cyber    — a rounded shield with a glowing keyhole and concentric radar rings behind it
4. svc-firewall — a brick-pattern wall panel with a translucent flame-shaped barrier in front
5. svc-backup   — a stack of three rounded database cylinders with a circular restore arrow
6. svc-infra    — a server rack tower with glowing status dots and a small orbiting gear
```

---

## 3. `why-us-icons` — סט 4 אייקוני "למה אנחנו" (רענון)

| | |
|---|---|
| **שמות קבצים** | `public/images/icons/why-response.png`, `why-team.png`, `why-certified.png`, `why-transparency.png` |
| **היכן מופיע** | סקשן `#why`, מוצגים ב-52×52 |
| **מידות** | 512 × 512 px, רקע שקוף |

**Prompt:** זהה לפרומפט של פריט 2, עם ה-subjects הבאים:

```
1. why-response     — a rounded stopwatch with a soft cyan lightning bolt across its face
2. why-team         — three overlapping rounded person silhouettes, the front one in cyan
3. why-certified    — a rounded certificate badge with a ribbon and a soft checkmark
4. why-transparency — a translucent glass price tag with a subtle upward bar chart inside
```

---

## 4. `dashboard-mockup` — מוקאפ פלטפורמת הניהול

| | |
|---|---|
| **שם קובץ** | `public/images/dashboard-mockup.png` |
| **היכן מופיע** | הבאנר הכהה (`.purple-cta-box`), בצד שמאל |
| **מידות** | 1600 × 1100 px, **רקע שקוף** |
| **מה יש שם עכשיו** | `purple_laptop.jpg` — נראה טוב, אבל יש לו רקע סגול צרוב שלא מתמזג עם הרקע הכהה החדש |

**Prompt:**

```
A modern laptop shown at a slight three-quarter angle, floating on a fully transparent
background with a soft contact shadow beneath it. The screen displays a dark-themed IT
operations dashboard: a left icon sidebar, a large area chart in violet and cyan
gradients, two donut gauges, a small bar chart, and a vertical list of status rows with
tiny green and amber indicator dots. All dashboard text is rendered as abstract
placeholder bars, never real words. Dark charcoal laptop body, screen glow in violet
#6C5CA8 and cyan #79D7ED, clean product-photography lighting, sharp focus, no desk,
no hands, no background, no logos. 3D product render, 8k, transparent PNG.
```

---

## 5. `soc-banner` — תמונת הבאנר בסקשן האודות הכהה

| | |
|---|---|
| **שם קובץ** | `public/images/soc-banner.jpg` |
| **היכן מופיע** | `.dark-soc-banner-card` בסקשן `#about` |
| **מידות** | 1920 × 800 px (crop ל-`object-fit: cover` בגובה 220–380px) |
| **מה יש שם עכשיו** | `about_office.jpg` |

זה **הנכס היחיד עם רקע כהה** — הוא יושב בתוך סקשן navy ומכוסה בגרדיאנט כהה מלמטה,
לכן החצי התחתון של התמונה חייב להיות שקט ונקי מפרטים.

**Prompt:**

```
Wide cinematic photograph of a modern security operations center at night, shot from
behind and above the workstations. Rows of curved monitors displaying abstract network
graphs, world maps and log streams, all glowing in violet and cyan. Deep navy ambient
lighting, subtle volumetric haze, clean minimal architecture with dark acoustic panels.
Silhouetted analysts seen only from behind, faces never visible, blurred into the
background. Bottom third of the frame intentionally dark, calm and uncluttered so an
overlay gradient can sit on it. Colour grade: navy #0E1424 base, violet #6C5CA8 and
cyan #79D7ED highlights only. No text, no readable UI, no logos, no brands.
Photorealistic, wide angle, shallow depth of field, 8k.
```

---

## 6. `team-headshots` — תמונות הצוות

| | |
|---|---|
| **שמות קבצים** | `public/images/team/daniel.jpg`, `public/images/team/dvir.jpg` |
| **היכן מופיע** | סקשן `#team`, מוצגות ב-88×88 עם `border-radius: 16px` |
| **מידות** | 800 × 800 px, ריבוע |
| **מה יש שם עכשיו** | ראשי תיבות בעברית על רקע גרדיאנט (`.team-avatar-initials`) — פתרון מכובד שיכול להישאר |

**הערה חשובה:** אלה אנשים אמיתיים — **אין לייצר להם פנים ב-AI**. או לצלם צילום פורטרט
אמיתי, או להשאיר את ראשי התיבות. כדי לחבר תמונות אמיתיות: להגדיר `photo: '/images/team/daniel.jpg'`
במערך `team` ב-`src/App.jsx` (השדה כבר קיים ומטופל בקוד).

אם בכל זאת רוצים כיוון לצלם — briefing לצלם:

```
Corporate headshot, chest-up, subject looking directly at camera with a relaxed
confident expression. Soft key light from 45 degrees, clean seamless light-grey or
white background (#FBFBFE), shallow depth of field. Business-casual dark shirt or
blazer, no strong patterns. Neutral colour grade, no heavy retouching. Square crop
with generous headroom so the 16px-rounded 88x88 thumbnail stays balanced.
```

---

## 7. `og-share-image` — תמונת שיתוף לרשתות

| | |
|---|---|
| **שם קובץ** | `public/images/og-share.jpg` |
| **היכן מופיע** | מטא-תג `og:image` ב-`index.html` (כרגע מצביע ל-`hero_3d_bg.jpg` שהוא רקע מופשט בלבד) |
| **מידות** | 1200 × 630 px בדיוק |

**Prompt:**

```
A clean 1200x630 social share banner on a near-white background (#FBFBFE) with a very
soft violet-to-cyan radial glow in the upper left corner. On the right side, empty
negative space reserved for a logo and a headline to be added later in design software.
On the left, a soft-3D isometric composition: a rounded violet cloud with a translucent
cyan shield, a small server rack and a laptop tile, connected by thin glowing data
lines. Matte-glossy render, soft studio lighting, gentle contact shadows. No text, no
logos, no people. Palette strictly violet #6C5CA8, deep violet #473B78, cyan #79D7ED,
white. Premium enterprise SaaS aesthetic, 8k.
```

---

## 8. לוגואי ספקים צבעוניים — **לא ל-AI**

| | |
|---|---|
| **היכן מופיע** | רצועת השותפים (`.tech-strip`) מתחת ל-Hero |
| **מה יש שם עכשיו** | 9 קבצי SVG מונוכרומטיים עם `fill="#6C5CA8"` קשיח, ועוד 2 ספקים ללא לוגו בכלל (Acronis, CrowdStrike) שמוצגים כנקודה + שם |

ביקשת לוגואים צבעוניים. **אסור לייצר לוגואים של חברות ב-AI** — זה סימן מסחרי רשום ותצא
עם גרסה מעוותת. צריך להוריד את הקובץ הרשמי מעמוד ה-Brand/Press של כל ספק:

| ספק | מקור רשמי |
|---|---|
| Microsoft 365 / Azure / Intune | Microsoft Brand Central |
| Amazon AWS | AWS Co-Marketing Toolkit |
| Fortinet | Fortinet Brand Assets |
| Palo Alto Networks | Palo Alto Newsroom → Media Kit |
| VMware / Dell | Dell Technologies Brand Portal |
| Veeam | Veeam Brand Guidelines |
| Acronis | Acronis Press Kit |
| CrowdStrike | CrowdStrike Press Resources |
| Cisco Meraki | Cisco Brand Center |
| Google Workspace | Google Partner Brand Guidelines |

**איך לחבר:** לשמור כ-SVG ב-`public/images/partners/`, ולעדכן את מערך `techStack`
ב-`src/App.jsx`. הרצועה כבר בנויה לגבהים אחידים (24px cap height) והלוגואים יישבו נכון
אוטומטית. אחרי ההחלפה כדאי להוריד ב-CSS את `opacity: 0.72` מ-`.tech-chip` כדי שהצבעים
יבלטו במלואם.

> שימו לב: לרוב הספקים יש תנאי שימוש שמתירים הצגת הלוגו רק לשותפים מורשים. ודאו שיש לכם
> הרשאה לכל מותג שמוצג ברצועה.

---

## סיכום סדר עדיפויות

| # | נכס | דחיפות | למה |
|---|---|---|---|
| 1 | `hero-illustration` | 🔴 קריטי | הדבר הראשון שרואים; היום זו קומפוזיציה זמנית |
| 4 | `dashboard-mockup` | 🟠 גבוה | הרקע הסגול הצרוב לא מתמזג עם הבאנר הכהה החדש |
| 2 | `service-icons` | 🟡 בינוני | עובד היום; ההחלפה בעיקר לאחידות ולמשקל הקבצים |
| 8 | לוגואי ספקים | 🟡 בינוני | ביקשת צבעוניים — דורש הורדה ידנית, לא AI |
| 3 | `why-us-icons` | 🟢 נמוך | עובד היום |
| 5 | `soc-banner` | 🟢 נמוך | הקיים סביר |
| 7 | `og-share-image` | 🟢 נמוך | משפיע רק על תצוגת שיתוף בוואטסאפ/פייסבוק |
| 6 | `team-headshots` | 🟢 נמוך | ראשי התיבות נראים טוב; דורש צילום אמיתי |
