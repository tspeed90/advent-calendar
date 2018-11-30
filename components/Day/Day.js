import React from 'react';

const Day = props => {
  return (
    <div className="day" onClick={() => props.toggleDay(props.index)}>
      {props.index}
    </div>
  );
};

export default Day;
