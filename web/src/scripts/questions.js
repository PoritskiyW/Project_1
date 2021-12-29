//get question list with server
function getQuestionsList() {
    fetch('http://localhost:3000/questions')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
            return questionsList(data);
        })
        .catch(error => {
            throw(error);
        })
}

getQuestionsList();

// draw question list
function questionsList(data) {
    const questionList = document.getElementById('question-list');
    questionList.innerHTML = '';

    data.map(el => {
        const myUl = document.createElement('ul');

        myUl.id = `${el.id}`;
        myUl.innerHTML = `
            <li><button type='submit' class='question__delete' onclick='modalDeleteQuestion()'>x</button></li>
            <li>Question: ${el.questionAsk}</li>
            <li>Answer: ${el.answer}</li>
            <li>Theme question: ${el.theme}</li>
            <li class='question__date'>Date: ${el.dateModify}</li>`

        questionList.appendChild(myUl);
        return questionList;
    })
}

//modal question
function modalQuestion() {
    const myModal = document.getElementById('modal');
    myModal.style.display = 'grid';
}

function closedModal() {
    const myModal = document.getElementById('modal');
    myModal.style.display = 'none';
    route('page-questions');
}
// modal delete question   TODO: open modal
function modalDeleteQuestion() {
    const myModal = document.getElementById("deleteQuestion");
    myModal.style.display = 'grid';
}

//TODO: local storage
function myLocalStorage() {
    const myTheme = document.getElementById('theme');
    const myFileSystem = document.getElementById('file-system');


    const myObj = {
        fileSystem: myFileSystem.value,
        theme: myTheme.value
    }

    localStorage.setItem('search', JSON.stringify(myObj));

    document.querySelector('.add__question').innerHTML =
        Object.values(JSON.parse(localStorage.getItem('search')));
    return true;
}

//post questions
function postQuestions() {
    const myModal = document.getElementById('modal');
    const questionAsk = document.getElementById('form-questions__question').value;
    const theme = document.getElementById('form-questions__theme').value;
    const answer = document.forms['get-form-questions'].getElementsByClassName('radio');

    const checkbox = document.querySelector('#cheched');
    const fileSystem = [checkbox];

    // if(checkbox.value) {
    //     fileSystem.push(this.value)
    // }
    // const JSON = document.getElementById('question__type-JSON');
    // const XML = document.getElementById('question__type-XML');
    // const YAML = document.getElementById('question__type-YAML');
    // const CSV = document.getElementById('question__type-CSV');

    fetch('http://localhost:3000/addQuestion', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }, body: JSON.stringify({
            questionAsk: questionAsk,
            theme: theme,
            answer: answer,
            fileSystem: fileSystem
        })
    })
        .then((data) => {
            console.log(data);
            myModal.style.display = 'none';
            getQuestionsList();
        })
        .catch(error => {
            throw(error);
        })
}


function deleteQuestion(id) {
    const deleteMethod = {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json; charset=UTF-8' // Indicates the content
        } // No need to have body, because we don't send nothing to the server.
    }

    // Make the HTTP Delete call using fetch api
    fetch('http://localhost:3000/deleteQuestion', deleteMethod)
        .then(response => response.json())
        .then(data => {
            // console.log(data, data.id);
            getQuestionsList();
        }) // Manipulate the data retrieved back, if we want to do something with it
        .catch(error => {
            throw(error);
        }) // Do something with the error
}
