document.addEventListener('DOMContentLoaded', () => {
  // Modern selector helper with optional chaining
  const select = (selector, all = false) => {
    selector = selector?.trim();
    return all 
      ? [...document.querySelectorAll(selector)] 
      : document.querySelector(selector);
  };

  // Modern event listener helper
  const on = (event, selector, handler, all = false) => {
    const elements = select(selector, all);
    if (!elements) return;
    
    if (Array.isArray(elements)) {
      elements.forEach(el => el.addEventListener(event, handler));
    } else {
      elements.addEventListener(event, handler);
    }
  };

  // Improved scroll function with offset
  const scrollTo = (element) => {
    const el = select(element);
    if (!el) return;
    
    const headerHeight = select('#header')?.offsetHeight || 0;
    const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - headerHeight;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  };

  // Mobile nav toggle
  on('click', '.mobile-nav-toggle', (e) => {
    const navbar = select('#navbar');
    navbar?.classList.toggle('navbar-mobile');
    e.currentTarget?.classList.toggle('bi-list');
    e.currentTarget?.classList.toggle('bi-x');
  });

  // Nav link click handler
  on('click', '#navbar .nav-link', (e) => {
    const hash = e.currentTarget?.hash;
    const section = hash && select(hash);
    if (!section) return;
    
    e.preventDefault();

    const navbar = select('#navbar');
    const header = select('#header');
    const sections = select('section', true);
    const navLinks = select('#navbar .nav-link', true);

    // Update active class
    navLinks?.forEach(item => item.classList.remove('active'));
    e.currentTarget?.classList.add('active');

    // Handle mobile navbar
    if (navbar?.classList.contains('navbar-mobile')) {
      navbar.classList.remove('navbar-mobile');
      const toggle = select('.mobile-nav-toggle');
      toggle?.classList.toggle('bi-list');
      toggle?.classList.toggle('bi-x');
    }

    // Handle header section
    if (hash === '#header') {
      header?.classList.remove('header-top');
      sections?.forEach(item => item.classList.remove('section-show'));
      return;
    }

    // Show section with animation
    const showSection = () => {
      sections?.forEach(item => item.classList.remove('section-show'));
      section.classList.add('section-show');
    };

    if (!header?.classList.contains('header-top')) {
      header?.classList.add('header-top');
      setTimeout(showSection, 350);
    } else {
      showSection();
    }

    scrollTo(hash);
  }, true);

  // Handle initial hash on load
  const handleInitialHash = () => {
    const hash = window.location.hash;
    if (!hash) return;
    
    const section = select(hash);
    if (!section) return;

    const header = select('#header');
    const navLinks = select('#navbar .nav-link', true);

    header?.classList.add('header-top');

    navLinks?.forEach(item => {
      item.classList.toggle('active', item.getAttribute('href') === hash);
    });

    setTimeout(() => {
      section.classList.add('section-show');
    }, 350);

    scrollTo(hash);
  };

  // Initialize everything
  const init = () => {
    handleInitialHash();

    // Skills animation
    const skillsContent = select('.skills-content');
    if (skillsContent) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const progressBars = select('.progress .progress-bar', true);
            progressBars?.forEach(bar => {
              bar.style.width = bar.getAttribute('aria-valuenow') + '%';
            });
            observer.disconnect();
          }
        });
      }, { threshold: 0.8 });
      observer.observe(skillsContent);
    }

    // Testimonials slider
    new Swiper('.testimonials-slider', {
      speed: 600,
      loop: true,
      autoplay: { delay: 5000, disableOnInteraction: false },
      slidesPerView: 'auto',
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
      },
      breakpoints: {
        320: { slidesPerView: 1, spaceBetween: 20 },
        1200: { slidesPerView: 3, spaceBetween: 20 }
      }
    });

    // Portfolio initialization
    const portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      const portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
      });

      on('click', '#portfolio-flters li', (e) => {
        e.preventDefault();
        const filters = select('#portfolio-flters li', true);
        filters?.forEach(el => el.classList.remove('filter-active'));
        e.currentTarget?.classList.add('filter-active');
        portfolioIsotope.arrange({
          filter: e.currentTarget?.getAttribute('data-filter')
        });
      }, true);
    }

    // Lightboxes
    GLightbox({ selector: '.portfolio-lightbox' });
    GLightbox({
      selector: '.portfolio-details-lightbox',
      width: '90%',
      height: '90vh'
    });

    // Portfolio details slider
    new Swiper('.portfolio-details-slider', {
      speed: 400,
      loop: true,
      autoplay: { delay: 5000, disableOnInteraction: false },
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
      }
    });

    // PureCounter
    if (typeof PureCounter !== 'undefined') {
      new PureCounter();
    }
  };

  // Start initialization
  init();
});
// Function to calculate age from birthdate
function calculateAge(birthday) {
  const birthDate = new Date(birthday);
  const today = new Date();
  
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  // If birthday hasn't occurred yet this year, subtract 1
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
}

// Update the age in the DOM
function updateAge() {
  const ageElement = document.getElementById('current-age');
  if (ageElement) {
    const currentAge = calculateAge('March 25, 1999');
    ageElement.textContent = currentAge;
  }
}

// Call updateAge() when the page loads
document.addEventListener('DOMContentLoaded', () => {
  updateAge(); // Add this inside your existing DOMContentLoaded
  // ... rest of your existing code
});

function calculateExperience(startDate) {
  const start = new Date(startDate);
  const now = new Date();
  
  let years = now.getFullYear() - start.getFullYear();
  let months = now.getMonth() - start.getMonth();
  
  if (months < 0) {
    years--;
    months += 12;
  }
  
  return { years, months };
}

function updateExperience() {
  const expElement = document.getElementById('experience-text');
  const expResume = document.getElementById('resume-text');

  if (expElement || expResume) {
    const startYear = 2023;
    const currentYear = new Date().getFullYear();
    expElement.textContent = `${currentYear - startYear}`;
    expResume.textContent = `${currentYear - startYear}`;

  }
}
// Initialize when the page loads
document.addEventListener('DOMContentLoaded', () => {
  updateExperience();
  updateAge(); // If you have an age calculation
});