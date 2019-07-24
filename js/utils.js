'use strict';

(function () {

  window.utils = {
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
