import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import RankingSvg from '../components/SVG/RankingSvg';
import styles from './css/ranking.module.css';

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
      <>
        <div className={ styles.purple_aside }>
          <div className={ styles.elements_purple }>
            <div className={ styles.svg_ranking }>
              <RankingSvg />
            </div>
            <div className={ styles.ranking_title }>
              <h1>Ranking</h1>
            </div>
          </div>
        </div>
        <div className={ styles.white_side }>
          <ul>
            {
              players.map((player, index) => {
                const { name, picture, score } = player;
                return (
                  <li key={ index } className={ styles.ranking_ind }>
                    <div className={ styles.person }>
                      <img
                        data-testid="header-profile-picture"
                        src={ picture }
                        alt={ name }
                      />
                      <h3 data-testid={ `player-name-${index}` } className={ styles.header_text }>{ name }</h3>
                    </div>
                    <h5 data-testid={ `player-score-${index}` } className={ styles.header_text }>
                      Pontos:
                      { score }
                    </h5>
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
      </>
    );
  }
}

export default Ranking;
