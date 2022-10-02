export type DistanceLine = Array<number | undefined>;
export type Distances = DistanceLine[];
export type DistancesArrayFiltred = Array<DistanceLine | undefined>

export const distanceArrayInit: (count: number) =>
  Distances = (count) => {
    return Array.from({ length: count }, () =>
      (Array<number | undefined>(count).fill(undefined)))
  };

export type ShadowUser = Map<number, boolean>;

export const prepareLine = (
  sourceLine: DistanceLine,
  shadow: ShadowUser,
): Array<number | undefined> | undefined => {

  if (sourceLine.length - shadow.size < 2) {
    return undefined;
  }

  const filtredLine: DistanceLine = Array<number | undefined>(sourceLine.length)
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
