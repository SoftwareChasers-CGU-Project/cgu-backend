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
            var sql = `SELECT adminPassword FROM administrators WHERE email = '${userEmail}'`;
            console.log(userEmail);
            console.log(sql)
            let passwordFromDB = await mysql.query(sql, userEmail);

            console.log(passwordFromDB[0].adminPassword.toString());
            return await bcrypt.compare(userPassword,passwordFromDB[0].adminPassword.toString());
        } catch {
            (e => {
                console.log(e.message);
            });
        }
    }
}



// Table: administrators
// Columns:
//     email varchar(50) PK
// adminFName varchar(20)
// adminLName varchar(50)
// adminPassword varchar(20)
// adminType varchar(20)
// mainAdminEmail varchar(50)



// amal.gunarathna @gmail.com Amal Gunarathna 12345678
// amashasilva @gmail.com Amasha Silva 12345688
// anushka @gmail.com Anushka Gunawardana 12345678
// chamali @gmailcom Chamali Perera 12345675
// chathura @gmail.com Chathura Silva 12345678
// jayasooriya @gmail.com Nipuni Jayasooriya 12345678
// kalharapn @gmail.com Kalhara Perera 23456789
// lakshani @gmail.com Lakshani galwatta 12345678
// madanayakennw .19 @uom.lk Nipuni Madanayake 1234 madanayakennw .19 @uom.lk
// manojs @gmail.com Manoj Silva 12345678
// pererakg @gmail.com Kalana Perera 12346789
// rahal @gmail.com Rahal Amarasinghe 12345673
// rathnayakakp @gmail.com Kalpana Rathnayaka 12345678
// shanuli @gmail.com Shanuli Perera $2a$10$ini5PujcaSWI7
// vinurab @gmail.com Vinura Basnayaka 12345678




// Table: users
// Columns:
//     email varchar(50) PK
// phone_number varchar(12)