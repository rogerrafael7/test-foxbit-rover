const cardinalPointsHelper = require('./helpers/cardinal-points-helper')
const { RoverControlException, RoverControlExceptionCode } = require('./exceptions/rover-exception')
module.exports = class RoverControl {
  /**
   * @param {Array<Number>} upperRight
   * @param {{ startX: number, startY: number, facing: 'N'|'S'|'W'|'E', instructions: Array<'L', 'R', 'M'> }} roverConfig
   */
  constructor (upperRight = [], roverConfig = {}) {
    this.upperRight = upperRight
    this.roverConfig = {
      startX: roverConfig.startX,
      startY: roverConfig.startY,
      facing: roverConfig.facing,
      instructions: roverConfig.instructions || []
    }
    this._currentPosition = {
      x: this.roverConfig.startX,
      y: this.roverConfig.startY,
      facing: this.roverConfig.facing
    }
    this.validateConfig()
  }

  validateConfig () {
    if (!this.roverConfig.startX) {
      throw new RoverControlException('A posição inicial do Rover(startX) está inválida', RoverControlExceptionCode.INVALID_POSITION)
    }
    if (!this.roverConfig.startY) {
      throw new RoverControlException('A posição inicial do Rover(startY) está inválida', RoverControlExceptionCode.INVALID_POSITION)
    }
    if (!this.roverConfig.facing) {
      throw new RoverControlException('A posição inicial do Rover(facing) está inválida, Os valores aceitos são N, E, S ou W', RoverControlExceptionCode.INVALID_FACING)
    }
    if ([...this.roverConfig.instructions].some(instruction => !['L', 'R', 'M'].includes(instruction))) {
      throw new RoverControlException('A configuração de instruções do Rover está inválida, os valores possíveis são L, R ou M', RoverControlExceptionCode.INVALID_INSTRUCTION)
    }
    if (!cardinalPointsHelper.cardinalPoints.includes(this._currentPosition.facing)) {
      throw new RoverControlException('A direção inicial do Rover está inválida', RoverControlExceptionCode.INVALID_FACING)
    }
    if (!this.isInsidePlateau(this._currentPosition)) {
      throw new RoverControlException('A posição inicial do Rover está fora do planalto', RoverControlExceptionCode.INVALID_POSITION)
    }
  }

  execute () {
    for (const instruction of this.roverConfig.instructions) {
      this.executeInstruction(instruction)
    }
  }

  executeInstruction (instruction) {
    const mapInstruction = {
      'L': () => this.turnLeft(),
      'R': () => this.turnRight(),
      'M': () => this.moveForward()
    }
    mapInstruction[instruction]()
  }

  turnLeft () {
    this._currentPosition.facing = cardinalPointsHelper.getLeftPoint(this._currentPosition.facing)
  }

  turnRight () {
    this._currentPosition.facing = cardinalPointsHelper.getRightPoint(this._currentPosition.facing)
  }

  moveForward () {
    const currentPosition = this.getCurrentPosition()
    const mapFacing = {
      'N': () => currentPosition.y++,
      'E': () => currentPosition.x++,
      'S': () => currentPosition.y--,
      'W': () => currentPosition.x--
    }

    mapFacing[currentPosition.facing]()

    if (!this.isInsidePlateau(currentPosition)) {
      throw new RoverControlException('Se este movimento for feito o Rover estará fora do planalto', RoverControlExceptionCode.INVALID_POSITION)
    }
    this._currentPosition = currentPosition
  }

  isInsidePlateau (position) {
    return position.x >= 0 && position.x <= this.upperRight[0] && position.y >= 0 && position.y <= this.upperRight[1]
  }

  getCurrentPosition () {
    return Object.assign({}, this._currentPosition)
  }
}
