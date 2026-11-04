# LumiGlow – Images Folder

Place your local images here. The folder is organized as follows:

```
src/images/
├── hero/
│   └── hero-bg.jpg          ← Hero section background
├── about/
│   ├── salon-interior.jpg   ← About section image 1
│   └── stylist.jpg          ← About section image 2
├── services/
│   ├── cut-styling.jpg
│   ├── coloring.jpg
│   ├── hair-treatment.jpg
│   └── nail-art.jpg
├── transformations/
│   ├── before-after-1.jpg   ← Before & After slider images
│   ├── before-after-2.jpg
│   ├── before-after-3.jpg
│   ├── before-after-4.jpg
│   └── before-after-5.jpg
├── testimonials/
│   ├── avatar-1.jpg         ← Testimonial user avatars
│   ├── avatar-2.jpg
│   └── avatar-3.jpg
├── promo/
│   ├── promo-model-1.jpg    ← Special Promo card photo 1
│   └── promo-model-2.jpg    ← Special Promo card photo 2
└── gallery/
    ├── gallery-1.jpg
    ├── gallery-2.jpg
    ├── gallery-3.jpg
    └── gallery-4.jpg
```

## Usage in components

```tsx
// Import local image
import heroImg from '../images/hero/hero-bg.jpg'

// Or use directly in JSX
<img src="/src/images/promo/promo-model-1.jpg" alt="..." />

// Or via Unsplash (current approach, no download needed)
<img src="https://images.unsplash.com/photo-...?w=600" alt="..." />
```

> **Tip:** Vite automatically handles image imports. Just import the file and use the variable as the `src`.
