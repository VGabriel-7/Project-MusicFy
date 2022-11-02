import React from 'react';
import Header from './Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';
import FavoriteCards from '../components/FavoriteCards';

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
        <div data-testid="page-favorites">
          {loading
            ? <Loading />
            : (
              <div>
                {favoritesSongs.map((objectMusics) => (
                  <div key={ objectMusics.trackId }>
                    <FavoriteCards
                      previewUrl={ objectMusics.previewUrl }
                      trackName={ objectMusics.trackName }
                      trackId={ objectMusics.trackId }
                      objectMusics={ objectMusics }
                    />
                  </div>
                ))}
              </div>
            )}
        </div>
      </>
    );
  }
}

export default Favorites;
