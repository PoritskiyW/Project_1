function route(id) {
    //get all pages + our page from argument
    setNodeHidden('page-home', true);
    setNodeHidden('page-questions', true);
    setNodeHidden('page-about', true);
    setNodeHidden(id, false);
}

//POST REQUEST FUNCTION
function postData(url = '/end', data) {
    const response = fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    });
    return response.json();
}

// function addQuestion(state) {
//     const jsonD = {"jsonD": (state.jsonD)};
//
//     postData('/end', jsonD);
// }

//GET REQUEST FUNCTION
function getData() {
    fetch('/init')
        .then((response) => response.json())
        .then(function (data) {
            fillState(JSON.parse(data));
        })
        .catch(function (error) {
            console.log(error);
        })
}

function fillState(obj) {
    obj.jsonD = JSON.parse(obj.jsonD);
    obj.csv = parseCSV(obj.csv);
    obj.yaml = parseYAML(obj.yaml);
    obj.xml = parseXML(obj.xml);
    obj.dev = JSON.parse(obj.dev);

    init(obj);
}

function openModal(id) {
    setDisplay(id, 'grid');

    const radio = document.querySelectorAll('input[name="fileSystem"]');
    const filters = getLocalStorage();
    for (let i = 0; i < radio.length; i++) {
        const item = radio[i];
        item.checked = false;
        if (filters.fileSystem === item.value) {
            item.checked = true;
        }
    }
}

function openModalDelete() {

    console.log(document.getElementsByClassName('modalDelete')[0])
    //  setDisplayClass(myClass);
    const button = document.getElementsByClassName('modalDelete')[0];
    button.style.display = 'grid';
}

function closedModal(id) {
    setDisplay(id, 'none');
    cleanForm();
}

function getLocalStorage() {
    const filters = localStorage.getItem('filters');
    if (filters) {
        return JSON.parse(filters);
    }
    return false;
}

function setLocalStorage() {
    const theme = getNodeValue('theme');
    const fileSystem = getNodeValue('file-system');
    let filters = {};

    filters.theme = theme;
    filters.fileSystem = fileSystem;
    filters = JSON.stringify(filters);
    localStorage.setItem('filters', filters);
}

function cleanForm() {
    const boolean = document.querySelectorAll('input[name="boolean"]');
    for (let i = 0; i < boolean.length; i++) {
        const item = boolean[i];
        item.checked = false;
    }
    const theme = document.getElementById('modalTheme').getElementsByTagName('option');
    for (let i = 0; i < theme.length; i++) {
        const item = theme[i];
        if (item.disabled) {
            item.selected = true;
        }
    }
    const question = document.getElementById('form-questions__question');
    question.value = '';
}

window.onload = () => {
    route('page-home');
    getData();
}

function addAllListeners(STATE) {
    //main routes
    addListener('routeHome', 'click', () => route('page-home'));
    addListener('routeQuestion', 'click', () => route('page-questions'));
    addListener('routeAbout', 'click', () => route('page-about'));
    //modal window routes
    addListener('route1', 'click', () => routeModal('user1'));
    addListener('route2', 'click', () => routeModal('user2'));
    addListener('route3', 'click', () => routeModal('user3'));
    addListener('route4', 'click', () => routeModal('user4'));
    //modal window buttons
    addListener('post-question', 'click', postQuestions.bind(null, STATE));
    addListener('close-modal', 'click', () => closedModal('modal'));
    addListener('closedQuestion', 'click', () => closedModal('modal'));
    addListener('cancelDelete', 'click', () => closedModal('deleteQuestionModal'));
    addListener('cancelDeveloper', 'click', () => closedModal('developer'));
    // event in textArea
    addListener('form-questions__question', 'input', (e) => changeTextArea(e));
    //general buttons
    addListener('local-storage', 'click', searchButtonHandler.bind(null, STATE));
    addListener('selectUser', 'click', () => openModal('developer'));
    addListener('show-question', 'click', () => openModal('modal'));
    //modal delete question

    document.querySelector('.question__delete').onclick = function(e) {
        if (e.target.matches('.question__delete')) {
           console.log(111111111)
        }
    };

    const elem = document.getElementsByClassName('question__delete')[0];
    elem.addEventListener('click', openModalDelete);
   // addListener('deleteQuestion', 'click', openModalDelete);
    //  addListener('deleteQuestion', 'click', modalDeleteQuestion());
   // addListener('modal', 'click', closedModalQuestion());
    //lists
    const listModal = document.querySelectorAll('.user1, .user2, .user3, .user4');

    function activeLinkModal() {
        listModal.forEach((item) =>
            item.classList.remove('active'));
        this.classList.add('active');
    }

    listModal.forEach((item) =>
        item.addEventListener('click', activeLinkModal));

    const list = document.querySelectorAll('.home, .question, .about');

    function activeLink() {
        list.forEach((item) =>
            item.classList.remove('active'));
        this.classList.add('active');
    }

    list.forEach((item) =>
        item.addEventListener('click', activeLink));
}

function init(state) {
    const STATE = state;
    fillForm(STATE.dev.person);
    modalUser(STATE.dev.person);
    fillFileSystems();
    fillThemes(STATE);

    routeModal('user1');

    if (!getLocalStorage()) {
        setLocalStorage();
    }
    const filters = getLocalStorage();
    questionsFilter(STATE, filters.fileSystem, filters.theme);
    addAllListeners(STATE);
}
