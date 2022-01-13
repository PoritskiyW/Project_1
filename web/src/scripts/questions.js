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
    fillThemesDOM(themes, filters);
}

function fillFileSystems() {
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
            <li><button type='submit' class='question__delete' id="deleteQuestion">x</button></li>
            <li>Question: ${el.question}</li>
            <li>Answer: ${el.answer}</li>
            <li>Theme: ${el.theme}</li>
            <li class='question__date'>Date: ${el.dateModify}</li>`

        questionList.appendChild(myUl);
        return questionList;
    })
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
    let dateModify = new Date().toISOString().substring(0, 10);

    const result = {
        id: generate(state),
        question: question,
        theme: theme,
        answer: answer,
        fileSystem:fileSystem,
        dateModify: dateModify
    }

    const requestBody = {};

    for (let i = 0; i < fileSystem.length; i++) {
        switch (fileSystem[i]){
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
}

function changeTextArea(e) {
    const button = document.getElementById('post-question');
    if(e.target.value.length > 1) {
        button.classList.remove('disabled');
    } else {
        button.classList.add('disabled');
    }
}