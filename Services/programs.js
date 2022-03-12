const Product= require ('../Model/programs');
const mysql = require('../dbconfig');

module.exports = {
async createProgram (program) {
  let sql = "INSERT INTO programs SET ?";
  let result =  mysql.query(sql, program, (err) => {
    if (err) {
      throw err;
    }

  });

    if(result) {
      return {
        data: program,
        message: "Program successfully created!"
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


async viewProgram(Id)  {
  var sql = `SELECT * FROM programs WHERE programId=?`;
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