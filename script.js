document.documentElement.classList.add("js");

const homepageData = {
  work: [
    {
      title: "Context Region Orchestration",
      meta: "Inference orchestration",
      text: "Region-aware context control for long-window inference, built around staged residency, predictive prefetch, and coherence discipline.",
      detail: "Treats context as a managed systems resource, not a flat prompt buffer.",
      primaryLabel: "Microsite",
      primaryHref: "https://manishklach.github.io/predictive-context-region-orchestration-patent-site/",
      secondaryLabel: "Patent filing",
      secondaryHref: "patents/202641041011-deterministic-staged-context-orchestration.html"
    },
    {
      title: "WDC-Engine",
      meta: "Agent runtime architecture",
      text: "Semantic deduplication and shared execution for agent-generated enterprise work, with bounded admission and execution reuse.",
      detail: "Pushes duplicate-work elimination into the runtime layer where coordination has leverage.",
      primaryLabel: "Microsite",
      primaryHref: "https://manishklach.github.io/wdc-engine-patent-site/",
      secondaryLabel: "Essay",
      secondaryHref: "writings/local-agent-deduplication-middleware.html"
    },
    {
      title: "SRMIC",
      meta: "Memory-centric accelerator concept",
      text: "A residency-first inference architecture centered on SRAM locality, fabric behavior, and explicit movement policy.",
      detail: "Starts from byte movement and residency pressure, not from raw FLOPS.",
      primaryLabel: "Repository",
      primaryHref: "https://github.com/manishklach/SRMIC_X1",
      secondaryLabel: "Essay",
      secondaryHref: "writings/srmic-x1-rethinking-memory-hierarchy-llm-decode.html"
    },
    {
      title: "ChromeLens",
      meta: "Systems-grade telemetry",
      text: "Tracing-driven performance analysis for large web surfaces using Chrome DevTools Protocol as a systems instrument.",
      detail: "Frames browser performance as observability and execution analysis rather than surface-level tuning.",
      primaryLabel: "Launch essay",
      primaryHref: "writings/introducing-chromelens-systems-grade-web-performance-telemetry.html",
      secondaryLabel: "Repository",
      secondaryHref: "https://github.com/manishklach/chromelens"
    },
    {
      title: "PMPP CUDA Study",
      meta: "GPU systems study library",
      text: "A disciplined CUDA study surface with more than 150 examples, notes, and optimization-oriented walkthroughs.",
      detail: "Turns learning into a durable technical reference instead of a private notebook.",
      primaryLabel: "Site",
      primaryHref: "https://manishklach.github.io/pmpp-cuda-study/",
      secondaryLabel: "Repository",
      secondaryHref: "https://github.com/manishklach/pmpp-cuda-study"
    }
  ],
  writing: [
    {
      title: "Why AI needs a new memory hierarchy, not just bigger caches",
      text: "A clear argument for why inference bottlenecks are shifting toward byte movement, residency policy, and hierarchy design.",
      href: "writings/why-ai-needs-a-new-memory-hierarchy-not-just-bigger-caches.html"
    },
    {
      title: "The memory scheduler is the new critical path in AI inference",
      text: "An architectural view of scheduling, movement policy, and the hidden control loop behind large-model serving.",
      href: "writings/the-memory-scheduler-is-the-new-critical-path-in-ai-inference.html"
    },
    {
      title: "Hardware-enforced on-chip memory residency",
      text: "An essay on explicit bind-release semantics, wired residency, and what an actual hardware primitive could change.",
      href: "writings/hardware-enforced-on-chip-memory-residency.html"
    }
  ],
  patentStats: [
    { value: "52", label: "U.S. patents and applications" },
    { value: "22", label: "India filings in 2026" },
    { value: "61+", label: "applications and patents surfaced here" }
  ],
  patents: [
    {
      id: "202641043359",
      title: "Hardware-enforced wired on-chip volatile memory residency with explicit bind-release semantics",
      href: "patents/202641043359-wired-on-chip-memory-residency.html"
    },
    {
      id: "202641042337",
      title: "Semantic deduplication and shared execution of agent-generated enterprise tasks",
      href: "patents/202641042337-semantic-deduplication-enterprise-tasks.html"
    },
    {
      id: "US 10,698,310 B2",
      title: "Regional device profiling systems",
      href: "patents.html#us-patents"
    }
  ]
};

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const header = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
const sections = document.querySelectorAll("main section[id]");

function renderWork() {
  const root = document.getElementById("work-grid");
  if (!root) return;

  root.innerHTML = homepageData.work.map((item) => `
    <article class="card reveal">
      <p class="card-meta">${item.meta}</p>
      <h3>${item.title}</h3>
      <p class="card-text">${item.text}</p>
      <p class="card-detail"><strong>Technical differentiator:</strong> ${item.detail}</p>
      <div class="card-actions">
        <a class="button button-primary" href="${item.primaryHref}" ${item.primaryHref.startsWith("http") ? 'target="_blank" rel="noreferrer"' : ""}>${item.primaryLabel}</a>
        <a class="text-link" href="${item.secondaryHref}" ${item.secondaryHref.startsWith("http") ? 'target="_blank" rel="noreferrer"' : ""}>${item.secondaryLabel}</a>
      </div>
    </article>
  `).join("");
}

function renderWriting() {
  const root = document.getElementById("writing-grid");
  if (!root) return;

  root.innerHTML = homepageData.writing.map((item) => `
    <article class="card writing-card reveal">
      <h3>${item.title}</h3>
      <p class="card-text">${item.text}</p>
      <div class="card-actions">
        <a class="text-link" href="${item.href}">Read essay</a>
      </div>
    </article>
  `).join("");
}

function renderPatents() {
  const statsRoot = document.getElementById("patent-stats");
  const listRoot = document.getElementById("patent-list");
  if (statsRoot) {
    statsRoot.innerHTML = homepageData.patentStats.map((item) => `
      <div class="stat">
        <span class="stat-value">${item.value}</span>
        <span class="stat-label">${item.label}</span>
      </div>
    `).join("");
  }

  if (listRoot) {
    listRoot.innerHTML = homepageData.patents.map((item) => `
      <article class="patent-item">
        <p>${item.id}</p>
        <h3>${item.title}</h3>
        <a href="${item.href}">Open entry</a>
      </article>
    `).join("");
  }
}

function updateHeaderState() {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 10);
}

function initNav() {
  if (!navToggle || !navMenu) return;

  navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("nav-open", isOpen);
  });

  [...navMenu.querySelectorAll("a")].forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("nav-open");
    });
  });
}

function initSectionTracking() {
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const activeId = `#${entry.target.id}`;
      navLinks.forEach((link) => {
        const isActive = link.getAttribute("href") === activeId;
        link.classList.toggle("is-active", isActive);
        if (isActive) {
          link.setAttribute("aria-current", "page");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    });
  }, {
    rootMargin: "-40% 0px -45% 0px",
    threshold: 0.1
  });

  sections.forEach((section) => observer.observe(section));
}

function initReveal() {
  const revealItems = document.querySelectorAll(".reveal");
  if (!revealItems.length) return;

  if (prefersReducedMotion) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries, instance) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      instance.unobserve(entry.target);
    });
  }, {
    threshold: 0.12,
    rootMargin: "0px 0px -8% 0px"
  });

  revealItems.forEach((item) => observer.observe(item));
}

renderWork();
renderWriting();
renderPatents();
updateHeaderState();
initNav();
initSectionTracking();
initReveal();

window.addEventListener("scroll", updateHeaderState, { passive: true });
