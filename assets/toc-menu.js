/* Clickable table-of-contents menu for the PreTeXt reveal.js decks.
 *
 * PreTeXt's reveal output has no source-level hook for page JavaScript, so this
 * is loaded into each built deck by appending
 *     <script src="external/toc-menu.js"></script>
 * before </body> (done by the deploy workflow's "menu" step, and locally by
 * scripts/inject-toc.py). It is self-contained: injects its own CSS, reads the
 * slide titles from the DOM, and jumps with Reveal.slide().
 */
(function () {
  var CSS = [
    '.rtoc-btn{position:fixed;top:14px;left:14px;z-index:60;width:42px;height:42px;',
    'border:none;border-radius:6px;background:#5b57d1;color:#fff;font-size:20px;',
    'line-height:42px;text-align:center;cursor:pointer;opacity:.5;transition:opacity .2s;padding:0}',
    '.rtoc-btn:hover{opacity:1}',
    '.rtoc-back{position:fixed;inset:0;z-index:61;background:rgba(0,0,0,.3);display:none}',
    '.rtoc-back.open{display:block}',
    '.rtoc-panel{position:fixed;top:0;left:0;z-index:62;width:360px;max-width:86vw;height:100%;',
    'overflow-y:auto;background:#fff;box-shadow:2px 0 18px rgba(0,0,0,.3);',
    'transform:translateX(-100%);transition:transform .25s ease;',
    'font-family:"Times New Roman",Georgia,serif;padding:1.2rem 0}',
    '.rtoc-panel.open{transform:translateX(0)}',
    '.rtoc-title{color:#5b57d1;font-weight:700;font-size:1.15rem;margin:.2rem 1.3rem 1rem}',
    '.rtoc-head{color:#5b57d1;font-weight:700;font-size:1.02rem;margin:1.1rem 1.3rem .35rem;',
    'cursor:pointer;text-decoration:none;display:block}',
    '.rtoc-head:hover{text-decoration:underline}',
    '.rtoc-panel a{display:block;padding:.4rem 1.3rem .4rem 1.7rem;color:#1f2328;',
    'text-decoration:none;font-size:.95rem;cursor:pointer}',
    '.rtoc-panel a:hover{background:#eef2ff;color:#1565c0}'
  ].join('');

  function ready(fn) {
    if (window.Reveal && Reveal.isReady && Reveal.isReady()) fn();
    else setTimeout(function () { ready(fn); }, 150);
  }

  ready(function () {
    if (document.querySelector('.rtoc-btn')) return;

    var st = document.createElement('style');
    st.textContent = CSS;
    document.head.appendChild(st);

    var btn = document.createElement('button');
    btn.className = 'rtoc-btn';
    btn.setAttribute('aria-label', 'Contents');
    btn.title = 'Contents (m)';
    btn.innerHTML = '☰';

    var back = document.createElement('div');
    back.className = 'rtoc-back';

    var panel = document.createElement('nav');
    panel.className = 'rtoc-panel';

    var heading = document.createElement('div');
    heading.className = 'rtoc-title';
    heading.textContent = 'Contents';
    panel.appendChild(heading);

    Reveal.getSlides().forEach(function (s) {
      var head = s.querySelector('h1, h2, h3');
      if (!head) return;
      var title = head.textContent.trim();
      if (!title) return;
      var tag = head.tagName.toLowerCase();
      var idx = Reveal.getIndices(s);
      if (tag === 'h1' || tag === 'h2') {
        var hd = document.createElement('a');
        hd.className = 'rtoc-head';
        hd.textContent = title;
        hd.addEventListener('click', function () {
          Reveal.slide(idx.h, idx.v);
          closeM();
        });
        panel.appendChild(hd);
      } else {
        var a = document.createElement('a');
        a.textContent = title;
        a.addEventListener('click', function () {
          Reveal.slide(idx.h, idx.v);
          closeM();
        });
        panel.appendChild(a);
      }
    });

    function openM() { panel.classList.add('open'); back.classList.add('open'); }
    function closeM() { panel.classList.remove('open'); back.classList.remove('open'); }

    btn.addEventListener('click', openM);
    back.addEventListener('click', closeM);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'm' || e.key === 'M') {
        panel.classList.contains('open') ? closeM() : openM();
      }
    });

    document.body.appendChild(btn);
    document.body.appendChild(back);
    document.body.appendChild(panel);
  });
})();
