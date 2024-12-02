const fs = require('node:fs');

let data
let result = 0

try {
  data = fs.readFileSync('data.txt', 'utf8').toString().toLowerCase().split("\n");
} catch (err) {
  console.error(err);
}

// First seed row to object
const seeds = data[0].split(':')[1].split(' ').filter(value => value.length > 0)



// Delete the first seed row
data.shift()

seedMaps = {}

let locations = []

let previusSeedMap

data.forEach(row => {
  const blankRow = !(row.length > 0)

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
  fromSeedNr = Number(fromSeedNr)
  let seedMap = Object.keys(seedMaps).filter(value => { return value.startsWith(`${fromSeed}-`) })[0]

  let toSeed = seedMap.split('-')[2]

  let isMaped = false
  let destinationSeedNr = fromSeedNr

  seedMaps[seedMap].forEach(seedNr => {

    if (isMaped) { return }
    const rangeLength = Number(seedNr[2])

    const destinationRangeStart = Number(seedNr[0])

    const sourceRangeStart = Number(seedNr[1])
    const sourceRangeEnd = sourceRangeStart + (rangeLength - 1)

    // Is maped
    isMaped = (fromSeedNr >= sourceRangeStart) && (fromSeedNr <= sourceRangeEnd) ? true : isMaped


    // If maped
    if (isMaped) {
      destinationSeedNr = fromSeedNr + (destinationRangeStart - sourceRangeStart)
    }

  });
  return { fromSeed, toSeed, seedMap, fromSeedNr, destinationSeedNr }
}



seeds.forEach((seed, index) => {  
  const seedNr = Number(seed)
  const even = index % 2 == 0

  if (even) {
    const range = Number(seeds[(index + 1)])
    console.log('seedNr: ' + seedNr + ' range: ' + range)
    let startTime = new Date()
    let endTime = new Date()
    const nrOfSeeds = seeds.length / 2

    for (let ind = 0; ind < range; ind++) {
      if (ind % 100000 === 0) { 

        endTime = new Date()
        timeDiff = (endTime - startTime) / 1000;

        let secondsThisSeed = ( range / 100000 ) * timeDiff
        let secondsAllSeed = (( range / 100000 ) * timeDiff) * nrOfSeeds

        console.log('min for seed to complete: ' + Math.round(secondsThisSeed / 60))
        console.log('hours for all seeds to complete: ' + Math.round( (secondsAllSeed / 60) / 60))
        startTime = new Date()
      }

      let seedNrRanged = Number(ind + seedNr)

      const firstSeedMap = getSeedMapInfo('seed', seedNrRanged)
      let nextSeedMap = firstSeedMap

      while (!(nextSeedMap.toSeed == 'location')) {

        let startTimeA = new Date()
        nextSeedMap = getSeedMapInfo(nextSeedMap.toSeed, nextSeedMap.destinationSeedNr)
        let endTimeA = new Date()
        let timeDiffA = (endTimeA - startTimeA);

        console.log('sec for getSeedMapInfo to complete: ' + timeDiffA)

        if (nextSeedMap.toSeed == 'location') {
          locations.push(nextSeedMap.destinationSeedNr)
        }
      }
    }
  }
});


// Part two
console.log(locations.sort((a, b) => { return a - b })[0])