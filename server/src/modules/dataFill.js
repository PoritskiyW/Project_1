const fs = require('fs');

function createDataDir() {

    fs.mkdir('./data', (e) => {
        if (!e || (e && e.code !== 'EEXIST')) {
            fs.writeFile('./data/developers.json', `{
  "person": [
    {
      "id": 1,
      "name": "Viacheslav",
      "surname": "Poritskiy",
      "age": 23,
      "sex": "Male",
      "birthday": "1998-10-29",
      "locations": "Kharkov",
      "hobby": "music, anime, hiking",
      "images": "Viacheslav.jpg"
    },
    {
      "id": 2,
      "name": "Viktoria",
      "surname": "Bereziuk",
      "age": 26,
      "sex": "Female",
      "birthday": "1995-07-20",
      "locations": "Kharkov",
      "hobby": "Travel, gum, cinema, hiking, music",
      "images": "Viacheslav.jpg"
    },
    {
      "id": 3,
      "name": "Yehor",
      "surname": "Antonow",
      "age": 18,
      "sex": "Male",
      "birthday": "2003-07-24",
      "locations": "Kharkov",
      "hobby": "games, music, reading, technologies",
      "images": "Viacheslav.jpg"
    },
    {
      "id": 4,
      "name": "Vladislav",
      "surname": "Spirin",
      "age": 21,
      "sex": "Male",
      "birthday": "2000-05-02",
      "locations": "Kharkov",
      "hobby": "MMO games",
      "images": "Viacheslav.jpg"
    }
  ]
}`, (err) => {
                    if (err) {
                        throw err;
                    }
                });
            fs.writeFile('./data/questions.xml', `<?xml version="1.0" encoding="UTF-8" ?>
<root>
</root>`, (err) => {
                if (err) {
                    throw err;
                }
            });
            fs.writeFile('./data/questions.yaml', `---\nquestions: \n`, (err) => {
                if (err) {
                    throw err;
                }
            });
            fs.writeFile('./data/questions.csv', 'id|||question|||theme|||answer|||dateModify\n',
                (err) => {
                if (err) {
                    throw err;
                }
            });
            fs.writeFile('./data/questions.json', `{
  "questions": [
    {
      "id": 1,
      "question": "question",
      "theme": "theme1",
      "answer": "true",
      "dateModify": ""
    }]}`, (err) => {
                if (err) {
                    throw err;
                }
            });
            fs.mkdir('./data/images', (e) => {
                if (e) {
                    throw e;
                }
            });
        }
    });
}

module.exports = createDataDir;
