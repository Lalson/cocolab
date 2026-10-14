/* Builds cocoroute.html, cocomio.html, cocotrado.html and privacy.html from products-data.js.
   Run:  node build-products.js
   The pages are static HTML (good for search engines); product.js only adds the menus, theme and animations. */
var fs=require('fs');
var D=require('./products-data.js'),PRODUCTS=D.PRODUCTS,ORDER=D.ORDER;

/* The legal entity behind the CocoLab brand. Fill in the registry code and address once the
   Estonian Business Register has registered the company; the footer of index.html says the same. */
var COMPANY={legal:'CocoLab Intelligence OÜ',country:'Estonia',registry:'',address:'',email:'hello@cocoroute.co'};
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
 ext:'<path d="M14 4h6v6M20 4l-9 9M18 13v6H5V6h6"/>'
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
function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;');}
function logo(k,s,cls){return '<svg class="'+(cls||'logo')+'" width="'+s+'" height="'+s+'" aria-hidden="true"><use href="#logo-'+k+'"/></svg>';}
function page(k){return k+'.html';}
function fileFor(k){return 'coco'+k+'.html';}

var SYMBOLS=fs.readFileSync('index.html','utf8').match(/<svg width="0" height="0"[\s\S]*?<\/svg>/)[0];

function header(k){
  var demoHref=k?'index.html?demo='+PRODUCTS[k].name+'#contact':'index.html#contact';
  return '<header class="site-head" id="top"><div class="wrap"><div class="head-row">'+
   '<a class="brand" href="index.html" aria-label="CocoLab home"><span class="brand-mark"><span></span></span>CocoLab</a>'+
   '<nav class="nav" aria-label="Main"><div class="nav-products">'+
    '<button class="nav-products-btn" id="productsBtn" aria-expanded="false" aria-controls="productsMenu">Products <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg></button>'+
    '<div class="menu" id="productsMenu" hidden><span class="menu-label">OUR PRODUCTS · EACH HAS ITS OWN PAGE</span>'+
    ORDER.map(function(o){var q=PRODUCTS[o];return '<a class="menu-item'+(o===k?' now':'')+'" href="'+fileFor(o)+'"'+(o===k?' aria-current="page"':'')+'>'+logo(o,52)+'<span class="txt"><span class="name">'+q.name+' <span class="tag bg-'+o+' t-'+o+'">'+q.tag+'</span></span><span class="desc">'+q.menu+'</span></span><span class="dom t-'+o+'">'+(o===k?'You are here':'Learn more →')+'</span></a>';}).join('')+
    '<div class="menu-foot"><span>Not sure which fits?</span><a href="index.html#compare">Compare all '+countWord+' →</a></div></div></div>'+
    '<a href="index.html#compare">Compare</a><a href="index.html#about">About</a><a href="index.html#contact">Contact</a></nav>'+
   '<div class="head-cta"><button class="daynight" id="themeBtn" type="button" role="switch" aria-checked="false" aria-label="Night mode"><span class="dn-track"><span class="dn-cloud" aria-hidden="true"></span><span class="dn-star s1" aria-hidden="true"></span><span class="dn-star s2" aria-hidden="true"></span><span class="dn-star s3" aria-hidden="true"></span><span class="dn-knob" aria-hidden="true"><span class="dn-crater c1"></span><span class="dn-crater c2"></span></span></span></button>'+
   '<a class="btn btn-dark" href="'+demoHref+'">Book a demo</a>'+
   '<button class="menu-toggle" id="menuToggle" aria-expanded="false" aria-controls="mobileNav" aria-label="Open menu"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg></button></div></div>'+
   '<nav class="mobile-nav" id="mobileNav" aria-label="Mobile" hidden>'+
    ORDER.map(function(o){var q=PRODUCTS[o];return '<a class="m-prod" href="'+fileFor(o)+'">'+logo(o,36)+'<span>'+q.name+'<small>'+nice(q.tag)+'</small></span></a>';}).join('')+
    '<a href="index.html#compare">Compare the '+countWord+'</a><a href="index.html#about">About CocoLab</a><a class="btn btn-dark" href="'+demoHref+'">Book a demo</a></nav>'+
  '</div></header>';
}
function footer(){
  return '<footer class="site-foot"><div class="wrap foot-row">'+
   '<a class="brand" href="index.html" style="font-size:22px"><span class="brand-mark" style="width:34px;height:34px"><span style="width:14px;height:14px"></span></span>CocoLab</a>'+
   '<div class="foot-links">'+ORDER.map(function(o){return '<a href="'+fileFor(o)+'">'+PRODUCTS[o].name+'</a>';}).join('')+'<a href="privacy.html">Privacy</a></div>'+
   '<span>© 2026 '+COMPANY.legal+' · Registered in '+COMPANY.country+(COMPANY.registry?' · Registry code '+COMPANY.registry:'')+'</span></div></footer>';
}

