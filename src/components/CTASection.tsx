import { Link } from 'react-router-dom';

interface CTASectionProps {
  onNavigate?: (page: string) => void;
  topBlend?: string;
}

export default function CTASection({ onNavigate, topBlend }: CTASectionProps) {
  const handleClick = (label: string) => {
    if (onNavigate) {
      onNavigate(label);
    }
  };

  return (
    <section id="cta" className="relative w-full bg-white overflow-hidden md:h-[44.48vw]">
      {/* Layer 1 (paling belakang): Gradasi emas terang di kiri ke olive gelap di kanan */}
      <div className="absolute inset-0 [background-image:var(--cta-gradient)]" />

      {/* Layer peralihan halus (topBlend): menyamarkan sambungan dari section sebelumnya bila diperlukan */}
      {topBlend && (
        <div
          className="pointer-events-none absolute inset-x-0 top-0 w-full z-0 h-[10vw]"
          style={{
            background: topBlend,
            maskImage: 'linear-gradient(to bottom, #000 0%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, #000 0%, transparent 100%)',
          }}
        />
      )}

      {/* Layer 2: Foto produk desktop (≥768px), full-bleed, mix-blend normal tanpa filter/shadow */}
      <img
        src="/images/home/CTA-Home-PGG-1.png"
        alt="LumiGlow Signature Beauty & Hair Care Collection"
        className="hidden md:block absolute inset-x-0 bottom-0 w-full h-auto pointer-events-none"
      />

      {/* ── Desktop Elements (≥768px) ── */}
      {/* Heading: absolute top-[3.9vw], Podkova 600, text-[3.6vw], putih, SATU baris */}
      <h2 className="hidden md:block absolute top-[3.9vw] inset-x-0 mx-auto w-fit text-center whitespace-nowrap font-podkova font-semibold text-[3.6vw] leading-[1.2] text-white tracking-normal z-10">
        Ready for Your Signature Glow?
      </h2>

      {/* Paragraf: absolute top-[10.9vw], Podkova 400, text-[1.7vw], putih */}
      <p className="hidden md:block absolute top-[10.9vw] inset-x-0 mx-auto w-[82vw] text-center font-podkova font-normal text-[1.7vw] leading-[2.4vw] text-white z-10">
        <span className="inline-block whitespace-nowrap">Your best hair and skin days are just one click away. Step into Lumiglow Beauty</span>
        <br />
        <span className="inline-block whitespace-nowrap">and let our experts bring out your natural radiance.</span>
      </p>

      {/* Tombol "Book Now" dan "Service": same size as Hero (15vw × 3.4vw) */}
      <div className="hidden md:flex absolute top-[18.85vw] inset-x-0 justify-center gap-[3.4vw] z-10">
        <Link
          to="/#book"
          onClick={() => handleClick("Book Now")}
          className="w-[15vw] h-[3.4vw] bg-[#FFD400] rounded-[0.41vw] text-[#1a1a1a] font-roboto font-medium text-[1.14vw] inline-flex items-center justify-center gap-[0.76vw] transition-all hover:brightness-95 active:scale-95 cursor-pointer shadow-md"
        >
          <span>Book Now</span>
          <span aria-hidden="true" className="text-[1.38vw] font-bold">→</span>
        </Link>
        <Link
          to="/service"
          onClick={() => handleClick("Service")}
          className="w-[15vw] h-[3.4vw] bg-white border border-[#2B2B2B] rounded-[0.41vw] text-[#1a1a1a] font-roboto font-medium text-[1.14vw] inline-flex items-center justify-center gap-[0.76vw] transition-all hover:bg-stone-50 active:scale-95 cursor-pointer shadow-md"
        >
          <span>Service</span>
          <span aria-hidden="true" className="text-[1.38vw] font-bold">→</span>
        </Link>
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
          <Link
            to="/#book"
            onClick={() => handleClick("Book Now")}
            className="px-8 py-3 text-[18px] bg-[#FFD400] text-[#1a1a1a] font-roboto font-medium rounded-md shadow-md hover:brightness-95 active:scale-95"
          >
            Book Now
          </Link>
          <Link
            to="/service"
            onClick={() => handleClick("Service")}
            className="px-8 py-3 text-[18px] bg-white border border-[#2B2B2B] text-[#1a1a1a] font-roboto font-medium rounded-md shadow-md hover:bg-stone-50 active:scale-95"
          >
            Service
          </Link>
        </div>
        <div className="relative w-full mt-8 pointer-events-none">
          <img
            src="/images/home/CTA-Home-PGG-1.png"
            alt="LumiGlow Signature Beauty & Hair Care Collection"
            className="w-full h-auto block"
          />
        </div>
      </div>
    </section>
  );
}
