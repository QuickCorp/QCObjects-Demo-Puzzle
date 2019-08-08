"use strict";
Package('cl.quickcorp.components',[
  Class('ModalComponent',Component,{
    name:'modal',
    cached:false,
    controller:null,
    view:null,
    data:{
      content:'',
      modalId:0
    },
    submodal:null,
    modal: function (){
      var modalId = this.data.modalId;
      var modalComponent = this;

      Tag('#modalInstance_'+parseInt(modalId)+'.modal').map(function (modal){
        modal.style.display='block';
        ModalFade.apply(modal,0,1);
      });
      Tag('#modalInstance_'+parseInt(modalId)+'.modal .modal-content').map(function (modalcontent){
        ModalMoveDown.apply(modalcontent,0,-document.body.clientHeight,0,0);
      });
      Tag('#modalInstance_'+parseInt(modalId)+'.modal .modal-content .close').map(function (closebtn){
        closebtn.addEventListener('click',function (){
          modalComponent.close();
        },false);
      });
//      window.addEventListener('click',function (){
//        modalComponent.close();
//      },false);
    },
    close: function (){
      var modalId = this.data.modalId;
      Tag('#modalInstance_'+parseInt(modalId)+'.modal').map(function (modal){
        modal.style.display='block';
        ModalFade.apply(modal,1,0);
      });
      Tag('#modalInstance_'+parseInt(modalId)+'.modal .modal-content').map(function (modalcontent){
        ModalMoveUp.apply(modalcontent,0,0,0,-document.body.clientHeight);
      });
      setTimeout(function (){
        Tag('#modalInstance_'+parseInt(modalId)+'.modal').map(function (modal){
          modal.style.display='none';
        });
      },900);
    },
    _new_:function (o){
      var component = this;
      component.data.modalId = component.__instanceID;
      var submodal = New(Component,{
        name:component.name,
        data:component.data,
        body:document.createElement('div'),
        templateURI:ComponentURI({
          'COMPONENTS_BASE_PATH':CONFIG.get('componentsBasePath'),
          'COMPONENT_NAME':component.name,
          'TPLEXTENSION':CONFIG.get('tplextension'),
          'TPL_SOURCE':'default' //here is always default in order to get the right uri
        })
      });
      component.subcomponents.push(submodal);
      component.submodal = submodal;
      _super_('Component','_new_').call(this,o); // parent call
    },
    done: function ({request,component}){
      _super_('Component','done').call(this,{request:request,component:component}); // parent call
    },
    rebuild:function (){
      this.templateURI = ComponentURI({
        'COMPONENTS_BASE_PATH':CONFIG.get('componentsBasePath'),
        'COMPONENT_NAME':'modal',
        'TPLEXTENSION':CONFIG.get('tplextension'),
        'TPL_SOURCE':'default' //here is always default in order to get the right uri
      });
      return _super_('Component','rebuild').call(this); // parent call
    }
  }),
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
