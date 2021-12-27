//routing functions
function route(id) {

    //get all pages + our page from argument
    let homePage = document.getElementById('page-home');
    let questionsPage = document.getElementById('page-questions');
    let aboutPage = document.getElementById('page-about');
    let showPage = document.getElementById(id);

    //hide all pages + show page from argument
    homePage.hidden = true;
    questionsPage.hidden = true;
    aboutPage.hidden = true;
    showPage.hidden = false;
}

function myLocalStorage () {
    const myTheme = document.getElementById('theme');
    const myFileSystem = document.getElementById('file-system');

    function fileSystem() {
        const myObj = {
            fileSystem: myFileSystem.value,
            theme: myTheme.value
        }

        localStorage.setItem('search', JSON.stringify(myObj));

        document.querySelector('.add__question').innerHTML =
            Object.values(JSON.parse(localStorage.getItem('search')));
        return true;
    }

    if(Object.values(JSON.parse(localStorage.getItem('search')))) {
        document.getElementById('file-system').value =
            Object.values(JSON.parse(localStorage.getItem('search')))[0]
    }
    if(Object.values(JSON.parse(localStorage.getItem('search')))) {
        document.getElementById('theme').value =
            Object.values(JSON.parse(localStorage.getItem('search')))[1]
    }

    document.querySelector('.add__question').innerHTML = `
${Object.values(JSON.parse(localStorage.getItem('search')))}`
}
