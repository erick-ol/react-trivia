import React from 'react';
import styles from './css/Input.module.css';

const Input = ({ type, name, value, onChange, error, onBlur }) => {
  return (
    <div className={styles.wrapper}>
      <input
        className={styles.input}
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default Input;
