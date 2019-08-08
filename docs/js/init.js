'use strict';
logger.debugEnabled=false;
Component.cached=true;

CONFIG.set('domain','172.17.72.128');
CONFIG.set('relativeImportPath', 'js/packages/');
CONFIG.set('componentsBasePath', 'templates/components/');
CONFIG.set('delayForReady', 1); // delay to wait before executing the first ready event, it includes imports
CONFIG.set('preserveComponentBodyTag', false); // don't use <componentBody></componentBody> tag
CONFIG.set('useConfigService', true); // Load settings from config.json
CONFIG.set('routingWay','hash');
CONFIG.set('useSDK',true);
CONFIG.set('useLocalSDK',false);
CONFIG.set('asynchronousImportsLoad',true);
CONFIG.set('tplextension','tpl.html');
CONFIG.set('serviceWorkerURI','/sw.js'); //QCObjects will register an launch this service worker automatically to work offline

//  CONFIG.set('puzzleBackgroundImage',"/img/qcobjectsbackground2000.png");
  CONFIG.set('puzzleBackgroundImage',"img/landscapes/1.jpg");

// PUZZLE config
CONFIG.set('PUZZLE_WITH',document.body.clientWidth*0.7);
CONFIG.set('PUZZLE_HEIGHT',document.body.clientWidth*0.7);
CONFIG.set('PUZZLE_NUM_COLS',3);
CONFIG.set('PUZZLE_NUM_ROWS',2);
CONFIG.set('nodragableIndex',2);
CONFIG.set('puzzleTimeoutSeconds',60); // seconds to game over
CONFIG.set('serviceWorkerURI','/sw.js'); //QCObjects will register an launch this service worker automatically to work offline

/**
 * Main import sentence.
 */
Import('cl.quickcorp',function (){


});

Ready(function (){


});
