import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FooterProps {
  onNavigate?: (page: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const [newsletterEmail, setNewsletterEmail] = useState("");

  const NAV_LINKS = [
    { label: "Home", href: "/" },
    { label: "Service", href: "/service" },
    { label: "Experience", href: "/experience" },
    { label: "About", href: "/about" },
    { label: "Special Promo", href: "/special-promo" },
    { label: "Blog", href: "/blog" },
  ];

  const handleLinkClick = (label: string) => {
    if (onNavigate) {
      onNavigate(label);
    }
  };

  return (
    <footer id="book" className="w-full">
      {/* Bagian Olive */}
      <div className="w-full bg-[#A68B0C] text-white pt-[42px] pb-[38px] lg:min-h-[412px] box-border">
        <div className="w-full max-w-[1453px] mx-auto px-5 lg:px-[3.7vw]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1.6fr_1.4fr] gap-8 lg:gap-6 items-start">
            {/* Kolom 1: Logo LB Putih + LUMIGLOW + Social + 3 Ikon Emas Solid Glyph Olive */}
            <div className="flex flex-col items-start pt-[8px] h-full justify-between">
              <div>
                <img
                  src="/images/home/Logo-Lumiglow.png"
                  alt="LumiGlow Logo"
                  className="h-[95px] w-auto object-contain block brightness-0 invert"
                />
                <span className="font-playfair font-normal text-[34px] leading-tight text-white tracking-normal block max-w-[178px] mt-1">
                  LUMIGLOW
                </span>
              </div>

              {/* Blok Social & 3 Ikon Emas Solid: Posisi di 67-83% tinggi area */}
              <div className="mt-[36px] lg:mt-[48px]">
                <span className="font-raleway font-semibold text-[20px] text-white block mb-[10px]">
                  Social
                </span>

                <div className="flex items-center gap-[10px]">
                  {/* Facebook: rounded-full */}
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Facebook"
                    className="w-[42px] h-[42px] lg:w-[2.7vw] lg:h-[2.7vw] rounded-full bg-[#F2C419] flex items-center justify-center transition-transform hover:scale-105 cursor-pointer shadow-sm"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#A68B0C">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                  </a>
                  {/* Instagram: rounded-[12px] */}
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Instagram"
                    className="w-[42px] h-[42px] lg:w-[2.7vw] lg:h-[2.7vw] rounded-[10px] bg-[#F2C419] flex items-center justify-center transition-transform hover:scale-105 cursor-pointer shadow-sm"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#A68B0C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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
                    className="w-[42px] h-[42px] lg:w-[2.7vw] lg:h-[2.7vw] rounded-[10px] bg-[#F2C419] flex items-center justify-center transition-transform hover:scale-105 cursor-pointer shadow-sm"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#A68B0C">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V9.41a8.16 8.16 0 0 0 4.77 1.52V7.5a4.85 4.85 0 0 1-1-.81z" />
                    </svg>
                  </a>
                </div>
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
                  <Link
                    key={link.label}
                    to={link.href}
                    onClick={() => handleLinkClick(link.label)}
                    className="font-raleway font-normal text-[20px] text-white leading-[35px] hover:text-stone-200 transition-colors block"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Kolom 3: Visit Us + Peta (Lebar ~28.6vw, Rasio 1.53:1) */}
            <div className="flex flex-col items-start">
              <div className="h-[62px] flex items-center">
                <h4 className="font-raleway font-semibold text-[20px] text-white">
                  Visit Us
                </h4>
              </div>
              <a
                href="https://maps.google.com/?q=Jl.+Danau+Tamblingan+No.27,+Sanur,+Denpasar+Selatan,+Kota+Denpasar,+Bali+80228"
                target="_blank"
                rel="noopener noreferrer"
                title="Buka Lokasi LumiGlow di Google Maps"
                className="w-full lg:w-[28.6vw] h-[18.7vw] min-h-[220px] rounded-[12px] overflow-hidden relative shadow-sm bg-stone-100 block cursor-pointer group"
              >
                <iframe
                  src="https://maps.google.com/maps?q=Jl.+Danau+Tamblingan+No.27,+Sanur,+Denpasar+Selatan,+Bali&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0 pointer-events-none"
                  loading="lazy"
                  title="LumiGlow Sanur Map Location"
                />
              </a>
            </div>

            {/* Kolom 4: Jam Buka, Alamat & Input Email Pill Putih (Mulai ~72vw, Akhir ~96.4vw) */}
            <div className="flex flex-col items-start">
              {/* Spacer 62px agar teks jam sejajar dengan atas peta di Kolom 3 */}
              <div className="h-[62px] hidden lg:block" />
              <div className="flex flex-col justify-between w-full h-full min-h-[220px]">
                <div>
                  <span className="block font-raleway font-normal text-[20px] lg:text-[22px] leading-[31px] text-white">
                    Every Day :
                  </span>
                  <span className="block font-raleway font-normal text-[20px] lg:text-[22px] leading-[31px] text-white">
                    10. 00 - 22.00
                  </span>
                  <p className="mt-[7px] font-raleway font-light text-[15px] lg:text-[16px] leading-[28px] lg:leading-[31px] text-white max-w-[360px]">
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
                  className="w-full max-w-[362px] h-[3.3vw] min-h-[46px] bg-white rounded-full flex items-center pr-[4px] pl-[20px] shadow-sm relative mt-6"
                >
                  <input
                    type="email"
                    required
                    placeholder="Enter email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="w-full bg-transparent font-raleway text-[0.82vw] min-text-[12px] text-[#555] placeholder-[#555] focus:outline-none"
                  />
                  {/* Tombol Kirim: Lingkaran TERISI Emas Solid, Panah PUTIH */}
                  <button
                    type="submit"
                    aria-label="Submit email"
                    className="w-[38px] lg:w-[2.6vw] h-[38px] lg:h-[2.6vw] rounded-full bg-[#A68B0C] text-white flex items-center justify-center shrink-0 hover:brightness-110 active:scale-95 transition-all cursor-pointer shadow-xs"
                  >
                    <ArrowRight size={18} strokeWidth={2.5} className="text-white" />
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
  );
}
