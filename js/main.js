// Общее задание.
// Решение нашла на https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random

// function getRandomInt(min, max) {
//   return getRandomFloat(min, max, 0);
// }

// getRandomInt(0, 4);

// Задание по Кексобукингу

// function getRandomFloat(min, max, digits) {
//   if (min >= max || min < 0 || max <= 0) {
//     return null;
//   }

//   return parseFloat((Math.random() * (max - min + 1) + min).toFixed(digits));
// }

// getRandomFloat(0, 4, 6);

// ВЫШЕ МОЕ РЕШЕНИЕ, СНИЗУ АКАДЕМОВСКОЕ. АКАДЕМОВСКИЙ ВАРИАНТ, СУДЯ ПО ВСЕМУ, ЛУЧШЕ МОЕГО.

function getRandomInt (a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));

  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

getRandomInt(0,4);

function getRandomFloat (a, b, digits = 1) {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));

  const result = Math.random() * (upper - lower) + lower;
  return +result.toFixed(digits);
}

getRandomFloat(0,4);

// ЗАДАНИЕ 4 РАЗДЕЛА

const avatarNumbers = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10
];

const quantityNumbers = getRandomInt(0, avatarNumbers.length - 1);
// В условии аватары не должны повторяться, я не уверена, что рандомное число - это то, что нужно, потому что в таком случае число может повторится несколько раз.
const number = avatarNumbers[quantityNumbers] > 9 ? avatarNumbers[quantityNumbers] : `0${avatarNumbers[quantityNumbers]}`;

/* function numberCall (number) {
  for (let i = 0; i < number.length; i++) {
    if (number[i] > 9) {
      return number[i];
    }
    return `0${number[i]}`;
  }
}

Еще такой вариант пробовала, но при таком варианте при вызове numberCall(avatarNumbers) всегда число 01 в url.
*/

// Аватар автора
const AUTHOR = {
  avatar: `img/avatars/user${number}.png`
};

// Информация об объявлении
const OFFER = {
  title: 'Лучшее место для путешествий по России',
  adress: 'LOCATION.lat, LOCATION.lng',
  price: getRandomInt(500, 1000),
  type: 'palace, flat, house, bungalow, hotel',
  rooms: getRandomInt(1, 5),
  guest: getRandomInt(1,10),
  checkin: '12:00, 13:00, 14:00',
  checkout: '12:00, 13:00, 14:00',
  features: [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ],
  description: 'Обслуживание лучше, чем в царских хоромах',
  photos: [
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
  ]
};

// Местоположение в виде географических координат

const LOCATION = {
  lat: getRandomFloat(35.65000, 35.70000),
  lng: getRandomFloat(139.70000, 139.80000),
};

const createAds = (function () {
  return Object.assign({}, AUTHOR, OFFER, LOCATION);
});

const adsNear = Array.from({length: 10}, createAds);
console.log(adsNear);
