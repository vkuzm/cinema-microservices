import React from 'react';
import './booking-form.styles.scss';
import FontAwesome from 'react-fontawesome';
import EmailValidator from '../../utils/EmailValidator';

class BookingForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sessionId: props.sessionId,
      selectedSeats: props.selectedSeats,
      name: {
        value: '',
        required: true,
        isError: false
      },
      phone: {
        value: '',
        required: false,
        isError: false
      },
      email: {
        value: '',
        required: true,
        isError: false
      },
      paymentMethod: {
        value: 'credit_card',
        required: true,
        isError: false
      }
    };
  }

  onInputChange = (e) => {
    const target = e.target;

    this.setState((prevState) => {
      return {
        [target.name]: { ...prevState[target.name], value: target.value }
      };
    });
  }

  onPaymentChange = (e) => {
    const target = e.target;

    this.setState((prevState) => {
      return {
        paymentMethod: { ...prevState.paymentMethod, value: target.value }
      };
    });
  }

  onOrderSubmit = async () => {
    const { sessionId, selectedSeats, name, phone, email, paymentMethod } = this.state;

    if (sessionId) {
      console.log('1')
      await this.validateFields();
      console.log('2')
      console.log(this.state)


      if (!this.hasErrors) {
        console.log({ sessionId, selectedSeats, name, phone, email, paymentMethod });
      }
    }
  }

  validateFields = () => {
    for (let fieldName in this.state) {
      if (this.state.hasOwnProperty(fieldName) && this.state[fieldName]) {
        this.validateField(fieldName);
      }
    }
  }

  validateField = (fieldName) => {
    const { value, isRequired } = this.state[fieldName];
    let isError = false;

    switch (fieldName) {
      case 'name':
        if (!this.isNameValid(value)) {
          isError = true;
        }
        break;
      case 'email':
        if (!EmailValidator.isValid(value)) {
          isError = true;
        }
        break;
      case 'phone':
        if (!this.isPhoneValid(value)) {
          isError = true;
        }
        break;
      default:
    }

    if (!isRequired && value.length === 0) {
      isError = false;
    }

    this.updateError(fieldName, isError);
  }

  updateError = (fieldName, isError) => {
    this.setState((prevState) => ({
      [fieldName]: { ...prevState[fieldName], isError }
    }));
  }

  hasErrors = () => {
    for (let fieldName in this.state) {
      if (this.state.hasOwnProperty(fieldName) && this.state[fieldName].isError) {
        return true;
      }
    }
    return false;
  }

  isNameValid = (name) => {
    return name.length >= 3 && name.length <= 25;
  }

  isPhoneValid = (phone) => {
    const re = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    return phone.match(re);
  }

  render() {
    return (
      <div className="col main-col checkout-col">
        <div className="checkout">
          <div className="checkout-info">
            <div className="form-detail">
              <h2>Booking form</h2>
              <div className="form-row">
                <label htmlFor="name">Name</label>
                <div className="input-text gray">
                  <input type="text" name="name" required onChange={this.onInputChange} />
                  <FontAwesome className="fas" name="user" />
                </div>
                {this.state.name.isError ? (
                  <div className="invalid-message">Enter valid name</div>
                ) : null}
              </div>
              <div className="form-row">
                <label htmlFor="email">Email</label>
                <div className="input-text gray">
                  <input type="email" name="email" required onChange={this.onInputChange} />
                  <FontAwesome className="fas" name="envelope" />
                </div>
                {this.state.email.isError ? (
                  <div className="invalid-message">Enter valid email address</div>
                ) : null}
              </div>
              <div className="form-row">
                <label htmlFor="Phone">Phone</label>
                <div className="input-text gray">
                  <input type="tel" name="Phone" required onChange={this.onInputChange} />
                  <FontAwesome className="fas" name="phone" />
                </div>
                {this.state.phone.isError ? (
                  <div className="invalid-message">Enter valid phone</div>
                ) : null}
              </div>

              <div className="payment-types">
                <h2>Choose payment method</h2>
                <label id="credit-card" className="payment-type">
                  <FontAwesome className="fas" name="cc-visa" />
                  <input
                    type="radio"
                    defaultChecked
                    value="credit_card"
                    name="payment_type"
                    onChange={this.onPaymentChange}
                  />
                  <span className="payment-type-name">Credit card</span>
                </label>
                <label id="paypal" className="payment-type">
                  <FontAwesome className="fas" name="paypal" />
                  <input
                    type="radio"
                    value="paypal"
                    name="payment_type"
                    onChange={this.onPaymentChange}
                  />
                  <span className="payment-type-name">Paypal</span>
                </label>
              </div>

              <div className="form-row-last">
                <input
                  type="button"
                  className="btn"
                  value="Make payment"
                  onClick={() => this.onOrderSubmit()}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BookingForm;
