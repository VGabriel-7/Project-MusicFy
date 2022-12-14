import React from 'react';
import propTypes from 'prop-types';
import Header from './Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';
import FavoriteCards from '../components/FavoriteCards';
import './css/favorites.css';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      favoritesSongs: [],
    };
  }

  componentDidMount() {
    const { history: { push } } = this.props;

    if (!localStorage.getItem('user')) return push('/');

    document.title = 'Edit Profile';
    this.getFavorites();
  }

  getFavorites = async () => {
    this.setState({ loading: true });
    this.setState({ favoritesSongs: await getFavoriteSongs() });
    this.setState({ loading: false });
  }

  render() {
    const { loading, favoritesSongs } = this.state;
    return (
      <>
        <Header />
        <section data-testid="page-favorites" className="main-favorites">
          <div className="div-results">
            {loading
              ? <Loading />
              : (
                <div className="results">
                  {favoritesSongs.map((objectMusics) => (
                    <div key={ objectMusics.trackId }>
                      <FavoriteCards
                        previewUrl={ objectMusics.previewUrl }
                        trackName={ objectMusics.trackName }
                        trackId={ objectMusics.trackId }
                        objectMusics={ objectMusics }
                        artworkUrl100={ objectMusics.artworkUrl100 }
                        collectionName={ objectMusics.collectionName }
                      />
                    </div>
                  ))}
                </div>
              )}
          </div>
        </section>
      </>
    );
  }
}

Favorites.propTypes = {
  push: propTypes.func,
}.isRequired;

export default Favorites;
