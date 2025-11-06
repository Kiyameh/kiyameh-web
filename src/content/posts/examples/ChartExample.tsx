import React, { useState } from "react";
import s from "./ChartExample.module.css";

const ChartExample = () => {
  const [value, setValue] = useState<number>(50);
  const [color, setColor] = useState<string>("#209CEE");

  const styleVars = {
    "--bar-height": `${value}%`,
    "--bar-color": color,
  } as React.CSSProperties;

  return (
    <div className={s.container}>
      <div className={s.chartControls}>
        <label>
          Valor ({value}%):
          <input
            type="range"
            min="0"
            max="100"
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
          />
        </label>
        <label>
          Color:
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </label>
      </div>

      <div className={s.chartContainer}>
        <div
          className={s.chartBar}
          style={{ height: "42%", backgroundColor: "lightgreen" }}
        ></div>
        <div
          className={s.chartBar}
          style={{ height: "60%", backgroundColor: "lightblue" }}
        ></div>
        <div className={s.chartBar} style={styleVars}></div>
        <div
          className={s.chartBar}
          style={{ height: "45%", backgroundColor: "lightcoral" }}
        ></div>
        <div
          className={s.chartBar}
          style={{ height: "15%", backgroundColor: "rebeccapurple" }}
        ></div>
      </div>
    </div>
  );
};

export default ChartExample;
