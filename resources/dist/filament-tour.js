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
      let conditionRouteMatches = tour.route === window.location.pathname + window.location.search;
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
          if (step.events.dispatchOnClose) {
            Livewire.dispatch(step.events.dispatchOnClose.name, step.events.dispatchOnClose.params);
          }
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
          if (driverObj.isLastStep()) {
            if (!localStorage.getItem("tours").includes(tour.id)) {
              localStorage.setItem("tours", JSON.stringify([...JSON.parse(localStorage.getItem("tours")), tour.id]));
            }
            driverObj.destroy();
          }
          if (tours.length > 1 && driverObj.isLastStep()) {
            let index = tours.findIndex((objet) => objet.id === tour.id);
            if (index !== -1 && index < tours.length - 1) {
              let nextTourIndex = index + 1;
              selectTour(tours, nextTourIndex);
            }
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
          popover.side = state.activeStep.popover.side;
          popover.align = state.activeStep.popover.align;
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
          const nextButton = document.createElement("button");
          let nextClasses = "fi-btn fi-btn-size-md relative grid-flow-col items-center justify-center font-semibold outline-none transition duration-75 focus:ring-2 disabled:pointer-events-none disabled:opacity-70 rounded-lg fi-btn-color-primary gap-1.5 px-3 py-2 text-sm inline-grid shadow-sm bg-custom-600 text-white hover:bg-custom-500 dark:bg-custom-500 dark:hover:bg-custom-400 focus:ring-custom-500/50 dark:focus:ring-custom-400/50 fi-ac-btn-action";
          nextButton.classList.add(...nextClasses.split(" "), "driver-popover-next-btn");
          nextButton.innerText = driverObj.isLastStep() ? state.activeStep.popover.doneBtnText : state.activeStep.popover.nextBtnText;
          nextButton.style.setProperty("--c-400", "var(--primary-400");
          nextButton.style.setProperty("--c-500", "var(--primary-500");
          nextButton.style.setProperty("--c-600", "var(--primary-600");
          const prevButton = document.createElement("button");
          let prevClasses = "fi-btn fi-btn-size-md relative grid-flow-col items-center justify-center font-semibold outline-none transition duration-75 focus:ring-2 disabled:pointer-events-none disabled:opacity-70 rounded-lg fi-btn-color-gray gap-1.5 px-3 py-2 text-sm inline-grid shadow-sm bg-white text-gray-950 hover:bg-gray-50 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 ring-1 ring-gray-950/10 dark:ring-white/20 fi-ac-btn-action";
          prevButton.classList.add(...prevClasses.split(" "), "driver-popover-prev-btn");
          prevButton.innerText = state.activeStep.popover.prevBtnText;
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vbm9kZV9tb2R1bGVzL2RyaXZlci5qcy9kaXN0L2RyaXZlci5qcy5tanMiLCAiLi4vanMvY3NzLXNlbGVjdG9yLmpzIiwgIi4uL2pzL2luZGV4LmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJsZXQgRiA9IHt9O1xuZnVuY3Rpb24gRChlID0ge30pIHtcbiAgRiA9IHtcbiAgICBhbmltYXRlOiAhMCxcbiAgICBhbGxvd0Nsb3NlOiAhMCxcbiAgICBvdmVybGF5T3BhY2l0eTogMC43LFxuICAgIHNtb290aFNjcm9sbDogITEsXG4gICAgZGlzYWJsZUFjdGl2ZUludGVyYWN0aW9uOiAhMSxcbiAgICBzaG93UHJvZ3Jlc3M6ICExLFxuICAgIHN0YWdlUGFkZGluZzogMTAsXG4gICAgc3RhZ2VSYWRpdXM6IDUsXG4gICAgcG9wb3Zlck9mZnNldDogMTAsXG4gICAgc2hvd0J1dHRvbnM6IFtcIm5leHRcIiwgXCJwcmV2aW91c1wiLCBcImNsb3NlXCJdLFxuICAgIGRpc2FibGVCdXR0b25zOiBbXSxcbiAgICBvdmVybGF5Q29sb3I6IFwiIzAwMFwiLFxuICAgIC4uLmVcbiAgfTtcbn1cbmZ1bmN0aW9uIGEoZSkge1xuICByZXR1cm4gZSA/IEZbZV0gOiBGO1xufVxuZnVuY3Rpb24gVyhlLCBvLCB0LCBpKSB7XG4gIHJldHVybiAoZSAvPSBpIC8gMikgPCAxID8gdCAvIDIgKiBlICogZSArIG8gOiAtdCAvIDIgKiAoLS1lICogKGUgLSAyKSAtIDEpICsgbztcbn1cbmZ1bmN0aW9uIFEoZSkge1xuICBjb25zdCBvID0gJ2FbaHJlZl06bm90KFtkaXNhYmxlZF0pLCBidXR0b246bm90KFtkaXNhYmxlZF0pLCB0ZXh0YXJlYTpub3QoW2Rpc2FibGVkXSksIGlucHV0W3R5cGU9XCJ0ZXh0XCJdOm5vdChbZGlzYWJsZWRdKSwgaW5wdXRbdHlwZT1cInJhZGlvXCJdOm5vdChbZGlzYWJsZWRdKSwgaW5wdXRbdHlwZT1cImNoZWNrYm94XCJdOm5vdChbZGlzYWJsZWRdKSwgc2VsZWN0Om5vdChbZGlzYWJsZWRdKSc7XG4gIHJldHVybiBlLmZsYXRNYXAoKHQpID0+IHtcbiAgICBjb25zdCBpID0gdC5tYXRjaGVzKG8pLCBwID0gQXJyYXkuZnJvbSh0LnF1ZXJ5U2VsZWN0b3JBbGwobykpO1xuICAgIHJldHVybiBbLi4uaSA/IFt0XSA6IFtdLCAuLi5wXTtcbiAgfSkuZmlsdGVyKCh0KSA9PiBnZXRDb21wdXRlZFN0eWxlKHQpLnBvaW50ZXJFdmVudHMgIT09IFwibm9uZVwiICYmIGFlKHQpKTtcbn1cbmZ1bmN0aW9uIFooZSkge1xuICBpZiAoIWUgfHwgc2UoZSkpXG4gICAgcmV0dXJuO1xuICBjb25zdCBvID0gYShcInNtb290aFNjcm9sbFwiKTtcbiAgZS5zY3JvbGxJbnRvVmlldyh7XG4gICAgLy8gUmVtb3ZpbmcgdGhlIHNtb290aCBzY3JvbGxpbmcgZm9yIGVsZW1lbnRzIHdoaWNoIGV4aXN0IGluc2lkZSB0aGUgc2Nyb2xsYWJsZSBwYXJlbnRcbiAgICAvLyBUaGlzIHdhcyBjYXVzaW5nIHRoZSBoaWdobGlnaHQgdG8gbm90IHByb3Blcmx5IHJlbmRlclxuICAgIGJlaGF2aW9yOiAhbyB8fCByZShlKSA/IFwiYXV0b1wiIDogXCJzbW9vdGhcIixcbiAgICBpbmxpbmU6IFwiY2VudGVyXCIsXG4gICAgYmxvY2s6IFwiY2VudGVyXCJcbiAgfSk7XG59XG5mdW5jdGlvbiByZShlKSB7XG4gIGlmICghZSB8fCAhZS5wYXJlbnRFbGVtZW50KVxuICAgIHJldHVybjtcbiAgY29uc3QgbyA9IGUucGFyZW50RWxlbWVudDtcbiAgcmV0dXJuIG8uc2Nyb2xsSGVpZ2h0ID4gby5jbGllbnRIZWlnaHQ7XG59XG5mdW5jdGlvbiBzZShlKSB7XG4gIGNvbnN0IG8gPSBlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICByZXR1cm4gby50b3AgPj0gMCAmJiBvLmxlZnQgPj0gMCAmJiBvLmJvdHRvbSA8PSAod2luZG93LmlubmVySGVpZ2h0IHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQpICYmIG8ucmlnaHQgPD0gKHdpbmRvdy5pbm5lcldpZHRoIHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCk7XG59XG5mdW5jdGlvbiBhZShlKSB7XG4gIHJldHVybiAhIShlLm9mZnNldFdpZHRoIHx8IGUub2Zmc2V0SGVpZ2h0IHx8IGUuZ2V0Q2xpZW50UmVjdHMoKS5sZW5ndGgpO1xufVxubGV0IE8gPSB7fTtcbmZ1bmN0aW9uIGIoZSwgbykge1xuICBPW2VdID0gbztcbn1cbmZ1bmN0aW9uIGwoZSkge1xuICByZXR1cm4gZSA/IE9bZV0gOiBPO1xufVxuZnVuY3Rpb24gVigpIHtcbiAgTyA9IHt9O1xufVxubGV0IFIgPSB7fTtcbmZ1bmN0aW9uIE4oZSwgbykge1xuICBSW2VdID0gbztcbn1cbmZ1bmN0aW9uIEwoZSkge1xuICB2YXIgbztcbiAgKG8gPSBSW2VdKSA9PSBudWxsIHx8IG8uY2FsbChSKTtcbn1cbmZ1bmN0aW9uIGNlKCkge1xuICBSID0ge307XG59XG5mdW5jdGlvbiBsZShlLCBvLCB0LCBpKSB7XG4gIGxldCBwID0gbChcIl9fYWN0aXZlU3RhZ2VQb3NpdGlvblwiKTtcbiAgY29uc3QgbiA9IHAgfHwgdC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSwgZiA9IGkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksIHcgPSBXKGUsIG4ueCwgZi54IC0gbi54LCBvKSwgciA9IFcoZSwgbi55LCBmLnkgLSBuLnksIG8pLCB2ID0gVyhlLCBuLndpZHRoLCBmLndpZHRoIC0gbi53aWR0aCwgbyksIHMgPSBXKGUsIG4uaGVpZ2h0LCBmLmhlaWdodCAtIG4uaGVpZ2h0LCBvKTtcbiAgcCA9IHtcbiAgICB4OiB3LFxuICAgIHk6IHIsXG4gICAgd2lkdGg6IHYsXG4gICAgaGVpZ2h0OiBzXG4gIH0sIEoocCksIGIoXCJfX2FjdGl2ZVN0YWdlUG9zaXRpb25cIiwgcCk7XG59XG5mdW5jdGlvbiBHKGUpIHtcbiAgaWYgKCFlKVxuICAgIHJldHVybjtcbiAgY29uc3QgbyA9IGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksIHQgPSB7XG4gICAgeDogby54LFxuICAgIHk6IG8ueSxcbiAgICB3aWR0aDogby53aWR0aCxcbiAgICBoZWlnaHQ6IG8uaGVpZ2h0XG4gIH07XG4gIGIoXCJfX2FjdGl2ZVN0YWdlUG9zaXRpb25cIiwgdCksIEoodCk7XG59XG5mdW5jdGlvbiBkZSgpIHtcbiAgY29uc3QgZSA9IGwoXCJfX2FjdGl2ZVN0YWdlUG9zaXRpb25cIiksIG8gPSBsKFwiX19vdmVybGF5U3ZnXCIpO1xuICBpZiAoIWUpXG4gICAgcmV0dXJuO1xuICBpZiAoIW8pIHtcbiAgICBjb25zb2xlLndhcm4oXCJObyBzdGFnZSBzdmcgZm91bmQuXCIpO1xuICAgIHJldHVybjtcbiAgfVxuICBjb25zdCB0ID0gd2luZG93LmlubmVyV2lkdGgsIGkgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gIG8uc2V0QXR0cmlidXRlKFwidmlld0JveFwiLCBgMCAwICR7dH0gJHtpfWApO1xufVxuZnVuY3Rpb24gcGUoZSkge1xuICBjb25zdCBvID0gdWUoZSk7XG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobyksIHRlKG8sICh0KSA9PiB7XG4gICAgdC50YXJnZXQudGFnTmFtZSA9PT0gXCJwYXRoXCIgJiYgTChcIm92ZXJsYXlDbGlja1wiKTtcbiAgfSksIGIoXCJfX292ZXJsYXlTdmdcIiwgbyk7XG59XG5mdW5jdGlvbiBKKGUpIHtcbiAgY29uc3QgbyA9IGwoXCJfX292ZXJsYXlTdmdcIik7XG4gIGlmICghbykge1xuICAgIHBlKGUpO1xuICAgIHJldHVybjtcbiAgfVxuICBjb25zdCB0ID0gby5maXJzdEVsZW1lbnRDaGlsZDtcbiAgaWYgKCh0ID09IG51bGwgPyB2b2lkIDAgOiB0LnRhZ05hbWUpICE9PSBcInBhdGhcIilcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJubyBwYXRoIGVsZW1lbnQgZm91bmQgaW4gc3RhZ2Ugc3ZnXCIpO1xuICB0LnNldEF0dHJpYnV0ZShcImRcIiwgVShlKSk7XG59XG5mdW5jdGlvbiB1ZShlKSB7XG4gIGNvbnN0IG8gPSB3aW5kb3cuaW5uZXJXaWR0aCwgdCA9IHdpbmRvdy5pbm5lckhlaWdodCwgaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsIFwic3ZnXCIpO1xuICBpLmNsYXNzTGlzdC5hZGQoXCJkcml2ZXItb3ZlcmxheVwiLCBcImRyaXZlci1vdmVybGF5LWFuaW1hdGVkXCIpLCBpLnNldEF0dHJpYnV0ZShcInZpZXdCb3hcIiwgYDAgMCAke299ICR7dH1gKSwgaS5zZXRBdHRyaWJ1dGUoXCJ4bWxTcGFjZVwiLCBcInByZXNlcnZlXCIpLCBpLnNldEF0dHJpYnV0ZShcInhtbG5zWGxpbmtcIiwgXCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCIpLCBpLnNldEF0dHJpYnV0ZShcInZlcnNpb25cIiwgXCIxLjFcIiksIGkuc2V0QXR0cmlidXRlKFwicHJlc2VydmVBc3BlY3RSYXRpb1wiLCBcInhNaW5ZTWluIHNsaWNlXCIpLCBpLnN0eWxlLmZpbGxSdWxlID0gXCJldmVub2RkXCIsIGkuc3R5bGUuY2xpcFJ1bGUgPSBcImV2ZW5vZGRcIiwgaS5zdHlsZS5zdHJva2VMaW5lam9pbiA9IFwicm91bmRcIiwgaS5zdHlsZS5zdHJva2VNaXRlcmxpbWl0ID0gXCIyXCIsIGkuc3R5bGUuekluZGV4ID0gXCIxMDAwMFwiLCBpLnN0eWxlLnBvc2l0aW9uID0gXCJmaXhlZFwiLCBpLnN0eWxlLnRvcCA9IFwiMFwiLCBpLnN0eWxlLmxlZnQgPSBcIjBcIiwgaS5zdHlsZS53aWR0aCA9IFwiMTAwJVwiLCBpLnN0eWxlLmhlaWdodCA9IFwiMTAwJVwiO1xuICBjb25zdCBwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiwgXCJwYXRoXCIpO1xuICByZXR1cm4gcC5zZXRBdHRyaWJ1dGUoXCJkXCIsIFUoZSkpLCBwLnN0eWxlLmZpbGwgPSBhKFwib3ZlcmxheUNvbG9yXCIpIHx8IFwicmdiKDAsMCwwKVwiLCBwLnN0eWxlLm9wYWNpdHkgPSBgJHthKFwib3ZlcmxheU9wYWNpdHlcIil9YCwgcC5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJhdXRvXCIsIHAuc3R5bGUuY3Vyc29yID0gXCJhdXRvXCIsIGkuYXBwZW5kQ2hpbGQocCksIGk7XG59XG5mdW5jdGlvbiBVKGUpIHtcbiAgY29uc3QgbyA9IHdpbmRvdy5pbm5lcldpZHRoLCB0ID0gd2luZG93LmlubmVySGVpZ2h0LCBpID0gYShcInN0YWdlUGFkZGluZ1wiKSB8fCAwLCBwID0gYShcInN0YWdlUmFkaXVzXCIpIHx8IDAsIG4gPSBlLndpZHRoICsgaSAqIDIsIGYgPSBlLmhlaWdodCArIGkgKiAyLCB3ID0gTWF0aC5taW4ocCwgbiAvIDIsIGYgLyAyKSwgciA9IE1hdGguZmxvb3IoTWF0aC5tYXgodywgMCkpLCB2ID0gZS54IC0gaSArIHIsIHMgPSBlLnkgLSBpLCBjID0gbiAtIHIgKiAyLCBkID0gZiAtIHIgKiAyO1xuICByZXR1cm4gYE0ke299LDBMMCwwTDAsJHt0fUwke299LCR7dH1MJHtvfSwwWlxuICAgIE0ke3Z9LCR7c30gaCR7Y30gYSR7cn0sJHtyfSAwIDAgMSAke3J9LCR7cn0gdiR7ZH0gYSR7cn0sJHtyfSAwIDAgMSAtJHtyfSwke3J9IGgtJHtjfSBhJHtyfSwke3J9IDAgMCAxIC0ke3J9LC0ke3J9IHYtJHtkfSBhJHtyfSwke3J9IDAgMCAxICR7cn0sLSR7cn0gemA7XG59XG5mdW5jdGlvbiB2ZSgpIHtcbiAgY29uc3QgZSA9IGwoXCJfX292ZXJsYXlTdmdcIik7XG4gIGUgJiYgZS5yZW1vdmUoKTtcbn1cbmZ1bmN0aW9uIGZlKCkge1xuICBjb25zdCBlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkcml2ZXItZHVtbXktZWxlbWVudFwiKTtcbiAgaWYgKGUpXG4gICAgcmV0dXJuIGU7XG4gIGxldCBvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgcmV0dXJuIG8uaWQgPSBcImRyaXZlci1kdW1teS1lbGVtZW50XCIsIG8uc3R5bGUud2lkdGggPSBcIjBcIiwgby5zdHlsZS5oZWlnaHQgPSBcIjBcIiwgby5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJub25lXCIsIG8uc3R5bGUub3BhY2l0eSA9IFwiMFwiLCBvLnN0eWxlLnBvc2l0aW9uID0gXCJmaXhlZFwiLCBvLnN0eWxlLnRvcCA9IFwiNTAlXCIsIG8uc3R5bGUubGVmdCA9IFwiNTAlXCIsIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobyksIG87XG59XG5mdW5jdGlvbiBLKGUpIHtcbiAgY29uc3QgeyBlbGVtZW50OiBvIH0gPSBlO1xuICBsZXQgdCA9IHR5cGVvZiBvID09IFwic3RyaW5nXCIgPyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKG8pIDogbztcbiAgdCB8fCAodCA9IGZlKCkpLCBnZSh0LCBlKTtcbn1cbmZ1bmN0aW9uIGhlKCkge1xuICBjb25zdCBlID0gbChcIl9fYWN0aXZlRWxlbWVudFwiKSwgbyA9IGwoXCJfX2FjdGl2ZVN0ZXBcIik7XG4gIGUgJiYgKEcoZSksIGRlKCksIGllKGUsIG8pKTtcbn1cbmZ1bmN0aW9uIGdlKGUsIG8pIHtcbiAgY29uc3QgaSA9IERhdGUubm93KCksIHAgPSBsKFwiX19hY3RpdmVTdGVwXCIpLCBuID0gbChcIl9fYWN0aXZlRWxlbWVudFwiKSB8fCBlLCBmID0gIW4gfHwgbiA9PT0gZSwgdyA9IGUuaWQgPT09IFwiZHJpdmVyLWR1bW15LWVsZW1lbnRcIiwgciA9IG4uaWQgPT09IFwiZHJpdmVyLWR1bW15LWVsZW1lbnRcIiwgdiA9IGEoXCJhbmltYXRlXCIpLCBzID0gby5vbkhpZ2hsaWdodFN0YXJ0ZWQgfHwgYShcIm9uSGlnaGxpZ2h0U3RhcnRlZFwiKSwgYyA9IChvID09IG51bGwgPyB2b2lkIDAgOiBvLm9uSGlnaGxpZ2h0ZWQpIHx8IGEoXCJvbkhpZ2hsaWdodGVkXCIpLCBkID0gKHAgPT0gbnVsbCA/IHZvaWQgMCA6IHAub25EZXNlbGVjdGVkKSB8fCBhKFwib25EZXNlbGVjdGVkXCIpLCBtID0gYSgpLCBnID0gbCgpO1xuICAhZiAmJiBkICYmIGQociA/IHZvaWQgMCA6IG4sIHAsIHtcbiAgICBjb25maWc6IG0sXG4gICAgc3RhdGU6IGdcbiAgfSksIHMgJiYgcyh3ID8gdm9pZCAwIDogZSwgbywge1xuICAgIGNvbmZpZzogbSxcbiAgICBzdGF0ZTogZ1xuICB9KTtcbiAgY29uc3QgdSA9ICFmICYmIHY7XG4gIGxldCBoID0gITE7XG4gIHhlKCksIGIoXCJwcmV2aW91c1N0ZXBcIiwgcCksIGIoXCJwcmV2aW91c0VsZW1lbnRcIiwgbiksIGIoXCJhY3RpdmVTdGVwXCIsIG8pLCBiKFwiYWN0aXZlRWxlbWVudFwiLCBlKTtcbiAgY29uc3QgUCA9ICgpID0+IHtcbiAgICBpZiAobChcIl9fdHJhbnNpdGlvbkNhbGxiYWNrXCIpICE9PSBQKVxuICAgICAgcmV0dXJuO1xuICAgIGNvbnN0IHggPSBEYXRlLm5vdygpIC0gaSwgeSA9IDQwMCAtIHggPD0gNDAwIC8gMjtcbiAgICBvLnBvcG92ZXIgJiYgeSAmJiAhaCAmJiB1ICYmIChYKGUsIG8pLCBoID0gITApLCBhKFwiYW5pbWF0ZVwiKSAmJiB4IDwgNDAwID8gbGUoeCwgNDAwLCBuLCBlKSA6IChHKGUpLCBjICYmIGModyA/IHZvaWQgMCA6IGUsIG8sIHtcbiAgICAgIGNvbmZpZzogYSgpLFxuICAgICAgc3RhdGU6IGwoKVxuICAgIH0pLCBiKFwiX190cmFuc2l0aW9uQ2FsbGJhY2tcIiwgdm9pZCAwKSwgYihcIl9fcHJldmlvdXNTdGVwXCIsIHApLCBiKFwiX19wcmV2aW91c0VsZW1lbnRcIiwgbiksIGIoXCJfX2FjdGl2ZVN0ZXBcIiwgbyksIGIoXCJfX2FjdGl2ZUVsZW1lbnRcIiwgZSkpLCB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKFApO1xuICB9O1xuICBiKFwiX190cmFuc2l0aW9uQ2FsbGJhY2tcIiwgUCksIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoUCksIFooZSksICF1ICYmIG8ucG9wb3ZlciAmJiBYKGUsIG8pLCBuLmNsYXNzTGlzdC5yZW1vdmUoXCJkcml2ZXItYWN0aXZlLWVsZW1lbnRcIiwgXCJkcml2ZXItbm8taW50ZXJhY3Rpb25cIiksIG4ucmVtb3ZlQXR0cmlidXRlKFwiYXJpYS1oYXNwb3B1cFwiKSwgbi5yZW1vdmVBdHRyaWJ1dGUoXCJhcmlhLWV4cGFuZGVkXCIpLCBuLnJlbW92ZUF0dHJpYnV0ZShcImFyaWEtY29udHJvbHNcIiksIGEoXCJkaXNhYmxlQWN0aXZlSW50ZXJhY3Rpb25cIikgJiYgZS5jbGFzc0xpc3QuYWRkKFwiZHJpdmVyLW5vLWludGVyYWN0aW9uXCIpLCBlLmNsYXNzTGlzdC5hZGQoXCJkcml2ZXItYWN0aXZlLWVsZW1lbnRcIiksIGUuc2V0QXR0cmlidXRlKFwiYXJpYS1oYXNwb3B1cFwiLCBcImRpYWxvZ1wiKSwgZS5zZXRBdHRyaWJ1dGUoXCJhcmlhLWV4cGFuZGVkXCIsIFwidHJ1ZVwiKSwgZS5zZXRBdHRyaWJ1dGUoXCJhcmlhLWNvbnRyb2xzXCIsIFwiZHJpdmVyLXBvcG92ZXItY29udGVudFwiKTtcbn1cbmZ1bmN0aW9uIHdlKCkge1xuICB2YXIgZTtcbiAgKGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRyaXZlci1kdW1teS1lbGVtZW50XCIpKSA9PSBudWxsIHx8IGUucmVtb3ZlKCksIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZHJpdmVyLWFjdGl2ZS1lbGVtZW50XCIpLmZvckVhY2goKG8pID0+IHtcbiAgICBvLmNsYXNzTGlzdC5yZW1vdmUoXCJkcml2ZXItYWN0aXZlLWVsZW1lbnRcIiwgXCJkcml2ZXItbm8taW50ZXJhY3Rpb25cIiksIG8ucmVtb3ZlQXR0cmlidXRlKFwiYXJpYS1oYXNwb3B1cFwiKSwgby5yZW1vdmVBdHRyaWJ1dGUoXCJhcmlhLWV4cGFuZGVkXCIpLCBvLnJlbW92ZUF0dHJpYnV0ZShcImFyaWEtY29udHJvbHNcIik7XG4gIH0pO1xufVxuZnVuY3Rpb24gSSgpIHtcbiAgY29uc3QgZSA9IGwoXCJfX3Jlc2l6ZVRpbWVvdXRcIik7XG4gIGUgJiYgd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lKGUpLCBiKFwiX19yZXNpemVUaW1lb3V0XCIsIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoaGUpKTtcbn1cbmZ1bmN0aW9uIG1lKGUpIHtcbiAgdmFyIHI7XG4gIGlmICghbChcImlzSW5pdGlhbGl6ZWRcIikgfHwgIShlLmtleSA9PT0gXCJUYWJcIiB8fCBlLmtleUNvZGUgPT09IDkpKVxuICAgIHJldHVybjtcbiAgY29uc3QgaSA9IGwoXCJfX2FjdGl2ZUVsZW1lbnRcIiksIHAgPSAociA9IGwoXCJwb3BvdmVyXCIpKSA9PSBudWxsID8gdm9pZCAwIDogci53cmFwcGVyLCBuID0gUShbXG4gICAgLi4ucCA/IFtwXSA6IFtdLFxuICAgIC4uLmkgPyBbaV0gOiBbXVxuICBdKSwgZiA9IG5bMF0sIHcgPSBuW24ubGVuZ3RoIC0gMV07XG4gIGlmIChlLnByZXZlbnREZWZhdWx0KCksIGUuc2hpZnRLZXkpIHtcbiAgICBjb25zdCB2ID0gbltuLmluZGV4T2YoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCkgLSAxXSB8fCB3O1xuICAgIHYgPT0gbnVsbCB8fCB2LmZvY3VzKCk7XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgdiA9IG5bbi5pbmRleE9mKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpICsgMV0gfHwgZjtcbiAgICB2ID09IG51bGwgfHwgdi5mb2N1cygpO1xuICB9XG59XG5mdW5jdGlvbiBlZShlKSB7XG4gIHZhciB0O1xuICAoKHQgPSBhKFwiYWxsb3dLZXlib2FyZENvbnRyb2xcIikpID09IG51bGwgfHwgdCkgJiYgKGUua2V5ID09PSBcIkVzY2FwZVwiID8gTChcImVzY2FwZVByZXNzXCIpIDogZS5rZXkgPT09IFwiQXJyb3dSaWdodFwiID8gTChcImFycm93UmlnaHRQcmVzc1wiKSA6IGUua2V5ID09PSBcIkFycm93TGVmdFwiICYmIEwoXCJhcnJvd0xlZnRQcmVzc1wiKSk7XG59XG5mdW5jdGlvbiB0ZShlLCBvLCB0KSB7XG4gIGNvbnN0IGkgPSAobiwgZikgPT4ge1xuICAgIGNvbnN0IHcgPSBuLnRhcmdldDtcbiAgICBlLmNvbnRhaW5zKHcpICYmICgoIXQgfHwgdCh3KSkgJiYgKG4ucHJldmVudERlZmF1bHQoKSwgbi5zdG9wUHJvcGFnYXRpb24oKSwgbi5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKSksIGYgPT0gbnVsbCB8fCBmKG4pKTtcbiAgfTtcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInBvaW50ZXJkb3duXCIsIGksICEwKSwgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBpLCAhMCksIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJwb2ludGVydXBcIiwgaSwgITApLCBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCBpLCAhMCksIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgXCJjbGlja1wiLFxuICAgIChuKSA9PiB7XG4gICAgICBpKG4sIG8pO1xuICAgIH0sXG4gICAgITBcbiAgKTtcbn1cbmZ1bmN0aW9uIHllKCkge1xuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIGVlLCAhMSksIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBtZSwgITEpLCB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCBJKSwgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgSSk7XG59XG5mdW5jdGlvbiBiZSgpIHtcbiAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCBlZSksIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIEkpLCB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCBJKTtcbn1cbmZ1bmN0aW9uIHhlKCkge1xuICBjb25zdCBlID0gbChcInBvcG92ZXJcIik7XG4gIGUgJiYgKGUud3JhcHBlci5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCIpO1xufVxuZnVuY3Rpb24gWChlLCBvKSB7XG4gIHZhciBDLCB5O1xuICBsZXQgdCA9IGwoXCJwb3BvdmVyXCIpO1xuICB0ICYmIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQodC53cmFwcGVyKSwgdCA9IFBlKCksIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodC53cmFwcGVyKTtcbiAgY29uc3Qge1xuICAgIHRpdGxlOiBpLFxuICAgIGRlc2NyaXB0aW9uOiBwLFxuICAgIHNob3dCdXR0b25zOiBuLFxuICAgIGRpc2FibGVCdXR0b25zOiBmLFxuICAgIHNob3dQcm9ncmVzczogdyxcbiAgICBuZXh0QnRuVGV4dDogciA9IGEoXCJuZXh0QnRuVGV4dFwiKSB8fCBcIk5leHQgJnJhcnI7XCIsXG4gICAgcHJldkJ0blRleHQ6IHYgPSBhKFwicHJldkJ0blRleHRcIikgfHwgXCImbGFycjsgUHJldmlvdXNcIixcbiAgICBwcm9ncmVzc1RleHQ6IHMgPSBhKFwicHJvZ3Jlc3NUZXh0XCIpIHx8IFwie2N1cnJlbnR9IG9mIHt0b3RhbH1cIlxuICB9ID0gby5wb3BvdmVyIHx8IHt9O1xuICB0Lm5leHRCdXR0b24uaW5uZXJIVE1MID0gciwgdC5wcmV2aW91c0J1dHRvbi5pbm5lckhUTUwgPSB2LCB0LnByb2dyZXNzLmlubmVySFRNTCA9IHMsIGkgPyAodC50aXRsZS5pbm5lckhUTUwgPSBpLCB0LnRpdGxlLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCIpIDogdC50aXRsZS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCIsIHAgPyAodC5kZXNjcmlwdGlvbi5pbm5lckhUTUwgPSBwLCB0LmRlc2NyaXB0aW9uLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCIpIDogdC5kZXNjcmlwdGlvbi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gIGNvbnN0IGMgPSBuIHx8IGEoXCJzaG93QnV0dG9uc1wiKSwgZCA9IHcgfHwgYShcInNob3dQcm9ncmVzc1wiKSB8fCAhMSwgbSA9IChjID09IG51bGwgPyB2b2lkIDAgOiBjLmluY2x1ZGVzKFwibmV4dFwiKSkgfHwgKGMgPT0gbnVsbCA/IHZvaWQgMCA6IGMuaW5jbHVkZXMoXCJwcmV2aW91c1wiKSkgfHwgZDtcbiAgdC5jbG9zZUJ1dHRvbi5zdHlsZS5kaXNwbGF5ID0gYy5pbmNsdWRlcyhcImNsb3NlXCIpID8gXCJibG9ja1wiIDogXCJub25lXCIsIG0gPyAodC5mb290ZXIuc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiLCB0LnByb2dyZXNzLnN0eWxlLmRpc3BsYXkgPSBkID8gXCJibG9ja1wiIDogXCJub25lXCIsIHQubmV4dEJ1dHRvbi5zdHlsZS5kaXNwbGF5ID0gYy5pbmNsdWRlcyhcIm5leHRcIikgPyBcImJsb2NrXCIgOiBcIm5vbmVcIiwgdC5wcmV2aW91c0J1dHRvbi5zdHlsZS5kaXNwbGF5ID0gYy5pbmNsdWRlcyhcInByZXZpb3VzXCIpID8gXCJibG9ja1wiIDogXCJub25lXCIpIDogdC5mb290ZXIuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICBjb25zdCBnID0gZiB8fCBhKFwiZGlzYWJsZUJ1dHRvbnNcIikgfHwgW107XG4gIGcgIT0gbnVsbCAmJiBnLmluY2x1ZGVzKFwibmV4dFwiKSAmJiAodC5uZXh0QnV0dG9uLmRpc2FibGVkID0gITAsIHQubmV4dEJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiZHJpdmVyLXBvcG92ZXItYnRuLWRpc2FibGVkXCIpKSwgZyAhPSBudWxsICYmIGcuaW5jbHVkZXMoXCJwcmV2aW91c1wiKSAmJiAodC5wcmV2aW91c0J1dHRvbi5kaXNhYmxlZCA9ICEwLCB0LnByZXZpb3VzQnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJkcml2ZXItcG9wb3Zlci1idG4tZGlzYWJsZWRcIikpLCBnICE9IG51bGwgJiYgZy5pbmNsdWRlcyhcImNsb3NlXCIpICYmICh0LmNsb3NlQnV0dG9uLmRpc2FibGVkID0gITAsIHQuY2xvc2VCdXR0b24uY2xhc3NMaXN0LmFkZChcImRyaXZlci1wb3BvdmVyLWJ0bi1kaXNhYmxlZFwiKSk7XG4gIGNvbnN0IHUgPSB0LndyYXBwZXI7XG4gIHUuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIiwgdS5zdHlsZS5sZWZ0ID0gXCJcIiwgdS5zdHlsZS50b3AgPSBcIlwiLCB1LnN0eWxlLmJvdHRvbSA9IFwiXCIsIHUuc3R5bGUucmlnaHQgPSBcIlwiLCB1LmlkID0gXCJkcml2ZXItcG9wb3Zlci1jb250ZW50XCIsIHUuc2V0QXR0cmlidXRlKFwicm9sZVwiLCBcImRpYWxvZ1wiKSwgdS5zZXRBdHRyaWJ1dGUoXCJhcmlhLWxhYmVsbGVkYnlcIiwgXCJkcml2ZXItcG9wb3Zlci10aXRsZVwiKSwgdS5zZXRBdHRyaWJ1dGUoXCJhcmlhLWRlc2NyaWJlZGJ5XCIsIFwiZHJpdmVyLXBvcG92ZXItZGVzY3JpcHRpb25cIik7XG4gIGNvbnN0IGggPSB0LmFycm93O1xuICBoLmNsYXNzTmFtZSA9IFwiZHJpdmVyLXBvcG92ZXItYXJyb3dcIjtcbiAgY29uc3QgUCA9ICgoQyA9IG8ucG9wb3ZlcikgPT0gbnVsbCA/IHZvaWQgMCA6IEMucG9wb3ZlckNsYXNzKSB8fCBhKFwicG9wb3ZlckNsYXNzXCIpIHx8IFwiXCI7XG4gIHUuY2xhc3NOYW1lID0gYGRyaXZlci1wb3BvdmVyICR7UH1gLnRyaW0oKSwgdGUoXG4gICAgdC53cmFwcGVyLFxuICAgIChrKSA9PiB7XG4gICAgICB2YXIgJCwgQiwgTTtcbiAgICAgIGNvbnN0IFQgPSBrLnRhcmdldCwgRSA9ICgoJCA9IG8ucG9wb3ZlcikgPT0gbnVsbCA/IHZvaWQgMCA6ICQub25OZXh0Q2xpY2spIHx8IGEoXCJvbk5leHRDbGlja1wiKSwgQSA9ICgoQiA9IG8ucG9wb3ZlcikgPT0gbnVsbCA/IHZvaWQgMCA6IEIub25QcmV2Q2xpY2spIHx8IGEoXCJvblByZXZDbGlja1wiKSwgSCA9ICgoTSA9IG8ucG9wb3ZlcikgPT0gbnVsbCA/IHZvaWQgMCA6IE0ub25DbG9zZUNsaWNrKSB8fCBhKFwib25DbG9zZUNsaWNrXCIpO1xuICAgICAgaWYgKFQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZHJpdmVyLXBvcG92ZXItbmV4dC1idG5cIikpXG4gICAgICAgIHJldHVybiBFID8gRShlLCBvLCB7XG4gICAgICAgICAgY29uZmlnOiBhKCksXG4gICAgICAgICAgc3RhdGU6IGwoKVxuICAgICAgICB9KSA6IEwoXCJuZXh0Q2xpY2tcIik7XG4gICAgICBpZiAoVC5jbGFzc0xpc3QuY29udGFpbnMoXCJkcml2ZXItcG9wb3Zlci1wcmV2LWJ0blwiKSlcbiAgICAgICAgcmV0dXJuIEEgPyBBKGUsIG8sIHtcbiAgICAgICAgICBjb25maWc6IGEoKSxcbiAgICAgICAgICBzdGF0ZTogbCgpXG4gICAgICAgIH0pIDogTChcInByZXZDbGlja1wiKTtcbiAgICAgIGlmIChULmNsYXNzTGlzdC5jb250YWlucyhcImRyaXZlci1wb3BvdmVyLWNsb3NlLWJ0blwiKSlcbiAgICAgICAgcmV0dXJuIEggPyBIKGUsIG8sIHtcbiAgICAgICAgICBjb25maWc6IGEoKSxcbiAgICAgICAgICBzdGF0ZTogbCgpXG4gICAgICAgIH0pIDogTChcImNsb3NlQ2xpY2tcIik7XG4gICAgfSxcbiAgICAoaykgPT4gISh0ICE9IG51bGwgJiYgdC5kZXNjcmlwdGlvbi5jb250YWlucyhrKSkgJiYgISh0ICE9IG51bGwgJiYgdC50aXRsZS5jb250YWlucyhrKSkgJiYgdHlwZW9mIGsuY2xhc3NOYW1lID09IFwic3RyaW5nXCIgJiYgay5jbGFzc05hbWUuaW5jbHVkZXMoXCJkcml2ZXItcG9wb3ZlclwiKVxuICApLCBiKFwicG9wb3ZlclwiLCB0KTtcbiAgY29uc3QgUyA9ICgoeSA9IG8ucG9wb3ZlcikgPT0gbnVsbCA/IHZvaWQgMCA6IHkub25Qb3BvdmVyUmVuZGVyKSB8fCBhKFwib25Qb3BvdmVyUmVuZGVyXCIpO1xuICBTICYmIFModCwge1xuICAgIGNvbmZpZzogYSgpLFxuICAgIHN0YXRlOiBsKClcbiAgfSksIGllKGUsIG8pLCBaKHUpO1xuICBjb25zdCBfID0gZS5jbGFzc0xpc3QuY29udGFpbnMoXCJkcml2ZXItZHVtbXktZWxlbWVudFwiKSwgeCA9IFEoW3UsIC4uLl8gPyBbXSA6IFtlXV0pO1xuICB4Lmxlbmd0aCA+IDAgJiYgeFswXS5mb2N1cygpO1xufVxuZnVuY3Rpb24gb2UoKSB7XG4gIGNvbnN0IGUgPSBsKFwicG9wb3ZlclwiKTtcbiAgaWYgKCEoZSAhPSBudWxsICYmIGUud3JhcHBlcikpXG4gICAgcmV0dXJuO1xuICBjb25zdCBvID0gZS53cmFwcGVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLCB0ID0gYShcInN0YWdlUGFkZGluZ1wiKSB8fCAwLCBpID0gYShcInBvcG92ZXJPZmZzZXRcIikgfHwgMDtcbiAgcmV0dXJuIHtcbiAgICB3aWR0aDogby53aWR0aCArIHQgKyBpLFxuICAgIGhlaWdodDogby5oZWlnaHQgKyB0ICsgaSxcbiAgICByZWFsV2lkdGg6IG8ud2lkdGgsXG4gICAgcmVhbEhlaWdodDogby5oZWlnaHRcbiAgfTtcbn1cbmZ1bmN0aW9uIFkoZSwgbykge1xuICBjb25zdCB7IGVsZW1lbnREaW1lbnNpb25zOiB0LCBwb3BvdmVyRGltZW5zaW9uczogaSwgcG9wb3ZlclBhZGRpbmc6IHAsIHBvcG92ZXJBcnJvd0RpbWVuc2lvbnM6IG4gfSA9IG87XG4gIHJldHVybiBlID09PSBcInN0YXJ0XCIgPyBNYXRoLm1heChcbiAgICBNYXRoLm1pbihcbiAgICAgIHQudG9wIC0gcCxcbiAgICAgIHdpbmRvdy5pbm5lckhlaWdodCAtIGkucmVhbEhlaWdodCAtIG4ud2lkdGhcbiAgICApLFxuICAgIG4ud2lkdGhcbiAgKSA6IGUgPT09IFwiZW5kXCIgPyBNYXRoLm1heChcbiAgICBNYXRoLm1pbihcbiAgICAgIHQudG9wIC0gKGkgPT0gbnVsbCA/IHZvaWQgMCA6IGkucmVhbEhlaWdodCkgKyB0LmhlaWdodCArIHAsXG4gICAgICB3aW5kb3cuaW5uZXJIZWlnaHQgLSAoaSA9PSBudWxsID8gdm9pZCAwIDogaS5yZWFsSGVpZ2h0KSAtIG4ud2lkdGhcbiAgICApLFxuICAgIG4ud2lkdGhcbiAgKSA6IGUgPT09IFwiY2VudGVyXCIgPyBNYXRoLm1heChcbiAgICBNYXRoLm1pbihcbiAgICAgIHQudG9wICsgdC5oZWlnaHQgLyAyIC0gKGkgPT0gbnVsbCA/IHZvaWQgMCA6IGkucmVhbEhlaWdodCkgLyAyLFxuICAgICAgd2luZG93LmlubmVySGVpZ2h0IC0gKGkgPT0gbnVsbCA/IHZvaWQgMCA6IGkucmVhbEhlaWdodCkgLSBuLndpZHRoXG4gICAgKSxcbiAgICBuLndpZHRoXG4gICkgOiAwO1xufVxuZnVuY3Rpb24gaihlLCBvKSB7XG4gIGNvbnN0IHsgZWxlbWVudERpbWVuc2lvbnM6IHQsIHBvcG92ZXJEaW1lbnNpb25zOiBpLCBwb3BvdmVyUGFkZGluZzogcCwgcG9wb3ZlckFycm93RGltZW5zaW9uczogbiB9ID0gbztcbiAgcmV0dXJuIGUgPT09IFwic3RhcnRcIiA/IE1hdGgubWF4KFxuICAgIE1hdGgubWluKFxuICAgICAgdC5sZWZ0IC0gcCxcbiAgICAgIHdpbmRvdy5pbm5lcldpZHRoIC0gaS5yZWFsV2lkdGggLSBuLndpZHRoXG4gICAgKSxcbiAgICBuLndpZHRoXG4gICkgOiBlID09PSBcImVuZFwiID8gTWF0aC5tYXgoXG4gICAgTWF0aC5taW4oXG4gICAgICB0LmxlZnQgLSAoaSA9PSBudWxsID8gdm9pZCAwIDogaS5yZWFsV2lkdGgpICsgdC53aWR0aCArIHAsXG4gICAgICB3aW5kb3cuaW5uZXJXaWR0aCAtIChpID09IG51bGwgPyB2b2lkIDAgOiBpLnJlYWxXaWR0aCkgLSBuLndpZHRoXG4gICAgKSxcbiAgICBuLndpZHRoXG4gICkgOiBlID09PSBcImNlbnRlclwiID8gTWF0aC5tYXgoXG4gICAgTWF0aC5taW4oXG4gICAgICB0LmxlZnQgKyB0LndpZHRoIC8gMiAtIChpID09IG51bGwgPyB2b2lkIDAgOiBpLnJlYWxXaWR0aCkgLyAyLFxuICAgICAgd2luZG93LmlubmVyV2lkdGggLSAoaSA9PSBudWxsID8gdm9pZCAwIDogaS5yZWFsV2lkdGgpIC0gbi53aWR0aFxuICAgICksXG4gICAgbi53aWR0aFxuICApIDogMDtcbn1cbmZ1bmN0aW9uIGllKGUsIG8pIHtcbiAgY29uc3QgdCA9IGwoXCJwb3BvdmVyXCIpO1xuICBpZiAoIXQpXG4gICAgcmV0dXJuO1xuICBjb25zdCB7IGFsaWduOiBpID0gXCJzdGFydFwiLCBzaWRlOiBwID0gXCJsZWZ0XCIgfSA9IChvID09IG51bGwgPyB2b2lkIDAgOiBvLnBvcG92ZXIpIHx8IHt9LCBuID0gaSwgZiA9IGUuaWQgPT09IFwiZHJpdmVyLWR1bW15LWVsZW1lbnRcIiA/IFwib3ZlclwiIDogcCwgdyA9IGEoXCJzdGFnZVBhZGRpbmdcIikgfHwgMCwgciA9IG9lKCksIHYgPSB0LmFycm93LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLCBzID0gZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSwgYyA9IHMudG9wIC0gci5oZWlnaHQ7XG4gIGxldCBkID0gYyA+PSAwO1xuICBjb25zdCBtID0gd2luZG93LmlubmVySGVpZ2h0IC0gKHMuYm90dG9tICsgci5oZWlnaHQpO1xuICBsZXQgZyA9IG0gPj0gMDtcbiAgY29uc3QgdSA9IHMubGVmdCAtIHIud2lkdGg7XG4gIGxldCBoID0gdSA+PSAwO1xuICBjb25zdCBQID0gd2luZG93LmlubmVyV2lkdGggLSAocy5yaWdodCArIHIud2lkdGgpO1xuICBsZXQgUyA9IFAgPj0gMDtcbiAgY29uc3QgXyA9ICFkICYmICFnICYmICFoICYmICFTO1xuICBsZXQgeCA9IGY7XG4gIGlmIChmID09PSBcInRvcFwiICYmIGQgPyBTID0gaCA9IGcgPSAhMSA6IGYgPT09IFwiYm90dG9tXCIgJiYgZyA/IFMgPSBoID0gZCA9ICExIDogZiA9PT0gXCJsZWZ0XCIgJiYgaCA/IFMgPSBkID0gZyA9ICExIDogZiA9PT0gXCJyaWdodFwiICYmIFMgJiYgKGggPSBkID0gZyA9ICExKSwgZiA9PT0gXCJvdmVyXCIpIHtcbiAgICBjb25zdCBDID0gd2luZG93LmlubmVyV2lkdGggLyAyIC0gci5yZWFsV2lkdGggLyAyLCB5ID0gd2luZG93LmlubmVySGVpZ2h0IC8gMiAtIHIucmVhbEhlaWdodCAvIDI7XG4gICAgdC53cmFwcGVyLnN0eWxlLmxlZnQgPSBgJHtDfXB4YCwgdC53cmFwcGVyLnN0eWxlLnJpZ2h0ID0gXCJhdXRvXCIsIHQud3JhcHBlci5zdHlsZS50b3AgPSBgJHt5fXB4YCwgdC53cmFwcGVyLnN0eWxlLmJvdHRvbSA9IFwiYXV0b1wiO1xuICB9IGVsc2UgaWYgKF8pIHtcbiAgICBjb25zdCBDID0gd2luZG93LmlubmVyV2lkdGggLyAyIC0gKHIgPT0gbnVsbCA/IHZvaWQgMCA6IHIucmVhbFdpZHRoKSAvIDIsIHkgPSAxMDtcbiAgICB0LndyYXBwZXIuc3R5bGUubGVmdCA9IGAke0N9cHhgLCB0LndyYXBwZXIuc3R5bGUucmlnaHQgPSBcImF1dG9cIiwgdC53cmFwcGVyLnN0eWxlLmJvdHRvbSA9IGAke3l9cHhgLCB0LndyYXBwZXIuc3R5bGUudG9wID0gXCJhdXRvXCI7XG4gIH0gZWxzZSBpZiAoaCkge1xuICAgIGNvbnN0IEMgPSBNYXRoLm1pbihcbiAgICAgIHUsXG4gICAgICB3aW5kb3cuaW5uZXJXaWR0aCAtIChyID09IG51bGwgPyB2b2lkIDAgOiByLnJlYWxXaWR0aCkgLSB2LndpZHRoXG4gICAgKSwgeSA9IFkobiwge1xuICAgICAgZWxlbWVudERpbWVuc2lvbnM6IHMsXG4gICAgICBwb3BvdmVyRGltZW5zaW9uczogcixcbiAgICAgIHBvcG92ZXJQYWRkaW5nOiB3LFxuICAgICAgcG9wb3ZlckFycm93RGltZW5zaW9uczogdlxuICAgIH0pO1xuICAgIHQud3JhcHBlci5zdHlsZS5sZWZ0ID0gYCR7Q31weGAsIHQud3JhcHBlci5zdHlsZS50b3AgPSBgJHt5fXB4YCwgdC53cmFwcGVyLnN0eWxlLmJvdHRvbSA9IFwiYXV0b1wiLCB0LndyYXBwZXIuc3R5bGUucmlnaHQgPSBcImF1dG9cIiwgeCA9IFwibGVmdFwiO1xuICB9IGVsc2UgaWYgKFMpIHtcbiAgICBjb25zdCBDID0gTWF0aC5taW4oXG4gICAgICBQLFxuICAgICAgd2luZG93LmlubmVyV2lkdGggLSAociA9PSBudWxsID8gdm9pZCAwIDogci5yZWFsV2lkdGgpIC0gdi53aWR0aFxuICAgICksIHkgPSBZKG4sIHtcbiAgICAgIGVsZW1lbnREaW1lbnNpb25zOiBzLFxuICAgICAgcG9wb3ZlckRpbWVuc2lvbnM6IHIsXG4gICAgICBwb3BvdmVyUGFkZGluZzogdyxcbiAgICAgIHBvcG92ZXJBcnJvd0RpbWVuc2lvbnM6IHZcbiAgICB9KTtcbiAgICB0LndyYXBwZXIuc3R5bGUucmlnaHQgPSBgJHtDfXB4YCwgdC53cmFwcGVyLnN0eWxlLnRvcCA9IGAke3l9cHhgLCB0LndyYXBwZXIuc3R5bGUuYm90dG9tID0gXCJhdXRvXCIsIHQud3JhcHBlci5zdHlsZS5sZWZ0ID0gXCJhdXRvXCIsIHggPSBcInJpZ2h0XCI7XG4gIH0gZWxzZSBpZiAoZCkge1xuICAgIGNvbnN0IEMgPSBNYXRoLm1pbihcbiAgICAgIGMsXG4gICAgICB3aW5kb3cuaW5uZXJIZWlnaHQgLSByLnJlYWxIZWlnaHQgLSB2LndpZHRoXG4gICAgKTtcbiAgICBsZXQgeSA9IGoobiwge1xuICAgICAgZWxlbWVudERpbWVuc2lvbnM6IHMsXG4gICAgICBwb3BvdmVyRGltZW5zaW9uczogcixcbiAgICAgIHBvcG92ZXJQYWRkaW5nOiB3LFxuICAgICAgcG9wb3ZlckFycm93RGltZW5zaW9uczogdlxuICAgIH0pO1xuICAgIHQud3JhcHBlci5zdHlsZS50b3AgPSBgJHtDfXB4YCwgdC53cmFwcGVyLnN0eWxlLmxlZnQgPSBgJHt5fXB4YCwgdC53cmFwcGVyLnN0eWxlLmJvdHRvbSA9IFwiYXV0b1wiLCB0LndyYXBwZXIuc3R5bGUucmlnaHQgPSBcImF1dG9cIiwgeCA9IFwidG9wXCI7XG4gIH0gZWxzZSBpZiAoZykge1xuICAgIGNvbnN0IEMgPSBNYXRoLm1pbihcbiAgICAgIG0sXG4gICAgICB3aW5kb3cuaW5uZXJIZWlnaHQgLSAociA9PSBudWxsID8gdm9pZCAwIDogci5yZWFsSGVpZ2h0KSAtIHYud2lkdGhcbiAgICApO1xuICAgIGxldCB5ID0gaihuLCB7XG4gICAgICBlbGVtZW50RGltZW5zaW9uczogcyxcbiAgICAgIHBvcG92ZXJEaW1lbnNpb25zOiByLFxuICAgICAgcG9wb3ZlclBhZGRpbmc6IHcsXG4gICAgICBwb3BvdmVyQXJyb3dEaW1lbnNpb25zOiB2XG4gICAgfSk7XG4gICAgdC53cmFwcGVyLnN0eWxlLmxlZnQgPSBgJHt5fXB4YCwgdC53cmFwcGVyLnN0eWxlLmJvdHRvbSA9IGAke0N9cHhgLCB0LndyYXBwZXIuc3R5bGUudG9wID0gXCJhdXRvXCIsIHQud3JhcHBlci5zdHlsZS5yaWdodCA9IFwiYXV0b1wiLCB4ID0gXCJib3R0b21cIjtcbiAgfVxuICBfID8gdC5hcnJvdy5jbGFzc0xpc3QuYWRkKFwiZHJpdmVyLXBvcG92ZXItYXJyb3ctbm9uZVwiKSA6IENlKG4sIHgsIGUpO1xufVxuZnVuY3Rpb24gQ2UoZSwgbywgdCkge1xuICBjb25zdCBpID0gbChcInBvcG92ZXJcIik7XG4gIGlmICghaSlcbiAgICByZXR1cm47XG4gIGNvbnN0IHAgPSB0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLCBuID0gb2UoKSwgZiA9IGkuYXJyb3csIHcgPSBuLndpZHRoLCByID0gd2luZG93LmlubmVyV2lkdGgsIHYgPSBwLndpZHRoLCBzID0gcC5sZWZ0LCBjID0gbi5oZWlnaHQsIGQgPSB3aW5kb3cuaW5uZXJIZWlnaHQsIG0gPSBwLnRvcCwgZyA9IHAuaGVpZ2h0O1xuICBmLmNsYXNzTmFtZSA9IFwiZHJpdmVyLXBvcG92ZXItYXJyb3dcIjtcbiAgbGV0IHUgPSBvLCBoID0gZTtcbiAgbyA9PT0gXCJ0b3BcIiA/IChzICsgdiA8PSAwID8gKHUgPSBcInJpZ2h0XCIsIGggPSBcImVuZFwiKSA6IHMgKyB2IC0gdyA8PSAwICYmICh1ID0gXCJ0b3BcIiwgaCA9IFwic3RhcnRcIiksIHMgPj0gciA/ICh1ID0gXCJsZWZ0XCIsIGggPSBcImVuZFwiKSA6IHMgKyB3ID49IHIgJiYgKHUgPSBcInRvcFwiLCBoID0gXCJlbmRcIikpIDogbyA9PT0gXCJib3R0b21cIiA/IChzICsgdiA8PSAwID8gKHUgPSBcInJpZ2h0XCIsIGggPSBcInN0YXJ0XCIpIDogcyArIHYgLSB3IDw9IDAgJiYgKHUgPSBcImJvdHRvbVwiLCBoID0gXCJzdGFydFwiKSwgcyA+PSByID8gKHUgPSBcImxlZnRcIiwgaCA9IFwic3RhcnRcIikgOiBzICsgdyA+PSByICYmICh1ID0gXCJib3R0b21cIiwgaCA9IFwiZW5kXCIpKSA6IG8gPT09IFwibGVmdFwiID8gKG0gKyBnIDw9IDAgPyAodSA9IFwiYm90dG9tXCIsIGggPSBcImVuZFwiKSA6IG0gKyBnIC0gYyA8PSAwICYmICh1ID0gXCJsZWZ0XCIsIGggPSBcInN0YXJ0XCIpLCBtID49IGQgPyAodSA9IFwidG9wXCIsIGggPSBcImVuZFwiKSA6IG0gKyBjID49IGQgJiYgKHUgPSBcImxlZnRcIiwgaCA9IFwiZW5kXCIpKSA6IG8gPT09IFwicmlnaHRcIiAmJiAobSArIGcgPD0gMCA/ICh1ID0gXCJib3R0b21cIiwgaCA9IFwic3RhcnRcIikgOiBtICsgZyAtIGMgPD0gMCAmJiAodSA9IFwicmlnaHRcIiwgaCA9IFwic3RhcnRcIiksIG0gPj0gZCA/ICh1ID0gXCJ0b3BcIiwgaCA9IFwic3RhcnRcIikgOiBtICsgYyA+PSBkICYmICh1ID0gXCJyaWdodFwiLCBoID0gXCJlbmRcIikpLCB1ID8gKGYuY2xhc3NMaXN0LmFkZChgZHJpdmVyLXBvcG92ZXItYXJyb3ctc2lkZS0ke3V9YCksIGYuY2xhc3NMaXN0LmFkZChgZHJpdmVyLXBvcG92ZXItYXJyb3ctYWxpZ24tJHtofWApKSA6IGYuY2xhc3NMaXN0LmFkZChcImRyaXZlci1wb3BvdmVyLWFycm93LW5vbmVcIik7XG59XG5mdW5jdGlvbiBQZSgpIHtcbiAgY29uc3QgZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGUuY2xhc3NMaXN0LmFkZChcImRyaXZlci1wb3BvdmVyXCIpO1xuICBjb25zdCBvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgby5jbGFzc0xpc3QuYWRkKFwiZHJpdmVyLXBvcG92ZXItYXJyb3dcIik7XG4gIGNvbnN0IHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaGVhZGVyXCIpO1xuICB0LmlkID0gXCJkcml2ZXItcG9wb3Zlci10aXRsZVwiLCB0LmNsYXNzTGlzdC5hZGQoXCJkcml2ZXItcG9wb3Zlci10aXRsZVwiKSwgdC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCIsIHQuaW5uZXJUZXh0ID0gXCJQb3BvdmVyIFRpdGxlXCI7XG4gIGNvbnN0IGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBpLmlkID0gXCJkcml2ZXItcG9wb3Zlci1kZXNjcmlwdGlvblwiLCBpLmNsYXNzTGlzdC5hZGQoXCJkcml2ZXItcG9wb3Zlci1kZXNjcmlwdGlvblwiKSwgaS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCIsIGkuaW5uZXJUZXh0ID0gXCJQb3BvdmVyIGRlc2NyaXB0aW9uIGlzIGhlcmVcIjtcbiAgY29uc3QgcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gIHAudHlwZSA9IFwiYnV0dG9uXCIsIHAuY2xhc3NMaXN0LmFkZChcImRyaXZlci1wb3BvdmVyLWNsb3NlLWJ0blwiKSwgcC5zZXRBdHRyaWJ1dGUoXCJhcmlhLWxhYmVsXCIsIFwiQ2xvc2VcIiksIHAuaW5uZXJIVE1MID0gXCImdGltZXM7XCI7XG4gIGNvbnN0IG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZm9vdGVyXCIpO1xuICBuLmNsYXNzTGlzdC5hZGQoXCJkcml2ZXItcG9wb3Zlci1mb290ZXJcIik7XG4gIGNvbnN0IGYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgZi5jbGFzc0xpc3QuYWRkKFwiZHJpdmVyLXBvcG92ZXItcHJvZ3Jlc3MtdGV4dFwiKSwgZi5pbm5lclRleHQgPSBcIlwiO1xuICBjb25zdCB3ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gIHcuY2xhc3NMaXN0LmFkZChcImRyaXZlci1wb3BvdmVyLW5hdmlnYXRpb24tYnRuc1wiKTtcbiAgY29uc3QgciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gIHIudHlwZSA9IFwiYnV0dG9uXCIsIHIuY2xhc3NMaXN0LmFkZChcImRyaXZlci1wb3BvdmVyLXByZXYtYnRuXCIpLCByLmlubmVySFRNTCA9IFwiJmxhcnI7IFByZXZpb3VzXCI7XG4gIGNvbnN0IHYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICByZXR1cm4gdi50eXBlID0gXCJidXR0b25cIiwgdi5jbGFzc0xpc3QuYWRkKFwiZHJpdmVyLXBvcG92ZXItbmV4dC1idG5cIiksIHYuaW5uZXJIVE1MID0gXCJOZXh0ICZyYXJyO1wiLCB3LmFwcGVuZENoaWxkKHIpLCB3LmFwcGVuZENoaWxkKHYpLCBuLmFwcGVuZENoaWxkKGYpLCBuLmFwcGVuZENoaWxkKHcpLCBlLmFwcGVuZENoaWxkKHApLCBlLmFwcGVuZENoaWxkKG8pLCBlLmFwcGVuZENoaWxkKHQpLCBlLmFwcGVuZENoaWxkKGkpLCBlLmFwcGVuZENoaWxkKG4pLCB7XG4gICAgd3JhcHBlcjogZSxcbiAgICBhcnJvdzogbyxcbiAgICB0aXRsZTogdCxcbiAgICBkZXNjcmlwdGlvbjogaSxcbiAgICBmb290ZXI6IG4sXG4gICAgcHJldmlvdXNCdXR0b246IHIsXG4gICAgbmV4dEJ1dHRvbjogdixcbiAgICBjbG9zZUJ1dHRvbjogcCxcbiAgICBmb290ZXJCdXR0b25zOiB3LFxuICAgIHByb2dyZXNzOiBmXG4gIH07XG59XG5mdW5jdGlvbiBTZSgpIHtcbiAgdmFyIG87XG4gIGNvbnN0IGUgPSBsKFwicG9wb3ZlclwiKTtcbiAgZSAmJiAoKG8gPSBlLndyYXBwZXIucGFyZW50RWxlbWVudCkgPT0gbnVsbCB8fCBvLnJlbW92ZUNoaWxkKGUud3JhcHBlcikpO1xufVxuZnVuY3Rpb24ga2UoZSA9IHt9KSB7XG4gIEQoZSk7XG4gIGZ1bmN0aW9uIG8oKSB7XG4gICAgYShcImFsbG93Q2xvc2VcIikgJiYgdigpO1xuICB9XG4gIGZ1bmN0aW9uIHQoKSB7XG4gICAgY29uc3QgcyA9IGwoXCJhY3RpdmVJbmRleFwiKSwgYyA9IGEoXCJzdGVwc1wiKSB8fCBbXTtcbiAgICBpZiAodHlwZW9mIHMgPT0gXCJ1bmRlZmluZWRcIilcbiAgICAgIHJldHVybjtcbiAgICBjb25zdCBkID0gcyArIDE7XG4gICAgY1tkXSA/IHIoZCkgOiB2KCk7XG4gIH1cbiAgZnVuY3Rpb24gaSgpIHtcbiAgICBjb25zdCBzID0gbChcImFjdGl2ZUluZGV4XCIpLCBjID0gYShcInN0ZXBzXCIpIHx8IFtdO1xuICAgIGlmICh0eXBlb2YgcyA9PSBcInVuZGVmaW5lZFwiKVxuICAgICAgcmV0dXJuO1xuICAgIGNvbnN0IGQgPSBzIC0gMTtcbiAgICBjW2RdID8gcihkKSA6IHYoKTtcbiAgfVxuICBmdW5jdGlvbiBwKHMpIHtcbiAgICAoYShcInN0ZXBzXCIpIHx8IFtdKVtzXSA/IHIocykgOiB2KCk7XG4gIH1cbiAgZnVuY3Rpb24gbigpIHtcbiAgICB2YXIgaDtcbiAgICBpZiAobChcIl9fdHJhbnNpdGlvbkNhbGxiYWNrXCIpKVxuICAgICAgcmV0dXJuO1xuICAgIGNvbnN0IGMgPSBsKFwiYWN0aXZlSW5kZXhcIiksIGQgPSBsKFwiX19hY3RpdmVTdGVwXCIpLCBtID0gbChcIl9fYWN0aXZlRWxlbWVudFwiKTtcbiAgICBpZiAodHlwZW9mIGMgPT0gXCJ1bmRlZmluZWRcIiB8fCB0eXBlb2YgZCA9PSBcInVuZGVmaW5lZFwiIHx8IHR5cGVvZiBsKFwiYWN0aXZlSW5kZXhcIikgPT0gXCJ1bmRlZmluZWRcIilcbiAgICAgIHJldHVybjtcbiAgICBjb25zdCB1ID0gKChoID0gZC5wb3BvdmVyKSA9PSBudWxsID8gdm9pZCAwIDogaC5vblByZXZDbGljaykgfHwgYShcIm9uUHJldkNsaWNrXCIpO1xuICAgIGlmICh1KVxuICAgICAgcmV0dXJuIHUobSwgZCwge1xuICAgICAgICBjb25maWc6IGEoKSxcbiAgICAgICAgc3RhdGU6IGwoKVxuICAgICAgfSk7XG4gICAgaSgpO1xuICB9XG4gIGZ1bmN0aW9uIGYoKSB7XG4gICAgdmFyIHU7XG4gICAgaWYgKGwoXCJfX3RyYW5zaXRpb25DYWxsYmFja1wiKSlcbiAgICAgIHJldHVybjtcbiAgICBjb25zdCBjID0gbChcImFjdGl2ZUluZGV4XCIpLCBkID0gbChcIl9fYWN0aXZlU3RlcFwiKSwgbSA9IGwoXCJfX2FjdGl2ZUVsZW1lbnRcIik7XG4gICAgaWYgKHR5cGVvZiBjID09IFwidW5kZWZpbmVkXCIgfHwgdHlwZW9mIGQgPT0gXCJ1bmRlZmluZWRcIilcbiAgICAgIHJldHVybjtcbiAgICBjb25zdCBnID0gKCh1ID0gZC5wb3BvdmVyKSA9PSBudWxsID8gdm9pZCAwIDogdS5vbk5leHRDbGljaykgfHwgYShcIm9uTmV4dENsaWNrXCIpO1xuICAgIGlmIChnKVxuICAgICAgcmV0dXJuIGcobSwgZCwge1xuICAgICAgICBjb25maWc6IGEoKSxcbiAgICAgICAgc3RhdGU6IGwoKVxuICAgICAgfSk7XG4gICAgdCgpO1xuICB9XG4gIGZ1bmN0aW9uIHcoKSB7XG4gICAgbChcImlzSW5pdGlhbGl6ZWRcIikgfHwgKGIoXCJpc0luaXRpYWxpemVkXCIsICEwKSwgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKFwiZHJpdmVyLWFjdGl2ZVwiLCBhKFwiYW5pbWF0ZVwiKSA/IFwiZHJpdmVyLWZhZGVcIiA6IFwiZHJpdmVyLXNpbXBsZVwiKSwgeWUoKSwgTihcIm92ZXJsYXlDbGlja1wiLCBvKSwgTihcImVzY2FwZVByZXNzXCIsIG8pLCBOKFwiYXJyb3dMZWZ0UHJlc3NcIiwgbiksIE4oXCJhcnJvd1JpZ2h0UHJlc3NcIiwgZikpO1xuICB9XG4gIGZ1bmN0aW9uIHIocyA9IDApIHtcbiAgICB2YXIgRSwgQSwgSCwgJCwgQiwgTSwgeiwgcTtcbiAgICBjb25zdCBjID0gYShcInN0ZXBzXCIpO1xuICAgIGlmICghYykge1xuICAgICAgY29uc29sZS5lcnJvcihcIk5vIHN0ZXBzIHRvIGRyaXZlIHRocm91Z2hcIiksIHYoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKCFjW3NdKSB7XG4gICAgICB2KCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGIoXCJfX2FjdGl2ZU9uRGVzdHJveWVkXCIsIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpLCBiKFwiYWN0aXZlSW5kZXhcIiwgcyk7XG4gICAgY29uc3QgZCA9IGNbc10sIG0gPSBjW3MgKyAxXSwgZyA9IGNbcyAtIDFdLCB1ID0gKChFID0gZC5wb3BvdmVyKSA9PSBudWxsID8gdm9pZCAwIDogRS5kb25lQnRuVGV4dCkgfHwgYShcImRvbmVCdG5UZXh0XCIpIHx8IFwiRG9uZVwiLCBoID0gYShcImFsbG93Q2xvc2VcIiksIFAgPSB0eXBlb2YgKChBID0gZC5wb3BvdmVyKSA9PSBudWxsID8gdm9pZCAwIDogQS5zaG93UHJvZ3Jlc3MpICE9IFwidW5kZWZpbmVkXCIgPyAoSCA9IGQucG9wb3ZlcikgPT0gbnVsbCA/IHZvaWQgMCA6IEguc2hvd1Byb2dyZXNzIDogYShcInNob3dQcm9ncmVzc1wiKSwgXyA9ICgoKCQgPSBkLnBvcG92ZXIpID09IG51bGwgPyB2b2lkIDAgOiAkLnByb2dyZXNzVGV4dCkgfHwgYShcInByb2dyZXNzVGV4dFwiKSB8fCBcInt7Y3VycmVudH19IG9mIHt7dG90YWx9fVwiKS5yZXBsYWNlKFwie3tjdXJyZW50fX1cIiwgYCR7cyArIDF9YCkucmVwbGFjZShcInt7dG90YWx9fVwiLCBgJHtjLmxlbmd0aH1gKSwgeCA9ICgoQiA9IGQucG9wb3ZlcikgPT0gbnVsbCA/IHZvaWQgMCA6IEIuc2hvd0J1dHRvbnMpIHx8IGEoXCJzaG93QnV0dG9uc1wiKSwgQyA9IFtcbiAgICAgIFwibmV4dFwiLFxuICAgICAgXCJwcmV2aW91c1wiLFxuICAgICAgLi4uaCA/IFtcImNsb3NlXCJdIDogW11cbiAgICBdLmZpbHRlcigobmUpID0+ICEoeCAhPSBudWxsICYmIHgubGVuZ3RoKSB8fCB4LmluY2x1ZGVzKG5lKSksIHkgPSAoKE0gPSBkLnBvcG92ZXIpID09IG51bGwgPyB2b2lkIDAgOiBNLm9uTmV4dENsaWNrKSB8fCBhKFwib25OZXh0Q2xpY2tcIiksIGsgPSAoKHogPSBkLnBvcG92ZXIpID09IG51bGwgPyB2b2lkIDAgOiB6Lm9uUHJldkNsaWNrKSB8fCBhKFwib25QcmV2Q2xpY2tcIiksIFQgPSAoKHEgPSBkLnBvcG92ZXIpID09IG51bGwgPyB2b2lkIDAgOiBxLm9uQ2xvc2VDbGljaykgfHwgYShcIm9uQ2xvc2VDbGlja1wiKTtcbiAgICBLKHtcbiAgICAgIC4uLmQsXG4gICAgICBwb3BvdmVyOiB7XG4gICAgICAgIHNob3dCdXR0b25zOiBDLFxuICAgICAgICBuZXh0QnRuVGV4dDogbSA/IHZvaWQgMCA6IHUsXG4gICAgICAgIGRpc2FibGVCdXR0b25zOiBbLi4uZyA/IFtdIDogW1wicHJldmlvdXNcIl1dLFxuICAgICAgICBzaG93UHJvZ3Jlc3M6IFAsXG4gICAgICAgIHByb2dyZXNzVGV4dDogXyxcbiAgICAgICAgb25OZXh0Q2xpY2s6IHkgfHwgKCgpID0+IHtcbiAgICAgICAgICBtID8gcihzICsgMSkgOiB2KCk7XG4gICAgICAgIH0pLFxuICAgICAgICBvblByZXZDbGljazogayB8fCAoKCkgPT4ge1xuICAgICAgICAgIHIocyAtIDEpO1xuICAgICAgICB9KSxcbiAgICAgICAgb25DbG9zZUNsaWNrOiBUIHx8ICgoKSA9PiB7XG4gICAgICAgICAgdigpO1xuICAgICAgICB9KSxcbiAgICAgICAgLi4uKGQgPT0gbnVsbCA/IHZvaWQgMCA6IGQucG9wb3ZlcikgfHwge31cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICBmdW5jdGlvbiB2KHMgPSAhMCkge1xuICAgIGNvbnN0IGMgPSBsKFwiX19hY3RpdmVFbGVtZW50XCIpLCBkID0gbChcIl9fYWN0aXZlU3RlcFwiKSwgbSA9IGwoXCJfX2FjdGl2ZU9uRGVzdHJveWVkXCIpLCBnID0gYShcIm9uRGVzdHJveVN0YXJ0ZWRcIik7XG4gICAgaWYgKHMgJiYgZykge1xuICAgICAgY29uc3QgUCA9ICFjIHx8IChjID09IG51bGwgPyB2b2lkIDAgOiBjLmlkKSA9PT0gXCJkcml2ZXItZHVtbXktZWxlbWVudFwiO1xuICAgICAgZyhQID8gdm9pZCAwIDogYywgZCwge1xuICAgICAgICBjb25maWc6IGEoKSxcbiAgICAgICAgc3RhdGU6IGwoKVxuICAgICAgfSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHUgPSAoZCA9PSBudWxsID8gdm9pZCAwIDogZC5vbkRlc2VsZWN0ZWQpIHx8IGEoXCJvbkRlc2VsZWN0ZWRcIiksIGggPSBhKFwib25EZXN0cm95ZWRcIik7XG4gICAgaWYgKGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZShcImRyaXZlci1hY3RpdmVcIiwgXCJkcml2ZXItZmFkZVwiLCBcImRyaXZlci1zaW1wbGVcIiksIGJlKCksIFNlKCksIHdlKCksIHZlKCksIGNlKCksIFYoKSwgYyAmJiBkKSB7XG4gICAgICBjb25zdCBQID0gYy5pZCA9PT0gXCJkcml2ZXItZHVtbXktZWxlbWVudFwiO1xuICAgICAgdSAmJiB1KFAgPyB2b2lkIDAgOiBjLCBkLCB7XG4gICAgICAgIGNvbmZpZzogYSgpLFxuICAgICAgICBzdGF0ZTogbCgpXG4gICAgICB9KSwgaCAmJiBoKFAgPyB2b2lkIDAgOiBjLCBkLCB7XG4gICAgICAgIGNvbmZpZzogYSgpLFxuICAgICAgICBzdGF0ZTogbCgpXG4gICAgICB9KTtcbiAgICB9XG4gICAgbSAmJiBtLmZvY3VzKCk7XG4gIH1cbiAgcmV0dXJuIHtcbiAgICBpc0FjdGl2ZTogKCkgPT4gbChcImlzSW5pdGlhbGl6ZWRcIikgfHwgITEsXG4gICAgcmVmcmVzaDogSSxcbiAgICBkcml2ZTogKHMgPSAwKSA9PiB7XG4gICAgICB3KCksIHIocyk7XG4gICAgfSxcbiAgICBzZXRDb25maWc6IEQsXG4gICAgc2V0U3RlcHM6IChzKSA9PiB7XG4gICAgICBWKCksIEQoe1xuICAgICAgICAuLi5hKCksXG4gICAgICAgIHN0ZXBzOiBzXG4gICAgICB9KTtcbiAgICB9LFxuICAgIGdldENvbmZpZzogYSxcbiAgICBnZXRTdGF0ZTogbCxcbiAgICBnZXRBY3RpdmVJbmRleDogKCkgPT4gbChcImFjdGl2ZUluZGV4XCIpLFxuICAgIGlzRmlyc3RTdGVwOiAoKSA9PiBsKFwiYWN0aXZlSW5kZXhcIikgPT09IDAsXG4gICAgaXNMYXN0U3RlcDogKCkgPT4ge1xuICAgICAgY29uc3QgcyA9IGEoXCJzdGVwc1wiKSB8fCBbXSwgYyA9IGwoXCJhY3RpdmVJbmRleFwiKTtcbiAgICAgIHJldHVybiBjICE9PSB2b2lkIDAgJiYgYyA9PT0gcy5sZW5ndGggLSAxO1xuICAgIH0sXG4gICAgZ2V0QWN0aXZlU3RlcDogKCkgPT4gbChcImFjdGl2ZVN0ZXBcIiksXG4gICAgZ2V0QWN0aXZlRWxlbWVudDogKCkgPT4gbChcImFjdGl2ZUVsZW1lbnRcIiksXG4gICAgZ2V0UHJldmlvdXNFbGVtZW50OiAoKSA9PiBsKFwicHJldmlvdXNFbGVtZW50XCIpLFxuICAgIGdldFByZXZpb3VzU3RlcDogKCkgPT4gbChcInByZXZpb3VzU3RlcFwiKSxcbiAgICBtb3ZlTmV4dDogdCxcbiAgICBtb3ZlUHJldmlvdXM6IGksXG4gICAgbW92ZVRvOiBwLFxuICAgIGhhc05leHRTdGVwOiAoKSA9PiB7XG4gICAgICBjb25zdCBzID0gYShcInN0ZXBzXCIpIHx8IFtdLCBjID0gbChcImFjdGl2ZUluZGV4XCIpO1xuICAgICAgcmV0dXJuIGMgIT09IHZvaWQgMCAmJiBzW2MgKyAxXTtcbiAgICB9LFxuICAgIGhhc1ByZXZpb3VzU3RlcDogKCkgPT4ge1xuICAgICAgY29uc3QgcyA9IGEoXCJzdGVwc1wiKSB8fCBbXSwgYyA9IGwoXCJhY3RpdmVJbmRleFwiKTtcbiAgICAgIHJldHVybiBjICE9PSB2b2lkIDAgJiYgc1tjIC0gMV07XG4gICAgfSxcbiAgICBoaWdobGlnaHQ6IChzKSA9PiB7XG4gICAgICB3KCksIEsoe1xuICAgICAgICAuLi5zLFxuICAgICAgICBwb3BvdmVyOiBzLnBvcG92ZXIgPyB7XG4gICAgICAgICAgc2hvd0J1dHRvbnM6IFtdLFxuICAgICAgICAgIHNob3dQcm9ncmVzczogITEsXG4gICAgICAgICAgcHJvZ3Jlc3NUZXh0OiBcIlwiLFxuICAgICAgICAgIC4uLnMucG9wb3ZlclxuICAgICAgICB9IDogdm9pZCAwXG4gICAgICB9KTtcbiAgICB9LFxuICAgIGRlc3Ryb3k6ICgpID0+IHtcbiAgICAgIHYoITEpO1xuICAgIH1cbiAgfTtcbn1cbmV4cG9ydCB7XG4gIGtlIGFzIGRyaXZlclxufTtcbiIsICJsZXQgbGFzdE1vdXNlWCA9IDA7XG5sZXQgbGFzdE1vdXNlWSA9IDA7XG5sZXQgYWN0aXZlID0gZmFsc2U7XG5sZXQgaGFzTmF2aWdhdG9yID0gd2luZG93Lm5hdmlnYXRvci5jbGlwYm9hcmQ7XG5sZXQgaXNJbkVsZW1lbnQgPSBmYWxzZTtcbmxldCBzZWxlY3RlZCA9IG51bGw7XG5cbmxldCBjdXJzb3IgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2lyY2xlLWN1cnNvcicpO1xuXG5leHBvcnQgZnVuY3Rpb24gaW5pdENzc1NlbGVjdG9yKCkge1xuICAgIExpdmV3aXJlLm9uKCdmaWxhbWVudC10b3VyOjpjaGFuZ2UtY3NzLXNlbGVjdG9yLXN0YXR1cycsIGZ1bmN0aW9uICh7ZW5hYmxlZH0pIHtcblxuICAgICAgICBpZiAoZW5hYmxlZCkge1xuXG4gICAgICAgICAgICBkb2N1bWVudC5vbm1vdXNlbW92ZSA9IGhhbmRsZU1vdXNlTW92ZTtcbiAgICAgICAgICAgIGRvY3VtZW50Lm9ua2V5dXAgPSByZWxlYXNlO1xuXG4gICAgICAgICAgICBkb2N1bWVudC5vbm1vdXNlb3ZlciA9IGVudGVyQ3Vyc29yO1xuICAgICAgICAgICAgZG9jdW1lbnQub25tb3VzZWxlYXZlID0gbGVhdmVDdXJzb3I7XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIHJlbGVhc2UoZXZlbnQpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQua2V5ICE9PSAnRXNjYXBlJykgcmV0dXJuO1xuICAgICAgICAgICAgICAgIGFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHNlbGVjdGVkID0gbnVsbDtcbiAgICAgICAgICAgICAgICBjdXJzb3Iuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGZ1bmN0aW9uIChldmVudCkge1xuXG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50LmN0cmxLZXkgJiYgZXZlbnQuY29kZSA9PT0gJ1NwYWNlJyAmJiAhYWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghaGFzTmF2aWdhdG9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgRmlsYW1lbnROb3RpZmljYXRpb24oKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aXRsZSgnRmlsYW1lbnQgVG91ciAtIENTUyBTZWxlY3RvcicpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmJvZHkoXCJZb3VyIGJyb3dzZXIgZG9lcyBub3Qgc3VwcG9ydCB0aGUgQ2xpcGJvYXJkIEFQSSAhPGJyPkRvbid0IGZvcmdldCB0byBiZSBpbiA8Yj5odHRwczovLzwvYj4gcHJvdG9jb2xcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGFuZ2VyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc2VuZCgpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vdmVDdXJzb3IobGFzdE1vdXNlWCwgbGFzdE1vdXNlWSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJzb3Iuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBGaWxhbWVudE5vdGlmaWNhdGlvbigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRpdGxlKCdGaWxhbWVudCBUb3VyIC0gQ1NTIFNlbGVjdG9yJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYm9keSgnQWN0aXZhdGVkICE8YnI+UHJlc3MgQ3RybCArIEMgdG8gY29weSB0aGUgQ1NTIFNlbGVjdG9yIG9mIHRoZSBzZWxlY3RlZCBlbGVtZW50ICEnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zdWNjZXNzKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc2VuZCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50LmN0cmxLZXkgJiYgZXZlbnQuY29kZSA9PT0gJ0tleUMnICYmIGFjdGl2ZSkge1xuICAgICAgICAgICAgICAgICAgICBuYXZpZ2F0b3IuY2xpcGJvYXJkLndyaXRlVGV4dChnZXRPcHRpbWl6ZWRTZWxlY3RvcihzZWxlY3RlZCkgPz8gJ05vdGhpbmcgc2VsZWN0ZWQgIScpO1xuXG4gICAgICAgICAgICAgICAgICAgIGFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZCA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIGN1cnNvci5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXG4gICAgICAgICAgICAgICAgICAgIG5ldyBGaWxhbWVudE5vdGlmaWNhdGlvbigpXG4gICAgICAgICAgICAgICAgICAgICAgICAudGl0bGUoJ0ZpbGFtZW50IFRvdXIgLSBDU1MgU2VsZWN0b3InKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmJvZHkoYENTUyBTZWxlY3RvciBjb3BpZWQgdG8gY2xpcGJvYXJkICFgKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnN1Y2Nlc3MoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnNlbmQoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pO1xuXG5cbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBlc2NhcGVDc3NTZWxlY3RvcihzdHIpIHtcbiAgICByZXR1cm4gc3RyLnJlcGxhY2UoLyhbIVwiIyQlJicoKSorLC4vOjs8PT4/QFtcXF1eYHt8fX5dKS9nLCAnXFxcXCQxJyk7XG59XG5cbmZ1bmN0aW9uIGdldE9wdGltaXplZFNlbGVjdG9yKGVsKSB7XG4gICAgbGV0IGZ1bGxTZWxlY3RvciA9IGdldENzc1NlbGVjdG9yKGVsKTtcblxuICAgIHJldHVybiBvcHRpbWl6ZVNlbGVjdG9yKGZ1bGxTZWxlY3Rvcik7XG59XG5cbmZ1bmN0aW9uIG9wdGltaXplU2VsZWN0b3Ioc2VsZWN0b3IpIHtcbiAgICBsZXQgcGFydHMgPSBzZWxlY3Rvci5zcGxpdCgnID4gJyk7XG5cbiAgICBmb3IgKGxldCBpID0gcGFydHMubGVuZ3RoIC0gMjsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgbGV0IHRlc3RTZWxlY3RvciA9IHBhcnRzLnNsaWNlKGkpLmpvaW4oJyA+ICcpO1xuICAgICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCh0ZXN0U2VsZWN0b3IpLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgcmV0dXJuIHRlc3RTZWxlY3RvcjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBzZWxlY3Rvcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldENzc1NlbGVjdG9yKGVsKSB7XG4gICAgaWYgKCFlbCkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuXG4gICAgaWYgKGVsLmlkKSB7XG4gICAgICAgIHJldHVybiAnIycgKyBlc2NhcGVDc3NTZWxlY3RvcihlbC5pZCk7XG4gICAgfVxuXG4gICAgaWYgKGVsID09PSBkb2N1bWVudC5ib2R5KSB7XG4gICAgICAgIHJldHVybiAnYm9keSc7XG4gICAgfVxuXG4gICAgbGV0IHRhZyA9IGVsLnRhZ05hbWUudG9Mb3dlckNhc2UoKTtcblxuICAgIGxldCB2YWxpZENsYXNzZXMgPSBlbC5jbGFzc05hbWUuc3BsaXQoL1xccysvKS5maWx0ZXIoY2xzID0+IGNscyAmJiAhY2xzLnN0YXJ0c1dpdGgoJy0tJykpO1xuICAgIGxldCBjbGFzc2VzID0gdmFsaWRDbGFzc2VzLmxlbmd0aCA/ICcuJyArIHZhbGlkQ2xhc3Nlcy5tYXAoZXNjYXBlQ3NzU2VsZWN0b3IpLmpvaW4oJy4nKSA6ICcnO1xuXG4gICAgbGV0IHNlbGVjdG9yV2l0aG91dE50aE9mVHlwZSA9IHRhZyArIGNsYXNzZXM7XG5cbiAgICB0cnkge1xuICAgICAgICBsZXQgc2libGluZ3NXaXRoU2FtZVNlbGVjdG9yID0gQXJyYXkuZnJvbShlbC5wYXJlbnROb2RlLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3JXaXRob3V0TnRoT2ZUeXBlKSk7XG4gICAgICAgIGlmIChzaWJsaW5nc1dpdGhTYW1lU2VsZWN0b3IubGVuZ3RoID09PSAxICYmIHNpYmxpbmdzV2l0aFNhbWVTZWxlY3RvclswXSA9PT0gZWwpIHtcbiAgICAgICAgICAgIHJldHVybiBnZXRDc3NTZWxlY3RvcihlbC5wYXJlbnROb2RlKSArICcgPiAnICsgc2VsZWN0b3JXaXRob3V0TnRoT2ZUeXBlO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHNpYmxpbmdzID0gQXJyYXkuZnJvbShlbC5wYXJlbnROb2RlLmNoaWxkcmVuKTtcbiAgICAgICAgbGV0IHNhbWVUYWdBbmRDbGFzc1NpYmxpbmdzID0gc2libGluZ3MuZmlsdGVyKHNpYiA9PiBzaWIudGFnTmFtZSA9PT0gZWwudGFnTmFtZSAmJiBzaWIuY2xhc3NOYW1lID09PSBlbC5jbGFzc05hbWUpO1xuICAgICAgICBpZiAoc2FtZVRhZ0FuZENsYXNzU2libGluZ3MubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgbGV0IGluZGV4ID0gc2FtZVRhZ0FuZENsYXNzU2libGluZ3MuaW5kZXhPZihlbCkgKyAxO1xuICAgICAgICAgICAgcmV0dXJuIGdldENzc1NlbGVjdG9yKGVsLnBhcmVudE5vZGUpICsgJyA+ICcgKyB0YWcgKyBjbGFzc2VzICsgJzpudGgtb2YtdHlwZSgnICsgaW5kZXggKyAnKSc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZ2V0Q3NzU2VsZWN0b3IoZWwucGFyZW50Tm9kZSkgKyAnID4gJyArIHRhZyArIGNsYXNzZXM7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG5cbiAgICB9XG5cbn1cblxuZnVuY3Rpb24gaGFuZGxlTW91c2VNb3ZlKGV2ZW50KSB7XG4gICAgbGFzdE1vdXNlWCA9IGV2ZW50LmNsaWVudFg7XG4gICAgbGFzdE1vdXNlWSA9IGV2ZW50LmNsaWVudFk7XG5cbiAgICBtb3ZlQ3Vyc29yKGV2ZW50LmNsaWVudFgsIGV2ZW50LmNsaWVudFkpO1xufVxuXG5mdW5jdGlvbiBtb3ZlQ3Vyc29yKHBYLCBwWSkge1xuICAgIGlmICghYWN0aXZlKSByZXR1cm47XG5cbiAgICBsZXQgZGlmZiA9IDEwO1xuICAgIGlmICghaXNJbkVsZW1lbnQpIHtcbiAgICAgICAgY3Vyc29yLnN0eWxlLmxlZnQgPSAocFggLSBkaWZmKSArICdweCc7XG4gICAgICAgIGN1cnNvci5zdHlsZS50b3AgPSAocFkgLSBkaWZmKSArICdweCc7XG4gICAgICAgIGN1cnNvci5zdHlsZS53aWR0aCA9ICcyMHB4JztcbiAgICAgICAgY3Vyc29yLnN0eWxlLmhlaWdodCA9ICcyMHB4JztcbiAgICAgICAgY3Vyc29yLnN0eWxlLmJvcmRlclJhZGl1cyA9IFwiNTAlXCI7XG4gICAgfVxufVxuXG5cbmZ1bmN0aW9uIGVudGVyQ3Vyc29yKGV2ZW50KSB7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICBpZiAoIWFjdGl2ZSkgcmV0dXJuO1xuXG4gICAgaXNJbkVsZW1lbnQgPSB0cnVlO1xuXG4gICAgbGV0IGVsZW0gPSBldmVudC50YXJnZXQ7XG5cbiAgICB3aGlsZSAoZWxlbS5sYXN0RWxlbWVudENoaWxkKSB7XG4gICAgICAgIGVsZW0gPSBlbGVtLmxhc3RFbGVtZW50Q2hpbGQ7XG4gICAgfVxuXG4gICAgaWYgKGVsZW0pIHtcbiAgICAgICAgbGV0IGVYID0gZWxlbS5vZmZzZXRQYXJlbnQgPyBlbGVtLm9mZnNldExlZnQgKyBlbGVtLm9mZnNldFBhcmVudC5vZmZzZXRMZWZ0IDogZWxlbS5vZmZzZXRMZWZ0XG4gICAgICAgIGxldCBlWSA9IGVsZW0ub2Zmc2V0UGFyZW50ID8gZWxlbS5vZmZzZXRUb3AgKyBlbGVtLm9mZnNldFBhcmVudC5vZmZzZXRUb3AgOiBlbGVtLm9mZnNldFRvcDtcbiAgICAgICAgbGV0IGVXID0gZWxlbS5vZmZzZXRXaWR0aDtcbiAgICAgICAgbGV0IGVIID0gZWxlbS5vZmZzZXRIZWlnaHQ7XG4gICAgICAgIGxldCBkaWZmID0gNjtcbiAgICAgICAgc2VsZWN0ZWQgPSBlbGVtO1xuICAgICAgICBjdXJzb3Iuc3R5bGUubGVmdCA9IGVYIC0gZGlmZiArICdweCc7XG4gICAgICAgIGN1cnNvci5zdHlsZS50b3AgPSBlWSAtIGRpZmYgKyAncHgnO1xuICAgICAgICBjdXJzb3Iuc3R5bGUud2lkdGggPSAoZVcgKyBkaWZmICogMiAtIDEpICsgJ3B4JztcbiAgICAgICAgY3Vyc29yLnN0eWxlLmhlaWdodCA9IChlSCArIGRpZmYgKiAyIC0gMSkgKyAncHgnO1xuICAgICAgICBjdXJzb3Iuc3R5bGUuYm9yZGVyUmFkaXVzID0gXCI1cHhcIjtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGxlYXZlQ3Vyc29yKGV2ZW50KSB7XG4gICAgaWYgKCFhY3RpdmUpIHJldHVybjtcblxuICAgIGlzSW5FbGVtZW50ID0gZmFsc2U7XG59XG4iLCAiaW1wb3J0IHtkcml2ZXJ9IGZyb20gXCJkcml2ZXIuanNcIjtcbmltcG9ydCB7aW5pdENzc1NlbGVjdG9yfSBmcm9tICcuL2Nzcy1zZWxlY3Rvci5qcyc7XG5cblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbGl2ZXdpcmU6aW5pdGlhbGl6ZWQnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG5cbiAgICBpbml0Q3NzU2VsZWN0b3IoKTtcblxuICAgIGxldCBwbHVnaW5EYXRhO1xuXG4gICAgbGV0IHRvdXJzID0gW107XG4gICAgbGV0IGhpZ2hsaWdodHMgPSBbXTtcblxuICAgIGZ1bmN0aW9uIHdhaXRGb3JFbGVtZW50KHNlbGVjdG9yLCBjYWxsYmFjaykge1xuICAgICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3RvcikpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoZnVuY3Rpb24gKG11dGF0aW9ucykge1xuICAgICAgICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3RvcikpO1xuICAgICAgICAgICAgICAgIG9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZShkb2N1bWVudC5ib2R5LCB7XG4gICAgICAgICAgICBjaGlsZExpc3Q6IHRydWUsXG4gICAgICAgICAgICBzdWJ0cmVlOiB0cnVlXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBhcnNlSWQocGFyYW1zKSB7XG5cbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocGFyYW1zKSkge1xuICAgICAgICAgICAgcmV0dXJuIHBhcmFtc1swXTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgcGFyYW1zID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgcmV0dXJuIHBhcmFtcy5pZDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBwYXJhbXM7XG4gICAgfVxuXG4gICAgTGl2ZXdpcmUuZGlzcGF0Y2goJ2ZpbGFtZW50LXRvdXI6OmxvYWQtZWxlbWVudHMnLCB7cmVxdWVzdDogd2luZG93LmxvY2F0aW9ufSlcblxuICAgIExpdmV3aXJlLm9uKCdmaWxhbWVudC10b3VyOjpsb2FkZWQtZWxlbWVudHMnLCBmdW5jdGlvbiAoZGF0YSkge1xuXG4gICAgICAgIHBsdWdpbkRhdGEgPSBkYXRhO1xuXG4gICAgICAgIHBsdWdpbkRhdGEudG91cnMuZm9yRWFjaCgodG91cikgPT4ge1xuICAgICAgICAgICAgdG91cnMucHVzaCh0b3VyKTtcblxuICAgICAgICAgICAgaWYgKCFsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG91cnMnKSkge1xuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0b3VycycsIFwiW11cIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHNlbGVjdFRvdXIodG91cnMpO1xuXG4gICAgICAgIHBsdWdpbkRhdGEuaGlnaGxpZ2h0cy5mb3JFYWNoKChoaWdobGlnaHQpID0+IHtcblxuICAgICAgICAgICAgaWYgKGhpZ2hsaWdodC5yb3V0ZSA9PT0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lKSB7XG5cbiAgICAgICAgICAgICAgICAvL1RPRE8gQWRkIGEgbW9yZSBwcmVjaXNlL2VmZmljaWVudCBzZWxlY3RvclxuXG4gICAgICAgICAgICAgICAgd2FpdEZvckVsZW1lbnQoaGlnaGxpZ2h0LnBhcmVudCwgZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdG9yLnBhcmVudE5vZGUuc3R5bGUucG9zaXRpb24gPSAncmVsYXRpdmUnO1xuXG4gICAgICAgICAgICAgICAgICAgIGxldCB0ZW1wRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBEaXYuaW5uZXJIVE1MID0gaGlnaGxpZ2h0LmJ1dHRvbjtcblxuICAgICAgICAgICAgICAgICAgICB0ZW1wRGl2LmZpcnN0Q2hpbGQuY2xhc3NMaXN0LmFkZChoaWdobGlnaHQucG9zaXRpb24pO1xuXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdG9yLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHRlbXBEaXYuZmlyc3RDaGlsZCwgc2VsZWN0b3IpXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBoaWdobGlnaHRzLnB1c2goaGlnaGxpZ2h0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiBzZWxlY3RUb3VyKHRvdXJzLCBzdGFydEluZGV4ID0gMCkge1xuICAgICAgICBmb3IgKGxldCBpID0gc3RhcnRJbmRleDsgaSA8IHRvdXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgdG91ciA9IHRvdXJzW2ldO1xuICAgICAgICAgICAgbGV0IGNvbmRpdGlvbkFsd2F5c1Nob3cgPSB0b3VyLmFsd2F5c1Nob3c7XG4gICAgICAgICAgICBsZXQgY29uZGl0aW9uUm91dGVzSWdub3JlZCA9IHRvdXIucm91dGVzSWdub3JlZDtcbiAgICAgICAgICAgIGxldCBjb25kaXRpb25Sb3V0ZU1hdGNoZXMgPSB0b3VyLnJvdXRlID09PSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgKyB3aW5kb3cubG9jYXRpb24uc2VhcmNoO1xuICAgICAgICAgICAgbGV0IGNvbmRpdGlvblZpc2libGVPbmNlID0gIXBsdWdpbkRhdGEub25seV92aXNpYmxlX29uY2UgfHxcbiAgICAgICAgICAgICAgICAocGx1Z2luRGF0YS5vbmx5X3Zpc2libGVfb25jZSAmJiAhbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3RvdXJzJykuaW5jbHVkZXModG91ci5pZCkpO1xuXG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgKGNvbmRpdGlvbkFsd2F5c1Nob3cgJiYgY29uZGl0aW9uUm91dGVzSWdub3JlZCkgfHxcbiAgICAgICAgICAgICAgICAoY29uZGl0aW9uQWx3YXlzU2hvdyAmJiAhY29uZGl0aW9uUm91dGVzSWdub3JlZCAmJiBjb25kaXRpb25Sb3V0ZU1hdGNoZXMpIHx8XG4gICAgICAgICAgICAgICAgKGNvbmRpdGlvblJvdXRlc0lnbm9yZWQgJiYgY29uZGl0aW9uVmlzaWJsZU9uY2UpIHx8XG4gICAgICAgICAgICAgICAgKGNvbmRpdGlvblJvdXRlTWF0Y2hlcyAmJiBjb25kaXRpb25WaXNpYmxlT25jZSlcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIG9wZW5Ub3VyKHRvdXIpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBMaXZld2lyZS5vbignZmlsYW1lbnQtdG91cjo6b3Blbi1oaWdobGlnaHQnLCBmdW5jdGlvbiAocGFyYW1zKSB7XG5cbiAgICAgICAgY29uc3QgaWQgPSBwYXJzZUlkKHBhcmFtcyk7XG5cbiAgICAgICAgY29uc29sZS5sb2coaGlnaGxpZ2h0cylcblxuICAgICAgICBsZXQgaGlnaGxpZ2h0ID0gaGlnaGxpZ2h0cy5maW5kKGVsZW1lbnQgPT4gZWxlbWVudC5pZCA9PT0gaWQpO1xuXG4gICAgICAgIGlmIChoaWdobGlnaHQpIHtcbiAgICAgICAgICAgIGRyaXZlcih7XG4gICAgICAgICAgICAgICAgb3ZlcmxheUNvbG9yOiBsb2NhbFN0b3JhZ2UudGhlbWUgPT09ICdsaWdodCcgPyBoaWdobGlnaHQuY29sb3JzLmxpZ2h0IDogaGlnaGxpZ2h0LmNvbG9ycy5kYXJrLFxuXG4gICAgICAgICAgICAgICAgb25Qb3BvdmVyUmVuZGVyOiAocG9wb3Zlciwge2NvbmZpZywgc3RhdGV9KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHBvcG92ZXIudGl0bGUuaW5uZXJIVE1MID0gXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgcG9wb3Zlci50aXRsZS5pbm5lckhUTUwgPSBzdGF0ZS5hY3RpdmVTdGVwLnBvcG92ZXIudGl0bGU7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCFzdGF0ZS5hY3RpdmVTdGVwLnBvcG92ZXIuZGVzY3JpcHRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvcG92ZXIudGl0bGUuZmlyc3RDaGlsZC5zdHlsZS5qdXN0aWZ5Q29udGVudCA9ICdjZW50ZXInO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IGNvbnRlbnRDbGFzc2VzID0gXCJkYXJrOnRleHQtd2hpdGUgZmktc2VjdGlvbiByb3VuZGVkLXhsIGJnLXdoaXRlIHNoYWRvdy1zbSByaW5nLTEgcmluZy1ncmF5LTk1MC81IGRhcms6YmctZ3JheS05MDAgZGFyazpyaW5nLXdoaXRlLzEwIG1iLTRcIjtcblxuICAgICAgICAgICAgICAgICAgICBwb3BvdmVyLmZvb3Rlci5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoLi4uY29udGVudENsYXNzZXMuc3BsaXQoXCIgXCIpKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSkuaGlnaGxpZ2h0KGhpZ2hsaWdodCk7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYEhpZ2hsaWdodCB3aXRoIGlkICcke2lkfScgbm90IGZvdW5kYCk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIExpdmV3aXJlLm9uKCdmaWxhbWVudC10b3VyOjpvcGVuLXRvdXInLCBmdW5jdGlvbiAocGFyYW1zKSB7XG5cbiAgICAgICAgY29uc3QgaWQgPSBwYXJzZUlkKHBhcmFtcyk7XG5cbiAgICAgICAgbGV0IHRvdXIgPSB0b3Vycy5maW5kKGVsZW1lbnQgPT4gZWxlbWVudC5pZCA9PT0gYHRvdXJfJHtpZH1gKTtcblxuICAgICAgICBpZiAodG91cikge1xuICAgICAgICAgICAgb3BlblRvdXIodG91cik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGBUb3VyIHdpdGggaWQgJyR7aWR9JyBub3QgZm91bmRgKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gb3BlblRvdXIodG91cikge1xuXG5cbiAgICAgICAgbGV0IHN0ZXBzID0gSlNPTi5wYXJzZSh0b3VyLnN0ZXBzKTtcblxuICAgICAgICBpZiAoc3RlcHMubGVuZ3RoID4gMCkge1xuXG4gICAgICAgICAgICBjb25zdCBkcml2ZXJPYmogPSBkcml2ZXIoe1xuICAgICAgICAgICAgICAgIGFsbG93Q2xvc2U6IHRydWUsXG4gICAgICAgICAgICAgICAgZGlzYWJsZUFjdGl2ZUludGVyYWN0aW9uOiB0cnVlLFxuICAgICAgICAgICAgICAgIG92ZXJsYXlDb2xvcjogbG9jYWxTdG9yYWdlLnRoZW1lID09PSAnbGlnaHQnID8gdG91ci5jb2xvcnMubGlnaHQgOiB0b3VyLmNvbG9ycy5kYXJrLFxuICAgICAgICAgICAgICAgIG9uRGVzZWxlY3RlZDogKChlbGVtZW50LCBzdGVwLCB7Y29uZmlnLCBzdGF0ZX0pID0+IHtcblxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIG9uQ2xvc2VDbGljazogKChlbGVtZW50LCBzdGVwLCB7Y29uZmlnLCBzdGF0ZX0pID0+IHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoc3RlcC5ldmVudHMuZGlzcGF0Y2hPbkNsb3NlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBMaXZld2lyZS5kaXNwYXRjaChzdGVwLmV2ZW50cy5kaXNwYXRjaE9uQ2xvc2UubmFtZSwgc3RlcC5ldmVudHMuZGlzcGF0Y2hPbkNsb3NlLnBhcmFtcyk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAoc3RhdGUuYWN0aXZlU3RlcCAmJiAoIXN0YXRlLmFjdGl2ZVN0ZXAudW5jbG9zZWFibGUgfHwgdG91ci51bmNsb3NlYWJsZSkpXG4gICAgICAgICAgICAgICAgICAgICAgICBkcml2ZXJPYmouZGVzdHJveSgpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICghbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3RvdXJzJykuaW5jbHVkZXModG91ci5pZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0b3VycycsIEpTT04uc3RyaW5naWZ5KFsuLi5KU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b3VycycpKSwgdG91ci5pZF0pKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIG9uRGVzdHJveVN0YXJ0ZWQ6ICgoZWxlbWVudCwgc3RlcCwge2NvbmZpZywgc3RhdGV9KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzdGF0ZS5hY3RpdmVTdGVwICYmICFzdGF0ZS5hY3RpdmVTdGVwLnVuY2xvc2VhYmxlICYmICF0b3VyLnVuY2xvc2VhYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkcml2ZXJPYmouZGVzdHJveSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgb25EZXN0cm95ZWQ6ICgoZWxlbWVudCwgc3RlcCwge2NvbmZpZywgc3RhdGV9KSA9PiB7XG5cbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICBvbk5leHRDbGljazogKChlbGVtZW50LCBzdGVwLCB7Y29uZmlnLCBzdGF0ZX0pID0+IHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoZHJpdmVyT2JqLmlzTGFzdFN0ZXAoKSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b3VycycpLmluY2x1ZGVzKHRvdXIuaWQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3RvdXJzJywgSlNPTi5zdHJpbmdpZnkoWy4uLkpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3RvdXJzJykpLCB0b3VyLmlkXSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBkcml2ZXJPYmouZGVzdHJveSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRvdXJzLmxlbmd0aCA+IDEgJiYgZHJpdmVyT2JqLmlzTGFzdFN0ZXAoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGluZGV4ID0gdG91cnMuZmluZEluZGV4KG9iamV0ID0+IG9iamV0LmlkID09PSB0b3VyLmlkKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGluZGV4ICE9PSAtMSAmJiBpbmRleCA8IHRvdXJzLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbmV4dFRvdXJJbmRleCA9IGluZGV4ICsgMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RUb3VyKHRvdXJzLCBuZXh0VG91ckluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0ZXAuZXZlbnRzKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdGVwLmV2ZW50cy5ub3RpZnlPbk5leHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgRmlsYW1lbnROb3RpZmljYXRpb24oKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGl0bGUoc3RlcC5ldmVudHMubm90aWZ5T25OZXh0LnRpdGxlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYm9keShzdGVwLmV2ZW50cy5ub3RpZnlPbk5leHQuYm9keSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmljb24oc3RlcC5ldmVudHMubm90aWZ5T25OZXh0Lmljb24pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5pY29uQ29sb3Ioc3RlcC5ldmVudHMubm90aWZ5T25OZXh0Lmljb25Db2xvcilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNvbG9yKHN0ZXAuZXZlbnRzLm5vdGlmeU9uTmV4dC5jb2xvcilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmR1cmF0aW9uKHN0ZXAuZXZlbnRzLm5vdGlmeU9uTmV4dC5kdXJhdGlvbilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnNlbmQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0ZXAuZXZlbnRzLmRpc3BhdGNoT25OZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTGl2ZXdpcmUuZGlzcGF0Y2goc3RlcC5ldmVudHMuZGlzcGF0Y2hPbk5leHQubmFtZSwgc3RlcC5ldmVudHMuZGlzcGF0Y2hPbk5leHQucGFyYW1zKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0ZXAuZXZlbnRzLmNsaWNrT25OZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzdGVwLmV2ZW50cy5jbGlja09uTmV4dCkuY2xpY2soKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3RlcC5ldmVudHMucmVkaXJlY3RPbk5leHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cub3BlbihzdGVwLmV2ZW50cy5yZWRpcmVjdE9uTmV4dC51cmwsIHN0ZXAuZXZlbnRzLnJlZGlyZWN0T25OZXh0Lm5ld1RhYiA/ICdfYmxhbmsnIDogJ19zZWxmJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgICAgIGRyaXZlck9iai5tb3ZlTmV4dCgpO1xuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIG9uUG9wb3ZlclJlbmRlcjogKHBvcG92ZXIsIHtjb25maWcsIHN0YXRlfSkgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgIHBvcG92ZXIuc2lkZSA9IHN0YXRlLmFjdGl2ZVN0ZXAucG9wb3Zlci5zaWRlO1xuICAgICAgICAgICAgICAgICAgICBwb3BvdmVyLmFsaWduID0gc3RhdGUuYWN0aXZlU3RlcC5wb3BvdmVyLmFsaWduO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXRlLmFjdGl2ZVN0ZXAudW5jbG9zZWFibGUgfHwgdG91ci51bmNsb3NlYWJsZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZHJpdmVyLXBvcG92ZXItY2xvc2UtYnRuXCIpLnJlbW92ZSgpO1xuXG4gICAgICAgICAgICAgICAgICAgIHBvcG92ZXIudGl0bGUuaW5uZXJIVE1MID0gXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgcG9wb3Zlci50aXRsZS5pbm5lckhUTUwgPSBzdGF0ZS5hY3RpdmVTdGVwLnBvcG92ZXIudGl0bGU7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCFzdGF0ZS5hY3RpdmVTdGVwLnBvcG92ZXIuZGVzY3JpcHRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvcG92ZXIudGl0bGUuZmlyc3RDaGlsZC5zdHlsZS5qdXN0aWZ5Q29udGVudCA9ICdjZW50ZXInO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IGNvbnRlbnRDbGFzc2VzID0gXCJkYXJrOnRleHQtd2hpdGUgZmktc2VjdGlvbiByb3VuZGVkLXhsIGJnLXdoaXRlIHNoYWRvdy1zbSByaW5nLTEgcmluZy1ncmF5LTk1MC81IGRhcms6YmctZ3JheS05MDAgZGFyazpyaW5nLXdoaXRlLzEwIG1iLTRcIjtcblxuICAgICAgICAgICAgICAgICAgICAvLyBwb3BvdmVyLmRlc2NyaXB0aW9uLmluc2VydEFkamFjZW50SFRNTChcImJlZm9yZWVuZFwiLCBzdGF0ZS5hY3RpdmVTdGVwLnBvcG92ZXIuZm9ybSk7XG5cbiAgICAgICAgICAgICAgICAgICAgcG9wb3Zlci5mb290ZXIucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKC4uLmNvbnRlbnRDbGFzc2VzLnNwbGl0KFwiIFwiKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgcG9wb3Zlci5mb290ZXIuaW5uZXJIVE1MID0gXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgcG9wb3Zlci5mb290ZXIuY2xhc3NMaXN0LmFkZCgnZmxleCcsICdtdC0zJyk7XG4gICAgICAgICAgICAgICAgICAgIHBvcG92ZXIuZm9vdGVyLnN0eWxlLmp1c3RpZnlDb250ZW50ID0gJ3NwYWNlLWV2ZW5seSc7XG5cbiAgICAgICAgICAgICAgICAgICAgcG9wb3Zlci5mb290ZXIuY2xhc3NMaXN0LnJlbW92ZShcImRyaXZlci1wb3BvdmVyLWZvb3RlclwiKTtcblxuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5leHRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgbmV4dENsYXNzZXMgPSBcImZpLWJ0biBmaS1idG4tc2l6ZS1tZCByZWxhdGl2ZSBncmlkLWZsb3ctY29sIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBmb250LXNlbWlib2xkIG91dGxpbmUtbm9uZSB0cmFuc2l0aW9uIGR1cmF0aW9uLTc1IGZvY3VzOnJpbmctMiBkaXNhYmxlZDpwb2ludGVyLWV2ZW50cy1ub25lIGRpc2FibGVkOm9wYWNpdHktNzAgcm91bmRlZC1sZyBmaS1idG4tY29sb3ItcHJpbWFyeSBnYXAtMS41IHB4LTMgcHktMiB0ZXh0LXNtIGlubGluZS1ncmlkIHNoYWRvdy1zbSBiZy1jdXN0b20tNjAwIHRleHQtd2hpdGUgaG92ZXI6YmctY3VzdG9tLTUwMCBkYXJrOmJnLWN1c3RvbS01MDAgZGFyazpob3ZlcjpiZy1jdXN0b20tNDAwIGZvY3VzOnJpbmctY3VzdG9tLTUwMC81MCBkYXJrOmZvY3VzOnJpbmctY3VzdG9tLTQwMC81MCBmaS1hYy1idG4tYWN0aW9uXCI7XG5cbiAgICAgICAgICAgICAgICAgICAgbmV4dEJ1dHRvbi5jbGFzc0xpc3QuYWRkKC4uLm5leHRDbGFzc2VzLnNwbGl0KFwiIFwiKSwgJ2RyaXZlci1wb3BvdmVyLW5leHQtYnRuJyk7XG4gICAgICAgICAgICAgICAgICAgIG5leHRCdXR0b24uaW5uZXJUZXh0ID0gZHJpdmVyT2JqLmlzTGFzdFN0ZXAoKVxuICAgICAgICAgICAgICAgICAgICAgICAgPyBzdGF0ZS5hY3RpdmVTdGVwLnBvcG92ZXIuZG9uZUJ0blRleHRcbiAgICAgICAgICAgICAgICAgICAgICAgIDogc3RhdGUuYWN0aXZlU3RlcC5wb3BvdmVyLm5leHRCdG5UZXh0O1xuXG4gICAgICAgICAgICAgICAgICAgIG5leHRCdXR0b24uc3R5bGUuc2V0UHJvcGVydHkoJy0tYy00MDAnLCAndmFyKC0tcHJpbWFyeS00MDAnKTtcbiAgICAgICAgICAgICAgICAgICAgbmV4dEJ1dHRvbi5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1jLTUwMCcsICd2YXIoLS1wcmltYXJ5LTUwMCcpO1xuICAgICAgICAgICAgICAgICAgICBuZXh0QnV0dG9uLnN0eWxlLnNldFByb3BlcnR5KCctLWMtNjAwJywgJ3ZhcigtLXByaW1hcnktNjAwJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJldkJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgICAgICAgICAgICAgICAgIGxldCBwcmV2Q2xhc3NlcyA9IFwiZmktYnRuIGZpLWJ0bi1zaXplLW1kIHJlbGF0aXZlIGdyaWQtZmxvdy1jb2wgaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGZvbnQtc2VtaWJvbGQgb3V0bGluZS1ub25lIHRyYW5zaXRpb24gZHVyYXRpb24tNzUgZm9jdXM6cmluZy0yIGRpc2FibGVkOnBvaW50ZXItZXZlbnRzLW5vbmUgZGlzYWJsZWQ6b3BhY2l0eS03MCByb3VuZGVkLWxnIGZpLWJ0bi1jb2xvci1ncmF5IGdhcC0xLjUgcHgtMyBweS0yIHRleHQtc20gaW5saW5lLWdyaWQgc2hhZG93LXNtIGJnLXdoaXRlIHRleHQtZ3JheS05NTAgaG92ZXI6YmctZ3JheS01MCBkYXJrOmJnLXdoaXRlLzUgZGFyazp0ZXh0LXdoaXRlIGRhcms6aG92ZXI6Ymctd2hpdGUvMTAgcmluZy0xIHJpbmctZ3JheS05NTAvMTAgZGFyazpyaW5nLXdoaXRlLzIwIGZpLWFjLWJ0bi1hY3Rpb25cIjtcbiAgICAgICAgICAgICAgICAgICAgcHJldkJ1dHRvbi5jbGFzc0xpc3QuYWRkKC4uLnByZXZDbGFzc2VzLnNwbGl0KFwiIFwiKSwgJ2RyaXZlci1wb3BvdmVyLXByZXYtYnRuJyk7XG4gICAgICAgICAgICAgICAgICAgIHByZXZCdXR0b24uaW5uZXJUZXh0ID0gc3RhdGUuYWN0aXZlU3RlcC5wb3BvdmVyLnByZXZCdG5UZXh0O1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICghZHJpdmVyT2JqLmlzRmlyc3RTdGVwKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvcG92ZXIuZm9vdGVyLmFwcGVuZENoaWxkKHByZXZCdXR0b24pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHBvcG92ZXIuZm9vdGVyLmFwcGVuZENoaWxkKG5leHRCdXR0b24pO1xuXG4gICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgIHN0ZXBzOiBzdGVwcyxcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBkcml2ZXJPYmouZHJpdmUoKTtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFBLElBQUksSUFBSSxDQUFDO0FBQ1QsU0FBUyxFQUFFLElBQUksQ0FBQyxHQUFHO0FBQ2pCLE1BQUk7QUFBQSxJQUNGLFNBQVM7QUFBQSxJQUNULFlBQVk7QUFBQSxJQUNaLGdCQUFnQjtBQUFBLElBQ2hCLGNBQWM7QUFBQSxJQUNkLDBCQUEwQjtBQUFBLElBQzFCLGNBQWM7QUFBQSxJQUNkLGNBQWM7QUFBQSxJQUNkLGFBQWE7QUFBQSxJQUNiLGVBQWU7QUFBQSxJQUNmLGFBQWEsQ0FBQyxRQUFRLFlBQVksT0FBTztBQUFBLElBQ3pDLGdCQUFnQixDQUFDO0FBQUEsSUFDakIsY0FBYztBQUFBLElBQ2QsR0FBRztBQUFBLEVBQ0w7QUFDRjtBQUNBLFNBQVMsRUFBRSxHQUFHO0FBQ1osU0FBTyxJQUFJLEVBQUUsQ0FBQyxJQUFJO0FBQ3BCO0FBQ0EsU0FBUyxFQUFFLEdBQUcsR0FBRyxHQUFHLEdBQUc7QUFDckIsVUFBUSxLQUFLLElBQUksS0FBSyxJQUFJLElBQUksSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxFQUFFLEtBQUssSUFBSSxLQUFLLEtBQUs7QUFDL0U7QUFDQSxTQUFTLEVBQUUsR0FBRztBQUNaLFFBQU0sSUFBSTtBQUNWLFNBQU8sRUFBRSxRQUFRLENBQUMsTUFBTTtBQUN0QixVQUFNLElBQUksRUFBRSxRQUFRLENBQUMsR0FBRyxJQUFJLE1BQU0sS0FBSyxFQUFFLGlCQUFpQixDQUFDLENBQUM7QUFDNUQsV0FBTyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQUEsRUFDL0IsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxNQUFNLGlCQUFpQixDQUFDLEVBQUUsa0JBQWtCLFVBQVUsR0FBRyxDQUFDLENBQUM7QUFDeEU7QUFDQSxTQUFTLEVBQUUsR0FBRztBQUNaLE1BQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQztBQUNaO0FBQ0YsUUFBTSxJQUFJLEVBQUUsY0FBYztBQUMxQixJQUFFLGVBQWU7QUFBQTtBQUFBO0FBQUEsSUFHZixVQUFVLENBQUMsS0FBSyxHQUFHLENBQUMsSUFBSSxTQUFTO0FBQUEsSUFDakMsUUFBUTtBQUFBLElBQ1IsT0FBTztBQUFBLEVBQ1QsQ0FBQztBQUNIO0FBQ0EsU0FBUyxHQUFHLEdBQUc7QUFDYixNQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7QUFDWDtBQUNGLFFBQU0sSUFBSSxFQUFFO0FBQ1osU0FBTyxFQUFFLGVBQWUsRUFBRTtBQUM1QjtBQUNBLFNBQVMsR0FBRyxHQUFHO0FBQ2IsUUFBTSxJQUFJLEVBQUUsc0JBQXNCO0FBQ2xDLFNBQU8sRUFBRSxPQUFPLEtBQUssRUFBRSxRQUFRLEtBQUssRUFBRSxXQUFXLE9BQU8sZUFBZSxTQUFTLGdCQUFnQixpQkFBaUIsRUFBRSxVQUFVLE9BQU8sY0FBYyxTQUFTLGdCQUFnQjtBQUM3SztBQUNBLFNBQVMsR0FBRyxHQUFHO0FBQ2IsU0FBTyxDQUFDLEVBQUUsRUFBRSxlQUFlLEVBQUUsZ0JBQWdCLEVBQUUsZUFBZSxFQUFFO0FBQ2xFO0FBQ0EsSUFBSSxJQUFJLENBQUM7QUFDVCxTQUFTLEVBQUUsR0FBRyxHQUFHO0FBQ2YsSUFBRSxDQUFDLElBQUk7QUFDVDtBQUNBLFNBQVMsRUFBRSxHQUFHO0FBQ1osU0FBTyxJQUFJLEVBQUUsQ0FBQyxJQUFJO0FBQ3BCO0FBQ0EsU0FBUyxJQUFJO0FBQ1gsTUFBSSxDQUFDO0FBQ1A7QUFDQSxJQUFJLElBQUksQ0FBQztBQUNULFNBQVMsRUFBRSxHQUFHLEdBQUc7QUFDZixJQUFFLENBQUMsSUFBSTtBQUNUO0FBQ0EsU0FBUyxFQUFFLEdBQUc7QUFDWixNQUFJO0FBQ0osR0FBQyxJQUFJLEVBQUUsQ0FBQyxNQUFNLFFBQVEsRUFBRSxLQUFLLENBQUM7QUFDaEM7QUFDQSxTQUFTLEtBQUs7QUFDWixNQUFJLENBQUM7QUFDUDtBQUNBLFNBQVMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHO0FBQ3RCLE1BQUksSUFBSSxFQUFFLHVCQUF1QjtBQUNqQyxRQUFNLElBQUksS0FBSyxFQUFFLHNCQUFzQixHQUFHLElBQUksRUFBRSxzQkFBc0IsR0FBRyxJQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsR0FBRyxDQUFDLEdBQUcsSUFBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQyxHQUFHLElBQUksRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUMsR0FBRyxJQUFJLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsUUFBUSxDQUFDO0FBQ3JOLE1BQUk7QUFBQSxJQUNGLEdBQUc7QUFBQSxJQUNILEdBQUc7QUFBQSxJQUNILE9BQU87QUFBQSxJQUNQLFFBQVE7QUFBQSxFQUNWLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSx5QkFBeUIsQ0FBQztBQUN2QztBQUNBLFNBQVMsRUFBRSxHQUFHO0FBQ1osTUFBSSxDQUFDO0FBQ0g7QUFDRixRQUFNLElBQUksRUFBRSxzQkFBc0IsR0FBRyxJQUFJO0FBQUEsSUFDdkMsR0FBRyxFQUFFO0FBQUEsSUFDTCxHQUFHLEVBQUU7QUFBQSxJQUNMLE9BQU8sRUFBRTtBQUFBLElBQ1QsUUFBUSxFQUFFO0FBQUEsRUFDWjtBQUNBLElBQUUseUJBQXlCLENBQUMsR0FBRyxFQUFFLENBQUM7QUFDcEM7QUFDQSxTQUFTLEtBQUs7QUFDWixRQUFNLElBQUksRUFBRSx1QkFBdUIsR0FBRyxJQUFJLEVBQUUsY0FBYztBQUMxRCxNQUFJLENBQUM7QUFDSDtBQUNGLE1BQUksQ0FBQyxHQUFHO0FBQ04sWUFBUSxLQUFLLHFCQUFxQjtBQUNsQztBQUFBLEVBQ0Y7QUFDQSxRQUFNLElBQUksT0FBTyxZQUFZLElBQUksT0FBTztBQUN4QyxJQUFFLGFBQWEsV0FBVyxPQUFPLEtBQUssR0FBRztBQUMzQztBQUNBLFNBQVMsR0FBRyxHQUFHO0FBQ2IsUUFBTSxJQUFJLEdBQUcsQ0FBQztBQUNkLFdBQVMsS0FBSyxZQUFZLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxNQUFNO0FBQ3pDLE1BQUUsT0FBTyxZQUFZLFVBQVUsRUFBRSxjQUFjO0FBQUEsRUFDakQsQ0FBQyxHQUFHLEVBQUUsZ0JBQWdCLENBQUM7QUFDekI7QUFDQSxTQUFTLEVBQUUsR0FBRztBQUNaLFFBQU0sSUFBSSxFQUFFLGNBQWM7QUFDMUIsTUFBSSxDQUFDLEdBQUc7QUFDTixPQUFHLENBQUM7QUFDSjtBQUFBLEVBQ0Y7QUFDQSxRQUFNLElBQUksRUFBRTtBQUNaLE9BQUssS0FBSyxPQUFPLFNBQVMsRUFBRSxhQUFhO0FBQ3ZDLFVBQU0sSUFBSSxNQUFNLG9DQUFvQztBQUN0RCxJQUFFLGFBQWEsS0FBSyxFQUFFLENBQUMsQ0FBQztBQUMxQjtBQUNBLFNBQVMsR0FBRyxHQUFHO0FBQ2IsUUFBTSxJQUFJLE9BQU8sWUFBWSxJQUFJLE9BQU8sYUFBYSxJQUFJLFNBQVMsZ0JBQWdCLDhCQUE4QixLQUFLO0FBQ3JILElBQUUsVUFBVSxJQUFJLGtCQUFrQix5QkFBeUIsR0FBRyxFQUFFLGFBQWEsV0FBVyxPQUFPLEtBQUssR0FBRyxHQUFHLEVBQUUsYUFBYSxZQUFZLFVBQVUsR0FBRyxFQUFFLGFBQWEsY0FBYyw4QkFBOEIsR0FBRyxFQUFFLGFBQWEsV0FBVyxLQUFLLEdBQUcsRUFBRSxhQUFhLHVCQUF1QixnQkFBZ0IsR0FBRyxFQUFFLE1BQU0sV0FBVyxXQUFXLEVBQUUsTUFBTSxXQUFXLFdBQVcsRUFBRSxNQUFNLGlCQUFpQixTQUFTLEVBQUUsTUFBTSxtQkFBbUIsS0FBSyxFQUFFLE1BQU0sU0FBUyxTQUFTLEVBQUUsTUFBTSxXQUFXLFNBQVMsRUFBRSxNQUFNLE1BQU0sS0FBSyxFQUFFLE1BQU0sT0FBTyxLQUFLLEVBQUUsTUFBTSxRQUFRLFFBQVEsRUFBRSxNQUFNLFNBQVM7QUFDL2lCLFFBQU0sSUFBSSxTQUFTLGdCQUFnQiw4QkFBOEIsTUFBTTtBQUN2RSxTQUFPLEVBQUUsYUFBYSxLQUFLLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxNQUFNLE9BQU8sRUFBRSxjQUFjLEtBQUssY0FBYyxFQUFFLE1BQU0sVUFBVSxHQUFHLEVBQUUsZ0JBQWdCLEtBQUssRUFBRSxNQUFNLGdCQUFnQixRQUFRLEVBQUUsTUFBTSxTQUFTLFFBQVEsRUFBRSxZQUFZLENBQUMsR0FBRztBQUM3TTtBQUNBLFNBQVMsRUFBRSxHQUFHO0FBQ1osUUFBTSxJQUFJLE9BQU8sWUFBWSxJQUFJLE9BQU8sYUFBYSxJQUFJLEVBQUUsY0FBYyxLQUFLLEdBQUcsSUFBSSxFQUFFLGFBQWEsS0FBSyxHQUFHLElBQUksRUFBRSxRQUFRLElBQUksR0FBRyxJQUFJLEVBQUUsU0FBUyxJQUFJLEdBQUcsSUFBSSxLQUFLLElBQUksR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsSUFBSSxLQUFLLE1BQU0sS0FBSyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxFQUFFLElBQUksSUFBSSxHQUFHLElBQUksRUFBRSxJQUFJLEdBQUcsSUFBSSxJQUFJLElBQUksR0FBRyxJQUFJLElBQUksSUFBSTtBQUMvUSxTQUFPLElBQUksYUFBYSxLQUFLLEtBQUssS0FBSztBQUFBLE9BQ2xDLEtBQUssTUFBTSxNQUFNLEtBQUssV0FBVyxLQUFLLE1BQU0sTUFBTSxLQUFLLFlBQVksS0FBSyxPQUFPLE1BQU0sS0FBSyxZQUFZLE1BQU0sT0FBTyxNQUFNLEtBQUssV0FBVyxNQUFNO0FBQ3RKO0FBQ0EsU0FBUyxLQUFLO0FBQ1osUUFBTSxJQUFJLEVBQUUsY0FBYztBQUMxQixPQUFLLEVBQUUsT0FBTztBQUNoQjtBQUNBLFNBQVMsS0FBSztBQUNaLFFBQU0sSUFBSSxTQUFTLGVBQWUsc0JBQXNCO0FBQ3hELE1BQUk7QUFDRixXQUFPO0FBQ1QsTUFBSSxJQUFJLFNBQVMsY0FBYyxLQUFLO0FBQ3BDLFNBQU8sRUFBRSxLQUFLLHdCQUF3QixFQUFFLE1BQU0sUUFBUSxLQUFLLEVBQUUsTUFBTSxTQUFTLEtBQUssRUFBRSxNQUFNLGdCQUFnQixRQUFRLEVBQUUsTUFBTSxVQUFVLEtBQUssRUFBRSxNQUFNLFdBQVcsU0FBUyxFQUFFLE1BQU0sTUFBTSxPQUFPLEVBQUUsTUFBTSxPQUFPLE9BQU8sU0FBUyxLQUFLLFlBQVksQ0FBQyxHQUFHO0FBQy9PO0FBQ0EsU0FBUyxFQUFFLEdBQUc7QUFDWixRQUFNLEVBQUUsU0FBUyxFQUFFLElBQUk7QUFDdkIsTUFBSSxJQUFJLE9BQU8sS0FBSyxXQUFXLFNBQVMsY0FBYyxDQUFDLElBQUk7QUFDM0QsUUFBTSxJQUFJLEdBQUcsSUFBSSxHQUFHLEdBQUcsQ0FBQztBQUMxQjtBQUNBLFNBQVMsS0FBSztBQUNaLFFBQU0sSUFBSSxFQUFFLGlCQUFpQixHQUFHLElBQUksRUFBRSxjQUFjO0FBQ3BELFFBQU0sRUFBRSxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO0FBQzNCO0FBQ0EsU0FBUyxHQUFHLEdBQUcsR0FBRztBQUNoQixRQUFNLElBQUksS0FBSyxJQUFJLEdBQUcsSUFBSSxFQUFFLGNBQWMsR0FBRyxJQUFJLEVBQUUsaUJBQWlCLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxNQUFNLEdBQUcsSUFBSSxFQUFFLE9BQU8sd0JBQXdCLElBQUksRUFBRSxPQUFPLHdCQUF3QixJQUFJLEVBQUUsU0FBUyxHQUFHLElBQUksRUFBRSxzQkFBc0IsRUFBRSxvQkFBb0IsR0FBRyxLQUFLLEtBQUssT0FBTyxTQUFTLEVBQUUsa0JBQWtCLEVBQUUsZUFBZSxHQUFHLEtBQUssS0FBSyxPQUFPLFNBQVMsRUFBRSxpQkFBaUIsRUFBRSxjQUFjLEdBQUcsSUFBSSxFQUFFLEdBQUcsSUFBSSxFQUFFO0FBQ2pZLEdBQUMsS0FBSyxLQUFLLEVBQUUsSUFBSSxTQUFTLEdBQUcsR0FBRztBQUFBLElBQzlCLFFBQVE7QUFBQSxJQUNSLE9BQU87QUFBQSxFQUNULENBQUMsR0FBRyxLQUFLLEVBQUUsSUFBSSxTQUFTLEdBQUcsR0FBRztBQUFBLElBQzVCLFFBQVE7QUFBQSxJQUNSLE9BQU87QUFBQSxFQUNULENBQUM7QUFDRCxRQUFNLElBQUksQ0FBQyxLQUFLO0FBQ2hCLE1BQUksSUFBSTtBQUNSLEtBQUcsR0FBRyxFQUFFLGdCQUFnQixDQUFDLEdBQUcsRUFBRSxtQkFBbUIsQ0FBQyxHQUFHLEVBQUUsY0FBYyxDQUFDLEdBQUcsRUFBRSxpQkFBaUIsQ0FBQztBQUM3RixRQUFNLElBQUksTUFBTTtBQUNkLFFBQUksRUFBRSxzQkFBc0IsTUFBTTtBQUNoQztBQUNGLFVBQU0sSUFBSSxLQUFLLElBQUksSUFBSSxHQUFHLElBQUksTUFBTSxLQUFLLE1BQU07QUFDL0MsTUFBRSxXQUFXLEtBQUssQ0FBQyxLQUFLLE1BQU0sRUFBRSxHQUFHLENBQUMsR0FBRyxJQUFJLE9BQUssRUFBRSxTQUFTLEtBQUssSUFBSSxNQUFNLEdBQUcsR0FBRyxLQUFLLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxHQUFHLEtBQUssRUFBRSxJQUFJLFNBQVMsR0FBRyxHQUFHO0FBQUEsTUFDNUgsUUFBUSxFQUFFO0FBQUEsTUFDVixPQUFPLEVBQUU7QUFBQSxJQUNYLENBQUMsR0FBRyxFQUFFLHdCQUF3QixNQUFNLEdBQUcsRUFBRSxrQkFBa0IsQ0FBQyxHQUFHLEVBQUUscUJBQXFCLENBQUMsR0FBRyxFQUFFLGdCQUFnQixDQUFDLEdBQUcsRUFBRSxtQkFBbUIsQ0FBQyxJQUFJLE9BQU8sc0JBQXNCLENBQUM7QUFBQSxFQUMxSztBQUNBLElBQUUsd0JBQXdCLENBQUMsR0FBRyxPQUFPLHNCQUFzQixDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsV0FBVyxFQUFFLEdBQUcsQ0FBQyxHQUFHLEVBQUUsVUFBVSxPQUFPLHlCQUF5Qix1QkFBdUIsR0FBRyxFQUFFLGdCQUFnQixlQUFlLEdBQUcsRUFBRSxnQkFBZ0IsZUFBZSxHQUFHLEVBQUUsZ0JBQWdCLGVBQWUsR0FBRyxFQUFFLDBCQUEwQixLQUFLLEVBQUUsVUFBVSxJQUFJLHVCQUF1QixHQUFHLEVBQUUsVUFBVSxJQUFJLHVCQUF1QixHQUFHLEVBQUUsYUFBYSxpQkFBaUIsUUFBUSxHQUFHLEVBQUUsYUFBYSxpQkFBaUIsTUFBTSxHQUFHLEVBQUUsYUFBYSxpQkFBaUIsd0JBQXdCO0FBQ3RoQjtBQUNBLFNBQVMsS0FBSztBQUNaLE1BQUk7QUFDSixHQUFDLElBQUksU0FBUyxlQUFlLHNCQUFzQixNQUFNLFFBQVEsRUFBRSxPQUFPLEdBQUcsU0FBUyxpQkFBaUIsd0JBQXdCLEVBQUUsUUFBUSxDQUFDLE1BQU07QUFDOUksTUFBRSxVQUFVLE9BQU8seUJBQXlCLHVCQUF1QixHQUFHLEVBQUUsZ0JBQWdCLGVBQWUsR0FBRyxFQUFFLGdCQUFnQixlQUFlLEdBQUcsRUFBRSxnQkFBZ0IsZUFBZTtBQUFBLEVBQ2pMLENBQUM7QUFDSDtBQUNBLFNBQVMsSUFBSTtBQUNYLFFBQU0sSUFBSSxFQUFFLGlCQUFpQjtBQUM3QixPQUFLLE9BQU8scUJBQXFCLENBQUMsR0FBRyxFQUFFLG1CQUFtQixPQUFPLHNCQUFzQixFQUFFLENBQUM7QUFDNUY7QUFDQSxTQUFTLEdBQUcsR0FBRztBQUNiLE1BQUk7QUFDSixNQUFJLENBQUMsRUFBRSxlQUFlLEtBQUssRUFBRSxFQUFFLFFBQVEsU0FBUyxFQUFFLFlBQVk7QUFDNUQ7QUFDRixRQUFNLElBQUksRUFBRSxpQkFBaUIsR0FBRyxLQUFLLElBQUksRUFBRSxTQUFTLE1BQU0sT0FBTyxTQUFTLEVBQUUsU0FBUyxJQUFJLEVBQUU7QUFBQSxJQUN6RixHQUFHLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQztBQUFBLElBQ2QsR0FBRyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUM7QUFBQSxFQUNoQixDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUMsR0FBRyxJQUFJLEVBQUUsRUFBRSxTQUFTLENBQUM7QUFDaEMsTUFBSSxFQUFFLGVBQWUsR0FBRyxFQUFFLFVBQVU7QUFDbEMsVUFBTSxJQUFJLEVBQUUsRUFBRSxRQUFRLFNBQVMsYUFBYSxJQUFJLENBQUMsS0FBSztBQUN0RCxTQUFLLFFBQVEsRUFBRSxNQUFNO0FBQUEsRUFDdkIsT0FBTztBQUNMLFVBQU0sSUFBSSxFQUFFLEVBQUUsUUFBUSxTQUFTLGFBQWEsSUFBSSxDQUFDLEtBQUs7QUFDdEQsU0FBSyxRQUFRLEVBQUUsTUFBTTtBQUFBLEVBQ3ZCO0FBQ0Y7QUFDQSxTQUFTLEdBQUcsR0FBRztBQUNiLE1BQUk7QUFDSixJQUFFLElBQUksRUFBRSxzQkFBc0IsTUFBTSxRQUFRLE9BQU8sRUFBRSxRQUFRLFdBQVcsRUFBRSxhQUFhLElBQUksRUFBRSxRQUFRLGVBQWUsRUFBRSxpQkFBaUIsSUFBSSxFQUFFLFFBQVEsZUFBZSxFQUFFLGdCQUFnQjtBQUN4TDtBQUNBLFNBQVMsR0FBRyxHQUFHLEdBQUcsR0FBRztBQUNuQixRQUFNLElBQUksQ0FBQyxHQUFHLE1BQU07QUFDbEIsVUFBTSxJQUFJLEVBQUU7QUFDWixNQUFFLFNBQVMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUMsT0FBTyxFQUFFLGVBQWUsR0FBRyxFQUFFLGdCQUFnQixHQUFHLEVBQUUseUJBQXlCLElBQUksS0FBSyxRQUFRLEVBQUUsQ0FBQztBQUFBLEVBQzdIO0FBQ0EsV0FBUyxpQkFBaUIsZUFBZSxHQUFHLElBQUUsR0FBRyxTQUFTLGlCQUFpQixhQUFhLEdBQUcsSUFBRSxHQUFHLFNBQVMsaUJBQWlCLGFBQWEsR0FBRyxJQUFFLEdBQUcsU0FBUyxpQkFBaUIsV0FBVyxHQUFHLElBQUUsR0FBRyxTQUFTO0FBQUEsSUFDbk07QUFBQSxJQUNBLENBQUMsTUFBTTtBQUNMLFFBQUUsR0FBRyxDQUFDO0FBQUEsSUFDUjtBQUFBLElBQ0E7QUFBQSxFQUNGO0FBQ0Y7QUFDQSxTQUFTLEtBQUs7QUFDWixTQUFPLGlCQUFpQixTQUFTLElBQUksS0FBRSxHQUFHLE9BQU8saUJBQWlCLFdBQVcsSUFBSSxLQUFFLEdBQUcsT0FBTyxpQkFBaUIsVUFBVSxDQUFDLEdBQUcsT0FBTyxpQkFBaUIsVUFBVSxDQUFDO0FBQ2pLO0FBQ0EsU0FBUyxLQUFLO0FBQ1osU0FBTyxvQkFBb0IsU0FBUyxFQUFFLEdBQUcsT0FBTyxvQkFBb0IsVUFBVSxDQUFDLEdBQUcsT0FBTyxvQkFBb0IsVUFBVSxDQUFDO0FBQzFIO0FBQ0EsU0FBUyxLQUFLO0FBQ1osUUFBTSxJQUFJLEVBQUUsU0FBUztBQUNyQixRQUFNLEVBQUUsUUFBUSxNQUFNLFVBQVU7QUFDbEM7QUFDQSxTQUFTLEVBQUUsR0FBRyxHQUFHO0FBQ2YsTUFBSSxHQUFHO0FBQ1AsTUFBSSxJQUFJLEVBQUUsU0FBUztBQUNuQixPQUFLLFNBQVMsS0FBSyxZQUFZLEVBQUUsT0FBTyxHQUFHLElBQUksR0FBRyxHQUFHLFNBQVMsS0FBSyxZQUFZLEVBQUUsT0FBTztBQUN4RixRQUFNO0FBQUEsSUFDSixPQUFPO0FBQUEsSUFDUCxhQUFhO0FBQUEsSUFDYixhQUFhO0FBQUEsSUFDYixnQkFBZ0I7QUFBQSxJQUNoQixjQUFjO0FBQUEsSUFDZCxhQUFhLElBQUksRUFBRSxhQUFhLEtBQUs7QUFBQSxJQUNyQyxhQUFhLElBQUksRUFBRSxhQUFhLEtBQUs7QUFBQSxJQUNyQyxjQUFjLElBQUksRUFBRSxjQUFjLEtBQUs7QUFBQSxFQUN6QyxJQUFJLEVBQUUsV0FBVyxDQUFDO0FBQ2xCLElBQUUsV0FBVyxZQUFZLEdBQUcsRUFBRSxlQUFlLFlBQVksR0FBRyxFQUFFLFNBQVMsWUFBWSxHQUFHLEtBQUssRUFBRSxNQUFNLFlBQVksR0FBRyxFQUFFLE1BQU0sTUFBTSxVQUFVLFdBQVcsRUFBRSxNQUFNLE1BQU0sVUFBVSxRQUFRLEtBQUssRUFBRSxZQUFZLFlBQVksR0FBRyxFQUFFLFlBQVksTUFBTSxVQUFVLFdBQVcsRUFBRSxZQUFZLE1BQU0sVUFBVTtBQUM5UixRQUFNLElBQUksS0FBSyxFQUFFLGFBQWEsR0FBRyxJQUFJLEtBQUssRUFBRSxjQUFjLEtBQUssT0FBSSxLQUFLLEtBQUssT0FBTyxTQUFTLEVBQUUsU0FBUyxNQUFNLE9BQU8sS0FBSyxPQUFPLFNBQVMsRUFBRSxTQUFTLFVBQVUsTUFBTTtBQUNySyxJQUFFLFlBQVksTUFBTSxVQUFVLEVBQUUsU0FBUyxPQUFPLElBQUksVUFBVSxRQUFRLEtBQUssRUFBRSxPQUFPLE1BQU0sVUFBVSxRQUFRLEVBQUUsU0FBUyxNQUFNLFVBQVUsSUFBSSxVQUFVLFFBQVEsRUFBRSxXQUFXLE1BQU0sVUFBVSxFQUFFLFNBQVMsTUFBTSxJQUFJLFVBQVUsUUFBUSxFQUFFLGVBQWUsTUFBTSxVQUFVLEVBQUUsU0FBUyxVQUFVLElBQUksVUFBVSxVQUFVLEVBQUUsT0FBTyxNQUFNLFVBQVU7QUFDeFUsUUFBTSxJQUFJLEtBQUssRUFBRSxnQkFBZ0IsS0FBSyxDQUFDO0FBQ3ZDLE9BQUssUUFBUSxFQUFFLFNBQVMsTUFBTSxNQUFNLEVBQUUsV0FBVyxXQUFXLE1BQUksRUFBRSxXQUFXLFVBQVUsSUFBSSw2QkFBNkIsSUFBSSxLQUFLLFFBQVEsRUFBRSxTQUFTLFVBQVUsTUFBTSxFQUFFLGVBQWUsV0FBVyxNQUFJLEVBQUUsZUFBZSxVQUFVLElBQUksNkJBQTZCLElBQUksS0FBSyxRQUFRLEVBQUUsU0FBUyxPQUFPLE1BQU0sRUFBRSxZQUFZLFdBQVcsTUFBSSxFQUFFLFlBQVksVUFBVSxJQUFJLDZCQUE2QjtBQUMvWCxRQUFNLElBQUksRUFBRTtBQUNaLElBQUUsTUFBTSxVQUFVLFNBQVMsRUFBRSxNQUFNLE9BQU8sSUFBSSxFQUFFLE1BQU0sTUFBTSxJQUFJLEVBQUUsTUFBTSxTQUFTLElBQUksRUFBRSxNQUFNLFFBQVEsSUFBSSxFQUFFLEtBQUssMEJBQTBCLEVBQUUsYUFBYSxRQUFRLFFBQVEsR0FBRyxFQUFFLGFBQWEsbUJBQW1CLHNCQUFzQixHQUFHLEVBQUUsYUFBYSxvQkFBb0IsNEJBQTRCO0FBQ3RTLFFBQU0sSUFBSSxFQUFFO0FBQ1osSUFBRSxZQUFZO0FBQ2QsUUFBTSxNQUFNLElBQUksRUFBRSxZQUFZLE9BQU8sU0FBUyxFQUFFLGlCQUFpQixFQUFFLGNBQWMsS0FBSztBQUN0RixJQUFFLFlBQVksa0JBQWtCLElBQUksS0FBSyxHQUFHO0FBQUEsSUFDMUMsRUFBRTtBQUFBLElBQ0YsQ0FBQyxNQUFNO0FBQ0wsVUFBSSxHQUFHLEdBQUc7QUFDVixZQUFNLElBQUksRUFBRSxRQUFRLE1BQU0sSUFBSSxFQUFFLFlBQVksT0FBTyxTQUFTLEVBQUUsZ0JBQWdCLEVBQUUsYUFBYSxHQUFHLE1BQU0sSUFBSSxFQUFFLFlBQVksT0FBTyxTQUFTLEVBQUUsZ0JBQWdCLEVBQUUsYUFBYSxHQUFHLE1BQU0sSUFBSSxFQUFFLFlBQVksT0FBTyxTQUFTLEVBQUUsaUJBQWlCLEVBQUUsY0FBYztBQUN2UCxVQUFJLEVBQUUsVUFBVSxTQUFTLHlCQUF5QjtBQUNoRCxlQUFPLElBQUksRUFBRSxHQUFHLEdBQUc7QUFBQSxVQUNqQixRQUFRLEVBQUU7QUFBQSxVQUNWLE9BQU8sRUFBRTtBQUFBLFFBQ1gsQ0FBQyxJQUFJLEVBQUUsV0FBVztBQUNwQixVQUFJLEVBQUUsVUFBVSxTQUFTLHlCQUF5QjtBQUNoRCxlQUFPLElBQUksRUFBRSxHQUFHLEdBQUc7QUFBQSxVQUNqQixRQUFRLEVBQUU7QUFBQSxVQUNWLE9BQU8sRUFBRTtBQUFBLFFBQ1gsQ0FBQyxJQUFJLEVBQUUsV0FBVztBQUNwQixVQUFJLEVBQUUsVUFBVSxTQUFTLDBCQUEwQjtBQUNqRCxlQUFPLElBQUksRUFBRSxHQUFHLEdBQUc7QUFBQSxVQUNqQixRQUFRLEVBQUU7QUFBQSxVQUNWLE9BQU8sRUFBRTtBQUFBLFFBQ1gsQ0FBQyxJQUFJLEVBQUUsWUFBWTtBQUFBLElBQ3ZCO0FBQUEsSUFDQSxDQUFDLE1BQU0sRUFBRSxLQUFLLFFBQVEsRUFBRSxZQUFZLFNBQVMsQ0FBQyxNQUFNLEVBQUUsS0FBSyxRQUFRLEVBQUUsTUFBTSxTQUFTLENBQUMsTUFBTSxPQUFPLEVBQUUsYUFBYSxZQUFZLEVBQUUsVUFBVSxTQUFTLGdCQUFnQjtBQUFBLEVBQ3BLLEdBQUcsRUFBRSxXQUFXLENBQUM7QUFDakIsUUFBTSxNQUFNLElBQUksRUFBRSxZQUFZLE9BQU8sU0FBUyxFQUFFLG9CQUFvQixFQUFFLGlCQUFpQjtBQUN2RixPQUFLLEVBQUUsR0FBRztBQUFBLElBQ1IsUUFBUSxFQUFFO0FBQUEsSUFDVixPQUFPLEVBQUU7QUFBQSxFQUNYLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNqQixRQUFNLElBQUksRUFBRSxVQUFVLFNBQVMsc0JBQXNCLEdBQUcsSUFBSSxFQUFFLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDbEYsSUFBRSxTQUFTLEtBQUssRUFBRSxDQUFDLEVBQUUsTUFBTTtBQUM3QjtBQUNBLFNBQVMsS0FBSztBQUNaLFFBQU0sSUFBSSxFQUFFLFNBQVM7QUFDckIsTUFBSSxFQUFFLEtBQUssUUFBUSxFQUFFO0FBQ25CO0FBQ0YsUUFBTSxJQUFJLEVBQUUsUUFBUSxzQkFBc0IsR0FBRyxJQUFJLEVBQUUsY0FBYyxLQUFLLEdBQUcsSUFBSSxFQUFFLGVBQWUsS0FBSztBQUNuRyxTQUFPO0FBQUEsSUFDTCxPQUFPLEVBQUUsUUFBUSxJQUFJO0FBQUEsSUFDckIsUUFBUSxFQUFFLFNBQVMsSUFBSTtBQUFBLElBQ3ZCLFdBQVcsRUFBRTtBQUFBLElBQ2IsWUFBWSxFQUFFO0FBQUEsRUFDaEI7QUFDRjtBQUNBLFNBQVMsRUFBRSxHQUFHLEdBQUc7QUFDZixRQUFNLEVBQUUsbUJBQW1CLEdBQUcsbUJBQW1CLEdBQUcsZ0JBQWdCLEdBQUcsd0JBQXdCLEVBQUUsSUFBSTtBQUNyRyxTQUFPLE1BQU0sVUFBVSxLQUFLO0FBQUEsSUFDMUIsS0FBSztBQUFBLE1BQ0gsRUFBRSxNQUFNO0FBQUEsTUFDUixPQUFPLGNBQWMsRUFBRSxhQUFhLEVBQUU7QUFBQSxJQUN4QztBQUFBLElBQ0EsRUFBRTtBQUFBLEVBQ0osSUFBSSxNQUFNLFFBQVEsS0FBSztBQUFBLElBQ3JCLEtBQUs7QUFBQSxNQUNILEVBQUUsT0FBTyxLQUFLLE9BQU8sU0FBUyxFQUFFLGNBQWMsRUFBRSxTQUFTO0FBQUEsTUFDekQsT0FBTyxlQUFlLEtBQUssT0FBTyxTQUFTLEVBQUUsY0FBYyxFQUFFO0FBQUEsSUFDL0Q7QUFBQSxJQUNBLEVBQUU7QUFBQSxFQUNKLElBQUksTUFBTSxXQUFXLEtBQUs7QUFBQSxJQUN4QixLQUFLO0FBQUEsTUFDSCxFQUFFLE1BQU0sRUFBRSxTQUFTLEtBQUssS0FBSyxPQUFPLFNBQVMsRUFBRSxjQUFjO0FBQUEsTUFDN0QsT0FBTyxlQUFlLEtBQUssT0FBTyxTQUFTLEVBQUUsY0FBYyxFQUFFO0FBQUEsSUFDL0Q7QUFBQSxJQUNBLEVBQUU7QUFBQSxFQUNKLElBQUk7QUFDTjtBQUNBLFNBQVMsRUFBRSxHQUFHLEdBQUc7QUFDZixRQUFNLEVBQUUsbUJBQW1CLEdBQUcsbUJBQW1CLEdBQUcsZ0JBQWdCLEdBQUcsd0JBQXdCLEVBQUUsSUFBSTtBQUNyRyxTQUFPLE1BQU0sVUFBVSxLQUFLO0FBQUEsSUFDMUIsS0FBSztBQUFBLE1BQ0gsRUFBRSxPQUFPO0FBQUEsTUFDVCxPQUFPLGFBQWEsRUFBRSxZQUFZLEVBQUU7QUFBQSxJQUN0QztBQUFBLElBQ0EsRUFBRTtBQUFBLEVBQ0osSUFBSSxNQUFNLFFBQVEsS0FBSztBQUFBLElBQ3JCLEtBQUs7QUFBQSxNQUNILEVBQUUsUUFBUSxLQUFLLE9BQU8sU0FBUyxFQUFFLGFBQWEsRUFBRSxRQUFRO0FBQUEsTUFDeEQsT0FBTyxjQUFjLEtBQUssT0FBTyxTQUFTLEVBQUUsYUFBYSxFQUFFO0FBQUEsSUFDN0Q7QUFBQSxJQUNBLEVBQUU7QUFBQSxFQUNKLElBQUksTUFBTSxXQUFXLEtBQUs7QUFBQSxJQUN4QixLQUFLO0FBQUEsTUFDSCxFQUFFLE9BQU8sRUFBRSxRQUFRLEtBQUssS0FBSyxPQUFPLFNBQVMsRUFBRSxhQUFhO0FBQUEsTUFDNUQsT0FBTyxjQUFjLEtBQUssT0FBTyxTQUFTLEVBQUUsYUFBYSxFQUFFO0FBQUEsSUFDN0Q7QUFBQSxJQUNBLEVBQUU7QUFBQSxFQUNKLElBQUk7QUFDTjtBQUNBLFNBQVMsR0FBRyxHQUFHLEdBQUc7QUFDaEIsUUFBTSxJQUFJLEVBQUUsU0FBUztBQUNyQixNQUFJLENBQUM7QUFDSDtBQUNGLFFBQU0sRUFBRSxPQUFPLElBQUksU0FBUyxNQUFNLElBQUksT0FBTyxLQUFLLEtBQUssT0FBTyxTQUFTLEVBQUUsWUFBWSxDQUFDLEdBQUcsSUFBSSxHQUFHLElBQUksRUFBRSxPQUFPLHlCQUF5QixTQUFTLEdBQUcsSUFBSSxFQUFFLGNBQWMsS0FBSyxHQUFHLElBQUksR0FBRyxHQUFHLElBQUksRUFBRSxNQUFNLHNCQUFzQixHQUFHLElBQUksRUFBRSxzQkFBc0IsR0FBRyxJQUFJLEVBQUUsTUFBTSxFQUFFO0FBQzFRLE1BQUksSUFBSSxLQUFLO0FBQ2IsUUFBTSxJQUFJLE9BQU8sZUFBZSxFQUFFLFNBQVMsRUFBRTtBQUM3QyxNQUFJLElBQUksS0FBSztBQUNiLFFBQU0sSUFBSSxFQUFFLE9BQU8sRUFBRTtBQUNyQixNQUFJLElBQUksS0FBSztBQUNiLFFBQU0sSUFBSSxPQUFPLGNBQWMsRUFBRSxRQUFRLEVBQUU7QUFDM0MsTUFBSSxJQUFJLEtBQUs7QUFDYixRQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQztBQUM3QixNQUFJLElBQUk7QUFDUixNQUFJLE1BQU0sU0FBUyxJQUFJLElBQUksSUFBSSxJQUFJLFFBQUssTUFBTSxZQUFZLElBQUksSUFBSSxJQUFJLElBQUksUUFBSyxNQUFNLFVBQVUsSUFBSSxJQUFJLElBQUksSUFBSSxRQUFLLE1BQU0sV0FBVyxNQUFNLElBQUksSUFBSSxJQUFJLFFBQUssTUFBTSxRQUFRO0FBQ3hLLFVBQU0sSUFBSSxPQUFPLGFBQWEsSUFBSSxFQUFFLFlBQVksR0FBRyxJQUFJLE9BQU8sY0FBYyxJQUFJLEVBQUUsYUFBYTtBQUMvRixNQUFFLFFBQVEsTUFBTSxPQUFPLEdBQUcsT0FBTyxFQUFFLFFBQVEsTUFBTSxRQUFRLFFBQVEsRUFBRSxRQUFRLE1BQU0sTUFBTSxHQUFHLE9BQU8sRUFBRSxRQUFRLE1BQU0sU0FBUztBQUFBLEVBQzVILFdBQVcsR0FBRztBQUNaLFVBQU0sSUFBSSxPQUFPLGFBQWEsS0FBSyxLQUFLLE9BQU8sU0FBUyxFQUFFLGFBQWEsR0FBRyxJQUFJO0FBQzlFLE1BQUUsUUFBUSxNQUFNLE9BQU8sR0FBRyxPQUFPLEVBQUUsUUFBUSxNQUFNLFFBQVEsUUFBUSxFQUFFLFFBQVEsTUFBTSxTQUFTLEdBQUcsT0FBTyxFQUFFLFFBQVEsTUFBTSxNQUFNO0FBQUEsRUFDNUgsV0FBVyxHQUFHO0FBQ1osVUFBTSxJQUFJLEtBQUs7QUFBQSxNQUNiO0FBQUEsTUFDQSxPQUFPLGNBQWMsS0FBSyxPQUFPLFNBQVMsRUFBRSxhQUFhLEVBQUU7QUFBQSxJQUM3RCxHQUFHLElBQUksRUFBRSxHQUFHO0FBQUEsTUFDVixtQkFBbUI7QUFBQSxNQUNuQixtQkFBbUI7QUFBQSxNQUNuQixnQkFBZ0I7QUFBQSxNQUNoQix3QkFBd0I7QUFBQSxJQUMxQixDQUFDO0FBQ0QsTUFBRSxRQUFRLE1BQU0sT0FBTyxHQUFHLE9BQU8sRUFBRSxRQUFRLE1BQU0sTUFBTSxHQUFHLE9BQU8sRUFBRSxRQUFRLE1BQU0sU0FBUyxRQUFRLEVBQUUsUUFBUSxNQUFNLFFBQVEsUUFBUSxJQUFJO0FBQUEsRUFDeEksV0FBVyxHQUFHO0FBQ1osVUFBTSxJQUFJLEtBQUs7QUFBQSxNQUNiO0FBQUEsTUFDQSxPQUFPLGNBQWMsS0FBSyxPQUFPLFNBQVMsRUFBRSxhQUFhLEVBQUU7QUFBQSxJQUM3RCxHQUFHLElBQUksRUFBRSxHQUFHO0FBQUEsTUFDVixtQkFBbUI7QUFBQSxNQUNuQixtQkFBbUI7QUFBQSxNQUNuQixnQkFBZ0I7QUFBQSxNQUNoQix3QkFBd0I7QUFBQSxJQUMxQixDQUFDO0FBQ0QsTUFBRSxRQUFRLE1BQU0sUUFBUSxHQUFHLE9BQU8sRUFBRSxRQUFRLE1BQU0sTUFBTSxHQUFHLE9BQU8sRUFBRSxRQUFRLE1BQU0sU0FBUyxRQUFRLEVBQUUsUUFBUSxNQUFNLE9BQU8sUUFBUSxJQUFJO0FBQUEsRUFDeEksV0FBVyxHQUFHO0FBQ1osVUFBTSxJQUFJLEtBQUs7QUFBQSxNQUNiO0FBQUEsTUFDQSxPQUFPLGNBQWMsRUFBRSxhQUFhLEVBQUU7QUFBQSxJQUN4QztBQUNBLFFBQUksSUFBSSxFQUFFLEdBQUc7QUFBQSxNQUNYLG1CQUFtQjtBQUFBLE1BQ25CLG1CQUFtQjtBQUFBLE1BQ25CLGdCQUFnQjtBQUFBLE1BQ2hCLHdCQUF3QjtBQUFBLElBQzFCLENBQUM7QUFDRCxNQUFFLFFBQVEsTUFBTSxNQUFNLEdBQUcsT0FBTyxFQUFFLFFBQVEsTUFBTSxPQUFPLEdBQUcsT0FBTyxFQUFFLFFBQVEsTUFBTSxTQUFTLFFBQVEsRUFBRSxRQUFRLE1BQU0sUUFBUSxRQUFRLElBQUk7QUFBQSxFQUN4SSxXQUFXLEdBQUc7QUFDWixVQUFNLElBQUksS0FBSztBQUFBLE1BQ2I7QUFBQSxNQUNBLE9BQU8sZUFBZSxLQUFLLE9BQU8sU0FBUyxFQUFFLGNBQWMsRUFBRTtBQUFBLElBQy9EO0FBQ0EsUUFBSSxJQUFJLEVBQUUsR0FBRztBQUFBLE1BQ1gsbUJBQW1CO0FBQUEsTUFDbkIsbUJBQW1CO0FBQUEsTUFDbkIsZ0JBQWdCO0FBQUEsTUFDaEIsd0JBQXdCO0FBQUEsSUFDMUIsQ0FBQztBQUNELE1BQUUsUUFBUSxNQUFNLE9BQU8sR0FBRyxPQUFPLEVBQUUsUUFBUSxNQUFNLFNBQVMsR0FBRyxPQUFPLEVBQUUsUUFBUSxNQUFNLE1BQU0sUUFBUSxFQUFFLFFBQVEsTUFBTSxRQUFRLFFBQVEsSUFBSTtBQUFBLEVBQ3hJO0FBQ0EsTUFBSSxFQUFFLE1BQU0sVUFBVSxJQUFJLDJCQUEyQixJQUFJLEdBQUcsR0FBRyxHQUFHLENBQUM7QUFDckU7QUFDQSxTQUFTLEdBQUcsR0FBRyxHQUFHLEdBQUc7QUFDbkIsUUFBTSxJQUFJLEVBQUUsU0FBUztBQUNyQixNQUFJLENBQUM7QUFDSDtBQUNGLFFBQU0sSUFBSSxFQUFFLHNCQUFzQixHQUFHLElBQUksR0FBRyxHQUFHLElBQUksRUFBRSxPQUFPLElBQUksRUFBRSxPQUFPLElBQUksT0FBTyxZQUFZLElBQUksRUFBRSxPQUFPLElBQUksRUFBRSxNQUFNLElBQUksRUFBRSxRQUFRLElBQUksT0FBTyxhQUFhLElBQUksRUFBRSxLQUFLLElBQUksRUFBRTtBQUNoTCxJQUFFLFlBQVk7QUFDZCxNQUFJLElBQUksR0FBRyxJQUFJO0FBQ2YsUUFBTSxTQUFTLElBQUksS0FBSyxLQUFLLElBQUksU0FBUyxJQUFJLFNBQVMsSUFBSSxJQUFJLEtBQUssTUFBTSxJQUFJLE9BQU8sSUFBSSxVQUFVLEtBQUssS0FBSyxJQUFJLFFBQVEsSUFBSSxTQUFTLElBQUksS0FBSyxNQUFNLElBQUksT0FBTyxJQUFJLFVBQVUsTUFBTSxZQUFZLElBQUksS0FBSyxLQUFLLElBQUksU0FBUyxJQUFJLFdBQVcsSUFBSSxJQUFJLEtBQUssTUFBTSxJQUFJLFVBQVUsSUFBSSxVQUFVLEtBQUssS0FBSyxJQUFJLFFBQVEsSUFBSSxXQUFXLElBQUksS0FBSyxNQUFNLElBQUksVUFBVSxJQUFJLFVBQVUsTUFBTSxVQUFVLElBQUksS0FBSyxLQUFLLElBQUksVUFBVSxJQUFJLFNBQVMsSUFBSSxJQUFJLEtBQUssTUFBTSxJQUFJLFFBQVEsSUFBSSxVQUFVLEtBQUssS0FBSyxJQUFJLE9BQU8sSUFBSSxTQUFTLElBQUksS0FBSyxNQUFNLElBQUksUUFBUSxJQUFJLFVBQVUsTUFBTSxZQUFZLElBQUksS0FBSyxLQUFLLElBQUksVUFBVSxJQUFJLFdBQVcsSUFBSSxJQUFJLEtBQUssTUFBTSxJQUFJLFNBQVMsSUFBSSxVQUFVLEtBQUssS0FBSyxJQUFJLE9BQU8sSUFBSSxXQUFXLElBQUksS0FBSyxNQUFNLElBQUksU0FBUyxJQUFJLFNBQVMsS0FBSyxFQUFFLFVBQVUsSUFBSSw2QkFBNkIsR0FBRyxHQUFHLEVBQUUsVUFBVSxJQUFJLDhCQUE4QixHQUFHLEtBQUssRUFBRSxVQUFVLElBQUksMkJBQTJCO0FBQzcyQjtBQUNBLFNBQVMsS0FBSztBQUNaLFFBQU0sSUFBSSxTQUFTLGNBQWMsS0FBSztBQUN0QyxJQUFFLFVBQVUsSUFBSSxnQkFBZ0I7QUFDaEMsUUFBTSxJQUFJLFNBQVMsY0FBYyxLQUFLO0FBQ3RDLElBQUUsVUFBVSxJQUFJLHNCQUFzQjtBQUN0QyxRQUFNLElBQUksU0FBUyxjQUFjLFFBQVE7QUFDekMsSUFBRSxLQUFLLHdCQUF3QixFQUFFLFVBQVUsSUFBSSxzQkFBc0IsR0FBRyxFQUFFLE1BQU0sVUFBVSxRQUFRLEVBQUUsWUFBWTtBQUNoSCxRQUFNLElBQUksU0FBUyxjQUFjLEtBQUs7QUFDdEMsSUFBRSxLQUFLLDhCQUE4QixFQUFFLFVBQVUsSUFBSSw0QkFBNEIsR0FBRyxFQUFFLE1BQU0sVUFBVSxRQUFRLEVBQUUsWUFBWTtBQUM1SCxRQUFNLElBQUksU0FBUyxjQUFjLFFBQVE7QUFDekMsSUFBRSxPQUFPLFVBQVUsRUFBRSxVQUFVLElBQUksMEJBQTBCLEdBQUcsRUFBRSxhQUFhLGNBQWMsT0FBTyxHQUFHLEVBQUUsWUFBWTtBQUNySCxRQUFNLElBQUksU0FBUyxjQUFjLFFBQVE7QUFDekMsSUFBRSxVQUFVLElBQUksdUJBQXVCO0FBQ3ZDLFFBQU0sSUFBSSxTQUFTLGNBQWMsTUFBTTtBQUN2QyxJQUFFLFVBQVUsSUFBSSw4QkFBOEIsR0FBRyxFQUFFLFlBQVk7QUFDL0QsUUFBTSxJQUFJLFNBQVMsY0FBYyxNQUFNO0FBQ3ZDLElBQUUsVUFBVSxJQUFJLGdDQUFnQztBQUNoRCxRQUFNLElBQUksU0FBUyxjQUFjLFFBQVE7QUFDekMsSUFBRSxPQUFPLFVBQVUsRUFBRSxVQUFVLElBQUkseUJBQXlCLEdBQUcsRUFBRSxZQUFZO0FBQzdFLFFBQU0sSUFBSSxTQUFTLGNBQWMsUUFBUTtBQUN6QyxTQUFPLEVBQUUsT0FBTyxVQUFVLEVBQUUsVUFBVSxJQUFJLHlCQUF5QixHQUFHLEVBQUUsWUFBWSxlQUFlLEVBQUUsWUFBWSxDQUFDLEdBQUcsRUFBRSxZQUFZLENBQUMsR0FBRyxFQUFFLFlBQVksQ0FBQyxHQUFHLEVBQUUsWUFBWSxDQUFDLEdBQUcsRUFBRSxZQUFZLENBQUMsR0FBRyxFQUFFLFlBQVksQ0FBQyxHQUFHLEVBQUUsWUFBWSxDQUFDLEdBQUcsRUFBRSxZQUFZLENBQUMsR0FBRyxFQUFFLFlBQVksQ0FBQyxHQUFHO0FBQUEsSUFDblEsU0FBUztBQUFBLElBQ1QsT0FBTztBQUFBLElBQ1AsT0FBTztBQUFBLElBQ1AsYUFBYTtBQUFBLElBQ2IsUUFBUTtBQUFBLElBQ1IsZ0JBQWdCO0FBQUEsSUFDaEIsWUFBWTtBQUFBLElBQ1osYUFBYTtBQUFBLElBQ2IsZUFBZTtBQUFBLElBQ2YsVUFBVTtBQUFBLEVBQ1o7QUFDRjtBQUNBLFNBQVMsS0FBSztBQUNaLE1BQUk7QUFDSixRQUFNLElBQUksRUFBRSxTQUFTO0FBQ3JCLFNBQU8sSUFBSSxFQUFFLFFBQVEsa0JBQWtCLFFBQVEsRUFBRSxZQUFZLEVBQUUsT0FBTztBQUN4RTtBQUNBLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRztBQUNsQixJQUFFLENBQUM7QUFDSCxXQUFTLElBQUk7QUFDWCxNQUFFLFlBQVksS0FBSyxFQUFFO0FBQUEsRUFDdkI7QUFDQSxXQUFTLElBQUk7QUFDWCxVQUFNLElBQUksRUFBRSxhQUFhLEdBQUcsSUFBSSxFQUFFLE9BQU8sS0FBSyxDQUFDO0FBQy9DLFFBQUksT0FBTyxLQUFLO0FBQ2Q7QUFDRixVQUFNLElBQUksSUFBSTtBQUNkLE1BQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLEVBQUU7QUFBQSxFQUNsQjtBQUNBLFdBQVMsSUFBSTtBQUNYLFVBQU0sSUFBSSxFQUFFLGFBQWEsR0FBRyxJQUFJLEVBQUUsT0FBTyxLQUFLLENBQUM7QUFDL0MsUUFBSSxPQUFPLEtBQUs7QUFDZDtBQUNGLFVBQU0sSUFBSSxJQUFJO0FBQ2QsTUFBRSxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksRUFBRTtBQUFBLEVBQ2xCO0FBQ0EsV0FBUyxFQUFFLEdBQUc7QUFDWixLQUFDLEVBQUUsT0FBTyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksRUFBRTtBQUFBLEVBQ25DO0FBQ0EsV0FBUyxJQUFJO0FBQ1gsUUFBSTtBQUNKLFFBQUksRUFBRSxzQkFBc0I7QUFDMUI7QUFDRixVQUFNLElBQUksRUFBRSxhQUFhLEdBQUcsSUFBSSxFQUFFLGNBQWMsR0FBRyxJQUFJLEVBQUUsaUJBQWlCO0FBQzFFLFFBQUksT0FBTyxLQUFLLGVBQWUsT0FBTyxLQUFLLGVBQWUsT0FBTyxFQUFFLGFBQWEsS0FBSztBQUNuRjtBQUNGLFVBQU0sTUFBTSxJQUFJLEVBQUUsWUFBWSxPQUFPLFNBQVMsRUFBRSxnQkFBZ0IsRUFBRSxhQUFhO0FBQy9FLFFBQUk7QUFDRixhQUFPLEVBQUUsR0FBRyxHQUFHO0FBQUEsUUFDYixRQUFRLEVBQUU7QUFBQSxRQUNWLE9BQU8sRUFBRTtBQUFBLE1BQ1gsQ0FBQztBQUNILE1BQUU7QUFBQSxFQUNKO0FBQ0EsV0FBUyxJQUFJO0FBQ1gsUUFBSTtBQUNKLFFBQUksRUFBRSxzQkFBc0I7QUFDMUI7QUFDRixVQUFNLElBQUksRUFBRSxhQUFhLEdBQUcsSUFBSSxFQUFFLGNBQWMsR0FBRyxJQUFJLEVBQUUsaUJBQWlCO0FBQzFFLFFBQUksT0FBTyxLQUFLLGVBQWUsT0FBTyxLQUFLO0FBQ3pDO0FBQ0YsVUFBTSxNQUFNLElBQUksRUFBRSxZQUFZLE9BQU8sU0FBUyxFQUFFLGdCQUFnQixFQUFFLGFBQWE7QUFDL0UsUUFBSTtBQUNGLGFBQU8sRUFBRSxHQUFHLEdBQUc7QUFBQSxRQUNiLFFBQVEsRUFBRTtBQUFBLFFBQ1YsT0FBTyxFQUFFO0FBQUEsTUFDWCxDQUFDO0FBQ0gsTUFBRTtBQUFBLEVBQ0o7QUFDQSxXQUFTLElBQUk7QUFDWCxNQUFFLGVBQWUsTUFBTSxFQUFFLGlCQUFpQixJQUFFLEdBQUcsU0FBUyxLQUFLLFVBQVUsSUFBSSxpQkFBaUIsRUFBRSxTQUFTLElBQUksZ0JBQWdCLGVBQWUsR0FBRyxHQUFHLEdBQUcsRUFBRSxnQkFBZ0IsQ0FBQyxHQUFHLEVBQUUsZUFBZSxDQUFDLEdBQUcsRUFBRSxrQkFBa0IsQ0FBQyxHQUFHLEVBQUUsbUJBQW1CLENBQUM7QUFBQSxFQUM5TztBQUNBLFdBQVMsRUFBRSxJQUFJLEdBQUc7QUFDaEIsUUFBSSxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHO0FBQ3pCLFVBQU0sSUFBSSxFQUFFLE9BQU87QUFDbkIsUUFBSSxDQUFDLEdBQUc7QUFDTixjQUFRLE1BQU0sMkJBQTJCLEdBQUcsRUFBRTtBQUM5QztBQUFBLElBQ0Y7QUFDQSxRQUFJLENBQUMsRUFBRSxDQUFDLEdBQUc7QUFDVCxRQUFFO0FBQ0Y7QUFBQSxJQUNGO0FBQ0EsTUFBRSx1QkFBdUIsU0FBUyxhQUFhLEdBQUcsRUFBRSxlQUFlLENBQUM7QUFDcEUsVUFBTSxJQUFJLEVBQUUsQ0FBQyxHQUFHLElBQUksRUFBRSxJQUFJLENBQUMsR0FBRyxJQUFJLEVBQUUsSUFBSSxDQUFDLEdBQUcsTUFBTSxJQUFJLEVBQUUsWUFBWSxPQUFPLFNBQVMsRUFBRSxnQkFBZ0IsRUFBRSxhQUFhLEtBQUssUUFBUSxJQUFJLEVBQUUsWUFBWSxHQUFHLElBQUksU0FBUyxJQUFJLEVBQUUsWUFBWSxPQUFPLFNBQVMsRUFBRSxpQkFBaUIsZUFBZSxJQUFJLEVBQUUsWUFBWSxPQUFPLFNBQVMsRUFBRSxlQUFlLEVBQUUsY0FBYyxHQUFHLE9BQU8sSUFBSSxFQUFFLFlBQVksT0FBTyxTQUFTLEVBQUUsaUJBQWlCLEVBQUUsY0FBYyxLQUFLLDRCQUE0QixRQUFRLGVBQWUsR0FBRyxJQUFJLEdBQUcsRUFBRSxRQUFRLGFBQWEsR0FBRyxFQUFFLFFBQVEsR0FBRyxNQUFNLElBQUksRUFBRSxZQUFZLE9BQU8sU0FBUyxFQUFFLGdCQUFnQixFQUFFLGFBQWEsR0FBRyxJQUFJO0FBQUEsTUFDampCO0FBQUEsTUFDQTtBQUFBLE1BQ0EsR0FBRyxJQUFJLENBQUMsT0FBTyxJQUFJLENBQUM7QUFBQSxJQUN0QixFQUFFLE9BQU8sQ0FBQyxPQUFPLEVBQUUsS0FBSyxRQUFRLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxDQUFDLEdBQUcsTUFBTSxJQUFJLEVBQUUsWUFBWSxPQUFPLFNBQVMsRUFBRSxnQkFBZ0IsRUFBRSxhQUFhLEdBQUcsTUFBTSxJQUFJLEVBQUUsWUFBWSxPQUFPLFNBQVMsRUFBRSxnQkFBZ0IsRUFBRSxhQUFhLEdBQUcsTUFBTSxJQUFJLEVBQUUsWUFBWSxPQUFPLFNBQVMsRUFBRSxpQkFBaUIsRUFBRSxjQUFjO0FBQ2pTLE1BQUU7QUFBQSxNQUNBLEdBQUc7QUFBQSxNQUNILFNBQVM7QUFBQSxRQUNQLGFBQWE7QUFBQSxRQUNiLGFBQWEsSUFBSSxTQUFTO0FBQUEsUUFDMUIsZ0JBQWdCLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztBQUFBLFFBQ3pDLGNBQWM7QUFBQSxRQUNkLGNBQWM7QUFBQSxRQUNkLGFBQWEsTUFBTSxNQUFNO0FBQ3ZCLGNBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFO0FBQUEsUUFDbkI7QUFBQSxRQUNBLGFBQWEsTUFBTSxNQUFNO0FBQ3ZCLFlBQUUsSUFBSSxDQUFDO0FBQUEsUUFDVDtBQUFBLFFBQ0EsY0FBYyxNQUFNLE1BQU07QUFDeEIsWUFBRTtBQUFBLFFBQ0o7QUFBQSxRQUNBLElBQUksS0FBSyxPQUFPLFNBQVMsRUFBRSxZQUFZLENBQUM7QUFBQSxNQUMxQztBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0g7QUFDQSxXQUFTLEVBQUUsSUFBSSxNQUFJO0FBQ2pCLFVBQU0sSUFBSSxFQUFFLGlCQUFpQixHQUFHLElBQUksRUFBRSxjQUFjLEdBQUcsSUFBSSxFQUFFLHFCQUFxQixHQUFHLElBQUksRUFBRSxrQkFBa0I7QUFDN0csUUFBSSxLQUFLLEdBQUc7QUFDVixZQUFNLElBQUksQ0FBQyxNQUFNLEtBQUssT0FBTyxTQUFTLEVBQUUsUUFBUTtBQUNoRCxRQUFFLElBQUksU0FBUyxHQUFHLEdBQUc7QUFBQSxRQUNuQixRQUFRLEVBQUU7QUFBQSxRQUNWLE9BQU8sRUFBRTtBQUFBLE1BQ1gsQ0FBQztBQUNEO0FBQUEsSUFDRjtBQUNBLFVBQU0sS0FBSyxLQUFLLE9BQU8sU0FBUyxFQUFFLGlCQUFpQixFQUFFLGNBQWMsR0FBRyxJQUFJLEVBQUUsYUFBYTtBQUN6RixRQUFJLFNBQVMsS0FBSyxVQUFVLE9BQU8saUJBQWlCLGVBQWUsZUFBZSxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEtBQUssR0FBRztBQUM5SCxZQUFNLElBQUksRUFBRSxPQUFPO0FBQ25CLFdBQUssRUFBRSxJQUFJLFNBQVMsR0FBRyxHQUFHO0FBQUEsUUFDeEIsUUFBUSxFQUFFO0FBQUEsUUFDVixPQUFPLEVBQUU7QUFBQSxNQUNYLENBQUMsR0FBRyxLQUFLLEVBQUUsSUFBSSxTQUFTLEdBQUcsR0FBRztBQUFBLFFBQzVCLFFBQVEsRUFBRTtBQUFBLFFBQ1YsT0FBTyxFQUFFO0FBQUEsTUFDWCxDQUFDO0FBQUEsSUFDSDtBQUNBLFNBQUssRUFBRSxNQUFNO0FBQUEsRUFDZjtBQUNBLFNBQU87QUFBQSxJQUNMLFVBQVUsTUFBTSxFQUFFLGVBQWUsS0FBSztBQUFBLElBQ3RDLFNBQVM7QUFBQSxJQUNULE9BQU8sQ0FBQyxJQUFJLE1BQU07QUFDaEIsUUFBRSxHQUFHLEVBQUUsQ0FBQztBQUFBLElBQ1Y7QUFBQSxJQUNBLFdBQVc7QUFBQSxJQUNYLFVBQVUsQ0FBQyxNQUFNO0FBQ2YsUUFBRSxHQUFHLEVBQUU7QUFBQSxRQUNMLEdBQUcsRUFBRTtBQUFBLFFBQ0wsT0FBTztBQUFBLE1BQ1QsQ0FBQztBQUFBLElBQ0g7QUFBQSxJQUNBLFdBQVc7QUFBQSxJQUNYLFVBQVU7QUFBQSxJQUNWLGdCQUFnQixNQUFNLEVBQUUsYUFBYTtBQUFBLElBQ3JDLGFBQWEsTUFBTSxFQUFFLGFBQWEsTUFBTTtBQUFBLElBQ3hDLFlBQVksTUFBTTtBQUNoQixZQUFNLElBQUksRUFBRSxPQUFPLEtBQUssQ0FBQyxHQUFHLElBQUksRUFBRSxhQUFhO0FBQy9DLGFBQU8sTUFBTSxVQUFVLE1BQU0sRUFBRSxTQUFTO0FBQUEsSUFDMUM7QUFBQSxJQUNBLGVBQWUsTUFBTSxFQUFFLFlBQVk7QUFBQSxJQUNuQyxrQkFBa0IsTUFBTSxFQUFFLGVBQWU7QUFBQSxJQUN6QyxvQkFBb0IsTUFBTSxFQUFFLGlCQUFpQjtBQUFBLElBQzdDLGlCQUFpQixNQUFNLEVBQUUsY0FBYztBQUFBLElBQ3ZDLFVBQVU7QUFBQSxJQUNWLGNBQWM7QUFBQSxJQUNkLFFBQVE7QUFBQSxJQUNSLGFBQWEsTUFBTTtBQUNqQixZQUFNLElBQUksRUFBRSxPQUFPLEtBQUssQ0FBQyxHQUFHLElBQUksRUFBRSxhQUFhO0FBQy9DLGFBQU8sTUFBTSxVQUFVLEVBQUUsSUFBSSxDQUFDO0FBQUEsSUFDaEM7QUFBQSxJQUNBLGlCQUFpQixNQUFNO0FBQ3JCLFlBQU0sSUFBSSxFQUFFLE9BQU8sS0FBSyxDQUFDLEdBQUcsSUFBSSxFQUFFLGFBQWE7QUFDL0MsYUFBTyxNQUFNLFVBQVUsRUFBRSxJQUFJLENBQUM7QUFBQSxJQUNoQztBQUFBLElBQ0EsV0FBVyxDQUFDLE1BQU07QUFDaEIsUUFBRSxHQUFHLEVBQUU7QUFBQSxRQUNMLEdBQUc7QUFBQSxRQUNILFNBQVMsRUFBRSxVQUFVO0FBQUEsVUFDbkIsYUFBYSxDQUFDO0FBQUEsVUFDZCxjQUFjO0FBQUEsVUFDZCxjQUFjO0FBQUEsVUFDZCxHQUFHLEVBQUU7QUFBQSxRQUNQLElBQUk7QUFBQSxNQUNOLENBQUM7QUFBQSxJQUNIO0FBQUEsSUFDQSxTQUFTLE1BQU07QUFDYixRQUFFLEtBQUU7QUFBQSxJQUNOO0FBQUEsRUFDRjtBQUNGOzs7QUNubkJBLElBQUksYUFBYTtBQUNqQixJQUFJLGFBQWE7QUFDakIsSUFBSSxTQUFTO0FBQ2IsSUFBSSxlQUFlLE9BQU8sVUFBVTtBQUNwQyxJQUFJLGNBQWM7QUFDbEIsSUFBSSxXQUFXO0FBRWYsSUFBSSxTQUFTLFNBQVMsY0FBYyxnQkFBZ0I7QUFFN0MsU0FBUyxrQkFBa0I7QUFDOUIsV0FBUyxHQUFHLDZDQUE2QyxTQUFVLEVBQUMsUUFBTyxHQUFHO0FBRTFFLFFBQUksU0FBUztBQVFULFVBQVMsVUFBVCxTQUFpQixPQUFPO0FBQ3BCLFlBQUksTUFBTSxRQUFRO0FBQVU7QUFDNUIsaUJBQVM7QUFDVCxtQkFBVztBQUNYLGVBQU8sTUFBTSxVQUFVO0FBQUEsTUFDM0I7QUFYQSxlQUFTLGNBQWM7QUFDdkIsZUFBUyxVQUFVO0FBRW5CLGVBQVMsY0FBYztBQUN2QixlQUFTLGVBQWU7QUFTeEIsZUFBUyxpQkFBaUIsV0FBVyxTQUFVLE9BQU87QUFFbEQsWUFBSSxNQUFNLFdBQVcsTUFBTSxTQUFTLFdBQVcsQ0FBQyxRQUFRO0FBQ3BELGNBQUksQ0FBQyxjQUFjO0FBQ2YsZ0JBQUkscUJBQXFCLEVBQ3BCLE1BQU0sOEJBQThCLEVBQ3BDLEtBQUsscUdBQXFHLEVBQzFHLE9BQU8sRUFDUCxLQUFLO0FBQUEsVUFDZCxPQUFPO0FBQ0gscUJBQVM7QUFDVCx1QkFBVyxZQUFZLFVBQVU7QUFDakMsbUJBQU8sTUFBTSxVQUFVO0FBRXZCLGdCQUFJLHFCQUFxQixFQUNwQixNQUFNLDhCQUE4QixFQUNwQyxLQUFLLGtGQUFrRixFQUN2RixRQUFRLEVBQ1IsS0FBSztBQUFBLFVBQ2Q7QUFBQSxRQUNKO0FBRUEsWUFBSSxNQUFNLFdBQVcsTUFBTSxTQUFTLFVBQVUsUUFBUTtBQUNsRCxvQkFBVSxVQUFVLFVBQVUscUJBQXFCLFFBQVEsS0FBSyxvQkFBb0I7QUFFcEYsbUJBQVM7QUFDVCxxQkFBVztBQUNYLGlCQUFPLE1BQU0sVUFBVTtBQUV2QixjQUFJLHFCQUFxQixFQUNwQixNQUFNLDhCQUE4QixFQUNwQyxLQUFLLG9DQUFvQyxFQUN6QyxRQUFRLEVBQ1IsS0FBSztBQUFBLFFBQ2Q7QUFBQSxNQUVKLENBQUM7QUFBQSxJQUdMO0FBQUEsRUFDSixDQUFDO0FBQ0w7QUFFQSxTQUFTLGtCQUFrQixLQUFLO0FBQzVCLFNBQU8sSUFBSSxRQUFRLHVDQUF1QyxNQUFNO0FBQ3BFO0FBRUEsU0FBUyxxQkFBcUIsSUFBSTtBQUM5QixNQUFJLGVBQWUsZUFBZSxFQUFFO0FBRXBDLFNBQU8saUJBQWlCLFlBQVk7QUFDeEM7QUFFQSxTQUFTLGlCQUFpQixVQUFVO0FBQ2hDLE1BQUksUUFBUSxTQUFTLE1BQU0sS0FBSztBQUVoQyxXQUFTLElBQUksTUFBTSxTQUFTLEdBQUcsS0FBSyxHQUFHLEtBQUs7QUFDeEMsUUFBSSxlQUFlLE1BQU0sTUFBTSxDQUFDLEVBQUUsS0FBSyxLQUFLO0FBQzVDLFFBQUksU0FBUyxpQkFBaUIsWUFBWSxFQUFFLFdBQVcsR0FBRztBQUN0RCxhQUFPO0FBQUEsSUFDWDtBQUFBLEVBQ0o7QUFFQSxTQUFPO0FBQ1g7QUFFTyxTQUFTLGVBQWUsSUFBSTtBQUMvQixNQUFJLENBQUMsSUFBSTtBQUNMLFdBQU87QUFBQSxFQUNYO0FBRUEsTUFBSSxHQUFHLElBQUk7QUFDUCxXQUFPLE1BQU0sa0JBQWtCLEdBQUcsRUFBRTtBQUFBLEVBQ3hDO0FBRUEsTUFBSSxPQUFPLFNBQVMsTUFBTTtBQUN0QixXQUFPO0FBQUEsRUFDWDtBQUVBLE1BQUksTUFBTSxHQUFHLFFBQVEsWUFBWTtBQUVqQyxNQUFJLGVBQWUsR0FBRyxVQUFVLE1BQU0sS0FBSyxFQUFFLE9BQU8sU0FBTyxPQUFPLENBQUMsSUFBSSxXQUFXLElBQUksQ0FBQztBQUN2RixNQUFJLFVBQVUsYUFBYSxTQUFTLE1BQU0sYUFBYSxJQUFJLGlCQUFpQixFQUFFLEtBQUssR0FBRyxJQUFJO0FBRTFGLE1BQUksMkJBQTJCLE1BQU07QUFFckMsTUFBSTtBQUNBLFFBQUksMkJBQTJCLE1BQU0sS0FBSyxHQUFHLFdBQVcsaUJBQWlCLHdCQUF3QixDQUFDO0FBQ2xHLFFBQUkseUJBQXlCLFdBQVcsS0FBSyx5QkFBeUIsQ0FBQyxNQUFNLElBQUk7QUFDN0UsYUFBTyxlQUFlLEdBQUcsVUFBVSxJQUFJLFFBQVE7QUFBQSxJQUNuRDtBQUVBLFFBQUksV0FBVyxNQUFNLEtBQUssR0FBRyxXQUFXLFFBQVE7QUFDaEQsUUFBSSwwQkFBMEIsU0FBUyxPQUFPLFNBQU8sSUFBSSxZQUFZLEdBQUcsV0FBVyxJQUFJLGNBQWMsR0FBRyxTQUFTO0FBQ2pILFFBQUksd0JBQXdCLFNBQVMsR0FBRztBQUNwQyxVQUFJLFFBQVEsd0JBQXdCLFFBQVEsRUFBRSxJQUFJO0FBQ2xELGFBQU8sZUFBZSxHQUFHLFVBQVUsSUFBSSxRQUFRLE1BQU0sVUFBVSxrQkFBa0IsUUFBUTtBQUFBLElBQzdGLE9BQU87QUFDSCxhQUFPLGVBQWUsR0FBRyxVQUFVLElBQUksUUFBUSxNQUFNO0FBQUEsSUFDekQ7QUFBQSxFQUNKLFNBQVMsR0FBUDtBQUFBLEVBRUY7QUFFSjtBQUVBLFNBQVMsZ0JBQWdCLE9BQU87QUFDNUIsZUFBYSxNQUFNO0FBQ25CLGVBQWEsTUFBTTtBQUVuQixhQUFXLE1BQU0sU0FBUyxNQUFNLE9BQU87QUFDM0M7QUFFQSxTQUFTLFdBQVcsSUFBSSxJQUFJO0FBQ3hCLE1BQUksQ0FBQztBQUFRO0FBRWIsTUFBSSxPQUFPO0FBQ1gsTUFBSSxDQUFDLGFBQWE7QUFDZCxXQUFPLE1BQU0sT0FBUSxLQUFLLE9BQVE7QUFDbEMsV0FBTyxNQUFNLE1BQU8sS0FBSyxPQUFRO0FBQ2pDLFdBQU8sTUFBTSxRQUFRO0FBQ3JCLFdBQU8sTUFBTSxTQUFTO0FBQ3RCLFdBQU8sTUFBTSxlQUFlO0FBQUEsRUFDaEM7QUFDSjtBQUdBLFNBQVMsWUFBWSxPQUFPO0FBQ3hCLFFBQU0sZ0JBQWdCO0FBRXRCLE1BQUksQ0FBQztBQUFRO0FBRWIsZ0JBQWM7QUFFZCxNQUFJLE9BQU8sTUFBTTtBQUVqQixTQUFPLEtBQUssa0JBQWtCO0FBQzFCLFdBQU8sS0FBSztBQUFBLEVBQ2hCO0FBRUEsTUFBSSxNQUFNO0FBQ04sUUFBSSxLQUFLLEtBQUssZUFBZSxLQUFLLGFBQWEsS0FBSyxhQUFhLGFBQWEsS0FBSztBQUNuRixRQUFJLEtBQUssS0FBSyxlQUFlLEtBQUssWUFBWSxLQUFLLGFBQWEsWUFBWSxLQUFLO0FBQ2pGLFFBQUksS0FBSyxLQUFLO0FBQ2QsUUFBSSxLQUFLLEtBQUs7QUFDZCxRQUFJLE9BQU87QUFDWCxlQUFXO0FBQ1gsV0FBTyxNQUFNLE9BQU8sS0FBSyxPQUFPO0FBQ2hDLFdBQU8sTUFBTSxNQUFNLEtBQUssT0FBTztBQUMvQixXQUFPLE1BQU0sUUFBUyxLQUFLLE9BQU8sSUFBSSxJQUFLO0FBQzNDLFdBQU8sTUFBTSxTQUFVLEtBQUssT0FBTyxJQUFJLElBQUs7QUFDNUMsV0FBTyxNQUFNLGVBQWU7QUFBQSxFQUNoQztBQUNKO0FBRUEsU0FBUyxZQUFZLE9BQU87QUFDeEIsTUFBSSxDQUFDO0FBQVE7QUFFYixnQkFBYztBQUNsQjs7O0FDdExBLFNBQVMsaUJBQWlCLHdCQUF3QixpQkFBa0I7QUFFaEUsa0JBQWdCO0FBRWhCLE1BQUk7QUFFSixNQUFJLFFBQVEsQ0FBQztBQUNiLE1BQUksYUFBYSxDQUFDO0FBRWxCLFdBQVMsZUFBZSxVQUFVLFVBQVU7QUFDeEMsUUFBSSxTQUFTLGNBQWMsUUFBUSxHQUFHO0FBQ2xDLGVBQVMsU0FBUyxjQUFjLFFBQVEsQ0FBQztBQUN6QztBQUFBLElBQ0o7QUFFQSxVQUFNLFdBQVcsSUFBSSxpQkFBaUIsU0FBVSxXQUFXO0FBQ3ZELFVBQUksU0FBUyxjQUFjLFFBQVEsR0FBRztBQUNsQyxpQkFBUyxTQUFTLGNBQWMsUUFBUSxDQUFDO0FBQ3pDLGlCQUFTLFdBQVc7QUFBQSxNQUN4QjtBQUFBLElBQ0osQ0FBQztBQUVELGFBQVMsUUFBUSxTQUFTLE1BQU07QUFBQSxNQUM1QixXQUFXO0FBQUEsTUFDWCxTQUFTO0FBQUEsSUFDYixDQUFDO0FBQUEsRUFDTDtBQUVBLFdBQVMsUUFBUSxRQUFRO0FBRXJCLFFBQUksTUFBTSxRQUFRLE1BQU0sR0FBRztBQUN2QixhQUFPLE9BQU8sQ0FBQztBQUFBLElBQ25CLFdBQVcsT0FBTyxXQUFXLFVBQVU7QUFDbkMsYUFBTyxPQUFPO0FBQUEsSUFDbEI7QUFFQSxXQUFPO0FBQUEsRUFDWDtBQUVBLFdBQVMsU0FBUyxnQ0FBZ0MsRUFBQyxTQUFTLE9BQU8sU0FBUSxDQUFDO0FBRTVFLFdBQVMsR0FBRyxrQ0FBa0MsU0FBVSxNQUFNO0FBRTFELGlCQUFhO0FBRWIsZUFBVyxNQUFNLFFBQVEsQ0FBQyxTQUFTO0FBQy9CLFlBQU0sS0FBSyxJQUFJO0FBRWYsVUFBSSxDQUFDLGFBQWEsUUFBUSxPQUFPLEdBQUc7QUFDaEMscUJBQWEsUUFBUSxTQUFTLElBQUk7QUFBQSxNQUN0QztBQUFBLElBQ0osQ0FBQztBQUVELGVBQVcsS0FBSztBQUVoQixlQUFXLFdBQVcsUUFBUSxDQUFDLGNBQWM7QUFFekMsVUFBSSxVQUFVLFVBQVUsT0FBTyxTQUFTLFVBQVU7QUFJOUMsdUJBQWUsVUFBVSxRQUFRLFNBQVUsVUFBVTtBQUNqRCxtQkFBUyxXQUFXLE1BQU0sV0FBVztBQUVyQyxjQUFJLFVBQVUsU0FBUyxjQUFjLEtBQUs7QUFDMUMsa0JBQVEsWUFBWSxVQUFVO0FBRTlCLGtCQUFRLFdBQVcsVUFBVSxJQUFJLFVBQVUsUUFBUTtBQUVuRCxtQkFBUyxXQUFXLGFBQWEsUUFBUSxZQUFZLFFBQVE7QUFBQSxRQUNqRSxDQUFDO0FBRUQsbUJBQVcsS0FBSyxTQUFTO0FBQUEsTUFDN0I7QUFBQSxJQUNKLENBQUM7QUFBQSxFQUNMLENBQUM7QUFFRCxXQUFTLFdBQVdBLFFBQU8sYUFBYSxHQUFHO0FBQ3ZDLGFBQVMsSUFBSSxZQUFZLElBQUlBLE9BQU0sUUFBUSxLQUFLO0FBQzVDLFVBQUksT0FBT0EsT0FBTSxDQUFDO0FBQ2xCLFVBQUksc0JBQXNCLEtBQUs7QUFDL0IsVUFBSSx5QkFBeUIsS0FBSztBQUNsQyxVQUFJLHdCQUF3QixLQUFLLFVBQVUsT0FBTyxTQUFTLFdBQVcsT0FBTyxTQUFTO0FBQ3RGLFVBQUksdUJBQXVCLENBQUMsV0FBVyxxQkFDbEMsV0FBVyxxQkFBcUIsQ0FBQyxhQUFhLFFBQVEsT0FBTyxFQUFFLFNBQVMsS0FBSyxFQUFFO0FBRXBGLFVBQ0ssdUJBQXVCLDBCQUN2Qix1QkFBdUIsQ0FBQywwQkFBMEIseUJBQ2xELDBCQUEwQix3QkFDMUIseUJBQXlCLHNCQUM1QjtBQUNFLGlCQUFTLElBQUk7QUFDYjtBQUFBLE1BQ0o7QUFBQSxJQUNKO0FBQUEsRUFDSjtBQUdBLFdBQVMsR0FBRyxpQ0FBaUMsU0FBVSxRQUFRO0FBRTNELFVBQU0sS0FBSyxRQUFRLE1BQU07QUFFekIsWUFBUSxJQUFJLFVBQVU7QUFFdEIsUUFBSSxZQUFZLFdBQVcsS0FBSyxhQUFXLFFBQVEsT0FBTyxFQUFFO0FBRTVELFFBQUksV0FBVztBQUNYLFNBQU87QUFBQSxRQUNILGNBQWMsYUFBYSxVQUFVLFVBQVUsVUFBVSxPQUFPLFFBQVEsVUFBVSxPQUFPO0FBQUEsUUFFekYsaUJBQWlCLENBQUMsU0FBUyxFQUFDLFFBQVEsTUFBSyxNQUFNO0FBQzNDLGtCQUFRLE1BQU0sWUFBWTtBQUMxQixrQkFBUSxNQUFNLFlBQVksTUFBTSxXQUFXLFFBQVE7QUFFbkQsY0FBSSxDQUFDLE1BQU0sV0FBVyxRQUFRLGFBQWE7QUFDdkMsb0JBQVEsTUFBTSxXQUFXLE1BQU0saUJBQWlCO0FBQUEsVUFDcEQ7QUFFQSxjQUFJLGlCQUFpQjtBQUVyQixrQkFBUSxPQUFPLGNBQWMsVUFBVSxJQUFJLEdBQUcsZUFBZSxNQUFNLEdBQUcsQ0FBQztBQUFBLFFBQzNFO0FBQUEsTUFDSixDQUFDLEVBQUUsVUFBVSxTQUFTO0FBQUEsSUFFMUIsT0FBTztBQUNILGNBQVEsTUFBTSxzQkFBc0IsZUFBZTtBQUFBLElBQ3ZEO0FBQUEsRUFDSixDQUFDO0FBRUQsV0FBUyxHQUFHLDRCQUE0QixTQUFVLFFBQVE7QUFFdEQsVUFBTSxLQUFLLFFBQVEsTUFBTTtBQUV6QixRQUFJLE9BQU8sTUFBTSxLQUFLLGFBQVcsUUFBUSxPQUFPLFFBQVEsSUFBSTtBQUU1RCxRQUFJLE1BQU07QUFDTixlQUFTLElBQUk7QUFBQSxJQUNqQixPQUFPO0FBQ0gsY0FBUSxNQUFNLGlCQUFpQixlQUFlO0FBQUEsSUFDbEQ7QUFBQSxFQUNKLENBQUM7QUFFRCxXQUFTLFNBQVMsTUFBTTtBQUdwQixRQUFJLFFBQVEsS0FBSyxNQUFNLEtBQUssS0FBSztBQUVqQyxRQUFJLE1BQU0sU0FBUyxHQUFHO0FBRWxCLFlBQU0sWUFBWSxHQUFPO0FBQUEsUUFDckIsWUFBWTtBQUFBLFFBQ1osMEJBQTBCO0FBQUEsUUFDMUIsY0FBYyxhQUFhLFVBQVUsVUFBVSxLQUFLLE9BQU8sUUFBUSxLQUFLLE9BQU87QUFBQSxRQUMvRSxjQUFlLENBQUMsU0FBUyxNQUFNLEVBQUMsUUFBUSxNQUFLLE1BQU07QUFBQSxRQUVuRDtBQUFBLFFBQ0EsY0FBZSxDQUFDLFNBQVMsTUFBTSxFQUFDLFFBQVEsTUFBSyxNQUFNO0FBRS9DLGNBQUksS0FBSyxPQUFPLGlCQUFpQjtBQUM3QixxQkFBUyxTQUFTLEtBQUssT0FBTyxnQkFBZ0IsTUFBTSxLQUFLLE9BQU8sZ0JBQWdCLE1BQU07QUFBQSxVQUMxRjtBQUVBLGNBQUksTUFBTSxlQUFlLENBQUMsTUFBTSxXQUFXLGVBQWUsS0FBSztBQUMzRCxzQkFBVSxRQUFRO0FBRXRCLGNBQUksQ0FBQyxhQUFhLFFBQVEsT0FBTyxFQUFFLFNBQVMsS0FBSyxFQUFFLEdBQUc7QUFDbEQseUJBQWEsUUFBUSxTQUFTLEtBQUssVUFBVSxDQUFDLEdBQUcsS0FBSyxNQUFNLGFBQWEsUUFBUSxPQUFPLENBQUMsR0FBRyxLQUFLLEVBQUUsQ0FBQyxDQUFDO0FBQUEsVUFDekc7QUFBQSxRQUNKO0FBQUEsUUFDQSxrQkFBbUIsQ0FBQyxTQUFTLE1BQU0sRUFBQyxRQUFRLE1BQUssTUFBTTtBQUNuRCxjQUFJLE1BQU0sY0FBYyxDQUFDLE1BQU0sV0FBVyxlQUFlLENBQUMsS0FBSyxhQUFhO0FBQ3hFLHNCQUFVLFFBQVE7QUFBQSxVQUN0QjtBQUFBLFFBQ0o7QUFBQSxRQUNBLGFBQWMsQ0FBQyxTQUFTLE1BQU0sRUFBQyxRQUFRLE1BQUssTUFBTTtBQUFBLFFBRWxEO0FBQUEsUUFDQSxhQUFjLENBQUMsU0FBUyxNQUFNLEVBQUMsUUFBUSxNQUFLLE1BQU07QUFFOUMsY0FBSSxVQUFVLFdBQVcsR0FBRztBQUV4QixnQkFBSSxDQUFDLGFBQWEsUUFBUSxPQUFPLEVBQUUsU0FBUyxLQUFLLEVBQUUsR0FBRztBQUNsRCwyQkFBYSxRQUFRLFNBQVMsS0FBSyxVQUFVLENBQUMsR0FBRyxLQUFLLE1BQU0sYUFBYSxRQUFRLE9BQU8sQ0FBQyxHQUFHLEtBQUssRUFBRSxDQUFDLENBQUM7QUFBQSxZQUN6RztBQUVBLHNCQUFVLFFBQVE7QUFBQSxVQUN0QjtBQUVBLGNBQUksTUFBTSxTQUFTLEtBQUssVUFBVSxXQUFXLEdBQUc7QUFDNUMsZ0JBQUksUUFBUSxNQUFNLFVBQVUsV0FBUyxNQUFNLE9BQU8sS0FBSyxFQUFFO0FBRXpELGdCQUFJLFVBQVUsTUFBTSxRQUFRLE1BQU0sU0FBUyxHQUFHO0FBQzFDLGtCQUFJLGdCQUFnQixRQUFRO0FBQzVCLHlCQUFXLE9BQU8sYUFBYTtBQUFBLFlBQ25DO0FBQUEsVUFDSjtBQUdBLGNBQUksS0FBSyxRQUFRO0FBRWIsZ0JBQUksS0FBSyxPQUFPLGNBQWM7QUFDMUIsa0JBQUkscUJBQXFCLEVBQ3BCLE1BQU0sS0FBSyxPQUFPLGFBQWEsS0FBSyxFQUNwQyxLQUFLLEtBQUssT0FBTyxhQUFhLElBQUksRUFDbEMsS0FBSyxLQUFLLE9BQU8sYUFBYSxJQUFJLEVBQ2xDLFVBQVUsS0FBSyxPQUFPLGFBQWEsU0FBUyxFQUM1QyxNQUFNLEtBQUssT0FBTyxhQUFhLEtBQUssRUFDcEMsU0FBUyxLQUFLLE9BQU8sYUFBYSxRQUFRLEVBQzFDLEtBQUs7QUFBQSxZQUNkO0FBRUEsZ0JBQUksS0FBSyxPQUFPLGdCQUFnQjtBQUM1Qix1QkFBUyxTQUFTLEtBQUssT0FBTyxlQUFlLE1BQU0sS0FBSyxPQUFPLGVBQWUsTUFBTTtBQUFBLFlBQ3hGO0FBRUEsZ0JBQUksS0FBSyxPQUFPLGFBQWE7QUFDekIsdUJBQVMsY0FBYyxLQUFLLE9BQU8sV0FBVyxFQUFFLE1BQU07QUFBQSxZQUUxRDtBQUVBLGdCQUFJLEtBQUssT0FBTyxnQkFBZ0I7QUFDNUIscUJBQU8sS0FBSyxLQUFLLE9BQU8sZUFBZSxLQUFLLEtBQUssT0FBTyxlQUFlLFNBQVMsV0FBVyxPQUFPO0FBQUEsWUFDdEc7QUFBQSxVQUNKO0FBR0Esb0JBQVUsU0FBUztBQUFBLFFBQ3ZCO0FBQUEsUUFDQSxpQkFBaUIsQ0FBQyxTQUFTLEVBQUMsUUFBUSxNQUFLLE1BQU07QUFFM0Msa0JBQVEsT0FBTyxNQUFNLFdBQVcsUUFBUTtBQUN4QyxrQkFBUSxRQUFRLE1BQU0sV0FBVyxRQUFRO0FBR3pDLGNBQUksTUFBTSxXQUFXLGVBQWUsS0FBSztBQUNyQyxxQkFBUyxjQUFjLDJCQUEyQixFQUFFLE9BQU87QUFFL0Qsa0JBQVEsTUFBTSxZQUFZO0FBQzFCLGtCQUFRLE1BQU0sWUFBWSxNQUFNLFdBQVcsUUFBUTtBQUVuRCxjQUFJLENBQUMsTUFBTSxXQUFXLFFBQVEsYUFBYTtBQUN2QyxvQkFBUSxNQUFNLFdBQVcsTUFBTSxpQkFBaUI7QUFBQSxVQUNwRDtBQUVBLGNBQUksaUJBQWlCO0FBSXJCLGtCQUFRLE9BQU8sY0FBYyxVQUFVLElBQUksR0FBRyxlQUFlLE1BQU0sR0FBRyxDQUFDO0FBRXZFLGtCQUFRLE9BQU8sWUFBWTtBQUMzQixrQkFBUSxPQUFPLFVBQVUsSUFBSSxRQUFRLE1BQU07QUFDM0Msa0JBQVEsT0FBTyxNQUFNLGlCQUFpQjtBQUV0QyxrQkFBUSxPQUFPLFVBQVUsT0FBTyx1QkFBdUI7QUFHdkQsZ0JBQU0sYUFBYSxTQUFTLGNBQWMsUUFBUTtBQUNsRCxjQUFJLGNBQWM7QUFFbEIscUJBQVcsVUFBVSxJQUFJLEdBQUcsWUFBWSxNQUFNLEdBQUcsR0FBRyx5QkFBeUI7QUFDN0UscUJBQVcsWUFBWSxVQUFVLFdBQVcsSUFDdEMsTUFBTSxXQUFXLFFBQVEsY0FDekIsTUFBTSxXQUFXLFFBQVE7QUFFL0IscUJBQVcsTUFBTSxZQUFZLFdBQVcsbUJBQW1CO0FBQzNELHFCQUFXLE1BQU0sWUFBWSxXQUFXLG1CQUFtQjtBQUMzRCxxQkFBVyxNQUFNLFlBQVksV0FBVyxtQkFBbUI7QUFFM0QsZ0JBQU0sYUFBYSxTQUFTLGNBQWMsUUFBUTtBQUNsRCxjQUFJLGNBQWM7QUFDbEIscUJBQVcsVUFBVSxJQUFJLEdBQUcsWUFBWSxNQUFNLEdBQUcsR0FBRyx5QkFBeUI7QUFDN0UscUJBQVcsWUFBWSxNQUFNLFdBQVcsUUFBUTtBQUVoRCxjQUFJLENBQUMsVUFBVSxZQUFZLEdBQUc7QUFDMUIsb0JBQVEsT0FBTyxZQUFZLFVBQVU7QUFBQSxVQUN6QztBQUNBLGtCQUFRLE9BQU8sWUFBWSxVQUFVO0FBQUEsUUFFekM7QUFBQSxRQUVBO0FBQUEsTUFDSixDQUFDO0FBRUQsZ0JBQVUsTUFBTTtBQUFBLElBQ3BCO0FBQUEsRUFDSjtBQUNKLENBQUM7IiwKICAibmFtZXMiOiBbInRvdXJzIl0KfQo=
