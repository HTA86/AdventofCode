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


//console.log(orderingRules)
//console.log(pageNumbers)

const pageFolowTheRules = (arr) => {
  let pagePass = true;
  let i = 0;

  while (pagePass) {
    let currentNr = parseInt(arr[i]);
    //console.log(currentNr);

    // filter the rules
    let rules = orderingRules.filter(rule => {
      let [left, right] = rule.split('|');
      return left == currentNr || right == currentNr;
    })

    let orderPass = true;
    let j = i+1;

    while (orderPass && arr.length > j) {
      let currentOrder = currentNr + '|' + arr[j];
      let reverseOrder = arr[j] + '|' + currentNr;
      
      //console.log(currentOrder)
      //let correctOrder = rules.filter(rule => { return rule == currentOrder }).length > 0;
      let incorrectOrder = rules.filter(rule => { return rule == reverseOrder }).length > 0;

      if(incorrectOrder) { orderPass = false }

      //console.log('correctOrder: ' + correctOrder)
      //console.log('incorrectOrder: ' + incorrectOrder)
      j++
    }

    pagePass = orderPass;

    //console.log(rules)
    //console.log('')


    i++ // brake if array end
    if (i == arr.length) { break }

  }


  return pagePass
}


// Part One
console.time('Execution Time Part One');

pageNumbers.forEach(nrRow => {
  let nrArray = nrRow.split(',')
  let midIndex = Math.floor(nrArray.length / 2);

  let midNr = pageFolowTheRules(nrArray) ? Number(nrArray[midIndex]) : 0;

  result += midNr
  //console.log(test)



});


console.timeEnd('Execution Time Part One');
console.log('Part one: ' + result)


// Part Two
result = 0
console.time('Execution Time Part Two');



console.timeEnd('Execution Time Part Two');
console.log('Part two: ' + result)

