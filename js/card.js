'use strict';
(function () {
  var templateCard = document.querySelector('#card').content.querySelector('.map__card');
  var filters = document.querySelector('.map__filters-container');

  var typeAccommodation = { // для перевода слов
    'bungalo': 'Бунгало',
    'flat': 'Квартира',
    'house': 'Дом',
    'palace': 'Дворец'
  };

  var showCard = function (obj) {
    var card = createCard(obj);
    window.data.map.insertBefore(card, filters);
  };

  var createCard = function (obj) { // создаем и отрисовываем карточку
    var card = templateCard.cloneNode(true);
    card.querySelector('.popup__title').textContent = obj.offer.title;
    card.querySelector('.popup__text--address').textContent = obj.offer.address;
    card.querySelector('.popup__text--price').textContent = obj.offer.price + '₽/ночь';
    card.querySelector('.popup__type').textContent = typeAccommodation[obj.offer.type];
    card.querySelector('.popup__text--capacity').textContent = obj.offer.rooms + ' комнаты для ' + obj.offer.guests + ' гостей';
    card.querySelector('.popup__text--time').textContent = 'Заезд после ' + obj.offer.checkin + ' до ' + obj.offer.checkout;
    var featuresList = card.querySelector('.popup__features ');
    for (var i = 0; i < featuresList.childElementCount; i++) {
      switch (obj.offer.features[i]) {
        case 'wifi': featuresList.children[0].textContent = 'wifi';
          break;
        case 'dishwasher': featuresList.children[1].textContent = 'dishwasher';
          break;
        case 'parking': featuresList.children[2].textContent = 'parking';
          break;
        case 'washer': featuresList.children[3].textContent = 'washer';
          break;
        case 'elevator': featuresList.children[4].textContent = 'elevator';
          break;
        case 'conditioner': featuresList.children[5].textContent = 'conditioner';
          break;
      }
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
      if (evt.keyCode === 27) {
        closePopup();
      }
    };

    var closePopup = function () {
      card.classList.add('hidden');
    };

    document.addEventListener('keydown', onPopupEscHandler);

    popupClose.addEventListener('click', function () {
      closePopup();
      document.removeEventListener('keydown', onPopupEscHandler);
    });

    return card;
  };

  var deleteCard = function () {
    if (document.querySelector('.map__card')) {
      var card = document.querySelector('.map__card');
      card.parentNode.removeChild(card);
    }
    return;
  };

  window.card = {
    show: showCard,
    deleteCard: deleteCard
  };

})();
