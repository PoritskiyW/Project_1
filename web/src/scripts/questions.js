const {getYAML, getXML, getCSV} = require("./serializers");
const {removeListener, setDisplay, addListener, fillThemesDOM, postData,generate, setInnerHtml, getAppendChild,
    setOnclick, getNodeValue, querySelectorAll, querySelectorChecked, disabledValue, addClassById, getLocalStorage,
    fillThemes, querySelectorValue
} = require("./utils");
//const {closedModal, setLocalStorage} = require("./index");//test

//page-questions area
function questionsFilter(state, fileSystem = 'jsonD', theme = 'all') {
    if (theme === 'all') {
        questionsList(state[fileSystem].questions, state);
    } else {
        questionsList(state[fileSystem].questions.filter(question => question.theme === theme), state);
    }
}

function fillFileSystems() {
    let filters = getLocalStorage();
    const fileSystems = document.getElementById('file-system');
    setInnerHtml('file-system', '<option disabled>Select file system</option>')

    const fileSystemsObj = {
        jsonD: 'JSON',
        xml: 'XML',
        yaml: 'YAML',
        csv: 'CSV'
    };
    for (const key in fileSystemsObj) {
        if (filters.fileSystem === key) {
            let option = document.createElement('option');
            option.value = key;
            option.selected = true;
            option.textContent = `${fileSystemsObj[key]}`;
            getAppendChild(fileSystems, option)
        } else {
            let option = document.createElement('option');
            option.value = key;
            option.textContent = `${fileSystemsObj[key]}`;
            getAppendChild(fileSystems, option);
        }
    }
}

function questionsList(data, state) {
    const questionList = document.getElementById('question-list');
    setInnerHtml('question-list', '');

    if(!Array.isArray(data) || data.length === 0) {
        const Ul = document.createElement('ul');
        Ul.innerHTML = '<p class="add__question">There are no questions</p>';
        getAppendChild(questionList,  Ul)
    } else {
        data.map(el => {
            const Ul = document.createElement('ul');

            Ul.id = `${el.id}`;
            Ul.innerHTML = `
            <li><button type="button" class="question__delete" id="deleteQuestion${el.id}" name="button${el.id}">x</button></li>
            <li class="question__ask">Question: ${el.question}</li>
            <li>Answer: ${el.answer}</li>
            <li>Theme: ${el.theme}</li>
            <li class='question__date'>Date: ${el.dateModify}</li>`

            getAppendChild(questionList,  Ul);
            return questionList;
        })
        addListenersQuestions(state);
    }
}

function addListenersQuestions(state) {
    const xButtons = document.querySelectorAll('button[name^="' + "button" + '"]');

    for (let i = 0; i < xButtons.length; i++) {
        const item = xButtons[i];
        addListener(item.id, 'click', openModalDelete.bind(null, state, item.id));
    }
}

function openModalDelete(state, id) {
    setDisplay("modal-delete-question", 'grid')

    const callback = deleteQuestion(id.replace('deleteQuestion', ''), state);
    setOnclick('cancel-delete', cancelDeleting(callback));
    addListener('confirm-delete', 'click', callback);
}

function cancelDeleting(callback) {
    function once2 () {
        setDisplay("modal-delete-question", 'none');
        removeListener('confirm-delete', 'click', callback);
    }
    return once2;
}

function deleteQuestion(id, state) {
    function once () {
        const filters = getLocalStorage();
        state[filters.fileSystem].questions = state[filters.fileSystem].questions.filter(item => String(item.id) !== id);
        const requestBody = {};

        switch (filters.fileSystem) {
            case 'jsonD':
                requestBody.jsonD = JSON.stringify(state.jsonD);
                break;
            case 'csv':
                requestBody.csv = getCSV(state.csv.questions);
                break;
            case 'xml':
                requestBody.xml = getXML(state.xml.questions);
                break;
            case 'yaml':
                requestBody.yaml = getYAML(state.yaml.questions);
                break;
        }

        postData('/end', requestBody);
        closedModal('modal-delete-question');
        questionsFilter(state, filters.fileSystem, filters.theme);
        removeListener('confirm-delete', 'click', once);
    }
    return once;
}

function searchButtonHandler(state) {
    setLocalStorage();
    const filters = getLocalStorage();
    questionsFilter(state, filters.fileSystem, filters.theme);
}

function postQuestions(state) {
    const question = getNodeValue('question-text');
    const theme = getNodeValue('modal-theme');
    const answer = querySelectorValue('input[name="' + "boolean" + '"]:checked');

    const fileSystemsArray = document.querySelectorAll('input[name=fileSystem]');
    let fileSystem = [];
    for (let i = 0; i < fileSystemsArray.length; i++) {
        const item = fileSystemsArray[i]
        if (item.checked) {
            fileSystem.push(item.value);
        }
    }
    let dateModify = new Date().toISOString().substring(0, 10);

    const result = {
        id: generate(state),
        question: question,
        theme: theme,
        answer: answer,
        dateModify: dateModify
    }

    const requestBody = {};

    for (let i = 0; i < fileSystem.length; i++) {
        switch (fileSystem[i]) {
            case 'jsonD':
                state.jsonD.questions.push(result);
                requestBody.jsonD = JSON.stringify(state.jsonD);
                break;
            case 'csv':
                state.csv.questions.push(result);
                requestBody.csv = getCSV(state.csv.questions);
                break;
            case 'xml':
                state.xml.questions.push(result);
                requestBody.xml = getXML(state.xml.questions);
                break;
            case 'yaml':
                state.yaml.questions.push(result);
                requestBody.yaml = getYAML(state.yaml.questions);
                break;
        }
    }
    closedModal('modal')
    const filters = getLocalStorage();
    questionsFilter(state, filters.fileSystem, filters.theme);
    postData('/end', requestBody);
    fillThemes(state);
}


function checkModalQuestion() {
    const button = document.getElementById('post-question');
    const boolean = querySelectorAll('input[name="boolean"]');
    const theme = getNodeValue('modal-theme')
    const textArea = getNodeValue('question-text')

    const fileSystemsArray = querySelectorAll('input[name=fileSystem]');
    const fileSystems = [];
    fileSystemsArray.forEach(i => {
        if(i.checked) {
            fileSystems.push(i)
        }
    })

    if (textArea.length > 3 &&
        theme !== 'Select theme' &&
        (querySelectorChecked(boolean[0]) || querySelectorChecked(boolean[1])) &&
        fileSystems.length >= 1 ) {
        disabledValue(button, false)
        button.classList.remove('disabled');
    } else {
        disabledValue(button,  true);
        addClassById('post-question', 'disabled');
    }
}


module.exports = { cancelDeleting, deleteQuestion, postQuestions, addListenersQuestions,
    fillFileSystems, searchButtonHandler, questionsFilter, questionsList, checkModalQuestion, openModalDelete }
