const fs = require('fs');
const path = require('path');


class questionData {

    constructor(question, theme, answer, fileSystem, dateModify) {

        this.question = question;
        this.theme = theme;
        this.answer = answer;
        this.fileSystem = fileSystem;
        this.dateModify = dateModify;

    }

    question;
    theme;
    answer;
    fileSystem;
    dateModify;

    getJSON() {

        return JSON.stringify(this.valueOf())
    }
}

console.log(new questionData('question', 'theme', 'answer', 'fileSystem', 'dateModify').getJSON());

getJSON = function () {

    return JSON.stringify(this.valueOf())
}

parseJSON = function (JSONStr) {

    let JSONObj = JSON.parse(JSONStr);
    this.question = JSONObj.question;
    this.theme = JSONObj.theme;
    this.answer = JSONObj.answer;
    this.fileSystem = JSONObj.fileSystem;
    this.dateModify = JSONObj.dateModify;
}

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

parseYAML = function (YAMLStr) {

    let YAMLArr = YAMLStr.split('\n');
    let fileSystemArr = [];

    for (let i = 0; i < YAMLArr.length; i++) {

        let partResult = YAMLArr[i].replace(' ', '').split(':');

        if (partResult[0] === 'question') {

            this.question = partResult[1];

        } else if (partResult[0] === 'theme') {

            this.theme = partResult[1];

        } else if (partResult[0] === 'answer') {

            if (partResult[1] === 'true') {

                this.answer = true;

            } else {

                this.answer = false;
            }
        } else if (partResult[0] === 'fileSystem') {

            for (let j = 1; j < 6; j++) {

                partResult = YAMLArr[i + j].replace('-', '').replaceAll(' ', '');

                if (partResult.includes(':')) {

                    break;

                } else {

                    fileSystemArr.push(partResult);
                }
            }
            this.fileSystem = fileSystemArr;

        } else if (partResult[0] === 'dateModify') {

            this.dateModify = partResult[1];
        }
    }
}

getYAML = function () {

    let JSONObj = this.valueOf();
    let result = ``;

    for (const JSONKey in JSONObj) {

        if (typeof JSONObj[JSONKey] !== "function") {

            if (typeof JSONObj[JSONKey] === "object") {

                let partData = JSONObj[JSONKey]
                let partResult = `${JSONKey}: \n`;

                for (let i = 0; i < partData.length; i++) {

                    partResult += `    - ${partData[i]} \n`
                }
                result += partResult;
            } else {

                result += `${JSONKey}: ${JSONObj[JSONKey]} \n`
            }
        }
    }
    return result;
}