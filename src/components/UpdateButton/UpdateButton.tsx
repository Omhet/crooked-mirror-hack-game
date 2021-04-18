import React, { FC } from "react";
import cs from "classnames";
import { DrawImageStep } from "../Canvas/types";
import s from "./UpdateButton.module.css";

export type UpdateButtonProps = {
  step: DrawImageStep;
  onClick(step: DrawImageStep): void;
  isClicked?: boolean;
};

export const UpdateButton: FC<UpdateButtonProps> = ({
  step,
  onClick,
  isClicked = false,
}) => {
  const { posOptions = {}, imgOptions = {} } = step;
  const { gridSize = 1, col, row } = posOptions;
  const { flipX, flipY } = imgOptions;

  const rowStart = !row ? 1 : row;
  const rowEnd = !row ? `span ${gridSize}` : row;

  const colStart = !col ? 1 : col;
  const colEnd = !col ? `span ${gridSize}` : col;

  const gridStyle = {
    gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
    gridTemplateRows: `repeat(${gridSize}, 1fr)`,
  };

  return (
    <div className={s.main}>
      <button
        style={gridStyle}
        onClick={() => onClick(step)}
        className={cs(s.btn, { [s.clicked]: isClicked })}
      >
        <div
          style={{
            gridArea: `${rowStart} / ${colStart} / ${rowEnd} / ${colEnd}`,
          }}
          className={cs(s.line, { [s.v]: flipY, [s.h]: flipX })}
        ></div>
      </button>
      <div style={gridStyle} className={s.gridTracks}>
        {[...new Array(gridSize * gridSize)].fill(0).map((_, index) => (
          <div key={index} className={s.sector} />
        ))}
      </div>
    </div>
  );
};
