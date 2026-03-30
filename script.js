/* ═══════════════════════════════════════════════════════════════
   Manish Klach — Portfolio Interactions
   Particle system, typing effect, scroll tracking, carousel
   ═══════════════════════════════════════════════════════════════ */

document.documentElement.classList.add("js");

// ── DOM References ────────────────────────────────────────────
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
const scrollProgress = document.getElementById("scroll-progress");
const backToTop = document.getElementById("back-to-top");
const heroCanvas = document.getElementById("hero-particles");

// ── Utility ───────────────────────────────────────────────────
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// ── Header scroll state ───────────────────────────────────────
function updateHeaderState() {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 12);
}
updateHeaderState();
window.addEventListener("scroll", updateHeaderState, { passive: true });

// ── Scroll progress bar ──────────────────────────────────────
function updateScrollProgress() {
  if (!scrollProgress) return;
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  scrollProgress.style.width = progress + "%";
}
window.addEventListener("scroll", updateScrollProgress, { passive: true });

// ── Back to top button ───────────────────────────────────────
function updateBackToTop() {
  if (!backToTop) return;
  backToTop.classList.toggle("is-visible", window.scrollY > 600);
}
window.addEventListener("scroll", updateBackToTop, { passive: true });
if (backToTop) {
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ── Mobile nav toggle ─────────────────────────────────────────
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

// ── Active nav section tracking ───────────────────────────────
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
    { rootMargin: "-35% 0px -55% 0px", threshold: 0.1 }
  );
  sections.forEach((section) => activeObserver.observe(section));
}

// ── Scroll reveal with stagger ────────────────────────────────
if (revealItems.length && !prefersReducedMotion) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -6% 0px" }
  );
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

// ── Hero Carousel ─────────────────────────────────────────────
if (heroCarouselTrack && heroSlides.length && heroDots.length) {
  let activeSlide = 0;
  let autoplayInterval;

  function renderCarousel(index) {
    activeSlide = (index + heroSlides.length) % heroSlides.length;
    heroCarouselTrack.style.transform = `translateX(-${activeSlide * 100}%)`;

    heroSlides.forEach((slide, i) => {
      const isActive = i === activeSlide;
      slide.classList.toggle("is-active", isActive);
      slide.setAttribute("aria-hidden", String(!isActive));
    });

    heroDots.forEach((dot, i) => {
      const isActive = i === activeSlide;
      dot.classList.toggle("is-active", isActive);
      dot.setAttribute("aria-selected", String(isActive));
    });
  }

  heroDots.forEach((dot) => {
    dot.addEventListener("click", () => {
      renderCarousel(Number(dot.dataset.carouselIndex));
      resetAutoplay();
    });
  });

  heroCarouselButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const direction = button.dataset.carouselDir === "next" ? 1 : -1;
      renderCarousel(activeSlide + direction);
      resetAutoplay();
    });
  });

  function startAutoplay() {
    autoplayInterval = setInterval(() => {
      renderCarousel(activeSlide + 1);
    }, 5000);
  }

  function resetAutoplay() {
    clearInterval(autoplayInterval);
    startAutoplay();
  }

  renderCarousel(0);
  startAutoplay();
}

