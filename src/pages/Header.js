import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';
import './css/header.css';
import user from '../images/fones-de-ouvido-musica.png';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      nameUser: '',
    };
  }

  componentDidMount() {
    this.nameUser();
  }

  nameUser = () => {
    this.setState(
      { loading: true },
      async () => {
        const objectUser = await getUser();
        this.setState({
          loading: false,
          nameUser: objectUser.name,
        });
      },
    );
  }

  render() {
    const { loading, nameUser } = this.state;
    return (
      <header data-testid="header-component" className="header-search">
        <Link className="link" to="/profile">
          <div className="div-logo-user">
            <img
              src={ user }
              alt="user with headphones"
              className="user-headphones"
            />
            <div>
              {loading
                ? <Loading />
                : (
                  <div>
                    <h3
                      className="name"
                      data-testid="header-user-name"
                    >
                      { nameUser }
                    </h3>
                  </div>
                )}
            </div>
          </div>
        </Link>
        <nav>
          <ul>
            <Link className="link" data-testid="link-to-search" to="/search">
              <li>Search</li>
            </Link>
            <Link className="link" data-testid="link-to-favorites" to="/favorites">
              <li>Favorites</li>
            </Link>
            <Link className="link" data-testid="link-to-profile" to="/profile">
              <li>Profile</li>
            </Link>
          </ul>
        </nav>
      </header>
    );
  }
}

export default Header;
