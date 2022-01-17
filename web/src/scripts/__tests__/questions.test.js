const {
    cancelDeleting, deleteQuestion, postQuestions, addListenersQuestions,
    fillFileSystems, searchButtonHandler, questionsFilter, questionsList, checkModalQuestion,
    openModalDelete
} = require('../questions');

jest.mock('../utils', () => {
    let file = {
        lastModified: 1642101771303,
        lastModifiedDate: 'Thu Jan 13 2022 21:22:51 GMT+0200 (Восточная Европа, стандартное время)',
        name: "Viktoria.jpg",
        size: 91465,
        type: "image/jpeg",
        webkitRelativePath: ""
    };
    return {
        __esModule: true,
        fillThemesDOM: jest.fn(),
        addListener: jest.fn(() => true),
        getNodeValue: jest.fn(() => "value"),
        addClassById: jest.fn(() => true),
        removeListener: jest.fn(() => true),
        setDisplay: jest.fn(() => true),
        setNodeHidden: jest.fn(() => true),
        setNodeValue: jest.fn(() => true),
        setInnerHtml: jest.fn(() => true),
        postImg: jest.fn(),
        getData: jest.fn(),
        postData: jest.fn(),
        getHidden: jest.fn(() => "main-image1"),
        getFileImg: jest.fn(() => file),
        renderFiled: jest.fn(),
        containerQuerySelectorAll: jest.fn(),
        getAppendChild: jest.fn(),
        generate: jest.fn(() => 'eznmk'),
        setOnclick: jest.fn(() => true),
        querySelectorAll: jest.fn(() => [true]),
        querySelectorChecked: jest.fn(() => true),
        disabledValue: jest.fn(() => true)
            .mockImplementationOnce(() => false),
        getElementsByTagName: jest.fn(() => true),
        getLocalStorage: jest.fn(() => true),
        fillThemes: jest.fn(() => true),
        querySelectorValue: jest.fn(() => true),
    };
});

const state = {
    "xml": "<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n" +
        "    <root>\n" +
        "    <questions>\n" +
        "<item>\n" +
        "<id>95cmg</id>\n" +
        "<question>mv;rlmg;.</question>\n" +
        "<theme>CSS</theme>\n" +
        "<answer>true</answer>\n" +
        "<dateModify>2022-01-16</dateModify>\n" +
        "</item></questions></root>",
    "jsonD": {
        "questions": [{
            "id": "eznmk",
            "question": "span это строчный элемент?",
            "theme": "HTML",
            "answer": "true",
            "dateModify": "2022-01-16"
        }]
    },
    "yaml": "---\n" +
        "questions:\n" +
        " - id: 364zu\n" +
        " question: 'Элемент \"strong\" подчеркивает важность, серьезность или срочность своего содержимого, также может быть использован для обозначения предупреждения или предостережения?'\n" +
        " theme: HTML\n" +
        " answer: 'true'\n" +
        " dateModify: 2022-01-16",
    "csv": "id|||question|||theme|||answer|||dateModify\n" +
        "63|||typeof [] ===  'object'|||JS|||true|||2022-01-16",
    "dev": {
        "person": [{
            "id": 1,
            "name": "trtt",
            "surname": "nn",
            "age": "23",
            "sex": "Male",
            "birthday": "1998-10-29",
            "locations": "Kharkov",
            "hobby": "*Хорошее описание моих хобби*",
            "images": "./images/11642370483212.jpg"
        }]
    }
}

describe('tests for cancelDeleting', () => {
    test('should be defined', () => {
        expect(cancelDeleting).toBeDefined()
    })
    test('should be function', () => {
        expect(typeof cancelDeleting).toBe("function")
    })
})

describe('tests for deleteQuestion', () => {
    function once(){};
    test('should be defined', () => {
        expect(deleteQuestion).toBeDefined()
    })
    test('should be function', () => {
        expect(typeof deleteQuestion).toBe("function")
    })
    test('should be defined', () => {
        expect(deleteQuestion('eznmk', state)).toThrow();
    })
})

describe('tests for postQuestions', () => {
    test('should be defined', () => {
        expect(postQuestions).toBeDefined()
    })
    test('should be function', () => {
        expect(typeof postQuestions).toBe("function")
    })
    test('post questions', () => {
        expect(postQuestions(state)).toBeUndefined();
    })
})

describe('tests for addListenersQuestions', () => {
    test('should be defined', () => {
        expect(addListenersQuestions).toBeDefined()
    })
    test('should be function', () => {
        expect(typeof addListenersQuestions).toBe("function")
    })
})

describe('tests for fillFileSystems', () => {
    test('should be defined', () => {
        expect(fillFileSystems).toBeDefined()
    })
    test('should be function', () => {
        expect(typeof fillFileSystems).toBe("function")
    })
    test('fill file systems', () => {
        expect(fillFileSystems()).toBeUndefined();
    })
})

describe('tests for searchButtonHandler', () => {
    test('should be defined', () => {
        expect(searchButtonHandler).toBeDefined()
    })
    test('should be function', () => {
        expect(typeof searchButtonHandler).toBe("function")
    })
    test('should be defined', () => {
        expect(searchButtonHandler(state)).toBeUndefined()
    })
})

describe('tests for questionsFilter', () => {
    test('should be defined', () => {
        expect(questionsFilter).toBeDefined()
    })
    test('should be function', () => {
        expect(typeof questionsFilter).toBe("function")
    })
    test('questions filter', () => {
        expect(questionsFilter(state, 'jsonD', 'all')).toBeUndefined()
    })
})

describe('tests for questionsList', () => {
    test('should be defined', () => {
        expect(questionsList).toBeDefined()
    })
    test('should be function', () => {
        expect(typeof questionsList).toBe("function")
    })
    test('questions list', () => {
        expect(questionsList([], state)).toBeUndefined()
    })
})

describe('tests for checkModalQuestion', () => {
    test('should be defined', () => {
        expect(checkModalQuestion).toBeDefined()
    })
    test('should be function', () => {
        expect(typeof checkModalQuestion).toBe("function")
    })
    test('check modal question', () => {
        expect(checkModalQuestion()).toBeUndefined()
    })
})

describe('tests for openModalDelete', () => {
    test('should be defined', () => {
        expect(openModalDelete).toBeDefined()
    })
    test('should be function', () => {
        expect(typeof openModalDelete).toBe("function")
    })
    test('open modal delete', () => {
        expect(openModalDelete(state, 'eznmk')).toBeUndefined();
    })
    test('open modal delete', () => {
        expect(openModalDelete(state, 'eznmk')).toBeUndefined();
    })
})