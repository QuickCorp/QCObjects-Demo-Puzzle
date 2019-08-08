/**
 * QCObjects SDK 1.0
 * ________________
 *
 * Author: Jean Machuca <correojean@gmail.com>
 *
 * Cross Browser Javascript Framework for MVC Patterns
 * QuickCorp/QCObjects is licensed under the
 * GNU Lesser General Public License v3.0
 * [LICENSE] (https://github.com/QuickCorp/QCObjects/blob/master/LICENSE.txt)
 *
 * Permissions of this copyleft license are conditioned on making available
 * complete source code of licensed works and modifications under the same
 * license or the GNU GPLv3. Copyright and license notices must be preserved.
 * Contributors provide an express grant of patent rights. However, a larger
 * work using the licensed work through interfaces provided by the licensed
 * work may be distributed under different terms and without source code for
 * the larger work.
 *
 * Copyright (C) 2015 Jean Machuca,<correojean@gmail.com>
 *
 * Everyone is permitted to copy and distribute verbatim copies of this
 * license document, but changing it is not allowed.
*/
"use strict";
const version = "0.0.1";
const appName = "dev.qcobjects.puzzle";
const cacheName = `qcobjects-app-${appName}-${version}`;
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll([
	"/",
	"css/components/card.css",
	"css/desktop/container.css",
	"css/desktop/content.css",
	"css/desktop/footer.css",
	"css/desktop/index.css",
	"css/desktop/navbar.css",
	"css/desktop/sidebar.css",
	"css/index.css",
	"css/mobile/content.css",
	"css/mobile/footer.css",
	"css/mobile/index.css",
	"css/mobile/navbar.css",
	"css/mobile/sidebar.css",
	"css/theme/basic/style.css",
	"css/theme/cyan/style.css",
	"css/theme/redlight/style.css",
	"css/theme/xtra/style.css",
	"favicon.ico",
	"humans.txt",
	"img/Q_web copy.png",
	"img/Q_web.png",
	"img/Q_web.svg",
	"img/icons/icon-128x128.png",
	"img/icons/icon-144x144.png",
	"img/icons/icon-152x152.png",
	"img/icons/icon-192x192.png",
	"img/icons/icon-384x384.png",
	"img/icons/icon-512x512.png",
	"img/icons/icon-72x72.png",
	"img/icons/icon-96x96.png",
	"img/logo.png",
	"index.html",
	"js/init.js",
	"js/packages/cl.quickcorp.backend.saveplayer.js",
	"js/packages/cl.quickcorp.components.js",
	"js/packages/cl.quickcorp.controller.js",
	"js/packages/cl.quickcorp.effects.js",
	"js/packages/cl.quickcorp.js",
	"js/packages/cl.quickcorp.model.js",
	"js/packages/cl.quickcorp.services.js",
	"js/packages/cl.quickcorp.view.js",
	"localhost-cert.pem",
	"localhost-privkey.pem",
	"manifest.json",
	"package-lock.json",
	"package.json",
	"robots.txt",
	"templates/components/blank.tpl.html",
	"templates/components/form.tpl.html",
	"templates/components/gameover.tpl.html",
	"templates/components/grid.tpl.html",
	"templates/components/home.tpl.html",
	"templates/components/itemlandscape.tpl.html",
	"templates/components/landscapelist.tpl.html",
	"templates/components/main.tpl.html",
	"templates/components/modal.tpl.html",
	"templates/components/modalyoulose.tpl.html",
	"templates/components/modalyouwin.tpl.html",
	"templates/components/playerslist.tpl.html",
	"templates/components/puzzle.tpl.html",
	"templates/components/puzzlegame.tpl.html",
	"templates/components/pwa.tpl.html",
	"templates/components/youwin.tpl.html"])
          .then(() => self.skipWaiting());
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open(cacheName)
      .then(cache => cache.match(event.request, {ignoreSearch: true}))
      .then(response => {
      return response || fetch(event.request);
    })
  );
});
