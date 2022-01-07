const fs = require('fs');
const path = require('path');

function getData() {
    const result = {};

    const XMLData = fs.readFileSync(path.join(__dirname, '..', '..', 'data', 'questions.xml'), 'utf-8');
    const JSONData = fs.readFileSync(path.join(__dirname, '..', '..', 'data', 'questions.json'), 'utf-8');
    const YAMLData = fs.readFileSync(path.join(__dirname, '..', '..', 'data', 'questions.yaml'), 'utf-8');
    const CSVData = fs.readFileSync(path.join(__dirname, '..', '..', 'data', 'questions.csv'), 'utf-8');
    const devData = fs.readFileSync(path.join(__dirname, '..', '..', 'data', 'developers.json'), 'utf-8');

    result.xml = XMLData;
    result.jsonD = JSONData;
    result.yaml = YAMLData;
    result.csv = CSVData;
    result.dev = devData;

    return JSON.stringify(result);
}

module.exports = getData;