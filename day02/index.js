const fs = require('node:fs');

let data
let result = 0

try {
  data = fs.readFileSync('data.txt', 'utf8').toString().toLowerCase().split("\n");
} catch (err) {
  console.error(err);
}


let gameObject = {}


data.forEach(dataRow => {

  // Delete space   
  const gameString = dataRow.replace(/\s/g, '').split(':')

  const game = gameString[0]
  const gameSets = gameString[1].split(';')

  gameObject[game] = {}

  gameSets.forEach((sets, i) => {
    setName = 'set' + i
    gameObject[game][setName] = {}

    sets = sets.split(',')

    sets.forEach(set => {
      // Split number and color
      const colorQuantity = Number(set.replace(/[^\d]/g, ''))
      const color = set.replace(colorQuantity, '')

      gameObject[game][setName][color] = colorQuantity
    });
  });

});


// Part One
Object.keys(gameObject).forEach(game => {
  let possible = true
  const gameNr = Number(game.replace(/[^\d]/g, ''))

  Object.keys(gameObject[game]).forEach(set => {
    let colors = gameObject[game][set]

    const red = 'red' in colors ? colors.red : 0
    const green = 'green' in colors ? colors.green : 0
    const blue = 'blue' in colors ? colors.blue : 0

    if(red > 12) { possible = false }
    if(green > 13) { possible = false }
    if(blue > 14) { possible = false }
  });

  if(possible) { result += gameNr }
});

console.log(`Part One: ${result}`)



// Part Two
result = 0
Object.keys(gameObject).forEach(game => {
  let minRed = 0
  let minGreen = 0
  let minBlue = 0
  
  Object.keys(gameObject[game]).forEach(set => {
    let colors = gameObject[game][set]

    const red = 'red' in colors ? colors.red : 0
    const green = 'green' in colors ? colors.green : 0
    const blue = 'blue' in colors ? colors.blue : 0

    minRed = red > minRed ? red : minRed
    minGreen = green > minGreen ? green : minGreen
    minBlue = blue > minBlue ? blue : minBlue

  });

  result += (minRed * minGreen * minBlue)

});

console.log(`Part Two: ${result}`)