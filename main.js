function toggleMenu() {
  var n = document.getElementById("nav-links"),
    b = document.querySelector(".menu-toggle"),
    o = n.classList.toggle("open");
  b.setAttribute("aria-expanded", String(o));
  b.setAttribute("aria-label", o ? b.dataset.labelClose : b.dataset.labelOpen);
  b.innerHTML = o
    ? '<svg viewBox="0 0 24 24" fill="none" stroke-linecap="round"><line x1="6" y1="6" x2="18" y2="18"/><line x1="6" y1="18" x2="18" y2="6"/></svg>'
    : '<svg viewBox="0 0 24 24" fill="none" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';
}

document.querySelectorAll("#nav-links a").forEach(function (a) {
  a.addEventListener("click", function () {
    document.getElementById("nav-links").classList.remove("open");
    document.querySelector(".menu-toggle").setAttribute("aria-expanded", "false");
  });
});

// ─── Smooth scroll + hero pin animation ────────────────────────────────────
var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
var lenis = null;

if (!prefersReducedMotion && typeof Lenis !== "undefined" && typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);

  // Lenis for premium-feel smooth scroll
  lenis = new Lenis({
    duration: 1.2,
    easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
    smoothWheel: true,
  });

  // Keep ScrollTrigger in sync with Lenis virtual scroll position
  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add(function (time) {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  // Hero: pin in place while content scales down and fades out
  gsap.to(".hero-content", {
    opacity: 0,
    scale: 0.9,
    y: -24,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "+=85%",   // pin lasts for 85% of a viewport height of scroll
      scrub: 1.5,
      pin: true,
      pinSpacing: true,
    },
  });
}

// ─── Back to top ──────────────────────────────────────────────────────────
function updateToTop(scrollY) {
  document.getElementById("toTop").classList.toggle("visible", scrollY > 600);
}

if (lenis) {
  lenis.on("scroll", function (e) { updateToTop(e.scroll); });
} else {
  window.addEventListener("scroll", function () { updateToTop(window.scrollY); });
}

// ─── GA4 custom events ────────────────────────────────────────────────────
if (typeof gtag === "function") {
  document.querySelectorAll('a[href="#contact"], a[href*="linkedin"], a[href*="mailto"]').forEach(function (el) {
    el.addEventListener("click", function () {
      gtag("event", "cta_click", {
        link_text: el.textContent.trim(),
        link_url: el.href,
      });
    });
  });

  document.querySelectorAll(".lang-link").forEach(function (el) {
    el.addEventListener("click", function () {
      gtag("event", "language_switch", { target_lang: el.textContent.trim() });
    });
  });

  var sectionObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        gtag("event", "section_view", { section_id: entry.target.id });
        sectionObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  ["about", "experience", "contact"].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) sectionObserver.observe(el);
  });
}
