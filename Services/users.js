const mysql = require('../dbconfig');
module.exports = {
    
    //create a new user
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

      //register a new undergraduate
      async createUndergraduate (undergraduate) {
        let sql = "INSERT INTO undergraduates  SET ?";
        let result = mysql.query(sql, undergraduate, (err) => {
          if (err) {
            throw err;
          }
        });
      
        if(result) {
          return {
            data: undergraduate,
            message: "User successfully registered!"
          };
        }
        return "Error registering new user"
      },


      async checkUser(email)  {
        let result = await mysql.query({
          sql: "SELECT EXISTS(SELECT 1 FROM undergraduates WHERE email =" +mysql.escape(email) +" LIMIT 1 ) as checkEmail"
        })

        console.log(result); 
          if(result)  { 
            return result;
          }
        return "Error fetching vacancies from db"
      },
}