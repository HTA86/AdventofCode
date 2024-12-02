const fs = require('node:fs');

let data
let result = 0

try {
  data = fs.readFileSync('data.txt', 'utf8').toString().toLowerCase().split("\n");
} catch (err) {
  console.error(err);
}

const replaceCharacterAt = (string, index, replacement) => {
  return string.substring(0, index) + replacement + string.substring(index + 1);
}

const posibleMove = (rowNr, charNr) => {
  let prevRowNr = rowNr
  let moveToRow = -1
  while (prevRowNr > 0) {
    prevRowNr--
    const prevRowChar = data[prevRowNr][charNr]

    // if pre row = o no move is posible
    if (prevRowChar == 'o' || prevRowChar == '#') {
      prevRowNr = 0
      break
    }
    moveToRow = prevRowNr
  }

  const moveTo = { posible: (moveToRow > -1), moveToRow, moveFromRow: rowNr, charNr }
  return moveTo
}

const moveAllInOneCol = (charNr) => {
  data.forEach((row, rowNr) => {
    let char = row[charNr]
    // char is O and not first row
    if (char == 'o' && rowNr > 0) {

      // Find the lowest row to move to
      const move = posibleMove(rowNr, charNr)

      if (move.posible) {
        const fromRowData = [...data[move.moveFromRow]].join('')
        const toRowData = [...data[move.moveToRow]].join('')
        
        const fromChar = fromRowData[charNr]
        const toChar = toRowData[charNr]

        //console.log('Move rowNr: ' + rowNr + ' char: ' + fromChar + ' To Row: ' + move.moveToRow)
        //console.log(' ')

        data[move.moveFromRow] = replaceCharacterAt(fromRowData, move.charNr, toChar)
        data[move.moveToRow] = replaceCharacterAt(toRowData, move.charNr, fromChar)
      }
    }
  });
}

for (let charNr = 0; charNr < data[0].length; charNr++) {
  moveAllInOneCol(charNr)
}


data.forEach((r, i) => {
  const valueWeight = data.length - i
  nrOfO = (r.match(/o/g) || []).length
  result += (nrOfO * valueWeight)
  //console.log(r)
});

//console.log(data)
console.log('result: ' + result)
