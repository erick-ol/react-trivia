import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './css/RankingUsers.module.css';

const RankingUsers = () => {
  const [players, setPlayers] = React.useState(null);
  const ranking = useSelector((state) => state.ranking);

  React.useEffect(() => {
    if (ranking.players)
      setPlayers(ranking.players.slice().sort((a, b) => b.score - a.score));
  }, [ranking.players]);

  return (
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
  );
};

export default RankingUsers;
