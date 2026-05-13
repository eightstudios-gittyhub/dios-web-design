const header = document.querySelector('[data-header]');
const navToggle = document.querySelector('[data-nav-toggle]');
const navMenu = document.querySelector('[data-nav-menu]');
const form = document.querySelector('.contact-form');
const formNote = document.querySelector('[data-form-note]');
const filterButtons = document.querySelectorAll('[data-filter]');
const projectCards = document.querySelectorAll('[data-category]');

const updateHeader = () => {
  header?.classList.toggle('is-scrolled', window.scrollY > 12);
};

updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

navToggle?.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

navMenu?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('is-open');
    navToggle?.setAttribute('aria-expanded', 'false');
  });
});

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((chip) => chip.classList.toggle('is-active', chip === button));
    projectCards.forEach((card) => {
      card.classList.toggle('is-hidden', filter !== 'All' && card.dataset.category !== filter);
    });
  });
});

const observer = 'IntersectionObserver' in window
  ? new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14 })
  : null;

document.querySelectorAll('.reveal').forEach((item) => {
  if (observer) {
    observer.observe(item);
  } else {
    item.classList.add('is-visible');
  }
});

form?.addEventListener('submit', (event) => {
  event.preventDefault();
  formNote.textContent = 'Thanks — your request is ready. Connect this form to email or a CRM to collect submissions.';
  form.reset();
});
