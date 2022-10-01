import console from 'node:console';

import {
  PlayerSpace,
} from './data/index.js';

const playerSpace = new PlayerSpace();

// console.log(playerSpace.playersCount);

playerSpace.createPlayer({ x: 0, y: 0 });
playerSpace.createPlayer({ x: 0, y: 1 });
playerSpace.createPlayer({ x: 0, y: 4 });
playerSpace.createPlayer({ x: 0, y: 9 });
playerSpace.createPlayer({ x: 0, y: 16 });
playerSpace.createPlayer({ x: 0, y: 25 });
// playerSpace.createPlayer({ x: 5, y: 0 });
// playerSpace.createPlayer({ x: -5, y: 0 });
// playerSpace.createPlayer({ x: 5, y: 5 });
// playerSpace.createPlayer({ x: -5, y: -5 });
// playerSpace.createPlayer({ x: 5, y: -5 });
// playerSpace.createPlayer({ x: -5, y: 5 });

console.log("Count:", playerSpace.playersCount);

playerSpace.recalculate();

// console.log(playerSpace.distance);
