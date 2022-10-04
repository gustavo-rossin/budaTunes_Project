import React from 'react';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      loginName: '',
      minChars: true,
    };
  }

  handleDisableBtn = () => {
    const { loginName } = this.state;
    const min = 3;
    const minLength = loginName.length >= min;

    this.setState({ minChars: !minLength });
  };

  handleChange = ({ target: { name, value } }) => {
    console.log(value);
    this.setState({
      [name]: value,
    }, () => this.handleDisableBtn());
  };

  render() {
    const {
      loginName, minChars,
    } = this.state;
    return (
      <div data-testid="page-login">
        <p>TrybeTunes!</p>
        <label htmlFor="login">
          Login:
          <input
            type="text"
            id="login"
            name="loginName"
            testid="login-name-input"
            value={ loginName }
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="button"
          data-testid="login-submit-button"
          disabled={ minChars }
        >
          Entrar
        </button>
      </div>
    );
  }
}

export default Login;
