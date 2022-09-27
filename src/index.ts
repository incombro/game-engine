import console from 'node:console';

import {
  PlayerSpace,
} from './data.js';

const playerSpace = new PlayerSpace();

// console.log(playerSpace.playersCount);

playerSpace.createPlayer({ x: 0, y: 0 });
playerSpace.createPlayer({ x: 0, y: 5 });
playerSpace.createPlayer({ x: 5, y: 0 });
playerSpace.createPlayer({ x: 5, y: 5 });

console.log("Count:", playerSpace.playersCount);

playerSpace.recalculate();

// console.log(playerA.playerDistance(playerB));
