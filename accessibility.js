/* ViewEstate — תוסף נגישות מובנה
   תואם ת"י 5568 / WCAG 2.0 AA. נטען בכל עמוד דרך <script src="accessibility.js"></script>
   עצמאי לחלוטין, ללא תלויות. שומר העדפות ב-localStorage. */
(function () {
  'use strict';

  var STORAGE_KEY = 'viewestate_a11y';
  var ZOOM_LEVELS = [1, 1.15, 1.3, 1.5];
  var html = document.documentElement;

  var state = {
    zoom: 0,        // index לתוך ZOOM_LEVELS
    contrast: false,
    links: false,
    readable: false,
    noMotion: false,
    cursor: false
  };

  /* ---------- שמירה / טעינה ---------- */
  function load() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        var saved = JSON.parse(raw);
        for (var k in saved) {
          if (state.hasOwnProperty(k)) state[k] = saved[k];
        }
      }
    } catch (e) {}
  }
  function save() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) {}
  }

  /* ---------- העדפת מערכת: תנועה מופחתת ---------- */
  var prefersReduced = false;
  try {
    prefersReduced = window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch (e) {}

  /* ---------- הזרקת CSS ---------- */
  var CSS = [
    /* קישור דילוג לתוכן */
    '.a11y-skip{position:absolute;right:-9999px;top:0;z-index:100000;background:#3B2C1E;color:#fff;',
    'padding:12px 20px;border-radius:0 0 8px 0;font-size:16px;text-decoration:none;font-weight:700;}',
    '.a11y-skip:focus{right:0;}',

    /* מיקוד נראה בכל אתר */
    'a:focus-visible,button:focus-visible,input:focus-visible,textarea:focus-visible,select:focus-visible,',
    '[tabindex]:focus-visible{outline:3px solid #C9A35A!important;outline-offset:2px!important;',
    'box-shadow:0 0 0 5px rgba(0,0,0,.45)!important;border-radius:4px;}',

    /* כפתור צף (FAB) */
    '#a11y-fab{position:fixed;left:8px;top:85%;z-index:99998;width:56px;height:56px;border-radius:50%;',
    'background:#3B2C1E;color:#F4E9D4;border:2px solid #C9A35A;cursor:pointer;display:flex;align-items:center;',
    'justify-content:center;box-shadow:0 4px 14px rgba(0,0,0,.35);padding:0;',
    'transform:translateY(-50%);transition:transform .25s ease;}',
    '#a11y-fab:hover,#a11y-fab:focus,#a11y-fab:focus-visible{transform:translateY(-50%) scale(1.08);}',
    '#a11y-fab svg{width:30px;height:30px;}',

    /* פאנל */
    '#a11y-panel{position:fixed;left:16px;top:50%;transform:translateY(-50%);z-index:99999;width:300px;max-width:calc(100vw - 32px);',
    'max-height:calc(100vh - 32px);overflow:auto;background:#fff;color:#2A2118;border:2px solid #C9A35A;',
    'border-radius:14px;box-shadow:0 10px 40px rgba(0,0,0,.4);padding:16px;display:none;direction:rtl;',
    'font-family:inherit;line-height:1.4;}',
    '#a11y-panel[data-open="1"]{display:block;}',
    '#a11y-panel h2{font-size:18px;margin:0 0 4px;color:#3B2C1E;font-weight:800;}',
    '#a11y-panel .a11y-sub{font-size:12px;color:#6b5b45;margin:0 0 12px;}',
    '#a11y-panel .a11y-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;}',
    '.a11y-btn{display:flex;flex-direction:column;align-items:center;gap:4px;padding:10px 6px;border:1.5px solid #d9c9a8;',
    'background:#fff;color:#3B2C1E;border-radius:10px;cursor:pointer;font-size:13px;font-weight:600;text-align:center;',
    'font-family:inherit;line-height:1.3;}',
    '.a11y-btn:hover{background:#FBF4E6;}',
    '.a11y-btn[aria-pressed="true"]{background:#3B2C1E;color:#F4E9D4;border-color:#3B2C1E;}',
    '.a11y-btn svg{width:22px;height:22px;}',
    '.a11y-btn .a11y-lvl{font-size:11px;opacity:.85;}',
    '.a11y-reset{grid-column:1 / -1;background:#fbeaea;border-color:#e0b4b4;color:#8a2b2b;}',
    '.a11y-reset:hover{background:#f6dada;}',
    '#a11y-panel .a11y-statement{display:block;text-align:center;margin-top:12px;font-size:13px;',
    'color:#3B2C1E;font-weight:700;}',
    '#a11y-panel .a11y-close{position:absolute;top:10px;left:10px;background:none;border:none;cursor:pointer;',
    'font-size:22px;line-height:1;color:#6b5b45;padding:4px;}',

    /* ---------- מצבי תצוגה (מוחלים על <html>) ---------- */
    /* ניגודיות גבוהה */
    'html.a11y-contrast,html.a11y-contrast body{background:#000!important;color:#fff!important;}',
    'html.a11y-contrast *:not(#a11y-fab):not(#a11y-fab *):not(#a11y-panel):not(#a11y-panel *){',
    'background-color:transparent!important;color:#fff!important;border-color:#fff!important;',
    'text-shadow:none!important;box-shadow:none!important;}',
    'html.a11y-contrast a:not(#a11y-panel a),html.a11y-contrast a *{color:#ffe600!important;}',
    'html.a11y-contrast img,html.a11y-contrast video{filter:grayscale(1) contrast(1.1);}',
    'html.a11y-contrast button:not(.a11y-btn):not(#a11y-fab),html.a11y-contrast .btn,',
    'html.a11y-contrast input,html.a11y-contrast textarea{background:#000!important;border:2px solid #fff!important;}',

    /* הדגשת קישורים */
    'html.a11y-links a:not(#a11y-panel a):not(#a11y-fab){text-decoration:underline!important;',
    'text-underline-offset:3px;font-weight:700!important;}',

    /* גופן קריא */
    'html.a11y-readable body,html.a11y-readable body *:not(#a11y-fab):not(#a11y-fab *):not(#a11y-panel):not(#a11y-panel *){',
    'font-family:Arial,"Helvetica Neue",Helvetica,sans-serif!important;letter-spacing:.02em!important;}',

    /* עצירת אנימציות */
    'html.a11y-no-motion *,html.a11y-no-motion *::before,html.a11y-no-motion *::after{',
    'animation-duration:0s!important;animation-iteration-count:1!important;transition-duration:0s!important;',
    'scroll-behavior:auto!important;}',

    /* סמן גדול */
    'html.a11y-cursor,html.a11y-cursor *{cursor:url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'48\' height=\'48\' viewBox=\'0 0 48 48\'%3E%3Cpath d=\'M6 3l30 18-12 3-3 12z\' fill=\'%23000\' stroke=\'%23fff\' stroke-width=\'2\'/%3E%3C/svg%3E") 4 4,auto!important;}'
  ].join('');

  function injectCSS() {
    var s = document.createElement('style');
    s.id = 'a11y-style';
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  /* ---------- אייקונים ---------- */
  var ICONS = {
    person: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="5" r="2.2"/><path d="M3 8h18M12 8v6m0 0l-3 6m3-6l3 6"/></svg>',
    zoom: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 19V8M9 19V8M4 8h5M14 19l5-13 5 13M15.5 15h7"/></svg>',
    contrast: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 3v18" fill="currentColor"/><path d="M12 3a9 9 0 010 18z" fill="currentColor"/></svg>',
    link: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M10 13a5 5 0 007 0l2-2a5 5 0 00-7-7l-1 1M14 11a5 5 0 00-7 0l-2 2a5 5 0 007 7l1-1"/></svg>',
    font: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 20l5-13 5 13M6 15h6M16 20V7m0 0h4m-4 0h-4"/></svg>',
    motion: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="9"/><rect x="9" y="9" width="2.5" height="6" fill="currentColor"/><rect x="13" y="9" width="2.5" height="6" fill="currentColor"/></svg>',
    cursor: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><path d="M5 3l13 8-5 1.5L11 18z"/></svg>',
    reset: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12a9 9 0 109-9 9 9 0 00-7 3.5M4 3v4h4"/></svg>'
  };

  /* ---------- בניית הווידג'ט ---------- */
  var panel, fab;

  function buildWidget() {
    fab = document.createElement('button');
    fab.id = 'a11y-fab';
    fab.type = 'button';
    fab.setAttribute('aria-label', 'תפריט נגישות');
    fab.setAttribute('aria-expanded', 'false');
    fab.setAttribute('aria-controls', 'a11y-panel');
    fab.innerHTML = ICONS.person;

    panel = document.createElement('div');
    panel.id = 'a11y-panel';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', 'אפשרויות נגישות');
    panel.innerHTML =
      '<button type="button" class="a11y-close" aria-label="סגור תפריט נגישות">&times;</button>' +
      '<h2>תפריט נגישות</h2>' +
      '<p class="a11y-sub">התאמת האתר לצרכים שלך</p>' +
      '<div class="a11y-grid">' +
        btn('zoom', ICONS.zoom, 'הגדלת טקסט', true) +
        btn('contrast', ICONS.contrast, 'ניגודיות גבוהה') +
        btn('links', ICONS.link, 'הדגשת קישורים') +
        btn('readable', ICONS.font, 'גופן קריא') +
        btn('noMotion', ICONS.motion, 'עצירת אנימציות') +
        btn('cursor', ICONS.cursor, 'סמן גדול') +
        '<button type="button" class="a11y-btn a11y-reset" data-act="reset">' +
          ICONS.reset + '<span>איפוס הגדרות</span></button>' +
      '</div>' +
      '<a class="a11y-statement" href="accessibility.html">הצהרת הנגישות שלנו &larr;</a>';

    document.body.appendChild(fab);
    document.body.appendChild(panel);

    fab.addEventListener('click', togglePanel);
    panel.querySelector('.a11y-close').addEventListener('click', closePanel);

    panel.addEventListener('click', function (e) {
      var b = e.target.closest('.a11y-btn');
      if (!b) return;
      var act = b.getAttribute('data-act');
      if (act === 'reset') { resetAll(); return; }
      if (act === 'zoom') { cycleZoom(); return; }
      state[act] = !state[act];
      apply();
      save();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && panel.getAttribute('data-open') === '1') closePanel();
    });
  }

  function btn(act, icon, label, isZoom) {
    return '<button type="button" class="a11y-btn" data-act="' + act + '" aria-pressed="false">' +
      icon + '<span>' + label + '</span>' +
      (isZoom ? '<span class="a11y-lvl" data-zoomlvl>100%</span>' : '') +
      '</button>';
  }

  function togglePanel() {
    if (panel.getAttribute('data-open') === '1') closePanel();
    else openPanel();
  }
  function openPanel() {
    panel.setAttribute('data-open', '1');
    fab.setAttribute('aria-expanded', 'true');
  }
  function closePanel() {
    panel.removeAttribute('data-open');
    fab.setAttribute('aria-expanded', 'false');
    fab.focus();
  }

  function cycleZoom() {
    state.zoom = (state.zoom + 1) % ZOOM_LEVELS.length;
    apply();
    save();
  }

  /* ---------- החלת מצב ---------- */
  function apply() {
    html.classList.toggle('a11y-contrast', state.contrast);
    html.classList.toggle('a11y-links', state.links);
    html.classList.toggle('a11y-readable', state.readable);
    html.classList.toggle('a11y-no-motion', state.noMotion || prefersReduced);
    html.classList.toggle('a11y-cursor', state.cursor);

    var z = ZOOM_LEVELS[state.zoom];
    document.body.style.zoom = z === 1 ? '' : z;

    pauseVideosIfNeeded();
    syncButtons();
  }

  function pauseVideosIfNeeded() {
    var stop = state.noMotion || prefersReduced;
    var vids = document.querySelectorAll('video');
    for (var i = 0; i < vids.length; i++) {
      var v = vids[i];
      if (stop) {
        try { v.pause(); v.removeAttribute('autoplay'); } catch (e) {}
      }
    }
  }

  function syncButtons() {
    if (!panel) return;
    var map = ['contrast', 'links', 'readable', 'noMotion', 'cursor'];
    for (var i = 0; i < map.length; i++) {
      var b = panel.querySelector('[data-act="' + map[i] + '"]');
      if (b) b.setAttribute('aria-pressed', state[map[i]] ? 'true' : 'false');
    }
    var zb = panel.querySelector('[data-act="zoom"]');
    if (zb) zb.setAttribute('aria-pressed', state.zoom > 0 ? 'true' : 'false');
    var lvl = panel.querySelector('[data-zoomlvl]');
    if (lvl) lvl.textContent = Math.round(ZOOM_LEVELS[state.zoom] * 100) + '%';
  }

  function resetAll() {
    state = { zoom: 0, contrast: false, links: false, readable: false, noMotion: false, cursor: false };
    apply();
    save();
  }

  /* ---------- קישור דילוג לתוכן ---------- */
  function injectSkipLink() {
    if (document.querySelector('.a11y-skip')) return;
    var target = document.getElementById('main') ||
      document.querySelector('main') ||
      document.getElementById('app');
    if (target && !target.id) target.id = 'main';
    var href = target ? '#' + (target.id || 'main') : '#main';
    var a = document.createElement('a');
    a.className = 'a11y-skip';
    a.href = href;
    a.textContent = 'דלג לתוכן הראשי';
    document.body.insertBefore(a, document.body.firstChild);
  }

  /* ---------- אתחול ---------- */
  function init() {
    load();
    injectCSS();
    injectSkipLink();
    buildWidget();
    apply();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
