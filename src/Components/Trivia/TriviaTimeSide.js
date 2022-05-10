import React from 'react';
import { useSelector } from 'react-redux';
import TimeSvg from '../SVG/TimeSvg';
import styles from './css/TriviaTimeSide.module.css';

const TriviaTimeSide = () => {
  const { seconds } = useSelector((state) => state.trivia);

  return (
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
  );
};

export default TriviaTimeSide;
