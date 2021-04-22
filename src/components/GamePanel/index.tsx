import { useStore } from "effector-react";
import React, { FC } from "react";
import { imageStore } from "../../store/image";
import { levelStore } from "../../store/level";
import { Canvas } from "../Canvas/Canvas";
import { Panel } from "../Panel/Panel";
import { UpdateButtons } from "../UpdateButtons";
import s from "./index.module.css";

type Props = {};

export const GamePanel: FC<Props> = ({}) => {
  const { isLevelLoading, level } = useStore(levelStore);
  const { showOriginal } = useStore(imageStore);

  return (
    <div className={s.main}>
      <Panel contentClassName={s.content} title="CROOKED MIRROR CRACKER">
        {isLevelLoading ? (
          <div>Loading...</div>
        ) : (
          <>
            <div className={s.imageArea}>
              <Canvas />
              {showOriginal && <img className={s.original} src={level.img} />}
            </div>

            <UpdateButtons />
          </>
        )}
      </Panel>
    </div>
  );
};
