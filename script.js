(function () {
  "use strict";

  // Mobile hamburger nav
  var hamburger = document.getElementById("hamburgerBtn");
  var mobileNav = document.getElementById("mobileNav");

  function closeNav() {
    mobileNav.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
  }

  if (hamburger && mobileNav) {
    hamburger.addEventListener("click", function () {
      var isOpen = mobileNav.classList.toggle("open");
      hamburger.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    mobileNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeNav);
    });

    document.addEventListener("click", function (e) {
      if (!mobileNav.contains(e.target) && !hamburger.contains(e.target)) {
        closeNav();
      }
    });

    window.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeNav();
    });
  }

  // Sticky header shadow on scroll
  var header = document.getElementById("siteHeader");
  var lastScroll = 0;
  window.addEventListener("scroll", function () {
    var y = window.scrollY;
    if (header) {
      header.style.boxShadow = y > 8 ? "0 4px 20px rgba(11,42,74,0.1)" : "none";
    }
    lastScroll = y;
  }, { passive: true });

  // Scroll reveal animations
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });

    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in-view"); });
  }

})();
