const fs = require('node:fs');

let data
let result = 0
let rowNotOk = []


try {
  data = fs.readFileSync('data.txt', 'utf8').toString().toLowerCase().split("\n");
} catch (err) {
  console.error(err);
}


const checkRow = (row) => {
  let rowOk = false
  let asc = [...row].sort((a, b) => a - b)
  let desc = [...asc].reverse()

  // Correct order
  if (JSON.stringify(row) == JSON.stringify(asc) || JSON.stringify(row) == JSON.stringify(desc)) {

    // Max 3 increase or decrease
    rowOk = true
    for (let i = 1; i < row.length; i++) {
      let diff = Math.abs(row[i - 1] - row[i]);
      if (diff > 3 || diff < 1) {
        rowOk = false
      }
    }
  }
  return rowOk
}


// Part One
data.forEach(e => {
  let row = e.split(" ")
  let rowOk = checkRow(row)

  if(rowOk) { result ++ }
  if(!rowOk) { rowNotOk.push(row) }
});

console.log('Part one: ' + result)






// Part two
rowNotOk.forEach(e => {

  for (let i = 0; i < e.length; i++) {
      let shortRow = [...e]
      shortRow.splice(i, 1)

      let rowOk = checkRow(shortRow)

      if (rowOk) { 
        result ++
        i = e.length
        //console.log('Breake True =) ')
      }
  }

});

console.log('Part two: ' + result)
