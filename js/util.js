const SHOW_TIME = 5000;
const successContainer = document.querySelector('#success').content.querySelector('.success');
const successMessage = successContainer.querySelector('.success__message');
const errorContainer = document.querySelector('#error').content.querySelector('.error');
const errorButton = errorContainer.querySelector('.error__button');
const errorMessage = errorContainer.querySelector('.error__message');
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
function hiddenElement (element, data) {
  if (data) {
    element.textContent = data;
  } else {
    element.classList.add('hidden');
  }
}

// Скрыть фото c src, если длина = 0
function hiddenPhotoElement (element, data) {
  if (data) {
    element.src = data;
  } else {
    element.classList.add('hidden');
  }
}

// Удалить элементы списка без нужных модификаторов
function renderFeatures (container, dataFeaturesList) {
  if (dataFeaturesList) {
    container.innerHTML = '';

    dataFeaturesList.forEach((feature) => {
      const featureElement = document.createElement('li');

      featureElement.classList.add(
        'popup__feature',
        `popup__feature--${feature}`
      );

      container.append(featureElement);
    });
  } else {
    container.remove();
  }
}

// Сделать клоны элементов с изображениями,если их не хватает
function addPhotoSrc (photo, randomSrc, container) {
  randomSrc.forEach((value, index) => {
    if (index === 0) {
      photo.src = value;
    } else {
      const photoClone = photo.cloneNode();
      photoClone.src = value;
      container.append(photoClone);
    }
  });
}
// Находит клавишу Escape
function isEscapeKey (evt) {
  return evt.key === 'Escape';
}

function onPopupEscKeydown (evt, container) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    removePopup(container);
  }
}

function onPopupClick () {
  removePopup();
}

// Удаление попапов и обработчиков событий
function removePopup () {
  errorContainer.remove();
  successContainer.remove();

  document.removeEventListener('click', onPopupClick);

  document.removeEventListener('keydown', onPopupEscKeydown);
}

// Собщение с ошибкой
function showError (message) {
  errorMessage.textContent = message;

  document.body.append(errorContainer);
  errorContainer.append(errorButton);

  errorButton.addEventListener('click', () => {
    errorContainer.remove();
  });

  document.addEventListener('click', onPopupClick);

  document.addEventListener('keydown', onPopupEscKeydown);
}

// Cообщение об успехе
function showSuccess (message) {
  successMessage.textContent = message;

  document.body.append(successContainer);

  document.addEventListener('click', onPopupClick);

  document.addEventListener('keydown', onPopupEscKeydown);

  setTimeout(() => {
    successContainer.remove();
  }, SHOW_TIME);
}

// Функция debounce для устранения дребезга
function debounce (callback, timeoutDelay = 500) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export {
  createCapacityMessage,
  hiddenElement,
  hiddenPhotoElement,
  renderFeatures,
  addPhotoSrc,
  showError,
  showSuccess,
  errorMessage,
  errorButton,
  successMessage,
  isEscapeKey,
  errorContainer,
  debounce,
};
