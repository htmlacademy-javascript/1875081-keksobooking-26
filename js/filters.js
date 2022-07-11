import { createMarker, clearMarkers} from './map.js';

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
// const filterFeatureList = filtersContainer.querySelectorAll('.map__checkbox:checked');

function chooseType (ad) {
  return filterType.value === DEFAULT_VALUE || ad.offer.type === filterType.value;
}

function choosePrice (ad) {
  return filterPrice.value === DEFAULT_VALUE || (ad.offer.price >= priceForFilter[filterPrice.value].min && ad.offer.price <= priceForFilter[filterPrice.value].max);
}

function chooseRooms (ad) {
  return filterRooms.value === DEFAULT_VALUE || ad.offer.rooms === +filterRooms.value;
}

function chooseGuests (ad) {
  return filterGuests.value === DEFAULT_VALUE || ad.offer.guests === +filterGuests.value;
}

// function chooseFeatures (ad) {
//   const cardFeatures = ad.offer.features;
//   if (cardFeatures) {
//     filterFeatureList.forEach((feature) => {
//       if (cardFeatures.includes(feature.value)) {
//         return true;
//       }
//     });
//     return false;
//   }
// }

// function chooseFeatures (ad) {
//   const checked = [];
//   filterFeatureList.forEach((feature) => {
//     if (feature.checked) {
//       checked.push(feature.value);
//     }
//   });

//   if (ad.offer.features) {
//     return ad.offer.features
//       .every((el) => checked.includes(el));
//   }
// }

function createAds (ads) {
  const filteredCards = [];

  ads.forEach((ad) => {
    if (chooseType(ad) && choosePrice(ad) && chooseRooms(ad) && chooseGuests(ad)) {
      if (filteredCards.length < MAX_CARD_COUNT) {
        const card = createMarker(ad);
        filteredCards.push(card);
      }
    }
  });

  return filteredCards;
}


function renderPinOnMap (cb) {
  filtersContainer.addEventListener('change', () => {
    clearMarkers();
    cb();
  });
}

export {
  createAds,
  renderPinOnMap
};

