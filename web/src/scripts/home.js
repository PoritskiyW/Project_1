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

function modalDeveloper(devData) {
    let id = 0;
    const infoDeveloper = document.getElementById('developer-modal');
    infoDeveloper.innerHTML = '';
    const header = document.createElement('header');
    header.className = "header header__modal";

    for (let i = 0; i < devData.length; i++) {
        const item = devData[i];
        const button = document.createElement('button');
        button.id = `route${item.id}`;
        button.className = `navigation__button user${item.id}`;
        button.onclick = () => {
            id = i;
        };
        button.innerHTML = `${item.name}`;
        header.appendChild(button);
    }
    infoDeveloper.appendChild(header);

    for (let i = 0; i < devData.length; i++) {
        const item = devData[i];
        const div = document.createElement('div');
        div.id = `user${item.id}`;
        div.innerHTML = `
            <div class="img__content">
                <img src="${item.images}" alt='person'/>
            </div>
            <input class="img__input" type="file" name="AddImage" accept="image/*" >
            <label>Name: <input type='text'  maxlength="10" placeholder=${item.name} name="Name" /></label>
            <label>Surname: <input type='text'  maxlength="20" placeholder=${item.surname} name="Surname" /></label>
            <label>Gender: <input type='text' maxlength="20" placeholder=${item.sex} name="Gender" /></label>
            <label>Age: <input type='number'  min="0" max="100" placeholder=${item.age} name="Age" /></label>
            <label>Birthday: <input type="date"  value='${item.birthday}' name="Birthday" /></label>
            <label>Locations: <input type='text'  maxlength="20" placeholder=${item.locations} name="Locations" /></label>
            <label>Hobby: <input type='text' maxlength="100"  placeholder='${item.hobby}' name="Hobby" /></label>`
        infoDeveloper.appendChild(div);
    }

    const container = document.getElementById('developer-modal');
    const inputs = container.querySelectorAll('input');
    inputs.forEach(i => i.onchange = (e) => {
        devData[id][e.target.name.toLowerCase()] = e.target.value;
    });

    document.getElementById('save-developer').addEventListener('click', () => {
        postData('/end', {dev: JSON.stringify({ person: devData })});
        closedModal('developer');
        fillForm(devData);
    });
}
