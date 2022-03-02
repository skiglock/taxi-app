import React from "react";
import Backdrop from "../Backdrop";
import styles from "./preloader.module.scss";

const Preloader = () => {
  return (
    <Backdrop>
      <div className={styles.preloader}></div>
    </Backdrop>
  );
};

export default Preloader;
