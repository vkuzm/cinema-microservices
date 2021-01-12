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
      sessionInfo: {}
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

  goBack = () => {
    this.props.history.goBack();
  };

  render() {
    return (
      <div className="session-overflow">
        <div className="header">
          <div className="back" />
          <div className="heading">
            <div onClick={() => this.goBack()}>Back to home</div>
          </div>
          <div className="close" onClick={() => this.goBack()} />
        </div>

        <SessionDetailsWithSpinner
          isLoading={this.state.isLoading}
          sessionInfo={this.state.sessionInfo}
          {...this.props}
        />
      </div>
    );
  }
}

export default Session;
