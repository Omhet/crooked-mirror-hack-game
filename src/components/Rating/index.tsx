import { useStore } from "effector-react";
import React, { FC } from "react";
import { statsStore } from "../../store/stats";
import HackerIcon from "../../images/hacker.svg";
import s from "./index.module.css";
import cs from "classnames";

type Props = {};

export const Rating: FC<Props> = ({}) => {
  const { levelRating } = useStore(statsStore);

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
    </div>
  );
};
