import { motion } from 'framer-motion';

const images = [
  { src: '/images/home/Gallery-PG-1.jpg', size: 'col-span-1 row-span-2' },
  { src: '/images/home/Gallery-PG-2.jpg', size: 'col-span-1 row-span-1' },
  { src: '/images/home/Gallery-PG-3.jpg', size: 'col-span-2 row-span-2' },
  { src: '/images/home/Gallery-PG-4.jpg', size: 'col-span-1 row-span-1' },
  { src: '/images/home/Gallery-PG-5.jpg', size: 'col-span-1 row-span-2' },
  { src: '/images/home/Gallery-PG-6.jpg', size: 'col-span-1 row-span-1' },
  { src: '/images/home/Gallery-PG-7.jpg', size: 'col-span-1 row-span-1' },
];

export default function Gallery() {
  return (
    <section id="gallery" className="py-24 bg-olive relative overflow-hidden">
      {/* Decorative Text Background */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-5 flex items-center justify-center">
        <span className="font-serif text-[20vw] text-white whitespace-nowrap">LUMIGLOW MOMENTS</span>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16 space-y-4">
          <span className="text-gold-light font-medium uppercase tracking-[0.3em] text-sm">Galeri Kami</span>
          <h2 className="font-serif text-4xl sm:text-5xl text-white">
            Momen <span className="italic">Kecantikan</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] md:auto-rows-[250px] gap-4">
          {images.map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`${img.size} rounded-3xl overflow-hidden group relative cursor-pointer shadow-xl`}
            >
              <img 
                src={img.src} 
                alt={`Gallery ${idx + 1}`} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gold/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <motion.a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-3 text-white border border-white/30 px-8 py-3 rounded-full hover:bg-white hover:text-olive transition-all"
          >
            Follow us on Instagram
          </motion.a>
        </div>
      </div>
    </section>
  );
}
