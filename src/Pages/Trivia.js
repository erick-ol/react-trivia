import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Loading from '../Components/SVG/Loading';
import { fetchQuestions } from '../store/questions';
import { resetTrivia } from '../store/trivia';
import TriviaTimeSide from '../Components/Trivia/TriviaTimeSide';
import TriviaQuestionsSide from '../Components/Trivia/TriviaQuestionsSide';

const Trivia = () => {
  const { loading, data } = useSelector((state) => state.questions);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!data) dispatch(fetchQuestions());

    return () => {
      dispatch(resetTrivia());
    };
  }, [data, dispatch]);

  if (loading) return <Loading />;
  return (
    <>
      <TriviaTimeSide />
      <TriviaQuestionsSide />
    </>
  );
};

export default Trivia;
