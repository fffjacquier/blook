/*
ColorPicker JXC
style: {
    "--unit-size": "".concat(275, "px")
},
children: [(0,
l.jsxs)(ef, {
    children: [(0,
    l.jsx)(ColorPicker_SatLitGrid, {
        size: 275,
        hue: e,
        saturation: o,
        setSaturation: i,
        lightness: r,
        setLightness: a
    }), (0,
    l.jsx)(ColorPicker_HueWheel, {
        hue: e,
        setHue: t,
        size: 275,
        wheelThickness: 24
    })]
}), (0,
l.jsxs)(eb, {
    children: [(0,
    l.jsx)(ex, {
        style: {
            "--background-color": "hsl(".concat(e, "deg ").concat(o, "% ").concat(r, "%)")
        }
    }), (0,
    l.jsx)(eg, {
        children: (0,
        l.jsx)(ColorPicker_ColorSnippet, {
            hue: e,
            saturation: o,
            lightness: r
        })
    })]
})]

HueWheel (e = props)
let {hue: t, setHue: o, size: i, thickness: r=24} = e
  , a = c.useRef()
  , [s,d] = c.useState(!1)
  , [p,u] = use_mouse_position_within_element_hook(a, {
    buffer: 32
});
c.useEffect(()=>{
    if (!s || !p || !u)
        return;
    let e = [u.width / 2, u.height / 2]
      , [t] = (0,
    K.K5)([p.x, p.y], e);
    o(Math.round((t * (180 / Math.PI) + 90) % 360))
}, [s, p, u, o]),
c.useEffect(()=>{
    function handleMouseUp() {
        d(!1)
    }
    return window.addEventListener("mouseup", handleMouseUp),
    window.addEventListener("touchend", handleMouseUp),
    document.addEventListener("mouseleave", handleMouseUp),
    ()=>{
        window.removeEventListener("mouseup", handleMouseUp),
        window.removeEventListener("touchend", handleMouseUp),
        document.removeEventListener("mouseleave", handleMouseUp)
    }
}, [s]);

SaturationLightnessBox (e = props)
let {hue: t, size: o, saturation: i, setSaturation: r, lightness: a, setLightness: s} = e
  , d = c.useRef()
  , [p,u] = c.useState(!1)
  , [m,h] = use_mouse_position_within_element_hook(d, {
    buffer: 128,
    throttleBy: 20
});
c.useEffect(()=>{
    p && m && h && (r(Math.round((0,
    K.uZ)((0,
    K.Fv)(m.x, 0, h.width, 0, 100), 0, 100))),
    s(Math.round((0,
    K.uZ)((0,
    K.Fv)(m.y, 0, h.height, 100, 0), 0, 100))))
}
, [p, m, h, s, r]),
c.useEffect(()=>{
    function handleMouseUp() {
        u(!1)
    }
    return window.addEventListener("mouseup", handleMouseUp),
    window.addEventListener("touchend", handleMouseUp),
    document.addEventListener("mouseleave", handleMouseUp),
    ()=>{
        window.removeEventListener("mouseup", handleMouseUp),
        window.removeEventListener("touchend", handleMouseUp),
        document.removeEventListener("mouseleave", handleMouseUp)
    }
}, [p]);

ColorSnippet
let {hue: t, saturation: o, lightness: i} = e
, r = (0, ep.Z)()
, a = "hsl(".concat(t, "deg ").concat(o, "% ").concat(i, "%)")
, c = r.width <= 690 ? ".box {\n  background-color:\n    ".concat(a, "\n}") : ".box {\n  background-color: ".concat(a, "\n}");


use_mouse_position_within_element_hook = function(e) {
  let {initialX: t=null, initialY: o=null, buffer: i=0, throttleBy: r=18} = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
    , a = (0,
  X.Z)(e)
    , [l,s] = c.useState({
      x: t,
      y: o
  });

  return c.useEffect(()=>{
      let updatePosition = e=>{
          let {clientX: t, clientY: o} = e;
          if (!a)
              return;
          let r = t >= a.left - i && t <= a.right + i && o >= a.top - i && o <= a.bottom + i;
          if (!r)
              return;
          let l = {
              x: t - a.left,
              y: o - a.top
          };
          s(l)
      }
        , e = (0,
      K.P2)(updatePosition, r)
        , t = (0,
      K.P2)(e=>{
          let t = e.touches[0];
          updatePosition(t)
      }
      , r);
      return window.addEventListener("mousemove", e),
      window.addEventListener("touchmove", t),
      ()=>{
          window.removeEventListener("mousemove", e),
          window.removeEventListener("touchmove", t)
      }
  }
  , [i, a, r]),
  [l, a, s]
}

use_draggable_hook = function() {
  let {axis: e, stepSize: t=1} = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
    , o = c.useRef()
    , [i,r] = c.useState({
      x: 0,
      y: 0
  })
    , a = c.useRef(null)
    , l = c.useRef(null);
  function handleDragStart(e) {
      e.stopPropagation(),
      a.current = {
          x: e.clientX,
          y: e.clientY
      },
      l.current = i,
      window.addEventListener("mousemove", handleDragMove),
      window.addEventListener("mouseup", handleDragEnd)
  }
  function handleDragMove(o) {
      var i, c, s, d;
      o.stopPropagation();
      let p = 0
        , u = 0;
      p = (0,
      K.Nm)(o.clientX - a.current.x + (null !== (s = null === (i = l.current) || void 0 === i ? void 0 : i.x) && void 0 !== s ? s : 0), t),
      u = (0,
      K.Nm)(o.clientY - a.current.y + (null !== (d = null === (c = l.current) || void 0 === c ? void 0 : c.y) && void 0 !== d ? d : 0), t);
      let m = {
          x: "y" !== e ? p : 0,
          y: "x" !== e ? u : 0
      };
      r(m)
  }
  function handleDragEnd(e) {
      e.stopPropagation(),
      a.current = null,
      window.removeEventListener("mousemove", handleDragMove),
      window.removeEventListener("mouseup", handleDragEnd)
  }
  let s = c.useRef(handleDragStart);
  c.useEffect(()=>{
      s.current = handleDragStart
  }
  );
  let d = c.useCallback(function() {
      for (var e = arguments.length, t = Array(e), o = 0; o < e; o++)
          t[o] = arguments[o];
      s.current(...t)
  }, []);
  return c.useEffect(()=>{
      let e = o.current;
      return null == e || e.addEventListener("mousedown", d),
      ()=>{
          null == e || e.removeEventListener("mousedown", d)
      }
  }
  , [d]),
  {
      ref: o,
      manualSet: r,
      ...i
  }
};
*/
