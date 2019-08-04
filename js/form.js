'use strict';
(function () {

  var mainPinCoords = window.utils.getCoords(window.data.mainPin);
  window.data.address.value = Math.round(mainPinCoords.top + window.data.PinSizes.HEIGHT / 2) + ', ' + Math.round(mainPinCoords.left + window.data.PinSizes.WIDTH / 2); // добавляем координаты центра большого пина в поле адрес
  var successBlock = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
  var templateError = document.querySelector('#error').content.querySelector('.error');
  var form = document.querySelector('.ad-form');
  var filterForm = document.querySelector('.map__filters');
  var selectType = document.querySelector('#type');
  var inputPrice = document.querySelector('#price');
  var filters = document.querySelectorAll('.map__filter');
  var fieldsets = document.querySelectorAll('fieldset');
  var headerUpload = document.querySelector('.ad-form-header__input');
  var resetButton = document.querySelector('.ad-form__reset');

  var DEFAULT_PHOTO_PREVIEW = 'img/muffin-grey.svg';

  var typePriceMap = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };

  var selectTypeChangeHandler = function () { // синхронизируем плейсхолдер с типом жилья
    inputPrice.placeholder = typePriceMap[selectType.value];
    inputPrice.min = typePriceMap[selectType.value];
  };

  selectType.addEventListener('change', selectTypeChangeHandler);

  var selectTimeIn = document.querySelector('#timein');
  var selectTimeOut = document.querySelector('#timeout');

  var selectInChangeHandler = function () { // синхронизируем дату заезда и выезда
    for (var i = 0; i < selectTimeIn.length; i++) {
      if (selectTimeIn[i].selected) {
        selectTimeOut[i].selected = true;
      }
    }
  };

  var selectOutChangeHandler = function () { // синхронизируем дату заезда и выезда
    for (var i = 0; i < selectTimeOut.length; i++) {
      if (selectTimeOut[i].selected) {
        selectTimeIn[i].selected = true;
      }
    }
  };

  selectTimeIn.addEventListener('change', selectInChangeHandler);
  selectTimeOut.addEventListener('change', selectOutChangeHandler);

  var roomNumber = document.querySelector('#room_number');
  var guestNumber = document.querySelector('#capacity');

  var guestNumberMap = {
    1: [1],
    2: [1, 2],
    3: [1, 2, 3],
    100: [0]
  };

  var onSelectChangeHandler = function (evt) { // синхронизируем кол-во комнат с кол-вом мест
    for (var i = 0; i < guestNumber.length; i++) {
      guestNumber[i].disabled = true;
    }
    var currentValue = evt.target.value;
    var validValues = guestNumberMap[currentValue];

    for (var j = 0; j < validValues.length; j++) {
      for (var k = 0; k < guestNumber.children.length; k++) {
        if (Number(guestNumber.children[k].value) === validValues[j]) {
          guestNumber[k].disabled = false;
        }
      }
      guestNumber.value = validValues[j];
    }
  };

  roomNumber.addEventListener('change', onSelectChangeHandler);

  var makeStartPositionPin = function () { // ставим пин в изначальное положение
    window.data.mainPin.style.left = window.data.mainPinStartCoords.left + 'px';
    window.data.mainPin.style.top = window.data.mainPinStartCoords.top + 'px';
  };

  var disableFilters = function () { // отключаем фильтры
    for (var i = 0; i < filters.length; i++) {
      filters[i].disabled = true;
    }
  };

  var disableFormFields = function () { // отключаем поля формы
    for (var i = 0; i < fieldsets.length; i++) {
      fieldsets[i].disabled = true;
    }
  };

  var clearPhotos = function () {
    window.photoPreview.previewAvatar.children[0].src = DEFAULT_PHOTO_PREVIEW;
    var apartmentsPhoto = window.photoPreview.previewApartmentsBlock.querySelectorAll('img');
    if (apartmentsPhoto) {
      apartmentsPhoto.forEach(function (photo) {
        photo.remove();
      });
    }
  };

  var makeDefaultState = function () { // возвращаем страницу в изначальное состояние
    window.dnd.shouldRender = true;

    window.data.map.classList.add('map--faded');

    form.reset();

    form.classList.add('ad-form--disabled');

    window.pin.delete();

    window.card.delete();

    clearPhotos();

    makeStartPositionPin();

    window.data.address.value = Math.round(mainPinCoords.top + window.data.PinSizes.HEIGHT / 2) + ', ' + Math.round(mainPinCoords.left + window.data.PinSizes.WIDTH / 2);

    disableFilters();

    disableFormFields();

    headerUpload.disabled = true;
  };

  var onResetClickHandler = function () {
    makeDefaultState();
  };

  var onSuccess = function () {
    makeDefaultState();

    window.data.mainDocument.appendChild(successBlock);

    var onDocumentClickHandler = function () {
      successBlock.remove();
    };

    var onDocumentKeypressHandler = function () {
      if (window.utils.isEscPressed) {
        successBlock.remove();
      }
    };

    document.addEventListener('click', onDocumentClickHandler);
    document.addEventListener('keydown', onDocumentKeypressHandler);
  };

  var onError = function () {
    var errorBlock = templateError.cloneNode(true);
    window.data.mainDocument.appendChild(errorBlock);
    var closeButton = errorBlock.querySelector('.error__button');

    var onDocumentClickHandler = function () {
      errorBlock.remove();
    };

    var onDocumentKeypressHandler = function () {
      if (window.utils.isEscPressed) {
        errorBlock.remove();
      }
    };

    closeButton.addEventListener('click', function () {
      errorBlock.remove();
    });

    document.addEventListener('click', onDocumentClickHandler);
    document.addEventListener('keydown', onDocumentKeypressHandler);
  };

  filterForm.addEventListener('click', function (evt) {
    var target = evt.target;
    target.addEventListener('change', function () {
      window.filter.filtering(window.data.pins);
    });
  });

  form.addEventListener('submit', function (evt) {
    window.backend.upload(new FormData(form), onSuccess, onError);
    evt.preventDefault();
  });

  resetButton.addEventListener('click', onResetClickHandler);

  window.form = {
    defaultState: makeDefaultState
  };

})();
