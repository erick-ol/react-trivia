import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Header from '../Header';
import styles from '../../Pages/css/trivia.module.css';
import { addAssertion, addPoints } from '../../store/player';
import { decreaseSeconds, setAnswered } from '../../store/trivia';
import { progressBar } from './helpers/progressBar';
import { answeredStyle } from './helpers/answeredStyle';
import TriviaNextButton from './TriviaNextButton';

const TriviaQuestionsSide = () => {
  const { data } = useSelector((state) => state.questions);
  const { seconds, id, answered } = useSelector((state) => state.trivia);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (data && !answered && seconds > 0) {
      setTimeout(() => dispatch(decreaseSeconds()), 1000);
    }
    if (!answered && seconds === 0) dispatch(setAnswered());
  }, [seconds, answered, dispatch, data]);

  const sumScore = () => {
    dispatch(setAnswered());
    const difficulty = data[id].difficulty;

    switch (window.atob(difficulty)) {
      case 'easy':
        dispatch(addPoints(10 + seconds));
        break;
      case 'medium':
        dispatch(addPoints(10 + seconds * 2));
        break;
      case 'hard':
        dispatch(addPoints(10 + seconds * 3));
        break;
      default:
        return;
    }
    dispatch(addAssertion());
  };

  return (
    <>
      {data && (
        <div className={styles.white_side}>
          <Header />
          <div className={styles.questions_main}>
            <p className={styles.question}>
              <span>{window.atob(data[id].question)}</span>
            </p>
            <ul>
              <li>
                <button
                  type="button"
                  onClick={sumScore}
                  className={`${answeredStyle('correct', styles, answered)} ${
                    styles.answer
                  }`}
                  disabled={answered}
                >
                  {window.atob(data[id].correct_answer)}
                </button>
              </li>
              {data[id].incorrect_answers.map((incorrect, i) => (
                <li key={i}>
                  <button
                    type="button"
                    onClick={() => dispatch(setAnswered())}
                    className={`${answeredStyle(
                      'incorrect',
                      styles,
                      answered,
                    )} ${styles.answer}`}
                    disabled={answered}
                  >
                    {window.atob(incorrect)}
                  </button>
                </li>
              ))}
            </ul>
            <div className={styles.progress_bar}>
              <div className={progressBar(id, styles)}></div>
            </div>
            {answered && <TriviaNextButton />}
          </div>
        </div>
      )}
    </>
  );
};

export default TriviaQuestionsSide;
