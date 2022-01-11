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

function modalUser(devData) {
    const infoDeveloper = document.getElementById('developerModal');
    infoDeveloper.innerHTML = '';
    const header = document.createElement('header');
    header.className = "header";


    for (let i = 0; i < devData.length; i++) {
        const item = devData[i];
        const button = document.createElement('button');
        button.id = `route${item.id}`;
        button.className = `navigation__button user${item.id}`;
        button.innerHTML = `${item.name}`;

        header.appendChild(button);
    }
    infoDeveloper.appendChild(header);

    for (let i = 0; i < devData.length; i++) {
        const item = devData[i];
        const mySection = document.createElement('section');
        mySection.id = `user${item.id}`;
        mySection.innerHTML = `
            <div class="img__content">
                <img src="${item.images}" alt='person'/>
            </div>
            <label>Name: <input type='text'  maxlength="20" placeholder=${item.name}></label>
            <label>Surname: <input type='text'  maxlength="20" placeholder=${item.surname}></label>
            <label>Gender: <input type='text' maxlength="20" placeholder=${item.sex}></label>
            <label>Age: <input type='number'  min="0" max="100" placeholder=${item.age}></label>
            <label>Birthday: <input type="date"  value='${item.birthday}'></label>
            <label>Locations: <input type='text'  maxlength="20" placeholder=${item.locations}></label>
            <label>Hobby: <input type='text' maxlength="100"  placeholder=${item.hobby}></label>`;

        infoDeveloper.appendChild(mySection);
    }
}