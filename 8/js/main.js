import { showError } from './util.js';
import { showCard } from './card.js';
import './form-activate.js';
import {setUserFormSubmit, resetForm} from './form-validate.js';
import { getData } from './api.js';
import './avatar.js';

getData(showCard, showError);

setUserFormSubmit(resetForm);

