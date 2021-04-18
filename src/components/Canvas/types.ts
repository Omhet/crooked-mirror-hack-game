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
  id: string;
  posOptions?: PosOptions;
  imgOptions?: ImageOptions;
};
