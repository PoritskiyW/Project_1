
//добавить в home page данные с information.json
const infoDeveloper = document.getElementById('info-developer');

fetch('../information.json')
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        const itemsStore = data.person;
        //console.log(data);// проверка передаются данные с json

        personLocalStorage(itemsStore);//local storage
        fillForm(itemsStore);// отрисовка home page
    })


function fillForm(human) {
    infoDeveloper.innerHTML = ''
    human.map(item => {
        let mySection = document.createElement('section');
        mySection.id = `${item.id}`;
        mySection.innerHTML = `
        <img src="${item.images}" alt='person'/>
        <p>Name: ${item.name}</p>
         <p>Surname: ${item.surname}</p>
        <p>Gender: ${item.sex}</p>
        <p>Age: ${item.age}</p>
        <p>Weight: ${item.weight}</p>
        <p>Height: ${item.height}</p>
        <p>Birthday: ${item.birthday}</p>
        <p>Locations: ${item.locations}</p>
        <p>Hobby: ${item.hobby}</p>`;

        infoDeveloper.appendChild(mySection);
        return infoDeveloper;
    });
}

function personLocalStorage(person) {
    //сериализуем его обьект персон  JSON.stringify(data.person[0])
    //запишем его в хранилище(setItem) по ключу "name"
    localStorage.setItem("viacheslav", JSON.stringify(person[0]));
    localStorage.setItem("viktoria", JSON.stringify(person[1]));
    localStorage.setItem("yehor", JSON.stringify(person[2]));
    localStorage.setItem("vladyslav", JSON.stringify(person[3]));

    //спарсим его обратно объект
    const returnObj1 = JSON.parse(localStorage.getItem("viacheslav"));
    const returnObj2 = JSON.parse(localStorage.getItem("viktoria"));
    const returnObj3 = JSON.parse(localStorage.getItem("yehor"));
    const returnObj4 = JSON.parse(localStorage.getItem("vladyslav"));
    //console.log(returnObj1);

    //test local
    // for(const [key, value] of Object.entries(returnObj1)) {
    //     console.log(`${key}: ${value}`);
    // }
}