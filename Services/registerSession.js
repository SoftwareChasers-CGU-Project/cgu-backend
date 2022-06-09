const Product= require ('../Model/registerEvent');
const mysql = require('../dbconfig');

module.exports = {
async addRegisterSession (register) {
  console.log(register.eventId)
  let sql = `INSERT INTO undergraduateSessionRegistration  SET eventId='${register.eventId}', undergradEmail='${register.undergradEmail}' ON DUPLICATE KEY UPDATE eventId='${register.eventId}', undergradEmail='${register.undergradEmail}' where exists(select 1 from undergraduates where email='${register.undergradEmail}')`
  

  let result =  mysql.query(sql, register, (err) => {
    if (err) {
      throw err;
    }

  });

    if(result) {
      return {
        data: register,
        message: " successfully Registered!"
    };
  }
      return "Error creating new program"
},


async getAllProgram ()  {
  let sql = "SELECT * FROM programs";
  let result = mysql.query(sql);
  
  // let result =  mysql.query(sql, (err) => {
  //   if (err) {
  //     throw err;
  //   }
  // });
  if(result)  {
    return result;
  }
  return "Error fetching products from db"
},


async deleteProgram(Id)  {
  var sql = `DELETE FROM programs WHERE programId=?`;
  let result = mysql.query(sql,Id);
  if(result)  {
    return result;
  }
  return "Error deleting programs from db"
},


async getUndergraduates(Id)  {
  console.log(Id)
  var sql = `SELECT email,undergradFName,undergradLName,batch,faculty FROM undergraduates WHERE email in (select undergradEmail from undergraduateSessionRegistration where eventId ='${Id}')`;
  let result = mysql.query(sql,Id);
  if(result)  {
    return result;
  }
  return "Error fetching the program from db"
},


async updateProgram(program)  { 
  var sql = `UPDATE programs SET programName='${program.programName}',programDate='${program.programDate}',programCat='${program.programCat}', programDesc='${program.programDesc}', programImage='${program.programImage}'  WHERE programId='${program.programId}'`;
  // console.log(sql);
  let result =  mysql.query(sql, (err) => {
    if (err) {
      throw err;
    }

  });
  if(result) {
    return {
      data: program,
      message: "Program updated successfully!"
  };
}
    return "Error updating the program"
}

};