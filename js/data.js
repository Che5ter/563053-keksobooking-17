'use strict';

(function () {
  var mainPin = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map');
  var mapPin = document.querySelector('.map__pins');
  var address = document.querySelector('#address');
  var mainDocument = document.querySelector('main');

  window.data = {
    PIN_NUMBER: 8, // количество объектов, которое нужно создать
    PinSizes: {
      WIDTH: 65,
      HEIGHT: 65
    },

    MapRestrictions: { // ограничения по высоте
      TOP: 130,
      BOTTOM: 630
    },
    map: map,
    address: address,
    mapPin: mapPin,
    mainPin: mainPin,
    mainDocument: mainDocument,
    mapWidth: map.offsetWidth, // ширина карты
    mainPinStartCoords: {
      left: 570,
      top: 375
    }
  };
})();
