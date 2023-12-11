const fs = require('node:fs');

/*
empty space (.) and galaxies (#)

1. Expand all rows and columns
*/


let data
let result = 0
let galaxIndexes = {}

try {
  data = fs.readFileSync('data.txt', 'utf8').toString().toLowerCase().split("\n");
} catch (err) {
  console.error(err);
}

let expandRows = []
let expandColumns = []

// Finde rows to expand
data.forEach((row, i) => {
  includesGalaxies = row.includes('#')
  if(!includesGalaxies) { expandRows.push(i) /* console.log('No Galax'); console.log(i); console.log(' ') */ }
});
// Expand rows
let rowsAdded = 0
expandRows.forEach(rowNr => { data.splice((rowNr+rowsAdded), 0, data[(rowNr+rowsAdded)]); rowsAdded++ });

// Find Columns to expand
for (let colid = 0; colid < data[0].length; colid++) {
  let nrOfGalaxies = 0
  for (let rowNr = 0; rowNr < data.length; rowNr++) {
    const isGalaxy = data[rowNr][colid] == '#'
    if(isGalaxy) { nrOfGalaxies++; /* console.log('GALAX ' + ' rowNr: ' + rowNr + ' colid: ' + colid)*/ }
  }
  if(nrOfGalaxies == 0) { expandColumns.push(colid) }
}

let colIdAdded = 0
// Expand Columns
expandColumns.forEach(colid => {
  for (let rowNr = 0; rowNr < data.length; rowNr++) {
    let splitedRow = data[rowNr].split('')
    splitedRow.splice((colid+colIdAdded), 0, '.')
    const newRow = splitedRow.join('')
    data[rowNr] = newRow
  }
  colIdAdded++
});

// Number all Galaxies
let numberOfGalaxes = 0
data.forEach((row, i) => { data[i] = row.replace(/#/g, (value, galaxIndex) => {
  numberOfGalaxes++
  galaxIndexes[numberOfGalaxes] = { row: i, index: galaxIndex }
  return numberOfGalaxes 
}) });

// All pairs
for (let i = 0; i < numberOfGalaxes; i++) {
  const galaxNr = i+1
  const numberOfPairs = numberOfGalaxes-galaxNr
  //console.log('galaxNr: ' + galaxNr + ' numberOfPairs: ' + (numberOfPairs))

  let galaxPairs = Array.from({ length: numberOfPairs }, (_, index) => { return index + (galaxNr+1); });
  
  galaxPairs.forEach(galaxPairId => {
    const aLocation = galaxIndexes[galaxNr]
    const bLocation = galaxIndexes[galaxPairId]
    const rowDistans = Math.abs(aLocation.row - bLocation.row)
    const indexDistans = Math.abs(aLocation.index - bLocation.index)
    const distans = rowDistans+indexDistans
    //console.log('Distans = ' + (distans))

    result += distans
  });
  //console.log(galaxPairs)
  //console.log(' ')

}

//console.log(galaxIndexes)
console.log('result: ' + result)
//console.log(data)
