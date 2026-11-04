import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-cream">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/home/Background-Home.jpg" 
          alt="LumiGlow Hero" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative inline-block"
        >
          {/* Script Text "Lashes" overlapping */}
          <motion.span
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="absolute -top-12 -left-8 sm:-top-20 sm:-left-16 font-script text-6xl sm:text-9xl text-gold/90 z-20 pointer-events-none"
          >
            Lashes
          </motion.span>
          
          <h1 className="font-serif text-4xl sm:text-7xl md:text-8xl text-white leading-tight drop-shadow-2xl relative z-10">
            Enhance Your <br />
            <span className="italic">Natural Beauty</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-8 text-white/90 text-lg sm:text-xl max-w-2xl mx-auto font-light tracking-wide"
        >
          Temukan sentuhan mewah dan perawatan profesional untuk kilau alami Anda di LumiGlow Beauty Sanctuary.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mt-12"
        >
          <a 
            href="#services"
            className="inline-block bg-white/10 backdrop-blur-md border border-white/30 text-white px-10 py-4 rounded-full font-semibold hover:bg-gold hover:border-gold transition-all duration-300 shadow-xl"
          >
            Jelajahi Layanan Kami
          </a>
        </motion.div>
      </div>

      {/* Floating Badge "LB" */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 left-10 hidden lg:flex items-center justify-center w-20 h-20 border border-white/20 rounded-full backdrop-blur-sm"
      >
        <span className="text-white font-serif text-2xl font-bold">LB</span>
      </motion.div>
    </section>
  );
}
