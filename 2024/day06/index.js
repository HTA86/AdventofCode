const fs = require('node:fs');

let data
let result = 0


try {
  data = fs.readFileSync('data.txt', 'utf8').toString().toLowerCase().split("\n");
} catch (err) {
  console.error(err);
}

let obstruction = '#'

const findGuard = () => {
  let guardLocation

  for (let i = 0; i < data.length; i++) {
    let row = data[i].split('')
    let guardChar = row.find(char => char === '^' || char === '>' || char === 'v' || char === '<')
    if (guardChar) { guardLocation = { character: guardChar, row: i, index: row.indexOf(guardChar) }; break }
  }
  return guardLocation
}

const moveGuard = (guardLocation) => {
  let row = data[guardLocation.row]
  let rowIndex = guardLocation.row
  let index = guardLocation.index
  let character = guardLocation.character

  // Up
  if (guardLocation.character === '^') {
    data[guardLocation.row] = data[guardLocation.row].replace(character, 'X')
    rowIndex--

    // Check if the guard is leaving the map
    let leaveMap = data[rowIndex] === undefined
    if (leaveMap) { console.log('leave map '); return { character: null, row: null, index: null } }

    // Check if there is an obstruction above
    let charAbove = data[rowIndex].charAt(index)
    if (charAbove === obstruction) {
      // Turn guard to right
      character = '>'
      // Move row back to the same row
      rowIndex++
      index++

      // Check if the guard is leaving the map
      let leaveMap = (data[rowIndex].length-1) < index
      if (leaveMap) { console.log('leave map to the right'); return { character: null, row: null, index: null } }
      
      // Move the guard to the new location
      data[rowIndex] = data[rowIndex].split('');
      data[rowIndex][index] = character;
      data[rowIndex] = data[rowIndex].join('');

      return { character, row: rowIndex, index }
    }

    // Move the guard to the new location
    data[rowIndex] = data[rowIndex].split('');
    data[rowIndex][index] = character;
    data[rowIndex] = data[rowIndex].join('');
  }

  // Right
  if (guardLocation.character === '>') {
    data[guardLocation.row] = data[guardLocation.row].replace(character, 'X')
    index++

    // Check if the guard is leaving the map
    let leaveMap = (data[rowIndex].length-1) < index
    if (leaveMap) { console.log('leave map to the right!'); return { character: null, row: null, index: null } }

    // Check if there is an obstruction
    let charToRight = data[rowIndex].charAt(index)
    if (charToRight === obstruction) {

      // Turn guard down
      character = 'v'
      // Move index back and row down
      index--
      rowIndex++

      // Check if the guard is leaving the map
      let leaveMap = (data.length-1) < rowIndex
      if (leaveMap) { console.log('leave map at bottom'); return { character: null, row: null, index: null } }
      
      // Move the guard to the new location
      data[rowIndex] = data[rowIndex].split('');
      data[rowIndex][index] = character;
      data[rowIndex] = data[rowIndex].join('');

      return { character, row: rowIndex, index }
    }

    // Move the guard to the new location
    data[rowIndex] = data[rowIndex].split('');
    data[rowIndex][index] = character;
    data[rowIndex] = data[rowIndex].join('');
  }


  // Down
  if (guardLocation.character === 'v') {
    data[guardLocation.row] = data[guardLocation.row].replace(character, 'X')
    rowIndex++

    // Check if the guard is leaving the map
    let leaveMap = data[rowIndex] === undefined
    if (leaveMap) { console.log('leave map '); return { character: null, row: null, index: null } }

    // Check if there is an obstruction
    let charUnder = data[rowIndex].charAt(index)
    if (charUnder === obstruction) {

      // Turn guard to left
      character = '<'
      // Move row back to the same row and one to left
      rowIndex--
      index--

      // Check if the guard is leaving the map
      let leaveMap = index < 0
      if (leaveMap) { console.log('leave map to the left'); return { character: null, row: null, index: null } }
      
      // Move the guard to the new location
      data[rowIndex] = data[rowIndex].split('');
      data[rowIndex][index] = character;
      data[rowIndex] = data[rowIndex].join('');

      return { character, row: rowIndex, index }
    }

    // Move the guard to the new location
    data[rowIndex] = data[rowIndex].split('');
    data[rowIndex][index] = character;
    data[rowIndex] = data[rowIndex].join('');
  }


  // Left
  if (guardLocation.character === '<') {
    data[guardLocation.row] = data[guardLocation.row].replace(character, 'X')
    index--

    // Check if the guard is leaving the map
    let leaveMap = index < 0
    if (leaveMap) { console.log('leave map to the left!'); return { character: null, row: null, index: null } }

    // Check if there is an obstruction
    let charToLeft = data[rowIndex].charAt(index)
    if (charToLeft === obstruction) {

      // Turn guard up
      character = '^'
      // Move index back and row upp
      index++
      rowIndex--

      // Check if the guard is leaving the map
      let leaveMap = (data.length-1) < rowIndex
      if (leaveMap) { console.log('leave map at top'); return { character: null, row: null, index: null } }
      
      // Move the guard to the new location
      data[rowIndex] = data[rowIndex].split('');
      data[rowIndex][index] = character;
      data[rowIndex] = data[rowIndex].join('');

      return { character, row: rowIndex, index }
    }

    // Move the guard to the new location
    data[rowIndex] = data[rowIndex].split('');
    data[rowIndex][index] = character;
    data[rowIndex] = data[rowIndex].join('');
  }



  return { character, row: rowIndex, index }
}


// Part One
console.time('Execution Time Part One');

// Find the guards start location
let guardLocation = findGuard()

while (guardLocation.character != null) {
  // Move the guard one step
  guardLocation = moveGuard(guardLocation)
}

// Count X
result = data.reduce((count, row) => count + (row.match(/X/g) || []).length, 0);

console.timeEnd('Execution Time Part One');
console.log('Part one: ' + result)

// Part Two
result = 0;
console.time('Execution Time Part Two');

console.timeEnd('Execution Time Part Two');
console.log('Part two: ' + result)

