document.addEventListener('DOMContentLoaded', () => {
  // 1. DYNAMIC COPYRIGHT YEAR
  const yearElement = document.getElementById('currentYear');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // 2. MOBILE NAVIGATION HAMBURGER MENU
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      hamburger.innerHTML = isOpen ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
    });

    // Close mobile menu when a navigation item is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        hamburger.innerHTML = '<i class="fa-solid fa-bars"></i>';
      });
    });
  }

  // 3. ACTIVE NAVIGATION HIGHLIGHTING ON SCROLL
  const sections = document.querySelectorAll('section[id]');

  const highlightNavOnScroll = () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 100;
      const sectionId = current.getAttribute('id');
      const navItem = document.querySelector(`.nav-menu a[href*=${sectionId}]`);

      if (navItem) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navItem.classList.add('active');
        } else {
          navItem.classList.remove('active');
        }
      }
    });
  };

  window.addEventListener('scroll', highlightNavOnScroll);

  // 4. TESTIMONIAL CAROUSEL
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.dot-indicator');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  let currentSlide = 0;

  const showSlide = (index) => {
    slides.forEach((slide, i) => {
      slide.classList.remove('active');
      dots[i].classList.remove('active');
    });

    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
  };

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
    nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));
    
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => showSlide(index));
    });
  }

  // Auto-play testimonial carousel every 6 seconds
  setInterval(() => {
    if (slides.length > 0) {
      showSlide(currentSlide + 1);
    }
  }, 6000);
});