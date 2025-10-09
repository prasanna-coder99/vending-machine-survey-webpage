import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      heading: "NAF - Medicine Vending Machine Questionnaire",
      paragraphs: {
      intro1: "We are planning to bring medicine vending machines to your area. These are special machines where you can talk to a real doctor through video or audio call, and the doctor will help you get the medicine you need. The machine will be available 24/7, so you can get help even when pharmacies are closed. We want to know what you think about this idea and how we can make it work better for you.",
      intro2: "Please take a few minutes to answer this survey. Your answers will help us understand what medicines you need, where to place these machines, and how to make them safe and easy to use. This is completely anonymous, and your honest feedback will help us serve you better. Thank you for your time!"
    },
      selectLanguage: "Select Language",
      formSubmitted: "✅ Thank you! Your survey has been submitted.",
      next: "Next",
      back: "Back",
      submit: "Submit",
      
      // --- NEW: Language Selector Text ---
      langEnglish: "English",
      langMoroccan: "Moroccan (Darija)",
      otherOptionLabel: "Other:",
      pleaseSpecifyPlaceholder: "Please specify",
      enterHerePlaceholder: "Enter here",
      
      // --- NEW: Section Titles ---
      sections: {
        a: "A: About You",
        b: "B: Getting Medicines Now",
        c: "C: Would You Use This Machine?",
        d: "D: Talking to a Doctor",
        e: "E: What Should Be Available?",
        f: "F: Where Should We Put These Machines?",
        g: "G: Safety and Trust",
        h: "H: Your Thoughts",
        i: "I: Stay in Touch",
      },

      // --- Validation Keys ---
      validation: {
        required: "This field is required.",
        atLeastOne: "Please select at least one option.",
        emailInvalid: "Please enter a valid email address.",
        phoneInvalid: "Please enter a valid phone number.",
        nameRequired: "Name is required to reply",
      },

      // --- Questions (Key is q# for easy mapping) ---
      questions: {
        q1: "1. How old are you?",
        q2: "2. Gender:",
        q3: "3. What do you do?",
        q4: "4. Have you heard about medicine vending machines before?",
        q5: "5. How often do you buy medicines?",
        q6: "6. Have you ever needed medicine when the pharmacy was closed?",
        q7: "7. Is there a pharmacy close to your home or work (within 2 km)?",
        q8: "8. Are pharmacy hours convenient for you?",
        q9: "9. If we put a medicine vending machine near you, would you use it?",
        q10: "10. Would you feel okay buying medicine from a machine?",
        q11: "11. Have you used any vending machine before (for snacks, drinks, etc.)?",
        q12: "12. Would you trust buying medicine from a vending machine?",
        q13: "13. When would you use this machine? (You can choose more than one)",
        q14: "14. This machine will let you talk to a real doctor through video/audio before giving you medicine. Would you be comfortable with this?",
        q15: "15. How important is privacy when talking to the doctor?",
        q16: "16. How long would you wait for a doctor to be available?",
        q17: "17. Would you trust a doctor you talk to through this machine?",
        q18: "18. What medicines or items would you want in the machine? (Pick your top 3)",
        q19: "19. How important is it to get medicine anytime (24/7)?",
        q20: "20. Where would these machines be most useful for you? (Pick your top 2)",
        q21: "21. How far would you walk to use this machine when you really need it?",
        q22: "22. Are you worried about getting fake or expired medicine from a vending machine?",
        q23: "23. Would you trust the machine if it's run by a licensed pharmacy?",
        q24: "24. Would it help if you could see temperature control and safety certificates on the machine?",
        q25: "25. Should there be a phone number on the machine for help?",
        q26: "26. How would you like instructions on using the machine?",
        q27: "27. What language would you prefer? (You can choose more than one)",
        q28: "28. Would you recommend putting these machines in your area?",
        q29: "29. Should prescription medicines be available after doctor approval?",
        q30: "30. What worries you most about these machines?",
        q31: "31. Any other comments or suggestions?",
        q32: "32. Would you like to try this service when we launch it in your area?",
        q33: "33. Your Name:",
        q34: "34. Phone Number:",
        q35: "35. Email (if you have one):",
        q36: "36. Which city/town do you live in?",
        q37: "37. Which neighborhood/area?",
        q38: "38. Would you be willing to pay a small extra charge (5–10%) to access medicines and health products 24/7?",
        q39: "39. What price range do you find reasonable for common medicines (e.g., painkillers, vitamins)?",
        q40: "40. Would you trust a medical vending machine supervised by a licensed pharmacy or doctor?",
        q41: "41. Would you trust a vending machine that dispenses medicines via an app or QR code if the packaging is sealed and verified?",
},

      },

      // --- Options (Defined by Question Key and sanitized option value) ---
      options: {
        q1: { under18: "Under 18", "1825": "18–25", "2640": "26–40", "4160": "41–60", over60: "Over 60" },
        q2: { male: "Male", female: "Female", prefernottosay: "Prefer not to say" },
        q3: { student: "Student", haveajob: "Have a job", workinhealthcare: "Work in healthcare", runmyownbusiness: "Run my own business", retiredstayathome: "Retired/Stay at home" },
        q4: { yes: "Yes", no: "No" },
        q5: { everyweek: "Every week", everymonth: "Every month", every23months: "Every 2–3 months", notoften: "Not often" },
        q6: { yes: "Yes", no: "No" },
        q7: { yes: "Yes", no: "No" },
        q8: { yes: "Yes", no: "No" },
        q9: { yesdefinitely: "Yes, definitely", maybe: "Maybe", no: "No" },
        q10: { yes: "Yes", no: "No", maybe: "Maybe" },
        q11: { yes: "Yes", no: "No" },
        q12: { yes: "Yes", no: "No", onlyifapprovedbyhealthauthorities: "Only if approved by health authorities" },
        q13: { inemergencies: "In emergencies", whenpharmaciesareclosed: "When pharmacies are closed", duringworkhours: "During work hours", forpersonalprivatepurchases: "For personal/private purchases" },
        q14: { yesverycomfortable: "Yes, very comfortable", alittlecomfortable: "A little comfortable", notcomfortable: "Not comfortable", ineedtoknowmore: "I need to know more" },
        q15: { veryimportant: "Very important", important: "Important", doesntmattermuch: "Doesn't matter much", notimportant: "Not important" },
        q16: { upto5minutes: "Up to 5 minutes", "510minutes": "5-10 minutes", "1020minutes": "10-20 minutes", morethan20minutes: "More than 20 minutes", iwouldntwait: "I wouldn't wait" },
        q17: { yessameasmeetinginperson: "Yes, same as meeting in person", onlyforsmallhealthproblems: "Only for small health problems", noiprefermeetingfacetoface: "No, I prefer meeting face-to-face", dependsonthesituation: "Depends on the situation" },
        q18: { painrelieversfevermedicine: "Pain relievers / Fever medicine", coldcoughflumedicine: "Cold, cough, flu medicine", bandagesantisepticsfirstaiditems: "Bandages, antiseptics, first aid items", sanitarypadsandhygieneproducts: "Sanitary pads and hygiene products", vitaminsandsupplements: "Vitamins and supplements", covidhealthtestkits: "COVID / Health test kits", contraceptivesandpregnancytests: "Contraceptives and pregnancy tests", prescriptionmedicines: "Prescription medicines", other: "Other" },
        q19: { veryimportant: "Very important", important: "Important", neutral: "Neutral", notimportant: "Not important" },
        q20: { hospitalsclinics: "Hospitals / Clinics", busortrainstations: "Bus or train stations", officebuildings: "Office buildings", shoppingmalls: "Shopping malls", schoolsuniversities: "Schools / Universities", apartmentbuildings: "Apartment buildings", publicplaces: "Public places", villagesorremoteareas: "Villages or remote areas" },
        q21: { within5minutes: "Within 5 minutes", "510minutes": "5–10 minutes", "1015minutes": "10–15 minutes", iwouldntuseit: "I wouldn't use it" },
        q22: { veryworried: "Very worried", alittleworried: "A little worried", notworried: "Not worried" },
        q23: { yes: "Yes", no: "No", needmoreinformation: "Need more information" },
        q24: { yes: "Yes", no: "No" },
        q25: { yes: "Yes", no: "No" },
        q26: { voiceinstructions: "Voice instructions", writtenonscreen: "Written on screen", both: "Both", dontneedinstructions: "Don't need instructions" },
        q27: { arabic: "Arabic", darija: "Darija", french: "French", english: "English", other: "Other" },
        q28: { yes: "Yes", no: "No", maybe: "Maybe" },
        q29: { yes: "Yes", no: "No", onlyforrefills: "Only for refills" },
        q30: { medicinequalityandsafety: "Medicine quality and safety", nothavingadoctornearbytoaskquestions: "Not having a doctor nearby to ask questions", privacywhentalkingtodoctor: "Privacy when talking to doctor", machinemightnotworkproperly: "Machine might not work properly", nothingworriesme: "Nothing worries me" },
        q32: { yesiminterested: "Yes, I'm interested", no: "No", maybe: "Maybe" },
      },
    },
  

  // Moroccan Arabic (Darija)
  ma: {
    translation: {
      heading: "ناڤ - استبيان آلة بيع الأدوية",
       paragraphs: {
      intro1: "كنخططو نجيبو آلات بيع الأدوية للمنطقة ديالك. هادو آلات خاصة فين تقدر تهضر مع طبيب حقيقي بالفيديو أو الصوت...",
      intro2: "يرجى أخذ بضع دقائق للإجابة على هذا الاستبيان. إجاباتك ستساعدنا على معرفة الأدوية التي تحتاجها، وأين نضع هذه الآلات، وكيفية جعلها آمنة وسهلة الاستخدام..."
    },
      selectLanguage: "اختر اللغة",
      formSubmitted: "✅ شكراً! تم إرسال الاستبيان بنجاح.",
      next: "التالي",
      back: "السابق",
      submit: "إرسال",
      
      // --- NEW: Language Selector Text ---
      langEnglish: "الإنجليزية",
      langMoroccan: "الدارجة المغربية",
      otherOptionLabel: "أخرى:",
      pleaseSpecifyPlaceholder: "يرجى التحديد",
      enterHerePlaceholder: "أدخل هنا",

      // --- NEW: Section Titles ---
      sections: {
        a: "أ: معلومات عنك",
        b: "ب: الحصول على الأدوية حاليًا",
        c: "ج: هل ستستعمل هذه الآلة؟",
        d: "د: التحدث مع الطبيب",
        e: "هـ: ماذا يجب أن يتوفر؟",
        f: "و: أين يجب وضع هذه الآلات؟",
        g: "ز: السلامة والثقة",
        h: "ح: أفكارك",
        i: "ط: ابق على اتصال",
      },
      
      // --- Validation Keys ---
      validation: {
        required: "هاد الحقل ضروري.",
        atLeastOne: "عفاك اختار على الأقل خيار واحد.",
        emailInvalid: "عفاك دخل إيميل صحيح.",
        phoneInvalid: "عفاك دخل رقم هاتف صحيح.",
        nameRequired: "الاسم ضروري للرد",
      },
      
      // --- Questions (Key is q# for easy mapping) ---
      questions: {
        q1: "1. شحال فعمرك؟",
        q2: "2. الجنس:",
        q3: "3. شنو كتدير؟",
        q4: "4. واش سبق ليك سمعت بآلات بيع الأدوية؟",
        q5: "5. كل شحال كتشتري الأدوية؟",
        q6: "6. واش سبق ليك احتاجتي دوا والصيدلية كانت مسدودة؟",
        q7: "7. واش كاينة صيدلية قريبة منك (ضمن 2 كم)؟",
        q8: "8. واش أوقات الصيدلية مناسبة لك؟",
        q9: "9. إلا درنا آلة قريبة منك، واش غتستعملها؟",
        q10: "10. واش مرتاح تشري دوا من آلة؟",
        q11: "11. واش سبق ليك استعملتي ماكينة بيع؟",
        q12: "12. واش تتيق تشري دوا من آلة بيع؟",
        q13: "13. وقتاش غتستعمل هاد الآلة؟ (تقدر تختار أكثر من جواب)",
        q14: "14. واش مرتاح أن تهضر مع طبيب عبر الفيديو/الصوت؟",
        q15: "15. شحال مهمة الخصوصية ملي تهضر مع الطبيب؟",
        q16: "16. شحال تقدر تسنى الطبيب؟",
        q17: "17. واش تتيق ف الطبيب لي ف الآلة؟",
        q18: "18. شنو بغيتي يكون فالآلة؟ (اختار 3)",
        q19: "19. شحال مهمة الخدمة 24/7 بالنسبة ليك؟",
        q20: "20. فين هاد الآلات غتكون مفيدة؟ (اختار 2)",
        q21: "21. شحال تقد تمشي باش توصل للآلة إلا كنت ف حاجة ماسة؟",
        q22: "22. واش خايف من دوا مزور أو منتهي؟",
        q23: "23. واش تتيق إلا كانت تابعة لصيدلية مرخصة؟",
        q24: "24. واش غيعونك إلا شفتي تحكم فالحرارة وشواهد السلامة؟",
        q25: "25. واش خاص رقم هاتف على الآلة للمساعدة؟",
        q26: "26. كيفاش بغيتي التعليمات؟",
        q27: "27. شنو اللغة لي كتفضل؟ (تقدر تختار أكثر من وحدة)",
        q28: "28. واش تنصح نحطو هاد الآلات ف منطقتك؟",
        q29: "29. واش خاص الأدوية بوصفة الطبيب تكون متوفرة؟",
        q30: "30. شنو أكثر حاجة كتخوفك؟",
        q31: "31. شي تعليق أو اقتراح؟",
        q32: "32. واش بغيتي تجرب الخدمة مني تنطلق؟",
        q33: "33. الاسم ديالك:",
        q34: "34. رقم الهاتف:",
        q35: "35. الإيميل (إلا عندك):",
        q36: "36. شنو المدينة/البلدة لي ساكن فيها؟",
        q37: "37. شنو الحي/المنطقة؟",
        q38: "38. واش مستعد/ة تخلص شوية زيادة (5–10%) باش توصل للأدوية والمنتوجات الصحية 24/7؟",
        q39: "39. شنو النطاق السعري لي كتشوف معقول للأدوية العادية (بحال مسكنات الألم، الفيتامينات)؟",
        q40: "40. واش تتيق ف آلة بيع الأدوية لي تحت إشراف صيدلية مرخصة أو طبيب؟",
        q41: "41. واش تتيق ف آلة بيع الأدوية لي كتوزع الدوا عبر تطبيق أو QR code إلا كانت العلبة مختومة ومحققة؟",
      },

      // --- Options (Defined by Question Key and sanitized option value) ---
      options: {
        q1: { under18: "أقل من 18 سنة", "1825": "18–25 سنة", "2640": "26–40 سنة", "4160": "41–60 سنة", over60: "أكثر من 60 سنة" },
        q2: { male: "ذكر", female: "أنثى", prefernottosay: "ما بغيتش نجاوب" },
        q3: { student: "طالب/طالبة", haveajob: "خدام/خدامة", workinhealthcare: "خدام/خدامة ف قطاع الصحة", runmyownbusiness: "عندي عمل خاص", retiredstayathome: "متقاعد/مربّي الدار" },
        q4: { yes: "نعم", no: "لا" },
        q5: { everyweek: "كل أسبوع", everymonth: "كل شهر", every23months: "كل 2-3 شهور", notoften: "نادراً" },
        q6: { yes: "نعم", no: "لا" },
        q7: { yes: "نعم", no: "لا" },
        q8: { yes: "نعم", no: "لا" },
        q9: { yesdefinitely: "نعم، أكيد", maybe: "يمكن", no: "لا" },
        q10: { yes: "نعم", no: "لا", maybe: "يمكن" },
        q11: { yes: "نعم", no: "لا" },
        q12: { yes: "نعم", no: "لا", onlyifapprovedbyhealthauthorities: "غير إلا كانت معتمدة" },
        q13: { inemergencies: "فحالات الطوارئ", whenpharmaciesareclosed: "ملي يكونو الصيدليات مسدودين", duringworkhours: "وقت العمل", forpersonalprivatepurchases: "لمعاملات خاصة" },
        q14: { yesverycomfortable: "مرتاح بزاف", alittlecomfortable: "مرتاح شوية", notcomfortable: "ماشي مرتاح", ineedtoknowmore: "باغي نعرف أكثر" },
        q15: { veryimportant: "مهم بزاف", important: "مهم", doesntmattermuch: "ماشي مهم بزاف", notimportant: "ماشي مهم" },
        q16: { upto5minutes: "حتى 5 دقايق", "510minutes": "5-10 دقايق", "1020minutes": "10-20 دقايق", morethan20minutes: "أكثر من 20 دقيقة", iwouldntwait: "ما نستناش" },
        q17: { yessameasmeetinginperson: "نعم، بحال اللقاء المباشر", onlyforsmallhealthproblems: "غير للمشاكل الصحية الصغيرة", noiprefermeetingfacetoface: "لا، كنفضل اللقاء الوجهي", dependsonthesituation: "على حسب الحالة" },
        q18: { painrelieversfevermedicine: "مسكنات الألم / خافض الحرارة", coldcoughflumedicine: "أدوية البرد والسعال والزكام", bandagesantisepticsfirstaiditems: "لاصقات، مطهرات، مواد إسعاف أولي", sanitarypadsandhygieneproducts: "فوط صحية ومنتوجات النظافة", vitaminsandsupplements: "فيتامينات ومكملات غذائية", covidhealthtestkits: "أطقم اختبار كوفيد / صحية", contraceptivesandpregnancytests: "وسائل منع الحمل واختبارات الحمل", prescriptionmedicines: "أدوية بوصفة طبية", other: "أخرى" },
        q19: { veryimportant: "مهم بزاف", important: "مهم", neutral: "محايد", notimportant: "ماشي مهم" },
        q20: { hospitalsclinics: "المستشفيات / العيادات", busortrainstations: "محطات الحافلات أو القطار", officebuildings: "مباني المكاتب", shoppingmalls: "المراكز التجارية (المولات)", schoolsuniversities: "المدارس / الجامعات", apartmentbuildings: "مباني السكن", publicplaces: "الأماكن العامة", villagesorremoteareas: "القرى أو المناطق النائية" },
        q21: { within5minutes: "فـ 5 دقايق", "510minutes": "5–10 دقايق", "1015minutes": "10–15 دقايق", iwouldntuseit: "ما غنستعملهاش" },
        q22: { veryworried: "خايف بزاف", alittleworried: "خايف شوية", notworried: "ماشي خايف" },
        q23: { yes: "نعم", no: "لا", needmoreinformation: "خاصني معلومات أكثر" },
        q24: { yes: "نعم", no: "لا" },
        q25: { yes: "نعم", no: "لا" },
        q26: { voiceinstructions: "تعليمات صوتية", writtenonscreen: "مكتوبة فالشاشة", both: "بجوج", dontneedinstructions: "ما خاصنيش تعليمات" },
        q27: { arabic: "العربية", darija: "الدارجة", french: "الفرنسية", english: "الإنجليزية", other: "أخرى" },
        q28: { yes: "نعم", no: "لا", maybe: "يمكن" },
        q29: { yes: "نعم", no: "لا", onlyforrefills: "غير لتعويض الوصفات القديمة" },
        q30: { medicinequalityandsafety: "جودة وسلامة الدواء", nothavingadoctornearbytoaskquestions: "ما كاينش طبيب قريب نسولو", privacywhentalkingtodoctor: "الخصوصية ملي كنهضر مع الطبيب", machinemightnotworkproperly: "الآلة تقدر ما تخدمش مزيان", nothingworriesme: "ما كيخوفني والو" },
        q32: { yesiminterested: "نعم، أنا مهتم/مهتمة", no: "لا", maybe: "يمكن" },
      },
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", 
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;