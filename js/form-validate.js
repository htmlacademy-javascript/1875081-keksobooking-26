import { sendData} from './api.js';
import { adForm } from './form-activate.js';
import { resetForm } from './reset-form.js';
import { showError, errorMessage, showSuccess, successMessage} from './util.js';

const SLIDER_STEP = 15;
const MAX_PRICE = 100000;
const type = adForm.querySelector('#type');
const priceInput = adForm.querySelector('#price');
const sliderElement = adForm.querySelector('.ad-form__slider');
const rooms = adForm.querySelector('#room_number');
const capacity = adForm.querySelector('#capacity');
const timeIn = adForm.querySelector('#timein');
const timeOut = adForm.querySelector('#timeout');
const submitButton = adForm.querySelector('.ad-form__submit');
const resetButton = document.querySelector('.ad-form__reset');

const changeWord = {
  palace: 'дворца',
  flat: 'квартиры',
  house: 'дома',
  bungalow: 'бунгало',
  hotel: 'отеля'
};

const minPrice = {
  palace: 10000,
  flat: 1000,
  house: 5000,
  bungalow: 0,
  hotel: 3000
};

const maxCapacity = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0]
};

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__error-text',
});

function blockSubmitButton () {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикую...';
}

function unblockSubmitButton () {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
}

// Валидация типа жилья и его цены
function validatePrice (value) {
  return value <= MAX_PRICE && value >= minPrice[type.value];
}

function errorPrice () {
  return (priceInput.value > MAX_PRICE)
    ? `Стоимость ${changeWord[type.value]} не более ${MAX_PRICE}р`
    : `Стоимость ${changeWord[type.value]} не меньше ${minPrice[type.value]}р`;
}

pristine.addValidator(priceInput,validatePrice, errorPrice);

// noUiSlider
noUiSlider.create(sliderElement, {
  range: {
    min: Number(priceInput.min),
    max: Number(priceInput.max),
  },
  start: Number(priceInput.min),
  step: SLIDER_STEP,
  connect: 'lower'
});

priceInput.min = minPrice[type.value];

sliderElement.noUiSlider.on('slide', () => {
  const sliderValue = Number(sliderElement.noUiSlider.get());
  priceInput.value = sliderValue;
  pristine.validate(priceInput);
});

priceInput.addEventListener('change', (evt) => {
  sliderElement.noUiSlider.set(Number(evt.target.value));
});

type.addEventListener('change', () => {
  priceInput.placeholder = minPrice[type.value];
  priceInput.min = minPrice[type.value];
  pristine.validate();
});

// Валидация количества комнат и гостей
rooms.addEventListener('change', () => {
  pristine.validate();
});

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

function setUserFormSubmit (onSuccess) {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValidate = pristine.validate();

    if(isValidate) {
      const formData = new FormData(evt.target);
      blockSubmitButton();
      sendData(formData, onSuccess, () => {
        showError(errorMessage.textContent);
        unblockSubmitButton();
      });
    }
  });
}

function successSend () {
  setUserFormSubmit(() => {
    showSuccess(successMessage.textContent);
    resetForm(adForm);
    unblockSubmitButton();
  });
}

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  pristine.reset();
  resetForm(adForm);
});

export {
  setUserFormSubmit,
  unblockSubmitButton,
  sliderElement,
  priceInput,
  minPrice,
  type,
  successSend
};
