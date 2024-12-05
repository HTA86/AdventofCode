const fs = require('node:fs');

let data
let result = 0


try {
  data = fs.readFileSync('data.txt', 'utf8').toString().toLowerCase().split("\n");
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


function compareByRules(a, b) {
  let rules = orderingRules.filter(rule => {
    let [left, right] = rule.split('|');
    return left == a && right == b || left == b && right == a;
  })
  
  // Loop all rules
  for (let rule of rules) {
    const [x, y] = rule.split('|');
    if (a === x && b === y) {
      return -1; // a is before b
    }
    if (a === y && b === x) {
      return 1; // b is before a
    }
  }
  return 0; // If not found leave it as it is
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
  let midNr = 0;
  let nrArray = nrRow.split(',')
  let midIndex = Math.floor(nrArray.length / 2);

  // sort the order
  nrArray.sort(compareByRules);
  // find the middle index
  midNr = Number(nrArray[midIndex])
  // add it to the result
  result += midNr
});

console.timeEnd('Execution Time Part Two');
console.log('Part two: ' + result)

