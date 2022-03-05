import React from "react";
import styles from "./button.module.scss";
import clsx from "clsx";

interface IButtonProps {
  variant?: "delete" | "cancel" | "success";
  onClick?: () => void;
  type?: "submit";
}

const Button: React.FC<IButtonProps> = ({
  variant,
  children,
  onClick,
  type,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx(styles.button, styles[`button_${variant}`])}
    >
      {children}
    </button>
  );
};

export default Button;
