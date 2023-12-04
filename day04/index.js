const fs = require('node:fs');

let data
let result = 0

try {
  data = fs.readFileSync('data.txt', 'utf8').toString().toLowerCase().split("\n");
} catch (err) {
  console.error(err);
}

const dataObjects = data.reduce((cards, row) => {
  // split the row '|'
  const [cardPart, numbersPart] = row.split('|');

  // Get card nr
  const cardNumber = cardPart.split(':')[0].trim();

  // Split string and convert to array of numbers
  const winNumbers = cardPart.split(': ')[1].trim().split(' ').filter(value => value.length > 0).map(Number);
  const yourNumbers = numbersPart.trim().split(' ').filter(value => value.length > 0).map(Number);

  // Add to cards
  cards[cardNumber] = { win: winNumbers, your: yourNumbers };

  return cards;
}, {}); // Start with an empty object


Object.keys(dataObjects).forEach(cardKey => {
  const card = dataObjects[cardKey]

  // Matched numbers array
  const numbersToCount = card.win.filter(number => { return card.your.includes(number) }).length
  
  let amount = numbersToCount > 0 ? 1 : 0

  if(numbersToCount >= 2)  {
    loopNr = (numbersToCount - 1) 
    
    for(let i = 0; i < loopNr; i++) {
      amount *= 2
    }


  }
  result += amount
});



// Part One
console.log(`Part One: ${result}`)


// Part Two
result = 0

console.log(`Part Two: ${result}`)