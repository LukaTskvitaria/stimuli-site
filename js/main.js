// ===== აიქონების ჩვენება ფონტის ჩატვირთვისთანავე =====
if (document.fonts && document.fonts.load) {
  document.fonts.load('24px "Material Symbols Outlined"').then(() => {
    document.documentElement.classList.add('icons-ready');
  });
} else {
  document.documentElement.classList.add('icons-ready');
}

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ===== 1. Hero-ს ჩატვირთვის ანიმაცია =====
// პირველი სექციის ტექსტური ბლოკები თანმიმდევრობით ამოდის, ფოტო მარჯვნიდან შემოდის
if (!reduceMotion) {
  const hero = document.querySelector('main > section:first-of-type');
  if (hero) {
    // კონტენტის კონტეინერი = პირველი არა-აბსოლუტური div (დეკორი გამოვტოვოთ)
    const content = Array.from(hero.querySelectorAll(':scope > div'))
      .find((d) => !d.className.includes('absolute'));

    if (content) {
      const isGrid = content.className.includes('grid');
      const textCol = isGrid ? content.children[0] : content;
      const mediaCol = isGrid ? content.children[1] : null;

      if (textCol) {
        Array.from(textCol.children).forEach((el, i) => {
          el.classList.add('load-anim');
          el.style.animationDelay = `${100 + i * 130}ms`;
        });
      }
      if (mediaCol) {
        mediaCol.classList.add('load-anim-right');
        mediaCol.style.animationDelay = '350ms';
      }
    }
  }
}

// ===== 2. Scroll-reveal ავტო-მინიჭება =====
// ბადეების შვილები — სათითაოდ (stagger), ორსვეტიანი სექციები — მარცხნიდან/მარჯვნიდან
const heroSection = document.querySelector('main > section:first-of-type');

document.querySelectorAll('main section').forEach((sec) => {
  if (sec === heroSection) return; // hero-ს თავისი ანიმაცია აქვს

  sec.querySelectorAll(':scope div.grid, :scope dl.grid').forEach((grid) => {
    const kids = Array.from(grid.children).filter((k) => k.tagName !== 'SCRIPT');
    const isTwoCol = /md:grid-cols-2\b/.test(grid.className) && kids.length === 2;

    kids.forEach((kid, i) => {
      if (kid.classList.contains('reveal')) kid.classList.remove('reveal');
      if (isTwoCol) {
        kid.classList.add(i === 0 ? 'reveal-left' : 'reveal-right');
      } else {
        kid.classList.add('reveal');
        kid.style.transitionDelay = `${Math.min(i * 90, 540)}ms`;
      }
    });
  });

  // სექციის სათაურები და ცალკე მდგომი ბლოკები
  sec.querySelectorAll(':scope .section-head, :scope .cta-band').forEach((el) => el.classList.add('reveal'));
});

// CTA ბანერები და მარტოხელა reveal-ები რომ არ გამოგვრჩეს — დიდი მომრგვალებული ბლოკები
document.querySelectorAll('main [class*="rounded-[48px]"]').forEach((el) => {
  if (!el.className.includes('reveal') && !el.closest('.reveal, .reveal-left, .reveal-right')) {
    el.classList.add('reveal-scale');
  }
});

// ===== 3. Observer =====
const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

if ('IntersectionObserver' in window && !reduceMotion) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach((el) => observer.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add('active'));
}

// ===== 4. მრიცხველები (7+, 390, 12...) =====
if (!reduceMotion && 'IntersectionObserver' in window) {
  const counterEls = [];
  document.querySelectorAll('main dd, main p').forEach((el) => {
    const m = el.textContent.trim().match(/^(\d{1,4})(\+?)$/);
    if (m && el.className.includes('font-display')) {
      counterEls.push({ el, target: parseInt(m[1], 10), suffix: m[2] });
    }
  });

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const item = counterEls.find((c) => c.el === entry.target);
      counterObserver.unobserve(entry.target);
      if (!item) return;

      const duration = 1100;
      const start = performance.now();
      const tick = (now) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        item.el.textContent = Math.round(item.target * eased) + item.suffix;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }, { threshold: 0.6 });

  counterEls.forEach((c) => counterObserver.observe(c.el));
}

// ===== 5. მოტივტივე დეკორი =====
if (!reduceMotion) {
  let i = 0;
  document.querySelectorAll('main [aria-hidden="true"].rounded-full, main div[class*="rounded-full"][class*="absolute"]').forEach((el) => {
    if (el.className.includes('-translate') || el.tagName === 'SVG') return;
    if (el.className.includes('border-dashed')) {
      el.classList.add('anim-spin-slow');
    } else {
      el.classList.add('anim-float');
      el.style.animationDuration = `${6 + (i % 3) * 1.5}s`;
      el.style.animationDelay = `${(i % 4) * 0.7}s`;
      i += 1;
    }
  });
  // glass-ბარათი hero-ზე ნაზად ტივტივებს
  const glass = document.querySelector('.glass-card');
  if (glass) {
    glass.classList.add('anim-float');
    glass.style.animationDuration = '8s';
  }
}

// ===== 6. Sticky header =====
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
  if (window.pageYOffset <= 0) {
    header.classList.remove('shadow-md');
    header.style.height = '80px';
  } else {
    header.classList.add('shadow-md');
    header.style.height = '70px';
  }
}, { passive: true });

// ===== 7. მობილურის ნავიგაცია =====
const navToggle = document.querySelector('[data-nav-toggle]');
const mobileNav = document.querySelector('[data-mobile-nav]');

if (navToggle && mobileNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('hidden') === false;
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
}
