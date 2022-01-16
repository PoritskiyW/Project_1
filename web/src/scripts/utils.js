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
        return node.value;//&
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

function getElementsByTagName(tagName){
    const node = document.getElementsByTagName(tagName);
    if (node){

        return node;
    }
    return false;
}


function getFileImg(id) {
    const node = document.getElementById(id);
    if (node) {
        return node.files[0];
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

function containerQuerySelectorAll(id, selector) {
    const addId = document.getElementById(id);
    const node = addId.querySelectorAll(selector);
    console.log(node);
    return node;
}

function getAppendChild(id, value) {
    id.appendChild(value);
}

module.exports = {
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
    setInnerHtml
}

