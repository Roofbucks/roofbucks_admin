import { LogoSymbol } from "assets";
import * as React from "react";
import styles from "./styles.module.css";

interface LogoProps {
  className?: string;
  type: "light" | "dark";
}

const LogoWithText: React.FC<LogoProps> = ({
  className = "",
  type = "light",
}) => {
  return (
    <div className={`${styles.logo} ${className} ${styles[type]}`}>
      <LogoSymbol className={styles.logoImg} />{" "}
      <p className={styles.logoText}>Roofbucks</p>
    </div>
  );
};

export { LogoWithText };
