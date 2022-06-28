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



    async viewPassword(email) {
        var sql = `SELECT undergradPassword FROM undergraduates  WHERE email = '${email}'`;
        let result = mysql.query(sql, email);

        if (result) {
            return result;
        }
        return res.status(200).send({
            data: 'error occurred'
        })
    },



    // async viewPassword(password) {
    //     var sql = `SELECT * FROM undergraduates  WHERE password = ?`;
    //     let result = mysql.query(sql, password);
    //     console.log(sql)
    //     if (result) {
    //         return result;
    //     }
    //     return "Error fetching the user from db"
    // },


    // async emailPasswordMatch(email, password) {
    //     var sql = `SELECT * FROM undergraduates WHERE email = ?  `
    //     let sql = mysql.query(sql, email, password);
    //     if (result) {
    //         return result;
    //     }
    //     return "Error fetching the user from db"
    // },

    // async findPassword(email) {
    //     console.log(email);
    //     var sql = `SELECT undergradPassword FROM undergraduates WHERE email = ?`;
    //     let result = mysql.query(sql, email);
    //     console.log(sql);
    //     if (result) {
    //         return result;
    //     }
    //     return "Error fetching the program from db"
    // },


    async isValidPassword(userEmail, userPassword) {


        try {
            var sql = `SELECT undergradPassword FROM undergraduates WHERE email = '${userEmail}'`;
            console.log(userEmail);
            console.log(sql)
            let passwordFromDB = mysql.query(sql, userEmail).toString();
            console.log(passwordFromDB);
            return await bcrypt.compare(userPassword, passwordFromDB);
        } catch {
            (e => {
                console.log(e.message);
            });
        }

    }
}