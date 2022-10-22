export type DistanceLineDistance = number | undefined;
export type DistanceLine = Array<DistanceLineDistance>;
export type Distances = DistanceLine[];
export type DistancesArrayFiltred = Array<DistanceLine | undefined>
export type ShadowUser = Map<number, boolean>;

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

  const filtredLine: DistanceLine = Array<DistanceLineDistance>(sourceLine.length)
    .fill(undefined);

  sourceLine.map((value, id) => {
    if (shadow.has(id)) {
      return filtredLine[id] = undefined;
    }
    return filtredLine[id] = value;
  })
  return filtredLine;
};

export const prepareArray = (
  sourceArray: Distances,
  shadow: Map<number, boolean>,
) => {

  const filtredArray: DistancesArrayFiltred = Array<DistanceLine | undefined>(sourceArray.length)
    .fill(undefined);

  sourceArray.map((value, id) => {
    if (shadow.has(id)) {
      return filtredArray[id] = undefined;
    }
    if (value) {
      return filtredArray[id] = prepareLine(value, shadow);
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
