import React, { FC } from "react";
import s from "./index.module.css";

type Props = {
  title: string;
};

export const Panel: FC<Props> = ({ title, children }) => {
  return (
    <div className={s.main}>
      <header className={s.header}>
        <h2>{title}</h2>
      </header>
      <div className={s.content}>{children}</div>
    </div>
  );
};
