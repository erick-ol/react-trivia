import React from 'react';
import md5 from 'crypto-js/md5';
import styles from './style.module.css';

const Header = () => {
  const getInfo = () => {
    const state = JSON.parse(localStorage.getItem('state'));
    const { gravatarEmail, name, score } = state.player;
    const hash = md5(gravatarEmail).toString();
    const obj = {
      image: `https://www.gravatar.com/avatar/${hash}`,
      name,
      score,
    };
    return obj;
  };

  const { image, name, score } = getInfo();

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
