import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Ranking extends Component {
  constructor() {
    super();
    this.ranking = this.ranking.bind(this);
  }

  ranking() {
    const players = JSON.parse(localStorage.getItem('ranking'));
    players.sort((a, b) => b.score - a.score);
    return players;
  }

  render() {
    const players = this.ranking();
    return (
      <div>
        <h2 data-testid="ranking-title">Ranking:</h2>
        <ul>
          {
            players.map((player, index) => {
              const { name, picture, score } = player;
              return (
                <li key={ index }>
                  <img
                    data-testid="header-profile-picture"
                    src={ picture }
                    alt={ name }
                  />
                  <p>
                    <span data-testid={ `player-name-${index}` }>{ name }</span>
                    <span data-testid={ `player-score-${index}` }>{ score }</span>
                  </p>
                </li>
              );
            })
          }
        </ul>
        <Link to="/">
          <button type="button" data-testid="btn-go-home">
            Início
          </button>
        </Link>
      </div>
    );
  }
}

export default Ranking;
