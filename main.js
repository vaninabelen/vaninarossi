let currentLang = "en";

function setLang(lang) {
  currentLang = lang;
  document.body.className = lang === "es" ? "lang-es" : "";
  document.documentElement.lang = lang;
  document.querySelectorAll(".lang-opt").forEach(function (b) {
    var isActive = b.getAttribute("data-lang-val") === lang;
    b.classList.toggle("active", isActive);
    b.setAttribute("aria-pressed", String(isActive));
  });
}

function toggleMenu() {
  var n = document.getElementById("nav-links"),
    b = document.querySelector(".menu-toggle"),
    o = n.classList.toggle("open");
  b.setAttribute("aria-expanded", String(o));
  b.setAttribute("aria-label", o ? "Close menu" : "Open menu");
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

window.addEventListener("scroll", function () {
  document.getElementById("toTop").classList.toggle("visible", window.scrollY > 600);
});
