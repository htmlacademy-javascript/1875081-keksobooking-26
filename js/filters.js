import { createMarker, clearMarkers } from './map.js';

const MAX_CARD_COUNT = 10;
const DEFAULT_VALUE = 'any';

const priceForFilter = {
  low: {
    min: 0,
    max: 9999,
  },
  middle: {
    min: 10000,
    max: 49999,
  },
  high: {
    min: 50000,
    max: 100000,
  }
};

const filtersContainer = document.querySelector('.map__filters');
const filterType = filtersContainer.querySelector('#housing-type');
const filterPrice = filtersContainer.querySelector('#housing-price');
const filterRooms = filtersContainer.querySelector('#housing-rooms');
const filterGuests = filtersContainer.querySelector('#housing-guests');

const chooseType = (ad) => filterType.value === DEFAULT_VALUE || ad.offer.type === filterType.value;
const choosePrice = (ad) => filterPrice.value === DEFAULT_VALUE || (ad.offer.price >= priceForFilter[filterPrice.value].min && ad.offer.price <= priceForFilter[filterPrice.value].max);
const chooseRooms = (ad) => filterRooms.value === DEFAULT_VALUE || ad.offer.rooms === +filterRooms.value;
const chooseGuests = (ad) => filterGuests.value === DEFAULT_VALUE || ad.offer.guests === +filterGuests.value;

const chooseFeatures = (ad) => {
  const checkedsInputs = Array.from(filtersContainer.querySelectorAll('input[type="checkbox"]:checked'));

  if (ad.offer.features) {
    return checkedsInputs.every((el) => ad.offer.features.includes(el.value));
  }

  return false;
};

const createAds = (ads) => {
  const filteredCards = [];

  for (let i = 0; i < ads.length; i++) {
    if (
      chooseType(ads[i]) &&
      choosePrice(ads[i]) &&
      chooseRooms(ads[i]) &&
      chooseGuests(ads[i]) &&
      chooseFeatures(ads[i])) {
      if (filteredCards.length >= MAX_CARD_COUNT) {
        break;
      }
      const card = createMarker(ads[i]);
      filteredCards.push(card);
    }
  }
  return filteredCards;
};


const renderPinOnMap = (cb) => {
  filtersContainer.addEventListener('change', () => {
    clearMarkers();
    cb();
  });
};

export {
  createAds,
  renderPinOnMap
};

