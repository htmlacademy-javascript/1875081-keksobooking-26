import {createAds} from './data.js';
import { deleteElement } from './util.js';

const mapCanvas = document.querySelector('#map-canvas');
const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const generateCards = createAds();

generateCards.forEach(({author, offer}) => {
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.popup__avatar').src = author.avatar;
  const cardTitle = cardElement.querySelector('.popup__title');
  deleteElement(offer.title, cardTitle);
  cardElement.querySelector('.popup__text--address').textContent = offer.address;
  cardElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;

  const types = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalow: 'Бунгало',
    hotel: 'Отель'
  };
  cardElement.querySelector('.popup__type').textContent = types[offer.type];

  cardElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guest} гостей`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;

  const cardFeatures = offer.features;
  const featuresContainer = cardElement.querySelector('.popup__features');
  const featureList = featuresContainer.querySelectorAll('.popup__feature');

  featureList.forEach((featureListItem) => {
    const isModifiers = cardFeatures.some(
      (feature) => featureListItem.classList.contains(`popup__feature--${feature}`)
    );

    if (!isModifiers) {
      featureListItem.remove();
    }
  });

  const cardDescription = cardElement.querySelector('.popup__description');
  deleteElement(offer.description, cardDescription);

  const randomSrc = offer.photos;
  const photosContainer = cardElement.querySelector('.popup__photos');
  const photo = photosContainer.querySelector('.popup__photo');

  randomSrc.forEach((value, index) => {
    if (index === 0) {
      photo.src = value;
    } else {
      const photoClone = photo.cloneNode();
      photoClone.src = value;
      photosContainer.append(photoClone);
    }
  });

  mapCanvas.append(cardElement);
});