// ── Typing Effect ─────────────────────────────────────────────
(function initTypingEffect() {
  const el = document.getElementById("hero-typed");
  if (!el || prefersReducedMotion) {
    if (el) {
      el.textContent = "Engineering leader focused on systems architecture, AI infrastructure, patents, and technical platforms.";
    }
    return;
  }

  const phrases = [
    "Engineering leader focused on systems architecture, AI infrastructure, patents, and technical platforms.",
    "Building patent-grade invention work and architecture-driven technical products.",
    "Shipping open-source infrastructure for LLM inference, CUDA, and runtime systems.",
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingTimeout;

  function type() {
    const current = phrases[phraseIndex];
    const cursor = '<span class="cursor" aria-hidden="true"></span>';

    if (!isDeleting) {
      el.innerHTML = current.substring(0, charIndex) + cursor;
      charIndex++;

      if (charIndex > current.length) {
        // Pause at end of phrase
        typingTimeout = setTimeout(() => {
          isDeleting = true;
          type();
        }, 3000);
        return;
      }
      typingTimeout = setTimeout(type, 35 + Math.random() * 25);
    } else {
      el.innerHTML = current.substring(0, charIndex) + cursor;
      charIndex--;

      if (charIndex < 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        charIndex = 0;
        typingTimeout = setTimeout(type, 500);
        return;
      }
      typingTimeout = setTimeout(type, 18);
    }
  }

  // Start after a brief delay
  setTimeout(type, 800);
})();

// ── Particle Network Canvas ──────────────────────────────────
(function initParticles() {
  if (!heroCanvas || prefersReducedMotion) return;

  const ctx = heroCanvas.getContext("2d");
  let width, height;
  let particles = [];
  let mouse = { x: -1000, y: -1000 };
  let animId;

  const PARTICLE_COUNT = 60;
  const CONNECTION_DIST = 150;
  const MOUSE_DIST = 200;

  function resize() {
    const hero = heroCanvas.parentElement;
    width = hero.offsetWidth;
    height = hero.offsetHeight;
    heroCanvas.width = width * window.devicePixelRatio;
    heroCanvas.height = height * window.devicePixelRatio;
    heroCanvas.style.width = width + "px";
    heroCanvas.style.height = height + "px";
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  }

  function createParticles() {
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.8 + 0.8,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < CONNECTION_DIST) {
          const alpha = (1 - dist / CONNECTION_DIST) * 0.15;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(59, 130, 246, ${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    // Draw particles & mouse interaction
    particles.forEach((p) => {
      // Mouse repulsion
      const dx = p.x - mouse.x;
      const dy = p.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < MOUSE_DIST && dist > 0) {
        const force = (MOUSE_DIST - dist) / MOUSE_DIST * 0.8;
        p.vx += (dx / dist) * force * 0.3;
        p.vy += (dy / dist) * force * 0.3;
      }

      // Update position
      p.x += p.vx;
      p.y += p.vy;

      // Damping
      p.vx *= 0.99;
      p.vy *= 0.99;

      // Wrap around
      if (p.x < -10) p.x = width + 10;
      if (p.x > width + 10) p.x = -10;
      if (p.y < -10) p.y = height + 10;
      if (p.y > height + 10) p.y = -10;

      // Draw particle
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(99, 130, 255, ${p.opacity})`;
      ctx.fill();

      // Glow effect for larger particles
      if (p.r > 1.5) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59, 130, 246, ${p.opacity * 0.08})`;
        ctx.fill();
      }
    });

    // Mouse glow
    if (mouse.x > 0 && mouse.y > 0) {
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 80, 0, Math.PI * 2);
      const grd = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 80);
      grd.addColorStop(0, "rgba(59, 130, 246, 0.06)");
      grd.addColorStop(1, "rgba(59, 130, 246, 0)");
      ctx.fillStyle = grd;
      ctx.fill();
    }

    animId = requestAnimationFrame(draw);
  }

  // Mouse tracking (scoped to hero)
  const heroSection = heroCanvas.closest(".hero");
  if (heroSection) {
    heroSection.addEventListener("mousemove", (e) => {
      const rect = heroCanvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });
    heroSection.addEventListener("mouseleave", () => {
      mouse.x = -1000;
      mouse.y = -1000;
    });
  }

  // Init
  resize();
  createParticles();
  draw();

  // Handle resize
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      cancelAnimationFrame(animId);
      resize();
      createParticles();
      draw();
    }, 200);
  });

  // Pause when not visible
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      cancelAnimationFrame(animId);
    } else {
      draw();
    }
  });
})();
