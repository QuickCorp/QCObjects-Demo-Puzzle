"use strict";
Package("cl.quickcorp.services",[
  Class("PlayerService",Service,{
      name:"playerservice",
      external:true,
      cached:false,
      method:"POST",
      headers:{"Content-Type":"application/json"},
      url:"https://"+CONFIG.get("domain")+"/saveplayer",
      withCredentials:false,
      _new_:function (o){
        // service instantiated
      },
      done:()=>{
        // service loaded
      }
  })
]);
