// Общее задание.
// Решение нашла на https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random

function getRandomArbitrary(min, max) {
  if (min >= max || min < 0 || max <= 0) {
    return ('Задан неверный диапазон! Укажите другие числа.');
  }

  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

getRandomArbitrary(1, 2);

// Задание по Кексобукингу

function getRandomInt(min, max, digits) {
  if (min >= max || min < 0 || max <= 0) {
    return ('Задан неверный диапазон! Укажите другие числа.');
  }

  return ((Math.random() * (max - min + 1) + min).toFixed(digits));
}

getRandomInt(0, 2, 6);
