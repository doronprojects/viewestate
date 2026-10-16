// Light "ivory white" theme: flips light text / glass panels that sit on the page
// background to dark-on-light. Anything on a photo, video or dark panel is left as is.
// Pairs with theme-light.css; remove both to return to the original dark colors.
(function () {
  function rgba(c) {
    var m = c && c.match(/[\d.]+/g);
    if (!m) return null;
    return { r: +m[0], g: +m[1], b: +m[2], a: m[3] === undefined ? 1 : +m[3] };
  }
  function lum(o) { return (0.299 * o.r + 0.587 * o.g + 0.114 * o.b) / 255; }
  function sat(o) {
    var mx = Math.max(o.r, o.g, o.b), mn = Math.min(o.r, o.g, o.b);
    return mx ? (mx - mn) / mx : 0;
  }
  function onDarkSurface(el) {
    for (var p = el; p && p !== document.body; p = p.parentElement) {
      if (p.classList.contains('site-bg')) return true;
      var cs = getComputedStyle(p);
      var bg = rgba(cs.backgroundColor);
      if (bg && bg.a > 0.5 && lum(bg) < 0.45) return true;
      if (/url\(/.test(cs.backgroundImage)) return true;
      if (p !== el && p.querySelector(':scope > img, :scope > video, :scope > picture')) return true;
    }
    return false;
  }

  function recolor(root) {
    var list = root.querySelectorAll ? root.querySelectorAll('*') : [];
    for (var i = -1; i < list.length; i++) {
      var el = i < 0 ? root : list[i];
      if (!el.style || el === document.body || el.dataset.tl === '1' || onDarkSurface(el)) continue;
      var cs = getComputedStyle(el);
      var c = rgba(cs.color);
      if (c && lum(c) > 0.7) {
        el.style.setProperty('color', sat(c) > 0.25 ? 'rgba(138,100,32,' + c.a + ')' : 'rgba(28,16,8,' + Math.max(c.a, 0.75) + ')', 'important');
        var fill = rgba(cs.webkitTextFillColor);
        if (fill && lum(fill) > 0.7 && cs.backgroundClip !== 'text')
          el.style.setProperty('-webkit-text-fill-color', 'currentColor', 'important');
      }
      var b = rgba(cs.backgroundColor);
      if (b && b.a > 0 && b.a < 0.5 && lum(b) > 0.7)
        el.style.setProperty('background-color', 'rgba(154,114,48,' + Math.min(b.a * 1.6, 0.14) + ')', 'important');
      var bc = rgba(cs.borderTopColor);
      if (bc && parseFloat(cs.borderTopWidth) > 0 && lum(bc) > 0.7)
        el.style.setProperty('border-color', 'rgba(154,114,48,0.28)', 'important');
      el.dataset.tl = '1';
    }
  }

  recolor(document.body);
  window.addEventListener('load', function () { recolor(document.body); });

  // pages render cards / property details with JS — recolor whatever gets added
  var pending = [];
  new MutationObserver(function (muts) {
    muts.forEach(function (m) {
      m.addedNodes.forEach(function (n) { if (n.nodeType === 1) pending.push(n); });
    });
    if (pending.length) requestAnimationFrame(function () {
      var nodes = pending; pending = [];
      nodes.forEach(function (n) { if (n.isConnected) recolor(n); });
    });
  }).observe(document.body, { childList: true, subtree: true });
})();
