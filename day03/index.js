const fs = require('node:fs');

let data
let result = 0

try {
  data = fs.readFileSync('data.txt', 'utf8').toString().toLowerCase().split('\n');
} catch (err) {
  console.error(err);
}

const rowLength = data[0].length - 1
const numberOfRows = data.length - 1
let dataObject = {}

data.forEach((dataRow, index) => {
  const nrAndSymbol = dataRow.split('.').filter((a) => { return a.length > 0 })

  dataObject[index] = { values: [], symbols: [] }

  nrAndSymbol.forEach(valueAndSymbol => {
    // Only number
    const valueSplit = valueAndSymbol.split(/[^a-zA-Z0-9]/).filter(a => { return a.length > 0 })[0]
    const value = valueSplit ? valueSplit.replace(/[^0-9]/g, '') : undefined
    let valuePlace = 0

    const valueExists = dataObject[index].values.some(obj => obj.hasOwnProperty(value));

    const regex = new RegExp(`\\b${value}\\b`, 'g');
    let match;
    let indexesValues = [];
    while ((match = regex.exec(dataRow)) !== null) {
      indexesValues.push(match.index);
    }

    if(indexesValues.length > 1 && valueExists) {
      valuePlace = indexesValues[1]
    } else {
      valuePlace = indexesValues[0]
    }    

    const symbol = valueAndSymbol.split(/\d/g).filter(a => { return a.length > 0 })[0]

    if (value) {
      dataObject[index].values.push({ [value]: { place: valuePlace, included: false } })
    }

    if (symbol) {
      const allIndexes = []

      for (let i = 0; i < dataRow.length; i++) {
        if (dataRow[i] === symbol) {
          allIndexes.push(i)
        }
      }

      const symbolPlace = dataRow.indexOf(symbol)

      const unicSet = new Set([...dataObject[index].symbols, ...allIndexes])

      dataObject[index].symbols = [...unicSet]
    }
  });
});



Object.keys(dataObject).forEach(rowIndex => {
  const row = dataObject[rowIndex]

  row.values.forEach((valueData, valueIndex) => {
    const value = Object.keys(valueData)[0]
    const valueStart = valueData[value].place
    const valueEnd = valueStart + (value.length - 1)

    const findValueStart = valueStart < 1 ? 0 : valueStart - 1
    const findValueEnd = valueEnd == rowLength ? rowLength : valueEnd + 1

    // Check if symbol
    const rowsToCheck = [rowIndex]
    if (Number(rowIndex) > 0) { rowsToCheck.push(Number((rowIndex) - 1).toString()) }
    if (Number(rowIndex) < numberOfRows) { rowsToCheck.push((Number(rowIndex) + 1).toString()) }

    rowsToCheck.forEach(checkRowIndex => {

      const symbolIndexArray = dataObject[checkRowIndex].symbols

      symbolIndexArray.forEach(symbolIndex => {

        if (symbolIndex && symbolIndex >= findValueStart && symbolIndex <= findValueEnd) {
          dataObject[rowIndex].values[valueIndex][value].included = true
        }
      });


    });
  })
});

console.log(JSON.stringify(dataObject, null, 4))


Object.keys(dataObject).forEach(rowId => {
  dataObject[rowId].values.forEach(valueObject => {
    let values = Object.keys(valueObject).filter(valueKey => { return valueObject[valueKey].included })

    values.forEach(value => {
      result += Number(value)
    });
  });

});


// Part One
console.log(`Part One: ${result}`)


// Part Two
result = 0
console.log(`Part Two: ${result}`)