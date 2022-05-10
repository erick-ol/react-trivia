import React from 'react';
import RankingSvg from '../SVG/RankingSvg';
import styles from './css/RankingPurpleSide.module.css';

const RankingPurpleSide = () => {
  return (
    <div className={styles.purple_aside}>
      <div className={styles.elements_purple}>
        <div className={styles.svg_ranking}>
          <RankingSvg />
        </div>
        <div className={styles.ranking_title}>
          <h1>Ranking</h1>
        </div>
      </div>
    </div>
  );
};

export default RankingPurpleSide;
