import React from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';

class Form extends React.Component {
  render() {
    const { enableButton, enableDisable, login } = this.props;
    return (
      <form>
        <label htmlFor="LoginName">
          <input
            type="text"
            id="LoginName"
            data-testid="login-name-input"
            onChange={ enableButton }
          />
        </label>
        <Link to="/search">
          <button
            type="submit"
            data-testid="login-submit-button"
            disabled={ enableDisable }
            onClick={ login }
          >
            Entrar
          </button>
        </Link>
      </form>
    );
  }
}

Form.propTypes = {
  enableButton: propTypes.func,
  login: propTypes.func,
  enableDisable: propTypes.bool,
}.isRequired;

export default Form;
