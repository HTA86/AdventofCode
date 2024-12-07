const fs = require('node:fs');

let data
let result = 0


try {
  data = fs.readFileSync('data.txt', 'utf8').toString().toLowerCase().split("\n");
} catch (err) {
  console.error(err);
}

const equationTes = (testValue, numberArray, operatorCombinations) => {
  let calcResult = 0

  // loop through all possible combinations or equal to testValue
  for (let i = 0; i < operatorCombinations.length; i++) {
    const operatorArray = operatorCombinations[i]

    // add the first number to the string
    let expressionResult = numberArray[0];
  

    // Loop and add the rest operators and numbers
    for (let j = 0; j < operatorArray.length; j++) {
      const expression = `${expressionResult}${operatorArray[j]}${numberArray[j+1]}`
      expressionResult = eval(expression);
    }
    if (expressionResult === testValue) { return expressionResult }
  }

  return 0;
}


// Generate all possible combinations of operators
const generateOperatorCombinations = (operators, operatorPositions) => {
  const combinations = [];

  const generateCombination = (currentCombination) => {
    // If required number of operator positions, add it and return
    if (currentCombination.length === operatorPositions) { combinations.push(currentCombination); return }

    // Loop through all available operators
    for (let operator of operators) { generateCombination([...currentCombination, operator]) }
  }

  generateCombination([]) // Start with an empty array

  return combinations;
};


// Part One
console.time('Execution Time Part One');
const operators = ['+', '*']

data.forEach(rowData => {
  const row = rowData.split(': ')
  const testValue = Number(row[0])
  const numberArray = row[1].split(' ')
  const operatorCombinations = generateOperatorCombinations(operators, numberArray.length - 1)

  result += equationTes(testValue, numberArray, operatorCombinations)
});


console.timeEnd('Execution Time Part One');
console.log('Part one: ' + result)

// Part Two
result = 0;
console.time('Execution Time Part Two');

console.timeEnd('Execution Time Part Two');
console.log('Part two: ' + result)

