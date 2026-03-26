document.documentElement.classList.add("js");

const header = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-menu a");
const sections = document.querySelectorAll("main section[id]");
const revealItems = document.querySelectorAll(".reveal");
const heroCarouselTrack = document.querySelector(".hero-carousel-track");
const heroSlides = document.querySelectorAll(".hero-slide");
const heroDots = document.querySelectorAll(".carousel-dot");
const heroCarouselButtons = document.querySelectorAll(".carousel-button");

function updateHeaderState() {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 12);
}

updateHeaderState();
window.addEventListener("scroll", updateHeaderState, { passive: true });

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("nav-open", isOpen);
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("nav-open");
    });
  });
}

if (sections.length && navLinks.length) {
  const activeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const activeId = entry.target.getAttribute("id");

        navLinks.forEach((link) => {
          const isMatch = link.getAttribute("href") === `#${activeId}`;
          link.classList.toggle("is-active", isMatch);

          if (isMatch) {
            link.setAttribute("aria-current", "page");
          } else {
            link.removeAttribute("aria-current");
          }
        });
      });
    },
    {
      rootMargin: "-35% 0px -55% 0px",
      threshold: 0.1
    }
  );

  sections.forEach((section) => activeObserver.observe(section));
}

if (revealItems.length && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.14,
      rootMargin: "0px 0px -8% 0px"
    }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

if (heroCarouselTrack && heroSlides.length && heroDots.length) {
  let activeSlide = 0;

  function renderCarousel(index) {
    activeSlide = (index + heroSlides.length) % heroSlides.length;
    heroCarouselTrack.style.transform = `translateX(-${activeSlide * 100}%)`;

    heroSlides.forEach((slide, slideIndex) => {
      const isActive = slideIndex === activeSlide;
      slide.classList.toggle("is-active", isActive);
      slide.setAttribute("aria-hidden", String(!isActive));
    });

    heroDots.forEach((dot, dotIndex) => {
      const isActive = dotIndex === activeSlide;
      dot.classList.toggle("is-active", isActive);
      dot.setAttribute("aria-selected", String(isActive));
    });
  }

  heroDots.forEach((dot) => {
    dot.addEventListener("click", () => {
      renderCarousel(Number(dot.dataset.carouselIndex));
    });
  });

  heroCarouselButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const direction = button.dataset.carouselDir === "next" ? 1 : -1;
      renderCarousel(activeSlide + direction);
    });
  });

  renderCarousel(0);
}
