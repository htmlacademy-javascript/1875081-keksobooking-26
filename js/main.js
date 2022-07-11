import { showError, debounce } from './util.js';
import { activateForm} from './form-activate.js';
import { successSend } from './form-validate.js';
import { createMap} from './map.js';
import { getData } from './api.js';
import { createAds, renderPinOnMap} from './filters.js';
import { uploadFileAvatar, uploadFileHome } from './avatar.js';
// import { resetForm } from './reset-form.js';

const RERENDER_DELAY = 500;

activateForm(false);
createMap(activateForm);

getData((cards) => {
  createAds(cards);
  renderPinOnMap(debounce(() => createAds(cards), RERENDER_DELAY));
}, showError);

successSend();

uploadFileAvatar();
uploadFileHome();
