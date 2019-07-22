'use strict';
(function () {
  var templatePin = document.querySelector('#pin').content.querySelector('button');
  var fragment = document.createDocumentFragment();
  var templateError = document.querySelector('#error').content.querySelector('.error');
  var housingType = document.querySelector('#housing-type');
  var firstPins = [];

  var updatePins = function (element) { // функция для обновления пинов на странице при фильтрации
    var sameType = window.pin.pins.filter(function (it) {
      return it.offer.type === element;
    });
    sameType = sameType.slice(0, 5);
    deletePins('.generated-pin');
    createElements(sameType, window.data.mapPin);
  };

  var deletePins = function (someArray) { // функция для удаления пинов на странице
    var allPins = document.querySelectorAll(someArray);
    allPins.forEach(function (element) {
      element.parentNode.removeChild(element);
    });
  };

  var onSectionChangeHandler = function (evt) {
    if (evt.target.options[0].selected) {
      deletePins('.generated-pin');
      createElements(firstPins, window.data.mapPin);
    } else if (evt.target.options[1].selected) {
      updatePins('palace');
    } else if (evt.target.options[2].selected) {
      updatePins('flat');
    } else if (evt.target.options[3].selected) {
      updatePins('house');
    } else if (evt.target.options[4].selected) {
      updatePins('bungalo');
    }
  };

  housingType.addEventListener('change', onSectionChangeHandler);// отлавливаем событие изменения на section и отображаем соответствующие пины

  var createElements = function (objArray, el) { // создаем и отрисовываем пины на страницу
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
    window.pin.pins = data;
    firstPins = data.slice(0, 5);
    createElements(firstPins, window.data.mapPin);
  };

  var onError = function () {
    createErrorBlock();
    addFragment(window.data.mainDocument);
  };

  window.pin = {
    onSuccess: onSuccess,
    onError: onError,
    createErrorBlock: createErrorBlock,
    addFragment: addFragment
  };
})();
