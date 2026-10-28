/* My Memory - original personal memory app. Static, offline, no backend. Data stays in this browser's localStorage. */
(function () {
'use strict';
var KEY = 'mymemory.v1';
var TYPES = ['note', 'reminder', 'task', 'idea'];
var TYPE_LABEL = { note: 'Note', reminder: 'Reminder', task: 'Task', idea: 'Idea' };
var TYPE_ICON = { note: '\uD83D\uDCDD', reminder: '\u23F0', task: '\u2705', idea: '\uD83D\uDCA1' };
var ACCENTS = { green: ['#34d27b', '#04210f'], blue: ['#4da3ff', '#04152b'], orange: ['#ff9f43', '#2b1500'], pink: ['#ff6fae', '#2b0615'], purple: ['#b18cff', '#150a2b'] };
var DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
var MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/* ---------- helpers ---------- */
function $(s, r) { return (r || document).querySelector(s); }
function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 8); }
function pad(n) { return (n < 10 ? '0' : '') + n; }
function sameDay(a, b) { return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate(); }
function startOfDay(d) { var x = new Date(d); x.setHours(0, 0, 0, 0); return x; }
function addDays(d, n) { var x = new Date(d); x.setDate(x.getDate() + n); return x; }
function toInput(ms) { var d = new Date(ms); return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()) + 'T' + pad(d.getHours()) + ':' + pad(d.getMinutes()); }
function fromInput(v) { if (!v) return null; var t = new Date(v).getTime(); return isNaN(t) ? null : t; }
function fmtTime(d) { var h = d.getHours(), m = d.getMinutes(); return ((h % 12) || 12) + ':' + pad(m) + ' ' + (h < 12 ? 'AM' : 'PM'); }
function fmtDate(ms, now) {
  now = now || new Date(); var d = new Date(ms), t = startOfDay(now);
  var label;
  if (sameDay(d, now)) label = 'Today';
  else if (sameDay(d, addDays(t, 1))) label = 'Tomorrow';
  else if (sameDay(d, addDays(t, -1))) label = 'Yesterday';
  else label = DAYS[d.getDay()] + ' ' + d.getDate() + ' ' + MON[d.getMonth()] + (d.getFullYear() !== now.getFullYear() ? ' ' + d.getFullYear() : '');
  return label + ', ' + fmtTime(d);
}
function repeatLabel(r) { return r === 'daily' ? 'every day' : r === 'weekly' ? 'every week' : r === 'monthly' ? 'every month' : ''; }
function parseTags(text) {
  var out = [], re = /#([A-Za-z0-9_\-\u00C0-\u024F\u0900-\u097F\u0C80-\u0CFF]+)/g, m;
  while ((m = re.exec(text || ''))) { var t = m[1].toLowerCase(); if (out.indexOf(t) < 0) out.push(t); }
  return out;
}

