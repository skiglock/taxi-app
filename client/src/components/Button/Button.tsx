import React from "react";
import styles from "./button.module.scss";
import clsx from "clsx";

interface IButtonProps {
  variant?: "delete" | "cancel";
  onClick?: () => void;
  children: React.ReactNode;
}

const Button: React.FC<IButtonProps> = (props) => {
  const { children, variant, onClick } = props;
  return (
    <button
      onClick={onClick}
      className={clsx(
        styles.button,
        variant === "delete" && styles.button_delete,
        variant === "cancel" && styles.button_cancel
      )}
    >
      {children}
    </button>
  );
};

export default Button;
