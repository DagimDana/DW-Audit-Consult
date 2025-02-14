import { useNavigate } from 'react-router-dom';
import { Calculator, FileText, TrendingUp, ShieldCheck, Users, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const services = [
  {
    icon: <Calculator className="w-12 h-12 text-[#8bc73b] group-hover:text-white transition-colors duration-300" />,
    name: 'services.audit',
    path: '/services/audit-services',
    description: 'services.auditDescription'
  },
  {
    icon: <FileText className="w-12 h-12 text-[#8bc73b] group-hover:text-white transition-colors duration-300" />,
    name: 'services.tax',
    path: '/services/tax-advisory-planning',
    description: 'services.taxDescription'
  },
  {
    icon: <TrendingUp className="w-12 h-12 text-[#8bc73b] group-hover:text-white transition-colors duration-300" />,
    name: 'services.consulting',
    path: '/services/business-advisory-consulting',
    description: 'services.consultingDescription'
  },
  {
    icon: <ShieldCheck className="w-12 h-12 text-[#8bc73b] group-hover:text-white transition-colors duration-300" />,
    name: 'services.outsourcing',
    path: '/services/outsourcing-services',
    description: 'services.outsourcingDescription'
  },
  {
    icon: <Users className="w-12 h-12 text-[#8bc73b] group-hover:text-white transition-colors duration-300" />,
    name: 'services.humanCapital',
    path: '/services/human-capital',
    description: 'services.humanCapitalDescription'
  }
];

interface OtherServicesProps {
  currentService: string;
}

export default function OtherServices({ currentService }: OtherServicesProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const otherServices = services.filter(service => service.path !== currentService);

  const handleNavigation = (path: string) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-16 text-[#70275a]">{t('otherServices.title')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {otherServices.map((service) => (
            <button
              key={service.path}
              onClick={() => handleNavigation(service.path)}
              className="group bg-white p-8 rounded-xl shadow-lg hover:bg-[#70275a] transition-all duration-300 transform hover:-translate-y-2 text-left w-full"
            >
              <div className="mb-6 flex justify-center">{service.icon}</div>
              <h3 className="text-2xl font-bold mb-4 text-center text-[#70275a] group-hover:text-white transition-colors duration-300">
                {t(service.name)}
              </h3>
              <p className="text-gray-600 text-center group-hover:text-gray-200 transition-colors duration-300 mb-6">
                {t(service.description)}
              </p>
              <div className="flex items-center justify-center">
                <span className="inline-flex items-center text-[#8bc73b] group-hover:text-white font-medium transition-colors duration-300">
                  {t('common.learnMore', 'Learn More')}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}