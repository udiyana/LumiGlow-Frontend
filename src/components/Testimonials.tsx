import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Wijaya',
    role: 'Loyal Customer',
    content: 'Pengalaman terbaik yang pernah saya rasakan. Tim sangat profesional dan hasilnya benar-benar natural. Saya sangat merekomendasikan LumiGlow!',
    rating: 5,
    color: 'bg-rose-100',
  },
  {
    name: 'Amanda Putri',
    role: 'Fashion Blogger',
    content: 'Sangat menyukai suasana salonnya yang tenang. Perawatan rambutnya luar biasa, rambut saya terasa jauh lebih sehat dan berkilau.',
    rating: 5,
    color: 'bg-blue-100',
  },
  {
    name: 'Jessica Chen',
    role: 'Entrepreneur',
    content: 'Manicure dan pedicure di sini adalah yang terbaik di Bali. Pelayanannya sangat detail dan produk yang digunakan premium.',
    rating: 4,
    color: 'bg-amber-100',
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20 space-y-4">
          <span className="text-gold font-medium uppercase tracking-[0.3em] text-sm">Testimoni</span>
          <h2 className="font-serif text-4xl sm:text-5xl text-neutral-800">
            Apa Kata <span className="italic">Mereka?</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="bg-white p-10 rounded-[3rem] shadow-sm relative group hover:shadow-xl transition-shadow duration-500"
            >
              <div className="absolute -top-6 left-10 w-12 h-12 bg-gold rounded-full flex items-center justify-center text-white shadow-lg">
                <Quote size={20} fill="currentColor" />
              </div>

              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={16} 
                    className={i < t.rating ? 'text-gold fill-gold' : 'text-neutral-200'} 
                  />
                ))}
              </div>

              <p className="text-neutral-600 italic leading-relaxed mb-8">
                "{t.content}"
              </p>

              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-full ${t.color} flex items-center justify-center font-serif text-xl font-bold text-neutral-700`}>
                  {t.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-neutral-800">{t.name}</h4>
                  <p className="text-sm text-neutral-400 uppercase tracking-widest">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
