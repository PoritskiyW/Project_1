const fs = require('fs');
const path = require('path');

function writeFiles(data) {
    const XMLData = data.xml;
    const JSONData = data.json;
    const YAMLData = data.yaml;
    const CSVData = data.csv;
    const devData = data.dev;

    //write files here
}

module.exports = writeFiles;