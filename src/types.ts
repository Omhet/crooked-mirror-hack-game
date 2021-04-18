export type PosOptions = {
  gridSize?: number;
  row?: number;
  col?: number;
  dRow?: number;
  dCol?: number;
};

export type ImageOptions = {
  flipX?: boolean;
  flipY?: boolean;
};

export type DrawImageStep = {
  posOptions?: PosOptions;
  imgOptions?: ImageOptions;
};

export type Level = {
  img: string;
  initialSteps: DrawImageStep[];
  redundantSteps: DrawImageStep[];
};
