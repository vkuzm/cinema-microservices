import React from 'react';
import FontAwesome from 'react-fontawesome';
import './sign-up.styles.scss';
import EmailValidator from '../../utils/EmailValidator';
import ApiUrlConstants from '../../ApiUrlConstants';

const PASSWORD_LENGTH_MIN = 6;
const PASSWORD_LENGTH_MAX = 12;
const NAME_LENGTH_MIN = 4;
const NAME_LENGTH_MAX = 20;

class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: {
        value: '',
        hasError: false
      },
      email: {
        value: '',
        hasError: false,
        hasAlreadyExistedError: false
      },
      age: {
        value: ''
      },
      password: {
        value: '',
        hasError: false
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

    await this.validate('name', this.validateName(name));
    await this.validate('email', this.validateEmail(email));
    await this.validate('password', this.validatePassword(password, repassword));

    if (!this.hasErrors()) {
      const payload = {
        name: name,
        email: email,
        age: age,
        password: password,
        repassword: repassword
      };

      fetch(ApiUrlConstants.SIGN_UP, {
        method: 'POST',
        body: payload,
        headers: [{ 'Content-Type': 'application/json' }]
      })
        .then((res) => this.toData(res))
        .then((data) => {
          if (data.status === 201) {
            // TODO store session in browser
            this.props.history.push('/');
          } else {
            if (data.body === 'email_already_exists') {
              this.showEmailAlreadyExistError();
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  toData = (res) => {
    return res.json().then((json) => {
      return {
        status: res.status,
        body: json
      };
    });
  };

  validateName = (name) => {
    return name.value.length < NAME_LENGTH_MIN || name.value.length > NAME_LENGTH_MAX;
  };

  validateEmail = (email) => {
    return email.value.length === 0 || !EmailValidator.isValid(email.value);
  };

  validatePassword = (password, repassword) => {
    return (
      password.value.length < PASSWORD_LENGTH_MIN ||
      password.value.length > PASSWORD_LENGTH_MAX ||
      password.value !== repassword.value
    );
  };

  validate = (fieldName, hasError) => {
    this.setState((prevState) => {
      return {
        [fieldName]: {
          ...prevState[fieldName],
          hasError: hasError
        }
      };
    });
  };

  hasErrors = () => {
    return Object.values(this.state)
      .map((value) => value.hasError)
      .filter((value) => value === true).length;
  };

  showEmailAlreadyExistError = () => {
    this.setState((prevState) => {
      return {
        email: {
          ...prevState.email,
          hasError: true,
          hasAlreadyExistedError: true
        }
      };
    });
  };

  render() {
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
              {this.state.name.hasError ? (
                <div className="error-message">Name must be between 4-20 characters</div>
              ) : null}
            </div>
            <div className="form-row">
              <label htmlFor="email">Email</label>
              <div className="input-text">
                <input type="email" name="email" required onChange={this.onInputChange} />
                <FontAwesome className="fas" name="envelope" />
              </div>
              {this.state.email.hasError ? (
                <div className="error-message">Email must be valid</div>
              ) : null}

              {this.state.email.hasAlreadyExistedError ? (
                <div className="error-message">Email already exists</div>
              ) : null}
            </div>
            <div className="form-row">
              <label htmlFor="age">Age</label>
              <div className="input-text">
                <input type="text" name="age" onChange={this.onInputChange} />
                <FontAwesome className="fas" name="calendar" />
              </div>
            </div>
            <div className="form-row">
              <label htmlFor="password">Password</label>
              <div className="input-text">
                <input type="password" name="password" required onChange={this.onInputChange} />
                <FontAwesome className="fas" name="lock" />
                {this.state.password.hasError ? (
                  <>
                    <div className="error-message">Passwords must be equal</div>
                    <div className="error-message">Passwords must be between 8-12 characters</div>
                  </>
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
