const Product= require ('../Model/about-us');
const mysql = require('../dbconfig');

module.exports = {
async createAboutUs (AboutUs) {
  let sql = "INSERT INTO AboutUs SET ?";
  let result =  mysql.query(sql, AboutUs, (err) => {
    if (err) {
      throw err;
    }

  });

    if(result) {
      return {
        data: AboutUs,
        message: "Successfully added!"
    };
  }
      return "Error creating new item"
},

async viewAboutUs(ID)  {
  var sql = `SELECT * FROM AboutUs WHERE ID=?`;
  let result = mysql.query(sql,ID);
  if(result)  {
    return result;
  }
  return "Error fetching the program from db"
},


async getAllAboutUs ()  {
  let sql = "SELECT * FROM AboutUs";
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

async deleteAboutUs(ID)  {
  var sql = `DELETE FROM AboutUs WHERE ID=?`;
  let result = mysql.query(sql,ID);
  if(result)  {
    return result;
  }
  return "Error deleting programs from db"
},

async updateAboutUs(AboutUs)  { 
  var sql = `UPDATE AboutUs SET title='${AboutUs.title}',aboutUsDescription='${AboutUs.aboutUsDescription}' WHERE ID='${AboutUs.ID}'`;
  // console.log(sql);
  let result =  mysql.query(sql, (err) => {
    if (err) {
      throw err;
    }

  });
  if(result) {
    return {
      data: AboutUs,
      message: "Updated successfully!"
  };
}
    return "Error updating the item"
}


}