import { useStore } from "effector-react";
import React, { FC } from "react";
import { statsStore } from "../../store/stats";
import HackerIcon from "../../images/hacker.svg";
import s from "./index.module.css";
import cs from "classnames";
import { levelStore } from "../../store/level";

type Props = {};

export const Rating: FC<Props> = ({}) => {
  const { levelRating } = useStore(statsStore);
  const { userTries, level } = useStore(levelStore);

  return (
    <div className={s.main}>
      <h3>Rating</h3>
      <div className={s.icons}>
        {Array(3)
          .fill(0)
          .map((_, index) => (
            <div className={cs({ [s.highlighted]: index <= levelRating - 1 })}>
              <HackerIcon key={index} />
            </div>
          ))}
      </div>
      <h4>The image was encoded by {level.initialSteps.length} step(s)</h4>
      <h4>And it took {userTries} tries for you to decode it</h4>
    </div>
  );
};
