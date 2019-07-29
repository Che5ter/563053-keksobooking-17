'use strict';
(function () {

  var mainPinCoords = window.utils.getCoords(window.data.mainPin);
  window.data.adress.value = Math.round(mainPinCoords.top + window.data.pinSizes.HEIGHT / 2) + ', ' + Math.round(mainPinCoords.left + window.data.pinSizes.WIDTH / 2); // добавляем координаты центра большого пина в поле адрес
  var templateSuccess = document.querySelector('#success').content.querySelector('.success');
  var templateError = document.querySelector('#error').content.querySelector('.error');
  var ESC_KEY = 27;

  var selectType = document.querySelector('#type');
  var inputPrice = document.querySelector('#price');

  var typePriceMap = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };

  var selectTypeChangeHandler = function () {
    inputPrice.placeholder = typePriceMap[selectType.value];
    inputPrice.min = typePriceMap[selectType.value];
  };

  selectType.addEventListener('change', selectTypeChangeHandler);

  var selectTimeIn = document.querySelector('#timein');
  var selectTimeOut = document.querySelector('#timeout');

  var selectInChangeHandler = function () {
    for (var i = 0; i < selectTimeIn.length; i++) {
      if (selectTimeIn[i].selected) {
        selectTimeOut[i].selected = true;
      }
    }
  };

  var selectOutChangeHandler = function () {
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

  var onSelectChangeHandler = function (evt) {
    for (var i = 0; i < guestNumber.length; i++) {
      guestNumber[i].disabled = true;
    }
    var currentValue = evt.target.value;
    var validValues = guestNumberMap[currentValue];

    for (var j = 0; j < validValues.length; j++) {
      // guestNumber.querySelector(`option[value="${validValues[j]}"]`).disabled = false;
      for (var k = 0; k < guestNumber.children.length; k++) {
        if (Number(guestNumber.children[k].value) === validValues[j]) {
          guestNumber[k].disabled = false;
        }
      }
      guestNumber.value = validValues[j];
    }
  };

  roomNumber.addEventListener('change', onSelectChangeHandler);

  var onSuccess = function () {
    window.data.map.classList.add('map--faded');
    form.reset();
    form.classList.add('ad-form--disabled');
    var pins = document.querySelectorAll('.generated-pin');
    pins.forEach(function (element) {
      element.remove();
    });
    var card = document.querySelector('.map__card');
    if (card) {
      card.remove();
    }
    window.data.mainPin.style.left = window.data.mainPinStartCoords.left + 'px';
    window.data.mainPin.style.top = window.data.mainPinStartCoords.top + 'px';
    window.data.adress.value = Math.round(mainPinCoords.top + window.data.pinSizes.HEIGHT / 2) + ', ' + Math.round(mainPinCoords.left + window.data.pinSizes.WIDTH / 2);

    var filters = document.querySelectorAll('.map__filter');
    for (var i = 0; i < filters.length; i++) {
      filters[i].disabled = true;
    }

    var fieldsets = document.querySelectorAll('fieldset');
    for (i = 0; i < fieldsets.length; i++) {
      fieldsets[i].disabled = true;
    }
    var headerUpload = document.querySelector('.ad-form-header__input');
    headerUpload.disabled = true;

    var successBlock = templateSuccess.cloneNode(true);
    window.data.mainDocument.appendChild(successBlock);

    var onDocumentClickHandler = function () {
      successBlock.remove();
      document.removeEventListener('onDocumentClickHandler');
      document.removeEventListener('onDocumentKeypressHandler');
    };

    var onDocumentKeypressHandler = function (evt) {
      if (evt.keyCode === ESC_KEY) {
        successBlock.remove();
        document.removeEventListener('onDocumentKeypressHandler');
        document.removeEventListener('onDocumentClickHandler');
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
      document.removeEventListener('onDocumentClickHandler');
      document.removeEventListener('onDocumentKeypressHandler');
    };

    var onDocumentKeypressHandler = function (evt) {
      if (evt.keyCode === ESC_KEY) {
        errorBlock.remove();
        document.removeEventListener('onDocumentKeypressHandler');
        document.removeEventListener('onDocumentClickHandler');
      }
    };

    closeButton.addEventListener('click', function () {
      errorBlock.remove();
    });

    document.addEventListener('click', onDocumentClickHandler);
    document.addEventListener('keydown', onDocumentKeypressHandler);
  };

  var form = document.querySelector('.ad-form');

  form.addEventListener('submit', function (evt) {
    window.upload(new FormData(form), onSuccess, onError);
    evt.preventDefault();
  });

})();
