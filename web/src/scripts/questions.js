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
            if (!idArray.includes(partialArray.id)) {
                idArray.push(partialArray.id);
            }
        }
    }

    const _sym = 'abcdefghijklmnopqrstuvwxyz1234567890';
    let UID = '';


    for (let i = 0; i < 5; i++) {

        UID += _sym[Math.floor(Math.random() * (_sym.length))];
    }

    if (idArray.includes(UID)) {
        UID = generate();
    }
    return UID;
}

///////////////////////////////////////////////////////
//page-questions area
function questionsFilter(state, fileSystem = 'jsonD', theme = 'all') {
    if (theme === 'all') {
        questionsList(state[fileSystem].questions, state);
    } else {
        questionsList(state[fileSystem].questions.filter(question => question.theme === theme), state);
    }
}

function fillThemes(state) {
    const filters = getLocalStorage();
    let themes = [];
    themes.push('all');

    let jsonQuestions = state.jsonD.questions;
    let xmlQuestions = state.xml.questions;
    let yamlQuestions = state.yaml.questions;
    let csvQuestions = state.csv.questions;

    for (let i = 0; i < jsonQuestions.length; i++) {
        if (!themes.includes(jsonQuestions[i].theme)) {
            themes.push(jsonQuestions[i].theme);
        }
    }
    for (let i = 0; i < xmlQuestions.length; i++) {
        if (!themes.includes(xmlQuestions[i].theme)) {
            themes.push(xmlQuestions[i].theme);
        }
    }
    for (let i = 0; i < yamlQuestions.length; i++) {
        if (!themes.includes(yamlQuestions[i].theme)) {
            themes.push(yamlQuestions[i].theme);
        }
    }
    for (let i = 0; i < csvQuestions.length; i++) {
        if (!themes.includes(csvQuestions[i].theme)) {
            themes.push(csvQuestions[i].theme);
        }
    }
    fillThemesDOM(themes, filters);
}

function fillFileSystems() {
    let filters = getLocalStorage();
    const fileSystems = document.getElementById('file-system');
    fileSystems.innerHTML = '<option disabled>Select file system</option>'

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
            fileSystems.appendChild(option);
        } else {
            let option = document.createElement('option');
            option.value = key;
            option.textContent = `${fileSystemsObj[key]}`;
            fileSystems.appendChild(option);
        }
    }
}

function questionsList(data, state) {
    const questionList = document.getElementById('question-list');
    questionList.innerHTML = '';

    if(!Array.isArray(data) || data.length === 0) {
        const Ul = document.createElement('ul');
        Ul.innerHTML = '<p class="add__question">There are no questions</p>';
        questionList.appendChild(Ul);
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

            questionList.appendChild(Ul);
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
    const modalWindow = document.getElementById("modal-delete-question");
    modalWindow.style.display = 'grid';

    const callback = deleteQuestion(id.replace('deleteQuestion', ''), state);
    const cancel = document.getElementById('cancel-delete');
    cancel.onclick = cancelDeleting(callback);
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
    const question = document.getElementById('question-text').value;
    const theme = document.getElementById('modal-theme').value;
    const answer = document.querySelector('input[name="' + "boolean" + '"]:checked').value;

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

    const textArea = document.getElementById('question-text');
    const boolean = document.querySelectorAll('input[name="boolean"]');
    const theme = document.getElementById('modal-theme').value;

    const fileSystemsArray = document.querySelectorAll('input[name=fileSystem]');
    const fileSystems = [];
    fileSystemsArray.forEach(i => {
        if(i.checked) {
            fileSystems.push(i)
        }
    })

    if (textArea.value.length > 3 &&
        theme !== 'Select theme' &&
        (boolean[0].checked || boolean[1].checked) &&
        fileSystems.length >= 1 ) {
        button.disabled = false;
        button.classList.remove('disabled');
    } else {
        button.disabled = true;
        button.classList.add('disabled');
    }
}
