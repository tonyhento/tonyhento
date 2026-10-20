(function () {
  'use strict';
  var root = document.documentElement;
  root.classList.add('js');

  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // revelar ao rolar
  var targets = document.querySelectorAll('.sec > *:not(.pshow), .two > *, .jcard, .bar, .toolgrid li, .pshow, .certs li, .skillcols > div');
  document.querySelectorAll('.jgrid, .toolgrid, .bars').forEach(function (g) { Array.prototype.forEach.call(g.children, function (c, i) { c.classList.add('d' + Math.min(i % 4, 3)); }); });
  targets.forEach(function (el) { el.classList.add('reveal'); });
  if (reduce || !('IntersectionObserver' in window)) {
    targets.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    targets.forEach(function (el) { io.observe(el); });
  }

  // vitrine de projetos (hover / foco / toque)
  var items = document.querySelectorAll('.pitem'), slides = document.querySelectorAll('.pslide');
  function show(i) {
    items.forEach(function (b) { var on = b.dataset.p === i; b.classList.toggle('is-active', on); b.setAttribute('aria-pressed', on); });
    slides.forEach(function (s) { s.classList.toggle('is-active', s.dataset.p === i); });
  }
  items.forEach(function (b) {
    ['mouseenter', 'focus', 'click'].forEach(function (ev) { b.addEventListener(ev, function () { show(b.dataset.p); }); });
  });

  // menu hambúrguer
  var burger = document.getElementById('burger'), navEl = document.getElementById('sideNav'), scrim = document.getElementById('scrim');
  function menu(open) {
    if (!burger || !navEl) return;
    burger.setAttribute('aria-expanded', open); navEl.classList.toggle('is-open', open);
    if (scrim) scrim.classList.toggle('is-open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  }
  if (burger) {
    burger.addEventListener('click', function () { menu(burger.getAttribute('aria-expanded') !== 'true'); });
    if (scrim) scrim.addEventListener('click', function () { menu(false); });
    navEl.addEventListener('click', function (e) { if (e.target.closest('a')) menu(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') menu(false); });
    window.addEventListener('resize', function () { if (window.innerWidth > 1023) menu(false); });
  }

  // barra fixa: borda ao rolar
  var bar = document.getElementById('topbar');
  function onScroll() { if (bar) bar.classList.toggle('is-scrolled', window.scrollY > 10); }
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

  // item ativo do menu
  var links = Array.prototype.slice.call(document.querySelectorAll('#sideNav a'));
  var map = {};
  links.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
  var secs = Object.keys(map).map(function (id) { return document.getElementById(id); }).filter(Boolean);
  if ('IntersectionObserver' in window) {
    var so = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        links.forEach(function (a) { a.classList.remove('is-active'); a.removeAttribute('aria-current'); });
        var a = map[e.target.id];
        if (a) {
          a.classList.add('is-active'); a.setAttribute('aria-current', 'true');
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    secs.forEach(function (s) { so.observe(s); });
  }
})();
