import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2,
  X,
  Mail,
  Phone,
  ChevronDown,
  Cloud,
  ShieldCheck,
  Server,
  Clock,
  Award,
  Users,
  Lock,
  Eye,
  ArrowLeft,
  Star,
  MessageCircle,
  ArrowUp,
  Sparkles,
  Activity,
  Cpu,
  Linkedin,
  Facebook,
  Send,
  Rocket,
  Monitor,
  KeyRound,
  Menu,
  RefreshCw,
  Gauge,
  Layers,
  Plus
} from 'lucide-react';

/* ------------------------------------------------------------------ *
 *  Data
 * ------------------------------------------------------------------ */

// Icons are reused from the previous 6-category catalog by closest visual
// fit — the new 8-service lineup doesn't have dedicated artwork yet for
// disaster-recovery / email-security / EDR / DLP, so each borrows the icon
// of its nearest sibling until real ones land. See ASSETS-REQUIRED.md.
const servicesData = [
  {
    id: 'backup',
    title: 'גיבוי שרתים',
    img: '/images/icons/svc-backup.png',
    tags: ['Veeam', 'Acronis', 'Immutable', '3-2-1'],
    subtitle: 'כדי שלא תגלו מאוחר מדי שהגיבוי האחרון שעבד היה לפני חודשיים.',
    fullDesc: 'גיבוי שלא נבדק הוא לא גיבוי — הוא הימור. אנחנו מקימים מערך גיבוי אוטומטי ומוצפן לכל השרתים והנתונים הקריטיים, עם עותקים חסינים מכופרות ובדיקות שחזור תקופתיות שמוכיחות שזה באמת עובד, לא רק שזה "אמור" לעבוד.',
    features: [
      'גיבוי ענן אוטומטי ומוצפן (Veeam / Acronis)',
      'עותקי גיבוי חסינים (Immutable) מפני כופרות',
      'מדיניות 3-2-1 עם עותק מחוץ לאתר',
      'בדיקות שחזור תקופתיות בפועל, לא רק בתאוריה',
      'שחזור ממוקד של קבצים, תיבות דואר ושרתים בודדים'
    ]
  },
  {
    id: 'disaster-recovery',
    title: 'התאוששות מאסון',
    img: '/images/icons/svc-infra.png',
    tags: ['DRP', 'RTO / RPO', 'Failover', 'תרגול'],
    subtitle: 'כשהשרת נופל, העסק לא אמור ליפול איתו.',
    fullDesc: 'תוכנית התאוששות מאסון היא לא מסמך שיושב במגירה — היא נוהל כתוב ומתורגל, עם יעדי זמן שחזור (RTO) ואובדן נתונים (RPO) מוגדרים מראש, כך שכשקורה האסון כולם כבר יודעים בדיוק מה לעשות.',
    features: [
      'תוכנית שחזור מאסון (DRP) כתובה ומתורגלת בפועל',
      'יעדי RTO / RPO מוגדרים לפי קריטיות המערכת',
      'סביבת Failover חלופית לעבודה בזמן תקלה',
      'תרגולי שחזור תקופתיים עם דוח ממצאים',
      'עדיפויות שחזור ברורות — מה עולה ראשון'
    ]
  },
  {
    id: 'email-security',
    title: 'אבטחת מיילים',
    img: '/images/icons/svc-cyber.png',
    tags: ['Anti-Phishing', 'Mail Relay', 'DMARC', 'Spam'],
    subtitle: 'כדי שלא תלמדו על פישינג רק אחרי שמישהו לחץ.',
    fullDesc: 'תיבת המייל היא נקודת הכניסה הכי נפוצה לתקיפה. אנחנו בונים שכבת הגנה שמסננת פישינג, ספאם וקבצים זדוניים לפני שהם מגיעים למשתמש, יחד עם מדיניות אימות (SPF/DKIM/DMARC) שמונעת התחזות לדומיין שלכם.',
    features: [
      'סינון פישינג, ספאם וקבצים זדוניים בזמן אמת',
      'הגדרת SPF / DKIM / DMARC למניעת התחזות לדומיין',
      'Mail Relay מאובטח לשרתים ומערכות פנימיות',
      'ארכוב מיילים וזמינות גם בזמן תקלה אצל הספק',
      'סימולציות פישינג והדרכת עובדים'
    ]
  },
  {
    id: 'edr',
    title: 'הגנת נקודות קצה',
    img: '/images/icons/svc-support.png',
    tags: ['EDR', 'Endpoint', 'Ransomware', 'Isolation'],
    subtitle: 'מחשבים, שרתים ותחנות קצה. כי האיום לא תמיד נכנס דרך הדלת הראשית.',
    fullDesc: 'לא כל תקיפה מתחילה בחומת האש. הגנת נקודות קצה (EDR) עוקבת אחרי כל מחשב, שרת ותחנת עבודה בארגון, מזהה התנהגות חריגה ועוצרת אותה — כולל בידוד אוטומטי של מכשיר נגוע לפני שהוא מדביק את כל הרשת.',
    features: [
      'ניטור והגנה על כל תחנות הקצה והשרתים',
      'זיהוי התנהגות חריגה, לא רק חתימות ידועות',
      'בידוד אוטומטי (Isolation) של מכשיר נגוע',
      'הגנה ייעודית מפני כופרות (Ransomware)',
      'דוחות אירועים וניתוח שורש הבעיה'
    ]
  },
  {
    id: 'mdr',
    title: 'ניטור ותגובה מנוהלים',
    img: '/images/icons/svc-cyber.png',
    tags: ['MDR 24/7', 'SOC', 'Response', 'Escalation'],
    subtitle: 'שמישהו יראה את ההתראה בזמן, במקום לגלות אותה בדיעבד.',
    fullDesc: 'התראת אבטחה שאף אחד לא רואה שווה כמו שלא הייתה. שירות ה-MDR שלנו מבטיח שצוות אנושי מנטר את הסביבה 24/7, מגיב לאירועים בזמן אמת ומסלים אליכם רק כשבאמת צריך — לא כל צפצוף שווא.',
    features: [
      'ניטור ותגובה 24/7/365 בשיתוף שותפי אבטחה מובילים',
      'צוות SOC אנושי, לא רק מערכת שמצפצפת',
      'הגדרת חוקי זיהוי מותאמים לסביבה שלכם',
      'תגובה לאירוע לפי נוהל כתוב ומתורגל',
      'נקודת אחריות אחת מולכם עד לסגירת האירוע'
    ]
  },
  {
    id: 'dlp',
    title: 'מניעת דליפת מידע',
    img: '/images/icons/svc-firewall.png',
    tags: ['DLP', 'חסימה', 'מדיניות', 'רגולציה'],
    subtitle: 'כדי שמידע רגיש לא ייצא החוצה בטעות, בנוחות של קובץ מצורף.',
    fullDesc: 'רוב דליפות המידע לא קורות בפריצה דרמטית — הן קורות כשמישהו מצרף בטעות קובץ לא נכון למייל החוצה. אנחנו מגדירים מדיניות שמזהה וחוסמת מידע רגיש (כרטיסי אשראי, ת"ז, מסמכים מסווגים) לפני שהוא יוצא מהארגון.',
    features: [
      'זיהוי אוטומטי של מידע רגיש (כרטיסי אשראי, ת"ז ועוד)',
      'חסימת שליחה במייל, בענן ובאחסון נייד',
      'מדיניות מותאמת לפי סוג מידע ורגישות',
      'דוחות חריגים ומעקב אחר ניסיונות דליפה',
      'התאמה לדרישות רגולציה ותקינה'
    ]
  },
  {
    id: 'rmm',
    title: 'ניהול וניטור מרחוק',
    img: '/images/icons/svc-infra.png',
    tags: ['RMM', 'ניטור', 'אוטומציה', 'תחזוקה'],
    subtitle: "לתפוס תקלות לפני שהן הופכות ל'יש פה מישהו שיכול לעזור עכשיו?'.",
    fullDesc: 'אנחנו מנטרים את כל השרתים, התחנות והרשת בזמן אמת, ומקבלים התראה על עומס, שטח דיסק שאוזל או שירות שנפל — לפני שהעובדים בכלל שמים לב שמשהו לא בסדר.',
    features: [
      'ניטור רציף של שרתים, תחנות ורשת',
      'התראות אוטומטיות על עומס, דיסק ותקינות שירותים',
      'תחזוקה מונעת ועדכוני אבטחה מתוזמנים',
      'טיפול מרחוק ברוב התקלות, בלי לחכות לטכנאי באתר',
      'דוחות תקינות חודשיים שקופים'
    ]
  },
  {
    id: 'cloud-security',
    title: 'אבטחת ענן',
    img: '/images/icons/svc-cloud.png',
    tags: ['AWS', 'Azure', 'IAM', 'Misconfig'],
    subtitle: 'גם בענן אפשר לעשות בלגן. אנחנו שם כדי שזה לא יקרה.',
    fullDesc: 'ענן לא מאובטח את עצמו. הרשאות רחבות מדי, אחסון שנשאר פתוח בטעות לעולם, או תצורה שגויה אחת — וכל היתרון של הענן הופך לסיכון. אנחנו בונים ובודקים את התצורה, ההרשאות וההגנה של הסביבה שלכם ב-AWS וב-Azure.',
    features: [
      'ביקורת הרשאות וזיהוי (IAM) לפי עקרון הרשאה מינימלית',
      'זיהוי תצורות שגויות (Misconfiguration) וסגירתן',
      'הגנה על אחסון ענן (Buckets / Storage) מחשיפה',
      'ניטור פעילות חריגה בסביבת הענן',
      'התאמה לדרישות רגולציה ותקנים (ISO 27001, SOC 2)'
    ]
  }
];

