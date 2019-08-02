'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var ImgSizes = {
    width: '70px',
    height: '70px'
  };

  var fileChooserAvatar = document.querySelector('.ad-form-header__input');
  var previewAvatar = document.querySelector('.ad-form-header__preview');
  var fileChooserApartments = document.querySelector('.ad-form__input');
  var previewApartmentsBlock = document.querySelector('.ad-form__photo');

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

  var createFormPhoto = function (code) {
    var img = document.createElement('img');
    img.src = code;
    img.style.width = ImgSizes.width;
    img.style.height = ImgSizes.height;
    previewApartmentsBlock.appendChild(img);
  };

  fileChooserApartments.addEventListener('change', function (evt) {
    var files = evt.target.files;
    var matches = Array.from(files);

    if (matches) {
      matches.forEach(function (file) {
        var reader = new FileReader();
        reader.addEventListener('load', function () {
          createFormPhoto(reader.result);
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
