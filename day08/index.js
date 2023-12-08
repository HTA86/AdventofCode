const fs = require('node:fs');

let data
let result = 0

try {
  data = fs.readFileSync('data.txt', 'utf8').toString().toLowerCase().split("\n");
} catch (err) {
  console.error(err);
}

const instructions = [...data[0].replaceAll('r', '1').replaceAll('l', '0')]

const nodeRows = data.slice(2, data.length)

const nodesObjects = nodeRows.reduce((nodes, row) => {

  const [nodePart, nextNodePart] = row.split(' = ');

  const node = nodePart.trim();

  const nextNode = nextNodePart.replace('(', '').replace(')', '').replaceAll(' ', '').split(',')

  nodes[node] = nextNode

  return nodes;
}, {}); // Start with an empty object


let stopLoop = false
let node = 'aaa'
let instructionNr = 0

//console.log(instructions)

for (let i = 0; !stopLoop; i++) {
  const instructionsLength = instructions.length - 1
  const instruction = Number(instructions[instructionNr])
  result++

  const nextNode = nodesObjects[node][instruction]

  //console.log('instruction: ' + instruction + ' instructionNr: ' + instructionNr + ' nextNode: ' + nextNode + ' instructionsLength: ' + instructionsLength)
  //console.log(' ')


  

  // Set next node
  node = nextNode

  // Set next instruction
  if (instructionNr >= instructionsLength) { instructionNr = 0 } else { instructionNr++ }
  
  // Stop Loop
  if(nextNode == 'zzz') { stopLoop = true  }
  //stopLoop = i > 9
}


//console.log(instructions)
//console.log(' ')
//console.log(nodesObjects)



//console.log(sorted)
console.log('result: ' + result)

// 254648581  your answer is too low