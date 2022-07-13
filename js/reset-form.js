import { minPrice, priceInput, sliderElement, type} from './form-validate.js';
import { previewAvatar, previewPhotoHome } from './avatar.js';
import { clearMarkers, coordsDefault, mainPinMarker, map, setAdress, ZOOM_DEFAULT } from './map.js';

const AVATAR_DEFAULT = 'img/muffin-grey.svg';
const filtersForm = document.querySelector('.map__filters');

function resetForm (form) {
  filtersForm.reset();
  form.reset();
  setAdress(coordsDefault.lat, coordsDefault.lng);
  previewAvatar.src = AVATAR_DEFAULT;
  previewPhotoHome.innerHTML = '';
  priceInput.placeholder = minPrice[type.value];
  map.closePopup();
  sliderElement.noUiSlider.reset();

  mainPinMarker.setLatLng(
    coordsDefault,
  );

  map.setView(
    coordsDefault,
    ZOOM_DEFAULT
  );
  clearMarkers();
}

export {
  resetForm
};
