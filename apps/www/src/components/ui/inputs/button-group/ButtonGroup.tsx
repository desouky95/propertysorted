"use client";
import React from "react";
import { Button } from "../button/Button";
import styles from "./ButtonGroup.module.css";
type ButtonGroupProps = {
  children?: Array<React.ReactElement<typeof Button>>;
  onChange?: (value: number) => void;
} & Omit<React.HTMLProps<HTMLDivElement>, "onChange">;

export const ButtonGroup = ({
  children,
  onChange,
  ...props
}: ButtonGroupProps) => {
  const [selected, setSelected] = React.useState(0);

  const handleChildClick = (
    e: React.MouseEvent<HTMLElement>,
    child: any,
    index: number
  ) => {
    child.props?.onClick?.(e);
    setSelected(index);
    onChange?.(index);
  };
  return (
    <div className="flex gap-2" {...props}>
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
          const props = {
            ...child.props,
            onClick: (e: React.MouseEvent<HTMLElement>) =>
              handleChildClick(e, child, index),
            className: index === selected && styles.selected,
          };
          return React.cloneElement(child, {
            ...props,
          });
        }
        return <></>;
      })}
    </div>
  );
};
