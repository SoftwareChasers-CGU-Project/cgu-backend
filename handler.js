'use strict';
const mysql = require('./dbconfig');

// module.exports.run =  async function(){
//   // console.log("Working This-------");
//   var dateNow = Date.now();
//   let programDates=await mysql.query(`select programDate from programs`);
//   for (let index = 0; index < programDates.length; index++) {
//     var programDate =Math.floor( new Date(programDates[index]).getTime());
//     if(dateNow==programDate[index]){
//       let result=mysql.query(`UPDATE programs SET programStatus=1 WHERE programDate='${programDates[index]}'`)
//     }
//   }

//   let sessionDates=await mysql.query(`select sessionDate from comSessions`);
//   for (let index = 0; index < sessionDates.length; index++) {
//     var sessionDate =Math.floor( new Date(sessionDates[index]).getTime());
//     if(dateNow==sessionDate[index]){
//       let result=mysql.query(`UPDATE comSesssions SET sessionTimeStatus=1 WHERE sessionDate='${sessionDates[index]}'`)
//     }
//   }
// }
  
  





