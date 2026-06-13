import { useTranslation } from "react-i18next";

function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const changeLanguage = (lang: string): void => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  };

  return (
    <select
      value={i18n.language}
      onChange={(e) => changeLanguage(e.target.value)}
      className="
      bg-slate-700
      hover:bg-slate-600
      hover:text-black
      text-white
      duration-500
      px-6
      py-3
      rounded-2xl
      font-bold
      w-[140px]
      cursor-pointer
      outline-none
      border-none
      "
    >
      <option value="uz">O'zbek</option>
      <option value="ru">Русский</option>
      <option value="en">English</option>
    </select>
  );
}

export default LanguageSwitcher;
