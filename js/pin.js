'use strict';
(function () {
  var templatePin = document.querySelector('#pin').content.querySelector('button');
  var fragment = document.createDocumentFragment();
  var templateError = document.querySelector('#error').content.querySelector('.error');

  var PinInfo = {
    MAX_PIN_NUMBER: 5,
    PIN_WIDTH: 50,
    PIN_HEIGHT: 70
  };

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


  var createElementsPin = function (initialArray, el) { // создаем и отрисовываем пины на страницу
    deletePins();
    window.card.delete();
    var objArray = initialArray.slice(0, PinInfo.MAX_PIN_NUMBER);
    for (var i = 0; i < objArray.length; i++) {
      var element = templatePin.cloneNode(true);
      element.style.left = objArray[i].location.x - PinInfo.PIN_WIDTH / 2 + 'px';
      element.style.top = objArray[i].location.y - PinInfo.PIN_HEIGHT + 'px';
      element.classList.add('generated-pin');
      element.querySelector('img').src = objArray[i].author.avatar;
      element.querySelector('img').alt = 'заголовок объявления';
      onPinClickHandler(objArray[i], element);
      fragment.appendChild(element);
    }
    addFragmentPin(el);
  };

  var createErrorBlockPin = function () {
    var element = templateError.cloneNode(true);
    element.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: black;';
    element.style.position = 'absolute';
    element.style.left = 0;
    element.style.right = 0;
    element.style.fontSize = '30px';
    var refresh = element.querySelector('.error__button');
    refresh.addEventListener('click', window.form.defaultState);
    refresh.addEventListener('click', function () {
      element.remove();
    });
    fragment.appendChild(element);
  };

  var addFragmentPin = function (element) {
    element.appendChild(fragment);
  };

  var onSuccessPin = function (data) {
    window.data.pins = data;
    createElementsPin(data, window.data.mapPin);
    window.map.openFilter();
  };

  var onErrorPin = function () {
    createErrorBlockPin();
    addFragmentPin(window.data.mainDocument);
  };

  window.pin = {
    onSuccess: onSuccessPin,
    onError: onErrorPin,
    createErrorBlock: createErrorBlockPin,
    addFragment: addFragmentPin,
    createElements: createElementsPin,
    delete: deletePins
  };

})();
