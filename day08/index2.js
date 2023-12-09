const fs = require('node:fs');

let data
let result = 0

try {
  data = fs.readFileSync('data2.txt', 'utf8').toString().toLowerCase().split("\n");
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
let nodeArray = Object.keys(nodesObjects).filter(value => { return value.endsWith('a') })
console.log(nodeArray)
let instructionNr = 0



while (!stopLoop) {
  const instructionsLength = instructions.length - 1
  const instruction = Number(instructions[instructionNr])
  let allEndsWithZ = true
  let nextNodeArray = []

  nodeArray.forEach(node => {
    const nextNode = nodesObjects[node][instruction]
    // Set next node
    nextNodeArray.push(nextNode)
    // ends with z
    allEndsWithZ = nextNode.endsWith('z') ? allEndsWithZ : false
  });

  result++
  nodeArray = nextNodeArray

  //result++
  //console.log('instruction: ' + instruction + ' instructionNr: ' + instructionNr + ' nextNode: ' + nextNode + ' instructionsLength: ' + instructionsLength)



  // Set next instruction
  if (instructionNr >= instructionsLength) { instructionNr = 0 } else { instructionNr++ }

  // Stop Loop
  if (allEndsWithZ) { stopLoop = true }
}


//console.log(sorted)
console.log('result: ' + result)
