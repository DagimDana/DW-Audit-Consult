import React from 'react';
import { Users, Calculator, FileText, TrendingUp, ShieldCheck, ArrowRight, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CountUp from 'react-countup';
import { useTranslation } from 'react-i18next';
import Hero from '../components/Hero';
import { useEffect, useRef } from 'react';

export default function Home() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleServiceClick = (path: string) => {
    window.scrollTo(0, 0);
    navigate(path);
  };

  const services = [
    {
      icon: <Calculator className="h-12 w-12 text-[#8bc73b] group-hover:text-white transition-colors duration-300" />,
      title: t('services.audit'),
      description: t('home.auditDescription'),
      path: '/services/audit-services'
    },
    {
      icon: <FileText className="h-12 w-12 text-[#8bc73b] group-hover:text-white transition-colors duration-300" />,
      title: t('services.tax'),
      description: t('home.taxDescription'),
      path: '/services/tax-advisory-planning'
    },
    {
      icon: <TrendingUp className="h-12 w-12 text-[#8bc73b] group-hover:text-white transition-colors duration-300" />,
      title: t('services.consulting'),
      description: t('home.consultingDescription'),
      path: '/services/business-advisory-consulting'
    },
    {
      icon: <ShieldCheck className="h-12 w-12 text-[#8bc73b] group-hover:text-white transition-colors duration-300" />,
      title: t('services.outsourcing'),
      description: t('home.outsourcingDescription'),
      path: '/services/outsourcing-services'
    },
    {
      icon: <Users className="h-12 w-12 text-[#8bc73b] group-hover:text-white transition-colors duration-300" />,
      title: t('services.humanCapital'),
      description: t('home.humanCapitalDescription'),
      path: '/services/human-capital'
    }
  ];

  const stats = [
    { icon: <Users className="h-8 w-8" />, value: 500, label: t('home.stats.happyClients'), suffix: '+' },
    { icon: <Award className="h-8 w-8" />, value: 17, label: t('home.stats.yearsExperience'), suffix: '+' },
    { icon: <TrendingUp className="h-8 w-8" />, value: 1000, label: t('home.stats.projectsCompleted'), suffix: '+' }
  ];

  const clients = [
    '/AA.png',
    '/AArevenue.jpg',
    'MoR.png',
    '/KBB.jpg',
    '/AABE.png',
    '/cbe.png',
    '/ACCA.jpg',
    '/Awash.png',
    '/Birhan.png',
    '/Bunna.png',
    '/civil.jpg',
    '/Cooperative.png',
    '/Custom.png',
    '/Dashin.png',
    '/es.jpeg',
    '/evangelican .jpeg',
    '/gospel.png',
    '/Green.png',
    '/ministry.png',
    '/MOTR.jpg',
    '/unity.png',
    '/Spe.png'
    // Add the same logos again to create a seamless loop
    '/AA.png',
    '/AArevenue.jpg',
    'MoR.png',
    '/KBB.jpg',
    '/AABE.png',
    '/cbe.png',
    '/ACCA.jpg',
    '/Awash.png',
    '/Birhan.png',
    '/Bunna.png',
    '/civil.jpg',
    '/Cooperative.png',
    '/Custom.png',
    '/Dashin.png',
    '/es.jpeg',
    '/evangelican.jpeg',
    '/gospel.png',
    '/Green.png',
    '/ministry.png',
    '/MOTR.jpg',
    '/unity.png',
    '/Spe.png'
  ];

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const scrollWidth = scrollContainer.scrollWidth;
    
    const handleScroll = () => {
      if (scrollContainer.scrollLeft >= scrollWidth / 2) {
        scrollContainer.scrollLeft = 0;
      }
    };

    scrollContainer.addEventListener('scroll', handleScroll);
    return () => scrollContainer.removeEventListener('scroll', handleScroll);
  }, []);

  const handleConsultationClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      window.location.href = '/contact';
    }, 500);
  };

  return (
    <div>
      <Hero />

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#70275a]">{t('home.servicesTitle')}</h2>
            <p className="mt-4 text-xl text-gray-600">{t('home.servicesSubtitle')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                onClick={() => handleServiceClick(service.path)}
                className="group bg-white p-8 rounded-xl shadow-lg hover:bg-[#70275a] hover:text-white transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
              >
                <div className="mb-6 flex justify-center">{service.icon}</div>
                <h3 className="text-2xl font-bold mb-4 text-center text-[#70275a] group-hover:text-white transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-center group-hover:text-gray-200 transition-colors duration-300">
                  {service.description}
                </p>
                <div className="mt-6 text-center">
                  <span className="inline-flex items-center text-[#8bc73b] group-hover:text-white transition-colors duration-300">
                    {t('home.learnMore')} <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#70275a] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center text-white">
                <div className="inline-block p-3 bg-white bg-opacity-10 rounded-full mb-4">
                  {stat.icon}
                </div>
                <div className="text-4xl font-bold mb-2">
                  <CountUp
                    end={stat.value}
                    duration={2}
                    suffix={stat.suffix}
                    enableScrollSpy
                    scrollSpyOnce
                  />
                </div>
                <div className="text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#70275a]">{t('home.clients.title')}</h2>
            <p className="mt-4 text-xl text-gray-600">{t('home.clients.subtitle')}</p>
          </div>

          <div 
            ref={scrollRef}
            className="relative flex overflow-x-hidden"
            style={{
              '--scroll-duration': '60s',
              '--scroll-pause': '0s'
            } as React.CSSProperties}
          >
            <div className="flex animate-[scroll_60s_linear_infinite] space-x-20 py-8">
              {clients.map((logo, index) => (
                <div 
                  key={index} 
                  className="flex-shrink-0 w-48 h-24 flex items-center justify-center"
                >
                  <img
                    src={logo}
                    alt={`Client ${index + 1}`}
                    className="max-w-full max-h-full object-contain transition-all duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#8bc73b] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            {t('home.cta.ready')}
          </h2>
          <p className="text-white text-xl mb-8">
            {t('home.cta.contact')}
          </p>
          <button
            onClick={handleConsultationClick}
            className="bg-white text-[#70275a] px-8 py-3 rounded-md font-semibold hover:bg-opacity-90 transition-all"
          >
            {t('home.cta.schedule')}
          </button>
        </div>
      </section>
    </div>
  );
}