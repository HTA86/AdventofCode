const fs = require('node:fs');

let data
let result = 0

try {
  // Replace all symbols with X and split rows
  data = fs.readFileSync('data.txt', 'utf8').toString().toLowerCase().replaceAll(/\*/g, 'X').split('\n');
} catch (err) {
  console.error(err);
}

const dataArray = data.reduce((newRow, row) => {
  // Split X
  newRow.push(row.split(/(X)/g).filter(value => { return value.length > 0 }))
  return newRow
}, []); // Start with an empty array

const findFullNumber = (str, index) => {
  let [startIndex, endIndex] = [index, index];
  const regexNr = /\d/

  // Finde the begining of the number
  while (startIndex > 0 && regexNr.test(str[startIndex - 1])) { startIndex--; }

  // Finde the end of the number
  while (endIndex < str.length && regexNr.test(str[endIndex])) { endIndex++; }

  // Extract and return the number
  return str.slice(startIndex, endIndex);
}

// Check row
const isValid = (starIndex, rowNr) => {
  //let includesX = false
  const maxRowToCheck = rowNr + 1 > data.length - 1 ? data.length - 1 : rowNr + 1
  const minRowToCheck = rowNr > 0 ? rowNr - 1 : rowNr

  let numberAdjacentIndex = []
  let numbersArray = []

  for (let rowToCheck = minRowToCheck; rowToCheck <= maxRowToCheck; rowToCheck++) {
    const rowPartToCheck = data[rowToCheck].substring(starIndex - 1, starIndex + 2)

    // Regex match any number
    const regex = /\d/
    const matchNumber = rowPartToCheck.match(regex)

    if (matchNumber) {
      const [value1, value2, value3] = rowPartToCheck;
      const value1Match = value1.match(regex)
      const value3Match = value3.match(regex)

      // 2 numbers
      const twoNumbers = ( (value2.includes('.') || value2.includes('X')) && value1Match && value3Match) ? true : false
      if (twoNumbers) {
        let matchObject1 = { index: (starIndex - 1), row: rowToCheck }
        let matchObject2 = { index: (starIndex + 1), row: rowToCheck }
        numberAdjacentIndex.push(matchObject1)
        numberAdjacentIndex.push(matchObject2)
      } else {
        let matchObject = { index: ((starIndex - 1) + matchNumber.index), row: rowToCheck }
        numberAdjacentIndex.push(matchObject)
      }
    }
  }
  numberAdjacentIndex.forEach(adjecentIndex => {
    numbersArray.push(findFullNumber(data[adjecentIndex.row], adjecentIndex.index))
  });

  return numbersArray
}


dataArray.forEach((row, rowNr) => {
  let nextStart = 0

  row.forEach(value => {
    const indexStart = nextStart
    const isX = value == 'X'

    if (isX) {
      let validXNumbers = isValid(indexStart, rowNr)
      const validSum = validXNumbers.length == 2 ? ( validXNumbers[0] * validXNumbers[1] ) : 0
      //console.log(validSum)
      result += Number(validSum)

    }
    nextStart += value.length
  });
});


// Part Two
console.log(`Part Two: ${result}`)

// 77926915 your answer is too low

// 81939900 Correct