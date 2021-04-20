import React, { FC } from "react";
import { Panel } from "../Panel/Panel";
import s from "./index.module.css";

type Props = {
  isClicked?: boolean;
};

export const ChatPanel: FC<Props> = ({ isClicked }) => {
  return (
    <div className={s.main}>
      <Panel title="CHAT">Hello</Panel>
    </div>
  );
};
