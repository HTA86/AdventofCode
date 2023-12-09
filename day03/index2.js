const fs = require('node:fs');

let data
let result = 0

try {
  // Replace all symbols with X and split rows
  data = fs.readFileSync('exemp.txt', 'utf8').toString().toLowerCase().replace(/\*/g, 'X').split('\n');
} catch (err) {
  console.error(err);
}



// ------ ------ -------- ----- --- -- -
// ------ ------ -------- ----- --- -- -
// ------ ------ -------- ----- --- -- -
// ------ ------ -------- ----- --- -- -
// NOT
//      STARTED
//                Yet
// ------ ------ -------- ----- --- -- -
// ------ ------ -------- ----- --- -- -
// ------ ------ -------- ----- --- -- -
// ------ ------ -------- ----- --- -- -




const dataArray = data.reduce((newRow, row) => {
  // Split numbers
  newRow.push(row.split(/(\d+)/g).filter(value => { return value.length > 0 }))
  return newRow
}, []); // Start with an empty array


// Check row
const isValid = (nrStart, nrEnd, rowNr) => {
  let includesX = false
  const maxRowToCheck = rowNr+1 > data.length -1 ? data.length -1 : rowNr+1
  const minRowToCheck = rowNr >  0 ? rowNr-1 : rowNr

  for (let rowToCheck = minRowToCheck; rowToCheck <= maxRowToCheck; rowToCheck++) {
    //console.log('Row To Check = ' + rowToCheck + ' rowNr: ' + rowNr)
    const rowPartToCheck = data[rowToCheck].substring(nrStart-1, nrEnd +2)
    includesX = rowPartToCheck.toLowerCase().includes('x') ? true : includesX
    //console.log(rowPartToCheck)
  }
  
  // console.log('CHECK ROW')
  
  
  
  return includesX
}





dataArray.forEach((row, rowNr) => {
  let nextStart = 0

  row.forEach(value => {
    const indexStart = nextStart
    const indexEnd = nextStart + ( value.length - 1)
    const isNumber = Number(value) >= 0 || Number(value) <= 0

    //console.log('value: ' + value + ' indexStart: ' + indexStart + ' indexEnd: ' + indexEnd + ' rowNr: ' + rowNr)
    if(isNumber) {
      
      let isAValidNumber = isValid(indexStart, indexEnd, rowNr)
      if (isAValidNumber) {
        //console.log(Number(value))
        result += Number(value)
      }
      //result += isAValidNumber ? Number(value) : result
    }
    nextStart += value.length
  });

  //console.log(row)
});



//console.log(dataArray)

// Part One
console.log(`Part One: ${result}`)


// Part Two
//result = 0
//console.log(`Part Two: ${result}`)