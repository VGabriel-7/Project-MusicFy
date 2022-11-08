import React from 'react';
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
    this.getFavorites();
    document.title = 'Favorite Songs';
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

export default Favorites;
