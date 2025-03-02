// import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Send } from 'lucide-react';
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#70275a] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">{t('footer.aboutUs.title', 'ስለ እኛ')}</h3>
            <p className="text-gray-300">
              {t('footer.aboutUs.description', 'ሙያዊ የሂሳብ እና የንግድ ምክር አገልግሎቶች ለእርስዎ ፍላጎት የተዘጋጁ።')}
            </p>
            <div className="mt-4 flex space-x-4">
              <a href="https://www.facebook.com/share/12Hug55LiD3/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#8bc73b] transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://www.instagram.com/dessalegnw.yesuss?igsh=MTlpamd4eXF3YWdnMg==" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#8bc73b] transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://t.me/DessalegWYesussAuthorizedAccount" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#8bc73b] transition-colors">
                <Send size={20} />
              </a>
              <a href="https://www.linkedin.com/in/dessalegn-w-yesuss-phd-26817996?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#8bc73b] transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="https://x.com/Dessalegn442217?t=Lfoz7g9I27jdLx3cxPVGVA&s=35" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#8bc73b] transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">{t('footer.quickLinks.title', 'ፈጣን ማስፈንጠሪያዎች')}</h3>
            <ul className="space-y-2">
              <li><button onClick={() => handleNavigation('/')} className="text-gray-300 hover:text-[#8bc73b] text-left w-full">{t('nav.home', 'መነሻ')}</button></li>
              <li><button onClick={() => handleNavigation('/about')} className="text-gray-300 hover:text-[#8bc73b] text-left w-full">{t('nav.about', 'ስለ እኛ')}</button></li>
              <li><button onClick={() => handleNavigation('/services')} className="text-gray-300 hover:text-[#8bc73b] text-left w-full">{t('nav.services', 'አገልግሎቶች')}</button></li>
              <li><button onClick={() => handleNavigation('/blog')} className="text-gray-300 hover:text-[#8bc73b] text-left w-full">{t('nav.blog', 'ብሎግ')}</button></li>
              <li><button onClick={() => handleNavigation('/contact')} className="text-gray-300 hover:text-[#8bc73b] text-left w-full">{t('nav.contact', 'አግኙን')}</button></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">{t('footer.services.title', 'አገልግሎቶች')}</h3>
            <ul className="space-y-2">
              <li><button onClick={() => handleNavigation('/services/audit-services')} className="text-gray-300 hover:text-[#8bc73b] text-left w-full">{t('footer.services.accounting', 'የሂሳብ አገልግሎቶች')}</button></li>
              <li><button onClick={() => handleNavigation('/services/tax-advisory-planning')} className="text-gray-300 hover:text-[#8bc73b] text-left w-full">{t('footer.services.tax', 'የግብር ዕቅድ')}</button></li>
              <li><button onClick={() => handleNavigation('/services/business-advisory-consulting')} className="text-gray-300 hover:text-[#8bc73b] text-left w-full">{t('footer.services.consulting', 'የንግድ ምክር')}</button></li>
              <li><button onClick={() => handleNavigation('/services/outsourcing-services')} className="text-gray-300 hover:text-[#8bc73b] text-left w-full">{t('footer.services.financial', 'የፋይናንስ ምክር')}</button></li>
              <li><button onClick={() => handleNavigation('/services/human-capital')} className="text-gray-300 hover:text-[#8bc73b] text-left w-full">{t('footer.services.audit', 'ኦዲት እና ዋስትና')}</button></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">{t('footer.contactInfo.title', 'የመገኛ መረጃ')}</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-300">
                <MapPin size={18} className="mr-2" />
                {t('footer.contactInfo.address', 'መገናኛ ቤተልሄም ፕላዛ፣ አዲስ አበባ')}
              </li>
              <li className="flex items-center text-gray-300">
                <Phone size={18} className="mr-2" />
                +251 911 311 257
              </li>
              <li className="flex items-center text-gray-300">
                <Mail size={18} className="mr-2" />
                dessalegnw.yesuss@gmail.com
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="text-center text-gray-300">
            <p>
              © {new Date().getFullYear()} DESSALEGN WOLDEYESUSS AUTHORIZED ACCOUNTANT AND CONSULTING | All Rights Reserved
            </p>
            <p className="mt-2 text-sm">
              Website Designed by{' '}
              <a 
                href="https://www.linkedin.com/in/dagim-dana" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[#8bc73b] hover:text-white transition-colors duration-300"
              >
                Dagim Tech
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

