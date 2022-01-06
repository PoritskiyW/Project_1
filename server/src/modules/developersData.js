const fs = require('fs');
const path = require('path');

function getDevelopersData() {

    const devData = fs.readFileSync(path.join(__dirname, '..', '..', 'data', 'developers.json'), 'utf-8');
    const data = JSON.parse(devData);
    return data.person
}

module.exports = getDevelopersData;