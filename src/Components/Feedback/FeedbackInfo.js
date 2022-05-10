import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { resetPlayer } from '../../store/player';
import { addPlayerToRanking } from '../../store/ranking';
import Header from '../Header';
import styles from './css/FeedbackInfo.module.css';

const FeedbackInfo = () => {
  const { name, score, assertions, image } = useSelector(
    (state) => state.player,
  );
  const [message, setMessage] = React.useState('');
  const dispatch = useDispatch();

  React.useEffect(() => {
    // Feedback message
    if (assertions < 3) {
      setMessage('Podia ser melhor...');
    } else setMessage('Mandou bem!');

    // Saving at ranking
    const playerRank = {
      picture: image,
      name,
      score,
    };
    dispatch(addPlayerToRanking(playerRank));

    return () => {
      dispatch(resetPlayer());
    };
  }, [assertions, name, score, dispatch, image]);

  return (
    <div className={styles.white_side}>
      <Header />
      <div className={styles.feedback_text}>
        <p className={styles.message}>{message}</p>
        <p>Você obteve {assertions} acertos</p>
        <p>Um total de {score} pontos</p>
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
  );
};

export default FeedbackInfo;
