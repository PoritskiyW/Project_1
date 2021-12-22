const http = 'http://localhost:3000/api/home';

fetch(http)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        fillForm(data);// отрисовка home page
    })