const fs = require('fs');
const path = require('path');

const readFile = (filePathLink) => {
  const filePath = path.join(__dirname,filePathLink);
  const data = fs.readFileSync(filePath, 'utf8')
  const arr = data.split('\n')
  return arr;
}

module.exports = {readFile}
