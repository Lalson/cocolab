/* Builds cocoroute.html, cocomio.html, cocotrado.html, privacy.html, terms.html, company.html, about.html and 404.html
   from products-data.js.
   Run:  node build-products.js
   The pages are static HTML (good for search engines); product.js only adds the menus, theme and animations. */
var fs=require('fs');
var D=require('./products-data.js'),PRODUCTS=D.PRODUCTS,ORDER=D.ORDER;

/* The legal entity behind the CocoLabs brand, as entered in the Estonian Business Register on
   22.10.2026. The footer, contact section and share tags of index.html say the same; keep them in step.
   linkedin, facebook, instagram: the company pages' URLs; the footer shows a link and an icon for each one that is set. */
var COMPANY={legal:'CocoLabs OÜ',country:'Estonia',registry:'17630550',euid:'EEARIREG.17630550',registered:'22 October 2026',
  address:'Tööstuse tn 75-71, 10416 Tallinn, Harju County, Estonia',board:'Lalson Chittilappilly Lawrence',email:'hello@cocolabs.eu',
  site:'https://cocolabs.eu',register:'https://ariregister.rik.ee/eng/company/17630550',linkedin:'https://www.linkedin.com/company/cocolabs-eu',
  facebook:'https://www.facebook.com/profile.php?id=61595835028004',instagram:'https://www.instagram.com/cocolabs.eu/'};
var words=['zero','one','two','three','four','five','six','seven','eight','nine','ten'];
var countWord=words[ORDER.length]||String(ORDER.length);
var IC={
 pipeline:'<rect x="3" y="4" width="5" height="16" rx="1.5"/><rect x="10" y="4" width="5" height="11" rx="1.5"/><rect x="17" y="4" width="4" height="7" rx="1.5"/>',
 quote:'<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>',
 person:'<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>',
 bell:'<path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4z"/><path d="M10 21h4"/>',
 chart:'<path d="M4 20V10M10 20V4M16 20v-8M22 20H2"/>',
 memory:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
 phone:'<rect x="7" y="2" width="10" height="20" rx="2.5"/><path d="M11 18h2"/>',
 roles:'<circle cx="8" cy="9" r="3"/><circle cx="17" cy="9" r="3"/><path d="M2 20c0-3 3-5 6-5s6 2 6 5M14 20c0-3 3-5 6-5"/>',
 clock:'<circle cx="12" cy="12" r="9"/><path d="M12 8v4l2.5 2.5"/><path d="M12 3v1M21 12h-1"/>',
 calendar:'<rect x="3" y="5" width="18" height="16" rx="2.5"/><path d="M3 10h18M8 3v4M16 3v4"/>',
 file:'<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4"/><path d="M9 14l2 2 4-4"/>',
 lock:'<rect x="5" y="11" width="14" height="10" rx="2.5"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
 book:'<path d="M4 5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"/><path d="M8 3v18M12 8h5M12 12h5"/>',
 ladder:'<path d="M7 3v18M17 3v18M7 7h10M7 12h10M7 17h10"/>',
 coins:'<ellipse cx="12" cy="6" rx="8" ry="3"/><path d="M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6"/><path d="M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/>',
 key:'<circle cx="8" cy="12" r="4"/><path d="M12 12h9M18 12v3M15 12v2"/>',
 box:'<path d="M12 3l9 4.5v9L12 21l-9-4.5v-9z"/><path d="M3 7.5l9 4.5 9-4.5M12 12v9"/>',
 swap:'<path d="M4 8h13l-3-3M20 16H7l3 3"/>',
 sign:'<path d="M4 20c3-1 4-3 5-6s2-5 4-5 2 3 1 5 0 4 3 3 4-3 4-3"/><path d="M3 15l4-4"/>',
 receipt:'<path d="M6 3h12v18l-2-1.5L14 21l-2-1.5L10 21l-2-1.5L6 21z"/><path d="M9 8h6M9 12h6M9 16h4"/>',
 sheet:'<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18M3 15h18M9 4v16M15 4v16"/>',
 shield:'<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/>',
 undo:'<path d="M9 14L4 9l5-5"/><path d="M4 9h9a6 6 0 0 1 0 12h-3"/>',
 check:'<path d="M5 12l4 4 10-10"/>',
 arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',
 chev:'<path d="M6 9l6 6 6-6"/>',
 ext:'<path d="M14 4h6v6M20 4l-9 9M18 13v6H5V6h6"/>',
 play:'<rect x="2" y="5" width="20" height="14" rx="4"/><path d="M10 9.5v5l4.5-2.5z"/>'
};
function ic(n,s){return '<svg width="'+(s||24)+'" height="'+(s||24)+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+IC[n]+'</svg>';}

