import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const categories = ['All', 'Hair', 'Manicure', 'Pedicure', 'Lashes'];

const services = [
  { id: 1, name: 'Lash Extension', category: 'Lashes', price: 'Rp 350k', image: '/images/home/Service-PG-1.jpg' },
  { id: 2, name: 'Bridal Styling', category: 'Hair', price: 'Rp 850k', image: '/images/home/Home-PG-1.jpg' },
  { id: 3, name: 'Luxury Manicure', category: 'Manicure', price: 'Rp 200k', image: '/images/home/Home-PG-2.jpg' },
  { id: 4, name: 'Floral Pedicure', category: 'Pedicure', price: 'Rp 250k', image: '/images/home/Home-PG-3.jpg' },
  { id: 5, name: 'Hair Coloring', category: 'Hair', price: 'Rp 600k', image: '/images/home/About-PG-1.jpg' },
];

export default function Services() {
  const [activeCategory, setActiveCategory] = useState('All');
  
  const filteredServices = activeCategory === 'All' 
    ? services 
    : services.filter(s => s.category === activeCategory);

  return (
    <section id="services" className="py-24 bg-cream-light">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="space-y-4">
            <span className="text-gold font-medium uppercase tracking-[0.3em] text-sm">Layanan Unggulan</span>
            <h2 className="font-serif text-4xl sm:text-5xl text-neutral-800">
              Pilih Perawatan <br />
              <span className="italic">Terbaik Anda</span>
            </h2>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat 
                    ? 'bg-gold text-white shadow-lg' 
                    : 'bg-white text-neutral-600 hover:bg-neutral-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Slider / Grid */}
        <div className="relative">
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredServices.map((service) => (
                <motion.div
                  key={service.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500"
                >
                  <div className="aspect-[4/5] overflow-hidden">
                    <img 
                      src={service.image} 
                      alt={service.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                    <span className="text-gold-light text-sm font-medium uppercase tracking-widest mb-2">{service.category}</span>
                    <h3 className="text-white font-serif text-2xl mb-1">{service.name}</h3>
                    <p className="text-white/80 font-medium mb-6">{service.price}</p>
                    <button className="w-full py-3 bg-white text-neutral-900 font-bold rounded-xl hover:bg-gold hover:text-white transition-colors">
                      Pesan Sekarang
                    </button>
                  </div>

                  {/* Mobile Label (Visible without hover) */}
                  <div className="p-6 md:group-hover:hidden">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-xs text-neutral-400 uppercase tracking-widest">{service.category}</p>
                        <h3 className="text-neutral-800 font-serif text-xl">{service.name}</h3>
                      </div>
                      <span className="text-gold font-bold">{service.price}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Navigation Buttons (Desktop) */}
          <div className="hidden lg:flex absolute -left-6 top-1/2 -translate-y-1/2">
            <button className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-neutral-400 hover:text-gold transition-colors">
              <ChevronLeft />
            </button>
          </div>
          <div className="hidden lg:flex absolute -right-6 top-1/2 -translate-y-1/2">
            <button className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-neutral-400 hover:text-gold transition-colors">
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
