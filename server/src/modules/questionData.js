const fs = require('fs');

//////////////////////////////////////////////////////////////////
//File reading section

function parse(formatStr) {
    let file;
    let result;

    switch (formatStr) {
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
            break;
    }
    return result;
}


function writeFile(formatArray, jsonData) {
    let file;

    for (let i = 0; i < formatArray.length; i++) {
        switch (formatArray[i]) {
            case 'XML':
                file = fs.readFileSync('./data/questions.xml', 'utf-8');
                fs.writeFile('./data/questions.xml', getXML(), (e) => {

                    if (e) {
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

function parseJSON(file) {
    return JSON.parse(file);
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


// function parseYAML(file) {
//
//     let result = [];
//
//
//     let YAMLArr = file.split('\n');
//     let fileSystemArr = [];
//
//     for (let i = 0; i < YAMLArr.length; i++) {
//         let partResult = YAMLArr[i].replace(' ', '').split(':');
//
//         if (partResult[0] === 'question') {
//             this.question = partResult[1];
//         } else if (partResult[0] === 'theme') {
//             this.theme = partResult[1];
//         } else if (partResult[0] === 'answer') {
//
//             if (partResult[1] === 'true') {
//                 this.answer = true;
//             } else {
//                 this.answer = false;
//             }
//         } else if (partResult[0] === 'fileSystem') {
//             for (let j = 1; j < 6; j++) {
//                 partResult = YAMLArr[i + j].replace('-', '').replaceAll(' ', '');
//
//                 if (partResult.includes(':')) {
//                     break;
//                 } else {
//                     fileSystemArr.push(partResult);
//                 }
//             }
//             this.fileSystem = fileSystemArr;
//
//         } else if (partResult[0] === 'dateModify') {
//             this.dateModify = partResult[1];
//         }
//         return partResult
//     }
// }

getCSV = function () {

    let JSONObj = this.valueOf();
    let appendArr = [];

    for (const JSONKey in JSONObj) {

        if (typeof JSONObj[JSONKey] !== "function") {

            if (typeof JSONObj[JSONKey] !== "object") {

                appendArr.push(JSONObj[JSONKey]);
            } else {

                let partResult = ``;
                partResult += JSONObj[JSONKey];
                let replacedResult = partResult.replace(',', `;`);
                appendArr.push(replacedResult);
            }
        }
    }

    return appendArr.join(',');
}

parseCSV = function (CSVStr) {

    let CSVArr = CSVStr.split(',');

    for (let i = 0; i < CSVArr.length; i++) {

        switch (i) {

            case 0:
                this.question = CSVArr[i];
                break;

            case 1:
                this.theme = CSVArr[i];
                break;

            case 2:

                if (CSVArr[i] === 'true') {

                    this.answer = true;

                } else {

                    this.answer = false;

                }
                break;

            case 3:
                this.fileSystem = CSVArr[i].split(';');
                break;

            case 4:
                this.dateModify = Number.parseInt(CSVArr[i]);
                break;
        }
    }

    return this.valueOf();
}

getXML = function () {
    let JSONObj = this.valueOf();
    let result = `\<questionData\>`;

    for (const JSONKey in JSONObj) {

        if (typeof JSONObj[JSONKey] !== "function") {

            if (typeof JSONObj[JSONKey] === "object") {

                for (let i = 0; i < JSONObj[JSONKey].length; i++) {

                    result += `\<${JSONKey}\>${JSONObj[JSONKey][i]}\<${JSONKey}/\>`;
                }
            } else {
                result += `\<${JSONKey}\>${JSONObj[JSONKey]}\</${JSONKey}\>`
            }
        }
    }
    result += `\</questionData>`
    return result;
}

parseXML = function (XMLStr) {


    /*this.question = JSONObj.question;
    this.theme = JSONObj.theme;
    this.answer = JSONObj.answer;
    this.fileSystem = JSONObj.fileSystem;
    this.dateModify = JSONObj.dateModify;*/
}

function parseYAML(file) {
    const resultArr = [];
    const strArr = file.split('-')

    for(let i = 1; i < strArr.length; i++){
        let obj = {}
        let partResult = strArr[i].split('\n')

        for (let j = 0; j < partResult.length; j++) {
            if (partResult[j] !== '') {
                let stringResult = partResult[j].split(': ')
                if (stringResult[0].replaceAll(' ', '') === 'id') {
                    obj[stringResult[0].replaceAll(' ', '')] = Number.parseInt(stringResult[1])
                } else if (stringResult[0].replaceAll(' ', '') === 'answer') {
                    obj[stringResult[0].replaceAll(' ', '')] = stringResult[1] !== 'false'
                } else if (stringResult[0].replaceAll(' ', '') === 'dateModify') {
                    obj[stringResult[0].replaceAll(' ', '')] = Date.parse(stringResult[1])
                }
                else {
                    obj[stringResult[0].replaceAll(' ', '')] = stringResult[1];
                }
            }
        }
        resultArr.push(obj);
    }
    return JSON.stringify(resultArr)
}

function getYAML(file) { //Предназначена для добавления 1 вопроса в файл
    let JSONObj = file

    let result = `\n- id: ${JSONObj.id}
  question: ${JSONObj.question}
  theme: ${JSONObj.theme}
  answer: ${JSONObj.answer}
  dateModify: ${JSONObj.dateModify}`

    fs.appendFileSync('../../data/questions.yaml', result);
    return result
}

module.exports = {parse, writeFile};