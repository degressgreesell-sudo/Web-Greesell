// ============================================================
// Animasi kunang-kunang di background. Ringan (canvas 2D biasa),
// otomatis mati kalau user mengaktifkan "reduce motion".
// Tidak perlu diedit kecuali mau mengubah jumlah/warna kunang-kunang
// (lihat variabel COUNT dan warna "242,197,114" di bawah).
// ============================================================
(function(){
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var canvas = document.getElementById('fireflies');
  if(reduce || !canvas) return;
  var ctx = canvas.getContext('2d');
  var W,H,flies=[];
  var COUNT = 26;

  function resize(){
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  function rand(min,max){ return Math.random()*(max-min)+min; }

  for(var i=0;i<COUNT;i++){
    flies.push({
      x: rand(0,W), y: rand(0,H),
      r: rand(1.2,2.6),
      vx: rand(-0.15,0.15), vy: rand(-0.12,0.12),
      phase: rand(0,Math.PI*2), speed: rand(0.01,0.025)
    });
  }

  function tick(){
    ctx.clearRect(0,0,W,H);
    for(var i=0;i<flies.length;i++){
      var f = flies[i];
      f.x += f.vx; f.y += f.vy; f.phase += f.speed;
      if(f.x<0) f.x=W; if(f.x>W) f.x=0;
      if(f.y<0) f.y=H; if(f.y>H) f.y=0;
      var glow = (Math.sin(f.phase)+1)/2;
      var alpha = 0.1 + glow*0.4;
      var radius = f.r + glow*1.5;
      var grad = ctx.createRadialGradient(f.x,f.y,0,f.x,f.y,radius*6);
      grad.addColorStop(0, 'rgba(242,197,114,'+alpha+')');
      grad.addColorStop(1, 'rgba(242,197,114,0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(f.x,f.y,radius*6,0,Math.PI*2);
      ctx.fill();
    }
    requestAnimationFrame(tick);
  }
  tick();
})();

// ============================================================
// Toggle navbar hamburger di HP. Menu otomatis nutup lagi
// begitu salah satu link di dalamnya diklik.
// ============================================================
(function(){
  var toggle = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');
  if(!toggle || !links) return;
  toggle.addEventListener('click', function(){
    var open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  links.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
})();
