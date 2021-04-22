import React, { FC } from "react";
import s from "./index.module.css";
import cs from "classnames";

type Props = {
  className?: string;
  isClicked?: boolean;
  onClick(): void;
};

export const Button: FC<Props> = ({
  onClick,
  isClicked,
  className,
  children,
}) => {
  return (
    <button
      onClick={onClick}
      className={cs(s.main, className, { [s.clicked]: isClicked })}
    >
      {children}
    </button>
  );
};
