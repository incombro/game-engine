export type DistanceLineDistance = number | undefined;
export type DistanceLine = Array<DistanceLineDistance>;
export type Distances = DistanceLine[];
export type DistancesArrayFiltred = Array<DistanceLine | undefined>;

export type ShadowUser = Map<number, boolean>;

export type GarlandPair = { idLeft: number, idRight: number };
export type Garland = Array<GarlandPair>;

export type DotPaire = {
  distance: number;
  idLeft: number;
  idRight: number;
};

export type PareOther = {
  id: number;
  distance: number;
};
