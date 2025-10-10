import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import emailjs from 'emailjs-com';
import NafLogoGif from "./assets/NafLogo.json";

import "./i18n"; 
import Lottie from "lottie-react";



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
    { key: "willingPayExtra", type: "radio",  questionKey: "questions.q33",  options: ["Yes", "No", "Maybe"],   required: true },
    { key: "priceRange", type: "text", questionKey: "questions.q34", required: true },
    { key: "trustSupervisedMachine", type: "radio",  questionKey: "questions.q35", options: ["Yes", "No", "Maybe"], required: true },
    { key: "trustAppVending", type: "radio",  questionKey: "questions.q36", options: ["Yes", "No", "Maybe"], required: true },
    { key: "userName",type: "text",  questionKey: "questions.q37",  required: true },
    { key: "phoneNumber", type: "text",  questionKey: "questions.q38",  required: false },
    { key: "email", type: "text", questionKey: "questions.q39",  required: false },
    {key: "city", type: "text", questionKey: "questions.q40",  required: true },
    { key: "neighborhood", type: "text", questionKey: "questions.q41", required: true},
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
  const SERVICE_ID = "service_rsffzz7"; //  Service ID
  const TEMPLATE_ID = "template_b2fmoe3"; //  Template ID
  const PUBLIC_KEY = "RbiH3FHNdDfJZ9G3A"; // Public Key Id

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

    //  HTML table from form data
    let message_html = `<h3 style="font-family: Arial, sans-serif;">Survey Submission</h3>
      <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; width:100%; font-family: Arial, sans-serif;">
        <thead style="background-color: #f0f0f0;">
          <tr>
            <th style="text-align: left;">Question</th>
            <th style="text-align: left;">Answer</th>
          </tr>
        </thead>
        <tbody>
    `;

    Object.keys(formData).forEach((key) => {
      let questionText = key;
      for (const section in surveyQuestions) {
        const q = surveyQuestions[section].find((q) => q.key === key);
        if (q) {
          questionText = t(q.questionKey);
          break;
        }
      }
      const value = formData[key];
      const displayValue = Array.isArray(value) ? value.join(", ") : value || "";
      message_html += `
        <tr>
          <td style="font-weight:bold; background-color:#fafafa;">${questionText}</td>
          <td>${displayValue}</td>
        </tr>
      `;
    });

    message_html += `</tbody></table>`;

    // Prepare email data
    const emailData = {
      name: formData.userName || "Participant",
      message_html: message_html,
      reply_to: formData.email || "no-reply@ldintertech.com",
    };

    // Send using EmailJS
    emailjs.send(SERVICE_ID, TEMPLATE_ID, emailData, PUBLIC_KEY)
      .then((result) => {
        console.log("✅ Email sent successfully:", result.text);
       window.location.reload();
       
        setSuccessPopup(true);

        setTimeout(() => setSuccessPopup(false), 4000);
      })
      .catch((error) => {
        console.error("❌ Failed to send email:", error);

      });
  }
};


  const currentSectionKey = sectionKeys[sectionIndex];
  const englishSectionName = getEnglishSectionName(currentSectionKey);
  const currentQuestions = surveyQuestions[englishSectionName];
  const totalSections = sectionKeys.length;
  const isFinalSection = sectionIndex === totalSections - 1;

  //  translated section title
  const translatedSectionTitle = t(`sections.${currentSectionKey}`);

  //  array of language options with their values and display keys
  const languageOptions = [
    { value: "en", displayKey: "English" },
    { value: "ma", displayKey: "Moroccan" },
  ];

  // Language Selector Component
