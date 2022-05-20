import React from 'react';
import './session.styles.scss';
import WithSpinner from '../../components/with-spinner/with-spinner.component';
import SessionDetails from '../../components/session-details/session-details.component';
import ApiUrls from '../../ApiUrlConstants';

const SessionDetailsWithSpinner = WithSpinner(SessionDetails);

class Session extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      sessionInfo: {},
      processBooking: false
    };
  }

  componentDidMount() {
    const match = this.props.match;
    const sessionId = match.params.sessionId;

    if (sessionId) {
      this.getSessionInfo(sessionId).then((data) => {
        this.setState({ sessionInfo: data }, () => {
          this.setState({ isLoading: false });
        });
      });
    }
  }

  getSessionInfo = (sessionId) => {
    return fetch(ApiUrls.SESSION)
      .then((res) => res.json())
      .catch((err) => console.log(err));
  };

  onProcessBooking = () => {
    this.setState({ processBooking: true });
  };

  goBackToSeats = () => {
    this.setState({ processBooking: false });
  };

  goBack = () => {
    this.props.history.goBack();
  };

  render() {
    return (
      <div className="session-overflow">
        <div className="header" onClick={() => this.state.processBooking ? this.goBackToSeats() : this.goBack()}>
          <div className="back" />
          <div className="heading">
            <div>{this.state.processBooking ? 'Back to seats' : 'Back to home'}</div>
          </div>
          <div className="close" />
        </div>

        <SessionDetailsWithSpinner
          isLoading={this.state.isLoading}
          sessionInfo={this.state.sessionInfo}
          processBooking={this.state.processBooking}
          onProcessBooking={this.onProcessBooking}
          {...this.props}
        />
      </div>
    );
  }
}

export default Session;
