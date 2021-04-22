import { useStore } from "effector-react";
import React, { FC, useMemo, useState } from "react";
import { levelStore, userTryAction } from "../../store/level";
import { getButtonSteps } from "../../utils";
import { UpdateButton } from "../UpdateButton/UpdateButton";
import s from "./index.module.css";
import { DrawImageStep } from "../../types";
import { updateStepAction, updateStepStore } from "../../store/updateStep";
import { imageStore } from "../../store/image";

type Props = {};

export const UpdateButtons: FC<Props> = () => {
  const { levelNumber, level } = useStore(levelStore);
  const { isStepUpdating } = useStore(updateStepStore);
  const { showOriginal } = useStore(imageStore);

  const [clickedSet, setClickedSet] = useState<Set<string>>(new Set());

  const handleClick = (step: DrawImageStep, id: string) => {
    if (clickedSet.has(id)) {
      clickedSet.delete(id);
    } else {
      clickedSet.add(id);
    }
    setClickedSet(new Set(clickedSet));

    updateStepAction({ ...step });
    userTryAction();
  };

  const buttonSteps = useMemo(() => getButtonSteps(level), [level]);

  return (
    <div className={s.btnGrid}>
      {buttonSteps.map((step, index) => {
        const id = `${levelNumber}-${index}`;
        return (
          <UpdateButton
            key={id}
            isDisabled={isStepUpdating || showOriginal}
            isClicked={clickedSet.has(id)}
            step={step}
            onClick={(step) => handleClick(step, id)}
          />
        );
      })}
    </div>
  );
};
