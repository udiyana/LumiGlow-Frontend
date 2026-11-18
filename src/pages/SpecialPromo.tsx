import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// ===== TYPES & INTERFACES =====
interface SpecialPromoProps {
  onNavigate?: (page: string) => void;
}

// ===== JARAK ANTAR SECTION — EDIT DI SINI UNTUK MENYETEL ULANG =====
const SPACING = {
  heroBottom: '5vw',          // padding-bottom hero (di bawah kartu promo)
  offersTop: '3.5vw',         // padding-top All Offers (di atas judul)
  offersHeadingToCards: '4vw', // jarak judul "All Offers" ke baris kartu
  offersBottom: '5vw',        // padding-bottom All Offers (di bawah kartu)
  ctaTop: '3vw',              // padding-top CTA (di atas heading)
  fade: '6vw',                // tinggi zona cross-fade antar section
};

// Gradasi latar per section (konstan, arah & warna sesuai Figma)
const HERO_BG_GRADIENT =
  'linear-gradient(135deg, rgba(74, 61, 5, 0.85) 0%, rgba(150, 125, 18, 0.72) 50%, rgba(214, 185, 55, 0.62) 100%)';
const OFFERS_BG_GRADIENT =
  'linear-gradient(90deg, #3F3405 0%, #A38A12 50%, #E3C23C 100%)';
const CTA_BG_GRADIENT =
  'linear-gradient(90deg, #E3C23C 0%, #A38A12 50%, #5F4D09 100%)';

// Kilau emas bersama untuk LB Icon, teks LUMIGLOW, dan teks GET 20% OFF (sinkron, durasi 4.5s)
const PROMO_SHARED_SHIMMER =
  'linear-gradient(110deg, #9e882a 0%, #d1ad18 28%, #c4a744 42%, #fff6cc 50%, #c4a744 58%, #d1ad18 72%, #9e882a 100%)';

const BTN_BOOK_GRADIENT =
  'linear-gradient(90deg, #7a692d 5.5%, #bea347 39%, #dfc56e 50%, #b89d40 61.5%, #7a692e 89.5%)';

const SPECIAL_PROMO_DATA = {
  // ── Hero Section ──
  hero: {
    heading: 'Special Offer',
    // Gambar latar interior salon di public/promo/Background-Special-Promo.png
    backgroundImage: '/promo/Background-Special-Promo.png',
  },

  // ── Kartu Promo Besar (Hero) ──
  promoCard: {
    // Teks Vertikal Pita Emas Kiri
    verticalTextLeft: 'SPECIAL',
    verticalTextRight: 'PROMO',

    // Bingkai Pill Foto Dua Wanita
    // wanita pirang di atas (topImage), wanita berambut gelap tersenyum di bawah (bottomImage)
    pillPhoto: {
      topImage: '/images/service/Card-2.png',
      bottomImage: '/images/service/Card-1.png',
      alt: 'LumiGlow Premium Beauty Treatment Models',
    },

    // Header & Teks Panel Kanan
    brandName: 'LUMIGLOW',
    discountHeading: 'GET 20% OFF',
    discountSubheadingLine1: 'FOR ALL HAIR & BEAUTY',
    discountSubheadingLine2: 'TREATMENTS',
    servicesList: 'Exclusive Treatment • Hair Treatment • Pedicure & Medicure',
    termsAndConditions: 'S&K Berlaku',

    // Tombol Aksi
    buttons: {
      bookNow: {
        label: 'BOOK NOW',
        href: '/#book',
      },
      seeMore: {
        title: 'SEE MORE',
        subtitle: 'Offers & Treatments',
        targetId: 'all-offers', // scrolls to #all-offers
      },
    },
  },

  // ── Section All Offers (3 Kartu Penawaran) ──
  allOffers: {
    heading: 'All Offers',
    cards: [
      {
        id: 'offer-1',
        badge: 'Save Up to 20%',
        title: 'Radiance Facial Package',
        description: 'Unlock your ultimate glow with our signature treatment.',
        image: '/images/promo/offer-haircut.jpg',
        href: '/service',
        detailText: 'View Detail',
      },
      {
        id: 'offer-2',
        badge: 'Save Up to 15%',
        title: 'Hair & Glow Combo',
        description: 'Get the complete transformation at a special bundle rate.',
        image: '/images/promo/offer-haircut.jpg',
        href: '/service',
        detailText: 'View Detail',
      },
      {
        id: 'offer-3',
        badge: 'Save Up to 10%',
        title: 'Pedicure & Manicure Deal',
        description: 'Pamper your nails with our limited-time special price.',
        image: '/images/promo/offer-haircut.jpg',
        href: '/service',
        detailText: 'View Detail',
      },
    ],
  },
};

