document.addEventListener("DOMContentLoaded", () => {
  // DYNAMIC COPYRIGHT YEAR
  const currentYearElem = document.getElementById("currentYear");
  if (currentYearElem) {
    currentYearElem.textContent = new Date().getFullYear();
  }

  // MOBILE NAVIGATION MENU
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("open");
      const icon = hamburger.querySelector("i");
      if (icon) {
        icon.classList.toggle("fa-bars");
        icon.classList.toggle("fa-xmark");
      }
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("open");
        const icon = hamburger.querySelector("i");
        if (icon) {
          icon.classList.add("fa-bars");
          icon.classList.remove("fa-xmark");
        }
      });
    });
  }

  // ACTIVE SECTION HIGHLIGHTING ON SCROLL
  const sections = document.querySelectorAll("section[id]");

  const highlightNavOnScroll = () => {
    const scrollY = window.pageYOffset;

    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 100;
      const sectionId = current.getAttribute("id");
      const navTarget = document.querySelector(`.nav-menu a[href*=${sectionId}]`);

      if (navTarget) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navTarget.classList.add("active");
        } else {
          navTarget.classList.remove("active");
        }
      }
    });
  };

  window.addEventListener("scroll", highlightNavOnScroll);

  // TESTIMONIAL CAROUSEL
  const slides = document.querySelectorAll(".testimonial-slide");
  const dots = document.querySelectorAll(".dot-indicator");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  let currentSlide = 0;
  const slideCount = slides.length;

  const updateCarousel = (index) => {
    slides.forEach((slide) => slide.classList.remove("active"));
    dots.forEach((dot) => dot.classList.remove("active"));

    slides[index].classList.add("active");
    dots[index].classList.add("active");
  };

  if (nextBtn && prevBtn && slideCount > 0) {
    nextBtn.addEventListener("click", () => {
      currentSlide = (currentSlide + 1) % slideCount;
      updateCarousel(currentSlide);
    });

    prevBtn.addEventListener("click", () => {
      currentSlide = (currentSlide - 1 + slideCount) % slideCount;
      updateCarousel(currentSlide);
    });

    dots.forEach((dot) => {
      dot.addEventListener("click", (e) => {
        const index = parseInt(e.target.getAttribute("data-index"));
        currentSlide = index;
        updateCarousel(currentSlide);
      });
    });
  }
});