import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import Admin from './Admin';
import SetPassword from './SetPassword';
import AuditServices from './pages/AuditServices';
import TaxAdvisoryPlanning from './pages/TaxAdvisoryPlanning';
import BusinessAdvisoryConsulting from './pages/BusinessAdvisoryConsulting';
import OutsourcingServices from './pages/OutsourcingServices';
import HumanCapitalService from './pages/HumanCapitalService';
import './i18n';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Routes>
          {/* Admin and SetPassword routes without Navbar and Footer */}
          <Route path="/admin" element={<Admin />} />
          <Route path="/set-password" element={<SetPassword />} />

          {/* All other routes with Navbar and Footer */}
          <Route
            path="*"
            element={
              <>
                <Navbar />
                <main className="flex-grow">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/blog" element={<Blog />} />
                    
                    {/* Service Detail Routes */}
                    <Route path="/services/audit-services" element={<AuditServices />} />
                    <Route path="/services/tax-advisory-planning" element={<TaxAdvisoryPlanning />} />
                    <Route path="/services/business-advisory-consulting" element={<BusinessAdvisoryConsulting />} />
                    <Route path="/services/outsourcing-services" element={<OutsourcingServices />} />
                    <Route path="/services/human-capital" element={<HumanCapitalService />} />
                  </Routes>
                </main>
                <Footer />
              </>
            }
          />
        </Routes>
        <Toaster position="top-right" />
      </div>
    </Router>
  );
}

export default App;