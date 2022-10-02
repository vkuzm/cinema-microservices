import React, { useState } from 'react';
import FontAwesome from 'react-fontawesome';
import './sign-up.styles.scss';
import ApiUrlConstants from '../../ApiUrlConstants';

const SignUp = ({ history }) => {
  const [inputs, setInputs] = useState({
    name: {
      value: '',
      errorMessage: ''
    },
    email: {
      value: '',
      errorMessage: ''
    },
    age: {
      value: '',
      errorMessage: ''
    },
    password: {
      value: '',
      errorMessage: ''
    },
    repassword: {
      value: ''
    }
  });

  const onInputChange = (event) => {
    const { name, value } = event.target;

    setInputs((prevState) => {
      return {
        ...prevState,
        [name]: { ...prevState[name], value: value }
      };
    });
  };

  const onSubmit = async () => {
    const { name, email, age, password, repassword } = inputs;

    const payload = {
      name: name.value,
      email: email.value,
      age: age.value,
      password: password.value,
      repassword: repassword.value
    };

    fetch(ApiUrlConstants.SIGN_UP, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json' }
    })
      .then((res) => toData(res))
      .then((data) => {
        resetErrors();

        if (data.status === 201) {
          history.push('/');

        } else {
          const { errors } = data.body;

          if (errors && errors.length) {
            errors.forEach((error) => {
              if (error.code === 'name_invalid') {
                showError('name', error.message);
              }
              if (error.code === 'email_invalid' || error.code === 'email_already_exists') {
                showError('email', error.message);
              }
              if (error.code === 'age_invalid') {
                showError('age', error.message);
              }
              if (error.code === 'password_invalid' || error.code === 'passwords_not_matched') {
                showError('password', error.message);
              }
            });
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const toData = (res) => {
    return res.json().then((json) => {
      return {
        status: res.status,
        body: json
      };
    });
  };

  const showError = (fieldName, errorMessage) => {
    console.log(fieldName, errorMessage)

    setInputs((prevState) => {
      return {
        ...prevState,
        [fieldName]: { ...prevState[fieldName], errorMessage: errorMessage }
      };
    });
  }

  const resetErrors = () => {
    Object.values(inputs).forEach((field) => (field.errorMessage = ''));
  };

  const nameErrorMessage = inputs.name.errorMessage;
  const emailErrorMessage = inputs.email.errorMessage;
  const ageErrorMessage = inputs.age.errorMessage;
  const passwordErrorMessage = inputs.password.errorMessage;

  return (
    <div className="form-v5-container">
      <div className="form-v5-content">
        <div className="form-detail">
          <h2>Sign Up</h2>
          <div className="form-row">
            <label htmlFor="full-name">Full Name</label>
            <div className="input-text">
              <input type="text" name="name" required onChange={onInputChange} />
              <FontAwesome className="fas" name="user" />
            </div>
            {nameErrorMessage && nameErrorMessage.length ? (
              <div className="error-message">{nameErrorMessage}</div>
            ) : null}
          </div>
          <div className="form-row">
            <label htmlFor="email">Email</label>
            <div className="input-text">
              <input type="email" name="email" required onChange={onInputChange} />
              <FontAwesome className="fas" name="envelope" />
            </div>
            {emailErrorMessage && emailErrorMessage.length ? (
              <div className="error-message">{emailErrorMessage}</div>
            ) : null}
          </div>
          <div className="form-row">
            <label htmlFor="age">Age</label>
            <div className="input-text">
              <input type="text" name="age" onChange={onInputChange} />
              <FontAwesome className="fas" name="calendar" />
            </div>
            {ageErrorMessage && ageErrorMessage.length ? (
              <div className="error-message">{ageErrorMessage}</div>
            ) : null}
          </div>
          <div className="form-row">
            <label htmlFor="password">Password</label>
            <div className="input-text">
              <input type="password" name="password" required onChange={onInputChange} />
              <FontAwesome className="fas" name="lock" />
              {passwordErrorMessage && passwordErrorMessage.length ? (
                <div className="error-message">{passwordErrorMessage}</div>
              ) : null}
            </div>
          </div>
          <div className="form-row">
            <label htmlFor="repassword">Confirm password</label>
            <div className="input-text">
              <input type="password" name="repassword" required onChange={onInputChange} />
              <FontAwesome className="fas" name="lock" />
            </div>
          </div>
          <div className="form-row-last">
            <input
              type="submit"
              className="btn submit-button"
              value="Register"
              onClick={onSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
