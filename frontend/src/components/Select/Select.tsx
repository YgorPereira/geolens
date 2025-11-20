import React from "react";
import styles from "./Select.module.css";

interface SelectOption {
    value: string | number;
    label: string;
}

interface SelectProps {
    label: string;
    options: SelectOption[];
    value: string | number;
    placeholder?: string;
    error?: string;
    disabled?: boolean;
    onChange: (value: string) => void;
}

export const Select = ({
    label,
    options,
    value,
    placeholder,
    error,
    disabled,
    onChange,
}: SelectProps) => {
    return (
        <div className={styles.wrapper}>
            <label className={styles.label}>{label}</label>

            <select
                className={`${styles.select} 
          ${error ? styles.error : ""} 
          ${disabled ? styles.disabled : ""}
        `}
                value={value}
                disabled={disabled}
                onChange={(e) => onChange(e.target.value)}
            >
                <option value="" disabled>
                    {placeholder || "Selecione..."}
                </option>

                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>

            {error && <span className={styles.errorMessage}>{error}</span>}
        </div>
    );
};
