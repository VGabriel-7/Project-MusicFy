import React from 'react';
import propTypes from 'prop-types';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';
import './css/form.css';
import logoMusicFy from '../images/musica.png';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      objectUser: {},
      loading: false,
      enableDisable: true,
      name: '',
      email: '',
    };
  }

  componentDidMount() {
    const { history: { push } } = this.props;

    document.title = 'Login';

    if (localStorage.getItem('user')) push('/search');
  }

  login = () => {
    const { objectUser } = this.state;
    const { history: { push } } = this.props;
    this.setState(
      { loading: true },
      async () => {
        await createUser(objectUser);
        this.setState({ loading: false });
        push('/search');
      },
    );
  }

  buttonValidation = (event) => {
    const { target } = event;
    this.setState({ [target.name]: target.value },
      () => {
        const { name, email } = this.state;
        const validCharacters = 3;
        if (
          name.length >= validCharacters
          && email.includes('@')
        ) {
          this.setState({
            enableDisable: false,
            objectUser: { name, email },
          });
        } else {
          this.setState({ enableDisable: true });
        }
      });
  }

  render() {
    const {
      enableDisable,
      loading,
      name,
      email,
    } = this.state;
    return (
      <div className="login">
        {loading
          ? <Loading />
          : (
            <div>
              <span>
                <img src={ logoMusicFy } alt="logo MusicFy" />
                <div>
                  <h1 className="title-login">
                    MusicFy
                  </h1>
                </div>
              </span>
              <form className="form" data-testid="page-login">
                <div className="inputs">
                  <div className="input-group">
                    <div
                      className="input-group-text"
                      id="btnGroupAddon"
                    >
                      Nome
                    </div>
                    <input
                      autoComplete="off"
                      placeholder="Ex: Ana Maria"
                      type="text"
                      id="LoginName"
                      name="name"
                      data-testid="login-name-input"
                      onChange={ this.buttonValidation }
                      value={ name }
                      className="form-control"
                      maxLength="8"
                    />
                  </div>
                  <div className="input-group">
                    <div
                      className="input-group-text"
                      id="btnGroupAddon"
                    >
                      E-mail
                    </div>
                    <input
                      autoComplete="off"
                      value={ email }
                      placeholder="aninha@exemplo.com"
                      type="email"
                      id="email"
                      name="email"
                      onChange={ this.buttonValidation }
                      className="form-control"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  data-testid="login-submit-button"
                  disabled={ enableDisable }
                  onClick={ this.login }
                  className="btn btn-primary"
                >
                  Entrar
                </button>
              </form>
            </div>
          )}
      </div>
    );
  }
}

Login.propTypes = {
  history: propTypes.func,
}.isRequired;

export default Login;
