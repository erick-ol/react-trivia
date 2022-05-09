import React from 'react';
import { useSelector } from 'react-redux';
import styles from './style.module.css';

const Header = () => {
  const { image, name, score } = useSelector((state) => state.player);

  return (
    <header className={styles.header}>
      <div className={styles.person}>
        <img data-testid="header-profile-picture" src={image} alt={name} />
        <h3 data-testid="header-player-name" className={styles.header_text}>
          {name}
        </h3>
      </div>
      <h5 data-testid="header-score" className={styles.header_text}>
        Pontos:
        {` ${score}`}
      </h5>
    </header>
  );
};

export default Header;
