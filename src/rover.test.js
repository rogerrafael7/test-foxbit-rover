const run = require('./index')
const { RoverControlException, RoverControlExceptionCode } = require('./exceptions/rover-exception')
describe('Rover', () => {
  test('Deve retornar as posições finais dos dois Rovers, após processar as instruções de entrada', () => {
    const upperRight = [5, 5]
    const rovers = [
      {
        startX: 1,
        startY: 2,
        facing: 'N',
        instructions: ['L', 'M', 'L', 'M', 'L', 'M', 'L', 'M', 'M']
      },
      {
        startX: 3,
        startY: 3,
        facing: 'E',
        instructions: ['M', 'M', 'R', 'M', 'M', 'R', 'M', 'R', 'R', 'M']
      }
    ]
    const result = run(upperRight, rovers)
    expect(result).toEqual([
      { roverIndex: '0', finalPosition: { x: 1, y: 3, facing: 'N' } },
      { roverIndex: '1', finalPosition: { x: 5, y: 1, facing: 'E' } }
    ])
  })
  test('Deve retornar a posição final de um Rover após processar as instruções de entrada', () => {
    const upperRight = [5, 5]
    const rovers = [
      {
        startX: 2,
        startY: 4,
        facing: 'W',
        instructions: ['M', 'L', 'M', 'R', 'M']
      }
    ]
    const result = run(upperRight, rovers)
    expect(result).toEqual([
      { roverIndex: '0', finalPosition: { x: 0, y: 3, facing: 'W' } },
    ])
  })
  test('Deve criticar se alguma instrução de movimento fizer o Rover sair do planalto', () => {
    try {
      const upperRight = [5, 5]
      const rovers = [
        {
          startX: 3,
          startY: 3,
          facing: 'E',
          instructions: ['M', 'M', 'R', 'M', 'M', 'R', 'M', 'R', 'R', 'M', 'M', 'M', 'M', 'M', 'M']
        }
      ]
      run(upperRight, rovers)
      expect(true).toBe(false)
    } catch (error) {
      expect(error instanceof RoverControlException).toBe(true)
      expect(error.code).toBe(RoverControlExceptionCode.ERROR_INSTRUCTION_OUTSIDE_PLATEAU)
    }
  })
  test('Deve criticar se a posição inicial do rover já estiver fora do planalto', () => {
    try {
      const upperRight = [5, 5]
      const rovers = [
        {
          startX: 6,
          startY: 6,
          facing: 'N',
          instructions: []
        }
      ]
      run(upperRight, rovers)
      expect(true).toBe(false)
    } catch (error) {
      expect(error instanceof RoverControlException).toBe(true)
      expect(error.code).toBe(RoverControlExceptionCode.ERROR_INSTRUCTION_OUTSIDE_PLATEAU)
    }
  })
  test('Deve criticar se não for parametrizado o startX', () => {
    try {
      const upperRight = [5, 5]
      const rovers = [
        {
          startY: 6,
          facing: 'N',
          instructions: []
        }
      ]
      run(upperRight, rovers)
      expect(true).toBe(false)
    } catch (error) {
      expect(error instanceof RoverControlException).toBe(true)
      expect(error.code).toBe(RoverControlExceptionCode.INVALID_POSITION)
    }
  })
  test('Deve criticar se não for parametrizado o startY', () => {
    try {
      const upperRight = [5, 5]
      const rovers = [
        {
          startX: 6,
          facing: 'N',
          instructions: []
        }
      ]
      run(upperRight, rovers)
      expect(true).toBe(false)
    } catch (error) {
      expect(error instanceof RoverControlException).toBe(true)
      expect(error.code).toBe(RoverControlExceptionCode.INVALID_POSITION)
    }
  })
  test('Deve criticar se for parametrizado um facing inválido', () => {
    try {
      const upperRight = [5, 5]
      const rovers = [
        {
          startX: 1,
          startY: 2,
          facing: 'TESTE',
          instructions: []
        }
      ]
      run(upperRight, rovers)
      expect(true).toBe(false)
    } catch (error) {
      expect(error instanceof RoverControlException).toBe(true)
      expect(error.code).toBe(RoverControlExceptionCode.INVALID_FACING)
    }
  })
  test('Deve criticar se for parametrizado uma instrução inválida', () => {
    try {
      const upperRight = [5, 5]
      const rovers = [
        {
          startX: 1,
          startY: 2,
          facing: 'N',
          instructions: ['L', 'R', 'M', 'TESTE']
        }
      ]
      run(upperRight, rovers)
      expect(true).toBe(false)
    } catch (error) {
      expect(error instanceof RoverControlException).toBe(true)
      expect(error.code).toBe(RoverControlExceptionCode.INVALID_INSTRUCTION)
    }
  })
})
