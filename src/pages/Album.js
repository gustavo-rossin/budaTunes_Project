import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      song: [],
      loading: false,
      fav: [],
    };
  }

  componentDidMount() {
    this.fetchMusic();
    this.fetchFavoriteSongs();
  }

  fetchMusic = async () => {
    this.setState({ loading: true });
    const { match: { params } } = this.props;
    const fetchJSON = await JSON.stringify(params.id);
    const fetchID = await JSON.parse(fetchJSON);
    const api = await getMusics(fetchID);
    await addSong(fetchID);
    // console.log('1', await api);
    this.setState({
      song: api,
      loading: false,
    });
  };

  fetchFavoriteSongs = async () => {
    this.setState({ loading: true });
    const apiFav = await getFavoriteSongs();
    this.setState({ loading: false,
      fav: apiFav });
  };

  handleChange = async ({ target }) => {
    const { song, fav } = this.state;
    const findFavSong = song.find((el) => el.trackId === Number(target.name));

    if (target.checked) {
      this.setState({
        loading: true,
      });
      await addSong(findFavSong);
      this.setState((previous) => ({
        loading: false,
        fav: [...previous.fav, findFavSong],
      }));
    } else {
      this.setState({
        loading: true,
      });
      await removeSong(findFavSong);
      this.setState({
        loading: false,
        fav: fav.filter((el) => el.trackID !== findFavSong.trackID),
      });
    }
  };

  // * refatorei a questão 8, tirei a fetchFav e coloquei as infos dentro da fetchMusic, pois eram funcs muito parecidas.

  // fetchFav = async () => {
  //   this.setState({ loading: true });

  //   const { match: { params } } = this.props;
  //   const fetchJSON = await JSON.stringify(params.id);
  //   const fetchID = await JSON.parse(fetchJSON);
  //   await addSong(fetchID);

  //   this.setState({ loading: false });
  // };

  render() {
    const { song, loading, fav } = this.state;
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
            favChange={ this.handleChange }
            favSongChecked={ fav.some((songs) => songs.trackId === item.trackId) }
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
