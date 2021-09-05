"use strict";
Package("org.quickcorp.puzzle.controller", [
  Class("PuzzleGameController", Controller, {
    component: null,
    dependencies: [],
    itemsWin: "",
    itemsPuzzle: null,
    puzzleWidth: 478,
    puzzleHeight: 500,
    nodragableIndex: CONFIG.get("nodragableIndex"),
    rows: 0,
    columns: 0,
    getRootElement () {
      var controller = this;
      return (!controller.component.shadowed)?(controller.component.body):(controller.component.shadowRoot);
    },
    fillItemIndex() {
      var controller = this;
      var itemsIndex = [];
      controller.itemsPuzzle.source.map(function(item) {
        itemsIndex.push(item.data.internalIndex);
      });
      return itemsIndex.join(",") + ",";
    },
    renderItemList() {
      var controller = this;
      var puzzleLayout = document.createElement("div");
      puzzleLayout.className = "puzzle_layout inner-shadow";
      puzzleLayout.style.width = this.puzzleWidth;
      puzzleLayout.style.height = this.puzzleHeight;
      puzzleLayout.style.gridTemplateRows = "auto ".repeat(this.rows);
      puzzleLayout.style.gridTemplateColumns = "auto ".repeat(this.columns);
      puzzleLayout.style.gridAutoFlow = "row dense";

      controller.getRootElement().innerHTML = "";
      controller.itemsPuzzle.source.map(item => puzzleLayout.append(item));
      controller.getRootElement().appendChild(puzzleLayout);
    },
    resetRand() {
      this.itemsPuzzle.source.sort(function(e1, e2) {
        return (e1.data.internalRandTouchPoint < e2.data.internalRandTouchPoint) ? (-1) : (1);
      });
      this.renderItemList();
    },
    resetOrdered() {
      var controller = this;
      controller.itemsPuzzle.source.sort(function(e1, e2) {
        return (e1.data.internalIndex < e2.data.internalIndex) ? (-1) : (1);
      });
      controller.renderItemList();
    },
    reset() {
      global.get("timerGameController").stop();
      this.resetOrdered();
      Tag("canvas").map(function(canvas) {
        Radius.apply(canvas, 40, 7);
      });
    },
    restartTimer() {
      if (typeof global.get("timerGameController") !== "undefined") {
        global.get("timerGameController").stop();
        global.get("timerGameController").start();
      }
    },
    play() {
      this.restartTimer();
      this.resetRand();
      Tag("canvas").map(function(canvas) {
        var effects = [MoveXInFromRight, MoveXInFromLeft, MoveYInFromBottom, MoveYInFromTop];
        var randomEffect = effects[Math.floor(Math.random() * effects.length)];
        randomEffect.apply(canvas);
        Fade.apply(canvas, 0.8, 1);
      });

    },
    start() {
      var controller = this;
      controller.play();
    },
    directionEffect(cellIndex, blankIndex) {
      WipeUp.duration = 300;
      WipeDown.duration = 300;
      WipeLeft.duration = 300;
      WipeRight.duration = 300;
      MoveXInFromRight.duration = 300;
      MoveXInFromLeft.duration = 300;
      MoveYInFromTop.duration = 300;
      MoveYInFromBottom.duration = 300;

      var _direction = Fade;
      switch (true) {
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
    directionBlankEffect(cellIndex, blankIndex) {
      WipeUp.duration = 300;
      WipeDown.duration = 300;
      WipeLeft.duration = 300;
      WipeRight.duration = 300;
      MoveXInFromRight.duration = 300;
      MoveXInFromLeft.duration = 300;
      MoveYInFromTop.duration = 300;
      MoveYInFromBottom.duration = 300;

      var _direction = Fade;
      switch (true) {
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
    itemClickHandler(e) {
      this.itemTouchHandler(e);
    },
    itemTouchHandler(e) {
      var controller = this;
      var blankIndex = controller.itemsPuzzle.source.findIndex(function(item) {
        return (item.body.classList.contains("itemGridCroppedEmpty")) ? (true) : (false);
      });
      var _cellIndex = e.target.getAttribute("internalTouchPoint");
      var cellIndex = controller.itemsPuzzle.source.findIndex(function(item) {
        return (item.body.getAttribute("internalTouchPoint") == _cellIndex) ? (true) : (false);
      });
      var currentCell = controller.itemsPuzzle.source[cellIndex];
      var blankItem = controller.itemsPuzzle.source[blankIndex];
      logger.debug("clicking index " + cellIndex.toString());

      if (cellIndex == (blankIndex + 1) ||
        cellIndex == (blankIndex + this.columns) ||
        cellIndex == (blankIndex - this.columns) ||
        cellIndex == (blankIndex - 1)) {
        logger.debug("changing index " + cellIndex.toString() + " by " + blankIndex.toString() + "");
        controller.itemsPuzzle.source[cellIndex] = blankItem;
        controller.itemsPuzzle.source[blankIndex] = currentCell;
        controller.directionBlankEffect(cellIndex, blankIndex).apply(blankItem.body, 0, 1);
        controller.directionEffect(cellIndex, blankIndex).apply(currentCell.body, 0, 1);
        Fade.apply(blankItem.body, 0.8, 1);

        controller.renderItemList.call(controller);
        controller.itemsIndex = controller.fillItemIndex();
        setTimeout(function() {
          if (controller.itemsIndex == controller.itemsWin) {
            global.get("timerGameController").stop();
            location.href = "#youwin";
          }
        }, 1000);

      } else {
        Fade.apply(currentCell.body, 0.85, 1);
      }

    },
    _new_(o) {
      this.rows = CONFIG.get("PUZZLE_NUM_ROWS");
      this.columns = CONFIG.get("PUZZLE_NUM_COLS");
      global.set("puzzleController", this);
      this.component = o.component;
    },
    renderItems (puzzleWidth, puzzleHeight) {
      var controller = this;
      var canvasWith = puzzleWidth / controller.columns;
      var canvasHeight = puzzleHeight / controller.rows;
       controller.getRootElement().subelements (".itemGridCroppedEmpty")
      .map(element => {
        element.style.width = `${canvasWith}px`;
        element.style.height = `${canvasHeight}px`;
      });
      var nodragableIndex = this.nodragableIndex;

      var imageEvenCell = new Image(puzzleWidth, puzzleHeight);
      var imageOddCell = new Image(puzzleWidth, puzzleHeight);
      var backgroundImageResized = new Image(puzzleWidth, puzzleHeight);
      var backgroundImage = new Image();
      backgroundImage.src = CONFIG.get("puzzleBackgroundImage");
      backgroundImage.onload = function() {
        CanvasTool.getImageResized(backgroundImage, puzzleWidth, puzzleHeight, backgroundImageResized, 1.0001, 0, 0);
      };
      backgroundImageResized.onload = function() {
        controller.itemsPuzzle.source
        .filter (item => (item.data.internalTouchPoint != nodragableIndex))
        .map(function(item) {
          var canvas = item.body;
          canvas.width = canvasWith;
          canvas.height = canvasHeight;
          canvas.style.width = canvasWith;
          canvas.style.height = canvasHeight;
          var subX = parseInt(canvas.getAttribute("subx"));
          var subY = parseInt(canvas.getAttribute("suby"));
          var ctx = canvas.getContext("2d");
          ctx.drawImage(backgroundImageResized, subX, subY, backgroundImageResized.width, backgroundImageResized.height, 0, 0, backgroundImageResized.width, backgroundImageResized.height);
        });
        backgroundImageResized.src = CONFIG.get("puzzleBackgroundImage");

      };
      imageEvenCell.onload = function() {
        controller.itemsPuzzle.source
        .filter (item => (item.data.internalTouchPoint % 2 == 0) ? (true) : (false))
        .filter (item => (item.data.internalTouchPoint != nodragableIndex))
        .map(function(item) {
          var canvas = item.body;
          CanvasTool.drawImageFilled(imageEvenCell, canvas);
        });
        imageOddCell.src = "img/impar.png";

      };
      imageOddCell.onload = function() {
        controller.itemsPuzzle.source
        .filter (item => (item.data.internalTouchPoint % 2 == 0) ? (false) : (true))
        .filter (item => (item.data.internalTouchPoint != nodragableIndex))
        .map(function(item) {
            var canvas = item.body;
            CanvasTool.drawImageFilled(imageOddCell, canvas);
        });
      };

    },
    fillItemsPuzzle (puzzleWidth, puzzleHeight) {
      var controller =this;
      var nodragableIndex = this.nodragableIndex;

      if (typeof controller.itemsPuzzle == "undefined" || controller.itemsPuzzle == null) {
        controller.itemsPuzzle = New(ArrayCollection, []);
      }
      var touchPoint = 0;
      range (controller.rows-1).map (function (j){
        range (controller.columns-1).map (function (i) {
          var width = puzzleWidth / controller.columns;
          var height = puzzleHeight / controller.rows;
          var subX = width * i;
          var subY = height * j;
          var itemGrid = New(Component, {
            cached: true,
            name: "item",
            tplsource: "none",
            body: document.createElement("canvas"),
            data: {
              internalIndex: touchPoint,
              internalTouchPoint: touchPoint++,
              internalRandTouchPoint: Math.round(Math.random() * 100)
            }
          });
          controller.component.subcomponents.push(itemGrid);
          controller.itemsWin += itemGrid.data.internalTouchPoint.toString() + ",";
          itemGrid.body.setAttribute("internalTouchPoint", itemGrid.data.internalTouchPoint);
          itemGrid.body.setAttribute("internalRandTouchPoint", itemGrid.data.internalRandTouchPoint);
          itemGrid.body.setAttribute("subx", subX);
          itemGrid.body.setAttribute("suby", subY);

          if (itemGrid.data.internalTouchPoint != nodragableIndex) {
            itemGrid.body.className = "itemGridCropped one-edge-shadow";

            if (FormController.isTouchable()) {
              itemGrid.body.addEventListener("touchstart", function(e) {
                controller.itemTouchHandler(e);
              }, {
                passive: true
              });
            } else {
              itemGrid.body.addEventListener("click", function(e) {
                controller.itemClickHandler(e);
              }, false);
            }
          } else {
            itemGrid.body.className = "itemGridCroppedEmpty";
          }
          //          itemGrid.body.draggable=true;

          controller.itemsPuzzle.push(itemGrid);

        });

      });

    },
    done() {
      var controller = this;
       controller.getRootElement()
      .subelements(".puzzle_content")
      .map(element => {
//        controller.puzzleWidth = element.clientWidth;
//        controller.puzzleHeight = element.clientHeight;
      });

      controller.rows = CONFIG.get("PUZZLE_NUM_ROWS");
      controller.columns = CONFIG.get("PUZZLE_NUM_COLS");
      controller.itemsWin = "";
      try {
        controller.fillItemsPuzzle(controller.puzzleWidth, controller.puzzleHeight);
        controller.renderItems (controller.puzzleWidth, controller.puzzleHeight);
        controller.start();
      }catch (e){
        console.error(e);
      }



    }
  })
]);
