import React from 'react';
import propTypes from 'prop-types';
import Loading from './Loading';
import { removeSong } from '../services/favoriteSongsAPI';
import './css/favoriteCards.css';

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
      window.location.reload();
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
      artworkUrl100,
      // collectionName,
    } = this.props;
    const { loading, checked } = this.state;
    return (
      <div>
        {checked && (
          <div className="main-favorite-cards">
            <div
              className="div-thumbnail"
              style={ {
                background: `url("${artworkUrl100}") no-repeat center center / cover` } }
            />
            <h4 className="trackName">{trackName}</h4>
            <div className="div-audio">
              <audio data-testid="audio-component" src={ previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o formato desse arquivo.
                <code>audio</code>
              </audio>
              <form>
                <label htmlFor="favoriteMusic" className="label-favorite">
                  <input
                    id="favoriteMusic"
                    type="checkbox"
                    data-testid={ `checkbox-music-${trackId}` }
                    onChange={ this.handleChecked }
                    checked={ checked }
                    className="fas fa-star"
                  />
                  {loading && <Loading />}
                </label>
              </form>
            </div>
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
