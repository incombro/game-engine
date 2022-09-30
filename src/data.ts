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

    // return Math.sqrt((((x1 - x2) ** 2) + ((y1 - y2) ** 2)));
    return Math.round(Math.sqrt((((x1 - x2) ** 2) + ((y1 - y2) ** 2))));
  }

  get coordinate() {
    return { x: this.#x, y: this.#y };
  }
}

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
    return PlayerCoordinate.distance(this.#coordiante, player.coordinate);
  }

}

export class PlayerSpace {
  #players: Player[];
  #lastId: number;

  #distance: Array<Array<number | undefined>>;
  #garland: Array<{ id: number }>

  constructor() {

    this.#players = [];
    this.#lastId = 0;

    this.#distance = new Array<Array<number | undefined>>(new Array());
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
    this.#distance = Array.from({
      length: this.#players.length
    }, () => (new Array<number | undefined>(this.#players.length).fill(undefined)));
  }

  public recalculate() {
    this.recalculateDistnace();
    this.recalculateGarland();
  }

  private recalculateGarland() {
    const garlandAarray = new Array<{ id: number }>()
    const distanceAarray = this.#distance;

    const shadowDots: Array<number> = new Array<number>();

    const prepareLine = (
      sourceLine: Array<number | undefined>,
      shadow: Array<number>,
    ): Array<number | undefined> => {
      const filtredLine = new Array<number | undefined>(sourceLine.length).fill(undefined);
      sourceLine.map((value, id) => {
        if (shadow.findIndex((el) => el === id) !== -1) {
          return filtredLine[id] = undefined;
        }
        return filtredLine[id] = value;
      })
      return filtredLine;
    }

    const prepareArray = (sourceArray: Array<Array<number | undefined> | undefined>, shadow: Array<number>) => {

      const filtredArray: Array<Array<number | undefined> | undefined> =
        new Array<Array<number | undefined> | undefined>(sourceArray.length).fill(undefined);

      sourceArray.map((value, id) => {
        if (shadow.findIndex((el) => el == id) !== -1) {
          return filtredArray[id] = undefined;
        }
        if (value) {
          return filtredArray[id] = prepareLine(value, shadow);
        }
        return undefined;
      });

      return filtredArray;
    }

    shadowDots.push(1, 2, 5);

    const resArray = prepareArray(distanceAarray, shadowDots);

    console.log("shadowDots:", shadowDots);
    console.log("garlandAarray:", garlandAarray);
    console.log("distanceAarray:", distanceAarray);
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
      // console.log("ALL DISTANCE", this.#distance);
      // let cursor: number = 0;
      // const coordinateA = this.#players[cursor];

    }

  }
}
