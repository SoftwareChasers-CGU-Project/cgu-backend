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

    app.get('/image-album/:album_Id', async(req, res) => {
        try {
            const Id = req.params.album_Id;
            const album = await AlbumService.viewAlbum(Id);
            if (album) {
                return res.status(200).send(
                    album
                )
            }
        } catch (error) {
            console.log(error, "error");
        }
    })

// -------------------------------------------------------------------

app.delete('/image-album/:album_Id', async(req, res) => {
        try {
            console.log(`delete called`)
            const Id = req.params;
            console.log('Id ');
            console.log(Id);
            // console.log(`hi`)
            const deleteData = await AlbumService.deleteAlbum(Id);
            if (deleteData) {
                console.log(`delete called`)
                console.log('Image album deleted');
                return res.status(200).send({})
            }
        } catch (error) {
            //  handle errors here
            console.log(error, "error!!");
        }
    }),


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


app.put('/image-album/:albumId', async(req, res) => {
    try {
        console.log(req.body);
        const albumId = req.params.albumId;
        const albumName = req.body.name;
        const albumDesc = req.body.description;
        console.log(albumId);
        // console.log(album_id);
        if (!req.body) {
            return "Please pass all required fields!"
        }
        const dataToSave = { albumName, albumDesc, albumId };
        let updateAlbum = await AlbumService.updateAlbum(dataToSave);
        if (updateAlbum) {
            return res.status(200).send(updateAlbum)
        }
    } catch (error) {
        console.log(error, "error ");
    }

})






// app.listen("3000", () => {

//   console.log("Server started on port 3000");

// });

module.exports.handler = serverless(app);