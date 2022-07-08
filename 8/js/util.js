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

// Скрыть элемент, если его нет
const hiddenElement = (element, data) => {
  if (data) {
    element.textContent = data;
  } else {
    element.classList.add('hidden');
  }
};

// Скрыть фото c src, если длина = 0
const hiddenPhotoElement = (element, data) => {
  if (data) {
    element.src = data;
  } else {
    element.classList.add('hidden');
  }
};

// Удалить элементы списка без нужных модификаторов
const removeFeatures = (list, featuresOffer) => {
  list.forEach((listItem) => {
    const isModifiers = featuresOffer.some((feature) => {
      listItem.classList.contains(`popup__feature--${feature}`);
    });

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

  errorMessage.textContent = message;

  document.body.append(errorContainer);
  errorContainer.append(errorButton);

  errorButton.addEventListener('click', () => {
    errorContainer.remove();
  });

  document.addEventListener('click', () => {
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
const successContainer = document.querySelector('#success').content.querySelector('.success');
const successMessage = successContainer.querySelector('.success__message');

const showSuccess = (message) => {
  successContainer.style.fontSize = '100px';

  successMessage.textContent = message;

  document.body.append(successContainer);

  document.addEventListener('click', () => {
    successContainer.remove();
  });

  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      successContainer.classList.add('hidden');
    }
  });

  setTimeout(() => {
    successContainer.remove();
  }, SHOW_TIME);
};

// Функция debounce для устранения дребезга
function debounce (callback, timeoutDelay = 500) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}
// Функция throttle для пропуска кадров
function throttle (callback, delayBetweenFrames) {
  let lastTime = 0;

  return (...rest) => {
    const now = new Date();

    if (now - lastTime >= delayBetweenFrames) {
      callback.apply(this, rest);
      lastTime = now;
    }
  };
}

export {
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
  errorContainer,
  debounce,
  throttle
};
