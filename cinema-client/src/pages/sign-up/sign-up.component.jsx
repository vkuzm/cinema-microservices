import React from 'react';
import FontAwesome from 'react-fontawesome';
import './sign-up.styles.scss';

class SignUp extends React.Component {
  render() {
    return (
      <div className="form-v5-container">
        <div className="form-v5-content">
          <div className="form-detail">
            <h2>Sign Up</h2>
            <div className="form-row">
              <label htmlFor="full-name">Full Name</label>
              <div className="input-text">
                <input type="text" name="name" required />
                <FontAwesome className="fas" name="user" />
              </div>
            </div>
            <div className="form-row">
              <label htmlFor="email">Email</label>
              <div className="input-text">
                <input type="email" name="email" required />
                <FontAwesome className="fas" name="envelope" />
              </div>
            </div>
            <div className="form-row">
              <label htmlFor="age">Age</label>
              <div className="input-text">
                <input type="text" name="age" />
                <FontAwesome className="fas" name="calendar" />
              </div>
            </div>
            <div className="form-row">
              <label htmlFor="password">Password</label>
              <div className="input-text">
                <input type="password" name="password" required />
                <FontAwesome className="fas" name="lock" />
              </div>
            </div>
            <div className="form-row">
              <label htmlFor="repassword">Confirm password</label>
              <div className="input-text">
                <input type="password" name="repassword" required />
                <FontAwesome className="fas" name="lock" />
              </div>
            </div>
            <div className="form-row-last">
              <input type="submit" className="btn" value="Register" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUp;
