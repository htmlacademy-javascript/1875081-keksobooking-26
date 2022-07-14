const SHOW_TIME = 5000;
const successContainer = document.querySelector('#success').content.querySelector('.success');
const successMessage = successContainer.querySelector('.success__message');
const errorContainer = document.querySelector('#error').content.querySelector('.error');
const errorButton = errorContainer.querySelector('.error__button');
const errorMessage = errorContainer.querySelector('.error__message');

const createCapacityMessage = (tag, rooms, guest) => {
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
};

const hideElement = (element, data) => {
  if (data) {
    element.textContent = data;
  } else {
    element.classList.add('hidden');
  }
};

const hidePhotoElement = (element, data) => {
  if (data) {
    element.src = data;
  } else {
    element.classList.add('hidden');
  }
};

const renderFeatures = (container, dataFeaturesList) => {
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
};

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

const isEscapeKey = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    removePopup();
  }
};

const onPopupClick = () => {
  removePopup();
};

function removePopup () {
  errorContainer.remove();
  successContainer.remove();

  document.removeEventListener('click', onPopupClick);

  document.removeEventListener('keydown', onPopupEscKeydown);
}

const showError = (message) => {
  errorMessage.textContent = message;

  document.body.append(errorContainer);
  errorContainer.append(errorButton);

  errorButton.addEventListener('click', () => {
    errorContainer.remove();
  });

  document.addEventListener('click', onPopupClick);

  document.addEventListener('keydown', onPopupEscKeydown);
};

const showSuccess = (message) => {
  successMessage.textContent = message;

  document.body.append(successContainer);

  document.addEventListener('click', onPopupClick);

  document.addEventListener('keydown', onPopupEscKeydown);

  setTimeout(() => {
    successContainer.remove();
  }, SHOW_TIME);
};

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {
  createCapacityMessage,
  hideElement,
  hidePhotoElement,
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