// Looked up by id rather than array position — the mega-menu below links to
// specific services, and an id lookup can't silently point at the wrong
// service if the catalog above gets reordered.
const svcById = (id) => servicesData.find((s) => s.id === id);

// Official full-colour vendor wordmarks in public/images/partners/, sourced
// from each vendor's own artwork (Wikimedia Commons mirrors of the official
// files) — no AI-generated or hand-drawn stand-ins.
//
// `h` is the display height in px. The marks range from 1.7:1 (AWS, stacked
// "aws" + smile) to 8.7:1 (Fortinet, one thin line), so a single shared cap
// height would make AWS tiny and Fortinet enormous. Each height is tuned so
// all eleven read at the same optical weight instead of the same measured
// height.
//
// Filenames carry a "-v2" (etc.) suffix on any mark whose *content* changed
// after it first went live: firebase.json caches every image for a year with
// `immutable`, so overwriting a same-named file in place leaves visitors who
// already cached the old bytes stuck with them for up to a year. Bump the
// suffix (don't just overwrite) whenever swapping one of these images again.
const techStack = [
  { name: 'Microsoft 365',              logo: '/images/partners/microsoft-365-v2.svg', h: 26 },
  { name: 'Veeam',                      logo: '/images/partners/veeam-v2.svg',         h: 24 },
  { name: 'VMware',                     logo: '/images/partners/vmware-v2.png',        h: 30 },
  { name: 'Fortinet',                   logo: '/images/partners/fortinet-v2.svg',      h: 20 },
  { name: 'Acronis',                    logo: '/images/partners/acronis-v2.png',       h: 24 },
  { name: 'Cisco',                      logo: '/images/partners/cisco-v2.svg',         h: 32 },
  { name: 'Hewlett Packard Enterprise', logo: '/images/partners/hpe.svg',              h: 34 },
  { name: 'Google Cloud',               logo: '/images/partners/gcp.svg',              h: 26 },
  { name: 'AWS',                        logo: '/images/partners/aws.svg',              h: 36 },
  { name: 'SentinelOne',                logo: '/images/partners/sentinelone.svg',      h: 24 },
  { name: 'Microsoft Azure',            logo: '/images/partners/azure.svg',            h: 28 }
];

