// Sprites drifting behind the page: elemental wisps, a moonwalking
// dancer, a frisbee, and a bulldog that chases it.
(function () {
  // ------------------------------------------------------------------
  // Use your own sprite images:
  //   1. Put PNGs with transparent backgrounds in assets/sprites/
  //   2. List them below, e.g. ["./assets/sprites/water.png", ...]
  // When this list has images, they replace the built-in sprites.
  var CUSTOM_IMAGES = [];
  var CUSTOM_HEIGHT = 56; // display height in px on desktop (phones: 2/3)
  // ------------------------------------------------------------------

  // Pixel art: one palette letter per pixel, "." is transparent.
  var WISP = {
    e: "#fffbe6", E: "#fff3c4", w: "#ffffff",
    r: "#e0603e", o: "#f09a3a", y: "#f6d36b", R: "#7a2e1f", O: "#8a5a1a", // ember, storm
    c: "#5aa7d6", C: "#a9d6ef", D: "#3a7bb0", Q: "#1f4466",               // tide
    x: "#3d2c63", X: "#2a1f47", u: "#9b86d6", Z: "#17112a",               // void
    n: "#5fae93", N: "#3f8670", l: "#bfe8d8", K: "#1f4a3d",               // shard
    i: "#bfe3ef", I: "#8cc3d6", F: "#3f6f80",                             // frost
  };
  var DANCER = {
    h: "#2b2b30", b: "#e9e9e9", H: "#2a1d17", s: "#c48d68", S: "#a26f4e",
    k: "#141418", e: "#141418", j: "#2f2f36", J: "#474752", w: "#f1f1f1",
    g: "#ffffff", G: "#cfe0ff", p: "#1e1e23", f: "#0f0f12",
  };
  var DOG = {
    k: "#2a221e", t: "#c99a6b", T: "#a87a4f", W: "#f2ece4", m: "#2a2220",
    c: "#5aa7d6", a: "#1b1716", A: "#1b1716",
  };
  var DISC = { k: "#3a3f47", z: "#f3f3f0", Z: "#c8d6e6", v: "#3a7bb0", w: "#ffffff" };

  var SPRITES = {
    ember: {
      kind: "wisp",
      trail: "o",
      blink: { e: "o", E: "o" },
      poses: [
        [
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
      ],
    },
    tide: {
      kind: "wisp",
      trail: "C",
      blink: { e: "c", E: "c" },
      poses: [
        [
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
      ],
    },
    void: {
      kind: "wisp",
      trail: "u",
      blink: { e: "x", E: "x" },
      poses: [
        [
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
      ],
    },
    shard: {
      kind: "wisp",
      trail: "l",
      blink: { e: "n", E: "n" },
      poses: [
        [
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
      ],
    },
    storm: {
      kind: "wisp",
      trail: "y",
      blink: { e: "y", E: "y" },
      poses: [
        [
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
      ],
    },
    frost: {
      kind: "wisp",
      trail: "w",
      blink: { e: "i", E: "i" },
      poses: [
        [
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
      ],
    },
    dancer: {
      kind: "dancer",
      pal: DANCER,
      fps: 3,
      poses: [
        [
          "....hhhh....",
          "...hhhhhh...",
          "...bbbbbb...",
          ".hhhhhhhhhh.",
          "...HHssske..",
          "...HHsssss..",
          "....HSsss...",
          ".....wsw....",
          "....jjwjj...",
          "...jjjwjjj..",
          "...jjJwjjj..",
          "...jjJjjjj..",
          "...jjJjjjgg.",
          "...jjjjjjgG.",
          "....pppppp..",
          "....ppp.pp..",
          "....ppp..pp.",
          "....pp...pp.",
          "....ww...ww.",
          "..fffw....f.",
        ],
        [
          "....hhhh....",
          "...hhhhhh...",
          "...bbbbbb...",
          ".hhhhhhhhhh.",
          "...HHssske..",
          "...HHsssss..",
          "....HSsss...",
          ".....wsw....",
          "....jjwjj...",
          "...jjjwjjj..",
          "...jjJwjjj..",
          "...jjJjjjj..",
          "...jjJjjjgg.",
          "...jjjjjjgG.",
          "....pppppp..",
          "....pp.ppp..",
          "...pp..ppp..",
          "...pp...pp..",
          "...ww...ww..",
          "...ff....fff",
        ],
      ],
    },
    dog: {
      kind: "dog",
      pal: DOG,
      fps: 8,
      blink: { a: "t", A: "t" },
      poses: [
        [
          "............kk.......",
          "...........kTTkkk....",
          "...........kTTtttk...",
          ".....kkkkkkkctttttk..",
          ".kkkktttttttctttattk.",
          "ktttttttttttctttAmmk.",
          ".kttttttttttcttWWWmk.",
          ".kttttttttWWcWWWWWWk.",
          ".kttttttttWWcWWttkk..",
          "..kttTttTTTWWTWtkk...",
          "..kttkTTTTTWWkTTk....",
          "..kttkTTkkkttkTTk....",
          "..kttkTTk.kttkTTk....",
          "...kk.kk...kk.kk.....",
        ],
        [
          "............kk.......",
          "...........kTTkkk....",
          "...........kTTtttk...",
          ".....kkkkkkkctttttk..",
          ".kkkktttttttctttattk.",
          "ktttttttttttctttAmmk.",
          ".kttttttttttcttWWWmk.",
          ".kttttttttWWcWWWWWWk.",
          ".kttttttttWWcWWttkk..",
          "..kktttTTTTTWWWkkk...",
          "...ktTTTTTTkWWTk.....",
          "...ktTTkkkkktTTk.....",
          "...ktTTk...ktTTk.....",
          "....kkk.....kkk......",
        ],
      ],
    },
    frisbee: {
      kind: "disc",
      pal: DISC,
      fps: 12,
      trail: "Z",
      poses: [
        [
          "....kkkkkkk....",
          ".kkkZZZZZZZkkk.",
          "kZZwwwwwzzzzZvk",
          "kZZzzzzzzzzzvvk",
          "kZZzzzzzzzzzZvk",
          ".kkkZZZZZZZkkk.",
          "....kkkkkkk....",
        ],
        [
          "....kkkkkkk....",
          ".kkkZZZZZZZkkk.",
          "kZZwwwwwzzzzZZk",
          "kZZzzzzzzzzzZZk",
          "kZZzzzzzzzzzZZk",
          ".kkkvvvZZZZkkk.",
          "....kkkkkkk....",
        ],
        [
          "....kkkkkkk....",
          ".kkkvvvZZZZkkk.",
          "kZZwwwwwzzzzZZk",
          "kZZzzzzzzzzzZZk",
          "kZZzzzzzzzzzZZk",
          ".kkkZZZZZZZkkk.",
          "....kkkkkkk....",
        ],
      ],
    },
  };
  var WISP_NAMES = ["ember", "tide", "void", "shard", "storm", "frost"];

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
  var kinds = {};     // name -> { frames: [[open, blink?], ...], w, h, ... }
  var customKinds = null;
  var sprites = [];
  var particles = [];
  var mouse = { x: -9999, y: -9999 };

  function rand(a, b) {
    return a + Math.random() * (b - a);
  }

  function bake(rows, size, pal) {
    var c = document.createElement("canvas");
    c.width = rows[0].length * size;
    c.height = rows.length * size;
    var g = c.getContext("2d");
    rows.forEach(function (row, y) {
      for (var x = 0; x < row.length; x++) {
        var col = pal[row[x]];
        if (!col) continue;
        g.fillStyle = col;
        g.fillRect(x * size, y * size, size, size);
      }
    });
    return c;
  }

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

  function swap(rows, map) {
    return rows.map(function (r) {
      var out = "";
      for (var i = 0; i < r.length; i++) out += map[r[i]] || r[i];
      return out;
    });
  }

  function buildKinds(done) {
    if (CUSTOM_IMAGES.length) {
      var loaded = [], left = CUSTOM_IMAGES.length;
      CUSTOM_IMAGES.forEach(function (src) {
        var img = new Image();
        img.onload = function () {
          var h = narrow ? CUSTOM_HEIGHT * 0.66 : CUSTOM_HEIGHT;
          loaded.push({ kind: "wisp", frames: [[img]], h: h, w: (img.naturalWidth / img.naturalHeight) * h, fps: 0 });
          if (--left === 0) { customKinds = loaded; done(); }
        };
        img.onerror = function () {
          if (--left === 0) { customKinds = loaded; done(); }
        };
        img.src = src;
      });
      return;
    }
    kinds = {};
    for (var name in SPRITES) {
      var sp = SPRITES[name], pal = sp.pal || WISP;
      var frames = sp.poses.map(function (rows) {
        var f = [bake(rows, px * dpr, pal)];
        if (sp.blink) f.push(bake(swap(rows, sp.blink), px * dpr, pal));
        return f;
      });
      var w = frames[0][0].width / dpr, h = frames[0][0].height / dpr;
      var trail = sp.trail ? pal[sp.trail] : null;
      kinds[name] = {
        name: name,
        kind: sp.kind,
        frames: frames,
        fps: sp.fps || 0,
        w: w,
        h: h,
        trail: trail,
        glow: sp.kind === "wisp" ? bakeGlow(trail, Math.max(w, h) * 0.9) : null,
      };
    }
    done();
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

  function makeSprite(k, x, y) {
    var s = {
      k: k,
      x: x,
      y: y,
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
    if (k.kind === "disc") { s.speed = rand(70, 90); }
    if (k.kind === "dog") { s.speed = rand(52, 60); }
    if (k.kind === "dancer") {
      s.dir = Math.random() < 0.5 ? -1 : 1;
      s.speed = rand(20, 26);
      s.nextSpin = rand(5, 10); s.spinT = -1;
      s.nextTurn = rand(10, 20);
    }
    return s;
  }

  // evenly spread starting spots: one per cell of a jittered grid
  function spots(n) {
    var cols = Math.max(2, Math.round(Math.sqrt((n * W) / H)));
    var rows = Math.ceil(n / cols);
    var cells = [];
    for (var r = 0; r < rows; r++)
      for (var c = 0; c < cols; c++) cells.push([c, r]);
    cells.sort(function () { return Math.random() - 0.5; });
    return cells.slice(0, n).map(function (cell) {
      return [
        ((cell[0] + rand(0.2, 0.8)) / cols) * W,
        ((cell[1] + rand(0.2, 0.8)) / rows) * H,
      ];
    });
  }

  function populate() {
    var n = Math.max(5, Math.min(11, Math.round((W * H) / 100000)));
    var list = [];
    if (customKinds) {
      for (var i = 0; i < n; i++) list.push(customKinds[i % customKinds.length]);
    } else {
      list.push(kinds.dancer, kinds.frisbee, kinds.dog);
      var wisps = WISP_NAMES.slice().sort(function () { return Math.random() - 0.5; });
      for (var j = 0; list.length < n; j++) list.push(kinds[wisps[j % wisps.length]]);
    }
    var pos = spots(list.length);
    sprites = list.map(function (k, i) { return makeSprite(k, pos[i][0], pos[i][1]); });
    particles = [];
  }

  // faint behind the text column, clearer out in the margins
  function alphaAt(x) {
    var dark = root.classList.contains("dark");
    if (narrow) return dark ? 0.18 : 0.2;
    var inner = dark ? 0.12 : 0.13;
    var outer = 0.85;
    var d = Math.max(colL - x, x - colR); // >0 outside the column
    var k = Math.min(1, Math.max(0, (d + 10) / 70));
    return inner + (outer - inner) * k;
  }

  function find(kind) {
    for (var i = 0; i < sprites.length; i++) if (sprites[i].k.kind === kind) return sprites[i];
    return null;
  }

  function steer(s, target, rate, dt) {
    var want = Math.atan2(target.y - s.y, target.x - s.x);
    var d = ((want - s.heading + Math.PI * 3) % (Math.PI * 2)) - Math.PI;
    s.heading += Math.max(-rate * dt, Math.min(rate * dt, d));
  }

  function step(dt) {
    var disc = find("disc");
    for (var i = 0; i < sprites.length; i++) {
      var s = sprites[i], k = s.k;
      s.t += dt;
      var vx, vy, boost = 1;

      if (k.kind === "dancer") {
        // moonwalk: slide one way while facing the other, spin now and then
        s.nextTurn -= dt;
        if (s.nextTurn <= 0) { s.dir *= -1; s.nextTurn = rand(10, 20); }
        s.nextSpin -= dt;
        if (s.nextSpin <= 0 && s.spinT < 0) { s.spinT = 0; s.nextSpin = rand(7, 13); }
        vx = s.dir * s.speed;
        vy = Math.sin(s.t * 0.4 + s.phase) * 6;
        s.face = -s.dir;
        if (s.spinT >= 0) {
          s.spinT += dt;
          vx = 0;
          s.face = Math.floor(s.spinT / 0.09) % 2 ? 1 : -1;
          if (s.spinT > 0.72) s.spinT = -1;
        }
      } else if (k.kind === "dog" && disc) {
        // chase the frisbee
        steer(s, disc, 2.6, dt);
        vx = Math.cos(s.heading) * s.speed;
        vy = Math.sin(s.heading) * s.speed;
      } else if (k.kind === "disc") {
        // long sweeping arcs
        s.heading += Math.sin(s.t * 0.45 + s.phase) * 0.7 * dt;
        vx = Math.cos(s.heading) * s.speed;
        vy = Math.sin(s.heading) * s.speed * 0.7;
      } else {
        // wisps wander, with the odd quick dash
        s.heading += Math.sin(s.t * s.turn + s.phase) * 0.9 * dt + rand(-0.6, 0.6) * dt;
        s.nextDash -= dt;
        if (s.nextDash <= 0 && s.dashT < 0) { s.dashT = 0; s.nextDash = rand(5, 12); }
        if (s.dashT >= 0) {
          s.dashT += dt;
          var p = s.dashT / 0.6;
          boost = 1 + 5 * Math.sin(Math.min(1, p) * Math.PI);
          if (p >= 1) s.dashT = -1;
        }
        vx = Math.cos(s.heading) * s.speed * boost;
        vy = Math.sin(s.heading) * s.speed * 0.6 * boost;
      }

      // keep some space from the others (the dog is allowed to catch up)
      for (var j = 0; j < sprites.length; j++) {
        if (j === i) continue;
        var o = sprites[j];
        if ((k.kind === "dog" && o.k.kind === "disc") || (k.kind === "disc" && o.k.kind === "dog")) continue;
        var ox = s.x - o.x, oy = s.y - o.y, od = Math.sqrt(ox * ox + oy * oy);
        if (od < 150 && od > 0.01) {
          var rf = ((150 - od) / 150) * 40 * dt;
          s.pushX += (ox / od) * rf;
          s.pushY += (oy / od) * rf;
        }
      }

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
      if (k.kind !== "dancer") {
        if (mvx > 4) s.face = 1;
        else if (mvx < -4) s.face = -1;
      }

      var m = 80;
      if (s.x < -m) s.x = W + m;
      if (s.x > W + m) s.x = -m;
      if (s.y < -m) s.y = H + m;
      if (s.y > H + m) s.y = -m;

      s.nextBlink -= dt;
      if (s.nextBlink <= 0) { s.blinkT = 0.12; s.nextBlink = rand(2.5, 6); }
      if (s.blinkT > 0) s.blinkT -= dt;

      // trail embers (wisps and the frisbee)
      if (k.trail) {
        s.emit -= dt;
        if (s.emit <= 0 && particles.length < 260) {
          s.emit = k.kind === "disc" ? 0.03 : boost > 1.5 ? 0.025 : 0.09;
          particles.push({
            x: s.x + rand(-k.w * 0.2, k.w * 0.2),
            y: s.y - k.h * 0.45 + rand(-k.h * 0.2, k.h * 0.2),
            vx: -mvx * 0.15 + rand(-6, 6),
            vy: k.kind === "disc" ? rand(-3, 3) : rand(-10, -2),
            life: 0,
            max: k.kind === "disc" ? rand(0.4, 0.7) : rand(0.7, 1.3),
            size: px * (Math.random() < 0.3 ? 2 : 1),
            color: k.trail,
          });
        }
      }
    }

    for (var q = particles.length - 1; q >= 0; q--) {
      var pt = particles[q];
      pt.life += dt;
      if (pt.life >= pt.max) { particles.splice(q, 1); continue; }
      pt.x += pt.vx * dt;
      pt.y += pt.vy * dt;
    }
  }

  function draw() {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (var j = 0; j < particles.length; j++) {
      var pt = particles[j], fade = 1 - pt.life / pt.max;
      ctx.globalAlpha = alphaAt(pt.x) * fade * 0.8;
      ctx.fillStyle = pt.color;
      var sz = pt.size * (0.5 + fade * 0.5);
      ctx.fillRect(Math.round((pt.x - sz / 2) * dpr), Math.round((pt.y - sz / 2) * dpr), Math.ceil(sz * dpr), Math.ceil(sz * dpr));
    }

    ctx.imageSmoothingEnabled = !!customKinds;
    for (var i = 0; i < sprites.length; i++) {
      var s = sprites[i], k = s.k;
      var pose = k.fps ? Math.floor(s.t * k.fps) % k.frames.length : 0;
      var set = k.frames[pose];
      var img = set[s.blinkT > 0 && set[1] ? 1 : 0];
      var bob = k.kind === "wisp" ? Math.sin(s.t * 2.2 + s.phase) * 3
              : k.kind === "dog" ? -Math.abs(Math.sin(s.t * 8)) * 1.5 : 0;
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
    buildKinds(function () {
      if (repopulate || !sprites.length) populate();
      else sprites.forEach(function (s) { if (!customKinds) s.k = kinds[s.k.name]; });
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
    new MutationObserver(draw).observe(root, { attributes: true, attributeFilter: ["class"] });
  } else {
    requestAnimationFrame(frame);
  }
})();
