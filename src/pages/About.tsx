import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import OurService from '../components/OurService';
import CTASection from '../components/CTASection';

// ===== TYPES & INTERFACES =====
interface AboutProps {
  onNavigate?: (page: string) => void;
}

// ===== PENGATURAN FOTO — EDIT DI SINI =====
const PHOTO_SETTINGS = {
  heroWoman: {
    src: '/images/about/About-HD-1.png',
    width: '58.5vw', // 22% lebih kecil (75 * 0.78 = 58.5vw)
    height: 'auto',
    right: '4vw' as string | number | undefined, // Ujung kanan bunga anggrek di ~96% lebar layar
    left: undefined as string | number | undefined,
    bottom: 0 as string | number,
    objectFit: 'contain' as const,
    objectPosition: 'bottom' as const,
    radius: 0,
    label: 'About-HD-1.png (heroWoman)',
  },
  photoA: {
    src: '/images/about/About-PG-3.jpg',
    left: 0, // Figma: left 0 (tepi kiri container)
    top: -176, // Figma: dasar hero − 176
    width: 287, // Figma: 287×343
    height: 343,
    radius: 20,
    shadow: '0 4px 10px rgba(0,0,0,0.25)',
    objectFit: 'cover' as const,
    objectPosition: 'center' as const,
    label: 'About-PG-3.jpg (photoBlonde)',
  },
  photoB: {
    src: '/images/about/About-PG-4.jpg',
    left: 334, // photoA.width(287) + gap(47≈3.2vw) = 334, NO overlap
    top: -35, // Figma: dasar hero − 35 (dasar B = dasar hero + 390)
    width: 353, // Figma: 353×425
    height: 425,
    radius: 20,
    shadow: '0 4px 10px rgba(0,0,0,0.25)',
    objectFit: 'cover' as const,
    objectPosition: 'center' as const,
    label: 'About-PG-4.jpg (photoFoil)',
  },
  featureWoman: {
    src: '/images/about/About-PG-2-Remove.png',
    width: '100%',
    height: '100%',
    radius: 0,
    objectFit: 'cover' as const,
    objectPosition: 'center' as const,
    label: 'About-PG-2-Remove.png (featureWoman)',
  },
};

// ===== DATA TIM — EDIT DI SINI =====
// Anda dapat mengganti faceImage (foto wajah) dan fullImage (foto full body) sesuai aset Anda.
const TEAM_MEMBERS = [
  {
    id: 1,
    name: 'Name',
    role: 'Role',
    faceImage: '/images/about/Team-1.jpg',
    fullImage: '/images/about/Team-1.jpg',
    src: '/images/about/Team-1.jpg',
  },
  {
    id: 2,
    name: 'Name',
    role: 'Role',
    faceImage: '/images/about/Team-2.jpg',
    fullImage: '/images/about/Team-2.jpg',
    src: '/images/about/Team-2.jpg',
  },
  {
    id: 3,
    name: 'Name',
    role: 'Role',
    faceImage: '/images/about/Team-3.jpg',
    fullImage: '/images/about/Team-3.jpg',
    src: '/images/about/Team-3.jpg',
  },
  {
    id: 4,
    name: 'Name',
    role: 'Role',
    faceImage: '/images/about/Team-4.jpg',
    fullImage: '/images/about/Team-4.jpg',
    src: '/images/about/Team-4.jpg',
  },
  {
    id: 5,
    name: 'Name',
    role: 'Role',
    faceImage: '/images/about/Team-5.jpg',
    fullImage: '/images/about/Team-5.jpg',
    src: '/images/about/Team-5.jpg',
  },
];

