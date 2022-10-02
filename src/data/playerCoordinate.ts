

export class PlayerCoordinate {
  #x: number
  #y: number

  constructor({ x, y }: { x: number, y: number }) {
    this.#x = x;
    this.#y = y;
  }

  static distance(
    playerCoordinate1: PlayerCoordinate,
    playerCoordinate2: PlayerCoordinate,
  ) {
    return playerCoordinateDistance(
      playerCoordinate1,
      playerCoordinate2,
    );
  }

  get coordinate() {
    return { x: this.#x, y: this.#y };
  }
}

export const playerCoordinateDistance = (
  playerCoordinate1: PlayerCoordinate,
  playerCoordinate2: PlayerCoordinate,
) => {

  const { x: x1, y: y1, } = playerCoordinate1.coordinate;
  const { x: x2, y: y2, } = playerCoordinate2.coordinate;

  // return Math.sqrt((((x1 - x2) ** 2) + ((y1 - y2) ** 2)));
  return Math.round(Math.sqrt((((x1 - x2) ** 2) + ((y1 - y2) ** 2))));
}
