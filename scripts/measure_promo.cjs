const { chromium } = require('C:/Users/ASUS/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  for (const width of [1920, 1440]) {
    const page = await browser.newPage();
    await page.setViewportSize({ width, height: 1080 });
    await page.goto('http://localhost:5173/special-promo', { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    
    const data = await page.evaluate(() => {
      const W = window.innerWidth;
      const toVw = px => Number((px / W * 100).toFixed(2));
      
      const hero = document.querySelector('section[aria-label="Special Promo Hero"]');
      const heroRect = hero.getBoundingClientRect();
      
      const card = hero.querySelector('.promo-card-wrapper');
      const cardRect = card ? card.getBoundingClientRect() : null;
      
      const allOffers = document.querySelector('#all-offers');
      const aoRect = allOffers ? allOffers.getBoundingClientRect() : null;
      const aoTitle = allOffers ? allOffers.querySelector('h2') : null;
      const aoTitleRect = aoTitle ? aoTitle.getBoundingClientRect() : null;
      
      // Find the grid of offer cards (desktop)
      const aoGrid = allOffers ? allOffers.querySelector('.hidden.md\\:grid') : null;
      const aoCards = aoGrid ? aoGrid.querySelectorAll('.bg-white') : [];
      const lastAoCard = aoCards.length ? aoCards[aoCards.length - 1] : null;
      const lastAoCardRect = lastAoCard ? lastAoCard.getBoundingClientRect() : null;
      const firstAoCardRect = aoCards.length ? aoCards[0].getBoundingClientRect() : null;
      
      const cta = document.querySelector('#cta');
      const ctaRect = cta ? cta.getBoundingClientRect() : null;
      const ctaTitle = cta ? cta.querySelector('h2') : null;
      const ctaTitleRect = ctaTitle ? ctaTitle.getBoundingClientRect() : null;
      const ctaImg = cta ? cta.querySelector('img') : null;
      const ctaImgRect = ctaImg ? ctaImg.getBoundingClientRect() : null;
      
      const footer = document.querySelector('footer');
      const footerRect = footer ? footer.getBoundingClientRect() : null;
      
      // Check card sizes haven't changed
      const heroCardW = cardRect ? Number(cardRect.width.toFixed(1)) : null;
      const heroCardH = cardRect ? Number(cardRect.height.toFixed(1)) : null;
      
      return {
        W,
        heroHeightVw: toVw(heroRect.height),
        cardBottomToAoTitleTopVw: (cardRect && aoTitleRect) ? toVw(aoTitleRect.top - cardRect.bottom) : null,
        aoTitleToFirstCardVw: (aoTitleRect && firstAoCardRect) ? toVw(firstAoCardRect.top - aoTitleRect.bottom) : null,
        lastAoCardBottomToCtaTitleTopVw: (lastAoCardRect && ctaTitleRect) ? toVw(ctaTitleRect.top - lastAoCardRect.bottom) : null,
        ctaHeightVw: ctaRect ? toVw(ctaRect.height) : null,
        ctaImgHeightVw: ctaImgRect ? toVw(ctaImgRect.height) : null,
        ctaImgBottomToFooterTopVw: (ctaImgRect && footerRect) ? toVw(footerRect.top - ctaImgRect.bottom) : null,
        heroCardSize: { w: heroCardW, h: heroCardH },
        aoCardHeightVw: firstAoCardRect ? toVw(firstAoCardRect.height) : null,
        hasMinHeightHero: heroRect.height > 0 ? 'height driven by content' : 'unknown',
      };
    });
    console.log(`Measurements at ${width}px:`, JSON.stringify(data, null, 2));

    // Take screenshots
    const artDir = 'C:/Users/ASUS/.gemini/antigravity/brain/94ce7d8a-c3e2-48ee-a896-cb94f1303ddc';
    
    // Full-page scroll screenshot at the hero->offers boundary
    await page.evaluate(() => {
      const hero = document.querySelector('section[aria-label="Special Promo Hero"]');
      const heroRect = hero.getBoundingClientRect();
      // Scroll so that the bottom of hero is at ~30% of viewport
      window.scrollTo(0, heroRect.bottom - window.innerHeight * 0.3 + window.scrollY);
    });
    await new Promise(r => setTimeout(r, 300));
    if (width === 1440) {
      await page.screenshot({ path: `${artDir}/promo_crossfade_hero_offers_${width}.png` });
    }

    // Scroll to offers->CTA boundary
    await page.evaluate(() => {
      const ao = document.querySelector('#all-offers');
      const aoRect = ao.getBoundingClientRect();
      window.scrollTo(0, aoRect.bottom - window.innerHeight * 0.3 + window.scrollY);
    });
    await new Promise(r => setTimeout(r, 300));
    if (width === 1440) {
      await page.screenshot({ path: `${artDir}/promo_crossfade_offers_cta_${width}.png` });
    }

    // Scroll to CTA->Footer boundary
    await page.evaluate(() => {
      const cta = document.querySelector('#cta');
      const ctaRect = cta.getBoundingClientRect();
      window.scrollTo(0, ctaRect.bottom - window.innerHeight * 0.5 + window.scrollY);
    });
    await new Promise(r => setTimeout(r, 300));
    if (width === 1440) {
      await page.screenshot({ path: `${artDir}/promo_cta_footer_${width}.png` });
    }

    await page.close();
  }
  await browser.close();
})();
