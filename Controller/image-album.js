const serverless = require('serverless-http');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer')
const { v4: uuidv4 } = require('uuid');
uuidv4();
const AlbumService = require('../Services/image-album');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, '/uploads');
    },
    filename: function(req, file, callback) {
        callback(null, file.fieldname);
    }
});

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
            // console.log('Id ');
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


    // data = require("../Model/image-album")
    app.post('/image-album/', async(req, res) => {
        try {
            //  await dbConnection();
            const data = req.body;
            // const { name } = data;
            const { name, description, createdDate } = data;
            console.log(description)
                // const { productId } = data;
            if (!data) {
                return "Please pass all required fields!"
            }
            const dataToSave = { album_id: uuidv4(), name, description, createdDate };
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
        const createdDate = req.body.createdDate;
        console.log(albumId);
        // console.log(album_id);
        if (!req.body) {
            return "Please pass all required fields!"
        }
        const dataToSave = { albumName, albumDesc, albumId, createdDate };
        let updateAlbum = await AlbumService.updateAlbum(dataToSave);
        if (updateAlbum) {
            return res.status(200).send(updateAlbum)
        }
    } catch (error) {
        console.log(error, "error ");
    }

})





module.exports.handler = serverless(app);