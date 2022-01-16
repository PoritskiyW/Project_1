const fs = require('fs');
const path = require('path');

function cleanImageDir() {
    const devData = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', 'data', 'developers.json'), 'utf-8')).person;
    const files = fs.readdirSync(path.join(__dirname, '..', '..', 'data', 'images'), {withFileTypes: true})
    let filesArray = [];
    for (let j = 0; j < devData.length; j++) {
        filesArray.push(devData[j].images);
    }
    filesArray = filesArray.join('');
    for (let i = 0; i < files.length; i++) {
        const item = files[i];
        if (!filesArray.includes(item.name)){
            fs.unlinkSync(path.join(__dirname, '..', '..', 'data', 'images', item.name));
        }
    }
}


module.exports = cleanImageDir;