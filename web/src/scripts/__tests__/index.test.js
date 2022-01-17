const {route, openModal, closedModal, closeModal,
    setLocalStorage, cleanForm, addListenerAll, init,} = require('../index')

jest.mock('../utils', () => {
    let file = {lastModified: 1642101771303,
        lastModifiedDate: 'Thu Jan 13 2022 21:22:51 GMT+0200 (Восточная Европа, стандартное время)',
        name: "Viktoria.jpg",
        size: 91465,
        type: "image/jpeg",
        webkitRelativePath: ""};
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
        composedPath:  jest.fn(() => true),
        includes:jest.fn(() => true),
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
describe('Tests for route', () => {
    test('should be defined', () => {
        expect(route).toBeDefined()
    })
    test('should be function', () => {
        expect(typeof route).toBe("function")
    })
    test('should be undefined', () => {
        expect(route()).toBeUndefined()
    })
})

describe('Tests for openModal', () => {
    test('should be defined', () => {
        expect(openModal).toBeDefined()
    })
    test('should be function', () => {
        expect(typeof openModal).toBe("function")
    })
    test('should be undefined', () => {
        expect(openModal()).toBeUndefined()
    })
})

describe('Tests for closedModal', () => {
    test('should be defined', () => {
        expect(closedModal).toBeDefined()
    })
    test('should be function', () => {
        expect(typeof closedModal).toBe("function")
    })
    test('should be undefined', () => {
        expect(closedModal('1234')).toBeUndefined()
    })
    test('should be undefined', () => {
        expect(closeModal({type: "click"})).toBeUndefined()
    })
})

describe('Tests for setLocalStorage', () => {
    test('should be defined', () => {
        expect(setLocalStorage).toBeDefined()
    })
    test('should be function', () => {
        expect(typeof setLocalStorage).toBe("function")
    })
    test('should be undefined', () => {
        expect(setLocalStorage()).toBeUndefined()
    })
})

describe('Tests for cleanForm', () => {
    test('should be defined', () => {
        expect(cleanForm).toBeDefined()
    })
    test('should be function', () => {
        expect(typeof cleanForm).toBe("function")
    })
    test('should be undefined', () => {
        expect(cleanForm()).toBeUndefined()
    })
})

describe('Tests for addListenerAll', () => {
    test('should be defined', () => {
        expect(addListenerAll).toBeDefined()
    })
    test('should be function', () => {
        expect(typeof addListenerAll).toBe("function")
    })
    test('should be undefined', () => {
        expect(addListenerAll()).toBeUndefined()
    })
})

describe('Tests for init', () => {
    test('should be defined', () => {
        expect(init).toBeDefined()
    })
    test('should be function', () => {
        expect(typeof init).toBe("function")
    })
    test('init', () => {
        expect(init(state)).toBeUndefined();
    })
})