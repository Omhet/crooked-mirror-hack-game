import React, { FC } from "react";
import cs from "classnames";
import { DrawImageStep } from "../Canvas/types";
import s from "./UpdateButton.module.css";

export type UpdateButtonProps = {
  step: DrawImageStep;
  onClick(step: DrawImageStep): void;
  isClicked?: boolean;
};

const getStr = (str: string, item?: any, withItem: boolean = false) =>
  item ? (withItem ? `${str} ${item}` : str) : "";

export const UpdateButton: FC<UpdateButtonProps> = ({
  step,
  onClick,
  isClicked = false,
}) => {
  const { posOptions = {}, imgOptions = {} } = step;
  const { gridSize = 1, col = 1, row = 1 } = posOptions;
  const { flipX, flipY } = imgOptions;

  // const hLine = (
  //   <svg viewBox="0 0 100 1" xmlns="http://www.w3.org/2000/svg">
  //     <line x1="0" y1="0" x2="100" y2="0" stroke="black" />
  //   </svg>
  // );

  // const vLine = (
  //   <svg viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
  //     <line x1="5" y1="0" x2="5" y2="10" stroke="black" />
  //   </svg>
  // );
  return (
    <button
      style={{
        gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
        gridTemplateRows: `repeat(${gridSize}, 1fr)`,
      }}
      onClick={() => onClick(step)}
      className={cs(s.main, { [s.clicked]: isClicked })}
    >
      <div
        style={{
          gridArea: `${row} / ${col} / ${row} / ${col}`,
        }}
        className={cs(s.lineWrapper, s.line, { [s.v]: flipY, [s.h]: flipX })}
      >
        {/* <div className={cs(s.line, { [s.v]: flipY, [s.h]: flipX })}></div> */}
      </div>
    </button>
  );
};
