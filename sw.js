const CACHE='bd-pwa-v2';
const ASSETS=[
  './',
  '/index.html',
  '/css/app.css',
  '/js/app.js',
  '/manifest.json',
  '/sizes.html',
  '/pricing.html',
  '/services.html',
  '/about.html',
  '/contact.html',
  '/cart.html',
  '/checkout.html',
  '/success.html',
  '/images/grain.svg',
  '/images/hero-dumpster.jpg',
  '/icons/icon.svg'
];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));});
self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));
});
self.addEventListener('fetch',e=>{e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));});
