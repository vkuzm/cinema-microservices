import React, { useState, useRef } from 'react';
import FontAwesome from 'react-fontawesome';
import '../sign-up/sign-up.styles.scss';
import './sign-in.styles.scss';
import EmailValidator from '../../utils/EmailValidator';
import ApiUrlConstants from '../../ApiUrlConstants';
import { saveAuthToken } from '../../services/Auth';

const SignIn = ({ history, setSignIn }) => {
  const [hasError, setError] = useState(false);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const onSubmit = () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (EmailValidator.isValid(email) && password.length > 0) {
      const payload = {
        email: email,
        password: password
      };

      fetch(ApiUrlConstants.SIGN_IN, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' }
      })
        .then((res) => toData(res))
        .then((data) => {
          if (data.status === 201) {
            saveAuthToken(data.body.token);
            goBackPage();
            setSignIn(true);
            
          } else {
            setError(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setError(true);
    }
  };

  const goBackPage = () => {
    history.push('/');
  }

  const toData = (res) => {
    return res.json().then((json) => {
      return {
        status: res.status,
        body: json
      };
    });
  };

  return (
    <div className="form-v5-container">
      <div className="form-v5-content">
        <div className="form-detail">
          <h2>Sign In</h2>
          <div className="form-row">
            <label htmlFor="email">Email</label>
            <div className="input-text">
              <input type="email" name="email" ref={emailRef}  />
              <FontAwesome className="fas" name="envelope" />
            </div>
          </div>
          <div className="form-row">
            <label htmlFor="password">Password</label>
            <div className="input-text">
              <input type="password" name="password" ref={passwordRef} />
              <FontAwesome className="fas" name="lock" />
            </div>
          </div>
          <div className="form-row-last">
            <input
              type="button"
              className="btn submit-button"
              value="Login"
              onClick={onSubmit}
            />
          </div>

          {hasError ? (
            <div className="error-message" style={{ textAlign: 'center' }}>
              Invalid email or password
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default SignIn;
