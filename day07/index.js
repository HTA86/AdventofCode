const fs = require('node:fs');

let data
let result = 1

try {
  data = fs.readFileSync('data.txt', 'utf8').toString().toLowerCase().split("\n");
} catch (err) {
  console.error(err);
}

const timeRow = data[0].split(':')[1].trim().split(' ').filter(value => { return value.length > 0 }).map(stringTime => { return Number(stringTime) })
const distanceRow = data[1].split(':')[1].trim().split(' ').filter(value => { return value.length > 0 }).map(stringDistance => { return Number(stringDistance) })



console.log(result)
