const fs = require('node:fs');

let data
let resultArray= []

try {
  data = fs.readFileSync('exemp3.txt', 'utf8').toString().toLowerCase().split("\n");
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
  let [topRow, bottomRow, maxLeft, maxRight] = [999, 0, 999, 0]
  let returnObject = {}

  while (true) {
    loopIndex++
    const next = nextPosition(nextToGo.rowNr, nextToGo.strIndex, nextToGo.cameFrom, nextToGo.value)
    nextToGo = next

    // Create the object if note exist
    if( !(next.rowNr in returnObject) ) { returnObject[next.rowNr] = { startString: 999, endString: 0 } }
    returnObject[next.rowNr].startString = returnObject[next.rowNr].startString > next.strIndex ? next.strIndex : returnObject[next.rowNr].startString
    returnObject[next.rowNr].endString = returnObject[next.rowNr].endString < next.strIndex ? next.strIndex : returnObject[next.rowNr].endString

    if (next.value == 's') { console.log('Breake S'); console.log(' --- --- '); console.log(' '); break }
    if (next.value == 'x') { console.log('Breake X'); console.log('rowNr ' + rowNr + 'strIndex ' + strIndex + 'cameFrom ' + cameFrom);  console.log(' --- --- '); console.log(' ');  break }
    if (next.value == '.') { console.log('Breake .'); console.log(' --- --- '); console.log(' ');  break }
  }

  let dots = 0

  Object.keys(returnObject).forEach(rowNr => {
    dots += data[rowNr].substring(returnObject[rowNr].startString, returnObject[rowNr].endString ).split('.').length - 1
  });

  console.log(dots)
  return {dots}
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