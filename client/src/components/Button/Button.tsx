import React from "react";
import styles from "./button.module.scss";
import clsx from "clsx";

interface IButtonProps {
  variant?: "delete" | "cancel" | "success";
  onClick?: () => void;
  type?: "submit";
  disabled?: boolean;
}

const Button: React.FC<IButtonProps> = ({
  variant,
  children,
  onClick,
  type,
  disabled,
}) => {
  return (
    <button
      disabled={disabled}
      type={type}
      onClick={onClick}
      className={clsx(
        styles.button,
        variant === "delete" && styles.button_delete,
        variant === "cancel" && styles.button_cancel,
        variant === "success" && styles.button_success
      )}
    >
      {children}
    </button>
  );
};

export default Button;
