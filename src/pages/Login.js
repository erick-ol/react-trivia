import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './css/login.module.css';
import ls_logo from '../assets/img/ls-logo.png';
import next from '../assets/img/next.png';
import gear from '../assets/img/gear.png';
import LoginInfoSide from '../components/Login/LoginInfoSide';

const Login = () => {
  const [email, setEmail] = React.useState('');
  const [username, setUsername] = React.useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const state = {
      player: {
        name: username,
        assertions: 0,
        score: 0,
        gravatarEmail: email,
      },
    };
    localStorage.setItem('state', JSON.stringify(state));

    const Api = await fetch(
      'https://opentdb.com/api_token.php?command=request',
    );
    const json = await Api.json();
    localStorage.setItem('token', JSON.stringify(json.token));
    navigate('/trivia');
  };

  return (
    <>
      <LoginInfoSide />
      <div className={styles.main_login}>
        <div className={styles.login_elements_main}>
          <div className={styles.logo_img}>
            <img src={ls_logo} alt="logo ls" />
          </div>
          <div className={styles.login_input}>
            <input
              type="text"
              name="username"
              placeholder="name"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
            <input
              type="email"
              name="email"
              placeholder="e-mail"
              value={email}
              onChange={({ target }) => setEmail(target.value)}
            />
          </div>
          <div className={styles.login_btns}>
            <button
              type="button"
              disabled={!(Boolean(email) && Boolean(username))}
              onClick={handleSubmit}
              className={styles.play_btn}
            >
              Jogar
              <img src={next} alt="" />
            </button>
            <button type="button" className={styles.config_link}>
              <a href="#">
                Configurações
                <img src={gear} alt="configs" />
              </a>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
