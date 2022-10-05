import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      searchBar: '',
      searchBar2: '',
      minCharSearch: true,
      loading: false,
      albumInfo: [],
    };
  }

  disableSearchBtn = () => {
    const { searchBar } = this.state;
    const min = 2;
    const minLengthSearch = searchBar.length >= min;

    this.setState({ minCharSearch: !minLengthSearch });
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    }, () => this.disableSearchBtn());
  };

  handleAlbumAPI = async () => {
    const { searchBar } = this.state;
    // console.log(await searchAlbumsAPI({ name: 'hhhhh' }));
    this.setState({ loading: true });
    const api = await searchAlbumsAPI(searchBar);
    this.setState({ loading: false,
      albumInfo: api,
      searchBar: '',
      searchBar2: searchBar,
    });
  };

  render() {
    const { searchBar, minCharSearch, loading, albumInfo, searchBar2 } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        { loading && <Loading /> }
        <form>
          <label htmlFor="search">
            <input
              type="text"
              id="search"
              name="searchBar"
              data-testid="search-artist-input"
              value={ searchBar }
              onChange={ this.handleChange }
              placeholder="artistas que você ama"
            />
          </label>
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ minCharSearch }
            onClick={ this.handleAlbumAPI }
          >
            Pesquisar
          </button>
          {
            albumInfo.length === 0
              ? <h2>Nenhum álbum foi encontrado</h2>
              : (
                <div>
                  <h2>
                    Resultado de álbuns de:
                    {' '}
                    { searchBar2 }
                  </h2>
                  {
                    albumInfo.map((item) => (
                      <div key={ item.collectionId }>
                        <Link
                          to={ `/album/${item.collectionId}` }
                          data-testid={ `link-to-album-${item.collectionId}` }
                        >
                          <img src={ item.artworkUrl100 } alt={ item.collectionName } />
                        </Link>

                        <h2>{item.collectionName}</h2>
                        <h4>{item.artistName}</h4>
                      </div>
                    ))
                  }
                </div>
              )
          }
        </form>
      </div>
    );
  }
}

export default Search;
