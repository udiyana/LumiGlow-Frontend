import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Menu, X, Star, ArrowRight } from "lucide-react";

interface HomePageProps {
  onNavigate?: (page: string) => void;
}

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Service", href: "#service" },
  { label: "Experience", href: "#experience" },
  { label: "About", href: "#about" },
  { label: "Special Promo", href: "#promo" },
  { label: "Blog", href: "#blog" },
];

const SERVICES_DATA = [
  {
    id: 1,
    title: "Hair Cut",
    category: "hair",
    description:
      "A haircut that suits your face shape and lifestyle. We don't just cut hair, we help you feel confident with a style that's flattering and easy to maintain.",
    image: "/images/home/Service-PG-1.jpg",
  },
  {
    id: 2,
    title: "Hair Style",
    category: "hair",
    description:
      "Perfect hair for your special moments. Whether you want an elegant, casual, or bold look, our stylists are ready to bring your dream hairstyle to life.",
    image: "/images/home/Service-PG-1.jpg",
  },
  {
    id: 3,
    title: "Hair Color",
    category: "hair",
    description:
      "Hair color that reflects your personality. We use high-quality, low-damage products that protect and nourish your hair.",
    image: "/images/home/Service-PG-1.jpg",
  },
  {
    id: 4,
    title: "Hair Treatment",
    category: "hair",
    description:
      "Deep restorative botanical hair mask infused with Balinese oils to renew silky shine and protect strands.",
    image: "/images/home/Service-PG-1.jpg",
  },
  {
    id: 5,
    title: "Nail Art",
    category: "manicure",
    description:
      "Gentle nail shaping, cuticle treatment, and hydrating hand massage topped with premium gel or organic lacquer.",
    image: "/images/home/Service-PG-1.jpg",
  },
  {
    id: 6,
    title: "Spa Pedicure",
    category: "pedicure",
    description:
      "Relaxing foot soak, natural salt scrub exfoliation, and precision nail care for refreshed and radiant feet.",
    image: "/images/home/Service-PG-1.jpg",
  },
];

const TESTIMONIALS_DATA = [
  {
    id: 1,
    stars: 5,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    name: "Lorem ipsum",
    avatarColor: "#4E7F7A",
  },
  {
    id: 2,
    stars: 5,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    name: "Lorem ipsum",
    avatarColor: "#68807A",
  },
  {
    id: 3,
    stars: 5,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    name: "Lorem ipsum",
    avatarColor: "#D1D5DB",
  },
  {
    id: 4,
    stars: 5,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    name: "Lorem ipsum",
    avatarColor: "#E57373",
  },
];

// Double sequence ensures continuous coverage on high-res displays without gaps
const REVIEW_SEQUENCE = [...TESTIMONIALS_DATA, ...TESTIMONIALS_DATA];

const BLOG_DATA = [
  {
    id: 1,
    title: "Lorem ipsum dolor",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incidiu",
    image: "/images/home/Gallery-PG-1.jpg",
  },
  {
    id: 2,
    title: "Lorem ipsum dolor",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incidiu",
    image: "/images/home/Gallery-PG-1.jpg",
  },
  {
    id: 3,
    title: "Lorem ipsum dolor",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incidiu",
    image: "/images/home/Gallery-PG-1.jpg",
  },
];



