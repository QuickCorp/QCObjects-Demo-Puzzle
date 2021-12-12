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
const version = "0.2.6";
const appName = "qcobjects-puzzle";
const cacheSufix = (Math.round(Date.now()/(1000*3600))).toString(); // 1 hour
const cacheName = `qcobjects-app-${appName}-${version}-${cacheSufix}`;
const start_url = "/?homescreen=1";
caches.delete(cacheName); // force to reload cache for the first time the sw is loaded
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll([`${start_url}`,
	"/",
	"CNAME",
	"Dockerfile",
	"LICENSE.txt",
	"README.md",
	"VERSION",
	"app.js",
	"css/components/button.css",
	"css/components/card.css",
	"css/components/grid.css",
	"css/components/hero/hero-call-to-action.css",
	"css/components/hero/hero-overlay.css",
	"css/components/hero/hero-two-column-form.css",
	"css/components/modal.css",
	"css/desktop/container.css",
	"css/desktop/content.css",
	"css/desktop/footer.css",
	"css/desktop/index.css",
	"css/desktop/navbar.css",
	"css/desktop/sidebar.css",
	"css/index.css",
	"css/main.css",
	"css/mobile/content.css",
	"css/mobile/footer.css",
	"css/mobile/index.css",
	"css/mobile/navbar.css",
	"css/mobile/sidebar.css",
	"css/modal.css",
	"css/modern-base.css",
	"css/normalize.css",
	"css/puzzle.css",
	"css/theme/basic/style.css",
	"css/theme/cyan/style.css",
	"css/theme/redlight/style.css",
	"css/theme/xtra/style.css",
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
	"img/loading.svg",
	"img/logo-qcobjects-white.svg",
	"img/logo.png",
	"img/logo0.png",
	"img/par.png",
	"img/placeholder.svg",
	"img/puzletrace3x3.png",
	"img/puzletrace3x3_b.png",
	"img/qcobjectsbackground.png",
	"img/qcobjectsbackground2.png",
	"img/qcobjectsbackground2000.png",
	"img/screenshots/screenshot1.png",
	"img/screenshots/screenshot1.webp",
	"img/screenshots/screenshot2.png",
	"img/screenshots/screenshot2.webp",
	"img/thumbnailvideopuzzle.png",
	"index.html",
	"js/init.js",
	"js/packages/game-init.js",
	"js/packages/installer.js",
	"js/packages/org.quickcorp.custom.components.js",
	"js/packages/org.quickcorp.custom.controllers.js",
	"js/packages/org.quickcorp.custom.effects.js",
	"js/packages/org.quickcorp.custom.js",
	"js/packages/org.quickcorp.custom.models.js",
	"js/packages/org.quickcorp.custom.views.js",
	"js/packages/org.quickcorp.games.puzzle.controllers.game.js",
	"js/packages/org.quickcorp.games.puzzle.controllers.landscapelist.js",
	"js/packages/org.quickcorp.games.puzzle.controllers.timer.js",
	"js/packages/org.quickcorp.puzzle.backend.saveplayer.js",
	"js/packages/org.quickcorp.puzzle.components.js",
	"js/packages/org.quickcorp.puzzle.controller.js",
	"js/packages/org.quickcorp.puzzle.effects.js",
	"js/packages/org.quickcorp.puzzle.js",
	"js/packages/org.quickcorp.puzzle.model.js",
	"js/packages/org.quickcorp.puzzle.services.js",
	"manifest.json",
	"robots.txt",
	"templates/components/blank.tpl.html",
	"templates/components/card.tpl.html",
	"templates/components/contentblock.tpl.html",
	"templates/components/footer.tpl.html",
	"templates/components/footer2.tpl.html",
	"templates/components/game/form.tpl.html",
	"templates/components/game/gameover.tpl.html",
	"templates/components/game/home.tpl.html",
	"templates/components/game/itemlandscape.tpl.html",
	"templates/components/game/landscapelist.tpl.html",
	"templates/components/game/playerslist.tpl.html",
	"templates/components/game/puzzle.tpl.html",
	"templates/components/game/puzzle_buttons.tpl.html",
	"templates/components/game/puzzlegame.tpl.html",
	"templates/components/game/youwin.tpl.html",
	"templates/components/grid.tpl.html",
	"templates/components/header.tpl.html",
	"templates/components/hero/article3.tpl.html",
	"templates/components/hero/hero-call-to-action.tpl.html",
	"templates/components/hero/hero-overlay.tpl.html",
	"templates/components/hero/hero-two-column-form.tpl.html",
	"templates/components/layout-basic.tpl.html",
	"templates/components/loading.tpl.html",
	"templates/components/main.tpl.html",
	"templates/components/modal.tpl.html",
	"templates/components/modalyoulose.tpl.html",
	"templates/components/modalyouwin.tpl.html",
	"templates/components/nav.tpl.html",
	"templates/components/pages/page1.tpl.html",
	"templates/components/pages/page2.tpl.html",
	"templates/components/pages/page3.tpl.html",
	"templates/components/product.tpl.html",
	"templates/components/profile.tpl.html",
	"templates/components/shadowed-card.tpl.html",
	"templates/components/signin-button.tpl.html",
	"templates/components/signup-form.tpl.html",
	"templates/components/signup.tpl.html",
	"templates/components/signupbuttons.tpl.html",
	"templates/components/signupform.tpl.html",
	"templates/components/signuppage.tpl.html",
	"templates/components/signupsuccessful.tpl.html",
	"templates/components/signupsuccessfulfooter.tpl.html",
	"templates/components/splashscreen.tpl.html",
	"templates/components/topmenu.tpl.html",
	"templates/components/videobg.tpl.html"])
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
