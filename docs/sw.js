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
const version = "0.0.2";
const appName = "dev.qcobjects.puzzle";
const cacheName = `qcobjects-app-${appName}-${version}`;
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll([
	"/",
	"css/components/card.css",
	"css/components/grid.css",
	"css/index.css",
	"css/main.css",
	"css/modal.css",
	"css/normalize.css",
	"css/puzzle.css",
	"favicon.ico",
	"humans.txt",
	"img/26482.svg",
	"img/Q_web copy.png",
	"img/Q_web.png",
	"img/Q_web.svg",
	"img/backgroundapp.png",
	"img/backgroundblack.png",
	"img/icons/icon-128x128.png",
	"img/icons/icon-144x144.png",
	"img/icons/icon-152x152.png",
	"img/icons/icon-192x192.png",
	"img/icons/icon-384x384.png",
	"img/icons/icon-512x512.png",
	"img/icons/icon-72x72.png",
	"img/icons/icon-96x96.png",
	"img/impar.png",
	"img/jigsaw-puzzle-wood-stock-photography-puzzle-wood-texture.jpg",
	"img/jigsaw-puzzle-wood-stock-photography-puzzle-wood-texture.png",
	"img/jigsaw-puzzle-wood-stock-photography-puzzle-wood-texture.psd",
	"img/landscapes/1.JPG",
	"img/landscapes/10.JPG",
	"img/landscapes/11.JPG",
	"img/landscapes/12.JPG",
	"img/landscapes/13.JPG",
	"img/landscapes/14.JPG",
	"img/landscapes/15.JPG",
	"img/landscapes/16.JPG",
	"img/landscapes/17.JPG",
	"img/landscapes/18.JPG",
	"img/landscapes/2.JPG",
	"img/landscapes/3.JPG",
	"img/landscapes/4.JPG",
	"img/landscapes/5.JPG",
	"img/landscapes/6.JPG",
	"img/landscapes/7.JPG",
	"img/landscapes/8.JPG",
	"img/landscapes/9.JPG",
	"img/logo.png",
	"img/logo0.png",
	"img/par.png",
	"img/puzletrace3x3.png",
	"img/puzletrace3x3_b.png",
	"img/qcobjectsbackground.png",
	"img/qcobjectsbackground2.png",
	"img/qcobjectsbackground2000.png",
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
	"manifest.json",
	"robots.txt",
	"templates/components/blank.tpl.html",
	"templates/components/form.tpl.html",
	"templates/components/gameover.tpl.html",
	"templates/components/grid.tpl.html",
	"templates/components/home.tpl.html",
	"templates/components/itemlandscape.tpl.html",
	"templates/components/landscapelist.tpl.html",
	"templates/components/main.tpl.html",
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