function main(k){
  var p=PRODUCTS[k],i=ORDER.indexOf(k),demo='index.html?demo='+p.name+'#contact';
  var wordsH=p.h1.split(' ').map(function(w,j){return '<span class="w" style="--d:'+j+'">'+esc(w)+'</span>';}).join(' ');
  return '<main class="wrap">'+
  '<section class="p-hero"><div class="p-copy">'+
    '<nav class="crumb" aria-label="Breadcrumb"><a href="index.html">CocoLab</a> '+ic('arrow',14)+' <b aria-current="page">'+p.name+'</b> <span class="pill" style="margin-left:6px">Product '+(i+1)+' of '+ORDER.length+'</span></nav>'+
    logo(k,84,'plogo')+'<span class="tag bg-acc t-acc">'+p.tag+'</span>'+
    '<h1 aria-label="'+esc(p.h1)+'">'+wordsH+'</h1><p class="lede">'+p.lede+'</p>'+
    '<div class="ctas"><a class="btn btn-dark" href="'+demo+'">Book a demo</a><a class="btn btn-acc" href="'+p.url+'" target="_blank" rel="noopener">Visit '+p.domain+' '+ic('ext',16)+'</a></div>'+
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

  '<section class="sec" id="others" aria-labelledby="others-h"><div class="sec-h" data-reveal><span class="eyebrow">Also from CocoLab</span><h2 id="others-h">The other products</h2><p>Separate products for separate jobs. They share a team, not a login.</p></div>'+
   '<div class="others">'+ORDER.filter(function(o){return o!==k;}).map(function(o,j){var q=PRODUCTS[o];return '<a class="other" href="'+fileFor(o)+'" data-reveal style="--i:'+j+'">'+logo(o,52)+'<span class="txt"><b>'+q.name+'</b><small>'+q.menu+'</small></span><span class="go t-'+o+'">Learn more →</span></a>';}).join('')+'</div></section>'+

  '<section class="cta-band" id="demo" data-reveal><span class="blob" aria-hidden="true"></span><div><h2>See '+p.name+' with your own work in it.</h2><p>A thirty-minute demo, on your data if you like. No slides.</p></div><div class="ctas"><a class="btn btn-dark" href="'+demo+'">Book a demo</a><a class="btn btn-ghost" href="'+p.url+'" target="_blank" rel="noopener">Visit '+p.domain+' '+ic('ext',16)+'</a></div></section>'+
  '</main>';
}

function document(k){
  var p=PRODUCTS[k];
  return '<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n'+
   '<title>'+p.name+' · '+nice(p.tag)+' · CocoLab</title>\n'+
   '<meta name="description" content="'+esc(p.menu+' '+p.h1)+'">\n'+
   '<link rel="preconnect" href="https://fonts.googleapis.com">\n<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n'+
   '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=Figtree:wght@400;500;600;700;800&display=swap">\n'+
   '<link rel="stylesheet" href="product.css">\n'+
   '<script>try{var t=localStorage.getItem("cocolab-theme");if(t)document.documentElement.setAttribute("data-theme",t);}catch(e){}</script>\n'+
   '</head>\n<body data-product="'+k+'">\n<!-- Generated by build-products.js from products-data.js. Edit those, not this file. -->\n'+
   SYMBOLS+'\n'+header(k)+'\n'+main(k)+'\n'+footer()+'\n<script src="product.js"></script>\n</body>\n</html>\n';
}

