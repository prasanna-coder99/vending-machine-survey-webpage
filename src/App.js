import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "./i18n"; 

// The sections are now just keys, not the full English titles
const sectionKeys = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
];
{/*Survey questions */}
const surveyQuestions = {
  "A: About You": [
    { key: "age", type: "radio", questionKey: "questions.q1", options: ["Under 18", "18-25", "26-40", "41-60", "Over 60"], required: true },
    { key: "gender", type: "radio", questionKey: "questions.q2", options: ["Male", "Female", "Prefer not to say"], required: true },
    { key: "occupation", type: "radioOther", questionKey: "questions.q3", options: ["Student", "Have a job", "Work in healthcare", "Run my own business", "Retired/Stay at home"], required: true },
  ],
  "B: Getting Medicines Now": [
    { key: "heardMachine", type: "radio", questionKey: "questions.q4", options: ["Yes", "No"], required: true },
    { key: "buyFrequency", type: "radio", questionKey: "questions.q5", options: ["Every week", "Every month", "Every 2–3 months", "Not often"], required: true },
    { key: "neededWhenClosed", type: "radio", questionKey: "questions.q6", options: ["Yes", "No"], required: true },
    { key: "pharmacyClose", type: "radio", questionKey: "questions.q7", options: ["Yes", "No"], required: true },
    { key: "pharmacyHours", type: "radio", questionKey: "questions.q8", options: ["Yes", "No"], required: true },
  ],
  "C: Would You Use This Machine?": [
    { key: "useMachine", type: "radio", questionKey: "questions.q9", options: ["Yes, definitely", "Maybe", "No"], required: true },
    { key: "feelBuying", type: "radio", questionKey: "questions.q10", options: ["Yes", "No", "Maybe"], required: true },
    { key: "usedVending", type: "radio", questionKey: "questions.q11", options: ["Yes", "No"], required: true },
    { key: "trustMachine", type: "radio", questionKey: "questions.q12", options: ["Yes", "No", "Only if approved by health authorities"], required: true },
    {
      key: "whenUseMachine", 
      type: "checkbox",
      questionKey: "questions.q13",
      options: ["In emergencies", "When pharmacies are closed", "During work hours", "For personal/private purchases"],
      required: true,
    },
  ],
  "D: Talking to a Doctor": [
    { key: "comfortableVideo", type: "radio", questionKey: "questions.q14", options: ["Yes, very comfortable", "A little comfortable", "Not comfortable", "I need to know more"], required: true },
    { key: "privacyImportance", type: "radio", questionKey: "questions.q15", options: ["Very important", "Important", "Doesn't matter much", "Not important"], required: true },
    { key: "waitTime", type: "radio", questionKey: "questions.q16", options: ["Up to 5 minutes", "5-10 minutes", "10-20 minutes", "More than 20 minutes", "I wouldn't wait"], required: true },
    { key: "trustDoctor", type: "radio", questionKey: "questions.q17", options: ["Yes, same as meeting in person", "Only for small health problems", "No, I prefer meeting face-to-face", "Depends on the situation"], required: true },
  ],
  "E: What Should Be Available?": [
    { key: "itemsWanted", type: "checkbox", questionKey: "questions.q18", options: ["Pain relievers / Fever medicine", "Cold, cough, flu medicine", "Bandages, antiseptics, first aid items", "Sanitary pads and hygiene products", "Vitamins and supplements", "COVID / Health test kits", "Contraceptives and pregnancy tests", "Prescription medicines", "Other"], required: true },
    { key: "medicineAnytime", type: "radio", questionKey: "questions.q19", options: ["Very important", "Important", "Neutral", "Not important"], required: true },
  ],
  "F: Where Should We Put These Machines?": [
    { key: "usefulPlaces", type: "checkbox", questionKey: "questions.q20", options: ["Hospitals / Clinics", "Bus or train stations", "Office buildings", "Shopping malls", "Schools / Universities", "Apartment buildings", "Public places", "Villages or remote areas"], required: true },
    { key: "walkDistance", type: "radio", questionKey: "questions.q21", options: ["Within 5 minutes", "5–10 minutes", "10–15 minutes", "I wouldn't use it"], required: true },
  ],
  "G: Safety and Trust": [
    { key: "worriedFake", type: "radio", questionKey: "questions.q22", options: ["Very worried", "A little worried", "Not worried"], required: true },
    { key: "trustLicensed", type: "radio", questionKey: "questions.q23", options: ["Yes", "No", "Need more information"], required: true },
    { key: "seeCertificates", type: "radio", questionKey: "questions.q24", options: ["Yes", "No"], required: true },
    { key: "phoneHelp", type: "radio", questionKey: "questions.q25", options: ["Yes", "No"], required: true },
    { key: "instructions", type: "radio", questionKey: "questions.q26", options: ["Voice instructions", "Written on screen", "Both", "Don't need instructions"], required: true },
    { key: "preferredLanguage", type: "checkbox", questionKey: "questions.q27", options: ["Arabic", "Darija", "French", "English", "Other"], required: true },
  ],
  "H: Your Thoughts": [
    { key: "recommendArea", type: "radio", questionKey: "questions.q28", options: ["Yes", "No", "Maybe"], required: true },
    { key: "prescriptionApproval", type: "radio", questionKey: "questions.q29", options: ["Yes", "No", "Only for refills"], required: true },
    { key: "mostWorries", type: "checkbox", questionKey: "questions.q30", options: ["Medicine quality and safety", "Not having a doctor nearby to ask questions", "Privacy when talking to doctor", "Machine might not work properly", "Nothing worries me"], required: true },
    { key: "otherComments", type: "textarea", questionKey: "questions.q31", required: false },
  ],
  "I: Stay in Touch": [
    { key: "tryService", type: "radio", questionKey: "questions.q32", options: ["Yes, I'm interested", "No", "Maybe"], required: true },
    { key: "userName", type: "text", questionKey: "questions.q33", required: true },
    { key: "phoneNumber", type: "text", questionKey: "questions.q34", required: true },
    { key: "email", type: "text", questionKey: "questions.q35", required: false },
    { key: "city", type: "text", questionKey: "questions.q36", required: true },
    { key: "neighborhood", type: "text", questionKey: "questions.q37", required: true },
  ],
};


