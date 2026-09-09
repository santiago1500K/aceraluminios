const ASSETS = {
  steel: 'images/steel.jpg',
  windows: 'images/windows.jpg',
  hero: 'images/hero.jpg',
};

const serviceImage = document.getElementById('service-image');
const visualCategory = document.getElementById('visual-category');

document.querySelectorAll('.accordion-item').forEach((item) => {
  const trigger = item.querySelector('.accordion-trigger');
  trigger.addEventListener('click', () => {
    const wasOpen = item.classList.contains('open');
    item.closest('.accordion').querySelectorAll('.accordion-item').forEach((other) => {
      other.classList.remove('open');
      other.querySelector('.a-icon').textContent = '+';
    });
    if (!wasOpen) {
      item.classList.add('open');
      item.querySelector('.a-icon').textContent = '−';

      const asset = item.dataset.asset;
      const category = item.dataset.category;
      if (serviceImage && asset && ASSETS[asset]) serviceImage.src = ASSETS[asset];
      if (visualCategory && category) visualCategory.textContent = category;
    }
  });
});

const contactForm = document.getElementById('contact-form');
if (contactForm) {
  const statusEl = contactForm.querySelector('.form-status');
  const submitBtn = contactForm.querySelector('button[type="submit"]');

  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(contactForm).entries());

    submitBtn.disabled = true;
    statusEl.textContent = 'Enviando...';
    statusEl.className = 'form-status';

    const fallbackError = 'No se pudo enviar. Intenta por WhatsApp.';

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      let result = {};
      try {
        result = await response.json();
      } catch {
        throw new Error(fallbackError);
      }
      if (!response.ok) throw new Error(result.error || fallbackError);

      statusEl.textContent = '¡Mensaje enviado! Te contactaremos pronto.';
      statusEl.classList.add('success');
      contactForm.reset();
    } catch (err) {
      statusEl.textContent = err.message || fallbackError;
      statusEl.classList.add('error');
    } finally {
      submitBtn.disabled = false;
    }
  });
}

const navToggle = document.querySelector('.nav-toggle');
const mobileNav = document.getElementById('mobile-nav');
if (navToggle && mobileNav) {
  navToggle.addEventListener('click', () => {
    const open = mobileNav.hasAttribute('hidden');
    if (open) {
      mobileNav.removeAttribute('hidden');
    } else {
      mobileNav.setAttribute('hidden', '');
    }
    navToggle.setAttribute('aria-expanded', String(open));
  });

  mobileNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mobileNav.setAttribute('hidden', '');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}
