"use strict";
Package("org.quickcorp.puzzle.effects",[
  Class("FadeTransitionEffect",TransitionEffect,{
    duration:700,
    defaultParams:{
      alphaFrom:0,
      alphaTo:1,
      angleFrom:-120,
      angleTo:0
    },
    _new_(o){
      logger.info("DECLARING MAIN EFFECT ");
      this.component.defaultParams = this.defaultParams;
    },
    apply({alphaFrom,alphaTo,angleFrom,angleTo}){
      logger.info("EXECUTING MAIN EFFECT ");
      _super_("Rotate","apply").call(this,this.component.body,angleFrom,angleTo);
      _super_("Fade","apply").call(this,this.component.body,alphaFrom,alphaTo);

      // update the config from the actual size of viewport
      CONFIG.set("PUZZLE_WITH",document.body.clientWidth*0.7);
      CONFIG.set("PUZZLE_HEIGHT",document.body.clientWidth*0.7);

    }
  }),
  Class("ModalFade",Effect,{
    duration:500,
    apply(){
      _super_("Fade","apply").apply(this,arguments);
    }
  }),
  Class("ModalMoveDown",Effect,{
    duration:300,
    apply(){
      _super_("Move","apply").apply(this,arguments);
    }
  }),
  Class("ModalMoveUp",Effect,{
    duration:800,
    apply(){
      _super_("Move","apply").apply(this,arguments);
    }
  })
]);
