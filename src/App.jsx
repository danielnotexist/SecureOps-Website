import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2,
  X,
  Mail,
  Phone,
  MapPin,
  ChevronDown,
  Cloud,
  Headphones,
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
  Building2,
  Linkedin,
  Facebook,
  Send,
  BadgeCheck,
  Rocket,
  Globe,
  Monitor,
  Smartphone,
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

const servicesData = [
  {
    id: 'cloud',
    title: 'שירותי ענן לעסקים',
    img: '/images/icons/svc-cloud.png',
    tags: ['AWS', 'Azure', 'Microsoft 365', 'FinOps'],
    subtitle: 'תכנון, הקמה וניהול סביבות ענן מתקדמות ב-AWS ו-Azure, אופטימיזציית FinOps וזמינות רצופה.',
    shortDesc: 'תכנון, מיגרציה וניהול מלא של תשתיות ענן מתקדמות ב-AWS, Azure ו-Google Cloud.',
    fullDesc: 'ב-SecureOps אנו מתכננים ומקימים ארכיטקטורת ענן מותאמת אישית תוך דגש על אבטחה, אופטימיזציית עלויות (FinOps) וזמינות מלאה 24/7. אנחנו מלווים את הארגון משלב האפיון, דרך המיגרציה עצמה ועד לניהול השוטף — בלי השבתות ובלי הפתעות בחשבונית.',
    features: [
      'מיגרציה חלקה לענן (AWS / Azure) ללא השבתת פעילות',
      'ארכיטקטורת Multi-Cloud וסביבות היברידיות',
      'ניהול קונטיינרים ו-Kubernetes ברמת Enterprise',
      'אופטימיזציית עלויות חודשיות (FinOps) — חיסכון ממוצע של 30%',
      'תשתית כקוד (Terraform / Bicep) לשחזור מהיר של סביבות',
      'ניטור וזמינות רצופה 24/7/365'
    ]
  },
  {
    id: 'support',
    title: 'שירותי IT לעסקים',
    img: '/images/icons/svc-support.png',
    tags: ['Helpdesk', 'SLA', 'Onboarding', 'M365'],
    subtitle: 'מעטפת תמיכת Helpdesk מנוהלת 24/7 באמנת SLA מחייבת, ניהול תחנות עבודה וציוד היקפי.',
    shortDesc: 'מענה טכני מהיר ומקצועי 24/7 לכל תחנות העבודה, השרתים והציוד ההיקפי בארגון.',
    fullDesc: 'צוות ה-Helpdesk המיומן של SecureOps מעניק תמיכה טכנית מקיפה באמנת שירות (SLA) מחייבת, כדי להבטיח שכל העובדים בארגון שלכם יעבדו ברציפות ללא תקלות. כל קריאה נרשמת, נמדדת ונסגרת עם דיווח שקוף.',
    features: [
      'תמיכה מרחוק (Remote Helpdesk) עם מענה תוך דקות',
      'טכנאי IT באתר הלקוח למערכים מורכבים',
      'ניהול ציוד ותחנות עבודה (Onboarding & Offboarding)',
      'ניהול משתמשים ורישיונות (Microsoft 365, Google Workspace)',
      'מערכת כרטיסים ודוחות SLA חודשיים שקופים',
      'תחזוקה מונעת ועדכוני אבטחה שוטפים'
    ]
  },
  {
    id: 'cyber',
    title: 'שירותי אבטחת מידע',
    img: '/images/icons/svc-cyber.png',
    tags: ['MDR 24/7', 'EDR / XDR', 'Pentest', 'ISO 27001'],
    subtitle: 'הגנת סייבר רב-שכבתית, שירות MDR מנוהל לניטור ותגובה 24/7, מערכות EDR ומבדקי חדירות.',
    shortDesc: 'הגנה מקיפה מפני איומי סייבר, מתקפות כופר, פישינג וזיהוי חולשות אבטחה בזמן אמת.',
    fullDesc: 'אנו בונים עבור הארגון שלך מעטפת הגנה רב-שכבתית המשלבת מערכות EDR/XDR מתקדמות, שירות MDR (Managed Detection & Response) של שותפי אבטחה מובילים והדרכות מודעות לעובדים. אנחנו בוחרים את ספק ה-MDR, מגדירים את חוקי הזיהוי ומנהלים מולו כל אירוע עד לסגירה — נקודת אחריות אחת מולכם.',
    features: [
      'ניטור ותגובה מנוהלים 24/7 (MDR) בשיתוף שותפי אבטחה מובילים',
      'מבדקי חדירות (Penetration Testing) וזיהוי חולשות',
      'הגנה מפני כופרות והגנת קצה (Endpoint Protection)',
      'אימות דו-שלבי (MFA) וניהול זהויות (IAM)',
      'סימולציות פישינג והדרכות מודעות לעובדים',
      'הכנה לתקני רגולציה ISO 27001 ו-SOC 2'
    ]
  },
  {
    id: 'firewall',
    title: 'חומות אש ותקשורת',
    img: '/images/icons/svc-firewall.png',
    tags: ['Fortinet', 'Palo Alto', 'SD-WAN', 'ZTNA'],
    subtitle: 'התקנה וניהול חומות אש מבית Fortinet, יישום גישת Zero-Trust (ZTNA) וחיבור סניפים.',
    shortDesc: 'יישום חומות אש (Firewall) מתקדמות, רשתות Zero-Trust ואבטחת נתונים בתקשורת.',
    fullDesc: 'אנו מספקים פתרונות תקשורת ארגונית מאובטחת המבוססים על חומות אש מבית Fortinet ו-Palo Alto, המבטיחים הצפנה מלאה וסינון תנועה זדונית — כולל חיבור סניפים ועובדים מהבית באותה רמת אבטחה.',
    features: [
      'התקנת חומות אש דור חדש (Next-Gen Firewall)',
      'חיבור סניפים ברשתות VPN מוצפנות ו-SD-WAN',
      'יישום גישת Zero-Trust (ZTNA) לעובדים מרחוק',
      'סינון תוכן, IPS והגנה על שכבת ה-DNS',
      'ניהול ותעדוף רוחב פס (QoS) לרציפות עבודה'
    ]
  },
  {
    id: 'backup',
    title: 'גיבוי ושחזור (DRP)',
    img: '/images/icons/svc-backup.png',
    tags: ['Veeam', 'Acronis', 'Immutable', 'DRP'],
    subtitle: 'מערך גיבוי ענן אוטומטי ומוצפן, עותקים חסינים מכופרות ותוכנית התאוששות מאסון.',
    shortDesc: 'גיבוי ענן אוטומטי, מוצפן ומאובטח לכל נתוני החברה כולל תוכנית שחזור מאסון (DRP).',
    fullDesc: 'המידע הארגוני הוא הנכס היקר ביותר שלכם. מערכות הגיבוי שלנו מבטיחות עותקים מוצפנים וחסינים מפני כופרות, עם יכולת שחזור מלאה בתוך דקות — ועם בדיקות שחזור תקופתיות שמוכיחות שזה באמת עובד.',
    features: [
      'גיבוי ענן אוטומטי ומוצפן (Veeam / Acronis)',
      'תוכנית שחזור מאסון (Disaster Recovery Plan) כתובה ומתורגלת',
      'עותקי גיבוי חסינים (Immutable Backup) מפני כופרות',
      'מדיניות 3-2-1 עם עותק מחוץ לאתר',
      'שחזור ממוקד של קבצים, תיבות דואר ושרתים'
    ]
  },
  {
    id: 'infra',
    title: 'תחזוקת שרתים ותשתיות',
    img: '/images/icons/svc-infra.png',
    tags: ['VMware', 'Hyper-V', 'RMM', 'SAN / NAS'],
    subtitle: 'ניהול שרתי Linux ו-Windows, וירטואליזציה (VMware), ניטור רציף עם התראות אוטומטיות וזמינות גבוהה.',
    shortDesc: 'ניטור רציף, תחזוקה מונעת וניהול שוטף לשרתים פיזיים ווירטואליים.',
    fullDesc: 'אנו מנהלים סביבות וירטואליזציה (VMware, Hyper-V) ושרתים ייעודיים ברמת זמינות מירבית, תוך ניטור רציף של מעבדים, זיכרון ושטחי דיסק — כדי לטפל בתקלה עוד לפני שהמשתמשים מרגישים בה.',
    features: [
      'ניהול שרתי Linux ו-Windows Server',
      'תשתיות וירטואליזציה (VMware / Hyper-V)',
      'ניטור זמינות וביצועים עם התראות אוטומטיות והסלמה לצוות',
      'ניהול מערכי אחסון מהירים (SAN / NAS / NVMe)',
      'תחזוקה מונעת, עדכוני Firmware וניהול מחזור חיים לחומרה'
    ]
  }
];

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
    icon: Clock,
    img: '/images/icons/why-response.png',
    title: 'זמן תגובה של 15 דקות',
    text: 'אמנת שירות (SLA) מחייבת בחוזה. קריאה דחופה מקבלת מענה אנושי תוך רבע שעה, מסביב לשעון.'
  },
  {
    icon: Users,
    img: '/images/icons/why-team.png',
    title: 'צוות ייעודי לכל לקוח',
    text: 'לא מוקד אנונימי. מקבלים איש קשר טכני קבוע שמכיר את הסביבה שלכם ואת הצרכים העסקיים.'
  },
  {
    icon: BadgeCheck,
    img: '/images/icons/why-certified.png',
    title: 'מומחים מוסמכים',
    text: 'CISSP, AWS Solutions Architect, Fortinet NSE 7, Microsoft Expert — ההסמכות אצלנו, לא במצגת.'
  },
  {
    icon: Gauge,
    img: '/images/icons/why-transparency.png',
    title: 'שקיפות מלאה בעלויות',
    text: 'מחיר חודשי קבוע לפי משתמש. בלי חיובי הפתעה, בלי שעות עבודה שמופיעות בסוף החודש.'
  }
];

