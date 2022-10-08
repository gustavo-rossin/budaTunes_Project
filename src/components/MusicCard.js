import PropTypes from 'prop-types';
import React from 'react';

class MusicCard extends React.Component {
  render() {
    const { trackName, previewUrl, trackId, favChange, favSongChecked } = this.props;
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
            onChange={ favChange }
            checked={ favSongChecked }
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
  favChange: PropTypes.func.isRequired,
  favSongChecked: PropTypes.bool.isRequired,
};

export default MusicCard;
