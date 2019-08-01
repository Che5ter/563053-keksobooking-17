'use strict';
(function () {
  var templatePin = document.querySelector('#pin').content.querySelector('button');
  var fragment = document.createDocumentFragment();
  var templateError = document.querySelector('#error').content.querySelector('.error');
  var MAX_PIN_NUMBER = 5;
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  var deletePins = function () { // функция для удаления пинов на странице
    var allPins = document.querySelectorAll('.generated-pin');
    allPins.forEach(function (element) {
      element.remove();
    });
  };

  var onPinClickHandler = function (obj, element) { // передаем в создание карточки объект, из которого будем брать информацию
    element.addEventListener('click', function () {
      var previusElement = document.querySelector('.map__pin--active');
      if (previusElement) {
        previusElement.classList.remove('map__pin--active');
      }
      window.card.delete();
      window.card.show(obj);
      element.classList.add('map__pin--active');
    });
  };


  var createElements = function (initialArray, el) { // создаем и отрисовываем пины на страницу
    deletePins();
    window.card.delete();
    var objArray = initialArray.slice(0, MAX_PIN_NUMBER);
    for (var i = 0; i < objArray.length; i++) {
      var element = templatePin.cloneNode(true);
      element.style.left = objArray[i].location.x - PIN_WIDTH / 2 + 'px';
      element.style.top = objArray[i].location.y - PIN_HEIGHT + 'px';
      element.classList.add('generated-pin');
      element.querySelector('img').src = objArray[i].author.avatar;
      element.querySelector('img').alt = 'заголовок объявления';
      onPinClickHandler(objArray[i], element);
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
    window.data.pins = data;
    createElements(data, window.data.mapPin);
  };

  var onError = function () {
    createErrorBlock();
    addFragment(window.data.mainDocument);
  };

  window.pin = {
    onSuccess: onSuccess,
    onError: onError,
    createErrorBlock: createErrorBlock,
    addFragment: addFragment,
    createElements: createElements,
    deletePins: deletePins
  };

})();
