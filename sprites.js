// Little elemental critters wandering behind the page.
(function () {
  // ------------------------------------------------------------------
  // Use your own sprite images:
  //   1. Put PNGs with transparent backgrounds in assets/sprites/
  //   2. List them below, e.g. ["./assets/sprites/water.png", ...]
  // When this list has images, they replace the built-in critters.
  var CUSTOM_IMAGES = [];
  var CUSTOM_HEIGHT = 56; // display height in px on desktop (phones: 2/3)
  // ------------------------------------------------------------------

  // Built-in critters: one palette letter per pixel, "." is transparent.
  // "e"/"g" mark the top row of each eye; they become skin colour to blink.
  var PALETTE = {
    k: "#1d1b2e", e: "#1d1b2e", d: "#1d1b2e", // outline + eyes/mouth
    p: "#ff8fa3", w: "#ffffff",                // blush, shine
    c: "#4fb3ff", C: "#bfe6ff", D: "#2b7fd6",  // water
    r: "#ff5a3c", o: "#ff9a1f", y: "#ffd84a",  // fire / spark
    m: "#a58a6a", M: "#7d6448", L: "#d1bea3", n: "#5cc46a", // pebble
    v: "#eef0ff", V: "#c3c8f0",                // ghost
    a: "#f4fbff", A: "#c9e6f7",                // cloud
    N: "#3a9a4a", l: "#c8f5cf",                // leaf
    i: "#bdf0ff", I: "#7fd3f0",                // frost
    t: "#f6e7cf", T: "#d9c3a0",                // mushroom stem
    x: "#4b2a8a", X: "#2f1a5c",                // void
    g: "#7dffe6", G: "#7dffe6",                // glowing eyes
    s: "#ffc4e6", S: "#f59bd0",                // bubble
    u: "#b583ff", U: "#d9bfff", Y: "#8a55e0",  // crystal
  };

  var CRITTERS = {
    drip: {
      skin: "c",
      rows: [
        "................",
        ".......kk.......",
        "......kcck......",
        ".....kcccck.....",
        ".....kcccck.....",
        "....kcccccck....",
        "...kcccccccck...",
        "...kCCcccccck...",
        "..kcCCCcccccck..",
        "..kcccccccccDk..",
        ".kcccceccceDDDk.",
        "..kcccdccDdDDk..",
        "..kccpccdDDpDk..",
        "...kccDDDDDDk...",
        "....kDDDDDDk....",
        ".....kkDDkk.....",
        ".......kk.......",
      ],
    },
    ember: {
      skin: "y",
      rows: [
        "........k.......",
        ".......krk......",
        "......krrk..kk..",
        "..kk.krrrk.krrk.",
        ".krrkrrrrrkrrrk.",
        ".krrkrrrrrrrrrk.",
        ".krrrrrrrrrrrrk.",
        ".koooooyyooook..",
        ".koooyyyyyyook..",
        ".koooyyyyyyook..",
        ".kooyyeyyyeyook.",
        ".kooyydyyydyook.",
        "..kooyyydyyook..",
        "...koyyyyyyok...",
        "....koyyyyok....",
        ".....kkkkkk.....",
      ],
    },
    pebble: {
      skin: "m",
      rows: [
        "................",
        ".........kk.....",
        "....kkk.knnk....",
        "...knnnknnnnk...",
        "...knnnnnkkk....",
        "....kkkknk......",
        "...kkknnnnkkk...",
        "..kmmmmmmmmmmk..",
        ".kmmLLmmmmmmmmk.",
        ".kmmLLmmmmmmmmk.",
        "kmmmmmemmmemmMMk",
        "kmmmmmdmmmdMMMMk",
        ".kmmpmmmdMMMpMk.",
        ".kmmmmmMMMMMMMk.",
        "..kmmMMMMMMMMk..",
        "...kkkMMMMkkk...",
        "......kkkk......",
      ],
    },
    wisp: {
      skin: "v",
      rows: [
        "................",
        ".....kkkkkk.....",
        "....kvvvvvvk....",
        "...kvwvvvvvvk...",
        "..kvwwvvvvvvvk..",
        "..kvvvvvvvvvvk..",
        ".kvvvvvvvvvvvvk.",
        ".kvvvvevvvevvvk.",
        ".kvvvvdvvvdvvvk.",
        ".kvvvpvvdvvpVVk.",
        ".kvvvvvvvvVVVVk.",
        ".kvvvvvVVVVVVVk.",
        ".kvvvVVVVVVVVVk.",
        ".kVkkVVkkVVkkVk.",
        ".kVk.kk..kk.kVk.",
        "..k..........k..",
      ],
    },
    puff: {
      skin: "a",
      rows: [
        "..................",
        "..................",
        ".......kkkkk......",
        "......kaaaaak.....",
        "....kkawwaaaak....",
        "..kkaaawwaaaaak...",
        ".kaaaaaaaaaaaak...",
        ".kaaaaaaaaaaaaak..",
        "kaaaaaaeaaaeaaaak.",
        "kaaaaaadaaadaaaak.",
        ".kaaaapaadaapaaak.",
        ".kAAAAAAAAAAAAAAk.",
        "..kAAAAAAAAAAAAk..",
        "...kkkkkkkkkkkk...",
        "..................",
      ],
    },
    spark: {
      skin: "y",
      rows: [
        "................",
        ".......kk.......",
        "......kyyk......",
        "......kyyk......",
        ".....kyyyyk.....",
        ".kkkkkwyyykkkkk.",
        "kyyyywwyyyyyyyyk",
        ".kyyyyyyyyyyyyk.",
        "..kyyyeyyyeyyk..",
        "...kyydyyydok...",
        "...kyyyydoook...",
        "...kyyyoooook...",
        "...kyookkoook...",
        "..koook..koook..",
        "...kok....kok...",
        "....k......k....",
      ],
    },
    frost: {
      skin: "i",
      rows: [
        "................",
        "................",
        "...kkkkkkkkkk...",
        "..kwwwiiiiiiik..",
        ".kiwwwiiiiiiiik.",
        ".kiwwiiiiiiiiik.",
        ".kiwwiiiiiiiiik.",
        ".kiiiiiiiiiiiik.",
        ".kiiiieiiieiiIk.",
        ".kiiiidiiidiIIk.",
        ".kiiipiidiipIIk.",
        ".kiiiiiiiiIIIIk.",
        ".kiiiiiiiIIIIIk.",
        ".kiiiiiiIIIIIIk.",
        "..kiiiiIIIIIIk..",
        "...kkkkkkkkkk...",
        "................",
      ],
    },
    shroom: {
      skin: "t",
      rows: [
        "................",
        "....kkkkkkkk....",
        "..kkrrrrwwrrkk..",
        ".krrrrrrwwwrrrk.",
        "krrrwwrrrwrrrrrk",
        "krrwwwrrrrrrwrrk",
        "krrrrrrrrrrwwrrk",
        "krrrrrrrrrrrrrrk",
        ".kkkttttttttkkk.",
        "...kttttttttk...",
        "...kttetttetk...",
        "...kttdtttdTk...",
        "...ktpttdTTpk...",
        "...ktttTTTTTk...",
        "....kTTTTTTk....",
        ".....kkkkkk.....",
        "................",
      ],
    },
    void: {
      skin: "x",
      rows: [
        "................",
        "................",
        "......kkkk......",
        ".....kxxxxk.....",
        "....kxxxxxxk....",
        "...kxxxxxxxwk...",
        "..kxxwxxxxxxxk..",
        ".kxxxxxxxxxxxxk.",
        ".kxxxxgxxxgxxxk.",
        ".kxxxxGxxxGxxXk.",
        ".kxxxxxxxxxXXXk.",
        ".kxxxxxxdXXXwXk.",
        "..kxwxxXXXXXXk..",
        "...kxXXXXXXXk...",
        "....kkkkkkkk....",
        "................",
        "................",
      ],
    },
    leaf: {
      skin: "n",
      rows: [
        "................",
        "................",
        "....kkk.........",
        "..kknnnkk.......",
        ".knnnnnnlkk.....",
        ".knNnnnnlnnk....",
        ".knnNnnnnnnnk...",
        ".knnnNNnnnnnnk..",
        ".kNnnneNnnennnk.",
        ".kNNnndnNndnnnk.",
        "..kNNpnndNNpnnk.",
        "...kNNNnnnnNnnk.",
        "....kNNNnnnnNnk.",
        ".....kkNNNnnnNk.",
        ".......kkNNnkk..",
        ".........kkk....",
        "................",
      ],
    },
    bubble: {
      skin: "s",
      rows: [
        "................",
        "................",
        ".....kkkkkk.....",
        "....kssssssk....",
        "...kwwssssssk...",
        "..kwwwwssssssk..",
        ".ksswwssssssssk.",
        ".kssssssssssssk.",
        ".kssssssssssssk.",
        ".kssssesssesSSk.",
        ".kssssdsssdSSSk.",
        ".kssspssdsSpSSk.",
        "..ksssssSSSwSk..",
        "...ksssSSSSSk...",
        "....kSSSSSSk....",
        ".....kkkkkk.....",
        "................",
      ],
    },
    crystal: {
      skin: "u",
      rows: [
        "................",
        "................",
        "....kkkkkkkk....",
        "...kwwUUUUUUk...",
        "..kwwwUUUUUUUk..",
        ".kwwwwUUUUUUUUk.",
        ".kuuuuuuuYYYYYk.",
        "..kuuuuuuYYYYk..",
        "..kuuueuuYeYYk..",
        "...kuuduuYdYk...",
        "....kpuuduYp....",
        "....kuuuuuYk....",
        ".....kuuuuk.....",
        "......kuuk......",
        "......kuuk......",
        ".......kk.......",
        "................",
      ],
    },
  };

  var root = document.documentElement;
  var reduceMotion =
    window.matchMedia &&
    matchMedia("(prefers-reduced-motion: reduce)").matches;

  var canvas = document.createElement("canvas");
  canvas.id = "bg-sprites";
  canvas.setAttribute("aria-hidden", "true");
  document.body.insertBefore(canvas, document.body.firstChild);
  var ctx = canvas.getContext("2d");

  var W = 0, H = 0, dpr = 1, px = 0;
  var colL = 0, colR = 0, narrow = false;
  var kinds = [];   // [{ frames: [canvas|img, ...], w, h }]
  var sprites = [];
  var mouse = { x: -9999, y: -9999 };

  function rand(a, b) {
    return a + Math.random() * (b - a);
  }

  // pixel grid -> canvas at an integer pixel size
  function bake(rows, size) {
    var c = document.createElement("canvas");
    c.width = rows[0].length * size;
    c.height = rows.length * size;
    var g = c.getContext("2d");
    rows.forEach(function (row, y) {
      for (var x = 0; x < row.length; x++) {
        var col = PALETTE[row[x]];
        if (!col) continue;
        g.fillStyle = col;
        g.fillRect(x * size, y * size, size, size);
      }
    });
    return c;
  }

  function buildKinds(done) {
    if (CUSTOM_IMAGES.length) {
      var loaded = [], left = CUSTOM_IMAGES.length;
      CUSTOM_IMAGES.forEach(function (src) {
        var img = new Image();
        img.onload = function () {
          var h = narrow ? CUSTOM_HEIGHT * 0.66 : CUSTOM_HEIGHT;
          loaded.push({ frames: [img], h: h, w: (img.naturalWidth / img.naturalHeight) * h });
          if (--left === 0) done(loaded);
        };
        img.onerror = function () {
          if (--left === 0) done(loaded);
        };
        img.src = src;
      });
      return;
    }
    var out = [];
    for (var name in CRITTERS) {
      var cr = CRITTERS[name];
      var blink = cr.rows.map(function (r) {
        return r.split("e").join(cr.skin).split("g").join(cr.skin);
      });
      var open = bake(cr.rows, px * dpr), shut = bake(blink, px * dpr);
      out.push({ frames: [open, shut], w: open.width / dpr, h: open.height / dpr });
    }
    done(out);
  }

  function measure() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    var r = document.body.getBoundingClientRect();
    colL = r.left;
    colR = r.right;
    narrow = W < 760;
    px = W < 640 ? 2 : 3;
  }

  function makeSprite(kind, i, n) {
    return {
      kind: kind,
      x: ((i + rand(0.1, 0.9)) / n) * W,
      y: rand(0.08, 0.92) * H,
      heading: rand(0, Math.PI * 2),
      speed: rand(10, 18),
      turn: rand(0.5, 1.1),
      phase: rand(0, Math.PI * 2),
      t: rand(0, 10),
      face: 1,
      nextBlink: rand(1, 5), blinkT: 0,
      nextHop: rand(2, 8), hopT: -1,
      pushX: 0, pushY: 0,
    };
  }

  function populate() {
    if (!kinds.length) return;
    var n = Math.max(5, Math.min(11, Math.round((W * H) / 100000)));
    var order = kinds.slice().sort(function () { return Math.random() - 0.5; });
    sprites = [];
    for (var i = 0; i < n; i++) sprites.push(makeSprite(order[i % order.length], i, n));
  }

  // faint behind the text column, clearer out in the margins
  function alphaAt(x) {
    var dark = root.classList.contains("dark");
    if (narrow) return dark ? 0.16 : 0.18;
    var inner = dark ? 0.12 : 0.13;
    var outer = dark ? 0.8 : 0.85;
    var d = Math.max(colL - x, x - colR); // >0 outside the column
    var k = Math.min(1, Math.max(0, (d + 10) / 70));
    return inner + (outer - inner) * k;
  }

  function step(dt) {
    for (var i = 0; i < sprites.length; i++) {
      var s = sprites[i];
      s.t += dt;

      // wander: the heading takes a slow random walk
      s.heading += Math.sin(s.t * s.turn + s.phase) * 0.9 * dt + rand(-0.6, 0.6) * dt;
      var vx = Math.cos(s.heading) * s.speed;
      var vy = Math.sin(s.heading) * s.speed * 0.6;

      // shy: scoot away from the cursor
      var dx = s.x - mouse.x, dy = s.y - mouse.y, dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120 && dist > 0.01) {
        var f = ((120 - dist) / 120) * 160 * dt;
        s.pushX += (dx / dist) * f;
        s.pushY += (dy / dist) * f;
      }
      s.pushX *= Math.pow(0.15, dt);
      s.pushY *= Math.pow(0.15, dt);

      s.x += (vx + s.pushX * 3) * dt;
      s.y += (vy + s.pushY * 3) * dt;

      var vxAll = vx + s.pushX * 3;
      if (vxAll > 4) s.face = 1;
      else if (vxAll < -4) s.face = -1;

      var m = 70;
      if (s.x < -m) s.x = W + m;
      if (s.x > W + m) s.x = -m;
      if (s.y < -m) s.y = H + m;
      if (s.y > H + m) s.y = -m;

      // blink every few seconds
      s.nextBlink -= dt;
      if (s.nextBlink <= 0) { s.blinkT = 0.14; s.nextBlink = rand(2.5, 6); }
      if (s.blinkT > 0) s.blinkT -= dt;

      // the odd little hop
      s.nextHop -= dt;
      if (s.nextHop <= 0 && s.hopT < 0) { s.hopT = 0; s.nextHop = rand(4, 10); }
      if (s.hopT >= 0) { s.hopT += dt; if (s.hopT > 0.55) s.hopT = -1; }
    }
  }

  function draw() {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.imageSmoothingEnabled = !!CUSTOM_IMAGES.length;
    for (var i = 0; i < sprites.length; i++) {
      var s = sprites[i], k = s.kind;
      var img = k.frames[s.blinkT > 0 && k.frames[1] ? 1 : 0];
      var bob = Math.sin(s.t * 2.2 + s.phase) * 3;
      var hop = 0, sx = 1, sy = 1;
      if (s.hopT >= 0) {
        var p = s.hopT / 0.55;
        hop = -Math.sin(p * Math.PI) * 16;
        if (p < 0.15) { sx = 1.12; sy = 0.88; }       // crouch
        else if (p < 0.6) { sx = 0.92; sy = 1.08; }   // stretch
      }
      ctx.globalAlpha = alphaAt(s.x);
      ctx.setTransform(dpr, 0, 0, dpr, s.x * dpr, (s.y + bob + hop) * dpr);
      ctx.scale(sx * s.face, sy);
      ctx.drawImage(img, -k.w / 2, -k.h, k.w, k.h); // anchored at the feet
    }
    ctx.globalAlpha = 1;
  }

  var last = 0;
  function frame(now) {
    var dt = last ? Math.min(0.05, (now - last) / 1000) : 0;
    last = now;
    step(dt);
    draw();
    requestAnimationFrame(frame);
  }

  function rebuild(repopulate) {
    buildKinds(function (k) {
      if (!k.length) return;
      kinds = k;
      if (repopulate || !sprites.length) populate();
      else sprites.forEach(function (s, i) { s.kind = kinds[i % kinds.length]; });
      if (reduceMotion) draw();
    });
  }

  measure();
  rebuild(true);

  window.addEventListener("resize", function () {
    var oldW = W, oldH = H, oldPx = px, oldDpr = dpr;
    measure();
    var big = Math.abs(W - oldW) > 120 || Math.abs(H - oldH) > 200;
    if (big || px !== oldPx || dpr !== oldDpr) rebuild(big);
    else if (reduceMotion) draw();
  });
  window.addEventListener("mousemove", function (e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  }, { passive: true });
  document.addEventListener("mouseleave", function () {
    mouse.x = mouse.y = -9999;
  });

  if (reduceMotion) {
    // a still scene for people who turn motion off
    new MutationObserver(draw).observe(root, { attributes: true, attributeFilter: ["class"] });
  } else {
    requestAnimationFrame(frame);
  }
})();
