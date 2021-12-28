const fs = require('fs');

function createDataDir() {

    fs.mkdir('./data', (e) => {
        if(!e || (e && e.code !== 'EEXIST')){

            fs.writeFile('./data/developers.json', `{"developers": [
            ]}`, (err) => {
                if(err) {
                    throw err;
                }
            });
            fs.writeFile('./data/questions.xml', `<?xml version="1.0" encoding="UTF-8" ?>
<root></root>`, (err) => {
                if(err) {
                    throw err;
                }
            });
            fs.writeFile('./data/questions.yaml', `questions: `, (err) => {
                if(err) {
                    throw err;
                }
            });
            fs.writeFile('./data/questions.csv', '', (err) => {
                if(err) {
                    throw err;
                }
            });
            fs.writeFile('./data/questions.json', `{"questions": [
            ]}`, (err) => {
                if(err) {
                    throw err;
                }
            });
            fs.writeFile('./data/fileSystemThemes.json', `{"fileSystems": [
            ]}`, (err) => {
                if(err) {
                    throw err;
                }
            });
        }
    });
}

module.exports = createDataDir;