function preview(p){
  if(p.preview==='pipeline')return '<div class="mini"><div class="cols">'+
    '<div class="col"><b>NEW</b><div class="card">Jebel Ali → Mombasa</div><div class="card">Air, 320 kg, Frankfurt</div></div>'+
    '<div class="col"><b>QUOTED</b><div class="card hi">Al Noor Trading</div><div class="card">Gulf Steel, 4 × 20ft</div></div>'+
    '<div class="col"><b>WON</b><div class="card">Sahara Foods</div></div></div>'+
    '<div class="row hi"><span class="av">AN</span>Call Al Noor about the quote<span class="r">Today</span></div></div>';
  if(p.preview==='punch')return '<div class="mini"><div class="punch">Punch in</div>'+
    '<div class="row"><span class="av">RK</span>Customs Clearance, lesson 3 of 5<span class="r">6 min</span></div>'+
    '<div class="row hi"><span class="av">→</span>Senior Coordinator<span class="r">3 of 4 met</span></div></div>';
  return '<div class="mini"><div class="row hi" style="flex-direction:column;align-items:flex-start;gap:2px"><small style="font-weight:800;color:var(--acc-text)">USD · AVAILABLE</small><span class="big">95,000.00</span></div>'+
    '<div class="row" style="flex-direction:column;align-items:flex-start;gap:2px"><small style="font-weight:800;color:var(--muted)">AED · AVAILABLE</small><span class="big">618,306.35</span></div>'+
    '<div class="row"><span class="av">FA</span>Payment to Tata Consumer<span class="r">Awaiting 2nd signature</span></div></div>';
}

function nice(tag){var t=tag.toLowerCase().replace('crm','CRM').replace('hr &','HR &');return t.charAt(0).toUpperCase()+t.slice(1);}
function watch(p,cls,label){return p.youtube?'<a class="btn '+cls+'" href="'+p.youtube+'" target="_blank" rel="noopener">'+ic('play',18)+' '+(label||'Watch demos on YouTube')+'</a>':'';}
function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;');}
function logo(k,s,cls){return '<svg class="'+(cls||'logo')+'" width="'+s+'" height="'+s+'" aria-hidden="true"><use href="#logo-'+k+'"/></svg>';}
function page(k){return k+'.html';}
function fileFor(k){return 'coco'+k+'.html';}

var SYMBOLS=fs.readFileSync('index.html','utf8').match(/<svg width="0" height="0"[\s\S]*?<\/svg>/)[0];

function header(k){
  var demoHref=k?'index.html?demo='+PRODUCTS[k].name+'#contact':'index.html#contact';
  return '<header class="site-head" id="top"><div class="wrap"><div class="head-row">'+
   '<a class="brand" href="index.html" aria-label="CocoLabs home"><img class="brand-mark" src="logo.svg" alt="" width="40" height="40">CocoLabs</a>'+
   '<nav class="nav" aria-label="Main"><div class="nav-products">'+
    '<button class="nav-products-btn" id="productsBtn" aria-expanded="false" aria-controls="productsMenu">Products <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg></button>'+
    '<div class="menu" id="productsMenu" hidden><span class="menu-label">OUR PRODUCTS · EACH HAS ITS OWN PAGE</span>'+
    ORDER.map(function(o){var q=PRODUCTS[o];return '<a class="menu-item'+(o===k?' now':'')+'" href="'+fileFor(o)+'"'+(o===k?' aria-current="page"':'')+'>'+logo(o,52)+'<span class="txt"><span class="name">'+q.name+' <span class="tag bg-'+o+' t-'+o+'">'+q.tag+'</span></span><span class="desc">'+q.menu+'</span></span><span class="dom t-'+o+'">'+(o===k?'You are here':'Learn more →')+'</span></a>';}).join('')+
    '<div class="menu-foot"><span>Not sure which fits?</span><a href="index.html#compare">Compare all '+countWord+' →</a></div></div></div>'+
    '<a href="index.html#compare">Compare</a><a href="about.html">About</a><a href="index.html#contact">Contact</a></nav>'+
   '<div class="head-cta"><button class="daynight" id="themeBtn" type="button" role="switch" aria-checked="false" aria-label="Night mode"><span class="dn-track"><span class="dn-cloud" aria-hidden="true"></span><span class="dn-star s1" aria-hidden="true"></span><span class="dn-star s2" aria-hidden="true"></span><span class="dn-star s3" aria-hidden="true"></span><span class="dn-knob" aria-hidden="true"><span class="dn-crater c1"></span><span class="dn-crater c2"></span></span></span></button>'+
   '<a class="btn btn-dark" href="'+demoHref+'">Book a demo</a>'+
   '<button class="menu-toggle" id="menuToggle" aria-expanded="false" aria-controls="mobileNav" aria-label="Open menu"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg></button></div></div>'+
   '<nav class="mobile-nav" id="mobileNav" aria-label="Mobile" hidden>'+
    ORDER.map(function(o){var q=PRODUCTS[o];return '<a class="m-prod" href="'+fileFor(o)+'">'+logo(o,36)+'<span>'+q.name+'<small>'+nice(q.tag)+'</small></span></a>';}).join('')+
    '<a href="index.html#compare">Compare the '+countWord+'</a><a href="about.html">About CocoLabs</a><a class="btn btn-dark" href="'+demoHref+'">Book a demo</a></nav>'+
  '</div></header>';
}
/* Same columns as the footer of index.html */
var SOCIAL=[['linkedin','LinkedIn','M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z'],
  ['facebook','Facebook','M13.5 22v-8h2.7l.4-3.2h-3.1V8.8c0-.9.3-1.5 1.6-1.5h1.7V4.4c-.3 0-1.3-.1-2.4-.1-2.4 0-4.1 1.5-4.1 4.2v2.3H7.6V14h2.7v8z'],
  ['instagram','Instagram','M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9a5.5 5.5 0 0 1-5.5 5.5h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm5.5-3.75a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5z']];
