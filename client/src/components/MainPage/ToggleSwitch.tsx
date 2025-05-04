import React from "react";
import styles from "./ToggleSwitch.module.css";

type ToggleSwitchProps = {
  isChecked: boolean;
  onToggle: () => void;
};

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ isChecked, onToggle }) => {
  return (
    <label className={styles.switch}>
      <input type="checkbox" checked={isChecked} onChange={onToggle} />
      <span className={styles.slider}></span>
    </label>
  );
};

export default ToggleSwitch;
