/* CocoLab theme · behaviour (v1.0). No dependencies.
   Load at the end of <body>:  <script src="cocolab-theme.js"></script>
   Everything here is optional: without it the page is complete, just without motion and the switch.

   What it wires up, by markup:
     .daynight (role="switch")          day / night switch, remembered on this device
     .site-head / .progress i           header border on scroll, colour progress bar
     .menu-toggle[aria-controls]        phone menu
     [data-reveal]                      bouncy reveal on scroll (style="--i:1" staggers)
     .hero h1[data-rotate]              rotating headline: "Line one. *Key word.*|Line two..."
     .tile[data-features]               pagination dots that swap the tile's text
     .feat                              feature cards that open on press
   And exposes CocoTheme.confetti(element) for a celebration burst. */
(function(){
  var root=document.documentElement;
  var still=matchMedia('(prefers-reduced-motion: reduce)').matches;
  var THEME_KEY='cocolab-theme';

  // Day / night: the system setting until the visitor presses the switch, then their choice
  try{var saved=localStorage.getItem(THEME_KEY);if(saved)root.setAttribute('data-theme',saved);}catch(e){}
  function isDark(){var t=root.getAttribute('data-theme');return t?t==='dark':matchMedia('(prefers-color-scheme: dark)').matches;}
  var switches=[].slice.call(document.querySelectorAll('.daynight'));
  function sync(){var d=isDark();switches.forEach(function(b){b.setAttribute('aria-checked',String(d));b.setAttribute('aria-label',d?'Switch to day mode':'Switch to night mode');});}
  switches.forEach(function(b){b.addEventListener('click',function(){
    var next=isDark()?'light':'dark';root.setAttribute('data-theme',next);
    try{localStorage.setItem(THEME_KEY,next);}catch(e){}
    sync();
  });});
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change',sync);
  sync();

  // Header border and progress bar
  var head=document.querySelector('.site-head'), bar=document.querySelector('.progress i');
  function onScroll(){
    if(head)head.classList.toggle('scrolled',scrollY>8);
    if(bar){var h=document.documentElement.scrollHeight-innerHeight;bar.style.transform='scaleX('+(h>0?Math.min(1,scrollY/h):0)+')';}
  }
  addEventListener('scroll',onScroll,{passive:true});onScroll();

  // Phone menu
  document.querySelectorAll('.menu-toggle[aria-controls]').forEach(function(btn){
    var nav=document.getElementById(btn.getAttribute('aria-controls')); if(!nav)return;
    function set(open){nav.hidden=!open;btn.setAttribute('aria-expanded',String(open));btn.setAttribute('aria-label',open?'Close menu':'Open menu');}
    btn.addEventListener('click',function(){set(nav.hidden);});
    nav.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){set(false);});});
  });

  // Reveal on scroll. Only items below the fold are hidden first, so nothing on screen flickers.
  if('IntersectionObserver' in window && !still){
    var items=[].slice.call(document.querySelectorAll('[data-reveal]'));
    var below=items.filter(function(el){return el.getBoundingClientRect().top>innerHeight*0.9;});
    if(below.length){
      document.body.classList.add('reveal-armed');
      items.forEach(function(el){if(below.indexOf(el)<0)el.classList.add('in','done');});
      var io=new IntersectionObserver(function(entries){entries.forEach(function(en){
        if(!en.isIntersecting)return;var el=en.target;io.unobserve(el);
        var i=parseFloat(getComputedStyle(el).getPropertyValue('--i'))||0;
        setTimeout(function(){el.classList.add('in');setTimeout(function(){el.classList.add('done');},900);},i*120);
      });},{threshold:0.15,rootMargin:'0px 0px -40px 0px'});
      below.forEach(function(el){io.observe(el);});
    }
  }

  // Rotating headline: the original line first, then the data-rotate lines in shuffled order.
  // *word* gets the highlighter. Pauses on hover, off screen and in hidden tabs; off with reduced motion.
  (function(){
    var h1=document.querySelector('.hero h1[data-rotate]'); if(!h1||still)return;
    if(!h1.hasAttribute('aria-label'))h1.setAttribute('aria-label',h1.textContent.replace(/\s+/g,' ').trim());
    var first=document.createElement('span'); first.className='line is-on';
    while(h1.firstChild)first.appendChild(h1.firstChild);
    h1.appendChild(first);
    var lines=[first];
    h1.getAttribute('data-rotate').split('|').forEach(function(txt){
      var line=document.createElement('span'); line.className='line'; line.setAttribute('aria-hidden','true');
      (txt.trim().match(/\*[^*]+\*|\S+/g)||[]).forEach(function(tok,i){
        if(i)line.appendChild(document.createTextNode(' '));
        var w=document.createElement('span'); w.className=tok.charAt(0)==='*'?'w hl':'w';
        w.style.setProperty('--d',i); w.textContent=tok.replace(/\*/g,'');
        line.appendChild(w);
      });
      h1.appendChild(line); lines.push(line);
    });
    h1.classList.add('rotating');
    var at=0, bag=[], paused=false, inView=true;
    function pick(){
      if(!bag.length){
        for(var i=0;i<lines.length;i++)if(i!==at)bag.push(i);
        for(var j=bag.length-1;j>0;j--){var k=Math.floor(Math.random()*(j+1)),t=bag[j];bag[j]=bag[k];bag[k]=t;}
      }
      return bag.shift();
    }
    function swap(){
      var cur=lines[at], next=pick(), nl=lines[next];
      cur.classList.remove('is-on'); cur.classList.add('is-out');
      setTimeout(function(){cur.classList.remove('is-out');},900);
      nl.style.setProperty('--d0','.35s'); nl.classList.add('is-on');
      at=next;
    }
    h1.addEventListener('mouseenter',function(){paused=true;});
    h1.addEventListener('mouseleave',function(){paused=false;});
    if('IntersectionObserver' in window)new IntersectionObserver(function(en){inView=en[0].isIntersecting;}).observe(h1);
    setInterval(function(){if(!paused&&inView&&!document.hidden)swap();},4500);
  })();

  // Tile dots: data-features='[["Name","One-line description"], ...]'.
  // A dot swaps only the tile's text, with a soft fade. It moves on by itself every 4.5s while on screen.
  document.querySelectorAll('.tile[data-features]').forEach(function(tile){
    var list; try{list=JSON.parse(tile.getAttribute('data-features'));}catch(e){return;}
    var desc=tile.querySelector('p'), box=document.createElement('div'), label=document.createElement('span');
    var cur=-1, btns=[], paused=false, inView=false;
    box.className='dots'; label.className='feat-now';
    if(desc)desc.setAttribute('aria-live','polite');
    list.forEach(function(f,i){
      var b=document.createElement('button'); b.type='button'; b.className='dot'; b.setAttribute('aria-label','Show '+f[0]);
      b.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();show(i);});
      btns.push(b); box.appendChild(b);
    });
    box.appendChild(label);
    (desc&&desc.nextSibling)?tile.insertBefore(box,desc.nextSibling):tile.appendChild(box);
    function show(i){
      if(i===cur)return; var firstRun=cur<0; cur=i;
      btns.forEach(function(b,k){b.classList.toggle('is-active',k===i);b.setAttribute('aria-pressed',String(k===i));});
      if(firstRun){label.textContent=list[i][0];return;}
      [desc,label].forEach(function(el){if(el)el.classList.add('fading');});
      setTimeout(function(){
        if(desc)desc.textContent=list[i][1]; label.textContent=list[i][0];
        [desc,label].forEach(function(el){if(el)el.classList.remove('fading');});
      },still?0:260);
    }
    show(0);
    tile.addEventListener('mouseenter',function(){paused=true;});
    tile.addEventListener('mouseleave',function(){paused=false;});
    if('IntersectionObserver' in window)new IntersectionObserver(function(en){inView=en[0].isIntersecting;},{threshold:.5}).observe(tile);
    if(!still)setInterval(function(){if(!paused&&inView&&!document.hidden)show((cur+1)%list.length);},4500);
  });

  // Feature cards open and close on press
  document.querySelectorAll('.feat').forEach(function(f){
    if(!f.hasAttribute('aria-expanded'))f.setAttribute('aria-expanded','false');
    f.addEventListener('click',function(){f.setAttribute('aria-expanded',String(f.getAttribute('aria-expanded')!=='true'));});
  });

  // Confetti in the product colours: CocoTheme.confetti(document.querySelector('.confetti'))
  window.CocoTheme={confetti:function(host){
    if(still||!host)return;
    var css=getComputedStyle(root), cols=['--route','--mio','--trado','--sun'].map(function(v){return css.getPropertyValue(v).trim();}).concat('#ffffff');
    for(var k=0;k<36;k++){
      var c=document.createElement('i'), ang=Math.random()*Math.PI*2, dist=80+Math.random()*160;
      c.style.setProperty('--x',Math.cos(ang)*dist+'px'); c.style.setProperty('--y',(Math.sin(ang)*dist-80)+'px');
      c.style.setProperty('--rot',(Math.random()*720-360)+'deg'); c.style.background=cols[k%cols.length];
      c.style.animationDelay=(Math.random()*.15)+'s'; host.appendChild(c);
      setTimeout(function(x){x.remove();}.bind(null,c),1400);
    }
  }};
})();
