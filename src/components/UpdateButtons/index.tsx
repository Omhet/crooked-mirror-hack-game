import { useStore } from "effector-react";
import React, { FC, useMemo, useState } from "react";
import { levelStore } from "../../store/level";
import { getButtonSteps } from "../../utils";
import { UpdateButton } from "../UpdateButton/UpdateButton";
import s from "./index.module.css";
import { DrawImageStep } from "../../types";

type Props = {};

export const UpdateButtons: FC<Props> = () => {
  const { levelNumber, level } = useStore(levelStore);
  const [clickedSet, setClickedSet] = useState<Set<string>>(new Set());

  const handleClick = (step: DrawImageStep, id: string) => {
    if (clickedSet.has(id)) {
      clickedSet.delete(id);
    } else {
      clickedSet.add(id);
    }
    setClickedSet(new Set(clickedSet));
  };

  const buttonSteps = useMemo(() => getButtonSteps(level), [level]);

  return (
    <div className={s.btnGrid}>
      {buttonSteps.map((step, index) => {
        const id = `${levelNumber}-${index}`;
        return (
          <UpdateButton
            key={id}
            isDisabled={false}
            isClicked={clickedSet.has(id)}
            step={step}
            onClick={(step) => handleClick(step, id)}
          />
        );
      })}
    </div>
  );
};
