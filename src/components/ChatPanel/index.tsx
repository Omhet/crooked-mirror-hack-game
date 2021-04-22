import { useStore } from "effector-react";
import React, { FC } from "react";
import cs from "classnames";
import { chatStore } from "../../store/chat";
import { Panel } from "../Panel/Panel";
import s from "./index.module.css";
import { ChatMessageFrom } from "../../types";
import { userStore } from "../../store/user";

const MessageClassNameMap: Record<ChatMessageFrom, string> = {
  [ChatMessageFrom.Friend]: s.friend,
  [ChatMessageFrom.User]: s.user,
  [ChatMessageFrom.Police]: s.police,
};

const MessageAuthorNameMap: Record<ChatMessageFrom, string> = {
  [ChatMessageFrom.Friend]: "Nagibator",
  [ChatMessageFrom.User]: "",
  [ChatMessageFrom.Police]: "COP_14",
};

const getAuthorName = (from: ChatMessageFrom, userName: string) => {
  return from === ChatMessageFrom.User ? userName : MessageAuthorNameMap[from];
};

export const ChatPanel: FC = () => {
  const { messages } = useStore(chatStore);
  const { name: userName } = useStore(userStore);

  return (
    <div className={s.main}>
      <Panel contentClassName={s.content} title="CHAT">
        {messages.map(({ text, from }, index) => (
          <div key={index} className={cs(s.message, MessageClassNameMap[from])}>
            <h4 className={s.name}>{getAuthorName(from, userName)}</h4>
            <p className={s.text}>{text}</p>
          </div>
        ))}
      </Panel>
    </div>
  );
};
