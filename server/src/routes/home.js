const express = require('express'); //express added
const path = require("path"); //path added

const router = express.Router(); //initialised router

//handle get request for home.html
router.get('/', (request, response) => {
    response.sendFile(path.resolve(__dirname, './../../../web/dist/views/home.html'));
    response.status(200);
})

//handle get request for developers data
router.get('developers', (request, response) => {
    console.log('request accepted')
})

//handle post request for editing developers data
router.post('/editDeveloper', (request, response) => {
    console.log(request.body);
})


module.exports = router; //exports router