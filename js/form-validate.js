import { adForm } from './form-activate.js';
import { ChangeWord } from './util.js';

const title = adForm.querySelector('#title');
const type = adForm.querySelector('#type');
const priceInput = adForm.querySelector('#price');
const sliderElement = adForm.querySelector('.ad-form__slider');
const rooms = adForm.querySelector('#room_number');
const capacity = adForm.querySelector('#capacity');
const timeIn = adForm.querySelector('#timein');
const timeOut = adForm.querySelector('#timeout');
const TitleSymbols = {
  MIN_SYMBOLS: 30,
  MAX_SYMBOLS: 100
};
const PriceAmount = {
  MIN_PRICE: {
    palace: 10000,
    flat: 1000,
    house: 5000,
    bungalow: 0,
    hotel: 3000
  },
  MAX_PRICE: {
    palace: 100000,
    flat: 100000,
    house: 100000,
    bungalow: 100000,
    hotel: 100000
  }
};
const maxCapacity = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0]
};

// Весь код снизу нужно завернуть в функцию? Что-бы импортировать потом в main. Или как-то иначе?
const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__error-text',
});

// Валидация заголовка
function validateTitle (value) {
  return value.length >= TitleSymbols.MIN_SYMBOLS && value.length <= TitleSymbols.MAX_SYMBOLS;
}

function errorTitle () {
  return `Введите от ${TitleSymbols.MIN_SYMBOLS} до ${TitleSymbols.MAX_SYMBOLS} символов`;
}

pristine.addValidator(title, validateTitle, errorTitle);

// Валидация типа жилья и его цены
function validatePrice (value) {
  return value <= PriceAmount.MAX_PRICE[type.value] && value >= PriceAmount.MIN_PRICE[type.value];
}

function errorPrice () {
  return (priceInput.value > PriceAmount.MAX_PRICE[type.value])
    ? `Стоимость ${ChangeWord[type.value]} не более ${PriceAmount.MAX_PRICE[type.value]}р`
    : `Стоимость ${ChangeWord[type.value]} не меньше ${PriceAmount.MIN_PRICE[type.value]}р`;
}

pristine.addValidator(priceInput,validatePrice, errorPrice);

// noUiSlider
noUiSlider.create(sliderElement, {
  range: {
    min: Number(priceInput.min),
    max: Number(priceInput.max),
  },
  start: Number(priceInput.min),
  step: 15,
  connect: 'lower'
});
priceInput.min = PriceAmount.MIN_PRICE[type.value];

sliderElement.noUiSlider.on('update', () => {
  const sliderValue = Number(sliderElement.noUiSlider.get());
  if (sliderValue === 0) {
    priceInput.value = '';
  }
  priceInput.value = sliderValue;
  pristine.validate(priceInput);
});

priceInput.addEventListener('change', (evt) => {
  sliderElement.noUiSlider.set(Number(evt.target.value));
});

type.addEventListener('change', () => {
  priceInput.placeholder = PriceAmount.MIN_PRICE[type.value];
  priceInput.min = PriceAmount.MIN_PRICE[type.value];
});

// Валидация количества комнат и гостей
function validateCapacity () {
  return maxCapacity[+rooms.value].includes(+capacity.value);
}

function errorCapacity() {
  return 'Количество мест не соответствует типу жилья';
}

pristine.addValidator(capacity, validateCapacity, errorCapacity);

// Время заезда и время выезда синхрон
timeIn.addEventListener('change', () => {
  timeOut.value = timeIn.value;
  pristine.validate();
});

timeOut.addEventListener('change', () => {
  timeIn.value = timeOut.value;
  pristine.validate();
});

function validateTime () {
  return  timeIn.value === timeOut.value;
}

function errorTime () {
  return 'Время должно быть одинаково';
}

pristine.addValidator(timeOut, validateTime, errorTime);

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

adForm.addEventListener('reset', () => {
  pristine.reset();
});

