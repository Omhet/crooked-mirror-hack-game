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
            <div
              key={index}
              className={cs({ [s.highlighted]: index <= levelRating - 1 })}
            >
              <HackerIcon />
            </div>
          ))}
      </div>
      <h4>
        The image was encoded by <b>{level.initialSteps.length}</b> step(s)
      </h4>
      <h4>
        And it took <b>{userTries}</b> tries for you to decode it
      </h4>
    </div>
  );
};
