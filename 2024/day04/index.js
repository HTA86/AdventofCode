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


const findMas = (rows) => {
  let firstRow = rows[0];
  let midleRow = rows[1];
  let lastRow = rows[2];
  let rowLength = midleRow.length-1;

  // A in the midle row?
  let indexes = midleRow.split('').map((value, index) => value === 'a' ? index : -1)
  // Only keep the indexes that are between the first and last index of the row
  .filter(index => index > 0 && index < rowLength);

  indexes.forEach(aIndex => {
    let right = firstRow[aIndex-1] + midleRow[aIndex] + lastRow[aIndex+1];
    let left = firstRow[aIndex+1] + midleRow[aIndex] + lastRow[aIndex-1];

    let xmas = (right == 'mas' || right == 'sam') && (left == 'mas' || left == 'sam') ? 1 : 0;

    result += xmas;
  });

}



result = 0
console.time('Execution Time Part Two');

let maxI = data.length - 1;

data.forEach((e, i) => {
  let start = i;
  let end   = i + 3;

  // Return if out of range
  if (end > maxI){
    return;
  }
  
  // Get 3 rows
  let part = data.slice(start, end);

  findMas(part)
});

console.timeEnd('Execution Time Part Two');
console.log('Part two: ' + result)
console.log('2004 is to LOW')

