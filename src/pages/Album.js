import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      song: [],
    };
  }

  componentDidMount() {
    this.fetchMusic();
  }

  fetchMusic = async () => {
    const { match: { params } } = this.props;
    const fetchJSON = await JSON.stringify(params.id);
    const fetchID = await JSON.parse(fetchJSON);
    const api = await getMusics(fetchID);
    // console.log('1', await api);
    this.setState({ song: api });
  };

  render() {
    const { song } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <br />
        { song.length > 0 ? (
          <div>
            <h3 data-testid="artist-name">{ song[0].artistName }</h3>
            <h4 data-testid="album-name">{song[0].collectionName}</h4>
          </div>
        ) : <p />}
        <br />
        {/* ajuda monitoria do Thiago no filter com kind */}
        {song.filter((element) => element.kind === 'song').map((item) => (
          <MusicCard
            key={ item.trackName }
            trackName={ item.trackName }
            previewUrl={ item.previewUrl }
          />
        ))}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape().isRequired,
};

export default Album;
