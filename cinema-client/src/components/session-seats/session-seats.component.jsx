import React from 'react';
import './session-seats.styles.scss';

const SessionSeats = ({ seats, selectedSeats, onSeatSelect }) => {
  const displaySeats = (specificSets) => {
    return specificSets.map((seat, index) => (
      <div
        key={index}
        className={`seat ${seat.type} ${selectedSeats.has(seat) ? 'selected' : ''}`}
        onClick={() => onSeatSelect(seat)}
      >
        {seat.seatNumber}
      </div>
    ));
  };

  const seatsFront = displaySeats(seats.front);
  const seatsRegular = displaySeats(seats.regular);
  const seatsVip = displaySeats(seats.vip);

  return (
    <div className="seats">
      <div className="seats-front">{seatsFront}</div>
      <div className="seats-normal"> {seatsRegular}</div>
      <div className="seats-vip">{seatsVip}</div>
    </div>
  );
};

export default SessionSeats;
