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
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfqM-RLlDhz-83WKIqhXwPaWqy5nwlrh3S7A&s" 
                    alt={t('blog.posts.taxPlanning.imageAlt')} 
                    className="w-full h-48 md:h-full object-cover"
                  />
                </div>
                <div className="md:w-2/3 p-6">
                <div className="text-sm text-gray-500 mb-2">{t('blog.posts.taxPlanning.date')}</div>
                <h3 className="text-xl font-bold text-[#70275a] mb-2">{t('blog.posts.taxPlanning.title')}</h3>
                <p className="text-gray-600 mb-4" style={{ whiteSpace: 'pre-line' }}>
                  {t('blog.posts.taxPlanning.excerpt')}
                  {expandedPosts.taxPlanning && (
                    <span className="block mt-2" style={{ whiteSpace: 'pre-line' }}>
                      {t('blog.posts.taxPlanning.fullContent')}
                    </span>
                  )}
                  </p>
                  <button 
                    onClick={() => togglePostExpansion('taxPlanning')} 
                    className="text-[#70275a] font-medium hover:underline"
                  >
                    {expandedPosts.taxPlanning ? t('blog.posts.taxPlanning.showLess') : t('blog.posts.taxPlanning.readMore')} &rarr;
                  </button>
                </div>
              </div>
            </div>

            {/* Blog Post 2 - Horizontal Layout */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3">
                  <img 
                    src="https://newbusinessethiopia.com/amharic/wp-content/uploads/sites/4/2023/06/%E1%88%B5%E1%88%88%E1%8A%AA%E1%88%AB%E1%8B%AD-%E1%8C%88%E1%89%A2-%E1%8C%8D%E1%89%A5%E1%88%AD.jpg" 
                    alt={t('blog.posts.auditPreparation.imageAlt')} 
                    className="w-full h-48 md:h-full object-cover"
                  />
                </div>
                <div className="md:w-2/3 p-6">
                <div className="text-sm text-gray-500 mb-2">{t('blog.posts.auditPreparation.date')}</div>
                <h3 className="text-xl font-bold text-[#70275a] mb-2">{t('blog.posts.auditPreparation.title')}</h3>
                <p className="text-gray-600 mb-4" style={{ whiteSpace: 'pre-line' }}>
                  {t('blog.posts.auditPreparation.excerpt')}
                  {expandedPosts.auditPreparation && (
                    <span className="block mt-2" style={{ whiteSpace: 'pre-line' }}>
                      {t('blog.posts.auditPreparation.fullContent')}
                    </span>
                  )}
                  </p>
                  <button 
                    onClick={() => togglePostExpansion('auditPreparation')} 
                    className="text-[#70275a] font-medium hover:underline"
                  >
                    {expandedPosts.auditPreparation ? t('blog.posts.auditPreparation.showLess') : t('blog.posts.auditPreparation.readMore')} &rarr;
                  </button>
                </div>
              </div>
            </div>

            {/* Blog Post 3 - Horizontal Layout */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3">
                  <img 
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS2ctStmXcYs9vMjIOURpJDW7dsl_AwZuAOA&s" 
                    alt={t('blog.posts.businessGrowth.imageAlt')} 
                    className="w-full h-48 md:h-full object-cover"
                  />
                </div>
              <div className="md:w-2/3 p-6">
              <div className="text-sm text-gray-500 mb-2">{t('blog.posts.businessGrowth.date')}</div>
              <h3 className="text-xl font-bold text-[#70275a] mb-2">{t('blog.posts.businessGrowth.title')}</h3>
              <p className="text-gray-600 mb-4" style={{ whiteSpace: 'pre-line' }}>
                {t('blog.posts.businessGrowth.excerpt')}
                {expandedPosts.businessGrowth && (
                  <span className="block mt-2" style={{ whiteSpace: 'pre-line' }}>
                    {t('blog.posts.businessGrowth.fullContent')}
                  </span>
                )}
                  </p>
                  <button 
                    onClick={() => togglePostExpansion('businessGrowth')} 
                    className="text-[#70275a] font-medium hover:underline"
                  >
                    {expandedPosts.businessGrowth ? t('blog.posts.businessGrowth.showLess') : t('blog.posts.businessGrowth.readMore')} &rarr;
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