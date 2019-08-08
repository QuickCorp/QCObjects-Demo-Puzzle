'use strict';
const fs = require('fs');

Package('cl.quickcorp.backend.saveplayer',[
  Class('Microservice',BackendMicroservice,{
    body:{
      "jsonrpc": "2.0",
      "result": "",
      "id": 1
    },
    saveToFile: function (filename,data){
      fs.writeFile(filename, data, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
      });
    },
    post:function (data){
      let projectPath = CONFIG.get('projectPath'); // this is filled out from qcobjects-server
      let filename = projectPath+'/records/record'+Date.now().toString()+'.json';
      console.log('DATA RECEIVED: '+data);
      this.saveToFile(filename,data);
    }
  })
]);
