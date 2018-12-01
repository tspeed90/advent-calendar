import fetchJsonp from 'fetch-jsonp';
import { pixabayApi } from '../token.js';

const getPhotos = () => {
  const images = [];
  return fetchJsonp(
    `https://pixabay.com/api/?key=${pixabayApi}&q=christmas&per_page=40&editors_choice=true&page=1`
  )
    .then(res => res.json())
    .then(res => res.hits.map(img => images.push(img.largeImageURL)))
    .then(() => images);
};

export { getPhotos };
