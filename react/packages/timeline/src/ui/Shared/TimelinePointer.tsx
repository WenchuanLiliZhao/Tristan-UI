import styles from "./TimelinePointer.module.scss";

export const TimelinePointer = () => {
  return (
    <div className={styles["timeline-pointer"]}>
      <div className={styles["line"]}></div>
      <div className={styles["bullet"]}>
        <div className={styles["bullet-inner"]}></div>
      </div>
    </div>
  );
};