function footer(){
  function col(label,links){return '<nav class="foot-col" aria-label="'+label+'"><span class="foot-h">'+label+'</span>'+links.map(function(l){
    return '<a href="'+l[1]+'"'+(l[2]?' target="_blank" rel="noopener"':'')+'>'+l[0]+'</a>';}).join('')+'</nav>';}
  return '<footer class="site-foot"><div class="wrap foot-grid">'+
   '<div class="foot-brand"><a class="brand" href="index.html" style="font-size:22px"><img class="brand-mark" src="logo.svg" alt="" width="34" height="34" style="width:34px;height:34px">CocoLabs</a>'+
    '<p>Software for work that has to be right. An EU company, registered in '+COMPANY.country+'.</p>'+
    '<a class="foot-mail" href="mailto:'+COMPANY.email+'">'+COMPANY.email+'</a>'+
    '<div class="foot-social">'+SOCIAL.filter(function(s){return COMPANY[s[0]];}).map(function(s){
      return '<a href="'+COMPANY[s[0]]+'" target="_blank" rel="noopener" aria-label="CocoLabs on '+s[1]+'"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="'+s[2]+'"/></svg></a>';}).join('')+'</div></div>'+
   col('Products',ORDER.map(function(o){return [PRODUCTS[o].name,fileFor(o)];}).concat([['Compare all '+countWord,'index.html#compare']]))+
   col('Company',[['About CocoLabs','about.html'],['Book a demo','index.html#contact']].concat(COMPANY.linkedin?[['LinkedIn',COMPANY.linkedin,1]]:[],COMPANY.facebook?[['Facebook',COMPANY.facebook,1]]:[],COMPANY.instagram?[['Instagram',COMPANY.instagram,1]]:[]))+
   col('Legal',[['Company details','company.html'],['Privacy notice','privacy.html'],['Terms of use','terms.html']])+
   '</div><div class="wrap foot-base"><span>© 2026 '+COMPANY.legal+' · Registry code '+COMPANY.registry+' · '+COMPANY.address+' (EU)</span></div></footer>';
}

/* The <head> every generated page shares, with the share card (Open Graph) that link previews use.
   path is the page's clean URL ('cocoroute', 'privacy'); null leaves out the canonical URL (the 404 page). */
function head(title,desc,path,extra){
  var url=path===null?'':COMPANY.site+'/'+path;
  return '<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n'+(extra||'')+
   '<title>'+title+'</title>\n<meta name="description" content="'+esc(desc)+'">\n'+
   (url?'<link rel="canonical" href="'+url+'">\n':'')+
   '<meta property="og:type" content="website">\n<meta property="og:site_name" content="CocoLabs">\n'+
   '<meta property="og:title" content="'+esc(title)+'">\n<meta property="og:description" content="'+esc(desc)+'">\n'+(url?'<meta property="og:url" content="'+url+'">\n':'')+
   '<meta property="og:image" content="'+COMPANY.site+'/og-image.png">\n<meta property="og:image:width" content="1200">\n<meta property="og:image:height" content="630">\n'+
   '<meta property="og:image:alt" content="CocoLabs: focused products, one team">\n<meta name="twitter:card" content="summary_large_image">\n'+
   '<link rel="icon" href="logo.svg" type="image/svg+xml">\n<link rel="apple-touch-icon" href="apple-touch-icon.png">\n'+
   '<link rel="preconnect" href="https://fonts.googleapis.com">\n<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n'+
   '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=Figtree:wght@400;500;600;700;800&display=swap">\n'+
   '<link rel="stylesheet" href="product.css">\n'+
   '<script>try{var t=localStorage.getItem("cocolab-theme");if(t)document.documentElement.setAttribute("data-theme",t);}catch(e){}</script>\n'+
   '</head>\n';
}
function body(product,note,k,main){
  return '<body data-product="'+product+'">\n<!-- '+note+' -->\n'+SYMBOLS+'\n'+header(k)+'\n'+main+'\n'+footer()+'\n<script src="product.js"></script>\n</body>\n</html>\n';
}

