function parseCSV(obj) {
    const result = {};
    const resultArr = [];
    const strArr = obj.split('\n');

    for (let i = 1; i < strArr.length - 1; i++) { // 1 для игнора строки с именами полей length - 1 для игнора пустой
        const objBuffer = strArr[i].split('|||'); // строки (она там есть)
        let partResult = {
            "id": Number.parseInt(objBuffer[0]),
            "question": objBuffer[1],
            "theme": objBuffer[2],
            "answer": objBuffer[3] === 'true',
            "dateModify": objBuffer[4]
        }
        resultArr.push(partResult);
    }
    result.questions = resultArr;
    return result;
}

function parseYAML(obj) {
    const result = {};
    const resultArr = [];
    const strArr = obj.split(' -')

    for(let i = 1; i < strArr.length; i++){
        let obj = {}
        let partResult = strArr[i].split('\n')

        for (let j = 0; j < partResult.length; j++) {
            if (partResult[j] !== '') {
                let stringResult = partResult[j].split(': ');
                const key = stringResult[0].replaceAll(' ', '');
                const value = stringResult[1].trim();
                if (stringResult.length > 1){
                    if (key === 'id') {
                        obj[key] = Number.parseInt(value);
                    } else if (key === 'answer') {
                        obj[key] = value !== 'false';
                    } else {
                        obj[key] = value;
                    }
                }
            }
        }
        resultArr.push(obj);
    }
    result.questions = resultArr;
    return result;
}

function parseXML(obj) {
    const result = {};
    const resultArr = [];

    let bufferStr = obj.replaceAll('<?xml version="1.0" encoding="UTF-8" ?>', '');
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
                } else {
                    questionObj[paramName] = paramValue;
                }
            }
        }
        resultArr.push(questionObj);
    }
    result.questions = resultArr;
    return result;
}

// module.exports = {
//     parseCSV,
//     parseYAML,
//     parseXML
// }