
import LuluLogo from "./assets/LuluLogo";
import { useState } from "react";

import { TristanLayout, TopNav, NavTitle, NumericInput, ButtonGroupDevider, NavLink } from "../../../design-system/ui-components";



interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [zoomValue, setZoomValue] = useState(100);
  const [speedValue, setSpeedValue] = useState(1);

  return (
    <TristanLayout
      top={
        <TopNav
          left={[
            <LuluLogo size={32} blackColor="white" whiteColor="#FF4646" />,
            <NavTitle title="lululemon Initiatives" />,
            <ButtonGroupDevider />,
            <NavLink to={`/timeline-demo`}>Overview</NavLink>,
            <ButtonGroupDevider />,
            <NavLink to={`/a`}>Quarter 1</NavLink>,
            <NavLink to={`/b`}>Quarter 2</NavLink>,
            <NavLink to={`/c`}>Quarter 3</NavLink>,
            <NavLink to={`/d`}>Quarter 4</NavLink>,
          ]}
          right={[
            <NavLink to={`/`}>Timeline</NavLink>,
            <div> </div>,
            <NavLink to={`/table`}>Intakes</NavLink>,
            <div style={{ marginLeft: '16px', display: 'flex', gap: '12px', alignItems: 'center' }}>
              <NumericInput
                icon="zoom-in"
                label="Zoom"
                value={zoomValue}
                min={10}
                max={200}
                step={10}
                unit="%"
                size="small"
                onChange={(value) => setZoomValue(value)}
              />
              <NumericInput
                icon="play"
                label="Speed"
                value={speedValue}
                min={0.1}
                max={5}
                step={0.1}
                unit="x"
                size="small"
                onChange={(value) => setSpeedValue(value)}
              />
            </div>,
          ]}
        />
      }
      main={children}
    />
  );
};