function main(k){
  var p=PRODUCTS[k],i=ORDER.indexOf(k),demo='index.html?demo='+p.name+'#contact';
  var wordsH=p.h1.split(' ').map(function(w,j){return '<span class="w" style="--d:'+j+'">'+esc(w)+'</span>';}).join(' ');
  return '<main class="wrap">'+
  '<section class="p-hero"><div class="p-copy">'+
    '<nav class="crumb" aria-label="Breadcrumb"><a href="index.html">CocoLabs</a> '+ic('arrow',14)+' <b aria-current="page">'+p.name+'</b> <span class="pill" style="margin-left:6px">Product '+(i+1)+' of '+ORDER.length+'</span></nav>'+
    logo(k,84,'plogo')+'<span class="tag bg-acc t-acc">'+p.tag+'</span>'+
    '<h1 aria-label="'+esc(p.h1)+'">'+wordsH+'</h1><p class="lede">'+p.lede+'</p>'+
    '<div class="ctas"><a class="btn btn-dark" href="'+demo+'">Book a demo</a><a class="btn btn-acc" href="'+p.url+'" target="_blank" rel="noopener">Visit '+p.domain+' '+ic('ext',16)+'</a>'+watch(p,'btn-ghost')+'</div>'+
    '<div class="for"><span class="lab">MADE FOR</span>'+p.audience.map(function(a){return '<span class="pill">'+a+'</span>';}).join('')+'</div></div>'+
   '<div class="preview"><div class="screen"><div class="bar"><i></i><i></i><i></i>&nbsp;'+p.name+'</div>'+preview(p)+'</div>'+
    '<span class="spark a">'+ic(p.features[0][0],22)+'</span><span class="spark b">'+ic(p.features[3][0],22)+'</span><span class="spark c">'+ic(p.features[4][0],22)+'</span></div></section>'+

  '<section class="sec" id="problem" aria-labelledby="problem-h"><div class="sec-h" data-reveal><span class="eyebrow">The problem</span><h2 id="problem-h">What today looks like, and what changes</h2><p>Four things every team told us. On the left, the way it is done now. On the right, what '+p.name+' does about it.</p></div>'+
   '<div class="shift">'+p.pains.map(function(r,j){return '<div class="shift-row" data-reveal style="--i:'+j+'"><div class="box today"><span class="lab">TODAY</span><b>'+r[0]+'</b><p>'+r[1]+'</p></div><div class="arrow" aria-hidden="true">'+ic('arrow',28)+'</div><div class="box after"><span class="lab">WITH '+p.name.toUpperCase()+'</span><b>'+r[2]+'</b><p>'+r[3]+'</p></div></div>';}).join('')+'</div></section>'+

  '<section class="sec alt" id="features" aria-labelledby="features-h"><div class="sec-h" data-reveal><span class="eyebrow">Features</span><h2 id="features-h">What '+p.name+' does</h2><p>Eight things it does well. Press one to read how it works and who it is for.</p></div>'+
   '<div class="feat-grid">'+p.features.map(function(f,j){return '<button class="feat" type="button" aria-expanded="false" data-reveal style="--i:'+j+'"><span class="ic">'+ic(f[0])+'</span><h3>'+f[1]+'</h3><p class="short">'+f[2]+'</p><span class="more"><span>'+f[3]+'</span><span class="who">FOR: '+f[4].toUpperCase()+'</span></span><span class="hint">How it works '+ic('chev',14)+'</span></button>';}).join('')+'</div></section>'+

  '<section class="sec" id="who" aria-labelledby="who-h"><div class="sec-h" data-reveal><span class="eyebrow">Who it is for</span><h2 id="who-h">What each person gets</h2><p>The same product, a different screen for each job.</p></div>'+
   '<div class="roles">'+p.roles.map(function(r,j){return '<div class="role" data-reveal style="--i:'+j+'"><div class="who"><span class="av" aria-hidden="true">'+r[0]+'</span><div><h3>'+r[1]+'</h3><span class="sub">'+r[2]+'</span></div></div><ul>'+r[3].map(function(b){return '<li>'+b+'</li>';}).join('')+'</ul></div>';}).join('')+'</div></section>'+

  '<section class="sec alt" id="day" aria-labelledby="day-h"><div class="sec-h" data-reveal><span class="eyebrow">A day with '+p.name+'</span><h2 id="day-h">From the first message to the end of the day</h2><p>One ordinary working day, step by step.</p></div>'+
   '<div class="day">'+p.day.map(function(s,j){return '<div class="step'+(j%2?' flip':'')+'" data-reveal style="--i:'+j+'"><span class="t">'+s[0]+'</span><span class="dotm" aria-hidden="true"></span><div class="cardm"><b>'+s[1]+'</b><p>'+s[2]+'</p></div></div>';}).join('')+'</div></section>'+

  '<section class="sec" id="built" aria-labelledby="built-h"><div class="sec-h" data-reveal><span class="eyebrow">Built the right way</span><h2 id="built-h">Things you can rely on</h2><p>Not marketing numbers. How the product is actually made.</p></div>'+
   '<div class="facts">'+p.facts.map(function(f,j){return '<div class="fact" data-reveal style="--i:'+j+'"><span class="ck">'+ic('check',16)+'</span><div><b>'+f[0]+'</b><span>'+f[1]+'</span></div></div>';}).join('')+'</div></section>'+

  '<section class="sec alt" id="faq" aria-labelledby="faq-h"><div class="sec-h" data-reveal><span class="eyebrow">Questions</span><h2 id="faq-h">What people ask before they start</h2></div>'+
   '<div class="faq">'+p.faq.map(function(q,j){return '<details data-reveal style="--i:'+j+'"><summary>'+q[0]+'<span class="pm" aria-hidden="true">+</span></summary><div class="ans">'+q[1]+'</div></details>';}).join('')+'</div></section>'+

  '<section class="sec" id="others" aria-labelledby="others-h"><div class="sec-h" data-reveal><span class="eyebrow">Also from CocoLabs</span><h2 id="others-h">The other products</h2><p>Separate products for separate jobs. They share a team, not a login.</p></div>'+
   '<div class="others">'+ORDER.filter(function(o){return o!==k;}).map(function(o,j){var q=PRODUCTS[o];return '<a class="other" href="'+fileFor(o)+'" data-reveal style="--i:'+j+'">'+logo(o,52)+'<span class="txt"><b>'+q.name+'</b><small>'+q.menu+'</small></span><span class="go t-'+o+'">Learn more →</span></a>';}).join('')+'</div></section>'+

  '<section class="cta-band" id="demo" data-reveal><span class="blob" aria-hidden="true"></span><div><h2>See '+p.name+' with your own work in it.</h2><p>A thirty-minute demo, on your data if you like. No slides.</p></div><div class="ctas"><a class="btn btn-dark" href="'+demo+'">Book a demo</a><a class="btn btn-ghost" href="'+p.url+'" target="_blank" rel="noopener">Visit '+p.domain+' '+ic('ext',16)+'</a>'+watch(p,'btn-ghost')+'</div></section>'+
  '</main>';
}

