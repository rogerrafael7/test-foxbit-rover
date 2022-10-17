const RoverControl = require('./rover-control')
/**
 *
 * @param {Array<Number>} upperRight [x, y]
 * @param {{ startX: number, startY: number, facing: 'N'|'S'|'W'|'E', instructions: Array<'L'|'R'|'M'> }[]} rovers
 * @returns {{roverIndex: number, finalPosition: { x: number, y: number, facing: 'N'|'S'|'W'|'E' }}[]}
 */
const run = (upperRight, rovers) => {
  const result = []
  for (const [index, rover] of Object.entries(rovers)) {
    const roverControl = new RoverControl(upperRight, rover)
    roverControl.execute()
    result.push({
      roverIndex: index,
      finalPosition: roverControl.getCurrentPosition()
    })
  }
  return result
}

module.exports = run
