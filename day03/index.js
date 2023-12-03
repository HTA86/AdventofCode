const fs = require('node:fs');

let data
let result = 0

try {
  data = fs.readFileSync('data.txt', 'utf8').toString().toLowerCase().split('\n');
} catch (err) {
  console.error(err);
}

console.log(data)

let dataObject = {}

data.forEach((dataRow, index) => {
  const nrAndSymbol = dataRow.split('.').filter((a) => {return a.length > 0})

  dataObject[index] = { 
    values: [ 
      { '467': {place: 0, included: false} },
      { '114': {place: 5, included: false} }
    ],
    symbols: [1,4]
  }

  dataObject[index] = { values: [], symbols: [] }

  nrAndSymbol.forEach(valueAndSymbol => {
    // Only number
    const valueSplit = valueAndSymbol.split(/[^a-zA-Z0-9]/).filter(a => { return a.length > 0})[0]
    const value = valueSplit ? valueSplit.replace(/[^0-9]/g, '') : undefined
    const valuePlace = dataRow.indexOf(value)

    const symbol = valueAndSymbol.split(/\d/g).filter(a => { return a.length > 0})[0]
    const symbolPlace = dataRow.indexOf(symbol)


    /*
    let containsSymbol = /[^a-zA-Z0-9]/.test(value);
    let containsDigits = /\d/.test(value);

    //console.log(value)
    //console.log(containsSymbol + ': ' + value)
    //console.log(place + ': ' + value)
    //console.log(value)
    //console.log(value.split(/[^a-zA-Z0-9]/).filter(a => { return a.length > 0}))
*/
    if(value) {
      dataObject[index].values.push( { [value]: { place: valuePlace, included: false } })
    }

    if(symbol) {
      dataObject[index].symbols.push(symbolPlace)
    }
    
    
  });
  
  console.log(index + ': ' + JSON.stringify(dataObject[index]))




  //console.log(index + ': ' + nrAndSymbol)
  //console.log(dataObject[index])
});





// Part One

console.log(`Part One: ${result}`)



// Part Two
result = 0

console.log(`Part Two: ${result}`)