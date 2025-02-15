import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Blog() {
  const { t } = useTranslation();
  const contentRef = useRef<HTMLDivElement>(null);
  const [navbarHeight, setNavbarHeight] = useState(80);
  const [isMobileScreen, setIsMobileScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobileScreen(window.screen.width <= 768);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    const updateNavbarHeight = () => {
      const navbar = document.querySelector('nav');
      if (navbar) {
        setNavbarHeight(navbar.offsetHeight);
      }
    };

    updateNavbarHeight();
    window.addEventListener('resize', updateNavbarHeight);
    
    return () => {
      window.removeEventListener('resize', updateNavbarHeight);
    };
  }, []);

  const scrollToContent = () => {
    const contentElement = contentRef.current;
    if (contentElement) {
      const elementPosition = contentElement.offsetTop - navbarHeight;
      window.scrollTo({
        top: isMobileScreen ? elementPosition * 0.6 : elementPosition,
        behavior: 'smooth'
      });
    }
  };

  const heroHeight = isMobileScreen ? 'h-[60vh]' : 'h-[80vh]';

  return (
    <div className="min-h-screen">
      <section className={`relative ${heroHeight} flex items-center justify-center`}>
        <div className="absolute inset-0">
          <img
            src="/blog.jpg"
            alt={t('blog.heroImageAlt')}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#70275a] bg-opacity-75"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold mb-8 text-white">{t('blog.title')}</h1>
          <p className="text-lg md:text-xl lg:text-3xl text-white max-w-4xl mx-auto leading-relaxed">
            {t('blog.subtitle')}
          </p>
        </div>
        <div 
          className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer z-20"
          onClick={scrollToContent}
        >
          <div className="animate-bounce">
            <div className="relative">
              <ChevronDown className="w-8 h-8 md:w-12 md:h-12 text-white opacity-80 hover:opacity-100 transition-opacity" />
              <div className="absolute top-0 left-0 w-full h-full animate-ping">
                <ChevronDown className="w-8 h-8 md:w-12 md:h-12 text-white opacity-20" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section ref={contentRef} className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#70275a] mb-2">{t('blog.comingSoon.title')}</h3>
                <p className="text-gray-600">
                  {t('blog.comingSoon.description')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}