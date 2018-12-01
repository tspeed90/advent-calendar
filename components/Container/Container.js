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
      imageUrls: []
    };
  }

  componentDidMount() {
    getPhotos().then(imageUrls => this.setState({ imageUrls }));
  }

  chooseRandomPhoto = () => {
    const { imageUrls } = this.state;
    const randomNumber = Math.floor(Math.random() * 40 + 1);

    return imageUrls[randomNumber];
  };

  toggleDay = id => {
    const { flippedDays } = this.state;
    if (flippedDays.indexOf(id) == -1) {
      this.setState({
        flippedDays: [...this.state.flippedDays, id]
      });
    }
  };

  createDays = () => {
    const { numberOfDays, flippedDays } = this.state;
    let daysList = [];

    for (let i = 1; i <= numberOfDays; i++) {
      daysList.push(
        <Day
          id={`day${i}`}
          key={`day${i}`}
          index={i}
          flipped={flippedDays.includes(i)}
          toggleDay={this.toggleDay}
          selectPhoto={this.chooseRandomPhoto}
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
