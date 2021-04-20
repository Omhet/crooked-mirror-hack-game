import React, { FC, useMemo } from "react";
import { DrawImageStep, Level } from "../../types";
import { getButtonSteps } from "../../utils";
import { Canvas } from "../Canvas/Canvas";
import { Panel } from "../Panel/Panel";
import { UpdateButton } from "../UpdateButton/UpdateButton";
import s from "./index.module.css";

type Props = {
  areButtonsDisabled: boolean;
  isButtonClicked(id: string): boolean;
  level: Level;
  onAddStep(step: DrawImageStep, id: string): void;
  onStepUpdate(isEqual: boolean): void;
  updateStep?: DrawImageStep;
};

export const GamePanel: FC<Props> = ({
  level,
  onAddStep,
  onStepUpdate,
  updateStep,
  areButtonsDisabled,
  isButtonClicked,
}) => {
  const { img: levelImg, initialSteps } = level;

  const buttonSteps = useMemo(() => getButtonSteps(level), [level]);

  return (
    <Panel title="CROOKED MIRROR CRACKER">
      <Canvas
        originalImageSrc={levelImg}
        onUpdate={onStepUpdate}
        initialSteps={initialSteps}
        updateStep={updateStep}
      />

      <div className={s.btnGrid}>
        {buttonSteps.map((step, index) => {
          const id = `${index}`;
          return (
            <UpdateButton
              key={id}
              isClicked={isButtonClicked(id)}
              isDisabled={areButtonsDisabled}
              step={step}
              onClick={(step) => onAddStep(step, id)}
            />
          );
        })}
      </div>
    </Panel>
  );
};
