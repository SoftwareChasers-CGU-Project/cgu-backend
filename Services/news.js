const Product= require ('../Model/programs');
const mysql = require('../dbconfig');

module.exports = {
async createNews (program) {
  let sql = "INSERT INTO News SET ?";
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


async getAllNews ()  {
  let sql = "SELECT * FROM News";
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
}}
