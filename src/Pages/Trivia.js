import React from 'react';
import Header from '../Components/Header';
import TimeSvg from '../Components/SVG/TimeSvg';
import Loading from '../Components/SVG/Loading';
import styles from './css/trivia.module.css';
import nextImg from '../assets/img/next_black.png';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addAssertion, addPoints } from '../store/player';

const Trivia = () => {
  const [seconds, setSeconds] = React.useState(30);
  const [answered, setAnswered] = React.useState(false);
  const [questions, setQuestions] = React.useState([]);
  const [id, setId] = React.useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  React.useEffect(() => {
    getQuestions();
  }, []);

  React.useEffect(() => {
    if (!answered && seconds > 0) {
      setTimeout(() => setSeconds(seconds - 1), 1000);
    }
    if (seconds === 0) setAnswered(true);
  }, [seconds, answered]);

  const getQuestions = async () => {
    const getToken = JSON.parse(localStorage.getItem('token'));
    const fetchQuestions = await fetch(
      `https://opentdb.com/api.php?amount=5&token=${getToken}&encode=base64`,
    );
    const json = await fetchQuestions.json();
    const { results } = json;
    setQuestions(results);
  };

  const sumScore = () => {
    setAnswered(true);
    const difficulty = questions[id].difficulty;

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

  const answeredStyle = (className) => {
    if (className === 'correct') {
      return answered ? styles.correct : '';
    }
    return answered ? styles.incorrect : '';
  };

  const progressBar = () => {
    switch (id) {
      case 0:
        return styles.question_0;
      case 1:
        return styles.question_1;
      case 2:
        return styles.question_2;
      case 3:
        return styles.question_3;
      case 4:
        return styles.question_4;
      default:
        return 0;
    }
  };

  const next = () => {
    setId(id + 1);
    setAnswered(false);
    setSeconds(30);
  };

  const linkOrNext = () => {
    if (id === 4) navigate('/feedback');
    else next();
  };

  if (questions.length === 0) return <Loading />;
  return (
    <>
      <div className={styles.purple_aside}>
        <div className={styles.elements_purple}>
          <div className={styles.svg_time}>
            <TimeSvg />
          </div>
          <div className={styles.time_text}>
            <span>{seconds}</span>
          </div>
        </div>
      </div>
      <div className={styles.white_side}>
        <Header />
        <div className={styles.questions_main}>
          <p className={styles.category}>
            Category:
            <span>{questions[id].category}</span>
          </p>
          <p className={styles.question}>
            <span>{window.atob(questions[id].question)}</span>
          </p>
          <ul>
            <li>
              <button
                type="button"
                onClick={sumScore}
                className={`${answeredStyle('correct')} ${styles.answer}`}
                disabled={answered}
              >
                {window.atob(questions[id].correct_answer)}
              </button>
            </li>
            {questions[id].incorrect_answers.map((incorrect, i) => (
              <li key={i}>
                <button
                  type="button"
                  onClick={() => setAnswered(true)}
                  className={`${answeredStyle('incorrect')} ${styles.answer}`}
                  disabled={answered}
                >
                  {window.atob(incorrect)}
                </button>
              </li>
            ))}
          </ul>
          <div className={styles.progress_bar}>
            <div className={progressBar()}></div>
          </div>
          {answered && (
            <button
              type="button"
              onClick={linkOrNext}
              data-testid="btn-next"
              className={styles.next}
            >
              Pŕoxima
              <img src={nextImg} alt="proxima" />
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Trivia;
