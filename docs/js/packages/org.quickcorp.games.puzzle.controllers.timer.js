"use strict";
Package("org.quickcorp.games.puzzle.controllers.timer",[
  Class("TimerController",Controller,{
    dependencies:[],
    component:null,
    thread:null,
    _new_(o){
      this.__new__(o);
      //TODO: Implement
      var controller = this;
      global.set("timerGameController",controller);
    },
    done(){
      var controller=this;
    },
    stop(){
      Timer.alive=false;
    },
    gameover(){
      global.get("puzzleController").reset();
      global.get("timerGameController").stop();
      location.href="#gameover";
    },
    start(){
      var component = this.component;
      var controller = this;
      this.thread = {
          duration:component.duration,
          timing(timeFraction,elapsed){
            component.data.elapsed = elapsed;
            component.remaining = Math.round(Math.round(component.duration - component.data.elapsed)/1000);
            component.body.innerHTML = "<p>Time remaining... "+component.remaining.toString()+"</p>";
            logger.debug("timer time fraction: "+timeFraction.toString());
            logger.debug("timer time elapsed: "+elapsed.toString());
            return timeFraction;
          },
          intervalInterceptor(progress){
            logger.debug("timer progress: "+progress.toString());
            if (progress==100){
              component.body.innerHTML = "<p>GAME OVER... "+component.remaining.toString()+"</p>";
              controller.gameover();
              controller.stop();
            }
          }
      };
      Timer.alive=true;
      Timer.thread(this.thread);

    }
  })
]);
