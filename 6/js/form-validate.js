import { adForm } from './form-activate.js';
import { ChangeWord } from './util.js';

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__error-text',
});

// Вадидация заголовка
const title = adForm.querySelector('#title');
const TitleSymbols = {
  MIN_SYMBOLS: 30,
  MAX_SYMBOLS: 100
};
function validateTitle (value) {
  return value.length >= TitleSymbols.MIN_SYMBOLS && value.length <= TitleSymbols.MAX_SYMBOLS;
}

function errorTitle () {
  return `Введите от ${TitleSymbols.MIN_SYMBOLS} до ${TitleSymbols.MAX_SYMBOLS} символов`;
}

pristine.addValidator(title, validateTitle, errorTitle);

// Валидация типа жилья и его цены
const type = adForm.querySelector('#type');
const price = adForm.querySelector('#price');

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

type.addEventListener('change', () => {
  price.placeholder = PriceAmount.MIN_PRICE[type.value];
  price.min = PriceAmount.MIN_PRICE[type.value];
  price.value = '';
});

function validatePrice (value) {
  return value <= PriceAmount.MAX_PRICE[type.value] && value >= PriceAmount.MIN_PRICE[type.value];
}

function errorPrice () {
  return (price.value > PriceAmount.MAX_PRICE[type.value]) ? `Стоимость ${ChangeWord[type.value]} не более ${PriceAmount.MAX_PRICE[type.value]}р` : `Стоимость ${ChangeWord[type.value]} не меньше ${PriceAmount.MIN_PRICE[type.value]}р`;
}

pristine.addValidator(price,validatePrice, errorPrice);

// Валидация количества комнат и гостей
// Я без понятия как написать
const capacity = adForm.querySelector('#capacity');
const maxCapacity = {
  '1': [1],
  '2': [1, 2],
  '3': [1, 2, 3],
  '100': [0]
};

function validateCapacity (value) {
  maxCapacity[value] = value;
  // Сроку выше написада что-бы линтер ошибку не выбивал
}

function errorCapacity() {
  return 'error capacity';
}

pristine.addValidator(capacity, validateCapacity, errorCapacity);

// Время заезда и время выезда синхрон
const timeIn = adForm.querySelector('#timein');
const timeOut = adForm.querySelector('#timeout');

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

