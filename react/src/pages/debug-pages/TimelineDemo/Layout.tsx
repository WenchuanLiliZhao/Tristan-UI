
import LuluLogo from "./assets/LuluLogo";
import { NavLink } from "react-router-dom";

import { TristanLayout, TopNav, NavTitle } from "../../../design-system/ui-components";

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
  return (
    <TristanLayout
      top={
        <TopNav
          left={[
            <LuluLogo size={32} blackColor="white" whiteColor="#FF4646" />,
            <NavTitle title="Roadmap of lululemon Initiatives" />,
          ]}
          right={[
            <LiliNavLink to={`/`} name="Timeline" />,
            <div> </div>,
            <LiliNavLink to={`/table`} name="Intakes" />,
          ]}
        />
      }
      main={children}
    />
  );
};
