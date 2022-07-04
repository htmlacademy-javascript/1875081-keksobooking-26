import { createAds, COUNT_ADS } from './data.js';
import { activateForm } from './form-activate.js';

const resetButton = document.querySelector('.ad-form__reset');
const addressInput = document.querySelector('#address');

const COORDS_DEFAULT = {
  lat: 35.6895,
  lng: 139.692,
};

const ZOOM_DEFAULT = 10;
const COORDS_DIGITS = 5;

const MAIN_PIN_ICON = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const AD_PIN_ICON = L.icon({
  iconUrl: '../img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const generateCards = createAds(COUNT_ADS);

const map = L.map('map-canvas')
  .on('load', () => {
    activateForm(true);
  })
  .setView(
    COORDS_DEFAULT,
    ZOOM_DEFAULT
  );

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinMarker = L.marker(
  COORDS_DEFAULT,
  {
    draggable: true,
    icon: MAIN_PIN_ICON,
  },
);

mainPinMarker.addTo(map);

const createCustomPopup = (ad) => {
  const balloonTemplate = document.querySelector('#balloon').content.querySelector('.balloon');
  const popupElement = balloonTemplate.cloneNode(true);

  popupElement.querySelector('.balloon__title').textContent = ad.offer.title;
  popupElement.querySelector('.balloon__lat-lng').textContent = `Координаты: ${ad.location.lat}, ${ad.location.lng}`;

  return popupElement;
};

const markerGroup = L.layerGroup().addTo(map);

const createMarker = (ad) => {
  const marker = L.marker({
    lat: ad.location.lat,
    lng: ad.location.lng,
  },
  {
    icon: AD_PIN_ICON,
  });

  marker.addTo(markerGroup)
    .bindPopup(createCustomPopup(ad));
};
generateCards.slice(0, generateCards.length / 2).forEach((ad) => {
  createMarker(ad);
});

mainPinMarker.on('move', (evt) => {
  const addressLat = String(evt.target.getLatLng().lat.toFixed(COORDS_DIGITS));
  const addressLng = String(evt.target.getLatLng().lng.toFixed(COORDS_DIGITS));
  addressInput.value =  `Широта: ${addressLat}, долгота: ${addressLng}`;
});

resetButton.addEventListener('click', () => {
  mainPinMarker.setLatLng(
    COORDS_DEFAULT
  );

  map.setView(
    COORDS_DEFAULT,
    ZOOM_DEFAULT
  );
});

export {generateCards};
