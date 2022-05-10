import React from 'react';
import FeedbackSvg from '../SVG/FeedbackSvg';
import styles from './css/FeedbackPurpleSide.module.css';

const FeedbackPurpleSide = () => {
  return (
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
  );
};

export default FeedbackPurpleSide;
