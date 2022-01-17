const {parseCSV, parseYAML, parseXML} = require("./parsers");

function addClassById(id, classId) {
    const node = document.getElementById(id);
    if (node){
        node.classList.add(classId);
        return true;
    }
    return false;
}

function fillThemesDOM(themes, filters) {
    const themesList = document.getElementById('theme');
    themesList.innerHTML = `<option disabled>Select theme</option>`;

    for (let i = 0; i < themes.length; i++) {
        const item = themes[i];
        if (item === filters.theme){
            let option = document.createElement('option');
            option.value = item;
            option.selected = true;
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

function addListener (id, eventType, callback, options){
    const node = document.getElementById(id);
    if (node){
        node.addEventListener(eventType, callback, options);
        return true;
    }
    return false;
}

function removeListener (id, eventType, callback, options){
    const node = document.getElementById(id);
    if (node){
        node.removeEventListener(eventType, callback, options);
        return true;
    }
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
    return false;
}

function setDisplay(id, display){
    const node = document.getElementById(id);
    if (node){
        node.style.display = display;
        return true;
    }
    return false;
}

function setInnerHtml(id, innerHtml) {
    const node = document.getElementById(id);
    if(node) {
        node.innerHTML = innerHtml;
        return true;
    }
    return false;
}

//POST REQUEST IMAGES
function postImg(formData) {
    fetch(`/images*`, {
        method: 'POST',
        body: formData
    }).then((res) => {
        console.log(res)
    })
}

//POST REQUEST FUNCTION
function postData(url = '/end', data) {
    fetch(url, {
        method: "post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        //make sure to serialize your JSON body
        body: JSON.stringify(data)
    })
        .then((response) => {
            console.log(response);
        });
}

//GET REQUEST FUNCTION
function getData(fillState) {
    fetch('/init')
        .then((response) => response.json())
        .then(function (data) {
            fillState(JSON.parse(data));
        })
        .catch(function (error) {
            console.log(error);
        })
}

function getHidden(id, value) {
    const node = document.getElementById(id);
    if (node) {
        node.hidden = value;
        return node;
    }
}

function renderFiled(sideImage, obj) {
    const file = document.getElementById(obj.id).files[0];
    let reader = new FileReader();
    reader.onloadend = function () {
        sideImage.src = reader.result;
    }
    return reader.readAsDataURL(file);
}

function getElementsByTagName(id, tagName){
    const node = document.getElementById(id);
    if (node){
        return node.getElementsByTagName(tagName);
    }
    return false;
}


function getFileImg(id) {
    const node = document.getElementById(id);
    if (node) {
        return node.files[0];
    }
}

function containerQuerySelectorAll(id, selector) {
    const addId = document.getElementById(id);
    const node = addId.querySelectorAll(selector);
    return node;
}

function getAppendChild(id, value) {
    id.appendChild(value);
}

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

function setOnclick(id, func) {
    const node = document.getElementById(id);
    if(node) {
        node.onclick = func;
        return true;
    }
    return false;
}

function querySelectorAll(selector) {
    const node = document.querySelectorAll(selector);
    if(node) {
        return node;
    }
    return false;
}

function querySelectorChecked(selector) {
    return selector.checked;
}

function disabledValue(id, value) {
    id.disabled = value;
}

function getLocalStorage() {
    const filters = localStorage.getItem('filters');
    if (filters) {
        return JSON.parse(filters);
    }
    return false;
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

function querySelectorValue(selector) {
    const node = document.querySelector(selector);
    if(node) {
        return node.value;
    }
    return false;
}

function fillState(obj) {
    obj.jsonD = JSON.parse(obj.jsonD);
    obj.csv = parseCSV(obj.csv);
    obj.yaml = parseYAML(obj.yaml);
    obj.xml = parseXML(obj.xml);
    obj.dev = JSON.parse(obj.dev);

    init(obj);
}

function composedPath(event) {
    return event.composedPath();
}

function includes(id, value) {
    return id.includes(value);
}

module.exports = {
    includes,
    composedPath,
    fillState,
    querySelectorValue,
    fillThemes,
    getLocalStorage,
    disabledValue,
    getAppendChild,
    containerQuerySelectorAll,
    renderFiled,
    getHidden,
    getFileImg,
    postData,
    getData,
    postImg,
    addListener,
    addClassById,
    removeListener,
    fillThemesDOM,
    setDisplay,
    getNodeValue,
    setNodeHidden,
    setNodeValue,
    setInnerHtml,
    generate,
    setOnclick,
    querySelectorAll,
    querySelectorChecked,
    getElementsByTagName
}
