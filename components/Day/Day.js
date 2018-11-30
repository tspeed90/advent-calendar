import React from 'react';

const Day = props => {
  return <div onClick={() => props.toggleDay(props.index)}>{props.index}</div>;
};

export default Day;
