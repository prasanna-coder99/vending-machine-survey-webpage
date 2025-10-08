import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      heading: "Medicine Vending Machine Questionnaire",
      description: "This is a smart vending machine that provides medicines quickly and safely.",
      selectLanguage: "Select Language",
      name: "Name",
      email: "Email Address",
      submit: "Submit",

      // ✅ Validation messages
      nameRequired: "Please enter your name.",
      emailRequired: "Please enter your email.",
      emailInvalid: "Please enter a valid email address.",
      concernsRequired: "Please select at least one concern.",
      recommendRequired: "Please select a recommendation option.",
      suggestionRequired: "Please enter your suggestion.",
      formSubmitted: "Thank you! Your response has been submitted successfully.",

      // ✅ Survey Questions
      concernsQuestion: "What are your main concerns about medicine vending machines?",
      concernsOptions: {
        wrongMedicine: "Wrong medicine dispensed",
        expired: "Expired products",
        noSupport: "Lack of support/help",
        highPrice: "High prices",
        privacy: "Privacy issues"
      },
      recommendQuestion: "How likely are you to recommend medicine vending machines to others?",
      recommendOptions: {
        veryLikely: "Very likely",
        somewhatLikely: "Somewhat likely",
        notLikely: "Not likely"
      },
      suggestionsQuestion: "Do you have any suggestions for improving the idea of medicine vending machines?"
    }
  },

  ma: {
    translation: {
      heading: "آلة بيع الأدوية",
      description: "هذه آلة بيع ذكية توفر الأدوية بسرعة وأمان.",
      selectLanguage: "اختر اللغة",
      name: "الاسم",
      email: "عنوان البريد الإلكتروني",
      submit: "إرسال",

      // ✅ Validation messages (Darija)
      nameRequired: "عفاك دخل الإسم ديالك.",
      emailRequired: "عفاك دخل الإيميل ديالك.",
      emailInvalid: "الإيميل اللي دخلتي ماشي صحيح.",
      concernsRequired: "عفاك اختار على الأقل مشكل واحد.",
      recommendRequired: "عفاك اختار واش غادي توصي بالماكينة ولا لا.",
      suggestionRequired: "عفاك كتب الإقتراح ديالك.",
      formSubmitted: "شكراً! جاوبتك تسيفطات بنجاح.",

      // ✅ Survey Questions (Darija)
      concernsQuestion: "شنو هما أكبر المخاوف ديالك من ماكينات البيع ديال الدوا؟",
      concernsOptions: {
        wrongMedicine: "يعطيو دوا غالط",
        expired: "المنتجات منتهية الصلاحية",
        noSupport: "ما كاينش مساعدة / دعم",
        highPrice: "الأثمان مرتفعة",
        privacy: "مشاكل ديال الخصوصية"
      },
      recommendQuestion: "شحال كتجيك محتمل توصّي الناس بهاد الماكينات؟",
      recommendOptions: {
        veryLikely: "محتمل بزاف",
        somewhatLikely: "شوية محتمل",
        notLikely: "ماشي محتمل"
      },
      suggestionsQuestion: "عندك شي اقتراحات باش نحسّنو الفكرة ديال ماكينات بيع الدوا؟"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
