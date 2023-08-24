import * as React from "react";
import styles from "./styles.module.css";

interface ButtonProps {
  type: "primary" | "secondary" | "tertiary";
  className?: string;
  children: any;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  type,
  onClick,
}) => {
  return (
    <button
      className={`${styles.btn} ${className} ${styles[type]}`}
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
    >
      {children}
    </button>
  );
};

export { Button };
