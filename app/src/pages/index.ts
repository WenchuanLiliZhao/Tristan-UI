import Home from "./Home";
import NotFound from "./NotFound";
import Timeline from "./Timeline";

export type DemoPageType = {
  name: string;
  path: string;
  content: React.ReactNode;
}

export const DemoPages = {
  Home,
  NotFound,
  Timeline,
}