"use client";
import { useLanguage } from "@/context/LanguageContext";

export default function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="flex items-center bg-gray-100 rounded-full p-1 shadow-inner">
      <button
        onClick={() => setLang("en")}
        className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-300
          ${
            lang === "en"
              ? "bg-blue-600 text-white shadow"
              : "text-gray-600 hover:text-blue-600"
          }
        `}
      >
        EN
      </button>

      <button
        onClick={() => setLang("hi")}
        className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-300
          ${
            lang === "hi"
              ? "bg-blue-600 text-white shadow"
              : "text-gray-600 hover:text-blue-600"
          }
        `}
      >
        हिंदी
      </button>
    </div>
  );
}
