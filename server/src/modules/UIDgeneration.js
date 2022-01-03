const fs = require('fs')

function generate() {
    const file = fs.readFileSync('./data/idFileSystems.json', 'utf-8');
    const _sym = 'abcdefghijklmnopqrstuvwxyz1234567890';
    let UID = '';

    for(let i = 0; i < 10; i++) {
        UID += _sym[Math.floor(Math.random() * (_sym.length))];
    }

    if(file.includes(UID)){
        UID = generate();
    }
    return UID;
}

module.exports = generate;