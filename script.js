const body = document.body;
const themeBtn = document.getElementById('themeBtn');
const savedTheme = localStorage.getItem('techsprout-theme');
if (savedTheme === 'dark') body.classList.add('dark');

themeBtn.addEventListener('click', () => {
  body.classList.toggle('dark');
  localStorage.setItem('techsprout-theme', body.classList.contains('dark') ? 'dark' : 'light');
});

const mobileToggle = document.getElementById('mobileToggle');
const nav = document.getElementById('navLinks');

mobileToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  mobileToggle.setAttribute('aria-expanded', open);
});

nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));

document.querySelectorAll('.path-tab').forEach(btn => btn.addEventListener('click', () => {
  document.querySelectorAll('.path-tab').forEach(x => x.classList.remove('active'));
  document.querySelectorAll('.path-panel').forEach(x => x.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById(btn.dataset.path).classList.add('active');
}));

document.querySelectorAll('.filter').forEach(btn => btn.addEventListener('click', () => {
  document.querySelectorAll('.filter').forEach(x => x.classList.remove('active'));
  btn.classList.add('active');
  const cat = btn.dataset.filter;
  document.querySelectorAll('.project').forEach(p => p.classList.toggle('hide', cat !== 'all' && p.dataset.cat !== cat));
}));

let audience = 'school';
document.querySelectorAll('.aud-btn').forEach(btn => btn.addEventListener('click', () => {
  document.querySelectorAll('.aud-btn').forEach(x => x.classList.remove('active'));
  btn.classList.add('active');
  audience = btn.dataset.audience;
  const select = document.querySelector('select[name="interest"]');
  select.value = audience === 'parent' ? '1-on-1 Mentorship' : '';
}));

const form = document.getElementById('inquiryForm');
const status = document.getElementById('formStatus');
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxI-I5Ji61b8sLaQyr81vGDzFhen5MTnn32JjWNPXgc6efu6QPrt60bfA0HsWk6HwAy/exec'; // Replace with your copied Apps Script Web App URL

form.addEventListener('submit', e => {
  e.preventDefault();

  const data = Object.fromEntries(new FormData(form).entries());
  data.audience = audience;

  status.textContent = 'Submitting inquiry...';

  fetch(SCRIPT_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  .then(() => {
    status.textContent = 'Inquiry submitted successfully!';
    form.reset();
  })
  .catch(err => {
    status.textContent = 'Error submitting inquiry. Please try again.';
    console.error(err);
  });
});

const reveal = new IntersectionObserver(entries => entries.forEach(e => {
  if (e.isIntersecting) {
    e.target.classList.add('visible');
    reveal.unobserve(e.target);
  }
}), { threshold: .08 });

document.querySelectorAll('.why-card,.solution-card,.offer,.project,.family-grid article').forEach(el => {
  el.classList.add('reveal');
  reveal.observe(el);
});
