'use strict';

var PIN_NUMBER = 8; // количество объектов, которое нужно создать
var appartments = ['palace', 'flat', 'house', 'bungalo']; // массив с видами жилья
var MapWidth = document.querySelector('.map').offsetWidth; // находим ширину блока .map
var templatePin = document.querySelector('#pin').content.querySelector('button');
var mapPin = document.querySelector('.map__pins');
var fragment = document.createDocumentFragment();

var makeOffer = function (massive, min, max) { // создает рандомный номер массива с видами жилья
  return massive[Math.floor(Math.random() * (max - min)) + min];
};

var makeRandomNum = function (min, max) { // создает рандомное число в диапазоне min - max
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
};

var objArray = []; // массив куда будем записывать сгенерированные объекты

var pins = {
  generateObjectives: function () {

    for (var i = 0; i < PIN_NUMBER; i++) { // генерируем объекты и пушим их в массив objArray
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
  },
  createElements: function () {
    for (var i = 0; i < objArray.length; i++) {
      var element = templatePin.cloneNode(true);
      element.style.left = objArray[i].location.x - 25 + 'px';
      element.style.top = objArray[i].location.y - 70 + 'px';
      element.querySelector('img').src = objArray[i].author.avatar;
      element.querySelector('img').alt = 'заголовок объявления';
      fragment.appendChild(element);
    }
  },
  addFragment: function (element) {
    element.appendChild(fragment);
  }
};

var mainPin = document.querySelector('.map__pin--main');
mainPin.addEventListener('click', function () {
  var map = document.querySelector('.map');
  map.classList.remove('map--faded');
  var form = document.querySelector('.ad-form');
  form.classList.remove('ad-form--disabled');
  var fieldsets = document.querySelectorAll('fieldset');
  for (var i = 0; i < fieldsets.length; i++) {
    fieldsets[i].disabled = false;
  }
  var headerUpload = document.querySelector('.ad-form-header__input');
  headerUpload.disabled = false;
  var filters = document.querySelectorAll('.map__filter');
  for (var i = 0; i < filters.length; i++) {
    filters[i].disabled = false;
  }
});

mainPin.addEventListener('mouseup', function () {
  var adress = document.querySelector('#address');
  adress.value = 'kek';
})
