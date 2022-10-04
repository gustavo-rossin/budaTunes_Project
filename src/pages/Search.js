import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      searchBar: '',
      minCharSearch: true,
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

  render() {
    const { searchBar, minCharSearch } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
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
            // onClick={ this.handleUser }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
