const menuButton = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('#mobile-nav');
function setMenu(open) {
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  mobileNav.hidden = !open;
  document.body.classList.toggle('menu-open', open);
}
menuButton.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    setMenu(false);
    menuButton.focus();
  }
});
window.matchMedia('(min-width: 901px)').addEventListener('change', event => { if (event.matches) setMenu(false); });

const services = [...document.querySelectorAll('.service')];
const serviceImage = document.querySelector('#service-image');
const category = document.querySelector('#visual-category');
const descriptions = {
  steel: 'Referencia de una baranda de acero inoxidable y vidrio en una escalera de piedra',
  windows: 'Referencia de grandes ventanales con perfiles de aluminio grafito que conectan con un jardín',
  hero: 'Referencia de arquitectura contemporánea con acero, aluminio y vidrio'
};
services.forEach(service => {
  service.addEventListener('toggle', () => {
    if (!service.open) return;
    services.forEach(other => { if (other !== service && other.open) other.open = false; });
    const nextAsset = service.dataset.asset;
    const nextSrc = `./assets/${nextAsset}.webp`;
    if (serviceImage.getAttribute('src') !== nextSrc) serviceImage.src = nextSrc;
    serviceImage.alt = descriptions[nextAsset];
    category.textContent = service.dataset.category;
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
