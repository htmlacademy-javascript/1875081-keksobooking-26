import { createMarker, clearMarkers} from './map.js';

const MIN_CARD_COUNT = 0;
const MAX_CARD_COUNT = 10;
const DEFAULT = 'any';

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
const filterFeatureList = filtersContainer.querySelectorAll('.map__checkbox');

const chooseType = (ad) => filterType.value === DEFAULT || ad.offer.type === filterType.value;
const choosePrice = (ad) => filterPrice.value === DEFAULT || (ad.offer.price >= priceForFilter[filterPrice.value].min && ad.offer.price <= priceForFilter[filterPrice.value].max);
const chooseRooms = (ad) => filterRooms.value === DEFAULT || ad.offer.rooms === +filterRooms.value;
const chooseGuests = (ad) => filterGuests.value === DEFAULT || ad.offer.guests === +filterGuests.value;

const chooseFeatures = (ad) => {
  const cardFeatures = ad.offer.features;
  filterFeatureList.forEach((feature) => {
    if (feature.checked && cardFeatures.includes(feature.value)) {
      return true;
    }
  });

  return false;
};

const filterArr = (ads) => {
  const newArr = [];

  ads.slice(MIN_CARD_COUNT, MAX_CARD_COUNT).forEach((ad) => {
    if (chooseType(ad) && choosePrice(ad) && chooseRooms(ad) && chooseGuests(ad) && chooseFeatures) {
      const card = createMarker(ad);
      newArr.push(card);
    }
  });

  return newArr;
};

const clearFilter = (cb) => {
  filtersContainer.addEventListener('change', () => {
    clearMarkers();
    cb();
  });
};

export {filterArr, clearFilter};

