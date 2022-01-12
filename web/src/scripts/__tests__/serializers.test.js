const {
    getXML,
    getCSV,
    getYAML
} = require('../serializers');

let state =
    [
            {"id": 1, "question": "1111", "theme": "HTML", "answer": true, "dateModify": 0},
            {"id": 2, "question": "2222", "theme": "CSS", "answer": true, "dateModify": 0},
            {"id": 3, "question": "3333", "theme": "JS", "answer": true, "dateModify": 0},
            {"id": 4, "question": "4444", "theme": "GIT", "answer": true, "dateModify": 0},
            {"id": 5, "question": "5555", "theme": "SCSS", "answer": true, "dateModify": 0}
        ]




describe('tets for serializerCSV', () => {
    test('should be defined', () => {
        expect(getCSV).toBeDefined()
    })
    test('should be function', () => {
        expect(typeof getCSV).toBe("function")
    })
    test("should be right result", () => {

        let result =
            {
                csv: "id|||question|||theme|||answer|||dateModify\n1|||1111|||HTML|||true|||0\n2|||2222|||CSS|||true|||0\n3|||3333|||JS|||true|||0\n4|||4444|||GIT|||true|||0\n5|||5555|||SCSS|||true|||0\n"
            }
        let obj = result.csv
        expect(getCSV(state)).toBe(obj);
    });


})
describe('tets for serializerXML', () => {
    test('should be defined', () => {
        expect(getXML).toBeDefined()
    })
    test('should be function', () => {
        expect(typeof getXML).toBe("function")
    })
    test("should be right result", () => {

        let result =
            {
                xml: "<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n<root>\n<item>\n<id>1</id>\n<question>1111</question>\n<theme>HTML</theme>\n<answer>true</answer>\n<dateModify>0</dateModify>\n</item>\n<item>\n<id>2</id>\n<question>2222</question>\n<theme>CSS</theme>\n<answer>true</answer>\n<dateModify>0</dateModify>\n</item>\n<item>\n<id>3</id>\n<question>3333</question>\n<theme>JS</theme>\n<answer>true</answer>\n<dateModify>0</dateModify>\n</item>\n<item>\n<id>4</id>\n<question>4444</question>\n<theme>GIT</theme>\n<answer>true</answer>\n<dateModify>0</dateModify>\n</item>\n<item>\n<id>5</id>\n<question>5555</question>\n<theme>SCSS</theme>\n<answer>true</answer>\n<dateModify>0</dateModify>\n</item></root>"
            }
        let obj = result.xml
        expect(getXML(state)).toBe(obj);
    });

})
describe('tets for serializerYAML', () => {
    test('should be defined', () => {
        expect(getYAML).toBeDefined()
    })
    test('should be function', () => {
        expect(typeof getYAML).toBe("function")
    })
    test("should be right result", () => {

        let result =
            {
                yaml: `---\r\nquestions:\r\n - id: 1\r\n question: '1111'\r\n theme: HTML\r\n answer: 'true'\r\n dateModify: 0\r\n - id: 2\r\n question: '2222'\r\n theme: CSS\r\n answer: 'true'\r\n dateModify: 0\r\n - id: 3\r\n question: '3333'\r\n theme: JS\r\n answer: 'true'\r\n dateModify: 0\r\n - id: 4\r\n question: '4444'\r\n theme: GIT\r\n answer: 'true'\r\n dateModify: 0\r\n - id: 5\r\n question: '5555'\r\n theme: SCSS\r\n answer: 'true'\r\n dateModify: 0\r`
            }
        let obj = result.yaml;
        expect(getYAML(state)).toBe(obj);
    });
})