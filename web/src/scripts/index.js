const {setNodeHidden, setDisplay, getNodeValue, addListener, getData, getElementsByTagName, setNodeValue, addClassById,
    disabledValue, getLocalStorage,   fillThemes, fillState, composedPath, includes
} = require("./utils");
const {parseCSV, parseYAML, parseXML} = require("./parsers");
const {routeModal, fillForm, modalDeveloper, uploadFile, postDataPhoto} = require("./home");
const {postQuestions, checkModalQuestion, cancelDeleting, searchButtonHandler, fillFileSystems, questionsFilter,
} = require("./questions");
const modalState = {
    isVisibleModal: false,
    isVisibleDevelopers: false
}

function route(id) {
    //get all pages + our page from argument
    setNodeHidden('page-home', true);
    setNodeHidden('page-questions', true);
    setNodeHidden('page-about', true);
    setNodeHidden(id, false);
}

function openModal(id) {
    setDisplay(id, 'grid');
    document.addEventListener('click', closeModal);
    modalState.isVisibleModal = true;

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

const closeModal = (e) => {
    const modal = document.getElementById('modal');
    const target = document.getElementsByClassName('form-questions')[0];
    const showButton = document.getElementById('show-question');
    const clickPath = composedPath(e);
    if(modalState.isVisibleModal && !includes(clickPath, target) && !includes(clickPath, showButton)) {
        modal.style.display = "none";
        modalState.isVisibleModal = false;
        cleanForm();
    }
}

function closedModal(id) {
    setDisplay(id, 'none');
    cleanForm();
    addClassById('post-question', 'disabled')
    const button = document.getElementById('post-question');
    disabledValue(button, true);
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

    const theme = getElementsByTagName('modal-theme', 'option');
    for (let i = 0; i < theme.length; i++) {
        const item = theme[i];
        if (item.disabled) {
            item.selected = true;
        }
    }

    setNodeValue('question-text', '');
}

window.onload = () => {
    route('page-home');
    getData(fillState);
}

function addListenerAll(STATE) {
    //main routes
    addListener('route-home', 'click', () => route('page-home'));
    addListener('route-question', 'click', () => route('page-questions'));
    addListener('route-about', 'click', () => route('page-about'));
    //modal window routes
    addListener('route1', 'click', () => routeModal('user1'));
    addListener('route2', 'click', () => routeModal('user2'));
    addListener('route3', 'click', () => routeModal('user3'));
    addListener('route4', 'click', () => routeModal('user4'));
    //modal window buttons
    addListener('post-question', 'click', postQuestions.bind(null, STATE));
    addListener('close-modal', 'click', () => closedModal('modal'));
    addListener('closed-question', 'click', () => closedModal('modal'));
    addListener('cancel-delete', 'click', () => cancelDeleting);
    addListener('cancel-developer', 'click', () => closedModal('developer'));

    // event in textArea
    addListener('form-questions', 'change', checkModalQuestion);
    //general buttons
    addListener('local-storage', 'click', searchButtonHandler.bind(null, STATE));
    addListener('select-user', 'click', () => openModal('developer'));
    addListener('show-question', 'click', () => openModal('modal'));
    //lists
    const listModal = document.querySelectorAll('.user1, .user2, .user3, .user4');

    function activeLinkModal() {
        listModal.forEach((item) =>
            item.classList.remove('active'));
        this.classList.add('active');
    }

    listModal.forEach((item) => item.addEventListener('click', activeLinkModal));

    const list = document.querySelectorAll('.home, .question, .about');

    function activeLink() {
        list.forEach((item) =>
            item.classList.remove('active'));
        this.classList.add('active');
    }

    list.forEach((item) => item.addEventListener('click', activeLink));

}

function init(state) {
    const STATE = state;
    fillForm(STATE.dev.person);
    modalDeveloper(STATE.dev.person);
    fillFileSystems();
    fillThemes(STATE);
    routeModal('user1');

    if (!getLocalStorage()) {
        setLocalStorage();
    }
    const filters = getLocalStorage();
    questionsFilter(STATE, filters.fileSystem, filters.theme);
    addListenerAll(state);
}

module.exports = {
    route,
    openModal,
    closedModal,
    closeModal,
    setLocalStorage,
    cleanForm,
    addListenerAll,
    init
}
