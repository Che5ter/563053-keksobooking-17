'use strict';
(function () {

  var pinBox = window.data.mainPin.children[1]; // находим большой пин


  var mainPinCoords = window.data.getCoords(pinBox);
  window.data.adress.value = Math.round(mainPinCoords.top + window.data.MainPinSizes.HEIGHT / 2) + ',' + Math.round(mainPinCoords.left + window.data.MainPinSizes.WIDTH / 2); // добавляем координаты центра большого пина в поле адрес


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

  selectTimeIn.addEventListener('change', selectInChangeHandler); // наверно есть более простая логика для реализации, хотелось бы узнать, какая :)
  selectTimeOut.addEventListener('change', selectOutChangeHandler);
})();
