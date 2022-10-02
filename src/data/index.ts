import {
  prepareArray,
  distanceArrayInit,
  Distances,
} from './distance.js';

import {
  Player,
} from './player.js';

import {
  PlayerCoordinate,
  playerCoordinateDistance,
} from './playerCoordinate.js';

export class PlayerSpace {
  #players: Player[];
  #lastId: number;

  #distance: Distances;
  #garland: { id: number }[]

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
    const garlandAarray: { id: number }[] = []
    const distanceAarray = this.#distance;

    const shadowDots: Map<number, boolean> = new Map();

    // shadowDots.set(0, true);
    // shadowDots.set(1, true);
    // shadowDots.set(2, true);
    // shadowDots.set(3, true;)
    // shadowDots.set(4, true);
    // shadowDots.set(5, true);

    console.log("shadowDots:", shadowDots);
    console.log("garlandAarray:", garlandAarray);
    console.log("distanceAarray:", distanceAarray);

    const resArray = prepareArray(distanceAarray, shadowDots);
    console.log("resArray:", resArray);

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

            if (Array.isArray(this.#distance[first]) === true) {
              this.#distance[first]![second] = distance;
            } else {
              this.#distance[first] = [];
              this.#distance[first]![second] = distance;
            }

            if (Array.isArray(this.#distance[second]) === true) {
              this.#distance[second]![first] = distance;
            } else {
              this.#distance[second] = [];
              this.#distance[second]![first] = distance;
            }

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
