import React, { useState, useEffect } from "react";
import "./app.css";

import { MapWrapper } from "./MapWrapper";

interface AppProps {}

const fetchPath: any = async (start: any, end: any) => {
  return await fetch(
    `http://localhost:3000/path?start=${start.lat},${start.lng}&end=${end.lat},${end.lng}`
  ).then((response) => response.json());
};

export const App: React.FC<AppProps> = () => {
  const [start, setStart] = useState<any>({ lat: 18.168, lng: 48.94 });
  const [end, setEnd] = useState<any>({ lat: 18.18, lng: 48.925 });
  const [path, setPath] = useState<false | object>(false);

  useEffect(() => {
    const refetchPath = async () => {
      const path = await fetchPath(start, end);
      console.log(path);
      setPath(path);
    };
    refetchPath();

    console.log("we need a new path");
  }, [start, end]);

  return (
    <div className="wrapper">
      <div className="status">{status}</div>
      <div className="text">{JSON.stringify(start)}</div>
      <div className="text">{JSON.stringify(end)}</div>

      <MapWrapper
        path={path}
        end={end}
        start={start}
        moveStart={(ll: any) => {
          setStart(ll);
        }}
        moveEnd={(ll: any) => {
          setEnd(ll);
        }}
      />
      <div className="text">{JSON.stringify(path)}</div>
    </div>
  );
};
