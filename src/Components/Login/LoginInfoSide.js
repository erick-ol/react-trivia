import React from 'react';
import github from '../../assets/img/github.png';
import LoginSvg from '../SVG/LoginSvg';
import styles from './css/LoginInfoSide.module.css';

const LoginInfoSide = () => {
  return (
    <div className={styles.purple_aside}>
      <div className={styles.login_elements}>
        <div className={styles.svg_login}>
          <LoginSvg />
        </div>
        <div className={styles.login_text}>
          <h1>Trivia React Redux</h1>
          <p>
            Projeto em grupo da{' '}
            <a href="https://www.linkedin.com/school/betrybe/" target="_blank">
              Trybe
            </a>{' '}
            realizado por{' '}
            <a href="https://www.linkedin.com/in/alinehoshino/" target="_blank">
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
            <a href="https://www.linkedin.com/in/erickosantos/" target="_blank">
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
  );
};

export default LoginInfoSide;
