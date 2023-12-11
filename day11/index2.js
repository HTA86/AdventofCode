const fs = require('node:fs');

let data
let result = 0
let galaxIndexes = {}
let expandRows = []
let expandColumns = []

try {
  data = fs.readFileSync('data.txt', 'utf8').toString().toLowerCase().split("\n");
} catch (err) {
  console.error(err);
}

const rowLength = data[0].length

// Finde rows to expand
data.forEach((row, i) => {
  includesGalaxies = row.includes('#')
  if(!includesGalaxies) { expandRows.push(i) }
});

// Find Columns to expand
for (let colid = 0; colid < data[0].length; colid++) {
  let nrOfGalaxies = 0
  for (let rowNr = 0; rowNr < data.length; rowNr++) {
    const isGalaxy = data[rowNr][colid] == '#'
    if(isGalaxy) { nrOfGalaxies++; }
  }
  if(nrOfGalaxies == 0) { expandColumns.push(colid) }
}

// Number all Galaxies
let numberOfGalaxes = 0
data.forEach((row, i) => { data[i] = row.replace(/#/g, (value, galaxIndex) => {
  numberOfGalaxes++
  galaxIndexes[numberOfGalaxes] = { row: i, index: galaxIndex }
  return numberOfGalaxes 
}) });

// expansion by x times
const expansion = 1000000

// All pairs
for (let i = 0; i < numberOfGalaxes; i++) {
  const galaxNr = i+1
  const numberOfPairs = numberOfGalaxes-galaxNr

  let galaxPairs = Array.from({ length: numberOfPairs }, (_, index) => { return index + (galaxNr+1); });
  
  galaxPairs.forEach(galaxPairId => {
    const aLocation = galaxIndexes[galaxNr]
    const bLocation = galaxIndexes[galaxPairId]

    let emptyRowsBettwen = expandRows.filter(value => { return value > aLocation.row && value < bLocation.row} ).length

    const highestIndex = aLocation.index > bLocation.index ? aLocation.index : bLocation.index
    const lowestIndex = aLocation.index < bLocation.index ? aLocation.index : bLocation.index

    let emptyColsBettwen = expandColumns.filter(value => { return value > lowestIndex && value < highestIndex} ).length

    const rowDistans = Math.abs(aLocation.row - bLocation.row)
    const indexDistans = Math.abs(aLocation.index - bLocation.index)

    const extraExpansinRows = (emptyRowsBettwen * expansion) - emptyRowsBettwen
    const extraExpansinCols = (emptyColsBettwen * expansion) - emptyColsBettwen

    const distans = rowDistans+indexDistans + extraExpansinRows + extraExpansinCols

    result += distans
  });

}

console.log('result: ' + result)
