import React, { Component, Fragment } from 'react';
import Day from '../Day/Day';

export default class Container extends Component {
  constructor(props) {
    super(props);

    this.state = {
      numberOfDays: 25
    };
  }

  createDays = () => {
    let daysList = [];

    for (let i = 0; i < this.state.numberOfDays; i++) {
      daysList.push(<Day>{i + 1}</Day>);
    }
    return daysList;
  };

  render() {
    return <Fragment>{this.createDays()}</Fragment>;
  }
}
