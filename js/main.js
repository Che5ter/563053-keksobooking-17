'use strict';

var OBJNUM = 8; // количество объектов, которое нужно создать
var appartments = ['palace', 'flat', 'house', 'bungalo']; // массив с видами жилья
var MapWidth = document.querySelector('.map').offsetWidth; // находим ширину блока .map
var map = document.querySelector('.map');

map.classList.remove('map--faded');

var makeOffer = function (massive, min, max) { // создает рандомный номер массива с видами жилья
  return massive[Math.floor(Math.random() * (max - min)) + min];
};

var makeRandomNum = function (min, max) { // создает рандомное число в диапазоне min - max
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
};

var objArray = []; // массив куда будем записывать сгенерированные объекты

var generateObjectives = function (quantity) {

  for (var i = 0; i < quantity; i++) { // генерируем объекты и пушим их в массив objArray
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
};


var templatePin = document.querySelector('#pin').content.querySelector('button');
var mapPin = document.querySelector('.map__pins');
var fragment = document.createDocumentFragment();

var createElements = function () {
  for (var i = 0; i < objArray.length; i++) {
    var element = templatePin.cloneNode(true);
    var computedStyle = getComputedStyle(element); // не дает результата
    var pinWidth = computedStyle.maxWidth; // не дает результата
    var pinHeight = computedStyle.height; // не дает результата
    element.style.left = objArray[i].location.x - 25 + 'px';
    element.style.top = objArray[i].location.y - 70 + 'px';
    element.querySelector('img').src = objArray[i].author.avatar;
    element.querySelector('img').alt = 'заголовок объявления';
    fragment.appendChild(element);
  }
};

var addFragment = function (element) {
  element.appendChild(fragment);
};

generateObjectives(OBJNUM);
createElements();
addFragment(mapPin);
