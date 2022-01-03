const fs = require('fs');

function deleteQuestion(id) {
    const connectionFile = JSON.parse(fs.readFileSync('./data/idFileSystems.json', 'utf-8'));

    if(connectionFile.json.includes(id)){
        deleteQuestionJSON(id);
    } else if(connectionFile.xml.includes(id)) {
        deleteQuestionXML(id);
    } else if(connectionFile.yaml.includes(id)) {
        deleteQuestionYaml(id);
    } else if(connectionFile.csv.includes(id)) {
        deleteQuestionCSV(id);
    }
}

function deleteQuestionJSON(id) {
    const file = fs.readFileSync('./data/questions.json', 'utf-8');
    let bufferData = JSON.parse(file);
    let resultData = [];

    for (let i = 0; i < bufferData.length; i++) {
        if (bufferData[i].id !== id){
            resultData.push(bufferData[i]);
        }
    }
    fs.writeFile('./data/questions.json', JSON.stringify(resultData), (err) => {
        if (err) {
            throw err;
        }
    })
}

function deleteQuestionXML(id) {

    const file = fs.readFileSync('./data/questions.xml', 'utf-8');
    let bufferStr = file.replaceAll('<?xml version="1.0" encoding="UTF-8" ?>', '');
    bufferStr = bufferStr.replaceAll('<root>', '');
    bufferStr = bufferStr.replaceAll('<questions>', '');
    bufferStr = bufferStr.replaceAll('</questions>', '');
    bufferStr = bufferStr.replaceAll('</root>', '');
    bufferStr = bufferStr.replaceAll('</item>', '');

    let bufferArr = bufferStr.split('<item>');
    let newFileText = `<?xml version="1.0" encoding="UTF-8" ?>
    \t<root>
    \t\t<questions>`;

    for (let i = 0; i < bufferArr.length; i++) {
        if(!bufferArr[i].includes(`<id>${id}</id>>`)) {
            newFileText = newFileText + `<item>${bufferArr[i]}</item>`
        }
    }
    newFileText = newFileText + '\t</root>\n' + '\t\t</questions>';

    fs.writeFile('./data/questions.xml', newFileText, (err) => {
        if (err) {
            throw err;
        }
    })
}

function deleteQuestionYaml(id) {

    const file = fs.readFileSync('./data/questions.yaml', 'utf-8');
    let bufferArr = file.split(' -');
    let newFileText = `questions: \n`

    for (let i = 1; i < bufferArr.length; i++) {
        if(!bufferArr[i].includes(`id: ${id}`)){
            newFileText = newFileText + ` -${bufferArr[i]}\n`
        }
    }
    fs.writeFile('./data/questions.yaml', newFileText, (err) => {
        if (err) {
            throw err;
        }
    })
}

function deleteQuestionCSV(id) {
    const file = fs.readFileSync('./data/questions.csv', 'utf-8');
    let bufferArr = file.split('\n');
    let newFileText = 'id|||question|||theme|||answer|||dateModify\n'

    for (let i = 0; i < bufferArr.length; i++) {
        if(!bufferArr[i].includes(id)){
            newFileText = newFileText + bufferArr[i] + '\n';
        }
    }
    fs.writeFile('./data/questions.csv', newFileText, (err) => {
        if (err) {
            throw err;
        }
    })
}

module.exports = deleteQuestion;