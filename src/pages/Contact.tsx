import React, { useState, useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, Loader2, ChevronDown, Facebook, Instagram, Linkedin, Send } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import { useTranslation } from 'react-i18next';
import { supabase } from '../lib/supabase';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icon
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// Add custom styles for the attribution and fix z-index
const customMapStyle = `
  .leaflet-control-attribution {
    font-size: 8px !important;
    opacity: 0.6;
  }
  .leaflet-control-attribution a {
    color: #666;
  }
  .leaflet-container {
    z-index: 1 !important;
  }
  .leaflet-pane,
  .leaflet-control {
    z-index: 1 !important;
  }
  .leaflet-top,
  .leaflet-bottom {
    z-index: 1 !important;
  }
`;

const defaultIcon = new Icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface FormStatus {
  type: 'success' | 'error' | null;
  message: string;
}

export default function Contact() {
  const { t } = useTranslation();
  const contentRef = useRef<HTMLDivElement>(null);
  const [navbarHeight, setNavbarHeight] = useState(80);
  const [isMobileScreen, setIsMobileScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobileScreen(window.innerWidth <= 768);
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
        top: elementPosition,
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

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<FormStatus>({
    type: null,
    message: ''
  });

  const [markerPosition, setMarkerPosition] = useState<[number, number]>([
    9.019854175286163,
    38.800543853585545
  ]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow numbers and empty string
    if (value === '' || /^\d+$/.test(value)) {
      setFormData({
        ...formData,
        phone: value
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'phone') return; // Phone has its own handler
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus({ type: null, message: '' });

    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert([{
          name: formData.name,
          email: formData.email,
          phone: formData.phone || null,
          subject: formData.subject,
          message: formData.message
        }]);

      if (error) throw error;

      setFormStatus({
        type: 'success',
        message: t('contact.form.success')
      });

      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormStatus({
        type: 'error',
        message: t('contact.form.error')
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const savedPosition = localStorage.getItem('markerPosition');
    if (savedPosition) {
      setMarkerPosition(JSON.parse(savedPosition));
    }
  }, []);
  
  useEffect(() => {
    localStorage.setItem('markerPosition', JSON.stringify(markerPosition));
  }, [markerPosition]);

  return (
    <div className="min-h-screen">
      <style>{customMapStyle}</style>
      {/* Hero Section with Background Image */}
      <section className={`relative ${isMobileScreen ? 'h-[40vh]' : 'h-[80vh]'} flex items-center justify-center`}>
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1596524430615-b46475ddff6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"
            alt="Contact hero background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#70275a] bg-opacity-75"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className={`${isMobileScreen ? 'text-2xl mb-4' : 'text-3xl md:text-5xl lg:text-7xl mb-8'} font-bold text-white`}>
            {t('contact.title')}
          </h1>
          <p className={`${isMobileScreen ? 'text-base' : 'text-lg md:text-xl lg:text-3xl'} text-white max-w-4xl mx-auto leading-relaxed`}>
            {t('contact.subtitle')}
          </p>
        </div>
        {/* Animated Down Arrow */}
        <div 
          className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer z-20"
          onClick={scrollToContent}
        >
          <div className="animate-bounce">
            <div className="relative">
              <ChevronDown className={`${isMobileScreen ? 'w-6 h-6' : 'w-8 h-8 md:w-12 md:h-12'} text-white opacity-80 hover:opacity-100 transition-opacity`} />
              <div className="absolute top-0 left-0 w-full h-full animate-ping">
                <ChevronDown className={`${isMobileScreen ? 'w-6 h-6' : 'w-8 h-8 md:w-12 md:h-12'} text-white opacity-20`} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <div ref={contentRef} className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-gray-900">{t('contact.info.title')}</h2>
              <p className="text-lg text-gray-600">{t('contact.info.description')}</p>
              
              {/* Contact Details */}
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Mail className="w-6 h-6 text-[#70275a] mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{t('contact.info.email')}</h3>
                    <a href="mailto:info@example.com" className="text-gray-600 hover:text-[#70275a]">
                      info@example.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Phone className="w-6 h-6 text-[#70275a] mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{t('contact.info.phone')}</h3>
                    <a href="tel:+251912345678" className="text-gray-600 hover:text-[#70275a]">
                      +251 91 234 5678
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-[#70275a] mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{t('contact.info.address')}</h3>
                    <p className="text-gray-600">
                      Bole, Addis Ababa, Ethiopia
                    </p>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="h-[300px] rounded-lg overflow-hidden shadow-md">
                <MapContainer
                  center={markerPosition}
                  zoom={13}
                  style={{ height: '100%', width: '100%' }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <Marker position={markerPosition} icon={defaultIcon}>
                    <Popup>
                      Our Location
                    </Popup>
                  </Marker>
                </MapContainer>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gray-50 p-8 rounded-lg shadow-sm">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">{t('contact.form.title')}</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    {t('contact.form.name')}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#70275a] focus:ring-[#70275a] sm:text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    {t('contact.form.email')}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#70275a] focus:ring-[#70275a] sm:text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    {t('contact.form.phone')}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#70275a] focus:ring-[#70275a] sm:text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                    {t('contact.form.subject')}
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#70275a] focus:ring-[#70275a] sm:text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                    {t('contact.form.message')}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#70275a] focus:ring-[#70275a] sm:text-sm"
                  />
                </div>

                {formStatus.type && (
                  <div className={`rounded-md p-4 ${
                    formStatus.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
                  }`}>
                    {formStatus.message}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#70275a] hover:bg-[#8f3275] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#70275a] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                      {t('contact.form.sending')}
                    </>
                  ) : (
                    <>
                      <Send className="-ml-1 mr-2 h-4 w-4" />
                      {t('contact.form.submit')}
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Social Media Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">{t('contact.social.title')}</h2>
            <div className="flex justify-center space-x-6">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#70275a]"
              >
                <span className="sr-only">Facebook</span>
                <Facebook className="h-8 w-8" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#70275a]"
              >
                <span className="sr-only">Instagram</span>
                <Instagram className="h-8 w-8" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#70275a]"
              >
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="h-8 w-8" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}