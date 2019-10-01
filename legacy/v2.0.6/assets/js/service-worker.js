"use strict";

console.print('Executing.');

/* A version number is useful when updating the worker logic,
   allowing you to remove outdated cache entries during the update.
*/
var version = 'v1::';

/* These resources will be downloaded and cached by the service worker
  ' during the installation process. If any resource fails to be downloaded,
   then the service worker won't be installed either.
*/
var offlineFundamentals = [
  'index.html',
  'pages/404.html',
  'pages/login.html',
  'pages/repo.html',
  'pages/repos.html',
  'pages/settings.html',
  'pages/skins.html',
  'pages/sync/drive.html',
  'pages/login.html',
  'pages/settings/controls.html',
  'pages/settings/credits.html',
  'pages/settings/debug.html',
  'pages/settings/donate.html',
  'pages/settings/faq.html',
  'pages/settings/manage-games.html',
  'pages/settings/storage.html',
  'pages/settings/sync.html',
  'pages/settings/update.html',
  'assets/js/app.js',
  'assets/js/cloud.js',
  'assets/js/discord.js',
  'assets/js/framework7.min.js',
  'assets/js/framework7.min.js.map',
  'assets/js/inobounce.js',
  'assets/js/jquery.min.js',
  'assets/js/md5.min.js',
  'assets/js/md5.min.js.map',
  'assets/js/nipplejs.min.js',
  'assets/js/openskin.js',
  'assets/js/repos.js',
  'assets/fonts/Framework7Icons-Regular.eot',
  'assets/fonts/Framework7Icons-Regular.ttf',
  'assets/fonts/Framework7Icons-Regular.woff',
  'assets/fonts/Framework7Icons-Regular.woff2',
  'assets/fonts/MaterialIcons-Regular.eot',
  'assets/fonts/MaterialIcons-Regular.svg',
  'assets/fonts/MaterialIcons-Regular.ttf',
  'assets/fonts/MaterialIcons-Regular.woff',
  'assets/fonts/MaterialIcons-Regular.woff2',
  'assets/css/app.css',
  'assets/css/framework7.min.css',
  'assets/binaries/gba_bios.bin',
  'assets/js/cores/jsnes/lib/dynamicaudio-min.js',
  'assets/js/cores/jsnes/source/nes.js',
  'assets/js/cores/jsnes/source/utils.js',
  'assets/js/cores/jsnes/source/cpu.js',
  'assets/js/cores/jsnes/source/keyboard.js',
  'assets/js/cores/jsnes/source/mappers.js',
  'assets/js/cores/jsnes/source/papu.js',
  'assets/js/cores/jsnes/source/ppu.js',
  'assets/js/cores/jsnes/source/rom.js',
  'assets/js/cores/jsnes/source/ui.js',
  'assets/js/cores/gbc.js',
  'assets/js/cores/GameBoy-Online/js/other/XAudioServer.js',
  'assets/js/cores/IodineGBA/XAudioJS/swfobject.js',
  'assets/js/cores/IodineGBA/XAudioJS/resampler.js',
  'assets/js/cores/IodineGBA/XAudioJS/XAudioServer.js',
  'assets/js/cores/gba.js',
  'assets/js/cores/snes.js',
  'assets/js/cores/jssms/min/jssms.min.js',
  'assets/js/cores/jssms/lib/escodegen.browser.js',
  'json/repos/featured.json',
  'json/skins/featured.json',
  'json/faq.json',
  'assets/img/splash/launch-640x1136.png',
  'assets/img/splash/launch-750x1294.png',
  'assets/img/splash/launch-1242x2148.png',
  'assets/img/splash/launch-1125x2436.png',
  'assets/img/splash/launch-1536x2048.png',
  'assets/img/splash/launch-1668x2224.png',
  'assets/img/splash/launch-2048x2732.png',
  'assets/img/onboarding/add-games.png',
  'assets/img/onboarding/add-hub.png',
  'assets/img/onboarding/add-upload.png',
  'assets/img/onboarding/add-web.png',
  'assets/img/fit/fit.png',
  'assets/img/fit/stretch.png',
  'assets/img/controller_dark.png',
  'assets/img/controller_red.png',
  'assets/img/controller_splash.png',
  'assets/img/controller.png',
  'assets/img/default-cover.png',
  'assets/img/drive_generic.png',
  'assets/img/drive.png',
  'assets/img/dropbox.png',
  'assets/img/eclipse.svg',
  'assets/img/icon_mobFull.png',
  'assets/img/icon_mobPreview.png',
  'assets/img/icon_osx.png',
  'assets/img/icon_red.png',
  'assets/img/icon_win.png',
  'assets/img/loading.png',
  'assets/img/mask_icon.svg'
];

