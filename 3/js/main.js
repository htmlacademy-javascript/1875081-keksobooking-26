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
 * Функции для вызова рандомного целого числа
 * @param {number} a — первое число
 * @param {number} b — второе число
 * @return {integer} — рандомное целое число
 */
function getRandomInt (a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));

  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

/**
 * Функция для вызова рандомного числа с плавающей точкой
 * @param {number} a — первое число
 * @param {number} b — второе число
 * @param {number} digits — количество чисел после плавающей точки
 * @return {float} — рандомное число с плавающей точкой
 */
function getRandomFloat (a, b, digits = 1) {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));

  const result = Math.random() * (upper - lower) + lower;
  return +result.toFixed(digits);
}

/**
 * Функция для вызова рандомного элемента из массива
 * @param {Array} element — название массива, из которого будем выбирать рандомные элементы
 * @return {string} — рандомный элемент массива
 */
function getRandomElementFromArray(element) {
  return element[getRandomInt(0, element.length - 1)];
}

/**
 * Функция для вызова рандомного количества элементов из массива
 * @param {Array} elements — название массива, из которого будем выбирать рандомные элементы
 * @return {Array} — новый массив с рандомными элементами основного массива
 */
function getRandomElementsFromArray (elements) {
  const elementsLength = getRandomInt(1, elements.length);
  const arrayRandomElements = [];

  while (arrayRandomElements.length < elementsLength) {
    const randomElements = getRandomElementFromArray(elements);

    if (!arrayRandomElements.includes(randomElements)) {
      arrayRandomElements.push(randomElements);
    }
  }
  return arrayRandomElements;
}

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
 * @param {integer} count — количество объявлений, которое хотим сгенерировать
 * @return {Array} — массив сгенерированных объявлений
 */
const createAds = (count) => Array.from({length:count}, (_, i) => createAd(i + 1));
console.log(createAds(COUNT_ADS));
