import React, { Component, Fragment } from 'react';
import Day from '../Day/Day';
import { getPhotos } from '../../utils/getPhotos';
import './Container.css';

export default class Container extends Component {
  constructor(props) {
    super(props);

    this.state = {
      numberOfDays: 25,
      flippedDays: [],
      unflippedDays: [],
      imageUrls: []
    };
  }

  componentDidMount() {
    getPhotos().then(imageUrls => this.setState({ imageUrls }));
  }

  toggleDay = id => {
    const { flippedDays } = this.state;
    if (flippedDays.indexOf(id) != 1) {
      this.setState({
        flippedDays: [...this.state.flippedDays, id]
      });
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
    return (
      <Fragment>
        <h1>🎄 Let's Count Down to Christmas! 🎄 </h1>
        <div className="days__container">{this.createDays()}</div>
      </Fragment>
    );
  }
}
