/* i18n do portfólio — mesmo mecanismo do SONORA.
   PT-BR é o padrão (texto já está no HTML e é capturado como dicionário "pt").
   EN fica neste arquivo. Botão: [data-lang-switch] com <span data-lang="pt|en">. */
(function () {
  'use strict';
  var KEY = 'portfolio.lang';
  var CHANGE_EVENT = 'portfolio:langchange';
  var LANGS = ['pt', 'en'];
  var HTML_LANG = { pt: 'pt-BR', en: 'en' };

  var dict = { pt: {}, en: {
    'skip': 'Skip to content',
    'nav.home': 'Home',
    'hero.alt': 'Pixel-art portrait of Hentony Almeida',
    'hero.tagline': 'Building<br>Modern Digital<br>Experiences.',
    'hero.sub': 'Full Stack developer in training from Campo Grande, Brazil, looking for a first opportunity in the field.',
    'side.about': 'About me', 'side.skills': 'Skills', 'side.projects': 'Projects',
    'side.journey': 'Journey', 'side.certs': 'Certifications', 'side.contact': 'Contact',

    'about.eyebrow': 'MY JOURNEY',
    'about.t1': 'About me', 'about.t2': '&', 'about.t3': 'my journey',
    'about.p1': "I'm Hentony Almeida, a Full Stack developer in training focused on building web applications that combine functionality, design and user experience.",
    'about.p2': 'My programming journey began in 2023 at Senac Hub Academy in Campo Grande (MS). After a period spent exploring other areas and deepening my interest in design, I resumed my studies in 2026, focused on building my own projects, improving my technical skills and finding my first professional opportunity as a developer.',
    'about.hlk': 'FULL STACK DEVELOPER IN TRAINING',
    'about.hlv': 'Every project is a chance to learn new technologies, solve real problems and grow as a professional. I also have an infrastructure background, with a degree in Computer Networks, to understand how applications work behind the screen.',
    'journey.h1': 'Building', 'journey.h2': 'my', 'journey.h3': 'journey',
    'journey.t1': 'Systems Development', 'journey.o1': 'Senac Hub Academy', 'journey.d1': 'First contact with programming, in Campo Grande (MS). That same year, Cisco Python Essentials 1 and Cybersecurity Essentials.', 'journey.g1': 'Career start',
    'journey.t2': 'Hub Fábricas project', 'journey.o2': 'Senac Hub Academy', 'journey.d2': 'Finished the course by delivering Hub Fábricas, a web system in PHP and MySQL.', 'journey.g2': 'Final project',
    'journey.t3': 'Computer Networks', 'journey.o3': 'Estácio', 'journey.d3': 'Associate degree completed on 07/03/2025, with an intermediate certification in Network Administration.', 'journey.g3': 'Higher education',
    'journey.t4': 'Back, fully focused', 'journey.o4': 'Own projects', 'journey.d4': 'Building SONORA and ASTER and studying new technologies, looking for an opportunity in the field.', 'journey.g4': 'In progress',
    'journey.xt': 'Professional experience',
    'journey.xd': "I worked as an intern in logistics, spreadsheets and product management. It wasn't a programming role, but it built organization, attention to process and communication, which I bring to my software projects.",
    'skills.h1': 'Technical', 'skills.h2': 'skills',
    'skills.intro': "The bars show my current level of use, not a grade: what I've applied in projects and what I'm still learning.",
    'skills.l1': 'Used in projects', 'skills.l2': 'Growing', 'skills.l3': 'Learning',
    'tools.h1': 'Tools', 'tools.h2': 'and', 'tools.h3': 'Technology',

    'projects.h1': 'Projects',
    'projects.sonora.alt1': 'SONORA home page', 'projects.sonora.alt2': 'SONORA collection page',
    'projects.sonora.k': 'Featured project · 2026',
    'p.sonora.d': 'Full stack audio e-commerce with catalog, cart, checkout and an admin panel, in Portuguese and English. Payment with Stripe in test mode; not published yet.',
    'p.aster.d': 'Social network with feed, posts, profiles and avatar upload. Runs locally and is a learning project.',
    'p.hub.d': 'Web system from the Systems Development course at Senac Hub Academy, with an admin area, charts and PDF. Private repository.',
    'projects.aster.alt': 'ASTER',
    'projects.repo': 'View code on GitHub ↗',
    'projects.aster.k': 'Social network · study project',
    'projects.hub.alt': 'Home page of the Hub Fábricas website',
    'projects.hub.k': 'Final course project · 2024',

    'certs.eyebrow': 'EDUCATION', 'certs.h1': 'Certifications', 'certs.h2': 'and education',
    'certs.c1': 'Associate degree in Computer Networks', 'certs.c1d': 'Estácio · completed 07/03/2025',
    'certs.c2': 'Intermediate certification in Network Administration', 'certs.c2d': 'Estácio · 320 h · 07/04/2025',
    'certs.c3d': 'Cisco Networking Academy, via Senac MS · 05/17/2023',
    'certs.c4d': 'Cisco Networking Academy · 10/02/2023',
    'certs.c5d': 'Cisco Networking Academy · 04/26/2026',
    'certs.c6d': 'Cisco Networking Academy · 04/26/2026',

    'contact.h1': "Let's talk",
    'contact.lead': "I'm open to junior Full Stack developer opportunities. The best way to reach me is through LinkedIn or GitHub.",
    'contact.loc': 'Location', 'contact.cardt': 'Prefer to go straight to it?', 'contact.cardd': 'See my professional profile or my repositories.',
    'footer.rights': 'All rights reserved.'
  }};

  function get() {
    try { var v = localStorage.getItem(KEY); if (LANGS.indexOf(v) > -1) return v; } catch (e) {}
    return 'pt';
  }
  var current = get();

  function capturePT() {
    var n;
    document.querySelectorAll('[data-i18n]').forEach(function (el) { dict.pt[el.getAttribute('data-i18n')] = el.textContent; });
    document.querySelectorAll('[data-i18n-html]').forEach(function (el) { dict.pt[el.getAttribute('data-i18n-html')] = el.innerHTML; });
    document.querySelectorAll('[data-i18n-attr]').forEach(function (el) {
      el.getAttribute('data-i18n-attr').split(';').forEach(function (pair) {
        var p = pair.split(':'); if (p.length < 2) return;
        dict.pt[p[1].trim()] = el.getAttribute(p[0].trim()) || '';
      });
    });
  }

  function t(key, vars) {
    var s = (dict[current] && dict[current][key]);
    if (s == null) s = dict.pt[key];
    if (s == null) return key;
    if (vars) Object.keys(vars).forEach(function (k) { s = s.replace(new RegExp('\\{' + k + '\\}', 'g'), vars[k]); });
    return s;
  }

  function translateDom() {
    document.documentElement.lang = HTML_LANG[current];
    document.querySelectorAll('[data-i18n]').forEach(function (el) { el.textContent = t(el.getAttribute('data-i18n')); });
    document.querySelectorAll('[data-i18n-html]').forEach(function (el) { el.innerHTML = t(el.getAttribute('data-i18n-html')); });
    document.querySelectorAll('[data-i18n-attr]').forEach(function (el) {
      el.getAttribute('data-i18n-attr').split(';').forEach(function (pair) {
        var p = pair.split(':'); if (p.length < 2) return;
        el.setAttribute(p[0].trim(), t(p[1].trim()));
      });
    });
    document.querySelectorAll('[data-lang-switch]').forEach(function (b) {
      b.querySelectorAll('[data-lang]').forEach(function (s) { s.classList.toggle('is-active', s.getAttribute('data-lang') === current); });
    });
    var m = document.querySelector('meta[name="description"]');
    if (m) m.setAttribute('content', current === 'en'
      ? 'Portfolio of Hentony Almeida, Full Stack developer in training: SONORA, ASTER and Hub Fábricas projects, Computer Networks degree and certifications.'
      : 'Portfólio de Hentony Almeida, desenvolvedor Full Stack em formação: projetos SONORA, ASTER e Hub Fábricas, formação em Redes de Computadores e certificações.');
    document.title = current === 'en'
      ? 'Hentony Almeida — Full Stack developer in training'
      : 'Hentony Almeida — Desenvolvedor Full Stack em formação';
  }

  function setLang(l, silent) {
    if (LANGS.indexOf(l) < 0) return;
    current = l;
    try { localStorage.setItem(KEY, l); } catch (e) {}
    translateDom();
    if (!silent) document.dispatchEvent(new CustomEvent(CHANGE_EVENT, { detail: { lang: l } }));
  }
  function toggle() { setLang(current === 'pt' ? 'en' : 'pt'); }

  function init() {
    capturePT();
    translateDom();
    document.querySelectorAll('[data-lang-switch]').forEach(function (b) { b.addEventListener('click', toggle); });
    document.body.classList.remove('i18n-pending');
  }
  window.addEventListener('storage', function (e) { if (e.key === KEY && LANGS.indexOf(e.newValue) > -1) { current = e.newValue; translateDom(); } });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();

  window.I18N = { t: t, setLang: setLang, toggle: toggle, get: function () { return current; }, CHANGE_EVENT: CHANGE_EVENT };
})();
