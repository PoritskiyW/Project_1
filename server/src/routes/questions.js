const express = require('express'); //express added
const path = require('path'); //path added

const router = express.Router(); //initialised router

//handle get request for questions.html
router.get('/', (request, response) => {

    response.status(200);
    response.sendFile(path.join(__dirname, 'views', 'questions.html'));
})

//handle get request for questions data
router.get('/questionsFiltered', (request, response) => {

    console.log('request accepted');
})

//handle post request to add question
router.post('/addQuestion', (request, response) => {

    console.log(request.body);
})

//handle post request to edit question data
router.post('/editQuestion', (request, response) => {

    console.log(request.body);
})

router.delete('/deleteQuestion', (request, response) => {

    console.log(request.body);
})

module.exports = router; //exports router