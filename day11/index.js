const fs = require('node:fs');

/*
empty space (.) and galaxies (#)

1. Expand all rows and columns
*/


let data

try {
  data = fs.readFileSync('exemp1.txt', 'utf8').toString().toLowerCase().split("\n");
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
// Expand Columns
expandColumns.forEach(colid => {
  for (let rowNr = 0; rowNr < data.length; rowNr++) {
    let splitedRow = data[rowNr].split('')
    splitedRow.splice(colid, 0, '.')
    const newRow = splitedRow.join('')
    data[rowNr] = newRow
  }
});

// Number all Galaxies
let numberOfGalaxes = 0
data.forEach((row, i) => { data[i] = row.replace(/#/g, () => { numberOfGalaxes++; return numberOfGalaxes }) });

// All pairs

for (let i = 0; i < numberOfGalaxes; i++) {
  const galaxNr = i+1
  console.log('numberOfGalaxes: ' + numberOfGalaxes + ' galaxNr: ' + galaxNr)
  console.log('numberOfGalaxes - galaxNr: ' + (numberOfGalaxes - galaxNr))
  console.log(' ')

  //let galaxPairs = Array.from({ length: 5 }, function(_, index) { return index + 5; });
  
}

console.log('result: ')
console.log(data)
