import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { increaseId, resetSeconds, setAnswered } from '../../store/trivia';
import nextImg from '../../assets/img/next_black.png';
import styles from './css/TriviaNextButton.module.css';

const TriviaNextButton = () => {
  const { id } = useSelector((state) => state.trivia);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const next = () => {
    dispatch(increaseId());
    dispatch(setAnswered());
    dispatch(resetSeconds());
  };

  const linkOrNext = () => {
    if (id === 4) navigate('/feedback');
    else next();
  };

  return (
    <button
      type="button"
      onClick={linkOrNext}
      data-testid="btn-next"
      className={styles.next}
    >
      Próxima
      <img src={nextImg} alt="proxima" />
    </button>
  );
};

export default TriviaNextButton;
