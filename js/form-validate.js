import { adForm } from './form-activate.js';
import { showError, showSuccess, errorMessage, successMessage} from './util.js';

const type = adForm.querySelector('#type');
const priceInput = adForm.querySelector('#price');
const sliderElement = adForm.querySelector('.ad-form__slider');
const rooms = adForm.querySelector('#room_number');
const capacity = adForm.querySelector('#capacity');
const timeIn = adForm.querySelector('#timein');
const timeOut = adForm.querySelector('#timeout');

const ChangeWord = {
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

const maxPrice = 100000;

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

// Валидация типа жилья и его цены
function validatePrice (value) {
  return value <= maxPrice && value >= minPrice[type.value];
}

function errorPrice () {
  return (priceInput.value > maxPrice)
    ? `Стоимость ${ChangeWord[type.value]} не более ${maxPrice}р`
    : `Стоимость ${ChangeWord[type.value]} не меньше ${minPrice[type.value]}р`;
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

const setUserFormSubmit = (onSuccess) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValidate = pristine.validate();

    if(isValidate) {
      const formData = new FormData(evt.target);

      fetch(
        'https://26.javascript.pages.academy/keksobooking',
        {
          method: 'POST',
          body: formData,
        },
      )
        .then((response) => {
          if (response.ok) {
            onSuccess();
            showSuccess(successMessage.textContent);
          } else {
            showError(errorMessage.textContent);
          }
        })
        .catch(() => {
          showError(errorMessage.textContent);
        });
    }
  });
};

const resetForm = () => {
  adForm.reset();
};

adForm.addEventListener('reset', () => {
  pristine.reset();
});

export {setUserFormSubmit, resetForm};
