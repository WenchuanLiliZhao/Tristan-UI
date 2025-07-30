
import LuluLogo from "./assets/LuluLogo";
import { NavLink } from "react-router-dom";
import { useState } from "react";

import { TristanLayout, TopNav, NavTitle, NumericInput, ButtonGroupDevider } from "../../../design-system/ui-components";

const LiliNavLink = ({ to, name }: { to: string; name: string }) => {
  return (
    <NavLink
      to={to}
      style={({ isActive }) =>
        isActive
          ? { color: `var(--color--text-prime)` }
          : { color: `var(--color--text-negative)` }
      }
    >
      {name}
    </NavLink>
  );
};

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
            <LiliNavLink to={`/`} name="Overview" />,
            <ButtonGroupDevider />,
            <LiliNavLink to={`/a`} name="Quarter 1" />,
            <LiliNavLink to={`/b`} name="Quarter 2" />,
            <LiliNavLink to={`/c`} name="Quarter 3" />,
            <LiliNavLink to={`/d`} name="Quarter 4" />,
          ]}
          right={[
            <LiliNavLink to={`/`} name="Timeline" />,
            <div> </div>,
            <LiliNavLink to={`/table`} name="Intakes" />,
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
