const Product= require ('../Model/programs');
const mysql = require('../dbconfig');

module.exports = {
async createNews (News) {
  let sql = "INSERT INTO News SET ?";
  let result =  mysql.query(sql, News, (err) => {
    if (err) {
      throw err;
    }

  });

    if(result) {
      return {
        data: News,
        message: "News successfully added!"
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
},

async deleteNews(Id)  {
  var sql = `DELETE FROM News WHERE newsId=?`;
  let result = mysql.query(sql,Id);
  if(result)  {
    return result;
  }
  return "Error deleting programs from db"
},

async viewNews(Id)  {
  var sql = `SELECT * FROM News WHERE newsId=?`;
  let result = mysql.query(sql,Id);
  if(result)  {
    return result;
  }
  return "Error fetching the program from db"
},

async getCompanyNews ()  {
  let sql = "SELECT * FROM News WHERE newsCate='Company'";
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


async getCGUNews ()  {
  let sql = "SELECT * FROM News WHERE newsCate='CGU'";
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


async updateNews(News)  { 
  var sql = `UPDATE News SET title='${News.title}',newsDate='${News.newsDate}',newsCate='${News.newsCate}',newsDescription='${News.newsDescription}' WHERE newsID='${News.newsID}'`;
  // console.log(sql);
  let result =  mysql.query(sql, (err) => {
    if (err) {
      throw err;
    }

  });
  if(result) {
    return {
      data: News,
      message: "News updated successfully!"
  };
}
    return "Error updating the program"
}


}
