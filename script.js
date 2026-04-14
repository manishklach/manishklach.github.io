document.documentElement.classList.add("js");

const portfolioData = {
  flagship: [
    {
      title: "Context Region Orchestration",
      category: "Inference orchestration",
      description: "A long-context control model built around region-aware attention, staged residency, predictive prefetch, and coherence discipline.",
      insight: "Treats context as a managed systems resource instead of a flat prompt buffer.",
      primaryLabel: "Open microsite",
      primaryHref: "https://manishklach.github.io/predictive-context-region-orchestration-patent-site/",
      secondaryLabel: "View patent filing",
      secondaryHref: "patents/202641041011-deterministic-staged-context-orchestration.html"
    },
    {
      title: "WDC-Engine",
      category: "Agent runtime architecture",
      description: "A systems proposal for semantic deduplication and shared execution across agent-generated enterprise work, with bounded admission and execution reuse.",
      insight: "Moves duplicate work elimination into the runtime layer, where coordination actually has leverage.",
      primaryLabel: "Open microsite",
      primaryHref: "https://manishklach.github.io/wdc-engine-patent-site/",
      secondaryLabel: "Read related essay",
      secondaryHref: "writings/local-agent-deduplication-middleware.html"
    },
    {
      title: "SRMIC",
      category: "Memory-centric accelerator concept",
      description: "A residency-first inference architecture that rethinks decode-path efficiency through SRAM locality, fabric design, and explicit movement policy.",
      insight: "Starts from byte movement and on-chip residency rather than from raw FLOPS.",
      primaryLabel: "View repository",
      primaryHref: "https://github.com/manishklach/SRMIC_X1",
      secondaryLabel: "Read essay",
      secondaryHref: "writings/srmic-x1-rethinking-memory-hierarchy-llm-decode.html"
    },
    {
      title: "PMPP CUDA Study",
      category: "GPU systems study library",
      description: "A disciplined CUDA study surface with more than 150 examples, notes, and optimization-oriented walkthroughs built around practical GPU understanding.",
      insight: "Turns a study archive into a reusable technical reference instead of a private notebook.",
      primaryLabel: "Open site",
      primaryHref: "https://manishklach.github.io/pmpp-cuda-study/",
      secondaryLabel: "View repository",
      secondaryHref: "https://github.com/manishklach/pmpp-cuda-study"
    },
    {
      title: "ChromeLens",
      category: "Systems-grade tooling",
      description: "A performance telemetry toolchain using Chrome DevTools Protocol tracing to extract bottlenecks from large web surfaces with systems-level discipline.",
      insight: "Frames web performance as observability and execution analysis, not just frontend tuning.",
      primaryLabel: "Read launch essay",
      primaryHref: "writings/introducing-chromelens-systems-grade-web-performance-telemetry.html",
      secondaryLabel: "View repository",
      secondaryHref: "https://github.com/manishklach/chromelens"
    },
    {
      title: "Mobile Agent Control",
      category: "Operator control plane",
      description: "A vendor-neutral mobile control surface for terminal-native coding agents, designed as an operational layer rather than a novelty wrapper.",
      insight: "Treats agent interaction as a control-plane problem with portability and operator clarity.",
      primaryLabel: "Open site",
      primaryHref: "https://manishklach.github.io/mobile-agent-control/",
      secondaryLabel: "Read essay",
      secondaryHref: "writings/mobile-agent-control-vendor-neutral-control-plane-terminal-native-coding-agents.html"
    }
  ],
  writings: [
    {
      title: "Why AI needs a new memory hierarchy, not just bigger caches",
      type: "Memory systems essay",
      summary: "A clean argument for why inference bottlenecks are moving toward byte movement, residency policy, and hierarchy design.",
      href: "writings/why-ai-needs-a-new-memory-hierarchy-not-just-bigger-caches.html"
    },
    {
      title: "The memory scheduler is the new critical path in AI inference",
      type: "Inference systems essay",
      summary: "An architectural view of scheduling, movement policy, and the hidden control loop behind large-model serving.",
      href: "writings/the-memory-scheduler-is-the-new-critical-path-in-ai-inference.html"
    },
    {
      title: "Stopping local agents from doing the same work twice",
      type: "Runtime essay",
      summary: "A runtime-level explanation of shared execution, admission windows, and deduplication in local multi-agent systems.",
      href: "writings/local-agent-deduplication-middleware.html"
    },
    {
      title: "Hardware-enforced on-chip memory residency",
      type: "Accelerator essay",
      summary: "A long-form piece on explicit bind-release semantics, wired residency, and what an actual hardware primitive could change.",
      href: "writings/hardware-enforced-on-chip-memory-residency.html"
    },
    {
      title: "Introducing ChromeLens",
      type: "Tooling essay",
      summary: "A launch essay for a telemetry and tracing surface that treats browser performance as an engineering systems problem.",
      href: "writings/introducing-chromelens-systems-grade-web-performance-telemetry.html"
    }
  ],
  patents: {
    stats: [
      { value: "52", label: "U.S. patents and applications" },
      { value: "22", label: "India filings in 2026" },
      { value: "61+", label: "Total applications and patents surfaced here" }
    ],
    india: [
      {
        meta: "202641043359",
        title: "Hardware-enforced wired on-chip volatile memory residency with explicit bind-release semantics",
        href: "patents/202641043359-wired-on-chip-memory-residency.html"
      },
      {
        meta: "202641042337",
        title: "Semantic deduplication and shared execution of agent-generated enterprise tasks",
        href: "patents/202641042337-semantic-deduplication-enterprise-tasks.html"
      },
      {
        meta: "202641041011",
        title: "Deterministic staged context orchestration for large-scale multimodal AI reasoning systems",
        href: "patents/202641041011-deterministic-staged-context-orchestration.html"
      },
      {
        meta: "202641038857",
        title: "Predictive multi-tier weight residency for large-scale transformer inference",
        href: "patents/202641038857-predictive-multi-tier-weight-residency.html"
      }
    ],
    us: [
      {
        meta: "US 10,698,310 B2",
        title: "Regional device profiling systems",
        href: "patents.html#us-patents"
      },
      {
        meta: "US 10,643,638 B2",
        title: "Remote capture of live session interactions",
        href: "patents.html#us-patents"
      },
      {
        meta: "US 10,476,140 B2",
        title: "Distributed real-device performance testing",
        href: "patents.html#us-patents"
      },
      {
        meta: "US 10,245,771 B2",
        title: "Multi-tenant mobile-device session isolation architectures",
        href: "patents.html#us-patents"
      }
    ]
  },
  repositories: [
    {
      title: "vOrchestrate",
      meta: "Python · AI infrastructure · Runtime control",
      summary: "Predictive multi-tier weight residency orchestration for transformer inference with state-aware scoring and asynchronous prefetch logic.",
      why: "Public repo form of a larger memory-policy argument: orchestration belongs in the runtime, not as an afterthought.",
      href: "https://github.com/manishklach/vorchestrate"
    },
    {
      title: "MHC Atlas OS",
      meta: "Python · Technical platform · Explainability",
      summary: "A structure-guided prioritization platform built around readable outputs, policy-aware workflows, and explainable decision surfaces.",
      why: "Shows that technical rigor and interpretability can coexist in a product-grade surface.",
      href: "https://github.com/manishklach/alphafold-mhc-atlas"
    },
    {
      title: "ChromeLens",
      meta: "JavaScript · Tooling · Performance telemetry",
      summary: "Tracing-driven performance analysis for large web systems, leaning on automation instead of manual browser archaeology.",
      why: "Makes runtime performance legible at the systems layer, not just at the page layer.",
      href: "https://github.com/manishklach/chromelens"
    },
    {
      title: "PMPP CUDA Study",
      meta: "CUDA · Study surface · GPU systems",
      summary: "A curated body of CUDA examples and notes built to compound into working intuition about GPU execution.",
      why: "Useful because it turns learning into a public technical asset with structure and reuse.",
      href: "https://github.com/manishklach/pmpp-cuda-study"
    }
  ],
  lens: [
    {
      title: "Board bring-up and firmware paths",
      body: "The habit of reasoning from initialization order, hardware state, and failure boundaries still informs the higher layers."
    },
    {
      title: "Runtime and memory policy",
      body: "Inference systems are treated as coordinated state machines with explicit movement costs, not as abstract API calls."
    },
    {
      title: "AI infrastructure and control surfaces",
      body: "The work tends to converge on orchestration, scheduler behavior, reliability, and technical surfaces that expose real control."
    },
    {
      title: "Invention as systems work",
      body: "Patent work is approached as serious architecture thinking: constraints, mechanisms, and operating models made explicit."
    }
  ]
};

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const header = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-menu a");
const sections = document.querySelectorAll("main section[id]");

