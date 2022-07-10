import { showError, showSuccess, successMessage, debounce } from './util.js';
import { activateForm } from './form-activate.js';
import { setUserFormSubmit, unblockSubmitButton } from './form-validate.js';
import { map, setAdress, COORDS_DEFAULT, ZOOM_DEFAULT, resetForm } from './map.js';
import { getData } from './api.js';
import { filterArr, clearFilter } from './filters.js';
import { uploadFileAvatar, uploadFileHome } from './avatar.js';

const RERENDER_DELAY = 500;

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
  filterArr(cards);
  clearFilter(debounce(() => filterArr(cards), RERENDER_DELAY));
}, showError);

setUserFormSubmit(() => {
  showSuccess(successMessage.textContent);
  resetForm();
  unblockSubmitButton();
});

uploadFileAvatar();
uploadFileHome();
