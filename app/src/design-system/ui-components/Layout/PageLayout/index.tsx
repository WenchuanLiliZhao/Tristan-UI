import type { ReactNode } from "react";
import styles from "./styles.module.scss";

interface PageLayoutProps {
  topNav: ReactNode;
  leftNav: ReactNode;
  rightNav: ReactNode;
  main: ReactNode;
  appBar: ReactNode;
  footer: ReactNode;
}

export const PageLayout: React.FC<PageLayoutProps> = ({ topNav, leftNav, rightNav, main, appBar, footer }) => {
  
  console.log(topNav, leftNav, rightNav, main, appBar, footer);

  return (
    <div className={styles["page-layout"]}>

    </div>
  )
}