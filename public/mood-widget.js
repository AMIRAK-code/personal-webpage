/* eileen mood widget — shows current vibe on every page, syncs across tabs */
(function () {
  var KEY = 'eileen_mood_v1';
  var MOODS = {
    1: { emoji: '🥂', label: 'lowkey in the mood' },
    2: { emoji: '🔥', label: 'highkey in the mood' },
    3: { emoji: '🥰', label: 'cuddles & kisses mode' },
    4: { emoji: '😌', label: 'just wanna chill' },
    5: { emoji: '😤', label: 'mad — tread carefully' },
    6: { emoji: '🥺', label: 'missing you' },
    7: { emoji: '🍕😤', label: 'hangry' },
    8: { emoji: '🐲', label: 'you already know' },
    9: { emoji: '🩸', label: 'period. literally.' },
  };

  /* ── inject styles once ─────────────────────────────────────── */
  if (!document.getElementById('eileen-widget-style')) {
    var style = document.createElement('style');
    style.id = 'eileen-widget-style';
    style.textContent = [
      '@keyframes eileenSlideIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}',
      '#eileen-mood-widget{',
      '  position:fixed;bottom:22px;right:22px;z-index:99999;',
      '  display:flex;align-items:center;gap:10px;',
      '  background:#fff;border:2px solid #f8bbd0;border-radius:999px;',
      '  padding:9px 16px 9px 12px;',
      '  box-shadow:0 6px 24px rgba(194,24,91,0.15);',
      '  font-family:Nunito,system-ui,sans-serif;font-size:13px;font-weight:700;',
      '  color:#c2185b;cursor:default;',
      '  animation:eileenSlideIn 0.35s cubic-bezier(0.34,1.56,0.64,1) both;',
      '  transition:opacity 0.3s,transform 0.3s;',
      '}',
      '#eileen-mood-widget:hover{transform:translateY(-2px);box-shadow:0 10px 32px rgba(194,24,91,0.22)}',
      '#eileen-mood-widget .em{font-size:20px;line-height:1}',
      '#eileen-mood-widget .lbl{white-space:nowrap}',
      '#eileen-mood-widget a{',
      '  font-size:10px;font-weight:600;color:#ddd;text-decoration:none;',
      '  margin-left:4px;transition:color 0.2s;',
      '}',
      '#eileen-mood-widget a:hover{color:#c2185b}',
    ].join('');
    document.head.appendChild(style);
  }

  /* ── render / update widget ────────────────────────────────── */
  function update() {
    var raw = localStorage.getItem(KEY);
    var id  = raw ? parseInt(raw, 10) : null;
    var el  = document.getElementById('eileen-mood-widget');

    if (!id || !MOODS[id]) {
      if (el) el.remove();
      return;
    }

    var m = MOODS[id];

    if (!el) {
      el = document.createElement('div');
      el.id = 'eileen-mood-widget';
      document.body.appendChild(el);
    }

    el.innerHTML =
      '<span class="em">' + m.emoji + '</span>' +
      '<span class="lbl">Eileen: ' + m.label + '</span>' +
      '<a href="/eileen.html" title="change mood">✏️</a>';
  }

  /* ── cross-tab sync via storage event ──────────────────────── */
  window.addEventListener('storage', function (e) {
    if (e.key === KEY) update();
  });

  /* ── same-origin real-time sync via BroadcastChannel ───────── */
  try {
    var bc = new BroadcastChannel('eileen_mood');
    bc.onmessage = function () { update(); };
    /* expose so eileen.html can broadcast after saving */
    window.__eileenBC = bc;
  } catch (_) {}

  /* ── init ───────────────────────────────────────────────────── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', update);
  } else {
    update();
  }
})();
