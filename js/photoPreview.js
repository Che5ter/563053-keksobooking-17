'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var ImgSizes = {
    WIDTH: '70px',
    HEIGHT: '70px'
  };

  var fileChooserAvatar = document.querySelector('.ad-form-header__input');
  var previewAvatar = document.querySelector('.ad-form-header__preview');
  var fileChooserApartments = document.querySelector('.ad-form__input');
  var previewApartmentsBlock = document.querySelector('.ad-form__photo');
  var photoContainer = document.querySelector('.ad-form__photo-container');

  fileChooserAvatar.addEventListener('change', function () {
    var file = fileChooserAvatar.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        previewAvatar.children[0].src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });

  var createFormPhoto = function (code, index) {
    if (index === 0) {
      var img = document.createElement('img');
      img.src = code;
      img.style.width = ImgSizes.WIDTH;
      img.style.height = ImgSizes.HEIGHT;
      previewApartmentsBlock.appendChild(img);
      return;
    }
    var div = document.createElement('div');
    div.classList.add('ad-form__photo');
    photoContainer.appendChild(div);
    img = document.createElement('img');
    img.src = code;
    img.style.width = ImgSizes.WIDTH;
    img.style.height = ImgSizes.HEIGHT;
    div.appendChild(img);
  };

  fileChooserApartments.addEventListener('change', function (evt) {
    var files = evt.target.files;
    var matches = Array.from(files);

    if (matches) {
      matches.forEach(function (file, index) {
        var reader = new FileReader();
        reader.addEventListener('load', function () {
          createFormPhoto(reader.result, index);
        });
        reader.readAsDataURL(file);
      });
    }
  });
  window.photoPreview = {
    previewAvatar: previewAvatar,
    previewApartmentsBlock: previewApartmentsBlock
  };
})();