// Konstanta Ukuran & Layout About (Figma Target)
const SIZES = {
  containerMaxWidth: 1159,
  creamBg: '#FFF7DC',
  hero: {
    height: 903, // Figma: 903 ≈ 62.2vw
    headingX: 147,
    headingTop: 138, // Figma: 138
    headingWidth: 623, // Figma: 623
    headingHeight: 154, // Figma: 154
    headingFontSize: 56, // Kalibrasi agar baris kedua 623 (±15) dan tinggi 154
    headingLineHeight: 77, // Figma: line-height 77
    paragraphX: 149,
    paragraphTop: 313, // Figma: 313
    paragraphWidth: 480, // Disesuaikan agar sejajar ujung tombol Service dan ada jarak lega ke foto
    paragraphHeight: 224, // Figma: 224
    paragraphFontSize: 20, // Kalibrasi tepat 7 baris dan tinggi 224 (±4)
    paragraphLineHeight: 32, // Figma: line-height 32
    buttonsTop: 605, // Figma: 605
    buttonWidth: 218,
    buttonHeight: 49,
    buttonGap: 32,
    buttonRadius: 6,
  },
  intro: {
    photoATopOffset: -176,
    photoBTopOffset: -35,
    photoBLeft: 334, // photoA.width(287) + gap(47) = 334
    contentHeightBelowHero: 390,
    textBoxTopOffset: 103, // Figma: 103
    textBoxLeft: 812, // ~66% viewport (959px) - container offset (147px)
    textBoxWidth: 340,
    textBoxHeight: 216,
    gapToFeatureCard: 117, // Figma: dari dasar foto B ke atas kartu fitur = 117
  },
  feature: {
    cardMaxWidth: 1159,
    cardRadius: 24, // Estimasi dari JPG design: rounded-[24px]
    cardShadow: '0 6px 16px rgba(0,0,0,0.25)',
    headingFontSize: 52,
    headingLineHeight: 62,
    paragraphWidth: 410,
    paragraphFontSize: 16,
    paragraphLineHeight: 26,
    buttonWidth: 218,
    buttonHeight: 49,
    buttonRadius: 8,
  },
  service: {
    gapFromFeatureCard: 170, // Figma: 170 dari dasar kartu fitur ke atas pill tab
    groupWidth: 1218,
    cardWidth: 352,
    cardHeight: 444,
    cardGap: 21,
    tabPillWidth: 352,
    tabPillHeight: 30,
    cardsTopFromTabPill: 69,
    dotsWidth: 73.5,
    dotsHeight: 16,
    dotsGapFromCards: 39,
  },
  team: {
    gapFromServiceDots: 116, // Figma: top = dasar dots Service + 116
    headingBoxWidth: 1062,
    headingBoxHeight: 120,
    headingFontSize: 52, // Proporsional sesuai Figma (sebelumnya 66px terlalu dominan)
    gapHeadingToCards: 36, // Figma: top = dasar kotak judul + 36
    cardWidth: 216,
    cardHeight: 306,
    cardGap: 20,
    cardRadiusTop: 108,
    cardRadiusBottom: 4,
    cardBorderWidth: 1.5,
    cardBorderColor: '#E9D679',
    nameTopFromCard: 24, // Jarak dari dasar kartu ke "Name" (Figma proporsi)
    gapNameToRole: 8, // Jarak rapat antara "Name" dan "Role" seperti di Figma
    nameFontSize: 22, // Ukuran teks "Name" (sebelumnya 28px)
    roleFontSize: 16, // Ukuran teks "Role" (sebelumnya 26px)
    gapRoleToCTA: 96, // Figma: dasar "Role" ke atas CTA = 96
  },
};

// Hook IntersectionObserver ringan untuk animasi masuk
function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setIsVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isVisible] as const;
}

