import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import useForm from '../../Hooks/useForm';
import Input from '../Forms/Input';
import styles from './css/LoginForm.module.css';
import ls_logo from '../../assets/img/ls-logo.png';
import next from '../../assets/img/next.png';
import gear from '../../assets/img/gear.png';
import { addPlayerInfo } from '../../store/player';

const LoginForm = () => {
  const username = useForm();
  const email = useForm('email');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    dispatch(
      addPlayerInfo({
        name: username.value,
        email: email.value,
      }),
    );
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
