/* CocoLabs product pages: menus, day/night switch, scroll reveals and the feature cards. Shared by every product page. */
(function(){
  var root=document.documentElement;
  var head=document.querySelector('.site-head');
  window.addEventListener('scroll',function(){head.classList.toggle('scrolled',window.scrollY>8);},{passive:true});

  // Products dropdown
  var pBtn=document.getElementById('productsBtn'),pMenu=document.getElementById('productsMenu');
  function setMenu(open){pMenu.hidden=!open;pBtn.setAttribute('aria-expanded',String(open));}
  pBtn.addEventListener('click',function(e){e.stopPropagation();setMenu(pMenu.hidden);});
  document.addEventListener('click',function(e){if(!pMenu.hidden&&!pMenu.contains(e.target)&&e.target!==pBtn)setMenu(false);});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'){setMenu(false);mob(false);}});

  // Phone menu
  var mBtn=document.getElementById('menuToggle'),mNav=document.getElementById('mobileNav');
  function mob(open){mNav.hidden=!open;mBtn.setAttribute('aria-expanded',String(open));}
  mBtn.addEventListener('click',function(){mob(mNav.hidden);});

  // Day / night, remembered on this device, shared with the main page
  var tBtn=document.getElementById('themeBtn');
  function applyTheme(t){if(t)root.setAttribute('data-theme',t);else root.removeAttribute('data-theme');var dark=t==='dark'||(!t&&matchMedia('(prefers-color-scheme: dark)').matches);tBtn.setAttribute('aria-checked',String(dark));}
  var saved=null;try{saved=localStorage.getItem('cocolab-theme');}catch(_){}
  applyTheme(saved);
  tBtn.addEventListener('click',function(){var t=tBtn.getAttribute('aria-checked')==='true'?'light':'dark';applyTheme(t);try{localStorage.setItem('cocolab-theme',t);}catch(_){}});

  // Feature cards open and close
  document.addEventListener('click',function(e){var f=e.target.closest('.feat');if(f)f.setAttribute('aria-expanded',String(f.getAttribute('aria-expanded')!=='true'));});

  // Reveal on scroll, armed only when the browser can observe; everything is visible without it
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){var el=e.target,d=(+el.style.getPropertyValue('--i')||0)*70;setTimeout(function(){el.classList.add('in');},d);io.unobserve(el);}});},{rootMargin:'0px 0px -8% 0px'});
    document.querySelectorAll('[data-reveal]').forEach(function(el){if(el.getBoundingClientRect().top<window.innerHeight*.9)return;el.classList.add('rv');io.observe(el);});
  }
})();
