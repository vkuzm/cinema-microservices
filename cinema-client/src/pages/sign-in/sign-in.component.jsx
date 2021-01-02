import React from 'react';
import FontAwesome from 'react-fontawesome';
import '../sign-up/sign-up.styles.scss';
import './sign-in.styles.scss';

class SignIn extends React.Component {
  render() {
    return (
      <div className="form-v5-container">
        <div className="form-v5-content">
          <div className="form-detail">
            <h2>Sign In</h2>
            <div className="form-row">
              <label htmlFor="email">Email</label>
              <div className="input-text">
                <input type="email" name="email" required />
                <FontAwesome className="fas" name="envelope" />
              </div>
            </div>
            <div className="form-row">
              <label htmlFor="password">Password</label>
              <div className="input-text">
                <input type="password" name="password" required />
                <FontAwesome className="fas" name="lock" />
              </div>
            </div>
            <div className="form-row-last">
              <input type="submit" className="btn" value="Login" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SignIn;
