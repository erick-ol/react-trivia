import React from 'react';
import { Link } from 'react-router-dom';
import md5 from 'crypto-js/md5';
import Header from '../components/Header';
import styles from './css/feedback.module.css';
import FeedbackSvg from '../components/SVG/FeedbackSvg';

class FeedBack extends React.Component {
  constructor() {
    super();
    this.message = this.message.bind(this);
    this.savePlayer = this.savePlayer.bind(this);
    this.getImage = this.getImage.bind(this);
  }

  componentDidMount() {
    this.savePlayer();
  }

  getImage(email) {
    const hash = md5(email).toString();
    return `https://www.gravatar.com/avatar/${hash}`;
  }

  savePlayer() {
    const state = JSON.parse(localStorage.getItem('state'));
    const { player } = state;
    const { name, score, gravatarEmail } = player;
    const playerRank = {
      picture: this.getImage(gravatarEmail),
      name,
      score,
    };
    if (!localStorage.getItem('ranking')) {
      localStorage.setItem('ranking', JSON.stringify([playerRank]));
    } else {
      const players = JSON.parse(localStorage.getItem('ranking'));
      players.push(playerRank);
      localStorage.setItem('ranking', JSON.stringify(players));
    }
  }

  message() {
    const state = JSON.parse(localStorage.getItem('state'));
    const { assertions } = state.player;
    const number = 3;
    if (assertions < number) {
      return <p data-testid="feedback-text">Podia ser melhor...</p>;
    }
    return <p data-testid="feedback-text">Mandou bem!</p>;
  }

  render() {
    const getState = JSON.parse(localStorage.getItem('state'));
    const { player } = getState;
    return (
      <>
        <div className={ styles.purple_aside }>
          <div className={ styles.elements_purple }>
            <div className={ styles.svg_feedback }>
              <FeedbackSvg />
            </div>
            <div className={ styles.feedback_title }>
              <h1>Feedback</h1>
            </div>
          </div>
        </div>
        <div className={ styles.white_side }>
          <Header />
          <div className={ styles.feedback_text }>
            <p className={ styles.message }>{ this.message() }</p>
            <p data-testid="feedback-total-question">
              Você obteve
              {' '}
              {player.assertions}
              {' '}
              acertos
            </p>
            <p data-testid="feedback-total-score">
              Um total de
              {' '}
              {player.score}
              {' '}
              pontos
            </p>
          </div>
          <div className={ styles.feedback_btns }>
            <Link to="/ranking">
              <button type="button" data-testid="btn-ranking">
                Ver Ranking
              </button>
            </Link>
            <Link to="/">
              <button data-testid="btn-play-again" type="button">
                Jogar novamente
              </button>
            </Link>
          </div>
        </div>
      </>
    );
  }
}

export default FeedBack;
