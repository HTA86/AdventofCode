const fs = require('node:fs');

let data
let result = 1

try {
  data = fs.readFileSync('data.txt', 'utf8').toString().toLowerCase().split("\n");
} catch (err) {
  console.error(err);
}

const rekordTime = data[0].split(':')[1].replace(/\s/g, '')
const distance = data[1].split(':')[1].replace(/\s/g, '')

let allWins = []

  var numberOfWins = 0

  var holdButtonTimes = Array.from({ length: (rekordTime - 1) }, (_, index) => index + 1);

  holdButtonTimes.forEach(buttonTime => {
    const timeRemaindingToRace = rekordTime - buttonTime
    const result = buttonTime * timeRemaindingToRace

    numberOfWins += result > distance ? 1 : 0
  });

  if(numberOfWins > 0) {
    allWins.push(numberOfWins)
  }

allWins.forEach(wins => {
  result *= wins
});

console.log(result)