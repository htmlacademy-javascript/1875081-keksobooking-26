import {createMarker} from './map.js';

const MIN_CARD_COUNT = 0;
const MAX_CARDS_COUNT = 5;

const getData = (onSuccess, onFail) => {
  fetch('https://26.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((cards) => {
      const cardPopup = cards.slice(MIN_CARD_COUNT, MAX_CARDS_COUNT).forEach((cardElement) => createMarker(cardElement));
      onSuccess(cardPopup);
    })
    .catch(() => {
      onFail('Если удалить .catch в получении данных с сервера, то в консоли можно будет увидеть из-за чего эта ошибка всплывает. И я без понятия, что от меня хочет консоль, что у меня не так. Посмотри, пожалуйста.');
    });
};

export {getData};
