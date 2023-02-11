import {
  Distances,
  Garland,
} from './types.js';

import {
  // prepareArray,
  distanceArrayInit,
  setDistance,
} from './distance.js';

import {
  Player,
} from './player.js';

import {
  PlayerCoordinate,
  playerCoordinateDistance,
} from './playerCoordinate.js';

import {
  garlandCalculate,
} from './garland.js';

export class PlayerSpace {
  #players: Player[];
  #lastId: number;

  #distance: Distances;
  #garland: Garland;

  constructor() {

    this.#players = [];
    this.#lastId = 0;

    this.#distance = distanceArrayInit(this.playersCount);
    this.#garland = [];
  }

  public get playersCount() {
    return this.#players.length;
  }
  public get distance() {
    return this.#distance;
  }
  public get garland() {
    return this.#garland;
  }

  public createPlayer({ x, y }: { x: number, y: number }) {

    const coordinate = new PlayerCoordinate({ x, y })
    const player = new Player(this.#lastId, coordinate);

    this.#lastId ++;
    this.#players.push(player);

  }

  private distanceInitArray() {
    this.#distance = distanceArrayInit(this.playersCount);
  }

  public recalculate() {
    this.recalculateDistnace();
    this.recalculateGarland();
  }

  private recalculateGarland() {
    const distanceAarray = this.#distance;
    const garland = garlandCalculate(distanceAarray);
    console.log({ garland });
    return garland;
  }

  private recalculateDistnace() {

    if (this.#players.length > 1) {

      this.distanceInitArray();

      for (let first = 0; first < this.#players.length - 1; first++) {
        for (let second: number = first + 1; second < this.#players.length; second++) {

          const firstPlayer = this.#players[first];
          const secondPlayer = this.#players[second];

          if (
            typeof firstPlayer === 'object' &&
            typeof secondPlayer === 'object'
          ) {
            const distance = playerCoordinateDistance(
              firstPlayer.coordinate,
              secondPlayer.coordinate,
            );

            setDistance(this.#distance[first], second, distance);
            setDistance(this.#distance[second], first, distance);

            // console.log("ALL DISTANCE", { first, second }, this.#distance);

          }
        }
      }
      // console.log("ALL DISTANCE", this.#distance);
      // let cursor: number = 0;
      // const coordinateA = this.#players[cursor];

    }

  }
}
