import { useTranslation } from 'react-i18next';
import OtherServices from '../components/OtherServices';

export default function Services() {
  const { t } = useTranslation();

  const processSteps = [
    {
      step: 1,
      title: t('services.process.consultation.title', 'Initial Consultation'),
      desc: t('services.process.consultation.description', 'Understanding your needs and objectives')
    },
    {
      step: 2,
      title: t('services.process.strategy.title', 'Strategy Development'),
      desc: t('services.process.strategy.description', 'Creating a tailored solution')
    },
    {
      step: 3,
      title: t('services.process.implementation.title', 'Implementation'),
      desc: t('services.process.implementation.description', 'Executing the planned strategy')
    },
    {
      step: 4,
      title: t('services.process.support.title', 'Ongoing Support'),
      desc: t('services.process.support.description', 'Continuous monitoring and adjustment')
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="h-[500px] bg-cover bg-center bg-no-repeat relative"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop")'
        }}
      >
        <div className="absolute inset-0 bg-[#70275a] bg-opacity-80"></div>
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-8 text-center">
            {t('services.mainTitle', 'Our Services')}
          </h1>
          <p className="text-xl text-center max-w-3xl mx-auto opacity-90">
            {t('services.mainDescription', 'Comprehensive accounting and business consulting solutions to help your business thrive')}
          </p>
        </div>
      </section>

      <OtherServices currentService="/services/tax-planning" />

      {/* Process Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16 text-[#70275a]">
            {t('services.process.title', 'Our Process')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {processSteps.map((item) => (
              <div key={item.step} className="text-center group">
                <div className="w-16 h-16 bg-[#70275a] text-white text-2xl font-bold rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-[#8bc73b] transition-colors duration-300">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}