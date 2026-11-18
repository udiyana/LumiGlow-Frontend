import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// ─────────────────────────────────────────────────────────────
// DATA & KONSTANTA (TYPED)
// ─────────────────────────────────────────────────────────────
interface ServiceProps {
  onNavigate?: (page: string) => void;
}

interface ServiceTab {
  id: string;
  label: string;
  images: string[];
}

const HERO_GRADIENT =
  'linear-gradient(90deg, #443a08 0%, #a48712 50%, #e2c035 100%)';
const MENU_GRADIENT =
  'linear-gradient(90deg, #473b07 0%, #ad8f12 50%, #e0c13d 100%)';
const BTN_BOOK_GRADIENT =
  'linear-gradient(90deg, #7a692d 5.5%, #bea347 39%, #dfc56e 50%, #b89d40 61.5%, #7a692e 89.5%)';

// Kilau emas bersama untuk LB Icon, teks LUMIGLOW, dan teks GET 20% OFF (sinkron, durasi 4.5s)
const PROMO_SHARED_SHIMMER =
  'linear-gradient(110deg, #9e882a 0%, #d1ad18 28%, #c4a744 42%, #fff6cc 50%, #c4a744 58%, #d1ad18 72%, #9e882a 100%)';

const SERVICE_TABS: ServiceTab[] = [
  {
    id: 'basic-treatment',
    label: 'Basic Treatment',
    images: [
      '/images/service/Menu-1.png',
      '/images/service/Menu-2.png',
      '/images/service/Menu-3.png',
    ],
  },
  {
    id: 'chemical-treatments',
    label: 'Chemical Treatments',
    images: ['/images/service/4.png', '/images/service/5.png'],
  },
  {
    id: 'pedicure',
    label: 'Pedicure',
    images: ['/images/service/7.png', '/images/service/12.png'],
  },
  {
    id: 'manicure',
    label: 'Manicure',
    images: ['/images/service/7.png', '/images/service/8.png'],
  },
];

// Helper untuk lebar tab proporsional sesuai acuan Figma (baseline 1453px)
function getTabWidth(id: string) {
  switch (id) {
    case 'basic-treatment':
    case 'chemical-treatments':
      return '15.3vw';
    case 'pedicure':
    case 'manicure':
      return '11.3vw';
    default:
      return '14vw';
  }
}

// ─────────────────────────────────────────────────────────────
// KOMPONEN LOKAL 1: HERO & TABS
// ─────────────────────────────────────────────────────────────
interface ServiceHeroProps {
  tabs: ServiceTab[];
  activeTabId: string;
  onTabChange: (id: string) => void;
}

