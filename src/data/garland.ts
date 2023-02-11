import {
  getPare,
  getPareOther,
} from './distance.js';

import {
  Distances,
  DotPare,
  Garland,
  // PareOther,
} from './types.js';

export const garlandCalculate = (distanceAarray: Distances): Garland => {
  const garlandAarray: Garland = [];
  const girlandMask: Map<number, boolean> = new Map();

  if (distanceAarray.length < 2) {
    return [];
  }

  const firstPare = getPare(distanceAarray);

  // console.log({
  //   firstPare,
  // });

  if (firstPare !== undefined) {

    let idFirst: number = firstPare.idFirst;
    let idSecond: number = firstPare.idSecond;

    garlandAarray.push({ id: idFirst }, { id: idSecond });

    for (; girlandMask.size < distanceAarray.length - 2;) {
      // console.log('girlandMask.size:', girlandMask.size);
      // console.log('girlandMask:', girlandMask);

      let idFirstNew: DotPare | undefined = getPareOther(
        distanceAarray,
        new Map([
          ...girlandMask,
          [idFirst, true],
          [idSecond, true],
        ]),
        idFirst,
      );

      let idSecondNew: DotPare | undefined = getPareOther(
        distanceAarray,
        new Map([
          ...girlandMask,
          [idFirst, true],
          [idSecond, true],
        ]),
        idSecond,
      );

      // console.log({ idFirstNew, idSecondNew });

      if (idFirstNew === undefined) {
        if (idSecondNew !== undefined) {
          garlandAarray.push({ id: idSecondNew.id });
          // console.log('Added:', { idSecondNew });
        }
      }

      if (idSecondNew === undefined) {
        if (idFirstNew !== undefined) {
          garlandAarray.unshift({ id: idFirstNew.id });
          // console.log('Added:', { idFirstNew });
        }
      }

      if ((idFirstNew !== undefined) && (idSecondNew !== undefined)) {

        // console.log("idFirstNew.id:", idFirstNew.id, "idFirstNew.distance:", idFirstNew.distance);
        // console.log("idSecondNew.id:", idSecondNew.id, "idSecondNew.distance:", idSecondNew.distance);

        if (idFirstNew.distance < idSecondNew.distance) {
          garlandAarray.unshift({ id: idFirstNew.id });
          girlandMask.set(idFirst, true);
          idFirst = idFirstNew.id;
          // console.log("Mask Id idFirst:", idFirst);
        } else {
          garlandAarray.push({ id: idSecondNew.id });
          girlandMask.set(idSecond, true);
          idSecond = idSecondNew.id;
          // console.log("Mask Id idSecond:", idSecond);
        }
        // console.log("count", { garlandAarray });
      }
    }

    // console.log({ garlandAarray });
  }

  // console.log("RESULT:", { girlandMask, garlandAarray });
  return garlandAarray;
}
