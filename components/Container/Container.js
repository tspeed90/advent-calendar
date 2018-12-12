import React, { Component, Fragment } from 'react';
import Day from '../Day/Day';
import { getPhotos } from '../../utils/getPhotos';
import './Container.css';
import bells from '../../audio/sleigh-bells.mp3';

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
    if (window.localStorage.getItem('calendarState') === null) {
      return getPhotos()
        .then(responseImages => this.getImageUrls(responseImages))
        .then(imageUrls => this.shuffleImages(imageUrls))
        .then(imageUrls => this.setPersistentState({ imageUrls }));
    } else {
      this.setState(JSON.parse(window.localStorage.getItem('calendarState')));
    }
  }

  getImageUrls = responseImages =>
    responseImages.results.map(item => item.urls.small);

  setPersistentState = state => {
    this.setState(state, () =>
      window.localStorage.setItem('calendarState', JSON.stringify(this.state))
    );
  };

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
      this.setPersistentState({
        flippedDays: [...flippedDays, id]
      });
      let audio = new Audio(bells);
      audio.play();
    } else if (flippedDays.indexOf(id) != -1) {
      let newFlippedDays = [...flippedDays];
      newFlippedDays.splice(flippedDays.indexOf(id), 1);
      this.setPersistentState({
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
          checkDate={this.checkDate}
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
        <h1>🎄 Christmas Time is Heeeeeere! 🎄 </h1>
        <div className="days__container">{this.createDays()}</div>
      </Fragment>
    );
  }
}
