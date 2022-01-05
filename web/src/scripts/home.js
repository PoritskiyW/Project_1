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
        <p>Birthday: ${item.birthday}</p>
        <p>Locations: ${item.locations}</p>
        <p>Hobby: ${item.hobby}</p>`;

        infoDeveloper.appendChild(mySection);
        return infoDeveloper;
    });
}


function openModal()
{
    const modal = document.getElementById("my-modal-home");
    const btn = document.getElementById("modal-home");
    const span = document.getElementsByClassName("close-modal")[0];

    btn.onclick = function() {
        modal.style.display = "grid";
    }

    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}
function openModal2()
{
    const modal = document.getElementById("my-modal-home-2");
    const btn = document.getElementById("modal-home-2");
    const span = document.getElementsByClassName("close-modal-2")[0];

    btn.onclick = function() {
        modal.style.display = "grid";
    }

    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}
function changing()
{
    const user = document.getElementById('user');
    switch (user) {
        case 'Team-lead':
            break;
        case 'Tech-lead':
            break;
        case 'User-1':
            break;
        case 'User-2':
            break;
    }

    /*<p>Name: <input type="text" placeholder="name">
    <p>Surname: <input type="text" placeholder="surname">
    <p>Age: <input type="text" placeholder="age">
    <p>Sex: <input type="text" placeholder="sex">
    <p>Birthday: <input type="text" placeholder="birthday">
    <p>Locations: <input type="text" placeholder="locations">
    <p>Hobby: <input type="text" placeholder="hobby">*/






}




