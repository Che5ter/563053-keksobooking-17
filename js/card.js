'use strict';
(function () {
  var templateCard = document.querySelector('#card').content.querySelector('.map__card');
  var filters = document.querySelector('.map__filters-container');
  var ESC_KEY = 27;

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
    var card = templateCard.cloneNode(true);
    card.querySelector('.popup__title').textContent = obj.offer.title;
    card.querySelector('.popup__text--address').textContent = obj.offer.address;
    card.querySelector('.popup__text--price').textContent = obj.offer.price + '₽/ночь';
    card.querySelector('.popup__type').textContent = typeAccommodationMap[obj.offer.type];
    card.querySelector('.popup__text--capacity').textContent = obj.offer.rooms + ' комнаты для ' + obj.offer.guests + ' гостей';
    card.querySelector('.popup__text--time').textContent = 'Заезд после ' + obj.offer.checkin + ' до ' + obj.offer.checkout;
    var featuresList = card.querySelector('.popup__features ');

    featuresList.innerHTML = '';
    for (var i = 0; i < obj.offer.features.length; i++) {
      var li = document.createElement('li');
      li.classList.add('popup__feature');
      li.classList.add('popup__feature--' + obj.offer.features[i]);
      featuresList.appendChild(li);
    }

    card.querySelector('.popup__description ').textContent = obj.offer.description;
    var photoBlock = card.querySelector('.popup__photos');
    var photo = photoBlock.querySelector('img');
    var clonePhoto = photo.cloneNode();
    photoBlock.removeChild(photo);
    for (i = 0; i < obj.offer.photos.length; i++) {
      var newPhoto = clonePhoto.cloneNode();
      newPhoto.src = obj.offer.photos[i];
      photoBlock.appendChild(newPhoto);
    }
    card.querySelector('.popup__avatar').src = obj.author.avatar;

    var popupClose = card.querySelector('.popup__close');

    var onPopupEscHandler = function (evt) {
      if (evt.keyCode === ESC_KEY) {
        deleteCard();
      }
    };

    document.addEventListener('keydown', onPopupEscHandler);

    popupClose.addEventListener('click', function () {
      deleteCard();
      document.removeEventListener('keydown', onPopupEscHandler);
    });

    return card;
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
