import PropTypes from 'prop-types';
import React from 'react';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      loginName: '',
      minChars: true,
      loading: false,
    };
  }

  // componentWillUnmount() {
  //   this.handleUser();
  // }

  handleUser = async () => {
    const { loginName } = this.state;
    const { history } = this.props;
    // console.log(await createUser({ name: loginName }));

    this.setState({ loading: true });
    await createUser({ name: loginName });
    this.setState({ loading: false });
    history.push('/search');
  };

  handleDisableBtn = () => {
    const { loginName } = this.state;
    const min = 3;
    const minLength = loginName.length >= min;

    this.setState({ minChars: !minLength });
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    }, () => this.handleDisableBtn());
  };

  render() {
    const {
      loginName, minChars, loading,
    } = this.state;

    return (
      <div data-testid="page-login">
        <h1>TrybeTunes!</h1>
        { loading ? <Loading />
          : (
            <>
              <label htmlFor="login">
                Login:
                <input
                  type="text"
                  id="login"
                  name="loginName"
                  data-testid="login-name-input"
                  value={ loginName }
                  onChange={ this.handleChange }
                />
              </label>
              <button
                type="button"
                data-testid="login-submit-button"
                disabled={ minChars }
                onClick={ this.handleUser }
              >
                Entrar
              </button>
            </>
          )}
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
