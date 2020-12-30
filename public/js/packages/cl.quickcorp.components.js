"use strict";
Package('cl.quickcorp.components',[
  Class('TimerComponent',Component,{
    name:'timer',
    cached:false,
    controller:null,
    data:{
      timing:1,
      elapsed:0
    },
    _new_:function (o){
      logger.debugEnabled=false;
      _super_('Component','_new_').call(this,o); // parent call
      this.controller = New(TimerController,{
        component:this
      });
    },
    done: function ({request,component}){
      _super_('Component','done').call(this,{request:request,component:component}); // parent call
      component.duration = CONFIG.get('puzzleTimeoutSeconds')*1000;
      component.body.innerHTML = '<p>Time remaining... {{timing}}</p>';
      logger.debug('Rebuilding timer ');


    }
  }),
  Class('MyCustomComponent',Component,{
    someMethod1: function (){
      // TODO: Implement
    }
  }),
  Class('ItemPuzzle',HTMLCanvasElement,{
  })
]);
