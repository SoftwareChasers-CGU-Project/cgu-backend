require('dotenv').config()
const fs = require('fs')
const S3 = require('aws-sdk/clients/s3')


const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY


const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey,

})


module.exports = {
    async uploadFile(file) {

        try {
            // console.log('inside upload file')
            const fileStream = fs.readFileSync(file.path)
            console.log('fileStream')
            const uploadParams = {
                Bucket: bucketName,
                Key: file.filename,
                Body: fileStream

            }
            console.log('upload params')
            // return s3.upload(fileStream).promise()

            return s3.upload(uploadParams, (err, data) => {
                if (err) {
                    console.log(err)
                }
                console.log(data.Location)
            })



        } catch (e) {
            console.log(e)
        }



    },

    async getFileStream(fileKey) {
        const downloadParams = {
            Key: fileKey,
            Bucket: bucketName
        }

        return s3.getObject(downloadParams).createReadStream();
    }

}

// function uploadFile(file) {
//     const fileStream = fs.createReadStream(file.path)

//     const uploadParams = {
//         Bucket: bucketName,
//         Body: fileStream,
//         Key: file.filename
//     }

//     return s3.upload(uploadParams).promise()

// }


// function getFileStream(fileKey) {
//     const downloadParams = {
//         Key: fileKey,
//         Bucket: bucketName
//     }

//     return s3.getObject(downloadParams).createReadStream()
// }

// exports.getFileStream = getFileStream

// exports.uploadFile = uploadFile