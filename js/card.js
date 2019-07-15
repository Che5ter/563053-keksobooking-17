'use strict';
(function () {
  // var appartments = ['palace', 'flat', 'house', 'bungalo']; // массив с видами жилья
  var templatePin = document.querySelector('#pin').content.querySelector('button');
  var fragment = document.createDocumentFragment();
  var templateError = document.querySelector('#error').content.querySelector('.error');

  /* var generateObjectives = function () {
    var tempArray = [];
    for (var i = 0; i < window.data.PIN_NUMBER; i++) { // генерируем объекты и пушим их в массив objArray
      var somePin = {
        'author': {
          'avatar': 'img/avatars/user0' + (i + 1) + '.png'
        },
        'offer': {
          'type': window.data.getRandomValuefromArray(appartments)
        },
        'location': {
          'x': window.data.makeRandomNum(0, window.data.mapWidth),
          'y': window.data.makeRandomNum(window.data.MapRestrictions.TOP, window.data.MapRestrictions.BOTTOM)
        }
      };
      tempArray.push(somePin);
    }
    return tempArray;
  }; */

  // var objArray = generateObjectives(); // массив куда будем записывать сгенерированные объекты

  var createElements = function (objArray) {
    for (var i = 0; i < objArray.length; i++) {
      var element = templatePin.cloneNode(true);
      element.style.left = objArray[i].location.x - 25 + 'px';
      element.style.top = objArray[i].location.y - 70 + 'px';
      element.querySelector('img').src = objArray[i].author.avatar;
      element.querySelector('img').alt = 'заголовок объявления';
      fragment.appendChild(element);
    }
  };

  var createErrorBlock = function () {
    var node = templateError.cloneNode(true);
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: black;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    fragment.appendChild(node);
  };

  var addFragment = function (element) {
    element.appendChild(fragment);
  };

  var onSuccess = function (data) {
    createElements(data);
    addFragment(window.data.mapPin);
  };

  var onError = function () {
    createErrorBlock();
    addFragment(window.data.mainDocument);
  };

  window.card = {
    // generateObjectives: generateObjectives,
    // objArray: objArray,
    onSuccess: onSuccess,
    onError: onError
  };
})();
