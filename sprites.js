// Elemental wisps drifting behind the page, trailing faint embers.
(function () {
  // ------------------------------------------------------------------
  // Use your own sprite images:
  //   1. Put PNGs with transparent backgrounds in assets/sprites/
  //   2. List them below, e.g. ["./assets/sprites/water.png", ...]
  // When this list has images, they replace the built-in wisps.
  var CUSTOM_IMAGES = [];
  var CUSTOM_HEIGHT = 56; // display height in px on desktop (phones: 2/3)
  // ------------------------------------------------------------------

  // Built-in wisps: one palette letter per pixel, "." is transparent.
  // "e"/"E" are the glowing eyes; they become skin colour to blink.
  var PALETTE = {
    e: "#fffbe6", E: "#fff3c4", w: "#ffffff",
    r: "#e0603e", o: "#f09a3a", y: "#f6d36b", R: "#7a2e1f", O: "#8a5a1a", // ember, storm
    c: "#5aa7d6", C: "#a9d6ef", D: "#3a7bb0", Q: "#1f4466",               // tide
    x: "#3d2c63", X: "#2a1f47", u: "#9b86d6", Z: "#17112a",               // void
    n: "#5fae93", N: "#3f8670", l: "#bfe8d8", K: "#1f4a3d",               // shard
    i: "#bfe3ef", I: "#8cc3d6", F: "#3f6f80",                             // frost
  };

  var WISPS = {
    ember: {
      skin: "o",
      trail: "o",
      rows: [
        "..........R.....",
        ".........RrR....",
        "........RrrR....",
        ".......RrrrR....",
        "...R..RrrrrR....",
        "..RrR.RrrrrR....",
        ".RrrRRrrrrrR....",
        ".RrrrroooorrR...",
        ".RrrroooooorR...",
        "..RroooyyoooR...",
        "..RrooeyyyeorR..",
        "..RrooEyyyEorR..",
        "..RrooyyyyoorR..",
        "...RroyyyyorR...",
        "....RroyyorR....",
        ".....RRrrRR.....",
        ".......RR.......",
      ],
    },
    tide: {
      skin: "c",
      trail: "C",
      rows: [
        ".....Q..........",
        "....QcQ.........",
        "....QccQ........",
        "....QcccQ.......",
        "....QccccQ......",
        "....QcccccQ.....",
        "....QccccccQ....",
        "...QccccccccQ...",
        "...QcccccccccQ..",
        "...QcCcccccccQ..",
        "..QccCcecceccDQ.",
        "..QccCcEccEDDDQ.",
        "...QccccccDDDQ..",
        "...QccccDDDDDQ..",
        "....QcDDDDDDQ...",
        ".....QQDDDQQ....",
        ".......QQQ......",
      ],
    },
    void: {
      skin: "x",
      trail: "u",
      rows: [
        "..................",
        "..................",
        "..................",
        "......ZZZZZ.......",
        ".ZZ..ZxxxxxZ......",
        "ZuuZZuuxxxxxZ.....",
        "ZuZZxxxxuxxxxZ....",
        ".ZuZxxxxxxuxxZ....",
        "..ZuxxxexxexuZ....",
        "...ZxxxExxExXuZ...",
        "...ZxxxxxxXXXZuZ..",
        "...ZxxxxXXXXXZZuZ.",
        "....ZxXXXXXXZZuuZ.",
        ".....ZXXXXXZ..ZZ..",
        "......ZZZZZ.......",
        "..................",
        "..................",
        "..................",
      ],
    },
    shard: {
      skin: "n",
      trail: "l",
      rows: [
        "........K.........",
        ".......KnK........",
        "......KnnNK.......",
        ".....KnnnNNK......",
        ".....KlnnNNK...K..",
        ".K...KlnnNNK..KNK.",
        "KnK..KlnnNNK.KNNK.",
        "KnnK.KlnnNNKKnNNK.",
        "KnnNKKlnnNNKKnNNK.",
        "KnnNKKlenNeKKnNNK.",
        "KnnNKKnEnNEKKnNNK.",
        "KnnNKKnnnNNKKnNNK.",
        "KnnNKKnnnNNKKnNNK.",
        "KnnNKKnnnNNKKnNNK.",
        "KnnNKKnnnNNKKnNNK.",
        ".KnNKKnnnNNKKnNNK.",
        "..KK..KKKKK..KKK..",
      ],
    },
    storm: {
      skin: "y",
      trail: "y",
      rows: [
        "........O........",
        ".......OoO.......",
        ".......OoO.......",
        "......OOoOO......",
        ".....OoyyyoO.....",
        "....OyyyyyyyO....",
        "...OoywwwyyyoO...",
        ".OOOyywwwyyyyOOO.",
        "OoooyyweyyeyyoooO",
        ".OOOyyyEyyEyyOOO.",
        "...OoyyyyyyyoO...",
        "....OyyyyyyyO....",
        ".....OoyyyoO.....",
        "......OOoOO......",
        ".......OoO.......",
        ".......OoO.......",
        "........O........",
      ],
    },
    frost: {
      skin: "i",
      trail: "w",
      rows: [
        ".......FiF.......",
        ".......FiF.......",
        ".......FiF.......",
        ".FF....FiF....FF.",
        "FiiFF.FiiiF.FFiIF",
        ".FiiiFiwiiiFiiIF.",
        "..FFiiwwwiiiiFF..",
        "...FiiiwiiiiIF...",
        "...FiiieiieIIF...",
        "...FiiiEiiEIIF...",
        "..FFiiiiiIIIIFF..",
        ".FiiiFiiIIIFIIIF.",
        "FiiFF.FIIIF.FFIIF",
        ".FF....FIF....FF.",
        ".......FIF.......",
        ".......FIF.......",
        ".......FIF.......",
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
  var kinds = [];     // [{ frames, w, h, trail, glow }]
  var sprites = [];
  var particles = [];
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

  // soft round glow in the wisp's trail colour
  function bakeGlow(hex, radius) {
    var c = document.createElement("canvas");
    c.width = c.height = Math.ceil(radius * 2 * dpr);
    var g = c.getContext("2d");
    var r = c.width / 2;
    var grad = g.createRadialGradient(r, r, 0, r, r, r);
    grad.addColorStop(0, hex + "55");
    grad.addColorStop(1, hex + "00");
    g.fillStyle = grad;
    g.fillRect(0, 0, c.width, c.height);
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
    for (var name in WISPS) {
      var wp = WISPS[name];
      var blink = wp.rows.map(function (r) {
        return r.split("e").join(wp.skin).split("E").join(wp.skin);
      });
      var open = bake(wp.rows, px * dpr), shut = bake(blink, px * dpr);
      var w = open.width / dpr, h = open.height / dpr;
      out.push({
        frames: [open, shut],
        w: w,
        h: h,
        trail: PALETTE[wp.trail],
        glow: bakeGlow(PALETTE[wp.trail], Math.max(w, h) * 0.9),
      });
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
      nextDash: rand(3, 9), dashT: -1,
      emit: 0,
      pushX: 0, pushY: 0,
    };
  }

  function populate() {
    if (!kinds.length) return;
    var n = Math.max(5, Math.min(11, Math.round((W * H) / 100000)));
    var order = kinds.slice().sort(function () { return Math.random() - 0.5; });
    sprites = [];
    particles = [];
    for (var i = 0; i < n; i++) sprites.push(makeSprite(order[i % order.length], i, n));
  }

  // faint behind the text column, clearer out in the margins
  function alphaAt(x) {
    var dark = root.classList.contains("dark");
    if (narrow) return dark ? 0.18 : 0.2;
    var inner = dark ? 0.12 : 0.13;
    var outer = dark ? 0.85 : 0.85;
    var d = Math.max(colL - x, x - colR); // >0 outside the column
    var k = Math.min(1, Math.max(0, (d + 10) / 70));
    return inner + (outer - inner) * k;
  }

  function step(dt) {
    for (var i = 0; i < sprites.length; i++) {
      var s = sprites[i], k = s.kind;
      s.t += dt;

      // wander: the heading takes a slow random walk
      s.heading += Math.sin(s.t * s.turn + s.phase) * 0.9 * dt + rand(-0.6, 0.6) * dt;

      // now and then, a quick dash
      s.nextDash -= dt;
      if (s.nextDash <= 0 && s.dashT < 0) { s.dashT = 0; s.nextDash = rand(5, 12); }
      var boost = 1;
      if (s.dashT >= 0) {
        s.dashT += dt;
        var p = s.dashT / 0.6;
        boost = 1 + 5 * Math.sin(Math.min(1, p) * Math.PI);
        if (p >= 1) s.dashT = -1;
      }
      var vx = Math.cos(s.heading) * s.speed * boost;
      var vy = Math.sin(s.heading) * s.speed * 0.6 * boost;

      // shy: drift away from the cursor
      var dx = s.x - mouse.x, dy = s.y - mouse.y, dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120 && dist > 0.01) {
        var f = ((120 - dist) / 120) * 160 * dt;
        s.pushX += (dx / dist) * f;
        s.pushY += (dy / dist) * f;
      }
      s.pushX *= Math.pow(0.15, dt);
      s.pushY *= Math.pow(0.15, dt);

      var mvx = vx + s.pushX * 3, mvy = vy + s.pushY * 3;
      s.x += mvx * dt;
      s.y += mvy * dt;
      if (mvx > 4) s.face = 1;
      else if (mvx < -4) s.face = -1;

      var m = 70;
      if (s.x < -m) s.x = W + m;
      if (s.x > W + m) s.x = -m;
      if (s.y < -m) s.y = H + m;
      if (s.y > H + m) s.y = -m;

      // blink every few seconds
      s.nextBlink -= dt;
      if (s.nextBlink <= 0) { s.blinkT = 0.12; s.nextBlink = rand(2.5, 6); }
      if (s.blinkT > 0) s.blinkT -= dt;

      // shed trail embers (more while dashing)
      if (k.trail) {
        s.emit -= dt;
        if (s.emit <= 0 && particles.length < 260) {
          s.emit = boost > 1.5 ? 0.025 : 0.09;
          particles.push({
            x: s.x + rand(-k.w * 0.2, k.w * 0.2),
            y: s.y - k.h * 0.45 + rand(-k.h * 0.2, k.h * 0.2),
            vx: -mvx * 0.15 + rand(-6, 6),
            vy: rand(-10, -2),
            life: 0,
            max: rand(0.7, 1.3),
            size: px * (Math.random() < 0.3 ? 2 : 1),
            color: k.trail,
          });
        }
      }
    }

    for (var j = particles.length - 1; j >= 0; j--) {
      var pt = particles[j];
      pt.life += dt;
      if (pt.life >= pt.max) { particles.splice(j, 1); continue; }
      pt.x += pt.vx * dt;
      pt.y += pt.vy * dt;
    }
  }

  function draw() {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // trail embers
    for (var j = 0; j < particles.length; j++) {
      var pt = particles[j], fade = 1 - pt.life / pt.max;
      ctx.globalAlpha = alphaAt(pt.x) * fade * 0.8;
      ctx.fillStyle = pt.color;
      var sz = pt.size * (0.5 + fade * 0.5);
      ctx.fillRect(Math.round((pt.x - sz / 2) * dpr), Math.round((pt.y - sz / 2) * dpr), Math.ceil(sz * dpr), Math.ceil(sz * dpr));
    }

    ctx.imageSmoothingEnabled = !!CUSTOM_IMAGES.length;
    for (var i = 0; i < sprites.length; i++) {
      var s = sprites[i], k = s.kind;
      var img = k.frames[s.blinkT > 0 && k.frames[1] ? 1 : 0];
      var bob = Math.sin(s.t * 2.2 + s.phase) * 3;
      var a = alphaAt(s.x);
      var cy = s.y + bob;
      if (k.glow) {
        var gs = k.glow.width / dpr;
        ctx.globalAlpha = a * (0.8 + 0.2 * Math.sin(s.t * 3 + s.phase));
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.drawImage(k.glow, (s.x - gs / 2) * dpr, (cy - k.h / 2 - gs / 2) * dpr);
      }
      ctx.globalAlpha = a;
      ctx.setTransform(dpr, 0, 0, dpr, s.x * dpr, cy * dpr);
      ctx.scale(s.face, 1);
      ctx.drawImage(img, -k.w / 2, -k.h, k.w, k.h);
    }
    ctx.setTransform(1, 0, 0, 1, 0, 0);
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
