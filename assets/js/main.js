document.addEventListener('DOMContentLoaded', () => {

  /* ─────────────────────────────────────────
     Helpers
  ───────────────────────────────────────── */
  const $ = (s, all = false) =>
    all ? [...document.querySelectorAll(s.trim())] : document.querySelector(s.trim());

  const on = (ev, sel, fn, all = false) => {
    const els = $(sel, all);
    if (!els) return;
    (Array.isArray(els) ? els : [els]).forEach(el => el.addEventListener(ev, fn));
  };

  const scrollTo = el => {
    const node = $(el);
    if (!node) return;
    window.scrollTo({ top: node.getBoundingClientRect().top + window.pageYOffset - ($('#header')?.offsetHeight || 0), behavior: 'smooth' });
  };

  /* ─────────────────────────────────────────
     🍞 TOAST SYSTEM
  ───────────────────────────────────────── */
  function createToastContainer() {
    let c = document.getElementById('toast-container');
    if (!c) { c = document.createElement('div'); c.id = 'toast-container'; document.body.appendChild(c); }
    return c;
  }

  const TOAST_ICONS = {
    success: '<i class="bi bi-check-circle-fill"></i>',
    error:   '<i class="bi bi-x-circle-fill"></i>',
    info:    '<i class="bi bi-info-circle-fill"></i>',
  };
  const TOAST_TITLES = {
    success: 'Message Sent!',
    error:   'Send Failed',
    info:    'Please Wait…',
  };

  function showToast(type, message, duration = 4000) {
    const container = createToastContainer();

    // format time
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.style.setProperty('--duration', `${duration}ms`);
    toast.innerHTML = `
      <div class="toast-icon">${TOAST_ICONS[type] || TOAST_ICONS.info}</div>
      <div class="toast-body">
        <div class="toast-title">${TOAST_TITLES[type] || 'Notice'}</div>
        <div class="toast-msg">${message}</div>
        <div class="toast-time">
          <i class="bi bi-clock"></i>
          ${timeStr}
        </div>
      </div>
      <button class="toast-close" aria-label="Close"><i class="bi bi-x-lg"></i></button>
    `;

    container.appendChild(toast);

    // close button
    toast.querySelector('.toast-close').addEventListener('click', () => dismissToast(toast));

    // auto dismiss
    const timer = setTimeout(() => dismissToast(toast), duration);
    toast._timer = timer;

    return toast;
  }

  function dismissToast(toast) {
    if (toast._timer) clearTimeout(toast._timer);
    toast.classList.add('hiding');
    toast.addEventListener('animationend', () => toast.remove(), { once: true });
  }

  /* ─────────────────────────────────────────
     Nav
  ───────────────────────────────────────── */
  on('click', '.mobile-nav-toggle', e => {
    $('#navbar')?.classList.toggle('navbar-mobile');
    e.currentTarget.classList.toggle('bi-list');
    e.currentTarget.classList.toggle('bi-x');
  });

  on('click', '#navbar .nav-link', e => {
    const hash = e.currentTarget?.hash;
    const section = hash && $(hash);
    if (!section) return;
    e.preventDefault();
    const navbar = $('#navbar'), header = $('#header');
    const sections = $('section', true), navLinks = $('#navbar .nav-link', true);

    navLinks?.forEach(i => i.classList.remove('active'));
    e.currentTarget.classList.add('active');

    if (navbar?.classList.contains('navbar-mobile')) {
      navbar.classList.remove('navbar-mobile');
      const toggle = $('.mobile-nav-toggle');
      toggle?.classList.toggle('bi-list');
      toggle?.classList.toggle('bi-x');
    }

    if (hash === '#header') {
      header?.classList.remove('header-top');
      sections?.forEach(i => i.classList.remove('section-show'));
      return;
    }

    const show = () => {
      sections?.forEach(i => i.classList.remove('section-show'));
      section.classList.add('section-show');
    };

    if (!header?.classList.contains('header-top')) {
      header?.classList.add('header-top');
      setTimeout(show, 350);
    } else { show(); }

    scrollTo(hash);
  }, true);

  const handleHash = () => {
    const hash = window.location.hash;
    if (!hash) return;
    const section = $(hash);
    if (!section) return;
    $('#header')?.classList.add('header-top');
    $('#navbar .nav-link', true)?.forEach(i => i.classList.toggle('active', i.getAttribute('href') === hash));
    setTimeout(() => section.classList.add('section-show'), 350);
    scrollTo(hash);
  };

  /* ─────────────────────────────────────────
     Skills animation
  ───────────────────────────────────────── */
  const skillsEl = $('.skills-content');
  if (skillsEl) {
    new IntersectionObserver((entries, obs) => {
      if (entries[0].isIntersecting) {
        $('.progress .progress-bar', true)?.forEach(b => b.style.width = b.getAttribute('aria-valuenow') + '%');
        obs.disconnect();
      }
    }, { threshold: 0.5 }).observe(skillsEl);
  }

  /* ─────────────────────────────────────────
     Age & Experience
  ───────────────────────────────────────── */
  const ageEl = document.getElementById('current-age');
  if (ageEl) {
    const birth = new Date('March 25, 1999'), today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
    ageEl.textContent = age;
  }
  const yrs = new Date().getFullYear() - 2023;
  const expEl = document.getElementById('experience-text');
  const expR  = document.getElementById('resume-text');
  if (expEl) expEl.textContent = yrs;
  if (expR)  expR.textContent  = yrs;

  /* ─────────────────────────────────────────
     Swiper / Isotope / GLightbox / PureCounter
  ───────────────────────────────────────── */
  if (typeof Swiper !== 'undefined') {
    if ($('.testimonials-slider')) new Swiper('.testimonials-slider', { speed:600, loop:true, autoplay:{delay:5000,disableOnInteraction:false}, slidesPerView:'auto', pagination:{el:'.swiper-pagination',type:'bullets',clickable:true}, breakpoints:{320:{slidesPerView:1,spaceBetween:20},1200:{slidesPerView:3,spaceBetween:20}} });
    if ($('.portfolio-details-slider')) new Swiper('.portfolio-details-slider', { speed:400, loop:true, autoplay:{delay:5000,disableOnInteraction:false}, pagination:{el:'.swiper-pagination',type:'bullets',clickable:true} });
  }
  const portC = $('.portfolio-container');
  if (portC && typeof Isotope !== 'undefined') {
    const iso = new Isotope(portC, { itemSelector:'.portfolio-item', layoutMode:'fitRows' });
    on('click','#portfolio-flters li', e => { e.preventDefault(); $('#portfolio-flters li',true)?.forEach(el=>el.classList.remove('filter-active')); e.currentTarget.classList.add('filter-active'); iso.arrange({filter:e.currentTarget.getAttribute('data-filter')}); }, true);
  }
  if (typeof GLightbox !== 'undefined') { GLightbox({selector:'.portfolio-lightbox'}); GLightbox({selector:'.portfolio-details-lightbox',width:'90%',height:'90vh'}); }
  if (typeof PureCounter !== 'undefined') new PureCounter();

  /* ─────────────────────────────────────────
     📧 Contact Form — EmailJS + Toast
  ───────────────────────────────────────── */
  const form = document.getElementById('contactForm');
  if (form) {

    // focus effects
    form.querySelectorAll('.form-control').forEach(inp => {
      inp.addEventListener('focus', () => inp.closest('.form-group')?.classList.add('focused'));
      inp.addEventListener('blur',  () => { if (!inp.value) inp.closest('.form-group')?.classList.remove('focused'); });
    });

    // char counter
    const msgArea = document.getElementById('message');
    const counter = document.getElementById('charCounter');
    if (msgArea && counter) {
      msgArea.addEventListener('input', () => {
        const l = msgArea.value.length;
        counter.textContent = `${l} / 1000`;
        counter.className = 'char-counter' + (l >= 1000 ? ' limit' : l > 800 ? ' warning' : '');
      });
    }

    // submit
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const btn        = form.querySelector('.submit-btn');
      const loadingDiv = form.querySelector('.form-feedback.loading');

      const name    = form.querySelector('#name').value.trim();
      const email   = form.querySelector('#email').value.trim();
      const subject = form.querySelector('#subject').value.trim();
      const message = form.querySelector('#message').value.trim();

      // validate
      if (!name || !email || !subject || !message) {
        showToast('error', 'Please fill in all fields before sending.');
        shakeBtn(btn);
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showToast('error', 'Please enter a valid email address.');
        shakeBtn(btn);
        return;
      }

      // loading state
      if (loadingDiv) loadingDiv.style.display = 'flex';
      if (btn) { btn.disabled = true; btn.innerHTML = '<span class="btn-spinner"></span> Sending…'; }
      showToast('info', 'Sending your message, please wait…', 6000);

      try {
        await emailjs.send('service_1919', 'template_nfgpjzp', {
          from_name:  name,
          from_email: email,
          subject:    subject,
          message:    message,
          to_email:   'mohamedanwarfahmy@gmail.com',
          reply_to:   email
        });

        if (loadingDiv) loadingDiv.style.display = 'none';

        showToast('success', `Thanks ${name}! Your message has been sent. I'll reply soon. 🚀`, 6000);

        form.reset();
        form.querySelectorAll('.form-control').forEach(inp => inp.closest('.form-group')?.classList.remove('focused'));
        if (counter) counter.textContent = '0 / 1000';

      } catch (err) {
        console.error('EmailJS Error:', err);
        if (loadingDiv) loadingDiv.style.display = 'none';
        showToast('error', 'Failed to send. Please email me at mohamedanwarfahmy@gmail.com', 7000);
      } finally {
        if (btn) { btn.disabled = false; btn.innerHTML = '<i class="bi bi-send-fill"></i> Send Message'; }
      }
    });
  }

  /* ─────────────────────────────────────────
     Helpers
  ───────────────────────────────────────── */
  function shakeBtn(el) {
    if (!el) return;
    el.style.animation = 'none';
    requestAnimationFrame(() => { el.style.animation = 'shake 0.4s ease'; });
  }

  handleHash();
});