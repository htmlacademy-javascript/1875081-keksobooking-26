const URL_GET_DATA ='https://26.javascript.pages.academy/keksobooking/data';
const URL_SEND_DATA = 'https://26.javascript.pages.academy/keksobooking';
const METHOD = 'POST';

const getData = (onSuccess, onFail) => {
  fetch(URL_GET_DATA)
    .then((response) => response.json())
    .then((cards) => {
      onSuccess(cards);
    })
    .catch(() => {
      onFail('Ошибка загрузки данных. Попробуйте перезагрузить страницу.');
    });
};

const sendData = (dataForm, onSuccess, onFail) => {
  fetch(
    URL_SEND_DATA,
    {
      method: METHOD,
      body: dataForm,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};

export {
  getData,
  sendData
};
