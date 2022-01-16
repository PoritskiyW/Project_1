const fs = require('fs');
const path = require('path');

function writeFiles(data) {
    for(const key in data) {
        switch (key){
            case 'jsonD':
                fs.writeFile(path.join(__dirname, '..', '..', 'data', 'questions.json'), data[key], (e) => {
                    if (e){
                        throw e;
                    }
                });
                break;
            case 'xml':
                fs.writeFile(path.join(__dirname, '..', '..', 'data', 'questions.xml'), data[key], (e) => {
                    if (e){
                        throw e;
                    }
                });
                break;
            case 'yaml':
                fs.writeFile(path.join(__dirname, '..', '..', 'data', 'questions.yaml'), data[key], (e) => {
                    if (e){
                        throw e;
                    }
                });
                break;
            case 'csv':
                fs.writeFile(path.join(__dirname, '..', '..', 'data', 'questions.csv'), data[key], (e) => {
                    if (e){
                        throw e;
                    }
                });
                break;
            case 'dev':
                fs.writeFile(path.join(__dirname, '..', '..', 'data', 'developers.json'), data[key], (e) => {
                    if (e){
                        throw e;
                    }
                });
                break;
        }
    }
}

function writeImages(imageArray, Names) {


}

module.exports = {writeFiles, writeImages};