/* The install event fires when the service worker is first installed.
   You can use this event to prepare the service worker to be able to serve
   files while visitors are offline.
*/
self.addEventListener("install", function(event) {
  console.print('Install event in progress.');
  /* Using event.waitUntil(p) blocks the installation process on the provided
     promise. If the promise is rejected, the service worker won't be installed.
  */
  event.waitUntil(
    /* The caches built-in is a promise-based API that helps you cache responses,
       as well as finding and deleting them.
    */
    caches
      /* You can open a cache by name, and this method returns a promise. We use
         a versioned cache name here so that we can remove old cache entries in
         one fell swoop later, when phasing out an older service worker.
      */
      .open(version + 'fundamentals')
      .then(function(cache) {
        /* After the cache is opened, we can fill it with the offline fundamentals.
           The method below will add all resources in `offlineFundamentals` to the
           cache, after making requests for them.
        */
        return cache.addAll(offlineFundamentals);
      })
      .then(function() {
        console.print('Install completed');
      })
  );
});

/* The fetch event fires whenever a page controlled by this service worker requests
   a resource. This isn't limited to `fetch` or even XMLHttpRequest. Instead, it
   comprehends even the request for the HTML page on first load, as well as JS and
   CSS resources, fonts, any images, etc.
*/
self.addEventListener("fetch", function(event) {
  console.print('Fetch event in progress.');

  /* We should only cache GET requests, and deal with the rest of method in the
     client-side, by handling failed POST,PUT,PATCH,etc. requests.
  */
  if (event.request.method !== 'GET') {
    /* If we don't block the event as shown below, then the request will go to
       the network as usual.
    */
    console.log('WORKER: fetch event ignored.', event.request.method, event.request.url);
    return;
  }
  /* Similar to event.waitUntil in that it blocks the fetch event on a promise.
     Fulfillment result will be used as the response, and rejection will end in a
     HTTP response indicating failure.
  */
  event.respondWith(
    caches
      /* This method returns a promise that resolves to a cache entry matching
         the request. Once the promise is settled, we can then provide a response
         to the fetch request.
      */
      .match(event.request)
      .then(function(cached) {
        /* Even if the response is in our cache, we go to the network as well.
           This pattern is known for producing "eventually fresh" responses,
           where we return cached responses immediately, and meanwhile pull
           a network response and store that in the cache.

           Read more:
           https://ponyfoo.com/articles/progressive-networking-serviceworker
        */
        var networked = fetch(event.request)
          // We handle the network request with success and failure scenarios.
          .then(fetchedFromNetwork, unableToResolve)
          // We should catch errors on the fetchedFromNetwork handler as well.
          .catch(unableToResolve);

        /* We return the cached response immediately if there is one, and fall
           back to waiting on the network as usual.
        */
        console.print('Fetch event', cached ? '(cached)' : '(network)', event.request.url);
        return cached || networked;

        function fetchedFromNetwork(response) {
          /* We copy the response before replying to the network request.
             This is the response that will be stored on the ServiceWorker cache.
          */
          var cacheCopy = response.clone();

          console.print('Fetch response from network.', event.request.url);

          caches
            // We open a cache to store the response for this request.
            .open(version + 'pages')
            .then(function add(cache) {
              /* We store the response for this request. It'll later become
                 available to caches.match(event.request) calls, when looking
                 for cached responses.
              */
              return cache.put(event.request, cacheCopy);
            })
            .then(function() {
              console.print('Fetch response stored in cache.', event.request.url);
            });

          // Return the response so that the promise is settled in fulfillment.
          return response;
        }

        /* When this method is called, it means we were unable to produce a response
           from either the cache or the network. This is our opportunity to produce
           a meaningful response even when all else fails. It's the last chance, so
           you probably want to display a "Service Unavailable" view or a generic
           error response.
        */
        function unableToResolve () {
          /* There's a couple of things we can do here.
             - Test the Accept header and then return one of the `offlineFundamentals`
               e.g: `return caches.match('/some/cached/image.png')`
             - You should also consider the origin. It's easier to decide what
               "unavailable" means for requests against your origins than for requests
               against a third party, such as an ad provider.
             - Generate a Response programmaticaly, as shown below, and return that.
          */

          console.print('Fetch request failed in both cache and network.');

          /* Here we're creating a response programmatically. The first parameter is the
             response body, and the second one defines the options for the response.
          */
          return new Response('<h1>Service Unavailable</h1>', {
            status: 503,
            statusText: 'Service Unavailable',
            headers: new Headers({
              'Content-Type': 'text/html'
            })
          });
        }
      })
  );
});

/* The activate event fires after a service worker has been successfully installed.
   It is most useful when phasing out an older version of a service worker, as at
   this point you know that the new worker was installed correctly. In this example,
   we delete old caches that don't match the version in the worker we just finished
   installing.
*/
self.addEventListener("activate", function(event) {
  /* Just like with the install event, event.waitUntil blocks activate on a promise.
     Activation will fail unless the promise is fulfilled.
  */
  console.print('Activate event in progress.');

  event.waitUntil(
    caches
      /* This method returns a promise which will resolve to an array of available
         cache keys.
      */
      .keys()
      .then(function (keys) {
        // We return a promise that settles when all outdated caches are deleted.
        return Promise.all(
          keys
            .filter(function (key) {
              // Filter by keys that don't start with the latest version prefix.
              return !key.startsWith(version);
            })
            .map(function (key) {
              /* Return a promise that's fulfilled
                 when each outdated cache is deleted.
              */
              return caches.delete(key);
            })
        );
      })
      .then(function() {
        console.print('Activate completed.');
      })
  );
});
