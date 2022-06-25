import {getRandomInt, getRandomFloat, getRandomElementFromArray, getRandomElementsFromArray} from './util.js';

// КОНСТАНТЫ
const TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const TIMES = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];
const Coords = {
  LAT_MIN: 35.65000,
  LAT_MAX: 35.70000,
  LNG_MIN: 139.70000,
  LNG_MAX: 139.80000
};
const COUNT_ADS = 10;

/**
 * Функция для генерации объявления
 * @param {integer} index — индекс изображения, который будем передавать при генерации списка объявлений
 * @return {Object} — готовый объект объявления
 */
const createAd = (index) => {
  const location = {
    lat: getRandomFloat(Coords.LAT_MIN, Coords.LAT_MAX),
    lng: getRandomFloat(Coords.LNG_MIN, Coords.LNG_MAX),
  };
  return {
    author: {
      avatar: `img/avatars/user${String(index).padStart(2, '0')}.png`
    },
    offer: {
      title: 'Лучшее место для путешествий по России',
      address: `${location.lat}, ${location.lng}`,
      price: getRandomInt(500, 1000),
      type: getRandomElementFromArray(TYPES),
      rooms: getRandomInt(1, 5),
      guest: getRandomInt(1,10),
      checkin: getRandomElementFromArray(TIMES),
      checkout: getRandomElementFromArray(TIMES),
      features: getRandomElementsFromArray(FEATURES),
      description: 'Обслуживание лучше, чем в царских хоромах',
      photos: getRandomElementsFromArray(PHOTOS)
    },
    location
  };
};

/**
 * Генерация объявлений
 * @param {integer} — количество объявлений, которое хотим сгенерировать
 * @return {Array} — массив сгенерированных объявлений
 */
const createAds = () => Array.from({length: COUNT_ADS}, (_, i) => createAd(i + 1));
createAds();

export {FEATURES, PHOTOS, createAds};