// Slot Foto dengan Fallback Placeholder (sesuai spesifikasi)
function PhotoSlot({
  setting,
  alt,
  className = '',
  style = {},
  priority = false,
}: {
  setting: {
    src: string;
    width?: number | string;
    height?: number | string;
    radius?: number;
    objectFit?: 'contain' | 'cover' | 'fill';
    objectPosition?: string;
    label?: string;
    shadow?: string;
  };
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  priority?: boolean;
}) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !setting.src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex items-center justify-center p-3 text-center text-xs font-sans text-white/90 select-none ${className}`}
        style={{
          width: typeof setting.width === 'number' ? `${setting.width}px` : setting.width,
          height: typeof setting.height === 'number' ? `${setting.height}px` : setting.height,
          borderRadius: setting.radius ? `${setting.radius}px` : undefined,
          backgroundColor: 'rgba(255, 255, 255, 0.12)',
          border: '2px dashed rgba(255, 255, 255, 0.5)',
          ...style,
        }}
      >
        <span className="font-medium bg-black/40 px-2 py-1 rounded">
          {setting.label || alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={setting.src}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      onError={() => setHasError(true)}
      className={className}
      style={{
        width: typeof setting.width === 'number' ? `${setting.width}px` : setting.width,
        height: typeof setting.height === 'number' ? `${setting.height}px` : setting.height,
        borderRadius: setting.radius ? `${setting.radius}px` : undefined,
        objectFit: setting.objectFit || 'cover',
        objectPosition: setting.objectPosition || 'center',
        boxShadow: setting.shadow,
        ...style,
      }}
    />
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// BAGIAN 1: HERO SECTION
// ─────────────────────────────────────────────────────────────────────────────
function AboutHero() {
  const photo = PHOTO_SETTINGS.heroWoman;

  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden"
      style={{
        height: '62.2vw',
        minHeight: '600px',
        background: 'var(--about-hero-gradient, linear-gradient(90deg, #453B08 0%, #AC8E12 50%, #E3C53A 100%))',
      }}
    >
      {/* 
        Animasi Gradasi Hero: 3 lapisan cahaya absolut melayang pelan (pointer-events none, aria-hidden)
        x > 40vw agar tidak menutupi kontras teks di kiri
      */}
      <div
        aria-hidden="true"
        className="about-glow-layer-1 absolute pointer-events-none rounded-full"
        style={{
          width: '45vw',
          height: '45vw',
          right: '-5vw',
          top: '5vw',
          background: 'radial-gradient(circle, rgba(255,224,102,0.30) 0%, transparent 65%)',
          zIndex: 5,
        }}
      />
      <div
        aria-hidden="true"
        className="about-glow-layer-2 absolute pointer-events-none rounded-full"
        style={{
          width: '35vw',
          height: '35vw',
          right: '15vw',
          bottom: '2vw',
          background: 'radial-gradient(circle, rgba(255,196,0,0.22) 0%, transparent 65%)',
          zIndex: 6,
        }}
      />
      <div
        aria-hidden="true"
        className="about-glow-layer-3 absolute pointer-events-none rounded-full"
        style={{
          width: '30vw',
          height: '30vw',
          left: 0,
          bottom: 0,
          background: 'radial-gradient(circle, rgba(0,0,0,0.12) 0%, transparent 65%)',
          zIndex: 4,
        }}
      />

      {/* Foto heroWoman: absolute bottom-0, dikonfigurasi via PHOTO_SETTINGS.heroWoman */}
      <div
        className="hidden lg:block absolute bottom-0 pointer-events-none"
        style={{
          width: typeof photo.width === 'number' ? `${photo.width}px` : photo.width,
          height: typeof photo.height === 'number' ? `${photo.height}px` : (photo.height || 'auto'),
          right: photo.right !== undefined ? (typeof photo.right === 'number' ? `${photo.right}px` : photo.right) : undefined,
          left: photo.left !== undefined ? (typeof photo.left === 'number' ? `${photo.left}px` : photo.left) : undefined,
          bottom: photo.bottom !== undefined ? (typeof photo.bottom === 'number' ? `${photo.bottom}px` : photo.bottom) : 0,
          zIndex: 10,
        }}
      >
        <img
          src={photo.src}
          alt="Hero woman with pink orchid"
          loading="eager"
          className="w-full h-auto block"
          style={{
            objectFit: photo.objectFit || 'contain',
            objectPosition: photo.objectPosition || 'bottom',
          }}
        />
      </div>

      {/* Container terpusat max-w 79.8vw */}
      <div className="relative w-full max-w-[79.8vw] mx-auto h-full px-6" style={{ zIndex: 20 }}>
        {/* Desktop Absolute Layout */}
        {/* Heading: top 9.5vw, kotak 42.9vw wide, Podkova 500 putih */}
        <div
          className="hidden lg:block absolute left-0"
          style={{
            top: '9.5vw',
            width: '42.9vw',
          }}
        >
          <h1
            className="font-podkova text-white font-medium tracking-normal"
            style={{
              fontSize: '3.85vw',
              lineHeight: '5.3vw',
            }}
          >
            Your Beauty, Your
            <br />
            Confidence, Your Glow
          </h1>
        </div>

        {/* Paragraf: top 21.5vw, 33vw wide, Roboto 400 putih */}
        <div
          className="hidden lg:block absolute left-0"
          style={{
            top: '21.5vw',
            width: '33vw',
          }}
        >
          <p
            className="font-roboto text-white font-normal text-left"
            style={{
              fontSize: '1.38vw',
              lineHeight: '2.2vw',
            }}
          >
            At LumiGlow Beauty Salon, we believe that beauty is all about feeling
            confident and expressing your true self. We are dedicated to enhancing
            your natural beauty through personalized hair care, professional styling,
            vibrant hair coloring, and nail art services. Our team combines
            creativity, professional techniques, and quality products to deliver
            results that complement your unique style and personality.
          </p>
        </div>

        {/* Tombol: top 41.6vw, "Book Now →" + "Service →" */}
        <div
          className="hidden lg:flex items-center absolute left-0"
          style={{
            top: '41.6vw',
            gap: '2.2vw',
          }}
        >
          <Link
            to="/#book"
            className="inline-flex items-center justify-center gap-[0.76vw] font-roboto font-medium text-[1.14vw] text-[#1a1a1a] shadow-md cursor-pointer about-btn-hover"
            style={{
              width: '15vw',
              height: '3.4vw',
              backgroundColor: '#FFD400',
              borderRadius: '0.41vw',
            }}
          >
            <span>Book Now</span>
            <span aria-hidden="true" className="about-btn-arrow text-[20px] font-bold">→</span>
          </Link>

          <Link
            to="/service"
            className="inline-flex items-center justify-center gap-[0.76vw] font-roboto font-medium text-[1.14vw] text-[#1a1a1a] shadow-md cursor-pointer about-btn-hover"
            style={{
              width: '15vw',
              height: '3.4vw',
              backgroundColor: '#FFFFFF',
              borderRadius: '0.41vw',
            }}
          >
            <span>Service</span>
            <span aria-hidden="true" className="about-btn-arrow text-[20px] font-bold">→</span>
          </Link>
        </div>

        {/* Mobile & Tablet Fallback (<1024px) */}
        <div className="lg:hidden flex flex-col justify-between h-full pt-28 pb-8">
          <div>
            <h1 className="font-podkova text-white font-medium text-3xl sm:text-5xl leading-tight">
              Your Beauty, Your
              <br />
              Confidence, Your Glow
            </h1>

            <p className="font-roboto text-white font-normal text-sm sm:text-base leading-relaxed mt-4 max-w-lg">
              At LumiGlow Beauty Salon, we believe that beauty is all about feeling
              confident and expressing your true self. We are dedicated to enhancing
              your natural beauty through personalized hair care, professional styling,
              vibrant hair coloring, and nail art services. Our team combines
              creativity, professional techniques, and quality products to deliver
              results that complement your unique style and personality.
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-6">
              <Link
                to="/#book"
                className="inline-flex items-center justify-center gap-2 font-roboto font-medium text-[15px] text-[#1a1a1a] px-6 py-3 rounded-[6px] bg-[#FFD400] shadow-md hover:brightness-95 active:scale-95 transition-all"
              >
                <span>Book Now</span>
                <span aria-hidden="true">→</span>
              </Link>

              <Link
                to="/service"
                className="inline-flex items-center justify-center gap-2 font-roboto font-medium text-[15px] text-[#1a1a1a] px-6 py-3 rounded-[6px] bg-white shadow-md hover:brightness-95 active:scale-95 transition-all"
              >
                <span>Service</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          <div className="mt-8 w-full max-w-sm mx-auto aspect-[75/56] rounded-xl overflow-hidden shadow-lg">
            <PhotoSlot
              setting={photo}
              alt="Hero woman with pink orchid"
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// BAGIAN 2: FOTO BERTUMPUK + KOTAK TEKS
// ─────────────────────────────────────────────────────────────────────────────
function AboutIntro() {
  const d = SIZES.intro;
  const photoA = PHOTO_SETTINGS.photoA;
  const photoB = PHOTO_SETTINGS.photoB;
  const [ref, isVisible] = useInView(0.2);

  // Dari dasar foto B (390px) ke atas kartu fitur: 117px
  // Total tinggi section intro: 390 + 117 = 507px
  const introHeight = d.contentHeightBelowHero + d.gapToFeatureCard;

  return (
    <section
      id="intro"
      ref={ref}
      className="relative w-full z-30"
      style={{
        backgroundColor: 'var(--about-cream, #FFF7DC)',
      }}
    >
      {/* Desktop Container (1159px, exact absolute positions) */}
      <div
        className="hidden lg:block relative w-full max-w-[1159px] mx-auto px-6 min-[1159px]:px-0"
        style={{
          height: `${introHeight}px`,
        }}
      >
        {/* Foto A (Blonde): 287×343px, left 0, top -176px (menimpa hero 176px) */}
        <div
          className={`absolute overflow-hidden about-fade-up ${isVisible ? 'is-visible' : ''}`}
          style={{
            width: `${photoA.width}px`,
            height: `${photoA.height}px`,
            left: `${photoA.left}px`,
            top: `${photoA.top}px`,
            borderRadius: `${photoA.radius}px`,
            boxShadow: photoA.shadow,
            zIndex: 15,
          }}
        >
          <PhotoSlot
            setting={photoA}
            alt="Smiling blonde woman"
            className="w-full h-full"
          />
        </div>

        {/* Foto B (Foil): 353×425px, left 334px, top -35px (dasar B = +390px) */}
        <div
          className={`absolute overflow-hidden about-fade-up ${isVisible ? 'is-visible' : ''}`}
          style={{
            width: `${photoB.width}px`,
            height: `${photoB.height}px`,
            left: `${photoB.left}px`,
            top: `${photoB.top}px`,
            borderRadius: `${photoB.radius}px`,
            boxShadow: photoB.shadow,
            transitionDelay: '120ms',
            zIndex: 16,
          }}
        >
          <PhotoSlot
            setting={photoB}
            alt="Woman with hair foil and black gloves"
            className="w-full h-full"
          />
        </div>

        {/* Kotak Teks: 354×216px, left 805px, top +103px */}
        <div
          className={`absolute about-fade-up ${isVisible ? 'is-visible' : ''}`}
          style={{
            width: `${d.textBoxWidth}px`,
            height: `${d.textBoxHeight}px`,
            left: `${d.textBoxLeft}px`,
            top: `${d.textBoxTopOffset}px`,
            transitionDelay: '200ms',
            zIndex: 14,
          }}
        >
          <p className="font-sans font-medium text-[28px] leading-[36px] text-[#555555]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      </div>

      {/* Mobile & Tablet Layout (<1024px) */}
      <div className="lg:hidden flex flex-col items-center gap-8 py-12 px-6 max-w-lg mx-auto">
        <div
          className="w-full max-w-[287px] aspect-[287/343] overflow-hidden rounded-[20px]"
          style={{ boxShadow: photoA.shadow }}
        >
          <PhotoSlot
            setting={photoA}
            alt="Smiling blonde woman"
            className="w-full h-full"
          />
        </div>

        <div
          className="w-full max-w-[353px] aspect-[353/425] overflow-hidden rounded-[20px]"
          style={{ boxShadow: photoB.shadow }}
        >
          <PhotoSlot
            setting={photoB}
            alt="Woman with hair foil and black gloves"
            className="w-full h-full"
          />
        </div>

        <div className="w-full text-center px-4">
          <p className="font-sans font-medium text-xl sm:text-2xl leading-snug text-[#555555]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// BAGIAN 3: KARTU "PRECISION TOUCH"
// ─────────────────────────────────────────────────────────────────────────────
function AboutFeature() {
  const d = SIZES.feature;
  const photo = PHOTO_SETTINGS.featureWoman;
  const [ref, isVisible] = useInView(0.2);

  return (
    <section
      id="feature"
      ref={ref}
      className="relative w-full pt-0 z-30"
      style={{
        backgroundColor: 'var(--about-cream, #FFF7DC)',
      }}
    >
      <div className="w-full max-w-[1159px] mx-auto px-6 min-[1159px]:px-0">
        <div
          className={`relative w-full bg-white overflow-hidden rounded-[24px] shadow-lg flex flex-col lg:flex-row items-stretch about-fade-up about-card-hover ${isVisible ? 'is-visible' : ''}`}
          style={{
            maxWidth: `${d.cardMaxWidth}px`,
            boxShadow: d.cardShadow,
          }}
        >
          {/* Kolom Foto: w-1/2 (±50% lebar kartu), h-full, relative overflow-hidden */}
          <div className="w-full lg:w-1/2 relative overflow-hidden self-stretch bg-white min-h-[380px] sm:min-h-[460px] lg:min-h-[560px]">
            {/* Aksen abu-abu halus di pojok kiri-atas foto di belakang rambut */}
            <div
              className="absolute top-0 left-0 w-full h-full pointer-events-none"
              style={{
                background: 'radial-gradient(circle at 18% 18%, #D9D9D9 0%, #D9D9D9 42%, #FFFFFF 72%)',
              }}
              aria-hidden="true"
            />

            {/* Foto woman: object-cover object-center MENGISI PENUH tanpa celah */}
            <div className={`w-full h-full relative z-10 about-photo-slide ${isVisible ? 'is-visible' : ''}`}>
              <PhotoSlot
                setting={photo}
                alt="Precision Touch Feature Woman"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>

          {/* Kolom Teks: w-1/2, bg putih, flex flex-col justify-center, padding kiri ±48px */}
          <div className="w-full lg:w-1/2 bg-white flex flex-col justify-center px-8 lg:pl-[48px] lg:pr-[64px] py-12 lg:py-16">
            <div className={`about-stagger-1 ${isVisible ? 'is-visible' : ''}`}>
              <h2
                className="font-podkova text-[#1F1F1F] font-medium tracking-normal text-3xl sm:text-4xl lg:text-[52px]"
                style={{
                  lineHeight: `${d.headingLineHeight}px`,
                }}
              >
                Precision
                <br />
                Touch for All
                <br />
                Your Needs
              </h2>
            </div>

            <div className={`about-stagger-2 ${isVisible ? 'is-visible' : ''}`}>
              <p
                className="font-sans text-[#222222] font-normal text-left text-sm sm:text-base leading-relaxed mt-6"
                style={{
                  fontSize: `${d.paragraphFontSize}px`,
                  lineHeight: `${d.paragraphLineHeight}px`,
                  maxWidth: `${d.paragraphWidth}px`,
                }}
              >
                At LumiGlow Beauty Salon, we believe that every detail makes a
                difference in bringing out your best look. Our wide range of
                beauty services is designed to meet your unique needs, from
                refreshing haircuts and personalized styling to beautiful hair
                coloring, nourishing treatments, and stunning nail care. With a
                focus on precision, creativity, and quality, we tailor every
                service to complement your style and enhance your natural
                beauty.
              </p>
            </div>

            <div className={`mt-8 about-stagger-3 ${isVisible ? 'is-visible' : ''}`}>
              <Link
                to="/#book"
                className="inline-flex items-center justify-center gap-[11px] font-roboto font-medium text-[16.5px] text-[#1a1a1a] shadow-md cursor-pointer about-btn-hover"
                style={{
                  width: `${d.buttonWidth}px`,
                  height: `${d.buttonHeight}px`,
                  backgroundColor: '#FFD400',
                  borderRadius: `${d.buttonRadius}px`,
                }}
              >
                <span>Book Now</span>
                <span aria-hidden="true" className="about-btn-arrow text-[20px] font-bold">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// BAGIAN 5: OUR TEAM SECTION
// ─────────────────────────────────────────────────────────────────────────────
function AboutTeam() {
  const d = SIZES.team;

  return (
    <section
      id="team"
      className="w-full bg-[#FFF7DC]"
      style={{
        paddingTop: `${d.gapFromServiceDots}px`, // Figma: top = dasar dots Service + 116
        paddingBottom: `${d.gapRoleToCTA}px`, // Figma: dasar Role ke atas CTA = 96
      }}
    >
      <div className="max-w-[1160px] mx-auto w-full px-4 sm:px-6">
        {/* Kotak judul: lebar 1062, tinggi 159, rata tengah */}
        <div
          className="mx-auto flex items-center justify-center"
          style={{
            maxWidth: `${d.headingBoxWidth}px`,
            minHeight: `${d.headingBoxHeight}px`,
          }}
        >
          <h2
            className="font-raleway font-semibold text-[#2B2B2B] text-center tracking-tight"
            style={{
              fontSize: `${d.headingFontSize}px`,
              lineHeight: 1.1,
            }}
          >
            Our Team
          </h2>
        </div>

        {/* 
          Kartu foto (Figma): 5 kartu 216×306 di x = 147, 383, 618, 854, 1090 (gap 20)
          top = dasar kotak judul + 42
          Efek Hover: Saat kursor diarahkan ke kartu, foto wajah menghilang perlahan dan digantikan foto full body
        */}
        <div
          className="flex items-start gap-[20px] justify-start xl:justify-center overflow-x-auto xl:overflow-x-visible pb-4 xl:pb-0 hide-scrollbar w-full"
          style={{
            marginTop: `${d.gapHeadingToCards}px`,
          }}
        >
          {TEAM_MEMBERS.map((member, index) => {
            const faceSrc = member.faceImage || member.src;

            return (
              <div
                key={member.id || index}
                className="team-card group flex flex-col items-center flex-shrink-0 w-[216px]"
              >
                {/* Kartu Arch: 216×306px, radius 108px top, 4px bottom, border 1.5px #E9D679 */}
                <div
                  className="team-card-wrapper overflow-hidden bg-[#EAEAEA] relative"
                  style={{
                    width: `${d.cardWidth}px`,
                    height: `${d.cardHeight}px`,
                    borderRadius: `${d.cardRadiusTop}px ${d.cardRadiusTop}px ${d.cardRadiusBottom}px ${d.cardRadiusBottom}px`,
                    border: `${d.cardBorderWidth}px solid ${d.cardBorderColor}`,
                    isolation: 'isolate',
                    WebkitMaskImage: '-webkit-radial-gradient(white, black)',
                  }}
                >
                  {faceSrc ? (
                    <img
                      src={faceSrc}
                      alt={member.name}
                      className="team-card-img w-full h-full object-cover object-top"
                      onError={(e) => {
                        (e.currentTarget as HTMLElement).style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-[#E5E5E5] flex items-center justify-center text-xs text-stone-500 font-sans">
                      Slot Foto {index + 1}
                    </div>
                  )}
                </div>

                {/* Teks di bawah kartu: Name dan Role proporsional sesuai Figma */}
                <div
                  className="text-center flex flex-col items-center"
                  style={{
                    marginTop: `${d.nameTopFromCard}px`,
                  }}
                >
                  <h3
                    className="font-raleway font-medium text-[#111111] leading-none"
                    style={{
                      fontSize: `${d.nameFontSize}px`,
                    }}
                  >
                    {member.name}
                  </h3>

                  <p
                    className="font-raleway font-normal text-[#555555] leading-none"
                    style={{
                      fontSize: `${d.roleFontSize}px`,
                      marginTop: `${d.gapNameToRole}px`,
                    }}
                  >
                    {member.role}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN ABOUT PAGE COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function About({ onNavigate }: AboutProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen w-full overflow-x-hidden selection:bg-[#FFD400] selection:text-[#111]">
      {/* Navbar solid 96px */}
      <Navbar onNavigate={onNavigate} />
      
      {/* Spacer 96px agar Hero dimulai tepat di bawah navbar putih 96px */}
      <div className="h-24 w-full" />

      <main>
        {/* Bagian 1: Hero */}
        <AboutHero />

        {/* Bagian 2: Intro (2 overlapping photos + text) */}
        <AboutIntro />

        {/* Bagian 3: Precision Touch Feature Card */}
        <AboutFeature />

        {/* 
          Bagian 4: Our Service Carousel (Reused from Home, heading hidden, cream bg)
          Jarak dari dasar kartu fitur ke atas pill tab: 170px
        */}
        <OurService
          showHeading={false}
          bgClass="bg-[#FFF7DC]"
          sectionPadding="pt-[170px] pb-0"
          dotsMarginBottom=""
        />

        {/* Bagian 5: Our Team */}
        <AboutTeam />

        {/* Bagian 6: CTA Section */}
        <CTASection onNavigate={onNavigate} />
      </main>

      {/* Footer (menimpa dasar CTA 16px) */}
      <div className="relative z-20 -mt-[16px]">
        <Footer onNavigate={onNavigate} />
      </div>
    </div>
  );
}
