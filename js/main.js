import { showError, showSuccess, successMessage, debounce } from './util.js';
import { activateForm } from './form-activate.js';
import { setUserFormSubmit, unblockSubmitButton } from './form-validate.js';
import { createMap, resetForm } from './map.js';
import { getData } from './api.js';
import { createAds, renderPinOnMap} from './filters.js';
import { uploadFileAvatar, uploadFileHome } from './avatar.js';

const RERENDER_DELAY = 500;

activateForm(false);
createMap(activateForm);

getData((cards) => {
  createAds(cards);
  renderPinOnMap(debounce(() => createAds(cards), RERENDER_DELAY));
}, showError);

setUserFormSubmit(() => {
  showSuccess(successMessage.textContent);
  resetForm();
  unblockSubmitButton();
});

uploadFileAvatar();
uploadFileHome();
