import { createAds } from './data.js';
import {showCard} from './card.js';
import {activateForm} from './form-activate.js';
import './form-validate.js';
activateForm(true);
const generateCards = createAds();
showCard(generateCards[0]);
