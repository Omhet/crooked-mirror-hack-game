import React, { FC } from "react";
import cs from "classnames";
import s from "./index.module.css";

type Props = {
  title: string;
  contentClassName?: string;
};

export const Panel: FC<Props> = ({ title, contentClassName, children }) => {
  return (
    <div className={s.main}>
      <header className={s.header}>
        <h2>{title}</h2>
      </header>
      <div className={cs(s.content, contentClassName)}>{children}</div>
    </div>
  );
};
