const Session= require ('../Model/com-sessions');
const mysql = require('../dbconfig');

module.exports = {
async createSession (session) {
  let sql = "INSERT INTO comSessions SET ?";
  console.log(sql)
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

async createCompany (company) {
  let check_sql=await mysql.query(`select companyName from company where companyEmail='${company.companyEmail}'`)
  
  if(check_sql[0].companyName!==company.companyName){
    console.log("not equal");
    return;
  }
    
  let sql = `INSERT INTO company SET companyName='${company.companyName}', companyEmail='${company.companyEmail}' ON DUPLICATE KEY UPDATE companyName='${company.companyName}', companyEmail='${company.companyEmail}'`
  console.log(sql)            
  let result = mysql.query(sql, company, (err) => {
    if (err) {
      throw err;
    }

  });

    if(result) {
      return {
        data: company,
        message: "company successfully created!"
    };
  }
return "Error creating new Company"
},
  
async getAllPendingSession ()  {
  let sql = "SELECT * FROM comSessions where sessionStatus=0 and sessionTimeStatus=0 ORDER BY sessionDate ASC";
  let result = mysql.query(sql);
 
  if(result)  {
    return result;
  }
  return "Error fetching products from db"
},


async getAllAcceptedSession ()  {
  let sql = "SELECT * FROM comSessions where sessionStatus=1 and sessionTimeStatus=0 ORDER BY sessionDate ASC";
  let result = mysql.query(sql);

  if(result)  {
    return result;
  }
  return "Error fetching products from db"
},

async getAllPastComsessions ()  {
  let sql = "SELECT * FROM comSessions where sessionTimeStatus=1 ORDER BY sessionDate ASC";
  let result = mysql.query(sql);
  
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

async viewCompany(Id)  {
  var sql = `SELECT * FROM company WHERE companyEmail=?`;
  let result = mysql.query(sql,Id);
  if(result)  {
    return result;
  }
  return "Error fetching the program from db"
},


async updateSession(session)  { 
  var sql = `UPDATE comSessions SET sessionStatus=1 WHERE sessionId='${session}'`;
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
},

async getEmail(id)  { 
  var sql = `SELECT  companyEmail,sessionTopic,sessionDate from comSessions WHERE sessionId='${id}'`;
  console.log(sql);
  let result =  mysql.query(sql,id);
  JSON.parse(JSON.stringify(result))

  if(result) {
    return result;
  }

return "Error fetching the program from db"
},
    



};