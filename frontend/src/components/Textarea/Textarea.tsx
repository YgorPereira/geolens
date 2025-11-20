import styles from "./Textarea.module.css";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = ({ label, error, ...props }: TextareaProps) => {
  const className = [
    styles.textarea,
    error ? styles.error : "",
    props.disabled ? styles.disabled : ""
  ].join(" ");

  return (
    <div className={styles.wrapper}>
      {label && <label className={styles.label}>{label}</label>}

      <textarea className={className} {...props} />

      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
};
