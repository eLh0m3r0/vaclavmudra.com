/* Minimal vanilla JS:
   - Smooth scroll for anchor links (respecting reduced motion)
   - Tiny email obfuscation flourish (mailto stays in href; we just animate
     a copy-to-clipboard affordance on click)
*/
(function () {
  'use strict';

  // Smooth in-page navigation
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href');
      if (id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      target.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth', block: 'start' });
      history.replaceState(null, '', id);
    });
  });

  // Email click — copy to clipboard as a small UX nicety, but keep mailto: as the default action
  var emailLink = document.querySelector('[data-email]');
  if (emailLink) {
    var label = emailLink.querySelector('[data-email-text]');
    var original = label ? label.textContent : '';
    emailLink.addEventListener('click', function (e) {
      // Holding modifier? Let it through.
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (!navigator.clipboard || !label) return;
      // Try to copy in addition to launching mail client
      try { navigator.clipboard.writeText(original.trim()); } catch (_) {}
      var prev = label.textContent;
      label.textContent = 'copied · opening mail…';
      setTimeout(function () { label.textContent = prev; }, 1600);
    });
  }
})();
