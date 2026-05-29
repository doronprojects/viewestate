/* ============================================================
   ViewEstate — מקור הנתונים המרכזי של האתר
   ------------------------------------------------------------
   זהו הקובץ היחיד שצריך לערוך כדי לעדכן נכסים ופרטי קשר.
   ניתן לערוך אותו ידנית, או דרך דף הניהול admin.html
   (שמייצא קובץ data.js מעודכן להורדה).

   טוען דרך <script src="data.js"> כך שהוא עובד גם מקומית
   (file://) וגם באתר חי — בלי צורך בשרת.
   ============================================================ */

window.VIEWESTATE_DATA = {

  /* ---- פרטי המתווך / המותג ---- */
  agent: {
    name:     "דורון",
    role:     "מתווך נכסים מוסמך",
    phone:    "0502448682",          // לתצוגה ולחיוג
    whatsapp: "972502448682",        // פורמט בינלאומי ל-wa.me
    email:    "",                    // אופציונלי
    photo:    "doron.jpg",
    site:     "viewestate.co.il",
    brand:    "ViewEstate"
  },

  /* ---- סטטיסטיקות (דף הבית) ---- */
  stats: [
    { num: "4K",   label: "וידאו מקצועי לכל נכס" },
    { num: "QR",   label: "שיווק חכם וחדשני" },
    { num: "VIP",  label: "הצגה יוקרתית" },
    { num: "100%", label: "יחס אישי ומחויבות" }
  ],

  /* ---- המלצות לקוחות (דף הבית) ---- */
  testimonials: [
    {
      stars: 5,
      text:  "הסרטון שדורון הכין לדירה שלנו גרם לה להיראות כמו פנטהאוז. קיבלנו 4 הצעות רציניות תוך שבועיים.",
      name:  "מיכל ואורי כ.",
      role:  "מוכרים, תל אביב"
    },
    {
      stars: 5,
      text:  "הגעתי לדירה אחרי שסרקתי את ה-QR מהשלט במרפסת. הוידאו מכר לי אותה עוד לפני שנכנסתי.",
      name:  "גיל ט.",
      role:  "קונה, הרצליה"
    },
    {
      stars: 5,
      text:  "הייתי סקפטי אם הוידאו שווה את ההשקעה. הנכס נמכר ב-200,000 ₪ יותר ממה שציפיתי. מדבר בעד עצמו.",
      name:  "יוסי א.",
      role:  "מוכר, ירושלים"
    }
  ],

  /* ============================================================
     נכסים
     ------------------------------------------------------------
     כל נכס:
       id          — מזהה ייחודי באנגלית (משמש ב-URL: property.html?id=...)
       featured    — true = כרטיס גדול בראש הרשת בדף הבית
       saleStatus  — סטטוס מכירה: "sale" (למכירה) / "negotiation" (במשא ומתן) / "sold" (נמכר)
       status      — טקסט תווית ישן (לא בשימוש לתצוגה — saleStatus מחליף אותו)
       type        — סוג הנכס (פנטהאוז / וילה / דירת גן ...)
       name        — שם הנכס לתצוגה
       city, neighborhood
       price       — מספר (₪), יוצג עם פסיקים אוטומטית
       rooms, area, floor, floorsTotal, balcony, parking, year
       elevator, storage, condition  — טקסט חופשי לטבלת המפרט
       video       — קישור לסרטון mp4 (אפשר להשאיר ריק לשימוש בתמונה בלבד)
       poster      — תמונת רקע לסרטון / כרטיס
       gallery     — מערך קישורי תמונות (הראשונה = ראשית)
       description — תיאור הנכס
     ============================================================ */
  properties: [
    {
      id:           "rothschild-22",
      featured:     true,
      saleStatus:   "sale",
      status:       "נכס זמין למכירה",
      type:         "פנטהאוז",
      name:         "פנטהאוז רוטשילד 22",
      city:         "תל אביב",
      neighborhood: "רוטשילד",
      price:        4800000,
      rooms:        5,
      area:         160,
      floor:        12,
      floorsTotal:  14,
      balcony:      40,
      parking:      2,
      year:         2019,
      elevator:     "כן",
      storage:      "כן",
      condition:    "מחודש 2024",
      video:        "https://videos.pexels.com/video-files/3196787/3196787-hd_1920_1080_30fps.mp4",
      poster:       "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=85",
      gallery: [
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1400&q=85",
        "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=900&q=80",
        "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=900&q=80",
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=900&q=80",
        "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=900&q=80",
        "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=900&q=80",
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=900&q=80"
      ],
      description:
        "פנטהאוז מרהיב בלב רוטשילד, תל אביב. קומה 12 עם נוף פנורמי לעיר ולים התיכון. " +
        "הנכס עוצב ברמה גבוהה עם חומרים מהמשובחים — אבן, עץ אקזוטי, ומתכת מוסגרת. " +
        "הסלון המרווח זורם לטראסה ענקית של 40 מ\"ר, מושלמת לבידור. " +
        "מטבח אמריקאי מאובזר ב-Gaggenau. שלושה חדרי שינה עם חדרי רחצה en-suite. " +
        "מחסן, חניון כפול, ומשרת בית."
    },
    {
      id:           "herzliya-gold",
      featured:     false,
      saleStatus:   "negotiation",
      status:       "נכס זמין למכירה",
      type:         "וילה",
      name:         "וילה בשכונת הזהב",
      city:         "הרצליה פיתוח",
      neighborhood: "שכונת הזהב",
      price:        7200000,
      rooms:        7,
      area:         320,
      floor:        0,
      floorsTotal:  2,
      balcony:      0,
      parking:      3,
      year:         2016,
      elevator:     "לא",
      storage:      "כן",
      condition:    "מצוין",
      video:        "",
      poster:       "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1400&q=85",
      gallery: [
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1400&q=85",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80",
        "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=900&q=80",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900&q=80"
      ],
      description:
        "וילה יוקרתית בשכונת הזהב בהרצליה פיתוח. 320 מ\"ר בנוי על מגרש מרווח, " +
        "7 חדרים, בריכה פרטית וגינה מעוצבת. תכנון אדריכלי מוקפד, חללים פתוחים ומוצפי אור."
    },
    {
      id:           "tlv-garden",
      featured:     false,
      saleStatus:   "sold",
      status:       "נכס זמין למכירה",
      type:         "דירת גן",
      name:         "גן פרטי בלב העיר",
      city:         "תל אביב",
      neighborhood: "לב העיר",
      price:        3900000,
      rooms:        4,
      area:         130,
      floor:        0,
      floorsTotal:  4,
      balcony:      0,
      parking:      1,
      year:         2012,
      elevator:     "לא",
      storage:      "כן",
      condition:    "משופץ",
      video:        "",
      poster:       "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&q=85",
      gallery: [
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&q=85",
        "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=900&q=80",
        "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=900&q=80",
        "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=900&q=80"
      ],
      description:
        "דירת גן ייחודית בלב תל אביב עם גינה פרטית ירוקה. 4 חדרים, 130 מ\"ר, " +
        "מיקום מנצח במרחק הליכה מהכל. שילוב נדיר של שקט עירוני ופרטיות."
    }
  ]
};