// `img` takes over from `icon` the moment a 3D render is dropped into
// public/images/icons/ — same pattern as the service cards.
const whyUs = [
  {
    icon: Users,
    img: '/images/icons/why-team.png',
    title: 'אנשי שטח',
    text: 'אנחנו מכירים שרתים, הרשאות, גיבויים ומשתמשים לחוצים. לא רק סליידים.'
  },
  {
    icon: Cpu,
    title: 'כלים אמיתיים',
    text: 'הטכנולוגיות שאנחנו עובדים איתן כל יום, לא רק שם על הדף. Microsoft 365, גיבויים, שרתים, הרשאות, ענן וניטור — בלי מצגות של 40 שקפים על "טרנספורמציה".'
  },
  {
    icon: MessageCircle,
    title: 'ליווי אמיתי',
    text: 'יש עם מי לדבר גם אחרי ההטמעה, לא רק עד החתימה.'
  },
  {
    icon: Clock,
    img: '/images/icons/why-response.png',
    title: 'SLA של 2 שעות',
    text: 'כשמשהו קורס, אתם לא אמורים לחכות לנצח שיחזרו אליכם.'
  },
  {
    icon: Gauge,
    title: 'פוקוס ברור',
    text: 'סייבר, גיבוי וניטור. זה מה שאנחנו עושים, וזה בכוונה.'
  },
  {
    icon: Layers,
    title: 'בלי שכבות מיותרות',
    text: 'פתרונות ברמה גבוהה, בלי להפוך כל עסק לתאגיד עם תקציב של בנק.'
  }
];

const processSteps = [
  {
    n: '01', img: '/images/icons/proc-audit.png',
    title: 'מדברים ישר',
    text: 'שיחה קצרה כדי להבין מה עובד, מה לא, ואיפה הכאב האמיתי. בלי סיבוב מכירה מיותר.',
    bullets: ['מה יש היום', 'מה מפיל לכם זמן', 'מה הכי דחוף']
  },
  {
    n: '02', img: '/images/icons/proc-plan.png',
    title: 'בודקים לעומק',
    text: 'עוברים על שרתים, גיבויים, מיילים, תחנות והרשאות. לא מנחשים, בודקים.',
    bullets: ['פערי אבטחה', 'ממצאים ברורים', 'עדיפויות לטיפול']
  },
  {
    n: '03', img: '/images/icons/proc-launch.png',
    title: 'מטמיעים מסודר',
    text: 'מגדירים את הפתרון, בודקים שהוא עובד, ומוודאים שהצוות שלכם לא נשאר עם סימני שאלה.',
    bullets: ['הגדרות והטמעה', 'בדיקות שחזור ותגובה', 'הדרכה קצרה ויעילה']
  },
  {
    n: '04', img: '/images/icons/proc-manage.png',
    title: 'נשארים על זה',
    text: 'מנטרים, מעדכנים, מגיבים כשצריך, ולא נותנים לדברים להירקב בשקט. גם אחרי ההטמעה יש מי שבודק שהמערכת נשארת חדה.',
    bullets: ['ניטור שוטף', 'תחזוקה ועדכונים', 'תגובה כשצריך']
  }
];

// ASSET SLOT `team-photos`: photo: null renders an initials avatar until
// the real headshots the client is sending over land — see ASSETS-REQUIRED.md.
const team = [
  {
    name: 'דניאל כהן',
    role: 'שותף מייסד',
    initials: 'דכ',
    photo: null,
    bio1: 'האחריות שלי היא להנגיש את עולם הענן והאבטחה בקלות ובבהירות לכל ארגון, ללא קשר לגודלו. אני מאמין שכל עסק — קטן כגדול — זכאי לאותה רמת שירות, ולכן אני עובד באופן קפדני כדי להבטיח לכם את השירות המקצועי, המתקדם והאדיב ביותר בתחום.',
    bio2: 'אני מכיר היטב כל אחד מהלקוחות שלנו, מעורב באופן אישי בכל תהליך, ושואף תמיד לבחירת הפתרון המדויק והטוב ביותר עבור כל לקוח ולקוח.'
  },
  {
    name: 'דביר דבוש',
    role: 'שותף מייסד',
    initials: 'דד',
    photo: null,
    bio1: 'אחראי על כל מערך הטכנולוגיה והתשתיות אצל SecureOps — מוצרי ענן, אבטחת מידע ורמת הגבהה גבוהה. אני מיישם את הטכנולוגיות המובילות בשוק, ומנהל אותן מקצה לקצה עבור הלקוח.',
    bio2: 'מרדף אחר הטכנולוגיות החדשות ביותר מייצר בי התלהבות אמיתית. הכל מתחיל ונגמר בבחירת הפתרון המדויק ביותר לכל לקוח, מה שהופך את התפקיד שלי למעניין ומאתגר במיוחד.'
  }
];

const testimonials = [
  {
    quote: 'עברנו ל-SecureOps אחרי שנתיים של תקלות יומיומיות. תוך חודש הכל התייצב, והצוות מגיב מהר יותר ממה שהבטיחו בחוזה.',
    name: 'רונית אבידן',
    role: 'מנהלת תפעול, חברת לוגיסטיקה',
    initials: 'רא'
  },
  {
    quote: 'המיגרציה ל-Azure בוצעה בסוף שבוע אחד בלי יום השבתה. חשבון הענן ירד ב-34% אחרי אופטימיזציה שהם עשו.',
    name: 'עידו שרעבי',
    role: 'סמנכ"ל טכנולוגיות, חברת SaaS',
    initials: 'עש'
  },
  {
    quote: 'ניסיון כופר אמיתי נחסם ב-2 בלילה. קיבלנו טלפון מצוות ה-MDR לפני שבכלל ידענו שמשהו קרה. זה מה שקנינו.',
    name: 'מיכל ברקוביץ',
    role: 'מנכ"לית, משרד רואי חשבון',
    initials: 'מב'
  }
];

