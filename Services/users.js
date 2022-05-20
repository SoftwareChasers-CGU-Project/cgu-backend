const mysql = require('../dbconfig');
module.exports = {
    
    async createUser (user) {
        let sql = "INSERT INTO  users SET ?";
        let result = mysql.query(sql, user, (err) => {
          if (err) {
            throw err;
          }
        });
      
        if(result) {
          return {
            data: user,
            message: "User successfully registered!"
          };
        }
        return "Error registering new user"
      },

      async createUndergraduate (user) {
        let sql = "INSERT INTO undergraduates  SET ?";
        let result = mysql.query(sql, user, (err) => {
          if (err) {
            throw err;
          }
        });
      
        if(result) {
          return {
            data: user,
            message: "User successfully registered!"
          };
        }
        return "Error registering new user"
      }

}