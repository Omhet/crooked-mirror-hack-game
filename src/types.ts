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

export type DrawStepOptions = {
  isAnimated?: boolean;
};

export enum ChatMessageFrom {
  User,
  Friend,
  Police,
}

export type ChatMessage = {
  from: ChatMessageFrom;
  text: string;
};

export type Chat = {
  startMessages: ChatMessage[];
  endMessages: ChatMessage[];
};

export type Level = {
  img: string;
  initialSteps: DrawImageStep[];
  redundantSteps: DrawImageStep[];
  tries?: number;
  time?: number;
  chat: Chat;
  isCheckpoint?: boolean;
};

export enum GameState {
  Start = "start",
  Play = "play",
  Lose = "lose",
  Win = "win",
}

export enum GameOverReason {
  Time,
  Tries,
}

export enum GameFinalChoice {
  Police,
  Friend,
}
