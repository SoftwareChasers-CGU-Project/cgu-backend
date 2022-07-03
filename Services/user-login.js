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


    async isValidPassword(userEmail, userPassword) {
        try {
            var sql = `SELECT undergradPassword FROM undergraduates WHERE email = '${userEmail}'`;
            console.log(userEmail);
            console.log(sql)
            let passwordFromDB = await mysql.query(sql, userEmail);
            console.log(passwordFromDB);
            const password = passwordFromDB[0].undergradPassword;
            console.log(password);
            return await bcrypt.compare(userPassword, password);
        } catch {
            (e => {
                console.log(e.message);
            });
        }

    }
}