function ServiceHero({ tabs, activeTabId, onTabChange }: ServiceHeroProps) {
  return (
    <section
      style={{ background: HERO_GRADIENT }}
      className="relative w-full h-[48vw] min-h-[48vw] overflow-hidden flex flex-col justify-between items-center select-none"
    >
      {/* 1. Logo Putih: Monogram LB + LUMIGLOW ✦ */}
      <div className="w-[20vw] mx-auto flex flex-col items-center pt-[7vw]">
        <img
          src="/images/home/Logo-Lumiglow.png"
          alt="LumiGlow Logo"
          className="w-[7.2vw] h-auto object-contain brightness-0 invert"
        />
        <span className="font-playfair text-white text-[2.2vw] tracking-[0.25em] uppercase mt-[0.3vw] font-normal flex items-center justify-center">
          LUMIGL
          <span className="relative inline-flex items-center justify-center">
            O
            <span className="absolute text-[1vw] text-white">✦</span>
          </span>
          W
        </span>
      </div>

      {/* 2. Heading "Discover Your Signature Glow" */}
      <h1 className="font-podkova text-white font-normal text-[5.1vw] leading-none whitespace-nowrap text-center w-[72vw] mx-auto tracking-normal -mt-[0.5vw]">
        Discover Your Signature Glow
      </h1>

      {/* 3. Subteks 3 Baris Rata Tengah */}
      <p
        className="font-roboto text-white font-light text-[2.3vw] leading-[1.08] text-center w-[48vw] mx-auto -mt-[0.8vw]"
        style={{ fontWeight: 300 }}
      >
        Explore our curated selection of premium
        <br />
        hair and beauty treatments tailored to bring
        <br />
        out your natural radiance
      </p>

      {/* 4. Category Tabs */}
      <div className="w-full relative z-20 flex justify-center pb-[2.5vw]">
        <div
          role="tablist"
          aria-label="Service Categories"
          className="flex items-center justify-center gap-[1.6vw] w-[58vw] mx-auto"
        >
          {tabs.map((tab) => {
            const isActive = tab.id === activeTabId;
            const tabWidth = getTabWidth(tab.id);

            return (
              <button
                key={tab.id}
                id={`tab-${tab.id}`}
                role="tab"
                aria-selected={isActive}
                aria-controls={`tabpanel-${tab.id}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => onTabChange(tab.id)}
                style={{
                  width: tabWidth,
                  height: '3.8vw',
                  backgroundColor: isActive ? '#ffd400' : '#ffffff',
                  color: isActive ? '#111111' : '#222222',
                  boxShadow: isActive
                    ? '0 4px 20px rgba(255, 212, 0, 0.45)'
                    : '0 4px 12px rgba(0, 0, 0, 0.08)',
                }}
                className="font-podkova font-medium text-[1.25vw] rounded-full transition-all duration-200 cursor-pointer flex items-center justify-center outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#ffd400]"
              >
                <span
                  className={
                    isActive ? 'border-b-[0.16vw] border-[#111111]' : ''
                  }
                >
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// KOMPONEN LOKAL 2: MENU AREA & BACKGROUND KOLASE
// ─────────────────────────────────────────────────────────────
interface ServiceMenuProps {
  activeTab: ServiceTab;
}

function ServiceMenu({ activeTab }: ServiceMenuProps) {
  const isBasicTreatment = activeTab.id === 'basic-treatment';

  return (
    <section
      id="service-menu-section"
      style={{ background: MENU_GRADIENT }}
      className="relative w-full overflow-hidden select-none"
    >
      {/* ── Lapisan Kolase Foto dengan Multiply & Saturation ── */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none flex justify-between">
        {/* Sisi Kiri (17-20% lebar layar): Tangan memegang rambut, busa, wajah */}
        <div
          className="w-[20vw] h-full overflow-hidden shrink-0"
          style={{
            mixBlendMode: 'multiply',
            opacity: 0.85,
            filter: 'saturate(1.15) contrast(1.05)',
          }}
        >
          <div className="w-[100vw] h-auto flex flex-col">
            <img
              src="/images/service/1.png"
              alt=""
              className="w-full h-auto block select-none"
            />
            <img
              src="/images/service/2.png"
              alt=""
              className="w-full h-auto block select-none"
            />
              <img
              src="/images/service/3.png"
              alt=""
              className="w-full h-auto block select-none"
            />
          </div>
        </div>

        {/* Sisi Kanan (17-20% lebar layar): Foto polos tanpa teks menu */}
        <div
          className="w-[20vw] h-full overflow-hidden shrink-0 flex flex-col justify-start"
          style={{
            mixBlendMode: 'multiply',
            opacity: 0.85,
            filter: 'saturate(1.15) contrast(1.05)',
          }}
        >
          <div className="w-full flex flex-col">
            <img
              src="/images/home/Gallery-PG-2.jpg"
              alt=""
              className="w-full h-[52vw] object-cover block select-none"
            />
            <img
              src="/images/home/Service-PG-1.jpg"
              alt=""
              className="w-full h-[45vw] object-cover block select-none"
            />
            <img
              src="/images/home/Gallery-PG-1.jpg"
              alt=""
              className="w-full h-[45vw] object-cover block select-none"
            />
            <img
              src="/images/home/Gallery-PG-2.jpg"
              alt=""
              className="w-full h-[55vw] object-cover block select-none"
            />
          </div>
        </div>
      </div>

      {/* ── Panel Menu Tengah (Lebar 66%, max 963px, z-index 10) ── */}
      <div
        role="tabpanel"
        id={`tabpanel-${activeTab.id}`}
        aria-labelledby={`tab-${activeTab.id}`}
        tabIndex={0}
        className="relative z-10 w-full flex flex-col items-center"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="w-[66%] max-w-[963px] mx-auto flex flex-col items-center rounded-t-[2.2vw] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.12)]"
          >
            {isBasicTreatment ? (
              // Basic Treatment: 3 menu cards tumpang-tindih rapi
              <div className="w-full flex flex-col items-center bg-[#FFF8E2]">
                <img
                  src="/images/service/Menu-1.png"
                  alt="Basic Treatment - Hair Wash & Blow, Complete Hair Cut, Hair Styling (Straight/Wave/Curly, No Wash)"
                  loading="eager"
                  className="w-full h-auto block select-none rounded-t-[2.2vw]"
                  style={{ display: 'block' }}
                />

                <img
                  src="/images/service/Menu-2.png"
                  alt="Basic Treatment - Premium Haircut & Styling Menu"
                  loading="lazy"
                  className="w-full h-auto block select-none -mt-[10vw] relative z-10"
                  style={{ display: 'block' }}
                />

                <img
                  src="/images/service/Menu-3.png"
                  alt="Basic Treatment - Creambath & Spa Menu"
                  loading="lazy"
                  className="w-full h-auto block select-none -mt-[8.5vw] relative z-20"
                  style={{ display: 'block' }}
                />
              </div>
            ) : (
              // Tab Lainnya (Chemical Treatments, Pedicure, Manicure)
              <div className="w-full flex flex-col items-center bg-[#FFF8E2]">
                {activeTab.images.map((imgSrc, index) => (
                  <img
                    key={`${activeTab.id}-${index}`}
                    src={imgSrc}
                    alt={`${activeTab.label} Menu Page ${index + 1}`}
                    loading={index === 0 ? 'eager' : 'lazy'}
                    className={`w-full h-auto block select-none ${
                      index === 0 ? 'rounded-t-[2.2vw]' : '-mt-[2vw]'
                    }`}
                    style={{ display: 'block' }}
                  />
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// KOMPONEN LOKAL: SIMULASI KAIN / BENDERA BERKIBAR (CANVAS)
// ─────────────────────────────────────────────────────────────
function WavingGoldCloth({
  className = '',
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = 140;
    const H = 80;
    const imgData = ctx.createImageData(W, H);
    const data = imgData.data;
    const TWO_PI = Math.PI * 2;

    const renderFrame = (t: number) => {
      // Ukuran piksel panel aktual (fallback 463x582 dari kartu dasar 1029x582)
      const Wp = canvas.clientWidth || 463;
      const Hp = canvas.clientHeight || 582;
      const WpPlusHp = Wp + Hp;

      let idx = 0;
      for (let py = 0; py < H; py++) {
        const y = py / (H - 1);
        const dy = y * Hp;
        for (let px = 0; px < W; px++) {
          const x = px / (W - 1);
          const dx = x * Wp;

          // Koordinat diagonal dengan koreksi rasio panel: 0 di TL (kiri atas), 1 di BR (kanan bawah)
          const d = (dx + dy) / WpPlusHp;

          // Amplitudo: kain tertambat di pojok kiri atas (0.2), paling bebas di pojok kanan bawah (1.0)
          const A = 0.2 + 0.8 * d;

          // Fase gelombang merambat dari kiri atas ke kanan bawah: 2π(k*d - kecepatan*t)
          // Suku y dipertahankan kecil (±15% dari sebelumnya) agar lipatan tidak terlalu lurus
          const phi1 = TWO_PI * (1.1 * d - 0.18 * t) + 0.24 * y;
          const phi2 = TWO_PI * (2.3 * d - 0.31 * t) + 0.46 * y + 1.3;
          const phi3 = TWO_PI * (3.7 * d - 0.47 * t) - 0.33 * y;
          const waveSum =
            Math.sin(phi1) + 0.5 * Math.sin(phi2) + 0.25 * Math.sin(phi3);
          const h = A * waveSum;

          // Kemiringan lipatan untuk pencahayaan dihitung terhadap d
          const dWaveSum_dd =
            TWO_PI * 1.1 * Math.cos(phi1) +
            TWO_PI * 1.15 * Math.cos(phi2) +
            TWO_PI * 0.925 * Math.cos(phi3);
          const dh_dd = 0.8 * waveSum + A * dWaveSum_dd;

          // Kemiringan lipatan dinormalisasi
          const s = dh_dd * 0.08;
          const shade = Math.max(-1, Math.min(1, s * 1.4));

          // Gradasi emas dasar tetap seperti design: gradasi horizontal x ke sisi kanan dekat oval
          const u = Math.max(0, Math.min(1, x + 0.04 * h));
          let rBase: number;
          let gBase: number;
          let bBase: number;

          // Gradasi dasar: #473b07 (0%) -> #ad8f12 (50%) -> #e0c13d (100%)
          if (u <= 0.5) {
            const tg = u * 2;
            rBase = 71 + 102 * tg;
            gBase = 59 + 84 * tg;
            bBase = 7 + 11 * tg;
          } else {
            const tg = (u - 0.5) * 2;
            rBase = 173 + 51 * tg;
            gBase = 143 + 50 * tg;
            bBase = 18 + 43 * tg;
          }

          // Pencahayaan: campur ke #f3dc7a (highlight maks 55%) atau #473b07 (shadow maks 45%)
          let r: number;
          let g: number;
          let b: number;
          if (shade > 0) {
            const k = shade * 0.55;
            r = rBase * (1 - k) + 243 * k;
            g = gBase * (1 - k) + 220 * k;
            b = bBase * (1 - k) + 122 * k;
          } else {
            const k = -shade * 0.45;
            r = rBase * (1 - k) + 71 * k;
            g = gBase * (1 - k) + 59 * k;
            b = bBase * (1 - k) + 7 * k;
          }

          data[idx++] = (r + 0.5) | 0;
          data[idx++] = (g + 0.5) | 0;
          data[idx++] = (b + 0.5) | 0;
          data[idx++] = 255;
        }
      }
      ctx.putImageData(imgData, 0, 0);
    };

    // Frame statis jika preferensi gerak dikurangi aktif
    if (shouldReduceMotion) {
      renderFrame(0);
      return;
    }

    // ResizeObserver memantau ukuran display tanpa mengubah resolusi internal canvas (140x80)
    const ro = new ResizeObserver(() => {
      // Browser melakukan bilinear smoothing otomatis via CSS
    });
    ro.observe(canvas);

    let animId: number;
    let lastTime = 0;
    const targetFpsInterval = 1000 / 30; // Batasi ~30 fps agar ringan di CPU

    const loop = (timestamp: number) => {
      animId = requestAnimationFrame(loop);
      if (document.hidden) return; // Jeda saat tab tidak aktif

      const elapsed = timestamp - lastTime;
      if (elapsed < targetFpsInterval) return;
      lastTime = timestamp - (elapsed % targetFpsInterval);

      renderFrame(timestamp * 0.001);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, [shouldReduceMotion]);

  return (
    <div
      className={`overflow-hidden pointer-events-none select-none ${className}`}
      style={style}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        width={140}
        height={80}
        className="w-full h-full block pointer-events-none"
        style={{ imageRendering: 'auto' }}
        aria-hidden="true"
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// KOMPONEN LOKAL 3: SPECIAL PROMO CARD
// ─────────────────────────────────────────────────────────────
function ServicePromo() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="special-promo"
      className="w-full bg-[#FFF7DC] py-16 lg:py-[6vw] px-4 flex items-center justify-center select-none"
    >
      {/* ── DESKTOP CARD (>= 768px): Skalabel cqw, aspect-ratio 1029 / 582 ── */}
      <div
        style={{
          containerType: 'inline-size',
          filter: 'drop-shadow(9px 12px 5px rgba(0, 0, 0, 0.48))',
        }}
        className="hidden md:block w-[min(92%,1029px)] aspect-[1029/582] relative mx-auto"
      >
        <div className="w-full h-full rounded-[30px] overflow-hidden relative">
          {/* ── SIMULASI KAIN/BENDERA EMAS BERKIBAR (CANVAS BERBASIS WAKTU) ── */}
          <WavingGoldCloth
            className="absolute left-0 top-0 bottom-0 w-[45%]"
            style={{ borderRadius: '30px 0 0 30px', zIndex: 0 }}
          />

          {/* ── BAGIAN 2: Teks Vertikal "SPECIAL" (Diam, Warna Putih Solid #ffffff, Drop-Shadow) ── */}
          <div
            className="absolute select-none whitespace-nowrap font-bold"
            style={{
              left: '1cqw',
              top: '95%',
              transformOrigin: '0 0',
              transform: 'rotate(-90deg)',
              fontFamily: "'Playfair Display SC', 'Playfair Display', serif",
              fontSize: '12.15cqw',
              lineHeight: 0.8,
              letterSpacing: '-0.01em',
              color: '#ffffff',
              filter: 'drop-shadow(0 4px 4px rgba(0,0,0,0.25))',
              zIndex: 5,
            }}
          >
            SPECIAL
          </div>

          {/* ── BAGIAN 2: Teks Vertikal "PROMO" (Diam, Warna Putih Solid #ffffff, Drop-Shadow) ── */}
          <div
            className="absolute select-none whitespace-nowrap font-bold"
            style={{
              left: '12cqw',
              top: '72%',
              transformOrigin: '0 0',
              transform: 'rotate(-90deg)',
              fontFamily: "'Playfair Display SC', 'Playfair Display', serif",
              fontSize: '9.72cqw',
              lineHeight: 0.8,
              letterSpacing: '0.01em',
              color: '#ffffff',
              filter: 'drop-shadow(0 4px 4px rgba(0,0,0,0.25))',
              zIndex: 5,
            }}
          >
            PROMO
          </div>

          {/* Panel Putih dengan Lengkungan 5.35cqw di Sisi Kiri */}
          <div
            className="absolute right-0 top-0 bottom-0 bg-white"
            style={{
              width: '62.7%',
              borderRadius: '5.35cqw 0 0 5.35cqw',
            }}
          />

          {/* ── FOTO OVAL DUA FOTO DIPISAH GARIS DIAGONAL (TETAP SEPERTI SEKARANG) ── */}
          <div
            className="relative overflow-hidden rounded-full bg-white z-20"
            style={{
              position: 'absolute',
              left: '27.3%',
              top: '16.5%',
              width: '17.8%',
              height: '66.8%',
              border: '0.7cqw solid #ffffff',
              boxSizing: 'border-box',
              filter: 'drop-shadow(0 4px 10px rgba(0, 0, 0, 0.18))',
            }}
          >
            {/* Foto Atas: Card-2.png (rambut pirang), clip-path diagonal naik ke kanan (58% kiri, 44% kanan) */}
            <div
              className="absolute inset-0"
              style={{
                clipPath: 'polygon(0 0, 100% 0, 100% 44%, 0 58%)',
                transform: 'translateZ(0)',
              }}
            >
              <img
                src="/images/service/Card-2.png"
                alt="Blonde Model Treatment"
                decoding="async"
                loading="eager"
                className="absolute left-0 top-0 w-full object-cover select-none"
                style={{
                  height: '64%',
                  objectPosition: 'center 20%',
                }}
              />
            </div>

            {/* Foto Bawah: Card-1.png (rambut abu-abu), clip-path diagonal bersentuhan langsung tanpa celah */}
            <div
              className="absolute inset-0"
              style={{
                clipPath: 'polygon(0 58%, 100% 44%, 100% 100%, 0 100%)',
                transform: 'translateZ(0)',
              }}
            >
              <img
                src="/images/service/Card-1.png"
                alt="Grey Hair Model Treatment"
                decoding="async"
                loading="eager"
                className="absolute bottom-0 left-0 w-full object-cover select-none"
                style={{
                  height: '62%',
                  objectPosition: 'center 30%',
                }}
              />
            </div>
          </div>

          {/* ── BAGIAN 3: Ikon LB (glyph terlihat ±4.0% W x ±9.9% H, atas di 6.6% H, bawah di 16.5% H) ── */}
          <div
            className="absolute flex items-center justify-center pointer-events-none select-none"
            style={{
              top: '3.24%',
              left: '72%',
              transform: 'translateX(-50%)',
              width: '7.9cqw',
              height: '16.46%',
            }}
          >
            <motion.div
              role="img"
              aria-label="LumiGlow"
              className="w-full h-full select-none"
              style={{
                backgroundImage: PROMO_SHARED_SHIMMER,
                backgroundSize: '200% 100%',
                WebkitMaskImage: 'url(/images/home/Logo-Lumiglow.png)',
                WebkitMaskSize: '100% 100%',
                WebkitMaskRepeat: 'no-repeat',
                WebkitMaskPosition: 'center',
                maskImage: 'url(/images/home/Logo-Lumiglow.png)',
                maskSize: '100% 100%',
                maskRepeat: 'no-repeat',
                maskPosition: 'center',
              }}
              animate={
                shouldReduceMotion
                  ? { backgroundPosition: '100% 0%' }
                  : { backgroundPosition: ['200% 0%', '0% 0%'] }
              }
              transition={{
                duration: 4.5,
                ease: 'linear',
                repeat: Infinity,
              }}
            />
          </div>

          {/* ── BAGIAN 3 & 4: Teks LUMIGLOW berpusat di 72% W (Sparkle absolut di kanan tanpa menggeser pusat) ── */}
          <div
            className="absolute flex items-center justify-center select-none"
            style={{
              top: '21.8%',
              left: '72%',
              transform: 'translate(-50%, -50%)',
              width: '25.4cqw',
            }}
          >
            <motion.span
              className="select-none block font-podkova text-center w-full"
              style={{
                fontWeight: 700,
                fontSize: '4.53cqw',
                letterSpacing: '0.05em',
                lineHeight: 1,
                backgroundImage: PROMO_SHARED_SHIMMER,
                backgroundSize: '200% 100%',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                WebkitTextFillColor: 'transparent',
              }}
              animate={
                shouldReduceMotion
                  ? { backgroundPosition: '100% 0%' }
                  : { backgroundPosition: ['200% 0%', '0% 0%'] }
              }
              transition={{
                duration: 4.5,
                ease: 'linear',
                repeat: Infinity,
              }}
            >
              LUMIGLOW
            </motion.span>

            {/* Sparkle Ganda: bintang besar ±3.3% W (pusat +3.7% W), bintang kecil ±1.4% W (+0.6% W, -1.9% H) */}
            <div
              className="absolute left-full top-1/2 -translate-y-1/2 pointer-events-none select-none"
              style={{
                width: '6.0cqw',
                height: '4.5cqw',
              }}
            >
              <svg
                viewBox="0 0 60 45"
                style={{ width: '100%', height: '100%' }}
                className="select-none shrink-0"
                fill="none"
                aria-hidden
              >
                <defs>
                  <linearGradient id="promo-sparkle-gold" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#9e882a" />
                    <stop offset="50%" stopColor="#d1ad18" />
                    <stop offset="100%" stopColor="#e0c13d" />
                  </linearGradient>
                </defs>
                {/* Bintang besar (±3.3% W, pusat di +3.7% W = x=37, radius=16.5) */}
                <path
                  d="M 37 6 C 37 17.5 42 22.5 53.5 22.5 C 42 22.5 37 27.5 37 39 C 37 27.5 32 22.5 20.5 22.5 C 32 22.5 37 17.5 37 6 Z"
                  fill="url(#promo-sparkle-gold)"
                />
                {/* Bintang kecil di kanan atas (±1.4% W, pusat di +4.3% W = x=43, y=11.5, radius=7) */}
                <path
                  d="M 43 4.5 C 43 9.3 45.2 11.5 50 11.5 C 45.2 11.5 43 13.7 43 18.5 C 43 13.7 40.8 11.5 36 11.5 C 40.8 11.5 43 9.3 43 4.5 Z"
                  fill="url(#promo-sparkle-gold)"
                />
              </svg>
            </div>
          </div>

          {/* ── BAGIAN 4: "GET 20% OFF" dengan Animasi Kilau Bersama Sinkron ── */}
          <motion.h2
            className="absolute font-podkova font-medium text-center whitespace-nowrap select-none"
            style={{
              top: '28.5%',
              left: '72%',
              transform: 'translateX(-50%)',
              width: '47cqw',
              fontSize: '7.97cqw',
              lineHeight: 1,
              backgroundImage: PROMO_SHARED_SHIMMER,
              backgroundSize: '200% 100%',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              WebkitTextFillColor: 'transparent',
            }}
            animate={
              shouldReduceMotion
                ? { backgroundPosition: '100% 0%' }
                : { backgroundPosition: ['200% 0%', '0% 0%'] }
            }
            transition={{
              duration: 4.5,
              ease: 'linear',
              repeat: Infinity,
            }}
          >
            GET 20% OFF
          </motion.h2>

          {/* "FOR ALL HAIR & BEAUTY TREATMENTS" (2 baris - Tidak Berubah) */}
          <div
            className="absolute font-podkova font-medium text-center text-[#453907]"
            style={{
              top: '44%',
              left: '72%',
              transform: 'translateX(-50%)',
              width: '50cqw',
              fontSize: '3.89cqw',
              lineHeight: 1.15,
              letterSpacing: 'normal',
            }}
          >
            <div>FOR ALL HAIR &amp; BEAUTY</div>
            <div>TREATMENTS</div>
          </div>

          {/* ── BAGIAN 5: Tag dengan Pemisah Bullet Bulat "•" (Lebar Baris ±44.5% lebar kartu) ── */}
          <p
            className="absolute font-podkova font-medium text-center text-[#453907] whitespace-nowrap"
            style={{
              top: '63.6%',
              left: '72%',
              transform: 'translateX(-50%)',
              fontSize: '1.63cqw',
              lineHeight: 1,
            }}
          >
            Exclusive Treatment • Hair Treatment • Pedicure &amp; Medicure
          </p>

          {/* S&K Berlaku */}
          <p
            className="absolute font-podkova font-medium text-center text-[#453907]"
            style={{
              top: '69.4%',
              left: '72%',
              transform: 'translateX(-50%)',
              fontSize: '1.55cqw',
              lineHeight: 1,
            }}
          >
            S&amp;K Berlaku
          </p>

          {/* ── BARIS TOMBOL: BOOK NOW & SEE MORE (lebar sama ±18.6% W, tinggi 5.8cqw, gap 2.0cqw, pusat horizontal 72% W) ── */}
          <div
            className="absolute flex items-center justify-center"
            style={{
              top: '77.7%',
              left: '72%',
              transform: 'translateX(-50%)',
              gap: '2.0cqw',
            }}
          >
            {/* Tombol BOOK NOW (Lebar ±18.6% W, Tinggi 5.8cqw, Teks Putih #ffffff, Font proporsional 1.85cqw) */}
            <motion.a
              href="#book"
              className="relative overflow-hidden rounded-full font-podkova font-bold flex items-center justify-center select-none outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#ad8f12] shrink-0"
              style={{
                width: '18.6cqw',
                height: '5.8cqw',
                fontSize: '1.85cqw',
                color: '#ffffff',
                backgroundImage: BTN_BOOK_GRADIENT,
                textDecoration: 'none',
                whiteSpace: 'nowrap',
              }}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              animate={
                shouldReduceMotion
                  ? undefined
                  : {
                      boxShadow: [
                        '0 0 0 0 rgba(223,197,110,0)',
                        '0 0 18px 2px rgba(223,197,110,0.55)',
                        '0 0 0 0 rgba(223,197,110,0)',
                      ],
                    }
              }
            >
              {/* Sapuan kilau putih diagonal */}
              {!shouldReduceMotion && (
                <motion.span
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0 left-0 w-1/2"
                  style={{
                    background:
                      'linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.55) 50%, transparent 80%)',
                  }}
                  initial={{ x: '-130%' }}
                  animate={{ x: '280%' }}
                  transition={{
                    duration: 1.1,
                    ease: 'easeInOut',
                    repeat: Infinity,
                    repeatDelay: 2.4,
                  }}
                />
              )}
              <span className="relative z-10" style={{ color: '#ffffff' }}>
                BOOK NOW
              </span>
            </motion.a>

            {/* Tombol SEE MORE (Lebar ±18.6% W, Tinggi 5.8cqw, Tepi kiri ±73.9% W) */}
            <a
              href="#tabpanel-basic-treatment"
              className="rounded-full bg-white flex flex-col items-center justify-center transition-transform hover:scale-[1.03] focus:outline-2 focus:outline-[#ad8f12] shrink-0"
              style={{
                width: '18.6cqw',
                height: '5.8cqw',
                border: '0.3cqw solid #ad8f12',
                color: '#d1ad18',
                lineHeight: 1.15,
                textDecoration: 'none',
              }}
            >
              <span
                className="font-podkova font-bold"
                style={{ fontSize: '1.55cqw' }}
              >
                SEE MORE
              </span>
              <span
                className="font-podkova font-medium"
                style={{ fontSize: '1.26cqw' }}
              >
                Offers &amp; Treatments
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* ── MOBILE CARD (< 768px): Bertumpuk Vertikal Rapi ── */}
      <div
        style={{
          filter: 'drop-shadow(0 10px 20px rgba(0, 0, 0, 0.35))',
        }}
        className="block md:hidden w-[92%] max-w-[420px] mx-auto"
      >
        <div className="w-full rounded-[30px] overflow-hidden flex flex-col">
          {/* Panel Emas di Atas dengan Simulasi Kain/Bendera Berkibar (Canvas) */}
          <div className="relative w-full pt-8 pb-16 px-4 text-center overflow-hidden">
            <WavingGoldCloth
              className="absolute inset-0 w-full h-full"
              style={{ zIndex: 0 }}
            />
            <span
              className="relative text-white font-bold tracking-[0.2em] uppercase"
              style={{
                fontFamily: "'Playfair Display SC', 'Playfair Display', serif",
                fontSize: 'clamp(20px, 5.5vw, 26px)',
                color: '#ffffff',
                filter: 'drop-shadow(0 4px 4px rgba(0,0,0,0.25))',
                zIndex: 5,
              }}
            >
              SPECIAL PROMO
            </span>
          </div>

          {/* Foto Oval di Antara Dua Panel (Satu Bingkai Putih, 2 Foto Dipisah Garis Diagonal) */}
          <div
            className="w-[170px] h-[260px] rounded-full overflow-hidden mx-auto -mt-12 relative z-20 shrink-0 bg-white"
            style={{
              border: '4px solid #ffffff',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.18)',
            }}
          >
            {/* Foto Atas: Card-2.png */}
            <div
              className="absolute inset-0"
              style={{
                clipPath: 'polygon(0 0, 100% 0, 100% 44%, 0 58%)',
                transform: 'translateZ(0)',
              }}
            >
              <img
                src="/images/service/Card-2.png"
                alt="Blonde Model Treatment"
                decoding="async"
                loading="eager"
                className="absolute left-0 top-0 w-full object-cover select-none"
                style={{
                  height: '64%',
                  objectPosition: 'center 20%',
                }}
              />
            </div>

            {/* Foto Bawah: Card-1.png */}
            <div
              className="absolute inset-0"
              style={{
                clipPath: 'polygon(0 58%, 100% 44%, 100% 100%, 0 100%)',
                transform: 'translateZ(0)',
              }}
            >
              <img
                src="/images/service/Card-1.png"
                alt="Grey Hair Model Treatment"
                decoding="async"
                loading="eager"
                className="absolute bottom-0 left-0 w-full object-cover select-none"
                style={{
                  height: '62%',
                  objectPosition: 'center 30%',
                }}
              />
            </div>
          </div>

          {/* Panel Putih di Bawah */}
          <div className="w-full bg-white rounded-b-[30px] pt-6 pb-8 px-5 flex flex-col items-center text-center -mt-14 z-10">
            {/* Logo dengan Kilau Animasi Bersama */}
            <div className="flex flex-col items-center mb-1">
              <div className="w-8 h-8 flex items-center justify-center">
                <motion.div
                  role="img"
                  aria-label="LumiGlow"
                  className="w-full h-full select-none"
                  style={{
                    backgroundImage: PROMO_SHARED_SHIMMER,
                    backgroundSize: '200% 100%',
                    WebkitMaskImage: 'url(/images/home/Logo-Lumiglow.png)',
                    WebkitMaskSize: 'contain',
                    WebkitMaskRepeat: 'no-repeat',
                    WebkitMaskPosition: 'center',
                    maskImage: 'url(/images/home/Logo-Lumiglow.png)',
                    maskSize: 'contain',
                    maskRepeat: 'no-repeat',
                    maskPosition: 'center',
                  }}
                  animate={
                    shouldReduceMotion
                      ? { backgroundPosition: '100% 0%' }
                      : { backgroundPosition: ['200% 0%', '0% 0%'] }
                  }
                  transition={{
                    duration: 4.5,
                    ease: 'linear',
                    repeat: Infinity,
                  }}
                />
              </div>
              <div className="flex items-center justify-center -mt-1 select-none">
                <motion.span
                  className="font-podkova font-bold text-sm tracking-[0.05em]"
                  style={{
                    backgroundImage: PROMO_SHARED_SHIMMER,
                    backgroundSize: '200% 100%',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    color: 'transparent',
                    WebkitTextFillColor: 'transparent',
                  }}
                  animate={
                    shouldReduceMotion
                      ? { backgroundPosition: '100% 0%' }
                      : { backgroundPosition: ['200% 0%', '0% 0%'] }
                  }
                  transition={{
                    duration: 4.5,
                    ease: 'linear',
                    repeat: Infinity,
                  }}
                >
                  LUMIGLOW
                </motion.span>
                <svg
                  viewBox="0 0 60 45"
                  className="w-4 h-3 ml-1 inline-block select-none shrink-0"
                  fill="none"
                  aria-hidden
                >
                  <defs>
                    <linearGradient id="promo-sparkle-gold-mob" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#9e882a" />
                      <stop offset="50%" stopColor="#d1ad18" />
                      <stop offset="100%" stopColor="#e0c13d" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 20 5 C 20 16 25 21 36 21 C 25 21 20 26 20 37 C 20 26 15 21 4 21 C 15 21 20 16 20 5 Z"
                    fill="url(#promo-sparkle-gold-mob)"
                  />
                  <path
                    d="M 48 3 C 48 9 50.5 11.5 56 11.5 C 50.5 11.5 48 14 48 20 C 48 14 45.5 11.5 40 11.5 C 45.5 11.5 48 9 48 3 Z"
                    fill="url(#promo-sparkle-gold-mob)"
                  />
                </svg>
              </div>
            </div>

            {/* "GET 20% OFF" */}
            <motion.h2
              className="font-podkova font-medium leading-none text-center select-none my-2"
              style={{
                fontSize: 'clamp(28px, 8vw, 36px)',
                backgroundImage: PROMO_SHARED_SHIMMER,
                backgroundSize: '200% 100%',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                WebkitTextFillColor: 'transparent',
              }}
              animate={
                shouldReduceMotion
                  ? { backgroundPosition: '100% 0%' }
                  : { backgroundPosition: ['200% 0%', '0% 0%'] }
              }
              transition={{
                duration: 4.5,
                ease: 'linear',
                repeat: Infinity,
              }}
            >
              GET 20% OFF
            </motion.h2>

            {/* "FOR ALL HAIR & BEAUTY TREATMENTS" */}
            <div
              className="font-podkova font-medium text-[#453907] leading-snug uppercase mb-2"
              style={{ fontSize: 'clamp(14px, 4vw, 18px)' }}
            >
              <div>FOR ALL HAIR &amp; BEAUTY</div>
              <div>TREATMENTS</div>
            </div>

            {/* Tags */}
            <p
              className="font-podkova font-medium text-[#453907] text-xs leading-normal mb-1"
              style={{ fontSize: 'clamp(11px, 2.8vw, 13px)' }}
            >
              Exclusive Treatment • Hair Treatment • Pedicure &amp; Medicure
            </p>

            {/* S&K */}
            <p
              className="font-podkova font-medium text-[#453907] text-xs mb-4"
              style={{ fontSize: 'clamp(11px, 2.8vw, 13px)' }}
            >
              S&amp;K Berlaku
            </p>

            {/* Tombol Mobile */}
            <div className="flex flex-wrap items-center justify-center gap-3 w-full">
              <motion.a
                href="#book"
                className="relative overflow-hidden w-[140px] h-[44px] rounded-full text-white font-podkova font-semibold flex items-center justify-center text-sm shadow-md select-none outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#ad8f12]"
                style={{
                  backgroundImage: BTN_BOOK_GRADIENT,
                  textDecoration: 'none',
                  color: '#ffffff',
                }}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                {!shouldReduceMotion && (
                  <motion.span
                    aria-hidden
                    className="pointer-events-none absolute inset-y-0 left-0 w-1/2"
                    style={{
                      background:
                        'linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.55) 50%, transparent 80%)',
                    }}
                    initial={{ x: '-130%' }}
                    animate={{ x: '280%' }}
                    transition={{
                      duration: 1.1,
                      ease: 'easeInOut',
                      repeat: Infinity,
                      repeatDelay: 2.4,
                    }}
                  />
                )}
                <span className="relative z-10" style={{ color: '#ffffff' }}>
                  BOOK NOW
                </span>
              </motion.a>

              <a
                href="#tabpanel-basic-treatment"
                className="w-[140px] h-[44px] rounded-full bg-white border border-[#ad8f12] text-[#d1ad18] flex flex-col items-center justify-center leading-tight shadow-sm transition-transform hover:scale-[1.03] focus:outline-2 focus:outline-[#ad8f12]"
                style={{ textDecoration: 'none' }}
              >
                <span className="font-podkova font-bold text-xs">SEE MORE</span>
                <span className="font-podkova font-medium text-[10px]">
                  Offers &amp; Treatments
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// KOMPONEN HALAMAN UTAMA (DEFAULT EXPORT)
// ─────────────────────────────────────────────────────────────
export default function Service({ onNavigate }: ServiceProps) {
  const [activeTabId, setActiveTabId] = useState<string>(SERVICE_TABS[0].id);

  // Scroll to top saat pertama kali masuk ke /service
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const activeTab =
    SERVICE_TABS.find((t) => t.id === activeTabId) || SERVICE_TABS[0];

  return (
    <div className="min-h-screen bg-white flex flex-col font-['Roboto',sans-serif] selection:bg-[#FACC15] selection:text-[#111]">
      {/* 1. Header / Navbar Bersama */}
      <Navbar onNavigate={onNavigate} />

      {/* 2. Hero Section dengan Judul, Logo & Tabs Kategori */}
      <ServiceHero
        tabs={SERVICE_TABS}
        activeTabId={activeTabId}
        onTabChange={setActiveTabId}
      />

      {/* 3. Panel Menu Perawatan (Gambar Pricelist per Tab + Background Kolase Emas) */}
      <ServiceMenu activeTab={activeTab} />

      {/* 4. Special Promo Card */}
      <ServicePromo />

      {/* 5. Footer Bersama */}
      <Footer onNavigate={onNavigate} />
    </div>
  );
}
