import React from 'react';
import md5 from 'crypto-js/md5';

class Header extends React.Component {
  constructor() {
    super();
    this.getInfo = this.getInfo.bind(this);
  }

  getInfo() {
    const state = JSON.parse(localStorage.getItem('state'));
    const { gravatarEmail, name, score } = state.player;
    const hash = md5(gravatarEmail).toString();
    const obj = {
      image: `https://www.gravatar.com/avatar/${hash}`,
      name,
      score,
    };
    return obj;
  }

  render() {
    const { image, name, score } = this.getInfo();
    return (
      <header>
        <img
          data-testid="header-profile-picture"
          src={ image }
          alt={ name }
        />
        <h3 data-testid="header-player-name">{ name }</h3>
        <h5 data-testid="header-score">{ score }</h5>
      </header>
    );
  }
}

export default Header;
