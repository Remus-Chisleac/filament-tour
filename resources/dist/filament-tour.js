// node_modules/driver.js/dist/driver.js.mjs
var F = {};
function D(e = {}) {
  F = {
    animate: true,
    allowClose: true,
    overlayOpacity: 0.7,
    smoothScroll: false,
    disableActiveInteraction: false,
    showProgress: false,
    stagePadding: 10,
    stageRadius: 5,
    popoverOffset: 10,
    showButtons: ["next", "previous", "close"],
    disableButtons: [],
    overlayColor: "#000",
    ...e
  };
}
function a(e) {
  return e ? F[e] : F;
}
function W(e, o, t, i) {
  return (e /= i / 2) < 1 ? t / 2 * e * e + o : -t / 2 * (--e * (e - 2) - 1) + o;
}
function Q(e) {
  const o = 'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])';
  return e.flatMap((t) => {
    const i = t.matches(o), p = Array.from(t.querySelectorAll(o));
    return [...i ? [t] : [], ...p];
  }).filter((t) => getComputedStyle(t).pointerEvents !== "none" && ae(t));
}
function Z(e) {
  if (!e || se(e))
    return;
  const o = a("smoothScroll");
  e.scrollIntoView({
    // Removing the smooth scrolling for elements which exist inside the scrollable parent
    // This was causing the highlight to not properly render
    behavior: !o || re(e) ? "auto" : "smooth",
    inline: "center",
    block: "center"
  });
}
function re(e) {
  if (!e || !e.parentElement)
    return;
  const o = e.parentElement;
  return o.scrollHeight > o.clientHeight;
}
function se(e) {
  const o = e.getBoundingClientRect();
  return o.top >= 0 && o.left >= 0 && o.bottom <= (window.innerHeight || document.documentElement.clientHeight) && o.right <= (window.innerWidth || document.documentElement.clientWidth);
}
function ae(e) {
  return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length);
}
var O = {};
function b(e, o) {
  O[e] = o;
}
function l(e) {
  return e ? O[e] : O;
}
function V() {
  O = {};
}
var R = {};
function N(e, o) {
  R[e] = o;
}
function L(e) {
  var o;
  (o = R[e]) == null || o.call(R);
}
function ce() {
  R = {};
}
function le(e, o, t, i) {
  let p = l("__activeStagePosition");
  const n = p || t.getBoundingClientRect(), f = i.getBoundingClientRect(), w = W(e, n.x, f.x - n.x, o), r = W(e, n.y, f.y - n.y, o), v = W(e, n.width, f.width - n.width, o), s = W(e, n.height, f.height - n.height, o);
  p = {
    x: w,
    y: r,
    width: v,
    height: s
  }, J(p), b("__activeStagePosition", p);
}
function G(e) {
  if (!e)
    return;
  const o = e.getBoundingClientRect(), t = {
    x: o.x,
    y: o.y,
    width: o.width,
    height: o.height
  };
  b("__activeStagePosition", t), J(t);
}
function de() {
  const e = l("__activeStagePosition"), o = l("__overlaySvg");
  if (!e)
    return;
  if (!o) {
    console.warn("No stage svg found.");
    return;
  }
  const t = window.innerWidth, i = window.innerHeight;
  o.setAttribute("viewBox", `0 0 ${t} ${i}`);
}
function pe(e) {
  const o = ue(e);
  document.body.appendChild(o), te(o, (t) => {
    t.target.tagName === "path" && L("overlayClick");
  }), b("__overlaySvg", o);
}
function J(e) {
  const o = l("__overlaySvg");
  if (!o) {
    pe(e);
    return;
  }
  const t = o.firstElementChild;
  if ((t == null ? void 0 : t.tagName) !== "path")
    throw new Error("no path element found in stage svg");
  t.setAttribute("d", U(e));
}
function ue(e) {
  const o = window.innerWidth, t = window.innerHeight, i = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  i.classList.add("driver-overlay", "driver-overlay-animated"), i.setAttribute("viewBox", `0 0 ${o} ${t}`), i.setAttribute("xmlSpace", "preserve"), i.setAttribute("xmlnsXlink", "http://www.w3.org/1999/xlink"), i.setAttribute("version", "1.1"), i.setAttribute("preserveAspectRatio", "xMinYMin slice"), i.style.fillRule = "evenodd", i.style.clipRule = "evenodd", i.style.strokeLinejoin = "round", i.style.strokeMiterlimit = "2", i.style.zIndex = "10000", i.style.position = "fixed", i.style.top = "0", i.style.left = "0", i.style.width = "100%", i.style.height = "100%";
  const p = document.createElementNS("http://www.w3.org/2000/svg", "path");
  return p.setAttribute("d", U(e)), p.style.fill = a("overlayColor") || "rgb(0,0,0)", p.style.opacity = `${a("overlayOpacity")}`, p.style.pointerEvents = "auto", p.style.cursor = "auto", i.appendChild(p), i;
}
function U(e) {
  const o = window.innerWidth, t = window.innerHeight, i = a("stagePadding") || 0, p = a("stageRadius") || 0, n = e.width + i * 2, f = e.height + i * 2, w = Math.min(p, n / 2, f / 2), r = Math.floor(Math.max(w, 0)), v = e.x - i + r, s = e.y - i, c = n - r * 2, d = f - r * 2;
  return `M${o},0L0,0L0,${t}L${o},${t}L${o},0Z
    M${v},${s} h${c} a${r},${r} 0 0 1 ${r},${r} v${d} a${r},${r} 0 0 1 -${r},${r} h-${c} a${r},${r} 0 0 1 -${r},-${r} v-${d} a${r},${r} 0 0 1 ${r},-${r} z`;
}
function ve() {
  const e = l("__overlaySvg");
  e && e.remove();
}
function fe() {
  const e = document.getElementById("driver-dummy-element");
  if (e)
    return e;
  let o = document.createElement("div");
  return o.id = "driver-dummy-element", o.style.width = "0", o.style.height = "0", o.style.pointerEvents = "none", o.style.opacity = "0", o.style.position = "fixed", o.style.top = "50%", o.style.left = "50%", document.body.appendChild(o), o;
}
function K(e) {
  const { element: o } = e;
  let t = typeof o == "string" ? document.querySelector(o) : o;
  t || (t = fe()), ge(t, e);
}
function he() {
  const e = l("__activeElement"), o = l("__activeStep");
  e && (G(e), de(), ie(e, o));
}
function ge(e, o) {
  const i = Date.now(), p = l("__activeStep"), n = l("__activeElement") || e, f = !n || n === e, w = e.id === "driver-dummy-element", r = n.id === "driver-dummy-element", v = a("animate"), s = o.onHighlightStarted || a("onHighlightStarted"), c = (o == null ? void 0 : o.onHighlighted) || a("onHighlighted"), d = (p == null ? void 0 : p.onDeselected) || a("onDeselected"), m = a(), g = l();
  !f && d && d(r ? void 0 : n, p, {
    config: m,
    state: g
  }), s && s(w ? void 0 : e, o, {
    config: m,
    state: g
  });
  const u = !f && v;
  let h = false;
  xe(), b("previousStep", p), b("previousElement", n), b("activeStep", o), b("activeElement", e);
  const P = () => {
    if (l("__transitionCallback") !== P)
      return;
    const x = Date.now() - i, y = 400 - x <= 400 / 2;
    o.popover && y && !h && u && (X(e, o), h = true), a("animate") && x < 400 ? le(x, 400, n, e) : (G(e), c && c(w ? void 0 : e, o, {
      config: a(),
      state: l()
    }), b("__transitionCallback", void 0), b("__previousStep", p), b("__previousElement", n), b("__activeStep", o), b("__activeElement", e)), window.requestAnimationFrame(P);
  };
  b("__transitionCallback", P), window.requestAnimationFrame(P), Z(e), !u && o.popover && X(e, o), n.classList.remove("driver-active-element", "driver-no-interaction"), n.removeAttribute("aria-haspopup"), n.removeAttribute("aria-expanded"), n.removeAttribute("aria-controls"), a("disableActiveInteraction") && e.classList.add("driver-no-interaction"), e.classList.add("driver-active-element"), e.setAttribute("aria-haspopup", "dialog"), e.setAttribute("aria-expanded", "true"), e.setAttribute("aria-controls", "driver-popover-content");
}
function we() {
  var e;
  (e = document.getElementById("driver-dummy-element")) == null || e.remove(), document.querySelectorAll(".driver-active-element").forEach((o) => {
    o.classList.remove("driver-active-element", "driver-no-interaction"), o.removeAttribute("aria-haspopup"), o.removeAttribute("aria-expanded"), o.removeAttribute("aria-controls");
  });
}
function I() {
  const e = l("__resizeTimeout");
  e && window.cancelAnimationFrame(e), b("__resizeTimeout", window.requestAnimationFrame(he));
}
function me(e) {
  var r;
  if (!l("isInitialized") || !(e.key === "Tab" || e.keyCode === 9))
    return;
  const i = l("__activeElement"), p = (r = l("popover")) == null ? void 0 : r.wrapper, n = Q([
    ...p ? [p] : [],
    ...i ? [i] : []
  ]), f = n[0], w = n[n.length - 1];
  if (e.preventDefault(), e.shiftKey) {
    const v = n[n.indexOf(document.activeElement) - 1] || w;
    v == null || v.focus();
  } else {
    const v = n[n.indexOf(document.activeElement) + 1] || f;
    v == null || v.focus();
  }
}
function ee(e) {
  var t;
  ((t = a("allowKeyboardControl")) == null || t) && (e.key === "Escape" ? L("escapePress") : e.key === "ArrowRight" ? L("arrowRightPress") : e.key === "ArrowLeft" && L("arrowLeftPress"));
}
function te(e, o, t) {
  const i = (n, f) => {
    const w = n.target;
    e.contains(w) && ((!t || t(w)) && (n.preventDefault(), n.stopPropagation(), n.stopImmediatePropagation()), f == null || f(n));
  };
  document.addEventListener("pointerdown", i, true), document.addEventListener("mousedown", i, true), document.addEventListener("pointerup", i, true), document.addEventListener("mouseup", i, true), document.addEventListener(
    "click",
    (n) => {
      i(n, o);
    },
    true
  );
}
function ye() {
  window.addEventListener("keyup", ee, false), window.addEventListener("keydown", me, false), window.addEventListener("resize", I), window.addEventListener("scroll", I);
}
function be() {
  window.removeEventListener("keyup", ee), window.removeEventListener("resize", I), window.removeEventListener("scroll", I);
}
function xe() {
  const e = l("popover");
  e && (e.wrapper.style.display = "none");
}
function X(e, o) {
  var C, y;
  let t = l("popover");
  t && document.body.removeChild(t.wrapper), t = Pe(), document.body.appendChild(t.wrapper);
  const {
    title: i,
    description: p,
    showButtons: n,
    disableButtons: f,
    showProgress: w,
    nextBtnText: r = a("nextBtnText") || "Next &rarr;",
    prevBtnText: v = a("prevBtnText") || "&larr; Previous",
    progressText: s = a("progressText") || "{current} of {total}"
  } = o.popover || {};
  t.nextButton.innerHTML = r, t.previousButton.innerHTML = v, t.progress.innerHTML = s, i ? (t.title.innerHTML = i, t.title.style.display = "block") : t.title.style.display = "none", p ? (t.description.innerHTML = p, t.description.style.display = "block") : t.description.style.display = "none";
  const c = n || a("showButtons"), d = w || a("showProgress") || false, m = (c == null ? void 0 : c.includes("next")) || (c == null ? void 0 : c.includes("previous")) || d;
  t.closeButton.style.display = c.includes("close") ? "block" : "none", m ? (t.footer.style.display = "flex", t.progress.style.display = d ? "block" : "none", t.nextButton.style.display = c.includes("next") ? "block" : "none", t.previousButton.style.display = c.includes("previous") ? "block" : "none") : t.footer.style.display = "none";
  const g = f || a("disableButtons") || [];
  g != null && g.includes("next") && (t.nextButton.disabled = true, t.nextButton.classList.add("driver-popover-btn-disabled")), g != null && g.includes("previous") && (t.previousButton.disabled = true, t.previousButton.classList.add("driver-popover-btn-disabled")), g != null && g.includes("close") && (t.closeButton.disabled = true, t.closeButton.classList.add("driver-popover-btn-disabled"));
  const u = t.wrapper;
  u.style.display = "block", u.style.left = "", u.style.top = "", u.style.bottom = "", u.style.right = "", u.id = "driver-popover-content", u.setAttribute("role", "dialog"), u.setAttribute("aria-labelledby", "driver-popover-title"), u.setAttribute("aria-describedby", "driver-popover-description");
  const h = t.arrow;
  h.className = "driver-popover-arrow";
  const P = ((C = o.popover) == null ? void 0 : C.popoverClass) || a("popoverClass") || "";
  u.className = `driver-popover ${P}`.trim(), te(
    t.wrapper,
    (k) => {
      var $, B, M;
      const T = k.target, E = (($ = o.popover) == null ? void 0 : $.onNextClick) || a("onNextClick"), A = ((B = o.popover) == null ? void 0 : B.onPrevClick) || a("onPrevClick"), H = ((M = o.popover) == null ? void 0 : M.onCloseClick) || a("onCloseClick");
      if (T.classList.contains("driver-popover-next-btn"))
        return E ? E(e, o, {
          config: a(),
          state: l()
        }) : L("nextClick");
      if (T.classList.contains("driver-popover-prev-btn"))
        return A ? A(e, o, {
          config: a(),
          state: l()
        }) : L("prevClick");
      if (T.classList.contains("driver-popover-close-btn"))
        return H ? H(e, o, {
          config: a(),
          state: l()
        }) : L("closeClick");
    },
    (k) => !(t != null && t.description.contains(k)) && !(t != null && t.title.contains(k)) && typeof k.className == "string" && k.className.includes("driver-popover")
  ), b("popover", t);
  const S = ((y = o.popover) == null ? void 0 : y.onPopoverRender) || a("onPopoverRender");
  S && S(t, {
    config: a(),
    state: l()
  }), ie(e, o), Z(u);
  const _ = e.classList.contains("driver-dummy-element"), x = Q([u, ..._ ? [] : [e]]);
  x.length > 0 && x[0].focus();
}
function oe() {
  const e = l("popover");
  if (!(e != null && e.wrapper))
    return;
  const o = e.wrapper.getBoundingClientRect(), t = a("stagePadding") || 0, i = a("popoverOffset") || 0;
  return {
    width: o.width + t + i,
    height: o.height + t + i,
    realWidth: o.width,
    realHeight: o.height
  };
}
function Y(e, o) {
  const { elementDimensions: t, popoverDimensions: i, popoverPadding: p, popoverArrowDimensions: n } = o;
  return e === "start" ? Math.max(
    Math.min(
      t.top - p,
      window.innerHeight - i.realHeight - n.width
    ),
    n.width
  ) : e === "end" ? Math.max(
    Math.min(
      t.top - (i == null ? void 0 : i.realHeight) + t.height + p,
      window.innerHeight - (i == null ? void 0 : i.realHeight) - n.width
    ),
    n.width
  ) : e === "center" ? Math.max(
    Math.min(
      t.top + t.height / 2 - (i == null ? void 0 : i.realHeight) / 2,
      window.innerHeight - (i == null ? void 0 : i.realHeight) - n.width
    ),
    n.width
  ) : 0;
}
function j(e, o) {
  const { elementDimensions: t, popoverDimensions: i, popoverPadding: p, popoverArrowDimensions: n } = o;
  return e === "start" ? Math.max(
    Math.min(
      t.left - p,
      window.innerWidth - i.realWidth - n.width
    ),
    n.width
  ) : e === "end" ? Math.max(
    Math.min(
      t.left - (i == null ? void 0 : i.realWidth) + t.width + p,
      window.innerWidth - (i == null ? void 0 : i.realWidth) - n.width
    ),
    n.width
  ) : e === "center" ? Math.max(
    Math.min(
      t.left + t.width / 2 - (i == null ? void 0 : i.realWidth) / 2,
      window.innerWidth - (i == null ? void 0 : i.realWidth) - n.width
    ),
    n.width
  ) : 0;
}
function ie(e, o) {
  const t = l("popover");
  if (!t)
    return;
  const { align: i = "start", side: p = "left" } = (o == null ? void 0 : o.popover) || {}, n = i, f = e.id === "driver-dummy-element" ? "over" : p, w = a("stagePadding") || 0, r = oe(), v = t.arrow.getBoundingClientRect(), s = e.getBoundingClientRect(), c = s.top - r.height;
  let d = c >= 0;
  const m = window.innerHeight - (s.bottom + r.height);
  let g = m >= 0;
  const u = s.left - r.width;
  let h = u >= 0;
  const P = window.innerWidth - (s.right + r.width);
  let S = P >= 0;
  const _ = !d && !g && !h && !S;
  let x = f;
  if (f === "top" && d ? S = h = g = false : f === "bottom" && g ? S = h = d = false : f === "left" && h ? S = d = g = false : f === "right" && S && (h = d = g = false), f === "over") {
    const C = window.innerWidth / 2 - r.realWidth / 2, y = window.innerHeight / 2 - r.realHeight / 2;
    t.wrapper.style.left = `${C}px`, t.wrapper.style.right = "auto", t.wrapper.style.top = `${y}px`, t.wrapper.style.bottom = "auto";
  } else if (_) {
    const C = window.innerWidth / 2 - (r == null ? void 0 : r.realWidth) / 2, y = 10;
    t.wrapper.style.left = `${C}px`, t.wrapper.style.right = "auto", t.wrapper.style.bottom = `${y}px`, t.wrapper.style.top = "auto";
  } else if (h) {
    const C = Math.min(
      u,
      window.innerWidth - (r == null ? void 0 : r.realWidth) - v.width
    ), y = Y(n, {
      elementDimensions: s,
      popoverDimensions: r,
      popoverPadding: w,
      popoverArrowDimensions: v
    });
    t.wrapper.style.left = `${C}px`, t.wrapper.style.top = `${y}px`, t.wrapper.style.bottom = "auto", t.wrapper.style.right = "auto", x = "left";
  } else if (S) {
    const C = Math.min(
      P,
      window.innerWidth - (r == null ? void 0 : r.realWidth) - v.width
    ), y = Y(n, {
      elementDimensions: s,
      popoverDimensions: r,
      popoverPadding: w,
      popoverArrowDimensions: v
    });
    t.wrapper.style.right = `${C}px`, t.wrapper.style.top = `${y}px`, t.wrapper.style.bottom = "auto", t.wrapper.style.left = "auto", x = "right";
  } else if (d) {
    const C = Math.min(
      c,
      window.innerHeight - r.realHeight - v.width
    );
    let y = j(n, {
      elementDimensions: s,
      popoverDimensions: r,
      popoverPadding: w,
      popoverArrowDimensions: v
    });
    t.wrapper.style.top = `${C}px`, t.wrapper.style.left = `${y}px`, t.wrapper.style.bottom = "auto", t.wrapper.style.right = "auto", x = "top";
  } else if (g) {
    const C = Math.min(
      m,
      window.innerHeight - (r == null ? void 0 : r.realHeight) - v.width
    );
    let y = j(n, {
      elementDimensions: s,
      popoverDimensions: r,
      popoverPadding: w,
      popoverArrowDimensions: v
    });
    t.wrapper.style.left = `${y}px`, t.wrapper.style.bottom = `${C}px`, t.wrapper.style.top = "auto", t.wrapper.style.right = "auto", x = "bottom";
  }
  _ ? t.arrow.classList.add("driver-popover-arrow-none") : Ce(n, x, e);
}
function Ce(e, o, t) {
  const i = l("popover");
  if (!i)
    return;
  const p = t.getBoundingClientRect(), n = oe(), f = i.arrow, w = n.width, r = window.innerWidth, v = p.width, s = p.left, c = n.height, d = window.innerHeight, m = p.top, g = p.height;
  f.className = "driver-popover-arrow";
  let u = o, h = e;
  o === "top" ? (s + v <= 0 ? (u = "right", h = "end") : s + v - w <= 0 && (u = "top", h = "start"), s >= r ? (u = "left", h = "end") : s + w >= r && (u = "top", h = "end")) : o === "bottom" ? (s + v <= 0 ? (u = "right", h = "start") : s + v - w <= 0 && (u = "bottom", h = "start"), s >= r ? (u = "left", h = "start") : s + w >= r && (u = "bottom", h = "end")) : o === "left" ? (m + g <= 0 ? (u = "bottom", h = "end") : m + g - c <= 0 && (u = "left", h = "start"), m >= d ? (u = "top", h = "end") : m + c >= d && (u = "left", h = "end")) : o === "right" && (m + g <= 0 ? (u = "bottom", h = "start") : m + g - c <= 0 && (u = "right", h = "start"), m >= d ? (u = "top", h = "start") : m + c >= d && (u = "right", h = "end")), u ? (f.classList.add(`driver-popover-arrow-side-${u}`), f.classList.add(`driver-popover-arrow-align-${h}`)) : f.classList.add("driver-popover-arrow-none");
}
function Pe() {
  const e = document.createElement("div");
  e.classList.add("driver-popover");
  const o = document.createElement("div");
  o.classList.add("driver-popover-arrow");
  const t = document.createElement("header");
  t.id = "driver-popover-title", t.classList.add("driver-popover-title"), t.style.display = "none", t.innerText = "Popover Title";
  const i = document.createElement("div");
  i.id = "driver-popover-description", i.classList.add("driver-popover-description"), i.style.display = "none", i.innerText = "Popover description is here";
  const p = document.createElement("button");
  p.type = "button", p.classList.add("driver-popover-close-btn"), p.setAttribute("aria-label", "Close"), p.innerHTML = "&times;";
  const n = document.createElement("footer");
  n.classList.add("driver-popover-footer");
  const f = document.createElement("span");
  f.classList.add("driver-popover-progress-text"), f.innerText = "";
  const w = document.createElement("span");
  w.classList.add("driver-popover-navigation-btns");
  const r = document.createElement("button");
  r.type = "button", r.classList.add("driver-popover-prev-btn"), r.innerHTML = "&larr; Previous";
  const v = document.createElement("button");
  return v.type = "button", v.classList.add("driver-popover-next-btn"), v.innerHTML = "Next &rarr;", w.appendChild(r), w.appendChild(v), n.appendChild(f), n.appendChild(w), e.appendChild(p), e.appendChild(o), e.appendChild(t), e.appendChild(i), e.appendChild(n), {
    wrapper: e,
    arrow: o,
    title: t,
    description: i,
    footer: n,
    previousButton: r,
    nextButton: v,
    closeButton: p,
    footerButtons: w,
    progress: f
  };
}
function Se() {
  var o;
  const e = l("popover");
  e && ((o = e.wrapper.parentElement) == null || o.removeChild(e.wrapper));
}
function ke(e = {}) {
  D(e);
  function o() {
    a("allowClose") && v();
  }
  function t() {
    const s = l("activeIndex"), c = a("steps") || [];
    if (typeof s == "undefined")
      return;
    const d = s + 1;
    c[d] ? r(d) : v();
  }
  function i() {
    const s = l("activeIndex"), c = a("steps") || [];
    if (typeof s == "undefined")
      return;
    const d = s - 1;
    c[d] ? r(d) : v();
  }
  function p(s) {
    (a("steps") || [])[s] ? r(s) : v();
  }
  function n() {
    var h;
    if (l("__transitionCallback"))
      return;
    const c = l("activeIndex"), d = l("__activeStep"), m = l("__activeElement");
    if (typeof c == "undefined" || typeof d == "undefined" || typeof l("activeIndex") == "undefined")
      return;
    const u = ((h = d.popover) == null ? void 0 : h.onPrevClick) || a("onPrevClick");
    if (u)
      return u(m, d, {
        config: a(),
        state: l()
      });
    i();
  }
  function f() {
    var u;
    if (l("__transitionCallback"))
      return;
    const c = l("activeIndex"), d = l("__activeStep"), m = l("__activeElement");
    if (typeof c == "undefined" || typeof d == "undefined")
      return;
    const g = ((u = d.popover) == null ? void 0 : u.onNextClick) || a("onNextClick");
    if (g)
      return g(m, d, {
        config: a(),
        state: l()
      });
    t();
  }
  function w() {
    l("isInitialized") || (b("isInitialized", true), document.body.classList.add("driver-active", a("animate") ? "driver-fade" : "driver-simple"), ye(), N("overlayClick", o), N("escapePress", o), N("arrowLeftPress", n), N("arrowRightPress", f));
  }
  function r(s = 0) {
    var E, A, H, $, B, M, z, q;
    const c = a("steps");
    if (!c) {
      console.error("No steps to drive through"), v();
      return;
    }
    if (!c[s]) {
      v();
      return;
    }
    b("__activeOnDestroyed", document.activeElement), b("activeIndex", s);
    const d = c[s], m = c[s + 1], g = c[s - 1], u = ((E = d.popover) == null ? void 0 : E.doneBtnText) || a("doneBtnText") || "Done", h = a("allowClose"), P = typeof ((A = d.popover) == null ? void 0 : A.showProgress) != "undefined" ? (H = d.popover) == null ? void 0 : H.showProgress : a("showProgress"), _ = ((($ = d.popover) == null ? void 0 : $.progressText) || a("progressText") || "{{current}} of {{total}}").replace("{{current}}", `${s + 1}`).replace("{{total}}", `${c.length}`), x = ((B = d.popover) == null ? void 0 : B.showButtons) || a("showButtons"), C = [
      "next",
      "previous",
      ...h ? ["close"] : []
    ].filter((ne) => !(x != null && x.length) || x.includes(ne)), y = ((M = d.popover) == null ? void 0 : M.onNextClick) || a("onNextClick"), k = ((z = d.popover) == null ? void 0 : z.onPrevClick) || a("onPrevClick"), T = ((q = d.popover) == null ? void 0 : q.onCloseClick) || a("onCloseClick");
    K({
      ...d,
      popover: {
        showButtons: C,
        nextBtnText: m ? void 0 : u,
        disableButtons: [...g ? [] : ["previous"]],
        showProgress: P,
        progressText: _,
        onNextClick: y || (() => {
          m ? r(s + 1) : v();
        }),
        onPrevClick: k || (() => {
          r(s - 1);
        }),
        onCloseClick: T || (() => {
          v();
        }),
        ...(d == null ? void 0 : d.popover) || {}
      }
    });
  }
  function v(s = true) {
    const c = l("__activeElement"), d = l("__activeStep"), m = l("__activeOnDestroyed"), g = a("onDestroyStarted");
    if (s && g) {
      const P = !c || (c == null ? void 0 : c.id) === "driver-dummy-element";
      g(P ? void 0 : c, d, {
        config: a(),
        state: l()
      });
      return;
    }
    const u = (d == null ? void 0 : d.onDeselected) || a("onDeselected"), h = a("onDestroyed");
    if (document.body.classList.remove("driver-active", "driver-fade", "driver-simple"), be(), Se(), we(), ve(), ce(), V(), c && d) {
      const P = c.id === "driver-dummy-element";
      u && u(P ? void 0 : c, d, {
        config: a(),
        state: l()
      }), h && h(P ? void 0 : c, d, {
        config: a(),
        state: l()
      });
    }
    m && m.focus();
  }
  return {
    isActive: () => l("isInitialized") || false,
    refresh: I,
    drive: (s = 0) => {
      w(), r(s);
    },
    setConfig: D,
    setSteps: (s) => {
      V(), D({
        ...a(),
        steps: s
      });
    },
    getConfig: a,
    getState: l,
    getActiveIndex: () => l("activeIndex"),
    isFirstStep: () => l("activeIndex") === 0,
    isLastStep: () => {
      const s = a("steps") || [], c = l("activeIndex");
      return c !== void 0 && c === s.length - 1;
    },
    getActiveStep: () => l("activeStep"),
    getActiveElement: () => l("activeElement"),
    getPreviousElement: () => l("previousElement"),
    getPreviousStep: () => l("previousStep"),
    moveNext: t,
    movePrevious: i,
    moveTo: p,
    hasNextStep: () => {
      const s = a("steps") || [], c = l("activeIndex");
      return c !== void 0 && s[c + 1];
    },
    hasPreviousStep: () => {
      const s = a("steps") || [], c = l("activeIndex");
      return c !== void 0 && s[c - 1];
    },
    highlight: (s) => {
      w(), K({
        ...s,
        popover: s.popover ? {
          showButtons: [],
          showProgress: false,
          progressText: "",
          ...s.popover
        } : void 0
      });
    },
    destroy: () => {
      v(false);
    }
  };
}

