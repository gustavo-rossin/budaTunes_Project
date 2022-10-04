import React from 'react';
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
      </header>
    );
  }
}

export default Header;
