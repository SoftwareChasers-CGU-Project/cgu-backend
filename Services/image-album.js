// const Product = require('../Model/products');
// const mysql= require ('serverless-mysql');
const mysql = require('../dbconfig');



module.exports = {
    async createAlbum(product) {
        // let result = await mysql.query(`SELECT * from products`);
        // console.log(`inserting` + product)
        let sql = "INSERT INTO Album SET ?";

        let result = mysql.query(sql, product, (err) => {

            if (err) {

                throw err;

            }

        });

        if (result) {
            console.log(result)
            return {
                data: product,

                message: "Album successfully created!"
            };
        }
        return "Error creating new album"

    },


    async getListOfAlbums() {
        // let sql ="SELECT * from products";

        let result = await mysql.query({
            sql: 'SELECT * FROM Album',
            timeout: 10000,
            values: ['serverless']
        })

        // let result =  mysql.query(sql, (err) => {

        //   if (err) {

        //     throw err;

        //   }


        // });


        if (result) {
            // console.log("getAllProducts called")
            return result;
        }

        return "Error fetching albums from db"
    },
    // if(product)  return product;
    // return "Error fetching products from db"
    // }



    // ----------------------------------------------------------------------------

    async deleteAlbum(product) {

        let sql = "DELETE FROM Album WHERE album_id = ?";

        let result = mysql.query(sql, product, (err) => {

            if (err) {

                throw err;

            }

        });

        if (result) {
            console.log(result)
            return {
                data: product,

                message: "Album deleted"
            };
        }
        return "Error deleting album"

    },

    // -------------------------------------------------------


    // async getProductById(productId)  {
    //   let product = await Product.findOne(productId);
    //   if(product) return product;
    //   return "Error fetching product from db";
    // },
};