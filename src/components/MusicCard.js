import PropTypes from 'prop-types';
import React from 'react';

class MusicCard extends React.Component {
  render() {
    const { trackName, previewUrl, trackId, favClick } = this.props;
    return (
      <section>
        <h5>{trackName}</h5>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
          .
        </audio>
        <label htmlFor="fav">
          Favorita
          <input
            type="checkbox"
            id="fav"
            name={ trackId }
            data-testid={ `checkbox-music-${trackId}` }
            onClick={ favClick }
          />
        </label>
      </section>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  favClick: PropTypes.func.isRequired,
};

export default MusicCard;
