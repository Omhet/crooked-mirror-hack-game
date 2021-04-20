import React, { FC } from "react";
import s from "./index.module.css";

type Props = {
  isClicked?: boolean;
};

export const StatsPanel: FC<Props> = ({ isClicked }) => {
  return <div className={s.main}></div>;
};
