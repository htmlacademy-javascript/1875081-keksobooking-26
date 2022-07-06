import { showError } from './util.js';
import { showCard } from './card.js';
import './form-activate.js';
import {setUserFormSubmit, resetForm} from './form-validate.js';
import {createMarker} from './map.js';

const MIN_CARD_COUNT = 0;
const MAX_CARDS_COUNT = 3;

fetch('https://26.javascript.pages.academy/keksobooking/data')
  .then((response) => response.json())
  .then((cards) => {
    showCard(cards.slice(MIN_CARD_COUNT, MAX_CARDS_COUNT).forEach((card) => createMarker(card)));
  })
  .catch(() => {
    showError('Антон, это окно высвечивается из-за TypeError в консоли и я не знаю, что с ней делать. Потому что данные с сервера загружаются нормально.');
  });

setUserFormSubmit(resetForm);

