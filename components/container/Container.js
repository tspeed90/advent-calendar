import React, { Component, Fragment } from 'react';
import Day from '../Day/Day';

export default class Container extends Component {
  constructor(props) {
    super(props);

    this.state = {
      numberOfDays: 25,
      flippedDays: [],
      unflippedDays: []
    };
  }

  toggleDay = id => {
    const { flippedDays } = this.state;
    if (flippedDays.indexOf(id) != 1) {
      flippedDays.push(id);
    }
  };

  createDays = () => {
    const { numberOfDays } = this.state;
    let daysList = [];

    for (let i = 1; i <= numberOfDays; i++) {
      daysList.push(
        <Day
          id={`day${i}`}
          key={`day${i}`}
          index={i}
          toggleDay={this.toggleDay}
        />
      );
    }
    return daysList;
  };

  render() {
    return <div>{this.createDays()}</div>;
  }
}
