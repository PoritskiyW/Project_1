const {
    route,
    postData,
    getData,
    fillState,
    openModal,
    closedModal,
    getLocalStorage,
    setLocalStorage,
    cleanForm,
    addListenerAll,
    init,
} = require('../index')

let obj = {
    csv: {questions: Array(7)},
    dev: {person: Array(4)},
    jsonD: {questions: Array(8)},
    xml: {questions: Array(9)},
    yaml: {questions: Array(7)}
}

jest.mock('../utils', () => {
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
    };
});

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

describe('Tests for postData', () => {
    test('should be defined', () => {
        expect(postData).toBeDefined()
    })
    test('should be function', () => {
        expect(typeof postData).toBe("function")
    })
})

describe('Tests for getData', () => {
    test('should be defined', () => {
        expect(getData).toBeDefined()
    })
    test('should be function', () => {
        expect(typeof getData).toBe("function")
    })
})

describe('Tests for fillState', () => {
    test('should be defined', () => {
        expect(fillState).toBeDefined()
    })
    test('should be function', () => {
        expect(typeof fillState).toBe("function")
    })
    // test('should be undefined result', () => {
    //
    //     expect(fillState(obj)).toBeUndefined()
    // })
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
    // test('should be undefined', () => {
    //     expect(closedModal()).toBeUndefined()
    // })
})

describe('Tests for getLocalStorage', () => {
    test('should be defined', () => {
        expect(getLocalStorage).toBeDefined()
    })
    test('should be function', () => {
        expect(typeof getLocalStorage).toBe("function")
    })
    test('should be false', () => {
        expect(getLocalStorage()).toBe(false)
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
    // test('should be undefined', () => {
    //     expect(cleanForm()).toBeUndefined()
    // })
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
})