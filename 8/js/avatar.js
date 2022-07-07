const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const fileAvatar = document.querySelector('.ad-form-header__input');
const previewAvatar = document.querySelector('.ad-form-header__avatar');
const filePhotoHome = document.querySelector('.ad-form__input');
const previewPhotoHome = document.querySelector('.ad-form__photo');


fileAvatar.addEventListener('change', () => {
  const file = fileAvatar.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((item) => fileName.endsWith(item));

  if (matches) {
    previewAvatar.src = URL.createObjectURL(file);
  }
});

filePhotoHome.addEventListener('change', () => {
  const file = filePhotoHome.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((item) => fileName.endsWith(item));

  if (matches) {
    const imgPhoto = document.createElement('img');
    imgPhoto.style.width = '100px';
    imgPhoto.style.height = '100px';
    imgPhoto.src = URL.createObjectURL(file);
    previewPhotoHome.appendChild(imgPhoto);
  }
});