function renderFlagship() {
  const root = document.getElementById("flagship-grid");
  if (!root) return;

  root.innerHTML = portfolioData.flagship.map((item) => `
    <article class="flagship-card reveal">
      <div class="flagship-inner">
        <div class="card-head">
          <div>
            <p class="card-kicker">${item.category}</p>
            <h3 class="card-title">${item.title}</h3>
          </div>
        </div>
        <p class="card-description">${item.description}</p>
        <p class="card-insight"><strong>Key insight:</strong> ${item.insight}</p>
        <div class="card-actions">
          <a class="button button-primary" href="${item.primaryHref}" ${item.primaryHref.startsWith("http") ? 'target="_blank" rel="noreferrer"' : ""}>${item.primaryLabel}</a>
          <a class="text-link" href="${item.secondaryHref}" ${item.secondaryHref.startsWith("http") ? 'target="_blank" rel="noreferrer"' : ""}>${item.secondaryLabel}</a>
        </div>
      </div>
    </article>
  `).join("");
}

function renderWritings() {
  const root = document.getElementById("writing-grid");
  if (!root) return;

  root.innerHTML = portfolioData.writings.map((item) => `
    <article class="essay-card reveal">
      <div class="essay-inner">
        <p class="card-kicker">${item.type}</p>
        <h3 class="essay-title">${item.title}</h3>
        <p class="essay-summary">${item.summary}</p>
        <div class="essay-footer">
          <span class="essay-type">Essay</span>
          <a class="text-link" href="${item.href}">Read</a>
        </div>
      </div>
    </article>
  `).join("");
}

