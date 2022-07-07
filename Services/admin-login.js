const mysql = require('../dbconfig');
const bcrypt = require('bcrypt');

module.exports = {

    // async viewUsers() {

    //     var sql = `SELECT * FROM undergraduates`;

    //     let result = mysql.query(sql);

    //     if (result) {
    //         return result;
    //     }
    //     return " error fetching data"
    // },

    async viewUser(email) {
        var sql = `SELECT adminFName FROM administrators  WHERE email = ?`;
        let result = mysql.query(sql, email);

        if (result) {
            return result;
        }
        return res.status(200).send({
            data: 'error occurred'
        })
    },



    // async viewPassword(email) {
    //     var sql = `SELECT password FROM administrators  WHERE email = '${email}'`;
    //     let result = mysql.query(sql, email);

    //     if (result) {
    //         return result;
    //     }
    //     return res.status(200).send({
    //         data: 'error occurred'
    //     })
    // },


    async isValidPassword(userEmail, userPassword) {
        try {
            var sql = `SELECT * FROM administrators WHERE email = '${userEmail}'`;
            console.log(userEmail);
            console.log(sql)
            let userDetails = await mysql.query(sql, userEmail);

            console.log(userDetails[0].adminPassword.toString());
            const match = await bcrypt.compare(userPassword, userDetails[0].adminPassword.toString());
            if (match) {
                
                return {match, userDetails};
            } else {
                return false;
            }
        } catch {
            (e => {
                console.log(e.message);
            });
        }
    }
}