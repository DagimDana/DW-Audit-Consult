import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'am' ? 'en' : 'am';
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="px-3 py-1 rounded-md text-sm font-medium bg-[#8bc73b] text-white hover:bg-opacity-90 transition-colors"
    >
      {i18n.language === 'am' ? 'English' : 'አማርኛ'}
    </button>
  );
}