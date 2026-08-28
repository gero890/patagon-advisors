(function () {
  "use strict";
  /* Patagon Advisors — main.js entry point. No imports/exports (see 04-critical-gotchas.md). */

  var data = window.__BRAND__ || {};
  var reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fineHover = matchMedia("(hover: hover) and (pointer: fine)").matches;

  var $  = function (sel, scope) { return (scope || document).querySelector(sel); };
  var $$ = function (sel, scope) { return Array.prototype.slice.call((scope || document).querySelectorAll(sel)); };
  var escHTML = function (s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };
  function safe(fn, name) {
    try { fn(); } catch (e) { console.warn("[" + name + "] failed:", e); }
  }

  /* ---------------------------------------------------------------
     Mounts — idempotent, only fill markers that exist and are empty
     --------------------------------------------------------------- */

  function mountMarquee() {
    var track = $("[data-marquee]");
    if (!track || track.children.length > 0 || !data.sectors) return;
    track.innerHTML = data.sectors.map(function (s) {
      return "<span>" + escHTML(s) + "</span>";
    }).join("");
  }

  function mountSolutionsIndex() {
    var target = $("[data-solutions-index]");
    if (!target || target.children.length > 0 || !data.solutions) return;
    target.innerHTML = data.solutions.map(function (s) {
      return (
        '<div class="solution-row" data-solution-row data-reveal>' +
          '<span class="num-mark">' + escHTML(s.num) + '</span>' +
          '<div class="solution-row-main">' +
            '<h3>' + escHTML(s.title) + '</h3>' +
            '<p class="solution-row-summary">' + escHTML(s.summary) + '</p>' +
            '<div class="solution-row-detail">' +
              '<div class="solution-row-detail-inner">' +
                '<div class="solution-row-detail-body">' +
                  '<p>' + escHTML(s.detail) + '</p>' +
                  '<ul>' + s.bullets.map(function (b) { return "<li>" + escHTML(b) + "</li>"; }).join("") + '</ul>' +
                '</div>' +
              '</div>' +
            '</div>' +
          '</div>' +
          '<button type="button" class="solution-row-toggle" aria-label="Ver detalle">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M12 5v14M5 12h14"/></svg>' +
          '</button>' +
        '</div>'
      );
    }).join("");
  }

  function mountTeam() {
    var target = $("[data-team]");
    if (!target || target.children.length > 0 || !data.team) return;
    target.innerHTML = data.team.map(function (m) {
      var initials = m.name.split(/\s+/).map(function (w) { return w[0]; }).slice(0, 2).join("");
      return (
        '<article class="team-card" data-reveal>' +
          '<div class="team-photo">' +
            '<img src="assets/img/' + escHTML(m.photo) + '.webp" alt="' + escHTML(m.name) + '" loading="lazy" decoding="async" ' +
              'onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\';" />' +
            '<div class="team-photo-fallback" style="display:none">' + escHTML(initials) + '</div>' +
          '</div>' +
          '<div class="team-body">' +
            '<h3 class="team-name">' + escHTML(m.name) + '</h3>' +
            '<p class="team-role">' + escHTML(m.role) + '</p>' +
            '<ul class="team-credentials">' + m.credentials.map(function (c) { return "<li>" + escHTML(c) + "</li>"; }).join("") + '</ul>' +
          '</div>' +
        '</article>'
      );
    }).join("");
  }

  function mountFooterNav() {
    var target = $("[data-footer-nav]");
    if (!target || target.children.length > 0 || !data.nav) return;
    target.innerHTML = data.nav.map(function (n) {
      return '<li><a href="' + escHTML(n.href) + '">' + escHTML(n.label) + '</a></li>';
    }).join("");
  }

  function mountNavMobileLinks() {
    var target = $("[data-nav-mobile-links]");
    if (!target || target.children.length > 0 || !data.nav) return;
    target.innerHTML = data.nav.map(function (n) {
      return '<a href="' + escHTML(n.href) + '">' + escHTML(n.label) + '</a>';
    }).join("");
  }

  function fillContactRefs() {
    var c = data.contact;
    if (!c) return;
    $$("[data-email]").forEach(function (el) { el.textContent = c.email; if (el.tagName === "A") el.href = "mailto:" + c.email; });
    $$("[data-whatsapp-display]").forEach(function (el) { el.textContent = c.whatsappDisplay; });
    $$("[data-whatsapp-link]").forEach(function (el) {
      el.href = "https://wa.me/" + c.whatsappNumber + "?text=" + encodeURIComponent(c.whatsappMessage);
    });
    $$("[data-address-1]").forEach(function (el) { el.textContent = c.addressLine1; });
    $$("[data-address-2]").forEach(function (el) { el.textContent = c.addressLine2; });
    $$("[data-maps-link]").forEach(function (el) { el.href = c.mapsUrl; });
    $$("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
  }

  /* ---------------------------------------------------------------
     Nav
     --------------------------------------------------------------- */
  function initNav() {
    var nav = $(".nav");
    if (!nav) return;
    var onScroll = function () {
      if (window.scrollY > 24) nav.classList.add("is-scrolled");
      else nav.classList.remove("is-scrolled");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    var toggle = $("[data-nav-toggle]");
    var mobile = $("[data-nav-mobile]");
    var scrim = $("[data-nav-scrim]");
    function setMenu(open) {
      if (toggle) toggle.setAttribute("aria-expanded", String(open));
      if (mobile) mobile.setAttribute("data-open", String(open));
      if (scrim) scrim.setAttribute("data-open", String(open));
      document.documentElement.style.overflow = open ? "hidden" : "";
    }
    if (toggle && mobile) {
      toggle.addEventListener("click", function () {
        setMenu(toggle.getAttribute("aria-expanded") !== "true");
      });
      $$("a", mobile).forEach(function (a) {
        a.addEventListener("click", function () { setMenu(false); });
      });
      if (scrim) scrim.addEventListener("click", function () { setMenu(false); });
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") setMenu(false);
      });
    }

    // mark active link
    var path = location.pathname.split("/").pop() || "index.html";
    $$(".nav-link").forEach(function (a) {
      var href = a.getAttribute("href");
      if (href === path) a.classList.add("is-active");
    });
  }

  /* ---------------------------------------------------------------
     Reveal on scroll — threshold low + 6s safety net (gotcha A.8)
     --------------------------------------------------------------- */
  function initReveals() {
    var els = $$("[data-reveal]");
    if (!els.length) return;
    if (typeof IntersectionObserver === "undefined") {
      els.forEach(function (el) { el.classList.add("is-revealed"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("is-revealed");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.01, rootMargin: "0px 0px -2% 0px" });
    els.forEach(function (el) { io.observe(el); });

    setTimeout(function () {
      $$("[data-reveal]:not(.is-revealed)").forEach(function (el) {
        if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add("is-revealed");
      });
    }, 6000);
  }

  /* ---------------------------------------------------------------
     Solutions accordion (signature interaction)
     --------------------------------------------------------------- */
  function initSolutionsAccordion() {
    var index = $("[data-solutions-index]");
    if (!index) return;
    index.addEventListener("click", function (e) {
      var row = e.target.closest("[data-solution-row]");
      if (!row) return;
      var wasOpen = row.classList.contains("is-open");
      $$("[data-solution-row]", index).forEach(function (r) { r.classList.remove("is-open"); });
      if (!wasOpen) row.classList.add("is-open");
    });
  }

  /* ---------------------------------------------------------------
     Magnetic buttons — never on form submit (gotcha C.2)
     --------------------------------------------------------------- */
  function initMagnetic() {
    if (!fineHover) return;
    $$("[data-magnetic]").forEach(function (el) {
      var strength = parseFloat(el.dataset.magneticStrength || "0.25");
      var inner = document.createElement("span");
      inner.className = "magnetic-inner";
      while (el.firstChild) inner.appendChild(el.firstChild);
      el.appendChild(inner);
      el.classList.add("has-magnetic");
      var tx = 0, ty = 0, cx = 0, cy = 0, raf = null;
      el.addEventListener("mousemove", function (e) {
        var r = el.getBoundingClientRect();
        tx = ((e.clientX - r.left) - r.width / 2) * strength;
        ty = ((e.clientY - r.top) - r.height / 2) * strength;
        if (!raf) raf = requestAnimationFrame(loop);
      });
      el.addEventListener("mouseleave", function () { tx = 0; ty = 0; if (!raf) raf = requestAnimationFrame(loop); });
      function loop() {
        cx += (tx - cx) * 0.22; cy += (ty - cy) * 0.22;
        inner.style.transform = "translate3d(" + cx.toFixed(2) + "px," + cy.toFixed(2) + "px,0)";
        raf = (Math.abs(tx - cx) > 0.1 || Math.abs(ty - cy) > 0.1) ? requestAnimationFrame(loop) : null;
      }
    });
  }

  /* ---------------------------------------------------------------
     Count-up numbers
     --------------------------------------------------------------- */
  function initCountUp() {
    var els = $$("[data-count-to]");
    if (!els.length || typeof IntersectionObserver === "undefined") return;
    els.forEach(function (el) {
      var raw = el.dataset.countTo;
      var target = parseFloat(raw);
      var suffix = el.dataset.countSuffix || "";
      var trigger = function () {
        var start = null;
        var duration = 1300;
        function step(ts) {
          if (!start) start = ts;
          var p = Math.min(1, (ts - start) / duration);
          var eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(eased * target) + suffix;
          if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      };
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) { trigger(); io.unobserve(e.target); } });
      }, { threshold: 0.4 });
      io.observe(el);
    });
  }

  /* ---------------------------------------------------------------
     Marquee ticker
     --------------------------------------------------------------- */
  function initMarquee() {
    $$("[data-marquee]").forEach(function (track) {
      if (track.dataset.marqueeBound) return;
      track.dataset.marqueeBound = "1";
      var clone = track.cloneNode(true);
      clone.removeAttribute("data-marquee");
      clone.setAttribute("aria-hidden", "true");
      track.parentNode.appendChild(clone);
      track.style.animation = clone.style.animation = "marqueeScroll 46s linear infinite";
      if (!document.getElementById("marquee-keyframes")) {
        var style = document.createElement("style");
        style.id = "marquee-keyframes";
        style.textContent = "@keyframes marqueeScroll{from{transform:translateX(0)}to{transform:translateX(-100%)}}";
        document.head.appendChild(style);
      }
    });
  }

  /* ---------------------------------------------------------------
     Background hero video — progressive enhancement over the static
     poster image already in the HTML. Intrusive per gotcha A.2, so it
     is skipped entirely for reduced-motion and on narrow/mobile
     viewports (bandwidth). The static <img> stays as permanent fallback.
     --------------------------------------------------------------- */
  function initBgVideo() {
    if (reduced) return;
    if (window.innerWidth < 720) return;
    $$("[data-bg-video]").forEach(function (slot) {
      var src = slot.getAttribute("data-bg-video");
      var img = $("img", slot);
      if (!src || !img) return;
      var video = document.createElement("video");
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      video.autoplay = true;
      video.preload = "auto";
      video.setAttribute("aria-hidden", "true");
      video.poster = img.currentSrc || img.src;
      var source = document.createElement("source");
      source.src = src;
      source.type = "video/mp4";
      video.appendChild(source);
      slot.appendChild(video);
      var playPromise = video.play();
      if (playPromise && playPromise.catch) {
        playPromise.catch(function () { video.remove(); }); // autoplay blocked — keep static image
      }
    });
  }

  /* ---------------------------------------------------------------
     Contact form — progressive enhancement, posts to contacto.php
     --------------------------------------------------------------- */
  function initContactForm() {
    var form = $("[data-contact-form]");
    if (!form) return;
    var statusEl = $("[data-form-status]", form);
    var submitBtn = $("[type=submit]", form);

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (form.classList.contains("is-sending")) return;
      if (!form.reportValidity()) return;
      // honeypot
      var hp = form.querySelector('[name="empresa_web"]');
      if (hp && hp.value) return;

      form.classList.add("is-sending");
      if (submitBtn) submitBtn.disabled = true;
      if (statusEl) { statusEl.textContent = "Enviando…"; statusEl.className = "form-status"; }

      var fd = new FormData(form);
      fetch("contacto.php", { method: "POST", body: fd })
        .then(function (res) { return res.ok ? res.json().catch(function () { return { ok: true }; }) : Promise.reject(res); })
        .then(function () {
          var firstName = (form.elements["nombre"] && form.elements["nombre"].value.trim().split(/\s+/)[0]) || "";
          if (statusEl) {
            statusEl.textContent = (firstName ? firstName + ", " : "") + "hemos recibido tu mensaje. Te contactaremos a la brevedad.";
            statusEl.className = "form-status is-ok";
          }
          form.reset();
        })
        .catch(function () {
          var c = data.contact || {};
          if (statusEl) {
            statusEl.innerHTML = "No pudimos enviar el formulario automáticamente. Escribinos directo a " +
              '<a href="mailto:' + escHTML(c.email || "") + '">' + escHTML(c.email || "") + "</a> o por WhatsApp.";
            statusEl.className = "form-status is-error";
          }
        })
        .finally(function () {
          form.classList.remove("is-sending");
          if (submitBtn) submitBtn.disabled = false;
        });
    });
  }

  /* ---------------------------------------------------------------
     Splash-free load flag (kept for CSS hooks / future use)
     --------------------------------------------------------------- */

  function boot() {
    safe(mountMarquee, "mountMarquee");
    safe(mountSolutionsIndex, "mountSolutionsIndex");
    safe(mountTeam, "mountTeam");
    safe(mountFooterNav, "mountFooterNav");
    safe(mountNavMobileLinks, "mountNavMobileLinks");
    safe(fillContactRefs, "fillContactRefs");

    safe(initNav, "initNav");
    safe(initReveals, "initReveals");
    safe(initSolutionsAccordion, "initSolutionsAccordion");
    safe(initMagnetic, "initMagnetic");
    safe(initCountUp, "initCountUp");
    safe(initMarquee, "initMarquee");
    safe(initBgVideo, "initBgVideo");
    safe(initContactForm, "initContactForm");

    document.documentElement.classList.add("is-ready");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
