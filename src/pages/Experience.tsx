import { useState, useRef, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight, Star } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CTASection from '../components/CTASection';

// =============================================================
// ===== PENGATURAN DATA & FOTO EXPERIENCE — EDIT DI SINI =====
// =============================================================

interface ExperienceProps {
  onNavigate?: (page: string) => void;
}

const CAROUSEL_SETTINGS = {
  autoplay: true,
  autoplayInterval: 4500,
};

interface ExperienceSlide {
  id: number;
  image: string;
  title: string;
  alt: string;
}

const HERO_SLIDES: ExperienceSlide[] = [
  {
    id: 1,
    image: '/images/transformation/transformation-1.png',
    title: 'Client Transformation 1',
    alt: 'Real Results - Client Hair Transformation 1',
  },
  {
    id: 2,
    image: '/images/transformation/transformation-1.png',
    title: 'Client Transformation 2',
    alt: 'Real Results - Client Hair Transformation 2',
  },
  {
    id: 3,
    image: '/images/transformation/transformation-1.png',
    title: 'Client Transformation 3',
    alt: 'Real Results - Client Hair Transformation 3',
  },
  {
    id: 4,
    image: '/images/transformation/transformation-1.png',
    title: 'Client Transformation 4',
    alt: 'Real Results - Client Hair Transformation 4',
  },
  {
    id: 5,
    image: '/images/transformation/transformation-1.png',
    title: 'Client Transformation 5',
    alt: 'Real Results - Client Hair Transformation 5',
  },
];

interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  left: string;
  top: string;
  width: string;
  height: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'A',
    src: '/images/home/Gallery-PG-1.jpg',
    alt: 'Wanita pirang potret dengan rambut bergelombang elegan',
    left: '0%',
    top: '0%',
    width: '43.5%',
    height: '47.7%',
  },
  {
    id: 'B',
    src: '/images/home/Gallery-PG-3.jpg',
    alt: 'Kuku pink french manicure mewah',
    left: '46.2%',
    top: '0%',
    width: '24.1%',
    height: '28.0%',
  },
  {
    id: 'C',
    src: '/images/home/Gallery-PG-4.jpg',
    alt: 'Stylist profesional memotong dan menata rambut di salon',
    left: '46.2%',
    top: '29.9%',
    width: '24.1%',
    height: '26.3%',
  },
  {
    id: 'D',
    src: '/images/home/Gallery-PG-5.jpg',
    alt: 'Kuku putih nude elegan dengan cincin emas',
    left: '46.2%',
    top: '59.2%',
    width: '18.5%',
    height: '40.8%',
  },
  {
    id: 'E',
    src: '/images/home/Gallery-PG-2.jpg',
    alt: 'Wanita keramas dengan eyeshadow ungu menikmati relaksasi rambut',
    left: '0.2%',
    top: '51.2%',
    width: '43.0%',
    height: '48.8%',
  },
  {
    id: 'F',
    src: '/images/home/Gallery-PG-6.jpg',
    alt: 'Teknik hair coloring foil potret tinggi',
    left: '72.3%',
    top: '0%',
    width: '27.8%',
    height: '56.9%',
  },
  {
    id: 'G',
    src: '/images/home/Gallery-PG-7.jpg',
    alt: 'Close-up pewarnaan rambut dengan foil dan sarung tangan hitam',
    left: '67.1%',
    top: '60.7%',
    width: '32.9%',
    height: '39.3%',
  },
];

interface TestimonialItem {
  id: number;
  stars: number;
  text: string;
  author: string;
  avatarColor: string;
}

const TESTIMONIAL_ITEMS: TestimonialItem[] = [
  {
    id: 1,
    stars: 5,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    author: 'Lorem ipsum',
    avatarColor: '#6F8077', // abu-hijau
  },
  {
    id: 2,
    stars: 5,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    author: 'Lorem ipsum',
    avatarColor: '#D9D9D9', // abu muda
  },
  {
    id: 3,
    stars: 5,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    author: 'Lorem ipsum',
    avatarColor: '#FF6B6B', // koral
  },
  {
    id: 4,
    stars: 5,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    author: 'Lorem ipsum',
    avatarColor: '#6F8077', // abu-hijau ulang
  },
];

