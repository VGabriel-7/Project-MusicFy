import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';
import Header from './Header';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      objUser: {},
    };
  }

  componentDidMount() {
    this.getInformUser();
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
    return (
      <div>
        <Header />
        {loading
          ? <Loading />
          : (
            <div data-testid="page-profile">
              <div>
                <img
                  data-testid="profile-image"
                  src={ objUser.image }
                  alt={ `foto de ${objUser.name}` }
                />
                <Link to="/profile/edit">Editar perfil</Link>
                <h3>{ objUser.name }</h3>
                <p>{ objUser.email }</p>
                <p>{ objUser.description }</p>
              </div>
            </div>
          )}
      </div>
    );
  }
}

export default Profile;
