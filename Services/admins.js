const mysql = require('../dbconfig');

module.exports = {
    async createAdmin (admin) {
      let sql = "INSERT INTO administrators SET ?";
      let result =  mysql.query(sql, admin, (err) => {
        if (err) {
          throw err;
        }
      });

        if(result) {
          return {
            data: admin,
            message: "Admin successfully created!"
        };
      }
          return "Error creating new admin"
    },
    
    async getAllAdmins(){
  	
      let result = await mysql.query({
        sql: 'SELECT a.email, a.adminFName, a.adminLName, u.phone_number FROM administrators a, users u WHERE a.email = u.email',
        timeout: 10000,
        values: ['serverless']
      })
    
      if(result)  {
        return result;
      }
        return "Error fetching admins from db"
    }
      

}