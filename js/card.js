import { deleteElement, createCapacityMessage } from './util.js';

const mapCanvas = document.querySelector('#map-canvas');
const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
const types = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель'
};

function showCard (card) {
  const cardElement = cardTemplate.cloneNode(true);

  const cardAvatar = cardElement.querySelector('.popup__avatar');
  cardAvatar.src = card.author.avatar;
  const cardTitle = cardElement.querySelector('.popup__title');
  deleteElement(card.offer.title, cardTitle);
  const cardAdress = cardElement.querySelector('.popup__text--address');
  cardAdress.textContent = card.offer.address;
  const cardPrice = cardElement.querySelector('.js-price');
  cardPrice.textContent = card.offer.price;
  const cardType = cardElement.querySelector('.popup__type');
  cardType.textContent = types[card.offer.type];
  // Почему 1 гость не включается в список.
  const cardCapacity = cardElement.querySelector('.popup__text--capacity');
  createCapacityMessage(cardCapacity, card.offer.rooms, card.offer.guest);
  const cardTime = cardElement.querySelector('.popup__text--time');
  cardTime.textContent = `Заезд после ${card.offer.checkin}, выезд до ${card.offer.checkout}`;

  const cardFeatures = card.offer.features;
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
  deleteElement(card.offer.description, cardDescription);

  const randomSrc = card.offer.photos;
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
}

export {showCard};
