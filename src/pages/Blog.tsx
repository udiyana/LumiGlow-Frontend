import { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, ArrowDown } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Img } from '../hooks/useImg';

// ===== TYPES & INTERFACES =====
interface BlogProps {
  onNavigate?: (page: string) => void;
}

interface BlogArticle {
  id: number;
  category: string;
  title: string;
  desc: string;
  image: string;
}

// ===== DATA 12 ARTIKEL BLOG =====
const BLOG_ARTICLES: BlogArticle[] = [
  // BARIS 1 (Home-PG-2)
  {
    id: 1,
    category: 'Hair Treatment',
    title: 'Solution for a Dandruff-Prone Scalp',
    desc: 'How do you create compelling presentations that wow your colleagues and impress your managers?',
    image: '/images/blog/BG-1.png',
  },
  {
    id: 2,
    category: 'Pedicure',
    title: 'Nail trends, care tips, and inspiration for your next manicure.',
    desc: 'How do you create compelling presentations that wow your colleagues and impress your managers?',
    image: '/images/blog/BG-2.png',
  },
  {
    id: 3,
    category: 'Hair Treatment',
    title: 'Solution for a Dandruff-Prone Scalp',
    desc: 'How do you create compelling presentations that wow your colleagues and impress your managers?',
    image: '/images/blog/BG-3.png',
  },
  // BARIS 2 (Home-PG-3)
  {
    id: 4,
    category: 'Hair Treatment',
    title: 'Solution for a Dandruff-Prone Scalp',
    desc: 'How do you create compelling presentations that wow your colleagues and impress your managers?',
    image: '/images/blog/Bg-4.png',
  },
  {
    id: 5,
    category: 'Manicure',
    title: 'Solution for a Dandruff-Prone Scalp',
    desc: 'How do you create compelling presentations that wow your colleagues and impress your managers?',
    image: '/images/blog/BG-5.png',
  },
  {
    id: 6,
    category: 'Hair Treatment',
    title: 'Solution for a Dandruff-Prone Scalp',
    desc: 'How do you create compelling presentations that wow your colleagues and impress your managers?',
    image: '/images/blog/BG-6.png',
  },
  // BARIS 3 (Home-PG-4)
  {
    id: 7,
    category: 'Hair Cut',
    title: 'Solution for a Dandruff-Prone Scalp',
    desc: 'How do you create compelling presentations that wow your colleagues and impress your managers?',
    image: '/images/blog/BG-7.png',
  },
  {
    id: 8,
    category: 'Manicure',
    title: 'Solution for a Dandruff-Prone Scalp',
    desc: 'How do you create compelling presentations that wow your colleagues and impress your managers?',
    image: '/images/blog/BG-8.png',
  },
  {
    id: 9,
    category: 'Nail Polish',
    title: 'Solution for a Dandruff-Prone Scalp',
    desc: 'How do you create compelling presentations that wow your colleagues and impress your managers?',
    image: '/images/blog/BG-9.png',
  },
  // BARIS 4 (Home-PG-5)
  {
    id: 10,
    category: 'Hair Coloring',
    title: 'Solution for a Dandruff-Prone Scalp',
    desc: 'How do you create compelling presentations that wow your colleagues and impress your managers?',
    image: '/images/blog/BG-10.png',
  },
  {
    id: 11,
    category: 'Hair Treatment',
    title: 'Solution for a Dandruff-Prone Scalp',
    desc: 'How do you create compelling presentations that wow your colleagues and impress your managers?',
    image: '/images/blog/BG-11.png',
  },
  {
    id: 12,
    category: 'Hair Treatment',
    title: 'Solution for a Dandruff-Prone Scalp',
    desc: 'How do you create compelling presentations that wow your colleagues and impress your managers?',
    image: '/images/blog/BG-12.png',
  },
];

