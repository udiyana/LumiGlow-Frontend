import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import About from './pages/About';
import Service from './pages/Service';
import Experience from './pages/Experience';
import SpecialPromo from './pages/SpecialPromo';
import Blog from './pages/Blog';

// ===== HELPER: SCROLL MANAGER =====
function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const timer = setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 80);
      return () => clearTimeout(timer);
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [pathname, hash]);

  return null;
}

// ===== HELPER: PAGE WRAPPER WITH onNavigate =====
interface PageComponentProps {
  onNavigate?: (page: string) => void;
}

function PageRoute({ Component }: { Component: React.ComponentType<PageComponentProps> }) {
  const navigate = useNavigate();

  const handleNavigate = (page: string) => {
    switch (page.toLowerCase().trim()) {
      case 'home':
        navigate('/');
        break;
      case 'about':
        navigate('/about');
        break;
      case 'service':
        navigate('/service');
        break;
      case 'experience':
        navigate('/experience');
        break;
      case 'special promo':
      case 'specialpromo':
        navigate('/special-promo');
        break;
      case 'blog':
        navigate('/blog');
        break;
      default:
        navigate('/');
        break;
    }
  };

  return <Component onNavigate={handleNavigate} />;
}

// ===== MAIN APP COMPONENT =====
export default function App() {
  return (
    <BrowserRouter>
      <ScrollManager />
      <Routes>
        <Route path="/" element={<PageRoute Component={HomePage} />} />
        <Route path="/about" element={<PageRoute Component={About} />} />
        <Route path="/service" element={<PageRoute Component={Service} />} />
        <Route path="/experience" element={<PageRoute Component={Experience} />} />
        <Route path="/special-promo" element={<PageRoute Component={SpecialPromo} />} />
        <Route path="/blog" element={<PageRoute Component={Blog} />} />
        {/* Fallback route jika URL tidak dikenal: tampilkan HomePage */}
        <Route path="*" element={<PageRoute Component={HomePage} />} />
      </Routes>
    </BrowserRouter>
  );
}