// ─────────────────────────────────────────────────────────────
// SUB-KOMPONEN 1: HERO CAROUSEL
// ─────────────────────────────────────────────────────────────
function ExperienceHero({ slides = HERO_SLIDES }: { slides?: ExperienceSlide[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const totalSlides = slides.length;
  const touchStartX = useRef<number | null>(null);
  const isAnimatingRef = useRef(false);
  const animTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [isHovered, setIsHovered] = useState(false);
  const [isTabVisible, setIsTabVisible] = useState(() => {
    if (typeof document !== 'undefined') {
      return document.visibilityState === 'visible';
    }
    return true;
  });

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsTabVisible(document.visibilityState === 'visible');
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (animTimeoutRef.current) clearTimeout(animTimeoutRef.current);
    };
  }, []);

  const triggerAnimationLock = useCallback(() => {
    isAnimatingRef.current = true;
    if (animTimeoutRef.current) clearTimeout(animTimeoutRef.current);
    animTimeoutRef.current = setTimeout(() => {
      isAnimatingRef.current = false;
    }, 700);
  }, []);

  const prevSlide = useCallback(() => {
    if (isAnimatingRef.current) return;
    triggerAnimationLock();
    setActiveIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides, triggerAnimationLock]);

  const nextSlide = useCallback(() => {
    if (isAnimatingRef.current) return;
    triggerAnimationLock();
    setActiveIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides, triggerAnimationLock]);

  const goToSlide = useCallback(
    (index: number) => {
      if (isAnimatingRef.current || index === activeIndex) return;
      triggerAnimationLock();
      setActiveIndex(index);
    },
    [activeIndex, triggerAnimationLock]
  );

  useEffect(() => {
    if (!CAROUSEL_SETTINGS.autoplay || prefersReducedMotion || isHovered || !isTabVisible) {
      return;
    }

    const interval = setInterval(() => {
      if (!isAnimatingRef.current) {
        nextSlide();
      }
    }, CAROUSEL_SETTINGS.autoplayInterval);

    return () => clearInterval(interval);
  }, [nextSlide, prefersReducedMotion, isHovered, isTabVisible]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prevSlide();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      nextSlide();
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
    touchStartX.current = null;
  };

  const getCardStyle = useCallback(
    (offset: number) => {
      const transitionStr = prefersReducedMotion
        ? 'none'
        : 'transform 700ms cubic-bezier(0.22, 1, 0.36, 1), opacity 700ms cubic-bezier(0.22, 1, 0.36, 1)';

      if (offset === 0) {
        return {
          transform: 'translate3d(0, 0, 0) scale(1)',
          opacity: 1,
          zIndex: 20,
          pointerEvents: 'auto' as const,
          cursor: 'default',
          transition: transitionStr,
        };
      }
      if (offset === -1) {
        return {
          transform: 'translate3d(-23.7vw, 2.3vw, 0) scale(calc(18.9 / 25.1), calc(26.3 / 35.3))',
          opacity: 1,
          zIndex: 10,
          pointerEvents: 'auto' as const,
          cursor: 'pointer',
          transition: transitionStr,
        };
      }
      if (offset === 1) {
        return {
          transform: 'translate3d(23.8vw, 2.3vw, 0) scale(calc(18.9 / 25.1), calc(26.3 / 35.3))',
          opacity: 1,
          zIndex: 10,
          pointerEvents: 'auto' as const,
          cursor: 'pointer',
          transition: transitionStr,
        };
      }
      if (offset < -1) {
        return {
          transform: 'translate3d(-38vw, 3.5vw, 0) scale(calc(14 / 25.1), calc(19.5 / 35.3))',
          opacity: 0,
          zIndex: 5,
          pointerEvents: 'none' as const,
          cursor: 'default',
          transition: transitionStr,
        };
      }
      // offset > 1
      return {
        transform: 'translate3d(38vw, 3.5vw, 0) scale(calc(14 / 25.1), calc(19.5 / 35.3))',
        opacity: 0,
        zIndex: 5,
        pointerEvents: 'none' as const,
        cursor: 'default',
        transition: transitionStr,
      };
    },
    [prefersReducedMotion]
  );

  return (
    <section
      aria-label="Experience Hero"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="exp-hero-gradient relative w-full overflow-hidden select-none outline-none"
      style={{
        minHeight: '83.5vw',
      }}
    >
      {/* ── DESKTOP LAYOUT (>= 1024px) ── */}
      <div className="hidden lg:block absolute inset-0 w-full h-full">
        {/* 1. Heading "Real Results & Moments" */}
        <h1
          className="font-podkova font-medium text-white text-center whitespace-nowrap absolute"
          style={{
            top: '8.9vw',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: '5.4vw',
            lineHeight: 1.1,
            width: '70vw',
          }}
        >
          Real Results &amp; Moments
        </h1>

        {/* 2. Subjudul "Witness the Transformation & Our Elegance" */}
        <h2
          className="font-podkova font-medium text-white text-center whitespace-nowrap absolute"
          style={{
            top: '15.6vw',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: '2.4vw',
            lineHeight: 1.2,
            width: '52vw',
          }}
        >
          Witness the Transformation &amp; Our Elegance
        </h2>

        {/* 3. Paragraf Deskripsi */}
        <p
          className="font-raleway text-white text-center absolute"
          style={{
            top: '19vw',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: '1.45vw',
            lineHeight: 1.6,
            width: '51.8vw',
          }}
        >
          See how our world-class treatments bring out the best in our
          <br />
          clients, paired with a glimpse of our luxurious clinic experience.
        </p>

        {/* 4. Carousel 3 Foto (Coverflow dengan smooth transform & loop tak terbatas) */}
        {slides.map((slide, index) => {
          let offset = (index - activeIndex) % totalSlides;
          if (offset > Math.floor(totalSlides / 2)) offset -= totalSlides;
          if (offset < -Math.floor(totalSlides / 2)) offset += totalSlides;

          const cardStyle = getCardStyle(offset);
          const isCenter = offset === 0;
          const isLeft = offset === -1;
          const isRight = offset === 1;

          return (
            <div
              key={slide.id}
              onClick={() => {
                if (isLeft) prevSlide();
                else if (isRight) nextSlide();
              }}
              className="exp-hero-card-shadow absolute rounded-[0.7vw] overflow-hidden border-[2px] border-white"
              style={{
                top: '27.5vw',
                left: '37.4vw',
                width: '25.1vw',
                height: '35.3vw',
                transformOrigin: 'center center',
                willChange: 'transform, opacity',
                ...cardStyle,
              }}
              aria-hidden={!isCenter}
            >
              <div
                className={`w-full h-full relative overflow-hidden ${
                  isCenter ? 'transition-transform duration-300 ease-out hover:scale-[1.02]' : ''
                }`}
              >
                <img
                  src={slide.image}
                  alt={slide.alt}
                  className="w-full h-full object-cover select-none"
                  loading="eager"
                  draggable={false}
                />
                {/* Golden olive overlay: fades out when active, fades in on side cards */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    backgroundColor: 'rgba(138, 110, 10, 0.4)',
                    opacity: isCenter ? 0 : 1,
                    transition: prefersReducedMotion
                      ? 'none'
                      : 'opacity 700ms cubic-bezier(0.22, 1, 0.36, 1)',
                  }}
                />
              </div>
            </div>
          );
        })}

        {/* Panah Kiri */}
        <button
          type="button"
          onClick={prevSlide}
          aria-label="Previous slide"
          className="absolute rounded-full bg-white flex items-center justify-center transition-transform hover:scale-108 active:scale-95 shadow-md cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#FFD400]"
          style={{
            top: '47.5vw',
            left: '9.8vw',
            width: '5.2vw',
            height: '5.2vw',
            transform: 'translateY(-50%)',
            zIndex: 30,
          }}
        >
          <ChevronLeft
            style={{ width: '2.6vw', height: '2.6vw', stroke: '#2c2c2c', strokeWidth: 2.5 }}
          />
        </button>

        {/* Panah Kanan */}
        <button
          type="button"
          onClick={nextSlide}
          aria-label="Next slide"
          className="absolute rounded-full bg-white flex items-center justify-center transition-transform hover:scale-108 active:scale-95 shadow-md cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#FFD400]"
          style={{
            top: '47.5vw',
            left: '84.7vw',
            width: '5.2vw',
            height: '5.2vw',
            transform: 'translateY(-50%)',
            zIndex: 30,
          }}
        >
          <ChevronRight
            style={{ width: '2.6vw', height: '2.6vw', stroke: '#2c2c2c', strokeWidth: 2.5 }}
          />
        </button>

        {/* 5. Pagination Dots */}
        <div
          className="absolute flex items-center justify-center"
          style={{
            top: '69vw',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            gap: '0.8vw',
            zIndex: 30,
          }}
        >
          {slides.map((slide, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={slide.id}
                type="button"
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                className="cursor-pointer transition-all duration-400 outline-none"
                style={{
                  width: isActive ? '4.3vw' : '1.2vw',
                  height: '1.2vw',
                  borderRadius: '9999px',
                  backgroundColor: isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.6)',
                }}
              />
            );
          })}
        </div>

        {/* 6. Dua Tombol Aksi */}
        <Link
          to="/#book"
          className="absolute bg-[#FFD400] text-[#1a1a1a] font-semibold flex items-center justify-center transition-transform hover:scale-102 active:scale-95 shadow-md cursor-pointer"
          style={{
            top: '72.1vw',
            left: '22.4vw',
            width: '25.5vw',
            height: '5.7vw',
            borderRadius: '0.5vw',
            fontSize: '2vw',
            textDecoration: 'none',
            zIndex: 30,
          }}
        >
          <span>Book Now</span>
          <ArrowRight
            className="shrink-0"
            style={{ width: '2.4vw', height: '2.4vw', marginLeft: '0.8vw', strokeWidth: 2.2 }}
          />
        </Link>

        <Link
          to="/service"
          className="absolute bg-white text-[#1a1a1a] font-semibold flex items-center justify-center transition-transform hover:scale-102 active:scale-95 shadow-md cursor-pointer"
          style={{
            top: '72.1vw',
            left: '51.7vw',
            width: '25.5vw',
            height: '5.7vw',
            borderRadius: '0.5vw',
            fontSize: '2vw',
            textDecoration: 'none',
            zIndex: 30,
          }}
        >
          <span>Service</span>
          <ArrowRight
            className="shrink-0"
            style={{ width: '2.4vw', height: '2.4vw', marginLeft: '0.8vw', strokeWidth: 2.2 }}
          />
        </Link>
      </div>

      {/* ── MOBILE & TABLET LAYOUT (< 1024px) ── */}
      <div className="lg:hidden relative z-10 w-full px-5 pt-10 pb-12 flex flex-col items-center text-center">
        <h1 className="font-podkova font-medium text-white text-[clamp(28px,7vw,42px)] leading-tight mb-2">
          Real Results &amp; Moments
        </h1>
        <h2 className="font-podkova font-medium text-white/95 text-[clamp(16px,4vw,22px)] leading-snug mb-3">
          Witness the Transformation &amp; Our Elegance
        </h2>
        <p className="font-raleway text-white/90 text-sm md:text-base max-w-[500px] mb-8 leading-relaxed">
          See how our world-class treatments bring out the best in our clients, paired with a glimpse of our luxurious clinic experience.
        </p>

        {/* Carousel Mobile */}
        <div className="relative w-full max-w-[360px] aspect-[0.71] mx-auto rounded-2xl overflow-hidden shadow-2xl border-2 border-white mb-6">
          {slides.map((slide, index) => {
            const isActive = index === activeIndex;
            return (
              <div
                key={slide.id}
                className="absolute inset-0 transition-opacity duration-700 ease-out"
                style={{
                  opacity: isActive ? 1 : 0,
                  pointerEvents: isActive ? 'auto' : 'none',
                  zIndex: isActive ? 10 : 0,
                  transitionDuration: prefersReducedMotion ? '0ms' : '700ms',
                }}
              >
                <img
                  src={slide.image}
                  alt={slide.alt}
                  className="w-full h-full object-cover select-none"
                  draggable={false}
                />
              </div>
            );
          })}

          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous slide"
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-lg active:scale-95 cursor-pointer z-20 outline-none"
          >
            <ChevronLeft size={20} className="text-[#2c2c2c]" />
          </button>
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next slide"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-lg active:scale-95 cursor-pointer z-20 outline-none"
          >
            <ChevronRight size={20} className="text-[#2c2c2c]" />
          </button>
        </div>

        {/* Dots Mobile */}
        <div className="flex items-center gap-2 mb-8">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2.5 rounded-full transition-all ${
                index === activeIndex ? 'w-8 bg-white' : 'w-2.5 bg-white/60'
              }`}
            />
          ))}
        </div>

        {/* Tombol Mobile */}
        <div className="flex flex-col sm:flex-row gap-3 w-full max-w-[360px]">
          <Link
            to="/#book"
            className="w-full h-12 bg-[#FFD400] text-[#1a1a1a] font-semibold rounded-lg flex items-center justify-center gap-2 shadow-md active:scale-95 text-base"
          >
            <span>Book Now</span>
            <ArrowRight size={18} />
          </Link>
          <Link
            to="/service"
            className="w-full h-12 bg-white text-[#1a1a1a] font-semibold rounded-lg flex items-center justify-center gap-2 shadow-md active:scale-95 text-base"
          >
            <span>Service</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// SUB-KOMPONEN 2: GALLERY SECTION
// ─────────────────────────────────────────────────────────────
function GallerySection({ items = GALLERY_ITEMS }: { items?: GalleryItem[] }) {
  return (
    <div className="w-full relative">
      {/* ── DESKTOP LAYOUT (>= 768px) ── */}
      <div className="hidden md:block w-full">
        {/* Judul & Subjudul: x 10vw, top 6.7vw */}
        <div
          className="absolute"
          style={{
            top: '6.7vw',
            left: '10vw',
          }}
        >
          <h2
            className="font-raleway font-semibold text-[#2c2c2c] tracking-normal"
            style={{ fontSize: '3.3vw', lineHeight: 1.2 }}
          >
            Gallery &amp; Selected Works
          </h2>
          <p
            className="font-podkova text-[#4a4a4a] mt-[0.4vw]"
            style={{ fontSize: '1.9vw', lineHeight: 1.2 }}
          >
            Inspiration &amp; Visual Art
          </p>
        </div>

        {/* Grid Kolase: x 10vw, top 17.3vw, lebar 79.6vw, aspect-ratio 1157/703 */}
        <div
          className="absolute relative"
          style={{
            top: '17.3vw',
            left: '10vw',
            width: '79.6vw',
            aspectRatio: '1157 / 703',
          }}
        >
          {items.map((item) => (
            <div
              key={item.id}
              className="exp-gallery-card-shadow absolute rounded-[0.55vw] overflow-hidden border-[2px] border-white"
              style={{
                left: item.left,
                top: item.top,
                width: item.width,
                height: item.height,
              }}
            >
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                className="w-full h-full object-cover select-none block"
              />
            </div>
          ))}
        </div>
      </div>

      {/* ── MOBILE LAYOUT (< 768px) ── */}
      <div className="md:hidden w-full px-5 pt-12 pb-6">
        <h2 className="font-raleway font-semibold text-2xl text-[#2c2c2c] mb-1">
          Gallery &amp; Selected Works
        </h2>
        <p className="font-podkova text-[#4a4a4a] text-lg mb-6">
          Inspiration &amp; Visual Art
        </p>

        <div className="grid grid-cols-2 gap-3">
          {items.map((item, idx) => (
            <div
              key={item.id}
              className={`rounded-xl overflow-hidden border border-white shadow-sm ${
                idx === 6 ? 'col-span-2 aspect-[16/9]' : 'aspect-[4/5]'
              }`}
            >
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                className="w-full h-full object-cover select-none"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// SUB-KOMPONEN 3: TESTIMONIAL MARQUEE
// ─────────────────────────────────────────────────────────────
function TestimonialMarquee({ items = TESTIMONIAL_ITEMS }: { items?: TestimonialItem[] }) {
  const marqueeCards = [...items, ...items, ...items];

  return (
    <div
      className="w-full overflow-hidden select-none relative"
      aria-label="Customer Testimonials"
    >
      {/* ── DESKTOP MARQUEE (>= 768px) ── */}
      <div className="hidden md:block w-full overflow-hidden">
        <div className="exp-marquee-track py-2">
          {marqueeCards.map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              className="exp-testimonial-card-shadow shrink-0 bg-white rounded-[0.7vw] p-[1.8vw] flex flex-col justify-between"
              style={{
                width: '24.8vw',
                height: '21.5vw',
                marginRight: '2.3vw',
              }}
            >
              <div>
                <div className="flex items-center gap-[0.3vw] mb-[1.2vw]">
                  {[...Array(item.stars)].map((_, i) => (
                    <Star
                      key={i}
                      className="fill-[#F0CC5C] text-[#F0CC5C]"
                      style={{ width: '2.2vw', height: '2.2vw' }}
                    />
                  ))}
                </div>

                <p
                  className="font-sans text-[#4a4a4a] text-left"
                  style={{
                    fontSize: '1.03vw',
                    lineHeight: 1.35,
                  }}
                >
                  {item.text}
                </p>
              </div>

              <div className="flex items-center gap-[1.2vw] pt-[1vw]">
                <div
                  className="rounded-full shrink-0"
                  style={{
                    width: '3.8vw',
                    height: '3.8vw',
                    backgroundColor: item.avatarColor,
                  }}
                  aria-hidden="true"
                />
                <span
                  className="font-playfair font-semibold text-[#1a1a1a]"
                  style={{
                    fontSize: '2.2vw',
                    lineHeight: 1.1,
                  }}
                >
                  {item.author}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── MOBILE MARQUEE (< 768px) ── */}
      <div className="md:hidden w-full overflow-hidden py-4">
        <div className="exp-marquee-track py-2">
          {marqueeCards.map((item, idx) => (
            <div
              key={`mob-${item.id}-${idx}`}
              className="exp-testimonial-card-shadow shrink-0 bg-white rounded-2xl p-6 flex flex-col justify-between"
              style={{
                width: 'clamp(280px, 80vw, 340px)',
                minHeight: '260px',
                marginRight: '16px',
              }}
            >
              <div>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(item.stars)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-[#F0CC5C] text-[#F0CC5C]"
                    />
                  ))}
                </div>
                <p className="font-sans text-sm text-[#4a4a4a] leading-relaxed">
                  {item.text}
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 mt-2">
                <div
                  className="w-12 h-12 rounded-full shrink-0"
                  style={{ backgroundColor: item.avatarColor }}
                  aria-hidden="true"
                />
                <span className="font-playfair font-semibold text-lg text-[#1a1a1a]">
                  {item.author}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// KOMPONEN UTAMA HALAMAN EXPERIENCE (SATU-SATUNYA DEFAULT EXPORT)
// ─────────────────────────────────────────────────────────────
export default function Experience({ onNavigate }: ExperienceProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col font-['Roboto',sans-serif] selection:bg-[#FACC15] selection:text-[#111]">
      <style>{`
        .exp-hero-gradient {
          background: linear-gradient(90deg, #473b07 0%, #ad8f12 50.5%, #e0c13d 93.75%);
        }
        .exp-hero-card-shadow {
          box-shadow: 0 1.4vw 1.6vw rgba(0, 0, 0, 0.35);
        }
        .exp-gallery-card-shadow {
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
        }
        .exp-testimonial-card-shadow {
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.06);
        }
        @keyframes exp-marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .exp-marquee-track {
          display: flex;
          width: max-content;
          animation: exp-marquee 38s linear infinite;
          will-change: transform;
        }
        .exp-marquee-track:hover {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .exp-marquee-track {
            animation: none !important;
          }
        }
      `}</style>

      {/* 1. Header / Navbar Bersama */}
      <Navbar onNavigate={onNavigate} />

      {/* Spacer 96px (h-24) agar Hero dimulai tepat di bawah navbar putih 96px */}
      <div className="h-24 w-full shrink-0" />

      <main className="flex-1 w-full">
        {/* 2. Hero Section dengan Carousel */}
        <ExperienceHero />

        {/* 3. Section Gallery & Selected Works + Testimoni Marquee (Krem #FFF8E2) */}
        <section
          className="relative w-full bg-[#FFF8E2] overflow-hidden"
          style={{ minHeight: '104.3vw' }}
        >
          {/* Desktop Layout (Gallery grid di atas, Testimonial marquee di 73.7vw) */}
          <div className="hidden md:block w-full h-full relative" style={{ minHeight: '104.3vw' }}>
            <GallerySection />
            <div
              className="absolute w-full"
              style={{
                top: '73.7vw',
              }}
            >
              <TestimonialMarquee />
            </div>
          </div>

          {/* Mobile Layout (mengalir vertikal bersih) */}
          <div className="md:hidden w-full flex flex-col">
            <GallerySection />
            <div className="w-full pb-12">
              <TestimonialMarquee />
            </div>
          </div>
        </section>

        {/* 4. CTA Section (Sama persis seperti di About & Home) */}
        <CTASection onNavigate={onNavigate} />
      </main>

      {/* 5. Footer Bersama */}
      <div className="relative z-20 -mt-[16px]">
        <Footer onNavigate={onNavigate} />
      </div>
    </div>
  );
}
