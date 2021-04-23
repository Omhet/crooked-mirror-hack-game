import cs from "classnames";
import { useStore } from "effector-react";
import React, { FC } from "react";
import SendIcon from "../../images/send.svg";
import { chatStore } from "../../store/chat";
import {
  readyToPlayLevelAction,
  readyToStartNextLevelAction,
} from "../../store/level";
import { userStore } from "../../store/user";
import { ChatMessageFrom } from "../../types";
import { Button } from "../Button";
import { Panel } from "../Panel/Panel";
import s from "./index.module.css";

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
  const { messages, showReadyToPlay, isBusy, showReadyForNextLevel } = useStore(
    chatStore
  );
  const { name: userName } = useStore(userStore);

  return (
    <div className={s.main}>
      <Panel contentClassName={s.content} title="CHAT">
        <div className={s.messages}>
          {messages.map(({ text, from }, index) => (
            <div
              key={index}
              className={cs(s.message, MessageClassNameMap[from])}
            >
              <h4 className={s.name}>{getAuthorName(from, userName)}</h4>
              <p className={s.text}>{text}</p>
            </div>
          ))}
        </div>
        {showReadyToPlay && (
          <Button
            className={s.readyButton}
            onClick={() => readyToPlayLevelAction()}
          >
            Let's Hack
          </Button>
        )}
        {showReadyForNextLevel && (
          <Button
            className={s.readyButton}
            onClick={() => readyToStartNextLevelAction()}
          >
            Go
          </Button>
        )}
        {!isBusy && !showReadyToPlay && (
          <div className={s.inputWrapper}>
            <input
              className={s.input}
              type="text"
              onChange={() => {}}
              placeholder="Message here..."
            />
            <Button className={s.sendButton} onClick={() => {}}>
              <SendIcon />
            </Button>
          </div>
        )}
      </Panel>
    </div>
  );
};
