const fs = require('node:fs');

let data
let result = 0

try {
  data = fs.readFileSync('data.txt', 'utf8').toString().toLowerCase().split("\n");
} catch (err) {
  console.error(err);
}



data.forEach(dataRow => {

});


// Part One

console.log(`Part One: ${result}`)



// Part Two
result = 0

console.log(`Part Two: ${result}`)