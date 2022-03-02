import React from "react";
import styles from "./backdrop.module.scss";

const Backdrop: React.FC = ({ children }) => {
  return <div className={styles.backdrop}>{children}</div>;
};

export default Backdrop;
