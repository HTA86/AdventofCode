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
    if(seedMap) {
      seedMaps[seedMap] = []
      previusSeedMap = seedMap
    }

    if(!seedMap) {
      seedMaps[previusSeedMap].push(row.split(' '))
    }
  }
});

// 
const getSeedMapInfo = (fromSeed, fromSeedNr) => {
  fromSeedNr = Number(fromSeedNr)
  let seedMap = Object.keys(seedMaps).filter(value => { return value.startsWith(`${fromSeed}-`)})[0]

  let toSeed = seedMap.split('-')[2]

  let isMaped = false
  let destinationSeedNr = fromSeedNr

  seedMaps[seedMap].forEach(seedNr => {

    if(isMaped) { return }
    const rangeLength = Number(seedNr[2])

    const destinationRangeStart = Number(seedNr[0])
    //const destinationRangeEnd = destinationRangeStart + rangeLength

    const sourceRangeStart = Number(seedNr[1])
    const sourceRangeEnd = sourceRangeStart + (rangeLength - 1)

    // Is maped
    isMaped = (fromSeedNr >= sourceRangeStart) && (fromSeedNr <= sourceRangeEnd) ? true : isMaped

    // If maped
    if(isMaped) {
      destinationSeedNr = fromSeedNr + (destinationRangeStart - sourceRangeStart)
    }
  });
  return { fromSeed, toSeed, seedMap, fromSeedNr, destinationSeedNr }
}



seeds.forEach(seed => {

  const firstSeedMap = getSeedMapInfo('seed', seed)
  let nextSeedMap = firstSeedMap

  while ( !(nextSeedMap.toSeed == 'location' )) {
   
      nextSeedMap = getSeedMapInfo(nextSeedMap.toSeed, nextSeedMap.destinationSeedNr)
    
      if(nextSeedMap.toSeed == 'location') {
        locations.push(nextSeedMap.destinationSeedNr)
      }
    
  }
  

});

// Part one
console.log(locations.sort( (a, b) => { return a - b })[0])