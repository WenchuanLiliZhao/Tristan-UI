import type { DemoPageType } from "..";
import { Element } from "./Element";


const NotFound: DemoPageType = {
  name: "404 Not Found",
  path: "*",
  content: <Element />
}

export default NotFound; 