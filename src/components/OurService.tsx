import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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

interface OurServiceProps {
  showHeading?: boolean;
  bgClass?: string;
  sectionPadding?: string;
  dotsMarginBottom?: string;
  onNavigate?: (page: string) => void;
  style?: React.CSSProperties;
}

export default function OurService({
  showHeading = true,
  bgClass = "bg-[#FBF5DC]",
  sectionPadding = "pt-[70px] pb-[46px]",
  dotsMarginBottom = "",
  onNavigate,
  style,
}: OurServiceProps) {
  const [activeTab, setActiveTab] = useState<"all" | "hair" | "manicure" | "pedicure">("all");
  const [activeDot, setActiveDot] = useState(0);

  const serviceScrollRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

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
    <section
      id="service"
      className={`w-full flex flex-col items-center ${sectionPadding} ${bgClass}`}
      style={style}
    >
      {/* Judul Besar CENTERED: Raleway 300, 64px, line-height 61.6px, hitam, rata tengah */}
      {showHeading && (
        <h2 className="font-raleway font-[300] text-[40px] sm:text-[64px] leading-[61.6px] text-black text-center tracking-normal mb-[22px]">
          Our Service
        </h2>
      )}

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
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  </div>

                  {/* Area teks kartu */}
                  <div className="flex flex-col flex-1 pl-[3.7%] pr-[5.7%] pb-[5.1%]">
                    {/* Judul: Podkova 500 27px #515050 */}
                    <h3 className="font-podkova font-[500] text-[27px] leading-tight text-[#515050] mt-[5.1%] mb-[4.8%]">
                      {service.title}
                    </h3>

                    {/* Deskripsi: Podkova 500 16px, line-height 18px, #505050 */}
                    <p className="font-podkova font-[500] text-[16px] leading-[18px] text-[#505050] flex-1">
                      {service.description}
                    </p>

                    {/* Tombol "View Detail" */}
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
        <div className={`flex justify-center items-center gap-[10px] mt-[48px] ${dotsMarginBottom}`}>
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
                const shift = serviceScrollRef.current.clientWidth + 21;
                serviceScrollRef.current.scrollTo({ left: shift, behavior: "smooth" });
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
  );
}

