const fs = require('node:fs');

let data
let result = 0

try {
  data = fs.readFileSync('data2.txt', 'utf8').toString().toLowerCase().split("\n");
} catch (err) {
  console.error(err);
}

const dataObjects = data.reduce((cards, row) => {
  // split the row '|'
  const [cardPart, numbersPart] = row.split('|');

  // Get card nr
  const cardNumber = cardPart.split(':')[0].trim().replace('  ', ' ').replace('  ', ' ');
  console.log(cardNumber)

  // Split string and convert to array of numbers
  const winNumbers = cardPart.split(': ')[1].trim().split(' ').filter(value => value.length > 0).map(Number);
  const yourNumbers = numbersPart.trim().split(' ').filter(value => value.length > 0).map(Number);

  // Add to cards
  cards[cardNumber] = { win: winNumbers, your: yourNumbers };

  return cards;
}, {}); // Start with an empty object


let cardMatch = {}
let winingCards = {}


Object.keys(dataObjects).forEach(cardKey => {
  const card = dataObjects[cardKey]
  const cardNr = Number(cardKey.split(' ')[1])

  // Matched numbers array
  const numbersWin = card.win.filter(number => { return card.your.includes(number) }).length
  const winingCard = numbersWin > 0

  if(winingCard) { winingCards[cardKey] = true }


  const addCardMatch = () => {
    for(let i = (cardNr + 1); i < (cardNr + 1 + numbersWin); i++) {
    // Create card object if note in cardMatch
    if( !(`card ${i}` in cardMatch) ) {
      cardMatch[`card ${i}`] = 0
    }

    // Add to the wonen card
    cardMatch[`card ${i}`]++

    //console.log('cardKey: ' + cardKey + '  ' + i)
  }
}




  //console.log('match: ' + cardMatch[cardKey])
  const cardCopies = [cardKey] in cardMatch ? cardMatch[cardKey] : 0




  for(let i = 1; i <= (1 + cardCopies); i++) {
    //console.log('win loop' + ' ' + i)
    addCardMatch()
  }


  //result += numbersWin > 0 ? 1 + cardCopies : 0

 
  // console.log('card: ' + cardNr + ' numbersWins: ' + numbersWin)
  // console.log(' ')

  
});



// Loop wining numbers
Object.keys(cardMatch).forEach(winCard => {
  result += cardMatch[winCard]
  //let cardCopies = winCard in cardMatch ? cardMatch[winCard] : 0

  //result += cardCopies
});

result += Object.keys(dataObjects).length

//console.log(cardMatch)
// Part Two
console.log(`Part Two: ${result}`)


//console.log(winingCards)

// console.log(Object.keys(dataObjects).length)