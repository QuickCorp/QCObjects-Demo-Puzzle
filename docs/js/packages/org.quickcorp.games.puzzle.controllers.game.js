"use strict";
Package("org.quickcorp.games.puzzle.controllers.game",[
  Class("GameController",Controller,{
    basic () {
      CONFIG.set("PUZZLE_NUM_COLS",3);
      CONFIG.set("PUZZLE_NUM_ROWS",2);
      global.get("puzzleController").component.rebuild();
      global.get("puzzleController").play();
    },
    pro () {
      CONFIG.set("PUZZLE_NUM_COLS",4);
      CONFIG.set("PUZZLE_NUM_ROWS",5);
      global.get("puzzleController").component.rebuild();
      global.get("puzzleController").play();
    },
    giveup (){
      global.get("puzzleController").reset();
    },
    done () {
      var controller = this;
      controller.onpress ("button.btn.restart-basic", function (){
        controller.basic();
      });

      controller.onpress ("button.btn.restart-pro", function (){
        controller.pro();
      });

      controller.onpress ("button.btn.giveup", function (){
        controller.giveup();
      });
    }
  })
]);