const LanguageSelectorPill = ({ currentLang, changeLang, options, t }) => {
  const currentOption = options.find(opt => opt.value === currentLang);
  const otherOptions = options.filter(opt => opt.value !== currentLang);

  return (
    <div className="relative inline-block group">
      {/* Pill Container */}
      <button
        type="button"
        className="flex items-center bg-[#282C34] border border-white rounded-full h-10 pr-4 pl-1.5 cursor-pointer shadow-xl outline-none"
      >
        {/* Icon Circle */}
        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mr-2">
          <span className="text-[#6c5ce7] text-2xl font-bold">文A</span>
        </div>

        {/* Current Language Text */}
        <span className="text-white font-medium mr-2 text-sm">
          {t(currentOption.displayKey)}
        </span>

        {/* Dropdown Arrow */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      <div className="absolute right-0 mt-2 w-32 bg-gray-700 rounded-lg shadow-xl opacity-0 invisible bg:gray-700 group-hover:opacity-100 group-focus-within:opacity-100 group-focus-within:visible transition-opacity duration-200 z-50">
        {otherOptions.map((opt) => (
          <button
            key={opt.value}
            onClick={() => changeLang(opt.value)}
            className="block w-full text-left px-4 py-2 text-white hover:bg-gray-600 rounded-lg"
          >
            {t(opt.displayKey)}
          </button>
        ))}
      </div>
    </div>
  );
};



  return (
    // Add pt-20 to the main container to account for the fixed language selector's height
    <div className="min-h-screen bg-gray-800 flex flex-col items-center px-4 pt-20 pb-8 sm:px-6"> 
      
      {/* Language Selector - FIXED AT TOP */}
      <div className="fixed top-0 left-0 w-full z-50 py-3 px-4 flex justify-end">
    {/* A container to keep the pill aligned with the max-width of the form */}
   <div className="w-full flex justify-end">
  <div className="relative inline-block group">
    <button 
      type="button"
      className="flex items-center bg-[#282C34] border border-white rounded-full h-10 pr-4 pl-1.5 cursor-pointer shadow-xl outline-none"
    >
      <div className="p-5">
        {/* Icon Circle */}
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
          <rect width="28" height="28" rx="14" fill="white"/>
          <path d="M13.9201 20.0765L16.5404 13.1658H17.7498L20.3701 20.0765H19.1607L18.5416 18.32H15.7485L15.1295 20.0765H13.9201ZM9.37051 18.3488L8.56425 17.5425L11.4725 14.6343C11.1366 14.2983 10.8317 13.9144 10.558 13.4825C10.2843 13.0506 10.0324 12.5611 9.80243 12.014H11.0118C11.2038 12.3883 11.3957 12.7146 11.5877 12.993C11.7797 13.2713 12.01 13.5497 12.2788 13.828C12.5955 13.5113 12.9244 13.0673 13.2653 12.496C13.6062 11.9247 13.8629 11.3801 14.0353 10.8622H7.64282V9.71038H11.6741V8.55859H12.8259V9.71038H16.8571V10.8622H15.187C14.9855 11.5532 14.6831 12.2635 14.28 12.993C13.8769 13.7224 13.4786 14.2791 13.085 14.6631L14.4672 16.074L14.0353 17.2546L12.2788 15.4549L9.37051 18.3488ZM16.1085 17.3122H18.1817L17.1451 14.3751L16.1085 17.3122Z" fill="#4C33DB"/>
        </svg>
      </div>

      {/* Current Language Text */}
      <span className="text-white font-medium mr-2 text-sm">
        {t(languageOptions.find(opt => opt.value === language)?.displayKey) || language}
      </span>

      {/* Dropdown Arrow */}
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </button>  

    {/* Dropdown Menu - appears on hover/focus */}
    <div className="absolute right-0 mt-2 w-32 opacity-0 invisible group-hover:opacity-100 group-focus-within:opacity-100 group-focus-within:visible transition-opacity duration-200 z-50">
      {languageOptions.map((opt) => (
        opt.value !== language && (
          <button
            key={opt.value}
            onClick={() => changeLanguage(opt.value)}
            className="block w-full text-left px-4 py-2 text-[#C2C2C4] bg-gray-800 hover:bg-gray-700 text-sm"
          >
            {opt.displayKey} 
          </button>
        )
      ))}
    </div>
  </div>
</div>
</div>

    
      {/*Header */}
      {sectionIndex === 0 && (
        <div className="flex flex-col items-center mb-8 w-full max-w-2xl">
          <div className="w-20 h-20 mb-4 rounded-full flex items-center justify-center shadow-lg">
         <Lottie
          animationData={NafLogoGif}
          className="w-full h-full"
          loop
          autoplay
        />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#C2C2C4] mb-4 text-center">{t("heading")}</h1>
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

  {/*Final Section (Stay in Touch)*/}
{isFinalSection ? (
    <div className="space-y-6 pt-4">
        {currentQuestions.map((q) => (
            <div key={q.key} className=" pb-4">
                <p className="text-[#C2C2C4] font-normal text-base mb-2">
                    {t(q.questionKey)}
                    {q.required && <span className="text-red-500">*</span>}
                </p>

                {/* Radio fields (for "tryService" question and 38, 40, 41) */}
                {q.type === "radio" && (
                   <> 
                    <div className="bg-gray-700 rounded-sm p-3 sm:p-4 space-y-2">
                        <div className="flex flex-col space-y-2">
                            {q.options.map((option, i) => (
                                <label
                                    key={i}
                                    className="text-[#C2C2C4] text-sm sm:text-base flex items-center space-x-2"
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
                        </div>
                        </div>
                         {touched[q.key] && errors[q.key] && (
                         <p className="text-red-500 text-sm mt-1">{errors[q.key]}</p>
                        )}
                         </>
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
                            // FIX: Added the grey box styling directly to the input for text fields
                            className="w-full p-2 rounded bg-gray-700 text-[#C2C2C4] placeholder-gray-400 focus:outline-none"
                        />
                        {touched[q.key] && errors[q.key] && (
                            <p className="text-red-500 text-sm mt-1">{errors[q.key]}</p>
                        )}
                    </div>
                )}
            </div>
        ))}
    </div>
) :  (
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
          <label className="text-[#C2C2C4] mb-2 block font-normal text-sm sm:text-base">
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
                      className="flex items-center text-[#C2C2C4] cursor-pointer text-sm sm:text-base"
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
                      className="flex items-center text-[#C2C2C4] cursor-pointer text-sm sm:text-base"
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
             <div className="flex items-center text-[#C2C2C4] mt-1 text-sm sm:text-base">
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
              className="flex-1 bg-gray-700 text-[#C2C2C4] border-0 rounded-sm px-2 py-1 text-sm"
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
                    className="w-full bg-gray-700 text-[#C2C2C4] border-0 rounded-sm px-2 py-1 text-sm"
                  />
                ) : (
                  <textarea
                    value={value}
                    onChange={(e) => handleChange(q.key, e.target.value)}
                    placeholder={t("enterHerePlaceholder")}
                    rows="3"
                    className="w-full bg-gray-700 text-[#C2C2C4] border-0 rounded-sm px-2 py-1 text-sm"
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
        className="absolute left-0 border border-gray-400 bg-gray-100 text-gray-700 rounded shadow-md text-sm font-medium py-2 px-3 sm:px-4"
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
          className="w-20 sm:w-24 h-10 border border-gray-400 bg-gray-100 text-gray-800 rounded shadow-md text-sm font-medium"
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
  <div className="fixed top-10 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-lg shadow-md animate-fade-in w-80 text-center">
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