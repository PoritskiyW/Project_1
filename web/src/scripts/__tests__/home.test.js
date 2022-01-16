const { routeModal, fillForm, modalDeveloper, uploadFile, postDataPhoto } = require('../home');
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
        //
        setInnerHtml: jest.fn(() => true),
        postImg: jest.fn(),
        getData: jest.fn(),
        postData: jest.fn(),
        getHidden: jest.fn(() => "main-image1"),
        getFileImg: jest.fn(() =>  file),
        renderFiled: jest.fn(),
        containerQuerySelectorAll: jest.fn(),
    };
});

const devData = {
    "person": [
        {
            "id": 1,
            "name": "Viacheslav",
            "surname": "Poritskiy",
            "age": "23",
            "sex": "Male",
            "birthday": "1998-10-29",
            "locations": "Kharkov",
            "hobby": "*Хорошее описание моих хобби*",
            "images": "./images/11642350827153.jpg"
        },
        {
            "id": 2,
            "name": "Viktoria",
            "surname": "Bereziuk",
            "age": 26,
            "sex": "Female",
            "birthday": "1995-07-20",
            "locations": "Kharkov",
            "hobby": "Travel, gum, cinema, hiking, music",
            "images": "./images/21642351385306.jpg"
        },
        {
            "id": 3,
            "name": "Yehor",
            "surname": "Antonov",
            "age": 18,
            "sex": "Male",
            "birthday": "2003-07-24",
            "locations": "Kharkov",
            "hobby": "games, music, reading, technologies",
            "images": "./images/31642351385306.jpg"
        },
        {
            "id": 4,
            "name": "Vladyslav",
            "surname": "Spirin",
            "age": 21,
            "sex": "Male",
            "birthday": "2000-05-02",
            "locations": "Kharkov",
            "hobby": "ММО games",
            "images": "./images/41642351385306.jpg"
        }
    ]
}

describe('test home page', () => {
    test('test', () => {
        expect(true).toBe(true);
    })
    //1
    test('should be defined', () => {
        expect(routeModal).toBeDefined()
    })
    test('should be function', () => {
        expect(typeof routeModal).toBe('function');
    })
    test('route modal', () => {
        expect(routeModal('route1')).toBeUndefined();
    })
//2
    test('should be defined', () => {
        expect(fillForm).toBeDefined()
    })
    test('should be function', () => {
        expect(typeof fillForm).toBe('function');
    })
    test('fill form', () => {
        expect(fillForm(devData)).toBeUndefined();
    })
//3
    const a = {id: 'image-input1'}
    test('should be defined', () => {
        expect(uploadFile).toBeDefined()
    })
    test('should be function', () => {
        expect(typeof uploadFile).toBe('function');
    })
    test('upload file', () => {
        expect(uploadFile(a)).toBeUndefined()
    })
//4
    const fileArr =[{lastModified: 1642101771303,
        lastModifiedDate: 'Thu Jan 13 2022 21:22:51 GMT+0200 (Восточная Европа, стандартное время)',
        name: "Viktoria.jpg",
        size: 91465,
        type: "image/jpeg",
        webkitRelativePath: ""}];
    test('should be defined', () => {
        expect(postDataPhoto).toBeDefined()
    })
    test('should be function', () => {
        expect(typeof postDataPhoto).toBe('function');
    })
    test('post data photo', () => {
        expect(postDataPhoto(fileArr, '11642354242359.jpg')).toBeUndefined()
    })

    // 5
    test('should be defined', () => {
        expect(modalDeveloper).toBeDefined()
    })
    test('should be function', () => {
        expect(typeof modalDeveloper).toBe('function');
    })
    // test('modal developer', () => {
    //     expect(modalDeveloper(devData)).toBeUndefined()
    // })
})