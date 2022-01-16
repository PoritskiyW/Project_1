const express = require('express');
const path = require('path');
const dataFill = require('./modules/dataFill');
const getData = require('./modules/fileReading');
const cleanImage = require('./modules/deleteFiles');
const {writeImages, writeFiles} = require('./modules/fileWriting');
const bodyParser = require('body-parser');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './data/images')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({ storage: storage })


const server = express();
const PORT = process.env.PORT || 3000;

server.use(express.static('../web/dist'));
server.use('/images', express.static('data/images'));
//server.use('/uploads', express.static('data/images'));
server.use(bodyParser.json());

//Respond to request with index.html
server.get('/', (req, response) => {
    response.sendFile(path.resolve(path.resolve(), 'static', './../../web/dist/home.html'));
    response.status(200);
});

server.get('/init', (request, response) => {
    response.json(getData());
    response.status(200);
    response.end();
})

server.post('/images*', upload.array('file', 4), function (req, res, next) {
    res.status(200)
    res.end();
    cleanImage();
})

server.post('/end', (request, response) => {
    writeFiles(request.body)
    response.status(200);
    response.end();
})

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    dataFill();
});

