const mysql = require("../dbconfig");

module.exports = {
  //create a new admin
  async createAdmin(admin) {
    let check_sql = await mysql.query(
      `select * from administrators where email='${admin.email}'`
    );
    console.log(check_sql[0]);
    if (check_sql[0] != null) {
      return;
    }

    let sql = "INSERT INTO administrators SET ?";
    let result = mysql.query(sql, admin, (err) => {
      if (err) {
        throw err;
      }
    });

    if (result) {
      return {
        data: admin,
        message: "Admin successfully created!",
      };
    }
    return "Error creating new admin";
  },

  //get all admins
  async getAllAdmins() {
    let result = await mysql.query({
      sql: 'SELECT a.email, CONCAT(a.adminFName," ",a.adminLName) as fullname, u.phone_number FROM administrators a, users u WHERE a.email = u.email',
    });

    if (result) {
      return result;
    }
    return "Error fetching admins from db";
  },
};
