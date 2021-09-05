"use strict";
Package("org.quickcorp.games.puzzle.controllers.landscapelist",[
  Class("LandscapeListController",Controller,{
    dependencies:[],
    component:null,
    items:[
      {
        picture:"img/landscapes/1.JPG",
        name:"One",
        link:"#one"
      },
      {
        picture:"img/landscapes/2.JPG",
        name:"Two",
        link:"#two"
      },
      {
        picture:"img/landscapes/3.JPG",
        name:"Three",
        link:"#three"
      },
      {
        picture:"img/landscapes/4.JPG",
        name:"Four",
        link:"#four"
      },
      {
        picture:"img/landscapes/5.JPG",
        name:"Five",
        link:"#five"
      },
      {
        picture:"img/landscapes/6.JPG",
        name:"Six",
        link:"#six"
      }
    ],
    itemComponentURI:ComponentURI({
      COMPONENTS_BASE_PATH:CONFIG.get("componentsBasePath"),
      TPL_SOURCE:"default",
      COMPONENT_NAME:"game/itemlandscape",
      TPLEXTENSION:CONFIG.get("tplextension")
    }),
    itemTouchHandler(data){
      CONFIG.set("puzzleBackgroundImage",data.picture);
      location.href="#puzzle";
    },
    addNewItem(data){
      var controller = this;
      var item = New(Component,{
        data:data,
        name:"itemlandscape",
        tplsource:"default",
        body:document.createElement("div"),
        tplextension:CONFIG.get("tplextension"),
        templateURI:controller.itemComponentURI
      });
      item.body.style.cursor= "pointer";
      if (FormController.isTouchable()){
        item.body.addEventListener("touchstart",function (e){
          controller.itemTouchHandler(data);
        }, {passive:true});
      } else {
        item.body.addEventListener("click",function (e){
          controller.itemTouchHandler(data);
        }, {passive:true});

      }

      controller.component.subcomponents.push(item);
      controller.component.body.append(item.body);
    },
    done(){
      var controller = this;
      controller.component.body.innerHTML = "";
      controller.items.map(function (data){
        controller.addNewItem(data);
      });

      logger.debug("LANDSCAPE CONTROLLER LOADED");
    }
  })
]);
