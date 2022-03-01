import React from "react";
import styles from "./preloader.module.scss";

const Preloader = () => {
  return (
    <div className={styles.backdrop}>
      <div className={styles.preloader}></div>
    </div>
  );
};

export default Preloader;
