const fs = require('node:fs');

let data
let result = 0


try {
  data = fs.readFileSync('sample2.txt', 'utf8').toString().toLowerCase().split("\n");
} catch (err) {
  console.error(err);
}

// Split on the blank row
const splitIndex = data.indexOf('');
let orderingRules = data.slice(0, splitIndex);
let pageNumbers = data.slice(splitIndex + 1);
let wrongPageNumbers = [];


const pageFolowTheRules = (arr) => {
  let pagePass = true;
  let i = 0;

  while (pagePass) {
    let currentNr = parseInt(arr[i]);

    // filter the rules
    let rules = orderingRules.filter(rule => {
      let [left, right] = rule.split('|');
      return left == currentNr || right == currentNr;
    })

    let orderPass = true;
    let j = i + 1;

    while (orderPass && arr.length > j) {
      let reverseOrder = arr[j] + '|' + currentNr;
      let incorrectOrder = rules.filter(rule => { return rule == reverseOrder }).length > 0;

      if (incorrectOrder) { orderPass = false }
      j++
    }

    pagePass = orderPass;

    i++ // brake if array end
    if (i == arr.length) { break }
  }
  return pagePass
}


const checkValidOrder = (nrOne, nrTwo) => {
  // filter the rules
  return orderingRules.filter(rule => {
    let [left, right] = rule.split('|');
    return left == nrOne && right == nrTwo;
  }).length > 0;
}

const correctTheOrder = (arr) => {
  console.log(arr)
  let incorrectOrder = true
  let i = 0
  let newArray = [...arr]

  while (incorrectOrder) {
    let currentNr = arr[i]
    let nextNr = arr[i + 1]
    console.log(currentNr + ' ' + nextNr)

    // filter the rules
    let isValidOrder = checkValidOrder(currentNr, nextNr)

    // If incorrect order, move the current nr 1 forward
    if (!isValidOrder) {
      let iToMove = i
      let moveTo = i + 1
      let maxMove = newArray.length-1
      while (maxMove > 0) {
        console.log('Move ' + iToMove + ' forward')
        // Number to move
        let numberToMove = newArray.splice(iToMove, 1)[0];
        // insert one forword
        newArray.splice(moveTo, 0, numberToMove);
        console.log(newArray)
        maxMove--

        // If the moveTo is moved to the start, set iToMove to 0
        if (moveTo === 0) {
          iToMove = 0
        } else {
          iToMove++
        }

        // If the moved number is in the last place, place it in beginig of the array
        if (moveTo === newArray.length - 1) {
          moveTo = 0
        } else {
          moveTo++
        }



      }
    }
    console.log(isValidOrder)

    i++
    incorrectOrder = i < (arr.length - 1)
  }
}


// Part One
console.time('Execution Time Part One');

pageNumbers.forEach(nrRow => {
  let nrArray = nrRow.split(',')
  let midIndex = Math.floor(nrArray.length / 2);
  let midNr = 0



  if (pageFolowTheRules(nrArray)) {
    midNr = Number(nrArray[midIndex])
  } else {
    wrongPageNumbers.push(nrRow)
  }

  result += midNr
});
console.timeEnd('Execution Time Part One');
console.log('Part one: ' + result)



// Part Two
result = 0;
console.time('Execution Time Part Two');

wrongPageNumbers.forEach(nrRow => {
  let nrArray = nrRow.split(',')
  // Correct the order
  correctTheOrder(nrArray)
});

console.timeEnd('Execution Time Part Two');
console.log('Part two: ' + result)

