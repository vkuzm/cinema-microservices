import React from 'react';
import './booking-details.styles.scss';

const BookingDetails = ({ selectedSeats, onProcessBooking, processBooking }) => {
  const selectedSeatsList = Array.from(selectedSeats);
  const totalPrice = selectedSeatsList.reduce((acc, seat) => {
    return acc + seat.price;
  }, 0);

  return (
    <div className="booking">
      <div className="booking-detail">
        <h2 className="booking-detail-heading">Tickets</h2>

        <div className="text-center">
          {selectedSeatsList.length === 0 ? (
            <div className="empty-state">
              <img
                className="empty-state-image"
                src="data:image/png;base64,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"
                alt=""
              />
              <p>You have an empty ticket list</p>
            </div>
          ) : (
            <ul>
              {selectedSeatsList.map((seat, index) => (
                <li key={index}>
                  Seat: #{seat.seatNumber}, Price: ${seat.price}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="booking-submit">
        <h4 className="booking-submit-heading">
          <b>Total price:</b>
          <strong className="booking-submit-price">
            <small> ${totalPrice}</small>
          </strong>
        </h4>

        {!processBooking && selectedSeatsList.length ? (
          <button
            onClick={() => onProcessBooking()}
            className="btn btn-primary btn-block btn-corrector"
          >
            Go to purchase
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default BookingDetails;
