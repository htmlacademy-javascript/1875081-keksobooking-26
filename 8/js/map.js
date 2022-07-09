import { showCard} from './card.js';
import { sliderElement} from './form-validate.js';
import { adForm } from './form-activate.js';
import { previewAvatar, previewPhotoHome } from './avatar.js';

const AVATAR_DEFAULT = 'img/muffin-grey.svg';
const resetButton = document.querySelector('.ad-form__reset');
const addressInput = document.querySelector('#address');

const COORDS_DEFAULT = {
  lat: 35.6895,
  lng: 139.692,
};

const ZOOM_DEFAULT = 10;
const COORDS_DIGITS = 5;

const MAIN_PIN_ICON = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const AD_PIN_ICON = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const setAdress = (lat, lng) => {
  const addressLat = lat;
  const addressLng = lng;
  addressInput.value =  `Широта: ${addressLat}, долгота: ${addressLng}`;
};

const map = L.map('map-canvas');

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

const markerGroup = L.layerGroup().addTo(map);

const createMarker = (card) => {
  const marker = L.marker({
    lat: card.location.lat,
    lng: card.location.lng,
  },
  {
    icon: AD_PIN_ICON,
  });

  marker
    .addTo(markerGroup)
    .bindPopup(showCard(card));
};

const clearMarkers = () => markerGroup.clearLayers();

mainPinMarker.on('move', (evt) => {
  setAdress(
    String(evt.target.getLatLng().lat.toFixed(COORDS_DIGITS)),
    String(evt.target.getLatLng().lng.toFixed(COORDS_DIGITS))
  );
});

const resetForm = () => {
  adForm.reset();
  setAdress(COORDS_DEFAULT.lat, COORDS_DEFAULT.lng);
  previewAvatar.src = AVATAR_DEFAULT;
  previewPhotoHome.innerHTML = '';
  clearMarkers();
  sliderElement.noUiSlider.reset();

  mainPinMarker.setLatLng(
    COORDS_DEFAULT,
  );

  map.setView(
    COORDS_DEFAULT,
    ZOOM_DEFAULT
  );
};

resetButton.addEventListener('click', () => {
  resetForm();
});

export {map, createMarker, clearMarkers, markerGroup, setAdress, COORDS_DEFAULT, ZOOM_DEFAULT, resetForm};
