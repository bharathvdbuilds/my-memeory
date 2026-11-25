(function () {
  "use strict";

  var site = window.SITE;
  var root = document.getElementById("app");

  if (!site || !root) {
    if (root) {
      root.innerHTML = "<main class='shell noscript'><p>This page could not load <code>site.config.js</code>. Copy a file from <code>presets/</code> to <code>site.config.js</code> and refresh.</p></main>";
    }
    return;
  }

  function esc(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function safeUrl(url) {
    var u = String(url || "").trim();
    if (!u) return "";
    if (/^javascript:/i.test(u) || /^data:/i.test(u) || /^vbscript:/i.test(u)) return "";
    if (/^(https?:|mailto:|tel:|\/|#)/i.test(u)) return u;
    return "";
  }

  function safeEmbed(url) {
    var u = safeUrl(url);
    if (!u) return "";
    try {
      var parsed = new URL(u, window.location.href);
      var host = parsed.hostname.replace(/^www\./, "");
      if (parsed.protocol !== "https:" && parsed.protocol !== "http:") return "";
      if (host === "google.com" || host === "google.co.in" || host === "maps.google.com" || host === "maps.google.co.in" || host === "openstreetmap.org") return u;
      return "";
    } catch (err) {
      return "";
    }
  }

  function text(path, fallback) {
    var cur = site;
    var parts = path.split(".");
    for (var i = 0; i < parts.length; i++) {
      if (cur == null) return fallback == null ? "" : fallback;
      cur = cur[parts[i]];
    }
    return cur == null ? (fallback == null ? "" : fallback) : cur;
  }

  function arr(value) {
    return Array.isArray(value) ? value : [];
  }

  function digits(value) {
    return String(value || "").replace(/\D/g, "");
  }

  function telHref() {
    var n = text("phone");
    if (!n) return "";
    return n.indexOf("tel:") === 0 ? n : "tel:" + n.replace(/\s/g, "");
  }

  function waHref(message) {
    var num = digits(text("whatsapp") || text("phone"));
    if (!num) return "";
    var msg = message || text("cta.whatsappMessage", "Hello, I found your website and would like to enquire.");
    return "https://wa.me/" + num + "?text=" + encodeURIComponent(msg);
  }

  function icon(name) {
    var icons = {
      spine: '<path d="M12 3v18"/><circle cx="12" cy="6" r="1.4"/><circle cx="12" cy="10" r="1.4"/><circle cx="12" cy="14" r="1.4"/><circle cx="12" cy="18" r="1.4"/><path d="M9 8h6M8 12h8M9 16h6"/>',
      shoulder: '<path d="M4 16c2-6 5-9 8-9s6 3 8 9"/><circle cx="12" cy="6" r="2"/>',
      knee: '<path d="M10 3v8c0 2 1 3 2 5v5"/><path d="M14 3v8c0 2-1 3-2 5"/><path d="M8 11h8"/>',
      home: '<path d="M4 11.5 12 5l8 6.5"/><path d="M6 10.5V19h12v-8.5"/>',
      cut: '<circle cx="6.5" cy="7" r="2.5"/><circle cx="6.5" cy="17" r="2.5"/><path d="M9 8.5 20 19M9 15.5 20 5"/>',
      spark: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18"/>',
      flower: '<circle cx="12" cy="12" r="2"/><path d="M12 5c2 2 2 5 0 7-2-2-2-5 0-7zM19 12c-2 2-5 2-7 0 2-2 5-2 7 0zM12 19c-2-2-2-5 0-7 2 2 2 5 0 7zM5 12c2-2 5-2 7 0-2 2-5 2-7 0z"/>',
      spa: '<path d="M12 20c4-4 6-8 6-11a6 6 0 1 0-12 0c0 3 2 7 6 11z"/><path d="M12 9v0"/>',
      utensil: '<path d="M7 3v8c0 1.2.8 2 2 2v8"/><path d="M5.5 3c0 3 0 5 1.5 8M8.5 3c0 3 0 5-1.5 8"/><path d="M16 3v18M16 3c2.4 0 3.5 2 3.5 4.5S18.4 12 16 12"/>',
      coffee: '<path d="M6 8h10v6a4 4 0 0 1-4 4H10a4 4 0 0 1-4-4V8z"/><path d="M16 9h1.5a2.5 2.5 0 0 1 0 5H16"/><path d="M8 20h8"/><path d="M9 4c0 1 .5 1.5.5 2.2S9 7.5 9 8M12 4c0 1 .5 1.5.5 2.2S12 7.5 12 8"/>',
      leaf: '<path d="M5 19c8-1 13-7 14-15-8 1-14 7-14 15z"/><path d="M8 16c2-3 5-6 9-8"/>',
      star: '<path d="m12 3 2.4 6.6H21l-5.3 4.1 2 6.8L12 16.8 6.3 20.5l2-6.8L3 9.6h6.6z"/>',
      heart: '<path d="M12 19s-7-4.4-7-9a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 4.6-7 9-7 9z"/>',
      pin: '<path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z"/><circle cx="12" cy="10" r="2.2"/>',
      clock: '<circle cx="12" cy="12" r="8"/><path d="M12 8v5l3 2"/>'
    };
    var path = icons[name] || icons.star;
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + path + "</svg>";
  }

  function phoneIcon() {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6.5 3.8h3.2l1.2 3.2-2 1.4a12.5 12.5 0 0 0 6.7 6.7l1.4-2 3.2 1.2v3.2c0 .7-.6 1.3-1.3 1.3C10.4 19 5 13.6 5 7.1c0-.7.6-1.3 1.5-1.3z"/></svg>';
  }

  function waIcon() {
    return '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19.05 4.91A9.9 9.9 0 0 0 12.04 2C6.5 2 2 6.48 2 12.02c0 1.77.46 3.5 1.34 5.02L2 22l5.1-1.33A10 10 0 0 0 12.04 22c5.53 0 10.04-4.48 10.04-10.02 0-2.67-1.04-5.18-2.99-7.07zM12.04 20.15c-1.5 0-2.97-.4-4.25-1.16l-.3-.18-3.03.8.81-2.95-.2-.3A8.13 8.13 0 0 1 3.9 12.02c0-4.49 3.66-8.14 8.14-8.14 2.17 0 4.22.85 5.76 2.38a8.1 8.1 0 0 1 2.38 5.76c0 4.49-3.66 8.13-8.14 8.13zm4.47-6.1c-.24-.12-1.44-.71-1.66-.79-.22-.08-.38-.12-.54.12-.16.24-.62.79-.76.95-.14.16-.28.18-.52.06-.24-.12-1.02-.37-1.94-1.2-.72-.64-1.2-1.43-1.34-1.67-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.48-.4-.4-.54-.41h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.69 2.58 4.1 3.62.57.25 1.02.4 1.37.51.57.18 1.1.16 1.51.1.46-.07 1.44-.59 1.64-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28z"/></svg>';
  }

  function setMeta(selector, attr, value) {
    if (!value) return;
    var el = document.head.querySelector(selector);
    if (!el && attr) {
      el = document.createElement("meta");
      if (selector.indexOf('property=') !== -1) el.setAttribute("property", selector.replace(/.*property="([^"]+)".*/, "$1"));
      else if (selector.indexOf('name=') !== -1) el.setAttribute("name", selector.replace(/.*name="([^"]+)".*/, "$1"));
      document.head.appendChild(el);
    }
    if (el) el.setAttribute(attr, value);
  }

  function applyTheme() {
    var c = site.colors || {};
    var map = {
      bg: "bg",
      bgAlt: "bg-alt",
      card: "card",
      ink: "ink",
      muted: "muted",
      brand: "brand",
      brandHover: "brand-hover",
      brandSoft: "brand-soft",
      accent: "accent",
      accentInk: "accent-ink",
      line: "line",
      invert: "invert",
      footer: "footer",
      footerInk: "footer-ink"
    };
    var rootStyle = document.documentElement.style;
    Object.keys(map).forEach(function (key) {
      if (c[key]) rootStyle.setProperty("--" + map[key], c[key]);
    });
    if (c.brand && !c.brandHover) {
      rootStyle.setProperty("--brand-hover", c.brand);
    }
    var heading = text("fonts.heading");
    var body = text("fonts.body");
    if (heading) rootStyle.setProperty("--font-heading", '"' + heading.replace(/"/g, "") + '", "Iowan Old Style", Georgia, serif');
    if (body) rootStyle.setProperty("--font-body", '"' + body.replace(/"/g, "") + '", "Segoe UI", system-ui, sans-serif');

    if (heading || body) {
      var family = [];
      var optical = /^(Fraunces|Recursive|Roboto Flex)$/i;
      if (heading) {
        if (optical.test(heading)) {
          family.push("family=" + encodeURIComponent(heading) + ":opsz,wght@9..144,560;9..144,700");
        } else {
          family.push("family=" + encodeURIComponent(heading) + ":wght@500;600;700");
        }
      }
      if (body) family.push("family=" + encodeURIComponent(body) + ":wght@400;500;600;700");
      var href = "https://fonts.googleapis.com/css2?" + family.join("&") + "&display=swap";
      var existing = document.querySelector('link[data-site-fonts="true"]');
      if (!existing) {
        existing = document.createElement("link");
        existing.rel = "stylesheet";
        existing.setAttribute("data-site-fonts", "true");
        document.head.appendChild(existing);
      }
      existing.href = href;
    }
  }

  function applyHead() {
    var title = text("title") || (text("name") + (text("tagline") ? " | " + text("tagline") : ""));
    var desc = text("description");
    var url = text("url") || (window.location.origin + window.location.pathname);
    var image = text("ogImage") || text("hero.image") || "";
    var locale = text("locale", "en_IN");
    var theme = text("themeColor") || (site.colors && site.colors.ink) || "#102A43";

    document.title = title;
    document.documentElement.lang = text("lang", "en-IN");
    setMeta('meta[name="description"]', "content", desc);
    setMeta('meta[name="theme-color"]', "content", theme);
    setMeta('meta[name="author"]', "content", text("name"));
    setMeta('meta[property="og:title"]', "content", title);
    setMeta('meta[property="og:description"]', "content", desc);
    setMeta('meta[property="og:url"]', "content", url);
    setMeta('meta[property="og:site_name"]', "content", text("name"));
    setMeta('meta[property="og:locale"]', "content", locale);
    setMeta('meta[property="og:type"]', "content", "website");
    if (image) {
      setMeta('meta[property="og:image"]', "content", image);
      setMeta('meta[name="twitter:image"]', "content", image);
    }
    setMeta('meta[name="twitter:card"]', "content", "summary_large_image");
    setMeta('meta[name="twitter:title"]', "content", title);
    setMeta('meta[name="twitter:description"]', "content", desc);

    var canonical = document.querySelector('link[rel="canonical"]');
    if (canonical && url) canonical.setAttribute("href", url);

    var old = document.getElementById("site-jsonld");
    if (old) old.remove();
    var script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "site-jsonld";
    script.textContent = JSON.stringify(buildSchema(url, image, title, desc));
    document.head.appendChild(script);
  }

  function buildSchema(url, image, title, desc) {
    var type = text("schemaType", "LocalBusiness");
    var address = site.address || {};
    var data = {
      "@context": "https://schema.org",
      "@type": type,
      name: text("name"),
      description: desc,
      url: url,
      telephone: text("phone"),
      image: image ? [image] : undefined,
      priceRange: text("priceRange") || undefined,
      address: {
        "@type": "PostalAddress",
        streetAddress: address.street,
        addressLocality: address.locality,
        addressRegion: address.region,
        postalCode: address.postalCode,
        addressCountry: address.country || "IN"
      },
      areaServed: text("areaServed") || undefined
    };
    if (text("email")) data.email = text("email");
    if (site.geo && site.geo.lat && site.geo.lng) {
      data.geo = { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng };
    }
    var hours = arr(site.hours).filter(function (h) { return !h.closed && arr(h.daysOfWeek).length && h.open && h.close; })
      .map(function (h) {
        return {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: h.daysOfWeek,
          opens: h.open,
          closes: h.close
        };
      });
    if (hours.length) data.openingHoursSpecification = hours;

    var sameAs = arr(site.sameAs);
    arr(site.social).forEach(function (s) { if (s && s.url) sameAs.push(s.url); });
    if (sameAs.length) data.sameAs = sameAs.filter(Boolean);

    var services = arr(site.services);
    if (services.length) {
      data.hasOfferCatalog = {
        "@type": "OfferCatalog",
        name: text("name") + " services",
        itemListElement: services.map(function (svc) {
          var offer = {
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: svc.name, description: svc.description || "" }
          };
          if (svc.priceValue != null) {
            offer.price = String(svc.priceValue);
            offer.priceCurrency = svc.priceCurrency || "INR";
          }
          return offer;
        })
      };
    }

    var rating = site.rating || {};
    if (rating.includeInSchema && rating.value && rating.count) {
      data.aggregateRating = {
        "@type": "AggregateRating",
        ratingValue: String(rating.value),
        reviewCount: String(rating.count)
      };
    }
    return data;
  }

  function logoMark() {
    if (text("logo")) {
      return '<span class="logo-mark"><img src="' + esc(safeUrl(text("logo"))) + '" alt="" width="40" height="40" /></span>';
    }
    return '<span class="logo-mark" aria-hidden="true">' + esc(text("logoText") || text("name").slice(0, 2).toUpperCase()) + "</span>";
  }

  function navItems() {
    var items = [
      ["#services", "Services"],
      ["#about", "About"],
      arr(site.testimonials).length ? ["#testimonials", "Reviews"] : null,
      arr(site.gallery).length ? ["#gallery", "Gallery"] : null,
      arr(site.faqs).length ? ["#faq", "FAQ"] : null,
      ["#visit", "Hours"],
      ["#contact", "Contact"]
    ];
    return items.filter(Boolean).map(function (item) {
      return '<li><a href="' + esc(item[0]) + '">' + esc(item[1]) + "</a></li>";
    }).join("");
  }

  function renderDemoRibbon() {
    var note = text("demoNote");
    if (note) {
      var href = safeUrl(text("demoNoteUrl"));
      var inner = href ? '<a href="' + esc(href) + '">' + esc(note) + "</a>" : esc(note);
      return '<div class="demo-ribbon">' + inner + "</div>";
    }
    if (site.sampleContent) {
      return '<div class="sample-banner">Sample content — replace these details in <code>site.config.js</code> before going live.</div>';
    }
    return "";
  }

  function renderHeader() {
    return (
      renderDemoRibbon() +
      '<header class="site-header" id="top">' +
        '<div class="shell nav" id="nav">' +
          '<a class="logo" href="#top" aria-label="' + esc(text("name")) + ', home">' +
            logoMark() +
            '<span><span class="logo-name">' + esc(text("name")) + '</span>' +
            (text("tagline") ? '<small class="logo-tag">' + esc(text("tagline")) + "</small>" : "") +
            "</span></a>" +
          '<button class="menu-toggle" type="button" aria-expanded="false" aria-controls="nav-links" aria-label="Open menu"><span></span><span></span><span></span></button>' +
          '<ul class="nav-links" id="nav-links">' + navItems() + "</ul>" +
          '<div class="nav-cta">' +
            (telHref() ? '<a class="btn btn-ghost" href="' + esc(telHref()) + '">' + phoneIcon() + esc(text("cta.callLabel", "Call")) + "</a>" : "") +
            (waHref() ? '<a class="btn btn-whatsapp" href="' + esc(waHref()) + '">' + waIcon() + esc(text("cta.whatsappLabel", "WhatsApp")) + "</a>" : "") +
          "</div>" +
        "</div>" +
      "</header>"
    );
  }

  function renderHero() {
    var hero = site.hero || {};
    var chips = [];
    if (site.rating && site.rating.value) {
      chips.push("<li><strong>" + esc(site.rating.value) + (site.rating.max ? "/" + esc(site.rating.max) : "") + "</strong> " + esc(site.rating.label || "rating") + (site.rating.count ? " · " + esc(site.rating.count) + " reviews" : "") + "</li>");
    }
    arr(hero.bullets).forEach(function (b) { chips.push("<li>" + esc(b) + "</li>"); });

    return (
      '<section class="shell hero" id="content" aria-label="Introduction">' +
        "<div>" +
          (hero.eyebrow ? '<p class="eyebrow">' + esc(hero.eyebrow) + "</p>" : "") +
          "<h1>" + esc(hero.title || text("tagline") || text("name")) + "</h1>" +
          (hero.subtitle ? '<p class="lead">' + esc(hero.subtitle) + "</p>" : "") +
          '<div class="cta-row">' +
            (telHref() ? '<a class="btn btn-dark" href="' + esc(telHref()) + '">' + phoneIcon() + esc(text("cta.callLabel", "Call now")) + "</a>" : "") +
            (waHref() ? '<a class="btn btn-whatsapp" href="' + esc(waHref()) + '">' + waIcon() + esc(text("cta.bookLabel") || text("cta.whatsappLabel", "WhatsApp")) + "</a>" : "") +
          "</div>" +
          (chips.length ? '<ul class="trust-row">' + chips.join("") + "</ul>" : "") +
        "</div>" +
        (hero.image ?
          '<div class="hero-visual">' +
            '<img src="' + esc(safeUrl(hero.image)) + '" alt="' + esc(hero.imageAlt || "") + '" width="1200" height="1500" fetchpriority="high" decoding="async" />' +
            (hero.cardTitle || hero.cardText ?
              '<div class="hero-card"><strong>' + esc(hero.cardTitle || "") + "</strong><span>" + esc(hero.cardText || "") + "</span></div>" : "") +
          "</div>" : "") +
      "</section>"
    );
  }

  function renderServices() {
    var services = arr(site.services);
    if (!services.length) return "";
    return (
      '<section class="shell section" id="services">' +
        '<div class="section-head">' +
          '<span class="kicker">01 — Services</span>' +
          "<h2>" + esc(text("servicesTitle", "Services & pricing")) + "</h2>" +
          (text("servicesIntro") ? "<p>" + esc(text("servicesIntro")) + "</p>" : "") +
        "</div>" +
        '<div class="grid-3">' +
          services.map(function (svc) {
            var msg = "Hello, I found " + text("name") + " through your website. I would like to enquire about " + (svc.name || "your services") + ".";
            return (
              '<article class="card service-card">' +
                '<div class="icon-badge">' + icon(svc.icon) + "</div>" +
                "<h3>" + esc(svc.name) + "</h3>" +
                (svc.price ? '<p class="price">' + esc(svc.price) + (svc.duration ? " <small>" + esc(svc.duration) + "</small>" : "") + "</p>" : "") +
                (svc.description ? "<p>" + esc(svc.description) + "</p>" : "") +
                (arr(svc.tags).length ? '<div class="tags">' + arr(svc.tags).map(function (t) { return '<span class="tag">' + esc(t) + "</span>"; }).join("") + "</div>" : "") +
                (waHref() ? '<a class="btn btn-ghost" href="' + esc(waHref(msg)) + '">Enquire on WhatsApp</a>' : "") +
              "</article>"
            );
          }).join("") +
        "</div>" +
      "</section>"
    );
  }

  function renderAbout() {
    var about = site.about || {};
    if (!about.title && !about.body) return "";
    var body = arr(about.body).length ? arr(about.body) : (about.text ? [about.text] : []);
    var highlights = arr(about.highlights);
    var stats = arr(site.stats);
    return (
      '<section class="section-alt" id="about">' +
        '<div class="shell about-grid">' +
          (about.image ? '<img src="' + esc(safeUrl(about.image)) + '" alt="' + esc(about.imageAlt || "") + '" width="900" height="1125" loading="lazy" decoding="async" />' : "") +
          "<div class='about-copy'>" +
            '<div class="section-head">' +
              '<span class="kicker">02 — About</span>' +
              "<h2>" + esc(about.title || "About us") + "</h2>" +
            "</div>" +
            body.map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("") +
            (highlights.length ?
              '<ul class="highlights">' + highlights.map(function (h) {
                return "<li><strong>" + esc(h.title) + "</strong><span>" + esc(h.text) + "</span></li>";
              }).join("") + "</ul>" : "") +
            (stats.length ?
              '<div class="stats">' + stats.map(function (s) {
                return '<div class="stat"><b>' + esc(s.value) + "</b><span>" + esc(s.label) + "</span></div>";
              }).join("") + "</div>" : "") +
          "</div>" +
        "</div>" +
      "</section>"
    );
  }

  function starString(n) {
    var v = Math.round(Number(n) || 5);
    var out = "";
    for (var i = 0; i < 5; i++) out += i < v ? "★" : "☆";
    return out;
  }

  function renderTestimonials() {
    var items = arr(site.testimonials);
    if (!items.length) return "";
    var rating = site.rating || {};
    var ratingHtml = "";
    if (rating.value) {
      ratingHtml =
        '<div class="rating-band">' +
          '<span class="score">' + esc(rating.value) + (rating.max ? " / " + esc(rating.max) : "") + "</span>" +
          "<span>" + esc(rating.count ? rating.count + " " : "") + esc(rating.label || "reviews") + "</span>" +
          (rating.url && !site.sampleContent ? '<a href="' + esc(safeUrl(rating.url)) + '" rel="noopener noreferrer" target="_blank">Read reviews</a>' : "") +
        "</div>";
    }
    return (
      '<section class="shell section" id="testimonials">' +
        '<div class="section-head">' +
          '<span class="kicker">03 — Reviews</span>' +
          "<h2>" + esc(text("testimonialsTitle", "What clients say")) + "</h2>" +
          (text("testimonialsIntro") ? "<p>" + esc(text("testimonialsIntro")) + "</p>" : "") +
        "</div>" +
        ratingHtml +
        '<div class="grid-3">' +
          items.map(function (t) {
            return (
              '<figure class="card quote-card">' +
                '<div class="stars" aria-label="' + esc((t.rating || 5) + " out of 5 stars") + '">' + starString(t.rating || 5) + "</div>" +
                "<blockquote>" + esc(t.quote) + "</blockquote>" +
                "<figcaption><cite>" + esc(t.name) + (t.meta ? " · " + esc(t.meta) : "") + "</cite></figcaption>" +
              "</figure>"
            );
          }).join("") +
        "</div>" +
      "</section>"
    );
  }

  function renderGallery() {
    var items = arr(site.gallery);
    if (!items.length) return "";
    return (
      '<section class="shell section" id="gallery">' +
        '<div class="section-head">' +
          '<span class="kicker">04 — Gallery</span>' +
          "<h2>" + esc(text("galleryTitle", "A look inside")) + "</h2>" +
          (text("galleryIntro") ? "<p>" + esc(text("galleryIntro")) + "</p>" : "") +
        "</div>" +
        '<div class="gallery-grid">' +
          items.map(function (g, i) {
            return (
              '<button type="button" data-gallery-index="' + i + '" aria-label="Open image: ' + esc(g.alt || "Gallery image " + (i + 1)) + '">' +
                '<img src="' + esc(safeUrl(g.src)) + '" alt="' + esc(g.alt || "") + '" width="800" height="800" loading="lazy" decoding="async" />' +
              "</button>"
            );
          }).join("") +
        "</div>" +
      "</section>"
    );
  }

  function renderFaq() {
    var items = arr(site.faqs);
    if (!items.length) return "";
    return (
      '<section class="shell section" id="faq">' +
        '<div class="section-head">' +
          '<span class="kicker">05 — FAQ</span>' +
          "<h2>" + esc(text("faqTitle", "Frequently asked questions")) + "</h2>" +
          (text("faqIntro") ? "<p>" + esc(text("faqIntro")) + "</p>" : "") +
        "</div>" +
        '<div class="faq-list">' +
          items.map(function (f, i) {
            return (
              "<details" + (i === 0 ? " open" : "") + ">" +
                "<summary>" + esc(f.q) + "</summary>" +
                "<p>" + esc(f.a) + "</p>" +
              "</details>"
            );
          }).join("") +
        "</div>" +
      "</section>"
    );
  }

  function renderVisit() {
    var hours = arr(site.hours);
    var embed = safeEmbed(text("address.mapsEmbedUrl"));
    var address = text("address.display") || [text("address.street"), text("address.locality"), text("address.region")].filter(Boolean).join(", ");
    return (
      '<section class="section-alt" id="visit">' +
        '<div class="shell">' +
          '<div class="section-head">' +
            '<span class="kicker">06 — Visit</span>' +
            "<h2>" + esc(text("visitTitle", "Hours & location")) + "</h2>" +
            (text("visitIntro") ? "<p>" + esc(text("visitIntro")) + "</p>" : "") +
          "</div>" +
          '<div class="visit-grid">' +
            '<div class="card">' +
              (address ? "<p><strong>" + esc(address) + "</strong></p>" : "") +
              (hours.length ?
                '<table class="hours-table"><caption class="visually-hidden" style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);">Opening hours</caption>' +
                hours.map(function (h) {
                  return "<tr><th scope='row'>" + esc(h.label || (arr(h.daysOfWeek).join(", "))) + "</th><td>" + esc(h.display || (h.closed ? "Closed" : (h.open + " – " + h.close))) + "</td></tr>";
                }).join("") + "</table>" : "") +
              (text("hoursNote") ? '<p class="hours-note">' + esc(text("hoursNote")) + "</p>" : "") +
              (text("address.mapsLink") ? '<p class="hours-note"><a class="btn btn-ghost" href="' + esc(safeUrl(text("address.mapsLink"))) + '" target="_blank" rel="noopener noreferrer">Open in Google Maps</a></p>' : "") +
            "</div>" +
            (embed ?
              '<div class="map-frame"><iframe title="Map showing the location of ' + esc(text("name")) + '" src="' + esc(embed) + '" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>' :
              "") +
          "</div>" +
        "</div>" +
      "</section>"
    );
  }

  function renderContact() {
    var form = site.form || {};
    var services = arr(site.services);
    return (
      '<section class="shell section" id="contact">' +
        '<div class="contact-grid">' +
          "<div>" +
            '<div class="section-head">' +
              '<span class="kicker">07 — Contact</span>' +
              "<h2>" + esc(form.title || "Book or enquire") + "</h2>" +
              (form.subtitle ? "<p>" + esc(form.subtitle) + "</p>" : "") +
            "</div>" +
            '<ul class="contact-points">' +
              (text("phoneDisplay") || text("phone") ? '<li><span>Phone</span><a href="' + esc(telHref()) + '">' + esc(text("phoneDisplay") || text("phone")) + "</a></li>" : "") +
              (waHref() ? '<li><span>WhatsApp</span><a href="' + esc(waHref()) + '">' + esc(text("phoneDisplay") || "Message us") + "</a></li>" : "") +
              (text("email") ? '<li><span>Email</span><a href="mailto:' + esc(text("email")) + '">' + esc(text("email")) + "</a></li>" : "") +
              (text("address.display") ? '<li><span>Address</span>' + esc(text("address.display")) + "</li>" : "") +
              (text("areaServed") ? "<li><span>Service area</span>" + esc(text("areaServed")) + "</li>" : "") +
            "</ul>" +
          "</div>" +
          '<form class="card form-card" id="booking-form" novalidate>' +
            "<h2>" + esc(form.heading || "Send a WhatsApp enquiry") + "</h2>" +
            "<p>" + esc(form.note || "This form opens WhatsApp with a pre-filled message. Nothing is stored on a server.") + "</p>" +
            '<div class="fields">' +
              '<div class="field"><label for="name">Full name</label><input id="name" name="name" type="text" autocomplete="name" required /></div>' +
              '<div class="field"><label for="phone">Phone</label><input id="phone" name="phone" type="tel" autocomplete="tel" inputmode="tel" required /></div>' +
              '<div class="field span-2"><label for="service">Service</label>' +
                '<select id="service" name="service">' +
                  '<option value="">Please select (optional)</option>' +
                  services.map(function (s) { return '<option value="' + esc(s.name) + '">' + esc(s.name) + "</option>"; }).join("") +
                "</select></div>" +
              '<div class="field span-2"><label for="message">Message</label><textarea id="message" name="message" rows="4" placeholder="' + esc(form.placeholder || "Tell us what you need and a preferred day.") + '"></textarea></div>' +
            "</div>" +
            '<p class="form-error" id="form-error" role="alert"></p>' +
            '<button class="btn btn-whatsapp btn-wide" type="submit">' + waIcon() + esc(form.submitLabel || "Send on WhatsApp") + "</button>" +
            '<p class="form-note">' + esc(form.successNote || "You will be taken to WhatsApp to review and send the message.") + "</p>" +
          "</form>" +
        "</div>" +
      "</section>"
    );
  }

  function renderFooter() {
    var social = arr(site.social).filter(function (s) { return s && s.url; });
    var year = new Date().getFullYear();
    return (
      '<footer class="site-footer">' +
        '<div class="shell footer-grid">' +
          "<div>" +
            "<h3>" + esc(text("name")) + "</h3>" +
            "<p>" + esc(text("tagline") || text("description")) + "</p>" +
          "</div>" +
          "<div><h3>Explore</h3><ul>" + navItems() + "</ul></div>" +
          "<div><h3>Connect</h3><ul>" +
            (telHref() ? '<li><a href="' + esc(telHref()) + '">' + esc(text("phoneDisplay") || text("phone")) + "</a></li>" : "") +
            (waHref() ? '<li><a href="' + esc(waHref()) + '">WhatsApp</a></li>' : "") +
            social.map(function (s) {
              return '<li><a href="' + esc(safeUrl(s.url)) + '" target="_blank" rel="noopener noreferrer">' + esc(s.name) + "</a></li>";
            }).join("") +
          "</ul></div>" +
        "</div>" +
        '<div class="shell footer-bottom">' +
          "<span>© " + year + " " + esc(text("name")) + "</span>" +
          (text("footer.credit") ? (text("footer.creditUrl") ? '<a href="' + esc(safeUrl(text("footer.creditUrl"))) + '">' + esc(text("footer.credit")) + "</a>" : "<span>" + esc(text("footer.credit")) + "</span>") : "") +
        "</div>" +
      "</footer>"
    );
  }

  function renderMobileCta() {
    if (!telHref() && !waHref()) return "";
    return (
      '<div class="mobile-cta" role="region" aria-label="Quick contact">' +
        (telHref() ? '<a class="btn btn-dark" href="' + esc(telHref()) + '">' + phoneIcon() + esc(text("cta.callLabel", "Call")) + "</a>" : "") +
        (waHref() ? '<a class="btn btn-whatsapp" href="' + esc(waHref()) + '">' + waIcon() + esc(text("cta.whatsappLabel", "WhatsApp")) + "</a>" : "") +
      "</div>"
    );
  }

  function renderLightbox() {
    if (!arr(site.gallery).length) return "";
    return (
      '<dialog class="lightbox" id="lightbox" aria-label="Image preview">' +
        '<div class="lightbox-inner">' +
          '<button class="lightbox-close" type="button" aria-label="Close">&times;</button>' +
          '<button class="lightbox-nav prev" type="button" aria-label="Previous image">‹</button>' +
          '<img id="lightbox-image" alt="" />' +
          '<button class="lightbox-nav next" type="button" aria-label="Next image">›</button>' +
          '<p class="lightbox-caption" id="lightbox-caption"></p>' +
        "</div>" +
      "</dialog>"
    );
  }

  function bindEvents() {
    var header = document.querySelector(".site-header");
    var onScroll = function () {
      if (header) header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    var nav = document.getElementById("nav");
    var toggle = document.querySelector(".menu-toggle");
    if (toggle && nav) {
      toggle.addEventListener("click", function () {
        var open = nav.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
        toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      });
      nav.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
          nav.classList.remove("is-open");
          toggle.setAttribute("aria-expanded", "false");
          toggle.setAttribute("aria-label", "Open menu");
        });
      });
    }

    var form = document.getElementById("booking-form");
    if (form) {
      form.addEventListener("submit", function (event) {
        event.preventDefault();
        var name = (form.elements.name.value || "").trim();
        var phone = (form.elements.phone.value || "").trim();
        var service = (form.elements.service.value || "").trim();
        var message = (form.elements.message.value || "").trim();
        var error = document.getElementById("form-error");
        if (!name || !phone) {
          if (error) error.textContent = "Please add your name and phone number.";
          (name ? form.elements.phone : form.elements.name).focus();
          return;
        }
        if (error) error.textContent = "";
        var lines = [
          "Hello, I found " + text("name") + " through your website.",
          "Name: " + name,
          "Phone: " + phone
        ];
        if (service) lines.push("Service: " + service);
        if (message) lines.push("Message: " + message);
        var href = waHref(lines.join("\n"));
        if (href) window.location.href = href;
      });
    }

    var gallery = arr(site.gallery);
    var dialog = document.getElementById("lightbox");
    var img = document.getElementById("lightbox-image");
    var caption = document.getElementById("lightbox-caption");
    var index = 0;

    function show(i) {
      if (!gallery.length || !img) return;
      index = (i + gallery.length) % gallery.length;
      img.src = safeUrl(gallery[index].src);
      img.alt = gallery[index].alt || "";
      if (caption) caption.textContent = gallery[index].alt || "";
    }

    document.querySelectorAll("[data-gallery-index]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        show(Number(btn.getAttribute("data-gallery-index")) || 0);
        if (dialog && dialog.showModal) dialog.showModal();
      });
    });
    if (dialog) {
      var closeBtn = dialog.querySelector(".lightbox-close");
      if (closeBtn) closeBtn.addEventListener("click", function () { dialog.close(); });
      var prev = dialog.querySelector(".lightbox-nav.prev");
      var next = dialog.querySelector(".lightbox-nav.next");
      if (prev) prev.addEventListener("click", function () { show(index - 1); });
      if (next) next.addEventListener("click", function () { show(index + 1); });
      dialog.addEventListener("click", function (event) {
        if (event.target === dialog) dialog.close();
      });
      document.addEventListener("keydown", function (event) {
        if (!dialog.open) return;
        if (event.key === "ArrowLeft") show(index - 1);
        if (event.key === "ArrowRight") show(index + 1);
      });
    }
  }

  applyTheme();
  applyHead();
  root.innerHTML = renderHeader() + renderHero() + renderServices() + renderAbout() + renderTestimonials() + renderGallery() + renderFaq() + renderVisit() + renderContact() + renderFooter() + renderMobileCta() + renderLightbox();
  bindEvents();
})();
