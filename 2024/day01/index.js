const fs = require('node:fs');

let data
let result = 0

let left = [];
let right = [];

try {
  data = fs.readFileSync('data.txt', 'utf8').toString().toLowerCase().split("\n");
} catch (err) {
  console.error(err);
}

// Part One
data.forEach(e => {
  let numOnRow = e.split(" ")

  let leftNum = Number(numOnRow[0])
  let rightNum = Number(numOnRow[numOnRow.length -1])

  left.push(leftNum)
  right.push(rightNum)
});

left.sort((a, b) => a - b)
right.sort((a, b) => a - b)

for (let i = 0; i < left.length; i++) {

  let distance = Math.abs(left[i] - right[i]);
  result += distance;
}
console.log('Part one: ' + result)



// Part two
result = 0
for (let i = 0; i < left.length; i++) {

  let appears = right.filter(e => e === left[i]).length
  result += (appears * left[i]);
}

console.log('Part two: ' + result)
