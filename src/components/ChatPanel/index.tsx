import { useStore } from "effector-react";
import React, { FC } from "react";
import { chatStore } from "../../store/chat";
import { Panel } from "../Panel/Panel";
import s from "./index.module.css";

type Props = {};

export const ChatPanel: FC<Props> = () => {
  const { messages } = useStore(chatStore);

  return (
    <div className={s.main}>
      <Panel title="CHAT">
        {messages.map(({ text }) => (
          <div>{text}</div>
        ))}
      </Panel>
    </div>
  );
};
