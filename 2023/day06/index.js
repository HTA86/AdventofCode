const fs = require('node:fs');

let data
let result = 1

try {
  data = fs.readFileSync('data.txt', 'utf8').toString().toLowerCase().split("\n");
} catch (err) {
  console.error(err);
}

const timeRow = data[0].split(':')[1].trim().split(' ').filter(value => { return value.length > 0 }).map(stringTime => { return Number(stringTime) })
const distanceRow = data[1].split(':')[1].trim().split(' ').filter(value => { return value.length > 0 }).map(stringDistance => { return Number(stringDistance) })

let allWins = []

timeRow.forEach((rekordTime, i) => {
  const distance = distanceRow[i]
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

});


allWins.forEach(wins => {
  result *= wins
});

console.log(result)
