import React from 'react';
import './Day.css';

const Day = props => {
  return (
    <div
      className={props.checkDate(props.index) ? 'day' : 'day day--invalid'}
      tabIndex="0"
      onClick={() => props.toggleDay(props.index)}
    >
      <div className="number">{!props.flipped && props.index}</div>
      <div className="image__container">
        <img
          src={props.image}
          className={
            !props.flipped
              ? 'image--hidden image--styled'
              : 'image--shown image--styled'
          }
        />
      </div>
    </div>
  );
};

export default Day;
