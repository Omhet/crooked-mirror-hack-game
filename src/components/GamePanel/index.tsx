import React, { FC } from "react";
import { DrawImageStep, Level } from "../../types";
import { Canvas } from "../Canvas/Canvas";
import { Panel } from "../Panel/Panel";
import { UpdateButtons } from "../UpdateButtons";
import s from "./index.module.css";

type Props = {
  isLoading: boolean;
};

export const GamePanel: FC<Props> = ({ isLoading }) => {
  return (
    <div className={s.main}>
      <Panel contentClassName={s.content} title="CROOKED MIRROR CRACKER">
        {isLoading ? (
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
