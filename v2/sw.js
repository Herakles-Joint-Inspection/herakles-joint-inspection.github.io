const C="herakles-v2-r2";const FILES=["./","index.html","lib/jspdf.umd.min.js","lib/jspdf.plugin.autotable.min.js","lib/xlsx.full.min.js","manifest.webmanifest","icon-192.png","icon-512.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith("herakles-v2")&&k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
/* app files: answer from the phone at once (works with no signal), refresh in the background */
self.addEventListener("fetch",e=>{if(e.request.method!=="GET")return;const u=new URL(e.request.url);if(u.origin!==location.origin)return;
 e.respondWith(caches.open(C).then(c=>c.match(e.request,{ignoreSearch:true}).then(hit=>{const net=fetch(e.request).then(r=>{if(r&&r.ok)c.put(e.request,r.clone());return r}).catch(()=>hit||c.match("index.html"));return hit||net})))});
