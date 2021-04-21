import React, { FC } from "react";
import s from "./index.module.css";

type Props = {
  isClicked?: boolean;
  onClick(): void;
};

export const Button: FC<Props> = ({ isClicked, onClick, children }) => {
  return (
    <button onClick={onClick} className={s.main}>
      {children}
    </button>
  );
};
