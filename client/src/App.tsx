import React, { useGlobal } from "reactn";
import "./app.css";

import { useQuery } from "react-query";
import axios from "axios";

interface AppProps {}

export const App: React.FC<AppProps> = () => {
  const [start, setStart] = useGlobal("start");
  const [end, setEnd] = useGlobal("end");

  const { status, data, error, isFetching } = useQuery(
    `path-${start}-${end}`,
    async () => {
      const { data } = await axios.get(
        `http://localhost:3000/path?start=${start}&end=${end}`
      );
      return data;
    },
    {}
  );

  return (
    <div className="wrapper">
      <div className="status"> {status}</div>
      <div className="text">{start}</div>
      <div className="text">{end}</div>
      <input
        value={start}
        onChange={(e: React.FormEvent<HTMLInputElement>) => {
          const newValue = e.currentTarget.value;
          if (typeof newValue === "string") {
            setStart(newValue);
          }
        }}
      />
      <input
        value={end}
        onChange={(e: React.FormEvent<HTMLInputElement>) => {
          const newValue = e.currentTarget.value;
          if (typeof newValue === "string") {
            setEnd(newValue);
          }
        }}
      />
      <div>{data?.length}</div>
    </div>
  );
};
