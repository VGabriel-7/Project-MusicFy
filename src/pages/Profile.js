import React from 'react';
import propTypes from 'prop-types';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';
import Header from './Header';
import './css/profile.css';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      objUser: {},
    };
  }

  componentDidMount() {
    const { history: { push } } = this.props;

    if (!localStorage.getItem('user')) return push('/');

    this.getInformUser();
    document.title = 'Profile';
  }

  logOut = () => {
    const { history: { push } } = this.props;
    localStorage.removeItem('user');
    push('/');
  }

  getInformUser = () => {
    this.setState(
      { loading: true },
      async () => {
        this.setState({
          objUser: await getUser(),
          loading: false,
        });
      },
    );
  }

  render() {
    const { loading, objUser } = this.state;
    const { history: { push } } = this.props;
    return (
      <>
        <Header />
        <section className="main-profile">
          <div className="profile">
            {loading
              ? <Loading />
              : (
                <div
                  data-testid="page-profile"
                  className="div-profile"
                >
                  <img
                    data-testid="profile-image"
                    src={ objUser.image }
                    alt={ `foto de ${objUser.name}` }
                    className="img-profile"
                    style={
                      { background: `url("${objUser.image}")
                    no-repeat center center / cover` }
                    }
                  />
                  <div className="div-infos">
                    <h1 className="profile-name">{ objUser.name }</h1>
                    <p className="profile-email">{ objUser.email }</p>
                    <p className="profile-description">{ objUser.description }</p>
                  </div>
                </div>
              )}
          </div>
          <div className="div-buttons">
            <button
              type="button"
              onClick={ () => push('/profile/edit') }
              className="btn btn-primary"
            >
              Editar perfil
            </button>
            <button
              type="button"
              onClick={ this.logOut }
              className="btn btn-danger"
            >
              Logout
            </button>
          </div>
        </section>
      </>
    );
  }
}

Profile.propTypes = {
  push: propTypes.func,
}.isRequired;

export default Profile;
