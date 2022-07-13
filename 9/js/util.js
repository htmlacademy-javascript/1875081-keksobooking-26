const SHOW_TIME = 5000;
const successContainer = document.querySelector('#success').content.querySelector('.success');
const successMessage = successContainer.querySelector('.success__message');
const errorContainer = document.querySelector('#error').content.querySelector('.error');
const errorButton = errorContainer.querySelector('.error__button');
const errorMessage = errorContainer.querySelector('.error__message');

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

function hiddenElement (element, data) {
  if (data) {
    element.textContent = data;
  } else {
    element.classList.add('hidden');
  }
}

function hiddenPhotoElement (element, data) {
  if (data) {
    element.src = data;
  } else {
    element.classList.add('hidden');
  }
}

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

function isEscapeKey (evt) {
  return evt.key === 'Escape' || evt.key === 'Esc';
}

function onPopupEscKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    removePopup();
  }
}

function onPopupClick () {
  removePopup();
}

function removePopup () {
  errorContainer.remove();
  successContainer.remove();

  document.removeEventListener('click', onPopupClick);

  document.removeEventListener('keydown', onPopupEscKeydown);
}

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

function showSuccess (message) {
  successMessage.textContent = message;

  document.body.append(successContainer);

  document.addEventListener('click', onPopupClick);

  document.addEventListener('keydown', onPopupEscKeydown);

  setTimeout(() => {
    successContainer.remove();
  }, SHOW_TIME);
}

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
