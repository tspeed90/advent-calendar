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
    getPhotos()
      .then(imageUrls => this.shuffleImages(imageUrls))
      .then(imageUrls => this.setState({ imageUrls }));
  }

  shuffleImages = imageUrls => {
    const shuffledImages = [];
    while (imageUrls.length > 0) {
      const randomNumber = Math.floor(Math.random() * imageUrls.length);
      shuffledImages.push(imageUrls[randomNumber]);
      imageUrls.splice(randomNumber, 1);
    }
    return shuffledImages;
  };

  checkDate = id => {
    const validDate = new Date(2018, 11, id);
    const currentDate = new Date();
    return currentDate > validDate;
  };

  toggleDay = id => {
    const { flippedDays } = this.state;
    if (flippedDays.indexOf(id) == -1 && this.checkDate(id)) {
      this.setState({
        flippedDays: [...flippedDays, id]
      });
    } else if (flippedDays.indexOf(id) != -1) {
      let newFlippedDays = [...flippedDays];
      newFlippedDays.splice(flippedDays.indexOf(id), 1);
      this.setState({
        flippedDays: [...newFlippedDays]
      });
    } else {
      alert("Uh oh! It's not time to uncover that one yet!");
    }
  };

  createDays = () => {
    const { numberOfDays, flippedDays, imageUrls } = this.state;
    let daysList = [];

    for (let i = 1; i <= numberOfDays; i++) {
      daysList.push(
        <Day
          id={`day${i}`}
          key={`day${i}`}
          index={i}
          flipped={flippedDays.includes(i)}
          toggleDay={this.toggleDay}
          image={imageUrls[i]}
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
