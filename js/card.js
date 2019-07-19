'use strict';
(function () {
  // var appartments = ['palace', 'flat', 'house', 'bungalo']; // массив с видами жилья
  var templatePin = document.querySelector('#pin').content.querySelector('button');
  var fragment = document.createDocumentFragment();
  var templateError = document.querySelector('#error').content.querySelector('.error');
  var pins = [];
  var housingType = document.querySelector('#housing-type');
  var firstPins = [];

  var updatePins = function (element) {
    var sameType = pins.filter(function (it) {
      return it.offer.type === element;
    });
    deletePins();
    createElements(sameType, window.data.mapPin);
  };

  var deletePins = function () {
    var allPins = document.querySelectorAll('.generated-pin');
    console.log(allPins);
  };

  housingType.addEventListener('change', function (evt) {
    if (evt.target.options[0].selected) {
      createElements(pins, window.data.mapPin);
    } else if (evt.target.options[2].selected) {
      updatePins('flat');
    } else if (evt.target.options[3].selected) {
      updatePins('house');
    } else if (evt.target.options[4].selected) {
      updatePins('bungalo');
    }
  });

  var createElements = function (objArray, el) {
    for (var i = 0; i < objArray.length; i++) {
      var element = templatePin.cloneNode(true);
      element.style.left = objArray[i].location.x - 25 + 'px';
      element.style.top = objArray[i].location.y - 70 + 'px';
      element.classList.add('generated-pin');
      element.querySelector('img').src = objArray[i].author.avatar;
      element.querySelector('img').alt = 'заголовок объявления';
      fragment.appendChild(element);
    }
    addFragment(el);
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
    pins = data;
    firstPins = data.slice(0, 5);
    createElements(firstPins, window.data.mapPin);
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
