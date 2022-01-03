const fs = require('fs')

function getDevelopersData() {

    const devData = fs.readFileSync('./data/developersData.json', 'utf-8');
    return JSON.parse(devData);
}

module.exports = getDevelopersData;