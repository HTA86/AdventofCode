const fs = require('node:fs');


/*

| Upp and Down      : is a vertical pipe connecting north and south.
- Right and Left    : is a horizontal pipe connecting east and west.
L Upp and Right     : is a 90-degree bend connecting north and east.
J Upp and Left      : is a 90-degree bend connecting north and west.
7 Down and Left     : is a 90-degree bend connecting south and west.
F Down and Right    : is a 90-degree bend connecting south and east.
. is ground; there is no pipe in this tile.
S Any               :is the starting position of the animal; there is a pipe on this tile, but your sketch doesn't show what shape the pipe has.

*/


let data
let resultArray= []

try {
  data = fs.readFileSync('data.txt', 'utf8').toString().toLowerCase().split("\n");
} catch (err) {
  console.error(err);
}

const replaceCharacterAt = (string, index, replacement) => {
  return string.substring(0, index) + replacement + string.substring(index + 1);
}

const nextPosition = (rowNr, strIndex, cameFrom) => {
  let toRowNr = rowNr
  let toStrIndex = strIndex
  let newCameFrom = ''
  const value = data[rowNr][strIndex]

  if (cameFrom == 'above') { // Came from above | L J 
    switch (value) {
      case '|': toRowNr++; break;
      case 'l': toStrIndex++; break;
      case 'j': toStrIndex--; break;
      default:
        break;
    }
  }

  if (cameFrom == 'below') { // Came from below | F 7
    switch (value) {
      case '|': toRowNr--; break;
      case 'f': toStrIndex++; break;
      case '7': toStrIndex--; break;
      default:
        break;
    }
  }

  if (cameFrom == 'right') { // Came from right - L F
    switch (value) {
      case '-': toStrIndex--; break;
      case 'l': toRowNr--; break;
      case 'f': toRowNr++; break;
      default:
        break;
    }
  }

  if (cameFrom == 'left') { // Came from left - J 7
    switch (value) {
      case '-': toStrIndex++; break;
      case 'j': toRowNr--; break;
      case '7': toRowNr++; break;
      default:
        break;
    }
  }

  const [sameRow, sameStrIndex] = [(rowNr == toRowNr), (strIndex == toStrIndex)]

  if (!sameRow) {
    newCameFrom = rowNr < toRowNr ? 'above' : 'below'
  }

  if (!sameStrIndex) {
    newCameFrom = strIndex < toStrIndex ? 'left' : 'right'
  }

  const nextValue = data[toRowNr][toStrIndex]
  data[rowNr] = replaceCharacterAt(data[rowNr], strIndex, 'x')
  return { rowNr: toRowNr, strIndex: toStrIndex, cameFrom: newCameFrom, value: nextValue }
}

const goo = (rowNr, strIndex, cameFrom, value) => {
  let nextToGo = { rowNr, strIndex, cameFrom, value }
  let loopIndex = 1

  while (true) {
    loopIndex++
    const next = nextPosition(nextToGo.rowNr, nextToGo.strIndex, nextToGo.cameFrom, nextToGo.value)
    nextToGo = next

    if (next.value == 's') { console.log('Breake S'); console.log(' --- --- '); console.log(' '); break }
    if (next.value == 'x') { console.log('Breake X'); console.log('rowNr ' + rowNr + 'strIndex ' + strIndex + 'cameFrom ' + cameFrom);  console.log(' --- --- '); console.log(' ');  break }
    if (next.value == '.') { console.log('Breake .'); console.log(' --- --- '); console.log(' ');  break }
  }
  return loopIndex
}

// Find the S
let [sRow, sIndex] = [0, 0];
data.every((row, i) => { sRow = i; sIndex = row.indexOf('s'); return !row.includes('s'); }); // console.log('sRow: ' + sRow + ' sIndex: ' + sIndex)

// Finde posible paths
const [above, under, left, right] = [data[(sRow - 1)][sIndex], data[(sRow + 1)][sIndex], data[sRow][(sIndex - 1)], data[sRow][(sIndex + 1)]] // console.log('above: ' + above + ' ' + 'under: ' + under + ' ' + 'left: ' + left + ' ' + 'right: ' + right)

const abovePosible = above == '|' || above == '7' || above == 'f' // console.log('above ' + abovePosible + ' ' + above)
const underPosible = under == '|' || under == 'l' || under == 'j' // console.log('under ' + underPosible + ' ' + under)
const leftPosible = left == '-' || left == 'l' || left == 'f'     // console.log('left ' + leftPosible + ' ' + left)
const rightPosible = right == '-' || right == 'j' || right == '7' // console.log('right ' + rightPosible + ' ' + right)

if (abovePosible) {
  console.log('Run: abovePosible')
  const result = goo(sRow - 1, sIndex, 'below', 's')
  resultArray.push(result / 2)
}
if (underPosible) {
  console.log('Run: underPosible')
  const result = goo(sRow + 1, sIndex, 'above', 's')
  resultArray.push(result / 2)
}
if (leftPosible) {
  console.log('Run: leftPosible')
  const result = goo(sRow, sIndex - 1, 'right', 's')
  resultArray.push(result / 2)
}
if (rightPosible) {
  console.log('Run: rightPosible')
  const result = goo(sRow, sIndex + 1, 'left', 's')
  resultArray.push(result / 2)
}

console.log('result: ')
console.log(resultArray)