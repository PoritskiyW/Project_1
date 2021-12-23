//////////////////////////////////////////////////////////////////////////////////
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

//////////////////////////////////////////////////////////////////////////////////
//page home functions
function modal01() {
    let modal = document.getElementById("MODAL");
    let btn = document.getElementById("BTN");
    let span = document.getElementsByClassName("close")[0];

    btn.onclick = function() {
        modal.style.display = "grid";
    }

    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }
}
function modal02() {
    let modal = document.getElementById("MODAL2");
    let btn = document.getElementById("BTN2");
    let span = document.getElementsByClassName("close2")[0];

    btn.onclick = function() {
        modal.style.display = "grid";
    }

    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }

}
function modal03() {
    let modal3 = document.getElementById("MODAL3");
    let btn3 = document.getElementById("BTN3");
    let span3 = document.getElementsByClassName("close3")[0];

    btn3.onclick = function() {
        modal3.style.display = "grid";
    }

    span3.onclick = function() {
        modal3.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target === modal3) {
            modal3.style.display = "none";
        }
    }

}
function modal04() {
    let modal4 = document.getElementById("MODAL4");
    let btn4 = document.getElementById("BTN4");
    let span4 = document.getElementsByClassName("close4")[0];

    btn4.onclick = function() {
        modal4.style.display = "grid";
    }

    span4.onclick = function() {
        modal4.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target === modal4) {
            modal4.style.display = "none";
        }
    }

}
//////////////////////////////////////////////////////////////////////////////////
//page questions functions
function showCover() {
    let coverDiv = document.createElement('div');
    coverDiv.id = 'cover-div';

    // убираем возможность прокрутки страницы во время показа модального окна с формой
    document.body.style.overflowY = 'hidden';
    document.body.append(coverDiv);
}

function hideCover() {
    document.getElementById('cover-div').remove();
    document.body.style.overflowY = '';
}

function showPrompt(text, callback) {
    showCover();
    let form = document.querySelector('.form-questions');
    let container = document.querySelector('.modal');
    document.querySelector('.form-questions__message').innerHTML = text;
    form.text.value = '';

    function complete(value) {
        hideCover();
        container.style.display = 'none';
        document.onkeydown = null;
        callback(value);
    }

    form.onsubmit = function () {
        let value = form.text.value;
        //if (value == '') return false; // игнорируем отправку пустой формы

        complete(value);
        return false;
    };

    form.cancel.onclick = function () {
        complete(null);
    };

    form.exit.onclick = function () {
        complete(null);
    };

    document.onkeydown = function (e) {
        if (e.key === 'Escape') {
            complete(null);
        }
    };

    let lastElem = form.elements[form.elements.length - 1];
    let firstElem = form.elements[0];

    lastElem.onkeydown = function (e) {
        if (e.key === 'Tab' && !e.shiftKey) {
            firstElem.focus();
            return false;
        }
    };

    firstElem.onkeydown = function (e) {
        if (e.key === 'Tab' && e.shiftKey) {
            lastElem.focus();
            return false;
        }
    };

    container.style.display = 'block';
    form.elements.text.focus();
}

document.getElementById('show-button').onclick = function () {
    showPrompt('', function (value) {
        console.log("Вы ввели: " + value);
    });
};

//////////////////////////////////////////////////////////////////////////////////
//page about functions