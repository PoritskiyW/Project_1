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
</root>*/ //Обязательно*/

const JSONTest = {
    "id": 56,
    "question": "questionadasdad1",
    "theme": "themasdasdae1",
    "answer": "trasdasdaue",
    "dateModify": "asdasdasd"
}

function getXML(JSONObj) { //Предназначена для добавления 1 вопроса в XML

    let result = `<item>
    <id>${JSONObj.id}</id>
    <question>${JSONObj.question}</question>
    <theme>${JSONObj.theme}</theme>
    <answer>${JSONObj.answer}</answer>
    <dateModify>${JSONObj.dateModify}</dateModify>
</item>`

    const fileXML = fs.readFileSync('../../data/questions.xml', "utf-8");

    const index = fileXML.lastIndexOf('</questions>') - 1;
    const leftSide = fileXML.slice(0, index + 1);
    const rightSide = fileXML.slice(index + 1, fileXML.length);
    const resultStr = leftSide + result + rightSide;

    fs.writeFile('../../data/questions.xml', resultStr, (e) => {
        if (e) {
            throw e;
        }
    })
}

console.log(parseXML(fs.readFileSync('../../data/questions.xml', "utf-8")));

function parseXML(file) {

    const resultArr = [];

    let bufferStr = file.replaceAll('<?xml version="1.0" encoding="UTF-8" ?>', '');
    bufferStr = bufferStr.replaceAll('<root>', '');
    bufferStr = bufferStr.replaceAll('<questions>', '');
    bufferStr = bufferStr.replaceAll('</questions>', '');
    bufferStr = bufferStr.replaceAll('</root>', '');
    bufferStr = bufferStr = bufferStr.replaceAll('</item>', '');

    const bufferArr = bufferStr.split('<item>');

    for (let i = 1; i < bufferArr.length; i++) {
        let questionObj = {};

        const trimmedObj = bufferArr[i].trim();
        let objArr = trimmedObj.split('\n');
        for (let j = 0; j < objArr.length; j++) {

            if(objArr[j] !== ''){
                const partIndex = objArr[j].indexOf('</')
                let partResult = objArr[j].slice(0, partIndex);
                partResult = partResult.replace('<', '');
                partResult = partResult.replace('>', ':');

                const paramArr = partResult.split(':');
                const paramName = paramArr[0].replaceAll(' ', '');
                const paramValue = paramArr[1];

                if(paramName === 'id'){
                    questionObj[paramName] = Number.parseInt(paramValue);
                } else if(paramName === 'answer') {
                    questionObj[paramName] = paramValue === 'true';
                } else if(paramName === 'dateModify') {
                    questionObj[paramName] = Date.parse(paramValue);
                } else {
                    questionObj[paramName] = paramValue;
                }
            }
        }
        resultArr.push(questionObj);
    }
    return JSON.stringify(resultArr);
}


module.exports = parse;
