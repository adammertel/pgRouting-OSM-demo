import React, { useGlobal } from "reactn";
import "./app.css";

import { useQuery } from "react-query";
import axios from "axios";

import { MapWrapper } from "./MapWrapper";

interface AppProps {}

export const App: React.FC<AppProps> = () => {
  const [start, setStart] = useGlobal("start");
  const [end, setEnd] = useGlobal("end");

  const { status, data, error, isFetching } = useQuery(
    `path-${start}-${end}`,
    async () => {
      const { data } = await axios.get(
        `http://localhost:3000/path?start=${start.lat + "," + start.lng}&end=${
          end.lat + "," + end.lng
        }`
      );
      return data;
    },
    { refetchInterval: 1000 }
  );

  return (
    <div className="wrapper">
      <div className="status">{status}</div>
      <div className="text">{JSON.stringify(start)}</div>
      <div className="text">{JSON.stringify(end)}</div>

      <div>{data?.length}</div>
      <MapWrapper path={data} />
      <div className="text">{JSON.stringify(data)}</div>
    </div>
  );
};
