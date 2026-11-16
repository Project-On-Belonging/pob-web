/* Project on Belonging: small progressive enhancements (mobile menu, forms). The site works without it. */
(function () {
  "use strict";

  /* ---------- Mobile menu ---------- */
  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".nav-toggle");
  if (header && toggle) {
    var setOpen = function (open) {
      header.classList.toggle("nav-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    };
    toggle.addEventListener("click", function () {
      setOpen(!header.classList.contains("nav-open"));
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && header.classList.contains("nav-open")) {
        setOpen(false);
        toggle.focus();
      }
    });
    header.addEventListener("click", function (e) {
      if (e.target.closest("nav a")) setOpen(false);
    });
    window.matchMedia("(min-width: 901px)").addEventListener("change", function (m) {
      if (m.matches) setOpen(false);
    });
  }

  /* ---------- Motion ----------
     Skipped entirely for visitors who ask for reduced motion (or browsers without
     IntersectionObserver), so they get the plain static page. */
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Header shadow once scrolled (a tiny, harmless effect, so it runs regardless) */
  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  if (!reduceMotion && "IntersectionObserver" in window) {
    document.documentElement.classList.add("motion");
    /* the dot wave animates registered custom properties (@property); skip it where unsupported */
    if (window.CSS && CSS.registerProperty) document.documentElement.classList.add("motion-wave");

    /* Scroll reveal: direct children of a section's wrapper rise in as they enter the
       viewport. Grids, splits and filmstrips reveal item by item with a small stagger. */
    var isEmpty = function (el) {
      return !el.firstElementChild && !el.textContent.trim();
    };
    var revealTargets = [];
    document.querySelectorAll(".section > .wrap").forEach(function (wrap) {
      Array.prototype.forEach.call(wrap.children, function (child) {
        if (child.matches(".grid, .split, .filmstrip")) {
          Array.prototype.forEach.call(child.children, function (item, i) {
            revealTargets.push([item, Math.min(i, 5) * 0.09]);
          });
        } else if (!isEmpty(child) && !child.hidden) {
          revealTargets.push([child, 0]);
        }
      });
    });

    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          revealObserver.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -10% 0px" }
    );
    revealTargets.forEach(function (t) {
      t[0].setAttribute("data-reveal", "");
      if (t[1]) t[0].style.setProperty("--reveal-delay", t[1] + "s");
      revealObserver.observe(t[0]);
    });

    /* Dot pattern: hidden until first seen, then wipes in; the wave only runs while on screen */
    var patterns = document.querySelectorAll(".dot-pattern");
    var patternObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var el = entry.target;
        el.classList.toggle("is-live", entry.isIntersecting);
        if (entry.isIntersecting && el.classList.contains("is-pending")) {
          el.classList.remove("is-pending");
          el.classList.add("is-revealed");
        }
      });
    });
    patterns.forEach(function (el) {
      el.classList.add("is-pending");
      patternObserver.observe(el);
    });

    /* Count-up for stat numbers ("2022", "5", "1,000+", "40+"). The real value stays in the
       DOM as screen-reader text; the animated copy is aria-hidden. */
    var countObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          countObserver.unobserve(entry.target);
          entry.target._runCount();
        });
      },
      { threshold: 0.6 }
    );
    document.querySelectorAll(".stat-num").forEach(function (el, index) {
      var original = el.textContent.trim();
      var m = original.match(/^(\d[\d,]*)(.*)$/);
      if (!m) return;

      var target = parseInt(m[1].replace(/,/g, ""), 10);
      var hasComma = m[1].indexOf(",") !== -1;
      var suffix = m[2];
      var isYear = !hasComma && m[1].length === 4 && target >= 1900 && target <= 2100;
      var start = isYear ? target - 40 : 0; /* years roll up a few decades instead of from zero */
      var duration = isYear || target >= 100 ? 1600 : 1000;
      var format = function (n) {
        return (hasComma ? n.toLocaleString("en-US") : String(n)) + suffix;
      };

      var shown = document.createElement("span");
      shown.setAttribute("aria-hidden", "true");
      shown.textContent = format(start);
      var spoken = document.createElement("span");
      spoken.className = "sr-only";
      spoken.textContent = original;
      el.textContent = "";
      el.appendChild(spoken);
      el.appendChild(shown);

      /* stagger siblings in the same row a little */
      var delay = (index % 4) * 120;
      el._runCount = function () {
        var t0 = null;
        var step = function (now) {
          if (t0 === null) t0 = now;
          var p = Math.min(Math.max((now - t0 - delay) / duration, 0), 1);
          var eased = 1 - Math.pow(1 - p, 4);
          shown.textContent = format(Math.round(start + (target - start) * eased));
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      };
      countObserver.observe(el);
    });
  }

  /* ---------- Forms (Netlify Forms: https://docs.netlify.com/forms/setup/) ---------- */
  var FALLBACK =
    'Sorry, that did not go through. Please email <a href="mailto:info@projectonbelonging.org">info@projectonbelonging.org</a>.';

  document.querySelectorAll("form[data-netlify]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var status = form.querySelector(".form-status");
      var button = form.querySelector('button[type="submit"]');
      status.classList.remove("is-error");
      status.textContent = "Sending…";
      button.disabled = true;

      fetch(form.getAttribute("action") || window.location.pathname, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(new FormData(form)).toString(),
      })
        .then(function (res) {
          if (!res.ok) throw new Error("HTTP " + res.status);
          form.reset();
          status.textContent = form.getAttribute("data-success") || "Thank you. We received your message.";
        })
        .catch(function () {
          status.classList.add("is-error");
          status.innerHTML = FALLBACK;
        })
        .then(function () {
          button.disabled = false;
        });
    });
  });
})();
