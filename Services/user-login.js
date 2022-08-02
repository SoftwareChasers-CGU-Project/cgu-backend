const mysql = require('../dbconfig');
const bcrypt = require('bcrypt');


module.exports = {

    async viewUsers() {

        var sql = `SELECT * FROM undergraduates`;

        let result = mysql.query(sql);

        if (result) {
            return result;
        }
        return " error fetching data"
    },

    async viewUser(email) {
        var sql = `SELECT * FROM undergraduates  WHERE email = ?`;
        let result = mysql.query(sql, email);

        if (result) {
            return result;
        }
        return res.status(200).send({
            data: 'error occurred'
        })
    },
    async updatePassword(newDetails) {
        try {
            var sql = `UPDATE undergraduates SET undergradPassword = '${newDetails.undergradPassword}' WHERE email= '${newDetails.email}' `;
            console.log(newDetails);
            console.log(newDetails.undergradPassword)
            console.log(newDetails.email)
            console.log(sql)
            let result = await mysql.query(sql, newDetails);
            if (result) {
                return "Successfully updated"
            }
        } catch (err) {
            return "Error updating password"
        }
    },

    async isValidPassword(userEmail, userPassword) {
        try {
            var sql = `SELECT * FROM undergraduates WHERE email = '${userEmail}'`;
            console.log(userEmail);
            console.log(sql)
            let userDetails = await mysql.query(sql, userEmail);
            console.log(userDetails);
            const password = userDetails[0].undergradPassword;
            console.log(password);
            return await bcrypt.compare(userPassword, password);
        } catch {
            (e => {
                console.log(e.message);
            });
        }

    }
}