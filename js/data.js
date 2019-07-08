'use strict';

(function () {
  var mainPin = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map');
  var mapPin = document.querySelector('.map__pins');
  var adress = document.querySelector('#address');

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
    mapWidth: map.offsetWidth, // ширина карты
    makeRandomNum: function (min, max) { // создает рандомное число в диапазоне min - max
      var rand = min + Math.random() * (max + 1 - min);
      rand = Math.floor(rand);
      return rand;
    },
    getRandomValuefromArray: function (arr) {
      return arr[this.makeRandomNum(0, arr.length - 1)];
    },
    getCoords: function (elem) { // находим координаты элемента на странице
      var box = elem.getBoundingClientRect();
      return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
      };
    }
  };
})();