const getOptionKey = (text) => {
  let key = text.toLowerCase().trim();
  key = key.replace(/[’'"]/g, ""); // remove apostrophes
  key = key.replace(/[\s\/\,\-\–\(\)]/g, ""); // remove spaces, slashes, hyphens, parentheses

  // Map special cases
  const map = {
    "doesntmattermuch": "doesntmattermuch",
    "iwouldntwait": "iwouldntwait",
    "iwouldntuseit": "iwouldntuseit",
    "up5minutes": "upto5minutes",
    "5-10minutes": "510minutes",
    "10-15minutes": "1015minutes",
    "voiceinstructions": "voiceinstructions",
    "writtenonscreen": "writtenonscreen",
    "dontneedinstructions": "dontneedinstructions",
    "ineedtoknowmore": "ineedtoknowmore",
    "onlyifapprovedbyhealthauthorities": "onlyifapprovedbyhealthauthorities"
  };
  return map[key] || key;
};



const App = () => {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);
  const [sectionIndex, setSectionIndex] = useState(0);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [successPopup, setSuccessPopup] = useState(false);

  // Get the English section name to look up questions
  const getEnglishSectionName = (key) => {
    switch(key) {
      case 'a': return 'A: About You';
      case 'b': return 'B: Getting Medicines Now';
      case 'c': return 'C: Would You Use This Machine?';
      case 'd': return 'D: Talking to a Doctor';
      case 'e': return 'E: What Should Be Available?';
      case 'f': return 'F: Where Should We Put These Machines?';
      case 'g': return 'G: Safety and Trust';
      case 'h': return 'H: Your Thoughts';
      case 'i': return 'I: Stay in Touch';
      default: return '';
    }
  };

  const getTranslatedOption = (questionKey, optionText) => {
    const qKey = questionKey.split('.')[1]; 
    const optKey = getOptionKey(optionText);
    const translatedText = t(`options.${qKey}.${optKey}`);
    return translatedText.includes(`options.${qKey}.${optKey}`) ? optionText : translatedText;
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setLanguage(lng);
  };

  const handleChange = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
    setTouched(prev => ({ ...prev, [key]: true })); 
  };

  const toggleCheckbox = (key, value) => {
    const current = formData[key] || [];
    const updated = current.includes(value) ? current.filter(v => v !== value) : [...current, value];
    handleChange(key, updated);
  };

  const validateSection = (index) => {
    const currentSectionKey = sectionKeys[index];
    const englishSectionName = getEnglishSectionName(currentSectionKey);
    const questions = surveyQuestions[englishSectionName];
    let newErrors = {};
    questions.forEach(q => {
      const val = formData[q.key];
      if (q.required) {
        if ((q.type === "radio" || q.type === "radioOther") && (!val || val === "")) {
          newErrors[q.key] = t("validation.required");
        }
        else if (q.type === "checkbox" && (!val || val.length === 0)) {
          newErrors[q.key] = t("validation.atLeastOne");
        }
        else if ((q.type === "text" || q.type === "textarea") && (!val || !val.trim())) {
          newErrors[q.key] = t("validation.required");
        }
      }
    });
    setErrors(prev => ({ ...prev, ...newErrors })); 
    return Object.keys(newErrors).length === 0;
  };
    
  const markSectionTouched = (index) => {
    const currentSectionKey = sectionKeys[index];
    const englishSectionName = getEnglishSectionName(currentSectionKey);
    const questions = surveyQuestions[englishSectionName];
    const newTouched = { ...touched };
    questions.forEach(q => newTouched[q.key] = true);
    setTouched(newTouched);
  }

  const nextSection = () => {
    if (validateSection(sectionIndex)) {
      setSectionIndex(prev => prev + 1);
      setErrors({}); 
    } else {
      markSectionTouched(sectionIndex);
    }
  };

  const prevSection = () => {
    setErrors({});
    setSectionIndex(prev => prev - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    markSectionTouched(sectionIndex);

    if (validateSection(sectionIndex)) {
      console.log("Form Data:", formData);
      setSuccessPopup(true);
      setTimeout(() => setSuccessPopup(false), 2000);
      setErrors({}); 
    }
  };

  const currentSectionKey = sectionKeys[sectionIndex];
  const englishSectionName = getEnglishSectionName(currentSectionKey);
  const currentQuestions = surveyQuestions[englishSectionName];
  const totalSections = sectionKeys.length;
  const isFinalSection = sectionIndex === totalSections - 1;

  // Dynamically get the translated section title
  const translatedSectionTitle = t(`sections.${currentSectionKey}`);


  return (
    <div className="min-h-screen bg-gray-800 flex flex-col items-center px-4 py-8 sm:px-6"> 
      {/* Language Selector */}
      <div className="flex justify-end w-full max-w-2xl mx-auto mb-6">
        <label className="mr-2 font-medium text-gray-400">{t("selectLanguage")}:</label>
        <select
          value={language}
          onChange={(e) => changeLanguage(e.target.value)}
          className="border border-gray-600 bg-gray-700 text-white rounded px-2 py-1"
        >
          {/* FIX: Use only the translated strings */}
          <option value="en">{t("langEnglish")}</option>
          <option value="ma">{t("langMoroccan")}</option>
        </select>
      </div>

      {/* Header */}
      {sectionIndex === 0 && (
        <div className="flex flex-col items-center mb-8 w-full max-w-2xl">
          <div className="w-20 h-20 mb-4 rounded-full flex items-center justify-center shadow-lg">
            <img src="./logo.gif" alt="Logo" className="w-full h-full object-cover rounded-full" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4 text-center">{t("heading")}</h1>
          <div className="w-full lg:w-[660px] mx-auto">
            <img src="./image.png" alt="Header Image" className="w-full h-25 object-cover rounded-lg shadow-md" />
          </div>
           <p className="text-[#C2C2C4] pt-4">{t("paragraphs.intro1")}</p>
           <p className="text-[#C2C2C4] pt-4">{t("paragraphs.intro2")}</p>

        </div>
      )}

      <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto space-y-8">
  {sectionIndex > 0 && (
    <div className="w-full text-center py-4 mb-8">
      <h2 className="text-xl font-semibold text-white">
        {translatedSectionTitle}
      </h2>
    </div>
  )}

  {/* --- Special Handling for Final Section (Stay in Touch) --- */}
  {isFinalSection ? (
    <div className="space-y-6 pt-4">
      {currentQuestions.map((q) => (
        <div key={q.key} className=" pb-4">
          <p className="text-white font-normal text-base mb-2">
            {t(q.questionKey)}
            {q.required && <span className="text-red-500">*</span>}
          </p>

          {/* Radio fields (for "tryService" question) */}
          {q.type === "radio" && (
            <div className="flex flex-col space-y-2">
              {q.options.map((option, i) => (
                <label
                  key={i}
                  className="text-gray-300 text-sm sm:text-base flex items-center space-x-2"
                >
                  <input
                    type="radio"
                    name={q.key}
                    value={option}
                    checked={formData[q.key] === option}
                    onChange={(e) => handleChange(q.key, e.target.value)}
                    onBlur={() =>
                      setTouched((prev) => ({ ...prev, [q.key]: true }))
                    }
                    className="accent-[#3ED025]"
                  />
                 <span>{getTranslatedOption(q.questionKey, option)}</span>
                </label>
              ))}
              {touched[q.key] && errors[q.key] && (
                <p className="text-red-500 text-sm mt-1">{errors[q.key]}</p>
              )}
            </div>
          )}

          {/* Text inputs (name, phone, email, etc.) */}
          {q.type === "text" && (
            <div className="flex flex-col space-y-2">
              <input
                type="text"
                name={q.key}
                value={formData[q.key] || ""}
                onChange={(e) => handleChange(q.key, e.target.value)}
                onBlur={() =>
                  setTouched((prev) => ({ ...prev, [q.key]: true }))
                }
                className="w-full p-2  rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none"
               
              />
              {touched[q.key] && errors[q.key] && (
                <p className="text-red-500 text-sm mt-1">{errors[q.key]}</p>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  ) : (
    /* --- Standard Block Layout for Sections A–H --- */
    currentQuestions.map((q) => {
      const value = formData[q.key] || "";
      const isOtherSelected =
        q.type === "radioOther" && value && !q.options?.includes(value);
      const otherTextValue =
        q.type === "radioOther" && isOtherSelected ? value : "";

      return (
        <div
          key={q.key}
          className="mb-6"
          dir={i18n.language === "ma" ? "rtl" : "ltr"}
        >
          <label className="text-white mb-2 block font-normal text-sm sm:text-base">
            {t(q.questionKey)}
            {q.required && <span className="text-red-500">*</span>}
          </label>

          <div className="bg-gray-700 rounded-sm p-3 sm:p-4 space-y-2">
            {/* Radio & Checkbox Options */}
            {q.type !== "text" &&
              q.type !== "textarea" &&
              q.options.map((opt) => {
                const translatedOption = getTranslatedOption(
                  q.questionKey,
                  opt
                );

                if (q.type === "radio" || (q.type === "radioOther" && opt !== "Other")) {
                  return (
                    <label
                      key={opt}
                      className="flex items-center text-gray-300 cursor-pointer text-sm sm:text-base"
                    >
                      <input
                        type="radio"
                        name={q.key}
                        value={opt}
                        checked={value === opt}
                        onChange={(e) => handleChange(q.key, e.target.value)}
                        className="form-radio h-4 w-4 accent-[#3ED025] bg-transparent"
                      />
                      <span className="ml-3">{translatedOption}</span>
                    </label>
                  );
                }

                if (q.type === "checkbox") {
                  const selectedValues = formData[q.key] || [];
                  return (
                    <label
                      key={opt}
                      className="flex items-center text-gray-300 cursor-pointer text-sm sm:text-base"
                    >
                      <input
                        type="checkbox"
                        name={q.key}
                        value={opt}
                        checked={selectedValues.includes(opt)}
                        onChange={() => toggleCheckbox(q.key, opt)}
                        className="form-checkbox h-4 w-4 accent-[#3ED025] bg-transparent"
                      />
                      <span className="ml-3">{translatedOption}</span>
                    </label>
                  );
                }

                return null;
              })}

            {/* 'Other' input for radioOther */}
          {q.type === "radioOther" && (
           <div className="flex items-center text-gray-300 mt-1 text-sm sm:text-base">
             <input
               type="radio"
               name={q.key}
               value="OtherOption"
               checked={isOtherSelected}
               onChange={() => handleChange(q.key, "")}
               className="form-radio h-4 w-4 accent-[#3ED025] bg-transparent" />
            <span className="ml-2 mr-2">{t("otherOptionLabel")}</span>
           <input
             type="text"
             value={isOtherSelected ? value : ""}
             onChange={(e) => handleChange(q.key, e.target.value)}
             className="flex-1 bg-gray-700 text-gray-200 border-0 rounded-sm px-2 py-1 text-sm"
            />
            </div>
            )}

            {/* Text and Textarea Inputs */}
            {(q.type === "text" || q.type === "textarea") && (
              <>
                {q.type === "text" ? (
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => handleChange(q.key, e.target.value)}
                    placeholder={t("enterHerePlaceholder")}
                    className="w-full bg-gray-700 text-gray-200 border-0 rounded-sm px-2 py-1 text-sm"
                  />
                ) : (
                  <textarea
                    value={value}
                    onChange={(e) => handleChange(q.key, e.target.value)}
                    placeholder={t("enterHerePlaceholder")}
                    rows="3"
                    className="w-full bg-gray-700 text-gray-200 border-0 rounded-sm px-2 py-1 text-sm"
                  />
                )}
              </>
            )}
          </div>

          {touched[q.key] && errors[q.key] && (
            <p className="text-red-500 text-sm mt-1">{errors[q.key]}</p>
          )}
        </div>
      );
    })
  )}

  {/* Navigation Buttons */}
  <div
    className="relative flex items-center pt-2"
    dir={i18n.language === "ma" ? "rtl" : "ltr"}
  >
    {sectionIndex > 0 && (
      <button
        type="button"
        onClick={prevSection}
        className="absolute left-0 border border-gray-400 bg-gray-100 text-gray-800 rounded shadow-md text-sm font-medium py-2 px-3 sm:px-4"
      >
        {t("back")}
      </button>
    )}

    <div className="flex-1 text-center">
      <span className="text-sm sm:text-base text-gray-400 font-normal">
        {sectionIndex + 1} / {totalSections}
      </span>
    </div>

    <div className="absolute right-0">
      {sectionIndex < totalSections - 1 ? (
        <button
          type="button"
          onClick={nextSection}
          className="w-20 sm:w-24 h-10 border border-gray-400 bg-gray-100 text-gray-800 rounded shadow-mdtext-sm font-medium"
        >
          {t("next")}
        </button>
      ) : (
        <button
          type="submit"
          className="w-20 sm:w-24 h-10 border border-white bg-blue-600 text-white rounded shadow-md text-sm font-medium"
        >
          {t("submit")}
        </button>
      )}
    </div>
  </div>
</form>


      {successPopup && (
        <div className="fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-md animate-fade-in">
          {t("formSubmitted")}
        </div>
      )}

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.5s ease-in-out; }
      `}</style>
    </div>
  );
};

export default App;