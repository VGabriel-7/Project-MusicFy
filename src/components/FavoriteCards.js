import React from 'react';
import propTypes from 'prop-types';
import Loading from './Loading';
import { removeSong } from '../services/favoriteSongsAPI';

class FavoriteCards extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      checked: true,
    };
  }

  handleChecked = ({ target }) => {
    if (target.value) {
      this.setState(
        { checked: false, loading: true },
        this.removeFavoriteSong,
      );
    }
  }

  removeFavoriteSong = async () => {
    const { objectMusics } = this.props;
    await removeSong(objectMusics);
    this.setState({ loading: false });
  }

  render() {
    const {
      previewUrl,
      trackName,
      trackId,
    } = this.props;
    const { loading, checked } = this.state;
    return (
      <div>
        {loading ? <Loading />
          : (
            <div>
              {checked && (
                <>
                  <p>{trackName}</p>
                  <audio data-testid="audio-component" src={ previewUrl } controls>
                    <track kind="captions" />
                    O seu navegador não suporta o formato desse arquivo.
                    <code>audio</code>
                  </audio>
                  <form>
                    <label htmlFor="favoriteMusic">
                      <p>Favorita</p>
                      <input
                        id="favoriteMusic"
                        type="checkbox"
                        data-testid={ `checkbox-music-${trackId}` }
                        onChange={ this.handleChecked }
                        checked={ checked }
                      />
                      {loading && <Loading />}
                    </label>
                  </form>
                </>
              )}
            </div>
          )}
      </div>
    );
  }
}

FavoriteCards.propTypes = {
  trackName: propTypes.string,
  previewUrl: propTypes.string,
  trackId: propTypes.string,
  objectMusics: propTypes.object,
}.isRequired;

export default FavoriteCards;
