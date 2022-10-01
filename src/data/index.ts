import {
  prepareArray,
  distanceArrayInit,
  Distances,
} from './distance.js';

import {
  Player,
  PlayerCoordinate,
} from './player.js';


export class PlayerSpace {
  #players: Player[];
  #lastId: number;

  #distance: Distances;
  #garland: Array<{ id: number }>

  constructor() {

    this.#players = [];
    this.#lastId = 0;

    this.#distance = distanceArrayInit(this.playersCount);
    this.#garland = new Array<{ id: number }>();
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
    const garlandAarray = new Array<{ id: number }>()
    const distanceAarray = this.#distance;

    const shadowDots = new Map<number, boolean>();

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

      for (let first: number = 0; first < this.#players.length - 1; first++) {
        for (let second: number = first + 1; second < this.#players.length; second++) {

          const distance = PlayerCoordinate.distance(
            this.#players[first]!["coordinate"],
            this.#players[second]!["coordinate"],
          );

          if (typeof this.#distance[first] === 'undefined') {
            this.#distance[first] = new Array<number>()
          }
          if (typeof this.#distance[second] === 'undefined') {
            this.#distance[second] = new Array<number>();
          }

          // console.log("ALL DISTANCE", { first, second }, this.#distance);

          this.#distance[first]![second] = distance;
          this.#distance[second]![first] = distance;

        }
      }
      // console.log("ALL DISTANCE", this.#distance);
      // let cursor: number = 0;
      // const coordinateA = this.#players[cursor];

    }

  }
}