/* ---------- natural-language date parser (own, small) ---------- */
var WDRE = '(?:sunday|monday|tuesday|wednesday|thursday|friday|saturday|sun|mon|tues?|wed|thu(?:rs?)?|fri|sat)';
var MORE = '(?:jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|june?|july?|aug(?:ust)?|sep(?:t(?:ember)?)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)';
function wdIndex(s) { return ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'].indexOf(s.slice(0, 3)); }
function monIndex(s) { return ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'].indexOf(s.slice(0, 3)); }
function parseWhen(text, nowIn) {
  var now = nowIn ? new Date(nowIn) : new Date();
  var t = ' ' + String(text || '').toLowerCase() + ' ';
  var found = [], repeat = null, day = null, time = null, relMs = null, dayKind = '', weekdayRepeat = false, bareWeekday = false;
  function take(re) { var m = t.match(re); if (m) { found.push(m[0].trim()); t = t.replace(m[0], ' '); } return m; }
  function offsetTo(wd, forceNext) { var o = (wd - now.getDay() + 7) % 7; if (forceNext && o === 0) o = 7; return o; }
  var m;
  /* repeat */
  if ((m = take(new RegExp('\\bevery\\s+(' + WDRE + ')\\b')))) { repeat = 'weekly'; weekdayRepeat = true; day = addDays(startOfDay(now), offsetTo(wdIndex(m[1]), false)); dayKind = 'weekday'; }
  else if (take(/\b(every\s*day|everyday|daily)\b/)) repeat = 'daily';
  else if (take(/\b(every\s*week|weekly)\b/)) repeat = 'weekly';
  else if (take(/\b(every\s*month|monthly)\b/)) repeat = 'monthly';
  /* relative offsets */
  if ((m = take(/\bin\s+(\d+(?:\.\d+)?|an?|half an)\s*(minutes?|mins?|hours?|hrs?|days?|weeks?)\b/))) {
    var n = /^[\d.]/.test(m[1]) ? parseFloat(m[1]) : (m[1] === 'half an' ? 0.5 : 1), u = m[2][0];
    if (u === 'm') relMs = n * 60000; else if (u === 'h') relMs = n * 3600000;
    else { day = addDays(startOfDay(now), Math.round(n * (u === 'w' ? 7 : 1))); dayKind = 'rel'; }
  }
  /* day words */
  if (relMs == null && !day) {
    if (take(/\bday after tomorrow\b/)) { day = addDays(startOfDay(now), 2); dayKind = 'fixed'; }
    else if (take(/\b(tomorrow|tmrw|tmr)\b/)) { day = addDays(startOfDay(now), 1); dayKind = 'fixed'; }
    else if (take(/\btonight\b/)) { day = startOfDay(now); dayKind = 'today'; if (!time) time = { h: 21, m: 0, soft: true }; }
    else if (take(/\btoday\b/)) { day = startOfDay(now); dayKind = 'today'; }
    else if (take(/\bnext\s+week\b/)) { day = addDays(startOfDay(now), 7); dayKind = 'fixed'; }
    else if ((m = take(new RegExp('\\bnext\\s+(' + WDRE + ')\\b')))) { day = addDays(startOfDay(now), offsetTo(wdIndex(m[1]), true)); dayKind = 'weekday'; }
    else if ((m = take(new RegExp('\\b(?:on|this)\\s+(' + WDRE + ')\\b'))) || (m = take(/\b(sunday|monday|tuesday|wednesday|thursday|friday|saturday)\b/))) { day = addDays(startOfDay(now), offsetTo(wdIndex(m[1]), false)); dayKind = 'weekday'; bareWeekday = true; }
    else if ((m = take(new RegExp('\\b(?:on\\s+)?(\\d{1,2})(?:st|nd|rd|th)?\\s+(?:of\\s+)?(' + MORE + ')\\b(?:\\s*,?\\s*(\\d{4}))?'))) ) { day = mkDate(+m[1], monIndex(m[2]), m[3] ? +m[3] : null); dayKind = 'fixed'; }
    else if ((m = take(new RegExp('\\b(?:on\\s+)?(' + MORE + ')\\s+(\\d{1,2})(?:st|nd|rd|th)?\\b(?:\\s*,?\\s*(\\d{4}))?')))) { day = mkDate(+m[2], monIndex(m[1]), m[3] ? +m[3] : null); dayKind = 'fixed'; }
    else if ((m = take(/\b(?:on\s+)?(\d{1,2})[\/\-](\d{1,2})(?:[\/\-](\d{2,4}))?\b/))) { var yy = m[3] ? (+m[3] < 100 ? 2000 + +m[3] : +m[3]) : null; day = mkDate(+m[1], +m[2] - 1, yy); dayKind = 'fixed'; }
  }
  function mkDate(d, mo, y) {
    if (mo < 0 || mo > 11 || d < 1 || d > 31) return null;
    var yr = y || now.getFullYear(), dt = new Date(yr, mo, d);
    if (dt.getMonth() !== mo) return null;
    if (!y && startOfDay(dt) < startOfDay(now)) dt = new Date(yr + 1, mo, d);
    return dt;
  }
  /* time of day */
  if ((m = take(/\b(?:at\s+)?(\d{1,2})(?::(\d{2}))?\s*(a\.?m\.?|p\.?m\.?)(?![a-z])/))) {
    var h = +m[1], mi = m[2] ? +m[2] : 0, pm = m[3][0] === 'p';
    if (h >= 1 && h <= 12 && mi < 60) { time = { h: (h % 12) + (pm ? 12 : 0), m: mi }; } else { found.pop(); }
  } else if ((m = take(/\b(?:at\s+)?([01]?\d|2[0-3]):([0-5]\d)\b/))) { time = { h: +m[1], m: +m[2] }; }
  else if (take(/\b(?:at\s+)?noon\b/)) time = { h: 12, m: 0 };
  else if (take(/\b(?:at\s+)?midnight\b/)) time = { h: 0, m: 0 };
  else if ((m = take(/\b(?:this|in the|at)\s+(morning|afternoon|evening)\b/))) time = { h: m[1] === 'morning' ? 9 : m[1] === 'afternoon' ? 15 : 18, m: 0 };
  /* compose */
  var date = null;
  if (relMs != null) { date = new Date(now.getTime() + relMs); }
  else {
    if (!day && (time || repeat)) { day = startOfDay(now); dayKind = 'auto'; }
    if (day) {
      date = new Date(day);
      if (time) date.setHours(time.h, time.m, 0, 0);
      else if (dayKind === 'rel') date.setHours(now.getHours(), now.getMinutes(), 0, 0);
      else if (dayKind === 'today' || dayKind === 'auto') {
        date.setHours(18, 0, 0, 0);
        if (date <= now) date = new Date(Math.ceil((now.getTime() + 3600000) / 300000) * 300000);
      } else date.setHours(9, 0, 0, 0);
      if (date <= now) {
        if (dayKind === 'auto') date = addDays(date, 1);
        else if (dayKind === 'weekday' && (weekdayRepeat || bareWeekday)) date = addDays(date, 7);
      }
    }
  }
  if (!date || isNaN(date.getTime())) return { date: null, repeat: repeat, found: found.length ? found : [] , ok: false };
  return { date: date.getTime(), repeat: repeat, found: found, ok: true };
}
function nextDue(due, repeat, now) {
  now = now || Date.now(); var d = new Date(due), g = 0;
  do {
    if (repeat === 'daily') d.setDate(d.getDate() + 1);
    else if (repeat === 'weekly') d.setDate(d.getDate() + 7);
    else if (repeat === 'monthly') d.setMonth(d.getMonth() + 1);
    else break;
  } while (d.getTime() <= now && ++g < 800);
  return d.getTime();
}

/* ---------- storage ---------- */
var memStore = null, storageOK = true, storageErr = '';
function defaults() { return { version: 1, settings: { name: '', accent: 'green', cc: '91' }, items: [], boards: [], people: [], inbox: [], apps: [] }; }
function sanitizeItem(x) {
  if (!x || typeof x !== 'object' || typeof x.text !== 'string' || !x.text.trim()) return null;
  var type = TYPES.indexOf(x.type) >= 0 ? x.type : 'note';
  var due = typeof x.due === 'number' && isFinite(x.due) ? x.due : null;
  var rep = ['daily', 'weekly', 'monthly'].indexOf(x.repeat) >= 0 ? x.repeat : null;
  var created = typeof x.created === 'number' ? x.created : Date.now();
  return { id: typeof x.id === 'string' && x.id ? x.id : uid(), personId: typeof x.personId === 'string' && x.personId ? x.personId : null, text: x.text, type: type, tags: parseTags(x.text), due: due, repeat: rep, done: !!x.done, pinned: !!x.pinned, created: created, updated: typeof x.updated === 'number' ? x.updated : created };
}
function str(v, n) { return typeof v === 'string' ? v.slice(0, n) : ''; }
function sanitizeData(d) {
  var out = defaults();
  if (d && d.settings) { out.settings.name = typeof d.settings.name === 'string' ? d.settings.name.slice(0, 40) : ''; out.settings.accent = ACCENTS[d.settings.accent] ? d.settings.accent : 'green'; out.settings.cc = typeof d.settings.cc === 'string' && /^\d{1,4}$/.test(d.settings.cc) ? d.settings.cc : '91'; }
  function arr(k) { return d && Array.isArray(d[k]) ? d[k] : []; }
  var ids = {};
  function id(x) { var v = typeof x.id === 'string' && x.id && !ids[x.id] ? x.id : uid(); ids[v] = 1; return v; }
  arr('people').forEach(function (x) { if (x && typeof x === 'object' && str(x.name, 60).trim()) out.people.push({ id: id(x), name: str(x.name, 60).trim(), phone: str(x.phone, 30).trim() }); });
  arr('apps').forEach(function (x) { if (x && typeof x === 'object' && str(x.name, 60).trim() && /^https?:\/\//i.test(str(x.url, 500))) out.apps.push({ id: id(x), name: str(x.name, 60).trim(), url: str(x.url, 500) }); });
  arr('inbox').forEach(function (x) { if (x && typeof x === 'object' && str(x.text, 2000).trim()) out.inbox.push({ id: id(x), text: str(x.text, 2000), type: TYPES.indexOf(x.type) >= 0 ? x.type : null, created: typeof x.created === 'number' ? x.created : Date.now() }); });
  arr('boards').forEach(function (b) {
    if (!b || typeof b !== 'object' || !str(b.name, 60).trim()) return;
    var cards = (Array.isArray(b.cards) ? b.cards : []).filter(function (c) { return c && typeof c === 'object' && str(c.title, 300).trim(); }).map(function (c) {
      return { id: id(c), title: str(c.title, 300).trim(), col: c.col === 1 || c.col === 2 ? c.col : 0, memId: typeof c.memId === 'string' && c.memId ? c.memId : null, created: typeof c.created === 'number' ? c.created : Date.now() };
    });
    out.boards.push({ id: id(b), name: str(b.name, 60).trim(), cards: cards });
  });
  var items = arr('items');
  var seen = {};
  items.forEach(function (x) { var s = sanitizeItem(x); if (s && !seen[s.id]) { seen[s.id] = 1; out.items.push(s); } });
  return out;
}
var data;
function load() {
  try {
    var raw = localStorage.getItem(KEY);
    data = raw ? sanitizeData(JSON.parse(raw)) : defaults();
  } catch (e) { data = defaults(); storageOK = false; storageErr = String(e && e.message || e); }
}
function save() {
  try { localStorage.setItem(KEY, JSON.stringify(data)); return true; }
  catch (e) { storageOK = false; storageErr = String(e && e.message || e); toast('Could not save. Storage is full or blocked.', true); return false; }
}
function byId(id) { for (var i = 0; i < data.items.length; i++) if (data.items[i].id === id) return data.items[i]; return null; }
function bytes(n) { return n < 1024 ? n + ' B' : n < 1048576 ? (n / 1024).toFixed(1) + ' KB' : (n / 1048576).toFixed(2) + ' MB'; }
function utf8len(s) { try { return new Blob([s]).size; } catch (e) { return s.length; } }

/* ---------- ui state ---------- */
function newF() { return { q: '', type: 'all', status: 'all', tag: '', id: '' }; }
function newDraft() { return { text: '', type: 'note', typeManual: false, dt: '', ignore: false, person: '' }; }
var ui = { tab: 'capture', sub: null, boardId: null, inText: '', draft: newDraft(), f: newF(), askQ: '', askRes: null, share: null };
var alerted = {};
var view = $('#view');

function toast(msg, err) {
  var t = $('#toast'); t.textContent = msg; t.className = 'show' + (err ? ' err' : '');
  clearTimeout(toast._t); toast._t = setTimeout(function () { t.className = ''; }, 2600);
}
function copyText(txt) {
  return new Promise(function (res, rej) {
    function fallback() {
      try {
        var ta = document.createElement('textarea'); ta.value = txt; ta.setAttribute('readonly', ''); ta.style.cssText = 'position:fixed;top:0;left:0;opacity:0';
        document.body.appendChild(ta); ta.focus(); ta.select(); ta.setSelectionRange(0, txt.length);
        var ok = document.execCommand('copy'); document.body.removeChild(ta); ok ? res() : rej(new Error('copy failed'));
      } catch (e) { rej(e); }
    }
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(res, fallback); else fallback();
  });
}

/* ---------- dialogs / sheets ---------- */
var dialogResolve = null;
function openOverlay(html) { var o = $('#overlay'); o.innerHTML = html; o.hidden = false; }
function closeOverlay() { var o = $('#overlay'); o.hidden = true; o.innerHTML = ''; if (dialogResolve) { var r = dialogResolve; dialogResolve = null; r(null); } }
function dialog(title, body, buttons) {
  return new Promise(function (res) {
    dialogResolve = res;
    openOverlay('<div class="dialog" role="alertdialog"><h3>' + esc(title) + '</h3><p class="muted">' + esc(body) + '</p>' +
      buttons.map(function (b) { return '<button class="btn ' + (b.cls || '') + '" data-d="' + esc(b.val) + '" style="margin-top:10px">' + esc(b.label) + '</button>'; }).join('') + '</div>');
  });
}
function confirmBox(title, body, okLabel, danger) {
  return dialog(title, body, [{ label: okLabel, val: 'ok', cls: danger ? 'danger' : 'primary' }, { label: 'Cancel', val: 'cancel' }]).then(function (v) { return v === 'ok'; });
}

/* ---------- derived ---------- */
function resolveDraft() {
  var d = ui.draft, p = parseWhen(d.text);
  var type = (!d.typeManual && p.ok) ? 'reminder' : d.type;
  var usesTime = type === 'reminder' || type === 'task';
  var manual = fromInput(d.dt), due = null, src = '', repeat = null;
  if (usesTime) {
    if (manual != null) { due = manual; src = 'picker'; }
    else if (p.ok && !d.ignore) { due = p.date; src = 'text'; }
    if (!d.ignore && p.repeat) repeat = p.repeat;
  }
  return { p: p, type: type, usesTime: usesTime, due: due, src: src, repeat: repeat, tags: parseTags(d.text), person: usesTime && byPerson(d.person) ? d.person : null };
}
function dueItems() {
  var now = Date.now();
  return data.items.filter(function (i) { return !i.done && i.due != null && i.due <= now; }).sort(function (a, b) { return a.due - b.due; });
}

/* ---------- views ---------- */
function renderTabs() {
  var tabs = [['capture', '\u2795', 'Capture'], ['list', '\uD83D\uDDC2', 'Memories'], ['today', '\uD83D\uDCC5', 'Today'], ['ask', '\uD83D\uDD0D', 'Ask'], ['more', '\u2630', 'More']];
  var n = dueItems().length;
  $('#tabs').innerHTML = tabs.map(function (t) {
    return '<button data-a="tab" data-t="' + t[0] + '" class="' + (ui.tab === t[0] ? 'on' : '') + '" aria-label="' + t[2] + '"><span class="ic">' + t[1] + '</span>' + t[2] + (t[0] === 'today' && n ? '<span class="badge">' + n + '</span>' : '') + (t[0] === 'more' && data.inbox.length ? '<span class="badge" style="background:var(--accent);color:var(--accent-ink)">' + data.inbox.length + '</span>' : '') + '</button>';
  }).join('');
}
function applyAccent() {
  var a = ACCENTS[data.settings.accent] || ACCENTS.green;
  document.documentElement.style.setProperty('--accent', a[0]); document.documentElement.style.setProperty('--accent-ink', a[1]);
}
function render() {
  applyAccent(); renderTabs();
  var fn = { capture: vCapture, list: vList, today: vToday, ask: vAsk, more: vMore }[ui.tab];
  view.innerHTML = fn();
  if (ui.tab === 'capture') updatePreview();
  if (ui.tab === 'list') renderResults();
  view.scrollTop = 0;
}
function storageBanner() { return storageOK ? '' : '<div class="preview err">Storage is blocked or full (' + esc(storageErr) + '). Your memories will not be kept after you close the app. Export what you can from Settings.</div>'; }

function vCapture() {
  var d = ui.draft, n = data.settings.name;
  return '<h1>' + (n ? 'Hi ' + esc(n) + ', what should I remember?' : 'What should I remember?') + '</h1>' +
    '<p class="muted small">Saved on this device only. No WhatsApp connection. Paste a message here to keep it.</p>' + storageBanner() +
    '<div class="card"><textarea id="cText" placeholder="e.g. Call mom tomorrow 6pm #family" aria-label="Memory text">' + esc(d.text) + '</textarea>' +
    '<div class="row" style="margin-top:10px"><button class="btn sm" data-a="paste" style="flex:1">\uD83D\uDCCB Paste from clipboard</button><button class="btn sm" data-a="clearDraft" style="flex:0 0 auto">Clear</button></div>' +
    '<div class="chips" id="typeChips"></div>' +
    '<div id="dtWrap"></div>' +
    '<div id="cPrev"></div>' +
    '<button class="btn primary" data-a="saveDraft" style="margin-top:14px" id="saveBtn">Save memory</button></div>' +
    '<p class="muted small" style="padding:0 6px">Tips: add #tags anywhere. Try "in 2 hours", "tomorrow 6pm", "on 30 Oct", "every day 8am", "next monday".</p>';
}
function updatePreview() {
  var d = ui.draft, r = resolveDraft(), now = new Date();
  $('#typeChips').innerHTML = TYPES.map(function (t) { return '<button class="chip ' + (r.type === t ? 'on' : '') + '" data-a="setType" data-t="' + t + '">' + TYPE_ICON[t] + ' ' + TYPE_LABEL[t] + '</button>'; }).join('');
  var dw = $('#dtWrap');
  if (r.usesTime) {
    if (!dw.firstChild) dw.innerHTML = '<label class="lbl" for="cDt">' + 'Date and time (optional, overrides the text)</label><input type="datetime-local" id="cDt">';
    var inp = $('#cDt'); if (inp.value !== d.dt) inp.value = d.dt;
    var pw = $('#pWrap');
    if (!pw) { dw.insertAdjacentHTML('beforeend', '<div id="pWrap"></div>'); pw = $('#pWrap'); }
    var want = data.people.length ? '<label class="lbl" for="cPerson">For a person (optional)</label><select id="cPerson"><option value="">Just me</option>' + data.people.map(function (p) { return '<option value="' + esc(p.id) + '"' + (d.person === p.id ? ' selected' : '') + '>' + esc(p.name) + '</option>'; }).join('') + '</select><p class="muted small" style="margin:6px 4px 0">After saving you can tap Send on WhatsApp. It opens WhatsApp with the text ready and you press Send yourself.</p>' : '';
    if (pw.getAttribute('data-k') !== want) { pw.innerHTML = want; pw.setAttribute('data-k', want); }
  } else dw.innerHTML = '';
  var h = '';
  if (!d.text.trim()) h = '';
  else {
    h = '<b>Will save as:</b> ' + TYPE_ICON[r.type] + ' ' + TYPE_LABEL[r.type];
    if (r.usesTime) {
      if (r.due != null) h += '<br><b>When:</b> ' + esc(fmtDate(r.due, now)) + (r.src === 'text' ? ' <span class="muted">(read from "' + esc(r.p.found.join(' ')) + '")</span>' : ' <span class="muted">(from the picker)</span>');
      else h += '<br><b>When:</b> <span class="muted">no time found</span>';
      if (r.repeat) h += '<br><b>Repeats:</b> ' + repeatLabel(r.repeat);
      if (r.src === 'text' || (r.p.ok && !d.ignore && r.src === 'picker')) h += '<br><button class="chip" style="min-height:34px;margin-top:8px;font-size:13px" data-a="ignoreParse">Ignore detected time</button>';
      else if (d.ignore && r.p.ok) h += '<br><button class="chip" style="min-height:34px;margin-top:8px;font-size:13px" data-a="useParse">Use detected time</button>';
    } else if (r.p.ok) {
      h += '<br><span class="muted">Found "' + esc(r.p.found.join(' ')) + '" but ' + TYPE_LABEL[r.type] + 's have no time. Choose Reminder or Task to use it.</span>';
    }
    if (r.person) h += '<br><b>For:</b> \uD83D\uDC64 ' + esc(byPerson(r.person).name);
    if (r.tags.length) h += '<br><b>Tags:</b> ' + r.tags.map(function (t) { return '#' + esc(t); }).join(' ');
  }
  $('#cPrev').innerHTML = h ? '<div class="preview" id="prevBox">' + h + '</div>' : '';
}

function memCard(i, opts) {
  opts = opts || {};
  var now = Date.now(), over = i.due != null && !i.done && i.due < now;
  var h = '<div class="card ' + (i.pinned ? 'pin ' : '') + (i.done ? 'done' : '') + '" data-id="' + esc(i.id) + '">' +
    '<div class="row" style="justify-content:space-between;align-items:center;gap:6px"><span class="pill ' + i.type + '">' + TYPE_ICON[i.type] + ' ' + TYPE_LABEL[i.type] + '</span>' +
    '<span class="meta">' + (i.pinned ? '\uD83D\uDCCC Pinned \u00B7 ' : '') + (i.done ? 'Done' : 'Open') + '</span></div>' +
    '<div class="mtext">' + esc(i.text) + '</div>';
  if (i.due != null) h += '<div class="meta ' + (over ? 'over' : '') + '">' + (over ? 'Overdue \u00B7 ' : '\u23F0 ') + esc(fmtDate(i.due)) + (i.repeat ? ' \u00B7 repeats ' + repeatLabel(i.repeat) : '') + '</div>';
  var pr = i.personId ? byPerson(i.personId) : null;
  if (pr) h += '<div class="meta" style="margin-top:4px">\uD83D\uDC64 For ' + esc(pr.name) + (normPhone(pr.phone, data.settings.cc) ? ' \u00B7 WhatsApp opens with the text ready, you tap Send' : ' \u00B7 no phone number saved') + '</div>';
  if (i.tags.length) h += '<div class="chips" style="margin:8px 0 0">' + i.tags.map(function (t) { return '<button class="chip tag" data-a="tagFilter" data-tag="' + esc(t) + '">#' + esc(t) + '</button>'; }).join('') + '</div>';
  h += '<div class="acts">';
  if (opts.snooze && !i.done) h += '<button class="btn sm" data-a="snooze" data-id="' + esc(i.id) + '">Snooze 10 min</button>';
  if (pr && normPhone(pr.phone, data.settings.cc)) h += '<a class="btn sm" style="text-decoration:none" target="_blank" rel="noopener" data-wa="1" href="' + esc(waUrl(pr, memMessage(i, pr))) + '">Send on WhatsApp</a>';
  h += '<button class="btn sm ' + (i.done ? '' : 'primary') + '" data-a="toggleDone" data-id="' + esc(i.id) + '">' + (i.done ? 'Undo' : (i.repeat ? 'Done, next' : 'Done')) + '</button>' +
    '<button class="btn sm" data-a="pin" data-id="' + esc(i.id) + '">' + (i.pinned ? 'Unpin' : 'Pin') + '</button>' +
    '<button class="btn sm" data-a="share" data-id="' + esc(i.id) + '">Share</button>' +
    '<button class="btn sm" data-a="edit" data-id="' + esc(i.id) + '">Edit</button>' +
    '<button class="btn sm danger" data-a="del" data-id="' + esc(i.id) + '">Delete</button></div></div>';
  return h;
}
function allTags() { var s = {}; data.items.forEach(function (i) { i.tags.forEach(function (t) { s[t] = 1; }); }); return Object.keys(s).sort(); }
function vList() {
  var f = ui.f, tags = allTags();
  var h = '<h1>Memories</h1><p class="muted small">' + data.items.length + ' saved on this device</p>' +
    '<input type="search" id="q" placeholder="Search text or #tags" value="' + esc(f.q) + '" aria-label="Search memories">' +
    '<div class="chips">' + [['all', 'All']].concat(TYPES.map(function (t) { return [t, TYPE_LABEL[t] + 's']; })).map(function (t) { return '<button class="chip ' + (f.type === t[0] ? 'on' : '') + '" data-a="fType" data-v="' + t[0] + '">' + t[1] + '</button>'; }).join('') + '</div>' +
    '<div class="chips" style="margin-top:0">' + [['all', 'Any status'], ['open', 'Open'], ['done', 'Done']].map(function (t) { return '<button class="chip ' + (f.status === t[0] ? 'on' : '') + '" data-a="fStatus" data-v="' + t[0] + '">' + t[1] + '</button>'; }).join('') + '</div>' +
    '<select id="tagSel" aria-label="Filter by tag"><option value="">All tags</option>' + tags.map(function (t) { return '<option value="' + esc(t) + '"' + (f.tag === t ? ' selected' : '') + '>#' + esc(t) + '</option>'; }).join('') + '</select>' +
    '<div id="clrWrap"></div><div id="results" style="margin-top:14px"></div>';
  if (f.id) h = h.replace('<input type="search"', '<div class="preview">Showing one linked memory. <button class="chip" style="min-height:34px;font-size:13px" data-a="clearFilters">Show all</button></div><input type="search"');
  return h;
}
function filtered() {
  var f = ui.f, words = f.q.toLowerCase().replace(/#/g, '').split(/\s+/).filter(Boolean);
  return data.items.filter(function (i) {
    if (f.id && i.id !== f.id) return false;
    if (f.type !== 'all' && i.type !== f.type) return false;
    if (f.status === 'open' && i.done) return false;
    if (f.status === 'done' && !i.done) return false;
    if (f.tag && i.tags.indexOf(f.tag) < 0) return false;
    var hay = (i.text + ' ' + i.tags.join(' ')).toLowerCase();
    return words.every(function (w) { return hay.indexOf(w) >= 0; });
  }).sort(function (a, b) { return (b.pinned - a.pinned) || (a.done - b.done) || (b.created - a.created); });
}
function renderResults() {
  var box = $('#results'); if (!box) return;
  var list = filtered(), f = ui.f, active = f.q || f.type !== 'all' || f.status !== 'all' || f.tag;
  $('#clrWrap').innerHTML = active && !f.id ? '<button class="chip" style="margin-top:10px;min-height:34px;font-size:13px" data-a="clearFilters">Clear filters</button>' : '';
  if (!data.items.length) { box.innerHTML = '<div class="empty"><div class="big">\uD83E\uDDE0</div><p><b>No memories yet</b></p><p>Capture your first note, reminder, task or idea.</p><button class="btn primary" data-a="tab" data-t="capture">Add a memory</button></div>'; return; }
  if (!list.length) { box.innerHTML = '<div class="empty"><div class="big">\uD83D\uDD0E</div><p><b>No matches</b></p><p>Try different words or clear the filters.</p><button class="btn" data-a="clearFilters">Clear filters</button></div>'; return; }
  box.innerHTML = '<p class="muted small" style="margin:0 4px 8px">' + list.length + ' shown</p>' + list.map(function (i) { return memCard(i); }).join('');
}

function vToday() {
  var now = new Date(), end = addDays(startOfDay(now), 1).getTime(), t0 = Date.now();
  var open = data.items.filter(function (i) { return !i.done && i.due != null; }).sort(function (a, b) { return a.due - b.due; });
  var over = open.filter(function (i) { return i.due < t0; });
  var today = open.filter(function (i) { return i.due >= t0 && i.due < end; });
  var soon = open.filter(function (i) { return i.due >= end && i.due < end + 6 * 86400000; });
  var pinned = data.items.filter(function (i) { return i.pinned && !i.done && i.due == null; });
  var h = '<h1>Today</h1><p class="muted small">' + DAYS[now.getDay()] + ' ' + now.getDate() + ' ' + MON[now.getMonth()] + (data.settings.name ? ' \u00B7 ' + esc(data.settings.name) : '') + '</p>' + myDayCard() + notifCard();
  function sec(title, arr, snooze) { return arr.length ? '<h2>' + title + ' (' + arr.length + ')</h2>' + arr.map(function (i) { return memCard(i, { snooze: snooze }); }).join('') : ''; }
  h += sec('Overdue', over, true) + sec('Due today', today, true) + sec('Next 7 days', soon, false) + sec('Pinned', pinned, false);
  if (!over.length && !today.length && !soon.length && !pinned.length) h += '<div class="empty"><div class="big">\uD83C\uDF3F</div><p><b>Nothing due</b></p><p>Reminders and tasks with a time will show up here.</p><button class="btn primary" data-a="tab" data-t="capture">Add a reminder</button></div>';
  return h;
}
function notifState() {
  if (typeof Notification === 'undefined') return 'unsupported';
  return Notification.permission;
}
function notifCard() {
  var s = notifState(), msg, btn = '';
  if (s === 'granted') msg = 'Alerts are on. You will see a banner and a notification while My Memory is open. It cannot notify you when it is closed.';
  else if (s === 'denied') msg = 'Notifications are blocked in your browser settings. You will still get the in-app banner while the app is open.';
  else if (s === 'unsupported') msg = 'This browser has no notification support. On iPhone, Add to Home Screen first (iOS 16.4 or later), then reopen from the icon. You still get the in-app banner while the app is open.';
  else { msg = 'iOS only allows notifications for apps added to the Home Screen. Even then, alerts only appear while My Memory is open. There are no background notifications.'; btn = '<button class="btn sm primary" data-a="enableNotif" style="margin-top:6px">Enable alerts</button>'; }
  return '<div class="card"><b>Reminder alerts</b><p class="muted small" style="margin:6px 0">' + esc(msg) + '</p>' + btn + '</div>';
}

var STOP = 'a an and are as at be but by for from has have i in is it me my of on or the this that to was what when where which who with about do did does any all tell show find'.split(' ');
function askSearch(q) {
  var raw = q.toLowerCase().replace(/[^\p{L}\p{N}#\s]/gu, ' ').split(/\s+/).filter(Boolean);
  var typeBoost = {}, words = [];
  raw.forEach(function (w) {
    var w2 = w.replace(/^#/, '');
    var tm = { reminder: 'reminder', reminders: 'reminder', task: 'task', tasks: 'task', todo: 'task', idea: 'idea', ideas: 'idea', note: 'note', notes: 'note' }[w2];
    if (tm) typeBoost[tm] = 1;
    if (w2 && STOP.indexOf(w2) < 0 && !tm) words.push(w2);
  });
  var tokens = words.length ? words : Object.keys(typeBoost).length ? [] : raw.map(function (w) { return w.replace(/^#/, ''); });
  var scored = data.items.map(function (i) {
    var txt = i.text.toLowerCase(), s = 0;
    tokens.forEach(function (w) {
      if (txt.indexOf(w) >= 0) { s += 2; if (new RegExp('(^|[^\\p{L}\\p{N}])' + w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '([^\\p{L}\\p{N}]|$)', 'u').test(txt)) s += 1; }
      if (i.tags.some(function (t) { return t.indexOf(w) >= 0; })) s += 3;
    });
    if (typeBoost[i.type]) s += tokens.length ? 1 : 3;
    if (!tokens.length && !Object.keys(typeBoost).length) s = 0;
    if (s > 0 && i.pinned) s += 0.5;
    return { i: i, s: s };
  }).filter(function (x) { return x.s > 0; }).sort(function (a, b) { return b.s - a.s || b.i.created - a.i.created; });
  return { tokens: tokens, types: Object.keys(typeBoost), hits: scored.slice(0, 5).map(function (x) { return x.i; }), total: scored.length };
}
function vAsk() {
  var h = '<h1>Ask my memory</h1><p class="muted small">Type a few keywords. This searches your saved memories on this device.</p>' +
    '<form id="askForm" class="card"><input type="text" id="askQ" placeholder="e.g. mom birthday, gym, ideas" value="' + esc(ui.askQ) + '" aria-label="Ask my memory" autocomplete="off"><button class="btn primary" type="submit" style="margin-top:12px">Ask</button></form><div id="askOut">' + askOut() + '</div>';
  return h;
}
function askOut() {
  var r = ui.askRes; if (!r) return '<div class="empty"><div class="big">\uD83D\uDCAC</div><p>Ask something like "reminders about mom" or "gym".</p></div>';
  if (r.error) return '<div class="preview err">' + esc(r.error) + '</div>';
  var h = '<div class="card ans"><span class="tagline">Local keyword search \u00B7 not AI</span>';
  if (!r.total) return h + '<p>I could not find anything about "' + esc(ui.askQ) + '" in your memories. Try other words, or check the Memories tab.</p></div>';
  var best = r.hits[0], open = r.hits.filter(function (i) { return !i.done; }).length;
  var s = 'I found ' + r.total + ' ' + (r.total === 1 ? 'memory' : 'memories') + ' matching ' + (r.tokens.length ? r.tokens.map(function (t) { return '"' + esc(t) + '"'; }).join(', ') : esc(r.types.join(', ') + 's')) + '. ';
  s += 'The best match is the ' + TYPE_LABEL[best.type].toLowerCase() + ' "' + esc(best.text.length > 70 ? best.text.slice(0, 70) + '\u2026' : best.text) + '"' + (best.due != null ? ', due ' + esc(fmtDate(best.due)) : '') + '. ';
  s += r.hits.length === 1 ? (open ? 'It is still open.' : 'It is marked done.') : open + ' of the top ' + r.hits.length + ' ' + (open === 1 ? 'is' : 'are') + ' still open.';
  var nextDueItem = r.hits.filter(function (i) { return !i.done && i.due != null && i.due > Date.now(); }).sort(function (a, b) { return a.due - b.due; })[0];
  if (nextDueItem) s += ' Next one due: ' + esc(fmtDate(nextDueItem.due)) + '.';
  h += '<p>' + s + '</p></div>' + r.hits.map(function (i) { return memCard(i); }).join('');
  return h;
}

function dataSize() { return utf8len(JSON.stringify(data)); }
function totalLS() { var n = 0; try { for (var i = 0; i < localStorage.length; i++) { var k = localStorage.key(i); n += utf8len(k) + utf8len(localStorage.getItem(k)); } } catch (e) { } return n; }
function vSettings() {
  var s = data.settings;
  return '<h1>Settings</h1>' + storageBanner() +
    '<div class="card"><label class="lbl" for="sName" style="margin-top:0">Your name</label><input type="text" id="sName" value="' + esc(s.name) + '" placeholder="Optional" maxlength="40" autocomplete="off">' +
    '<label class="lbl" for="sCc">Default country code for phone numbers</label><input type="text" id="sCc" inputmode="numeric" value="' + esc(s.cc) + '" maxlength="4"><p class="muted small" style="margin:6px 4px 0">Used when a saved number has 10 digits and no +code.</p>' +
    '<label class="lbl">Accent colour</label><div class="swatches">' + Object.keys(ACCENTS).map(function (k) { return '<button class="sw ' + (s.accent === k ? 'on' : '') + '" style="background:' + ACCENTS[k][0] + '" data-a="accent" data-v="' + k + '" aria-label="' + k + '"></button>'; }).join('') + '</div></div>' +
    '<div class="card"><b>Storage</b><p class="muted small" style="margin:6px 0 0" id="storeInfo">' + data.items.length + ' memories \u00B7 ' + bytes(dataSize()) + ' of data \u00B7 ' + bytes(totalLS()) + ' used in this browser by this app (limit is usually about 5 MB).</p></div>' +
    '<div class="card"><b>Backup</b><p class="muted small" style="margin:6px 0 12px">Export saves a JSON file. Import reads one back. Do this before clearing Safari data or changing phones.</p>' +
    '<div class="row"><button class="btn" data-a="export">Export</button><button class="btn" data-a="importPick">Import</button></div><input type="file" id="impFile" accept="application/json,.json"></div>' +
    '<div class="card"><button class="btn danger" data-a="reset">Reset everything</button></div>' +
    '<div class="card hero"><div class="row" style="align-items:center;flex-wrap:nowrap"><img src="icons/icon-192.png" width="64" height="64" style="border-radius:16px" alt=""><div><b style="font-size:19px">My Memory</b><div class="muted small">Version 1.0 \u00B7 an original app</div></div></div>' +
    '<p class="small" style="margin:12px 0 0">A private place to keep notes, reminders, tasks and ideas. Everything is stored only on this device. There is no account, no server and <b>no WhatsApp connection</b>. To save a WhatsApp message, copy it and use Paste from clipboard. It is not affiliated with Memorae or WhatsApp. "Ask my memory" is a local keyword search, not AI.</p></div>';
}

/* ---------- actions ---------- */
function shareText(i, wa) {
  var when = i.due != null ? fmtDate(i.due) + (i.repeat ? ' (repeats ' + repeatLabel(i.repeat) + ')' : '') : '';
  if (wa) {
    var s = '*' + TYPE_ICON[i.type] + ' ' + TYPE_LABEL[i.type] + '*\n' + i.text;
    if (when) s += '\n\n\u23F0 ' + when;
    if (i.tags.length) s += '\n\uD83C\uDFF7 ' + i.tags.map(function (t) { return '#' + t; }).join(' ');
    return s + '\n\n_Saved with My Memory_';
  }
  return i.text + (when ? '\n' + when : '');
}
function sheetShell(title, inner) { openOverlay('<div class="sheet" role="dialog" aria-label="' + esc(title) + '"><div class="row" style="justify-content:space-between;align-items:center;flex-wrap:nowrap"><h3>' + esc(title) + '</h3><button class="btn sm" data-a="closeSheet" style="flex:0 0 auto">Close</button></div>' + inner + '</div>'); }
function openEdit(i) {
  sheetShell('Edit memory', '<textarea id="eText">' + esc(i.text) + '</textarea><div class="chips" id="eTypes">' + TYPES.map(function (t) { return '<button class="chip ' + (i.type === t ? 'on' : '') + '" data-a="eType" data-t="' + t + '">' + TYPE_ICON[t] + ' ' + TYPE_LABEL[t] + '</button>'; }).join('') + '</div>' +
    '<label class="lbl">Date and time (for reminders and tasks)</label><input type="datetime-local" id="eDt" value="' + (i.due != null ? toInput(i.due) : '') + '">' +
    '<label class="lbl" for="eRep">Repeat</label><select id="eRep">' + [['', 'Does not repeat'], ['daily', 'Every day'], ['weekly', 'Every week'], ['monthly', 'Every month']].map(function (r) { return '<option value="' + r[0] + '"' + ((i.repeat || '') === r[0] ? ' selected' : '') + '>' + r[1] + '</option>'; }).join('') + '</select>' +
    (data.people.length ? '<label class="lbl" for="ePerson">For a person</label><select id="ePerson"><option value="">Just me</option>' + data.people.map(function (p) { return '<option value="' + esc(p.id) + '"' + (i.personId === p.id ? ' selected' : '') + '>' + esc(p.name) + '</option>'; }).join('') + '</select>' : '') + '<p class="muted small" style="margin:10px 4px 0">Tags come from #hashtags in the text.</p><div id="eErr"></div>' +
    '<button class="btn primary" data-a="saveEdit" data-id="' + esc(i.id) + '" style="margin-top:14px">Save changes</button>');
  ui.editType = i.type;
}
var actions = {
  tab: function (el) { if (el.dataset.t === 'more') ui.sub = null; ui.tab = el.dataset.t; render(); },
  paste: function () {
    if (!navigator.clipboard || !navigator.clipboard.readText) { toast('Your browser cannot read the clipboard. Long-press the box and tap Paste.', true); $('#cText').focus(); return; }
    navigator.clipboard.readText().then(function (t) {
      if (!t || !t.trim()) { toast('Clipboard is empty.', true); return; }
      var ta = $('#cText'); ui.draft.text = (ta.value ? ta.value + '\n' : '') + t; ta.value = ui.draft.text; updatePreview(); toast('Pasted');
    }).catch(function () { toast('Paste was blocked. Long-press the box and tap Paste instead.', true); $('#cText').focus(); });
  },
  clearDraft: function () { ui.draft = newDraft(); render(); },
  setType: function (el) { ui.draft.type = el.dataset.t; ui.draft.typeManual = true; updatePreview(); },
  ignoreParse: function () { ui.draft.ignore = true; ui.draft.dt = ''; updatePreview(); },
  useParse: function () { ui.draft.ignore = false; updatePreview(); },
  saveDraft: function () {
    var d = ui.draft, r = resolveDraft(), text = d.text.trim();
    if (!text) { $('#cPrev').innerHTML = '<div class="preview err" id="prevBox">Type or paste something to remember first.</div>'; return; }
    if (r.type === 'reminder' && r.due == null) { $('#cPrev').innerHTML = '<div class="preview err" id="prevBox">A reminder needs a time. Write one like "tomorrow 6pm" or pick a date and time.</div>'; return; }
    var now = Date.now();
    data.items.unshift({ id: uid(), personId: r.person, text: text, type: r.type, tags: r.tags, due: r.usesTime ? r.due : null, repeat: r.usesTime && r.due != null ? r.repeat : null, done: false, pinned: false, created: now, updated: now });
    if (!save()) { data.items.shift(); return; }
    ui.draft = newDraft();
    toast('Saved \u2713'); render(); tick();
  },
  tagFilter: function (el) { ui.f.tag = el.dataset.tag; ui.tab = 'list'; render(); },
  fType: function (el) { ui.f.type = el.dataset.v; keepQ(); render(); },
  fStatus: function (el) { ui.f.status = el.dataset.v; keepQ(); render(); },
  clearFilters: function () { ui.f = newF(); render(); },
  toggleDone: function (el) {
    var i = byId(el.dataset.id); if (!i) return;
    if (!i.done && i.repeat && i.due != null) { i.due = nextDue(i.due, i.repeat); delete alerted[i.id]; toast('Done. Next: ' + fmtDate(i.due)); }
    else { i.done = !i.done; toast(i.done ? 'Marked done \u2713' : 'Marked open'); }
    i.updated = Date.now(); save(); refreshAfter();
  },
  pin: function (el) { var i = byId(el.dataset.id); if (!i) return; i.pinned = !i.pinned; i.updated = Date.now(); save(); toast(i.pinned ? 'Pinned' : 'Unpinned'); refreshAfter(); },
  snooze: function (el) { var i = byId(el.dataset.id); if (!i) return; i.due = Date.now() + 600000; delete alerted[i.id]; i.updated = Date.now(); save(); toast('Snoozed 10 minutes'); refreshAfter(); },
  del: function (el) {
    var i = byId(el.dataset.id); if (!i) return;
    confirmBox('Delete this memory?', '"' + (i.text.length > 80 ? i.text.slice(0, 80) + '\u2026' : i.text) + '" will be removed. This cannot be undone.', 'Delete', true).then(function (ok) {
      if (!ok) return; data.items = data.items.filter(function (x) { return x.id !== i.id; }); save(); toast('Deleted'); refreshAfter();
    });
  },
  edit: function (el) { var i = byId(el.dataset.id); if (i) openEdit(i); },
  eType: function (el) { ui.editType = el.dataset.t; var ch = document.querySelectorAll('#eTypes .chip'); for (var k = 0; k < ch.length; k++) ch[k].classList.toggle('on', ch[k].dataset.t === ui.editType); },
  saveEdit: function (el) {
    var i = byId(el.dataset.id); if (!i) return;
    var text = $('#eText').value.trim(), due = fromInput($('#eDt').value), rep = $('#eRep').value || null;
    if (!text) { $('#eErr').innerHTML = '<div class="preview err">Text cannot be empty.</div>'; return; }
    if (ui.editType === 'reminder' && due == null) { $('#eErr').innerHTML = '<div class="preview err">A reminder needs a date and time.</div>'; return; }
    var uses = ui.editType === 'reminder' || ui.editType === 'task';
    i.text = text; i.type = ui.editType; i.tags = parseTags(text); i.due = uses ? due : null; i.repeat = uses && due != null ? rep : null; i.personId = $('#ePerson') && $('#ePerson').value && byPerson($('#ePerson').value) ? $('#ePerson').value : null; i.updated = Date.now(); delete alerted[i.id];
    save(); closeOverlay(); toast('Changes saved \u2713'); refreshAfter(); tick();
  },
  share: function (el) {
    var i = byId(el.dataset.id); if (!i) return; ui.share = i.id;
    sheetShell('Share memory', '<div class="card" style="background:#222"><div class="mtext" style="margin:0">' + esc(shareText(i)) + '</div></div>' +
      (navigator.share ? '<button class="btn primary" data-a="webShare" style="margin-bottom:10px">Share\u2026</button>' : '<p class="muted small">Your browser has no share sheet. Use Copy instead.</p>') +
      waShareBtn(i) + '<button class="btn" data-a="copyPlain" style="margin-bottom:10px">Copy text</button><button class="btn" data-a="copyWa">Copy as WhatsApp message</button>' +
      '<p class="muted small" style="margin:12px 4px 0">This only copies or shares text. Nothing is sent from this app.</p>');
  },
  webShare: function () {
    var i = byId(ui.share); if (!i) return;
    navigator.share({ title: 'My Memory', text: shareText(i) }).catch(function (e) { if (e && e.name !== 'AbortError') toast('Sharing failed. Use Copy instead.', true); });
  },
  copyPlain: function () { var i = byId(ui.share); copyText(shareText(i)).then(function () { toast('Copied \u2713'); }, function () { toast('Copy failed. Select the text and copy it by hand.', true); }); },
  copyWa: function () { var i = byId(ui.share); copyText(shareText(i, true)).then(function () { toast('Copied for WhatsApp \u2713'); }, function () { toast('Copy failed. Select the text and copy it by hand.', true); }); },
  closeSheet: function () { closeOverlay(); },
  enableNotif: function () {
    if (typeof Notification === 'undefined') { toast('Notifications are not available here.', true); return; }
    try {
      var p = Notification.requestPermission(function () { });
      Promise.resolve(p).then(function (r) { toast(r === 'granted' ? 'Alerts enabled' : 'Permission not granted', r !== 'granted'); if (ui.tab === 'today') render(); });
    } catch (e) { toast('Could not ask for permission.', true); }
  },
  accent: function (el) { data.settings.accent = el.dataset.v; save(); render(); },
  export: function () {
    var json = JSON.stringify({ app: 'my-memory', exported: new Date().toISOString(), version: 1, settings: data.settings, items: data.items, boards: data.boards, people: data.people, inbox: data.inbox, apps: data.apps }, null, 2);
    try {
      var blob = new Blob([json], { type: 'application/json' }), url = URL.createObjectURL(blob), a = document.createElement('a');
      a.href = url; a.download = 'my-memory-backup-' + toInput(Date.now()).slice(0, 10) + '.json'; document.body.appendChild(a); a.click();
      setTimeout(function () { URL.revokeObjectURL(url); a.remove(); }, 1500); toast('Backup exported \u2713');
    } catch (e) { toast('Export failed.', true); }
  },
  importPick: function () { $('#impFile').click(); },
  reset: function () {
    confirmBox('Erase everything?', 'All memories and settings on this device will be deleted. Export a backup first if you want to keep them.', 'Erase everything', true).then(function (ok) {
      if (!ok) return; data = defaults(); alerted = {}; try { localStorage.removeItem(KEY); } catch (e) { } save(); ui.f = newF(); toast('Everything erased'); render(); hideBanner();
    });
  },
  bannerView: function () { hideBanner(); ui.tab = 'today'; render(); },
  bannerClose: function () { hideBanner(); }
};
function keepQ() { var q = $('#q'); if (q) ui.f.q = q.value; }
function refreshAfter() {
  renderTabs();
  if (ui.tab === 'list') renderResults();
  else if (ui.tab === 'ask') { if (ui.askQ) { ui.askRes = askSearch(ui.askQ); } $('#askOut').innerHTML = askOut(); }
  else render();
  if (ui.tab === 'more') render();
  tick();
}

/* ---------- extras: people, WhatsApp links, My Day, inbox, boards, apps ---------- */
function byPerson(id) { for (var i = 0; i < data.people.length; i++) if (data.people[i].id === id) return data.people[i]; return null; }
function normPhone(raw, cc) {
  var s = String(raw || '').trim(), plus = s.charAt(0) === '+', d = s.replace(/\D/g, '');
  if (!d) return '';
  if (!plus) { if (d.indexOf('00') === 0) d = d.slice(2); else { d = d.replace(/^0+/, ''); if (d.length <= 10) d = (cc || '91') + d; } }
  return d.length >= 8 && d.length <= 15 ? d : '';
}
function waUrl(person, text) { return 'https://wa.me/' + normPhone(person.phone, data.settings.cc) + '?text=' + encodeURIComponent(text); }
function memMessage(i, person) {
  var first = person.name.split(/\s+/)[0];
  return 'Hi ' + first + ', ' + (i.type === 'reminder' ? 'reminder: ' : '') + i.text + (i.due != null ? ' (' + fmtDate(i.due) + ')' : '');
}
function waShareBtn(i) {
  var pr = i.personId ? byPerson(i.personId) : null;
  if (!pr || !normPhone(pr.phone, data.settings.cc)) return '';
  return '<a class="btn primary" style="text-decoration:none;margin-bottom:10px" target="_blank" rel="noopener" href="' + esc(waUrl(pr, memMessage(i, pr))) + '">Send on WhatsApp to ' + esc(pr.name) + '</a><p class="muted small" style="margin:-4px 4px 12px">Opens WhatsApp with the message ready. You press Send yourself. My Memory never sends anything.</p>';
}

/* My Day */
function short(t, n) { t = t.replace(/\s+/g, ' ').trim(); return t.length > n ? t.slice(0, n) + '\u2026' : t; }
function myDay(now) {
  now = now || new Date();
  var t0 = now.getTime(), end = addDays(startOfDay(now), 1).getTime(), used = {};
  var open = data.items.filter(function (i) { return !i.done; });
  function take(arr) { return arr.filter(function (i) { if (used[i.id]) return false; used[i.id] = 1; return true; }); }
  var over = take(open.filter(function (i) { return i.due != null && i.due < t0; }).sort(function (a, b) { return a.due - b.due; }));
  var today = take(open.filter(function (i) { return i.due != null && i.due >= t0 && i.due < end; }).sort(function (a, b) { return a.due - b.due; }));
  var tasks = take(open.filter(function (i) { return i.type === 'task' && i.due == null; }));
  var pinned = take(open.filter(function (i) { return i.pinned; }));
  return { over: over, today: today, tasks: tasks, pinned: pinned, empty: !(over.length + today.length + tasks.length + pinned.length) };
}
function greeting(now) { var h = (now || new Date()).getHours(); return h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening'; }
function myDayWa(now) {
  now = now || new Date(); var d = myDay(now), n = data.settings.name;
  var s = '*\u2600\uFE0F My Day \u2013 ' + DAYS[now.getDay()] + ' ' + now.getDate() + ' ' + MON[now.getMonth()] + '*\n' + greeting(now) + (n ? ', ' + n : '') + '.';
  if (d.empty) return s + '\n\nNothing planned today.\n\n_Saved with My Memory_';
  function block(title, arr, withDue) { return arr.length ? '\n\n*' + title + '*\n' + arr.map(function (i) { return '\u2022 ' + short(i.text, 90) + (withDue && i.due != null ? ' \u2013 ' + (withDue === 'time' ? fmtTime(new Date(i.due)) : fmtDate(i.due, now)) : ''); }).join('\n') : ''; }
  return s + block('Overdue', d.over, 'full') + block('Today', d.today, 'time') + block('Tasks', d.tasks) + block('Pinned', d.pinned) + '\n\n_Saved with My Memory_';
}
function myDayCard() {
  var now = new Date(), d = myDay(now), n = data.settings.name;
  function block(title, arr, withDue) { return arr.length ? '<div class="sep"></div><b>' + title + ' (' + arr.length + ')</b>' + arr.map(function (i) { return '<div style="margin-top:6px">\u2022 ' + esc(short(i.text, 90)) + (withDue && i.due != null ? ' <span class="meta">' + esc(withDue === 'time' ? fmtTime(new Date(i.due)) : fmtDate(i.due, now)) + '</span>' : '') + '</div>'; }).join('') : ''; }
  var h = '<div class="card hero" id="myDay"><div class="meta" style="color:var(--accent);font-weight:700">\u2600\uFE0F MY DAY</div><div style="font-size:22px;font-weight:700;margin:2px 0 4px">' + greeting(now) + (n ? ', ' + esc(n) : '') + '</div>';
  if (d.empty) h += '<p class="muted" style="margin:6px 0 0">Nothing planned. Add a reminder or task and it will show up here.</p>';
  else h += '<p class="muted small" style="margin:0">' + d.over.length + ' overdue \u00B7 ' + d.today.length + ' today \u00B7 ' + d.tasks.length + ' open tasks \u00B7 ' + d.pinned.length + ' pinned</p>' + block('Overdue', d.over, 'full') + block('Today', d.today, 'time') + block('Tasks', d.tasks) + block('Pinned', d.pinned);
  h += '<button class="btn primary" data-a="copyDay" style="margin-top:14px">Copy as WhatsApp message</button><p class="muted small" style="margin:8px 2px 0">Put together from your saved memories with simple rules, not AI. It only copies text. Nothing is sent for you.</p></div>';
  return h;
}

/* Inbox suggestions (simple rules, not AI) */
var ACTION_RE = /\b(buy|purchase|order|call|phone|pay|recharge|renew|book|email|mail|send|submit|pick up|collect|finish|fix|clean|schedule)\b/i;
var IDEA_RE = /\b(idea|what if|maybe|should try|could build|brainstorm)\b/i;
var AUTO_TAG = { buy: 'shopping', purchase: 'shopping', order: 'shopping', call: 'calls', phone: 'calls', pay: 'bills', recharge: 'bills', renew: 'bills', book: 'booking', email: 'messages', mail: 'messages', send: 'messages' };
function suggest(text, now) {
  var p = parseWhen(text, now), url = text.match(/\b(?:https?:\/\/|www\.)[^\s]+/i), am = text.match(ACTION_RE), reasons = [], type = 'note', due = null, repeat = null, add = [];
  var have = parseTags(text);
  if (p.ok) { type = 'reminder'; due = p.date; repeat = p.repeat; reasons.push('a date/time ("' + p.found.join(' ') + '")'); }
  if (am) { reasons.push('the word "' + am[1].toLowerCase() + '"'); if (!p.ok) type = 'task'; var tg = AUTO_TAG[am[1].toLowerCase()]; if (tg && !have.length) add.push(tg); }
  if (url) { reasons.push('a link'); if (add.indexOf('link') < 0 && !have.length) add.push('link'); }
  if (!p.ok && !am && IDEA_RE.test(text)) { type = 'idea'; reasons.push('an idea word'); }
  if (have.length) reasons.push('your #tags');
  return { type: type, due: due, repeat: repeat, addTags: add, reasons: reasons, url: url ? url[0] : null };
}
function inboxItems() {
  return data.inbox.map(function (x) {
    var s = suggest(x.text), type = x.type || s.type;
    return { x: x, s: s, type: type, due: type === 'reminder' || type === 'task' ? s.due : null, overridden: !!x.type };
  });
}
function vInbox() {
  var list = inboxItems();
  var h = '<h1>Inbox</h1><p class="muted small">Paste messages, links or to-dos, one per line. Simple rules suggest a type for each. They are not AI. You accept or change every one.</p>' +
    '<div class="card"><textarea id="inText" style="min-height:100px" placeholder="Pay electricity bill tomorrow 5pm&#10;Buy milk and eggs&#10;https://example.com/article" aria-label="Inbox text">' + esc(ui.inText) + '</textarea>' +
    '<div class="row" style="margin-top:10px"><button class="btn sm" data-a="inPaste">\uD83D\uDCCB Paste from clipboard</button><button class="btn sm primary" data-a="inAdd">Add to inbox</button></div></div>';
  if (!list.length) return h + '<div class="empty"><div class="big">\uD83D\uDCE5</div><p><b>Inbox is empty</b></p><p>Paste a few things above and they will be sorted for you to approve.</p></div>';
  h += '<div class="row" style="align-items:center;margin:0 0 10px"><span class="muted small" style="flex:1">' + list.length + ' waiting</span><button class="btn sm primary" data-a="inAcceptAll" style="flex:0 0 auto">Accept all suggestions</button></div>';
  list.forEach(function (o) {
    var x = o.x, s = o.s;
    h += '<div class="card" data-in="' + esc(x.id) + '"><div class="mtext" style="margin-top:0">' + esc(short(x.text, 220)) + '</div>' +
      '<div class="preview" style="margin-top:6px"><b>Suggested:</b> ' + TYPE_ICON[o.type] + ' ' + TYPE_LABEL[o.type] + (o.due != null ? ' \u00B7 ' + esc(fmtDate(o.due)) : '') + (s.repeat && o.type !== 'note' ? ' \u00B7 repeats ' + repeatLabel(s.repeat) : '') + (s.addTags.length && !parseTags(x.text).length ? '<br>Will add: ' + s.addTags.map(function (t) { return '#' + esc(t); }).join(' ') : '') +
      '<br><span class="muted small">' + (o.overridden ? 'You chose this type.' : (s.reasons.length ? 'Because it has ' + esc(s.reasons.join(', ')) + '.' : 'No special words found, so it is a plain note.')) + '</span></div>' +
      '<div class="chips" style="margin:10px 0 0">' + TYPES.map(function (t) { return '<button class="chip ' + (o.type === t ? 'on' : '') + '" style="min-height:34px;font-size:13px;padding:0 12px" data-a="inType" data-id="' + esc(x.id) + '" data-t="' + t + '">' + TYPE_LABEL[t] + '</button>'; }).join('') + '</div>' +
      '<div class="acts"><button class="btn sm primary" data-a="inAccept" data-id="' + esc(x.id) + '">Accept</button><button class="btn sm" data-a="inEdit" data-id="' + esc(x.id) + '">Edit in Capture</button>' +
      (s.url ? '<button class="btn sm" data-a="inApp" data-id="' + esc(x.id) + '">Save to My apps</button>' : '') + '<button class="btn sm danger" data-a="inDel" data-id="' + esc(x.id) + '">Remove</button></div></div>';
  });
  return h;
}
function acceptInbox(x) {
  var o = inboxItems().filter(function (q) { return q.x.id === x.id; })[0];
  if (o.type === 'reminder' && o.due == null) return false;
  var text = x.text.trim(), have = parseTags(text);
  if (!have.length) o.s.addTags.forEach(function (t) { text += ' #' + t; });
  var now = Date.now(), uses = o.type === 'reminder' || o.type === 'task';
  data.items.unshift({ id: uid(), personId: null, text: text, type: o.type, tags: parseTags(text), due: uses ? o.due : null, repeat: uses && o.due != null ? o.s.repeat : null, done: false, pinned: false, created: now, updated: now });
  data.inbox = data.inbox.filter(function (q) { return q.id !== x.id; });
  return true;
}
function addInboxLines(text) {
  var lines = String(text || '').split(/\r?\n/).map(function (l) { return l.trim(); }).filter(Boolean).slice(0, 50), n = 0;
  lines.forEach(function (l) { data.inbox.push({ id: uid(), text: l.slice(0, 2000), type: null, created: Date.now() }); n++; });
  return n;
}

/* More hub */
function vMore() {
  var sub = ui.sub;
  if (sub === 'settings') return back() + vSettings();
  if (sub === 'boards') return back() + vBoards();
  if (sub === 'board') return back('boards') + vBoard();
  if (sub === 'people') return back() + vPeople();
  if (sub === 'inbox') return back() + vInbox();
  if (sub === 'apps') return back() + vApps();
  function item(k, ic, title, desc) { return '<button class="card" data-a="sub" data-s="' + k + '" style="display:flex;width:100%;gap:14px;align-items:center;border:0;color:inherit;font:inherit;text-align:left;cursor:pointer"><span style="font-size:30px">' + ic + '</span><span style="flex:1"><b style="font-size:18px">' + title + '</b><br><span class="muted small">' + desc + '</span></span><span class="muted">\u203A</span></button>'; }
  var open = 0; data.boards.forEach(function (b) { open += b.cards.filter(function (c) { return c.col !== 2; }).length; });
  return '<h1>More</h1><p class="muted small">Everything here is stored on this device only.</p>' +
    item('inbox', '\uD83D\uDCE5', 'Inbox', data.inbox.length ? data.inbox.length + ' waiting to be sorted' : 'Paste items and approve suggestions') +
    item('boards', '\uD83D\uDDC3\uFE0F', 'Boards', data.boards.length + ' boards \u00B7 ' + open + ' open cards') +
    item('people', '\uD83D\uDC65', 'People', data.people.length + ' saved \u00B7 reminders for others') +
    item('apps', '\uD83D\uDD17', 'My apps', data.apps.length + ' saved links') +
    item('settings', '\u2699\uFE0F', 'Settings', 'Name, colour, storage, backup');
}
function back(to) { return '<button class="btn sm" data-a="sub" data-s="' + (to || '') + '" style="margin-bottom:10px">\u2039 Back</button>'; }

/* Boards */
function boardById(id) { for (var i = 0; i < data.boards.length; i++) if (data.boards[i].id === id) return data.boards[i]; return null; }
var COLS = ['To do', 'Doing', 'Done'];
function vBoards() {
  var h = '<h1>Boards</h1><p class="muted small">Make as many boards as you like. Each has To do, Doing and Done.</p>' +
    '<form id="boardForm" class="card"><input type="text" id="bName" placeholder="New board name, e.g. Shop launch" maxlength="60" autocomplete="off"><button class="btn primary" type="submit" style="margin-top:10px">Create board</button><div id="bErr"></div></form>';
  if (!data.boards.length) return h + '<div class="empty"><div class="big">\uD83D\uDDC3\uFE0F</div><p><b>No boards yet</b></p><p>Create one above to start moving cards.</p></div>';
  data.boards.forEach(function (b) {
    var done = b.cards.filter(function (c) { return c.col === 2; }).length;
    h += '<div class="card" data-board="' + esc(b.id) + '"><b style="font-size:18px">' + esc(b.name) + '</b><div class="meta">' + b.cards.length + ' cards \u00B7 ' + done + ' done</div><div class="acts"><button class="btn sm primary" data-a="openBoard" data-id="' + esc(b.id) + '">Open</button><button class="btn sm" data-a="renBoard" data-id="' + esc(b.id) + '">Rename</button><button class="btn sm danger" data-a="delBoard" data-id="' + esc(b.id) + '">Delete</button></div></div>';
  });
  return h;
}
function vBoard() {
  var b = boardById(ui.boardId); if (!b) { ui.sub = 'boards'; return vBoards(); }
  var h = '<h1>' + esc(b.name) + '</h1><p class="muted small">Swipe sideways to see every column. Use \u2039 \u203A on a card to move it.</p><button class="btn primary" data-a="addCard" style="margin-bottom:14px">+ Add card</button>' +
    '<div id="cols" style="display:flex;gap:12px;overflow-x:auto;scroll-snap-type:x mandatory;margin:0 -16px;padding:0 16px 8px">';
  COLS.forEach(function (name, ci) {
    var cards = b.cards.filter(function (c) { return c.col === ci; });
    h += '<section class="col" data-col="' + ci + '" style="flex:0 0 82%;scroll-snap-align:start;background:#141416;border-radius:20px;padding:12px"><div style="display:flex;justify-content:space-between;margin-bottom:8px"><b>' + name + '</b><span class="pill">' + cards.length + '</span></div>';
    if (!cards.length) h += '<div class="muted small" style="padding:14px 4px">Nothing here yet.</div>';
    cards.forEach(function (c) {
      var m = c.memId ? byId(c.memId) : null;
      h += '<div class="card" style="background:var(--card);padding:12px;margin-bottom:10px" data-card="' + esc(c.id) + '"><div class="mtext" style="margin:0 0 6px;font-size:16px">' + esc(c.title) + '</div>' +
        (m ? '<button class="chip tag" data-a="openMem" data-id="' + esc(m.id) + '" style="max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">\uD83D\uDD17 ' + esc(short(m.text, 40)) + '</button>' : (c.memId ? '<div class="meta">Linked memory was deleted</div>' : '')) +
        '<div class="acts" style="margin-top:8px"><button class="btn sm" data-a="moveCard" data-id="' + esc(c.id) + '" data-dir="-1"' + (ci === 0 ? ' disabled' : '') + ' aria-label="Move left">\u2039</button><button class="btn sm" data-a="moveCard" data-id="' + esc(c.id) + '" data-dir="1"' + (ci === 2 ? ' disabled' : '') + ' aria-label="Move right">\u203A</button><button class="btn sm" data-a="editCard" data-id="' + esc(c.id) + '">Edit</button><button class="btn sm danger" data-a="delCard" data-id="' + esc(c.id) + '">Delete</button></div></div>';
    });
    h += '</section>';
  });
  return h + '</div>';
}
function findCard(id) { for (var i = 0; i < data.boards.length; i++) for (var j = 0; j < data.boards[i].cards.length; j++) if (data.boards[i].cards[j].id === id) return { b: data.boards[i], c: data.boards[i].cards[j] }; return null; }
function cardSheet(c) {
  var mems = data.items.slice().sort(function (a, b) { return b.created - a.created; });
  sheetShell(c ? 'Edit card' : 'New card', '<label class="lbl" for="cdTitle">Title</label><input type="text" id="cdTitle" maxlength="300" value="' + esc(c ? c.title : '') + '" autocomplete="off">' +
    '<label class="lbl" for="cdCol">Column</label><select id="cdCol">' + COLS.map(function (n, i) { return '<option value="' + i + '"' + ((c ? c.col : 0) === i ? ' selected' : '') + '>' + n + '</option>'; }).join('') + '</select>' +
    '<label class="lbl" for="cdMem">Link to a memory (optional)</label><select id="cdMem"><option value="">No link</option>' + mems.map(function (m) { return '<option value="' + esc(m.id) + '"' + (c && c.memId === m.id ? ' selected' : '') + '>' + esc(TYPE_LABEL[m.type] + ': ' + short(m.text, 45)) + '</option>'; }).join('') + '</select><div id="cdErr"></div>' +
    '<button class="btn primary" data-a="saveCard" data-id="' + (c ? esc(c.id) : '') + '" style="margin-top:14px">' + (c ? 'Save card' : 'Add card') + '</button>');
}

/* People */
function vPeople() {
  var h = '<h1>People</h1><p class="muted small">Save people so you can make reminders for them. "Send on WhatsApp" only opens WhatsApp with your message typed in. You tap Send. My Memory never sends messages itself.</p>' +
    '<form id="personForm" class="card"><input type="text" id="pName" placeholder="Name" maxlength="60" autocomplete="off"><input type="text" id="pPhone" inputmode="tel" placeholder="Phone with country code (optional), e.g. +91 98450 12345" maxlength="30" style="margin-top:10px" autocomplete="off"><button class="btn primary" type="submit" style="margin-top:10px">Add person</button><div id="pErr"></div></form>';
  if (!data.people.length) return h + '<div class="empty"><div class="big">\uD83D\uDC65</div><p><b>No people yet</b></p><p>Add someone above, then pick them when you write a reminder.</p></div>';
  data.people.forEach(function (p) {
    var mine = data.items.filter(function (i) { return i.personId === p.id && !i.done; }), ph = normPhone(p.phone, data.settings.cc);
    h += '<div class="card" data-person="' + esc(p.id) + '"><b style="font-size:18px">\uD83D\uDC64 ' + esc(p.name) + '</b><div class="meta">' + (p.phone ? esc(p.phone) + (ph ? '' : ' \u00B7 number looks invalid') : 'No phone saved') + ' \u00B7 ' + mine.length + ' open</div>';
    mine.slice(0, 5).forEach(function (i) {
      h += '<div style="margin-top:8px;padding-top:8px;border-top:1px solid var(--line)"><div>' + esc(short(i.text, 80)) + '</div>' + (i.due != null ? '<div class="meta">' + esc(fmtDate(i.due)) + '</div>' : '') +
        (ph ? '<a class="btn sm" style="text-decoration:none;margin-top:6px" target="_blank" rel="noopener" href="' + esc(waUrl(p, memMessage(i, p))) + '">Send on WhatsApp</a>' : '') + '</div>';
    });
    h += '<div class="acts"><button class="btn sm primary" data-a="remFor" data-id="' + esc(p.id) + '">+ Reminder</button><button class="btn sm" data-a="editPerson" data-id="' + esc(p.id) + '">Edit</button><button class="btn sm danger" data-a="delPerson" data-id="' + esc(p.id) + '">Delete</button></div></div>';
  });
  return h;
}

/* My apps */
function normUrl(u) { u = String(u || '').trim(); if (!u) return ''; if (!/^[a-z][a-z0-9+.\-]*:/i.test(u)) u = 'https://' + u; try { var x = new URL(u); if (x.protocol !== 'http:' && x.protocol !== 'https:') return ''; if (x.hostname.indexOf('.') < 0 && x.hostname !== 'localhost') return ''; return x.href; } catch (e) { return ''; } }
function vApps() {
  var h = '<h1>My apps</h1><p class="muted small">Your own list of links. They open in your browser. These are shortcuts only, not connections to those apps.</p>' +
    '<form id="appForm" class="card"><input type="text" id="aName" placeholder="Name, e.g. Google Drive" maxlength="60" autocomplete="off"><input type="text" id="aUrl" inputmode="url" autocapitalize="off" placeholder="Link, e.g. drive.google.com" style="margin-top:10px" autocomplete="off"><button class="btn primary" type="submit" style="margin-top:10px">Save link</button><div id="aErr"></div></form>';
  if (!data.apps.length) return h + '<div class="empty"><div class="big">\uD83D\uDD17</div><p><b>No links yet</b></p><p>Save the sites and web apps you open every day.</p></div>';
  data.apps.forEach(function (a) {
    var host = ''; try { host = new URL(a.url).hostname.replace(/^www\./, ''); } catch (e) { }
    h += '<div class="card" data-app="' + esc(a.id) + '" style="display:flex;gap:12px;align-items:center"><div style="width:46px;height:46px;border-radius:14px;background:var(--accent);color:var(--accent-ink);display:flex;align-items:center;justify-content:center;font-weight:800;font-size:20px">' + esc(a.name.charAt(0).toUpperCase()) + '</div><div style="flex:1;min-width:0"><a href="' + esc(a.url) + '" target="_blank" rel="noopener" style="color:var(--text);text-decoration:none;font-weight:700;font-size:17px">' + esc(a.name) + '</a><div class="meta" style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap">' + esc(host) + '</div></div><button class="btn sm" data-a="editApp" data-id="' + esc(a.id) + '">Edit</button><button class="btn sm danger" data-a="delApp" data-id="' + esc(a.id) + '">\u2715</button></div>';
  });
  return h;
}
function errBox(id, msg) { var e = $('#' + id); if (e) e.innerHTML = msg ? '<div class="preview err" style="margin-top:10px">' + esc(msg) + '</div>' : ''; }
var formSubmit = {
  boardForm: function () {
    var n = $('#bName').value.trim(); if (!n) { errBox('bErr', 'Give the board a name.'); return; }
    data.boards.push({ id: uid(), name: n, cards: [] }); if (save()) { toast('Board created \u2713'); render(); }
  },
  personForm: function () {
    var n = $('#pName').value.trim(), ph = $('#pPhone').value.trim();
    if (!n) { errBox('pErr', 'Enter a name.'); return; }
    if (ph && !normPhone(ph, data.settings.cc)) { errBox('pErr', 'That phone number looks wrong. Use digits with a country code, like +91 98450 12345.'); return; }
    data.people.push({ id: uid(), name: n, phone: ph }); if (save()) { toast('Person added \u2713'); render(); }
  },
  appForm: function () {
    var n = $('#aName').value.trim(), u = normUrl($('#aUrl').value);
    if (!n) { errBox('aErr', 'Enter a name.'); return; }
    if (!u) { errBox('aErr', 'That does not look like a web link. Try something like drive.google.com'); return; }
    data.apps.push({ id: uid(), name: n, url: u }); if (save()) { toast('Link saved \u2713'); render(); }
  }
};
Object.assign(actions, {
  sub: function (el) { ui.sub = el.dataset.s || null; render(); },
  copyDay: function () { copyText(myDayWa()).then(function () { toast('My Day copied \u2713'); }, function () { toast('Copy failed. Try again.', true); }); },
  /* inbox */
  inPaste: function () {
    if (!navigator.clipboard || !navigator.clipboard.readText) { toast('Your browser cannot read the clipboard. Long-press the box and tap Paste.', true); return; }
    navigator.clipboard.readText().then(function (t) {
      if (!t || !t.trim()) { toast('Clipboard is empty.', true); return; }
      ui.inText = (ui.inText ? ui.inText + '\n' : '') + t; $('#inText').value = ui.inText; toast('Pasted');
    }).catch(function () { toast('Paste was blocked. Long-press the box and tap Paste instead.', true); });
  },
  inAdd: function () {
    var n = addInboxLines($('#inText').value); if (!n) { toast('Type or paste something first.', true); return; }
    ui.inText = ''; save(); toast(n + (n === 1 ? ' item' : ' items') + ' added to the inbox'); render();
  },
  inType: function (el) { var x = data.inbox.filter(function (q) { return q.id === el.dataset.id; })[0]; if (!x) return; x.type = el.dataset.t; save(); render(); },
  inAccept: function (el) {
    var x = data.inbox.filter(function (q) { return q.id === el.dataset.id; })[0]; if (!x) return;
    if (!acceptInbox(x)) { toast('A reminder needs a time. Tap Edit in Capture to add one.', true); return; }
    save(); toast('Saved to Memories \u2713'); render(); tick();
  },
  inAcceptAll: function () {
    var ok = 0, skip = 0; data.inbox.slice().forEach(function (x) { if (acceptInbox(x)) ok++; else skip++; });
    save(); toast(ok + ' saved' + (skip ? ', ' + skip + ' need a time' : '') + ' \u2713'); render(); tick();
  },
  inEdit: function (el) {
    var x = data.inbox.filter(function (q) { return q.id === el.dataset.id; })[0]; if (!x) return;
    var o = inboxItems().filter(function (q) { return q.x.id === x.id; })[0];
    ui.draft = newDraft(); ui.draft.text = x.text; ui.draft.type = o.type; ui.draft.typeManual = true;
    data.inbox = data.inbox.filter(function (q) { return q.id !== x.id; }); save(); ui.tab = 'capture'; render();
  },
  inDel: function (el) { data.inbox = data.inbox.filter(function (q) { return q.id !== el.dataset.id; }); save(); toast('Removed'); render(); },
  inApp: function (el) {
    var x = data.inbox.filter(function (q) { return q.id === el.dataset.id; })[0]; if (!x) return;
    var u = normUrl(suggest(x.text).url); if (!u) { toast('Could not read that link.', true); return; }
    var host = new URL(u).hostname.replace(/^www\./, '');
    data.apps.push({ id: uid(), name: host, url: u }); data.inbox = data.inbox.filter(function (q) { return q.id !== x.id; }); save(); toast('Saved to My apps \u2713'); render();
  },
  /* boards */
  openBoard: function (el) { ui.boardId = el.dataset.id; ui.sub = 'board'; render(); },
  renBoard: function (el) {
    var b = boardById(el.dataset.id); if (!b) return;
    sheetShell('Rename board', '<input type="text" id="rbName" maxlength="60" value="' + esc(b.name) + '"><div id="rbErr"></div><button class="btn primary" data-a="saveRen" data-id="' + esc(b.id) + '" style="margin-top:14px">Save</button>');
  },
  saveRen: function (el) { var b = boardById(el.dataset.id), n = $('#rbName').value.trim(); if (!n) { errBox('rbErr', 'Name cannot be empty.'); return; } b.name = n; save(); closeOverlay(); toast('Renamed \u2713'); render(); },
  delBoard: function (el) {
    var b = boardById(el.dataset.id); if (!b) return;
    confirmBox('Delete board?', '"' + b.name + '" and its ' + b.cards.length + ' cards will be removed. Your memories are not affected.', 'Delete board', true).then(function (ok) { if (!ok) return; data.boards = data.boards.filter(function (x) { return x.id !== b.id; }); save(); toast('Board deleted'); render(); });
  },
  addCard: function () { cardSheet(null); },
  editCard: function (el) { var f = findCard(el.dataset.id); if (f) cardSheet(f.c); },
  saveCard: function (el) {
    var t = $('#cdTitle').value.trim(), col = parseInt($('#cdCol').value, 10) || 0, mem = $('#cdMem').value || null;
    if (!t) { errBox('cdErr', 'A card needs a title.'); return; }
    var b = boardById(ui.boardId); if (!b) return;
    if (el.dataset.id) { var f = findCard(el.dataset.id); f.c.title = t; f.c.col = col; f.c.memId = mem; }
    else b.cards.push({ id: uid(), title: t, col: col, memId: mem, created: Date.now() });
    save(); closeOverlay(); toast('Card saved \u2713'); render();
  },
  moveCard: function (el) { var f = findCard(el.dataset.id); if (!f) return; var c = Math.max(0, Math.min(2, f.c.col + parseInt(el.dataset.dir, 10))); f.c.col = c; save(); var sx = $('#cols') ? $('#cols').scrollLeft : 0; render(); if ($('#cols')) $('#cols').scrollLeft = sx; toast('Moved to ' + COLS[c]); },
  delCard: function (el) {
    var f = findCard(el.dataset.id); if (!f) return;
    confirmBox('Delete card?', '"' + short(f.c.title, 80) + '" will be removed.', 'Delete card', true).then(function (ok) { if (!ok) return; f.b.cards = f.b.cards.filter(function (x) { return x.id !== f.c.id; }); save(); toast('Card deleted'); var sx = $('#cols') ? $('#cols').scrollLeft : 0; render(); if ($('#cols')) $('#cols').scrollLeft = sx; });
  },
  openMem: function (el) { ui.f = newF(); ui.f.id = el.dataset.id; ui.tab = 'list'; render(); },
  /* people */
  remFor: function (el) { ui.draft = newDraft(); ui.draft.type = 'reminder'; ui.draft.typeManual = true; ui.draft.person = el.dataset.id; ui.tab = 'capture'; render(); },
  editPerson: function (el) {
    var p = byPerson(el.dataset.id); if (!p) return;
    sheetShell('Edit person', '<input type="text" id="epName" maxlength="60" value="' + esc(p.name) + '"><input type="text" id="epPhone" inputmode="tel" maxlength="30" value="' + esc(p.phone) + '" placeholder="Phone (optional)" style="margin-top:10px"><div id="epErr"></div><button class="btn primary" data-a="savePerson" data-id="' + esc(p.id) + '" style="margin-top:14px">Save</button>');
  },
  savePerson: function (el) {
    var p = byPerson(el.dataset.id), n = $('#epName').value.trim(), ph = $('#epPhone').value.trim();
    if (!n) { errBox('epErr', 'Enter a name.'); return; }
    if (ph && !normPhone(ph, data.settings.cc)) { errBox('epErr', 'That phone number looks wrong.'); return; }
    p.name = n; p.phone = ph; save(); closeOverlay(); toast('Saved \u2713'); render();
  },
  delPerson: function (el) {
    var p = byPerson(el.dataset.id); if (!p) return;
    confirmBox('Delete ' + p.name + '?', 'Their reminders stay in Memories but will no longer be linked to them.', 'Delete person', true).then(function (ok) {
      if (!ok) return; data.items.forEach(function (i) { if (i.personId === p.id) i.personId = null; }); data.people = data.people.filter(function (x) { return x.id !== p.id; }); save(); toast('Person deleted'); render();
    });
  },
  /* apps */
  editApp: function (el) {
    var a = data.apps.filter(function (x) { return x.id === el.dataset.id; })[0]; if (!a) return;
    sheetShell('Edit link', '<input type="text" id="eaName" maxlength="60" value="' + esc(a.name) + '"><input type="text" id="eaUrl" inputmode="url" autocapitalize="off" value="' + esc(a.url) + '" style="margin-top:10px"><div id="eaErr"></div><button class="btn primary" data-a="saveApp" data-id="' + esc(a.id) + '" style="margin-top:14px">Save</button>');
  },
  saveApp: function (el) {
    var a = data.apps.filter(function (x) { return x.id === el.dataset.id; })[0], n = $('#eaName').value.trim(), u = normUrl($('#eaUrl').value);
    if (!n) { errBox('eaErr', 'Enter a name.'); return; } if (!u) { errBox('eaErr', 'That does not look like a web link.'); return; }
    a.name = n; a.url = u; save(); closeOverlay(); toast('Saved \u2713'); render();
  },
  delApp: function (el) {
    var a = data.apps.filter(function (x) { return x.id === el.dataset.id; })[0]; if (!a) return;
    confirmBox('Remove this link?', '"' + a.name + '" will be removed from My apps.', 'Remove', true).then(function (ok) { if (!ok) return; data.apps = data.apps.filter(function (x) { return x.id !== a.id; }); save(); toast('Link removed'); render(); });
  }
});

/* ---------- import ---------- */
function handleImport(file) {
  if (!file) return;
  var rd = new FileReader();
  rd.onerror = function () { toast('Could not read that file.', true); };
  rd.onload = function () {
    var parsed;
    try { parsed = JSON.parse(rd.result); } catch (e) { toast('That file is not valid JSON.', true); return; }
    if (!parsed || !Array.isArray(parsed.items)) { toast('That does not look like a My Memory backup.', true); return; }
    var inc = sanitizeData(parsed);
    if (!inc.items.length && parsed.items.length) { toast('No valid memories found in that file.', true); return; }
    dialog('Import ' + inc.items.length + ' memories?', 'You have ' + data.items.length + ' memories now. Merge adds new ones and keeps yours. Replace deletes yours first.', [
      { label: 'Merge', val: 'merge', cls: 'primary' }, { label: 'Replace all', val: 'replace', cls: 'danger' }, { label: 'Cancel', val: 'cancel' }
    ]).then(function (v) {
      if (v === 'replace') { data = inc; }
      else if (v === 'merge') { ['items', 'people', 'inbox', 'apps', 'boards'].forEach(function (k) { var have = {}; data[k].forEach(function (i) { have[i.id] = 1; }); data[k] = data[k].concat(inc[k].filter(function (i) { return !have[i.id]; })); }); }
      else return;
      if (save()) { toast('Imported \u2713'); alerted = {}; render(); tick(); }
    });
  };
  rd.readAsText(file);
}

/* ---------- alerts ---------- */
function hideBanner() { var b = $('#banner'); b.hidden = true; b.innerHTML = ''; }
function tick() {
  var items = dueItems(), fresh = items.filter(function (i) { return alerted[i.id] !== i.due; });
  renderTabs();
  if (!fresh.length) return;
  fresh.forEach(function (i) { alerted[i.id] = i.due; });
  var b = $('#banner');
  b.innerHTML = '<span>\u23F0 ' + (fresh.length === 1 ? esc(fresh[0].text.length > 60 ? fresh[0].text.slice(0, 60) + '\u2026' : fresh[0].text) : fresh.length + ' reminders are due') + '</span><button data-a="bannerView">View</button><button data-a="bannerClose" aria-label="Dismiss">\u2715</button>';
  b.hidden = false;
  if (notifState() === 'granted') {
    fresh.slice(0, 3).forEach(function (i) {
      try { new Notification('My Memory', { body: i.text.slice(0, 120), tag: i.id }); }
      catch (e) { try { navigator.serviceWorker.ready.then(function (reg) { reg.showNotification('My Memory', { body: i.text.slice(0, 120), tag: i.id }); }); } catch (e2) { } }
    });
  }
  if (ui.tab === 'today') { var y = view.scrollTop; render(); view.scrollTop = y; }
}

/* ---------- events ---------- */
document.addEventListener('click', function (e) {
  var d = e.target.closest('[data-d]');
  if (d) { var r = dialogResolve; dialogResolve = null; var o = $('#overlay'); o.hidden = true; o.innerHTML = ''; if (r) r(d.dataset.d); return; }
  if (e.target.id === 'overlay') { closeOverlay(); return; }
  var el = e.target.closest('[data-a]');
  if (el && actions[el.dataset.a]) actions[el.dataset.a](el);
});
document.addEventListener('input', function (e) {
  var id = e.target.id;
  if (id === 'cText') { ui.draft.text = e.target.value; updatePreview(); }
  else if (id === 'cDt') { ui.draft.dt = e.target.value; updatePreview(); }
  else if (id === 'q') { ui.f.q = e.target.value; renderResults(); }
  else if (id === 'sName') { data.settings.name = e.target.value.slice(0, 40); save(); }
  else if (id === 'sCc') { var v = e.target.value.replace(/\D/g, '').slice(0, 4); if (v !== e.target.value) e.target.value = v; if (v) { data.settings.cc = v; save(); } }
  else if (id === 'inText') { ui.inText = e.target.value; }
});
document.addEventListener('change', function (e) {
  var id = e.target.id;
  if (id === 'cDt') { ui.draft.dt = e.target.value; updatePreview(); }
  else if (id === 'cPerson') { ui.draft.person = e.target.value; updatePreview(); }
  else if (id === 'tagSel') { ui.f.tag = e.target.value; renderResults(); }
  else if (id === 'impFile') { handleImport(e.target.files[0]); e.target.value = ''; }
  else if (id === 'sName') { render(); }
});
document.addEventListener('submit', function (e) {
  var fid = e.target.id;
  if (fid === 'boardForm' || fid === 'personForm' || fid === 'appForm') { e.preventDefault(); formSubmit[fid](); return; }
  if (e.target.id === 'askForm') {
    e.preventDefault(); var q = $('#askQ').value.trim(); ui.askQ = q;
    ui.askRes = q ? askSearch(q) : { error: 'Type a few words to search for.' };
    $('#askOut').innerHTML = askOut(); if (document.activeElement) document.activeElement.blur();
  }
});
document.addEventListener('visibilitychange', function () { if (!document.hidden) tick(); });

/* ---------- boot ---------- */
load(); render(); tick();
setInterval(tick, 15000);
if ('serviceWorker' in navigator) { window.addEventListener('load', function () { navigator.serviceWorker.register('./sw.js').catch(function () { }); }); }
window.__mem = { get data() { return data; }, ui: ui, suggest: suggest, waUrl: waUrl, normPhone: normPhone, parse: parseWhen, tick: tick, nextDue: nextDue, ask: askSearch, KEY: KEY };
})();
