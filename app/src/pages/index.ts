import Home from "./Home";
import NotFound from "./NotFound";
import Timeline from "./Timeline";
import IconDebug from "./IconDebug";

export type DemoPageType = {
  name: string;
  path: string;
  content: React.ReactNode;
}

export const DemoPages = {
  Home,
  NotFound,
  Timeline,
  IconDebug,
}