const processSteps = [
  { n: '01', img: '/images/icons/proc-audit.png',  title: 'אפיון וסקר תשתיות', text: 'מיפוי מלא של המערכות, הסיכונים ונקודות הכשל בארגון — ללא עלות וללא התחייבות.' },
  { n: '02', img: '/images/icons/proc-plan.png',   title: 'תכנון פתרון מותאם', text: 'בונים תוכנית עבודה עם לוחות זמנים, תקציב ברור ויעדי אבטחה מדידים.' },
  { n: '03', img: '/images/icons/proc-launch.png', title: 'הטמעה ומעבר', text: 'ביצוע בשעות שלא פוגעות בפעילות, עם ליווי צמוד לעובדים ותוכנית חזרה לאחור.' },
  { n: '04', img: '/images/icons/proc-manage.png', title: 'ניהול וניטור שוטף', text: 'ניטור MDR שוטף, דוחות חודשיים ופגישת סטטוס רבעונית לשיפור מתמיד.' }
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
    q: 'כמה זמן לוקח להתחיל לעבוד איתכם?',
    a: 'סקר התשתיות הראשוני מתבצע תוך 2–3 ימי עסקים מרגע הפנייה. תהליך ה-Onboarding המלא — כולל התקנת כלי ניטור, מיפוי ציוד והעברת ידע — אורך בדרך כלל בין שבוע לשבועיים, תלוי בגודל הארגון. בכל התקופה הזו הארגון ממשיך לעבוד כרגיל.'
  },
  {
    q: 'האם אתם מחליפים את איש ה-IT הפנימי שלנו?',
    a: 'לא בהכרח. בהרבה ארגונים אנחנו עובדים לצד מנהל IT פנימי ולוקחים על עצמנו את השכבות שדורשות התמחות — ענן, אבטחת מידע, ניהול שירות ה-MDR ותשתיות. בארגונים קטנים יותר אנחנו משמשים כמחלקת ה-IT המלאה.'
  },
  {
    q: 'מה קורה אם יש תקלה קריטית באמצע הלילה?',
    a: 'הניטור והתגובה לאירועי אבטחה מתבצעים 24/7/365 על ידי שותף MDR שאנחנו בוחרים, מגדירים ומנהלים מולו. ההתראה מגיעה אלינו ואנחנו אלה שמטפלים מולכם — כך שאתם מקבלים כיסוי מסביב לשעון בלי לשלם על הקמת מרכז ניטור פנימי. אירועי אבטחה מטופלים לפי נוהל תגובה לאירועים כתוב ומתורגל.'
  },
  {
    q: 'האם המידע שלנו נשאר בישראל?',
    a: 'ניתן. אנחנו מתכננים את ארכיטקטורת האחסון לפי דרישות הרגולציה שלכם — כולל שמירת מידע ב-Data Center בישראל, בענן ציבורי באזור מוגדר, או במודל היברידי. כל הפתרונות כוללים הצפנה במנוחה ובתעבורה.'
  },
  {
    q: 'איך מתומחר השירות?',
    a: 'המודל הוא מחיר חודשי קבוע לפי מספר משתמשים ורמת החבילה, ללא חיוב לפי שעות. כך אתם יודעים מראש מה תשלמו כל חודש, ואין לנו תמריץ שיהיו לכם תקלות. עבודות פרויקטליות חד-פעמיות (מיגרציה, הקמת אתר חדש) מתומחרות בנפרד ומראש.'
  },
  {
    q: 'אנחנו כבר עובדים עם ספק אחר — המעבר מסובך?',
    a: 'התהליך מנוהל על ידינו מקצה לקצה: קליטת סיסמאות וגישות, תיעוד הסביבה הקיימת, זיהוי פערי אבטחה ומעבר מסודר בלי חלון השבתה. ברוב המקרים הלקוח לא מרגיש את ההחלפה מעבר לכתובת חדשה לפתיחת קריאות.'
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

const PHONE_DISPLAY = '077-1234567';
const PHONE_TEL = '0771234567';

/* ------------------------------------------------------------------ *
 *  Logo
 * ------------------------------------------------------------------ */

/* Drawn inline rather than shipped as a PNG. The old raster lockup baked
   the wordmark into the image, so the header had to flatten the whole
   thing to white (`filter: brightness(0) invert(1)`) to sit on the dark
   bar — which threw away the two-tone entirely. Here the mark is geometry
   and the wordmark is real Rubik, so both keep their colour on any
   background, stay sharp at any size, and cost ~2KB instead of 250KB.

   Geometry: a shield of even stroke weight with a lemniscate centred in
   it, sized so the loop clears the shield wall on both sides. Scale is
   driven entirely by font-size on `.logo` — the mark and tagline are in
   em, so one knob resizes the lockup. */
function Logo({ variant = 'dark', markOnly = false, className = '', style }) {
  const mark = (
    <svg
      className="logo-mark"
      viewBox="0 0 64 72"
      role="img"
      aria-label={markOnly ? 'SecureOps' : undefined}
      aria-hidden={markOnly ? undefined : true}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        className="logo-shield"
        strokeWidth="4.5"
        d="M16 8 L48 8 Q54 8 54 14 L54 36 Q54 50 32 64 Q10 50 10 36 L10 14 Q10 8 16 8 Z"
      />
      {/* Two halves of one lemniscate, drawn separately so each carries its
          own colour and they meet cleanly at the centre crossing. The lobe
          radius (5.8) has to stay well clear of the stroke width (3.6) or
          the loops fill in and read as solid blobs at small sizes. */}
      <path
        className="logo-loop-a"
        strokeWidth="3.6"
        d="M32 32.5 c-2.9,-3.87 -5.8,-5.8 -8.7,-5.8 a5.8,5.8 0 1,0 0,11.6 c2.9,0 5.8,-1.93 8.7,-5.8 Z"
      />
      <path
        className="logo-loop-b"
        strokeWidth="3.6"
        d="M32 32.5 c2.9,3.87 5.8,5.8 8.7,5.8 a5.8,5.8 0 0,0 0,-11.6 c-2.9,0 -5.8,1.93 -8.7,5.8 Z"
      />
    </svg>
  );

  if (markOnly) return <span className={`logo logo-${variant} ${className}`} style={style}>{mark}</span>;

  return (
    <span className={`logo logo-${variant} ${className}`} style={style}>
      {mark}
      <span className="logo-text">
        <span className="logo-name">Secure<span className="logo-name-accent">Ops</span></span>
        <span className="logo-tagline">make IT easy</span>
      </span>
    </span>
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
                      <div className="mega-menu-col-title">פתרונות ענן ותשתיות</div>
                      <ul className="mega-menu-list">
                        <li><a onClick={() => openService(servicesData[0])} className="mega-menu-item-link"><Cloud /> שירותי ענן לעסקים</a></li>
                        <li><a onClick={() => openService(servicesData[0])} className="mega-menu-item-link"><Mail /> מיילים 365 והגדרות דואר</a></li>
                        <li><a onClick={() => openService(servicesData[3])} className="mega-menu-item-link"><Globe /> קו תמסורת אינטרנט מנוהל</a></li>
                        <li><a onClick={() => openService(servicesData[5])} className="mega-menu-item-link"><Server /> תחזוקת שרתים ותשתיות</a></li>
                      </ul>
                    </div>

                    <div>
                      <div className="mega-menu-col-title">תמיכת IT ומרכזיות</div>
                      <ul className="mega-menu-list">
                        <li><a onClick={() => openService(servicesData[1])} className="mega-menu-item-link"><Headphones /> שירותי IT לעסקים (Helpdesk)</a></li>
                        <li><a onClick={() => openService(servicesData[1])} className="mega-menu-item-link"><Phone /> מרכזייה בענן ותקשורת</a></li>
                        <li><a onClick={() => openService(servicesData[4])} className="mega-menu-item-link"><RefreshCw /> תוכנית התאוששות מאסון (DRP)</a></li>
                        <li><a onClick={() => openService(servicesData[1])} className="mega-menu-item-link"><Monitor /> ניהול תחנות עבודה וציוד</a></li>
                      </ul>
                    </div>

                    <div>
                      <div className="mega-menu-col-title">אבטחת מידע וסייבר</div>
                      <ul className="mega-menu-list">
                        <li><a onClick={() => openService(servicesData[2])} className="mega-menu-item-link"><ShieldCheck /> אנטי וירוס ו-EDR מתקדם</a></li>
                        <li><a onClick={() => openService(servicesData[2])} className="mega-menu-item-link"><Eye /> MDR — ניטור ותגובה מנוהלים</a></li>
                        <li><a onClick={() => openService(servicesData[3])} className="mega-menu-item-link"><Lock /> חומות אש ו-Zero Trust</a></li>
                        <li><a onClick={() => openService(servicesData[2])} className="mega-menu-item-link"><Smartphone /> MDM מערכות ניהול למובייל</a></li>
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
                <Logo variant="light" style={{ fontSize: 21 }} />
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
              מזהים איומים בזמן אמת, עוצרים בעיות לפני שהן הופכות למשבר,
              ושומרים על המידע הקריטי שלכם מאובטח וזמין — במקום אחד.
            </p>

            <a href="#contact" className="hero-cyber-cta">
              <span>לייעוץ ללא עלות השאירו פרטים</span>
              <span className="hero-cyber-cta-chevron"><ArrowLeft /></span>
            </a>
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
            <span className="eyebrow"><Layers style={{ width: 15, height: 15 }} /> מעטפת IT מלאה</span>
            <h2 className="section-head-title-light">כל מה שהעסק שלכם צריך</h2>
            <div className="section-head-title-bold">במקום אחד!</div>
            <p className="section-lead">
              ענן, סייבר, תקשורת, גיבוי ותמיכה — תחת ספק אחד, חוזה אחד ואיש קשר אחד.
              בלי לרדוף אחרי שלושה ספקים כשמשהו נופל.
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
            <span className="eyebrow"><Award style={{ width: 15, height: 15 }} /> למה SecureOps</span>
            <h2 className="section-head-title-light">ההבדל הוא <span style={{ fontWeight: 800, color: 'var(--purple-main)' }}>בפרטים הקטנים</span></h2>
            <p className="section-lead">ארבע סיבות שבגללן ארגונים עוברים אלינו — ונשארים.</p>
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
            <span className="eyebrow"><Rocket style={{ width: 15, height: 15 }} /> תהליך העבודה</span>
            <h2 className="section-head-title-light">מהשיחה הראשונה ועד לניהול השוטף</h2>
            <p className="section-lead">ארבעה שלבים ברורים, לוחות זמנים כתובים, בלי הפתעות באמצע.</p>
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
            <span className="eyebrow"><MessageCircle style={{ width: 15, height: 15 }} /> שאלות נפוצות</span>
            <h2 className="section-head-title-light">כל מה ששאלתם <span style={{ fontWeight: 800, color: 'var(--purple-main)' }}>לפני שהתחלנו</span></h2>
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
                בואו נהפוך את אתגרי ה-IT שלכם<br />
                <span className="contact-band-accent">לשקט נפשי אמיתי.</span>
              </h2>
              <p className="contact-band-lead">
                השאירו פרטים ותאמו שיחת ייעוץ ללא עלות — נחזור אליכם תוך שעתיים בשעות הפעילות.
              </p>

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
                      <label htmlFor="c-phone">טלפון</label>
                      <input id="c-phone" type="tel" placeholder="050-0000000" required />
                    </div>
                    <div className="field">
                      <label htmlFor="c-email">דוא"ל</label>
                      <input id="c-email" type="email" placeholder="name@company.co.il" required />
                    </div>
                    <div className="field">
                      <label htmlFor="c-size">כמה מחשבים בחברה?</label>
                      <select id="c-size" defaultValue="">
                        <option value="" disabled>בחרו טווח</option>
                        <option>עד 10 עובדים</option>
                        <option>10–50 עובדים</option>
                        <option>50–150 עובדים</option>
                        <option>150+ עובדים</option>
                      </select>
                    </div>
                    <div className="field field-wide">
                      <label htmlFor="c-topic">באיזה שירות אתם מתעניינים?</label>
                      <select id="c-topic" defaultValue="">
                        <option value="" disabled>בחרו נושא</option>
                        {servicesData.map((s) => <option key={s.id}>{s.title}</option>)}
                        <option>אחר / ייעוץ כללי</option>
                      </select>
                    </div>
                    <div className="field field-wide">
                      <label htmlFor="c-msg">תיאור הפנייה (אופציונלי)</label>
                      <textarea id="c-msg" placeholder="ספרו לנו בקצרה על הסביבה הקיימת ועל מה שחשוב לכם לשפר" />
                    </div>
                  </div>

                  <div className="contact-submit-row">
                    <label className="contact-consent">
                      <input type="checkbox" required />
                      <span>אני מאשר/ת שימוש בפרטים שמסרתי לצורך יצירת קשר בהתאם למדיניות הפרטיות.</span>
                    </label>

                    <button type="submit" className="btn btn-cyan contact-band-submit">
                      <Send style={{ width: 18, height: 18 }} />
                      כן, תחזרו אליי בהקדם!
                    </button>
                  </div>

                  <p className="contact-band-note">
                    או התקשרו ישירות: <a href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a>
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
            <Logo variant="dark" style={{ fontSize: 26, marginBottom: 14 }} />
            <p style={{ color: 'rgba(255,255,255,0.66)', fontSize: '0.94rem', lineHeight: 1.75 }}>
              פתרונות אבטחת מידע, סייבר ותשתיות ענן מתקדמות לעסקים בישראל.
              ספק IT מנוהל אחד לכל מה שהארגון צריך. make IT easy.
            </p>

            <div className="footer-social">
              <a href="#top" aria-label="LinkedIn"><Linkedin /></a>
              <a href="#top" aria-label="Facebook"><Facebook /></a>
              <a href={`https://wa.me/972${PHONE_TEL.slice(1)}`} aria-label="WhatsApp"><MessageCircle /></a>
              <a href="mailto:contact@secureops.co.il" aria-label="Email"><Mail /></a>
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
              <span>contact@secureops.co.il</span>
            </p>
            <p style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Phone style={{ width: 16, height: 16, color: 'var(--cyan-accent)', flexShrink: 0 }} />
              <a href={`tel:${PHONE_TEL}`} style={{ margin: 0, direction: 'ltr' }}>{PHONE_DISPLAY}</a>
            </p>
            <p style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <MapPin style={{ width: 16, height: 16, color: 'var(--cyan-accent)', flexShrink: 0 }} />
              <span>מגדלי עזריאלי, תל אביב</span>
            </p>
            <p style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Building2 style={{ width: 16, height: 16, color: 'var(--cyan-accent)', flexShrink: 0 }} />
              <span>ח.פ. 51-000000-0</span>
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
