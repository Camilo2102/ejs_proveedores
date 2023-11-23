const fs = require('fs')
const path = require('path')
const dataPath = path.join(__dirname, '../public/data/data.json');

const writeData = (data) => {
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync(dataPath, jsonData);
}

module.exports = { writeData };


