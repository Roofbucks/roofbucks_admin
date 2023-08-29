import * as React from "react";
import styles from "./styles.module.css";
import Select from "react-select";
import { optionType } from "types";

export const initOptionType: optionType = {
  label: "",
  value: "",
};

interface CustomSelectProps {
  parentClassName?: string;
  inputClass?: string;
  dataTestID?: string;
  onChange: (e) => void;
  validatorMessage: string;
  name: string;
  placeholder: string;
  label: string;
  id?: string;
  options: optionType[];
  value: optionType;
  isMulti?: boolean;
  disabled?: boolean;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  dataTestID,
  placeholder,
  parentClassName,
  name,
  validatorMessage,
  onChange,
  inputClass,
  label,
  id,
  options,
  value,
  isMulti,
  disabled,
}) => {
  return (
    <div
      className={`${styles.inputWrapper} ${parentClassName} ${
        validatorMessage ? styles.error : ""
      }`}
    >
      {label && <label className={styles.label}>{label}</label>}
      <Select
        onChange={(x) => onChange(x)}
        placeholder={placeholder}
        data-testid={dataTestID}
        className={`${inputClass} ${styles.select}`}
        classNamePrefix="formSelect"
        id={id}
        name={name}
        options={options}
        value={value.value ? value : null}
        isMulti={isMulti}
        isDisabled={disabled}
      />
      {validatorMessage && (
        <small className={styles.message}>{validatorMessage}</small>
      )}
    </div>
  );
};

export { CustomSelect };