export default function HomePage({ onNavigate }: HomePageProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "hair" | "manicure" | "pedicure">("all");
  const [activeDot, setActiveDot] = useState(0);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const serviceScrollRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, label: string, href: string) => {
    if (onNavigate) {
      onNavigate(label);
    }
    setMobileOpen(false);

    if (href.startsWith("#")) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      } else if (href === "#book") {
        const footer = document.querySelector("footer");
        if (footer) footer.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const filteredServices = SERVICES_DATA.filter((item) => {
    if (activeTab === "all") return true;
    return item.category === activeTab;
  });

  const handleTabChange = (tab: "all" | "hair" | "manicure" | "pedicure") => {
    setActiveTab(tab);
    if (serviceScrollRef.current) {
      serviceScrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
    setActiveDot(0);
  };

  const handleServiceScroll = () => {
    if (serviceScrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = serviceScrollRef.current;
      const totalScrollable = scrollWidth - clientWidth;
      if (totalScrollable > 0) {
        const progress = scrollLeft / totalScrollable;
        setActiveDot(progress > 0.4 ? 1 : 0);
      }
    }
  };

  const handleServiceScrollLeft = () => {
    if (serviceScrollRef.current) {
      const shift = serviceScrollRef.current.clientWidth + 21;
      serviceScrollRef.current.scrollBy({ left: -shift, behavior: "smooth" });
    }
  };

  const handleServiceScrollRight = () => {
    if (serviceScrollRef.current) {
      const shift = serviceScrollRef.current.clientWidth + 21;
      serviceScrollRef.current.scrollBy({ left: shift, behavior: "smooth" });
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!serviceScrollRef.current) return;
    isDraggingRef.current = true;
    startXRef.current = e.pageX - serviceScrollRef.current.offsetLeft;
    scrollLeftRef.current = serviceScrollRef.current.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || !serviceScrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - serviceScrollRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;
    serviceScrollRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    isDraggingRef.current = false;
  };

  return (
    <div className="min-h-screen text-[#111] bg-[#FFFDF6] font-['Inter',sans-serif] selection:bg-[#FACC15] selection:text-[#111]">
      {/* ─────────────────────────────────────────────────────────────
          1. NAVBAR
          bg putih solid, sesuai design Home-PG-1.
          Kiri: logo LB monogram emas dengan lekukan swoop lingkaran.
          Kanan: Navigasi (Home, Service, Experience, About, Special Promo, Blog) + tombol kuning "Book Now".
      ───────────────────────────────────────────────────────────── */}
      {/* ─── NAVBAR: Fixed solid white, 96px high, logo 80px, right-aligned menu group ─── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-stone-200/80 shadow-xs h-24">
        <div className="max-w-[1400px] w-full mx-auto px-6 lg:px-12 xl:px-16 h-full flex items-center justify-between">

          {/* ── Logo Kiri: tinggi 80px (h-20), w-auto, object-contain, tengah vertikal ── */}
          <a
            href="#home"
            onClick={(e) => handleLinkClick(e, "Home", "#home")}
            className="flex items-center group flex-shrink-0"
          >
            <img
              src="/images/home/Logo-Lumiglow.png"
              alt="LumiGlow Logo"
              className="h-20 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </a>

          {/* ── Kanan: Satu grup flex items-center gap-6 (24px) berisi menu navigasi lalu tombol Book Now ── */}
          <div className="hidden md:flex items-center gap-6">
            <nav className="flex items-center gap-x-7 lg:gap-x-9">
              {NAV_LINKS.map((link) => {
                const isHome = link.label === "Home";
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.label, link.href)}
                    className="nav-link text-[14px] font-medium tracking-normal transition-all duration-200 relative group text-[#1f1f1f] hover:text-black"
                  >
                    {link.label}
                    {/* Active underline for Home */}
                    <span
                      className="absolute -bottom-0.5 left-0 h-[1.5px] bg-[#1f1f1f] transition-all duration-200"
                      style={{ width: isHome ? "100%" : "0", bottom: "-3px" }}
                    />
                    {/* Hover underline for others */}
                    {!isHome && (
                      <span
                        className="absolute left-0 h-[1.5px] bg-[#C9A84C] w-0 group-hover:w-full transition-all duration-200"
                        style={{ bottom: "-3px" }}
                      />
                    )}
                  </a>
                );
              })}
            </nav>

            {/* Tombol Book Now: jarak dari Blog = 24px (gap-6) */}
            <a
              href="#book"
              onClick={(e) => handleLinkClick(e, "Book Now", "#book")}
              className="inline-flex items-center justify-center h-[38px] px-6 text-[14px] font-semibold rounded-[6px] cursor-pointer tracking-normal transition-all duration-200 hover:brightness-95 active:scale-95 bg-[#FFD400] text-[#1f1f1f] font-outfit min-w-[120px]"
            >
              Book Now
            </a>
          </div>

          {/* ── Mobile Hamburger ── */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            className="md:hidden p-2 rounded-lg transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center text-[#1f1f1f]"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* ── Mobile Dropdown ── */}
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-24 left-0 right-0 bg-white border-b border-stone-200 px-6 py-5 space-y-3 shadow-xl z-50"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.label, link.href)}
                className="block text-sm font-medium text-stone-800 hover:text-[#C9A84C] py-2 border-b border-stone-100 last:border-0 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3">
              <a
                href="#book"
                onClick={(e) => handleLinkClick(e, "Book Now", "#book")}
                className="block w-full text-center font-semibold h-[42px] text-sm transition-all flex items-center justify-center rounded-[6px] cursor-pointer hover:brightness-95 active:scale-95 bg-[#FFD400] text-[#1f1f1f] font-outfit"
              >
                Book Now
              </a>
            </div>
          </motion.div>
        )}
      </header>

      {/* ─────────────────────────────────────────────────────────────
          2. HERO — Full-screen background, thin overlay, watermark
          "Lashes" script di belakang heading kuning, dua tombol CTA.
      ───────────────────────────────────────────────────────────── */}
      <section
        id="home"
        className="relative w-full min-h-screen flex items-center overflow-hidden bg-stone-900"
        style={{
          backgroundImage: "url('/images/home/Background-Home.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center 30%",
        }}
      >
        {/* ── Thin dark overlay sesuai referensi (tidak terlalu gelap) ── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, rgba(0,0,0,0.50) 0%, rgba(0,0,0,0.30) 50%, rgba(0,0,0,0.08) 100%)",
            zIndex: 1,
          }}
        />

        {/* ── Content ── */}
        <div
          className="relative w-full max-w-[1400px] mx-auto px-6 lg:px-12 xl:px-16"
          style={{ zIndex: 10, paddingTop: "70px" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-[620px] text-left"
          >
            {/* ── Watermark "Lashes" script — z-index BAWAH heading ── */}
            <div className="relative">
              <motion.span
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                className="absolute pointer-events-none select-none"
                style={{
                  fontFamily: "'Great Vibes', 'Dancing Script', cursive",
                  fontSize: "clamp(3.8rem, 9vw, 7.5rem)",
                  lineHeight: 1,
                  color: "rgba(255,255,255,0.18)",
                  top: "-0.55em",
                  left: "-0.05em",
                  zIndex: 1,
                  whiteSpace: "nowrap",
                  letterSpacing: "0.02em",
                }}
              >
                
              </motion.span>

              {/* ── Heading utama ── z-index di atas watermark ── */}
              <h1
                className="relative font-['Rokkitt',serif] font-bold leading-[1.12] tracking-tight"
                style={{
                  fontSize: "clamp(2rem, 4.5vw, 3.6rem)",
                  color: "#FFD400",
                  textShadow: "0 2px 14px rgba(0,0,0,0.35)",
                  zIndex: 5,
                }}
              >
                Enhance Your Natural Beauty
              </h1>
            </div>

            {/* ── Sub-deskripsi ── */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="mt-5 md:mt-6 font-['Rokkitt',serif] font-normal leading-[1.75]"
              style={{
                fontSize: "clamp(0.88rem, 1.5vw, 1.05rem)",
                color: "#F5F5F5",
                textShadow: "0 1px 8px rgba(0,0,0,0.4)",
                maxWidth: "480px",
              }}
            >
              Experience luxury in Sanur, Bali—a perfect harmony between the
              artistic touch of professional hairstylists and the serenity of a
              tropical sanctuary.
            </motion.p>

            {/* ── Dual CTA Buttons ── */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.75 }}
              className="mt-8 md:mt-10 flex flex-wrap items-center gap-4"
            >
              {/* Book Now — kuning solid */}
              <a
                href="#book"
                onClick={(e) => handleLinkClick(e, "Book Now", "#book")}
                className="inline-flex items-center justify-center gap-2 cursor-pointer transition-all duration-200 hover:brightness-95 active:scale-95"
                style={{
                  backgroundColor: "#FFD400",
                  color: "#1E1E1E",
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 600,
                  fontSize: "15px",
                  borderRadius: "6px",
                  height: "46px",
                  paddingLeft: "28px",
                  paddingRight: "28px",
                  letterSpacing: "0.01em",
                }}
              >
                Book Now
                <ArrowRight size={16} strokeWidth={2.5} />
              </a>

              {/* Service — border putih transparan */}
              <a
                href="#service"
                onClick={(e) => handleLinkClick(e, "Service", "#service")}
                className="inline-flex items-center justify-center gap-2 cursor-pointer transition-all duration-200 hover:bg-white/20 active:scale-95"
                style={{
                  backgroundColor: "rgba(255,255,255,0.12)",
                  color: "#FFFFFF",
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 600,
                  fontSize: "15px",
                  borderRadius: "6px",
                  height: "46px",
                  paddingLeft: "28px",
                  paddingRight: "28px",
                  border: "1.5px solid rgba(255,255,255,0.75)",
                  letterSpacing: "0.01em",
                }}
              >
                Service
                <ArrowRight size={16} strokeWidth={2.5} />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. ABOUT US — identik dengan design referensi
          bg krem hangat, logo center atas, 2 kolom: teks kiri / 2 foto arch kanan
          Kedua foto SAMA ukuran, arch sempurna, baseline sejajar.
      ───────────────────────────────────────────────────────────── */}
      <section
        id="about"
        style={{
          scrollMarginTop: "70px",
          background: "#FBF5DC",
          paddingTop: "64px",
          paddingBottom: "80px",
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            paddingLeft: "clamp(24px, 4vw, 48px)",
            paddingRight: "clamp(24px, 4vw, 48px)",
          }}
        >
          {/* ── (a) Logo centered atas ── */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{ textAlign: "center", marginBottom: "44px" }}
          >
            <img
              src="/images/home/Logo-Lumiglow.png"
              alt="LumiGlow Monogram"
              style={{ height: "200px", width: "auto", objectFit: "contain", display: "inline-block" }}
            />
          </motion.div>

          {/* (b) Baris konten: Teks kiri | Foto kanan */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "40px",
              flexWrap: "wrap",
            }}
          >
            {/* Kolom Kiri — Teks ~40% */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ flex: "0 0 auto", width: "min(100%, 360px)" }}
            >
              <h2
                style={{
                  fontFamily: "'Raleway', sans-serif",
                  fontWeight: 300,
                  fontSize: "34px",
                  lineHeight: 1.2,
                  color: "#1a1a1a",
                  marginTop: 0,
                  marginBottom: "20px",
                  letterSpacing: "-0.01em",
                }}
              >
                About Us
              </h2>
              <p
                style={{
                  fontFamily: "'Raleway', sans-serif",
                  fontWeight: 400,
                  fontSize: "21px",
                  lineHeight: 1.7,
                  color: "#2b2b2b",
                  maxWidth: "360px",
                  marginTop: "20px",
                  marginBottom: "100px",
                }}
              >
                At LumiGlow, we redefine hair care and aesthetics not merely as
                a visual routine, but as a restorative ritual. Inspired by
                profound Balinese healing philosophies and the coastal serenity
                of Sanur, we treat every strand using pure botanical formulas
                free from harsh chemicals.
              </p>
            </motion.div>

            {/* Kolom Kanan — Dua foto arch ~55% */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.12 }}
              style={{
                flex: "1 1 auto",
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "flex-end",
                gap: "14px",
              }}
            >
              {/* Foto 1 — Interior salon */}
              <div
                style={{
                  width: "260px",
                  height: "340px",
                  borderRadius: "9999px 9999px 0 0",
                  overflow: "hidden",
                  flexShrink: 0,
                  backgroundColor: "#d4d4d4",
                }}
              >
                <img
                  src="/images/home/About-PG-1.jpg"
                  alt="LumiGlow Salon Interior"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                    display: "block",
                    transition: "transform 0.7s ease",
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLImageElement).style.transform = "scale(1.04)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLImageElement).style.transform = "scale(1)")}
                />
              </div>

              {/* Foto 2 — Rambut bergelombang */}
              <div
                style={{
                  width: "clamp(160px, 18vw, 260px)",
                  height: "clamp(240px, 27vw, 380px)",
                  borderRadius: "9999px 9999px 0 0",
                  overflow: "hidden",
                  flexShrink: 0,
                  backgroundColor: "#e5e5e5",
                }}
              >
                <img
                  src="/images/home/About-PG-2.jpg"
                  alt="LumiGlow Hair Styling"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                    display: "block",
                    transition: "transform 0.7s ease",
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLImageElement).style.transform = "scale(1.04)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLImageElement).style.transform = "scale(1)")}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. OUR SERVICE
          bg cream (#FFFDF6). Judul besar "Our Service" CENTERED.
          Filter pill di kiri atas (All, Hair, Manicure, Pedicure).
          Carousel scrollable dengan panah kiri (<) dan kanan (>) di samping kartu.
          Animasi scroll horizontal + hover zoom foto.
          Tombol kuning "View Detail" di pojok kanan bawah setiap kartu.
          Pagination dots di bawah.
      ───────────────────────────────────────────────────────────── */}
      {/* ─────────────────────────────────────────────────────────────
          4. OUR SERVICE
          Figma spec: background #FFF8E1, pt-[70px], pb-[37px]
          Heading: Raleway 300, 64px (40px on mobile), lh 61.6px, centered
          Wrapper: max-w-[1098px] mx-auto, tab filter 352x30px left-aligned
          Track: 3 cards x 352px + 2 gaps x 21px = 1098px, overflow-x-clip
          Cards: 352x444px, image 352x239px, Podkova 500 typography
      ───────────────────────────────────────────────────────────── */}
      <section id="service" className="w-full flex flex-col items-center pt-[70px] pb-[46px] bg-[#FBF5DC]">
        {/* Judul Besar CENTERED: Raleway 300, 64px, line-height 61.6px, hitam, rata tengah */}
        <h2 className="font-raleway font-[300] text-[40px] sm:text-[64px] leading-[61.6px] text-black text-center tracking-normal mb-[22px]">
          Our Service
        </h2>

        {/* Wrapper carousel: relative mx-auto, lebar 1098px (3 kartu 352px + 2 gap 21px) */}
        <div className="relative mx-auto w-[1098px] max-w-full px-4 xl:px-0">
          {/* Tab filter: lebar 352px (= 1 kartu), tinggi 30px, rata kiri sejajar tepi kiri kartu.
              bg putih, rounded-[18px], px-[7.7%], justify-center, gap-[37px], Podkova 500 16px #505050 */}
          <div className="flex justify-start mb-[48px]">
            <div className="w-[352px] h-[30px] px-[7.7%] bg-white rounded-[18px] inline-flex items-center justify-center gap-[37px] shadow-xs">
              {(["all", "hair", "manicure", "pedicure"] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => handleTabChange(tab)}
                  className={`font-podkova font-[500] text-[16px] text-[#505050] tracking-normal capitalize cursor-pointer transition-colors leading-none pb-0.5 ${
                    activeTab === tab
                      ? "underline underline-offset-4"
                      : "no-underline hover:text-stone-900"
                  }`}
                >
                  {tab === "all" ? "All" : tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Carousel Viewport dengan Panah Prev/Next */}
          <div className="relative w-full">
            {/* Tombol Panah Kiri (<): lingkaran 44x44px, abu gelap #4A4A4A, ikon putih, pusat vertikal kartu */}
            <button
              type="button"
              onClick={handleServiceScrollLeft}
              aria-label="Scroll services left"
              className="absolute top-1/2 -translate-y-1/2 z-20 w-[44px] h-[44px] rounded-full bg-[#4A4A4A] hover:bg-[#333] text-white hidden sm:flex left-2 xl:-left-[64px] items-center justify-center transition-all shadow-md cursor-pointer"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Tombol Panah Kanan (>): lingkaran 44x44px, abu gelap #4A4A4A, ikon putih, pusat vertikal kartu */}
            <button
              type="button"
              onClick={handleServiceScrollRight}
              aria-label="Scroll services right"
              className="absolute top-1/2 -translate-y-1/2 z-20 w-[44px] h-[44px] rounded-full bg-[#4A4A4A] hover:bg-[#333] text-white hidden sm:flex right-2 xl:-right-[64px] items-center justify-center transition-all shadow-md cursor-pointer"
            >
              <ChevronRight size={20} />
            </button>

            {/* Viewport carousel: overflow-x-clip (sehingga kartu ke-4 TIDAK terlihat) */}
            <div className="w-full overflow-x-clip">
              {/* Track Scroll Horizontal */}
              <div
                ref={serviceScrollRef}
                onScroll={handleServiceScroll}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUpOrLeave}
                onMouseLeave={handleMouseUpOrLeave}
                className="flex gap-[21px] overflow-x-auto scroll-smooth hide-scrollbar snap-x snap-mandatory cursor-grab active:cursor-grabbing select-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
              >
                {filteredServices.map((service, index) => (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                    className="w-full sm:w-[calc((100%-21px)/2)] lg:w-[352px] lg:basis-[calc((100%-42px)/3)] flex-none h-[444px] snap-start bg-white rounded-[15px] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden relative border border-stone-100 group"
                  >
                    {/* Gambar: 352x239px (aspect-[352/239]), object-cover, sudut atas membulat */}
                    <div className="relative w-full h-[239px] aspect-[352/239] overflow-hidden bg-stone-100 rounded-t-[15px] shrink-0">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      {/* Subtle animated light sweep on hover */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    </div>

                    {/* Area teks kartu */}
                    <div className="flex flex-col flex-1 pl-[3.7%] pr-[5.7%] pb-[5.1%]">
                      {/* Judul: Podkova 500 27px #515050, mt-[5.1%] di bawah gambar, mb-[4.8%] ke deskripsi */}
                      <h3 className="font-podkova font-[500] text-[27px] leading-tight text-[#515050] mt-[5.1%] mb-[4.8%]">
                        {service.title}
                      </h3>

                      {/* Deskripsi: Podkova 500 16px, line-height 18px, #505050, flex-1. TANPA line-clamp */}
                      <p className="font-podkova font-[500] text-[16px] leading-[18px] text-[#505050] flex-1">
                        {service.description}
                      </p>

                      {/* Tombol "View Detail": rata kanan, mt-auto, pt-[7.1%], rounded-[7px], px-[37px] py-[6px], Podkova 500 16px */}
                      <div className="flex justify-end mt-auto pt-[7.1%]">
                        <button
                          type="button"
                          onClick={() => onNavigate && onNavigate("Service")}
                          className="bg-[#FFD400] text-[#505050] font-podkova font-[500] text-[16px] rounded-[7px] px-[37px] py-[6px] hover:brightness-95 active:scale-95 transition-all inline-flex items-center justify-center cursor-pointer shadow-none"
                        >
                          View Detail
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Dots: mt-[48px] di bawah kartu */}
          <div className="flex justify-center items-center gap-[10px] mt-[48px]">
            <button
              type="button"
              onClick={() => {
                if (serviceScrollRef.current) {
                  serviceScrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
                }
                setActiveDot(0);
              }}
              aria-label="First services page"
              className={`rounded-full transition-all duration-300 cursor-pointer ${
                activeDot === 0
                  ? "w-[48px] h-[16px] bg-stone-700"
                  : "w-[16px] h-[16px] bg-stone-300 hover:bg-stone-400"
              }`}
            />
            <button
              type="button"
              onClick={() => {
                if (serviceScrollRef.current) {
                  serviceScrollRef.current.scrollTo({
                    left: serviceScrollRef.current.scrollWidth,
                    behavior: "smooth",
                  });
                }
                setActiveDot(1);
              }}
              aria-label="Second services page"
              className={`rounded-full transition-all duration-300 cursor-pointer ${
                activeDot === 1
                  ? "w-[48px] h-[16px] bg-stone-700"
                  : "w-[16px] h-[16px] bg-stone-300 hover:bg-stone-400"
              }`}
            />
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. GALLERY & SELECTED WORKS + 6. TESTIMONIALS
          Gradasi diagonal terpadu: bg-gradient-to-br from-[#5a4a0b] via-[#a38a17] to-[#e3c23f]
          Padding atas dan bawah 70px.
          Label: Podkova 400 32px, line-height 28px, letter-spacing -0.4px, putih, normal-case
          Heading: Raleway 600 48px, putih. Rata kiri sejajar tepi kiri grid.
          Grid mosaik: max-w-[1157px] aspect-[1157/703], tile absolute persen.
          Testimoni: 83px di bawah grid, full-bleed, kartu 357x313px, gap 37px, font Playfair 600 27px.
      ───────────────────────────────────────────────────────────── */}
      <section
        id="experience"
        className="relative w-full pt-[70px] pb-[70px] bg-gradient-to-br from-[#5a4a0b] via-[#a38a17] to-[#e3c23f] text-white overflow-hidden"
      >
        {/* Overlay sambungan gradasi Testimoni ke CTA */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[300px] [background-image:var(--cta-gradient)] [mask-image:linear-gradient(to_bottom,transparent,black)] [-webkit-mask-image:linear-gradient(to_bottom,transparent,black)]" />

        <div className="relative z-10 w-full max-w-[1157px] mx-auto px-4 xl:px-0">
          {/* Header KIRI: Label 32px & Judul 48px */}
          <div className="text-left">
            <span className="font-podkova font-[400] text-[32px] leading-[28px] tracking-[-0.4px] text-white normal-case block mb-[20px]">
              Inspiration & Visual Art
            </span>
            <h2 className="font-raleway font-[600] text-[48px] text-white tracking-normal leading-tight mb-[40px]">
              Gallery & Selected Works
            </h2>
          </div>

          {/* Grid Mosaik Desktop (≥768px): aspect-[1157/703] dengan 7 tile absolute persentase presisi */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeInUp}
            className="hidden md:block relative w-full max-w-[1157px] aspect-[1157/703] mx-auto"
          >
            {/* 1. Wanita pirang: left 0, top 0, width 43.48%, height 47.65% */}
            <div className="absolute left-0 top-0 w-[43.48%] h-[47.65%] rounded-[10px] border border-white/70 overflow-hidden shadow-sm">
              <img
                src="/images/home/Gallery-PG-1.jpg"
                alt="Gallery 1"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>

            {/* 2. Hair wash: left 0.17%, top 51.21%, width 43.05%, height 48.79% */}
            <div className="absolute left-[0.17%] top-[51.21%] w-[43.05%] h-[48.79%] rounded-[10px] border border-white/70 overflow-hidden shadow-sm">
              <img
                src="/images/home/Gallery-PG-2.jpg"
                alt="Gallery 2"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>

            {/* 3. Kuku pink: left 46.16%, top 0, width 24.07%, height 28.02% */}
            <div className="absolute left-[46.16%] top-0 w-[24.07%] h-[28.02%] rounded-[10px] border border-white/70 overflow-hidden shadow-sm">
              <img
                src="/images/home/Gallery-PG-3.jpg"
                alt="Gallery 3"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>

            {/* 4. Stylist potong rambut: left 46.16%, top 29.87%, width 24.07%, height 26.32% */}
            <div className="absolute left-[46.16%] top-[29.87%] w-[24.07%] h-[26.32%] rounded-[10px] border border-white/70 overflow-hidden shadow-sm">
              <img
                src="/images/home/Gallery-PG-4.jpg"
                alt="Gallery 4"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>

            {/* 5. Kuku nude: left 46.16%, top 59.17%, width 18.55%, height 40.83% */}
            <div className="absolute left-[46.16%] top-[59.17%] w-[18.55%] h-[40.83%] rounded-[10px] border border-white/70 overflow-hidden shadow-sm">
              <img
                src="/images/home/Gallery-PG-5.jpg"
                alt="Gallery 5"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>

            {/* 6. Rambut foil: left 72.22%, top 0, width 27.78%, height 56.90% */}
            <div className="absolute left-[72.22%] top-0 w-[27.78%] h-[56.90%] rounded-[10px] border border-white/70 overflow-hidden shadow-sm">
              <img
                src="/images/home/Gallery-PG-6.jpg"
                alt="Gallery 6"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>

            {/* 7. Coloring sarung tangan hitam: left 67.04%, top 60.74%, width 32.96%, height 39.26% */}
            <div className="absolute left-[67.04%] top-[60.74%] w-[32.96%] h-[39.26%] rounded-[10px] border border-white/70 overflow-hidden shadow-sm">
              <img
                src="/images/home/Gallery-PG-7.jpg"
                alt="Gallery 7"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          </motion.div>

          {/* Grid Mobile (<768px): 2 kolom, tiap foto aspect-[4/5] */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeInUp}
            className="grid grid-cols-2 gap-3 md:hidden"
          >
            <div className="aspect-[4/5] rounded-[10px] border border-white/70 overflow-hidden shadow-sm">
              <img src="/images/home/Gallery-PG-1.jpg" alt="Gallery 1" className="w-full h-full object-cover" />
            </div>
            <div className="aspect-[4/5] rounded-[10px] border border-white/70 overflow-hidden shadow-sm">
              <img src="/images/home/Gallery-PG-2.jpg" alt="Gallery 2" className="w-full h-full object-cover" />
            </div>
            <div className="aspect-[4/5] rounded-[10px] border border-white/70 overflow-hidden shadow-sm">
              <img src="/images/home/Gallery-PG-3.jpg" alt="Gallery 3" className="w-full h-full object-cover" />
            </div>
            <div className="aspect-[4/5] rounded-[10px] border border-white/70 overflow-hidden shadow-sm">
              <img src="/images/home/Gallery-PG-4.jpg" alt="Gallery 4" className="w-full h-full object-cover" />
            </div>
            <div className="aspect-[4/5] rounded-[10px] border border-white/70 overflow-hidden shadow-sm">
              <img src="/images/home/Gallery-PG-5.jpg" alt="Gallery 5" className="w-full h-full object-cover" />
            </div>
            <div className="aspect-[4/5] rounded-[10px] border border-white/70 overflow-hidden shadow-sm">
              <img src="/images/home/Gallery-PG-6.jpg" alt="Gallery 6" className="w-full h-full object-cover" />
            </div>
            <div className="col-span-2 aspect-[16/9] rounded-[10px] border border-white/70 overflow-hidden shadow-sm">
              <img src="/images/home/Gallery-PG-7.jpg" alt="Gallery 7" className="w-full h-full object-cover" />
            </div>
          </motion.div>
        </div>

        {/* ── Testimonials (Marquee / Infinite Scroll) 83px di bawah grid gallery, full-bleed ── */}
        <div className="relative z-10 mt-[83px] w-full overflow-hidden select-none">
          <div className="review-scroll-wrapper relative w-full overflow-hidden">
            <div className="flex w-max">
              {/* Sequence 1 */}
              <div className="animate-review-scroll flex gap-[37px] pr-[37px]">
                {REVIEW_SEQUENCE.map((t, idx) => (
                  <div
                    key={`rev-1-${idx}`}
                    className="w-[280px] md:w-[357px] h-[313px] flex-none bg-white p-[25px] rounded-[16px] shadow-sm flex flex-col justify-between text-stone-900 border border-stone-100 transition-transform duration-300 hover:-translate-y-1"
                  >
                    <div>
                      {/* 5 Bintang Emas Pucat: ±32px, warna #F4D58D */}
                      <div className="flex items-center gap-1 mb-2 text-[#F4D58D]">
                        {Array.from({ length: t.stars }).map((_, i) => (
                          <Star key={i} size={32} fill="#F4D58D" stroke="#F4D58D" />
                        ))}
                      </div>

                      {/* Teks Ulasan: 15px, line-height ±1.2, #333, TANPA line-clamp */}
                      <p className="text-[15px] leading-[1.2] text-[#333] font-normal mb-4">
                        {t.text}
                      </p>
                    </div>

                    {/* Footer Kartu: Avatar bulat ±55px + Nama Playfair Display 600 ±27px */}
                    <div className="flex items-center gap-[14px] pt-1 mt-auto">
                      <div
                        className="w-[55px] h-[55px] rounded-full shrink-0 shadow-xs"
                        style={{ backgroundColor: t.avatarColor || "#7C8F86" }}
                      />
                      <span className="font-playfair font-[600] text-[27px] text-[#111] leading-none">
                        {t.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Sequence 2 (Duplikasi identik untuk seamless looping matematis) */}
              <div className="animate-review-scroll flex gap-[37px] pr-[37px]" aria-hidden="true">
                {REVIEW_SEQUENCE.map((t, idx) => (
                  <div
                    key={`rev-2-${idx}`}
                    className="w-[280px] md:w-[357px] h-[313px] flex-none bg-white p-[25px] rounded-[16px] shadow-sm flex flex-col justify-between text-stone-900 border border-stone-100 transition-transform duration-300 hover:-translate-y-1"
                  >
                    <div>
                      {/* 5 Bintang Emas Pucat: ±32px, warna #F4D58D */}
                      <div className="flex items-center gap-1 mb-2 text-[#F4D58D]">
                        {Array.from({ length: t.stars }).map((_, i) => (
                          <Star key={i} size={32} fill="#F4D58D" stroke="#F4D58D" />
                        ))}
                      </div>

                      {/* Teks Ulasan: 15px, line-height ±1.2, #333, TANPA line-clamp */}
                      <p className="text-[15px] leading-[1.2] text-[#333] font-normal mb-4">
                        {t.text}
                      </p>
                    </div>

                    {/* Footer Kartu: Avatar bulat ±55px + Nama Playfair Display 600 ±27px */}
                    <div className="flex items-center gap-[14px] pt-1 mt-auto">
                      <div
                        className="w-[55px] h-[55px] rounded-full shrink-0 shadow-xs"
                        style={{ backgroundColor: t.avatarColor || "#7C8F86" }}
                      />
                      <span className="font-playfair font-[600] text-[27px] text-[#111] leading-none">
                        {t.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          7. PROMOTIONAL CALL TO ACTION (CTA)
          Struktur desktop ≥768px: semua ukuran dalam vw.
          Gradasi: absolute inset-x-0 top-0 bottom-[10.31vw] [background-image:var(--cta-gradient)].
          Foto produk: absolute inset-x-0 bottom-0, w-full h-auto, mix-blend-multiply,
          berada di stacking context yang sama dengan gradasi (tanpa intermediate wrapper).
      ───────────────────────────────────────────────────────────── */}
      <section
        id="cta"
        className="relative w-full bg-white overflow-hidden md:h-[44.48vw]"
      >
        {/* Layer 1 (paling belakang): Gradasi emas terang di kiri ke olive gelap di kanan */}
        <div className="absolute inset-x-0 top-0 bottom-[10.31vw] [background-image:var(--cta-gradient)]" />

        {/* Layer 2: Foto produk desktop (≥768px), full-bleed, mix-blend-multiply di stacking context yang sama dengan gradasi */}
        <img
          src="/images/home/CTA-Home-PG-1.jpg"
          alt="LumiGlow Signature Beauty & Hair Care Collection"
          className="hidden md:block absolute inset-x-0 bottom-0 w-full h-auto mix-blend-multiply pointer-events-none"
        />

        {/* ── Desktop Elements (≥768px) ── */}
        {/* Heading: absolute top-[3.9vw] inset-x-0 text-center whitespace-nowrap, Raleway 600, text-[4.2vw], leading-[1.2], putih, SATU baris */}
        <h2 className="hidden md:block absolute top-[3.9vw] inset-x-0 mx-auto w-fit text-center whitespace-nowrap font-raleway font-semibold text-[4.2vw] leading-[1.2] text-white tracking-normal z-10">
          Ready for Your Signature Glow?
        </h2>

        {/* Paragraf: absolute top-[10.9vw] inset-x-0 mx-auto w-[82vw] text-center, Raleway 400, text-[2.3vw], leading-[3.24vw], putih */}
        <p className="hidden md:block absolute top-[10.9vw] inset-x-0 mx-auto w-[82vw] text-center font-raleway font-normal text-[2.3vw] leading-[3.24vw] text-white z-10">
          <span className="inline-block whitespace-nowrap">Your best hair and skin days are just one click away. Step into Lumiglow Beauty</span>
          <br />
          <span className="inline-block whitespace-nowrap">and let our experts bring out your natural radiance.</span>
        </p>

        {/* Tombol "Book Now" dan "Service": absolute top-[18.85vw] inset-x-0, flex justify-center gap-[8.84vw], z-10 */}
        <div className="hidden md:flex absolute top-[18.85vw] inset-x-0 justify-center gap-[8.84vw] z-10">
          <a
            href="#book"
            onClick={(e) => handleLinkClick(e, "Book Now", "#book")}
            className="w-[21.2vw] h-[4.57vw] bg-[#FFD400] rounded-[0.45vw] text-[#1a1a1a] font-roboto font-medium text-[2.55vw] inline-flex items-center justify-center transition-all hover:brightness-95 active:scale-95 cursor-pointer shadow-md"
          >
            Book Now
          </a>
          <a
            href="#service"
            onClick={(e) => handleLinkClick(e, "Service", "#service")}
            className="w-[21.2vw] h-[4.57vw] bg-[#FFD400] rounded-[0.45vw] text-[#1a1a1a] font-roboto font-medium text-[2.55vw] inline-flex items-center justify-center transition-all hover:brightness-95 active:scale-95 cursor-pointer shadow-md"
          >
            Service
          </a>
        </div>

        {/* ── Mobile Layout (<768px): mengalir ── */}
        <div className="md:hidden relative z-10 pt-[56px] flex flex-col items-center text-center px-5">
          <h2 className="font-raleway font-semibold text-[clamp(26px,7vw,40px)] leading-[1.2] text-white tracking-normal">
            Ready for Your Signature Glow?
          </h2>
          <p className="font-raleway font-normal text-[16px] leading-[1.5] text-white mt-4">
            Your best hair and skin days are just one click away. Step into Lumiglow Beauty
            and let our experts bring out your natural radiance.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a
              href="#book"
              onClick={(e) => handleLinkClick(e, "Book Now", "#book")}
              className="px-8 py-3 text-[18px] bg-[#FFD400] text-[#1a1a1a] font-roboto font-medium rounded-md shadow-md hover:brightness-95 active:scale-95"
            >
              Book Now
            </a>
            <a
              href="#service"
              onClick={(e) => handleLinkClick(e, "Service", "#service")}
              className="px-8 py-3 text-[18px] bg-[#FFD400] text-[#1a1a1a] font-roboto font-medium rounded-md shadow-md hover:brightness-95 active:scale-95"
            >
              Service
            </a>
          </div>
          <div className="relative w-full mt-8 pointer-events-none">
            <img
              src="/images/home/CTA-Home-PGG-1.jpg"
              alt="LumiGlow Signature Beauty & Hair Care Collection"
              className="w-full h-auto mix-blend-multiply block"
            />
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          8. OUR BLOG
          Background section krem #FFF8E1. Container max-w-[1134px] mx-auto.
          3 kartu 352px, gap 39px, tinggi sama 448px. <1024px: 2 kartu, <640px: 1 kartu.
          Padding bawah section ≈101px. Jarak dari bawah CTA ke atas kartu ≈191px.
      ───────────────────────────────────────────────────────────── */}
      <section id="blog" className="bg-[#FFF8E1] pt-[45px] pb-[121px] w-full">
        <div className="w-full max-w-[1134px] mx-auto px-4 xl:px-0">
          {/* Centered Heading "Our Blog": total jarak dari CTA ke kartu = 45 + ~100 + 46 = 191px */}
          <h2 className="font-raleway font-light text-[40px] sm:text-[64px] leading-tight text-[#1E1E1E] text-center mb-[46px] tracking-tight">
            Our Blog
          </h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[39px] justify-items-center"
          >
            {BLOG_DATA.map((article) => (
              <div
                key={article.id}
                className="w-[352px] max-w-full h-[448px] bg-white rounded-[16px] shadow-[0_4px_14px_rgba(0,0,0,0.18)] relative transition-all duration-300 hover:shadow-xl group flex flex-col shrink-0"
              >
                {/* Gambar: inset 10px dari tepi atas, kiri, kanan. Ukuran 332x201px, object-cover, rounded-[10px] */}
                <div className="pt-[10px] px-[10px]">
                  <div className="w-full h-[201px] rounded-[10px] overflow-hidden bg-stone-100">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>

                {/* Judul: Playfair Display 400, 28px, #222, padding-left 30px, ±24px di bawah gambar */}
                <h3 className="font-playfair font-normal text-[28px] leading-tight text-[#222] pl-[30px] pr-[30px] mt-[24px]">
                  {article.title}
                </h3>

                {/* Deskripsi: font sans website, 13px, line-height 18px, #333, padding kiri dan kanan 30px, ±14px di bawah judul, line-clamp-2 */}
                <p className="font-['Inter',sans-serif] text-[13px] leading-[18px] text-[#333] px-[30px] mt-[14px] line-clamp-2">
                  {article.desc}
                </p>

                {/* Tombol: lingkaran 40px, bg #F2C419, ikon chevron-right PUTIH tebal (stroke 3), absolute right-[32px] bottom-[28px] */}
                <button
                  type="button"
                  onClick={() => onNavigate && onNavigate("Blog")}
                  aria-label={`Read article: ${article.title}`}
                  className="w-[40px] h-[40px] rounded-full bg-[#F2C419] hover:brightness-95 active:scale-95 text-white flex items-center justify-center transition-all cursor-pointer shadow-xs absolute right-[32px] bottom-[28px]"
                >
                  <ChevronRight size={20} strokeWidth={3} className="text-white ml-0.5" />
                </button>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          9. FOOTER
          bg olive #8B7A2E (BUKAN hitam).
          4 kolom:
          (1) logo LB putih + "LUMIGLOW" + "Social" + 3 ikon sosial bulat kuning;
          (2) "Explore": Home, Service, Experience, About, Special Promo, Blog;
          (3) "Visit Us" + gambar peta rounded;
          (4) "Every Day : 10.00 - 22.00" + alamat + input email pill putih dg tombol panah kuning.
          Bar bawah: "© 2025 by LumiglowBeautySalon" centered.
      ───────────────────────────────────────────────────────────── */}
      {/* ─────────────────────────────────────────────────────────────
          9. FOOTER
          Bagian olive: full-bleed, tinggi ≈412px, bg ≈#A68B0C, teks putih.
          Container max-w-[1349px] mx-auto.
          Grid 4 kolom: 299px 246px 436px 368px.
          Kolom 1: logo LB 95px, "LUMIGLOW", "Social", 3 ikon emas 46px glyph olive.
          Kolom 2: Explore 6 links line-height 35px.
          Kolom 3: Visit Us, peta 413x270px rounded-[12px].
          Kolom 4: Every Day, jam, alamat, input email pill 362x50px.
          Bar bawah: copyright full-bleed putih 76px.
      ───────────────────────────────────────────────────────────── */}
      <footer className="w-full">
        {/* Bagian Olive */}
        <div className="w-full bg-[#A68B0C] text-white pt-[42px] pb-[38px] lg:h-[412px] box-border">
          <div className="w-full max-w-[1349px] mx-auto px-5 lg:px-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[299px_246px_436px_368px] gap-8 lg:gap-0">
              {/* Kolom 1: Logo LB Putih + LUMIGLOW + Social + 3 Ikon Emas Solid Glyph Olive */}
              <div className="flex flex-col items-start pt-[8px]">
                <img
                  src="/images/home/Logo-Lumiglow.png"
                  alt="LumiGlow Logo"
                  className="h-[95px] w-auto object-contain block brightness-0 invert"
                />
                <span className="font-playfair font-normal text-[34px] leading-tight text-white tracking-normal block max-w-[178px] mt-1">
                  LUMIGLOW
                </span>

                <div className="h-[62px] flex items-center mt-[15px]">
                  <span className="font-raleway font-semibold text-[20px] text-white">
                    Social
                  </span>
                </div>

                <div className="flex items-center gap-[8px]">
                  {/* Facebook: rounded-full */}
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Facebook"
                    className="w-[46px] h-[46px] rounded-full bg-[#F2C419] flex items-center justify-center transition-transform hover:scale-105 cursor-pointer"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="#A68B0C">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                  </a>
                  {/* Instagram: rounded-[12px] */}
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Instagram"
                    className="w-[46px] h-[46px] rounded-[12px] bg-[#F2C419] flex items-center justify-center transition-transform hover:scale-105 cursor-pointer"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#A68B0C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                  </a>
                  {/* TikTok: rounded-[12px] */}
                  <a
                    href="https://tiktok.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="TikTok"
                    className="w-[46px] h-[46px] rounded-[12px] bg-[#F2C419] flex items-center justify-center transition-transform hover:scale-105 cursor-pointer"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="#A68B0C">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V9.41a8.16 8.16 0 0 0 4.77 1.52V7.5a4.85 4.85 0 0 1-1-.81z" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Kolom 2: Explore */}
              <div className="flex flex-col items-start">
                <div className="h-[62px] flex items-center">
                  <h4 className="font-raleway font-semibold text-[20px] text-white">
                    Explore
                  </h4>
                </div>
                <div className="mt-[12px] flex flex-col">
                  {NAV_LINKS.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.label, link.href)}
                      className="font-raleway font-normal text-[20px] text-white leading-[35px] hover:text-stone-200 transition-colors block"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>

              {/* Kolom 3: Visit Us + Peta 413x270px Rounded-[12px] */}
              <div className="flex flex-col items-start">
                <div className="h-[62px] flex items-center">
                  <h4 className="font-raleway font-semibold text-[20px] text-white">
                    Visit Us
                  </h4>
                </div>
                <div className="w-[413px] max-w-full h-[270px] rounded-[12px] overflow-hidden relative shadow-sm bg-stone-100 block">
                  <iframe
                    src="https://maps.google.com/maps?q=Jl.+Danau+Tamblingan+No.27,+Sanur,+Denpasar+Selatan,+Bali&t=&z=15&ie=UTF8&iwloc=&output=embed"
                    className="w-full h-full border-0 pointer-events-none"
                    loading="lazy"
                    title="LumiGlow Sanur Map Location"
                  />
                  <a
                    href="https://maps.google.com/?q=Jl.+Danau+Tamblingan+No.27,+Sanur,+Denpasar+Selatan,+Kota+Denpasar,+Bali+80228"
                    target="_blank"
                    rel="noreferrer"
                    title="Buka Lokasi LumiGlow di Google Maps"
                    className="absolute bottom-2.5 right-2.5 bg-white/95 text-stone-900 text-[11px] font-medium px-2 py-0.5 rounded shadow-xs hover:bg-white transition-colors"
                  >
                    <span>Google Maps ↗</span>
                  </a>
                </div>
              </div>

              {/* Kolom 4: Jam Buka, Alamat & Input Email Pill Putih 362x50px */}
              <div className="flex flex-col items-start">
                {/* Spacer 62px agar teks jam sejajar dengan atas peta di Kolom 3 */}
                <div className="h-[62px] hidden lg:block" />
                <div className="h-[270px] flex flex-col justify-between w-full">
                  <div>
                    <span className="block font-raleway font-normal text-[22px] leading-[31px] text-white">
                      Every Day :
                    </span>
                    <span className="block font-raleway font-normal text-[22px] leading-[31px] text-white">
                      10. 00 - 22.00
                    </span>
                    <p className="mt-[7px] font-raleway font-light text-[16px] leading-[31px] text-white max-w-[360px]">
                      Jl. Danau Tamblingan No.27, Sanur, Denpasar Selatan, Kota Denpasar, Bali 80228, Indonesia
                    </p>
                  </div>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (newsletterEmail) {
                        alert(`Thank you for subscribing to LumiGlow newsletter: ${newsletterEmail}`);
                        setNewsletterEmail("");
                      }
                    }}
                    className="w-[362px] max-w-full h-[50px] bg-white rounded-full flex items-center pr-[4px] pl-[22px] shadow-sm relative mb-[6px]"
                  >
                    <input
                      type="email"
                      required
                      placeholder="Enter email"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      className="w-full bg-transparent font-raleway text-[13px] text-[#555] placeholder-[#555] focus:outline-none"
                    />
                    <button
                      type="submit"
                      aria-label="Submit email"
                      className="w-[46px] h-[46px] rounded-full bg-white border-2 border-[#333] text-[#333] flex items-center justify-center shrink-0 hover:bg-stone-50 transition-colors cursor-pointer"
                    >
                      <ArrowRight size={18} strokeWidth={2.5} className="text-[#333]" />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bar Bawah: Copyright Centered 76px tinggi */}
        <div className="w-full bg-white h-[76px] flex items-center justify-center">
          <span className="font-raleway font-semibold text-[20px] text-[#9A8412] tracking-normal text-center">
            © 2025 by LumiglowBeautySalon
          </span>
        </div>
      </footer>
    </div>
  );
}
