import { MutableRefObject, useContext } from "react";

import styles from "./TextInput.module.scss";

import { DarkModeContext } from "context/DarkModeContext";

export default function TextInput({
  refProp,
  label,
  placeholder,
  value,
  id,
  onChange,
  style,
}: {
  refProp?: MutableRefObject<HTMLInputElement | null>;
  label?: string;
  placeholder?: string;
  value?: string;
  id?: string;
  onChange?: any;
  style?: any;
}) {
  const { colorTheme } = useContext(DarkModeContext);
  return (
    <div className={`${styles.inputMain} ${styles[colorTheme]}`} style={style}>
      {label && <label className={styles.label}>{label}</label>}
      <input
        ref={refProp}
        className={styles.input}
        type="text"
        id={id}
        onChange={onChange}
        placeholder={placeholder}
        value={value}
      />
    </div>
  );
}
