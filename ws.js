const CACHE_NAME = 'hopevein-cache-final-v1';
const OFFLINE_PAGE = './index.html';
const urlsToCache = [
  './',
  './index.html',
  './css/style.css',
  './css/about.css',
  './css/contact.css',
  './script.js',
  './about.html',
  './contact.html',
  './courses.html',
  './images/avatar1.jpg',
  './images/avatar2.jpg',
  './images/avatar3.jpg',
  './images/avatar4.jpg',
  './images/avatar5.jpg',
  './images/avatar6.jpg',
  './images/avatar7.jpg',
  './images/course1.jpg',
  './images/course2.jpg',
  './images/course3.jpg',
  './images/course4.jpg',
  './images/course5.jpg',
  './images/course6.jpg',
  './images/course7.jpg',
  './images/course8.jpg',
  './images/course9.jpg',
  './images/course10.jpg',
  './images/course12.jpg',
  './images/course13.jpg',
  './images/course14.jpg',
  './images/course15.jpg',
  './images/course16.jpg',
  './images/course17.jpg',
];

// Install event - cache all critical resources
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[SW] Cache opened:', CACHE_NAME);
        return cache.addAll(urlsToCache.map(url => new Request(url, {
          cache: 'reload',
          credentials: 'same-origin'
        }))); // ✅ Fixed missing parenthesis here
      })
      .then(() => {
        console.log('[SW] All resources cached');
        return self.skipWaiting();
      })
  );
});

// Rest of the code remains unchanged...