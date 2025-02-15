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
      <section className={`relative ${isMobileScreen ? 'h-[60vh]' : 'h-[80vh]'} flex items-center justify-center`}>
        <div className="absolute inset-0">
          <img
            src="contact.jpg"
            alt="Contact hero background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#70275a] bg-opacity-75"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold mb-8 text-white">{t('contact.title')}</h1>
          <p className="text-lg md:text-xl lg:text-3xl text-white max-w-4xl mx-auto leading-relaxed">
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
              <ChevronDown className="w-8 h-8 md:w-12 md:h-12 text-white opacity-80 hover:opacity-100 transition-opacity" />
              <div className="absolute top-0 left-0 w-full h-full animate-ping">
                <ChevronDown className="w-8 h-8 md:w-12 md:h-12 text-white opacity-20" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-[#70275a] mb-4">{t('contact.reachOut')}</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">{t('contact.socialMedia.description')}</p>
          <div className="flex justify-center space-x-6">
            <a href="https://www.facebook.com/share/12Hug55LiD3/" target="_blank" rel="noopener noreferrer" className="text-[#70275a] hover:text-[#8bc73b] transition-colors">
              <Facebook className="w-8 h-8" />
            </a>
            <a href="https://www.instagram.com/dessalegnw.yesuss?igsh=MTlpamd4eXF3YWdnMg==" target="_blank" rel="noopener noreferrer" className="text-[#70275a] hover:text-[#8bc73b] transition-colors">
              <Instagram className="w-8 h-8" />
            </a>
            <a href="https://t.me/DessalegWYesussAuthorizedAccount" target="_blank" rel="noopener noreferrer" className="text-[#70275a] hover:text-[#8bc73b] transition-colors">
              <Send className="w-8 h-8" />
            </a>
            <a href="https://www.linkedin.com/in/dessalegn-w-yesuss-phd-26817996?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" className="text-[#70275a] hover:text-[#8bc73b] transition-colors">
              <Linkedin className="w-8 h-8" />
            </a>
            <a href="https://x.com/Dessalegn442217?t=Lfoz7g9I27jdLx3cxPVGVA&s=35" target="_blank" rel="noopener noreferrer" className="text-[#70275a] hover:text-[#8bc73b] transition-colors">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section ref={contentRef} className="py-16 relative z-10 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Phone className="w-8 h-8 text-[#8bc73b] mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-[#70275a]">{t('contact.info.phone')}</h3>
              <p className="text-gray-600">+251 911 311 257 <br/> +251 911 827 012</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Mail className="w-8 h-8 text-[#8bc73b] mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-[#70275a]">{t('contact.info.email')}</h3>
              <p className="text-gray-600">dessalegnw.yesuss@gmail.com<br/>dessalegnw.yesuss@yahoo.com</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <MapPin className="w-8 h-8 text-[#8bc73b] mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-[#70275a]">{t('contact.info.address')}</h3>
              <p className="text-gray-600">{t('contact.info.addressText')}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold mb-6 text-[#70275a]">{t('contact.form.title')}</h2>
              {formStatus.type && (
                <div
                  className={`p-4 rounded-md mb-6 ${
                    formStatus.type === 'success'
                      ? 'bg-green-50 text-green-800'
                      : 'bg-red-50 text-red-800'
                  }`}
                >
                  {formStatus.message}
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">{t('contact.form.name')}</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#70275a] focus:ring focus:ring-[#70275a] focus:ring-opacity-50 text-gray-900"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">{t('contact.form.email')}</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#70275a] focus:ring focus:ring-[#70275a] focus:ring-opacity-50 text-gray-900"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    {t('contact.form.phone')}
                    <span className="text-xs text-gray-500 ml-1">({t('contact.form.phone.numbersOnly')})</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    placeholder={t('contact.form.phone.placeholder')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#70275a] focus:ring focus:ring-[#70275a] focus:ring-opacity-50 text-gray-900"
                    pattern="\d*"
                    title={t('contact.form.phone.validation')}
                    disabled={isSubmitting}
                  />
                  <p className="mt-1 text-xs text-gray-500">{t('contact.form.phone.validation')}</p>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700">{t('contact.form.subject')}</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#70275a] focus:ring focus:ring-[#70275a] focus:ring-opacity-50 text-gray-900"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">{t('contact.form.message')}</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#70275a] focus:ring focus:ring-[#70275a] focus:ring-opacity-50 text-gray-900"
                    required
                    disabled={isSubmitting}
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#70275a] text-white px-6 py-3 rounded-md hover:bg-opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5" />
                      {t('contact.form.sending')}
                    </>
                  ) : (
                    t('contact.form.send')
                  )}
                </button>
              </form>
            </div>

            {/* Map Section */}
            <div className="relative">
              <h2 className="text-2xl font-bold mb-6 text-[#70275a]">{t('contact.location.title')}</h2>
              <div className="h-[400px] bg-gray-100 rounded-lg overflow-hidden relative">
                <MapContainer 
                  center={markerPosition}
                  zoom={15}
                  scrollWheelZoom={true}
                  className="h-full w-full"
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={markerPosition} icon={defaultIcon}>
                    <Popup>
                      {t('contact.location.popup')}
                    </Popup>
                  </Marker>
                </MapContainer>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}