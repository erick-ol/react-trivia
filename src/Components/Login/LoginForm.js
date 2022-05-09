import React from 'react';
import { useNavigate } from 'react-router-dom';
import useForm from '../../Hooks/useForm';
import Input from '../Forms/Input';
import styles from './css/LoginForm.module.css';
import ls_logo from '../../assets/img/ls-logo.png';
import next from '../../assets/img/next.png';
import gear from '../../assets/img/gear.png';

const LoginForm = () => {
  const username = useForm();
  const email = useForm('email');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const state = {
      player: {
        name: username.value,
        assertions: 0,
        score: 0,
        gravatarEmail: email.value,
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
    <div className={styles.main_login}>
      <div className={styles.login_elements_main}>
        <div className={styles.logo_img}>
          <img src={ls_logo} alt="logo ls" />
        </div>
        <div className={styles.login_input}>
          <Input placeholder="name" type="text" name="username" {...username} />
          <Input placeholder="email" type="text" name="email" {...email} />
        </div>
        <div className={styles.login_btns}>
          <button
            type="button"
            disabled={!(Boolean(email.value) && Boolean(username.value))}
            onClick={handleSubmit}
            className={styles.play_btn}
          >
            Jogar
            <img src={next} alt="" />
          </button>
          <button type="button" className={styles.config_link}>
            Configurações
            <img src={gear} alt="configs" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
