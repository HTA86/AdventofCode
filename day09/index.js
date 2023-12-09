const fs = require('node:fs');

let data
let result = 0

try {
  data = fs.readFileSync('data.txt', 'utf8').toString().toLowerCase().split("\n");
} catch (err) {
  console.error(err);
}

const historys = []

data.forEach(row => {
  historys.push(row.split(' ').map(Number))
});


const getSequence = (arr) => {
  const sequence = []
  arr.forEach((value, i) => {
    if (i > 0) {
      const prevValue = arr[(i - 1)]
      const newValue = value - prevValue
      sequence.push(newValue)
    }
  })
  return sequence
}


const getAllSequences = (firstSequence) => {
  const allSequences = [...[firstSequence]]
  let allZero = false
  let nextSequence = firstSequence

  while (!allZero) {
    nextSequence = getSequence(nextSequence)
    filterZero = nextSequence.filter(value => { return value != 0 }).length
    allZero = filterZero <= 0

    if (!allZero) { allSequences.push(nextSequence) }
  }
  return allSequences
}


const getNextHistoryValue = (allSequences) => {
  let sum = 0
  allSequences.reverse().forEach(sequence => {
    sum += sequence[sequence.length - 1]
  });
  return sum
}

historys.forEach(history => {
  result += getNextHistoryValue(getAllSequences(history))
});

console.log('result: ' + result)