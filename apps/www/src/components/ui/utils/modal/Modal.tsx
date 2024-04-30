import React from "react"
import { Portal } from "../portal/Portal"
import clsx from "clsx"
import styles from './Modal.module.css'
type ModalProps = React.ComponentProps<typeof Portal> & React.HTMLProps<HTMLDivElement>
export const Modal = ({ children, ...props }: ModalProps) => {


    const { isOpen, parent, onClose } = props
    const className = clsx([styles.modal,props.className])

    return <Portal isOpen={isOpen} parent={parent} onClose={onClose} >
        <div className={className}>{children}</div>
    </Portal>

}