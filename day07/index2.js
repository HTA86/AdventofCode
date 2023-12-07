const fs = require('node:fs');

let data
let result = 0

try {
  data = fs.readFileSync('data.txt', 'utf8').toString().toLowerCase().split("\n");
} catch (err) {
  console.error(err);
}

// The relative strength of each card follows this order, where A is the highest and 2 is the lowest.
const cardStrength = ['a', 'k', 'q', 't', '9', '8', '7', '6', '5', '4', '3', '2', 'j']

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

const sortCardStrengthV2 = (a, b) => {
    const aLetterStrength = cardStrength.findIndex((value) => { return a == value })
    const bLetterStrength = cardStrength.findIndex((value) => { return b == value })
  return aLetterStrength - bLetterStrength
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

const countOneChar = (str, charToCount) => {
  return Array.from(str).filter(char => { return char == charToCount }).length
}

const replaceJ = (orginalHand, nrOfJs) => {
  let handWithoutJ = orginalHand.replace('j', '')

  for (let i = 0; i < nrOfJs; i++) {
    handWithoutJ = handWithoutJ.replace('j', '')
  }

  return handWithoutJ
}

const getKeyFromMap = (mapData, targetValue) => {
  const keyArray = []

  for (const [key, value] of mapData.entries()) {
    if (value === targetValue) {
      keyArray.push(key)
    }
  }

  return keyArray
}

const getBestChar = (charsArray) => {
  let bestCharArray = charsArray.sort(sortCardStrengthV2)
  let bestChar = bestCharArray[0] && bestCharArray[0].toLowerCase() == 'j' ? 'a' : bestCharArray[0]
  if(!bestCharArray[0]) { bestChar = 'a' }
  return bestChar
}

const getHandRanking = (unic, CharNrArray, hand) => {
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

  const indexJ = hand.toLowerCase().indexOf('j')
  const nrOfJs = countOneChar(hand.toLowerCase(), 'j')

  const noJHand = replaceJ(hand.toLowerCase(), nrOfJs)
  const noJUniqueCharObject = countUniqueCharacters(noJHand)
  const noJCharCount = convertToCharNrArray(noJUniqueCharObject)
  const noJMaxChars = Math.max(...noJCharCount)

  let bestCharArray = getKeyFromMap(noJUniqueCharObject, noJMaxChars) 
  const bestChar = getBestChar(bestCharArray)

  let newHand = hand.toLowerCase()

  for (let i = 0; i < nrOfJs; i++) {
    newHand = newHand.replace('j', bestChar)
  }

  const newUnic = uniqueCharacters(newHand)
  const newUniqueCharObject = countUniqueCharacters(newHand)
  const newCharCount = convertToCharNrArray(newUniqueCharObject)

  const handRanking = getHandRanking(unic.toLowerCase(), charCount, hand)

  const newHandRanking = getHandRanking(newUnic.toLowerCase(), newCharCount, newHand)


  // Add to hands
  hands.push({ hand: hand.toLowerCase(), bid, unic, handRanking, newHandRanking, numberOfChars: uniqueCharObject, bestChar, newHand, nrOfJs })

  return hands;
}, []); // Start with an empty array

let sorted = dataArray.sort(sortCardStrength).sort((a, b) => { return a.newHandRanking - b.newHandRanking })

sorted.forEach((e, i) => {
  const rank = i + 1
  const bid = Number(e.bid)

  result += (rank * bid)
});

console.log('result: ' + result)