const faqs = [
  {
    q: 'מה ההבדל בין גיבוי רגיל ל-Disaster Recovery?',
    a: 'גיבוי הוא עותק של הנתונים שלכם, נשמר בצד ומוצפן. Disaster Recovery זה הרבה יותר מזה — תוכנית ונוהל שמגדירים תוך כמה זמן חוזרים לעבוד (RTO) וכמה מידע מותר לאבד (RPO), כולל סביבה חלופית שאפשר לעלות עליה. גיבוי בלי תוכנית DR זה "יש לנו קובץ מגובה איפשהו". DR זה שאתם יודעים בדיוק מה קורה ברגע שהשרת נופל.'
  },
  {
    q: 'מה זה EDR ולמה אנטי-וירוס לא מספיק?',
    a: 'אנטי-וירוס מזהה איומים לפי חתימות ידועות — אם המתקפה חדשה, הוא פשוט לא רואה אותה. EDR (Endpoint Detection & Response) עוקב אחרי התנהגות בפועל על כל מחשב ושרת, מזהה חריגה גם בלי חתימה מוכרת, ומסוגל לבודד מכשיר נגוע לפני שהוא מדביק את שאר הרשת.'
  },
  {
    q: 'האם זה מתאים גם לעסקים קטנים?',
    a: 'כן. רמת ההגנה, הניטור והגיבוי לא "קטנה" יותר בגלל שהעסק קטן — פשוט מתאימים את היקף השירות והתמחור לגודל שלכם. הרבה מהעסקים שאנחנו עובדים איתם היום התחילו קטנים והמשיכו לגדול אתנו.'
  },
  {
    q: 'מה זה Mail Relay?',
    a: 'שירות שדרכו שרתים ומערכות פנימיות שולחים מייל החוצה (התראות, דוחות, קבלות) בלי לחשוף את השרת עצמו לאינטרנט. אנחנו מגדירים אותו עם הצפנה ומדיניות אימות (SPF / DKIM / DMARC), כך שהמיילים האלה לא ננעלים כספאם ולא הופכים לפרצה.'
  },
  {
    q: 'כמה זמן לוקחת הטמעה?',
    a: 'סקר התשתיות הראשוני מתבצע תוך 2–3 ימי עסקים מרגע הפנייה. ההטמעה המלאה — כולל הגדרות, בדיקות שחזור ותגובה, והדרכה קצרה לצוות — אורכת בדרך כלל בין שבוע לשבועיים, תלוי בגודל הארגון. אתם ממשיכים לעבוד כרגיל לאורך כל התהליך.'
  },
  {
    q: 'איך אתם בוחרים את הטכנולוגיות שאתם עובדים איתן?',
    a: 'לא לפי איזה ספק משלם הכי הרבה עמלה. אנחנו עובדים עם כלים שהוכיחו את עצמם בשטח — Veeam ו-Acronis לגיבוי, Fortinet לתקשורת, VMware לוירטואליזציה ועוד — ומחליפים כלי אם הוא מפסיק להיות הכי טוב במה שהוא עושה.'
  },
  {
    q: 'מה כולל שירות MDR?',
    a: 'ניטור 24/7/365 של הסביבה שלכם, צוות SOC אנושי שמגיב לאירועים ולא רק מערכת שמצפצפת, חוקי זיהוי מותאמים לסביבה הספציפית שלכם, ותגובה לפי נוהל כתוב ומתורגל — עד לסגירת האירוע. אנחנו נקודת האחריות היחידה שלכם מול השירות.'
  },
  {
    q: 'איך מתחילים?',
    a: 'שיחה קצרה כדי להבין מה עובד ומה לא. אחר כך סקר תשתיות בפועל — לא ניחוש. משם תוכנית עבודה ברורה, הטמעה בשעות שלא פוגעות בפעילות, וניטור ותחזוקה שוטפים אחרי. השאירו פרטים בטופס למטה ונחזור אליכם תוך שעתיים בשעות הפעילות.'
  }
];

/* ------------------------------------------------------------------ *
 *  Helpers
 * ------------------------------------------------------------------ */

const reveal = {
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] }
};

const PHONE_DISPLAY = '055-5702552';
const PHONE_TEL = '0555702552';
const EMAIL = 'sales@secureops.co.il';
const HOURS = 'א׳–ה׳ 09:00–18:00';

/* ------------------------------------------------------------------ *
 *  Logo
 * ------------------------------------------------------------------ */

/* The supplied lockup, cut off the solid navy it was generated on. Two
   files rather than one: "Secure" is pure white, so the dark lockup
   disappears on the white mobile drawer — the light variant recolours just
   the wordmark and leaves the shield alone.

   Sized by height so one value scales the whole lockup, and the intrinsic
   ratio is fixed in CSS so the header doesn't reflow while the PNG loads. */
function Logo({ variant = 'dark', className = '', style }) {
  return (
    <img
      src={variant === 'light' ? '/images/logo-lockup-light.png' : '/images/logo-lockup.png'}
      alt="SecureOps — make IT easy"
      width="755"
      height="200"
      className={`logo ${className}`}
      style={style}
    />
  );
}

/* ------------------------------------------------------------------ *
 *  App
 * ------------------------------------------------------------------ */

