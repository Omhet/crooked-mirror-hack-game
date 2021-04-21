import React, { FC } from "react";
import s from "./index.module.css";

type Props = {
  percent: number;
};

export const Progress: FC<Props> = ({ percent }) => {
  return (
    <div className={s.main}>
      <div style={{ width: `${percent}%` }} className={s.bar}></div>
    </div>
  );
};
