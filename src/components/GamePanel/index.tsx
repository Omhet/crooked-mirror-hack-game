import { useStore } from "effector-react";
import React, { FC } from "react";
import { chatStore } from "../../store/chat";
import { imageStore } from "../../store/image";
import { levelStore } from "../../store/level";
import { Canvas } from "../Canvas/Canvas";
import { Panel } from "../Panel/Panel";
import { Rating } from "../Rating/";
import { UpdateButtons } from "../UpdateButtons";
import s from "./index.module.css";

type Props = {};

export const GamePanel: FC<Props> = ({}) => {
  const { level, isLevelEnd, levelNumber } = useStore(levelStore);
  const { showOriginal } = useStore(imageStore);
  const { isBusy } = useStore(chatStore);

  return (
    <div className={s.main}>
      <Panel contentClassName={s.content} title="CROOKED MIRROR CRACKER">
        <div className={s.imageArea}>
          <Canvas />
          {showOriginal && <img className={s.original} src={level.img} />}
        </div>

        <UpdateButtons />
        {levelNumber === 0 && (
          <p>Push this buttons to flip parts of the image</p>
        )}
        {isBusy && <div className={s.overlay}>NO_DATA</div>}
        {isLevelEnd && (
          <div className={s.overlay}>
            <img className={s.finalOriginal} src={level.img} />
            <Rating />
          </div>
        )}
      </Panel>
    </div>
  );
};