export default function App() {
  const [selectedService, setSelectedService] = useState(null);
  const [isServicesHovered, setIsServicesHovered] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [contactSent, setContactSent] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = selectedService || mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [selectedService, mobileOpen]);

  const openService = (svc) => { setSelectedService(svc); setIsServicesHovered(false); setMobileOpen(false); };

  return (
    <div className="min-h-screen">

      {/* ============================ HEADER ============================ */}
      <header className={`header-unibo-style${scrolled ? ' is-scrolled' : ''}`}>
        <a href="#top" className="header-right-logo-group" aria-label="SecureOps">
          <Logo variant="dark" className="header-logo" />
        </a>

        <nav>
          <ul className="header-nav-list">
            <li
              className="header-nav-item"
              onMouseEnter={() => setIsServicesHovered(true)}
              onMouseLeave={() => setIsServicesHovered(false)}
            >
              <a href="#services" className="header-nav-link">
                <span>שירותי IT לעסקים</span>
                <ChevronDown className="header-nav-chevron" style={{ width: 16, height: 16 }} />
              </a>

              <AnimatePresence>
                {isServicesHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.985 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.985 }}
                    transition={{ duration: 0.18 }}
                    className="mega-menu-panel"
                  >
                    <div>
                      <div className="mega-menu-col-title">גיבוי, תשתיות וענן</div>
                      <ul className="mega-menu-list">
                        <li><a onClick={() => openService(svcById('backup'))} className="mega-menu-item-link"><Server /> גיבוי שרתים</a></li>
                        <li><a onClick={() => openService(svcById('disaster-recovery'))} className="mega-menu-item-link"><RefreshCw /> התאוששות מאסון</a></li>
                        <li><a onClick={() => openService(svcById('rmm'))} className="mega-menu-item-link"><Monitor /> ניהול וניטור מרחוק</a></li>
                        <li><a onClick={() => openService(svcById('cloud-security'))} className="mega-menu-item-link"><Cloud /> אבטחת ענן</a></li>
                      </ul>
                    </div>

                    <div>
                      <div className="mega-menu-col-title">אבטחת מידע וסייבר</div>
                      <ul className="mega-menu-list">
                        <li><a onClick={() => openService(svcById('email-security'))} className="mega-menu-item-link"><Mail /> אבטחת מיילים</a></li>
                        <li><a onClick={() => openService(svcById('edr'))} className="mega-menu-item-link"><ShieldCheck /> הגנת נקודות קצה</a></li>
                        <li><a onClick={() => openService(svcById('mdr'))} className="mega-menu-item-link"><Eye /> ניטור ותגובה מנוהלים (MDR)</a></li>
                        <li><a onClick={() => openService(svcById('dlp'))} className="mega-menu-item-link"><Lock /> מניעת דליפת מידע</a></li>
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>

            <li><a href="#process" className="header-nav-link">איך זה עובד</a></li>
            <li><a href="#about" className="header-nav-link">אודות</a></li>
            {/* no destination yet — deliberately inert until the articles land */}
            <li><span className="header-nav-link is-static">מאמרים</span></li>
            <li><a href="#contact" className="header-nav-link">צור קשר</a></li>
          </ul>
        </nav>

        <a href={`tel:${PHONE_TEL}`} className="header-phone-cta-animated desktop-only">
          <span className="cta-call-icon"><Phone /></span>
          <span className="cta-call-text">
            <span className="lead">לייעוץ חינם חייגו</span>
            <span className="num">{PHONE_DISPLAY}</span>
          </span>
        </a>

        <button className="header-burger" onClick={() => setMobileOpen(true)} aria-label="פתח תפריט">
          <Menu style={{ width: 22, height: 22 }} />
        </button>
      </header>

      {/* ======================== MOBILE DRAWER ========================= */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-drawer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              className="mobile-drawer-panel"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 280 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mobile-drawer-head">
                <Logo variant="light" style={{ height: 34 }} />
                <button className="modal-close-btn-round" style={{ position: 'static' }} onClick={() => setMobileOpen(false)} aria-label="סגור">
                  <X />
                </button>
              </div>

              <a href="#services" onClick={() => setMobileOpen(false)}>שירותי IT לעסקים</a>
              <a href="#process" onClick={() => setMobileOpen(false)}>איך זה עובד</a>
              <a href="#about" onClick={() => setMobileOpen(false)}>אודות</a>
              <span className="mobile-drawer-static">מאמרים</span>
              <a href="#contact" onClick={() => setMobileOpen(false)}>צור קשר</a>

              <a href={`tel:${PHONE_TEL}`} className="header-phone-cta-animated" style={{ marginTop: 18, justifyContent: 'center' }}>
                <span className="cta-call-icon"><Phone /></span>
                <span className="cta-call-text">
                  <span className="lead">חייגו לייעוץ חינם</span>
                  <span className="num">{PHONE_DISPLAY}</span>
                </span>
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ============================= HERO ============================= */}
      <section className="hero-cyber" id="top">
        <div className="hero-cyber-inner">

          {/* --- copy column (right in RTL) --- */}
          <motion.div
            className="hero-cyber-copy"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="hero-cyber-title">
              העסק שלך מוגן<br />גם כשאתה לא מסתכל
            </h1>

            <span className="hero-cyber-brand">עם SecureOps</span>

            <p className="hero-cyber-lead">
              פתרונות סייבר, גיבוי וניטור שמזהים איומים בזמן אמת, עוצרים בעיות
              לפני שהן הופכות לשיחת 'הכול נפל', ושומרים על המידע הקריטי שלך
              זמין, מאובטח ומנוהל במקום אחד.
            </p>

            <div className="hero-cyber-cta-row">
              <a href="#contact" className="hero-cyber-cta">
                <span>דברו איתנו</span>
                <span className="hero-cyber-cta-chevron"><ArrowLeft /></span>
              </a>
              <a href="#services" className="hero-cyber-cta-ghost">תראו מה אנחנו עושים</a>
            </div>
          </motion.div>

          {/* --- visual column (left in RTL) --- */}
          <motion.div
            className="hero-cyber-visual"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <video
              className="hero-cyber-video"
              src="/video/hero-cyber.mp4"
              poster="/video/hero-cyber.jpg"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-hidden="true"
            />
          </motion.div>
        </div>
      </section>

      {/* ========================== TECH STRIP ========================== */}
      <section className="tech-strip">
        <div className="tech-strip-title">עובדים עם הטכנולוגיות המובילות בעולם</div>
        <div className="tech-strip-panel">
          <div className="tech-marquee">
            {[0, 1].map((dup) => (
              <div className="tech-marquee-group" key={dup} aria-hidden={dup === 1}>
                {techStack.map((t) => (
                  <span className="tech-chip" key={`${dup}-${t.name}`}>
                    <img
                      src={t.logo}
                      alt={t.name}
                      className="tech-chip-logo"
                      style={{ height: t.h }}
                      loading="lazy"
                    />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================== SERVICES =========================== */}
      <section className="section" id="services">
        <div className="wrap">
          <motion.div className="section-head-center" {...reveal}>
            <span className="eyebrow"><Layers style={{ width: 15, height: 15 }} /> SERVICES</span>
            <h2 className="section-head-title-light">שירותים שנועדו לרגע</h2>
            <div className="section-head-title-bold">שבו משהו משתבש</div>
            <p className="section-lead">
              גיבוי, סייבר, ניטור ו-IT מנוהל. דברים שעדיף לסדר לפני שמישהו נכנס לפאניקה.
            </p>
          </motion.div>

          <div className="services-3col-grid">
            {servicesData.map((svc, i) => (
              <motion.div
                key={svc.id}
                onClick={() => openService(svc)}
                className="service-card-unibo"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                <img src={svc.img} alt="" className="service-icon-3d" loading="lazy" />

                <h3 className="service-card-title">{svc.title}</h3>
                <p className="service-card-sub">{svc.subtitle}</p>

                <div className="service-card-tags">
                  {svc.tags.map((t) => <span className="service-tag" key={t}>{t}</span>)}
                </div>

                <button className="service-card-cta-btn">
                  קרא עוד <ArrowLeft />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ STORY BANNER ======================= */}
      <section className="story-band">
        <div className="story-band-inner">
          <motion.div
            className="story-visual"
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <img src="/images/story-illustration.png" alt="" className="story-art" loading="lazy" />
          </motion.div>

          <motion.div
            className="story-copy"
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ delay: 0.1, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="eyebrow eyebrow-dark"><Users style={{ width: 15, height: 15 }} /> מי אנחנו</span>

            <h2 className="story-h2">
              אנחנו לא רק ספק IT.<br />
              <span className="story-h2-accent">אנחנו הצוות שעומד מאחוריכם.</span>
            </h2>

            <div className="story-paras">
              <p>
                SecureOps ליוותה לאורך 12 השנים האחרונות מאות עסקים — מחברות משפחתיות
                ועד ארגוני הייטק ומוסדות ציבור — בהקמת תשתיות ענן, אבטחת מידע וסביבות
                עבודה יציבות שפשוט עובדות, כל הזמן.
              </p>
              <p>
                העיקרון שמנחה אותנו פשוט: אותה רמת שירות, אותו זמן תגובה ואותה
                מחויבות — בין אם אתם עסק קטן שרק מתחיל להתנהל מול ספק IT מסודר,
                ובין אם אתם ארגון שגדל וממשיך לגדול איתנו.
              </p>
            </div>

            <a href="#contact" className="btn btn-cyan">
              שאלו אותנו איך
              <ArrowLeft style={{ width: 18, height: 18 }} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ============================ WHY US ============================ */}
      <section className="section-tight" id="why">
        <div className="wrap">
          <motion.div className="section-head-center" {...reveal}>
            <span className="eyebrow"><Award style={{ width: 15, height: 15 }} /> WHY SECUREOPS</span>
            <h2 className="section-head-title-light">לא עוד ספק. מישהו שבא <span style={{ fontWeight: 800, color: 'var(--purple-main)' }}>לבדוק שזה באמת עובד</span></h2>
            <p className="section-lead">
              אנחנו לא באים למכור מילים יפות. אנחנו באים לראות איפה זה חשוף,
              לסגור את הפינות, ולהישאר גם אחרי ההטמעה.
            </p>
          </motion.div>

          <div className="why-grid">
            {whyUs.map((w, i) => (
              <motion.div
                className="why-card"
                key={w.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
              >
                {w.img
                  ? <img src={w.img} alt="" className="why-card-icon-3d" loading="lazy" />
                  : <div className="why-card-icon"><w.icon /></div>}
                <h3>{w.title}</h3>
                <p>{w.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================= TEAM ============================= */}
      <section className="section" id="team">
        <div className="wrap-narrow">
          <motion.div className="section-head-center" {...reveal}>
            <span className="eyebrow"><Users style={{ width: 15, height: 15 }} /> הצוות שלנו</span>
            <h2 className="section-head-title-light">האנשים שעומדים <span style={{ fontWeight: 800, color: 'var(--purple-main)' }}>מאחורי כל קריאה</span></h2>
            <p className="section-lead">
              לא מוקד תמיכה אנונימי — צוות מקצועי שחי ונושם ענן, אבטחת מידע ותשתיות,
              נמדד לפי תוצאות, ובעיקר אוהב את מה שהוא עושה. בואו להיות הלקוח הבא שלנו.
            </p>
          </motion.div>

          <div className="team-profiles">
            {team.map((m, i) => (
              <motion.div
                className="team-profile-row"
                key={m.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="team-profile-photo">
                  {m.photo
                    ? <img src={m.photo} alt={m.name} />
                    : <div className="team-profile-initials" aria-hidden="true">{m.initials}</div>}
                </div>

                <div className="team-profile-copy">
                  <span className="team-role">{m.role}</span>
                  <h3 className="team-profile-name">{m.name}</h3>
                  <p className="team-profile-bio">{m.bio1}</p>
                  <p className="team-profile-bio">
                    <strong>גישה אישית:</strong> {m.bio2}
                  </p>
                  <a href="#contact" className="btn btn-ghost team-profile-cta">
                    דבר איתי
                    <ArrowLeft style={{ width: 16, height: 16 }} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ PROCESS =========================== */}
      <section className="section process-section" id="process">
        <div className="wrap">
          <motion.div className="section-head-center" {...reveal}>
            <span className="eyebrow"><Rocket style={{ width: 15, height: 15 }} /> HOW IT WORKS</span>
            <h2 className="section-head-title-light">איך זה עובד בפועל</h2>
            <p className="section-lead">שיחה, בדיקה, הטמעה, תחזוקה. בלי עשן, בלי קסמים, בלי להשאיר דברים פתוחים.</p>
          </motion.div>

          <div className="process-flow-row">
            {processSteps.map((s, i) => (
              <React.Fragment key={s.n}>
                <motion.div
                  className="process-flow-card"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <div className="process-flow-tile">
                    {s.img
                      ? (
                        <img
                          src={s.img}
                          alt=""
                          className="process-flow-icon"
                          style={{ animationDelay: `${i * 0.4}s` }}
                          loading="lazy"
                        />
                      )
                      : <span className="process-flow-icon-fallback">{s.n}</span>}
                    <span className="process-flow-badge">{i + 1}</span>
                  </div>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                  {s.bullets && (
                    <ul className="process-flow-bullets">
                      {s.bullets.map((b) => <li key={b}>{b}</li>)}
                    </ul>
                  )}
                </motion.div>

                {i < processSteps.length - 1 && (
                  <span className="process-flow-arrow" aria-hidden="true">
                    <svg viewBox="0 0 60 32" fill="none">
                      <path className="process-flow-arrow-curve" d="M56 8C40 27 20 27 7 15" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                      <path className="process-flow-arrow-head" d="M13 9 6 15l7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>


      {/* ============================ ABOUT ============================= */}
      <section className="dark-soc-wrapper" id="about">
        <div className="dark-soc-inner">
          <motion.div className="section-head-center" {...reveal}>
            <span className="eyebrow eyebrow-dark"><Activity style={{ width: 15, height: 15 }} /> אודות SecureOps</span>
            <h2 className="section-head-title-light" style={{ color: '#fff' }}>
              הגנה שלא נרדמת <span style={{ fontWeight: 800, color: 'var(--cyan-accent)' }}>אף פעם</span>
            </h2>
          </motion.div>

          <motion.div className="dark-soc-banner-card" {...reveal}>
            <img src="/images/about_office.jpg" alt="ניטור ותגובה מנוהלים 24/7" />
            <div className="dark-soc-banner-badge">
              <Activity />
              <span>SecureOps — פתרונות אבטחה וענן</span>
            </div>
          </motion.div>

          <div className="dark-soc-4grid">
            {[
              { icon: Sparkles, h: 'חזון ומחויבות (make IT easy)', p: 'אנחנו ב-SecureOps מאמינים שטכנולוגיה, ענן ואבטחת מידע צריכים להיות פשוטים, נגישים ושקופים. המטרה שלנו היא לאפשר לעסקים לצמוח במהירות תוך שמירה על מעטפת הגנה הרמטית — בלי ז\'רגון ובלי הפחדות.' },
              { icon: Cpu, h: 'מומחיות טכנולוגית', p: 'הצוות שלנו מורכב ממומחי סייבר, ארכיטקטי ענן ומהנדסי תשתיות בעלי הסמכות בינלאומיות מובילות (CISSP, AWS Certified Solutions Architect, Fortinet NSE 7, Microsoft Expert).' },
              { icon: Eye, h: 'כיסוי 24/7 דרך שותפי MDR', p: 'אנחנו לא מוכרים לכם מרכז ניטור מדומיין. הניטור והתגובה נעשים על ידי ספקי MDR מובילים שאנחנו בוחרים ומנהלים מולם, ואנחנו נקודת האחריות היחידה שלכם — כולל חיוג יזום אליכם לפני שאתם בכלל מגלים שקרה משהו.' },
              { icon: KeyRound, h: 'פתרונות מותאמים אישית', p: 'כל ארגון הוא ייחודי. אנו מבצעים אפיון מקיף ומתאימים את ארכיטקטורת האבטחה והענן בדיוק למאפיינים, לרגולציה ולצרכים העסקיים שלכם.' }
            ].map((it, i) => (
              <motion.div
                className="dark-soc-item"
                key={it.h}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
              >
                <div className="dark-soc-item-icon"><it.icon /></div>
                <h3>{it.h}</h3>
                <p>{it.p}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================= TESTIMONIALS ========================= */}
      <section className="section" id="testimonials">
        <div className="wrap">
          <motion.div className="section-head-center" {...reveal}>
            <span className="eyebrow"><Star style={{ width: 15, height: 15 }} /> לקוחות מספרים</span>
            <h2 className="section-head-title-light">מה אומרים עלינו <span style={{ fontWeight: 800, color: 'var(--purple-main)' }}>בשטח</span></h2>
          </motion.div>

          <div className="testi-grid">
            {testimonials.map((t, i) => (
              <motion.div
                className="testi-card"
                key={t.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <div className="testi-stars">
                  {[...Array(5)].map((_, k) => <Star key={k} />)}
                </div>
                <p className="testi-quote">"{t.quote}"</p>
                <div className="testi-person">
                  <div className="testi-avatar">{t.initials}</div>
                  <div>
                    <div className="n">{t.name}</div>
                    <div className="r">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* ============================== FAQ ============================= */}
      <section className="section-tight" id="faq">
        <div className="wrap-narrow">
          <motion.div className="section-head-center" {...reveal}>
            <span className="eyebrow"><MessageCircle style={{ width: 15, height: 15 }} /> FAQ</span>
            <h2 className="section-head-title-light">השאלות שבסוף <span style={{ fontWeight: 800, color: 'var(--purple-main)' }}>כולם שואלים</span></h2>
            <p className="section-lead">תשובות קצרות, בלי למרוח ובלי לייפות איפה שלא צריך.</p>
          </motion.div>

          <div className="faq-list">
            {faqs.map((f, i) => (
              <div className={`faq-item${openFaq === i ? ' is-open' : ''}`} key={f.q}>
                <button className="faq-q" onClick={() => setOpenFaq(openFaq === i ? -1 : i)}>
                  <span>{f.q}</span>
                  <span className="faq-q-icon">{openFaq === i ? <X /> : <Plus />}</span>
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div className="faq-a">{f.a}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ CONTACT =========================== */}
      <section className="contact-band" id="contact">
        <div className="contact-band-inner">
          <div className="contact-band-body">
            {/* copy + illustration share the narrow side so the form can run
                wide — the whole section stays short instead of stacking */}
            <motion.div
              className="contact-aside"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="eyebrow eyebrow-dark"><Send style={{ width: 15, height: 15 }} /> דברו איתנו</span>
              <h2 className="contact-band-h2">
                אם משהו מרגיש חשוף,<br />
                <span className="contact-band-accent">בואו נדבר.</span>
              </h2>
              <p className="contact-band-lead">
                שיחה קצרה, בלי לחץ ובלי סיסמאות. פשוט נבין מה קורה ואיפה כואב.
                השאירו פרטים ונחזור אליכם כדי להבין מה קורה אצלכם באמת — בלי
                מכירה אגרסיבית, פשוט שיחה עניינית.
              </p>

              <ul className="contact-band-checklist">
                <li>מיפוי מה באמת חשוף</li>
                <li>סקירה של התשתיות וההרשאות</li>
                <li>צעדים פרקטיים, לא מצגת</li>
                <li>כיוון ברור גם אם לא ממשיכים איתנו</li>
              </ul>

              <img
                src="/images/contact-illustration-v2.png"
                alt=""
                className="contact-art"
                loading="lazy"
              />
            </motion.div>

            <motion.div
              className="contact-form-panel"
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: 0.1, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              {contactSent ? (
                <div className="form-success form-success-onpurple">
                  <div className="form-success-icon"><CheckCircle2 /></div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#fff' }}>הפנייה התקבלה</h3>
                  <p style={{ color: 'rgba(255,255,255,0.8)' }}>נציג שלנו יחזור אליכם תוך שעתיים בשעות הפעילות.</p>
                  <button className="btn btn-ghost" onClick={() => setContactSent(false)}>שליחת פנייה נוספת</button>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setContactSent(true); }}>
                  <div className="form-grid">
                    <div className="field">
                      <label htmlFor="c-name">שם מלא</label>
                      <input id="c-name" type="text" placeholder="ישראל ישראלי" required />
                    </div>
                    <div className="field">
                      <label htmlFor="c-company">שם החברה</label>
                      <input id="c-company" type="text" placeholder="חברת אלפא בע״מ" />
                    </div>
                    <div className="field">
                      <label htmlFor="c-phone">טלפון</label>
                      <input id="c-phone" type="tel" placeholder="050-1234567" required />
                    </div>
                    <div className="field">
                      <label htmlFor="c-email">אימייל</label>
                      <input id="c-email" type="email" placeholder="info@company.co.il" required />
                    </div>
                    <div className="field field-wide">
                      <label htmlFor="c-topic">שירות נדרש</label>
                      <select id="c-topic" defaultValue="">
                        <option value="" disabled>בחר שירות...</option>
                        {servicesData.map((s) => <option key={s.id}>{s.title}</option>)}
                        <option>אחר / ייעוץ כללי</option>
                      </select>
                    </div>
                    <div className="field field-wide">
                      <label htmlFor="c-msg">הודעה</label>
                      <textarea id="c-msg" placeholder="מה קורה אצלכם היום? מה כואב? מה כבר ניסיתם?" />
                    </div>
                  </div>

                  <div className="contact-submit-row">
                    <label className="contact-consent">
                      <input type="checkbox" required />
                      <span>אני מאשר/ת שימוש בפרטים שמסרתי לצורך יצירת קשר בהתאם למדיניות הפרטיות.</span>
                    </label>

                    <button type="submit" className="btn btn-cyan contact-band-submit">
                      <Send style={{ width: 18, height: 18 }} />
                      שלח פנייה
                    </button>
                  </div>

                  <p className="contact-band-note">
                    או ישירות: <a href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a> · <a href={`mailto:${EMAIL}`}>{EMAIL}</a> · {HOURS}
                  </p>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================= MODAL ============================ */}
      <AnimatePresence>
        {selectedService && (
          <motion.div
            className="modal-overlay-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedService(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="modal-white-card"
              onClick={(e) => e.stopPropagation()}
            >
              <button className="modal-close-btn-round" onClick={() => setSelectedService(null)} aria-label="סגור">
                <X />
              </button>

              <div className="modal-head">
                <img src={selectedService.img} alt="" className="service-icon-3d modal-icon" />
                <div>
                  <h2>{selectedService.title}</h2>
                  <span>SecureOps — make IT easy</span>
                </div>
              </div>

              <div className="service-card-tags" style={{ marginBottom: 22 }}>
                {selectedService.tags.map((t) => <span className="service-tag" key={t}>{t}</span>)}
              </div>

              <p className="modal-desc">{selectedService.fullDesc}</p>

              <h3 className="modal-sub-title">מה כולל השירות המלא?</h3>
              <ul className="modal-feature-list">
                {selectedService.features.map((feat) => (
                  <li key={feat}><CheckCircle2 /> <span>{feat}</span></li>
                ))}
              </ul>

              <div className="modal-form-box">
                <h4>מעוניינים בהצעת מחיר מותאמת?</h4>
                <form
                  onSubmit={(e) => { e.preventDefault(); setSelectedService(null); setContactSent(true); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                  style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
                >
                  <div className="form-row">
                    <div className="field" style={{ marginBottom: 0 }}>
                      <input type="text" placeholder="שם מלא" required />
                    </div>
                    <div className="field" style={{ marginBottom: 0 }}>
                      <input type="tel" placeholder="טלפון" required />
                    </div>
                  </div>
                  <div className="field" style={{ marginBottom: 0 }}>
                    <input type="email" placeholder='דוא"ל עסקי' required />
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                    <Send style={{ width: 18, height: 18 }} />
                    שלחו לי הצעה
                  </button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ============================ FOOTER ============================ */}
      <footer className="footer-wrap-dark">
        <div className="footer-inner-4grid">
          <div>
            <Logo variant="dark" style={{ height: 46, marginBottom: 14 }} />
            <p style={{ color: 'rgba(255,255,255,0.66)', fontSize: '0.94rem', lineHeight: 1.75 }}>
              פתרונות אבטחת מידע, סייבר ותשתיות ענן מתקדמות לעסקים בישראל.
              ספק IT מנוהל אחד לכל מה שהארגון צריך. make IT easy.
            </p>

            <div className="footer-social">
              <a href="#top" aria-label="LinkedIn"><Linkedin /></a>
              <a href="#top" aria-label="Facebook"><Facebook /></a>
              <a href={`https://wa.me/972${PHONE_TEL.slice(1)}`} aria-label="WhatsApp"><MessageCircle /></a>
              <a href={`mailto:${EMAIL}`} aria-label="Email"><Mail /></a>
            </div>
          </div>

          <div className="footer-col-item">
            <h4>השירותים שלנו</h4>
            {servicesData.map((s) => (
              <a key={s.id} onClick={() => openService(s)}>{s.title}</a>
            ))}
          </div>

          <div className="footer-col-item">
            <h4>החברה</h4>
            <a href="#about">אודות SecureOps</a>
            <a href="#process">תהליך העבודה</a>
            <a href="#team">צוות המומחים</a>
            <a href="#testimonials">לקוחות ממליצים</a>
            <a href="#faq">שאלות נפוצות</a>
          </div>

          <div className="footer-col-item">
            <h4>צרו איתנו קשר</h4>
            <p style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Mail style={{ width: 16, height: 16, color: 'var(--cyan-accent)', flexShrink: 0 }} />
              <a href={`mailto:${EMAIL}`} style={{ margin: 0, direction: 'ltr' }}>{EMAIL}</a>
            </p>
            <p style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Phone style={{ width: 16, height: 16, color: 'var(--cyan-accent)', flexShrink: 0 }} />
              <a href={`tel:${PHONE_TEL}`} style={{ margin: 0, direction: 'ltr' }}>{PHONE_DISPLAY}</a>
            </p>
            <p style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Clock style={{ width: 16, height: 16, color: 'var(--cyan-accent)', flexShrink: 0 }} />
              <span>{HOURS}</span>
            </p>
          </div>
        </div>

        <div className="footer-copyright-bar">
          <p>© {new Date().getFullYear()} SecureOps Ltd. כל הזכויות שמורות. make IT easy.</p>
        </div>
      </footer>

      {/* ====================== FLOATING ACTIONS ======================== */}
      <div className="floating-actions">
        <a
          className="float-btn float-wa"
          href={`https://wa.me/972${PHONE_TEL.slice(1)}`}
          target="_blank"
          rel="noreferrer"
          aria-label="שלחו הודעת WhatsApp"
        >
          <MessageCircle />
        </a>
        <AnimatePresence>
          {scrolled && (
            <motion.button
              className="float-btn float-top"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              aria-label="חזרה למעלה"
            >
              <ArrowUp />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
