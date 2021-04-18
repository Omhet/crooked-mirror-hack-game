import React, { FC } from "react";
import { DrawImageStep } from "../Canvas/types";
import s from "./UpdateButton.module.css";

export type UpdateButtonProps = {
  step: DrawImageStep;
  onClick(step: DrawImageStep): void;
};

const getStr = (str: string, item?: any, withItem: boolean = false) =>
  item ? (withItem ? `${str} ${item}` : str) : "";

export const UpdateButton: FC<UpdateButtonProps> = ({ step, onClick }) => {
  const { posOptions = {}, imgOptions = {} } = step;
  const { flipX, flipY } = imgOptions;
  const flipStr = `${getStr("X", flipX)}${getStr("Y", flipY)}`;
  const colStr = getStr("Col", posOptions.col, true);
  const rowStr = getStr("Row", posOptions.row, true);
  return (
    <button onClick={() => onClick(step)} className={s.main}>
      <span>{flipStr}</span>
      <span>{colStr}</span>
      <span>{rowStr}</span>
    </button>
  );
};
