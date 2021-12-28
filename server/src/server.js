const express = require('express');
const path = require('path');
const cors = require('cors');
const dataFill = require('./modules/dataFill');
//let question = require('./questions.json');
//TODO: Переделать чтение и запись файлов на папку дата + убрать require на файле
const parse = require('./modules/questionData')

const server = express();

const PORT = process.env.PORT || 3000;



/*
//'Access-Control-Allow-Origin'
server.use(cors);

server.get('/', (req, res) => {
    res.sendFile(path.resolve(path.resolve(), 'static', './../../web/dist/views/home.html'));
    res.status(200);
});

server.get('/download', (req, res) => {
    res.download(path.resolve(__dirname, 'static', './../../web/dist/views/home.html'));
    res.status(200);
});

//question
//handle get request for questions.html
server.get('/questions', (request, response) => {
    response.json(question.questions);
    console.log('request questions');
})
server.use(express.json());
//handle post request to add question
server.post('/addQuestion', (request, response) => {
    const addQuestion = {
        id: question.questions.length + 1,
        questionAsk: request.body.questionAsk,
        theme: request.body.theme,
        answer: request.body.boolean,
        fileSystem: request.body.fileSystem,
        dateModify: new Date() //Дату добавлять на фронте и передавать в JSON на бэк
    };
    question.questions.push(addQuestion);
    console.log(request.body);
    return response.json(addQuestion);
});

//handle delete question data
server.delete('/deleteQuestion', (request, response) => {
    const index = question.questions.findIndex(el => el.id);
    if (index >= 0) {
        const el = question.questions[index];
        question.questions.splice(index, 1);
        response.json(el);
        response.end();
    } else {
        response.status(404);
        response.end();
    }
})*/

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    dataFill();
});

