export interface IData {
}

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

    const { x: x1, y: y1, } = playerCoordinate1.coordinate;
    const { x: x2, y: y2, } = playerCoordinate2.coordinate;

    return Math.sqrt((((x1 - x2) ** 2) + ((y1 - y2) ** 2)));
  }

  get coordinate() {
    return { x: this.#x, y: this.#y };
  }
}

export class Player {

  #coordiantes: PlayerCoordinate;
  #id: number;

  constructor(id: number, coodinates: PlayerCoordinate) {
    this.#coordiantes = coodinates;
    this.#id = id;
  }

  get coordinate() {
    return this.#coordiantes;
  }

  get id() {
    return this.#id;
  }

  playerDistance(player: Player) {
    return PlayerCoordinate.distance(this.#coordiantes, player.coordinate);
  }

}

export class PlayerSpace {
  #players: Player[];
  #lastId: number;

  // #distance: { a: number, b: number, distance: number }[];

  // #distance: number[][];

  #distance: Array<Array<number>>;

  constructor() {

    this.#players = [];
    this.#lastId = 0;

    this.#distance = new Array<Array<number>>(new Array());

  }

  public createPlayer({ x, y }: { x: number, y: number }) {

    const coordinate = new PlayerCoordinate({ x, y })
    const player = new Player(this.#lastId, coordinate);

    this.#lastId ++;
    this.#players.push(player);

  }

  public get playersCount() {
    return this.#players.length;
  }

  public get distance() {
    return this.#distance;
  }

  private distanceInitArray() {
    this.#distance = Array.from({
      length: this.#players.length
    }, () => (new Array<number>(this.#players.length).fill(0)));
  }

  public recalculate() {


    if (this.#players.length > 1) {

      this.distanceInitArray();

      for (let first: number = 0; first < this.#players.length - 1; first++) {
        for (let second: number = first + 1; second < this.#players.length; second++) {

          const distance = PlayerCoordinate.distance(
            this.#players[first]!["coordinate"],
            this.#players[second]!["coordinate"],
          );

          if (typeof this.#distance[first] === undefined) {
            this.#distance[first] = new Array<number>()
          }
          if (typeof this.#distance[second] === undefined) {
            this.#distance[second] = new Array<number>();
          }

          // console.log("ALL DISTANCE", { first, second }, this.#distance);

          this.#distance[first]![second] = distance;
          this.#distance[second]![first] = distance;

        }
      }

      console.log("ALL DISTANCE", this.#distance);
      // let cursor: number = 0;
      // const coordinateA = this.#players[cursor];

    }

  }
}
