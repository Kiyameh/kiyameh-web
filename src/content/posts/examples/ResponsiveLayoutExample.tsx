import { useState } from "react";
import ResponsiveGrid from "./ResponsiveGrid";
import s from "./ResponsiveLayoutExample.module.css";

const ResponsiveLayoutExample = () => {
  const [colsDesktop, setColsDesktop] = useState(4);
  const [colsTablet, setColsTablet] = useState(3);
  const [colsMobile, setColsMobile] = useState(1);

  const items = Array.from({ length: 8 });

  const mobileBreakpoint = 768;
  const tabletBreakpoint = 1024;

  return (
    <div className={s.container}>
      <div className={s.inputsContainer}>
        <div>
          <label htmlFor="colsDesktop">Cols Desktop</label>
          <input
            type="number"
            id="colsDesktop"
            max={8}
            min={1}
            value={colsDesktop}
            onChange={(e) => setColsDesktop(Number(e.target.value))}
          />
        </div>

        <div>
          <label htmlFor="colsTablet">Cols Tablet</label>
          <input
            type="number"
            id="colsTablet"
            max={8}
            min={1}
            value={colsTablet}
            onChange={(e) => setColsTablet(Number(e.target.value))}
          />
        </div>

        <div>
          <label htmlFor="colsMobile">Cols Mobile</label>
          <input
            type="number"
            id="colsMobile"
            max={8}
            min={1}
            value={colsMobile}
            onChange={(e) => setColsMobile(Number(e.target.value))}
          />
        </div>
      </div>

      {/* Usamos el componente inyectando las variables */}
      <ResponsiveGrid
        colsDesktop={colsDesktop}
        colsTablet={colsTablet}
        colsMobile={colsMobile}
      >
        {items.map((_, i) => (
          <div key={i} className={s.gridItem}>
            {i + 1}
          </div>
        ))}
      </ResponsiveGrid>
    </div>
  );
};

export default ResponsiveLayoutExample;
