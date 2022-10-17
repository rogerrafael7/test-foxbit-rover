const RoverControlExceptionCode = {
  INVALID_INSTRUCTION: 'INVALID_INSTRUCTION',
  INVALID_FACING: 'INVALID_FACING',
  ERROR_INSTRUCTION_OUTSIDE_PLATEAU: 'ERROR_INSTRUCTION_OUTSIDE_PLATEAU',
  INVALID_POSITION: 'INVALID_POSITION',
}

exports.RoverControlException = class RoverControlException extends Error {
  /**
   *
   * @param message
   * @param {RoverControlExceptionCode} code
   */
  constructor (message, code) {
    super(message)
    this.name = 'RoverException'
    this.code = code
  }
}
exports.RoverControlExceptionCode = RoverControlExceptionCode
