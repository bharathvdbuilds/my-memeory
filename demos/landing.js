(function () {
  "use strict";
  var cta = document.getElementById("get-site");
  if (!cta) return;

  var raw = (typeof WHATSAPP_NUMBER === "string" ? WHATSAPP_NUMBER : "").replace(/\D/g, "");
  var ready = /^[1-9]\d{7,14}$/.test(raw);

  if (!ready) {
    cta.setAttribute("aria-disabled", "true");
    cta.addEventListener("click", function (event) {
      event.preventDefault();
    });
    return;
  }

  var message = "Hi, I saw your demo sites and want a website for my business";
  var href = "https://wa.me/" + raw + "?text=" + encodeURIComponent(message);
  cta.setAttribute("href", href);
  cta.setAttribute("target", "_blank");
  cta.setAttribute("rel", "noopener noreferrer");
  cta.removeAttribute("aria-disabled");
})();
