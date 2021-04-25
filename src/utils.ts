import { ChatMessageFrom, DrawImageStep, Level } from "./types";

export function shuffle<T>(array: T[]) {
  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

export const getButtonSteps = (level: Level): DrawImageStep[] => [
  ...shuffle([...level.initialSteps, ...level.redundantSteps]),
];

export async function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = () => resolve(img);
    img.onerror = reject;
  });
}

export const MessageAuthorNameMap: Record<ChatMessageFrom, string> = {
  [ChatMessageFrom.Friend]: "w4LRu2",
  [ChatMessageFrom.User]: "",
  [ChatMessageFrom.Police]: 'Agent "Ja883RW0cky" Smith',
};

export const getAuthorName = (from: ChatMessageFrom, userName: string) => {
  return from === ChatMessageFrom.User ? userName : MessageAuthorNameMap[from];
};
