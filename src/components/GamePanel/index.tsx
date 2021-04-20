import React, { FC, useMemo } from "react";
import { DrawImageStep, Level } from "../../types";
import { getButtonSteps } from "../../utils";
import { Canvas } from "../Canvas/Canvas";
import { Panel } from "../Panel/Panel";
import { UpdateButton } from "../UpdateButton/UpdateButton";
import s from "./index.module.css";

type Props = {
  areButtonsDisabled: boolean;
  isLoading: boolean;
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
  isLoading,
}) => {
  const { img: levelImg, initialSteps } = level;

  const buttonSteps = useMemo(() => getButtonSteps(level), [level]);

  return (
    <div className={s.main}>
      <Panel contentClassName={s.content} title="CROOKED MIRROR CRACKER">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <>
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
          </>
        )}
      </Panel>
    </div>
  );
};
