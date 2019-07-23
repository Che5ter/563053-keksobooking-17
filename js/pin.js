'use strict';
(function () {
  var templatePin = document.querySelector('#pin').content.querySelector('button');
  var fragment = document.createDocumentFragment();
  var templateError = document.querySelector('#error').content.querySelector('.error');
  var housingType = document.querySelector('#housing-type');
  var MAX_PIN_NUMBER = 5;

  var updatePins = function (element) { // функция для обновления пинов на странице при фильтрации
    var sameType = window.data.pins.filter(function (it) {
      return it.offer.type === element;
    });
    deletePins();
    createElements(sameType, window.data.mapPin);
  };

  var deletePins = function () { // функция для удаления пинов на странице
    var allPins = document.querySelectorAll('.generated-pin');
    allPins.forEach(function (element) {
      element.parentNode.removeChild(element);
    });
  };

  var onSectionChangeHandler = function (evt) {
    if (evt.target.options[0].selected) {
      deletePins();
      createElements(window.data.pins, window.data.mapPin);
    } else {
      updatePins(evt.target.value);
    }
  };

  housingType.addEventListener('change', onSectionChangeHandler);// отлавливаем событие изменения на section и отображаем соответствующие пины

  window.data.mapPin.addEventListener('click', function (evt) {
    var target = evt.target;

    while (target !== window.data.mapPin) {
      if (target.classList.contains('generated-pin')) {
        console.log(target.dataset.user);
        if (target.dataset.user === 0) {
          window.card.createCard(window.data.pins[0]);
          return;
        } else if (target.dataset.user === 1) {
          window.card.createCard(window.data.pins[1]);
          return;
        }
      }
      target = target.parentNode;
    }

  });


  var createElements = function (initialArray, el) { // создаем и отрисовываем пины на страницу
    var objArray = initialArray.slice(0, MAX_PIN_NUMBER);

    for (var i = 0; i < objArray.length; i++) {
      var element = templatePin.cloneNode(true);
      element.style.left = objArray[i].location.x - 25 + 'px';
      element.style.top = objArray[i].location.y - 70 + 'px';
      element.classList.add('generated-pin');
      element.querySelector('img').src = objArray[i].author.avatar;
      element.querySelector('img').alt = 'заголовок объявления';
      element.dataset.user = i;
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
    window.data.firstCard = window.data.pins.shift();
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
    addFragment: addFragment
  };

})();
