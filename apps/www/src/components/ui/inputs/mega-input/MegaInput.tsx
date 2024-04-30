"use client";

import {
  HTMLAttributes,
  HTMLProps,
  PropsWithChildren,
  Suspense,
  useRef,
  useState,
} from "react";
import { Portal } from "../../utils/portal/Portal";
import { Modal } from "../../utils/modal/Modal";
import clsx from "clsx";
import styles from "./MegaInput.module.css";
import { useMegaMenu } from "../../navigation/mega-menu/MegeMenuProvider";
import { useStateRef } from "@/hooks/useStateRef";
import { useModalState } from "@/hooks/useModalState";

type MegaInputProps = {
  modal?: {
    className?: string;
    isOpen?: boolean;
  };
  label?: string;
  input: React.ReactElement<InnerInputProps>;
  onChange?: (state: boolean, name?: string) => void;
  name?: string;
  className?: string;
  selected?: boolean;
};
interface MegaInputComposition {
  Input: React.FC<InnerInputProps>;
}
export const MegaInput: MegaInputComposition &
  React.FC<PropsWithChildren<MegaInputProps>> = ({
  modal,
  label = "Placeholder",
  input,
  children,
  onChange,
  name,
  selected = false,
  ...props
}) => {
  const [ref, setRef] = useStateRef<HTMLElement>();
  const [isContentOpen, open, close] = useModalState(modal?.isOpen);
  const { active, hasActive } = useMegaMenu();

  const isSelected = selected ?? active === name;
  // Styles
  const modalClassName = clsx([modal?.className, "mt-2"]);
  const className = clsx(
    styles.megaInput,
    {
      [styles.clicked]: active !== null && active === name,
      [styles.notSelected]: !isSelected && hasActive,
      [styles.selected]: isSelected,
    },
    props.className
  );

  return (
    <div
      ref={setRef}
      className={className}
      onClick={() => {
        open();
        onChange?.(true, name);
      }}
    >
      <div className={styles.megaInputWrapper}>
        <div className="pb-[2px] text-xs font-semibold">{label}</div>
        {input}
      </div>
      <Modal
        isOpen={isContentOpen && isSelected}
        parent={ref}
        className={modalClassName}
        onClose={() => {
          if (active !== name) return;
          close();
          onChange?.(false, name);
        }}
      >
        {children}
      </Modal>
    </div>
  );
};

type InnerInputProps = React.InputHTMLAttributes<HTMLInputElement>;
const InnerInput: React.FC<InnerInputProps> = (props) => {
  const className = clsx([props.className, styles.megaInnerInput]);
  return <input {...props} className={styles.megaInnerInput} />;
};

MegaInput.Input = InnerInput;
