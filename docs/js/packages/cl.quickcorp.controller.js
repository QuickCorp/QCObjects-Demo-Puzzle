"use strict";
Package('cl.quickcorp.controller', [
  Class('PWAController',Object,{
    component:null,
    _new_:function (o){
      logger.debug('PWAController Element Initialized');
      this.component = o.component;
    },
    done: function (){
      document.head.innerHTML+=this.component.body.innerHTML;
      this.component.body.innerHTML="";
    }
  }),
  Class('ModalController',Controller,{
    dependencies:[],
    component:null,
    _new_:function (o){
      this.__new__(o);
      var controller=this;
      //TODO: Implement
    },
    done: function (){
      var component = this.component;
      component.body.innerHTML = component.body.innerHTML.replace('{{content}}',component.submodal.template);

    }
  }),
  Class('TimerController',Controller,{
    dependencies:[],
    component:null,
    thread:null,
    _new_:function (o){
      this.__new__(o);
      //TODO: Implement
      var controller = this;
      global.set('timerGameController',controller);
    },
    done: function (){
      var controller=this;
    },
    stop: function (){
      Timer.alive=false;
    },
    gameover: function (){
      global.get('puzzleController').reset();
      global.get('timerGameController').stop();
      location.href='#gameover';
    },
    start: function (){
      var component = this.component;
      var controller = this;
      this.thread = {
          duration:component.duration,
          timing(timeFraction,elapsed){
            component.data.elapsed = elapsed;
            component.remaining = Math.round(Math.round(component.duration - component.data.elapsed)/1000);
            component.body.innerHTML = '<p>Time remaining... '+component.remaining.toString()+'</p>';
            logger.debug('timer time fraction: '+timeFraction.toString());
            logger.debug('timer time elapsed: '+elapsed.toString());
            return timeFraction;
          },
          intervalInterceptor(progress){
                logger.debug('timer progress: '+progress.toString());
                if (progress==100){
                  component.body.innerHTML = '<p>GAME OVER... '+component.remaining.toString()+'</p>';
                  controller.gameover();
                  controller.stop();
                }
          }
      };
      Timer.alive=true;
      Timer.thread(this.thread);

    }
  }),
  Class('GameController',Object,{
    basic:()=>{
      CONFIG.set('PUZZLE_NUM_COLS',3);
      CONFIG.set('PUZZLE_NUM_ROWS',2);
      global.get('puzzleController').component.rebuild();
      global.get('puzzleController').play();
    },
    pro:()=>{
      CONFIG.set('PUZZLE_NUM_COLS',4);
      CONFIG.set('PUZZLE_NUM_ROWS',5);
      global.get('puzzleController').component.rebuild();
      global.get('puzzleController').play();
    },
    giveup:()=>{
      global.get('puzzleController').reset();
    }
  }),
  Class('MyCustomController', Object, {
    component: null,
    dependencies: [],
    _new_: function(o) {
      this.component = o.component;
    }
  }),
  Class('LandcapeListController',Controller,{
    dependencies:[],
    component:null,
    items:[
      {
        picture:'img/landscapes/1.JPG',
        name:'One',
        link:'#one'
      },
      {
        picture:'img/landscapes/2.JPG',
        name:'Two',
        link:'#two'
      },
      {
        picture:'img/landscapes/3.JPG',
        name:'Three',
        link:'#three'
      },
      {
        picture:'img/landscapes/4.JPG',
        name:'Four',
        link:'#four'
      },
      {
        picture:'img/landscapes/5.JPG',
        name:'Five',
        link:'#five'
      },
      {
        picture:'img/landscapes/6.JPG',
        name:'Six',
        link:'#six'
      }
    ],
    itemComponentURI:ComponentURI({
      COMPONENTS_BASE_PATH:CONFIG.get('componentsBasePath'),
      TPL_SOURCE:'default',
      COMPONENT_NAME:'itemlandscape',
      TPLEXTENSION:CONFIG.get('tplextension')
    }),
    _new_:function (o){
      this.__new__(o);
      var controller=this;
      //TODO: Implement
    },
    itemTouchHandler: function (data){
      CONFIG.set('puzzleBackgroundImage',data.picture);
      location.href='#puzzle';
    },
    addNewItem:function (data){
      var controller = this;
      var item = New(Component,{
        data:data,
        name:'itemlandscape',
        tplsource:'default',
        body:document.createElement('div'),
        tplextension:CONFIG.get('tplextension'),
        templateURI:controller.itemComponentURI
      });
      if (global.isTouchable()){
        item.body.addEventListener('touchstart',function (e){
          controller.itemTouchHandler(data);
        }, {passive:true});
      } else {
        item.body.addEventListener('click',function (e){
          controller.itemTouchHandler(data);
        }, {passive:true});

      }


      controller.component.subcomponents.push(item);
      controller.component.body.append(item.body);
    },
    done: function (){
      var controller = this;
      controller.component.body.innerHTML = '';
      controller.items.map(function (data){
        controller.addNewItem(data);
      });

      logger.debug('LANDSCAPE CONTROLLER LOADED');
    }
  }),
  Class('PuzzleGameController', Controller, {
    component: null,
    dependencies: [],
    itemsWin: '',
    itemsPuzzle: null,
    puzzleWidth:CONFIG.get('PUZZLE_WITH'),
    puzzleHeight:CONFIG.get('PUZZLE_HEIGHT'),
    nodragableIndex:CONFIG.get('nodragableIndex'),
    rows:0,
    columns:0,
    fillItemIndex:function (){
      var controller = this;
      var itemsIndex = [];
      controller.itemsPuzzle.source.map(function (item){itemsIndex.push(item.data.internalIndex)});
      return itemsIndex.join(',')+',';
    },
    fillPuzzle: function() {
      var puzzleLayout = document.createElement('DIV');
      puzzleLayout.className = 'puzzle_layout inner-shadow';
      puzzleLayout.style.width = this.puzzleWidth;
      puzzleLayout.style.height = this.puzzleHeight;
      puzzleLayout.style.gridTemplateRows='auto '.repeat(this.rows);
      puzzleLayout.style.gridTemplateColumns='auto '.repeat(this.columns);
      puzzleLayout.style.gridAutoFlow='row dense';

      this.component.body.innerHTML = '';
      for (var i = 0; i < this.itemsPuzzle.length; i++) {
        puzzleLayout.append(this.itemsPuzzle.source[i]);
      }
      this.component.body.append(puzzleLayout);
    },
    resetRand: function() {
      this.itemsPuzzle.source.sort(function(e1, e2) {
        return (e1.data.internalRandTouchPoint < e2.data.internalRandTouchPoint)?(-1):(1);
      });
      this.fillPuzzle();
    },
    resetOrdered: function() {
      var controller = this;
      controller.itemsPuzzle.source.sort(function(e1, e2) {
        return (e1.data.internalIndex < e2.data.internalIndex)?(-1):(1);
      });
      controller.fillPuzzle();
    },
    reset: function() {
      global.get('timerGameController').stop();
      this.resetOrdered();
      Tag('canvas').map(function (canvas){Radius.apply(canvas,40,7);});
    },
    play: function (){
      global.get('timerGameController').start();
      this.resetRand();
      Tag('canvas').map(function (canvas){
        var effects = [MoveXInFromRight,MoveXInFromLeft,MoveYInFromBottom,MoveYInFromTop];
        var randomEffect = effects[Math.floor(Math.random()*effects.length)];
        randomEffect.apply(canvas);
        Fade.apply(canvas,0.8,1);
      });

    },
    start: function (){
      var controller = this;
      controller.play();
    },
    directionEffect: function (cellIndex,blankIndex){
      WipeUp.duration = 300;
      WipeDown.duration = 300;
      WipeLeft.duration = 300;
      WipeRight.duration = 300;
      MoveXInFromRight.duration=300;
      MoveXInFromLeft.duration=300;
      MoveYInFromTop.duration=300;
      MoveYInFromBottom.duration=300;

      var _direction = Fade;
      switch (true){
        case cellIndex == (blankIndex + 1):
          // right to left
          _direction = MoveXInFromRight;
          break;
        case cellIndex == (blankIndex + this.columns):
          // down to up
          _direction = MoveYInFromBottom;
          break;
        case cellIndex == (blankIndex - this.columns):
          // up to down
          _direction = MoveYInFromTop;
          break;
        case cellIndex == (blankIndex - 1):
          // left to right
          _direction = MoveXInFromLeft;
          break;
        default:
          break;
      }
      return _direction;
    },
    directionBlankEffect: function (cellIndex,blankIndex){
      WipeUp.duration = 300;
      WipeDown.duration = 300;
      WipeLeft.duration = 300;
      WipeRight.duration = 300;
      MoveXInFromRight.duration=300;
      MoveXInFromLeft.duration=300;
      MoveYInFromTop.duration=300;
      MoveYInFromBottom.duration=300;

      var _direction = Fade;
      switch (true){
        case cellIndex == (blankIndex + 1):
          // right to left
          _direction = MoveXInFromLeft;
          break;
        case cellIndex == (blankIndex + this.columns):
          // down to up
          _direction = MoveYInFromTop;
          break;
        case cellIndex == (blankIndex - this.columns):
          // up to down
          _direction = MoveYInFromBottom;
          break;
        case cellIndex == (blankIndex - 1):
          // left to right
          _direction = MoveXInFromRight;
          break;
        default:
          break;
      }
      return _direction;
    },
    itemClickHandler: function (e){
       this.itemTouchHandler(e);
    },
    itemTouchHandler: function(e) {
      var controller = this;
      var blankIndex = controller.itemsPuzzle.source.findIndex(function(item) {
        return (item.body.classList.contains('itemGridCroppedEmpty')) ? (true) : (false);
      });
      var _cellIndex = e.target.getAttribute('internalTouchPoint');
      var cellIndex = controller.itemsPuzzle.source.findIndex(function(item) {
        return (item.body.getAttribute('internalTouchPoint') == _cellIndex) ? (true) : (false);
      });
      var currentCell = controller.itemsPuzzle.source[cellIndex];
      var blankItem = controller.itemsPuzzle.source[blankIndex];
      logger.debug('clicking index ' + cellIndex.toString());

      if (cellIndex == (blankIndex + 1) ||
        cellIndex == (blankIndex + this.columns) ||
        cellIndex == (blankIndex - this.columns) ||
        cellIndex == (blankIndex - 1)) {
        logger.debug('changing index ' + cellIndex.toString() + ' by ' + blankIndex.toString() + '');
        controller.itemsPuzzle.source[cellIndex] = blankItem;
        controller.itemsPuzzle.source[blankIndex] = currentCell;
        controller.directionBlankEffect(cellIndex,blankIndex).apply(blankItem.body,0,1);
        controller.directionEffect(cellIndex,blankIndex).apply(currentCell.body,0,1);
        Fade.apply(blankItem.body,0.8,1);

        controller.fillPuzzle.call(controller);
        controller.itemsIndex = controller.fillItemIndex();
        setTimeout(function (){
          if (controller.itemsIndex == controller.itemsWin){
            global.get('timerGameController').stop();
            location.href='#youwin';
          }
        },1000);

      } else {
        Fade.apply(currentCell.body,0.85,1);
      }

    },
    _new_: function(o) {
      var controller = this;
      this.puzzleWidth = CONFIG.get('PUZZLE_WITH');
      this.puzzleHeight = CONFIG.get('PUZZLE_HEIGHT');
      Object.defineProperty(controller,'puzzleWidth',{
        set(value){
          CONFIG.set('PUZZLE_WITH',value);
        },
        get(){
          return CONFIG.get('PUZZLE_WITH');
        }
      });
      Object.defineProperty(controller,'puzzleHeight',{
        set(value){
          CONFIG.set('PUZZLE_HEIGHT',value);
        },
        get(){
          return CONFIG.get('PUZZLE_HEIGHT');
        }
      });

      this.rows = CONFIG.get('PUZZLE_NUM_ROWS');
      this.columns = CONFIG.get('PUZZLE_NUM_COLS');
      global.set('puzzleController', this);
      this.component = o.component;
    },
    done: function() {
      var controller = this;
      this.puzzleWidth = CONFIG.get('PUZZLE_WITH');
      this.puzzleHeight = CONFIG.get('PUZZLE_HEIGHT');
      Tag('article')[0].style.width=this.puzzleWidth+'px';
      Tag('article')[0].style.height=this.puzzleHeight+'px';
      this.rows = CONFIG.get('PUZZLE_NUM_ROWS');
      this.columns = CONFIG.get('PUZZLE_NUM_COLS');
      var puzzleWidth = this.puzzleWidth;
      var puzzleHeight = this.puzzleHeight;
      var rows = this.rows;
      var columns = this.columns;
      var canvasWith = puzzleWidth / columns;
      var canvasHeight = puzzleHeight / rows;
      var nodragableIndex = this.nodragableIndex;
      var touchPoint = 0;
      var subX = 0;
      var subY = 0;
      var width = puzzleWidth / columns;
      var height = puzzleHeight / rows;
      this.itemsWin = '';
      controller.component.body.style.width = puzzleWidth;

      if (typeof this.itemsPuzzle == 'undefined' || this.itemsPuzzle == null) {
        this.itemsPuzzle = New(ArrayCollection, []);
      }
      for (var j = 0; j < rows; j++) {
        for (var i = 0; i < columns; i++) {
          subX = width * i;
          subY = height * j;
          var itemGrid = New(Component, {
            cached:true,
            name: 'item',
            tplsource:'none',
            body: document.createElement('canvas'),
            data: {
              internalIndex: touchPoint,
              internalTouchPoint: touchPoint++,
              internalRandTouchPoint: Math.round(Math.random() * 100)
            }
          });
          this.component.subcomponents.push(itemGrid);
          this.itemsWin += itemGrid.data.internalTouchPoint.toString() + ',';
          itemGrid.body.setAttribute('internalTouchPoint', itemGrid.data.internalTouchPoint);
          itemGrid.body.setAttribute('internalRandTouchPoint', itemGrid.data.internalRandTouchPoint);
          itemGrid.body.setAttribute('subx', subX);
          itemGrid.body.setAttribute('suby', subY);

          if (itemGrid.data.internalTouchPoint != nodragableIndex) {
            itemGrid.body.className = 'itemGridCropped one-edge-shadow';

            if (global.isTouchable()){
                   itemGrid.body.addEventListener('touchstart', function (e){
                     controller.itemTouchHandler(e);
                   }, {passive:true});
                 } else {
                   itemGrid.body.addEventListener('click', function (e){
                     controller.itemClickHandler(e);
                   }, false);
                 }
          } else {
            itemGrid.body.className = 'itemGridCroppedEmpty';
          }
          //          itemGrid.body.draggable=true;

          this.itemsPuzzle.push(itemGrid);
        }
      }
      var imagePar = new Image(puzzleWidth, puzzleHeight);
      var imageImpar = new Image(puzzleWidth, puzzleHeight);
      var backgroundImageResized = new Image(puzzleWidth,puzzleHeight);
      var backgroundImage = new Image();
      backgroundImage.src = CONFIG.get('puzzleBackgroundImage');
      backgroundImage.onload = function (){
        var tempCanvas = CanvasTool.getImageResized(backgroundImage,puzzleWidth,puzzleHeight,backgroundImageResized,1.0001,0,0);
      };
      backgroundImageResized.onload = function() {
        controller.itemsPuzzle.source.map(function(c) {
          var canvas = c.body;
          canvas.width = canvasWith;
          canvas.height = canvasHeight;
          canvas.style.width = canvasWith;
          canvas.style.height = canvasHeight;
          if (c.data.internalTouchPoint != nodragableIndex) {
            subX = parseInt(canvas.getAttribute('subx'));
            subY = parseInt(canvas.getAttribute('suby'));
            var ctx = canvas.getContext('2d');
            ctx.drawImage(backgroundImageResized, subX, subY, backgroundImageResized.width, backgroundImageResized.height, 0, 0, backgroundImageResized.width, backgroundImageResized.height);
          }
        });
        imagePar.src = 'img/par.png';

      };
      imagePar.onload = function (){
        controller.itemsPuzzle.source.map(function(c) {
          var par = (c.data.internalTouchPoint%2==0)?(true):(false);
          if (par && (c.data.internalTouchPoint != nodragableIndex)) {
            var canvas = c.body;
            CanvasTool.drawImageFilled(imagePar,canvas);
          }
        });
        imageImpar.src = 'img/impar.png';

      };
      imageImpar.onload = function (){
        controller.itemsPuzzle.source.map(function(c) {
          var par = (c.data.internalTouchPoint%2==0)?(true):(false);
          if ((c.data.internalTouchPoint != nodragableIndex) && !par){
            var canvas = c.body;
            CanvasTool.drawImageFilled(imageImpar,canvas);
          }
        });
        Tag('body > component > div > main > article').map(function (element){
          element.style.backgroundImage = 'url('+CONFIG.get('puzzleBackgroundImage')+')';
          element.style.backgroundSize = 'cover';
          element.style.backgroundPosition = 'top center';
        });
      };
      controller.start();


    }
  }),
  Class('PuzzleController', Object, {
    component: null,
    dependencies: [],
    _new_: function(o) {
      this.component = o.component;
    },
    done: function() {}
  }),
  Class('MainController', Controller, {
    component: null,
    formValidatorModal:null,
    dependencies: [],
    selectedController: null,
    routingControllers:{},
    cacheStorage:null,
    addPlayer:function (){
      var controller = this;
      var contactform;
      if (controller.cacheStorage != null){
        contactform = controller.cacheStorage.getCached('contactform');

        var service = serviceLoader(New(PlayerService,{
          data:contactform
        })).then(
          (successfulResponse)=>{
            // This will show the service response as a plain text
            console.log(successfulResponse.service.template);
          },
          (failedResponse)=>{

          });

      }
    },
    _new_: function(o) {
      global.isTouchable = function (){
        return ('ontouchstart' in window)
             || (navigator.MaxTouchPoints > 0)
             || (navigator.msMaxTouchPoints > 0);
      };
      var controller = this;
      controller.cacheStorage = new ComplexStorageCache({
                            index:'contactform',
                            load:(cacheController)=>{},
                            alternate: (cacheController)=>{}
                            });
      logger.debugEnabled=true;
      controller.component = o.component;
      controller.component = controller.component.Cast(FormField);
      controller.component.createBindingEvents();
    },
    formSaveTouchHandler: function (){
      var controller = this;
      controller.component.executeBindings();
      if (controller.formValidatorModal!=null){
        if (controller.component.data.name == ''
          || controller.component.data.email == ''
          || controller.component.phone == ''
        ){
          var validationMessage = '\
            <details> \
                <summary>Please verify the following incorrect fields:</summary> \
                <ul> \
                  <li>NAME</li> \
                  <li>EMAIL</li> \
                  <li>PHONE</li> \
                </ul> \
            </details> \
          ';
          controller.formValidatorModal.body.subelements('.validationMessage')[0].innerHTML=validationMessage;
          controller.formValidatorModal.modal();
        } else {
          controller.cacheStorage.save('contactform',controller.component.data);
          controller.addPlayer();
          location.href='#landscapelist';
        }
      }
    },
    isRoutingSelectedName:function (name){
      var mainController = this;
      var _ret_=false;
      if (mainController.component.routingSelected.filter(function(r) {
          return r.name == name
        }).length > 0){
          _ret_=true;
        }
      return _ret_;
    },
    done: function() {

      var controller = this;
      if (this.isRoutingSelectedName('form')){
        this.component.body.subelements('button.formstart')[0].addEventListener('touchstart',function (e){
          controller.formSaveTouchHandler();
        }, {passive:true});
        this.component.body.subelements('button.formstart')[0].addEventListener('click',function (e){
          controller.formSaveTouchHandler();
        }, {passive:true});
        controller.formValidatorModal = New(ModalComponent,{
          body:document.createElement('div'),
          subcomponents:[],
          data:{
            content:'<div class="validationMessage"></div>'
          }
        });

        controller.component.body.append(controller.formValidatorModal);
      }

      var mainController = this;
      mainController.routingControllers = {
        'puzzle':New(PuzzleController, {
          component: mainController.component
        })
      };
      for (var name in this.routingControllers){
        if (mainController.isRoutingSelectedName(name)) {
          mainController.selectedController = mainController.routingControllers[name];
          mainController.selectedController.done.call(mainController);
        }
      }

    }
  })
]);
