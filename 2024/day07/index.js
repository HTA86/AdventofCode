const fs = require('node:fs');

let data
let dataPartTwo = {}
let result = 0


try {
  data = fs.readFileSync('data.txt', 'utf8').toString().toLowerCase().split("\n");
} catch (err) {
  console.error(err);
}

const equationTes = (testValue, numberArray, operatorCombinations = false) => {
  // loop through all possible combinations or equal to testValue
  for (let i = 0; i < operatorCombinations.length; i++) {
    const operatorArray = operatorCombinations[i]

    // add the first number to the string
    let expressionResult = numberArray[0];


    // Loop and add the rest operators and numbers
    for (let j = 0; j < operatorArray.length; j++) {
      const expression = `${expressionResult}${operatorArray[j]}${numberArray[j + 1]}`.replace("|", "")
      expressionResult = eval(expression);
    }
    if (expressionResult === Number(testValue)) { return expressionResult }
  }



  // If testValue key not in dataPartTwo then add it
  if (!(testValue in dataPartTwo)) { dataPartTwo[testValue] = [] }

  // If not ecual to the testValue then add 
  dataPartTwo[testValue].push(numberArray)
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

const meargeNumbers = (nrArray) => {
  const newArr = []

  for (let i = 0; i < nrArray.length - 1; i++) {
    // Copy the array
    const arrCopy = [...nrArray];
    // Merge two numbers
    arrCopy[i] = Number(`${nrArray[i]}${nrArray[i + 1]}`);

    // Delete the next nr that is merged
    arrCopy.splice(i + 1, 1);

    newArr.push([...arrCopy])
  }

  return newArr
}

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
//result = 0;
console.time('Execution Time Part Two');

Object.keys(dataPartTwo).forEach(key => {
  let rowData = dataPartTwo[key][0]
  const numberArray = rowData
  const testValue = key
  const operators = ['+', '*', '|']
  //console.log(numberArray)

  const operatorCombinations = generateOperatorCombinations(operators, numberArray.length - 1)
  //numberArray.forEach(nrArray => {
    //console.log(nrArray)
    //const onNrEqualTest = nrArray.length == 1 && testValue == nrArray[0]

    //if (onNrEqualTest) { result += Number(testValue); console.log('onNrEqualTest: ' + testValue); }

    //if (!onNrEqualTest) { 
      const test = equationTes(testValue, numberArray, operatorCombinations); result += test;
    //}
  //})

  //console.log(newNumberArray)
  //console.log('')
});


//console.log(dataPartTwo)

console.timeEnd('Execution Time Part Two');
console.log('Part two: ' + result)

if(result <= 20049271380) {
console.log('To Low')
}
