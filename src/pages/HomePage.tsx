import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight, Star, ArrowRight } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import OurService from "../components/OurService";
import CTASection from "../components/CTASection";

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
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen text-[#111] bg-[#FFFDF6] font-['Inter',sans-serif] selection:bg-[#FACC15] selection:text-[#111]">
      {/* ── 1. NAVBAR (Shared Component) ── */}
      <Navbar onNavigate={onNavigate} />

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
            className="max-w-[620px] lg:max-w-4xl text-left"
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
                className="relative font-hero font-medium text-[#FFF4B8] text-4xl md:text-5xl lg:text-6xl leading-tight lg:whitespace-nowrap"
                style={{
                  textShadow: "0 0 12px rgba(255, 214, 0, 0.55)",
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
              className="mt-4 font-hero font-semibold text-white text-base md:text-lg leading-snug max-w-xl"
              style={{
                textShadow: "0 1px 8px rgba(0,0,0,0.4)",
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
              className="mt-8 flex flex-wrap items-center gap-5"
            >
              {/* Book Now — kuning solid */}
              <Link
                to="/#book"
                className="w-[200px] h-12 rounded-[3px] font-normal text-black bg-[#FFD400] flex items-center justify-center gap-2 cursor-pointer transition-all duration-200 hover:brightness-95 active:scale-[0.98] select-none"
              >
                <span>Book Now</span>
                <ArrowRight size={18} strokeWidth={2} />
              </Link>

              {/* Service — putih solid tanpa border */}
              <Link
                to="/service"
                className="w-[200px] h-12 rounded-[3px] font-normal text-black bg-white flex items-center justify-center gap-2 cursor-pointer transition-all duration-200 hover:bg-neutral-100 active:scale-[0.98] select-none border-none"
              >
                <span>Service</span>
                <ArrowRight size={18} strokeWidth={2} />
              </Link>
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
      <OurService onNavigate={onNavigate} />

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
      <CTASection onNavigate={onNavigate} />

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
      {/* ── 9. FOOTER (Shared Component) ── */}
      <Footer onNavigate={onNavigate} />
    </div>
  );
}
