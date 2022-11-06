import console from 'node:console';

import {
  PlayerSpace,
} from './data/playerSpace.js';

const playerSpace = new PlayerSpace();

// console.log(playerSpace.playersCount);

// 0 1 2 3 4 5
playerSpace.createPlayer({ x: 0, y: 0 });
playerSpace.createPlayer({ x: 0, y: 1 });
playerSpace.createPlayer({ x: 0, y: 4 });
playerSpace.createPlayer({ x: 0, y: 9 });
playerSpace.createPlayer({ x: 0, y: 16 });
playerSpace.createPlayer({ x: 0, y: 25 });

// // 0 1 2 3 4 5
// playerSpace.createPlayer({ x: 0, y: 25 });
// playerSpace.createPlayer({ x: 0, y: 16 });
// playerSpace.createPlayer({ x: 0, y: 9 });
// playerSpace.createPlayer({ x: 0, y: 4 });
// playerSpace.createPlayer({ x: 0, y: 1 });
// playerSpace.createPlayer({ x: 0, y: 0 });

// // 0 1 3 4 2 5
// playerSpace.createPlayer({ x: 0, y: 25 });
// playerSpace.createPlayer({ x: 0, y: 16 });
// playerSpace.createPlayer({ x: 0, y: 1 });
// playerSpace.createPlayer({ x: 0, y: 9 });
// playerSpace.createPlayer({ x: 0, y: 4 });
// playerSpace.createPlayer({ x: 0, y: 0 });


// playerSpace.createPlayer({ x: 5, y: 0 });
// playerSpace.createPlayer({ x: -5, y: 0 });
// playerSpace.createPlayer({ x: 5, y: 5 });
// playerSpace.createPlayer({ x: -5, y: -5 });
// playerSpace.createPlayer({ x: 5, y: -5 });
// playerSpace.createPlayer({ x: -5, y: 5 });

console.log("Count:", playerSpace.playersCount);

playerSpace.recalculate();

// console.log(playerSpace.distance);
