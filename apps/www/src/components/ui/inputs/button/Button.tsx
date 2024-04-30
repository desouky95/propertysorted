"use client";
import React from "react";
import styles from "./Button.module.css";
import { clsx } from "clsx";

type ButtonProps<C extends React.ElementType = "button"> = {
  as?: C;
  children?: React.ReactNode;
  isIcon?: boolean;
  prefixIcon?: React.ReactNode;
};

export const Button = <C extends React.ElementType = "button">({
  children,
  as,
  prefixIcon,
  isIcon,
  ...props
}: ButtonProps<C> &
  Omit<React.ComponentPropsWithoutRef<C>, keyof ButtonProps<C>>) => {
  const className = clsx(styles.button, props.className, {
    [styles.isIcon]: isIcon,
  });
  const Component = as || "button";
  return (
    <Component {...props} className={className}>
      <span className={styles.prefixIcon}>{prefixIcon}</span>
      {children}
    </Component>
  );
};
