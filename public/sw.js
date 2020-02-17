importScripts('./workbox/workbox.js')
workbox.setConfig({
  debug: false,
})
workbox.core.skipWaiting()
workbox.core.clientsClaim()

workbox.routing.registerRoute(
  ({event, url}) => {
    const { request } = event

    return /(script)|(image)|(audio)|(video)|(style)/.test(request.destination) && request.mode === 'no-cors' && url.host === self.location.host
  },
  new workbox.strategies.CacheFirst({
    cacheName: 'jayz:static',
    plugins: [
      new workbox.cacheableResponse.CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 10,
        maxAgeSeconds: 7 * 24 * 60 * 60,
      }),
    ],
  })
)

workbox.routing.registerRoute(
  ({event}) => event.request.destination === 'document',
  new workbox.strategies.NetworkFirst({
    networkTimeoutSeconds: 3,
    cacheName: 'jayz:html',
    plugins: [
      new workbox.cacheableResponse.CacheableResponsePlugin({
        statuses: [200],
      }),
    ]
  })
)
