# SecureOps — פרומפטים לייצור נכסי מותג

מסמך זה מרכז את הפרומפטים לייצור לוגו חדש וסט אייקונים לשירותים.
כל הפרומפטים באנגלית (מנועי הייצור עובדים טוב יותר באנגלית) ומכוונים
לפלטת המותג הקיימת של האתר.

---

## פלטת המותג (Style Anchor)

הדביקו את הבלוק הזה בתחילת/סוף כל פרומפט כדי לשמור אחידות:

```
Brand palette: primary violet #6C5CA8, deep violet #4E4483, cyan accent #79D7ED,
bright blue #4FACFE, ink navy #1E2438, off-white #F7F8FC.
Geometry: soft rounded corners, generous radii, no sharp edges.
Mood: calm, premium, trustworthy enterprise tech — not neon, not "hacker green".
```

---

## 1. לוגו ראשי — Wordmark + סמל

**מנוע מומלץ:** Midjourney v6 / Nano Banana / Ideogram (הכי טוב לטיפוגרפיה)

```
Modern minimal logo for "SecureOps", a premium managed-IT, cloud and
cybersecurity company. Horizontal lockup: a geometric mark on the right of a
clean rounded sans-serif wordmark "SecureOps", with a small tagline
"make IT easy" beneath in lighter weight.

The mark: an abstract shield formed from two interlocking rounded ribbons —
one violet, one cyan — that also read as an infinity loop and as a cloud
silhouette. Continuous single-stroke feel, thick rounded terminals, perfectly
balanced negative space. No literal padlock, no keyhole, no circuit-board
cliché, no binary digits.

Typography: geometric rounded sans (Rubik / Poppins character), tight tracking,
"Secure" in ink navy #1E2438 and "Ops" in violet #6C5CA8.

Gradient on the mark from #6C5CA8 to #79D7ED at 135 degrees.
Flat vector, crisp edges, pure white background, generous padding,
centered, no mockup, no 3D, no shadow, no text other than specified.

--style raw --ar 16:9 --v 6
```

### 1b. גרסת סמל בלבד (favicon / אפליקציה)

```
App icon version of the SecureOps mark only, no text: the interlocking violet
and cyan ribbon shield, centered inside a squircle with a subtle vertical
gradient background from #F7F8FC to #EDEFF7. Flat vector, extremely legible at
32px, thick strokes, high contrast, no gradients thinner than 4px.
Square 1:1, transparent-ready, no background clutter.
```

### 1c. גרסת מונוכרום (חשבוניות, נייר מכתבים, רקע כהה)

```
Single-color version of the SecureOps logo lockup in pure white on a solid
#1E2438 background. Same geometry as the primary mark, all gradients flattened
to one solid tone, stroke weights slightly increased for legibility.
Flat vector, no effects.
```

**טיפ:** אחרי שבוחרים כיוון — מריצים `Vectorizer.ai` או `Illustrator Image Trace`
כדי לקבל SVG נקי, ואז מתקנים את הטיפוגרפיה ידנית עם הפונט האמיתי (Rubik).

---

## 2. סט אייקונים לשירותים (6 יחידות)

הסקשן "כל מה שהעסק שלכם צריך במקום אחד". כרגע האתר משתמש באייקוני קו
(lucide) בתוך אריח גרדיאנט — נקי ומהיר. הפרומפטים למטה נועדו להחליף אותם
באייקונים תלת-ממדיים מותאמי מותג.

### מפרט סגנון אחיד — הדביקו בסוף כל אחד מששת הפרומפטים

```
STYLE SPEC (identical across the whole set):
Soft 3D isometric icon, matte clay-like material with a glossy glass element,
rounded edges everywhere, floating on transparent background.
Color: violet #6C5CA8 base, deep violet #4E4483 shadows, cyan #79D7ED and
#4FACFE highlights. No other hues.
Lighting: soft studio light from top-left, gentle ambient occlusion,
subtle contact shadow directly beneath the object.
Camera: 35-degree isometric, object fills 80% of frame, centered.
Square 1:1, transparent PNG, no background, no text, no people, no logos.
Consistent scale and lighting with the rest of the set.
```

