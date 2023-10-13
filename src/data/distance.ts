import {
  DistanceLineDistance,
  DistanceLine,
  Distances,
  DistancesArrayFiltred,
  ShadowUser,
  DisctanceDot,
  DotPare,
} from './types.js';

export const distanceArrayInit: (count: number) =>
  Distances = (count) => {
    return Array.from({ length: count }, () =>
      (Array<number | undefined>(count).fill(undefined)))
  };

export const prepareLine = (
  sourceLine: DistanceLine,
  shadow: ShadowUser,
): Array<DistanceLineDistance> | undefined => {

  if (sourceLine.length - shadow.size < 2) {
    return undefined;
  }

  const filtredLine: Array<DistanceLineDistance> = sourceLine.map((value, id) => {
    if (shadow.has(id)) {
      return undefined;
    }
    return value;
  });

  return filtredLine;
};

export const prepareArray = (
  sourceArray: Distances,
  shadow: Map<number, boolean>,
) => {

  const filtredArray: DistancesArrayFiltred = sourceArray.map((value, id) => {
    if (shadow.has(id)) {
      return undefined;
    }
    if (value) {
      return prepareLine(value, shadow);
    }
    return undefined;
  });

  return filtredArray;
}

export const setDistance = (
  distanceLine: DistanceLine | undefined,
  x: number,
  distance: number,
) => {
  if (distanceLine === undefined) {
    distanceLine = [];
  }
  distanceLine[x] = distance;
}

export const getPare = (
  distArr: Distances
): DisctanceDot | undefined => {
  let pair: DisctanceDot | undefined = undefined;

  distArr.forEach((valueLine, idFirst) => {
    if (valueLine !== undefined) {
      valueLine.forEach((distance, idSecond) => {
        if (distance !== undefined) {
          if (
            (pair === undefined) || (
              (pair !== undefined) &&
              (pair.distance > distance)
            )) {
            pair = {
              distance,
              idFirst,
              idSecond,
            };
          }
        }
      });
    }
  });
  return pair;
}


export const getPareOther = (
  distArr: Distances,
  maskIds: Map<number, boolean>,
  idTarget: number
): DotPare | undefined => {

  let resPar: DotPare | undefined = undefined;

  const worlLine = distArr[idTarget];

  // console.log({
  //   maskIds,
  //   idTarget,
  // });

  if (worlLine === undefined) {
    return undefined;
  }

  worlLine.forEach((distance, id) => {

    if (
      (maskIds.has(id)) ||
      (distance === undefined)
    ) {
      return;
    }

    if (
      (resPar === undefined) &&
      (distance !== undefined)
    ) {
      resPar = {
        id,
        distance,
      };
    }

    if (
      (resPar !== undefined) &&
      (distance < resPar.distance)
    ) {
      resPar = {
        id,
        distance,
      };
    }
  });

  return resPar;
}
