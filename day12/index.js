const fs = require('node:fs');

let data
let result = 0

try {
  data = fs.readFileSync('exemp.txt', 'utf8').toString().toLowerCase().split("\n");
} catch (err) {
  console.error(err);
}

const allRows = data.reduce((toReturn, row) => {
  const [springs, damaged] = row.split(' ');
  toReturn.push( { springs, damaged } )
  return toReturn;
}, []); // Start with an empty object


console.log(data)
console.log(allRows)
console.log('result: ' + result)
