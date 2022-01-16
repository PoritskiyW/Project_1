const {renderFiled, getHidden, getFileImg, postData,
    postImg, addClassById, setNodeHidden, setInnerHtml, addListener, getAppendChild, containerQuerySelectorAll
} = require("./utils");

function routeModal(id) {
    setNodeHidden('user1', true);
    setNodeHidden('user2', true);
    setNodeHidden('user3', true);
    setNodeHidden('user4', true);
    setNodeHidden(id, false);
    addClassById('route1', 'active');
}

function fillForm(devData) {
    const infoDeveloper = document.getElementById('info-developer');
    setInnerHtml('info-developer', '')

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
        getAppendChild(infoDeveloper, mySection )
       // infoDeveloper.appendChild(mySection);
    }
}

function modalDeveloper(devData) {
    let id = 0;
    const infoDeveloper = document.getElementById('developer-modal');
    const header = document.createElement('header');
    header.className = "header header__modal";

    for (let i = 0; i < devData.length; i++) {
        const item = devData[i];
        const button = document.createElement('button');
        button.id = `route${item.id}`;
        button.className = `navigation__link user${item.id}`;
        button.onclick = () => {
            id = i;
        };
        button.innerHTML = `${item.name}`;
        getAppendChild(header, button)
    }
    getAppendChild(infoDeveloper, header);

    for (let i = 0; i < devData.length; i++) {
        const item = devData[i];
        const div = document.createElement('div');
        div.id = `user${item.id}`;
        div.innerHTML = `
            <div class="img__content" id="img-content${item.id}">
                <img src="${item.images}" alt='main' id="main-image${item.id}"/>
                <img src="" alt="side" id="side-image${item.id}" hidden>
            </div>
            <input class="img__input" type="file" name="add-image" accept="image/*" id="image-input${item.id}" oninput="uploadFile(this)">
            <label>Name: <input type='text'  maxlength="10" placeholder=${item.name} name="Name" /></label>
            <label>Surname: <input type='text'  maxlength="20" placeholder=${item.surname} name="Surname" /></label>
            <label>Gender: <input type='text' maxlength="20" placeholder=${item.sex} name="Gender" /></label>
            <label>Age: <input type='number'  min="0" max="100" placeholder=${item.age} name="Age" /></label>
            <label>Birthday: <input type="date"  value='${item.birthday}' name="Birthday" /></label>
            <label>Locations: <input type='text'  maxlength="20" placeholder=${item.locations} name="Locations" /></label>
            <label>Hobby: <input type='text' maxlength="100"  placeholder='${item.hobby}' name="Hobby" /></label>`
        getAppendChild(infoDeveloper, div);
    }

    const inputs = containerQuerySelectorAll('developer-modal', 'input');
    if(inputs) {
        inputs.forEach(i => i.onchange = (e) => {
            if (e.target.name !== 'add-image') {
                devData[id][e.target.name.toLowerCase()] = e.target.value;
            }
        });
    }
    addListener('save-developer', 'click', () => {
        const photos = containerQuerySelectorAll('developer-modal', 'input[name="add-image"]');
        let filesArray = [];
        let idArray = [];
        for (let i = 0; i < photos.length; i++) {
            const item = photos[i];
            if (typeof item.files[0] !== 'undefined'){
                if (item.files[0].type === 'image/jpeg'){
                    idArray.push(item.id.replace('image-input', '') + Date.now() + '.jpg');
                    filesArray.push(item.files[0]);
                } else if (item.files[0].type === 'image/png') {
                    idArray.push(item.id.replace('image-input', '') + Date.now() + '.png');
                    filesArray.push(item.files[0]);
                }
            }
        }

        for (let i = 0; i < idArray.length; i++) {
            const name = idArray[i];
            for (let j = 0; j < devData.length; j++) {
                const item = devData[j];
                if (item.id === Number.parseInt(name[0])){
                    item.images = `./images/${name}`;
                }
            }
        }

        postData('/end', {dev: JSON.stringify({person: devData})});
        postDataPhoto(filesArray, idArray);
        closedModal('developer');
        setTimeout(fillForm, 150, devData);
    })
}

function uploadFile(obj) {
    const sideImage = getHidden(obj.id.replace('image-input', 'side-image'), false);
    getHidden(obj.id.replace('image-input', 'main-image'), true);
    const file = getFileImg(obj.id);

    if (file) {
        renderFiled(sideImage, obj)
    } else {
        sideImage.src = "";
    }
}

function postDataPhoto(fileArray, nameArray) {
    const formData = new FormData();

    for (let i = 0; i < fileArray.length; i++) {
        if (typeof fileArray[i] !== 'undefined') {
            const id = nameArray[i];
            let file = fileArray[i];
            let newFile = new File([file], id);
            formData.append('file', newFile);
        }
    }

    postImg(formData);
}

module.exports = {
    routeModal, fillForm, modalDeveloper, uploadFile, postDataPhoto
}
