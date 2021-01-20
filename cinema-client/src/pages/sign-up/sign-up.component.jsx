import React from 'react';
import FontAwesome from 'react-fontawesome';
import './sign-up.styles.scss';
import ApiUrlConstants from '../../ApiUrlConstants';

class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
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
    };
  }

  onInputChange = (event) => {
    const target = event.target;

    this.setState((prevState) => {
      return {
        [target.name]: { ...prevState[target.name], value: target.value }
      };
    });
  };

  onSubmit = async () => {
    const { name, email, age, password, repassword } = this.state;

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
      .then((res) => this.toData(res))
      .then((data) => {
        this.resetErrors();

        if (data.status === 201) {
          this.props.history.push('/');

        } else {
          const { errors } = data.body;
          if (errors && errors.length) {
            errors.forEach((error) => {
              if (error.code === 'name_invalid') {
                this.showError('name', error.message);
              }
              if (error.code === 'email_invalid' || error.code === 'email_already_exists') {
                this.showError('email', error.message);
              }
              if (error.code === 'age_invalid') {
                this.showError('age', error.message);
              }
              if (error.code === 'password_invalid' || error.code === 'passwords_not_matched') {
                this.showError('password', error.message);
              }
            });
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  toData = (res) => {
    return res.json().then((json) => {
      return {
        status: res.status,
        body: json
      };
    });
  };

  showError = (fieldName, errorMessage) => {
    this.setState((prevState) => {
      return {
        [fieldName]: {
          ...prevState[fieldName],
          errorMessage: errorMessage
        }
      };
    });
  };

  resetErrors = () => {
    Object.values(this.state)
    .forEach((field) => (field.errorMessage = ''));
  };

  render() {
    const nameErrorMessage = this.state.name.errorMessage;
    const emailErrorMessage = this.state.email.errorMessage;
    const ageErrorMessage = this.state.age.errorMessage;
    const passwordErrorMessage = this.state.password.errorMessage;

    return (
      <div className="form-v5-container">
        <div className="form-v5-content">
          <div className="form-detail">
            <h2>Sign Up</h2>
            <div className="form-row">
              <label htmlFor="full-name">Full Name</label>
              <div className="input-text">
                <input type="text" name="name" required onChange={this.onInputChange} />
                <FontAwesome className="fas" name="user" />
              </div>
              {nameErrorMessage && nameErrorMessage.length ? (
                <div className="error-message">{nameErrorMessage}</div>
              ) : null}
            </div>
            <div className="form-row">
              <label htmlFor="email">Email</label>
              <div className="input-text">
                <input type="email" name="email" required onChange={this.onInputChange} />
                <FontAwesome className="fas" name="envelope" />
              </div>
              {emailErrorMessage && emailErrorMessage.length ? (
                <div className="error-message">{emailErrorMessage}</div>
              ) : null}
            </div>
            <div className="form-row">
              <label htmlFor="age">Age</label>
              <div className="input-text">
                <input type="text" name="age" onChange={this.onInputChange} />
                <FontAwesome className="fas" name="calendar" />
              </div>
              {ageErrorMessage && ageErrorMessage.length ? (
                <div className="error-message">{ageErrorMessage}</div>
              ) : null}
            </div>
            <div className="form-row">
              <label htmlFor="password">Password</label>
              <div className="input-text">
                <input type="password" name="password" required onChange={this.onInputChange} />
                <FontAwesome className="fas" name="lock" />
                {passwordErrorMessage && passwordErrorMessage.length ? (
                  <div className="error-message">{passwordErrorMessage}</div>
                ) : null}
              </div>
            </div>
            <div className="form-row">
              <label htmlFor="repassword">Confirm password</label>
              <div className="input-text">
                <input type="password" name="repassword" required onChange={this.onInputChange} />
                <FontAwesome className="fas" name="lock" />
              </div>
            </div>
            <div className="form-row-last">
              <input
                type="submit"
                className="btn submit-button"
                value="Register"
                onClick={this.onSubmit}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUp;
