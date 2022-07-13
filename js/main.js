import { showError, debounce } from './util.js';
import { activateForm } from './form-activate.js';
import { resetPage, successSend } from './form-validate.js';
import { createMap } from './map.js';
import { getData } from './api.js';
import { createAds, renderPinOnMap } from './filters.js';
import { uploadFileAvatar, uploadFileHome } from './avatar.js';

const RERENDER_DELAY = 500;

activateForm(false);
createMap(activateForm);

getData((cards) => {
  createAds(cards);
  renderPinOnMap(debounce(() => createAds(cards), RERENDER_DELAY));
  resetPage(debounce(() => createAds(cards), RERENDER_DELAY));
  successSend(debounce(() => createAds(cards), RERENDER_DELAY));
}, showError);

uploadFileAvatar();
uploadFileHome();
