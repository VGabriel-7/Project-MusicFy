import React from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import './css/cardSearch.css';

class CardSearch extends React.Component {
  render() {
    const { values } = this.props;
    const {
      artworkUrl100,
      collectionName,
      artistName,
      collectionId } = values;
    return (
      <Link
        className="link"
        to={ `/album/${collectionId}` }
        data-testid={ `link-to-album-${collectionId}` }
      >
        <div className="card-search">
          <img src={ artworkUrl100 } alt={ collectionName } />
          <div className="collection-name"><p>{ collectionName }</p></div>
          <p>{ artistName }</p>
        </div>
      </Link>
    );
  }
}

CardSearch.propTypes = {
  artistId: propTypes.string,
  artworkUrl100: propTypes.string,
  collectionName: propTypes.string,
  artistName: propTypes.string,
  collectionId: propTypes.string,
}.isRequired;

export default CardSearch;
