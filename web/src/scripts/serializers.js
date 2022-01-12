function getCSV(data) {
    let result = 'id|||question|||theme|||answer|||dateModify\n'

    for (let i = 0; i < data.length; i++) {
        const resultArr = [];
        const partialData = data[i];
        resultArr.push(partialData.id);
        resultArr.push(partialData.question);
        resultArr.push(partialData.theme);
        resultArr.push(partialData.answer);
        resultArr.push(partialData.dateModify);
        const resultStr = resultArr.join('|||') + '\n';
        result = result + resultStr;
    }
    return result;
}

function getYAML(data) {
    let result = '---\nquestions: \n'

    for (let i = 0; i < data.length; i++) {
        const partialResult = data[i];
        const resultBlock = `\n - id: ${partialResult.id}
           question: ${partialResult.question}
           theme: ${partialResult.theme}
           answer: ${partialResult.answer}
           dateModify: ${partialResult.dateModify}`
        result = result + resultBlock;
    }
    return result;
}

function getXML(data) { //Предназначена для добавления 1 вопроса в XML
    let result = `<?xml version="1.0" encoding="UTF-8" ?>
      <root>
      <questions>`

    for (let i = 0; i < data.length; i++) {
        const partialResult = data[i];
        let resultBlock = '\n' + `    <item>
      <id>${partialResult.id}</id>
      <question>${partialResult.question}</question>
      <theme>${partialResult.theme}</theme>
      <answer>${partialResult.answer}</answer>
      <dateModify>${partialResult.dateModify}</dateModify>
    </item>`
        result = result + resultBlock;
    }
    result = result + `</questions></root>`;
    return result;
}