const fs = require('node:fs');

let data
let result = 0

try {
  data = fs.readFileSync('data.txt', 'utf8').toString().toLowerCase().split("\n");
} catch (err) {
  console.error(err);
}

const uniqueCharacters = (str) => {
  const uniqueSet = new Set(str);
  return [...uniqueSet].join('').trim();
}

const countUniqueCharacters = (str) => {
  const uniqueCount = new Map();
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (uniqueCount.has(char)) { uniqueCount.set(char, uniqueCount.get(char) + 1) }
    if (!(uniqueCount.has(char))) { uniqueCount.set(char, 1) }
  }
  return uniqueCount;
}

const convertToCharNrArray = (charCount) => {
  let charNrArray = [];

  for (const [char, count] of charCount) {
    charNrArray.push(count)
  }

  return charNrArray.sort((a, b) => { return b - a });
}

const handRanking = (unic, CharNrArray, hand) => {
  // Lower is better
  let handRank = 0
  const unicLength = unic.length
  const maxChars = CharNrArray[0]
  const nextMaxChars = CharNrArray[1]

  // Full house, Three of a kind, Two pair
  const fullHouse = maxChars == 3 && nextMaxChars == 2
  const ThreeOfAKind = maxChars == 3 && nextMaxChars == 1
  const twoPair = maxChars == 2

  // console.log('hand: ' + hand + ' maxChars: ' + maxChars + ' nextMaxChars: ' + nextMaxChars + ' fullHouse: ' + fullHouse + ' unicLength: ' + unicLength)


  switch (unicLength) {

    // Five of a kind
    case 1: handRank = 10
      break;

    // Four of a kind, Full house
    case 2:
      // Four of a kind
      handRank = maxChars == 4 ? 9 : handRank
      // Full house
      handRank = fullHouse ? 8 : handRank
      break;

    // Three of a kind, Two pair
    case 3:
      if (!(fullHouse) && ThreeOfAKind) { handRank = 7 }
      if (!(fullHouse) && !(ThreeOfAKind) && twoPair) { handRank = 6 }
      break;


    // One pair
    case 4: handRank = 5
      break;

    // High card
    case 5:
      let isHighCard = false
      const posibleHighArray = ['23456', '34567', '45678', '56789']

      posibleHighArray.forEach(posibleHigh => {
        isHighCard = posibleHigh == hand ? true : isHighCard
      });

      handRank = isHighCard ? 4 : handRank

      break;

    default:
      break;
  }

  return handRank
}

const dataArray = data.reduce((hands, row) => {
  const [hand, bid] = row.split(' ');
  const unic = uniqueCharacters(hand)
  const uniqueCharObject = countUniqueCharacters(hand)
  const charCount = convertToCharNrArray(uniqueCharObject)

  // Add to hands
  hands.push({ hand: hand.toLowerCase(), bid, unic, handRanking: handRanking(unic.toLowerCase(), charCount, hand), numberOfChars: uniqueCharObject })

  return hands;
}, []); // Start with an empty array

// The relative strength of each card follows this order, where A is the highest and 2 is the lowest.
const cardStrength = ['a', 'k', 'q', 'j', 't', '9', '8', '7', '6', '5', '4', '3', '2']

const sortCardStrength = (a, b) => {

  let aLetterStrength
  let bLetterStrength

  let equal = true

  const setLetterStrength = (letterNr) => {
    aLetterStrength = cardStrength.findIndex((value) => { return a.hand[letterNr] == value })
    bLetterStrength = cardStrength.findIndex((value) => { return b.hand[letterNr] == value })

    equal = aLetterStrength == bLetterStrength
  }

  for (let i = 0; i < 5 && equal; i++) {
    setLetterStrength(i)
  }

  return bLetterStrength - aLetterStrength
}
let sorted = dataArray.sort(sortCardStrength).sort((a, b) => { return a.handRanking - b.handRanking })

sorted.forEach((e, i) => {
  const rank = i + 1
  const bid = Number(e.bid)

  result += (rank * bid)
});

//console.log(sorted)
console.log('result: ' + result)

// 254648581  your answer is too low