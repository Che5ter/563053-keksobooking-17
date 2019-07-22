'use strict';

(function () {
  var mainPin = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map');
  var mapPin = document.querySelector('.map__pins');
  var adress = document.querySelector('#address');
  var mainDocument = document.querySelector('main');

  window.data = {
    PIN_NUMBER: 8, // количество объектов, которое нужно создать
    pinSizes: {
      WIDTH: 65,
      HEIGHT: 65
    },
    MainPinSizes: { // размеры большого пина
      WIDTH: 156,
      HEIGHT: 156
    },
    MapRestrictions: { // ограничения по высоте
      TOP: 130,
      BOTTOM: 630
    },
    map: map,
    adress: adress,
    mapPin: mapPin,
    mainPin: mainPin,
    mainDocument: mainDocument,
    mapWidth: map.offsetWidth, // ширина карты
  };
})();
