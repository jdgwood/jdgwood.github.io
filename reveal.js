/* Scroll-reveal: adds .in to [data-reveal] elements as they enter view.
   Pure vanilla, no deps. Safe fallback reveals everything on load. */
(function () {
  function revealAll() {
    document.querySelectorAll('[data-reveal]').forEach(function (el) { el.classList.add('in'); });
  }

  // If IntersectionObserver is unavailable, just show everything.
  if (!('IntersectionObserver' in window)) { revealAll(); return; }

  function start() {
    var els = document.querySelectorAll('[data-reveal]');
    if (!els.length) return;

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    els.forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.92) { el.classList.add('in'); }  // already in view on load
      else { io.observe(el); }
    });

    // Safety net: never leave content hidden.
    window.addEventListener('load', function () { setTimeout(revealAll, 1400); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else { start(); }
})();
