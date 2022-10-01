export type DistanceLine = Array<number | undefined>;
export type Distances = Array<DistanceLine>;
export type DistancesArrayFiltred = Array<DistanceLine | undefined>

export const distanceArrayInit: (count: number) => Distances = (count) => Array.from({ length: count }, () => (new Array<number | undefined>(count).fill(undefined)));

export const prepareLine = (
  sourceLine: DistanceLine,
  shadow: Map<number, boolean>,
): Array<number | undefined> | undefined => {

  if (sourceLine.length - shadow.size < 2) {
    return undefined;
  }

  const filtredLine = new Array<number | undefined>(sourceLine.length)
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

  const filtredArray: DistancesArrayFiltred = new Array(sourceArray.length)
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
