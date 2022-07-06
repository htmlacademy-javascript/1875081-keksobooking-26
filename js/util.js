// Функции для вызова рандомного целого числа
function getRandomInt (a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));

  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

// Функция для вызова рандомного числа с плавающей точкой
function getRandomFloat (a, b, digits = 1) {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));

  const result = Math.random() * (upper - lower) + lower;
  return +result.toFixed(digits);
}

// Функция для вызова рандомного элемента из массива

function getRandomElementFromArray(element) {
  return element[getRandomInt(0, element.length - 1)];
}

// Функция для вызова рандомного количества элементов из массива
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

// Функция для генерации правильного окончания в сообщении.
// Как ее сделать красивее и проще?
function createCapacityMessage (tag, rooms, guest) {
  if (rooms === 1 && guest === 1) {
    tag.textContent = `${rooms} комната для ${guest} гостя`;
  } else if (rooms === 1 && guest === 2) {
    tag.textContent = `${rooms} комната для ${guest} гостей`;
  } else if (rooms >=2 && rooms <=4 && guest === 1) {
    tag.textContent = `${rooms} комнаты для ${guest} гостя`;
  } else if (rooms >=2 && rooms <=4  && guest >= 2) {
    tag.textContent = `${rooms} комнаты для ${guest} гостей`;
  } else if (rooms >=5  && guest === 1) {
    tag.textContent = `${rooms} комнат для ${guest} гостя`;
  } else if (rooms >=5  && guest >= 2) {
    tag.textContent = `${rooms} комнат для ${guest} гостей`;
  }
}

// Скрыть элемент с textContent, если длина = 0
const hiddenElement = (element, data) => {
  if (data && data.length > 0) {
    element.textContent = data;
  } else {
    element.classList.add('hidden');
  }
};

// Скрыть фото c src, если длина = 0
const hiddenPhotoElement = (element, data) => {
  if (data && data.length > 0) {
    element.src = data;
  } else {
    element.classList.add('hidden');
  }
};

// Удалить элементы списка без нужных модификаторов
const removeFeatures = (list, featuresOffer) => {
  list.forEach((listItem) => {
    const isModifiers = featuresOffer
      .some((feature) => listItem.classList.contains(`popup__feature--${feature}`));

    if (!isModifiers) {
      listItem.remove();
    }
  });
};

// Сделать клоны элементов с изображениями,если их не хватает
const addPhotoSrc = (photo, randomSrc, container) => {
  randomSrc.forEach((value, index) => {
    if (index === 0) {
      photo.src = value;
    } else {
      const photoClone = photo.cloneNode();
      photoClone.src = value;
      container.append(photoClone);
    }
  });
};
// Находит клавишу Escape
const isEscapeKey = (evt) => evt.key === 'Escape';

// Собщение с ошибкой
const errorContainer = document.querySelector('#error').content.querySelector('.error');
const errorButton = errorContainer.querySelector('.error__button');
const errorMessage = errorContainer.querySelector('.error__message');

const showError = (message) => {
  errorContainer.style.fontSize = '70px';
  errorContainer.style.color = 'red';

  errorMessage.textContent = message;

  document.body.append(errorContainer);
  errorContainer.append(errorButton);

  errorButton.addEventListener('click', () => {
    errorContainer.remove();
  });

  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      errorContainer.classList.add('hidden');
    }
  });
};

// Cообщение об успехе
const SHOW_TIME = 5000;
const successContainer = document.querySelector('#error').content.querySelector('.error');
const successMessage = errorContainer.querySelector('.error__message');

const showSuccess = (message) => {
  successContainer.style.fontSize = '100px';
  successContainer.style.color = 'green';

  successMessage.textContent = message;

  document.body.append(successContainer);

  setTimeout(() => {
    successContainer.remove();
  }, SHOW_TIME);
};

export {
  getRandomInt,
  getRandomFloat,
  getRandomElementFromArray,
  getRandomElementsFromArray,
  createCapacityMessage,
  hiddenElement,
  hiddenPhotoElement,
  removeFeatures,
  addPhotoSrc,
  showError,
  showSuccess,
  errorMessage,
  errorButton,
  successMessage,
  isEscapeKey,
  errorContainer
};
