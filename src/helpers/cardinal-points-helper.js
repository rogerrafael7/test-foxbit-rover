const cardinalPointsHelper = {
  cardinalPoints: ['N', 'E', 'S', 'W'],
  getRightPoint(currentCardinalPoint) {
    const index = this.cardinalPoints.indexOf(currentCardinalPoint)
    return this.cardinalPoints[(index + 1) % this.cardinalPoints.length]
  },
  getLeftPoint(currentCardinalPoint) {
    const index = this.cardinalPoints.indexOf(currentCardinalPoint)
    return this.cardinalPoints[(index - 1 + this.cardinalPoints.length) % this.cardinalPoints.length]
  }
}
module.exports = cardinalPointsHelper
