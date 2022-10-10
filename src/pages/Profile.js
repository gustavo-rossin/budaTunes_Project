import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      user: {},
    };
  }

  async componentDidMount() {
    // console.log(await getUser());
    this.handleUser();
  }

  handleUser = async () => {
    this.setState({ loading: true });
    const user = await getUser();
    this.setState({ loading: false,
      user: {
        name: 'Gustavo Rossin2313',
        email: 'gustavo.rossin@hotmail.com',
        image: 'url-to-image',
        description: 'oi, eu sou o goku',
      } });
  };

  render() {
    const { user, loading } = this.state;
    return (
      <>
        <Header />
        { loading && <Loading /> }
        <div data-testid="page-profile">
          <br />
          {user.name}
          <br />
          {user.email}
          <br />
          <img src={ user.image } data-testid="profile-image" alt={ user.name } />
          <br />
          {user.description}
          <br />
          <Link to="/profile/edit">Editar perfil</Link>
        </div>
      </>
    );
  }
}

export default Profile;
