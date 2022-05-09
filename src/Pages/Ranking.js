import React from 'react';
import { Link } from 'react-router-dom';
import RankingSvg from '../Components/SVG/RankingSvg';
import styles from './css/ranking.module.css';

const Ranking = () => {
  const [players, setPlayers] = React.useState(null);

  React.useEffect(() => {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    setPlayers(ranking.sort((a, b) => b.score - a.score));
  }, []);

  return (
    <>
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
      <div className={styles.white_side}>
        {players && (
          <ul>
            {players.map((player, index) => {
              const { name, picture, score } = player;
              return (
                <li key={index} className={styles.ranking_ind}>
                  <div className={styles.person}>
                    <img src={picture} alt={name} />
                    <h3 className={styles.header_text}>{name}</h3>
                  </div>
                  <h5 className={styles.header_text}>
                    Pontos:
                    {` ${score}`}
                  </h5>
                </li>
              );
            })}
          </ul>
        )}
        <Link to="/">
          <button type="button">Início</button>
        </Link>
      </div>
    </>
  );
};

export default Ranking;
