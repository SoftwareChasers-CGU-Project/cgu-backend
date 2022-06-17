const serverless = require('serverless-http');
// require('dotenv').config()

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
uuidv4();

//const mysql = require('../dbconfigs');
const AlbumService = require('../Services/image-album');




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/image-album/', async(req, res) => {
        try {
            // await dbConnection();
            const allAlbums = await AlbumService.getListOfAlbums();
            const albumData = await allAlbums;
            //console.log(hi)

            if (albumData) {
                console.log(`get called`)
                return res.status(200).send({
                    data: albumData
                })
            }
        } catch (error) {
            //  handle errors here
            console.log(error, "error!!");
        }


    }),

    // -------------------------------------------------------------------

    app.delete('/image-album/:album_Id', async(req, res) => {
        try {
            console.log(`delete called`)
            const Id = req.params.album_id;
            console.log(Id);
            // console.log(`hi`)
            const deleteData = await AlbumService.deleteAlbum(Id);
            if (deleteData) {
                console.log(`delete called`)
                return res.status(200).send({})
            }
        } catch (error) {
            //  handle errors here
            console.log(error, "error!!");
        }
    }),

    // -----------------------------------------------------------
    // app.post("/", (req, res) => {

    // let post = { name: "Jake Smith", description: "Chief Executive Officer" };
    // const data  = req.body;
    // const {ProductName} = data;
    // const dataToSave = {ProductName,Id:uuidv4()};
    // if(!data) {
    //    return "Please pass all required fields!"
    // }


    // let sql = "INSERT INTO products SET ?";

    // let query = mysql.query(sql, dataToSave, (err) => {

    // let sql = `INSERT INTO products (Id, ProductName) values (dataToSave`;

    // let query = mysql.query(sql, (err) => {

    //     if (err) {

    //       throw err;

    //     }

    //     if (query) {
    //       return res.status(200).send({
    //         data: query
    //       })
    //     }

    //   });

    // });

    //  function for creating a new product
    data = require("../Model/image-album")
app.post('/image-album/', async(req, res) => {
    try {
        //  await dbConnection();
        const data = req.body;
        // const { name } = data;
        const { name, description } = data;
        console.log(description)
            // const { productId } = data;
        if (!data) {
            return "Please pass all required fields!"
        }
        const dataToSave = { album_id: uuidv4(), name, description, };
        let createAlbum = await AlbumService.createAlbum(dataToSave);
        if (createAlbum) {
            return res.status(200).send(
                createAlbum
            )
        }
    } catch (error) {
        //  handle errors here
        console.log(error, "error!!");
    }

})









// app.listen("3000", () => {

//   console.log("Server started on port 3000");

// });

module.exports.handler = serverless(app);