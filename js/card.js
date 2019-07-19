'use strict';
(function () {
  // var appartments = ['palace', 'flat', 'house', 'bungalo']; // массив с видами жилья
  var templatePin = document.querySelector('#pin').content.querySelector('button');
  var fragment = document.createDocumentFragment();
  var templateError = document.querySelector('#error').content.querySelector('.error');
  var pins = [];

  var updatePins = function () {
    var sameTypeFlat = pins.filter(function (it) {
      return it.type === 'flat';
    });
    var sameTypeBungalo = pins.filter(function (it) {
      return it.type === 'bungalo';
    });
    var sameTypeHouse = pins.filter(function (it) {
      return it.type === 'house';
    });
    createElements()
  };

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
    pins = data.slice(0, 5);
    createElements(pins);
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
