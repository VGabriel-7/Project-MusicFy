import React from 'react';
import propTypes from 'prop-types';
import Header from './Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';
import './css/album.css';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      albumMusics: [],
      name: '',
      album: '',
      imgAlbum: '',
      loading: false,
    };
  }

  componentDidMount() {
    const { history: { push } } = this.props;

    if (!localStorage.getItem('user')) return push('/');

    document.title = 'Album';
    this.getAlbumMusic();
  }

  getAlbumMusic = async () => {
    const { match: { params: { id } } } = this.props;
    this.setState({ albumMusics: await getMusics(id) });
    const { albumMusics } = this.state;
    this.setState({
      name: albumMusics[0].artistName,
      album: albumMusics[0].collectionName,
      imgAlbum: albumMusics[0].artworkUrl100,
    });
  }

  render() {
    const { name, albumMusics, album, loading, imgAlbum } = this.state;
    return (
      <>
        <Header />
        <section className="main-album">
          <div className="div-results-album">
            {loading
              ? <Loading />
              : (
                <div data-testid="page-album" className="results-album">
                  <div className="div-cantor">
                    <img
                      src={ imgAlbum }
                      alt={ `foto do album de ${name}` }
                      className="img-album"
                    />
                    <h3 data-testid="artist-name">{ name }</h3>
                    <p data-testid="album-name">{ album }</p>
                  </div>
                  <div className="div-music-card scroll-bar">
                    {
                      albumMusics.filter((musics) => Object.keys(musics).includes('kind'))
                        .map((objectMusics) => (
                          <div
                            key={ objectMusics.artistId }
                            className="music-card"
                          >
                            <MusicCard
                              loading={ loading }
                              previewUrl={ objectMusics.previewUrl }
                              trackName={ objectMusics.trackName }
                              trackId={ objectMusics.trackId }
                              objectMusics={ objectMusics }
                            />
                          </div>
                        ))
                    }
                  </div>
                </div>
              )}
          </div>
        </section>
      </>
    );
  }
}

Album.propTypes = {
  match: propTypes.object,
  push: propTypes.func,
}.isRequired;

export default Album;
