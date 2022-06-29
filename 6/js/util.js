// Функции для вызова рандомного целого числа
function getRandomInt (a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));

  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

// Функция для вызова рандомного числа с плавающей точкой
function getRandomFloat (a, b, digits = 1) {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));

  const result = Math.random() * (upper - lower) + lower;
  return +result.toFixed(digits);
}

// Функция для вызова рандомного элемента из массива

function getRandomElementFromArray(element) {
  return element[getRandomInt(0, element.length - 1)];
}

// Функция для вызова рандомного количества элементов из массива
function getRandomElementsFromArray (elements) {
  const elementsLength = getRandomInt(1, elements.length);
  const arrayRandomElements = [];

  while (arrayRandomElements.length < elementsLength) {
    const randomElements = getRandomElementFromArray(elements);

    if (!arrayRandomElements.includes(randomElements)) {
      arrayRandomElements.push(randomElements);
    }
  }
  return arrayRandomElements;
}

// Функция для удаления елемента
function deleteElement (data, element) {
  if (data) {
    element.textContent = data;
  } else {
    element.remove();
  }
}

// Функция для генерации правильного окончания в сообщении.
// Как ее сделать красивее и проще?
function createCapacityMessage (tag, rooms, guest) {
  if (rooms === 1 && guest === 1) {
    tag.textContent = `${rooms} комната для ${guest} гостя`;
  } else if (rooms === 1 && guest === 2) {
    tag.textContent = `${rooms} комната для ${guest} гостей`;
  } else if (rooms >=2 && rooms <=4 && guest === 1) {
    tag.textContent = `${rooms} комнаты для ${guest} гостя`;
  } else if (rooms >=2 && rooms <=4  && guest >= 2) {
    tag.textContent = `${rooms} комнаты для ${guest} гостей`;
  } else if (rooms >=5  && guest === 1) {
    tag.textContent = `${rooms} комнат для ${guest} гостя`;
  } else if (rooms >=5  && guest >= 2) {
    tag.textContent = `${rooms} комнат для ${guest} гостей`;
  }
}

const ChangeWord = {
  palace: 'дворца',
  flat: 'квартиры',
  house: 'дома',
  bungalow: 'бунгало',
  hotel: 'отеля'
};

export {
  getRandomInt,
  getRandomFloat,
  getRandomElementFromArray,
  getRandomElementsFromArray,
  deleteElement,
  createCapacityMessage,
  ChangeWord
};
