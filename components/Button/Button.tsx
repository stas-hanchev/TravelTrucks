import { ButtonHTMLAttributes } from "react";
import styles from "./Button.module.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>  {
  children: React.ReactNode;
  onClick?: () => void;
}

export default function Button({ 
    children,
    onClick,
    className = "",
    type = "button",
    ...props
}: ButtonProps) {
  return (
    <button 
        type={type}
        className={`${styles.button} ${className}`}
        onClick={onClick}
        {...props}>
      {children}
    </button>
  );
}