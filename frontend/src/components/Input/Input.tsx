import styles from "./Input.module.css";

interface InputProps {
    label: string;
    value: string;
    placeholder?: string;
    error?: string;
    disabled?: boolean;
    type?: string;
    onChange?: (value: string) => void;
    onBlur?: () => void;
}

export const Input = ({
    label,
    value,
    placeholder,
    error,
    disabled,
    type = "text",
    onChange,
    onBlur
}: InputProps) => {
    return (
        <div className={styles.inputWrapper}>
            <label className={styles.label}>{label}</label>

            <input
                className={`${styles.input} 
          ${error ? styles.error : ""}
          ${disabled ? styles.disabled : ""}
        `}
                type={type}
                placeholder={placeholder}
                value={value}
                disabled={disabled}
                onChange={(e) => onChange(e.target.value)}
                onBlur={onBlur}
            />

            {error && <span className={styles.errorMessage}>{error}</span>}
        </div>
    );
};
