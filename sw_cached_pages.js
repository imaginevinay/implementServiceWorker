const storageCache = 'v2';

const cacheAssets = [
    'index.html',
    'about.html',
    'css/style.css',
    'js/main.js'
]


// call install event

self.addEventListener('install', (e) => {
    console.log("sw installed!", e);
    e.waitUntil(caches
        .open(storageCache)
        .then(cache => {
            console.log("service worker : Caching files")
            cache.addAll(cacheAssets);
        })
        .then(() => {
            self.skipWaiting();
        })
    )
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
    // check if live site available

    console.log("eeeeeeee", e)
    e.respondWith(
        // check if request to live page fails then promise wiill pass data to catch as reject so load cache page stored there
        fetch(e.request).catch(() => {
            console.log(e.request)
            caches.match(e.request)
        })
    )
})