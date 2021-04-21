import { useStore } from "effector-react";
import React, { FC } from "react";
import { levelStore } from "../../store/level";
import { Canvas } from "../Canvas/Canvas";
import { Panel } from "../Panel/Panel";
import { UpdateButtons } from "../UpdateButtons";
import s from "./index.module.css";

type Props = {};

export const GamePanel: FC<Props> = ({}) => {
  const { isLevelLoading } = useStore(levelStore);

  return (
    <div className={s.main}>
      <Panel contentClassName={s.content} title="CROOKED MIRROR CRACKER">
        {isLevelLoading ? (
          <div>Loading...</div>
        ) : (
          <>
            <Canvas onUpdate={() => console.log("update")} />

            <UpdateButtons />
          </>
        )}
      </Panel>
    </div>
  );
};
