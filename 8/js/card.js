import { createCapacityMessage, hiddenElement, hiddenPhotoElement, removeFeatures, addPhotoSrc } from './util.js';

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const types = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель'
};

const showCard = (card) => {
  const cardElement = cardTemplate.cloneNode(true);

  const cardAvatar = cardElement.querySelector('.popup__avatar');
  const cardTitle = cardElement.querySelector('.popup__title');
  const cardAdress = cardElement.querySelector('.popup__text--address');
  const cardPrice = cardElement.querySelector('.js-price');
  cardPrice.textContent = card.offer.price;
  const cardType = cardElement.querySelector('.popup__type');
  const cardCapacity = cardElement.querySelector('.popup__text--capacity');
  const cardTime = cardElement.querySelector('.popup__text--time');
  const featuresContainer = cardElement.querySelector('.popup__features');
  const featureList = featuresContainer.querySelectorAll('.popup__feature');
  const cardDescription = cardElement.querySelector('.popup__description');
  const photosContainer = cardElement.querySelector('.popup__photos');
  const photoCard = photosContainer.querySelector('.popup__photo');


  hiddenPhotoElement(cardAvatar, card.author.avatar);
  hiddenElement(cardTitle, card.offer.title);
  hiddenElement(cardAdress, card.offer.address);
  // hiddenElement(cardPrice, card.offer.price);
  hiddenElement(cardDescription, card.offer.description);
  createCapacityMessage(cardCapacity, card.offer.rooms, card.offer.guest);
  cardTime.textContent = `Заезд после ${card.offer.checkin}, выезд до ${card.offer.checkout}`;

  if (card.offer.features && card.offer.features.length > 0) {
    removeFeatures(featureList, card.offer.features);
  } else {
    featuresContainer.classList.add('hidden');
  }

  if (card.offer.type && card.offer.type.length > 0) {
    cardType.textContent = types[card.offer.type];
  } else {
    cardType.classList.add('hidden');
  }

  if (card.offer.photos && card.offer.photos.length > 0) {
    addPhotoSrc(photoCard, card.offer.photos, photosContainer);
  } else {
    photosContainer.classList.add('hidden');
  }

  return cardElement;
};

export {showCard};
