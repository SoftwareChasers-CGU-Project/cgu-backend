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



// : undergraduates
// Columns:
//     email varchar(50) PK
// undergradFName varchar(20)
// undergradLName varchar(50)
// batch varchar(20)
// faculty varchar(30)
// undergradPassword varchar(20)



// 1234
// chamali @gmailcom Sashini Dawpadi batch 19 Information Technology Daw @1999
// dawpadis .19 @uom.lk Sashini Dawpadi 19 IT 5532
// fernand0szp .18 @uom.lk Supipi Fernando 18 IT 12345678
// fernandizp .19 @uom.lk Zenith Fernando 19 IT 34567895
// fernandoke .19 @uom.lk Samlka Fernando 19 IT 56784567
// galwattabln .19 @uom.lk Lakshani Galwatta 19 IT 4567
// galwattaks .16 @uom.lk Kalani Galwatta 16 IT 11223344
// gamagenrsd .19 @uom.lk Nisal Gamage 19 IT 12345678
// gamalth @gmail.com Nipuni Gmalath 19 Information Technology 12345678
// gunadas .18 @uom.lk Kalidu Gunadasa 19 IT 12345678
// gunadasam .18 @uom.lk Malidu Gunadasa 19 IT 12345677
// gunarathnasjp .19 @uom.lk Hashini Gunarathna 19 IT 12344567
// gunasinghennp .18 @uom.lk Nirmal Gunasinghe 18 IT 12345678
// gunawardana @gmail.com Nipunsala Gunawardana 19 IT 12345678
// madanayakennw .19 @uom.lk Nipuni Madanayake 19 Information Technology 12345678
// niroda @gmail.com Niroda Fernando 19 IT 23456789
// pererac .18 @uom.lk Chathuri Perera 18 IT 23456789
// pereradh .19 @uom.lk Dilshan Perera 19 IT 12345678
// pererahm .19 @uom.lk Himesha Perera 19 IT 34567890
// pererakkv .19 @uom.lk Kamala Perera 19 IT 56785678
// pereraksp .17 @uom.lk Kasuni Perera 17 IT $2a$10$6h38zUgDiJJsS
// pererasdf @uom.lk Snuri Perera 19 IT 56784567
// pererash .17 @uom.lk Sarani Perera 17 IT $2a$10$wdrnaEE1kfU8K
// pererasuj .19 @uom.lk Sanjana Perera 19 IT 56784567
// priyasadrt @gmail.com Kaushalya Priyasad 19 IT 12345678
// priyasadsd .19 @uom.lk Sanudrie Priyasad 19 IT 67853569
// ranasingherk .18 @uom.lk Samakya Ranasinghe 19 IT 12345678
// rathnayakas .19 @uom.lk Supunsala Rathnayaka 19 IT 12345678
// rathnayakasn .19 @uom.lk Sudantha Rathnayaka 19 IT 12345678
// wanigasuriyassp .17 @uom.lk Sajana wanigasuriya 17 IT 12345678
// weerasekarakp .19 @uom.lk Kasuni Weerasuriya 19 IT 12345678
// wijesignhawdp .19 @uom.lk Prabashi Wijesingha 19 IT 1234









// users

// amal.gunarathna @gmail.com 0775678345
// amarasingheblkg .19 @uom.lk 0779836247
// amarasinghekka .18 @uom.lk 0779836247
// amarasinghekp .19 @uom.lk 0779836247
// amarasinghes .20 @uom.lk 0756745789
// amasha2 @gmail.com 0779836247
// amashasilva @gmail.com 07756452349
// anushka @gmail.com 07756784567
// chamali @gmailcom 0775678546
// chathura @gmail.com 07756453456
// dawpadis .19 @uom.lk 0773528338
// fernand0szp .18 @uom.lk 0779836247
// fernandizp .19 @uom.lk 0779836247
// fernandok .19 @uom.lk 0779836247
// fernandoke .19 @uom.lk 0779836247
// fernandosk .19 @uom.lk 0779836247
// galwattabln .19 @uom.lk
// galwattaks .16 @uom.lk 0775678452
// gamagenrsd .19 @uom.lk 0779836247
// gamages .19 @uom.lk 0779836247
// gamalth @gmail.com 1234567890
// gamlathpp .19 @uom.lk 0779836247
// geethikak .19 @uom.lk 0779836247
// gunadas .18 @uom.lk 07756783456
// gunadasam .18 @uom.lk 07756345834
// gunarathna .20 @uom.lk 0779836247
// gunarathnakjp1 .17 @uom.lk 0779836247
// gunarathnakpj .17 @uom.lk 0779836247
// gunarathnannp .19 @uom.lk 0779836247
// gunarathnarrt .19 @uom.lk 0779836247
// gunarathnasjp .19 @uom.lk 0779836247
// gunarathnaty .19 @uom.lk 0779836247
// gunasinghennp .18 @uom.lk 0779836247
// gunawardana @gmail.com 07756456789
// jayasooriya @gmail.com 1234567890
// kalharapn @gmail.com 07789567845
// kalharas .19 @uom.lk 0779836247
// lakshani @gmail.com 0112345666
// madanayakennw .19 @uom.lk 0779836247
// manojs @gmail.com 07767456786
// nimasha @gmail.com 0779836247
// nimasha1 @gmail.com 0779836247
// niroda @gmail.com 0779836247
// per
// pereraakm .19 @uom.lk 0779836247
// pererac .18 @uom.lk 0779836247
// pereradh .19 @uom.lk 0779836247
// pererahm .19 @uom.lk 0779836247
// pererak @uom.lk 07745687456
// pererakg @gmail.com 0753465768
// pererakkp @uom.lk 0779836247
// pererakkv .19 @uom.lk 0774598346
// pererakn .19 @uom.lk 0779836247
// pererakpk @uom.lk 0779836247
// pereraks @uom.lk 0779836247
// pereraksp .17 @uom.lk 0775645345
// pereran .19 @uom.lk 0779836247
// pereranmp .19 @uom.lk 0779836247
// pererannprf .19 @uom.lk 0779836247
// pererasdf @uom.lk 0779836247
// pererash .17 @uom.lk 0779836247
// pererask @uom.lk 0779836247
// pererasuj .19 @uom.lk 0779836247
// priyasadrt @gmail.com 0779836247
// priyasadsd .19 @uom.lk 0779836247
// rahal @gmail.com 0779836345
// ranasingherk .18 @uom.lk 0779836247
// rathnayakakp @gmail.com 0775687645
// rathnayakas .19 @uom.lk 0779836247
// rathnayakasn .19 @uom.lk 07756789568
// shanuli @gmail.com 0775678654
// silvan .18 @uom.lk 0779836247
// silvanpp .19 @uom.lk 0779836247
// siriwardana .19 @uom.lk 0779836247
// siriwardanadfg .19 @uom.lk 0779836247
// vinurab @gmail.com 0775645234
// wanigasuriyassp .17 @uom.lk 0779836247
// weerasekarakp .19 @uom.lk 07756783456
// wijesignhawdp .19 @uom.lk 0779836247