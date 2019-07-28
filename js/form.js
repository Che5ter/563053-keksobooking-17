'use strict';
(function () {

  var pinBox = window.data.mainPin.children[1]; // находим большой пин


  var mainPinCoords = window.utils.getCoords(pinBox);
  window.data.adress.value = Math.round(mainPinCoords.top + window.data.MainPinSizes.HEIGHT / 2) + ', ' + Math.round(mainPinCoords.left + window.data.MainPinSizes.WIDTH / 2); // добавляем координаты центра большого пина в поле адрес


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

  var onSelectChangeHandler = function (evt) { // добавляем проверку соответствия кол-во комнат - кол-во мест
    switch (evt.target.value) {
      case '100': guestNumber.options[3].selected = true;
        for (var i = 0; i < guestNumber.options.length; i++) {
          if (guestNumber.options[i].value === '0') {
            guestNumber.options[i].disabled = false;
          } else {
            guestNumber.options[i].disabled = true;
          }
        }
        break;
      case '1': guestNumber.options[2].selected = true;
        for (i = 0; i < guestNumber.options.length; i++) {
          if (guestNumber.options[i].value === '1') {
            guestNumber.options[i].disabled = false;
          } else {
            guestNumber.options[i].disabled = true;
          }
        }
        break;
      case '2': guestNumber.options[1].selected = true;
        for (i = 0; i < guestNumber.options.length; i++) {
          if (guestNumber.options[i].value === '1' || guestNumber.options[i].value === '2') {
            guestNumber.options[i].disabled = false;
          } else {
            guestNumber.options[i].disabled = true;
          }
        }
        break;
      case '3': guestNumber.options[0].selected = true;
        for (i = 0; i < guestNumber.options.length; i++) {
          if (guestNumber.options[i].value === '1' || guestNumber.options[i].value === '2' || guestNumber.options[i].value === '3') {
            guestNumber.options[i].disabled = false;
          } else {
            guestNumber.options[i].disabled = true;
          }
        }
        break;
    }
  };

  roomNumber.addEventListener('change', onSelectChangeHandler);

})();
