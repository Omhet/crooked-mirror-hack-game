import React, { FC, ReactNode } from "react";
import s from "./index.module.css";

type Props = {
  title: ReactNode;
  description: string;
  icon?: ReactNode;
};

export const Stat: FC<Props> = ({ title, description, icon }) => {
  return (
    <div>
      <div className={s.top}>
        {icon && <span className={s.icon}>{icon}</span>}
        <span className={s.title}>{title}</span>
      </div>
      <div className={s.description}>{description}</div>
    </div>
  );
};
