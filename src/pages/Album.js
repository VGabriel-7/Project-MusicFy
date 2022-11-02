import React from 'react';
import propTypes from 'prop-types';
import Header from './Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      albumMusics: [],
      name: '',
      album: '',
      loading: false,
    };
  }

  componentDidMount() {
    this.getAlbumMusic();
  }

  getAlbumMusic = async () => {
    const { match: { params: { id } } } = this.props;
    this.setState({ albumMusics: await getMusics(id) });
    const { albumMusics } = this.state;
    this.setState({
      name: albumMusics[0].artistName,
      album: albumMusics[0].collectionName,
    });
  }

  render() {
    const { name, albumMusics, album, loading } = this.state;
    return (
      <>
        <Header />
        {loading
          ? <Loading />
          : (
            <div data-testid="page-album">
              <h3 data-testid="artist-name">{ name }</h3>
              <p data-testid="album-name">{ album }</p>
              {
                albumMusics.filter((musics) => Object.keys(musics).includes('kind'))
                  .map((objectMusics) => (
                    <div key={ objectMusics.artistId }>
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
          )}
      </>
    );
  }
}

Album.propTypes = {
  match: propTypes.object,
}.isRequired;

export default Album;
