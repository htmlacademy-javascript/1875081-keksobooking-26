import { createCapacityMessage, hiddenElement, hiddenPhotoElement, removeFeatures, addPhotoSrc} from './util.js';

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
  const cardAddress = cardElement.querySelector('.popup__text--address');
  const cardPrice = cardElement.querySelector('.js-price');
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
  hiddenElement(cardAddress, card.offer.address);
  hiddenElement(cardDescription, card.offer.description);
  createCapacityMessage(cardCapacity, card.offer.rooms, card.offer.guests);
  cardTime.textContent = `Заезд после ${card.offer.checkin}, выезд до ${card.offer.checkout}`;

  if (card.offer['price'] !== undefined) {
    cardPrice.textContent = card.offer.price;
  } else {
    cardPrice.parentElement.remove();
  }

  if (card.offer.features) {
    removeFeatures(featureList, card.offer.features);
  } else {
    featuresContainer.classList.add('hidden');
  }

  if (card.offer.type) {
    cardType.textContent = types[card.offer.type];
  } else {
    cardType.classList.add('hidden');
  }

  if (card.offer.photos) {
    addPhotoSrc(photoCard, card.offer.photos, photosContainer);
  } else {
    photosContainer.classList.add('hidden');
  }

  return cardElement;
};

export {showCard};
