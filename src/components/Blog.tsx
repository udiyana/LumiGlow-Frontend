import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const posts = [
  {
    title: '5 Tips Merawat Lash Extension Agar Awet',
    excerpt: 'Temukan cara mudah merawat bulu mata sambungan Anda agar tetap cantik dan tahan lama.',
    date: 'Oct 24, 2026',
    image: '/images/home/Home-PG-1.jpg',
  },
  {
    title: 'Tren Warna Rambut 2027 yang Wajib Dicoba',
    excerpt: 'Dari balayage hingga warna pastel, intip tren warna rambut paling hits tahun depan.',
    date: 'Oct 15, 2026',
    image: '/images/home/Home-PG-2.jpg',
  },
  {
    title: 'Pentingnya Manicure untuk Kesehatan Kuku',
    excerpt: 'Manicure bukan hanya soal kecantikan, tapi juga tentang menjaga kesehatan kuku Anda.',
    date: 'Oct 08, 2026',
    image: '/images/home/Home-PG-3.jpg',
  },
];

export default function Blog() {
  return (
    <section id="blog" className="py-24 bg-cream-light">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-end mb-16">
          <div className="space-y-4">
            <span className="text-gold font-medium uppercase tracking-[0.3em] text-sm">Blog & Tips</span>
            <h2 className="font-serif text-4xl sm:text-5xl text-neutral-800">
              Wawasan <span className="italic">Kecantikan</span>
            </h2>
          </div>
          <button className="hidden sm:flex items-center gap-2 text-gold font-bold hover:underline">
            LIHAT SEMUA ARTIKEL <ArrowRight size={20} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {posts.map((post, idx) => (
            <motion.article
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="aspect-[16/10] rounded-3xl overflow-hidden mb-6 shadow-md group-hover:shadow-xl transition-all">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              
              <div className="space-y-4">
                <span className="text-xs text-neutral-400 uppercase tracking-[0.2em] font-medium">{post.date}</span>
                <h3 className="font-serif text-2xl text-neutral-800 group-hover:text-gold transition-colors leading-tight">
                  {post.title}
                </h3>
                <p className="text-neutral-500 line-clamp-2 leading-relaxed">
                  {post.excerpt}
                </p>
                
                <div className="pt-2">
                  <button className="w-10 h-10 bg-gold text-white rounded-full flex items-center justify-center group-hover:w-32 group-hover:justify-between group-hover:px-4 transition-all duration-300">
                    <span className="hidden group-hover:block text-sm font-bold whitespace-nowrap">BACA LAGI</span>
                    <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
