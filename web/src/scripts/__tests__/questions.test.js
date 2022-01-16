const { cancelDeleting, deleteQuestion, postQuestions, addListenersQuestions, generate,
        fillFileSystems, searchButtonHandler, questionsFilter, questionsList, checkModalQuestion,
        openModalDelete } = require('../questions');

describe('tests for cancelDeleting', () => {
    test('should be defined', () => {
        expect(cancelDeleting).toBeDefined()
    })
    test('should be function', () => {
        expect(typeof cancelDeleting).toBe("function")
    })
})

describe('tests for deleteQuestion', () => {
    test('should be defined', () => {
        expect(deleteQuestion).toBeDefined()
    })
    test('should be function', () => {
        expect(typeof deleteQuestion).toBe("function")
    })
})

describe('tests for postQuestions', () => {
    test('should be defined', () => {
        expect(postQuestions).toBeDefined()
    })
    test('should be function', () => {
        expect(typeof postQuestions).toBe("function")
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

describe('tests for generate', () => {
    test('should be defined', () => {
        expect(generate).toBeDefined()
    })
    test('should be function', () => {
        expect(typeof generate).toBe("function")
    })
})

describe('tests for fillFileSystems', () => {
    test('should be defined', () => {
        expect(fillFileSystems).toBeDefined()
    })
    test('should be function', () => {
        expect(typeof fillFileSystems).toBe("function")
    })
})

describe('tests for searchButtonHandler', () => {
    test('should be defined', () => {
        expect(searchButtonHandler).toBeDefined()
    })
    test('should be function', () => {
        expect(typeof searchButtonHandler).toBe("function")
    })
})

describe('tests for questionsFilter', () => {
    test('should be defined', () => {
        expect(questionsFilter).toBeDefined()
    })
    test('should be function', () => {
        expect(typeof questionsFilter).toBe("function")
    })
})

describe('tests for questionsList', () => {
    test('should be defined', () => {
        expect(questionsList).toBeDefined()
    })
    test('should be function', () => {
        expect(typeof questionsList).toBe("function")
    })
})

describe('tests for checkModalQuestion', () => {
    test('should be defined', () => {
        expect(checkModalQuestion).toBeDefined()
    })
    test('should be function', () => {
        expect(typeof checkModalQuestion).toBe("function")
    })
})

describe('tests for openModalDelete', () => {
    test('should be defined', () => {
        expect(openModalDelete).toBeDefined()
    })
    test('should be function', () => {
        expect(typeof openModalDelete).toBe("function")
    })
})