function document(k){
  var p=PRODUCTS[k];
  return head(p.name+' · '+nice(p.tag)+' · CocoLabs',p.menu+' '+p.h1,'coco'+k)+
   body(k,'Generated by build-products.js from products-data.js. Edit those, not this file.',k,main(k));
}

ORDER.forEach(function(k){fs.writeFileSync(fileFor(k),document(k));console.log('wrote',fileFor(k));});

/* A page of plain-words sections: privacy notice, terms of use, company details */
function textPage(eyebrow,h2,lede,parts){
  return '<main class="wrap"><section class="sec" aria-labelledby="text-h"><div class="sec-h"><span class="eyebrow">'+eyebrow+'</span><h2 id="text-h">'+h2+'</h2><p>'+lede+'</p></div>'+
    '<div style="display:flex;flex-direction:column;gap:22px;max-width:760px">'+parts.map(function(s){
      return '<div style="display:flex;flex-direction:column;gap:8px"><h3 style="font-size:22px">'+s[0]+'</h3>'+s[1].replace(/<ul>/g,'<ul style="margin:0;padding-left:20px;display:flex;flex-direction:column;gap:6px">')+'</div>';
    }).join('')+'</div></section></main>';
}
function mail(){return '<a href="mailto:'+COMPANY.email+'">'+COMPANY.email+'</a>';}
var GENERATED='Generated by build-products.js. Edit that file, not this one.';

/* Privacy notice for this website (GDPR applies: the company is registered in the EU).
   A draft in plain words; have it checked before launch. The products have their own notices. */
function privacy(){
  var who=COMPANY.legal+', a private limited company registered in '+COMPANY.country+' (EU)'+
    (COMPANY.registry?', registry code '+COMPANY.registry:'')+(COMPANY.address?', '+COMPANY.address:'')+'.';
  var parts=[
    ['Who we are','<p>'+who+' Write to us at <a href="mailto:'+COMPANY.email+'">'+COMPANY.email+'</a> about anything on this page.</p>'],
    ['What this notice covers','<p>This website only. CocoRoute, CocoMio and CocoTrado each keep their own terms and privacy notice for the information you put into them.</p>'],
    ['What we collect','<ul><li><b>When you ask for a demo:</b> your name, work email, company, the product you are interested in and your message.</li><li><b>When you email us:</b> what you send.</li><li><b>Nothing else about you.</b> No tracking or advertising cookies. Your day or night choice is kept in your own browser and never sent to us. The fonts load from Google Fonts, which sees your IP address as the page loads.</li></ul>'],
    ['Why we use it','<p>To reply to you and arrange the demo you asked for. Under the GDPR this is a step you asked us to take before a possible contract, and our legitimate interest in answering you. We never sell your details or use them for advertising.</p>'],
    ['Who can see it','<p>Our team, and the companies that run our email, website and demo form for us. Some of them work outside the EU, so when your details are reached from there we use the safeguards the GDPR requires, such as the European Commission\'s standard contractual clauses.</p>'],
    ['How long we keep it','<p>Up to 24 months after we last hear from you, unless you become a customer. Then the product\'s own terms apply.</p>'],
    ['Your rights','<p>You can ask to see, correct or delete your details, to limit or object to how we use them, and to receive a copy. Write to <a href="mailto:'+COMPANY.email+'">'+COMPANY.email+'</a>. If you are not happy with our answer, you can complain to the Estonian Data Protection Inspectorate (Andmekaitse Inspektsioon, <a href="https://www.aki.ee" target="_blank" rel="noopener">aki.ee</a>).</p>'],
    ['Changes','<p>If this notice changes, the new version appears here with its date. Last updated: 23 October 2026.</p>']
  ];
  return head('Privacy · CocoLabs','How the CocoLabs website handles the details you send us.','privacy')+
   body('route',GENERATED,null,textPage('Privacy','How this website handles your details','Short and in plain words.',parts));
}

