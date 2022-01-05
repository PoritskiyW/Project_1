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

window.onload = () => {
    route('page-home');
}

const list = document.querySelectorAll('.lists__home, .lists__question, .lists__about');
function activeLink() {
    list.forEach((item) =>
    item.classList.remove('active'));
    this.classList.add('active')
}
list.forEach((item) =>
item.addEventListener('click', activeLink))
