function addListener (id, eventType, callback){
    const node = document.getElementById(id);
    if (node){
        node.addEventListener(eventType, callback);
    }
}

function route(id) {
    //get all pages + our page from argument
    setNodeHidden('page-home', true);
    setNodeHidden('page-questions', true);
    setNodeHidden('page-about', true);
    setNodeHidden(id, false);
}

function setNodeHidden(id, value) {
    const node = document.getElementById(id);
    if (node) {
        node.hidden = value;
        return true;
    }
    return false;
}

function setNodeValue(id, value) {
    const node = document.getElementById(id);
    if (node) {
        node.value = value;
        return true;
    }
    return false;
}

function getNodeValue(id) {
    const node = document.getElementById(id);
    if (node){
        return node.value;
    }
    return '';
}

//POST REQUEST FUNCTION
function postData(url = '/end', data = {}) {
    const response = fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return response.json();
}

//GET REQUEST FUNCTION
function getData() {
    fetch('/init')
        .then((response) => response.json())
        .then(function (data) {
            fillState(JSON.parse(data));
        })
        .catch(function (error){
            console.log(error);
        })
}

function fillState (obj) {
    obj.jsonD = parseJSON(obj.jsonD);
    obj.csv = parseCSV(obj.csv);
    obj.yaml = parseYAML(obj.yaml);
    obj.xml = parseXML(obj.xml);
    obj.dev = parseJSON(obj.dev);

    init(obj);
}
///////////////////////////////////////////////////////////////////
//get data parsed area
function parseJSON(obj) {
    return JSON.parse(obj);
}

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
            "dateModify": Date.parse(objBuffer[4])
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
                if (stringResult.length > 1){
                    if (stringResult[0].replaceAll(' ', '') === 'id') {
                        obj[stringResult[0].replaceAll(' ', '')] = Number.parseInt(stringResult[1]);
                    } else if (stringResult[0].replaceAll(' ', '') === 'answer') {
                        obj[stringResult[0].replaceAll(' ', '')] = stringResult[1] !== 'false';
                    } else if (stringResult[0].replaceAll(' ', '') === 'dateModify') {
                        obj[stringResult[0].replaceAll(' ', '')] = Date.parse(stringResult[1]);
                    }
                    else {
                        stringResult[1] = stringResult[1].trim();
                        obj[stringResult[0].replaceAll(' ', '')] = stringResult[1];
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
                } else if(paramName === 'dateModify') {
                    questionObj[paramName] = Date.parse(paramValue);
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

///////////////////////////////////////////////////////////////////
//get data serialized obj
function getJSON(obj) {
    return JSON.stringify(obj);
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

///////////////////////////////////////////////////////////////////
//UID generation area
function generate(state) {

    let idArray = [];

    const questionsArray = []
    questionsArray.push(state.xml.questions);
    questionsArray.push(state.csv.questions);
    questionsArray.push(state.jsonD.questions);
    questionsArray.push(state.yaml.questions);

    for (let i = 0; i < questionsArray.length; i++) {
        const partialArray = questionsArray[i];
        for (let j = 0; j < partialArray.length; j++) {
            if (!idArray.includes(partialArray.id)){
                idArray.push(partialArray.id);
            }
        }
    }

    const _sym = 'abcdefghijklmnopqrstuvwxyz1234567890';
    let UID = '';

    for(let i = 0; i < 10; i++) {
        UID += _sym[Math.floor(Math.random() * (_sym.length))];
    }

    if(idArray.includes(UID)){
        UID = generate();
    }
    return UID;
}

///////////////////////////////////////////////////////////////////
//page-home area
function fillForm(devData) {
    const infoDeveloper = document.getElementById('info-developer');
    infoDeveloper.innerHTML = '';

    for (let i = 0; i < devData.length; i++) {
        const item = devData[i];
        let mySection = document.createElement('ul');
        mySection.id = `${item.id}`;
        mySection.innerHTML = `
        <li class="img">
            <div class="img__content">
                <img src="${item.images}" alt='person'/>
            </div>
        </li>
        <li>Name: ${item.name}</li>
        <li>Surname: ${item.surname}</li>
        <li>Gender: ${item.sex}</li>
        <li>Age: ${item.age}</li>
        <li>Birthday: ${item.birthday}</li>
        <li>Locations: ${item.locations}</li>
        <li>Hobby: ${item.hobby}</li>`;
        infoDeveloper.appendChild(mySection);
    }
}

function changing() {
    const user = document.getElementById('user');
    switch (user) {
        case 'Team-lead':
            break;
        case 'Tech-lead':
            break;
        case 'User-1':
            break;
        case 'User-2':
            break;
    }
}

/////////////////////////////////////////////////////////////////
//page-questions area
function questionsFilter(state, fileSystem = 'jsonD', theme = 'all') {
    if (theme === 'all') {
        questionsList(state[fileSystem].questions, state);
    } else {
        questionsList(state[fileSystem].questions.filter(question => question.theme === theme), state);
    }
}

function fillThemes (state) {

    const filters = getLocalStorage();
    let themes = [];
    themes.push('all');

    let jsonQuestions = state.jsonD.questions;
    let xmlQuestions = state.xml.questions;
    let yamlQuestions = state.yaml.questions;
    let csvQuestions = state.csv.questions;

    for (let i = 0; i < jsonQuestions.length; i++) {
        if(!themes.includes(jsonQuestions[i].theme)) {
            themes.push(jsonQuestions[i].theme);
        }
    }
    for (let i = 0; i < xmlQuestions.length; i++) {
        if(!themes.includes(xmlQuestions[i].theme)) {
            themes.push(xmlQuestions[i].theme);
        }
    }
    for (let i = 0; i < yamlQuestions.length; i++) {
        if(!themes.includes(yamlQuestions[i].theme)) {
            themes.push(yamlQuestions[i].theme);
        }
    }
    for (let i = 0; i < csvQuestions.length; i++) {
        if(!themes.includes(csvQuestions[i].theme)) {
            themes.push(csvQuestions[i].theme);
        }
    }


    const themesList = document.getElementById('theme');
    themesList.innerHTML = `<option disabled>Select theme</option>`;

    for (let i = 0; i < themes.length; i++) {
        const item = themes[i];
        if (item === filters.theme){
            let option = document.createElement('option');
            option.value = item;
            option.innerHTML = `<option selected>${item.toUpperCase()}</option>`;
            themesList.appendChild(option);
        } else {
            let option = document.createElement('option');
            option.value = item;
            option.innerHTML = `<option>${item.toUpperCase()}</option>`;
            themesList.appendChild(option);
        }
    }
}

function fillFileSystems () {
    let filters = getLocalStorage();
    const fileSystems = document.getElementById('file-system');
    fileSystems.innerHTML = '<option disabled>Select file system</option>'

    const fileSystemsObj = {jsonD: 'JSON',
        xml:'XML',
        yaml:'YAML',
        csv:'CSV'
};
    for (const key in fileSystemsObj) {
        if (filters.fileSystem === key){
            let option = document.createElement('option');
            option.value = key;
            option.selected = true;
            option.textContent = `${fileSystemsObj[key]}`;
            fileSystems.appendChild(option);
        } else {
            let option = document.createElement('option');
            option.value = key;
            option.textContent = `${fileSystemsObj[key]}`;
            fileSystems.appendChild(option);
        }
    }
}

function questionsList(data) {
    const questionList = document.getElementById('question-list');
    questionList.innerHTML = '';

    data.map(el => {
        const myUl = document.createElement('ul');

        myUl.id = `${el.id}`;
        myUl.innerHTML = `
            <li><button type='submit' class='question__delete' id="${el.id}">x</button></li>
            <li>Question: ${el.question}</li>
            <li>Answer: ${el.answer}</li>
            <li>Theme: ${el.theme}</li>
            <li class='question__date'>Date: ${el.dateModify}</li>`
        questionList.appendChild(myUl);
        return questionList;
    })
}

function modalQuestion() {
    const modalWindow = document.getElementById('modal');
    modalWindow.style.display = 'grid';
}

function closedModal() {
    const modalWindow = document.getElementById('modal');
    modalWindow.style.display = 'none';
    cleanForm();
}

function modalDeleteQuestion() {
    const modalWindow = document.getElementById("deleteQuestion");
    modalWindow.style.display = 'grid';

    const addModal = document.getElementById('deleteQuestion');
    addModal.innerHTML = '';

    `<div className="modal_content">
        <p>Are you sure you want to delete this question?</p>
        <button className="button" type="button" id="delete-question">confirm</button>
        <button className="button" type="button">cancel</button>
    </div>`
}

function getLocalStorage() {
    const filters = localStorage.getItem('filters');

    if (filters) {
        return JSON.parse(filters);
    }
    return false;
}

function setLocalStorage() {
    const theme = document.getElementById('theme').value;
    const fileSystem = document.getElementById('file-system').value;
    let filters = {};

    filters.theme = theme;
    filters.fileSystem = fileSystem;
    filters = JSON.stringify(filters);
    localStorage.setItem('filters', filters);
}

function searchButtonHandler(state) {
    setLocalStorage();
    const filters = getLocalStorage();
    questionsFilter(state, filters.fileSystem, filters.theme);
}

function postQuestions(state) {
    const question = document.getElementById('form-questions__question').value;
    const theme = document.getElementById('modalTheme').value;
    const answer = document.querySelector('input[name="' + "boolean" + '"]:checked').value;

    const fileSystemsArray = document.querySelectorAll('input[name=fileSystem]');
    let fileSystem = [];
    for (let i = 0; i < fileSystemsArray.length; i++) {
        const item = fileSystemsArray[i]
        if (item.checked){
            fileSystem.push(item.value);
        }
    }
    const dateModify = Date.now();

    const result = {
        id: generate(state),
        question: question,
        theme: theme,
        answer: answer,
        fileSystem:fileSystem,
        dateModify: dateModify
    }

    for (let i = 0; i < fileSystem.length; i++) {
        switch (fileSystem[i]){
            case 'jsonD':
                state.jsonD.questions.push(result);
                break;
            case 'csv':
                state.csv.questions.push(result);
                break;
            case 'xml':
                state.xml.questions.push(result);
                break;
            case 'yaml':
                state.yaml.questions.push(result);
                break;
        }
    }
    closedModal();
    const filters = getLocalStorage();
    questionsFilter(state, filters.fileSystem, filters.theme);
}

function cleanForm () {
    const radio = document.querySelectorAll('input[name="fileSystem"]');
    for (let i = 0; i < radio.length; i++) {
        const item = radio[i];
        item.checked = false;
    }
    const boolean = document.querySelectorAll('input[name="boolean"]');
    for (let i = 0; i < boolean.length; i++) {
        const item = boolean[i];
        item.checked = false;
    }
    const theme = document.getElementById('modalTheme').getElementsByTagName('option');
    for (let i = 0; i < theme.length; i++) {
        const item = theme[i];
        if (item.disabled){
            item.selected = true;
        }
    }
    const question = document.getElementById('form-questions__question');
    question.value = '';
}

function deleteQuestion(id, state) {

    const questionsArray = []
    questionsArray.push(state.xml.questions);
    questionsArray.push(state.csv.questions);
    questionsArray.push(state.jsonD.questions);
    questionsArray.push(state.yaml.questions);

    for (let i = 0; i < questionsArray.length; i++) {
        const partialArray = questionsArray[i];
        for (let j = 0; j < partialArray.length; j++) {
            if (partialArray.id === id){
                switch (i){
                    case 0:
                        state.xml.questions.splice(j,j);
                        break;
                    case 1:
                        console.log(state.csv.questions.splice(j,j));
                        break;
                    case 2:
                        state.jsonD.questions.splice(j,j);
                        break;
                    case 3:
                        state.yaml.questions.splice(j,j);
                        break;
                }
            }
        }
    }
}

/////////////////////////////////
//UNSORTED

window.onload = () => {
    route('page-home');
    getData();
}

function init(state) {
    const STATE = state;
    fillForm(STATE.dev.person);
    fillFileSystems();
    fillThemes(STATE);

    if (!getLocalStorage()){
        setLocalStorage();
    }

    const filters = getLocalStorage();
    questionsFilter(STATE, filters.fileSystem, filters.theme);

    addListener('routeHome', 'click', () => route('page-home'));
    addListener('routeQuestion' ,'click', () => route('page-questions'));
    addListener('routeAbout', 'click', () => route('page-about'));

    const list = document.querySelectorAll('.home, .question, .about');
    function activeLink() {
        list.forEach((item) =>
            item.classList.remove('active'));
        this.classList.add('active');
    }
    list.forEach((item) =>
        item.addEventListener('click', activeLink));

    addListener('local-storage', 'click', searchButtonHandler.bind(null, STATE));
    addListener('show-question', 'click', () => modalQuestion());
    addListener('post-question', 'click', postQuestions.bind(null, STATE));
    addListener('close-modal', 'click', () => closedModal());

}