---

### 2.1 שירותי ענן לעסקים

```
A rounded 3D cloud made of soft matte violet clay, with two translucent cyan
glass layers stacked beneath it like floating server planes, and three tiny
glowing cyan data dots rising into the cloud.
+ STYLE SPEC
```

### 2.2 שירותי IT לעסקים (Helpdesk)

```
A soft 3D headset with rounded ear cups in matte violet, floating beside a
small translucent cyan chat bubble containing a single glowing dot.
Friendly, approachable, no face, no person.
+ STYLE SPEC
```

### 2.3 שירותי אבטחת מידע (סייבר)

```
A rounded 3D shield in matte violet with a glossy cyan glass core, and a soft
concentric ripple of light expanding outward from it like an active scan pulse.
No padlock, no keyhole, no skull.
+ STYLE SPEC
```

### 2.4 חומות אש ותקשורת

```
Three rounded 3D network nodes in matte violet connected by smooth glowing cyan
tubes, with a translucent glass wall panel standing between them filtering the
connections. Clean, geometric, no flames.
+ STYLE SPEC
```

### 2.5 גיבוי ושחזור (DRP)

```
A stack of three rounded 3D database cylinders in matte violet, with a smooth
circular cyan arrow orbiting them, and one cylinder rendered in translucent
cyan glass to suggest a restored copy.
+ STYLE SPEC
```

### 2.6 תחזוקת שרתים ותשתיות

```
A rounded 3D server rack in matte violet with soft chamfered edges, three cyan
status lights glowing on its front panel, and a thin translucent glass shelf
floating beside it.
+ STYLE SPEC
```

---

## 3. איך משלבים באתר — ✅ בוצע

הנכסים כבר יוצרו, נוקו מהרקע ושולבו באתר (24/07/2026):

| קובץ | איפה בשימוש |
|---|---|
| `secureops_logo_primary.png` | הדר + תפריט מובייל |
| `secureops_logo_white.png` | פוטר |
| `secureops_logo_icon.png` | favicon + apple-touch-icon |
| `icons/svc-*.png` | 6 כרטיסי השירותים + מודאל |
| `hero_3d_bg.jpg` | רקע ההירו + תמונת OG |
| `about_office.jpg` | באנר סקשן ה-SOC |
| `purple_laptop.jpg` | באנר ה-CTA הסגול |

הקבצים הישנים שהוחלפו גובו ב-`public/images/_originals/`.

### להוספת אייקון חדש בעתיד

1. שמרו את הקבצים כ-PNG שקוף בגודל 512×512 תחת `public/images/icons/`
   בשמות: `svc-cloud.png`, `svc-support.png`, `svc-cyber.png`,
   `svc-firewall.png`, `svc-backup.png`, `svc-infra.png`.
2. ב-`src/App.jsx`, במערך `servicesData`, הוסיפו לכל שירות שדה
   `iconImg: '/images/icons/svc-cloud.png'`.
3. ב-`src/App.jsx` בכרטיס השירות, החליפו את
   `<div className="service-icon-tile"><svc.icon /></div>`
   ב-`<img src={svc.iconImg} className="service-icon-3d" />`.
4. ב-`src/index.css` הוסיפו:
   ```css
   .service-icon-3d { width: 84px; height: 84px; object-fit: contain; margin-bottom: 16px; }
   ```

עד שהאייקונים מוכנים — אייקוני ה-lucide בתוך אריח הגרדיאנט נשארים כברירת מחדל
ונראים נקי לחלוטין.

---

## 4. תמונות נוספות ששווה לחדש

