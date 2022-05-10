import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import RankingSvg from '../Components/SVG/RankingSvg';
import styles from './css/ranking.module.css';

const Ranking = () => {
  const [players, setPlayers] = React.useState(null);
  const ranking = useSelector((state) => state.ranking);

  React.useEffect(() => {
    if (ranking.players)
      setPlayers(ranking.players.slice().sort((a, b) => b.score - a.score));
  }, [ranking.players]);

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
