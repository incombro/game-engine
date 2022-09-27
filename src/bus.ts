import console from 'node:console';

export class Bus {
  #bus: number[]
  constructor() {
    this.#bus = new Array<number>()
  }
  data() {
    console.log(this.#bus)
  }
}
