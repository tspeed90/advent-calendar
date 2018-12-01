import React from 'react';
import './Day.css';

const Day = props => {
  return (
    <div className="day" onClick={() => props.toggleDay(props.index)}>
      <div className="number">{!props.flipped && props.index}</div>
      <div className="image__container">
        {props.flipped && <img src={props.image} />}
      </div>
    </div>
  );
};

export default Day;
