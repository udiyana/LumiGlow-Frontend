import { motion } from 'framer-motion';

export default function About() {
  return (
    <section id="about" className="py-24 bg-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Images Side (Asymmetric Arch) */}
          <div className="relative flex gap-6 items-end">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-1/2 aspect-[3/4] rounded-t-full overflow-hidden shadow-2xl"
            >
              <img 
                src="/images/home/About-PG-1.jpg" 
                alt="Tentang LumiGlow" 
                className="w-full h-full object-cover"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-1/2 aspect-[3/5] rounded-t-full overflow-hidden shadow-2xl translate-y-[-20%]"
            >
              <img 
                src="/images/home/About-PG-2.jpg" 
                alt="Layanan Kami" 
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Decorative Element */}
            <div className="absolute -z-10 -bottom-10 -left-10 w-40 h-40 border-2 border-gold/20 rounded-full" />
          </div>

          {/* Text Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <span className="text-gold font-medium uppercase tracking-[0.3em] text-sm">Cerita Kami</span>
              <h2 className="font-serif text-4xl sm:text-5xl text-neutral-800 leading-tight">
                Keindahan yang <br />
                <span className="italic">Lahir dari Hati</span>
              </h2>
            </div>
            
            <p className="text-neutral-600 leading-relaxed text-lg">
              Di LumiGlow, kami percaya bahwa setiap individu memiliki cahaya unik yang menunggu untuk terpancar. Didirikan dengan visi untuk memberikan pengalaman kecantikan yang tidak hanya estetis, tetapi juga menenangkan jiwa.
            </p>

            <p className="text-neutral-600 leading-relaxed text-lg">
              Tim ahli kami menggunakan teknik terkini dan produk berkualitas tinggi untuk memastikan hasil yang tahan lama dan alami. Kami menyambut Anda di ruang yang tenang dan elegan, tempat transformasi Anda dimulai.
            </p>

            <div className="pt-4 flex gap-12">
              <div>
                <h4 className="font-serif text-3xl text-gold font-bold">10+</h4>
                <p className="text-xs uppercase tracking-widest text-neutral-500 mt-1">Tahun Pengalaman</p>
              </div>
              <div>
                <h4 className="font-serif text-3xl text-gold font-bold">5k+</h4>
                <p className="text-xs uppercase tracking-widest text-neutral-500 mt-1">Klien Bahagia</p>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-neutral-800 text-white font-semibold rounded-full hover:bg-gold transition-colors"
            >
              Pelajari Lebih Lanjut
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
