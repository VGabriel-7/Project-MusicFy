/* eslint-disable react/jsx-max-depth */
import React from 'react';
import propTypes from 'prop-types';
import Header from './Header';
import searchAlbunsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';
import './css/search.css';
import searchMusic from '../images/music-search.png';
import CardSearch from '../components/CardSearch';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      enableDisable: true,
      inputArtistName: '',
      artistiName: '',
      loading: false,
      arrayAlbuns: [],
    };
  }

  componentDidMount() {
    const { history: { push } } = this.props;

    if (!localStorage.getItem('user')) return push('/');

    document.title = 'Search Song';
  }

  buttonValidation = ({ target }) => {
    this.setState({ inputArtistName: target.value });
    const validCharacters = 2;
    if (target.value.length >= validCharacters) {
      this.setState({ enableDisable: false });
    } else {
      this.setState({ enableDisable: true });
    }
  }

  searchButton = (event) => {
    event.preventDefault();
    const { inputArtistName } = this.state;
    this.setState(
      { loading: true },
      async () => {
        const arrayAlbuns = await searchAlbunsAPI(inputArtistName);
        this.setState({
          inputArtistName: '',
          artistiName: inputArtistName,
          loading: false,
          arrayAlbuns,
        });
      },
    );
  };

  render() {
    const {
      enableDisable,
      inputArtistName,
      loading,
      artistiName,
      arrayAlbuns,
    } = this.state;
    return (
      <>
        <Header />
        <section className="section-main-search">
          <div data-testid="page-search" className="page-search">
            <div className="div-form-results">
              <form className="form-search">
                <input
                  type="text"
                  data-testid="search-artist-input"
                  placeholder="Nome do Artista"
                  onChange={ this.buttonValidation }
                  value={ inputArtistName }
                />
                <button
                  data-testid="search-artist-button"
                  type="submit"
                  disabled={ enableDisable }
                  onClick={ this.searchButton }
                >
                  <img
                    src={ searchMusic }
                    alt="search music"
                    className="search-music"
                  />
                </button>
              </form>
              <p>
                Resultado de ??lbuns de:
                {' '}
                { artistiName }
              </p>
              <div className="div-results">
                {loading
                  ? <Loading />
                  : (
                    <div className="results">
                      {arrayAlbuns.length > 0
                        ? (
                          arrayAlbuns.map(({
                            artistId,
                            artistName,
                            collectionId,
                            collectionName,
                            artworkUrl100,
                          }) => (
                            <CardSearch
                              key={ artistId }
                              values={ { artistName,
                                collectionId,
                                collectionName,
                                artworkUrl100 } }
                            />
                          ))
                        )
                        : <p>Nenhum ??lbum foi encontrado</p>}
                    </div>
                  )}
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}

Search.propTypes = {
  push: propTypes.func,
}.isRequired;

export default Search;
