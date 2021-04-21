import React, { FC } from "react";
import s from "./index.module.css";

type Props = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

export const Stat: FC<Props> = ({ title, description, icon }) => {
  return (
    <div>
      <div className={s.top}>
        <span className={s.icon}>{icon}</span>
        <span className={s.title}>{title}</span>
      </div>
      <div className={s.description}>{description}</div>
    </div>
  );
};
