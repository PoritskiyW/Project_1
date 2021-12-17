// Показать полупрозрачный DIV, чтобы затенить страницу
// (форма располагается не внутри него, а рядом, потому что она не должна быть полупрозрачной)
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
        if (e.key == 'Escape') {
            complete(null);
        }
    };

    let lastElem = form.elements[form.elements.length - 1];
    let firstElem = form.elements[0];

    lastElem.onkeydown = function (e) {
        if (e.key == 'Tab' && !e.shiftKey) {
            firstElem.focus();
            return false;
        }
    };

    firstElem.onkeydown = function (e) {
        if (e.key == 'Tab' && e.shiftKey) {
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