const fs = require('node:fs');

let data
let result = 0


try {
  data = fs.readFileSync('data.txt', 'utf8').toString().toLowerCase().split("\n");
} catch (err) {
  console.error(err);
}

const reverse = (string) => {
  return string.split('').reverse().join('');
}

const findXmas = (string) => {
  let row = string.replace(/xmas/g, '.');
  let dotCount = (row.match(/\./g) || []).length;
  result += dotCount;
}

const vertical = () => {
  let splitRows = data.map(row => row.split(''));
  let transposed = splitRows[0].map((_, colIndex) => splitRows.map(row => row[colIndex]));
  return transposed.map(row => row.join(''));
}

const diagonal = (dataInput) => {
  let diagonals = []
  let splitRows = dataInput.map(row => row.split(''));

  for (let i = 0; i < splitRows.length; i++) {
    for (let j = 0; j < splitRows[i].length; j++) {
      if (!diagonals[i + j]) {
        diagonals[i + j] = [];
      }
      diagonals[i + j].push(splitRows[i][j]);
    }
  }

  return diagonals.map(diagonal => diagonal.join(''));
}

// Part One
console.time('Execution Time Part One');
//console.log(data)
let verticalData = vertical()
let diagonalData = diagonal(data)

let reversedData = data.map(str => str.split('').reverse().join(''));
let diagonalReverseData = diagonal(reversedData)

data.forEach(e => {
  findXmas(e)
  findXmas(reverse(e))
});

 verticalData.forEach(e => {
   findXmas(e)
   findXmas(reverse(e))
 });
 
 diagonalData.forEach(e => {
   findXmas(e)
   findXmas(reverse(e))
 });
 
 diagonalReverseData.forEach(e => {
   findXmas(e)
   findXmas(reverse(e))
 });

console.timeEnd('Execution Time Part One');
console.log('Part one: ' + result)


// Part Two

result = 0
console.time('Execution Time Part Two');

const validCrossLine = (string) => {
  return string == 'mas' || string == 'sam' ? true : false
}

let rowIndex = 1; // Start att second row
while (true) {
  const firstRow = data[rowIndex - 1];
  const secondRow = data[rowIndex]
  const lastRow = data[rowIndex + 1];

  // start att first character
  let stringIndex = 0;
  while (true) {
      // Cross line 1
      cross1 = firstRow[stringIndex] + secondRow[stringIndex + 1] + lastRow[stringIndex + 2]

      // Cross line 2
      cross2 = firstRow[stringIndex + 2] + secondRow[stringIndex + 1] + lastRow[stringIndex]

      const validCross = validCrossLine(cross1) && validCrossLine(cross2)

      if (validCross) { result++ }

      stringIndex++
      if (stringIndex === firstRow.length - 2) { break; }
  }


  rowIndex++;
  if (rowIndex === data.length - 1) { break; }
}

console.timeEnd('Execution Time Part Two');
console.log('Part two: ' + result)

