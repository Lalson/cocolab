/* Local dev server for the CocoLab site. No dependencies.
   Run:  node serve.js   (or: npm start)   then open http://localhost:5000
   Clean URLs work: /cocoroute -> cocoroute.html, / -> index.html */
var http=require('http'),fs=require('fs'),path=require('path');
var PORT=process.env.PORT||5000, ROOT=__dirname;
var TYPES={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.ico':'image/x-icon','.json':'application/json','.webmanifest':'application/manifest+json'};
http.createServer(function(req,res){
  var url=decodeURIComponent(req.url.split('?')[0].split('#')[0]);
  if(url==='/')url='/index.html';
  var file=path.normalize(path.join(ROOT,url));
  if(!file.startsWith(ROOT)){res.writeHead(403);return res.end('Forbidden');}
  if(!path.extname(file)&&fs.existsSync(file+'.html'))file+='.html';
  fs.readFile(file,function(err,data){
    if(err){res.writeHead(404,{'Content-Type':'text/plain'});return res.end('Not found: '+url);}
    res.writeHead(200,{'Content-Type':TYPES[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store'});
    res.end(data);
  });
}).listen(PORT,function(){console.log('CocoLab site running at http://localhost:'+PORT);});
