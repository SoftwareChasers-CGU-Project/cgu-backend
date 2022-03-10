const Product= require ('../Model/programs');
const mysql = require('../dbconfig');

module.exports = {
async createSession (session) {
  // let result = await Product.create(product);
  let sql = "INSERT INTO comSessions SET ?";
  let result =  mysql.query(sql, session, (err) => {
    if (err) {
      throw err;
    }

  });

    if(result) {
      return {
        data: session,
        message: "Session successfully created!"
    };
  }
      return "Error creating new program"
},


// async getAllSession ()  {

//   let sql = `SELECT * FROM comSessions`;
  // if(status=='pending'){
    // sql=`SELECT * FROM comSessions where sessionStatus='${status}'`
  // }

  // else{
    // sql=`SELECT * FROM comSessions`
  // }
  
  // let result = mysql.query(sql);
  
  // let result =  mysql.query(sql, (err) => {
  //   if (err) {
  //     throw err;
  //   }
  // });
//   if(result)  {
//     return result;
//   }
//   return "Error fetching products from db"
// },
// },

async getAllPendingSession ()  {
  let sql = "SELECT * FROM comSessions where sessionStatus=0";
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

async getAllAcceptedSession ()  {
  let sql = "SELECT * FROM comSessions where sessionStatus=1";
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

async deleteSession(Id)  {
  
  var sql = `DELETE FROM comSessions WHERE sessionId=?`;
  let result = mysql.query(sql,Id);
  if(result)  {
    return result;
  }
  return "Error deleting programs from db"
},

async viewSession(Id)  {
  var sql = `SELECT * FROM comSessions WHERE sessionId=?`;
  let result = mysql.query(sql,Id);
  if(result)  {
    return result;
  }
  return "Error fetching the program from db"
},


async updateSession()  { 
  var sql = `UPDATE comSessions SET sessionStatus=1`;
  // var sql = 'UPDATE products SET productName='+product.productName+' WHERE Id='+product.id;
  console.log(sql);
  let result =  mysql.query(sql, (err) => {
    if (err) {
      throw err;
    }

  });
  if(result) {
    return {
     
      message: "Program updated successfully!"
  };
}
    return "Error updating the program"
}

 

};