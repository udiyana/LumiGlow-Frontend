import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  onNavigate?: (page: string) => void;
}

export default function Navbar({ onNavigate }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const NAV_LINKS = [
    { label: "Home", href: "/", width: 61 },
    { label: "Service", href: "/service", width: 73 },
    { label: "Experience", href: "/experience", width: 100 },
    { label: "About", href: "/about", width: 62 },
    { label: "Special Promo", href: "/special-promo", width: 125 },
    { label: "Blog", href: "/blog", width: 50 },
  ];

  const checkIsActive = (link: typeof NAV_LINKS[0]) => {
    if (link.label === "Home") {
      return location.pathname === "/" && !location.hash;
    }
    if (link.label === "Service") {
      return location.pathname === "/service";
    }
    if (link.label === "Experience") {
      return location.pathname === "/experience";
    }
    if (link.label === "About") {
      return location.pathname === "/about";
    }
    if (link.label === "Special Promo") {
      return location.pathname === "/special-promo";
    }
    if (link.label === "Blog") {
      return location.pathname === "/blog";
    }
    return false;
  };

  const handleLinkClick = (label: string, href: string) => {
    if (onNavigate) {
      onNavigate(label);
    }
    setMobileOpen(false);

    // Jika sudah di route yang sama dan bukan hash link, scroll to top
    if (href === location.pathname && !location.hash) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-stone-200/80 shadow-xs h-24">
      <div className="w-full max-w-[1453px] mx-auto px-6 lg:px-8 xl:pr-[32px] xl:pl-[32px] h-full flex items-center justify-between">
        {/* Logo Kiri: tinggi 80px (h-20), w-auto, object-contain */}
        <Link
          to="/"
          className="flex items-center shrink-0 cursor-pointer"
          aria-label="LumiGlow Home"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <img
            src="/images/home/Logo-Lumiglow.png"
            alt="LumiGlow Logo"
            className="h-20 w-auto object-contain transition-transform duration-200 hover:scale-105"
          />
        </Link>

        {/* Navigasi Desktop: Menu (pill h-32 gap-8) + 24px gap + Tombol Book Now 178x42 */}
        <div className="hidden md:flex items-center">
          <nav className="flex items-center gap-[8px] mr-[24px]">
            {NAV_LINKS.map((link) => {
              const isActive = checkIsActive(link);
              return (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => handleLinkClick(link.label, link.href)}
                  style={{
                    width: `${link.width}px`,
                    height: "32px",
                    textDecoration: isActive ? "underline" : "none",
                    textDecorationColor: isActive ? "#C9A84C" : "transparent",
                    textDecorationThickness: isActive ? "2px" : "auto",
                    textUnderlineOffset: isActive ? "8px" : "auto",
                  }}
                  className={`inline-flex items-center justify-center text-[15px] tracking-normal transition-colors duration-200 cursor-pointer whitespace-nowrap ${
                    isActive
                      ? "text-[#111] font-semibold"
                      : "text-stone-700 hover:text-[#C9A84C] font-medium"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Tombol Book Now: 178x42px, rounded-[8px], bg #FFD400, kanan 32px dari tepi layar */}
          <Link
            to="/#book"
            onClick={() => handleLinkClick("Book Now", "/#book")}
            className="inline-flex items-center justify-center w-[178px] h-[42px] text-[14px] font-semibold rounded-[8px] cursor-pointer tracking-normal transition-all duration-200 hover:brightness-95 active:scale-95 bg-[#FFD400] text-[#1a1a1a] font-outfit shrink-0 about-btn-hover"
          >
            <span>Book Now</span>
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          className="md:hidden p-2 rounded-lg transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center text-[#1f1f1f]"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-24 left-0 right-0 bg-white border-b border-stone-200 px-6 py-5 space-y-3 shadow-xl z-50"
          >
            {NAV_LINKS.map((link) => {
              const isActive = checkIsActive(link);
              return (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => handleLinkClick(link.label, link.href)}
                  className={`block text-sm font-medium py-2 border-b border-stone-100 last:border-0 transition-colors ${
                    isActive
                      ? "text-[#C9A84C] font-semibold underline underline-offset-4"
                      : "text-stone-800 hover:text-[#C9A84C]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="pt-3">
              <Link
                to="/#book"
                onClick={() => handleLinkClick("Book Now", "/#book")}
                className="w-full text-center font-semibold h-[42px] text-sm transition-all flex items-center justify-center rounded-[8px] cursor-pointer hover:brightness-95 active:scale-95 bg-[#FFD400] text-[#1f1f1f] font-outfit"
              >
                Book Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
