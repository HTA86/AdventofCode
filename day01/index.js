const fs = require('node:fs');

let data
let result = 0

try {
  data = fs.readFileSync('data.txt', 'utf8').toString().toLowerCase().split("\n");
} catch (err) {
  console.error(err);
}

// Part One
data.forEach(e => {
  // Only keep int
  let allNum = e.replace(/[^\d]/g, '')

  let first = allNum[0].toString()
  let last = allNum.slice(-1).toString()

  result += Number(first + last)

});

console.log('Part one:' + result)

// Part Two
result = 0

const nrStringArray = [
  { 'oneight': '18' },
  { 'twone': '21' },
  { 'threeight': '38' },
  { 'fiveight': '58' },
  { 'sevenine': '79' },
  { 'eighthree': '83' },
  { 'eightwo': '82' },
  { 'nineight': '98' },
  { 'one': '1' },
  { 'two': '2' },
  { 'three': '3' },
  { 'four': '4' },
  { 'five': '5' },
  { 'six': '6' },
  { 'seven': '7' },
  { 'eight': '8' },
  { 'nine': '9' }
]


data.forEach(e => {

  let fullString = e

  nrStringArray.forEach((nrObject) => {
    const nrString = Object.keys(nrObject)[0]
    const nr = nrObject[nrString]
    fullString = fullString.replaceAll((nrString), (nr))
  })

  let allNum = fullString.replace(/[^\d]/g, '')

  let first = allNum[0].toString()
  let last = allNum.slice(-1).toString()

  result += Number(first + last)
});

console.log('Part Two:' + result)