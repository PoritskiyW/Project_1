const fs = require('fs');

//////////////////////////////////////////////////////////////////
//Filter data function

function filter(formatStr, theme) {

    const questionData = parse(formatStr);
    let resultData;

    if (theme !== 'all'){
        resultData = questionData.filter(question => question.theme === theme);
    } else {
        resultData = questionData;
    }
    return JSON.stringify(resultData);
}

//////////////////////////////////////////////////////////////////
//File reading section

function parse(formatStr) {
    let file;
    let result;

    switch (formatStr) {
        case 'XML':
            file = fs.readFileSync(__dirname, '..', '..', 'data', 'questions.xml', 'utf-8');
            result = parseXML(file);
            break;
        case 'JSON':
            file = fs.readFileSync(__dirname, '..', '..', 'data', 'questions.json', 'utf-8');
            result = parseJSON(file);
            break;
        case 'YAML':
            file = fs.readFileSync(__dirname, '..', '..', 'data', 'questions.yaml', 'utf-8');
            result = parseYAML(file);
            break;
        case 'CSV':
            file = fs.readFileSync(__dirname, '..', '..', 'data', 'questions.csv', 'utf-8');
            result = parseCSV(file);
            break;
    }
    return result;
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
        const objBuffer = strArr[i].split('|||'); // строки (она там есть)
        let partResult = {
            "id": Number.parseInt(objBuffer[0]),
            "question": objBuffer[1],
            "theme": objBuffer[2],
            "answer": objBuffer[3] === 'true',
            "dateModify": Date.parse(objBuffer[4])
        }
        resultArr.push(partResult);
    }
    return resultArr;
}

function parseYAML(file) {
    const resultArr = [];
    const strArr = file.split(' -')

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
    return resultArr;
}

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
                partResult = partResult.replace('>', '|||');

                const paramArr = partResult.split('|||');
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
    return resultArr;
}

module.exports = filter;