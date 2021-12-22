const fs = require('fs');
//const person = require("./person.js");
const https = require('https');

const server = https.createServer((req, res) => {
    let html = '';

    switch (req.url) {
        case '/':
            html = 'home.html';
            break;
        case '/questions':
            html = 'questions.html';
            break;
        case '/about':
            html = 'about.html';
            break;
        default:
            break;
    }

    if (html) {
        fs.stat(`./${html}`, (err, stats) => {

            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');

            if (stats) {
                fs.createReadStream(html).pipe(res);
            } else {
                res.statusCode = 404;
                res.end('Page not found');
            }
        })
    }
})

server.listen(3000, 'localhost', () => {

    console.log('server is on')
})