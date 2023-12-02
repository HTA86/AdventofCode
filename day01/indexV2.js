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

// Reset result
result = 0

const nrStringArray = [
  { 'one': 'o1e' },
  { 'two': 't2o' },
  { 'three': 't3e' },
  { 'four': 'f4r' },
  { 'five': 'f5e' },
  { 'six': 's6x' },
  { 'seven': 's7n' },
  { 'eight': 'e8t' },
  { 'nine': 'n9e' }
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