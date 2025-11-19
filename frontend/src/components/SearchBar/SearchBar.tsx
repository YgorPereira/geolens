import { ChangeEvent } from "react";
import { Search } from "lucide-react";
import styles from "./SearchBar.module.css";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchBar({
  value,
  onChange,
  placeholder = "Pesquisar...",
}: SearchBarProps) {
  return (
    <div className={styles.searchBar}>
      <Search className={styles.searchIcon} />
      
      <input
        type="text"
        className={styles.searchInput}
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          onChange(e.target.value)
        }
        placeholder={placeholder}
      />
    </div>
  );
}
