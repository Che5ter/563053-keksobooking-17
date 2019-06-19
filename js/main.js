'use strict';

var OBJNUM = 8; // количество объектов, которое нужно создать
var appartments = ['palace', 'flat', 'house', 'bungalo']; // массив с видами жилья
var MapWidth = document.querySelector('.map').offsetWidth; // находим ширину блока .map

var makeOffer = function (massive, min, max) { // создает рандомный номер массива с видами жилья
  return massive[Math.floor(Math.random() * (max - min)) + min];
};

var makeRandomNum = function (min, max) { // создает рандомное число в диапазоне min - max
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
};

var objArray = []; // массив куда будем записывать сгенерированные объекты

for (var i = 0; i < OBJNUM; i++) { // генерируем объекты и пушим их в массив objArray
  var somePin = {
    'author': {
      'avatar': 'img/avatars/user0' + (i + 1) + '.png'
    },
    'offer': {
      'type': makeOffer(appartments, 0, appartments.length - 1)
    },

    'location': {
      'x': makeRandomNum(0, MapWidth),
      'y': makeRandomNum(130, 630)
    }
  };
  objArray.push(somePin);
}