/* Terms of use for this website only; each product has its own customer agreement.
   A draft in plain words; have it checked before launch. */
function terms(){
  var parts=[
    ['Who runs this website','<p>cocolabs.eu is run by '+COMPANY.legal+', registered in '+COMPANY.country+' (EU), registry code '+COMPANY.registry+', '+COMPANY.address+'. By using the website you accept these terms. If you do not accept them, please do not use it.</p>'],
    ['The products have their own agreements','<p>This website describes CocoRoute, CocoMio and CocoTrado. Using a product is covered by the agreement and terms for that product, which you accept when you sign up or sign a contract. Nothing on this website is an offer or a contract on its own.</p>'],
    ['The information on this website','<p>We work to keep it accurate and up to date. Product screens, names and numbers in the examples are illustrations, and features can change. We do not promise that the website is always available or free of errors.</p>'],
    ['Using the website fairly','<ul><li>Do not try to break into the website, test its security without our written permission, or put a heavy load on it.</li><li>Do not copy its content in bulk with automated tools.</li><li>Do not send anything unlawful, harmful or misleading through the demo form or by email.</li></ul>'],
    ['Names, logos and content','<p>The names CocoLabs, CocoRoute, CocoMio and CocoTrado, the logos, and the text, pictures and design of this website belong to us or are used with permission. You are welcome to view them, link to this website and share its pages. Do not copy or reuse them for other purposes without our written permission.</p>'],
    ['Links to other websites','<p>Links to the product websites and to other sites open pages that have their own terms and privacy notices. We are not responsible for websites we do not run.</p>'],
    ['Our responsibility','<p>The website is provided as it is, for general information. As far as the law allows, we are not responsible for loss caused by using it or relying on it. Nothing in these terms limits a responsibility that the law does not allow us to limit, or your rights as a consumer.</p>'],
    ['Law and disputes','<p>Estonian law applies to these terms and to your use of this website. Disputes go to Harju County Court (Harju Maakohus) in Tallinn, unless the law of the country you live in gives you the right to go to a court there.</p>'],
    ['Changes and contact','<p>If these terms change, the new version appears here with its date. Last updated: 22 October 2026. Questions: '+mail()+'.</p>']
  ];
  return head('Terms of use · CocoLabs','The terms for using the CocoLabs website.','terms')+
   body('route',GENERATED,null,textPage('Terms of use','Terms for using this website','Short and in plain words.',parts));
}

/* Company details (imprint), from COMPANY and the public Business Register entry */
function company(){
  var rows=[
    ['Legal name',COMPANY.legal+' (private limited company)'],
    ['Registry code',COMPANY.registry],
    ['EU identifier (EUID)',COMPANY.euid],
    ['Registered','In the Estonian Business Register on '+COMPANY.registered],
    ['Registered address',COMPANY.address],
    ['Management board',COMPANY.board],
    ['VAT','Not registered for VAT'],
    ['Main activity','Computer programming (EMTAK 62101)'],
    ['Email',mail()],
    ['Public register entry','<a href="'+COMPANY.register+'" target="_blank" rel="noopener">ariregister.rik.ee ↗</a>']
  ];
  var parts=[
    ['The company','<dl class="kv">'+rows.map(function(r){return '<dt>'+r[0]+'</dt><dd>'+r[1]+'</dd>';}).join('')+'</dl>'],
    ['Get in touch','<p>For a demo or a question about a product, use the <a href="index.html#contact">contact form</a> or write to '+mail()+'.</p>']
  ];
  return head('Company details · CocoLabs','Legal and contact details of '+COMPANY.legal+', the company behind CocoLabs.','company')+
   body('route',GENERATED,null,textPage('Company details','Who is behind CocoLabs','The legal details of the company, as in the Estonian Business Register.',parts));
}

/* The About page. ABOUT holds what only the founder can write. While a field is empty the page shows a
   dashed "to write" box in its place, and the build counts what is left: fill these in before the page goes live. */
