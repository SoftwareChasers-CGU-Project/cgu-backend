const mysql = require('../dbconfig');


module.exports = {
    async createAlbum(product) {

        let sql = "INSERT INTO Album SET ?";

        let result = mysql.query(sql, product, (err) => {

            if (err) {

                throw err;

            }

        });

        if (result) {
            return {
                data: product,

                message: "Album successfully created!"
            };
        }
        return "Error creating new album"

    },


    async getListOfAlbums() {


        let result = await mysql.query({
            sql: 'SELECT * FROM Album',
            timeout: 10000,
            values: ['serverless']
        })
        if (result) {
            return result;
        }

        return "Error fetching albums from db"
    },

    async viewAlbum(Id) {
        let sql = `SELECT * FROM Album WHERE album_Id=?`;
        console.log(sql)
        let result = mysql.query(sql, Id);
        console.log(sql)
        if (result) {
            return result;
        }

        return "Error fetching albums from db"
    },




    async deleteAlbum(Id) {
        let sql = "DELETE FROM Album WHERE ?";
        let result = await mysql.query(sql, Id);

        if (result) {
            return result;
        }
        return "Error deleting album from db"
    },

    async updateAlbum(Album) {
        var sql = `UPDATE Album SET name = '${Album.albumName}', createdDate = '${Album.createdDate}', description = '${Album.albumDesc}' , albumLink = '${Album.albumLink}'WHERE album_Id= '${Album.albumId}' `;


        let result = mysql.query(sql, (err) => {
            if (err) {
                throw err;
            }
        });
        if (result) {
            return {
                data: Album,
                message: "Album updated successfully"
            }
        }
        return "Error updating the album"
    }

};