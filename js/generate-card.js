import {FEATURES, PHOTOS, createAds} from './data.js';
import {getRandomElementsFromArray} from './util.js';

const mapCanvas = document.querySelector('#map-canvas');
const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

// Данные для функции и функция для удаления элемента списка фич в разметке, если его нет в карточке
const randomFeatures = getRandomElementsFromArray(FEATURES);
const featuresContainer = cardTemplate.querySelector('.popup__features');
const featureList = featuresContainer.querySelectorAll('.popup__feature');
const modifiers = randomFeatures.map((feature) => `popup__features--${feature}`);

featureList.forEach((featureListItem) => {
  const modifier = featureListItem.classList[1];

  if (!modifiers.includes(modifier)) {
    featureListItem.remove();
  }
});

// Данные и функция для создания рандомного количества изображений в контейнере.
// Не пойму, как можно оставить исходный img и просто добавлять при необходимости новые, а не удалять исходник.
const randomSrc = getRandomElementsFromArray(PHOTOS);
const photosContainer = cardTemplate.querySelector('.popup__photos');
const photo = photosContainer.querySelector('.popup__photo');

const randomPhotos = randomSrc.forEach((value) => {
  const photoClone = photo.cloneNode();
  photoClone.src = value;
  photosContainer.append(photoClone);
  photo.remove();
});

const generateCards = createAds();
const generateCardFragment = document.createDocumentFragment();

generateCards.forEach(({author, offer}) => {
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.popup__avatar').src = author.avatar;
  const cardTitle = cardElement.querySelector('.popup__title');
  cardTitle.textContent = offer.title ? offer.title : cardTitle.remove();
  cardElement.querySelector('.popup__text--address').textContent = offer.address;
  // Как задать адресс словами, а не координатами?
  cardElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  cardElement.querySelector('.popup__type').textContent = getCardType(offer.type);
  function getCardType (type) {
    switch(type) {
      case 'palace':
        return 'Дворец';
      case 'flat':
        return 'Квартира';
      case 'house':
        return 'Дом';
      case 'bungalow':
        return 'Бунгало';
      case 'hotel':
        return 'Отель';
    }
  }
  cardElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guest} гостей`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  cardElement.querySelector('.popup__features').textContent = offer.features;
  const cardDescription = cardElement.querySelector('.popup__description');
  cardDescription.textContent = offer.description ? offer.description : cardDescription.remove();
  photo.textContent = randomPhotos;

  generateCardFragment.append(cardElement);
});

mapCanvas.append(generateCardFragment);

export {mapCanvas};