// ===== MAIN PAGE COMPONENT =====
export default function Blog({ onNavigate }: BlogProps) {
  const [visibleCount, setVisibleCount] = useState<number>(12);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 3, 24));
  };

  // Generate displayed articles based on visibleCount (cycling through BLOG_ARTICLES)
  const displayedArticles = Array.from({ length: visibleCount }).map((_, index) => {
    const original = BLOG_ARTICLES[index % BLOG_ARTICLES.length];
    return {
      ...original,
      uniqueKey: `${original.id}-${index}`,
    };
  });

  return (
    <div className="min-h-screen bg-white flex flex-col font-['Roboto',sans-serif] selection:bg-[#FACC15] selection:text-[#111]">
      {/* ===== HEADER / NAVBAR ===== */}
      <Navbar onNavigate={onNavigate} />

      {/* Spacer 96px (h-24) agar konten dimulai tepat di bawah navbar fixed */}
      <div className="h-24 w-full shrink-0" />

      {/* ===== MAIN CONTENT ===== */}
      <main className="flex-1 w-full">
        {/* ===== HERO SECTION ===== */}
        <section
          className="relative w-full overflow-hidden flex flex-col items-center select-none"
          style={{
            height: '40vw',
            isolation: 'isolate',
          }}
        >
          <img
            src="/images/blog/Background-Blog.png"
            alt="LumiGlow Salon Interior"
            className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
          />
          {/* Overlay gradient hangat bernuansa emas-olive sesuai desain */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(180deg, rgba(202, 167, 29, 0.29), rgba(0, 0, 0, 0))',
            }}
          />

          {/* Teks Hero Terkalibrasi (Sumbu dihitung dari atas hero) */}
          {/* 1. LEARN & GLOW: Sumbu tengah vertikal di 11.2% W, lebar ter-render ±17.9% W */}
          <span
            className="absolute font-podkova font-bold uppercase text-white pointer-events-none whitespace-nowrap"
            style={{
              top: '11.2vw',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              letterSpacing: '0.04em',
              fontSize: '2.34vw',
              lineHeight: 1,
            }}
          >
            LEARN &amp; GLOW
          </span>

          {/* 2. The LumiGlow Journal: Sumbu tengah vertikal di 15.4% W, lebar ter-render ±70% W */}
          <h1
            className="absolute font-podkova font-bold text-white pointer-events-none whitespace-nowrap"
            style={{
              top: '15.4vw',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: '6.58vw',
              lineHeight: 1,
            }}
          >
            The LumiGlow Journal
          </h1>

          {/* 3. Deskripsi: Baris 1 sumbu 21.1% W (lebar ±66.5% W), Baris 2 sumbu 23.4% W, line-height 2.3% W */}
          <div
            className="absolute font-podkova font-semibold text-white pointer-events-none text-center"
            style={{
              top: '19.95vw', // 21.1vw - 2.3vw / 2 = 19.95vw
              left: '50%',
              transform: 'translateX(-50%)',
              fontSize: '1.734vw',
              lineHeight: '2.3vw',
              width: '100%',
              whiteSpace: 'nowrap',
            }}
          >
            <p className="block m-0">
              <span id="hero-desc-line1" className="inline-block">
                Discover beauty tips, expert insights, and self-care inspiration to keep you glowing,
              </span>
            </p>
            <p className="block m-0">
              <span id="hero-desc-line2" className="inline-block">
                from everyday beauty rituals to our favorite salon treatments in Sanur, Bali.
              </span>
            </p>
          </div>
        </section>

        {/* ===== ARTICLES GRID SECTION ===== */}
        <section
          className="relative w-full overflow-hidden"
          style={{
            backgroundColor: '#FFF8E2',
            containerType: 'inline-size',
            paddingTop: '6cqw',
            paddingBottom: '7cqw',
          }}
        >
          {/* 3-Column Desktop Grid (Responsive to 2-col tablet, 1-col mobile) */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mx-auto px-4 sm:px-6 lg:px-0"
            style={{
              width: 'min(100% - 2rem, 86.9cqw)',
              columnGap: '2.3cqw',
              rowGap: '2.7cqw',
            }}
          >
            {displayedArticles.map((article, index) => (
              <div
                key={article.uniqueKey}
                className="w-full flex justify-center max-w-[420px] sm:max-w-none mx-auto"
                style={{
                  containerType: 'inline-size',
                  width: '100%',
                }}
              >
                <motion.article
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                  whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.45,
                    ease: 'easeOut',
                    delay: shouldReduceMotion ? 0 : (index % 3) * 0.08,
                  }}
                  whileHover={shouldReduceMotion ? undefined : { y: -4 }}
                  className="w-full bg-white relative cursor-pointer transition-shadow duration-300"
                  style={{
                    aspectRatio: '264 / 398',
                    borderRadius: '2.3cqw',
                    boxShadow: '0 0.8cqw 3cqw rgba(0, 0, 0, 0.12)',
                    containerType: 'inline-size',
                    position: 'relative',
                    overflow: 'hidden',
                    backgroundColor: '#ffffff',
                  }}
                >
                  {/* Foto: kiri 6.1cqw, atas 6.1cqw, tinggi 62.5cqw, lebar auto mengikuti rasio foto (maks 87.9cqw), rata kiri, object-fit cover, sudut tajam tanpa radius */}
                  <Img
                    src={article.image}
                    alt={article.title}
                    className="block select-none pointer-events-none"
                    style={{
                      position: 'absolute',
                      left: '6.1cqw',
                      top: '6.1cqw',
                      height: '62.5cqw',
                      maxWidth: '87.9cqw',
                      width: 'auto',
                      objectFit: 'cover',
                      borderRadius: 0,
                    }}
                  />

                  {/* Kategori: kiri 6.1cqw, sumbu tengah vertikal di 79.5cqw dari atas kartu, font-family Inter, weight 600, font-size 4.2cqw, warna #6941c6 */}
                  <span
                    className="font-['Inter',sans-serif] font-semibold text-[#6941c6] block select-none whitespace-nowrap"
                    style={{
                      position: 'absolute',
                      left: '6.1cqw',
                      top: '79.5cqw',
                      transform: 'translateY(-50%)',
                      fontSize: '4.2cqw',
                      lineHeight: 1,
                    }}
                  >
                    {article.category}
                  </span>

                  {/* Judul: kiri 6.1cqw, lebar maks ±73cqw, font-family Inter, weight 500, font-size 5.9cqw, line-height 8.7cqw, warna #101828. Sumbu baris 1 di 89.4cqw, baris 2 di 98.1cqw (pecah baris setelah 'Dandruff-') */}
                  <h3
                    className="font-['Inter',sans-serif] font-medium text-[#101828] select-none m-0 p-0"
                    style={{
                      position: 'absolute',
                      left: '6.1cqw',
                      top: '85.05cqw', // 89.4cqw - 8.7cqw / 2
                      maxWidth: '73cqw',
                      fontSize: '5.9cqw',
                      lineHeight: '8.7cqw',
                    }}
                  >
                    {article.id === 2 ? (
                      article.title
                    ) : (
                      <>
                        <span>Solution for a Dandruff-</span>
                        <br />
                        <span>Prone Scalp</span>
                      </>
                    )}
                  </h3>

                  {/* Ikon ArrowUpRight di kanan: ukuran 4.5cqw, warna #101828, sumbu tengahnya 9.5cqw dari tepi kanan kartu, sejajar vertikal dengan baris 1 judul (sumbu 89.4cqw) */}
                  <ArrowUpRight
                    className="text-[#101828] pointer-events-none select-none"
                    style={{
                      position: 'absolute',
                      right: '7.25cqw', // 100 - 9.5 - 2.25 = 88.25 -> right 7.25cqw
                      top: '87.15cqw', // 89.4 - 4.5/2 = 87.15cqw
                      width: '4.5cqw',
                      height: '4.5cqw',
                    }}
                    strokeWidth={2}
                  />

                  {/* Deskripsi: kiri 6.1cqw, lebar 87.9cqw, font-family Inter, weight 400, font-size 4.7cqw, line-height 6.6cqw, warna #667085, sumbu baris 1 di 108cqw, tinggi kotak ±14cqw dengan overflow hidden */}
                  <div
                    className="overflow-hidden select-none"
                    style={{
                      position: 'absolute',
                      left: '6.1cqw',
                      top: article.id === 2 ? '114.5cqw' : '104.7cqw', // Pada kartu 2 judul 3 baris sehingga deskripsi turun dan terpotong natural di bawah
                      width: '87.9cqw',
                      height: article.id === 2 ? '15.5cqw' : '14cqw',
                    }}
                  >
                    <p
                      className="font-['Inter',sans-serif] font-normal text-[#667085] m-0 p-0"
                      style={{
                        fontSize: '4.7cqw',
                        lineHeight: '6.6cqw',
                      }}
                    >
                      {article.desc}
                    </p>
                  </div>

                  {/* Tombol See More: kiri 6.1cqw (lurus dengan tepi kiri foto), atas 131.8cqw dari atas kartu, lebar 46cqw, tinggi 10.6cqw, border-radius 1.5cqw, background #ffd400, teks #2c2c2c, font-family Raleway, weight 500, font-size 4.5cqw, teks di tengah */}
                  <button
                    type="button"
                    className="font-raleway font-medium text-[#2c2c2c] flex items-center justify-center transition-transform hover:scale-[1.03] active:scale-[0.97] cursor-pointer shadow-xs select-none border-none p-0"
                    style={{
                      position: 'absolute',
                      left: '6.1cqw',
                      top: '131.8cqw',
                      width: '46cqw',
                      height: '10.6cqw',
                      borderRadius: '1.5cqw',
                      backgroundColor: '#ffd400',
                      fontSize: '4.5cqw',
                    }}
                  >
                    See More
                  </button>
                </motion.article>
              </div>
            ))}
          </div>

          {/* ===== LOAD MORE BUTTON ===== */}
          {visibleCount < 24 && (
            <div
              className="flex justify-center items-center w-full"
              style={{
                marginTop: '6.3cqw',
              }}
            >
              <motion.button
                type="button"
                onClick={handleLoadMore}
                whileHover={shouldReduceMotion ? undefined : { scale: 1.03 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
                className="font-raleway font-medium text-[#2c2c2c] flex items-center justify-center cursor-pointer select-none transition-colors shadow-sm"
                style={{
                  width: 'clamp(140px, 10.7cqw, 180px)',
                  height: 'clamp(42px, 3.3cqw, 54px)',
                  borderRadius: '0.5cqw',
                  backgroundColor: '#ffd400',
                  fontSize: 'clamp(14px, 1.4cqw, 18px)',
                  gap: '0.6cqw',
                  border: 'none',
                }}
              >
                <ArrowDown
                  style={{
                    width: 'clamp(16px, 1.3cqw, 20px)',
                    height: 'clamp(16px, 1.3cqw, 20px)',
                  }}
                  strokeWidth={2}
                />
                <span>Load more</span>
              </motion.button>
            </div>
          )}
        </section>
      </main>

      {/* ===== FOOTER ===== */}
      <div className="relative z-20">
        <Footer onNavigate={onNavigate} />
      </div>
    </div>
  );
}