var ABOUT={
  // Texts drafted for the founder to edit. While a flag is true the text shows in a dashed "draft" box and
  // counts as still to do; set it to false once the words are final. [Brackets] mark blanks to fill in.
  draft:{story:false},
  story:[  // two or three short paragraphs on why CocoLabs exists; from the founder's own account, 24 Oct 2026
    'CocoLabs started in logistics. Every shipment brings a stream of emails, WhatsApp messages and booking confirmations, '+
      'and the one detail you need is always buried somewhere in them. Keeping on top of it by hand was hard every single day, '+
      'so we decided to build a better way. That became CocoRoute.',
    'We saw the same with staff. Attendance, leave, payroll, performance and training all matter, yet they sat in different registers, chats and spreadsheets. '+
      'So we made one system for all of it, with its own academy where staff learn and move up. That became CocoMio.',
    'CocoTrado does the same for buying agents who handle their clients\' money. Each product does one job, and all of them follow the same rules: '+
      'history is kept, a named person decides, and each company\'s data stays its own.'
  ]
};
function aboutGaps(){
  return ABOUT.story.length&&!ABOUT.draft.story?0:1;
}
function about(){
  function cap(w){return w.charAt(0).toUpperCase()+w.slice(1);}
  function todo(title,asks){return '<div class="todo" data-reveal><span class="todo-lab">To write · in your own words</span><b>'+title+'</b><ul>'+
    asks.map(function(a){return '<li>'+a+'</li>';}).join('')+'</ul></div>';}
  function draft(on,html){return on?'<div class="draft" data-reveal><span class="todo-lab">Draft · edit before it goes live</span>'+html+'</div>':html;}
  function blanks(s){return s.replace(/\[([^\]]+)\]/g,'<mark class="blank">$1</mark>');}
  function sec(id,alt,eyebrow,h2,p,inner){return '<section class="sec'+(alt?' alt':'')+'" id="'+id+'" aria-labelledby="'+id+'-h"><div class="sec-h" data-reveal>'+
    '<span class="eyebrow">'+eyebrow+'</span><h2 id="'+id+'-h">'+h2+'</h2>'+(p?'<p>'+p+'</p>':'')+'</div>'+inner+'</section>';}
  var names=ORDER.map(function(o){return PRODUCTS[o].name;}),
      anyOf=names.slice(0,-1).join(', ')+' or '+names[names.length-1];

  var story=ABOUT.story.length?draft(ABOUT.draft.story,'<div class="story"'+(ABOUT.draft.story?'':' data-reveal')+'>'+ABOUT.story.map(function(s){return '<p>'+blanks(s)+'</p>';}).join('')+'</div>'):
    todo('Your story',['What did you see that made you start? For example, a forwarding team keeping quotes in spreadsheets and WhatsApp, and follow-ups that slipped.',
      'Why build your own software instead of using what already existed?','What should a customer feel after a month with a CocoLabs product?',
      'Two or three short paragraphs, under 150 words.']);

  // CocoRoute, listed first, is the main product and gets the wide card
  var prods='<div class="a-prods">'+ORDER.map(function(o,j){var q=PRODUCTS[o],lead=j===0;
    return '<a class="a-prod'+(lead?' lead':'')+'" href="'+fileFor(o)+'" data-reveal style="--i:'+j+(lead?';--lt:var(--'+o+'-tint);--ll:var(--'+o+'-line)':'')+'">'+logo(o,lead?72:56)+
      '<span class="tag bg-'+o+' t-'+o+'">'+q.tag+'</span><h3>'+q.name+'</h3><p>'+(lead?q.lede:q.menu)+'</p>'+
      (lead?'<span class="for">'+q.audience.map(function(a){return '<span class="pill">'+a+'</span>';}).join('')+'</span>':'')+
      '<span class="go t-'+o+'">Learn more →</span></a>';}).join('')+'</div>';
  var demos=ORDER.filter(function(o){return PRODUCTS[o].youtube;});
  if(demos.length)prods+='<div class="a-demos" data-reveal><span>Prefer to watch first?</span>'+
    demos.map(function(o){return watch(PRODUCTS[o],'btn-ghost',PRODUCTS[o].name+' demos on YouTube');}).join('')+'</div>';

  var rules=[
    ['route','Records you can trust','History is added to, never rewritten. Corrections stay visible, so a figure you sent last year can still be explained.'],
    ['trado','A person approves','Software suggests; a named person decides. Every decision leaves a record.'],
    ['mio','Your data stays yours','Each company\'s data is kept apart from every other company\'s. Nobody else\'s customers, people or money are in it.'],
    ['','Small, focused products','Each product does one job, with its own website. They share a team, not a login.']
  ];
  var ruleCards='<div class="rules">'+rules.map(function(r,j){return '<div class="rule '+(r[0]?'bg-'+r[0]:'plain')+'" data-reveal style="--i:'+j+'">'+
    '<span class="n'+(r[0]?' t-'+r[0]:'')+'">0'+(j+1)+'</span><h3>'+r[1]+'</h3><p>'+r[2]+'</p></div>';}).join('')+'</div>';

  var glance='<dl class="glance">'+[['Legal name',COMPANY.legal],['Registered',COMPANY.registered],['Registry code',COMPANY.registry],
    ['Address',COMPANY.address],['Data protection','An EU company, so the GDPR applies'],['Email',mail()]].map(function(g,j){
      return '<div data-reveal style="--i:'+j+'"><dt>'+g[0]+'</dt><dd>'+g[1]+'</dd></div>';}).join('')+'</dl>'+
    '<p class="a-more"><a href="company.html">All company details →</a></p>';

  var notes={linkedin:'Company news and product updates',facebook:'Tips and product news',
    instagram:'@'+(COMPANY.instagram||'').replace(/^https:\/\/www\.instagram\.com\/|\/$/g,'')};
  var follow='<div class="others">'+SOCIAL.filter(function(s){return COMPANY[s[0]];}).map(function(s,j){
    return '<a class="other" href="'+COMPANY[s[0]]+'" target="_blank" rel="noopener" data-reveal style="--i:'+j+'"><span class="soc">'+
      '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="'+s[2]+'"/></svg></span>'+
      '<span class="txt"><b>'+s[1]+'</b><small>'+notes[s[0]]+'</small></span><span class="go t-acc">Follow →</span></a>';}).join('')+'</div>';

  var main='<main class="wrap">'+
   '<section class="a-hero"><nav class="crumb" aria-label="Breadcrumb"><a href="index.html">CocoLabs</a> '+ic('arrow',14)+' <b aria-current="page">About</b></nav>'+
    '<span class="eyebrow">About CocoLabs</span><h1>Software for work that has to be right.</h1>'+
    '<p class="lede">'+COMPANY.legal+' is a software company registered in Tallinn, '+COMPANY.country+', in the European Union. We make '+countWord+
      ' products, each for one kind of work: the freight business, people\'s attendance and careers, and clients\' money.</p>'+
    '<div class="ctas"><a class="btn btn-dark" href="index.html#contact">Book a demo</a><a class="btn btn-ghost" href="#products">See the products</a></div></section>'+
   sec('story',false,'Why we started','Why CocoLabs exists','',story)+
   sec('products',true,'What we make',cap(countWord)+' products, each for one job','Each one has its own page with the screens, the details and the questions people ask.',prods)+
   sec('principles',false,'How we build',cap(words[rules.length])+' rules every product follows','The same rules hold whatever job the product does.',ruleCards)+
   sec('glance',true,'At a glance','The company','The basics. The full legal details are on the company page.',glance)+
   sec('follow',false,'Follow us','Follow CocoLabs','Product updates, tips and company news.',follow)+
   '<section class="cta-band" id="demo" data-reveal><span class="blob" aria-hidden="true"></span><div><h2>Want to see one in action?</h2>'+
    '<p>A thirty-minute demo of '+anyOf+', on your data if you like. No slides.</p></div>'+
    '<div class="ctas"><a class="btn btn-dark" href="index.html#contact">Book a demo</a><a class="btn btn-ghost" href="mailto:'+COMPANY.email+'">'+COMPANY.email+'</a></div></section>'+
  '</main>';
  return head('About · CocoLabs','Why CocoLabs exists, what it makes and how it builds software. '+COMPANY.legal+' is a software company registered in Tallinn, '+COMPANY.country+'.','about')+
   body('route',GENERATED,null,main);
}

