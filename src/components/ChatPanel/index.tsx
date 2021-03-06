import cs from "classnames";
import { useStore } from "effector-react";
import React, { FC, useState } from "react";
import SendIcon from "../../images/send.svg";
import { addMessageToChat, chatStore } from "../../store/chat";
import {
  readyToPlayLevelAction,
  readyToStartNextLevelAction,
} from "../../store/level";
import { userStore } from "../../store/user";
import { ChatMessageFrom } from "../../types";
import { getAuthorName } from "../../utils";
import { Button } from "../Button";
import { Panel } from "../Panel/Panel";
import s from "./index.module.css";

const MessageClassNameMap: Record<ChatMessageFrom, string> = {
  [ChatMessageFrom.Friend]: s.friend,
  [ChatMessageFrom.User]: s.user,
  [ChatMessageFrom.Police]: s.police,
};

export const ChatPanel: FC = () => {
  const [input, setInput] = useState("");
  const {
    messages,
    showReadyToPlay,
    isBusy,
    showReadyForNextLevel,
    showReadyForFinalChoice,
  } = useStore(chatStore);
  const { name: userName } = useStore(userStore);

  const sendMessage = () => {
    if (input.length === 0) return;
    setInput("");
    addMessageToChat({ from: ChatMessageFrom.User, text: input }, 0);
  };

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
            Next Level
          </Button>
        )}
        {showReadyForFinalChoice && (
          <div className={s.finalChoice}>
            <Button
              onClick={() => {
                readyToStartNextLevelAction();
              }}
            >
              Go to the meeting
            </Button>
          </div>
        )}
        {!isBusy && !showReadyToPlay && (
          <div className={s.inputWrapper}>
            <input
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
              className={s.input}
              value={input}
              type="text"
              onChange={(e) => setInput(e.target.value)}
              placeholder="Message here..."
            />
            <Button className={s.sendButton} onClick={() => sendMessage()}>
              <SendIcon />
            </Button>
          </div>
        )}
      </Panel>
    </div>
  );
};
