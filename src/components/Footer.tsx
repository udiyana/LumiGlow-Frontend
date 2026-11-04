import { Globe, MapPin, Phone, Mail, Send } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-white pt-24 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          
          {/* Brand Info */}
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center font-serif text-2xl font-bold">
                LB
              </div>
              <span className="font-serif text-2xl font-bold tracking-wide">LumiGlow</span>
            </div>
            <p className="text-white/50 leading-relaxed">
              Memberikan pengalaman kecantikan premium dan perawatan yang disesuaikan untuk setiap individu di jantung kota Bali.
            </p>
            <div className="flex gap-4">
              {[Globe].map((Icon, idx) => (
                <a 
                  key={idx} 
                  href="#" 
                  className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center hover:bg-gold hover:border-gold transition-all"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-8">
            <h4 className="font-serif text-xl font-bold">Tautan Cepat</h4>
            <ul className="space-y-4">
              {['Home', 'Tentang Kami', 'Layanan', 'Galeri', 'Blog'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-white/50 hover:text-gold transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <h4 className="font-serif text-xl font-bold">Hubungi Kami</h4>
            <ul className="space-y-6">
              <li className="flex gap-4 items-start text-white/50">
                <MapPin className="text-gold shrink-0" size={20} />
                <span>Jl. Danau Tamblingan No. 123, Sanur, Bali, Indonesia</span>
              </li>
              <li className="flex gap-4 items-center text-white/50">
                <Phone className="text-gold shrink-0" size={20} />
                <span>+62 812 3456 7890</span>
              </li>
              <li className="flex gap-4 items-center text-white/50">
                <Mail className="text-gold shrink-0" size={20} />
                <span>hello@lumiglow.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-8">
            <h4 className="font-serif text-xl font-bold">Newsletter</h4>
            <p className="text-white/50">Dapatkan tips kecantikan dan penawaran eksklusif langsung di email Anda.</p>
            <form className="relative">
              <input 
                type="email" 
                placeholder="Email Anda" 
                className="w-full bg-white/5 border border-white/10 rounded-full py-4 px-6 focus:outline-none focus:border-gold transition-colors"
              />
              <button className="absolute right-2 top-2 w-10 h-10 bg-gold rounded-full flex items-center justify-center hover:bg-gold-dark transition-colors">
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="w-full h-64 bg-white/5 rounded-[2rem] overflow-hidden mb-12 relative group">
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-all cursor-pointer">
            <span className="bg-white text-neutral-900 px-6 py-2 rounded-full font-bold shadow-xl">LIHAT PETA</span>
          </div>
          <img 
            src="https://api.placeholder.com/1200/400?text=Google+Maps+Placeholder" 
            alt="Map" 
            className="w-full h-full object-cover grayscale opacity-50"
          />
        </div>

        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-white/30 text-sm">
          <p>© 2026 LumiGlow Beauty Sanctuary. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