| קובץ קיים | פרומפט מוצע |
|---|---|
| `hero_3d_bg.jpg` | `Abstract 3D composition of floating glossy violet and cyan torus rings and soft glass panels on an off-white #F7F8FC studio background, soft shadows, lots of empty space in the center for text, wide 21:9, premium tech aesthetic.` |
| `about_office.jpg` | `Modern security operations center at night, wall of monitors glowing soft blue and violet, two analysts seen from behind, shallow depth of field, cinematic, cool color grade, no visible faces, no readable text on screens.` |
| `purple_laptop.jpg` | `Floating laptop displaying a clean IT monitoring dashboard with violet and cyan charts, isometric angle, soft studio lighting, deep violet #4E4483 gradient background, rounded UI, no readable text.` |

---

## 5. לוגואים של השותפים הטכנולוגיים — ✅ בוצע חלקית

**אין פרומפט שיוצר את הלוגו של Microsoft או Fortinet כמו שצריך.** מודל תמונה
מצייר סימני מסחר מהזיכרון ומוציא אותיות וצורות שגויות. במקום זה השתמשנו
בקבצי ה-SVG הרשמיים, צבועים בסגול של המותג (#6C5CA8).

### 5.1 מה כבר מוטמע

הותקנה החבילה `simple-icons` (devDependency) והסמלים יוצאו ל-`public/images/partners/`:

| ספק | קובץ |
|---|---|
| Fortinet | `fortinet.svg` |
| Palo Alto Networks | `palo-alto-networks.svg` |
| VMware | `vmware.svg` |
| Veeam | `veeam.svg` |
| Cisco (משמש גם ל-Cisco Meraki) | `cisco.svg` |
| Google (משמש ל-Google Workspace) | `google.svg` |
| Microsoft (משמש ל-Microsoft 365 ול-Intune) | `microsoft-365.svg` |
| Microsoft Azure | `microsoft-azure.svg` |
| Amazon AWS | `amazon-aws.svg` |

שלושת האחרונים הגיעו מהחבילה `@iconify-json/logos` והומרו למונוכרום סגול
(כל ה-`fill` הוסרו והוחלפו בצבע אחד).

ה-viewBox של כל קובץ נחתך בדיוק לגבולות הציור, כך שכולם נראים באותו גודל אופטי
ברצועה. הגודל נשלט ב-`.tech-chip-logo`.

### 5.2 מה חסר — צריך הורדה ידנית

נשארו **שניים בלבד** בלי סמל — הם לא קיימים באף ספרייה חופשית.
הצ'יפים שלהם מוצגים בשם בלבד (נראה נקי, לא שבור):

`Acronis` · `CrowdStrike`

להשלמה: הורידו את הקובץ הרשמי מה-Brand/Press page של כל ספק
(חפשו `<שם החברה> brand assets`), שמרו ב-`public/images/partners/`
ועדכנו ב-`src/App.jsx` במערך `techStack`:

```js
{ name: 'Amazon AWS', logo: '/images/partners/aws.svg' },
```

לצביעה בסגול אחיד — אם הקובץ הוא SVG חד-צבעי, החליפו את ה-`fill` ל-`#6C5CA8`.

### 5.3 להוסיף ספק חדש שכן קיים בספרייה

```bash
node -e "
const si=require('simple-icons'), fs=require('fs');
const i=Object.values(si).find(x=>x.slug==='cloudflare');
fs.writeFileSync('public/images/partners/cloudflare.svg',
  '<svg role=\"img\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"#6C5CA8\"><path d=\"'+i.path+'\"/></svg>');
"
```

---

## 6. אייקוני "למה SecureOps" (4 יחידות) — ✅ בוצע

אותו סגנון בדיוק כמו אייקוני השירותים, אבל קומפקטיים יותר — הם מוצגים ב-68px
אז אסור פרטים דקים. הקוד כבר מוכן: ב-`src/App.jsx` במערך `whyUs` יש לכל כרטיס
שדה `img: null` עם הנתיב המיועד בהערה. מחליפים ל-נתיב והאייקון התלת-ממדי תופס
את מקום אייקון ה-lucide.

### מפרט סגנון — הדביקו בסוף כל אחד מארבעת הפרומפטים

```
STYLE SPEC (identical across the set, matches the existing service icons):
Soft 3D isometric icon, matte clay-like material with one glossy glass element,
rounded edges everywhere, floating on transparent background.
Color: violet #6C5CA8 base, deep violet #4E4483 shadows, cyan #79D7ED and
#4FACFE highlights. No other hues.
Lighting: soft studio light from top-left, gentle ambient occlusion.
No drop shadow on the ground, no contact shadow.
Camera: 35-degree isometric, object fills 85% of frame, centered.
Bold simple silhouette that stays readable at 68px — no thin lines, no small
text, no fine detail.
Square 1:1, transparent PNG, no background, no text, no numbers, no people
faces, no logos.
```

### 6.1 זמן תגובה של 15 דקות — `why-response.png`

```
A rounded 3D stopwatch in matte violet with a chunky rounded crown on top and a
glossy cyan glass face, with two thick rounded hands and a single sweeping cyan
motion arc curving around it to suggest speed. No numerals on the dial.
+ STYLE SPEC
```

### 6.2 צוות ייעודי לכל לקוח — `why-team.png`

```
Two abstract rounded 3D figures side by side — simple capsule bodies with
spherical heads, no faces, no limbs. The front figure in matte violet, the one
behind in translucent cyan glass, both standing on a small rounded violet
platform, slightly overlapping to read as a pair.
+ STYLE SPEC
```

### 6.3 מומחים מוסמכים — `why-certified.png`

```
A rounded 3D certification badge: a thick scalloped medallion in matte violet
with a glossy cyan glass centre holding a bold rounded check mark, and two short
rounded ribbon tails hanging beneath it. Chunky and simple, no text on the badge.
+ STYLE SPEC
```

### 6.4 שקיפות מלאה בעלויות — `why-transparency.png`

```
A rounded 3D price tag in matte violet with a chunky rounded hole and a short
cyan cord, rendered half in solid matte violet and half in fully translucent
cyan glass so the tag reads as literally see-through. No currency symbol, no
numbers.
+ STYLE SPEC
```

### 6.5 שילוב — הושלם

ארבעת האייקונים נוקו ומוצגים ב-84px:
`why-response.png` · `why-team.png` · `why-certified.png` · `why-transparency.png`

בנוסף לניקוי הרקע הרגיל נדרש שלב חדש — **de-checker**. מנוע התמונות צייר את
השחמט גם *מבעד* לזכוכית השקופה, ושם שני גווני השחמט הם ציאן רווי שנבדלים רק
בבהירות, כך שהפרדה לפי רוויה לא תופסת אותם. הפתרון: gaussian blur שממצע את שני
הגוונים לגוון אחיד אחד, ומוזג בחזרה רק היכן שההפרש המקומי קטן — כך כל הקצוות
וההבהקים האמיתיים נשארים חדים. הסקריפט: `dechecker.py`.

**לקח לפרומפטים הבאים:** לבקש `opaque translucent-looking material, never show a
transparency checkerboard through the glass` — חוסך את כל השלב הזה.

### 6.6 קבצי המקור

כל קבצי ה-JPEG המקוריים שהורדו נשמרו ב-`brand-assets/source-renders/`
(מחוץ ל-`public/`, כך שהם לא נכנסים ל-build).

---

## 7. אייקוני הסקשן הכהה (אודות) — אופציונלי

ארבעת הכרטיסים ברקע הכהה משתמשים גם הם באייקוני lucide. אם תרצו להחליף גם אותם,
אותו STYLE SPEC אבל עם שינוי אחד — **הם יושבים על רקע כהה `#171C2B`**, אז:

```
Replace the palette line in the STYLE SPEC with:
Color: cyan #79D7ED base with #4FACFE highlights and violet #6C5CA8 shadows.
The icon must stay legible on a very dark navy #171C2B background — keep the
overall value light, no dark violet silhouettes.
```

נושאים: חזון (ניצוץ/כוכב), מומחיות טכנולוגית (שבב מעבד), כיסוי MDR (עין עם
פעימת סריקה), פתרונות מותאמים (מפתח).
