import React from 'react';
import propTypes from 'prop-types';
import Loading from './Loading';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      // favorites: [],
      checked: false,
    };
  }

  componentDidMount() {
    this.favoriteMusics();
  }

  handleChecked = ({ target }) => {
    if (target.checked) {
      this.setState(
        { checked: target.checked },
        this.addFavoriteSong,
      );
    } else {
      this.setState(
        { checked: target.checked },
        this.removeFavoriteSong,
      );
    }
  }

  favoriteMusics = async () => {
    this.setState({ loading: true });
    const favoritesSongs = await getFavoriteSongs();
    this.setState({ loading: false });
    const { objectMusics } = this.props;
    const checkedValue = favoritesSongs.some(({ trackId }) => trackId === objectMusics
      .trackId);
    this.setState({ checked: checkedValue });
  }

  addFavoriteSong = () => {
    const { objectMusics } = this.props;
    this.setState(
      { loading: true },
      async () => {
        await addSong(objectMusics);
        this.setState({ loading: false });
      },
    );
  }

  removeFavoriteSong = () => {
    const { objectMusics } = this.props;
    this.setState(
      { loading: true },
      async () => {
        await removeSong(objectMusics);
        this.setState({ loading: false });
      },
    );
  }

  render() {
    const {
      previewUrl,
      trackName,
      trackId,
    } = this.props;
    const { loading, checked } = this.state;
    return (
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
    );
  }
}

MusicCard.propTypes = {
  trackName: propTypes.string,
  previewUrl: propTypes.string,
  trackId: propTypes.string,
  objectMusics: propTypes.object,
}.isRequired;

export default MusicCard;
