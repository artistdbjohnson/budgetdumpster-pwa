const CACHE='bd-pwa-v1';
const ASSETS=['./','index.html','css/app.css','js/app.js','manifest.json','sizes.html','pricing.html','services.html','about.html','contact.html','cart.html','checkout.html','success.html'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));});
self.addEventListener('fetch',e=>{e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));});
