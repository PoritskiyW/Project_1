const fs = require('fs');

//////////////////////////////////////////////////////////////////
//File reading section

function parse(formatStr) {
    let file;
    let result;

    switch (formatStr){
        case 'XML':
            file = fs.readFileSync('./data/questions.xml', 'utf-8');
            break;
        case 'JSON':
            file = fs.readFileSync('./data/questions.json', 'utf-8');
            result = parseJSON(file);
            break;
        case 'YAML':
            file = fs.readFileSync('./data/questions.yaml', 'utf-8');
            break;
        case 'CSV':
            file = fs.readFileSync('./data/questions.csv', 'utf-8');
            result = parseCSV(file);
            break;
    }
    return result;
}

//////////////////////////////////////////////////////////////////
//File writing section

function writeFile(formatArray, jsonData) {
    let file;

    for (let i = 0; i < formatArray.length; i++) {
        switch (formatArray[i]){
            case 'XML':
                file = fs.readFileSync('./data/questions.xml', 'utf-8');
                fs.writeFile('./data/questions.xml', getXML(), (e) => {

                    if(e) {
                        throw e;
                    } else {
                        console.log('success');
                    }
                });
                break;
            case 'JSON':
                file = fs.readFileSync('./data/questions.json', 'utf-8');
                break;
            case 'YAML':
                file = fs.readFileSync('./data/questions.yaml', 'utf-8');
                break;
            case 'CSV':
                file = fs.readFileSync('./data/questions.csv', 'utf-8');
                break;
        }
    }
}

//////////////////////////////////////////////////////////////////
//Function parsers

function parseJSON(file) {
    return JSON.parse(file);
}

function parseCSV(file) {
    const resultArr = [];
    const strArr = file.split('\n');

    for (let i = 1; i < strArr.length - 1; i++) { // 1 для игнора строки с именами полей length - 1 для игнора пустой
        const objBuffer = strArr[i].split(','); // строки (она там есть)
        let partResult = {
            "id": Number.parseInt(objBuffer[0]),
            "question": objBuffer[1],
            "theme": objBuffer[2],
            "answer": objBuffer[3] === 'true',
            "dateModify": Date.parse(objBuffer[4])
        }
        resultArr.push(partResult);
    }
    return JSON.stringify(resultArr);
}

//////////////////////////////////////////////////////////////////
//Function converters

function getCSV(JSONObj) {
    const resultArr = [];

    resultArr.push(JSONObj.id);
    resultArr.push(JSONObj.question);
    resultArr.push(JSONObj.theme);
    resultArr.push(JSONObj.answer);
    resultArr.push(JSONObj.dateModify);

    const result = resultArr.join(',') + '\n';
    fs.appendFile('../../data/questions.csv', result, (e) => {
        if(e){
            throw e;
        }
    })
}

// Для XML

/*<?xml version="1.0" encoding="UTF-8" ?> // Обязательно
<root> //Обязательно
    <questions> //Обязательно
        <question>
            <id>1</id>
            <question>questionAsk1</question>
            <theme>theme1</theme>
            <answer>true</answer>
            <dateModify></dateModify>
        </question>
        <question>
            <id>1</id>
            <question>questionAsk1</question>
            <theme>theme1</theme>
            <answer>true</answer>
            <dateModify></dateModify>
        </question>
        <question>
            <id>1</id>
            <question>questionAsk1</question>
            <theme>theme1</theme>
            <answer>true</answer>
            <dateModify></dateModify>
        </question>
    </questions> //Обязательно
</root>*/ //Обязательно

// Для YAML

/*---
questions: // Тут всегда должен быть идентификатор массива
- id: 1
  question: questionAsk1
  theme: theme1
  answer: 'true'
  dateModify: ''
- id: 1
  question: questionAsk1
  theme: theme1
  answer: 'true'
  dateModify: ''
- id: 1
  question: questionAsk1
  theme: theme1
  answer: 'true'
  dateModify: ''

 Для CSV

 id,questionAsk,theme,answer,dateModify //Тут всегда должна быть строка с параметрами
1,questionAsk1,theme1,true,
1,questionAsk1,theme1,true,
1,questionAsk1,theme1,true,


//При парсе из файла я хочу получить JSON ===>>

{
  "questions": [
    {
      "id": 1,
      "questionAsk": "questionAsk1",
      "theme": "theme1",
      "answer": "true",
      "dateModify": ""
    },
    {
      "id": 1,
      "questionAsk": "questionAsk1",
      "theme": "theme1",
      "answer": "true",
      "dateModify": ""
    },
    {
      "id": 1,
      "questionAsk": "questionAsk1",
      "theme": "theme1",
      "answer": "true",
      "dateModify": ""
    }]}

   // При записи в файл мы из JSON получаем формат представленный выше.
*/



module.exports = parse;
