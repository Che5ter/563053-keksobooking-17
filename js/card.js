'use strict';
(function () {
  var templateCard = document.querySelector('#card').content.querySelector('.map__card');
  var filters = document.querySelector('.map__filters-container');

  var typeAccommodationMap = { // для перевода слов
    'bungalo': 'Бунгало',
    'flat': 'Квартира',
    'house': 'Дом',
    'palace': 'Дворец'
  };

  var showCard = function (obj) {
    var card = createCard(obj);
    window.data.map.insertBefore(card, filters);
  };

  var createCard = function (obj) { // создаем карточку
    var element = templateCard.cloneNode(true);
    element.querySelector('.popup__title').textContent = obj.offer.title;
    element.querySelector('.popup__text--address').textContent = obj.offer.address;
    element.querySelector('.popup__text--price').textContent = obj.offer.price + '₽/ночь';
    element.querySelector('.popup__type').textContent = typeAccommodationMap[obj.offer.type];
    element.querySelector('.popup__text--capacity').textContent = obj.offer.rooms + ' комнаты для ' + obj.offer.guests + ' гостей';
    element.querySelector('.popup__text--time').textContent = 'Заезд после ' + obj.offer.checkin + ' до ' + obj.offer.checkout;
    var featuresList = element.querySelector('.popup__features ');

    featuresList.innerHTML = '';
    for (var i = 0; i < obj.offer.features.length; i++) {
      var li = document.createElement('li');
      li.classList.add('popup__feature');
      li.classList.add('popup__feature--' + obj.offer.features[i]);
      featuresList.appendChild(li);
    }

    element.querySelector('.popup__description ').textContent = obj.offer.description;
    var photoBlock = element.querySelector('.popup__photos');
    var photo = photoBlock.querySelector('img');
    var clonePhoto = photo.cloneNode();
    photoBlock.removeChild(photo);
    for (i = 0; i < obj.offer.photos.length; i++) {
      var newPhoto = clonePhoto.cloneNode();
      newPhoto.src = obj.offer.photos[i];
      photoBlock.appendChild(newPhoto);
    }
    element.querySelector('.popup__avatar').src = obj.author.avatar;

    var popupClose = element.querySelector('.popup__close');

    var onPopupEscHandler = function () {
      if (window.utils.isEscPressed) {
        deleteCard();
      }
    };

    document.addEventListener('keydown', onPopupEscHandler);

    popupClose.addEventListener('click', function () {
      deleteCard();
      document.removeEventListener('keydown', onPopupEscHandler);
    });

    return element;
  };

  var deleteCard = function () {
    if (document.querySelector('.map__card')) {
      var card = document.querySelector('.map__card');
      card.remove();
    }
  };

  window.card = {
    show: showCard,
    delete: deleteCard
  };

})();
