const fs = require('node:fs');

let data
let result = 0


try {
  data = fs.readFileSync('data.txt', 'utf8').toString().toLowerCase().split("\n");
} catch (err) {
  console.error(err);
}

const removeInvalidCharacters = (text) => {
  let validCharacters = text.match(/mul\((\d+,?)+\)/g);
  validCharacters = validCharacters.map(item => item.replace(/mul\(|\)/g, "").split(","));
  return validCharacters
}

const removeDisabled = (text) => {
  let onlyEnabled = text;


  while (true) {
    const startIdx = onlyEnabled.indexOf("don't()");
    const endIdx = onlyEnabled.indexOf("do()", startIdx);

    // if both "don't()" and "do()"
    if (startIdx !== -1 && endIdx !== -1) {
      onlyEnabled = onlyEnabled.slice(0, startIdx) + onlyEnabled.slice(endIdx + 4);  // +4 to delete "do()"
    } else {
      break;
    }
  }

  return onlyEnabled
}

const multiplayArray = (arrayInput) => {
  arrayInput.forEach(numbers => {
    if (numbers.length == 2) {
      result += numbers[0] * numbers[1]
    }
  });
}


// Part One
console.time('Execution Time Part One');
data.forEach(e => {
  let row = removeInvalidCharacters(e)
  multiplayArray(row);
});

console.timeEnd('Execution Time Part One');
console.log('Part one: ' + result)



// Part Two
result = 0
console.time('Execution Time Part Two');
let allRowsOneString = data.join('')

  let row = removeInvalidCharacters(removeDisabled( allRowsOneString ))
  multiplayArray(row);

console.timeEnd('Execution Time Part Two');
console.log('Part two: ' + result)
