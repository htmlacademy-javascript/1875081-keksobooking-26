import { createMarker } from './map.js';
import { createCapacityMessage, hiddenElement, hiddenPhotoElement, removeFeatures, addPhotoSrc} from './util.js';

const MIN_CARD_COUNT = 0;
const MAX_CARD_COUNT = 10;
const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const types = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель'
};

// const Default = {
//   TYPE: 'any',
//   PRICE: 'any',
//   ROOMS: 'any',
//   GUESTS: 'any'
// };

// const similarAds = (ads) => {
//   const housingType = document.querySelector('#housing-type');
//   const housingPrice = document.querySelector('#housing-price');
//   const housingRooms = document.querySelector('#housing-rooms');
//   const housingGuests = document.querySelector('#housing-guests');
//   const housingFeatures = document.querySelector('[name="features"');

//   let rank = 0;

//   if (ads.offer.type === (housingType.value || Default.TYPE)) {
//     rank +=1;
//   }
//   if (ads.offer.price === (housingPrice.value || Default.PRICE)) {
//     rank +=1;
//   }

//   if (ads.offer.rooms === (housingRooms.value || Default.Rooms)) {
//     rank +=1;
//   }
//   if (ads.offer.guests === (housingGuests.value || Default.GUESTS)) {
//     rank +=1;
//   }

//   if (ads.offer.features === (housingFeatures.value)) {
//     rank +=1;
//   }

//   return rank;
// };

const renderMarkers = (cards) => {
  const slisedCards = cards.slice(MIN_CARD_COUNT, MAX_CARD_COUNT);
  slisedCards.forEach((cardElement) => createMarker(cardElement));
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
  createCapacityMessage(cardCapacity, card.offer.rooms, card.offer.guest);
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

export {renderMarkers, showCard};
