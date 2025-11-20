import styles from "./Input.module.css";

interface InputProps {
    label: string;
    value: string;
    placeholder?: string;
    error?: string;
    disabled?: boolean;
    onChange: (value: string) => void;
}

export const Input = ({
    label,
    value,
    placeholder,
    error,
    disabled,
    onChange,
}: InputProps) => {
    return (
        <div className={styles.inputWrapper}>
            <label className={styles.label}>{label}</label>

            <input
                className={`${styles.input} 
          ${error ? styles.error : ""}
          ${disabled ? styles.disabled : ""}
        `}
                type="text"
                placeholder={placeholder}
                value={value}
                disabled={disabled}
                onChange={(e) => onChange(e.target.value)}
            />

            {error && <span className={styles.errorMessage}>{error}</span>}
        </div>
    );
};
