import React, { FC } from "react";
import { Panel } from "../Panel/Panel";
import s from "./index.module.css";
import ComputerIcon from "../../images/burn.svg";
import HackerIcon from "../../images/hacker.svg";
import PoliceIcon from "../../images/police.svg";
import EyeIcon from "../../images/eye.svg";
import { Stat } from "../Stat";
import { Progress } from "../Progress";
import { useStore } from "effector-react";
import { levels } from "../../levels";
import { levelStore } from "../../store/level";
import { Button } from "../Button";
import { imageStore, toggleShowOriginalAction } from "../../store/image";
import { chatStore } from "../../store/chat";

type Props = {};

export const StatsPanel: FC<Props> = () => {
  const { levelNumber, time, userTries, level } = useStore(levelStore);
  const { showOriginal } = useStore(imageStore);
  const { isBusy } = useStore(chatStore);

  const memesLeft = levels.length - levelNumber;
  const triesLeft =
    level.tries !== undefined ? level.tries - userTries : undefined;
  const timeLeft =
    level.time !== undefined
      ? ((level.time - time) / level.time) * 100
      : undefined;

  return (
    <div className={s.main}>
      <Panel contentClassName={s.content} title="STATS">
        {isBusy ? (
          <div>NO_DATA</div>
        ) : (
          <>
            {level.isCheckpoint && (
              <div className={s.checkpoint}>Checkpoint</div>
            )}
            <Stat
              title={`${memesLeft} memes left`}
              description="till the Internet is free"
              icon={<HackerIcon />}
            />
            {triesLeft && (
              <Stat
                title={`${triesLeft} tries left`}
                description="till the computer burned out"
                icon={<ComputerIcon />}
              />
            )}
            {timeLeft && (
              <Stat
                title={<Progress percent={timeLeft} />}
                description="till the cops catch you"
                icon={<PoliceIcon />}
              />
            )}
            <Stat
              title={
                <Button
                  className={s.showOriginalButton}
                  onClick={toggleShowOriginalAction}
                  isClicked={showOriginal}
                >
                  <EyeIcon />
                </Button>
              }
              description="shows the original"
            />
          </>
        )}
      </Panel>
    </div>
  );
};
