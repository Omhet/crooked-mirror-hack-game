import React, { FC } from "react";
import { Panel } from "../Panel/Panel";
import s from "./index.module.css";

type Props = {
  isClicked?: boolean;
};

export const GamePanel: FC<Props> = ({ isClicked }) => {
  return <Panel title="CROOKED MIRROR CRACKER">Hello</Panel>;
};
