// const staticCacheName =
const cacheData = {
    static: {
        name: 'static-define-integration-trapezoidal-rule',
        urls: [
            './js/lib/fontawesome.js'
        ]
    },
    dynamic: {
        name: 'dynamic-define-integration-trapezoidal-rule-static'
    }
}





self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(cacheData.static.name).then(cache => {
            cache.addAll(cacheData.static.urls)
        })
    )
})


self.addEventListener('fetch', event => {
    if (cacheData.static.urls.includes(event.request.url))
        event.respondWith(
            caches.match(event.request).then(cacheResponse => {
                return cacheResponse || fetch(event.request)
            })
        )

    else
        event.respondWith(
            caches.match(event.request).then(cacheResponse => {
                const fetchUrl = fetch(event.request).then(fetchResponse => {
                    return caches.open(cacheData.dynamic.name).then(cache => {
                        cache.put(event.request, fetchResponse.clone())
                        return fetchResponse
                    })
                })
                return cacheResponse || fetchUrl
            })
        )
})