// ─────────────────────────────────────────────────────────────
// KOMPONEN LOKAL: SIMULASI KAIN / BENDERA BERKIBAR (CANVAS)
// Sesuai Persis dengan yang ada di Service.tsx
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

    const ro = new ResizeObserver(() => {});
    ro.observe(canvas);

    let animId: number;
    let lastTime = 0;
    const targetFpsInterval = 1000 / 30; // Batasi ~30 fps agar ringan di CPU

    const loop = (timestamp: number) => {
      animId = requestAnimationFrame(loop);
      if (document.hidden) return;

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
// SUB-KOMPONEN 2: KARTU PROMO BESAR (PROMO CARD DENGAN ANIMASI SERVICE)
// ─────────────────────────────────────────────────────────────
function PromoCard() {
  const shouldReduceMotion = useReducedMotion();
  const { promoCard } = SPECIAL_PROMO_DATA;

  const handleScrollToOffers = () => {
    const el = document.getElementById(promoCard.buttons.seeMore.targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className="promo-card-wrapper relative w-full h-full select-none overflow-hidden"
      style={{
        borderRadius: '1.6vw',
        boxShadow: '0.7vw 0.7vw 1.6vw rgba(0, 0, 0, 0.45)',
        background:
          'linear-gradient(135deg, #473b07 0%, #ad8f12 30%, #f5e48a 52%, #ad8f12 70%, #473b07 100%)',
      }}
    >
      {/* ── 1. SIMULASI KAIN/BENDERA EMAS BERKIBAR (WAVING CLOTH CANVAS) ── */}
      <WavingGoldCloth
        className="absolute left-0 top-0 bottom-0 w-[45%]"
        style={{ zIndex: 0 }}
      />

      {/* Teks Vertikal "SPECIAL" (Kolom 4.6% s/d 14.4% W, Panjang ~48% W, Atas ~10% H, Bawah ~93% H) */}
      <div
        className="absolute select-none whitespace-nowrap font-bold"
        style={{
          left: '4.6%',
          top: '94.5%',
          transformOrigin: '0 0',
          transform: 'rotate(-90deg)',
          fontFamily: "'Playfair Display', serif",
          fontSize: '11.35cqw',
          lineHeight: 0.85,
          letterSpacing: '0.002em',
          color: '#ffffff',
          filter: 'drop-shadow(0 0.3vw 0.5vw rgba(0, 0, 0, 0.4))',
          zIndex: 10,
        }}
      >
        {promoCard.verticalTextLeft}
      </div>

      {/* Teks Vertikal "PROMO" (Kolom 15.3% s/d 22.8% W, Panjang ~35% W, Atas ~10% H, Bawah ~69% H) */}
      <div
        className="absolute select-none whitespace-nowrap font-medium"
        style={{
          left: '15.3%',
          top: '71.5%',
          transformOrigin: '0 0',
          transform: 'rotate(-90deg)',
          fontFamily: "'Playfair Display', serif",
          fontSize: '9.15cqw',
          lineHeight: 0.85,
          letterSpacing: '0.012em',
          color: '#ffffff',
          opacity: 0.95,
          filter: 'drop-shadow(0 0.3vw 0.5vw rgba(0, 0, 0, 0.4))',
          zIndex: 10,
        }}
      >
        {promoCard.verticalTextRight}
      </div>

      {/* ── 2. PANEL PUTIH KANAN (Mulai 37% Lebar Kartu s/d Tepi Kanan dengan Lengkung 4.6vw di Sisi Kiri) ── */}
      <div
        className="absolute right-0 top-0 bottom-0 bg-white z-10"
        style={{
          left: '37%',
          borderRadius: '4.6vw 0 0 4.6vw',
        }}
      >
        {/* Konten Rata Tengah pada Sumbu 72% Lebar Kartu Keseluruhan */}
        <div
          className="absolute top-0 bottom-0 flex flex-col items-center pointer-events-auto"
          style={{
            left: '55.55%',
            transform: 'translateX(-50%)',
            width: '85%',
          }}
        >
          {/* 1. Logo Monogram LB Emas dengan Animasi Shimmer Bersama */}
          <div
            className="absolute flex items-center justify-center select-none"
            style={{
              top: '7%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '4.3cqw',
              height: '9.0%',
            }}
          >
            <motion.div
              role="img"
              aria-label="LumiGlow Monogram"
              className="select-none"
              style={{
                width: '197%',
                height: '197%',
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

          {/* 2. Teks "LUMIGLOW" Emas + Sparkle dengan Animasi Shimmer Bersama */}
          <div
            className="absolute flex items-center justify-center select-none"
            style={{
              top: '23%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              whiteSpace: 'nowrap',
            }}
          >
            <motion.span
              className="select-none inline-block font-podkova font-medium text-center"
              style={{
                fontSize: '4.66cqw',
                lineHeight: 1,
                letterSpacing: '0.02em',
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
              {promoCard.brandName}
            </motion.span>

            {/* Ikon Kilau Emas di Kanan Teks LUMIGLOW (Outline/Stroke, bukan solid fill) */}
            <div
              className="absolute pointer-events-none select-none"
              style={{
                left: 'calc(100% + 1.8cqw)',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '4.0cqw',
                height: '3.0cqw',
              }}
            >
              <svg
                viewBox="0 0 60 45"
                style={{ width: '100%', height: '100%' }}
                className="select-none"
                fill="none"
                aria-hidden
              >
                <defs>
                  <linearGradient id="promo-sparkle-gold-sp" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#9e882a" />
                    <stop offset="50%" stopColor="#d1ad18" />
                    <stop offset="100%" stopColor="#e0c13d" />
                  </linearGradient>
                </defs>
                <path
                  d="M 37 6 C 37 17.5 42 22.5 53.5 22.5 C 42 22.5 37 27.5 37 39 C 37 27.5 32 22.5 20.5 22.5 C 32 22.5 37 17.5 37 6 Z"
                  fill="none"
                  stroke="url(#promo-sparkle-gold-sp)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M 43 4.5 C 43 9.3 45.2 11.5 50 11.5 C 45.2 11.5 43 13.7 43 18.5 C 43 13.7 40.8 11.5 36 11.5 C 40.8 11.5 43 9.3 43 4.5 Z"
                  fill="none"
                  stroke="url(#promo-sparkle-gold-sp)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* 3. "GET 20% OFF" dengan Animasi Shimmer Bersama */}
          <motion.h2
            className="absolute font-podkova font-medium text-center whitespace-nowrap select-none"
            style={{
              top: '37%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: '7.73cqw',
              lineHeight: 1,
              letterSpacing: '0',
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
            {promoCard.discountHeading}
          </motion.h2>

          {/* 4. "FOR ALL HAIR & BEAUTY TREATMENTS" (Dua baris, Line 1 centerY ~48%, Line 2 centerY ~55%) */}
          <div
            className="absolute text-center select-none font-rokkitt font-bold uppercase whitespace-nowrap"
            style={{
              top: '48%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: '#3d3205',
              fontSize: '3.60cqw',
              lineHeight: 1,
              letterSpacing: '0.02em',
            }}
          >
            {promoCard.discountSubheadingLine1}
          </div>
          <div
            className="absolute text-center select-none font-rokkitt font-bold uppercase whitespace-nowrap"
            style={{
              top: '55%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: '#3d3205',
              fontSize: '3.60cqw',
              lineHeight: 1,
              letterSpacing: '0.02em',
            }}
          >
            {promoCard.discountSubheadingLine2}
          </div>

          {/* 5. Baris Layanan (CenterY ~65% H, Lebar ~44% W) */}
          <div
            data-measure="exclusive"
            className="absolute text-center select-none font-rokkitt font-medium whitespace-nowrap flex items-center justify-center"
            style={{
              top: '65%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: '#55470d',
              fontSize: '1.67cqw',
              letterSpacing: '0.015em',
            }}
          >
            <span>Exclusive Treatment</span>
            <span style={{ fontSize: '1.25em', padding: '0 0.5cqw', lineHeight: 0.8 }}>•</span>
            <span>Hair Treatment</span>
            <span style={{ fontSize: '1.25em', padding: '0 0.5cqw', lineHeight: 0.8 }}>•</span>
            <span>Pedicure &amp; Medicure</span>
          </div>

          {/* 6. "S&K Berlaku" (CenterY ~71% H, Lebar ~8.7% W) */}
          <div
            className="absolute text-center select-none font-rokkitt font-medium whitespace-nowrap"
            style={{
              top: '71%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: '#6b5a15',
              fontSize: '1.56cqw',
              letterSpacing: '0.02em',
            }}
          >
            {promoCard.termsAndConditions}
          </div>

          {/* 7. Dua Tombol Pill Rata Tengah (CenterY ~83% H, Ukuran Tombol TETAP) */}
          <div
            className="absolute flex items-center justify-center"
            style={{
              top: '83%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              height: '10.2%',
              gap: '1.8cqw',
            }}
          >
            {/* Tombol "BOOK NOW" dengan Efek Spring, Pulsing Glow, dan Sapuan Kilau Diagonal */}
            <motion.a
              href={promoCard.buttons.bookNow.href}
              className="relative overflow-hidden rounded-full font-rokkitt font-bold flex items-center justify-center no-underline select-none outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#ad8f12]"
              style={{
                width: '13.2vw',
                height: '100%',
                backgroundImage: BTN_BOOK_GRADIENT,
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
              <span
                className="relative z-10 font-bold whitespace-nowrap"
                style={{
                  color: '#ffffff',
                  fontSize: '2.11cqw',
                  letterSpacing: '0.012em',
                }}
              >
                {promoCard.buttons.bookNow.label}
              </span>
            </motion.a>

            {/* Tombol "SEE MORE" */}
            <motion.button
              type="button"
              onClick={handleScrollToOffers}
              className="rounded-full font-rokkitt flex flex-col items-center justify-center cursor-pointer select-none bg-white hover:bg-stone-50"
              style={{
                width: '13.0vw',
                height: '100%',
                border: '2px solid #b8991a',
                boxShadow: '0 0.2vw 0.6vw rgba(0, 0, 0, 0.05)',
              }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <span
                className="font-bold tracking-wider leading-tight whitespace-nowrap"
                style={{
                  fontSize: '1.45cqw',
                  color: '#9e8115',
                  letterSpacing: '0.02em',
                }}
              >
                {promoCard.buttons.seeMore.title}
              </span>
              <span
                className="font-medium tracking-normal leading-tight whitespace-nowrap"
                style={{
                  fontSize: '1.32cqw',
                  color: '#b8991a',
                  letterSpacing: '0.01em',
                }}
              >
                {promoCard.buttons.seeMore.subtitle}
              </span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* ── 3. FOTO DALAM BINGKAI PILL (Mulai 27% W, Lebar 17.3% W, Tinggi 66.5% H, Atas 16.6% H) ── */}
      <div
        className="absolute overflow-hidden rounded-full z-20 pointer-events-none select-none"
        style={{
          left: '27%',
          top: '16.6%',
          width: '17.3%',
          height: '66.5%',
          border: '0.55vw solid #ffffff',
          boxShadow: '0 0.5vw 1.5vw rgba(0, 0, 0, 0.28)',
          backgroundColor: '#ebebeb',
        }}
      >
        {/* Foto Atas: Model Pirang (Card-2.png) dengan sambungan diagonal */}
        <div
          className="absolute inset-0"
          style={{
            clipPath: 'polygon(0 0, 100% 0, 100% 46%, 0 58%)',
            transform: 'translateZ(0)',
          }}
        >
          <img
            src={promoCard.pillPhoto.topImage}
            alt={promoCard.pillPhoto.alt}
            decoding="async"
            loading="eager"
            className="absolute left-0 top-0 w-full object-cover select-none"
            style={{
              height: '66%',
              objectPosition: 'center 20%',
            }}
          />
        </div>

        {/* Foto Bawah: Model Berambut Gelap Tersenyum (Card-1.png) */}
        <div
          className="absolute inset-0"
          style={{
            clipPath: 'polygon(0 58%, 100% 46%, 100% 100%, 0 100%)',
            transform: 'translateZ(0)',
          }}
        >
          <img
            src={promoCard.pillPhoto.bottomImage}
            alt={promoCard.pillPhoto.alt}
            decoding="async"
            loading="eager"
            className="absolute bottom-0 left-0 w-full object-cover select-none"
            style={{
              height: '62%',
              objectPosition: 'center 28%',
            }}
          />
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// SUB-KOMPONEN 3: HERO SECTION ("Special Offer")
// ─────────────────────────────────────────────────────────────
function PromoHero() {
  const { hero } = SPECIAL_PROMO_DATA;

  return (
    <section
      aria-label="Special Promo Hero"
      className="relative w-full overflow-hidden"
      style={{
        isolation: 'isolate',
        background: HERO_BG_GRADIENT,
      }}
    >
      {/* Background Hero: Layer 1 (gambar blur 2.5px scale(1.05)) + Layer 2 (gradasi emas 135deg) */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ zIndex: 0 }}
      >
        <img
          src={hero.backgroundImage}
          alt="LumiGlow Salon Interior"
          className="w-full h-full object-cover select-none"
          style={{
            objectPosition: 'center',
            filter: 'blur(2.5px)',
            transform: 'scale(1.05)',
          }}
        />
        {/* Layer 2: gradasi emas 135deg */}
        <div
          className="absolute inset-0"
          style={{ background: HERO_BG_GRADIENT }}
        />
      </div>

      {/* Konten Hero Desktop: paddingTop tetap 11.85vw, paddingBottom = SPACING.heroBottom */}
      <div
        className="hidden md:flex flex-col items-center w-full relative z-10"
        style={{
          paddingTop: '11.85vw',
          paddingBottom: SPACING.heroBottom,
        }}
      >
        {/* Heading "Special Offer": Serif Putih, semi-bold, 2.6vw, x=15.1vw, top=7.1vw (1.65vw di atas puncak kartu) */}
        <div
          className="absolute z-10"
          style={{
            left: '15.1vw',
            top: '7.1vw',
          }}
        >
          <h1
            className="font-rokkitt font-semibold text-white tracking-wide"
            style={{
              fontSize: '2.6vw',
              lineHeight: 1.2,
              filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.35))',
            }}
          >
            {hero.heading}
          </h1>
        </div>

        {/* Kartu Promo Desktop: Lebar 71.1vw, Tinggi 40.3vw */}
        <div
          style={{
            width: '71.1vw',
            height: '40.3vw',
            containerType: 'inline-size',
          }}
        >
          <PromoCard />
        </div>
      </div>

      {/* Heading untuk Tampilan Mobile (< 768px) */}
      <div className="md:hidden w-full px-6 pt-8 z-10 text-center relative">
        <h1 className="font-rokkitt font-medium text-white text-3xl tracking-wide">
          {hero.heading}
        </h1>
      </div>

      {/* Kartu Promo Mobile (< 1024px) yang Mengalir Responsif */}
      <div className="md:hidden w-full px-4 pt-6 pb-12 z-20 relative">
        <div className="w-full bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col">
          {/* Pita Emas Horizontal Atas dengan Simulasi Kain */}
          <div
            className="w-full h-24 relative overflow-hidden flex items-center justify-center text-center"
            style={{
              background:
                'linear-gradient(135deg, #473b07 0%, #ad8f12 50%, #e0c13d 100%)',
            }}
          >
            <WavingGoldCloth className="absolute inset-0 w-full h-full" />
            <h2 className="relative z-10 font-playfair font-bold text-white text-2xl tracking-widest uppercase drop-shadow-md">
              SPECIAL PROMO
            </h2>
          </div>

          {/* Foto Model Berdampingan */}
          <div className="w-full p-6 flex justify-center items-center gap-4 bg-stone-50">
            <div className="w-28 h-36 rounded-full overflow-hidden border-4 border-white shadow-md">
              <img
                src={SPECIAL_PROMO_DATA.promoCard.pillPhoto.topImage}
                alt="Blonde Model"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-28 h-36 rounded-full overflow-hidden border-4 border-white shadow-md">
              <img
                src={SPECIAL_PROMO_DATA.promoCard.pillPhoto.bottomImage}
                alt="Brunette Model"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Konten Teks & Tombol */}
          <div className="p-6 flex flex-col items-center text-center">
            <div className="font-podkova font-bold text-xl text-[#ad8f12] tracking-wider mb-1">
              LUMIGLOW
            </div>
            <div className="font-podkova font-bold text-3xl text-[#ad8f12] mb-2">
              GET <span className="text-[#e0c13d]">20%</span> OFF
            </div>
            <div className="font-rokkitt font-bold text-base text-[#3d3205] uppercase mb-3">
              FOR ALL HAIR & BEAUTY TREATMENTS
            </div>
            <div className="font-rokkitt text-xs text-stone-600 mb-1">
              Exclusive Treatment • Hair Treatment • Pedicure & Medicure
            </div>
            <div className="font-rokkitt text-[11px] text-stone-500 mb-6">
              S&K Berlaku
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs">
              <motion.a
                href="#book"
                className="w-full py-3 rounded-full text-center font-rokkitt font-bold text-white uppercase text-sm select-none"
                style={{
                  background:
                    'linear-gradient(135deg, #7c640e 0%, #ad8f12 50%, #e0c13d 100%)',
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                BOOK NOW
              </motion.a>
              <motion.a
                href="#all-offers"
                className="w-full py-2.5 rounded-full text-center font-rokkitt font-bold text-[#ad8f12] border-2 border-[#ad8f12] text-xs flex flex-col justify-center items-center select-none"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <span>SEE MORE</span>
                <span className="text-[10px] font-normal">Offers & Treatments</span>
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// SUB-KOMPONEN 4: SECTION "ALL OFFERS" (3 KARTU PENAWARAN)
// ─────────────────────────────────────────────────────────────
function AllOffers() {
  const { allOffers } = SPECIAL_PROMO_DATA;

  return (
    <section
      id="all-offers"
      aria-label="All Special Offers"
      className="relative w-full"
      style={{
        background: OFFERS_BG_GRADIENT,
        paddingTop: SPACING.offersTop,
        paddingBottom: SPACING.offersBottom,
      }}
    >
      {/* Cross-fade layer: gradasi All Offers melebar ke atas sebesar SPACING.fade, memudar halus ke hero */}
      <div
        className="absolute inset-x-0 pointer-events-none"
        style={{
          top: `calc(-1 * ${SPACING.fade})`,
          height: SPACING.fade,
          background: OFFERS_BG_GRADIENT,
          maskImage: `linear-gradient(to bottom, transparent 0px, #000 100%)`,
          WebkitMaskImage: `linear-gradient(to bottom, transparent 0px, #000 100%)`,
          zIndex: 1,
        }}
      />

      {/* Heading "All Offers" */}
      <div
        className="w-full text-center relative z-10"
        style={{
          marginBottom: SPACING.offersHeadingToCards,
        }}
      >
        <h2
          className="font-rokkitt font-medium text-white tracking-wide text-center"
          style={{
            fontSize: '5.4vw',
            lineHeight: 1.1,
            filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.25))',
          }}
        >
          {allOffers.heading}
        </h2>
      </div>

      {/* Desktop Layout: 3 Kartu Putih Sejajar (Lebar 24.2vw, Tinggi 30.7vw, Jarak 3.5vw, Margin 10.2vw) */}
      <div
        className="hidden md:grid md:grid-cols-3 items-stretch w-full relative z-10"
        style={{
          paddingLeft: '10.2vw',
          paddingRight: '10.2vw',
          gap: '3.5vw',
        }}
      >
        {allOffers.cards.map((offer) => (
          <div
            key={offer.id}
            className="bg-white flex flex-col overflow-hidden relative transition-transform hover:-translate-y-1"
            style={{
              width: '100%',
              height: '30.7vw',
              borderRadius: '0.8vw',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.08)',
            }}
          >
            {/* 1. Gambar Bagian Atas: Tinggi ~54% Tinggi Kartu, Object-fit Cover */}
            <div
              className="relative w-full overflow-hidden select-none"
              style={{
                height: '54%',
              }}
            >
              <img
                src={offer.image}
                alt={offer.title}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover block"
                style={{
                  borderTopLeftRadius: '0.8vw',
                  borderTopRightRadius: '0.8vw',
                }}
              />

              {/* Badge Kuning di Pojok Kiri Bawah Gambar:
                  Menempel ke tepi kiri dan bawah gambar, lebar ~39% W, tinggi ~9.5% H,
                  hanya sudut kanan atas membulat 0.8vw, warna #FFD400, font regular (400) */}
              <div
                className="absolute left-0 bottom-0 flex items-center justify-center font-['Roboto',sans-serif] text-[#1a1a1a] select-none"
                style={{
                  width: '39%',
                  height: '17.6%',
                  backgroundColor: '#FFD400',
                  borderTopRightRadius: '0.8vw',
                  fontSize: '0.94vw',
                  fontWeight: 400,
                  letterSpacing: '0.01em',
                }}
              >
                {offer.badge}
              </div>
            </div>

            {/* 2. Badan Kartu: Judul Medium, Deskripsi, dan Teks Bergaris Bawah View Detail */}
            <div
              className="flex-1 flex flex-col justify-between"
              style={{
                paddingTop: '1.2vw',
                paddingLeft: '1.2vw',
                paddingRight: '1.2vw',
                paddingBottom: '1.6vw',
              }}
            >
              <div>
                {/* Judul Kartu: Serif Medium ~1.65vw */}
                <h3
                  className="font-rokkitt font-medium text-[#1a1a1a] tracking-wide"
                  style={{
                    fontSize: '1.65vw',
                    lineHeight: 1.25,
                    marginBottom: '0.5vw',
                  }}
                >
                  {offer.title}
                </h3>

                {/* Deskripsi: Serif Abu ~1.12vw, 2 Baris */}
                <p
                  className="font-rokkitt font-normal text-stone-500"
                  style={{
                    fontSize: '1.12vw',
                    lineHeight: 1.35,
                  }}
                >
                  {offer.description}
                </p>
              </div>

              {/* View Detail: Teks Serif Bergaris Bawah Tipis ~1.05vw, Rata Kanan, Warna Emas Gelap/Coklat Tua */}
              <div
                className="w-full flex justify-end"
                style={{
                  paddingRight: '0.8vw',
                }}
              >
                <Link
                  to={offer.href}
                  className="font-rokkitt font-normal text-[#3F3405] underline underline-offset-4 hover:text-[#000000] transition-colors select-none"
                  style={{
                    fontSize: '1.05vw',
                  }}
                >
                  {offer.detailText}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Layout (< 768px): Grid 1 Kolom Rapi */}
      <div className="md:hidden w-full px-5 pb-6 flex flex-col gap-6 relative z-10">
        {allOffers.cards.map((offer) => (
          <div
            key={offer.id}
            className="w-full bg-white rounded-xl overflow-hidden shadow-lg flex flex-col"
          >
            <div className="relative w-full h-48">
              <img
                src={offer.image}
                alt={offer.title}
                className="w-full h-full object-cover"
              />
              <div
                className="absolute left-0 bottom-0 px-4 py-1.5 font-normal text-xs text-stone-900 rounded-tr-lg"
                style={{ backgroundColor: '#FFD400' }}
              >
                {offer.badge}
              </div>
            </div>
            <div className="p-5 flex flex-col justify-between gap-4">
              <div>
                <h3 className="font-rokkitt font-medium text-xl text-stone-900 mb-1">
                  {offer.title}
                </h3>
                <p className="font-rokkitt text-sm text-stone-600">
                  {offer.description}
                </p>
              </div>
              <div className="flex justify-end">
                <Link
                  to={offer.href}
                  className="font-rokkitt font-normal text-sm text-[#3F3405] underline underline-offset-4"
                >
                  {offer.detailText}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// SUB-KOMPONEN 5: SECTION CTA KHUSUS SPECIAL PROMO
// ─────────────────────────────────────────────────────────────
function PromoCTA({ onNavigate }: { onNavigate?: (page: string) => void }) {
  const handleClick = (label: string) => {
    if (onNavigate) {
      onNavigate(label);
    }
  };

  return (
    <section
      id="cta"
      aria-label="Ready for Your Signature Glow"
      className="relative w-full"
      style={{
        background: CTA_BG_GRADIENT,
      }}
    >
      {/* Cross-fade layer: gradasi CTA melebar ke atas sebesar SPACING.fade, memudar halus ke All Offers */}
      <div
        className="absolute inset-x-0 pointer-events-none"
        style={{
          top: `calc(-1 * ${SPACING.fade})`,
          height: SPACING.fade,
          background: CTA_BG_GRADIENT,
          maskImage: `linear-gradient(to bottom, transparent 0px, #000 100%)`,
          WebkitMaskImage: `linear-gradient(to bottom, transparent 0px, #000 100%)`,
          zIndex: 1,
        }}
      />

      {/* ── Desktop Content (≥768px): Flow-based layout ── */}
      <div
        className="hidden md:flex flex-col items-center w-full relative z-10"
        style={{ paddingTop: SPACING.ctaTop }}
      >
        {/* Heading */}
        <h2
          className="text-center font-podkova font-medium text-white tracking-normal whitespace-nowrap"
          style={{
            fontSize: '3.8vw',
            lineHeight: 1.2,
            maxWidth: '63.6vw',
          }}
        >
          Ready for Your Signature Glow?
        </h2>

        {/* Paragraf */}
        <p
          className="text-center font-podkova font-normal text-white"
          style={{
            fontSize: '1.85vw',
            lineHeight: '2.96vw',
            maxWidth: '82vw',
            marginTop: '2vw',
          }}
        >
          <span className="inline-block whitespace-nowrap">
            Your best hair and skin days are just one click away. Step into Lumiglow Beauty and
          </span>
          <br />
          <span className="inline-block whitespace-nowrap">
            let our experts bring out your natural radiance.
          </span>
        </p>

        {/* Tombol Aksi */}
        <div
          className="flex justify-center"
          style={{
            marginTop: '2.5vw',
            gap: '3.4vw',
          }}
        >
          <Link
            to="/#book"
            onClick={() => handleClick('Book Now')}
            className="rounded-[0.41vw] text-[#1a1a1a] font-roboto font-medium inline-flex items-center justify-center transition-all hover:brightness-95 active:scale-95 cursor-pointer shadow-md select-none"
            style={{
              width: '15vw',
              height: '3.4vw',
              backgroundColor: '#FFD400',
              fontSize: '1.14vw',
              gap: '0.76vw',
            }}
          >
            <span>Book Now</span>
            <span aria-hidden="true" className="font-bold" style={{ fontSize: '1.38vw' }}>
              →
            </span>
          </Link>
          <Link
            to="/service"
            onClick={() => handleClick('Service')}
            className="rounded-[0.41vw] text-[#1a1a1a] font-roboto font-medium inline-flex items-center justify-center transition-all hover:bg-stone-50 active:scale-95 cursor-pointer shadow-md select-none bg-white"
            style={{
              width: '15vw',
              height: '3.4vw',
              border: 'none',
              fontSize: '1.14vw',
              gap: '0.76vw',
            }}
          >
            <span>Service</span>
            <span aria-hidden="true" className="font-bold" style={{ fontSize: '1.38vw' }}>
              →
            </span>
          </Link>
        </div>

        {/* Foto Produk CTA: full-width, flow-based, menempel ke bawah */}
        <img
          src="/images/home/CTA-Home-PGG-1.png"
          alt="LumiGlow Signature Beauty & Hair Care Collection"
          className="w-full h-auto block pointer-events-none select-none"
          style={{ marginTop: '2vw' }}
        />
      </div>

      {/* Layout Mobile (<768px): responsif mengalir */}
      <div className="md:hidden relative z-10 pt-14 pb-8 flex flex-col items-center text-center px-5">
        <h2 className="font-podkova font-medium text-[clamp(26px,7vw,40px)] leading-tight text-white tracking-normal">
          Ready for Your Signature Glow?
        </h2>
        <p className="font-podkova font-normal text-base leading-relaxed text-white mt-4 max-w-md">
          Your best hair and skin days are just one click away. Step into Lumiglow Beauty and let our experts bring out your natural radiance.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            to="/#book"
            onClick={() => handleClick('Book Now')}
            className="px-8 py-3 text-base bg-[#FFD400] text-[#1a1a1a] font-roboto font-medium rounded-md shadow-md hover:brightness-95 active:scale-95"
          >
            Book Now
          </Link>
          <Link
            to="/service"
            onClick={() => handleClick('Service')}
            className="px-8 py-3 text-base bg-white text-[#1a1a1a] font-roboto font-medium rounded-md shadow-md hover:bg-stone-50 active:scale-95"
          >
            Service
          </Link>
        </div>
        <img
          src="/images/home/CTA-Home-PGG-1.png"
          alt="LumiGlow Signature Beauty & Hair Care Collection"
          className="w-full h-auto block mt-8 pointer-events-none"
        />
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// KOMPONEN UTAMA HALAMAN SPECIAL PROMO (SATU-SATUNYA DEFAULT EXPORT)
// ─────────────────────────────────────────────────────────────
export default function SpecialPromo({ onNavigate }: SpecialPromoProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col font-['Roboto',sans-serif] selection:bg-[#FACC15] selection:text-[#111]">
      {/* 1. Header / Navbar Bersama */}
      <Navbar onNavigate={onNavigate} />

      {/* Spacer 96px (h-24) agar Hero dimulai tepat di bawah navbar putih 96px */}
      <div className="h-24 w-full shrink-0" />

      <main className="flex-1 w-full">
        {/* 2. Hero "Special Offer" dengan Kartu Promo Besar dan Animasi Lengkap */}
        <PromoHero />

        {/* 3. Section "All Offers" dengan 3 Kartu Penawaran */}
        <AllOffers />

        {/* 4. CTA Section Khusus Special Promo */}
        <PromoCTA onNavigate={onNavigate} />
      </main>

      {/* 5. Footer Bersama */}
      <div className="relative z-20">
        <Footer onNavigate={onNavigate} />
      </div>
    </div>
  );
}
