import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import TimeSvg from '../components/SVG/TimeSvg';
import Loading from '../components/SVG/Loading';
import styles from './css/trivia.module.css';
import nextImg from '../assets/img/next_black.png';

class Questions extends React.Component {
  constructor() {
    super();
    this.state = {
      questionsArray: [],
      answered: false,
      id: 0,
      seconds: 30,
      difficulty: '',
    };
    this.timer = 0;
    this.countDown = this.countDown.bind(this);
    this.getQuestions = this.getQuestions.bind(this);
    this.changeState = this.changeState.bind(this);
    this.isAnswered = this.isAnswered.bind(this);
    this.next = this.next.bind(this);
    this.renderButton = this.renderButton.bind(this);
    this.timerMount = this.timerMount.bind(this);
    this.linkOrNext = this.linkOrNext.bind(this);
    this.sumScore = this.sumScore.bind(this);
    this.progress_quest = this.progress_quest.bind(this);
  }

  componentDidMount() {
    this.getQuestions();
    this.timerMount();
  }

  async getQuestions() {
    const getToken = JSON.parse(localStorage.getItem('token'));
    const fetchQuestions = await fetch(`https://opentdb.com/api.php?amount=5&token=${getToken}&encode=base64`);
    const json = await fetchQuestions.json();
    const { results } = json;
    this.setState({ questionsArray: results });
  }

  timerMount() {
    const { seconds } = this.state;
    if (this.timer === 0 && seconds > 0) {
      const timeToInitiate = 1000; // Tempo esperado para começar o cronômetro
      this.timer = setInterval(this.countDown, timeToInitiate);
    }
  }

  countDown() {
    const { answered, seconds } = this.state;
    if (!answered) {
      if (seconds === 0) {
        clearInterval(this.timer);
        this.setState({ answered: true });
      } else this.setState({ seconds: seconds - 1 });
    }
  }

  changeState() { this.setState({ answered: true }); }

  isAnswered(className) {
    const { answered } = this.state;
    if (className === 'correct') {
      return answered ? styles.correct : '';
    }
    return answered ? styles.incorrect : '';
  }

  isCompleted() {
    const { answered } = this.state;
    return answered;
  }

  next() {
    const maxId = 4;
    const { id, seconds } = this.state;
    if (id !== maxId) {
      this.setState({
        id: id + 1,
        answered: false,
        seconds: 30,
      });
      this.countDown();
      if (seconds === 0) {
        const timeToInitiate = 1000;
        this.timer = setInterval(this.countDown, timeToInitiate);
      }
    }
  }

  linkOrNext() {
    const { id } = this.state;
    const { history } = this.props;
    const maxId = 4;
    if (id === maxId) history.push('/feedback');
    else this.next();
  }

  async sumScore() {
    this.changeState();
    const { questionsArray, id, correct } = this.state;
    await this.setState({
      difficulty: questionsArray[id].difficulty, correct: correct + 1,
    });
    const { seconds, difficulty } = this.state;
    const state = JSON.parse(localStorage.getItem('state'));
    const ten = 10;
    const two = 2;
    const three = 3;
    switch (window.atob(difficulty)) {
    case 'easy':
      state.player.score += ten + (seconds);
      break;
    case 'medium':
      state.player.score += ten + (seconds * two);
      break;
    case 'hard':
      state.player.score += ten + (seconds * three);
      break;
    default: return;
    }
    const one = 1;
    state.player.assertions += one;
    localStorage.setItem('state', JSON.stringify(state));
  }

  renderButton() {
    return (
      <button
        type="button"
        onClick={ this.linkOrNext }
        data-testid="btn-next"
        className={ styles.next }
      >
        Pŕoxima
        <img src={ nextImg } alt="proxima" />
      </button>
    );
  }

  progress_quest(id) {
    switch (id) {
      case 0:
        return styles.question_0;
        break;
      case 1:
        return styles.question_1;
        break;
      case 2:
        return styles.question_2;
        break;
      case 3:
        return styles.question_3;
        break;
      case 4:
        return styles.question_4;
        break;
      default: return 0;
    }
  }

  render() {
    const { seconds } = this.state;
    const { questionsArray, id, answered } = this.state;
    if (questionsArray.length === 0) return <Loading />;
    return (
      <>
        <div className={ styles.purple_aside }>
          <div className={ styles.elements_purple }>
            <div className={ styles.svg_time }>
              <TimeSvg />
            </div>
            <div className={ styles.time_text }>
              <span>{ seconds }</span>
            </div>
          </div>
        </div>
        <div className={ styles.white_side }>
          <Header />
          <div className={ styles.questions_main }>
            <p className={ styles.category }>
              Category:
              <span data-testid="question-category">{questionsArray[id].category}</span>
            </p>
            <p className={ styles.question }>
              <span data-testid="question-text">{window.atob(questionsArray[id].question)}</span>
            </p>
            <ul>
              <li>
                <button
                  type="button"
                  data-testid="correct-answer"
                  onClick={ this.sumScore }
                  className={ `${this.isAnswered('correct')} ${styles.answer}` }
                  disabled={ this.isCompleted() }
                >
                  {window.atob(questionsArray[id].correct_answer)}
                </button>
              </li>
              {questionsArray[id].incorrect_answers.map((incorrect, i) => (
                <li key={ i }>
                  <button
                    type="button"
                    data-testid={ `wrong-answer-${i}` }
                    onClick={ this.changeState }
                    className={ `${this.isAnswered('incorrect')} ${styles.answer}` }
                    disabled={ this.isCompleted() }
                  >
                    {window.atob(incorrect)}
                  </button>
                </li>
              ))}
            </ul>
            <div className={ styles.progress_bar }><div className={this.progress_quest(id)}></div></div>
            {answered && this.renderButton()}
          </div>
        </div>
      </>
    );
  }
}

Questions.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Questions;
