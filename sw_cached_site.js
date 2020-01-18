const storageCache = 'v2';

// call install event

self.addEventListener('install', (e) => {
    console.log("sw installed!", e);
})

// call activate event

self.addEventListener('activate', (e) => {
    console.log("sw activated", e)
        // get rid of unwanted caches i.e. if cahceName chnages from v1 to v2
    e.waitUntil(
        caches.keys().then(cacheNames => {
            console.log("cacheNames", cacheNames)
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== storageCache) {
                        console.log("clearing old cache")
                        return caches.delete(cache)
                    }
                })
            )
        })
    )
})

// call fetch event in case of offline app
self.addEventListener('fetch', e => {
    console.log("Fetch event callled from sw")
        // check if live site available 
    e.respondWith(
        fetch(e.request).then((res) => {
            // make clone of response
            const resClone = res.clone();
            // Open a cache
            caches.open(cacheName).then((cache) => {
                // add res to the cache
                cache.put(e.request, resClone);
            })
            return res;
        }) //for offline case in case response fails
        .catch(err => {
            caches.match(e.request).then(res => res)
        })
    )
})