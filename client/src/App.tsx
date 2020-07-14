import React, { useGlobal } from "reactn";
import "./app.css";

interface AppProps {}

export const App: React.FC<AppProps> = () => {
  const [title, setTitle] = useGlobal("title");
  return (
    <div className="wrapper">
      <div className="text">{title}</div>
      <input
        value={title}
        onChange={(e: React.FormEvent<HTMLInputElement>) => {
          const newValue = e.currentTarget.value;
          if (typeof newValue === "string") {
            setTitle(newValue);
          }
        }}
      />
    </div>
  );
};
