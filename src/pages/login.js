import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { saveEmail } from '../actions';
import LoginSvg from '../components/SVG/LoginSvg';
import styles from './css/login.module.css';
import github from '../assets/img/github.png';
import ls_logo from '../assets/img/ls-logo.png';
import next from '../assets/img/next.png';
import gear from '../assets/img/gear.png';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      nameUser: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.receiveToken = this.receiveToken.bind(this);
    this.saveNameEmail = this.saveNameEmail.bind(this);
  }

  onSubmitForm() {
    const { emailKey } = this.props;
    // Disparamos a nossa action através da função importada
    // de actions.js, que apelidamos de EmailKey
    const { email } = this.state;
    emailKey(email);
    this.saveNameEmail();
    this.receiveToken();
  }

  saveNameEmail() {
    const { email, nameUser } = this.state;
    const state = {
      player: {
        name: nameUser,
        assertions: 0,
        score: 0,
        gravatarEmail: email,
      },
    };
    localStorage.setItem('state', JSON.stringify(state));
  }

  async receiveToken() {
    const { history } = this.props;
    const Api = await fetch('https://opentdb.com/api_token.php?command=request');
    const json = await Api.json();
    localStorage.setItem('token', JSON.stringify(json.token));
    history.push('/trivia');
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  render() {
    const { email, nameUser } = this.state;
    return (
      <>
        <div className={ styles.purple_aside }>
          <div className={ styles.login_elements }>
            <div className={ styles.svg_login }>
              <LoginSvg />
            </div>
            <div className={ styles.login_text }>
              <h1>Trivia React Redux</h1>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
              <a href="https://github.com/tryber/sd-013-a-project-trivia-react-redux/pull/1" target="_blank">
                GitHub do Projeto
                <img src={ github } alt="github logo" />
              </a>
            </div>
          </div>
        </div>
        <div className={ styles.main_login }>
          <div className={ styles.login_elements_main }>
            <div className={ styles.logo_img }>
              <img src={ ls_logo } alt="logo ls" />
            </div>
            <div className={ styles.login_input }>
              <input
                type="text"
                data-testid="input-player-name"
                name="nameUser"
                placeholder="name"
                value={ nameUser }
                onChange={ this.handleChange }
              />
              <input
                type="email"
                name="email"
                placeholder="e-mail"
                data-testid="input-gravatar-email"
                value={ email }
                onChange={ this.handleChange }
              />
            </div>
            <div className={ styles.login_btns }>
              <button
                type="button"
                disabled={ !(Boolean(email) && Boolean(nameUser)) }
                onClick={ this.onSubmitForm }
                data-testid="btn-play"
                className={ styles.play_btn }
              >
                Jogar
                <img src={ next } alt="" />
              </button>
              <button
                type="button"
                data-testid="btn-settings"
                className={ styles.config_link }
              >
                <Link to="/configs">
                  Configurações
                  <img src={ gear } alt="configs" />
                </Link>
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

Login.propTypes = {
  emailKey: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  emailKey: (email) => dispatch(saveEmail(email)),
});

export default connect(null, mapDispatchToProps)(Login);
