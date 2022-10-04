import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      loginName: '',
      loading: false,
    };
  }

  componentDidMount() {
    this.handleGetUser();
  }

  handleGetUser = async () => {
    // console.log(await getUser());
    this.setState({ loading: true });
    const login = await getUser();
    this.setState({
      loginName: login.name,
      loading: false });
  };

  render() {
    const { loginName, loading } = this.state;
    return (
      <header data-testid="header-component">
        <h1>TrybeTunes!</h1>
        { loading && <Loading /> }
        <h5 data-testid="header-user-name">{ loginName }</h5>
        <Link data-testid="link-to-search" to="/search">Search</Link>
        <Link data-testid="link-to-favorites" to="/favorites">Favorites</Link>
        <Link data-testid="link-to-profile" to="/profile">Profile</Link>
      </header>
    );
  }
}

export default Header;
