import React, { FC } from "react";
import { Panel } from "../Panel/Panel";
import s from "./index.module.css";
import ComputerIcon from "../../images/burn.svg";
import HackerIcon from "../../images/hacker.svg";
import PoliceIcon from "../../images/police.svg";
import { Stat } from "../Stat";
import { Progress } from "../Progress";
import { useStore } from "effector-react";
import { levels } from "../../levels";
import { levelStore } from "../../store/level";

type Props = {};

export const StatsPanel: FC<Props> = () => {
  const { levelNumber, time, userTries, level } = useStore(levelStore);
  const memesLeft = levels.length - levelNumber;
  const triesLeft = level.tries - userTries;
  const timeLeft = level.time
    ? ((level.time - time) / level.time) * 100
    : undefined;

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
        {timeLeft && (
          <Stat
            title={<Progress percent={timeLeft} />}
            description="till the cops catch you"
            icon={<PoliceIcon />}
          />
        )}
      </Panel>
    </div>
  );
};
