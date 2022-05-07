import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoginSvg from '../components/SVG/LoginSvg';
import styles from './css/login.module.css';
import github from '../assets/img/github.png';
import ls_logo from '../assets/img/ls-logo.png';
import next from '../assets/img/next.png';
import gear from '../assets/img/gear.png';

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
      <div className={styles.purple_aside}>
        <div className={styles.login_elements}>
          <div className={styles.svg_login}>
            <LoginSvg />
          </div>
          <div className={styles.login_text}>
            <h1>Trivia React Redux</h1>
            <p>
              Projeto em grupo da{' '}
              <a
                href="https://www.linkedin.com/school/betrybe/"
                target="_blank"
              >
                Trybe
              </a>{' '}
              realizado por{' '}
              <a
                href="https://www.linkedin.com/in/alinehoshino/"
                target="_blank"
              >
                Aline Hoshino
              </a>
              ,{' '}
              <a
                href="https://www.linkedin.com/in/douglasdrozda/"
                target="_blank"
              >
                Douglas Drozda
              </a>
              ,{' '}
              <a
                href="https://www.linkedin.com/in/erickosantos/"
                target="_blank"
              >
                Erick Santos
              </a>
              ,{' '}
              <a
                href="https://www.linkedin.com/in/lucas-santos-dev/"
                target="_blank"
              >
                Lucas Santos
              </a>{' '}
              e{' '}
              <a
                href="https://www.linkedin.com/in/sthefany-caroline/"
                target="_blank"
              >
                Sthefany Caroline
              </a>
              . Objetivo do projeto foi criar um jogo de perguntas e resposta no
              estilo Trivia utilizando a Api{' '}
              <a href="https://opentdb.com/" target="_blank">
                Open Trivia Database
              </a>
              .
            </p>
            <a
              href="https://github.com/tryber/sd-013-a-project-trivia-react-redux/pull/1"
              target="_blank"
            >
              GitHub do Projeto
              <img src={github} alt="github logo" />
            </a>
          </div>
        </div>
      </div>
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
              <Link to="/configs">
                Configurações
                <img src={gear} alt="configs" />
              </Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
