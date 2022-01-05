const express = require('express');
const path = require('path');
const dataFill = require('./modules/dataFill');
const filter = require('./modules/parsers');
const writeFile = require('./modules/serializers');
const deleteQuestion = require('./modules/deleteQuestion');
const generateUID = require('./modules/UIDgeneration');
const developersData = require('./modules/developersData');
//const CORS = require('cors');

const server = express();

const PORT = process.env.PORT || 3000;
//server.use(CORS);

server.use(express.static('../web/dist'));
//Respond to request with index.html
server.get('/', (req, response) => {
    response.sendFile(path.resolve(path.resolve(), 'static', './../../web/dist/home.html'));
    response.status(200);
});

//Respond to get request with developers.json
server.get('/home', (req, response) => {
    response.json(developersData());
    response.status(200);
    response.end();
})
//server.patch()

//Respond to get request with filtered questions in json view
//Request has to contain theme and file system in body (json)
server.post('/questions', (request, response) => {
    response.json(filter(request.body.filters.fileSystem, request.body.filters.theme));
    console.log(response)
    console.log(request)
    response.status(200);
    response.end();
})

//Add question in file systems
//Request has to contain question data
server.post('/addQuestion', (request, response) => {
    request.body.question.id = generateUID();
    writeFile(request.body.fileSystem, request.body.question) /* question{asdnljaslabfLIUFDLABDu} filters => (file system)*/
    response.status(200);
    response.end();
});

//handle delete question data
server.delete('/deleteQuestion', (request, response) => {
    deleteQuestion(request.body.id);
    response.status(200);
    response.end();
})

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    dataFill();
});

