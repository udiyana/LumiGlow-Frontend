import { motion } from 'framer-motion';

export default function CTA() {
  return (
    <section className="py-24 bg-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-neutral-900 rounded-[4rem] relative overflow-hidden flex flex-col lg:flex-row items-center">
          
          {/* Text Side */}
          <div className="p-12 md:p-20 lg:w-3/5 z-10">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="font-serif text-4xl md:text-6xl text-white leading-tight">
                Ready for Your <br />
                <span className="text-gold italic">Signature Glow?</span>
              </h2>
              
              <p className="text-white/60 text-lg max-w-lg">
                Jadwalkan konsultasi gratis Anda hari ini dan biarkan tim ahli kami membantu Anda menemukan versi terbaik dari diri Anda.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <button className="bg-gold hover:bg-gold-dark text-white px-10 py-4 rounded-full font-bold transition-all shadow-lg hover:shadow-gold/20">
                  BOOK APPOINTMENT
                </button>
                <button className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-10 py-4 rounded-full font-bold transition-all">
                  VIEW SERVICES
                </button>
              </div>
            </motion.div>
          </div>

          {/* Image Side */}
          <div className="lg:w-2/5 relative h-[400px] lg:h-[600px] w-full">
            <motion.div
              initial={{ opacity: 0, scale: 1.2 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="w-full h-full"
            >
              <img 
                src="/images/home/CTA-Home-PG-1.jpg" 
                alt="Signature Glow" 
                className="w-full h-full object-cover"
              />
            </motion.div>
            
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-neutral-900 via-transparent to-transparent hidden lg:block" />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent lg:hidden" />
          </div>

          {/* Floating Element */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-gold/10 rounded-full blur-3xl" />
        </div>
      </div>
    </section>
  );
}
