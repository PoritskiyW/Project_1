function getPerson() {
    fetch('http://localhost:3000/home')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
          return fillForm(data);// отрисовка home page
        })
        .catch(error => {
            console.log(error);
            throw(error);
        })
}

getPerson();

function fillForm(human) {
    const infoDeveloper = document.getElementById('info-developer');
    infoDeveloper.innerHTML = '';

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
