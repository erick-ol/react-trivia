import React from 'react';
import { Link } from 'react-router-dom';
import md5 from 'crypto-js/md5';
import Header from '../components/Header';
import styles from './css/feedback.module.css';
import FeedbackSvg from '../components/SVG/FeedbackSvg';

const Feedback = () => {
  const [state, setState] = React.useState(null);
  const [message, setMessage] = React.useState('');

  React.useEffect(() => {
    const getState = JSON.parse(localStorage.getItem('state'));
    setState(getState);
    const { player } = getState;
    const { name, score, gravatarEmail, assertions } = player;

    // Feedback message
    if (assertions < 3) {
      setMessage('Podia ser melhor...');
    } else setMessage('Mandou bem!');

    // Saving at ranking
    const playerRank = {
      picture: `https://www.gravatar.com/avatar/${md5(
        gravatarEmail,
      ).toString()}`,
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
  }, []);

  return (
    <>
      <div className={styles.purple_aside}>
        <div className={styles.elements_purple}>
          <div className={styles.svg_feedback}>
            <FeedbackSvg />
          </div>
          <div className={styles.feedback_title}>
            <h1>Feedback</h1>
          </div>
        </div>
      </div>
      {state && (
        <div className={styles.white_side}>
          <Header />
          <div className={styles.feedback_text}>
            <p className={styles.message}>{message}</p>
            <p>Você obteve {state.player.assertions} acertos</p>
            <p>Um total de {state.player.score} pontos</p>
          </div>
          <div className={styles.feedback_btns}>
            <Link to="/ranking">
              <button type="button">Ver Ranking</button>
            </Link>
            <Link to="/">
              <button type="button">Jogar novamente</button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Feedback;
