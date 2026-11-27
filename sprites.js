// Original battle-royale-style pixel sprites drifting behind the page.
// Each sprite is a grid of palette letters; "." is transparent.
(function () {
  var PALETTE = {
    k: "#1d1b2e", // outline
    w: "#ffffff",
    l: "#d9dde3", // light grey
    g: "#9aa1ab", // grey
    G: "#5d6470", // dark grey
    y: "#ffd23f", // gold
    o: "#f29d1f", // dark gold
    b: "#b0743a", // wood
    B: "#7a4a22", // dark wood
    c: "#3fa9f5", // shield blue
    C: "#a8ddff", // light blue
    r: "#e84a4a", // red
    n: "#4caf50", // green
    N: "#2e7d32", // dark green
  };

  var SPRITES = {
    chest: [
      "..kkkkkkkkkk..",
      ".kbbbbbbbbbbk.",
      "kbBbbbbbbbbBbk",
      "kyyyyyyyyyyyyk",
      "kbbbbbkkbbbbbk",
      "kBbbbkyykbbbBk",
      "kyyyyykkyyyyyk",
      "kbbbbbbbbbbbbk",
      "kBbbbbbbbbbbBk",
      "kyyyyyyyyyyyyk",
      ".kkkkkkkkkkkk.",
    ],
    potion: [
      "...kkkk...",
      "...kllk...",
      "...kGGk...",
      "..kkllkk..",
      ".kCCCCCCk.",
      "kCCcccccck",
      "kcwcccccck",
      "kcwcccccck",
      "kcccccccck",
      "kcccccccck",
      ".kcccccck.",
      "..kkkkkk..",
    ],
    pickaxe: [
      "...kkkkkk.....",
      ".kkllllllkk...",
      "kllggkkgglllk.",
      "kgkk.kBk.kkglk",
      "kk...kbk...kgk",
      ".....kbk....kk",
      ".....kbk......",
      ".....kBk......",
      ".....kbk......",
      ".....kbk......",
      ".....kBk......",
      ".....kbk......",
      ".....kkk......",
    ],
    medkit: [
      "....kkkk....",
      "...kk..kk...",
      "kkkkkkkkkkkk",
      "kwwwwwwwwwwk",
      "kwwwwrrwwwwk",
      "kwwwwrrwwwwk",
      "kwwrrrrrrwwk",
      "kwwrrrrrrwwk",
      "kwwwwrrwwwwk",
      "kwwwwrrwwwwk",
      "kllllllllllk",
      "kkkkkkkkkkkk",
    ],
    ammo: [
      ".kk.kk.kk.kk.",
      "kyokyokyokyok",
      "kyokyokyokyok",
      "kkkkkkkkkkkkk",
      "knnnnnnnnnnnk",
      "knNNNNNNNNNnk",
      "knNnnnnnnnNnk",
      "knNNNNNNNNNnk",
      "knnnnnnnnnnnk",
      "kkkkkkkkkkkkk",
    ],
    drop: [
      ".....kkkkkk.....",
      "...kkrrwwrrkk...",
      "..krrrwwwwrrrk..",
      ".krrrwwwwwwrrrk.",
      "kkkkkkkkkkkkkkkk",
      ".k.....kk.....k.",
      "..k....kk....k..",
      "...k...kk...k...",
      "....k..kk..k....",
      ".....kkkkkk.....",
      "....kkkkkkkk....",
      "....kbBbbBbk....",
      "....kbbBBbbk....",
      "....kbbBBbbk....",
      "....kbBbbBbk....",
      "....kkkkkkkk....",
    ],
    bush: [
      "....kkkk......",
      "..kknnnnkkk...",
      ".knnNnnnnnnk..",
      "knnnnnnNnnnnk.",
      "knNnnnnnnnNnnk",
      "knnnnNnnnnnnnk",
      ".knnnnnnnNnnk.",
      "..kkkkkkkkkk..",
    ],
  };

  // pre-render a sprite to its own canvas at an integer pixel size
  function bake(rows, px) {
    var c = document.createElement("canvas");
    c.width = rows[0].length * px;
    c.height = rows.length * px;
    var ctx = c.getContext("2d");
    rows.forEach(function (row, y) {
      for (var x = 0; x < row.length; x++) {
        var col = PALETTE[row[x]];
        if (!col) continue;
        ctx.fillStyle = col;
        ctx.fillRect(x * px, y * px, px, px);
      }
    });
    return c;
  }

  var FLOATERS = ["chest", "potion", "pickaxe", "medkit", "ammo", "bush"];
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
  var baked = {};
  var sprites = [];
  var mouse = { x: -9999, y: -9999 };

  function rand(a, b) {
    return a + Math.random() * (b - a);
  }

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    var r = document.body.getBoundingClientRect();
    colL = r.left;
    colR = r.right;
    narrow = W < 760;
    var nextPx = W < 640 ? 2 : 3;
    if (nextPx !== px) {
      px = nextPx;
      for (var name in SPRITES) baked[name] = bake(SPRITES[name], px * dpr);
    }
  }

  function makeSprite(kind, i, n) {
    var s = { kind: kind, phase: rand(0, Math.PI * 2), t: 0, pushX: 0, pushY: 0 };
    if (kind === "drop") {
      s.x0 = rand(0.05, 0.95) * W;
      s.y = rand(-0.2, 1) * H;
      s.vy = rand(16, 26);
    } else {
      // spread starting points across the screen
      s.x = ((i + rand(0.1, 0.9)) / n) * W;
      s.y = rand(0.05, 0.95) * H;
      var a = rand(0, Math.PI * 2), sp = rand(6, 15);
      s.vx = Math.cos(a) * sp;
      s.vy = Math.sin(a) * sp;
      s.spin = kind === "pickaxe" ? rand(0.35, 0.6) * (Math.random() < 0.5 ? -1 : 1) : 0;
    }
    return s;
  }

  function populate() {
    var n = Math.max(5, Math.min(12, Math.round((W * H) / 110000)));
    var drops = narrow ? 1 : 2;
    sprites = [];
    var order = FLOATERS.slice().sort(function () { return Math.random() - 0.5; });
    for (var i = 0; i < n - drops; i++)
      sprites.push(makeSprite(order[i % order.length], i, n - drops));
    for (var j = 0; j < drops; j++) sprites.push(makeSprite("drop", j, drops));
  }

  // faint behind the text column, clearer out in the margins
  function alphaAt(x) {
    var dark = root.classList.contains("dark");
    var inner = dark ? 0.12 : 0.13;
    var outer = dark ? 0.72 : 0.78;
    if (narrow) return dark ? 0.16 : 0.18;
    var d = Math.max(colL - x, x - colR); // >0 outside the column
    var k = Math.min(1, Math.max(0, (d + 10) / 70));
    return inner + (outer - inner) * k;
  }

  function step(dt) {
    for (var i = 0; i < sprites.length; i++) {
      var s = sprites[i], img = baked[s.kind];
      var hh = img.height / dpr / 2;
      s.t += dt;

      if (s.kind === "drop") {
        s.y += s.vy * dt;
        s.x = s.x0 + Math.sin(s.t * 0.7 + s.phase) * 16;
        s.rot = Math.sin(s.t * 0.7 + s.phase) * 0.1;
        if (s.y - hh > H + 10) {
          s.y = -hh - rand(10, 120);
          s.x0 = rand(0.05, 0.95) * W;
        }
      } else {
        s.x += s.vx * dt;
        s.y += s.vy * dt;
        s.bob = Math.sin(s.t * 0.9 + s.phase) * 4;
        s.rot = s.spin ? s.t * s.spin : Math.sin(s.t * 0.6 + s.phase) * 0.08;
        var m = 60;
        if (s.x < -m) s.x = W + m;
        if (s.x > W + m) s.x = -m;
        if (s.y < -m) s.y = H + m;
        if (s.y > H + m) s.y = -m;
      }

      // drift away from the cursor
      var dx = s.x - mouse.x, dy = s.y - mouse.y, dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 110 && dist > 0.01) {
        var f = ((110 - dist) / 110) * 140 * dt;
        s.pushX += (dx / dist) * f;
        s.pushY += (dy / dist) * f;
      }
      s.pushX *= Math.pow(0.12, dt);
      s.pushY *= Math.pow(0.12, dt);
      if (s.kind === "drop") s.x0 += s.pushX * dt * 3;
      else s.x += s.pushX * dt * 3;
      s.y += s.pushY * dt * 3;
    }
  }

  function draw() {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.imageSmoothingEnabled = true;
    for (var i = 0; i < sprites.length; i++) {
      var s = sprites[i], img = baked[s.kind];
      var w = img.width / dpr, h = img.height / dpr;
      var y = s.y + (s.bob || 0);
      ctx.globalAlpha = alphaAt(s.x);
      ctx.setTransform(dpr, 0, 0, dpr, s.x * dpr, y * dpr);
      if (s.rot) ctx.rotate(s.rot);
      ctx.drawImage(img, -w / 2, -h / 2, w, h);
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

  resize();
  populate();
  window.addEventListener("resize", function () {
    var oldW = W, oldH = H;
    resize();
    if (Math.abs(W - oldW) > 120 || Math.abs(H - oldH) > 200) populate();
    if (reduceMotion) draw();
  });
  window.addEventListener("mousemove", function (e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  }, { passive: true });
  document.addEventListener("mouseleave", function () {
    mouse.x = mouse.y = -9999;
  });

  if (reduceMotion) {
    // still scene for people who turn motion off
    step(0);
    draw();
    new MutationObserver(draw).observe(root, { attributes: true, attributeFilter: ["class"] });
  } else {
    requestAnimationFrame(frame);
  }
})();
