/* Dance & Joy Studio — small interactions. No libraries. */
(function () {
  "use strict";

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.documentElement.classList.add("js");

  var nav = document.querySelector(".nav");
  var toggle = document.querySelector(".nav-toggle");
  var panel = document.getElementById("site-menu");

  function closeMenu() {
    if (!panel || !toggle) return;
    panel.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
  }

  function openMenu() {
    panel.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Close menu");
    var first = panel.querySelector("a");
    if (first) first.focus();
  }

  if (toggle && panel) {
    toggle.addEventListener("click", function () {
      if (panel.classList.contains("is-open")) closeMenu();
      else openMenu();
    });
    panel.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        closeMenu();
        closeLightbox();
      }
    });
    document.addEventListener("click", function (event) {
      if (!panel.classList.contains("is-open")) return;
      if (panel.contains(event.target) || toggle.contains(event.target)) return;
      closeMenu();
    });
  }

  var onScroll = function () {
    if (!nav) return;
    nav.classList.toggle("is-scrolled", window.scrollY > 8);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* Scroll spy */
  var spyLinks = Array.prototype.slice.call(document.querySelectorAll(".nav-panel a[href^='#']"));
  var spySections = spyLinks.map(function (link) {
    return document.querySelector(link.getAttribute("href"));
  }).filter(Boolean);

  if ("IntersectionObserver" in window && spySections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        spyLinks.forEach(function (link) {
          var on = link.getAttribute("href") === "#" + entry.target.id;
          if (on) link.setAttribute("aria-current", "true");
          else link.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0.01 });
    spySections.forEach(function (section) { spy.observe(section); });
  }

  /* Reveal + counters, once */
  var revealNodes = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
  if (!reduce && "IntersectionObserver" in window) {
    var revealObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("in");
        revealObs.unobserve(entry.target);
      });
    }, { threshold: 0.16 });
    revealNodes.forEach(function (node) { revealObs.observe(node); });
  } else {
    revealNodes.forEach(function (node) { node.classList.add("in"); });
  }

  var counted = false;
  var statSection = document.getElementById("stats");
  function runCounters() {
    if (counted) return;
    counted = true;
    Array.prototype.forEach.call(document.querySelectorAll("[data-count]"), function (el) {
      var target = parseFloat(el.getAttribute("data-count"));
      var decimals = parseInt(el.getAttribute("data-decimals") || "0", 10);
      var suffix = el.getAttribute("data-suffix") || "";
      if (reduce) {
        el.textContent = target.toFixed(decimals) + suffix;
        return;
      }
      var start = performance.now();
      var duration = 1100;
      function frame(now) {
        var t = Math.min(1, (now - start) / duration);
        var eased = 1 - Math.pow(1 - t, 3);
        el.textContent = (target * eased).toFixed(decimals) + suffix;
        if (t < 1) requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    });
  }
  if (statSection && "IntersectionObserver" in window) {
    var statObs = new IntersectionObserver(function (entries) {
      if (entries.some(function (entry) { return entry.isIntersecting; })) {
        runCounters();
        statObs.disconnect();
      }
    }, { threshold: 0.4 });
    statObs.observe(statSection);
  } else {
    runCounters();
  }

  /* FAQ */
  Array.prototype.forEach.call(document.querySelectorAll(".faq-item button"), function (button) {
    button.addEventListener("click", function () {
      var panel = document.getElementById(button.getAttribute("aria-controls"));
      var open = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", open ? "false" : "true");
      if (panel) panel.hidden = open;
    });
  });

  /* Reviews carousel */
  var slides = Array.prototype.slice.call(document.querySelectorAll(".slide"));
  var dots = Array.prototype.slice.call(document.querySelectorAll(".dots button"));
  var reviewIndex = 0;
  var reviewTimer = 0;

  function showReview(index) {
    if (!slides.length) return;
    reviewIndex = (index + slides.length) % slides.length;
    slides.forEach(function (slide, i) {
      var on = i === reviewIndex;
      slide.hidden = !on;
      slide.setAttribute("aria-hidden", on ? "false" : "true");
    });
    dots.forEach(function (dot, i) {
      if (i === reviewIndex) dot.setAttribute("aria-current", "true");
      else dot.removeAttribute("aria-current");
    });
  }

  function queueReview() {
    if (reduce || slides.length < 2) return;
    window.clearInterval(reviewTimer);
    reviewTimer = window.setInterval(function () {
      if (document.hidden) return;
      showReview(reviewIndex + 1);
    }, 7000);
  }

  if (slides.length) {
    showReview(0);
    var prev = document.querySelector("[data-review='prev']");
    var next = document.querySelector("[data-review='next']");
    if (prev) prev.addEventListener("click", function () { showReview(reviewIndex - 1); queueReview(); });
    if (next) next.addEventListener("click", function () { showReview(reviewIndex + 1); queueReview(); });
    dots.forEach(function (dot, i) {
      dot.addEventListener("click", function () { showReview(i); queueReview(); });
    });
    var carousel = document.querySelector(".carousel");
    if (carousel) {
      carousel.addEventListener("mouseenter", function () { window.clearInterval(reviewTimer); });
      carousel.addEventListener("mouseleave", queueReview);
      carousel.addEventListener("focusin", function () { window.clearInterval(reviewTimer); });
      carousel.addEventListener("focusout", queueReview);
    }
    queueReview();
  }

  /* Lightbox */
  var lightbox = document.getElementById("lightbox");
  var lightboxImg = document.getElementById("lightbox-img");
  var lightboxCap = document.getElementById("lightbox-cap");
  var lightboxPanel = document.getElementById("lightbox-panel");
  var lightboxClose = document.querySelector(".lightbox-close");
  var lastFocus = null;

  function closeLightbox() {
    if (!lightbox || lightbox.hidden) return;
    lightbox.hidden = true;
    document.body.style.overflow = "";
    if (lightboxImg) {
      lightboxImg.removeAttribute("src");
      lightboxImg.alt = "";
    }
    if (lastFocus) lastFocus.focus();
  }

  function openLightbox(trigger) {
    if (!lightbox) return;
    lastFocus = trigger;
    var isVideo = trigger.hasAttribute("data-video-placeholder");
    if (isVideo) {
      lightboxImg.hidden = true;
      lightboxPanel.hidden = false;
      lightboxCap.textContent = "";
    } else {
      lightboxPanel.hidden = true;
      lightboxImg.hidden = false;
      lightboxImg.src = trigger.getAttribute("data-full");
      lightboxImg.alt = trigger.getAttribute("data-alt") || "";
      lightboxCap.textContent = trigger.getAttribute("data-caption") || "";
    }
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
    if (lightboxClose) lightboxClose.focus();
  }

  Array.prototype.forEach.call(document.querySelectorAll("[data-full], [data-video-placeholder]"), function (button) {
    button.addEventListener("click", function () { openLightbox(button); });
  });

  if (lightbox) {
    lightbox.addEventListener("click", function (event) {
      if (event.target === lightbox) closeLightbox();
    });
  }
  if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);

  /* Enquiry form → WhatsApp. Does not send by itself. */
  var form = document.getElementById("enquiry-form");
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var error = document.getElementById("form-error");
      var fallback = document.getElementById("form-fallback");
      var name = form.name.value.trim();
      var age = form.age.value.trim();
      var style = form.style.value.trim();
      var phone = form.phone.value.trim();
      if (fallback) fallback.hidden = true;
      if (!name || !age || !style || !phone) {
        if (error) error.textContent = "Please add a name, age, dance style and phone number.";
        return;
      }
      if (error) error.textContent = "";
      var message = [
        "Hi DJS, I'd like to know about dance classes.",
        "Name: " + name,
        "Age of student: " + age,
        "Dance style: " + style,
        "Phone: " + phone
      ].join("\n");
      var url = "https://wa.me/919206710049?text=" + encodeURIComponent(message);
      var opened = window.open(url, "_blank", "noopener,noreferrer");
      if (!opened && fallback) {
        fallback.hidden = false;
        fallback.href = url;
      }
    });
  }
})();
