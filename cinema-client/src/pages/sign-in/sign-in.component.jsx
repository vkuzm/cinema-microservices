import React from 'react';
import FontAwesome from 'react-fontawesome';
import '../sign-up/sign-up.styles.scss';
import './sign-in.styles.scss';
import EmailValidator from '../../utils/EmailValidator';
import { getSessionUrl } from '../../AppUrlContants';
import ApiUrlConstants from '../../ApiUrlConstants';

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      hasError: false
    };
  }

  onInputChange = (event) => {
    const target = event.target;
    this.setState({ [target.name]: target.value });
  };

  onSubmit = () => {
    const { email, password } = this.state;

    if (EmailValidator.isValid(email) && password.length > 0) {
      const payload = {
        email: email,
        password: password
      };

      fetch(ApiUrlConstants.SIGN_IN, {
        method: 'POST',
        body: payload,
        headers: [{ 'Content-Type': 'application/json' }]
      })
        .then((res) => this.toData(res))
        .then((data) => {
          if (data.status === 200) {
            // TODO store session in browser
            this.props.history.push('/');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      this.setState({ hasError: true });
    }
  };

  render() {
    return (
      <div className="form-v5-container">
        <div className="form-v5-content">
          <div className="form-detail">
            <h2>Sign In</h2>
            <div className="form-row">
              <label htmlFor="email">Email</label>
              <div className="input-text">
                <input type="email" name="email" onChange={this.onInputChange} />
                <FontAwesome className="fas" name="envelope" />
              </div>
            </div>
            <div className="form-row">
              <label htmlFor="password">Password</label>
              <div className="input-text">
                <input type="password" name="password" onChange={this.onInputChange} />
                <FontAwesome className="fas" name="lock" />
              </div>
            </div>
            <div className="form-row-last">
              <input
                type="button"
                className="btn submit-button"
                value="Login"
                onClick={this.onSubmit}
              />
            </div>

            {this.state.hasError ? (
              <div className="error-message" style={{ textAlign: 'center' }}>
                Invalid email or password
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default SignIn;
