import { showError, showSuccess, successMessage } from './util.js';
import { activateForm } from './form-activate.js';
import { renderMarkers} from './card.js';
import { setUserFormSubmit, unblockSubmitButton } from './form-validate.js';
import { map, setAdress, COORDS_DEFAULT, ZOOM_DEFAULT, resetForm } from './map.js';
import { getData } from './api.js';
import './avatar.js';

activateForm(false);

map
  .on('load', () => {
    activateForm(true);
    setAdress(COORDS_DEFAULT.lat, COORDS_DEFAULT.lng);
  })
  .setView(
    COORDS_DEFAULT,
    ZOOM_DEFAULT
  );

getData((cards) => {
  renderMarkers(cards);
}, showError);

setUserFormSubmit(() => {
  showSuccess(successMessage.textContent);
  resetForm();
  unblockSubmitButton();
});

