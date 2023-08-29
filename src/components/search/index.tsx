import { SearchIcon } from "assets";
import styles from "./styles.module.scss";

interface SearchProps {
  className?: string;
  value: string;
  placeholder: string;
  handleChange: (val: string) => void;
}

const Search: React.FC<SearchProps> = ({
  className,
  handleChange,
  value,
  placeholder,
}) => {
  return (
    <div
      className={`${styles.searchContainer} ${className}`}
    >
      <SearchIcon />
      <input
        onChange={(e) => handleChange(e.target.value)}
        value={value}
        placeholder={placeholder}
        type="search"
      />
    </div>
  );
};

export { Search };
