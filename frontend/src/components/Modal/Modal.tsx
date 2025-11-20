import { ReactNode } from "react";
import styles from "./Modal.module.css";

interface ModalProps {
    isOpen: boolean;
    title?: string;
    onClose: () => void;
    children: ReactNode;
    width?: string;
}

export const Modal = ({ isOpen, title, onClose, children, width }: ModalProps) => {
    if (!isOpen) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.modal} style={{ width: width || "500px" }}>
                <div className={styles.header}>
                    <span className={styles.title}>{title}</span>
                    <button className={styles.closeButton} onClick={onClose}>
                        ×
                    </button>
                </div>

                <div className={styles.content}>{children}</div>
            </div>
        </div>
    );
};
