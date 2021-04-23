import React, { FC, useEffect, useState } from "react";
import { Panel } from "../Panel/Panel";
import s from "./index.module.css";
import { RadioBrowserApi } from "radio-browser-api";
import { Button } from "../Button";
import PrevIcon from "../../images/prev.svg";
import NextIcon from "../../images/next.svg";

const api = new RadioBrowserApi(fetch.bind(window), "Crooked Mirror Game");

const getStations = async () => {
  const stations = await api.searchStations({
    language: "english",
    tag: "techno",
    tagExact: true,
    limit: 5,
  });
  return stations.map(({ urlResolved }) => urlResolved);
};

type Props = {};

export const PlayerPanel: FC<Props> = ({}) => {
  const [stations, setStations] = useState<string[]>([]);
  const [stationIndex, setStationIndex] = useState<number>(0);

  useEffect(() => {
    getStations().then(setStations);
  }, []);

  console.log(stations);

  return (
    <div className={s.main}>
      <Panel title="PLAYER">
        {stations.length > 0 && (
          <audio
            key={stationIndex}
            autoPlay
            controls
            src={stations[stationIndex]}
          ></audio>
        )}
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
