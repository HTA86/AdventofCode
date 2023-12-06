const fs = require('node:fs');

let data
let result = 1

try {
  data = fs.readFileSync('data.txt', 'utf8').toString().toLowerCase().split("\n");
} catch (err) {
  console.error(err);
}

const rekordTime = data[0].split(':')[1].replace(/\s/g, '')
const distance = data[1].split(':')[1].replace(/\s/g, '')


console.log(result)