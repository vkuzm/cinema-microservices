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
