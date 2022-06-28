const serverless = require('serverless-http');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer({ dest: 'uploads' })
const fs = require('fs');
const util = require('util');
const unlinkFile = util.promisify(fs.unlink);

const { v4: uuidv4 } = require('uuid');
uuidv4();
const AlbumService = require('../Services/image-album');



const { uploadFile, getFileStream } = require('../Services/aws-s3')


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// const headerOptions = { headers: { Accept: 'application/json' } }

app.get('/image-album/', async(req, res) => {
        try {sachiniExternal/userController.js

            const allAlbums = await AlbumService.getListOfAlbums();
            const albumData = await allAlbums;


            if (albumData) {
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


app.delete('/image-album/:album_Id', async(req, res) => {
        try {
            const Id = req.params;
            const deleteData = await AlbumService.deleteAlbum(Id);
            if (deleteData) {
                return res.status(200).send({})
            }
        } catch (error) {
            console.log(error, "error!!");
        }
    }),



    app.post('/image-album/', async(req, res) => {
        try {

            const data = req.body;

            const { name, description, createdDate, albumLink } = data;

            if (!data) {
                return "Please pass all required fields!"
            }
            const dataToSave = { album_id: uuidv4(), name, description, createdDate, albumLink };
            let createAlbum = await AlbumService.createAlbum(dataToSave);
            if (createAlbum) {
                return res.status(200).send(
                    createAlbum
                )

            }
        } catch (error) {
            console.log(error, "error!!");
        }

    })


app.put('/image-album/:albumId', async(req, res) => {
    try {
        const albumId = req.params.albumId;
        const albumName = req.body.name;
        const albumDesc = req.body.description;
        const createdDate = req.body.createdDate;
        const albumLink = req.body.albumLink;
        if (!req.body) {
            return "Please pass all required fields!"
        }
        const dataToSave = { albumName, albumDesc, albumId, createdDate, albumLink };
        let updateAlbum = await AlbumService.updateAlbum(dataToSave);
        if (updateAlbum) {
            return res.status(200).send(updateAlbum)
        }
    } catch (error) {
        console.log(error, "error ");
    }

})


app.post('/image-album/upload', upload.single('file'), async(req, res) => {
    const file = req.file;
    const result = await uploadFile(file);
    this.res.error.retryable = true;
    await unlinkFile(file.path);
    const info = req.body;
    res.send({ imagePath: `/image-album/upload/${result.Key}` })
})

app.get('/image-album/upload/:key', (req, res) => {
    const key = req.params.key;
    const readStream = getFileStream(key);

    readStream.pipe(res)
})


module.exports.handler = serverless(app);