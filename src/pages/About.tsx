import { useState, useEffect, useRef } from 'react';
import { Users, Award, History, ChevronDown, GraduationCap, Briefcase, Target } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function About() {
  const contentRef = useRef<HTMLDivElement>(null);
  const [navbarHeight, setNavbarHeight] = useState(80);
  const [showFullBio, setShowFullBio] = useState(false);
  const [isMobileScreen, setIsMobileScreen] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobileScreen(window.screen.width <= 768);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
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

  const heroHeight = isMobileScreen ? 'h-[60vh]' : 'h-[80vh]';

  return (
    <div className="min-h-screen">
      <section className={`relative ${heroHeight} flex items-center justify-center`}>
        <div className="absolute inset-0">
          <img
            src="/cal.jpg"
            alt="Calculator and financial documents"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#70275a] bg-opacity-75"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold mb-8 text-white">{t('about.title')}</h1>
          <p className="text-lg md:text-xl lg:text-3xl text-white max-w-4xl mx-auto leading-relaxed">
            {t('about.subtitle')}
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

      <section ref={contentRef} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-[#70275a] mb-6">{t('about.title')}</h2>
              <div className="space-y-4 text-gray-600">
                <p>{t('about.description.part1')}</p>
                <p>{t('about.description.part2')}</p>
                <p>{t('about.description.part3')}</p>
              </div>
            </div>
            <div className="relative floating-image-wrapper">
              <div className="aspect-w-4 aspect-h-3">
                <img
                  src="/office.jpg"
                  alt="Our office"
                  className="floating-image object-cover rounded-lg shadow-xl"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-[#8bc73b] opacity-10 rounded-full z-0"></div>
              <div className="absolute -top-6 -right-6 w-48 h-48 bg-[#70275a] opacity-10 rounded-full z-0"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4 text-[#70275a]">{t('about.mission.title')}</h2>
              <p className="text-gray-600">{t('about.mission.description')}</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4 text-[#70275a]">{t('about.vision.title')}</h2>
              <p className="text-gray-600">{t('about.vision.description')}</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4 text-[#70275a]">{t('about.values.title')}</h2>
              <p className="text-gray-600">{t('about.values.description')}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#70275a]">{t('about.whyChooseUs.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Users className="w-12 h-12 text-[#8bc73b] mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-[#70275a]">{t('about.whyChooseUs.expertTeam.title')}</h3>
              <p className="text-gray-600">{t('about.whyChooseUs.expertTeam.description')}</p>
            </div>
            <div className="text-center">
              <Award className="w-12 h-12 text-[#8bc73b] mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-[#70275a]">{t('about.whyChooseUs.qualityService.title')}</h3>
              <p className="text-gray-600">{t('about.whyChooseUs.qualityService.description')}</p>
            </div>
            <div className="text-center">
              <History className="w-12 h-12 text-[#8bc73b] mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-[#70275a]">{t('about.whyChooseUs.provenTrackRecord.title')}</h3>
              <p className="text-gray-600">{t('about.whyChooseUs.provenTrackRecord.description')}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#70275a]">{t('about.leadership.title')}</h2>
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300">
              <div className="md:flex">
                <div className="md:w-1/3">
                  <img
                    src="/Dessaleg.jpg"
                    alt={t('about.leadership.founder.name')}
                    className="w-full h-full object-cover md:h-[400px]"
                  />
                </div>
                <div className="md:w-2/3 p-6">
                  <div className="flex items-center mb-4">
                    <h3 className="text-2xl font-bold text-[#70275a]">{t('about.leadership.founder.name')}</h3>
                    <GraduationCap className="w-6 h-6 text-[#8bc73b] ml-2" />
                  </div>
                  <p className="text-lg font-semibold text-gray-600 mb-4">{t('about.leadership.founder.position')}</p>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <Briefcase className="w-5 h-5 text-[#8bc73b] mt-1 mr-3 flex-shrink-0" />
                      <p className="text-gray-600">{t('about.leadership.founder.vision')}</p>
                    </div>
                    <div className="flex items-start">
                      <GraduationCap className="w-5 h-5 text-[#8bc73b] mt-1 mr-3 flex-shrink-0" />
                      <p className="text-gray-600">{t('about.leadership.founder.education')}</p>
                    </div>
                    <div className="flex items-start">
                      <Target className="w-5 h-5 text-[#8bc73b] mt-1 mr-3 flex-shrink-0" />
                      <p className="text-gray-600">{t('about.leadership.founder.pioneer')}</p>
                    </div>
                  </div>

                  <div className={`mt-4 overflow-hidden transition-all duration-300 ${showFullBio ? 'max-h-[500px]' : 'max-h-0'}`}>
                    <div className="space-y-3 text-gray-600">
                      <p>{t('about.leadership.founder.bio.part1')}</p>
                      <p>{t('about.leadership.founder.bio.part2')}</p>
                      <p>{t('about.leadership.founder.bio.part3')}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => setShowFullBio(!showFullBio)}
                    className="mt-6 text-[#70275a] hover:text-[#8bc73b] transition-colors duration-300 flex items-center"
                  >
                    {showFullBio ? t('about.leadership.showLess') : t('about.leadership.readMore')}
                    <ChevronDown className={`w-5 h-5 ml-1 transform transition-transform duration-300 ${showFullBio ? 'rotate-180' : ''}`} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}