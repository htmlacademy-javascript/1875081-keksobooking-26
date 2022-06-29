import { createAds } from './data.js';
import {createCard} from './generate-card.js';
import {activeForm} from './form-activate.js';
import './form-validate.js';
activeForm(true);
const generateCards = createAds();
createCard(generateCards[0]);
