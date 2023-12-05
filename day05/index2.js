const fs = require('node:fs');

let data
let result = 0

try {
  data = fs.readFileSync('data.txt', 'utf8').toString().toLowerCase().split("\n");
} catch (err) {
  console.error(err);
}

//console.log(data)

// First seed row to object
const seeds = data[0].split(':')[1].split(' ').filter(value => value.length > 0)



// Delete the first seed row
data.shift()

seedMaps = {}

let locations = []

let previusSeedMap

data.forEach(row => {
  const blankRow = !(row.length > 0)
  //console.log(blankRow)

  if (!blankRow) {
    const seedMap = row.includes(':') ? row.split(':')[0].replace('map', '').trim() : undefined

    // Create the object
    if (seedMap) {
      seedMaps[seedMap] = []
      previusSeedMap = seedMap
    }

    if (!seedMap) {
      seedMaps[previusSeedMap].push(row.split(' '))
    }


  }
});

// 
const getSeedMapInfo = (fromSeed, fromSeedNr) => {
  //console.log(fromSeed)
  fromSeedNr = Number(fromSeedNr)
  let seedMap = Object.keys(seedMaps).filter(value => { return value.startsWith(`${fromSeed}-`) })[0]

  //console.log(seedMap)
  let toSeed = seedMap.split('-')[2]

  let isMaped = false
  let destinationSeedNr = fromSeedNr

  seedMaps[seedMap].forEach(seedNr => {

    if (isMaped) { return }
    const rangeLength = Number(seedNr[2])

    const destinationRangeStart = Number(seedNr[0])
    //const destinationRangeEnd = destinationRangeStart + rangeLength

    const sourceRangeStart = Number(seedNr[1])
    const sourceRangeEnd = sourceRangeStart + (rangeLength - 1)

    // Is maped
    isMaped = (fromSeedNr >= sourceRangeStart) && (fromSeedNr <= sourceRangeEnd) ? true : isMaped


    // If maped
    if (isMaped) {
      destinationSeedNr = fromSeedNr + (destinationRangeStart - sourceRangeStart)
    }

    /*
    console.log('fromSeedNr : ' + fromSeedNr + ' sourceRangeStart: ' + sourceRangeStart)
    console.log('fromSeedNr : ' + fromSeedNr + ' sourceRangeEnd: ' + sourceRangeEnd)

    console.log('A : ' + (fromSeedNr >= sourceRangeStart))
    console.log('B : ' + (fromSeedNr <= sourceRangeEnd))

    
    console.log('isMaped: ' + isMaped)

    console.log('destinationRangeStart: ' + destinationRangeStart)
    console.log('sourceRangeStart: ' + sourceRangeStart)
    console.log('rangeLength: ' + rangeLength)

    console.log(' ')
    console.log(destinationRangeStart - sourceRangeStart)
    console.log(' ')
*/

  });
  //console.log({ fromSeed, toSeed, seedMap, fromSeedNr, destinationSeedNr })
  return { fromSeed, toSeed, seedMap, fromSeedNr, destinationSeedNr }
}



seeds.forEach((seed, index) => {
  const seedNr = Number(seed)
  const even = index % 2 == 0
  console.log('seedNr: ' + seedNr)

  if (even) {

    const range = Number(seeds[(index + 1)])

    for (let ind = 0; ind < range; ind++) {
      let seedNrRanged = Number(ind + seedNr)

      const firstSeedMap = getSeedMapInfo('seed', seedNrRanged)
    let nextSeedMap = firstSeedMap

    while (!(nextSeedMap.toSeed == 'location')) {

      nextSeedMap = getSeedMapInfo(nextSeedMap.toSeed, nextSeedMap.destinationSeedNr)

      //console.log(nextSeedMap)
      if (nextSeedMap.toSeed == 'location') {
        locations.push(nextSeedMap.destinationSeedNr)
      }
    }

    }
    



  }



});


//console.log(' ')
//console.log(' ')
// Part one
console.log(locations.sort((a, b) => { return a - b })[0])
// dest, source, range

//console.log('seeds: ' + seeds)
//console.log(seedMaps)



//console.log(result)