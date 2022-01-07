function addListener (id, eventType, callback){
    const node = document.getElementById(id);
    if (node){
        node.addEventListener(eventType, callback);
    }
}

function route(id) {
    //console.log(id);
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
function postData(url = '', data = {}) {
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
                if (stringResult[0].replaceAll(' ', '') === 'id') {
                    obj[stringResult[0].replaceAll(' ', '')] = Number.parseInt(stringResult[1]);
                } else if (stringResult[0].replaceAll(' ', '') === 'answer') {
                    obj[stringResult[0].replaceAll(' ', '')] = stringResult[1] !== 'false';
                } else if (stringResult[0].replaceAll(' ', '') === 'dateModify') {
                    obj[stringResult[0].replaceAll(' ', '')] = Date.parse(stringResult[1]);
                }
                else {
                    obj[stringResult[0].replaceAll(' ', '')] = stringResult[1];
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
function generate() {
    //const file = fs.readFileSync('./data/idFileSystems.json', 'utf-8');
    const _sym = 'abcdefghijklmnopqrstuvwxyz1234567890';
    let UID = '';

    for(let i = 0; i < 10; i++) {
        UID += _sym[Math.floor(Math.random() * (_sym.length))];
    }

    if(file.includes(UID)){
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
        let mySection = document.createElement('section');
        mySection.id = `${item.id}`;
        mySection.innerHTML = `
<!--        <img src="${item.images}" alt='person'/>-->
        <p>Name: ${item.name}</p>
        <p>Surname: ${item.surname}</p>
        <p>Gender: ${item.sex}</p>
        <p>Age: ${item.age}</p>
        <p>Birthday: ${item.birthday}</p>
        <p>Locations: ${item.locations}</p>
        <p>Hobby: ${item.hobby}</p>`;
        infoDeveloper.appendChild(mySection);
    }
}

function openModal() {
    const modal = document.getElementById("my-modal-home");
    const btn = document.getElementById("modal-home");
    const span = document.getElementsByClassName("close-modal")[0];

    btn.onclick = function() {
        modal.style.display = "grid";
    }

    // span.onclick = function() {
    //     modal.style.display = "none";
    // }

    // window.onclick = function(event) {
    //     if (event.target === modal) {
    //         modal.style.display = "none";
    //     }
    // }
}

function openModal2() {
    const modal = document.getElementById("my-modal-home-2");
    const btn = document.getElementById("modal-home-2");
    const span = document.getElementsByClassName("close-modal-2")[0];

    btn.onclick = function() {
        modal.style.display = "grid";
    }

    // span.onclick = function() {
    //     modal.style.display = "none";
    // }
    //
    // window.onclick = function(event) {
    //     if (event.target === modal) {
    //         modal.style.display = "none";
    //     }
    // }
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
function questionsFilter(state, fileSystem, theme) {

    if (theme === 'all') {
        questionsList(state[fileSystem].questions);
        console.log(state[fileSystem])
    } else {
        questionsList(state[fileSystem].questions.filter(question => question.theme === theme));
    }
}

function questionsList(data) {
    console.log(data)
    const questionList = document.getElementById('question-list');
    questionList.innerHTML = '';

    data.map(el => {
        const myUl = document.createElement('ul');

        myUl.id = `${el.id}`;
        myUl.innerHTML = `
            <li><button type='submit' class='question__delete' onclick='modalDeleteQuestion()'>x</button></li>
            <li>Question: ${el.question}</li>
            <li>Answer: ${el.answer}</li>
            <li>Theme: ${el.theme}</li>
            <li class='question__date'>Date: ${el.dateModify}</li>`

        questionList.appendChild(myUl);
        return questionList;
    })
}

function modalQuestion() {
    const myModal = document.getElementById('modal');
    myModal.style.display = 'grid';
}

function closedModal() {
    const myModal = document.getElementById('modal');
    myModal.style.display = 'none';
    route('page-questions');
}

// modal delete question   TODO: open modal
function modalDeleteQuestion() {
    const myModal = document.getElementById("deleteQuestion");
    myModal.style.display = 'grid';
}

function myLocalStorage() {
    const myTheme = document.getElementById('theme');
    const myFileSystem = document.getElementById('file-system');

    myFileSystem.value = localStorage.getItem("fileSystem") || myFileSystem.value; // пулучаем value из локалстореджа
    localStorage.setItem("fileSystem", myFileSystem.value); // cетим в локал сторедж, нужно для первого запуска приложения, пока нет ничего в localStorage.
    myTheme.value = localStorage.getItem("theme") || myTheme.value;
    localStorage.setItem("theme", myTheme.value);
}

//post questions
function postQuestions() {
    const myModal = document.getElementById('modal');
    const questionAsk = document.getElementById('form-questions__question').value;
    const theme = document.getElementById('form-questions__theme').value;
    const answer = document.forms['get-form-questions'].getElementsByClassName('radio');

    const checkbox = document.querySelector('#cheched');
    const fileSystem = [checkbox];
}

function deleteQuestion(id) {
    const deleteMethod = {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json; charset=UTF-8' // Indicates the content
        } // No need to have body, because we don't send nothing to the server.
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
    console.log(STATE)
    questionsFilter(STATE, 'csv', 'all');

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
    // addListener('modal-home-2', 'click', openModal2());
    // addListener('modal-home', 'click', openModal());
    // addListener('modal-body', 'load', changing());
    // addListener('local-storage', 'click', myLocalStorage());
    // //addListener('show-question', 'click', modalQuestion());
    // addListener('delete-question', 'click', deleteQuestion());
}