// resources/js/css-selector.js
var lastMouseX = 0;
var lastMouseY = 0;
var active = false;
var hasNavigator = window.navigator.clipboard;
var isInElement = false;
var selected = null;
var cursor = document.querySelector("#circle-cursor");
function initCssSelector() {
  Livewire.on("filament-tour::change-css-selector-status", function({ enabled }) {
    if (enabled) {
      let release = function(event) {
        if (event.key !== "Escape")
          return;
        active = false;
        selected = null;
        cursor.style.display = "none";
      };
      document.onmousemove = handleMouseMove;
      document.onkeyup = release;
      document.onmouseover = enterCursor;
      document.onmouseleave = leaveCursor;
      document.addEventListener("keydown", function(event) {
        if (event.ctrlKey && event.code === "Space" && !active) {
          if (!hasNavigator) {
            new FilamentNotification().title("Filament Tour - CSS Selector").body("Your browser does not support the Clipboard API !<br>Don't forget to be in <b>https://</b> protocol").danger().send();
          } else {
            active = true;
            moveCursor(lastMouseX, lastMouseY);
            cursor.style.display = "block";
            new FilamentNotification().title("Filament Tour - CSS Selector").body("Activated !<br>Press Ctrl + C to copy the CSS Selector of the selected element !").success().send();
          }
        }
        if (event.ctrlKey && event.code === "KeyC" && active) {
          navigator.clipboard.writeText(getOptimizedSelector(selected) ?? "Nothing selected !");
          active = false;
          selected = null;
          cursor.style.display = "none";
          new FilamentNotification().title("Filament Tour - CSS Selector").body(`CSS Selector copied to clipboard !`).success().send();
        }
      });
    }
  });
}
function escapeCssSelector(str) {
  return str.replace(/([!"#$%&'()*+,./:;<=>?@[\]^`{|}~])/g, "\\$1");
}
function getOptimizedSelector(el) {
  let fullSelector = getCssSelector(el);
  return optimizeSelector(fullSelector);
}
function optimizeSelector(selector) {
  let parts = selector.split(" > ");
  for (let i = parts.length - 2; i >= 0; i--) {
    let testSelector = parts.slice(i).join(" > ");
    if (document.querySelectorAll(testSelector).length === 1) {
      return testSelector;
    }
  }
  return selector;
}
function getCssSelector(el) {
  if (!el) {
    return "";
  }
  if (el.id) {
    return "#" + escapeCssSelector(el.id);
  }
  if (el === document.body) {
    return "body";
  }
  let tag = el.tagName.toLowerCase();
  let validClasses = el.className.split(/\s+/).filter((cls) => cls && !cls.startsWith("--"));
  let classes = validClasses.length ? "." + validClasses.map(escapeCssSelector).join(".") : "";
  let selectorWithoutNthOfType = tag + classes;
  try {
    let siblingsWithSameSelector = Array.from(el.parentNode.querySelectorAll(selectorWithoutNthOfType));
    if (siblingsWithSameSelector.length === 1 && siblingsWithSameSelector[0] === el) {
      return getCssSelector(el.parentNode) + " > " + selectorWithoutNthOfType;
    }
    let siblings = Array.from(el.parentNode.children);
    let sameTagAndClassSiblings = siblings.filter((sib) => sib.tagName === el.tagName && sib.className === el.className);
    if (sameTagAndClassSiblings.length > 1) {
      let index = sameTagAndClassSiblings.indexOf(el) + 1;
      return getCssSelector(el.parentNode) + " > " + tag + classes + ":nth-of-type(" + index + ")";
    } else {
      return getCssSelector(el.parentNode) + " > " + tag + classes;
    }
  } catch (e) {
  }
}
function handleMouseMove(event) {
  lastMouseX = event.clientX;
  lastMouseY = event.clientY;
  moveCursor(event.clientX, event.clientY);
}
function moveCursor(pX, pY) {
  if (!active)
    return;
  let diff = 10;
  if (!isInElement) {
    cursor.style.left = pX - diff + "px";
    cursor.style.top = pY - diff + "px";
    cursor.style.width = "20px";
    cursor.style.height = "20px";
    cursor.style.borderRadius = "50%";
  }
}
function enterCursor(event) {
  event.stopPropagation();
  if (!active)
    return;
  isInElement = true;
  let elem = event.target;
  while (elem.lastElementChild) {
    elem = elem.lastElementChild;
  }
  if (elem) {
    let eX = elem.offsetParent ? elem.offsetLeft + elem.offsetParent.offsetLeft : elem.offsetLeft;
    let eY = elem.offsetParent ? elem.offsetTop + elem.offsetParent.offsetTop : elem.offsetTop;
    let eW = elem.offsetWidth;
    let eH = elem.offsetHeight;
    let diff = 6;
    selected = elem;
    cursor.style.left = eX - diff + "px";
    cursor.style.top = eY - diff + "px";
    cursor.style.width = eW + diff * 2 - 1 + "px";
    cursor.style.height = eH + diff * 2 - 1 + "px";
    cursor.style.borderRadius = "5px";
  }
}
function leaveCursor(event) {
  if (!active)
    return;
  isInElement = false;
}

// resources/js/index.js
document.addEventListener("livewire:initialized", async function() {
  initCssSelector();
  let pluginData;
  let tours = [];
  let highlights = [];
  function waitForElement(selector, callback) {
    if (document.querySelector(selector)) {
      callback(document.querySelector(selector));
      return;
    }
    const observer = new MutationObserver(function(mutations) {
      if (document.querySelector(selector)) {
        callback(document.querySelector(selector));
        observer.disconnect();
      }
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
  function parseId(params) {
    if (Array.isArray(params)) {
      return params[0];
    } else if (typeof params === "object") {
      return params.id;
    }
    return params;
  }
  Livewire.dispatch("filament-tour::load-elements", { request: window.location });
  Livewire.on("filament-tour::loaded-elements", function(data) {
    pluginData = data;
    pluginData.tours.forEach((tour) => {
      tours.push(tour);
      if (!localStorage.getItem("tours")) {
        localStorage.setItem("tours", "[]");
      }
    });
    selectTour(tours);
    pluginData.highlights.forEach((highlight) => {
      if (highlight.route === window.location.pathname) {
        waitForElement(highlight.parent, function(selector) {
          selector.parentNode.style.position = "relative";
          let tempDiv = document.createElement("div");
          tempDiv.innerHTML = highlight.button;
          tempDiv.firstChild.classList.add(highlight.position);
          selector.parentNode.insertBefore(tempDiv.firstChild, selector);
        });
        highlights.push(highlight);
      }
    });
  });
  function selectTour(tours2, startIndex = 0) {
    for (let i = startIndex; i < tours2.length; i++) {
      let tour = tours2[i];
      let conditionAlwaysShow = tour.alwaysShow;
      let conditionRoutesIgnored = tour.routesIgnored;
      let conditionRouteMatches = tour.route === window.location.pathname;
      let conditionVisibleOnce = !pluginData.only_visible_once || pluginData.only_visible_once && !localStorage.getItem("tours").includes(tour.id);
      if (conditionAlwaysShow && conditionRoutesIgnored || conditionAlwaysShow && !conditionRoutesIgnored && conditionRouteMatches || conditionRoutesIgnored && conditionVisibleOnce || conditionRouteMatches && conditionVisibleOnce) {
        openTour(tour);
        break;
      }
    }
  }
  Livewire.on("filament-tour::open-highlight", function(params) {
    const id = parseId(params);
    console.log(highlights);
    let highlight = highlights.find((element) => element.id === id);
    if (highlight) {
      ke({
        overlayColor: localStorage.theme === "light" ? highlight.colors.light : highlight.colors.dark,
        onPopoverRender: (popover, { config, state }) => {
          popover.title.innerHTML = "";
          popover.title.innerHTML = state.activeStep.popover.title;
          if (!state.activeStep.popover.description) {
            popover.title.firstChild.style.justifyContent = "center";
          }
          let contentClasses = "dark:text-white fi-section rounded-xl bg-white shadow-sm ring-1 ring-gray-950/5 dark:bg-gray-900 dark:ring-white/10 mb-4";
          popover.footer.parentElement.classList.add(...contentClasses.split(" "));
        }
      }).highlight(highlight);
    } else {
      console.error(`Highlight with id '${id}' not found`);
    }
  });
  Livewire.on("filament-tour::open-tour", function(params) {
    const id = parseId(params);
    let tour = tours.find((element) => element.id === `tour_${id}`);
    if (tour) {
      openTour(tour);
    } else {
      console.error(`Tour with id '${id}' not found`);
    }
  });
  function openTour(tour) {
    let steps = JSON.parse(tour.steps);
    if (steps.length > 0) {
      const driverObj = ke({
        allowClose: true,
        disableActiveInteraction: true,
        overlayColor: localStorage.theme === "light" ? tour.colors.light : tour.colors.dark,
        onDeselected: (element, step, { config, state }) => {
        },
        onCloseClick: (element, step, { config, state }) => {
          if (state.activeStep && (!state.activeStep.uncloseable || tour.uncloseable))
            driverObj.destroy();
          if (!localStorage.getItem("tours").includes(tour.id)) {
            localStorage.setItem("tours", JSON.stringify([...JSON.parse(localStorage.getItem("tours")), tour.id]));
          }
        },
        onDestroyStarted: (element, step, { config, state }) => {
          if (state.activeStep && !state.activeStep.uncloseable && !tour.uncloseable) {
            driverObj.destroy();
          }
        },
        onDestroyed: (element, step, { config, state }) => {
        },
        onNextClick: (element, step, { config, state }) => {
          if (tours.length > 1 && driverObj.isLastStep()) {
            let index = tours.findIndex((objet) => objet.id === tour.id);
            if (index !== -1 && index < tours.length - 1) {
              let nextTourIndex = index + 1;
              selectTour(tours, nextTourIndex);
            }
          }
          if (driverObj.isLastStep()) {
            if (!localStorage.getItem("tours").includes(tour.id)) {
              localStorage.setItem("tours", JSON.stringify([...JSON.parse(localStorage.getItem("tours")), tour.id]));
            }
            driverObj.destroy();
          }
          if (step.events) {
            if (step.events.notifyOnNext) {
              new FilamentNotification().title(step.events.notifyOnNext.title).body(step.events.notifyOnNext.body).icon(step.events.notifyOnNext.icon).iconColor(step.events.notifyOnNext.iconColor).color(step.events.notifyOnNext.color).duration(step.events.notifyOnNext.duration).send();
            }
            if (step.events.dispatchOnNext) {
              Livewire.dispatch(step.events.dispatchOnNext.name, step.events.dispatchOnNext.params);
            }
            if (step.events.clickOnNext) {
              document.querySelector(step.events.clickOnNext).click();
            }
            if (step.events.redirectOnNext) {
              window.open(step.events.redirectOnNext.url, step.events.redirectOnNext.newTab ? "_blank" : "_self");
            }
          }
          driverObj.moveNext();
        },
        onPopoverRender: (popover, { config, state }) => {
          console.log(state.activeStep);
          popover.side = state.activeStep.popover.side;
          popover.align = state.activeStep.popover.align;
          console.log(popover);
          if (state.activeStep.uncloseable || tour.uncloseable)
            document.querySelector(".driver-popover-close-btn").remove();
          popover.title.innerHTML = "";
          popover.title.innerHTML = state.activeStep.popover.title;
          if (!state.activeStep.popover.description) {
            popover.title.firstChild.style.justifyContent = "center";
          }
          let contentClasses = "dark:text-white fi-section rounded-xl bg-white shadow-sm ring-1 ring-gray-950/5 dark:bg-gray-900 dark:ring-white/10 mb-4";
          popover.footer.parentElement.classList.add(...contentClasses.split(" "));
          popover.footer.innerHTML = "";
          popover.footer.classList.add("flex", "mt-3");
          popover.footer.style.justifyContent = "space-evenly";
          popover.footer.classList.remove("driver-popover-footer");
          console.log(popover.arrow);
          const nextButton = document.createElement("button");
          let nextClasses = "fi-btn fi-btn-size-md relative grid-flow-col items-center justify-center font-semibold outline-none transition duration-75 focus:ring-2 disabled:pointer-events-none disabled:opacity-70 rounded-lg fi-btn-color-primary gap-1.5 px-3 py-2 text-sm inline-grid shadow-sm bg-custom-600 text-white hover:bg-custom-500 dark:bg-custom-500 dark:hover:bg-custom-400 focus:ring-custom-500/50 dark:focus:ring-custom-400/50 fi-ac-btn-action";
          nextButton.classList.add(...nextClasses.split(" "), "driver-popover-next-btn");
          nextButton.innerText = driverObj.isLastStep() ? state.activeStep.popover.nextBtnText != null ? state.activeStep.popover.nextBtnText : tour.doneButtonLabel : state.activeStep.popover.nextBtnText != null ? state.activeStep.popover.nextBtnText : tour.nextButtonLabel;
          nextButton.style.setProperty("--c-400", "var(--primary-400");
          nextButton.style.setProperty("--c-500", "var(--primary-500");
          nextButton.style.setProperty("--c-600", "var(--primary-600");
          const prevButton = document.createElement("button");
          let prevClasses = "fi-btn fi-btn-size-md relative grid-flow-col items-center justify-center font-semibold outline-none transition duration-75 focus:ring-2 disabled:pointer-events-none disabled:opacity-70 rounded-lg fi-btn-color-gray gap-1.5 px-3 py-2 text-sm inline-grid shadow-sm bg-white text-gray-950 hover:bg-gray-50 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 ring-1 ring-gray-950/10 dark:ring-white/20 fi-ac-btn-action";
          prevButton.classList.add(...prevClasses.split(" "), "driver-popover-prev-btn");
          prevButton.innerText = state.activeStep.popover.prevBtnText != null ? state.activeStep.popover.nextBtnText : tour.previousButtonLabel;
          if (!driverObj.isFirstStep()) {
            popover.footer.appendChild(prevButton);
          }
          popover.footer.appendChild(nextButton);
        },
        steps
      });
      driverObj.drive();
    }
  }
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vbm9kZV9tb2R1bGVzL2RyaXZlci5qcy9kaXN0L2RyaXZlci5qcy5tanMiLCAiLi4vanMvY3NzLXNlbGVjdG9yLmpzIiwgIi4uL2pzL2luZGV4LmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJsZXQgRiA9IHt9O1xuZnVuY3Rpb24gRChlID0ge30pIHtcbiAgRiA9IHtcbiAgICBhbmltYXRlOiAhMCxcbiAgICBhbGxvd0Nsb3NlOiAhMCxcbiAgICBvdmVybGF5T3BhY2l0eTogMC43LFxuICAgIHNtb290aFNjcm9sbDogITEsXG4gICAgZGlzYWJsZUFjdGl2ZUludGVyYWN0aW9uOiAhMSxcbiAgICBzaG93UHJvZ3Jlc3M6ICExLFxuICAgIHN0YWdlUGFkZGluZzogMTAsXG4gICAgc3RhZ2VSYWRpdXM6IDUsXG4gICAgcG9wb3Zlck9mZnNldDogMTAsXG4gICAgc2hvd0J1dHRvbnM6IFtcIm5leHRcIiwgXCJwcmV2aW91c1wiLCBcImNsb3NlXCJdLFxuICAgIGRpc2FibGVCdXR0b25zOiBbXSxcbiAgICBvdmVybGF5Q29sb3I6IFwiIzAwMFwiLFxuICAgIC4uLmVcbiAgfTtcbn1cbmZ1bmN0aW9uIGEoZSkge1xuICByZXR1cm4gZSA/IEZbZV0gOiBGO1xufVxuZnVuY3Rpb24gVyhlLCBvLCB0LCBpKSB7XG4gIHJldHVybiAoZSAvPSBpIC8gMikgPCAxID8gdCAvIDIgKiBlICogZSArIG8gOiAtdCAvIDIgKiAoLS1lICogKGUgLSAyKSAtIDEpICsgbztcbn1cbmZ1bmN0aW9uIFEoZSkge1xuICBjb25zdCBvID0gJ2FbaHJlZl06bm90KFtkaXNhYmxlZF0pLCBidXR0b246bm90KFtkaXNhYmxlZF0pLCB0ZXh0YXJlYTpub3QoW2Rpc2FibGVkXSksIGlucHV0W3R5cGU9XCJ0ZXh0XCJdOm5vdChbZGlzYWJsZWRdKSwgaW5wdXRbdHlwZT1cInJhZGlvXCJdOm5vdChbZGlzYWJsZWRdKSwgaW5wdXRbdHlwZT1cImNoZWNrYm94XCJdOm5vdChbZGlzYWJsZWRdKSwgc2VsZWN0Om5vdChbZGlzYWJsZWRdKSc7XG4gIHJldHVybiBlLmZsYXRNYXAoKHQpID0+IHtcbiAgICBjb25zdCBpID0gdC5tYXRjaGVzKG8pLCBwID0gQXJyYXkuZnJvbSh0LnF1ZXJ5U2VsZWN0b3JBbGwobykpO1xuICAgIHJldHVybiBbLi4uaSA/IFt0XSA6IFtdLCAuLi5wXTtcbiAgfSkuZmlsdGVyKCh0KSA9PiBnZXRDb21wdXRlZFN0eWxlKHQpLnBvaW50ZXJFdmVudHMgIT09IFwibm9uZVwiICYmIGFlKHQpKTtcbn1cbmZ1bmN0aW9uIFooZSkge1xuICBpZiAoIWUgfHwgc2UoZSkpXG4gICAgcmV0dXJuO1xuICBjb25zdCBvID0gYShcInNtb290aFNjcm9sbFwiKTtcbiAgZS5zY3JvbGxJbnRvVmlldyh7XG4gICAgLy8gUmVtb3ZpbmcgdGhlIHNtb290aCBzY3JvbGxpbmcgZm9yIGVsZW1lbnRzIHdoaWNoIGV4aXN0IGluc2lkZSB0aGUgc2Nyb2xsYWJsZSBwYXJlbnRcbiAgICAvLyBUaGlzIHdhcyBjYXVzaW5nIHRoZSBoaWdobGlnaHQgdG8gbm90IHByb3Blcmx5IHJlbmRlclxuICAgIGJlaGF2aW9yOiAhbyB8fCByZShlKSA/IFwiYXV0b1wiIDogXCJzbW9vdGhcIixcbiAgICBpbmxpbmU6IFwiY2VudGVyXCIsXG4gICAgYmxvY2s6IFwiY2VudGVyXCJcbiAgfSk7XG59XG5mdW5jdGlvbiByZShlKSB7XG4gIGlmICghZSB8fCAhZS5wYXJlbnRFbGVtZW50KVxuICAgIHJldHVybjtcbiAgY29uc3QgbyA9IGUucGFyZW50RWxlbWVudDtcbiAgcmV0dXJuIG8uc2Nyb2xsSGVpZ2h0ID4gby5jbGllbnRIZWlnaHQ7XG59XG5mdW5jdGlvbiBzZShlKSB7XG4gIGNvbnN0IG8gPSBlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICByZXR1cm4gby50b3AgPj0gMCAmJiBvLmxlZnQgPj0gMCAmJiBvLmJvdHRvbSA8PSAod2luZG93LmlubmVySGVpZ2h0IHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQpICYmIG8ucmlnaHQgPD0gKHdpbmRvdy5pbm5lcldpZHRoIHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCk7XG59XG5mdW5jdGlvbiBhZShlKSB7XG4gIHJldHVybiAhIShlLm9mZnNldFdpZHRoIHx8IGUub2Zmc2V0SGVpZ2h0IHx8IGUuZ2V0Q2xpZW50UmVjdHMoKS5sZW5ndGgpO1xufVxubGV0IE8gPSB7fTtcbmZ1bmN0aW9uIGIoZSwgbykge1xuICBPW2VdID0gbztcbn1cbmZ1bmN0aW9uIGwoZSkge1xuICByZXR1cm4gZSA/IE9bZV0gOiBPO1xufVxuZnVuY3Rpb24gVigpIHtcbiAgTyA9IHt9O1xufVxubGV0IFIgPSB7fTtcbmZ1bmN0aW9uIE4oZSwgbykge1xuICBSW2VdID0gbztcbn1cbmZ1bmN0aW9uIEwoZSkge1xuICB2YXIgbztcbiAgKG8gPSBSW2VdKSA9PSBudWxsIHx8IG8uY2FsbChSKTtcbn1cbmZ1bmN0aW9uIGNlKCkge1xuICBSID0ge307XG59XG5mdW5jdGlvbiBsZShlLCBvLCB0LCBpKSB7XG4gIGxldCBwID0gbChcIl9fYWN0aXZlU3RhZ2VQb3NpdGlvblwiKTtcbiAgY29uc3QgbiA9IHAgfHwgdC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSwgZiA9IGkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksIHcgPSBXKGUsIG4ueCwgZi54IC0gbi54LCBvKSwgciA9IFcoZSwgbi55LCBmLnkgLSBuLnksIG8pLCB2ID0gVyhlLCBuLndpZHRoLCBmLndpZHRoIC0gbi53aWR0aCwgbyksIHMgPSBXKGUsIG4uaGVpZ2h0LCBmLmhlaWdodCAtIG4uaGVpZ2h0LCBvKTtcbiAgcCA9IHtcbiAgICB4OiB3LFxuICAgIHk6IHIsXG4gICAgd2lkdGg6IHYsXG4gICAgaGVpZ2h0OiBzXG4gIH0sIEoocCksIGIoXCJfX2FjdGl2ZVN0YWdlUG9zaXRpb25cIiwgcCk7XG59XG5mdW5jdGlvbiBHKGUpIHtcbiAgaWYgKCFlKVxuICAgIHJldHVybjtcbiAgY29uc3QgbyA9IGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksIHQgPSB7XG4gICAgeDogby54LFxuICAgIHk6IG8ueSxcbiAgICB3aWR0aDogby53aWR0aCxcbiAgICBoZWlnaHQ6IG8uaGVpZ2h0XG4gIH07XG4gIGIoXCJfX2FjdGl2ZVN0YWdlUG9zaXRpb25cIiwgdCksIEoodCk7XG59XG5mdW5jdGlvbiBkZSgpIHtcbiAgY29uc3QgZSA9IGwoXCJfX2FjdGl2ZVN0YWdlUG9zaXRpb25cIiksIG8gPSBsKFwiX19vdmVybGF5U3ZnXCIpO1xuICBpZiAoIWUpXG4gICAgcmV0dXJuO1xuICBpZiAoIW8pIHtcbiAgICBjb25zb2xlLndhcm4oXCJObyBzdGFnZSBzdmcgZm91bmQuXCIpO1xuICAgIHJldHVybjtcbiAgfVxuICBjb25zdCB0ID0gd2luZG93LmlubmVyV2lkdGgsIGkgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gIG8uc2V0QXR0cmlidXRlKFwidmlld0JveFwiLCBgMCAwICR7dH0gJHtpfWApO1xufVxuZnVuY3Rpb24gcGUoZSkge1xuICBjb25zdCBvID0gdWUoZSk7XG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobyksIHRlKG8sICh0KSA9PiB7XG4gICAgdC50YXJnZXQudGFnTmFtZSA9PT0gXCJwYXRoXCIgJiYgTChcIm92ZXJsYXlDbGlja1wiKTtcbiAgfSksIGIoXCJfX292ZXJsYXlTdmdcIiwgbyk7XG59XG5mdW5jdGlvbiBKKGUpIHtcbiAgY29uc3QgbyA9IGwoXCJfX292ZXJsYXlTdmdcIik7XG4gIGlmICghbykge1xuICAgIHBlKGUpO1xuICAgIHJldHVybjtcbiAgfVxuICBjb25zdCB0ID0gby5maXJzdEVsZW1lbnRDaGlsZDtcbiAgaWYgKCh0ID09IG51bGwgPyB2b2lkIDAgOiB0LnRhZ05hbWUpICE9PSBcInBhdGhcIilcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJubyBwYXRoIGVsZW1lbnQgZm91bmQgaW4gc3RhZ2Ugc3ZnXCIpO1xuICB0LnNldEF0dHJpYnV0ZShcImRcIiwgVShlKSk7XG59XG5mdW5jdGlvbiB1ZShlKSB7XG4gIGNvbnN0IG8gPSB3aW5kb3cuaW5uZXJXaWR0aCwgdCA9IHdpbmRvdy5pbm5lckhlaWdodCwgaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsIFwic3ZnXCIpO1xuICBpLmNsYXNzTGlzdC5hZGQoXCJkcml2ZXItb3ZlcmxheVwiLCBcImRyaXZlci1vdmVybGF5LWFuaW1hdGVkXCIpLCBpLnNldEF0dHJpYnV0ZShcInZpZXdCb3hcIiwgYDAgMCAke299ICR7dH1gKSwgaS5zZXRBdHRyaWJ1dGUoXCJ4bWxTcGFjZVwiLCBcInByZXNlcnZlXCIpLCBpLnNldEF0dHJpYnV0ZShcInhtbG5zWGxpbmtcIiwgXCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCIpLCBpLnNldEF0dHJpYnV0ZShcInZlcnNpb25cIiwgXCIxLjFcIiksIGkuc2V0QXR0cmlidXRlKFwicHJlc2VydmVBc3BlY3RSYXRpb1wiLCBcInhNaW5ZTWluIHNsaWNlXCIpLCBpLnN0eWxlLmZpbGxSdWxlID0gXCJldmVub2RkXCIsIGkuc3R5bGUuY2xpcFJ1bGUgPSBcImV2ZW5vZGRcIiwgaS5zdHlsZS5zdHJva2VMaW5lam9pbiA9IFwicm91bmRcIiwgaS5zdHlsZS5zdHJva2VNaXRlcmxpbWl0ID0gXCIyXCIsIGkuc3R5bGUuekluZGV4ID0gXCIxMDAwMFwiLCBpLnN0eWxlLnBvc2l0aW9uID0gXCJmaXhlZFwiLCBpLnN0eWxlLnRvcCA9IFwiMFwiLCBpLnN0eWxlLmxlZnQgPSBcIjBcIiwgaS5zdHlsZS53aWR0aCA9IFwiMTAwJVwiLCBpLnN0eWxlLmhlaWdodCA9IFwiMTAwJVwiO1xuICBjb25zdCBwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiwgXCJwYXRoXCIpO1xuICByZXR1cm4gcC5zZXRBdHRyaWJ1dGUoXCJkXCIsIFUoZSkpLCBwLnN0eWxlLmZpbGwgPSBhKFwib3ZlcmxheUNvbG9yXCIpIHx8IFwicmdiKDAsMCwwKVwiLCBwLnN0eWxlLm9wYWNpdHkgPSBgJHthKFwib3ZlcmxheU9wYWNpdHlcIil9YCwgcC5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJhdXRvXCIsIHAuc3R5bGUuY3Vyc29yID0gXCJhdXRvXCIsIGkuYXBwZW5kQ2hpbGQocCksIGk7XG59XG5mdW5jdGlvbiBVKGUpIHtcbiAgY29uc3QgbyA9IHdpbmRvdy5pbm5lcldpZHRoLCB0ID0gd2luZG93LmlubmVySGVpZ2h0LCBpID0gYShcInN0YWdlUGFkZGluZ1wiKSB8fCAwLCBwID0gYShcInN0YWdlUmFkaXVzXCIpIHx8IDAsIG4gPSBlLndpZHRoICsgaSAqIDIsIGYgPSBlLmhlaWdodCArIGkgKiAyLCB3ID0gTWF0aC5taW4ocCwgbiAvIDIsIGYgLyAyKSwgciA9IE1hdGguZmxvb3IoTWF0aC5tYXgodywgMCkpLCB2ID0gZS54IC0gaSArIHIsIHMgPSBlLnkgLSBpLCBjID0gbiAtIHIgKiAyLCBkID0gZiAtIHIgKiAyO1xuICByZXR1cm4gYE0ke299LDBMMCwwTDAsJHt0fUwke299LCR7dH1MJHtvfSwwWlxuICAgIE0ke3Z9LCR7c30gaCR7Y30gYSR7cn0sJHtyfSAwIDAgMSAke3J9LCR7cn0gdiR7ZH0gYSR7cn0sJHtyfSAwIDAgMSAtJHtyfSwke3J9IGgtJHtjfSBhJHtyfSwke3J9IDAgMCAxIC0ke3J9LC0ke3J9IHYtJHtkfSBhJHtyfSwke3J9IDAgMCAxICR7cn0sLSR7cn0gemA7XG59XG5mdW5jdGlvbiB2ZSgpIHtcbiAgY29uc3QgZSA9IGwoXCJfX292ZXJsYXlTdmdcIik7XG4gIGUgJiYgZS5yZW1vdmUoKTtcbn1cbmZ1bmN0aW9uIGZlKCkge1xuICBjb25zdCBlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkcml2ZXItZHVtbXktZWxlbWVudFwiKTtcbiAgaWYgKGUpXG4gICAgcmV0dXJuIGU7XG4gIGxldCBvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgcmV0dXJuIG8uaWQgPSBcImRyaXZlci1kdW1teS1lbGVtZW50XCIsIG8uc3R5bGUud2lkdGggPSBcIjBcIiwgby5zdHlsZS5oZWlnaHQgPSBcIjBcIiwgby5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJub25lXCIsIG8uc3R5bGUub3BhY2l0eSA9IFwiMFwiLCBvLnN0eWxlLnBvc2l0aW9uID0gXCJmaXhlZFwiLCBvLnN0eWxlLnRvcCA9IFwiNTAlXCIsIG8uc3R5bGUubGVmdCA9IFwiNTAlXCIsIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobyksIG87XG59XG5mdW5jdGlvbiBLKGUpIHtcbiAgY29uc3QgeyBlbGVtZW50OiBvIH0gPSBlO1xuICBsZXQgdCA9IHR5cGVvZiBvID09IFwic3RyaW5nXCIgPyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKG8pIDogbztcbiAgdCB8fCAodCA9IGZlKCkpLCBnZSh0LCBlKTtcbn1cbmZ1bmN0aW9uIGhlKCkge1xuICBjb25zdCBlID0gbChcIl9fYWN0aXZlRWxlbWVudFwiKSwgbyA9IGwoXCJfX2FjdGl2ZVN0ZXBcIik7XG4gIGUgJiYgKEcoZSksIGRlKCksIGllKGUsIG8pKTtcbn1cbmZ1bmN0aW9uIGdlKGUsIG8pIHtcbiAgY29uc3QgaSA9IERhdGUubm93KCksIHAgPSBsKFwiX19hY3RpdmVTdGVwXCIpLCBuID0gbChcIl9fYWN0aXZlRWxlbWVudFwiKSB8fCBlLCBmID0gIW4gfHwgbiA9PT0gZSwgdyA9IGUuaWQgPT09IFwiZHJpdmVyLWR1bW15LWVsZW1lbnRcIiwgciA9IG4uaWQgPT09IFwiZHJpdmVyLWR1bW15LWVsZW1lbnRcIiwgdiA9IGEoXCJhbmltYXRlXCIpLCBzID0gby5vbkhpZ2hsaWdodFN0YXJ0ZWQgfHwgYShcIm9uSGlnaGxpZ2h0U3RhcnRlZFwiKSwgYyA9IChvID09IG51bGwgPyB2b2lkIDAgOiBvLm9uSGlnaGxpZ2h0ZWQpIHx8IGEoXCJvbkhpZ2hsaWdodGVkXCIpLCBkID0gKHAgPT0gbnVsbCA/IHZvaWQgMCA6IHAub25EZXNlbGVjdGVkKSB8fCBhKFwib25EZXNlbGVjdGVkXCIpLCBtID0gYSgpLCBnID0gbCgpO1xuICAhZiAmJiBkICYmIGQociA/IHZvaWQgMCA6IG4sIHAsIHtcbiAgICBjb25maWc6IG0sXG4gICAgc3RhdGU6IGdcbiAgfSksIHMgJiYgcyh3ID8gdm9pZCAwIDogZSwgbywge1xuICAgIGNvbmZpZzogbSxcbiAgICBzdGF0ZTogZ1xuICB9KTtcbiAgY29uc3QgdSA9ICFmICYmIHY7XG4gIGxldCBoID0gITE7XG4gIHhlKCksIGIoXCJwcmV2aW91c1N0ZXBcIiwgcCksIGIoXCJwcmV2aW91c0VsZW1lbnRcIiwgbiksIGIoXCJhY3RpdmVTdGVwXCIsIG8pLCBiKFwiYWN0aXZlRWxlbWVudFwiLCBlKTtcbiAgY29uc3QgUCA9ICgpID0+IHtcbiAgICBpZiAobChcIl9fdHJhbnNpdGlvbkNhbGxiYWNrXCIpICE9PSBQKVxuICAgICAgcmV0dXJuO1xuICAgIGNvbnN0IHggPSBEYXRlLm5vdygpIC0gaSwgeSA9IDQwMCAtIHggPD0gNDAwIC8gMjtcbiAgICBvLnBvcG92ZXIgJiYgeSAmJiAhaCAmJiB1ICYmIChYKGUsIG8pLCBoID0gITApLCBhKFwiYW5pbWF0ZVwiKSAmJiB4IDwgNDAwID8gbGUoeCwgNDAwLCBuLCBlKSA6IChHKGUpLCBjICYmIGModyA/IHZvaWQgMCA6IGUsIG8sIHtcbiAgICAgIGNvbmZpZzogYSgpLFxuICAgICAgc3RhdGU6IGwoKVxuICAgIH0pLCBiKFwiX190cmFuc2l0aW9uQ2FsbGJhY2tcIiwgdm9pZCAwKSwgYihcIl9fcHJldmlvdXNTdGVwXCIsIHApLCBiKFwiX19wcmV2aW91c0VsZW1lbnRcIiwgbiksIGIoXCJfX2FjdGl2ZVN0ZXBcIiwgbyksIGIoXCJfX2FjdGl2ZUVsZW1lbnRcIiwgZSkpLCB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKFApO1xuICB9O1xuICBiKFwiX190cmFuc2l0aW9uQ2FsbGJhY2tcIiwgUCksIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoUCksIFooZSksICF1ICYmIG8ucG9wb3ZlciAmJiBYKGUsIG8pLCBuLmNsYXNzTGlzdC5yZW1vdmUoXCJkcml2ZXItYWN0aXZlLWVsZW1lbnRcIiwgXCJkcml2ZXItbm8taW50ZXJhY3Rpb25cIiksIG4ucmVtb3ZlQXR0cmlidXRlKFwiYXJpYS1oYXNwb3B1cFwiKSwgbi5yZW1vdmVBdHRyaWJ1dGUoXCJhcmlhLWV4cGFuZGVkXCIpLCBuLnJlbW92ZUF0dHJpYnV0ZShcImFyaWEtY29udHJvbHNcIiksIGEoXCJkaXNhYmxlQWN0aXZlSW50ZXJhY3Rpb25cIikgJiYgZS5jbGFzc0xpc3QuYWRkKFwiZHJpdmVyLW5vLWludGVyYWN0aW9uXCIpLCBlLmNsYXNzTGlzdC5hZGQoXCJkcml2ZXItYWN0aXZlLWVsZW1lbnRcIiksIGUuc2V0QXR0cmlidXRlKFwiYXJpYS1oYXNwb3B1cFwiLCBcImRpYWxvZ1wiKSwgZS5zZXRBdHRyaWJ1dGUoXCJhcmlhLWV4cGFuZGVkXCIsIFwidHJ1ZVwiKSwgZS5zZXRBdHRyaWJ1dGUoXCJhcmlhLWNvbnRyb2xzXCIsIFwiZHJpdmVyLXBvcG92ZXItY29udGVudFwiKTtcbn1cbmZ1bmN0aW9uIHdlKCkge1xuICB2YXIgZTtcbiAgKGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRyaXZlci1kdW1teS1lbGVtZW50XCIpKSA9PSBudWxsIHx8IGUucmVtb3ZlKCksIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZHJpdmVyLWFjdGl2ZS1lbGVtZW50XCIpLmZvckVhY2goKG8pID0+IHtcbiAgICBvLmNsYXNzTGlzdC5yZW1vdmUoXCJkcml2ZXItYWN0aXZlLWVsZW1lbnRcIiwgXCJkcml2ZXItbm8taW50ZXJhY3Rpb25cIiksIG8ucmVtb3ZlQXR0cmlidXRlKFwiYXJpYS1oYXNwb3B1cFwiKSwgby5yZW1vdmVBdHRyaWJ1dGUoXCJhcmlhLWV4cGFuZGVkXCIpLCBvLnJlbW92ZUF0dHJpYnV0ZShcImFyaWEtY29udHJvbHNcIik7XG4gIH0pO1xufVxuZnVuY3Rpb24gSSgpIHtcbiAgY29uc3QgZSA9IGwoXCJfX3Jlc2l6ZVRpbWVvdXRcIik7XG4gIGUgJiYgd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lKGUpLCBiKFwiX19yZXNpemVUaW1lb3V0XCIsIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoaGUpKTtcbn1cbmZ1bmN0aW9uIG1lKGUpIHtcbiAgdmFyIHI7XG4gIGlmICghbChcImlzSW5pdGlhbGl6ZWRcIikgfHwgIShlLmtleSA9PT0gXCJUYWJcIiB8fCBlLmtleUNvZGUgPT09IDkpKVxuICAgIHJldHVybjtcbiAgY29uc3QgaSA9IGwoXCJfX2FjdGl2ZUVsZW1lbnRcIiksIHAgPSAociA9IGwoXCJwb3BvdmVyXCIpKSA9PSBudWxsID8gdm9pZCAwIDogci53cmFwcGVyLCBuID0gUShbXG4gICAgLi4ucCA/IFtwXSA6IFtdLFxuICAgIC4uLmkgPyBbaV0gOiBbXVxuICBdKSwgZiA9IG5bMF0sIHcgPSBuW24ubGVuZ3RoIC0gMV07XG4gIGlmIChlLnByZXZlbnREZWZhdWx0KCksIGUuc2hpZnRLZXkpIHtcbiAgICBjb25zdCB2ID0gbltuLmluZGV4T2YoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCkgLSAxXSB8fCB3O1xuICAgIHYgPT0gbnVsbCB8fCB2LmZvY3VzKCk7XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgdiA9IG5bbi5pbmRleE9mKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpICsgMV0gfHwgZjtcbiAgICB2ID09IG51bGwgfHwgdi5mb2N1cygpO1xuICB9XG59XG5mdW5jdGlvbiBlZShlKSB7XG4gIHZhciB0O1xuICAoKHQgPSBhKFwiYWxsb3dLZXlib2FyZENvbnRyb2xcIikpID09IG51bGwgfHwgdCkgJiYgKGUua2V5ID09PSBcIkVzY2FwZVwiID8gTChcImVzY2FwZVByZXNzXCIpIDogZS5rZXkgPT09IFwiQXJyb3dSaWdodFwiID8gTChcImFycm93UmlnaHRQcmVzc1wiKSA6IGUua2V5ID09PSBcIkFycm93TGVmdFwiICYmIEwoXCJhcnJvd0xlZnRQcmVzc1wiKSk7XG59XG5mdW5jdGlvbiB0ZShlLCBvLCB0KSB7XG4gIGNvbnN0IGkgPSAobiwgZikgPT4ge1xuICAgIGNvbnN0IHcgPSBuLnRhcmdldDtcbiAgICBlLmNvbnRhaW5zKHcpICYmICgoIXQgfHwgdCh3KSkgJiYgKG4ucHJldmVudERlZmF1bHQoKSwgbi5zdG9wUHJvcGFnYXRpb24oKSwgbi5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKSksIGYgPT0gbnVsbCB8fCBmKG4pKTtcbiAgfTtcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInBvaW50ZXJkb3duXCIsIGksICEwKSwgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBpLCAhMCksIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJwb2ludGVydXBcIiwgaSwgITApLCBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCBpLCAhMCksIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgXCJjbGlja1wiLFxuICAgIChuKSA9PiB7XG4gICAgICBpKG4sIG8pO1xuICAgIH0sXG4gICAgITBcbiAgKTtcbn1cbmZ1bmN0aW9uIHllKCkge1xuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIGVlLCAhMSksIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBtZSwgITEpLCB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCBJKSwgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgSSk7XG59XG5mdW5jdGlvbiBiZSgpIHtcbiAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCBlZSksIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIEkpLCB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCBJKTtcbn1cbmZ1bmN0aW9uIHhlKCkge1xuICBjb25zdCBlID0gbChcInBvcG92ZXJcIik7XG4gIGUgJiYgKGUud3JhcHBlci5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCIpO1xufVxuZnVuY3Rpb24gWChlLCBvKSB7XG4gIHZhciBDLCB5O1xuICBsZXQgdCA9IGwoXCJwb3BvdmVyXCIpO1xuICB0ICYmIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQodC53cmFwcGVyKSwgdCA9IFBlKCksIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodC53cmFwcGVyKTtcbiAgY29uc3Qge1xuICAgIHRpdGxlOiBpLFxuICAgIGRlc2NyaXB0aW9uOiBwLFxuICAgIHNob3dCdXR0b25zOiBuLFxuICAgIGRpc2FibGVCdXR0b25zOiBmLFxuICAgIHNob3dQcm9ncmVzczogdyxcbiAgICBuZXh0QnRuVGV4dDogciA9IGEoXCJuZXh0QnRuVGV4dFwiKSB8fCBcIk5leHQgJnJhcnI7XCIsXG4gICAgcHJldkJ0blRleHQ6IHYgPSBhKFwicHJldkJ0blRleHRcIikgfHwgXCImbGFycjsgUHJldmlvdXNcIixcbiAgICBwcm9ncmVzc1RleHQ6IHMgPSBhKFwicHJvZ3Jlc3NUZXh0XCIpIHx8IFwie2N1cnJlbnR9IG9mIHt0b3RhbH1cIlxuICB9ID0gby5wb3BvdmVyIHx8IHt9O1xuICB0Lm5leHRCdXR0b24uaW5uZXJIVE1MID0gciwgdC5wcmV2aW91c0J1dHRvbi5pbm5lckhUTUwgPSB2LCB0LnByb2dyZXNzLmlubmVySFRNTCA9IHMsIGkgPyAodC50aXRsZS5pbm5lckhUTUwgPSBpLCB0LnRpdGxlLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCIpIDogdC50aXRsZS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCIsIHAgPyAodC5kZXNjcmlwdGlvbi5pbm5lckhUTUwgPSBwLCB0LmRlc2NyaXB0aW9uLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCIpIDogdC5kZXNjcmlwdGlvbi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gIGNvbnN0IGMgPSBuIHx8IGEoXCJzaG93QnV0dG9uc1wiKSwgZCA9IHcgfHwgYShcInNob3dQcm9ncmVzc1wiKSB8fCAhMSwgbSA9IChjID09IG51bGwgPyB2b2lkIDAgOiBjLmluY2x1ZGVzKFwibmV4dFwiKSkgfHwgKGMgPT0gbnVsbCA/IHZvaWQgMCA6IGMuaW5jbHVkZXMoXCJwcmV2aW91c1wiKSkgfHwgZDtcbiAgdC5jbG9zZUJ1dHRvbi5zdHlsZS5kaXNwbGF5ID0gYy5pbmNsdWRlcyhcImNsb3NlXCIpID8gXCJibG9ja1wiIDogXCJub25lXCIsIG0gPyAodC5mb290ZXIuc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiLCB0LnByb2dyZXNzLnN0eWxlLmRpc3BsYXkgPSBkID8gXCJibG9ja1wiIDogXCJub25lXCIsIHQubmV4dEJ1dHRvbi5zdHlsZS5kaXNwbGF5ID0gYy5pbmNsdWRlcyhcIm5leHRcIikgPyBcImJsb2NrXCIgOiBcIm5vbmVcIiwgdC5wcmV2aW91c0J1dHRvbi5zdHlsZS5kaXNwbGF5ID0gYy5pbmNsdWRlcyhcInByZXZpb3VzXCIpID8gXCJibG9ja1wiIDogXCJub25lXCIpIDogdC5mb290ZXIuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICBjb25zdCBnID0gZiB8fCBhKFwiZGlzYWJsZUJ1dHRvbnNcIikgfHwgW107XG4gIGcgIT0gbnVsbCAmJiBnLmluY2x1ZGVzKFwibmV4dFwiKSAmJiAodC5uZXh0QnV0dG9uLmRpc2FibGVkID0gITAsIHQubmV4dEJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiZHJpdmVyLXBvcG92ZXItYnRuLWRpc2FibGVkXCIpKSwgZyAhPSBudWxsICYmIGcuaW5jbHVkZXMoXCJwcmV2aW91c1wiKSAmJiAodC5wcmV2aW91c0J1dHRvbi5kaXNhYmxlZCA9ICEwLCB0LnByZXZpb3VzQnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJkcml2ZXItcG9wb3Zlci1idG4tZGlzYWJsZWRcIikpLCBnICE9IG51bGwgJiYgZy5pbmNsdWRlcyhcImNsb3NlXCIpICYmICh0LmNsb3NlQnV0dG9uLmRpc2FibGVkID0gITAsIHQuY2xvc2VCdXR0b24uY2xhc3NMaXN0LmFkZChcImRyaXZlci1wb3BvdmVyLWJ0bi1kaXNhYmxlZFwiKSk7XG4gIGNvbnN0IHUgPSB0LndyYXBwZXI7XG4gIHUuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIiwgdS5zdHlsZS5sZWZ0ID0gXCJcIiwgdS5zdHlsZS50b3AgPSBcIlwiLCB1LnN0eWxlLmJvdHRvbSA9IFwiXCIsIHUuc3R5bGUucmlnaHQgPSBcIlwiLCB1LmlkID0gXCJkcml2ZXItcG9wb3Zlci1jb250ZW50XCIsIHUuc2V0QXR0cmlidXRlKFwicm9sZVwiLCBcImRpYWxvZ1wiKSwgdS5zZXRBdHRyaWJ1dGUoXCJhcmlhLWxhYmVsbGVkYnlcIiwgXCJkcml2ZXItcG9wb3Zlci10aXRsZVwiKSwgdS5zZXRBdHRyaWJ1dGUoXCJhcmlhLWRlc2NyaWJlZGJ5XCIsIFwiZHJpdmVyLXBvcG92ZXItZGVzY3JpcHRpb25cIik7XG4gIGNvbnN0IGggPSB0LmFycm93O1xuICBoLmNsYXNzTmFtZSA9IFwiZHJpdmVyLXBvcG92ZXItYXJyb3dcIjtcbiAgY29uc3QgUCA9ICgoQyA9IG8ucG9wb3ZlcikgPT0gbnVsbCA/IHZvaWQgMCA6IEMucG9wb3ZlckNsYXNzKSB8fCBhKFwicG9wb3ZlckNsYXNzXCIpIHx8IFwiXCI7XG4gIHUuY2xhc3NOYW1lID0gYGRyaXZlci1wb3BvdmVyICR7UH1gLnRyaW0oKSwgdGUoXG4gICAgdC53cmFwcGVyLFxuICAgIChrKSA9PiB7XG4gICAgICB2YXIgJCwgQiwgTTtcbiAgICAgIGNvbnN0IFQgPSBrLnRhcmdldCwgRSA9ICgoJCA9IG8ucG9wb3ZlcikgPT0gbnVsbCA/IHZvaWQgMCA6ICQub25OZXh0Q2xpY2spIHx8IGEoXCJvbk5leHRDbGlja1wiKSwgQSA9ICgoQiA9IG8ucG9wb3ZlcikgPT0gbnVsbCA/IHZvaWQgMCA6IEIub25QcmV2Q2xpY2spIHx8IGEoXCJvblByZXZDbGlja1wiKSwgSCA9ICgoTSA9IG8ucG9wb3ZlcikgPT0gbnVsbCA/IHZvaWQgMCA6IE0ub25DbG9zZUNsaWNrKSB8fCBhKFwib25DbG9zZUNsaWNrXCIpO1xuICAgICAgaWYgKFQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZHJpdmVyLXBvcG92ZXItbmV4dC1idG5cIikpXG4gICAgICAgIHJldHVybiBFID8gRShlLCBvLCB7XG4gICAgICAgICAgY29uZmlnOiBhKCksXG4gICAgICAgICAgc3RhdGU6IGwoKVxuICAgICAgICB9KSA6IEwoXCJuZXh0Q2xpY2tcIik7XG4gICAgICBpZiAoVC5jbGFzc0xpc3QuY29udGFpbnMoXCJkcml2ZXItcG9wb3Zlci1wcmV2LWJ0blwiKSlcbiAgICAgICAgcmV0dXJuIEEgPyBBKGUsIG8sIHtcbiAgICAgICAgICBjb25maWc6IGEoKSxcbiAgICAgICAgICBzdGF0ZTogbCgpXG4gICAgICAgIH0pIDogTChcInByZXZDbGlja1wiKTtcbiAgICAgIGlmIChULmNsYXNzTGlzdC5jb250YWlucyhcImRyaXZlci1wb3BvdmVyLWNsb3NlLWJ0blwiKSlcbiAgICAgICAgcmV0dXJuIEggPyBIKGUsIG8sIHtcbiAgICAgICAgICBjb25maWc6IGEoKSxcbiAgICAgICAgICBzdGF0ZTogbCgpXG4gICAgICAgIH0pIDogTChcImNsb3NlQ2xpY2tcIik7XG4gICAgfSxcbiAgICAoaykgPT4gISh0ICE9IG51bGwgJiYgdC5kZXNjcmlwdGlvbi5jb250YWlucyhrKSkgJiYgISh0ICE9IG51bGwgJiYgdC50aXRsZS5jb250YWlucyhrKSkgJiYgdHlwZW9mIGsuY2xhc3NOYW1lID09IFwic3RyaW5nXCIgJiYgay5jbGFzc05hbWUuaW5jbHVkZXMoXCJkcml2ZXItcG9wb3ZlclwiKVxuICApLCBiKFwicG9wb3ZlclwiLCB0KTtcbiAgY29uc3QgUyA9ICgoeSA9IG8ucG9wb3ZlcikgPT0gbnVsbCA/IHZvaWQgMCA6IHkub25Qb3BvdmVyUmVuZGVyKSB8fCBhKFwib25Qb3BvdmVyUmVuZGVyXCIpO1xuICBTICYmIFModCwge1xuICAgIGNvbmZpZzogYSgpLFxuICAgIHN0YXRlOiBsKClcbiAgfSksIGllKGUsIG8pLCBaKHUpO1xuICBjb25zdCBfID0gZS5jbGFzc0xpc3QuY29udGFpbnMoXCJkcml2ZXItZHVtbXktZWxlbWVudFwiKSwgeCA9IFEoW3UsIC4uLl8gPyBbXSA6IFtlXV0pO1xuICB4Lmxlbmd0aCA+IDAgJiYgeFswXS5mb2N1cygpO1xufVxuZnVuY3Rpb24gb2UoKSB7XG4gIGNvbnN0IGUgPSBsKFwicG9wb3ZlclwiKTtcbiAgaWYgKCEoZSAhPSBudWxsICYmIGUud3JhcHBlcikpXG4gICAgcmV0dXJuO1xuICBjb25zdCBvID0gZS53cmFwcGVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLCB0ID0gYShcInN0YWdlUGFkZGluZ1wiKSB8fCAwLCBpID0gYShcInBvcG92ZXJPZmZzZXRcIikgfHwgMDtcbiAgcmV0dXJuIHtcbiAgICB3aWR0aDogby53aWR0aCArIHQgKyBpLFxuICAgIGhlaWdodDogby5oZWlnaHQgKyB0ICsgaSxcbiAgICByZWFsV2lkdGg6IG8ud2lkdGgsXG4gICAgcmVhbEhlaWdodDogby5oZWlnaHRcbiAgfTtcbn1cbmZ1bmN0aW9uIFkoZSwgbykge1xuICBjb25zdCB7IGVsZW1lbnREaW1lbnNpb25zOiB0LCBwb3BvdmVyRGltZW5zaW9uczogaSwgcG9wb3ZlclBhZGRpbmc6IHAsIHBvcG92ZXJBcnJvd0RpbWVuc2lvbnM6IG4gfSA9IG87XG4gIHJldHVybiBlID09PSBcInN0YXJ0XCIgPyBNYXRoLm1heChcbiAgICBNYXRoLm1pbihcbiAgICAgIHQudG9wIC0gcCxcbiAgICAgIHdpbmRvdy5pbm5lckhlaWdodCAtIGkucmVhbEhlaWdodCAtIG4ud2lkdGhcbiAgICApLFxuICAgIG4ud2lkdGhcbiAgKSA6IGUgPT09IFwiZW5kXCIgPyBNYXRoLm1heChcbiAgICBNYXRoLm1pbihcbiAgICAgIHQudG9wIC0gKGkgPT0gbnVsbCA/IHZvaWQgMCA6IGkucmVhbEhlaWdodCkgKyB0LmhlaWdodCArIHAsXG4gICAgICB3aW5kb3cuaW5uZXJIZWlnaHQgLSAoaSA9PSBudWxsID8gdm9pZCAwIDogaS5yZWFsSGVpZ2h0KSAtIG4ud2lkdGhcbiAgICApLFxuICAgIG4ud2lkdGhcbiAgKSA6IGUgPT09IFwiY2VudGVyXCIgPyBNYXRoLm1heChcbiAgICBNYXRoLm1pbihcbiAgICAgIHQudG9wICsgdC5oZWlnaHQgLyAyIC0gKGkgPT0gbnVsbCA/IHZvaWQgMCA6IGkucmVhbEhlaWdodCkgLyAyLFxuICAgICAgd2luZG93LmlubmVySGVpZ2h0IC0gKGkgPT0gbnVsbCA/IHZvaWQgMCA6IGkucmVhbEhlaWdodCkgLSBuLndpZHRoXG4gICAgKSxcbiAgICBuLndpZHRoXG4gICkgOiAwO1xufVxuZnVuY3Rpb24gaihlLCBvKSB7XG4gIGNvbnN0IHsgZWxlbWVudERpbWVuc2lvbnM6IHQsIHBvcG92ZXJEaW1lbnNpb25zOiBpLCBwb3BvdmVyUGFkZGluZzogcCwgcG9wb3ZlckFycm93RGltZW5zaW9uczogbiB9ID0gbztcbiAgcmV0dXJuIGUgPT09IFwic3RhcnRcIiA/IE1hdGgubWF4KFxuICAgIE1hdGgubWluKFxuICAgICAgdC5sZWZ0IC0gcCxcbiAgICAgIHdpbmRvdy5pbm5lcldpZHRoIC0gaS5yZWFsV2lkdGggLSBuLndpZHRoXG4gICAgKSxcbiAgICBuLndpZHRoXG4gICkgOiBlID09PSBcImVuZFwiID8gTWF0aC5tYXgoXG4gICAgTWF0aC5taW4oXG4gICAgICB0LmxlZnQgLSAoaSA9PSBudWxsID8gdm9pZCAwIDogaS5yZWFsV2lkdGgpICsgdC53aWR0aCArIHAsXG4gICAgICB3aW5kb3cuaW5uZXJXaWR0aCAtIChpID09IG51bGwgPyB2b2lkIDAgOiBpLnJlYWxXaWR0aCkgLSBuLndpZHRoXG4gICAgKSxcbiAgICBuLndpZHRoXG4gICkgOiBlID09PSBcImNlbnRlclwiID8gTWF0aC5tYXgoXG4gICAgTWF0aC5taW4oXG4gICAgICB0LmxlZnQgKyB0LndpZHRoIC8gMiAtIChpID09IG51bGwgPyB2b2lkIDAgOiBpLnJlYWxXaWR0aCkgLyAyLFxuICAgICAgd2luZG93LmlubmVyV2lkdGggLSAoaSA9PSBudWxsID8gdm9pZCAwIDogaS5yZWFsV2lkdGgpIC0gbi53aWR0aFxuICAgICksXG4gICAgbi53aWR0aFxuICApIDogMDtcbn1cbmZ1bmN0aW9uIGllKGUsIG8pIHtcbiAgY29uc3QgdCA9IGwoXCJwb3BvdmVyXCIpO1xuICBpZiAoIXQpXG4gICAgcmV0dXJuO1xuICBjb25zdCB7IGFsaWduOiBpID0gXCJzdGFydFwiLCBzaWRlOiBwID0gXCJsZWZ0XCIgfSA9IChvID09IG51bGwgPyB2b2lkIDAgOiBvLnBvcG92ZXIpIHx8IHt9LCBuID0gaSwgZiA9IGUuaWQgPT09IFwiZHJpdmVyLWR1bW15LWVsZW1lbnRcIiA/IFwib3ZlclwiIDogcCwgdyA9IGEoXCJzdGFnZVBhZGRpbmdcIikgfHwgMCwgciA9IG9lKCksIHYgPSB0LmFycm93LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLCBzID0gZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSwgYyA9IHMudG9wIC0gci5oZWlnaHQ7XG4gIGxldCBkID0gYyA+PSAwO1xuICBjb25zdCBtID0gd2luZG93LmlubmVySGVpZ2h0IC0gKHMuYm90dG9tICsgci5oZWlnaHQpO1xuICBsZXQgZyA9IG0gPj0gMDtcbiAgY29uc3QgdSA9IHMubGVmdCAtIHIud2lkdGg7XG4gIGxldCBoID0gdSA+PSAwO1xuICBjb25zdCBQID0gd2luZG93LmlubmVyV2lkdGggLSAocy5yaWdodCArIHIud2lkdGgpO1xuICBsZXQgUyA9IFAgPj0gMDtcbiAgY29uc3QgXyA9ICFkICYmICFnICYmICFoICYmICFTO1xuICBsZXQgeCA9IGY7XG4gIGlmIChmID09PSBcInRvcFwiICYmIGQgPyBTID0gaCA9IGcgPSAhMSA6IGYgPT09IFwiYm90dG9tXCIgJiYgZyA/IFMgPSBoID0gZCA9ICExIDogZiA9PT0gXCJsZWZ0XCIgJiYgaCA/IFMgPSBkID0gZyA9ICExIDogZiA9PT0gXCJyaWdodFwiICYmIFMgJiYgKGggPSBkID0gZyA9ICExKSwgZiA9PT0gXCJvdmVyXCIpIHtcbiAgICBjb25zdCBDID0gd2luZG93LmlubmVyV2lkdGggLyAyIC0gci5yZWFsV2lkdGggLyAyLCB5ID0gd2luZG93LmlubmVySGVpZ2h0IC8gMiAtIHIucmVhbEhlaWdodCAvIDI7XG4gICAgdC53cmFwcGVyLnN0eWxlLmxlZnQgPSBgJHtDfXB4YCwgdC53cmFwcGVyLnN0eWxlLnJpZ2h0ID0gXCJhdXRvXCIsIHQud3JhcHBlci5zdHlsZS50b3AgPSBgJHt5fXB4YCwgdC53cmFwcGVyLnN0eWxlLmJvdHRvbSA9IFwiYXV0b1wiO1xuICB9IGVsc2UgaWYgKF8pIHtcbiAgICBjb25zdCBDID0gd2luZG93LmlubmVyV2lkdGggLyAyIC0gKHIgPT0gbnVsbCA/IHZvaWQgMCA6IHIucmVhbFdpZHRoKSAvIDIsIHkgPSAxMDtcbiAgICB0LndyYXBwZXIuc3R5bGUubGVmdCA9IGAke0N9cHhgLCB0LndyYXBwZXIuc3R5bGUucmlnaHQgPSBcImF1dG9cIiwgdC53cmFwcGVyLnN0eWxlLmJvdHRvbSA9IGAke3l9cHhgLCB0LndyYXBwZXIuc3R5bGUudG9wID0gXCJhdXRvXCI7XG4gIH0gZWxzZSBpZiAoaCkge1xuICAgIGNvbnN0IEMgPSBNYXRoLm1pbihcbiAgICAgIHUsXG4gICAgICB3aW5kb3cuaW5uZXJXaWR0aCAtIChyID09IG51bGwgPyB2b2lkIDAgOiByLnJlYWxXaWR0aCkgLSB2LndpZHRoXG4gICAgKSwgeSA9IFkobiwge1xuICAgICAgZWxlbWVudERpbWVuc2lvbnM6IHMsXG4gICAgICBwb3BvdmVyRGltZW5zaW9uczogcixcbiAgICAgIHBvcG92ZXJQYWRkaW5nOiB3LFxuICAgICAgcG9wb3ZlckFycm93RGltZW5zaW9uczogdlxuICAgIH0pO1xuICAgIHQud3JhcHBlci5zdHlsZS5sZWZ0ID0gYCR7Q31weGAsIHQud3JhcHBlci5zdHlsZS50b3AgPSBgJHt5fXB4YCwgdC53cmFwcGVyLnN0eWxlLmJvdHRvbSA9IFwiYXV0b1wiLCB0LndyYXBwZXIuc3R5bGUucmlnaHQgPSBcImF1dG9cIiwgeCA9IFwibGVmdFwiO1xuICB9IGVsc2UgaWYgKFMpIHtcbiAgICBjb25zdCBDID0gTWF0aC5taW4oXG4gICAgICBQLFxuICAgICAgd2luZG93LmlubmVyV2lkdGggLSAociA9PSBudWxsID8gdm9pZCAwIDogci5yZWFsV2lkdGgpIC0gdi53aWR0aFxuICAgICksIHkgPSBZKG4sIHtcbiAgICAgIGVsZW1lbnREaW1lbnNpb25zOiBzLFxuICAgICAgcG9wb3ZlckRpbWVuc2lvbnM6IHIsXG4gICAgICBwb3BvdmVyUGFkZGluZzogdyxcbiAgICAgIHBvcG92ZXJBcnJvd0RpbWVuc2lvbnM6IHZcbiAgICB9KTtcbiAgICB0LndyYXBwZXIuc3R5bGUucmlnaHQgPSBgJHtDfXB4YCwgdC53cmFwcGVyLnN0eWxlLnRvcCA9IGAke3l9cHhgLCB0LndyYXBwZXIuc3R5bGUuYm90dG9tID0gXCJhdXRvXCIsIHQud3JhcHBlci5zdHlsZS5sZWZ0ID0gXCJhdXRvXCIsIHggPSBcInJpZ2h0XCI7XG4gIH0gZWxzZSBpZiAoZCkge1xuICAgIGNvbnN0IEMgPSBNYXRoLm1pbihcbiAgICAgIGMsXG4gICAgICB3aW5kb3cuaW5uZXJIZWlnaHQgLSByLnJlYWxIZWlnaHQgLSB2LndpZHRoXG4gICAgKTtcbiAgICBsZXQgeSA9IGoobiwge1xuICAgICAgZWxlbWVudERpbWVuc2lvbnM6IHMsXG4gICAgICBwb3BvdmVyRGltZW5zaW9uczogcixcbiAgICAgIHBvcG92ZXJQYWRkaW5nOiB3LFxuICAgICAgcG9wb3ZlckFycm93RGltZW5zaW9uczogdlxuICAgIH0pO1xuICAgIHQud3JhcHBlci5zdHlsZS50b3AgPSBgJHtDfXB4YCwgdC53cmFwcGVyLnN0eWxlLmxlZnQgPSBgJHt5fXB4YCwgdC53cmFwcGVyLnN0eWxlLmJvdHRvbSA9IFwiYXV0b1wiLCB0LndyYXBwZXIuc3R5bGUucmlnaHQgPSBcImF1dG9cIiwgeCA9IFwidG9wXCI7XG4gIH0gZWxzZSBpZiAoZykge1xuICAgIGNvbnN0IEMgPSBNYXRoLm1pbihcbiAgICAgIG0sXG4gICAgICB3aW5kb3cuaW5uZXJIZWlnaHQgLSAociA9PSBudWxsID8gdm9pZCAwIDogci5yZWFsSGVpZ2h0KSAtIHYud2lkdGhcbiAgICApO1xuICAgIGxldCB5ID0gaihuLCB7XG4gICAgICBlbGVtZW50RGltZW5zaW9uczogcyxcbiAgICAgIHBvcG92ZXJEaW1lbnNpb25zOiByLFxuICAgICAgcG9wb3ZlclBhZGRpbmc6IHcsXG4gICAgICBwb3BvdmVyQXJyb3dEaW1lbnNpb25zOiB2XG4gICAgfSk7XG4gICAgdC53cmFwcGVyLnN0eWxlLmxlZnQgPSBgJHt5fXB4YCwgdC53cmFwcGVyLnN0eWxlLmJvdHRvbSA9IGAke0N9cHhgLCB0LndyYXBwZXIuc3R5bGUudG9wID0gXCJhdXRvXCIsIHQud3JhcHBlci5zdHlsZS5yaWdodCA9IFwiYXV0b1wiLCB4ID0gXCJib3R0b21cIjtcbiAgfVxuICBfID8gdC5hcnJvdy5jbGFzc0xpc3QuYWRkKFwiZHJpdmVyLXBvcG92ZXItYXJyb3ctbm9uZVwiKSA6IENlKG4sIHgsIGUpO1xufVxuZnVuY3Rpb24gQ2UoZSwgbywgdCkge1xuICBjb25zdCBpID0gbChcInBvcG92ZXJcIik7XG4gIGlmICghaSlcbiAgICByZXR1cm47XG4gIGNvbnN0IHAgPSB0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLCBuID0gb2UoKSwgZiA9IGkuYXJyb3csIHcgPSBuLndpZHRoLCByID0gd2luZG93LmlubmVyV2lkdGgsIHYgPSBwLndpZHRoLCBzID0gcC5sZWZ0LCBjID0gbi5oZWlnaHQsIGQgPSB3aW5kb3cuaW5uZXJIZWlnaHQsIG0gPSBwLnRvcCwgZyA9IHAuaGVpZ2h0O1xuICBmLmNsYXNzTmFtZSA9IFwiZHJpdmVyLXBvcG92ZXItYXJyb3dcIjtcbiAgbGV0IHUgPSBvLCBoID0gZTtcbiAgbyA9PT0gXCJ0b3BcIiA/IChzICsgdiA8PSAwID8gKHUgPSBcInJpZ2h0XCIsIGggPSBcImVuZFwiKSA6IHMgKyB2IC0gdyA8PSAwICYmICh1ID0gXCJ0b3BcIiwgaCA9IFwic3RhcnRcIiksIHMgPj0gciA/ICh1ID0gXCJsZWZ0XCIsIGggPSBcImVuZFwiKSA6IHMgKyB3ID49IHIgJiYgKHUgPSBcInRvcFwiLCBoID0gXCJlbmRcIikpIDogbyA9PT0gXCJib3R0b21cIiA/IChzICsgdiA8PSAwID8gKHUgPSBcInJpZ2h0XCIsIGggPSBcInN0YXJ0XCIpIDogcyArIHYgLSB3IDw9IDAgJiYgKHUgPSBcImJvdHRvbVwiLCBoID0gXCJzdGFydFwiKSwgcyA+PSByID8gKHUgPSBcImxlZnRcIiwgaCA9IFwic3RhcnRcIikgOiBzICsgdyA+PSByICYmICh1ID0gXCJib3R0b21cIiwgaCA9IFwiZW5kXCIpKSA6IG8gPT09IFwibGVmdFwiID8gKG0gKyBnIDw9IDAgPyAodSA9IFwiYm90dG9tXCIsIGggPSBcImVuZFwiKSA6IG0gKyBnIC0gYyA8PSAwICYmICh1ID0gXCJsZWZ0XCIsIGggPSBcInN0YXJ0XCIpLCBtID49IGQgPyAodSA9IFwidG9wXCIsIGggPSBcImVuZFwiKSA6IG0gKyBjID49IGQgJiYgKHUgPSBcImxlZnRcIiwgaCA9IFwiZW5kXCIpKSA6IG8gPT09IFwicmlnaHRcIiAmJiAobSArIGcgPD0gMCA/ICh1ID0gXCJib3R0b21cIiwgaCA9IFwic3RhcnRcIikgOiBtICsgZyAtIGMgPD0gMCAmJiAodSA9IFwicmlnaHRcIiwgaCA9IFwic3RhcnRcIiksIG0gPj0gZCA/ICh1ID0gXCJ0b3BcIiwgaCA9IFwic3RhcnRcIikgOiBtICsgYyA+PSBkICYmICh1ID0gXCJyaWdodFwiLCBoID0gXCJlbmRcIikpLCB1ID8gKGYuY2xhc3NMaXN0LmFkZChgZHJpdmVyLXBvcG92ZXItYXJyb3ctc2lkZS0ke3V9YCksIGYuY2xhc3NMaXN0LmFkZChgZHJpdmVyLXBvcG92ZXItYXJyb3ctYWxpZ24tJHtofWApKSA6IGYuY2xhc3NMaXN0LmFkZChcImRyaXZlci1wb3BvdmVyLWFycm93LW5vbmVcIik7XG59XG5mdW5jdGlvbiBQZSgpIHtcbiAgY29uc3QgZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGUuY2xhc3NMaXN0LmFkZChcImRyaXZlci1wb3BvdmVyXCIpO1xuICBjb25zdCBvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgby5jbGFzc0xpc3QuYWRkKFwiZHJpdmVyLXBvcG92ZXItYXJyb3dcIik7XG4gIGNvbnN0IHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaGVhZGVyXCIpO1xuICB0LmlkID0gXCJkcml2ZXItcG9wb3Zlci10aXRsZVwiLCB0LmNsYXNzTGlzdC5hZGQoXCJkcml2ZXItcG9wb3Zlci10aXRsZVwiKSwgdC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCIsIHQuaW5uZXJUZXh0ID0gXCJQb3BvdmVyIFRpdGxlXCI7XG4gIGNvbnN0IGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBpLmlkID0gXCJkcml2ZXItcG9wb3Zlci1kZXNjcmlwdGlvblwiLCBpLmNsYXNzTGlzdC5hZGQoXCJkcml2ZXItcG9wb3Zlci1kZXNjcmlwdGlvblwiKSwgaS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCIsIGkuaW5uZXJUZXh0ID0gXCJQb3BvdmVyIGRlc2NyaXB0aW9uIGlzIGhlcmVcIjtcbiAgY29uc3QgcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gIHAudHlwZSA9IFwiYnV0dG9uXCIsIHAuY2xhc3NMaXN0LmFkZChcImRyaXZlci1wb3BvdmVyLWNsb3NlLWJ0blwiKSwgcC5zZXRBdHRyaWJ1dGUoXCJhcmlhLWxhYmVsXCIsIFwiQ2xvc2VcIiksIHAuaW5uZXJIVE1MID0gXCImdGltZXM7XCI7XG4gIGNvbnN0IG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZm9vdGVyXCIpO1xuICBuLmNsYXNzTGlzdC5hZGQoXCJkcml2ZXItcG9wb3Zlci1mb290ZXJcIik7XG4gIGNvbnN0IGYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgZi5jbGFzc0xpc3QuYWRkKFwiZHJpdmVyLXBvcG92ZXItcHJvZ3Jlc3MtdGV4dFwiKSwgZi5pbm5lclRleHQgPSBcIlwiO1xuICBjb25zdCB3ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gIHcuY2xhc3NMaXN0LmFkZChcImRyaXZlci1wb3BvdmVyLW5hdmlnYXRpb24tYnRuc1wiKTtcbiAgY29uc3QgciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gIHIudHlwZSA9IFwiYnV0dG9uXCIsIHIuY2xhc3NMaXN0LmFkZChcImRyaXZlci1wb3BvdmVyLXByZXYtYnRuXCIpLCByLmlubmVySFRNTCA9IFwiJmxhcnI7IFByZXZpb3VzXCI7XG4gIGNvbnN0IHYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICByZXR1cm4gdi50eXBlID0gXCJidXR0b25cIiwgdi5jbGFzc0xpc3QuYWRkKFwiZHJpdmVyLXBvcG92ZXItbmV4dC1idG5cIiksIHYuaW5uZXJIVE1MID0gXCJOZXh0ICZyYXJyO1wiLCB3LmFwcGVuZENoaWxkKHIpLCB3LmFwcGVuZENoaWxkKHYpLCBuLmFwcGVuZENoaWxkKGYpLCBuLmFwcGVuZENoaWxkKHcpLCBlLmFwcGVuZENoaWxkKHApLCBlLmFwcGVuZENoaWxkKG8pLCBlLmFwcGVuZENoaWxkKHQpLCBlLmFwcGVuZENoaWxkKGkpLCBlLmFwcGVuZENoaWxkKG4pLCB7XG4gICAgd3JhcHBlcjogZSxcbiAgICBhcnJvdzogbyxcbiAgICB0aXRsZTogdCxcbiAgICBkZXNjcmlwdGlvbjogaSxcbiAgICBmb290ZXI6IG4sXG4gICAgcHJldmlvdXNCdXR0b246IHIsXG4gICAgbmV4dEJ1dHRvbjogdixcbiAgICBjbG9zZUJ1dHRvbjogcCxcbiAgICBmb290ZXJCdXR0b25zOiB3LFxuICAgIHByb2dyZXNzOiBmXG4gIH07XG59XG5mdW5jdGlvbiBTZSgpIHtcbiAgdmFyIG87XG4gIGNvbnN0IGUgPSBsKFwicG9wb3ZlclwiKTtcbiAgZSAmJiAoKG8gPSBlLndyYXBwZXIucGFyZW50RWxlbWVudCkgPT0gbnVsbCB8fCBvLnJlbW92ZUNoaWxkKGUud3JhcHBlcikpO1xufVxuZnVuY3Rpb24ga2UoZSA9IHt9KSB7XG4gIEQoZSk7XG4gIGZ1bmN0aW9uIG8oKSB7XG4gICAgYShcImFsbG93Q2xvc2VcIikgJiYgdigpO1xuICB9XG4gIGZ1bmN0aW9uIHQoKSB7XG4gICAgY29uc3QgcyA9IGwoXCJhY3RpdmVJbmRleFwiKSwgYyA9IGEoXCJzdGVwc1wiKSB8fCBbXTtcbiAgICBpZiAodHlwZW9mIHMgPT0gXCJ1bmRlZmluZWRcIilcbiAgICAgIHJldHVybjtcbiAgICBjb25zdCBkID0gcyArIDE7XG4gICAgY1tkXSA/IHIoZCkgOiB2KCk7XG4gIH1cbiAgZnVuY3Rpb24gaSgpIHtcbiAgICBjb25zdCBzID0gbChcImFjdGl2ZUluZGV4XCIpLCBjID0gYShcInN0ZXBzXCIpIHx8IFtdO1xuICAgIGlmICh0eXBlb2YgcyA9PSBcInVuZGVmaW5lZFwiKVxuICAgICAgcmV0dXJuO1xuICAgIGNvbnN0IGQgPSBzIC0gMTtcbiAgICBjW2RdID8gcihkKSA6IHYoKTtcbiAgfVxuICBmdW5jdGlvbiBwKHMpIHtcbiAgICAoYShcInN0ZXBzXCIpIHx8IFtdKVtzXSA/IHIocykgOiB2KCk7XG4gIH1cbiAgZnVuY3Rpb24gbigpIHtcbiAgICB2YXIgaDtcbiAgICBpZiAobChcIl9fdHJhbnNpdGlvbkNhbGxiYWNrXCIpKVxuICAgICAgcmV0dXJuO1xuICAgIGNvbnN0IGMgPSBsKFwiYWN0aXZlSW5kZXhcIiksIGQgPSBsKFwiX19hY3RpdmVTdGVwXCIpLCBtID0gbChcIl9fYWN0aXZlRWxlbWVudFwiKTtcbiAgICBpZiAodHlwZW9mIGMgPT0gXCJ1bmRlZmluZWRcIiB8fCB0eXBlb2YgZCA9PSBcInVuZGVmaW5lZFwiIHx8IHR5cGVvZiBsKFwiYWN0aXZlSW5kZXhcIikgPT0gXCJ1bmRlZmluZWRcIilcbiAgICAgIHJldHVybjtcbiAgICBjb25zdCB1ID0gKChoID0gZC5wb3BvdmVyKSA9PSBudWxsID8gdm9pZCAwIDogaC5vblByZXZDbGljaykgfHwgYShcIm9uUHJldkNsaWNrXCIpO1xuICAgIGlmICh1KVxuICAgICAgcmV0dXJuIHUobSwgZCwge1xuICAgICAgICBjb25maWc6IGEoKSxcbiAgICAgICAgc3RhdGU6IGwoKVxuICAgICAgfSk7XG4gICAgaSgpO1xuICB9XG4gIGZ1bmN0aW9uIGYoKSB7XG4gICAgdmFyIHU7XG4gICAgaWYgKGwoXCJfX3RyYW5zaXRpb25DYWxsYmFja1wiKSlcbiAgICAgIHJldHVybjtcbiAgICBjb25zdCBjID0gbChcImFjdGl2ZUluZGV4XCIpLCBkID0gbChcIl9fYWN0aXZlU3RlcFwiKSwgbSA9IGwoXCJfX2FjdGl2ZUVsZW1lbnRcIik7XG4gICAgaWYgKHR5cGVvZiBjID09IFwidW5kZWZpbmVkXCIgfHwgdHlwZW9mIGQgPT0gXCJ1bmRlZmluZWRcIilcbiAgICAgIHJldHVybjtcbiAgICBjb25zdCBnID0gKCh1ID0gZC5wb3BvdmVyKSA9PSBudWxsID8gdm9pZCAwIDogdS5vbk5leHRDbGljaykgfHwgYShcIm9uTmV4dENsaWNrXCIpO1xuICAgIGlmIChnKVxuICAgICAgcmV0dXJuIGcobSwgZCwge1xuICAgICAgICBjb25maWc6IGEoKSxcbiAgICAgICAgc3RhdGU6IGwoKVxuICAgICAgfSk7XG4gICAgdCgpO1xuICB9XG4gIGZ1bmN0aW9uIHcoKSB7XG4gICAgbChcImlzSW5pdGlhbGl6ZWRcIikgfHwgKGIoXCJpc0luaXRpYWxpemVkXCIsICEwKSwgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKFwiZHJpdmVyLWFjdGl2ZVwiLCBhKFwiYW5pbWF0ZVwiKSA/IFwiZHJpdmVyLWZhZGVcIiA6IFwiZHJpdmVyLXNpbXBsZVwiKSwgeWUoKSwgTihcIm92ZXJsYXlDbGlja1wiLCBvKSwgTihcImVzY2FwZVByZXNzXCIsIG8pLCBOKFwiYXJyb3dMZWZ0UHJlc3NcIiwgbiksIE4oXCJhcnJvd1JpZ2h0UHJlc3NcIiwgZikpO1xuICB9XG4gIGZ1bmN0aW9uIHIocyA9IDApIHtcbiAgICB2YXIgRSwgQSwgSCwgJCwgQiwgTSwgeiwgcTtcbiAgICBjb25zdCBjID0gYShcInN0ZXBzXCIpO1xuICAgIGlmICghYykge1xuICAgICAgY29uc29sZS5lcnJvcihcIk5vIHN0ZXBzIHRvIGRyaXZlIHRocm91Z2hcIiksIHYoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKCFjW3NdKSB7XG4gICAgICB2KCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGIoXCJfX2FjdGl2ZU9uRGVzdHJveWVkXCIsIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpLCBiKFwiYWN0aXZlSW5kZXhcIiwgcyk7XG4gICAgY29uc3QgZCA9IGNbc10sIG0gPSBjW3MgKyAxXSwgZyA9IGNbcyAtIDFdLCB1ID0gKChFID0gZC5wb3BvdmVyKSA9PSBudWxsID8gdm9pZCAwIDogRS5kb25lQnRuVGV4dCkgfHwgYShcImRvbmVCdG5UZXh0XCIpIHx8IFwiRG9uZVwiLCBoID0gYShcImFsbG93Q2xvc2VcIiksIFAgPSB0eXBlb2YgKChBID0gZC5wb3BvdmVyKSA9PSBudWxsID8gdm9pZCAwIDogQS5zaG93UHJvZ3Jlc3MpICE9IFwidW5kZWZpbmVkXCIgPyAoSCA9IGQucG9wb3ZlcikgPT0gbnVsbCA/IHZvaWQgMCA6IEguc2hvd1Byb2dyZXNzIDogYShcInNob3dQcm9ncmVzc1wiKSwgXyA9ICgoKCQgPSBkLnBvcG92ZXIpID09IG51bGwgPyB2b2lkIDAgOiAkLnByb2dyZXNzVGV4dCkgfHwgYShcInByb2dyZXNzVGV4dFwiKSB8fCBcInt7Y3VycmVudH19IG9mIHt7dG90YWx9fVwiKS5yZXBsYWNlKFwie3tjdXJyZW50fX1cIiwgYCR7cyArIDF9YCkucmVwbGFjZShcInt7dG90YWx9fVwiLCBgJHtjLmxlbmd0aH1gKSwgeCA9ICgoQiA9IGQucG9wb3ZlcikgPT0gbnVsbCA/IHZvaWQgMCA6IEIuc2hvd0J1dHRvbnMpIHx8IGEoXCJzaG93QnV0dG9uc1wiKSwgQyA9IFtcbiAgICAgIFwibmV4dFwiLFxuICAgICAgXCJwcmV2aW91c1wiLFxuICAgICAgLi4uaCA/IFtcImNsb3NlXCJdIDogW11cbiAgICBdLmZpbHRlcigobmUpID0+ICEoeCAhPSBudWxsICYmIHgubGVuZ3RoKSB8fCB4LmluY2x1ZGVzKG5lKSksIHkgPSAoKE0gPSBkLnBvcG92ZXIpID09IG51bGwgPyB2b2lkIDAgOiBNLm9uTmV4dENsaWNrKSB8fCBhKFwib25OZXh0Q2xpY2tcIiksIGsgPSAoKHogPSBkLnBvcG92ZXIpID09IG51bGwgPyB2b2lkIDAgOiB6Lm9uUHJldkNsaWNrKSB8fCBhKFwib25QcmV2Q2xpY2tcIiksIFQgPSAoKHEgPSBkLnBvcG92ZXIpID09IG51bGwgPyB2b2lkIDAgOiBxLm9uQ2xvc2VDbGljaykgfHwgYShcIm9uQ2xvc2VDbGlja1wiKTtcbiAgICBLKHtcbiAgICAgIC4uLmQsXG4gICAgICBwb3BvdmVyOiB7XG4gICAgICAgIHNob3dCdXR0b25zOiBDLFxuICAgICAgICBuZXh0QnRuVGV4dDogbSA/IHZvaWQgMCA6IHUsXG4gICAgICAgIGRpc2FibGVCdXR0b25zOiBbLi4uZyA/IFtdIDogW1wicHJldmlvdXNcIl1dLFxuICAgICAgICBzaG93UHJvZ3Jlc3M6IFAsXG4gICAgICAgIHByb2dyZXNzVGV4dDogXyxcbiAgICAgICAgb25OZXh0Q2xpY2s6IHkgfHwgKCgpID0+IHtcbiAgICAgICAgICBtID8gcihzICsgMSkgOiB2KCk7XG4gICAgICAgIH0pLFxuICAgICAgICBvblByZXZDbGljazogayB8fCAoKCkgPT4ge1xuICAgICAgICAgIHIocyAtIDEpO1xuICAgICAgICB9KSxcbiAgICAgICAgb25DbG9zZUNsaWNrOiBUIHx8ICgoKSA9PiB7XG4gICAgICAgICAgdigpO1xuICAgICAgICB9KSxcbiAgICAgICAgLi4uKGQgPT0gbnVsbCA/IHZvaWQgMCA6IGQucG9wb3ZlcikgfHwge31cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICBmdW5jdGlvbiB2KHMgPSAhMCkge1xuICAgIGNvbnN0IGMgPSBsKFwiX19hY3RpdmVFbGVtZW50XCIpLCBkID0gbChcIl9fYWN0aXZlU3RlcFwiKSwgbSA9IGwoXCJfX2FjdGl2ZU9uRGVzdHJveWVkXCIpLCBnID0gYShcIm9uRGVzdHJveVN0YXJ0ZWRcIik7XG4gICAgaWYgKHMgJiYgZykge1xuICAgICAgY29uc3QgUCA9ICFjIHx8IChjID09IG51bGwgPyB2b2lkIDAgOiBjLmlkKSA9PT0gXCJkcml2ZXItZHVtbXktZWxlbWVudFwiO1xuICAgICAgZyhQID8gdm9pZCAwIDogYywgZCwge1xuICAgICAgICBjb25maWc6IGEoKSxcbiAgICAgICAgc3RhdGU6IGwoKVxuICAgICAgfSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHUgPSAoZCA9PSBudWxsID8gdm9pZCAwIDogZC5vbkRlc2VsZWN0ZWQpIHx8IGEoXCJvbkRlc2VsZWN0ZWRcIiksIGggPSBhKFwib25EZXN0cm95ZWRcIik7XG4gICAgaWYgKGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZShcImRyaXZlci1hY3RpdmVcIiwgXCJkcml2ZXItZmFkZVwiLCBcImRyaXZlci1zaW1wbGVcIiksIGJlKCksIFNlKCksIHdlKCksIHZlKCksIGNlKCksIFYoKSwgYyAmJiBkKSB7XG4gICAgICBjb25zdCBQID0gYy5pZCA9PT0gXCJkcml2ZXItZHVtbXktZWxlbWVudFwiO1xuICAgICAgdSAmJiB1KFAgPyB2b2lkIDAgOiBjLCBkLCB7XG4gICAgICAgIGNvbmZpZzogYSgpLFxuICAgICAgICBzdGF0ZTogbCgpXG4gICAgICB9KSwgaCAmJiBoKFAgPyB2b2lkIDAgOiBjLCBkLCB7XG4gICAgICAgIGNvbmZpZzogYSgpLFxuICAgICAgICBzdGF0ZTogbCgpXG4gICAgICB9KTtcbiAgICB9XG4gICAgbSAmJiBtLmZvY3VzKCk7XG4gIH1cbiAgcmV0dXJuIHtcbiAgICBpc0FjdGl2ZTogKCkgPT4gbChcImlzSW5pdGlhbGl6ZWRcIikgfHwgITEsXG4gICAgcmVmcmVzaDogSSxcbiAgICBkcml2ZTogKHMgPSAwKSA9PiB7XG4gICAgICB3KCksIHIocyk7XG4gICAgfSxcbiAgICBzZXRDb25maWc6IEQsXG4gICAgc2V0U3RlcHM6IChzKSA9PiB7XG4gICAgICBWKCksIEQoe1xuICAgICAgICAuLi5hKCksXG4gICAgICAgIHN0ZXBzOiBzXG4gICAgICB9KTtcbiAgICB9LFxuICAgIGdldENvbmZpZzogYSxcbiAgICBnZXRTdGF0ZTogbCxcbiAgICBnZXRBY3RpdmVJbmRleDogKCkgPT4gbChcImFjdGl2ZUluZGV4XCIpLFxuICAgIGlzRmlyc3RTdGVwOiAoKSA9PiBsKFwiYWN0aXZlSW5kZXhcIikgPT09IDAsXG4gICAgaXNMYXN0U3RlcDogKCkgPT4ge1xuICAgICAgY29uc3QgcyA9IGEoXCJzdGVwc1wiKSB8fCBbXSwgYyA9IGwoXCJhY3RpdmVJbmRleFwiKTtcbiAgICAgIHJldHVybiBjICE9PSB2b2lkIDAgJiYgYyA9PT0gcy5sZW5ndGggLSAxO1xuICAgIH0sXG4gICAgZ2V0QWN0aXZlU3RlcDogKCkgPT4gbChcImFjdGl2ZVN0ZXBcIiksXG4gICAgZ2V0QWN0aXZlRWxlbWVudDogKCkgPT4gbChcImFjdGl2ZUVsZW1lbnRcIiksXG4gICAgZ2V0UHJldmlvdXNFbGVtZW50OiAoKSA9PiBsKFwicHJldmlvdXNFbGVtZW50XCIpLFxuICAgIGdldFByZXZpb3VzU3RlcDogKCkgPT4gbChcInByZXZpb3VzU3RlcFwiKSxcbiAgICBtb3ZlTmV4dDogdCxcbiAgICBtb3ZlUHJldmlvdXM6IGksXG4gICAgbW92ZVRvOiBwLFxuICAgIGhhc05leHRTdGVwOiAoKSA9PiB7XG4gICAgICBjb25zdCBzID0gYShcInN0ZXBzXCIpIHx8IFtdLCBjID0gbChcImFjdGl2ZUluZGV4XCIpO1xuICAgICAgcmV0dXJuIGMgIT09IHZvaWQgMCAmJiBzW2MgKyAxXTtcbiAgICB9LFxuICAgIGhhc1ByZXZpb3VzU3RlcDogKCkgPT4ge1xuICAgICAgY29uc3QgcyA9IGEoXCJzdGVwc1wiKSB8fCBbXSwgYyA9IGwoXCJhY3RpdmVJbmRleFwiKTtcbiAgICAgIHJldHVybiBjICE9PSB2b2lkIDAgJiYgc1tjIC0gMV07XG4gICAgfSxcbiAgICBoaWdobGlnaHQ6IChzKSA9PiB7XG4gICAgICB3KCksIEsoe1xuICAgICAgICAuLi5zLFxuICAgICAgICBwb3BvdmVyOiBzLnBvcG92ZXIgPyB7XG4gICAgICAgICAgc2hvd0J1dHRvbnM6IFtdLFxuICAgICAgICAgIHNob3dQcm9ncmVzczogITEsXG4gICAgICAgICAgcHJvZ3Jlc3NUZXh0OiBcIlwiLFxuICAgICAgICAgIC4uLnMucG9wb3ZlclxuICAgICAgICB9IDogdm9pZCAwXG4gICAgICB9KTtcbiAgICB9LFxuICAgIGRlc3Ryb3k6ICgpID0+IHtcbiAgICAgIHYoITEpO1xuICAgIH1cbiAgfTtcbn1cbmV4cG9ydCB7XG4gIGtlIGFzIGRyaXZlclxufTtcbiIsICJsZXQgbGFzdE1vdXNlWCA9IDA7XG5sZXQgbGFzdE1vdXNlWSA9IDA7XG5sZXQgYWN0aXZlID0gZmFsc2U7XG5sZXQgaGFzTmF2aWdhdG9yID0gd2luZG93Lm5hdmlnYXRvci5jbGlwYm9hcmQ7XG5sZXQgaXNJbkVsZW1lbnQgPSBmYWxzZTtcbmxldCBzZWxlY3RlZCA9IG51bGw7XG5cbmxldCBjdXJzb3IgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2lyY2xlLWN1cnNvcicpO1xuXG5leHBvcnQgZnVuY3Rpb24gaW5pdENzc1NlbGVjdG9yKCkge1xuICAgIExpdmV3aXJlLm9uKCdmaWxhbWVudC10b3VyOjpjaGFuZ2UtY3NzLXNlbGVjdG9yLXN0YXR1cycsIGZ1bmN0aW9uICh7ZW5hYmxlZH0pIHtcblxuICAgICAgICBpZiAoZW5hYmxlZCkge1xuXG4gICAgICAgICAgICBkb2N1bWVudC5vbm1vdXNlbW92ZSA9IGhhbmRsZU1vdXNlTW92ZTtcbiAgICAgICAgICAgIGRvY3VtZW50Lm9ua2V5dXAgPSByZWxlYXNlO1xuXG4gICAgICAgICAgICBkb2N1bWVudC5vbm1vdXNlb3ZlciA9IGVudGVyQ3Vyc29yO1xuICAgICAgICAgICAgZG9jdW1lbnQub25tb3VzZWxlYXZlID0gbGVhdmVDdXJzb3I7XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIHJlbGVhc2UoZXZlbnQpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQua2V5ICE9PSAnRXNjYXBlJykgcmV0dXJuO1xuICAgICAgICAgICAgICAgIGFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHNlbGVjdGVkID0gbnVsbDtcbiAgICAgICAgICAgICAgICBjdXJzb3Iuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGZ1bmN0aW9uIChldmVudCkge1xuXG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50LmN0cmxLZXkgJiYgZXZlbnQuY29kZSA9PT0gJ1NwYWNlJyAmJiAhYWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghaGFzTmF2aWdhdG9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgRmlsYW1lbnROb3RpZmljYXRpb24oKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aXRsZSgnRmlsYW1lbnQgVG91ciAtIENTUyBTZWxlY3RvcicpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmJvZHkoXCJZb3VyIGJyb3dzZXIgZG9lcyBub3Qgc3VwcG9ydCB0aGUgQ2xpcGJvYXJkIEFQSSAhPGJyPkRvbid0IGZvcmdldCB0byBiZSBpbiA8Yj5odHRwczovLzwvYj4gcHJvdG9jb2xcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGFuZ2VyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc2VuZCgpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vdmVDdXJzb3IobGFzdE1vdXNlWCwgbGFzdE1vdXNlWSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJzb3Iuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBGaWxhbWVudE5vdGlmaWNhdGlvbigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRpdGxlKCdGaWxhbWVudCBUb3VyIC0gQ1NTIFNlbGVjdG9yJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYm9keSgnQWN0aXZhdGVkICE8YnI+UHJlc3MgQ3RybCArIEMgdG8gY29weSB0aGUgQ1NTIFNlbGVjdG9yIG9mIHRoZSBzZWxlY3RlZCBlbGVtZW50ICEnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zdWNjZXNzKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc2VuZCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50LmN0cmxLZXkgJiYgZXZlbnQuY29kZSA9PT0gJ0tleUMnICYmIGFjdGl2ZSkge1xuICAgICAgICAgICAgICAgICAgICBuYXZpZ2F0b3IuY2xpcGJvYXJkLndyaXRlVGV4dChnZXRPcHRpbWl6ZWRTZWxlY3RvcihzZWxlY3RlZCkgPz8gJ05vdGhpbmcgc2VsZWN0ZWQgIScpO1xuXG4gICAgICAgICAgICAgICAgICAgIGFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZCA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIGN1cnNvci5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXG4gICAgICAgICAgICAgICAgICAgIG5ldyBGaWxhbWVudE5vdGlmaWNhdGlvbigpXG4gICAgICAgICAgICAgICAgICAgICAgICAudGl0bGUoJ0ZpbGFtZW50IFRvdXIgLSBDU1MgU2VsZWN0b3InKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmJvZHkoYENTUyBTZWxlY3RvciBjb3BpZWQgdG8gY2xpcGJvYXJkICFgKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnN1Y2Nlc3MoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnNlbmQoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pO1xuXG5cbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBlc2NhcGVDc3NTZWxlY3RvcihzdHIpIHtcbiAgICByZXR1cm4gc3RyLnJlcGxhY2UoLyhbIVwiIyQlJicoKSorLC4vOjs8PT4/QFtcXF1eYHt8fX5dKS9nLCAnXFxcXCQxJyk7XG59XG5cbmZ1bmN0aW9uIGdldE9wdGltaXplZFNlbGVjdG9yKGVsKSB7XG4gICAgbGV0IGZ1bGxTZWxlY3RvciA9IGdldENzc1NlbGVjdG9yKGVsKTtcblxuICAgIHJldHVybiBvcHRpbWl6ZVNlbGVjdG9yKGZ1bGxTZWxlY3Rvcik7XG59XG5cbmZ1bmN0aW9uIG9wdGltaXplU2VsZWN0b3Ioc2VsZWN0b3IpIHtcbiAgICBsZXQgcGFydHMgPSBzZWxlY3Rvci5zcGxpdCgnID4gJyk7XG5cbiAgICBmb3IgKGxldCBpID0gcGFydHMubGVuZ3RoIC0gMjsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgbGV0IHRlc3RTZWxlY3RvciA9IHBhcnRzLnNsaWNlKGkpLmpvaW4oJyA+ICcpO1xuICAgICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCh0ZXN0U2VsZWN0b3IpLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgcmV0dXJuIHRlc3RTZWxlY3RvcjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBzZWxlY3Rvcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldENzc1NlbGVjdG9yKGVsKSB7XG4gICAgaWYgKCFlbCkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuXG4gICAgaWYgKGVsLmlkKSB7XG4gICAgICAgIHJldHVybiAnIycgKyBlc2NhcGVDc3NTZWxlY3RvcihlbC5pZCk7XG4gICAgfVxuXG4gICAgaWYgKGVsID09PSBkb2N1bWVudC5ib2R5KSB7XG4gICAgICAgIHJldHVybiAnYm9keSc7XG4gICAgfVxuXG4gICAgbGV0IHRhZyA9IGVsLnRhZ05hbWUudG9Mb3dlckNhc2UoKTtcblxuICAgIGxldCB2YWxpZENsYXNzZXMgPSBlbC5jbGFzc05hbWUuc3BsaXQoL1xccysvKS5maWx0ZXIoY2xzID0+IGNscyAmJiAhY2xzLnN0YXJ0c1dpdGgoJy0tJykpO1xuICAgIGxldCBjbGFzc2VzID0gdmFsaWRDbGFzc2VzLmxlbmd0aCA/ICcuJyArIHZhbGlkQ2xhc3Nlcy5tYXAoZXNjYXBlQ3NzU2VsZWN0b3IpLmpvaW4oJy4nKSA6ICcnO1xuXG4gICAgbGV0IHNlbGVjdG9yV2l0aG91dE50aE9mVHlwZSA9IHRhZyArIGNsYXNzZXM7XG5cbiAgICB0cnkge1xuICAgICAgICBsZXQgc2libGluZ3NXaXRoU2FtZVNlbGVjdG9yID0gQXJyYXkuZnJvbShlbC5wYXJlbnROb2RlLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3JXaXRob3V0TnRoT2ZUeXBlKSk7XG4gICAgICAgIGlmIChzaWJsaW5nc1dpdGhTYW1lU2VsZWN0b3IubGVuZ3RoID09PSAxICYmIHNpYmxpbmdzV2l0aFNhbWVTZWxlY3RvclswXSA9PT0gZWwpIHtcbiAgICAgICAgICAgIHJldHVybiBnZXRDc3NTZWxlY3RvcihlbC5wYXJlbnROb2RlKSArICcgPiAnICsgc2VsZWN0b3JXaXRob3V0TnRoT2ZUeXBlO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHNpYmxpbmdzID0gQXJyYXkuZnJvbShlbC5wYXJlbnROb2RlLmNoaWxkcmVuKTtcbiAgICAgICAgbGV0IHNhbWVUYWdBbmRDbGFzc1NpYmxpbmdzID0gc2libGluZ3MuZmlsdGVyKHNpYiA9PiBzaWIudGFnTmFtZSA9PT0gZWwudGFnTmFtZSAmJiBzaWIuY2xhc3NOYW1lID09PSBlbC5jbGFzc05hbWUpO1xuICAgICAgICBpZiAoc2FtZVRhZ0FuZENsYXNzU2libGluZ3MubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgbGV0IGluZGV4ID0gc2FtZVRhZ0FuZENsYXNzU2libGluZ3MuaW5kZXhPZihlbCkgKyAxO1xuICAgICAgICAgICAgcmV0dXJuIGdldENzc1NlbGVjdG9yKGVsLnBhcmVudE5vZGUpICsgJyA+ICcgKyB0YWcgKyBjbGFzc2VzICsgJzpudGgtb2YtdHlwZSgnICsgaW5kZXggKyAnKSc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZ2V0Q3NzU2VsZWN0b3IoZWwucGFyZW50Tm9kZSkgKyAnID4gJyArIHRhZyArIGNsYXNzZXM7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG5cbiAgICB9XG5cbn1cblxuZnVuY3Rpb24gaGFuZGxlTW91c2VNb3ZlKGV2ZW50KSB7XG4gICAgbGFzdE1vdXNlWCA9IGV2ZW50LmNsaWVudFg7XG4gICAgbGFzdE1vdXNlWSA9IGV2ZW50LmNsaWVudFk7XG5cbiAgICBtb3ZlQ3Vyc29yKGV2ZW50LmNsaWVudFgsIGV2ZW50LmNsaWVudFkpO1xufVxuXG5mdW5jdGlvbiBtb3ZlQ3Vyc29yKHBYLCBwWSkge1xuICAgIGlmICghYWN0aXZlKSByZXR1cm47XG5cbiAgICBsZXQgZGlmZiA9IDEwO1xuICAgIGlmICghaXNJbkVsZW1lbnQpIHtcbiAgICAgICAgY3Vyc29yLnN0eWxlLmxlZnQgPSAocFggLSBkaWZmKSArICdweCc7XG4gICAgICAgIGN1cnNvci5zdHlsZS50b3AgPSAocFkgLSBkaWZmKSArICdweCc7XG4gICAgICAgIGN1cnNvci5zdHlsZS53aWR0aCA9ICcyMHB4JztcbiAgICAgICAgY3Vyc29yLnN0eWxlLmhlaWdodCA9ICcyMHB4JztcbiAgICAgICAgY3Vyc29yLnN0eWxlLmJvcmRlclJhZGl1cyA9IFwiNTAlXCI7XG4gICAgfVxufVxuXG5cbmZ1bmN0aW9uIGVudGVyQ3Vyc29yKGV2ZW50KSB7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICBpZiAoIWFjdGl2ZSkgcmV0dXJuO1xuXG4gICAgaXNJbkVsZW1lbnQgPSB0cnVlO1xuXG4gICAgbGV0IGVsZW0gPSBldmVudC50YXJnZXQ7XG5cbiAgICB3aGlsZSAoZWxlbS5sYXN0RWxlbWVudENoaWxkKSB7XG4gICAgICAgIGVsZW0gPSBlbGVtLmxhc3RFbGVtZW50Q2hpbGQ7XG4gICAgfVxuXG4gICAgaWYgKGVsZW0pIHtcbiAgICAgICAgbGV0IGVYID0gZWxlbS5vZmZzZXRQYXJlbnQgPyBlbGVtLm9mZnNldExlZnQgKyBlbGVtLm9mZnNldFBhcmVudC5vZmZzZXRMZWZ0IDogZWxlbS5vZmZzZXRMZWZ0XG4gICAgICAgIGxldCBlWSA9IGVsZW0ub2Zmc2V0UGFyZW50ID8gZWxlbS5vZmZzZXRUb3AgKyBlbGVtLm9mZnNldFBhcmVudC5vZmZzZXRUb3AgOiBlbGVtLm9mZnNldFRvcDtcbiAgICAgICAgbGV0IGVXID0gZWxlbS5vZmZzZXRXaWR0aDtcbiAgICAgICAgbGV0IGVIID0gZWxlbS5vZmZzZXRIZWlnaHQ7XG4gICAgICAgIGxldCBkaWZmID0gNjtcbiAgICAgICAgc2VsZWN0ZWQgPSBlbGVtO1xuICAgICAgICBjdXJzb3Iuc3R5bGUubGVmdCA9IGVYIC0gZGlmZiArICdweCc7XG4gICAgICAgIGN1cnNvci5zdHlsZS50b3AgPSBlWSAtIGRpZmYgKyAncHgnO1xuICAgICAgICBjdXJzb3Iuc3R5bGUud2lkdGggPSAoZVcgKyBkaWZmICogMiAtIDEpICsgJ3B4JztcbiAgICAgICAgY3Vyc29yLnN0eWxlLmhlaWdodCA9IChlSCArIGRpZmYgKiAyIC0gMSkgKyAncHgnO1xuICAgICAgICBjdXJzb3Iuc3R5bGUuYm9yZGVyUmFkaXVzID0gXCI1cHhcIjtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGxlYXZlQ3Vyc29yKGV2ZW50KSB7XG4gICAgaWYgKCFhY3RpdmUpIHJldHVybjtcblxuICAgIGlzSW5FbGVtZW50ID0gZmFsc2U7XG59XG4iLCAiaW1wb3J0IHtkcml2ZXJ9IGZyb20gXCJkcml2ZXIuanNcIjtcbmltcG9ydCB7aW5pdENzc1NlbGVjdG9yfSBmcm9tICcuL2Nzcy1zZWxlY3Rvci5qcyc7XG5cblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbGl2ZXdpcmU6aW5pdGlhbGl6ZWQnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG5cbiAgICBpbml0Q3NzU2VsZWN0b3IoKTtcblxuICAgIGxldCBwbHVnaW5EYXRhO1xuXG4gICAgbGV0IHRvdXJzID0gW107XG4gICAgbGV0IGhpZ2hsaWdodHMgPSBbXTtcblxuICAgIGZ1bmN0aW9uIHdhaXRGb3JFbGVtZW50KHNlbGVjdG9yLCBjYWxsYmFjaykge1xuICAgICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3RvcikpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoZnVuY3Rpb24gKG11dGF0aW9ucykge1xuICAgICAgICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3RvcikpO1xuICAgICAgICAgICAgICAgIG9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZShkb2N1bWVudC5ib2R5LCB7XG4gICAgICAgICAgICBjaGlsZExpc3Q6IHRydWUsXG4gICAgICAgICAgICBzdWJ0cmVlOiB0cnVlXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBhcnNlSWQocGFyYW1zKSB7XG5cbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocGFyYW1zKSkge1xuICAgICAgICAgICAgcmV0dXJuIHBhcmFtc1swXTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgcGFyYW1zID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgcmV0dXJuIHBhcmFtcy5pZDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBwYXJhbXM7XG4gICAgfVxuXG4gICAgTGl2ZXdpcmUuZGlzcGF0Y2goJ2ZpbGFtZW50LXRvdXI6OmxvYWQtZWxlbWVudHMnLCB7cmVxdWVzdDogd2luZG93LmxvY2F0aW9ufSlcblxuICAgIExpdmV3aXJlLm9uKCdmaWxhbWVudC10b3VyOjpsb2FkZWQtZWxlbWVudHMnLCBmdW5jdGlvbiAoZGF0YSkge1xuXG4gICAgICAgIHBsdWdpbkRhdGEgPSBkYXRhO1xuXG4gICAgICAgIHBsdWdpbkRhdGEudG91cnMuZm9yRWFjaCgodG91cikgPT4ge1xuICAgICAgICAgICAgdG91cnMucHVzaCh0b3VyKTtcblxuICAgICAgICAgICAgaWYgKCFsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG91cnMnKSkge1xuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0b3VycycsIFwiW11cIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHNlbGVjdFRvdXIodG91cnMpO1xuXG4gICAgICAgIHBsdWdpbkRhdGEuaGlnaGxpZ2h0cy5mb3JFYWNoKChoaWdobGlnaHQpID0+IHtcblxuICAgICAgICAgICAgaWYgKGhpZ2hsaWdodC5yb3V0ZSA9PT0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lKSB7XG5cbiAgICAgICAgICAgICAgICAvL1RPRE8gQWRkIGEgbW9yZSBwcmVjaXNlL2VmZmljaWVudCBzZWxlY3RvclxuXG4gICAgICAgICAgICAgICAgd2FpdEZvckVsZW1lbnQoaGlnaGxpZ2h0LnBhcmVudCwgZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdG9yLnBhcmVudE5vZGUuc3R5bGUucG9zaXRpb24gPSAncmVsYXRpdmUnO1xuXG4gICAgICAgICAgICAgICAgICAgIGxldCB0ZW1wRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBEaXYuaW5uZXJIVE1MID0gaGlnaGxpZ2h0LmJ1dHRvbjtcblxuICAgICAgICAgICAgICAgICAgICB0ZW1wRGl2LmZpcnN0Q2hpbGQuY2xhc3NMaXN0LmFkZChoaWdobGlnaHQucG9zaXRpb24pO1xuXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdG9yLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHRlbXBEaXYuZmlyc3RDaGlsZCwgc2VsZWN0b3IpXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBoaWdobGlnaHRzLnB1c2goaGlnaGxpZ2h0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiBzZWxlY3RUb3VyKHRvdXJzLCBzdGFydEluZGV4ID0gMCkge1xuICAgICAgICBmb3IgKGxldCBpID0gc3RhcnRJbmRleDsgaSA8IHRvdXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgdG91ciA9IHRvdXJzW2ldO1xuICAgICAgICAgICAgbGV0IGNvbmRpdGlvbkFsd2F5c1Nob3cgPSB0b3VyLmFsd2F5c1Nob3c7XG4gICAgICAgICAgICBsZXQgY29uZGl0aW9uUm91dGVzSWdub3JlZCA9IHRvdXIucm91dGVzSWdub3JlZDtcbiAgICAgICAgICAgIGxldCBjb25kaXRpb25Sb3V0ZU1hdGNoZXMgPSB0b3VyLnJvdXRlID09PSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWU7XG4gICAgICAgICAgICBsZXQgY29uZGl0aW9uVmlzaWJsZU9uY2UgPSAhcGx1Z2luRGF0YS5vbmx5X3Zpc2libGVfb25jZSB8fFxuICAgICAgICAgICAgICAgIChwbHVnaW5EYXRhLm9ubHlfdmlzaWJsZV9vbmNlICYmICFsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG91cnMnKS5pbmNsdWRlcyh0b3VyLmlkKSk7XG5cbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAoY29uZGl0aW9uQWx3YXlzU2hvdyAmJiBjb25kaXRpb25Sb3V0ZXNJZ25vcmVkKSB8fFxuICAgICAgICAgICAgICAgIChjb25kaXRpb25BbHdheXNTaG93ICYmICFjb25kaXRpb25Sb3V0ZXNJZ25vcmVkICYmIGNvbmRpdGlvblJvdXRlTWF0Y2hlcykgfHxcbiAgICAgICAgICAgICAgICAoY29uZGl0aW9uUm91dGVzSWdub3JlZCAmJiBjb25kaXRpb25WaXNpYmxlT25jZSkgfHxcbiAgICAgICAgICAgICAgICAoY29uZGl0aW9uUm91dGVNYXRjaGVzICYmIGNvbmRpdGlvblZpc2libGVPbmNlKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgb3BlblRvdXIodG91cik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIExpdmV3aXJlLm9uKCdmaWxhbWVudC10b3VyOjpvcGVuLWhpZ2hsaWdodCcsIGZ1bmN0aW9uIChwYXJhbXMpIHtcblxuICAgICAgICBjb25zdCBpZCA9IHBhcnNlSWQocGFyYW1zKTtcblxuICAgICAgICBjb25zb2xlLmxvZyhoaWdobGlnaHRzKVxuXG4gICAgICAgIGxldCBoaWdobGlnaHQgPSBoaWdobGlnaHRzLmZpbmQoZWxlbWVudCA9PiBlbGVtZW50LmlkID09PSBpZCk7XG5cbiAgICAgICAgaWYgKGhpZ2hsaWdodCkge1xuICAgICAgICAgICAgZHJpdmVyKHtcbiAgICAgICAgICAgICAgICBvdmVybGF5Q29sb3I6IGxvY2FsU3RvcmFnZS50aGVtZSA9PT0gJ2xpZ2h0JyA/IGhpZ2hsaWdodC5jb2xvcnMubGlnaHQgOiBoaWdobGlnaHQuY29sb3JzLmRhcmssXG5cbiAgICAgICAgICAgICAgICBvblBvcG92ZXJSZW5kZXI6IChwb3BvdmVyLCB7Y29uZmlnLCBzdGF0ZX0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcG9wb3Zlci50aXRsZS5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgICAgICAgICAgICAgICBwb3BvdmVyLnRpdGxlLmlubmVySFRNTCA9IHN0YXRlLmFjdGl2ZVN0ZXAucG9wb3Zlci50aXRsZTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoIXN0YXRlLmFjdGl2ZVN0ZXAucG9wb3Zlci5kZXNjcmlwdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcG9wb3Zlci50aXRsZS5maXJzdENoaWxkLnN0eWxlLmp1c3RpZnlDb250ZW50ID0gJ2NlbnRlcic7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBsZXQgY29udGVudENsYXNzZXMgPSBcImRhcms6dGV4dC13aGl0ZSBmaS1zZWN0aW9uIHJvdW5kZWQteGwgYmctd2hpdGUgc2hhZG93LXNtIHJpbmctMSByaW5nLWdyYXktOTUwLzUgZGFyazpiZy1ncmF5LTkwMCBkYXJrOnJpbmctd2hpdGUvMTAgbWItNFwiO1xuXG4gICAgICAgICAgICAgICAgICAgIHBvcG92ZXIuZm9vdGVyLnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZCguLi5jb250ZW50Q2xhc3Nlcy5zcGxpdChcIiBcIikpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9KS5oaWdobGlnaHQoaGlnaGxpZ2h0KTtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgSGlnaGxpZ2h0IHdpdGggaWQgJyR7aWR9JyBub3QgZm91bmRgKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgTGl2ZXdpcmUub24oJ2ZpbGFtZW50LXRvdXI6Om9wZW4tdG91cicsIGZ1bmN0aW9uIChwYXJhbXMpIHtcblxuICAgICAgICBjb25zdCBpZCA9IHBhcnNlSWQocGFyYW1zKTtcblxuICAgICAgICBsZXQgdG91ciA9IHRvdXJzLmZpbmQoZWxlbWVudCA9PiBlbGVtZW50LmlkID09PSBgdG91cl8ke2lkfWApO1xuXG4gICAgICAgIGlmICh0b3VyKSB7XG4gICAgICAgICAgICBvcGVuVG91cih0b3VyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYFRvdXIgd2l0aCBpZCAnJHtpZH0nIG5vdCBmb3VuZGApO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiBvcGVuVG91cih0b3VyKSB7XG5cblxuICAgICAgICBsZXQgc3RlcHMgPSBKU09OLnBhcnNlKHRvdXIuc3RlcHMpO1xuXG4gICAgICAgIGlmIChzdGVwcy5sZW5ndGggPiAwKSB7XG5cbiAgICAgICAgICAgIGNvbnN0IGRyaXZlck9iaiA9IGRyaXZlcih7XG4gICAgICAgICAgICAgICAgYWxsb3dDbG9zZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBkaXNhYmxlQWN0aXZlSW50ZXJhY3Rpb246IHRydWUsXG4gICAgICAgICAgICAgICAgb3ZlcmxheUNvbG9yOiBsb2NhbFN0b3JhZ2UudGhlbWUgPT09ICdsaWdodCcgPyB0b3VyLmNvbG9ycy5saWdodCA6IHRvdXIuY29sb3JzLmRhcmssXG4gICAgICAgICAgICAgICAgb25EZXNlbGVjdGVkOiAoKGVsZW1lbnQsIHN0ZXAsIHtjb25maWcsIHN0YXRlfSkgPT4ge1xuXG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgb25DbG9zZUNsaWNrOiAoKGVsZW1lbnQsIHN0ZXAsIHtjb25maWcsIHN0YXRlfSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoc3RhdGUuYWN0aXZlU3RlcCAmJiAoIXN0YXRlLmFjdGl2ZVN0ZXAudW5jbG9zZWFibGUgfHwgdG91ci51bmNsb3NlYWJsZSkpXG4gICAgICAgICAgICAgICAgICAgICAgICBkcml2ZXJPYmouZGVzdHJveSgpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICghbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3RvdXJzJykuaW5jbHVkZXModG91ci5pZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0b3VycycsIEpTT04uc3RyaW5naWZ5KFsuLi5KU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b3VycycpKSwgdG91ci5pZF0pKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIG9uRGVzdHJveVN0YXJ0ZWQ6ICgoZWxlbWVudCwgc3RlcCwge2NvbmZpZywgc3RhdGV9KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzdGF0ZS5hY3RpdmVTdGVwICYmICFzdGF0ZS5hY3RpdmVTdGVwLnVuY2xvc2VhYmxlICYmICF0b3VyLnVuY2xvc2VhYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkcml2ZXJPYmouZGVzdHJveSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgb25EZXN0cm95ZWQ6ICgoZWxlbWVudCwgc3RlcCwge2NvbmZpZywgc3RhdGV9KSA9PiB7XG5cbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICBvbk5leHRDbGljazogKChlbGVtZW50LCBzdGVwLCB7Y29uZmlnLCBzdGF0ZX0pID0+IHtcblxuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0b3Vycy5sZW5ndGggPiAxICYmIGRyaXZlck9iai5pc0xhc3RTdGVwKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpbmRleCA9IHRvdXJzLmZpbmRJbmRleChvYmpldCA9PiBvYmpldC5pZCA9PT0gdG91ci5pZCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbmRleCAhPT0gLTEgJiYgaW5kZXggPCB0b3Vycy5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5leHRUb3VySW5kZXggPSBpbmRleCArIDE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0VG91cih0b3VycywgbmV4dFRvdXJJbmRleCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChkcml2ZXJPYmouaXNMYXN0U3RlcCgpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3RvdXJzJykuaW5jbHVkZXModG91ci5pZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndG91cnMnLCBKU09OLnN0cmluZ2lmeShbLi4uSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG91cnMnKSksIHRvdXIuaWRdKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGRyaXZlck9iai5kZXN0cm95KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChzdGVwLmV2ZW50cykge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3RlcC5ldmVudHMubm90aWZ5T25OZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IEZpbGFtZW50Tm90aWZpY2F0aW9uKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRpdGxlKHN0ZXAuZXZlbnRzLm5vdGlmeU9uTmV4dC50aXRsZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmJvZHkoc3RlcC5ldmVudHMubm90aWZ5T25OZXh0LmJvZHkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5pY29uKHN0ZXAuZXZlbnRzLm5vdGlmeU9uTmV4dC5pY29uKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuaWNvbkNvbG9yKHN0ZXAuZXZlbnRzLm5vdGlmeU9uTmV4dC5pY29uQ29sb3IpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jb2xvcihzdGVwLmV2ZW50cy5ub3RpZnlPbk5leHQuY29sb3IpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kdXJhdGlvbihzdGVwLmV2ZW50cy5ub3RpZnlPbk5leHQuZHVyYXRpb24pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zZW5kKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdGVwLmV2ZW50cy5kaXNwYXRjaE9uTmV4dCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIExpdmV3aXJlLmRpc3BhdGNoKHN0ZXAuZXZlbnRzLmRpc3BhdGNoT25OZXh0Lm5hbWUsIHN0ZXAuZXZlbnRzLmRpc3BhdGNoT25OZXh0LnBhcmFtcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdGVwLmV2ZW50cy5jbGlja09uTmV4dCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc3RlcC5ldmVudHMuY2xpY2tPbk5leHQpLmNsaWNrKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdGVwLmV2ZW50cy5yZWRpcmVjdE9uTmV4dCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5vcGVuKHN0ZXAuZXZlbnRzLnJlZGlyZWN0T25OZXh0LnVybCwgc3RlcC5ldmVudHMucmVkaXJlY3RPbk5leHQubmV3VGFiID8gJ19ibGFuaycgOiAnX3NlbGYnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICAgICAgZHJpdmVyT2JqLm1vdmVOZXh0KCk7XG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgb25Qb3BvdmVyUmVuZGVyOiAocG9wb3Zlciwge2NvbmZpZywgc3RhdGV9KSA9PiB7XG5cblxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhzdGF0ZS5hY3RpdmVTdGVwKTtcblxuICAgICAgICAgICAgICAgICAgICBwb3BvdmVyLnNpZGUgPSBzdGF0ZS5hY3RpdmVTdGVwLnBvcG92ZXIuc2lkZTtcbiAgICAgICAgICAgICAgICAgICAgcG9wb3Zlci5hbGlnbiA9IHN0YXRlLmFjdGl2ZVN0ZXAucG9wb3Zlci5hbGlnbjtcblxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhwb3BvdmVyKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoc3RhdGUuYWN0aXZlU3RlcC51bmNsb3NlYWJsZSB8fCB0b3VyLnVuY2xvc2VhYmxlKVxuICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kcml2ZXItcG9wb3Zlci1jbG9zZS1idG5cIikucmVtb3ZlKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgcG9wb3Zlci50aXRsZS5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgICAgICAgICAgICAgICBwb3BvdmVyLnRpdGxlLmlubmVySFRNTCA9IHN0YXRlLmFjdGl2ZVN0ZXAucG9wb3Zlci50aXRsZTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoIXN0YXRlLmFjdGl2ZVN0ZXAucG9wb3Zlci5kZXNjcmlwdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcG9wb3Zlci50aXRsZS5maXJzdENoaWxkLnN0eWxlLmp1c3RpZnlDb250ZW50ID0gJ2NlbnRlcic7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBsZXQgY29udGVudENsYXNzZXMgPSBcImRhcms6dGV4dC13aGl0ZSBmaS1zZWN0aW9uIHJvdW5kZWQteGwgYmctd2hpdGUgc2hhZG93LXNtIHJpbmctMSByaW5nLWdyYXktOTUwLzUgZGFyazpiZy1ncmF5LTkwMCBkYXJrOnJpbmctd2hpdGUvMTAgbWItNFwiO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIHBvcG92ZXIuZGVzY3JpcHRpb24uaW5zZXJ0QWRqYWNlbnRIVE1MKFwiYmVmb3JlZW5kXCIsIHN0YXRlLmFjdGl2ZVN0ZXAucG9wb3Zlci5mb3JtKTtcblxuICAgICAgICAgICAgICAgICAgICBwb3BvdmVyLmZvb3Rlci5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoLi4uY29udGVudENsYXNzZXMuc3BsaXQoXCIgXCIpKTtcblxuICAgICAgICAgICAgICAgICAgICBwb3BvdmVyLmZvb3Rlci5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgICAgICAgICAgICAgICBwb3BvdmVyLmZvb3Rlci5jbGFzc0xpc3QuYWRkKCdmbGV4JywgJ210LTMnKTtcbiAgICAgICAgICAgICAgICAgICAgcG9wb3Zlci5mb290ZXIuc3R5bGUuanVzdGlmeUNvbnRlbnQgPSAnc3BhY2UtZXZlbmx5JztcblxuICAgICAgICAgICAgICAgICAgICBwb3BvdmVyLmZvb3Rlci5jbGFzc0xpc3QucmVtb3ZlKFwiZHJpdmVyLXBvcG92ZXItZm9vdGVyXCIpO1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHBvcG92ZXIuYXJyb3cpO1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5leHRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgbmV4dENsYXNzZXMgPSBcImZpLWJ0biBmaS1idG4tc2l6ZS1tZCByZWxhdGl2ZSBncmlkLWZsb3ctY29sIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBmb250LXNlbWlib2xkIG91dGxpbmUtbm9uZSB0cmFuc2l0aW9uIGR1cmF0aW9uLTc1IGZvY3VzOnJpbmctMiBkaXNhYmxlZDpwb2ludGVyLWV2ZW50cy1ub25lIGRpc2FibGVkOm9wYWNpdHktNzAgcm91bmRlZC1sZyBmaS1idG4tY29sb3ItcHJpbWFyeSBnYXAtMS41IHB4LTMgcHktMiB0ZXh0LXNtIGlubGluZS1ncmlkIHNoYWRvdy1zbSBiZy1jdXN0b20tNjAwIHRleHQtd2hpdGUgaG92ZXI6YmctY3VzdG9tLTUwMCBkYXJrOmJnLWN1c3RvbS01MDAgZGFyazpob3ZlcjpiZy1jdXN0b20tNDAwIGZvY3VzOnJpbmctY3VzdG9tLTUwMC81MCBkYXJrOmZvY3VzOnJpbmctY3VzdG9tLTQwMC81MCBmaS1hYy1idG4tYWN0aW9uXCI7XG5cbiAgICAgICAgICAgICAgICAgICAgbmV4dEJ1dHRvbi5jbGFzc0xpc3QuYWRkKC4uLm5leHRDbGFzc2VzLnNwbGl0KFwiIFwiKSwgJ2RyaXZlci1wb3BvdmVyLW5leHQtYnRuJyk7XG4gICAgICAgICAgICAgICAgICAgIG5leHRCdXR0b24uaW5uZXJUZXh0ID0gZHJpdmVyT2JqLmlzTGFzdFN0ZXAoKVxuICAgICAgICAgICAgICAgICAgICAgICAgPyAoc3RhdGUuYWN0aXZlU3RlcC5wb3BvdmVyLm5leHRCdG5UZXh0ICE9IG51bGwgPyBzdGF0ZS5hY3RpdmVTdGVwLnBvcG92ZXIubmV4dEJ0blRleHQgOiB0b3VyLmRvbmVCdXR0b25MYWJlbClcbiAgICAgICAgICAgICAgICAgICAgICAgIDogKHN0YXRlLmFjdGl2ZVN0ZXAucG9wb3Zlci5uZXh0QnRuVGV4dCAhPSBudWxsID8gc3RhdGUuYWN0aXZlU3RlcC5wb3BvdmVyLm5leHRCdG5UZXh0IDogdG91ci5uZXh0QnV0dG9uTGFiZWwpO1xuXG4gICAgICAgICAgICAgICAgICAgIG5leHRCdXR0b24uc3R5bGUuc2V0UHJvcGVydHkoJy0tYy00MDAnLCAndmFyKC0tcHJpbWFyeS00MDAnKTtcbiAgICAgICAgICAgICAgICAgICAgbmV4dEJ1dHRvbi5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1jLTUwMCcsICd2YXIoLS1wcmltYXJ5LTUwMCcpO1xuICAgICAgICAgICAgICAgICAgICBuZXh0QnV0dG9uLnN0eWxlLnNldFByb3BlcnR5KCctLWMtNjAwJywgJ3ZhcigtLXByaW1hcnktNjAwJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJldkJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgICAgICAgICAgICAgICAgIGxldCBwcmV2Q2xhc3NlcyA9IFwiZmktYnRuIGZpLWJ0bi1zaXplLW1kIHJlbGF0aXZlIGdyaWQtZmxvdy1jb2wgaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGZvbnQtc2VtaWJvbGQgb3V0bGluZS1ub25lIHRyYW5zaXRpb24gZHVyYXRpb24tNzUgZm9jdXM6cmluZy0yIGRpc2FibGVkOnBvaW50ZXItZXZlbnRzLW5vbmUgZGlzYWJsZWQ6b3BhY2l0eS03MCByb3VuZGVkLWxnIGZpLWJ0bi1jb2xvci1ncmF5IGdhcC0xLjUgcHgtMyBweS0yIHRleHQtc20gaW5saW5lLWdyaWQgc2hhZG93LXNtIGJnLXdoaXRlIHRleHQtZ3JheS05NTAgaG92ZXI6YmctZ3JheS01MCBkYXJrOmJnLXdoaXRlLzUgZGFyazp0ZXh0LXdoaXRlIGRhcms6aG92ZXI6Ymctd2hpdGUvMTAgcmluZy0xIHJpbmctZ3JheS05NTAvMTAgZGFyazpyaW5nLXdoaXRlLzIwIGZpLWFjLWJ0bi1hY3Rpb25cIjtcbiAgICAgICAgICAgICAgICAgICAgcHJldkJ1dHRvbi5jbGFzc0xpc3QuYWRkKC4uLnByZXZDbGFzc2VzLnNwbGl0KFwiIFwiKSwgJ2RyaXZlci1wb3BvdmVyLXByZXYtYnRuJyk7XG4gICAgICAgICAgICAgICAgICAgIHByZXZCdXR0b24uaW5uZXJUZXh0ID0gc3RhdGUuYWN0aXZlU3RlcC5wb3BvdmVyLnByZXZCdG5UZXh0ICE9IG51bGwgPyBzdGF0ZS5hY3RpdmVTdGVwLnBvcG92ZXIubmV4dEJ0blRleHQgOiB0b3VyLnByZXZpb3VzQnV0dG9uTGFiZWw7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCFkcml2ZXJPYmouaXNGaXJzdFN0ZXAoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcG9wb3Zlci5mb290ZXIuYXBwZW5kQ2hpbGQocHJldkJ1dHRvbik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcG9wb3Zlci5mb290ZXIuYXBwZW5kQ2hpbGQobmV4dEJ1dHRvbik7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzdGVwczogc3RlcHMsXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgZHJpdmVyT2JqLmRyaXZlKCk7XG4gICAgICAgIH1cbiAgICB9XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBQSxJQUFJLElBQUksQ0FBQztBQUNULFNBQVMsRUFBRSxJQUFJLENBQUMsR0FBRztBQUNqQixNQUFJO0FBQUEsSUFDRixTQUFTO0FBQUEsSUFDVCxZQUFZO0FBQUEsSUFDWixnQkFBZ0I7QUFBQSxJQUNoQixjQUFjO0FBQUEsSUFDZCwwQkFBMEI7QUFBQSxJQUMxQixjQUFjO0FBQUEsSUFDZCxjQUFjO0FBQUEsSUFDZCxhQUFhO0FBQUEsSUFDYixlQUFlO0FBQUEsSUFDZixhQUFhLENBQUMsUUFBUSxZQUFZLE9BQU87QUFBQSxJQUN6QyxnQkFBZ0IsQ0FBQztBQUFBLElBQ2pCLGNBQWM7QUFBQSxJQUNkLEdBQUc7QUFBQSxFQUNMO0FBQ0Y7QUFDQSxTQUFTLEVBQUUsR0FBRztBQUNaLFNBQU8sSUFBSSxFQUFFLENBQUMsSUFBSTtBQUNwQjtBQUNBLFNBQVMsRUFBRSxHQUFHLEdBQUcsR0FBRyxHQUFHO0FBQ3JCLFVBQVEsS0FBSyxJQUFJLEtBQUssSUFBSSxJQUFJLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssRUFBRSxLQUFLLElBQUksS0FBSyxLQUFLO0FBQy9FO0FBQ0EsU0FBUyxFQUFFLEdBQUc7QUFDWixRQUFNLElBQUk7QUFDVixTQUFPLEVBQUUsUUFBUSxDQUFDLE1BQU07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