function renderPatentRecord() {
  const statRoot = document.getElementById("patent-stats");
  const indiaRoot = document.getElementById("patent-india-list");
  const usRoot = document.getElementById("patent-us-list");

  if (statRoot) {
    statRoot.innerHTML = portfolioData.patents.stats.map((item) => `
      <div class="patent-stat">
        <span class="patent-stat-value">${item.value}</span>
        <span class="patent-stat-label">${item.label}</span>
      </div>
    `).join("");
  }

  const patentTemplate = (item) => `
    <article class="patent-item">
      <p class="patent-item-meta">${item.meta}</p>
      <h4 class="patent-item-title">${item.title}</h4>
      <a href="${item.href}">Open entry</a>
    </article>
  `;

  if (indiaRoot) {
    indiaRoot.innerHTML = portfolioData.patents.india.map(patentTemplate).join("");
  }

  if (usRoot) {
    usRoot.innerHTML = portfolioData.patents.us.map(patentTemplate).join("");
  }
}

function renderRepositories() {
  const root = document.getElementById("repo-grid");
  if (!root) return;

  root.innerHTML = portfolioData.repositories.map((item) => `
    <article class="repo-card reveal">
      <div class="repo-inner">
        <p class="repo-meta">${item.meta}</p>
        <h3 class="repo-title">${item.title}</h3>
        <p class="repo-summary">${item.summary}</p>
        <p class="repo-why"><strong>Why it matters:</strong> ${item.why}</p>
        <div class="card-actions">
          <a class="text-link" href="${item.href}" target="_blank" rel="noreferrer">View repository</a>
        </div>
      </div>
    </article>
  `).join("");
}

function renderLens() {
  const root = document.getElementById("lens-steps");
  if (!root) return;

  root.innerHTML = portfolioData.lens.map((item) => `
    <article class="lens-step">
      <strong>${item.title}</strong>
      <p>${item.body}</p>
    </article>
  `).join("");
}

function updateHeaderState() {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 12);
}

function initNav() {
  if (!navToggle || !navMenu) return;

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

function initActiveSectionTracking() {
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const activeId = entry.target.getAttribute("id");
      navLinks.forEach((link) => {
        const matches = link.getAttribute("href") === `#${activeId}`;
        link.classList.toggle("is-active", matches);
        if (matches) {
          link.setAttribute("aria-current", "page");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    });
  }, {
    rootMargin: "-35% 0px -50% 0px",
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
    rootMargin: "0px 0px -6% 0px"
  });

  revealItems.forEach((item) => observer.observe(item));
}

renderFlagship();
renderWritings();
renderPatentRecord();
renderRepositories();
renderLens();
updateHeaderState();
initNav();
initActiveSectionTracking();
initReveal();

window.addEventListener("scroll", updateHeaderState, { passive: true });
