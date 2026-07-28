// აიქონების ჩვენება ფონტის ჩატვირთვისთანავე
if (document.fonts && document.fonts.load) {
  document.fonts.load('24px "Material Symbols Outlined"').then(() => {
    document.documentElement.classList.add('icons-ready');
  });
} else {
  document.documentElement.classList.add('icons-ready');
}

// Reveal animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

// Sticky header shrink on scroll
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

// Mobile navigation
const navToggle = document.querySelector('[data-nav-toggle]');
const mobileNav = document.querySelector('[data-mobile-nav]');

if (navToggle && mobileNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('hidden') === false;
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
}
