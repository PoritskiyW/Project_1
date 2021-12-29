const fs = require('fs');

function createDataDir() {

    fs.mkdir('./data', (e) => {
        if (!e || (e && e.code !== 'EEXIST')) {

            fs.writeFile('./data/developers.json', `{
  "person": [
    {
      "id": 1,
      "name": "Viacheslav",
      "surname": "",
      "age": 23,
      "sex": "Male",
      "birthday": "October 29, 1998",
      "locations": "Kharkov",
      "hobby": "music, anime, hiking",
      "images": "masyanya-wait.gif"
    },
    {
      "id": 2,
      "name": "Viktoria",
      "surname": "Bereziuk",
      "age": 26,
      "sex": "Female",
      "birthday": "July 20, 1995",
      "locations": "Kharkov",
      "hobby": "Travel, gum, cinema, hiking, music",
      "images": "masyanya-wait.gif"
    },
    {
      "id": 3,
      "name": "Yehor",
      "surname": "",
      "age": 18,
      "sex": "Male",
      "birthday": "July 24, 2003",
      "locations": "Kharkov",
      "hobby": "games, music, reading, technologies",
      "images": "masyanya-wait.gif"
    },
    {
      "id": 4,
      "name": "Vladyslav",
      "surname": "",
      "age": 21,
      "sex": "Male",
      "birthday": "May 2, 2000",
      "locations": "Kharkov",
      "hobby": "MMO games",
      "images": "masyanya-wait.gif"
    }
  ]
}`, (err) => {
                if (err) {
                    throw err;
                }
            });
            fs.writeFile('./data/questions.xml', `<?xml version="1.0" encoding="UTF-8" ?>
<root></root>`, (err) => {
                if (err) {
                    throw err;
                }
            });
            fs.writeFile('./data/questions.yaml', `questions: `, (err) => {
                if (err) {
                    throw err;
                }
            });
            fs.writeFile('./data/questions.csv', '', (err) => {
                if (err) {
                    throw err;
                }
            });
            fs.writeFile('./data/questions.json', `{
  "questions": [
    {
      "id": 1,
      "questionAsk": "questionAsk1",
      "theme": "theme1",
      "answer": "true",
      "dateModify": ""
    }]}`, (err) => {
                if (err) {
                    throw err;
                }
            });
            fs.writeFile('./data/fileSystemThemes.json', `{"fileSystems": [
            ]}`, (err) => {
                if (err) {
                    throw err;
                }
            });
        }
    });
}

module.exports = createDataDir;
