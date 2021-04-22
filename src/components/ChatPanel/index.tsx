import { useStore } from "effector-react";
import React, { FC } from "react";
import cs from "classnames";
import { chatStore } from "../../store/chat";
import { Panel } from "../Panel/Panel";
import s from "./index.module.css";
import { ChatMessageFrom } from "../../types";

const MessageClassNameMap: Record<ChatMessageFrom, string> = {
  [ChatMessageFrom.Friend]: s.friend,
  [ChatMessageFrom.User]: s.user,
  [ChatMessageFrom.Police]: s.police,
};

export const ChatPanel: FC = () => {
  const { messages } = useStore(chatStore);

  return (
    <div className={s.main}>
      <Panel contentClassName={s.content} title="CHAT">
        {messages.map(({ text, from }, index) => (
          <div key={index} className={cs(s.message, MessageClassNameMap[from])}>
            {text}
          </div>
        ))}
      </Panel>
    </div>
  );
};
