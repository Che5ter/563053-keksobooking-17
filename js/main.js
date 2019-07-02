'use strict';

var PIN_NUMBER = 8; // количество объектов, которое нужно создать
var MainPinSizes = { // размеры большого пина
  width: 156,
  height: 156
};
var shouldRenderPins = true;
var appartments = ['palace', 'flat', 'house', 'bungalo']; // массив с видами жилья
var map = document.querySelector('.map');
var mapWidth = map.offsetWidth;
var templatePin = document.querySelector('#pin').content.querySelector('button');
var mapPin = document.querySelector('.map__pins');
var fragment = document.createDocumentFragment();

var makeOffer = function (massive, min, max) { // создает рандомный номер массива с видами жилья
  return massive[makeRandomNum(min, max)];
};

var makeRandomNum = function (min, max) { // создает рандомное число в диапазоне min - max
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
};

var generateObjectives = function () {
  var tempArray = [];
  for (var i = 0; i < PIN_NUMBER; i++) { // генерируем объекты и пушим их в массив objArray
    var somePin = {
      'author': {
        'avatar': 'img/avatars/user0' + (i + 1) + '.png'
      },
      'offer': {
        'type': makeOffer(appartments, 0, appartments.length - 1)
      },
      'location': {
        'x': makeRandomNum(0, mapWidth),
        'y': makeRandomNum(130, 630)
      }
    };
    tempArray.push(somePin);
  }
  return tempArray;
};

var objArray = generateObjectives(); // массив куда будем записывать сгенерированные объекты

var createElements = function () {
  for (var i = 0; i < objArray.length; i++) {
    var element = templatePin.cloneNode(true);
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

var mainPin = document.querySelector('.map__pin--main');

var openMap = function () {
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
  for (i = 0; i < filters.length; i++) {
    filters[i].disabled = false;
  }
};

var onMainPinMousedownHandler = function () { // делает доступной карту и форму + отрисовывает пины
  openMap();
  if (shouldRenderPins) {
    generateObjectives();
    createElements();
    addFragment(mapPin);
    shouldRenderPins = false;
  }
};

 // mainPin.addEventListener('click', onMainPinClickHandler); // убираем disabled у всех полей форм

mainPin.addEventListener('mousedown', function(evt) {
  openMap();
  if (shouldRenderPins) {
    generateObjectives();
    createElements();
    addFragment(mapPin);
    shouldRenderPins = false;
  }

  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  var onMainPinMousemoveHandler = function (moveEvt) {
    moveEvt.preventDefault();
    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
    mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
  };

  var onMainPinMouseupHandler = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMainPinMousemoveHandler);
    document.removeEventListener('mouseup', onMainPinMouseupHandler);
  };

  document.addEventListener('mousemove', onMainPinMousemoveHandler);
  document.addEventListener('mouseup', onMainPinMouseupHandler);
});

function getCoords(elem) { // находим координаты элемента на странице
  var box = elem.getBoundingClientRect();
  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
  };
}

var pinBox = mainPin.children[1]; // находим большой пин

var adress = document.querySelector('#address');
var mainPinCoords = getCoords(pinBox);
adress.value = Math.round(mainPinCoords.top + MainPinSizes.height / 2) + ',' + Math.round(mainPinCoords.left + MainPinSizes.width / 2); // добавляем координаты центра большого пина в поле адрес

mainPin.addEventListener('mouseup', function () {
});

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
