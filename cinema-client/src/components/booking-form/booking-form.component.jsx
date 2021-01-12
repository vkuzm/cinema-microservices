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
        hasError: false
      },
      phone: {
        value: '',
        required: false,
        hasError: false
      },
      email: {
        value: '',
        required: true,
        hasError: false
      },
      paymentMethod: {
        value: 'credit_card',
        required: true,
        hasError: false
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
  };

  onPaymentChange = (e) => {
    const target = e.target;

    this.setState((prevState) => {
      return {
        paymentMethod: { ...prevState.paymentMethod, value: target.value }
      };
    });
  };

  onOrderSubmit = () => {
    const { sessionId, selectedSeats, name, phone, email, paymentMethod } = this.state;

    if (sessionId) {
      this.validate('name', name);
      this.validate('email', email);
      this.validate('phone', phone);

      if (this.hasErrors) {
        console.log({ sessionId, selectedSeats, name, phone, email, paymentMethod });
      } else {
        console.log('Error has occurred');
      }
    }
  };

  validate = (fieldName, fieldData) => {
    this.setState((prevState) => {
      return {
        [fieldName]: {
          ...prevState[fieldName],
          hasError: this.isNotValidField(fieldName, fieldData)
        }
      };
    });
  };

  isNotValidField = (fieldName, fieldData) => {
    return (
      (fieldName === 'email' && !EmailValidator.isValid(fieldData.value)) ||
      (fieldData.required && fieldData.value.length === 0)
    );
  };

  hasErrors = () => {
    return this.state.name.hasError || this.state.email.hasError || this.state.phone.hasError;
  };

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
                {this.state.name.hasError ? (
                  <div className="invalid-message">Enter valid name</div>
                ) : null}
              </div>
              <div className="form-row">
                <label htmlFor="email">Email</label>
                <div className="input-text gray">
                  <input type="email" name="email" required onChange={this.onInputChange} />
                  <FontAwesome className="fas" name="envelope" />
                </div>
                {this.state.email.hasError ? (
                  <div className="invalid-message">Enter valid email address</div>
                ) : null}
              </div>
              <div className="form-row">
                <label htmlFor="Phone">Phone</label>
                <div className="input-text gray">
                  <input type="tel" name="Phone" required onChange={this.onInputChange} />
                  <FontAwesome className="fas" name="phone" />
                </div>
                {this.state.phone.hasError ? (
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
