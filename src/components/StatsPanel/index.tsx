import React, { FC } from "react";
import { Panel } from "../Panel/Panel";
import s from "./index.module.css";
import ComputerIcon from "../../images/burn.svg";
import HackerIcon from "../../images/hacker.svg";
import { Stat } from "../Stat";

type Props = {
  triesLeft: number;
  memesLeft: number;
};

export const StatsPanel: FC<Props> = ({ triesLeft, memesLeft }) => {
  return (
    <div className={s.main}>
      <Panel contentClassName={s.content} title="STATS">
        <Stat
          title={`${triesLeft} tries left`}
          description="till the computer burned out"
          icon={<ComputerIcon />}
        />
        <Stat
          title={`${memesLeft} memes left`}
          description="till the Internet is free"
          icon={<HackerIcon />}
        />
      </Panel>
    </div>
  );
};
