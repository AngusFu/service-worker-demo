console.log("SW startup");

var res = [
    './photo.html',
    './photoData.js',
    './lib/doT.min.js',
    './images/image_001.jpg',
    './images/image_002.jpg',
    './images/image_003.jpg',
    './images/image_004.jpg'
];

var nowVersion = 'cache-v2';

self.addEventListener('install', function(event) {
    console.log("SW installed");

    event.waitUntil(
        caches.open(nowVersion).then(function(cache) {
            return cache.addAll(res);
        })
    );
});


// 旧版本被新版本替代的时候
// 这时候可以做一些缓存清理的工作
self.addEventListener('activate', function(event) {
    console.log("SW activated");

    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(name) {
                    console.log(name);
                    if (name !== nowVersion) {
                        caches.delete(name);
                    }
                })
            );
        })
    );

});


self.addEventListener('fetch', function(event) {
    console.log("Caught a fetch!");

    event.respondWith(
        caches.match(event.request).then(function(response) {
            if (response) {
                return response;
            } else {
                return fetch(event.request.url);
            }
        })
    );
});
