import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Blog() {
  const { t } = useTranslation();
  const contentRef = useRef<HTMLDivElement>(null);
  const [navbarHeight, setNavbarHeight] = useState(80);
  const [isMobileScreen, setIsMobileScreen] = useState(false);
  const [expandedPosts, setExpandedPosts] = useState<{[key: string]: boolean}>({
    taxPlanning: false,
    auditPreparation: false,
    businessGrowth: false
  });

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

  const togglePostExpansion = (postId: string) => {
    setExpandedPosts(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
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
          <div className="space-y-8">
            {/* Blog Post 1 - Horizontal Layout */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3">
                  <img 
                    src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                    alt={t('blog.posts.taxPlanning.imageAlt')} 
                    className="w-full h-48 md:h-full object-cover"
                  />
                </div>
                <div className="md:w-2/3 p-6">
                  <div className="text-sm text-gray-500 mb-2">{t('blog.posts.taxPlanning.date')}</div>
                  <h3 className="text-xl font-bold text-[#70275a] mb-2">{t('blog.posts.taxPlanning.title')}</h3>
                  <p className="text-gray-600 mb-4">
                    {t('blog.posts.taxPlanning.excerpt')}
                    {expandedPosts.taxPlanning && (
                      <span className="block mt-2">
                        {t('blog.posts.taxPlanning.fullContent', 
                          'Tax planning is a year-round strategy that can help individuals and businesses minimize their tax liability. By understanding the tax code and taking advantage of available deductions and credits, you can keep more of your hard-earned money. Our experts recommend reviewing your tax situation quarterly to identify opportunities for tax savings and to ensure compliance with changing regulations. This proactive approach can lead to significant savings and prevent surprises during tax season.')}
                      </span>
                    )}
                  </p>
                  <button 
                    onClick={() => togglePostExpansion('taxPlanning')} 
                    className="text-[#70275a] font-medium hover:underline"
                  >
                    {expandedPosts.taxPlanning ? t('blog.readLess') : t('blog.readMore')} &rarr;
                  </button>
                </div>
              </div>
            </div>

            {/* Blog Post 2 - Horizontal Layout */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3">
                  <img 
                    src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                    alt={t('blog.posts.auditPreparation.imageAlt')} 
                    className="w-full h-48 md:h-full object-cover"
                  />
                </div>
                <div className="md:w-2/3 p-6">
                  <div className="text-sm text-gray-500 mb-2">{t('blog.posts.auditPreparation.date')}</div>
                  <h3 className="text-xl font-bold text-[#70275a] mb-2">{t('blog.posts.auditPreparation.title')}</h3>
                  <p className="text-gray-600 mb-4">
                    {t('blog.posts.auditPreparation.excerpt')}
                    {expandedPosts.auditPreparation && (
                      <span className="block mt-2">
                        {t('blog.posts.auditPreparation.fullContent', 
                          'Preparing for an audit doesn\'t have to be stressful. With proper organization and documentation throughout the year, you can face an audit with confidence. Our team recommends maintaining detailed records of all financial transactions, keeping receipts organized by category, and documenting business expenses thoroughly. Additionally, having a clear understanding of your tax positions and the rationale behind them can help streamline the audit process. Working with a professional can also provide peace of mind and ensure you\'re fully prepared.')}
                      </span>
                    )}
                  </p>
                  <button 
                    onClick={() => togglePostExpansion('auditPreparation')} 
                    className="text-[#70275a] font-medium hover:underline"
                  >
                    {expandedPosts.auditPreparation ? t('blog.readLess') : t('blog.readMore')} &rarr;
                  </button>
                </div>
              </div>
            </div>

            {/* Blog Post 3 - Horizontal Layout */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3">
                  <img 
                    src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                    alt={t('blog.posts.businessGrowth.imageAlt')} 
                    className="w-full h-48 md:h-full object-cover"
                  />
                </div>
                <div className="md:w-2/3 p-6">
                  <div className="text-sm text-gray-500 mb-2">{t('blog.posts.businessGrowth.date')}</div>
                  <h3 className="text-xl font-bold text-[#70275a] mb-2">{t('blog.posts.businessGrowth.title')}</h3>
                  <p className="text-gray-600 mb-4">
                    {t('blog.posts.businessGrowth.excerpt')}
                    {expandedPosts.businessGrowth && (
                      <span className="block mt-2">
                        {t('blog.posts.businessGrowth.fullContent', 
                          'Strategic financial planning is essential for sustainable business growth. By analyzing your financial data, identifying trends, and forecasting future performance, you can make informed decisions that drive growth. Our financial experts recommend developing a comprehensive business plan that includes short-term and long-term goals, financial projections, and key performance indicators. Regular financial reviews and adjustments to your strategy based on actual performance can help keep your business on track for success.')}
                      </span>
                    )}
                  </p>
                  <button 
                    onClick={() => togglePostExpansion('businessGrowth')} 
                    className="text-[#70275a] font-medium hover:underline"
                  >
                    {expandedPosts.businessGrowth ? t('blog.readLess') : t('blog.readMore')} &rarr;
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