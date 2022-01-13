const express = require('express');
const path = require('path');
const dataFill = require('./modules/dataFill');
const getData = require('./modules/fileReading');
const postData = require('./modules/fileWriting');
const bodyParser = require('body-parser');

const server = express();
const PORT = process.env.PORT || 3000;

server.use(express.static('../web/dist'));
server.use('/images', express.static('data/images'));
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

server.post('/end', (request, response) => {
    console.log(request.body);
    postData(request.body)
    response.status(200);
    response.end();
})
/*
//handle delete question data
server.delete('/deleteQuestion', (request, response) => {
    deleteQuestion(request.body.id);
    response.status(200);
    response.end();
})
 */

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    dataFill();
});

