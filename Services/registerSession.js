const Product= require ('../Model/registerEvent');
const mysql = require('../dbconfig');

module.exports = {
async getUndergraduates(Id)  {
  console.log(Id)
  var sql = `SELECT email,undergradFName,undergradLName,batch,faculty FROM undergraduates WHERE email in (select undergradEmail from undergraduateSessionRegistration where eventId ='${Id}')`;
  let result = mysql.query(sql,Id);
  if(result)  {
    return result;
  }
  return "Error fetching the program from db"
},

async addRegisterSession (register) {
  let check_sql=await mysql.query(`select * from undergraduates where email='${register.undergradEmail}'`)
  // console.log(check_sql[0]);
  if(check_sql[0]==null){
    // console.log("hello");
    return;
  }  
 
  let sql = `INSERT INTO undergraduateSessionRegistration  SET eventId='${register.eventId}', undergradEmail='${register.undergradEmail}' ON DUPLICATE KEY UPDATE eventId='${register.eventId}', undergradEmail='${register.undergradEmail}'`;
  // console.log(sql);
  let result = mysql.query(sql, register, (err) => {
    if (err) {
      throw err;
    }

  });

    if(result) {
      return {
        data: register,
        message: "consultant successfully created!"
    };
  }
return "Error creating new Consultant"
},




};