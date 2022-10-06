import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { addSong } from '../services/favoriteSongsAPI';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      song: [],
      loading: false,
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

  fetchFav = async () => {
    this.setState({ loading: true });

    const { match: { params } } = this.props;
    const fetchJSON = await JSON.stringify(params.id);
    const fetchID = await JSON.parse(fetchJSON);
    await addSong(fetchID);

    this.setState({ loading: false });
  };

  // handleCheckBox = async ({ target }) => {
  //   if (target.checked) {
  //     this.setState({ loading: true });
  //     this.setState({ loading: false });
  //   } else {
  //     this.setState({ loading: false });
  //   }
  // };

  render() {
    const { song, loading } = this.state;
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
        { loading && <Loading /> }
        {/* ajuda monitoria do Tiago no filter com kind */}
        {song.filter((element) => element.kind === 'song').map((item) => (
          <MusicCard
            key={ item.trackName }
            trackName={ item.trackName }
            previewUrl={ item.previewUrl }
            trackId={ item.trackId }
            favClick={ this.fetchFav }
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
