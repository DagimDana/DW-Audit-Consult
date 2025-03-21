import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Shield } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { supabase } from '../lib/supabase';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navbar() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    checkAdminStatus();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const checkAdminStatus = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data: { user } } = await supabase.auth.getUser();
        setIsAdmin(!!user);
      } else {
        setIsAdmin(false);
      }
    } catch (error) {
      console.error('Error checking admin status:', error);
      setIsAdmin(false);
    }
  };

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const services = [
    { name: t('services.audit'), path: '/services/audit-services' },
    { name: t('services.tax'), path: '/services/tax-advisory-planning' },
    { name: t('services.consulting'), path: '/services/business-advisory-consulting' },
    { name: t('services.outsourcing'), path: '/services/outsourcing-services' },
    { name: t('services.humanCapital'), path: '/services/human-capital' }
  ];

  const isServicePage = location.pathname.startsWith('/services/');
  const shouldBeTransparent = !isScrolled;

  const getLinkClasses = (path: string) => {
    const baseClasses = "px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300";
    const activeClasses = shouldBeTransparent ? 'text-[#8bc73b]' : 'text-[#70275a]';
    const inactiveClasses = shouldBeTransparent 
      ? 'text-white hover:text-[#8bc73b]' 
      : 'text-gray-700 hover:text-[#70275a]';
    
    return `${baseClasses} ${isActive(path) ? activeClasses : inactiveClasses}`;
  };

  const getServiceButtonClasses = () => {
    const baseClasses = "px-4 py-2 rounded-md text-sm font-medium flex items-center transition-colors duration-300";
    const activeClasses = shouldBeTransparent ? 'text-[#8bc73b]' : 'text-[#70275a]';
    const inactiveClasses = shouldBeTransparent 
      ? 'text-white hover:text-[#8bc73b]' 
      : 'text-gray-700 hover:text-[#70275a]';
    
    return `${baseClasses} ${isServicePage ? activeClasses : inactiveClasses}`;
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      shouldBeTransparent ? 'bg-transparent' : 'bg-white shadow-md'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo and Company Name Container */}
          <div className="flex-shrink-0 flex items-center max-w-[calc(100%-60px)] md:max-w-none">
            <Link to="/" className="flex items-center">
              <img 
                src="/logo.png" 
                alt={t('company.name')} 
                className="h-12 w-12 md:h-16 md:w-16 object-contain flex-shrink-0"
              />
              <div className="ml-2 md:ml-3 flex flex-col min-w-0">
                <span className={`text-base md:text-lg font-semibold leading-tight transition-colors duration-300 truncate ${
                  shouldBeTransparent ? 'text-white' : 'text-[#70275a]'
                }`}>
                  {t('company.name')}
                </span>
                <span className="text-xs md:text-sm text-[#8bc73b] transition-colors duration-300 truncate">
                  {t('company.title')}
                </span>
              </div>
            </Link>
          </div>

          <div className="hidden md:flex md:items-center md:space-x-4">
            <div className="flex space-x-1">
              <Link to="/" className={getLinkClasses('/')}>
                {t('nav.home')}
              </Link>
              <Link to="/about" className={getLinkClasses('/about')}>
                {t('nav.about')}
              </Link>
              <div className="relative group">
                <button className={getServiceButtonClasses()}>
                  {t('nav.services')} <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                <div className="absolute left-0 mt-2 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="py-1">
                    {services.map((service) => (
                      <Link
                        key={service.path}
                        to={service.path}
                        className={`block px-4 py-2 text-sm ${
                          isActive(service.path)
                            ? 'text-[#70275a] bg-gray-50'
                            : 'text-gray-700 hover:bg-gray-50 hover:text-[#70275a]'
                        }`}
                      >
                        {service.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <Link to="/blog" className={getLinkClasses('/blog')}>
                {t('nav.blog')}
              </Link>
              <Link to="/contact" className={getLinkClasses('/contact')}>
                {t('nav.contact')}
              </Link>
              {isAdmin && (
                <Link
                  to="/admin"
                  className={`flex items-center space-x-1 px-4 py-2 rounded-md text-sm font-medium ${
                    location.pathname === '/admin'
                      ? 'bg-[#70275a] text-white'
                      : shouldBeTransparent
                      ? 'bg-white/10 text-white hover:bg-white/20'
                      : 'bg-[#70275a]/10 text-[#70275a] hover:bg-[#70275a]/20'
                  } transition-all duration-300`}
                >
                  <Shield className="w-4 h-4" />
                  <span>{t('nav.admin')}</span>
                </Link>
              )}
            </div>
            <LanguageSwitcher />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-md transition-colors duration-300 ${
                shouldBeTransparent 
                  ? 'text-white hover:text-[#8bc73b] hover:bg-white/10' 
                  : 'text-gray-700 hover:text-[#70275a] hover:bg-gray-100'
              }`}
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-white shadow-lg z-50">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {/* Language Switcher in mobile menu */}
            <div className="px-3 py-2 border-b border-gray-200 mb-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">{t('language')}</span>
                <LanguageSwitcher />
              </div>
            </div>
            <Link
              to="/"
              className={`block px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/') ? 'text-[#70275a]' : 'text-gray-700 hover:text-[#70275a]'
              }`}
              onClick={() => setIsOpen(false)}
            >
              {t('nav.home')}
            </Link>
            <Link
              to="/about"
              className={`block px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/about') ? 'text-[#70275a]' : 'text-gray-700 hover:text-[#70275a]'
              }`}
              onClick={() => setIsOpen(false)}
            >
              {t('nav.about')}
            </Link>
            <button
              className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium flex items-center justify-between ${
                isServicePage ? 'text-[#70275a]' : 'text-gray-700 hover:text-[#70275a]'
              }`}
              onClick={() => setIsServicesOpen(!isServicesOpen)}
            >
              {t('nav.services')} <ChevronDown className={`h-4 w-4 transform ${isServicesOpen ? 'rotate-180' : ''}`} />
            </button>
            {isServicesOpen && (
              <div className="pl-6 space-y-1">
                {services.map((service) => (
                  <Link
                    key={service.path}
                    to={service.path}
                    className={`block px-3 py-2 text-sm rounded-md ${
                      isActive(service.path)
                        ? 'text-[#70275a] bg-gray-50'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-[#70275a]'
                    }`}
                    onClick={() => {
                      setIsOpen(false);
                      setIsServicesOpen(false);
                    }}
                  >
                    {service.name}
                  </Link>
                ))}
              </div>
            )}
            <Link
              to="/blog"
              className={`block px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/blog') ? 'text-[#70275a]' : 'text-gray-700 hover:text-[#70275a]'
              }`}
              onClick={() => setIsOpen(false)}
            >
              {t('nav.blog')}
            </Link>
            <Link
              to="/contact"
              className={`block px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/contact') ? 'text-[#70275a]' : 'text-gray-700 hover:text-[#70275a]'
              }`}
              onClick={() => setIsOpen(false)}
            >
              {t('nav.contact')}
            </Link>
            {isAdmin && (
              <Link
                to="/admin"
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname === '/admin'
                    ? 'bg-[#70275a] text-white'
                    : 'text-[#70275a] bg-[#70275a]/10 hover:bg-[#70275a]/20'
                }`}
                onClick={() => setIsOpen(false)}
              >
                <Shield className="w-4 h-4" />
                <span>{t('nav.admin')}</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
