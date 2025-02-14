import { TrendingUp, CheckCircle2 } from 'lucide-react';
import OtherServices from '../components/OtherServices';
import { useTranslation } from 'react-i18next';

export default function BusinessAdvisoryConsulting() {
  const { t } = useTranslation();

  // Get the features list and ensure it's an array
  const featuresList = t('businessAdvisory.features.list', { returnObjects: true });
  const features = Array.isArray(featuresList) ? featuresList : [];

  // Get the benefits items and ensure it's an array
  const benefitsItems = t('businessAdvisory.benefits.items', { returnObjects: true });
  const benefits = Array.isArray(benefitsItems) ? benefitsItems : [];

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
        className="relative h-[500px] bg-cover bg-center bg-no-repeat -mt-20"
        style={{
          backgroundImage: 'url(/About.jpg)'
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-[#70275a] bg-opacity-85"></div>
        
        {/* Content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
            <div className="flex items-center justify-center mb-6">
              <TrendingUp className="w-16 h-16 text-[#8bc73b]" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">{t('businessAdvisory.title')}</h1>
            <p className="text-lg text-white max-w-3xl mx-auto opacity-90">
              {t('businessAdvisory.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-8 text-[#70275a]">{t('businessAdvisory.features.title')}</h2>
          <p className="text-lg text-gray-700 text-center max-w-4xl mx-auto mb-16">
            {t('businessAdvisory.features.description')}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
          <h2 className="text-4xl font-bold text-center mb-16 text-[#70275a]">{t('businessAdvisory.benefits.title')}</h2>
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
          <h2 className="text-3xl font-bold mb-8">{t('businessAdvisory.cta.title')}</h2>
          <p className="text-xl mb-8 opacity-90">{t('businessAdvisory.cta.subtitle')}</p>
          <button 
            onClick={handleContactClick}
            className="inline-block bg-[#8bc73b] text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-opacity-90 transition-colors"
          >
            {t('businessAdvisory.cta.button')}
          </button>
        </div>
      </section>

      {/* Other Services Section */}
      <OtherServices currentService="/services/business-advisory-consulting" />
    </div>
  );
}
