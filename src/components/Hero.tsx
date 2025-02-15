import { TypeAnimation } from 'react-type-animation';
import { ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';

function Hero() {
  const { t } = useTranslation();

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <div className="relative min-h-[60vh] md:min-h-screen">
      <div className="absolute inset-0">
        <img
          className="w-full h-full object-cover"
          src="/hero.jpg"
          alt={t('hero.imageAlt')}
        />
        <div className="absolute inset-0 bg-[#70275a] bg-opacity-75"></div>
      </div>
      
      <div className="relative h-[60vh] md:h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-32">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-8 md:mb-16 leading-tight tracking-wide">
              {t('hero.welcome')}
            </h1>
            <div className="text-base md:text-xl lg:text-2xl text-white opacity-90 leading-relaxed">
              <span>{t('hero.provideText')} </span>
              <TypeAnimation
                sequence={[
                  t('services.audit'),
                  2000,
                  t('services.tax'),
                  2000,
                  t('services.consulting'),
                  2000,
                  t('services.outsourcing'),
                  2000,
                  t('services.humanCapital'),
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                style={{ color: '#8bc73b', display: 'inline-block' }}
              />
              <span> {t('hero.qualityText')}</span>
            </div>
          </div>
        </div>

        <div 
          className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
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
      </div>
    </div>
  );
}

export default Hero;