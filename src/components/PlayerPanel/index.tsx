import React, { FC, useEffect, useRef, useState } from "react";
import Wave from "@foobar404/wave";
import { Panel } from "../Panel/Panel";
import s from "./index.module.css";
import { Button } from "../Button";
import PrevIcon from "../../images/prev.svg";
import NextIcon from "../../images/next.svg";
import MuteIcon from "../../images/mute.svg";
import UnmuteIcon from "../../images/unmute.svg";
import { useStore } from "effector-react";
import { chatStore } from "../../store/chat";
import { gameStateStore } from "../../store/gameState";
import { GameState } from "../../types";

const stations = [
  "https://rautemusik-de-hz-fal-stream17.radiohost.de/rm-bass_mp3-192?ref=radiobrowser",
  "https://rautemusik-de-hz-fal-stream15.radiohost.de/rm-deutschrap-charts_mp3-192?ref=radiobrowser",
  "https://rautemusik-de-hz-fal-stream17.radiohost.de/rm-deutschrap-classic_mp3-192?ref=radiobrowser",
  "https://rautemusik-de-hz-fal-stream16.radiohost.de/deutschrap?ref=radiobrowser",
  "https://rautemusik-de-hz-fal-stream16.radiohost.de/trap?ref=radiobrowser",
];

export const PlayerPanel: FC = ({}) => {
  const [stationIndex, setStationIndex] = useState<number>(0);
  const [muted, setMuted] = useState<boolean>(false);
  const [wave] = useState(() => new Wave());
  const audio = useRef<HTMLAudioElement>(null);

  const { isBusy } = useStore(chatStore);
  const { gameState } = useStore(gameStateStore);

  useEffect(() => {
    setMuted(gameState !== GameState.Play);
  }, [gameState]);

  useEffect(() => {
    if (audio.current) {
      if (isBusy) {
        audio.current.volume = 0.3;
      } else {
        audio.current.volume = 1;
      }
    }
  }, [isBusy]);

  useEffect(() => {
    if (audio.current) {
      audio.current.muted = muted;
    }
  }, [muted]);

  useEffect(() => {
    wave.fromElement("radio", "radio-vis", {
      type: "bars",
      colors: ["rgba(226, 0, 225, 0.6)"],
    });
  }, []);

  return (
    <div className={s.main}>
      <Panel contentClassName={s.content} title="PLAYER">
        <audio
          id="radio"
          ref={audio}
          key={stationIndex}
          autoPlay
          src={stations[stationIndex]}
        ></audio>
        <canvas className={s.radioVis} id="radio-vis"></canvas>
        <div className={s.controls}>
          <Button
            onClick={() =>
              setStationIndex((prev) =>
                prev === 0 ? stations.length - 1 : prev - 1
              )
            }
          >
            <PrevIcon />
          </Button>
          <Button
            onClick={() => {
              setMuted((prev) => !prev);
            }}
          >
            {muted ? <UnmuteIcon /> : <MuteIcon />}
          </Button>
          <Button
            onClick={() =>
              setStationIndex((prev) =>
                prev === stations.length - 1 ? 0 : prev + 1
              )
            }
          >
            <NextIcon />
          </Button>
        </div>
      </Panel>
    </div>
  );
};
