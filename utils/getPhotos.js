import { APP_ACCESS_KEY } from '../token.js';

const getPhotos = () => {
  return fetch(
    'https://api.unsplash.com/search/photos?page=1&query=winter-christmas&per_page=30',
    {
      headers: {
        Authorization: `Client-ID ${APP_ACCESS_KEY}`
      }
    }
  ).then(res => res.json());
};

export { getPhotos };
