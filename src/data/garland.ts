import {
  getPare,
  getPareOther,
} from './distance.js';

import {
  Distances,
  Garland,
} from './types.js';

export const garlandCalculate = (distanceAarray: Distances) => {
  const garlandAarray: Garland = [];
  const girlandMask: Map<number, boolean> = new Map();
  if (distanceAarray.length < 2) {
    return [];
  }

  const paaar = getPare(distanceAarray);

  console.log({
    paaar,
  });

  if (paaar !== undefined) {
    const newResLeft = getPareOther(
      distanceAarray,
      new Map([
        ...girlandMask,
        [paaar.idLeft, true],
        [paaar.idRight, true],
      ]),
      paaar.idLeft,
    );

    const newResRight = getPareOther(
      distanceAarray,
      new Map([
        ...girlandMask,
        [paaar.idLeft, true],
        [paaar.idRight, true]
      ]),
      paaar.idRight,
    );

    console.log({ newResLeft, newResRight });
  }

  // const getMinimaSizeId = () => {

  // }

  // getMinimaSizeId();

  return garlandAarray;
}
