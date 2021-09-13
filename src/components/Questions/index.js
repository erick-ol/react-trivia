// import React from 'react';
// import './style.css';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { correctAnswer } from '../../actions/index';

// class Questions extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       questionsArray: [],
//       answered: false,
//       id: 0,
//       seconds: 30,
//       difficulty: '',
//       correct: 1,
//     };
//     this.timer = 0;
//     this.countDown = this.countDown.bind(this);
//     this.getQuestions = this.getQuestions.bind(this);
//     this.changeState = this.changeState.bind(this);
//     this.isAnswered = this.isAnswered.bind(this);
//     this.next = this.next.bind(this);
//     this.renderButton = this.renderButton.bind(this);
//     this.timerMount = this.timerMount.bind(this);
//     this.linkOrNext = this.linkOrNext.bind(this);
//     this.sumScore = this.sumScore.bind(this);
//   }

//   componentDidMount() {
//     this.getQuestions();
//     this.timerMount();
//   }

//   async getQuestions() {
//     const getToken = JSON.parse(localStorage.getItem('token'));
//     const fetchQuestions = await fetch(`https://opentdb.com/api.php?amount=5&token=${getToken}`);
//     const json = await fetchQuestions.json();
//     const { results } = json;
//     this.setState({ questionsArray: results });
//   }

//   timerMount() {
//     const { seconds } = this.state;
//     if (this.timer === 0 && seconds > 0) {
//       const timeToInitiate = 1000; // Tempo esperado para começar o cronômetro
//       this.timer = setInterval(this.countDown, timeToInitiate);
//     }
//   }

//   countDown() {
//     const { answered, seconds } = this.state;
//     if (!answered) {
//       if (seconds === 0) {
//         clearInterval(this.timer);
//         this.setState({ answered: true });
//       } else this.setState({ seconds: seconds - 1 });
//     }
//   }

//   changeState() { this.setState({ answered: true }); }

//   isAnswered(className) {
//     const { answered } = this.state;
//     return answered ? className : '';
//   }

//   isCompleted() {
//     const { answered } = this.state;
//     return answered;
//   }

//   next() {
//     const maxId = 4;
//     const { id, seconds } = this.state;
//     if (id !== maxId) {
//       this.setState({
//         id: id + 1,
//         answered: false,
//         seconds: 30,
//       });
//       this.countDown();
//       if (seconds === 0) {
//         const timeToInitiate = 1000;
//         this.timer = setInterval(this.countDown, timeToInitiate);
//       }
//     }
//   }

//   linkOrNext() {
//     const { id } = this.state;
//     const maxId = 4;
//     if (id === maxId) window.open('/feedback', '_self');
//     else this.next();
//   }

//   async sumScore() {
//     this.changeState();
//     const { questionsArray, id, correct } = this.state;
//     const { answerCorrect } = this.props;
//     answerCorrect(correct);
//     await this.setState({
//       difficulty: questionsArray[id].difficulty, correct: correct + 1,
//     });
//     const { seconds, difficulty } = this.state;
//     const state = JSON.parse(localStorage.getItem('state'));
//     const ten = 10;
//     const three = 3;
//     switch (difficulty) {
//     case 'easy':
//       state.player.score += ten + (seconds);
//       break;
//     case 'medium':
//       state.player.score += ten + (seconds * 2);
//       break;
//     case 'hard':
//       state.player.score += ten + (seconds * three);
//       break;
//     default: return;
//     }

//     localStorage.setItem('state', JSON.stringify(state));
//   }

//   renderButton() {
//     return (
//       <button
//         type="button"
//         onClick={ this.linkOrNext }
//         data-testid="btn-next"
//       >
//         Pŕoxima
//       </button>
//     );
//   }

//   render() {
//     const { seconds } = this.state;
//     const { questionsArray, id, answered } = this.state;
//     if (questionsArray.length === 0) return <p>Loading...</p>;
//     return (
//       <div>
//         <div>
//           <p>
//             Category:
//             <span data-testid="question-category">{questionsArray[id].category}</span>
//           </p>
//           <p>
//             Question:
//             <span data-testid="question-text">{questionsArray[id].question}</span>
//           </p>
//           <ul>
//             <li>
//               <button
//                 type="button"
//                 data-testid="correct-answer"
//                 onClick={ this.sumScore }
//                 className={ this.isAnswered('correct') }
//                 disabled={ this.isCompleted() }
//               >
//                 {questionsArray[id].correct_answer}
//               </button>
//             </li>
//             {questionsArray[id].incorrect_answers.map((incorrect, i) => (
//               <li key={ i }>
//                 <button
//                   type="button"
//                   data-testid={ `wrong-answer-${i}` }
//                   onClick={ this.changeState }
//                   className={ this.isAnswered('incorrect') }
//                   disabled={ this.isCompleted() }
//                 >
//                   {incorrect}
//                 </button>
//               </li>
//             ))}
//           </ul>
//           <div>{ seconds }</div>
//         </div>
//         {answered && this.renderButton()}
//       </div>
//     );
//   }
// }

// const mapDispatchToProps = (dispatch) => ({
//   answerCorrect: (correct) => dispatch(correctAnswer(correct)),
// });

// Questions.propTypes = {
//   answerCorrect: PropTypes.func.isRequired,
// };

// export default connect(null, mapDispatchToProps)(Questions);
