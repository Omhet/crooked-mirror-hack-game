import { useStore } from "effector-react";
import React, { FC, useMemo } from "react";
import { levelStore } from "../../store/level";
import { getButtonSteps } from "../../utils";
import { UpdateButton } from "../UpdateButton/UpdateButton";
import s from "./index.module.css";

type Props = {};

export const UpdateButtons: FC<Props> = () => {
  const { clickedSet, levelNumber, level } = useStore(levelStore);

  const buttonSteps = useMemo(() => getButtonSteps(level), [level]);

  return (
    <div className={s.btnGrid}>
      {buttonSteps.map((step, index) => {
        const id = `${levelNumber - index}`;
        return (
          <UpdateButton
            key={id}
            isDisabled={false}
            isClicked={clickedSet.has(id)}
            step={step}
            onClick={(step) => console.log(step)}
          />
        );
      })}
    </div>
  );
};
