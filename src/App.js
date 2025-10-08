import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "./i18n";

const App = () => {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState("en");

  // --- Form states ---
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [concerns, setConcerns] = useState([]); // checkboxes
  const [recommend, setRecommend] = useState(""); // radio button
  const [suggestion, setSuggestion] = useState(""); // textarea
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setLanguage(lng);
    setSuccessMessage("");
  };

  // --- Handle checkbox changes ---
  const handleConcernChange = (value) => {
    setConcerns((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  // --- Handle form submission ---
  const handleSubmit = (e) => {
    e.preventDefault();
    let formErrors = {};
    setSuccessMessage("");

   // --- Validate name ---
if (!name.trim()) {
  formErrors.name = t("nameRequired");
}

// --- Validate email ---
if (!email.trim()) {
  formErrors.email = t("emailRequired");
} else if (!/\S+@\S+\.\S+/.test(email)) {
  formErrors.email = t("emailInvalid");
}

// --- Validate concerns ---
if (concerns.length === 0) {
  formErrors.concerns = t("concernsRequired");
}

// --- Validate recommendation ---
if (!recommend) {
  formErrors.recommend = t("recommendRequired");
}

// --- Validate suggestion ---
if (!suggestion.trim()) {
  formErrors.suggestion = t("suggestionRequired");
}

    
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      console.log("Form Data:", { name, email, concerns, recommend, suggestion });
      setSuccessMessage(t("formSubmitted"));
      setTimeout(() => {
      setSuccessMessage("");
      }, 2000);
      setName("");
      setEmail("");
      setConcerns([]);
      setRecommend("");
      setSuggestion("");
    }
  };

  return (
  <div className="min-h-screen flex flex-col items-center justify-start bg-gray-50 px-4 sm:px-6 lg:px-8 py-8">
    {/* --- Language Selection --- */}
    <div className="flex justify-end w-full max-w-5xl mb-6">
      <label className="mr-2 font-medium text-sm md:text-base">
        {t("selectLanguage")}:
      </label>
      <select
        value={language}
        onChange={(e) => changeLanguage(e.target.value)}
        className="border border-gray-300 rounded px-2 py-1 text-sm md:text-base"
      >
        <option value="en">English</option>
        <option value="ma">Moroccan</option>
      </select>
    </div>

    {/* --- Heading --- */}
    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-4">
      {t("heading")}
    </h1>

    {/* --- Image --- */}
    <img
      src="./image.png"
      alt="Vending Machine"
      className="w-full max-w-[320px] md:max-w-[420px] lg:max-w-[500px] h-auto mb-6 rounded-xl shadow-sm"
    />

    {/* --- Description --- */}
    <p className="text-center text-gray-700 max-w-2xl mb-8 text-sm md:text-base leading-relaxed">
      {t("description")}
    </p>

    {/* --- Form --- */}
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md md:max-w-lg  p-4 md:p-4 space-y-5 border border-gray-100"
    >
      {/* --- Name --- */}
      <div>
        <label className="block text-gray-700 font-medium mb-1 text-sm md:text-base">
          {t("name")}:
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={`w-full border ${
            errors.name ? "border-red-500" : "border-gray-300"
          } rounded px-3 py-2 md:py-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-400`}
          placeholder={t("name")}
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name}</p>
        )}
      </div>

      {/* --- Email --- */}
      <div>
        <label className="block text-gray-700 font-medium mb-1 text-sm md:text-base">
          {t("email")}:
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`w-full border ${
            errors.email ? "border-red-500" : "border-gray-300"
          } rounded px-3 py-2 md:py-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-400`}
          placeholder={t("email")}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
        )}
      </div>

      {/* --- Survey Questions Section --- */}
      <div className="w-full mt-6 space-y-6">
        {/* --- Question 1: Concerns (checkboxes) --- */}
        <div>
          <h2 className="text-base md:text-lg font-semibold mb-3">
            {t("concernsQuestion")}
          </h2>
          <div className="space-y-2 text-sm md:text-base">
            {[
              { key: "wrongMedicine", label: t("concernsOptions.wrongMedicine") },
              { key: "expired", label: t("concernsOptions.expired") },
              { key: "noSupport", label: t("concernsOptions.noSupport") },
              { key: "highPrice", label: t("concernsOptions.highPrice") },
              { key: "privacy", label: t("concernsOptions.privacy") },
            ].map((option) => (
              <label key={option.key} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="concerns"
                  value={option.key}
                  checked={concerns.includes(option.key)}
                  onChange={() => handleConcernChange(option.key)}
                  className="accent-blue-600 w-4 h-4"
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
          {errors.concerns && (
            <p className="text-red-500 text-sm mt-1">{errors.concerns}</p>
          )}
        </div>

        {/* --- Question 2: Recommend (radio buttons) --- */}
        <div>
          <h2 className="text-base md:text-lg font-semibold mb-3">
            {t("recommendQuestion")}
          </h2>
          <div className="space-y-2 text-sm md:text-base">
            {[
              { key: "veryLikely", label: t("recommendOptions.veryLikely") },
              { key: "somewhatLikely", label: t("recommendOptions.somewhatLikely") },
              { key: "notLikely", label: t("recommendOptions.notLikely") },
            ].map((option) => (
              <label key={option.key} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="recommend"
                  value={option.key}
                  checked={recommend === option.key}
                  onChange={(e) => setRecommend(e.target.value)}
                  className="accent-blue-600 w-4 h-4"
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
          {errors.recommend && (
            <p className="text-red-500 text-sm mt-1">{errors.recommend}</p>
          )}
        </div>

        {/* --- Question 3: Suggestions (textarea) --- */}
        <div>
          <h2 className="text-base md:text-lg font-semibold mb-2">
            {t("suggestionsQuestion")}
          </h2>
          <textarea
            value={suggestion}
            onChange={(e) => setSuggestion(e.target.value)}
            className={`w-full border ${
              errors.suggestion ? "border-red-500" : "border-gray-300"
            } rounded px-3 py-2 md:py-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-400`}
            rows="3"
            placeholder={t("suggestionsQuestion")}
          ></textarea>
          {errors.suggestion && (
            <p className="text-red-500 text-sm mt-1">{errors.suggestion}</p>
          )}
        </div>
      </div>

      {/* --- Submit Button --- */}
      <button
        type="submit"
        className="bg-blue-600 text-white font-medium py-2 md:py-3 px-6  hover:bg-blue-700 transition-colors  text-sm md:text-base "
      >
        {t("submit")}
      </button>

      {/* --- Success Message --- */}
      {successMessage && (
        <p className="text-green-600 font-medium text-center mt-3 text-sm md:text-base">
          {successMessage}
        </p>
      )}
    </form>
  </div>
);
}
export default App;