ORDER.forEach(function(k){fs.writeFileSync(fileFor(k),document(k));console.log('wrote',fileFor(k));});

/* Privacy notice for this website (GDPR applies: the company is registered in the EU).
   A draft in plain words; have it checked before launch. The products have their own notices. */
function privacy(){
  var who=COMPANY.legal+', a private limited company registered in '+COMPANY.country+' (EU)'+
    (COMPANY.registry?', registry code '+COMPANY.registry:'')+(COMPANY.address?', '+COMPANY.address:'')+'.';
  var parts=[
    ['Who we are','<p>'+who+' CocoLab is our brand. Write to us at <a href="mailto:'+COMPANY.email+'">'+COMPANY.email+'</a> about anything on this page.</p>'],
    ['What this notice covers','<p>This website only. CocoRoute, CocoMio and CocoTrado each keep their own terms and privacy notice for the information you put into them.</p>'],
    ['What we collect','<ul><li><b>When you ask for a demo:</b> your name, work email, company, the product you are interested in and your message.</li><li><b>When you email us:</b> what you send.</li><li><b>Nothing else about you.</b> No tracking or advertising cookies. Your day or night choice is kept in your own browser and never sent to us. The fonts load from Google Fonts, which sees your IP address as the page loads.</li></ul>'],
    ['Why we use it','<p>To reply to you and arrange the demo you asked for. Under the GDPR this is a step you asked us to take before a possible contract, and our legitimate interest in answering you. We never sell your details or use them for advertising.</p>'],
    ['Who can see it','<p>Our team, and the companies that run our email and website for us. Our team works from India and a partner works from the UAE, both outside the EU, so when your details are reached from there we use the safeguards the GDPR requires, such as the European Commission\'s standard contractual clauses.</p>'],
    ['How long we keep it','<p>Up to 24 months after we last hear from you, unless you become a customer. Then the product\'s own terms apply.</p>'],
    ['Your rights','<p>You can ask to see, correct or delete your details, to limit or object to how we use them, and to receive a copy. Write to <a href="mailto:'+COMPANY.email+'">'+COMPANY.email+'</a>. If you are not happy with our answer, you can complain to the Estonian Data Protection Inspectorate (Andmekaitse Inspektsioon, <a href="https://www.aki.ee" target="_blank" rel="noopener">aki.ee</a>).</p>'],
    ['Changes','<p>If this notice changes, the new version appears here with its date. Last updated: 15 October 2026.</p>']
  ];
  var body='<main class="wrap"><section class="sec" aria-labelledby="privacy-h"><div class="sec-h"><span class="eyebrow">Privacy</span><h2 id="privacy-h">How this website handles your details</h2><p>Short and in plain words.</p></div>'+
    '<div style="display:flex;flex-direction:column;gap:22px;max-width:760px">'+parts.map(function(s){
      return '<div style="display:flex;flex-direction:column;gap:8px"><h3 style="font-size:22px">'+s[0]+'</h3>'+s[1].replace(/<ul>/g,'<ul style="margin:0;padding-left:20px;display:flex;flex-direction:column;gap:6px">')+'</div>';
    }).join('')+'</div></section></main>';
  return '<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n'+
   '<title>Privacy · CocoLab</title>\n<meta name="description" content="How the CocoLab website handles the details you send us.">\n'+
   '<link rel="preconnect" href="https://fonts.googleapis.com">\n<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n'+
   '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=Figtree:wght@400;500;600;700;800&display=swap">\n'+
   '<link rel="stylesheet" href="product.css">\n'+
   '<script>try{var t=localStorage.getItem("cocolab-theme");if(t)document.documentElement.setAttribute("data-theme",t);}catch(e){}</script>\n'+
   '</head>\n<body data-product="route">\n<!-- Generated by build-products.js. Edit that file, not this one. -->\n'+
   SYMBOLS+'\n'+header(null)+'\n'+body+'\n'+footer()+'\n<script src="product.js"></script>\n</body>\n</html>\n';
}
fs.writeFileSync('privacy.html',privacy());console.log('wrote privacy.html');
