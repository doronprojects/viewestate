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
    name_en:  "Doron",
    role:     "מתווך נכסים מוסמך",
    role_en:  "Licensed Real-Estate Agent",
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
      name_en:         "Rothschild 22 Penthouse",
      type_en:         "Penthouse",
      city:         "תל אביב",
      city_en:         "Tel Aviv",
      neighborhood: "רוטשילד",
      neighborhood_en: "Rothschild",
      condition_en:    "Renovated 2024",
      areaInfo:
        "שדרות רוטשילד הן לב ליבה של תל אביב — שדרה ירוקה היסטורית המשלבת אדריכלות באוהאוס לצד מגדלים מודרניים. במרחק הליכה: בתי קפה, מסעדות שף, גלריות והתיאטרון הקאמרי. תחבורה ציבורית מצוינת וקרבה לים ולמרכזי העסקים של העיר.",
      areaInfo_en:
        "Rothschild Boulevard is the very heart of Tel Aviv — a historic green avenue blending Bauhaus architecture with modern towers. Within walking distance: cafés, chef restaurants, galleries and the Cameri Theatre. Excellent public transport, close to the beach and the city's business hubs.",
      description_en:
        "A stunning penthouse in the heart of Rothschild, Tel Aviv. 12th floor with panoramic views over the city and the Mediterranean. Finished to a high standard with the finest materials — stone, exotic wood and framed metal. The spacious living room flows onto a huge 40 sqm terrace, perfect for entertaining. American kitchen equipped by Gaggenau. Three en-suite bedrooms. Storage, double parking and a service room.",
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
      video:        "",
      poster:       "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1400&q=85",
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
      name_en:         "Villa in the Gold Quarter",
      type_en:         "Villa",
      city:         "הרצליה פיתוח",
      city_en:         "Herzliya Pituach",
      neighborhood: "שכונת הזהב",
      neighborhood_en: "Gold Quarter",
      condition_en:    "Excellent",
      areaInfo:
        "שכונת הזהב בהרצליה פיתוח היא מהיוקרתיות בישראל — רחובות שקטים, בתים פרטיים מרווחים וקרבה לחופי הים. אזור מבוקש למשפחות ולאנשי עסקים, עם בתי ספר מובילים, מרינה, מלונות יוקרה ומרכזי קניות במרחק נסיעה קצר.",
      areaInfo_en:
        "The Gold Quarter in Herzliya Pituach is among Israel's most prestigious neighborhoods — quiet streets, spacious private homes and proximity to the beaches. A sought-after area for families and professionals, with leading schools, a marina, luxury hotels and shopping centers a short drive away.",
      description_en:
        "A luxurious villa in the Gold Quarter of Herzliya Pituach. 320 sqm built on a spacious plot, 7 rooms, a private pool and a landscaped garden. Meticulous architectural design with open, light-filled spaces.",
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
      video:        "videos/hero-hd.mp4",
      poster:       "videos/hero-poster.jpg",
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
      name_en:         "Private Garden in the City Center",
      type_en:         "Garden Apartment",
      city:         "תל אביב",
      city_en:         "Tel Aviv",
      neighborhood: "לב העיר",
      neighborhood_en: "City Center",
      condition_en:    "Renovated",
      areaInfo:
        "לב העיר תל אביב — שילוב של רחובות עירוניים תוססים עם פינות שקטות וירוקות. במרחק הליכה: שוק, בתי קפה, תחבורה ציבורית ומוסדות תרבות. מיקום מרכזי שמאפשר לחיות את העיר בלי רכב.",
      areaInfo_en:
        "Tel Aviv city center — a mix of lively urban streets with quiet, green corners. Within walking distance: a market, cafés, public transport and cultural institutions. A central location that lets you live the city without a car.",
      description_en:
        "A unique garden apartment in the heart of Tel Aviv with a private green garden. 4 rooms, 130 sqm, a winning location within walking distance of everything. A rare blend of urban calm and privacy.",
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
