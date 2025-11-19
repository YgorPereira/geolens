import React from "react";
import styles from "./Button.module.css";

type ButtonProps = {
  children: React.ReactNode;
  icon?: React.ReactNode;
  variant?: "blue" | "blueLight" | "card" | "cardDark";
  disabled?: boolean;
  fullWidth?: boolean;
  type?: "button" | "submit";
  onClick?: () => void;
};

export const Button: React.FC<ButtonProps> = ({
  children,
  icon,
  variant = "blue",
  disabled = false,
  fullWidth = false,
  type = "button",
  onClick,
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={[
        styles.button,
        styles[`variant_${variant}`],
        fullWidth ? styles.fullWidth : "",
        disabled ? styles.disabled : "",
      ].join(" ")}
    >
      {icon && <span className={styles.icon}>{icon}</span>}

      <span className={styles.label}>{children}</span>
    </button>
  );
};
