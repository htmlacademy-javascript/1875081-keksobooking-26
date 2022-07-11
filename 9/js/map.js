import { showCard} from './card.js';
import { sliderElement} from './form-validate.js';
import { adForm } from './form-activate.js';
import { previewAvatar, previewPhotoHome } from './avatar.js';

const AVATAR_DEFAULT = 'img/muffin-grey.svg';
const ZOOM_DEFAULT = 10;
const COORDS_DIGITS = 5;
const resetButton = document.querySelector('.ad-form__reset');
const addressInput = document.querySelector('#address');
const filtersForm = document.querySelector('.map__filters');
const map = L.map('map-canvas');
const coordsDefault = {
  lat: 35.68950,
  lng: 139.69200,
};

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const adPinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const mainPinMarker = L.marker(
  coordsDefault,
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

const markerGroup = L.layerGroup().addTo(map);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

mainPinMarker.addTo(map);

mainPinMarker.on('move', (evt) => {
  setAdress(
    String(evt.target.getLatLng().lat.toFixed(COORDS_DIGITS)),
    String(evt.target.getLatLng().lng.toFixed(COORDS_DIGITS))
  );
});

function setAdress (lat, lng) {
  const addressLat = lat;
  const addressLng = lng;
  addressInput.value =  `Широта: ${addressLat}, долгота: ${addressLng}`;
}

function createMap (form) {
  map
    .on('load', () => {
      form(true);
      setAdress(coordsDefault.lat, coordsDefault.lng);
    })
    .setView(
      coordsDefault,
      ZOOM_DEFAULT
    );
}

function createMarker (card) {
  const marker = L.marker({
    lat: card.location.lat,
    lng: card.location.lng,
  },
  {
    icon: adPinIcon,
  });

  marker
    .addTo(markerGroup)
    .bindPopup(showCard(card));
}

function clearMarkers () {
  markerGroup.clearLayers();
}


function resetForm () {
  filtersForm.reset();
  adForm.reset();
  setAdress(coordsDefault.lat, coordsDefault.lng);
  previewAvatar.src = AVATAR_DEFAULT;
  previewPhotoHome.innerHTML = '';
  clearMarkers();
  sliderElement.noUiSlider.reset();

  mainPinMarker.setLatLng(
    coordsDefault,
  );

  map.setView(
    coordsDefault,
    ZOOM_DEFAULT
  );
}

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetForm();
});

export {createMap, createMarker, clearMarkers, markerGroup, setAdress, resetForm};
