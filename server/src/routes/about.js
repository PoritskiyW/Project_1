const express = require('express'); //express added
const path = require('path'); //path added

const router = express.Router(); //initialised router

//handle get request for about.html
router.get('/', (request, response) => {

    response.status(200);
    response.sendFile('');
})

module.exports = router; //exports router