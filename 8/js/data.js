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

const RoomsAmount = {
  MIN_ROOMS: 1,
  MAX_ROOMS: 5
};

const GuestsAmount = {
  MIN_GUEST: 1,
  MAX_GUESTS: 10
};

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
      avatar: `img/avatars/user${String(index + 1).padStart(2, '0')}.png`
    },
    offer: {
      title: 'Лучшее место для путешествий по России',
      address: `${location.lat}, ${location.lng}`,
      price: getRandomInt(500, 1000),
      type: getRandomElementFromArray(TYPES),
      rooms: getRandomInt(RoomsAmount.MIN_ROOMS, RoomsAmount.MAX_ROOMS),
      guest: getRandomInt(GuestsAmount.MIN_GUEST, GuestsAmount.MAX_GUESTS),
      checkin: getRandomElementFromArray(TIMES),
      checkout: getRandomElementFromArray(TIMES),
      features: getRandomElementsFromArray(FEATURES),
      description: 'Обслуживание лучше, чем в царских хоромах',
      photos: getRandomElementsFromArray(PHOTOS)
    },
    location
  };
};

//Генерация объявлений

const createAds = (count) => {
  const ads = [];
  for (let i = 0; i < count; i++) {
    ads[i] = createAd(i);
  }

  return ads;
};

export {FEATURES, PHOTOS, createAds, COUNT_ADS};
