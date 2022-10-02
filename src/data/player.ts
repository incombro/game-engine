import {
  PlayerCoordinate,
  playerCoordinateDistance,
} from './playerCoordinate.js';

export class Player {

  #coordiante: PlayerCoordinate;
  #id: number;

  constructor(id: number, coordinate: PlayerCoordinate) {
    this.#coordiante = coordinate;
    this.#id = id;
  }

  get coordinate() {
    return this.#coordiante;
  }

  get id() {
    return this.#id;
  }

  playerDistance(player: Player) {
    return playerCoordinateDistance(this.#coordiante, player.coordinate);
  }

}