/* Shown by GitHub Pages for any address that does not exist. It can appear at any depth
   (/old/page), so <base href="/"> makes every link and file load from the site root. */
function notFound(){
  var main='<main class="wrap"><section class="sec" aria-labelledby="nf-h"><div class="sec-h"><span class="eyebrow">Error 404</span><h2 id="nf-h">This page is not here</h2>'+
    '<p>The link may be old or mistyped. One of these will get you back on track.</p></div>'+
    '<div class="others">'+ORDER.map(function(o){var q=PRODUCTS[o];return '<a class="other" href="'+fileFor(o)+'">'+logo(o,52)+'<span class="txt"><b>'+q.name+'</b><small>'+q.menu+'</small></span><span class="go t-'+o+'">Learn more →</span></a>';}).join('')+'</div>'+
    '<div class="ctas" style="margin-top:28px"><a class="btn btn-dark" href="index.html">Go to the home page</a><a class="btn btn-ghost" href="index.html#contact">Contact us</a></div></section></main>';
  return head('Page not found · CocoLabs','This page does not exist on the CocoLabs website.',null,'<base href="/">\n<meta name="robots" content="noindex">\n')+
   body('route',GENERATED,null,main);
}

[['privacy.html',privacy],['terms.html',terms],['company.html',company],['about.html',about],['404.html',notFound]].forEach(function(f){fs.writeFileSync(f[0],f[1]());console.log('wrote',f[0]);});
var gaps=aboutGaps();if(gaps)console.log('about.html is not final yet: '+gaps+' draft'+(gaps>1?'s or placeholders':' or placeholder')+' left (ABOUT in build-products.js)');
