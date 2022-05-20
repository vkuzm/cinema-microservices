import React from 'react';
import './session-details.styles.scss';
import SessionSeats from '../session-seats/session-seats.component';
import SessionMovieDetails from '../session-movie-details/session-movie-details.component';
import CinemaScreen from '../cinema-screen/cinema-screen.component';
import BookingDetails from '../booking-details/booking-details.component';
import BookingForm from '../booking-form/booking-form.component';

class SessionDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedSeats: new Set()
    };
  }

  onSeatSelect = (seat) => {
    this.setState({
      selectedSeats: this.seatToggle(seat)
    });
  };

  seatToggle = (seat) => {
    const selectedSeats = this.state.selectedSeats;
    if (selectedSeats.has(seat)) {
      selectedSeats.delete(seat);
    } else {
      selectedSeats.add(seat);
    }
    return new Set(selectedSeats);
  };

  render() {
    const {
      sessionId,
      movieName,
      movieImage,
      sessionDate,
      sessionTime,
      seats,
    } = this.props.sessionInfo;

    const selectedSeats = this.state.selectedSeats;
    const { processBooking, onProcessBooking } = this.props;

    return (
      <>
        <div className="session-main wrapper">
          <div className="session-tickets">
            <SessionMovieDetails
              movieName={movieName}
              movieImage={movieImage}
              sessionDate={sessionDate}
              sessionTime={sessionTime}
            />

            {processBooking? (
              <BookingForm
                sessionId={sessionId}
                selectedSeats={selectedSeats}
              />
            ) : (
              <>
                <CinemaScreen />
                <SessionSeats
                  seats={seats}
                  selectedSeats={selectedSeats}
                  onSeatSelect={this.onSeatSelect}
                />
              </>
            )}
          </div>
          <BookingDetails
            selectedSeats={selectedSeats}
            onProcessBooking={onProcessBooking}
            processBooking={processBooking}
          />
        </div>
      </>
    );
  }
}

export default SessionDetails;
