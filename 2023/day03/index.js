const fs = require('node:fs');

let data
let result = 0

try {
  // Replace all symbols with X and split rows
  data = fs.readFileSync('data.txt', 'utf8').toString().toLowerCase().replace(/[*\-=$+&@#/%]/g, 'X').split('\n');
} catch (err) {
  console.error(err);
}

const dataArray = data.reduce((newRow, row) => {
  // Split numbers
  newRow.push(row.split(/(\d+)/g).filter(value => { return value.length > 0 }))
  return newRow
}, []); // Start with an empty array

// Check if number is valid
const isValid = (nrStart, nrEnd, rowNr) => {
  let includesX = false
  const maxRowToCheck = rowNr+1 > data.length -1 ? data.length -1 : rowNr+1
  const minRowToCheck = rowNr >  0 ? rowNr-1 : rowNr

  for (let rowToCheck = minRowToCheck; rowToCheck <= maxRowToCheck; rowToCheck++) {
    const rowPartToCheck = data[rowToCheck].substring(nrStart-1, nrEnd +2)
    includesX = rowPartToCheck.toLowerCase().includes('x') ? true : includesX
  }
  return includesX
}

dataArray.forEach((row, rowNr) => {
  let nextStart = 0

  row.forEach(value => {
    const indexStart = nextStart
    const indexEnd = nextStart + ( value.length - 1)
    const isNumber = Number(value) >= 0 || Number(value) <= 0

    if(isNumber) {
      let isAValidNumber = isValid(indexStart, indexEnd, rowNr)
      result += isAValidNumber ? Number(value) : 0
    }
    nextStart += value.length
  });
});

console.log(`Part One: ${result}`)