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
        name: user.name,
        email: 'email@test.com',
        image: 'url-to-image',
        description: 'Lorem ipsum',
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
          <span>{user.name}</span>
          <br />
          <span>{user.email}</span>
          <br />
          <img src={ user.image } data-testid="profile-image" alt={ user.name } />
          <br />
          <span>{user.description}</span>
          <br />
          <Link to="/profile/edit">Editar perfil</Link>
        </div>
      </>
    );
  }
}

export default Profile;
