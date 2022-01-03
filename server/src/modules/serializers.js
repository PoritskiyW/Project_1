const fs = require('fs');

//////////////////////////////////////////////////////////////////
//File writing section

function writeFile(formatArray, jsonData) {
    let file;

    for (let i = 0; i < formatArray.length; i++) {
        switch (formatArray[i]) {
            case 'XML':
                getXML(jsonData);
                break;
            case 'JSON':
                file = fs.readFileSync('./data/questions.json', 'utf-8');
                getJSON(jsonData);
                break;
            case 'YAML':
                file = fs.readFileSync('./data/questions.yaml', 'utf-8');
                getYAML(jsonData);
                break;
            case 'CSV':
                file = fs.readFileSync('./data/questions.csv', 'utf-8');
                getCSV(jsonData);
                break;
        }
    }
}

//////////////////////////////////////////////////////////////////
//Function converters

function getJSON(JSONObj) {

    const fileJSON = fs.readFileSync('../../data/questions.json', "utf-8");

    const index = fileJSON.lastIndexOf(']') - 1;
    const leftSide = fileJSON.slice(0, index + 1);
    const rightSide = fileJSON.slice(index + 1, fileJSON.length);
    const resultStr = leftSide + ',' + JSON.stringify(JSONObj) + rightSide;

    fs.writeFile('../../data/questions.json', resultStr, (e) => {
        if (e) {
            throw e;
        }
    })
}


function getCSV(JSONObj) {
    const resultArr = [];

    resultArr.push(JSONObj.id);
    resultArr.push(JSONObj.question);
    resultArr.push(JSONObj.theme);
    resultArr.push(JSONObj.answer);
    resultArr.push(JSONObj.dateModify);

    const result = resultArr.join('|||') + '\n';
    fs.appendFile('../../data/questions.csv', result, (e) => {
        if(e){
            throw e;
        }
    })
}

function getYAML(file) { //Предназначена для добавления 1 вопроса в файл
    let JSONObj = file

    let result = `\n - id: ${JSONObj.id}
  question: ${JSONObj.question}
  theme: ${JSONObj.theme}
  answer: ${JSONObj.answer}
  dateModify: ${JSONObj.dateModify}`

    fs.appendFileSync('../../data/questions.yaml', result);
    return result
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

module.exports = writeFile;