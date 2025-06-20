import Home from "./Home/_Config";
import Color from "./Color/_Config";
import IconShowcase from "./IconShowcase/_Config";

export type DemoPageType = {
  name: string;
  path: string;
  content: React.ReactNode;
}

export const DemoPages = {
  Home,
  Color,
  IconShowcase,
}