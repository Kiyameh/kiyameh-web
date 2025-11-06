import React, { useEffect } from "react";
import s from "./ResponsiveGrid.module.css";
const ResponsiveGrid = ({
  children,
  colsDesktop = 3,
  colsTablet = 2,
  colsMobile = 1,
  gap = "1.5rem",
}: {
  children: React.ReactNode;
  colsDesktop?: number;
  colsTablet?: number;
  colsMobile?: number;
  gap?: string;
}) => {
  const gridVars = {
    "--grid-cols-desktop": colsDesktop,
    "--grid-cols-tablet": colsTablet,
    "--grid-cols-mobile": colsMobile,
    "--grid-gap": gap,
  } as React.CSSProperties;

  return (
    <div className={s.responsiveGrid} style={gridVars}>
      {children}
    </div>
  );
};

export default ResponsiveGrid;
