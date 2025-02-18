import { Users, CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import OtherServices from '../components/OtherServices';

export default function HumanCapitalService() {
  const { t } = useTranslation();

  // Get features with type checking and fallback
  const features = (() => {
    const translatedFeatures = t('humanCapitalService.features.list', {
      returnObjects: true,
      defaultValue: [
        'Identify and consult the human resource requirement of the business',
        'Provide trained employees',
        'Training need assessment',
        'Provide on job training and off job training',
        'Provide specialized practical training for the finance mangers',
        'Provide training for the tax officers and tax auditors',
        'Provide training on the tax and other business laws and regulations',
        'Human resource Appraisal service',
        'Providing finance training for non-Finance Managers/owners'
      ]
    });
    return Array.isArray(translatedFeatures) ? translatedFeatures : [];
  })();

  // Get benefits with type checking and fallback
  const benefits = (() => {
    const defaultBenefits = [
      {
        title: 'Expert Training',
        description: 'Access to specialized training programs tailored to your business needs'
      },
      {
        title: 'Skilled Workforce',
        description: 'Build and maintain a highly qualified team through our comprehensive HR services'
      },
      {
        title: 'Continuous Development',
        description: 'Ongoing support for employee growth and professional advancement'
      }
    ];

    const translatedBenefits = t('humanCapitalService.benefits.items', {
      returnObjects: true,
      defaultValue: defaultBenefits
    });
    return Array.isArray(translatedBenefits) ? translatedBenefits : defaultBenefits;
  })();

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      window.location.href = '/contact';
    }, 500);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative h-[500px] bg-cover bg-center bg-no-repeat -mt-0 md:-mt-20"
        style={{
          backgroundImage: 'url(/HR.jpg)'
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-[#70275a] bg-opacity-85"></div>
        
        {/* Content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 md:pt-20">
            <div className="flex items-center justify-center mb-6">
              <Users className="w-16 h-16 text-[#8bc73b]" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              {t('humanCapitalService.title', 'Human Capital Service')}
            </h1>
            <p className="text-lg text-white max-w-3xl mx-auto opacity-90">
              {t('humanCapitalService.subtitle', 'Comprehensive human resource solutions to develop and empower your workforce')}
            </p>
          </div>
        </div>
      </section>

      {/* Rest of the component remains unchanged */}
      {/* Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-8 text-[#70275a]">
            {t('humanCapitalService.features.title', 'Our Services Include')}
          </h2>
          <p className="text-lg text-gray-700 text-center max-w-4xl mx-auto mb-16">
            {t('humanCapitalService.features.subtitle', 'We offer our expertise to deliver the following human capital service to our clients.')}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-4 bg-white p-6 rounded-lg shadow-md">
                <CheckCircle2 className="w-6 h-6 text-[#8bc73b] flex-shrink-0" />
                <span className="text-lg text-gray-800">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}  
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16 text-[#70275a]">
            {t('humanCapitalService.benefits.title', 'Why Choose Our Services')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <h3 className="text-2xl font-bold mb-4 text-[#70275a]">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#70275a] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-8">
            {t('humanCapitalService.cta.title', 'Ready to Enhance Your Workforce?')}
          </h2>
          <p className="text-xl mb-8 opacity-90">
            {t('humanCapitalService.cta.subtitle', 'Contact us today for a consultation about your human capital needs')}
          </p>
          <button 
            onClick={handleContactClick}
            className="inline-block bg-[#8bc73b] text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-opacity-90 transition-colors"
          >
            {t('common.contactUs', 'Contact Us')}
          </button>
        </div>
      </section>

      {/* Other Services Section */}
      <OtherServices currentService="/services/human-capital" />
    </div>
  );
}