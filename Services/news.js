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

async updateNews(news)  { 
  var sql = `UPDATE News SET title='${news.title}',newsDate='${news.newsDate}',newsDescription='${news.newsDescription}' WHERE newsID='${news.newsID}'`;
  // console.log(sql);
  let result =  mysql.query(sql, (err) => {
    if (err) {
      throw err;
    }

  });
  if(result) {
    return {
      data: news,
      message: "News updated successfully!"
  };
}
    return "Error updating the program"
}


}
