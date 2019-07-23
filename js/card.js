'use strict';
(function () {
  var templateCard = document.querySelector('#card').content.querySelector('.map__card');
  var filters = document.querySelector('.map__filters-container');

  var onSuccess = function (data) {
    window.card.cards = data;
    window.card.firstCard = window.card.cards.shift();
  };

  var onError = function () {
    window.pin.createErrorBlock();
    window.pin.addFragment(window.data.mainDocument);
  };

  window.load(onSuccess, onError);

  var typeAccommodation = { // для перевода слов
    'bungalo': 'Бунгало',
    'flat': 'Квартира',
    'house': 'Дом',
    'palace': 'Дворец'
  };

  var createCard = function (obj) { // создаем и отрисовываем карточку
    var card = templateCard.cloneNode(true);
    console.log(window.data.pins);
    card.querySelector('.popup__title').textContent = obj.offer.title;
    card.querySelector('.popup__text--address').textContent = obj.offer.address;
    card.querySelector('.popup__text--price').textContent = obj.offer.price + '₽/ночь';
    card.querySelector('.popup__type').textContent = typeAccommodation[obj.offer.type];
    card.querySelector('.popup__text--capacity').textContent = obj.offer.rooms + ' комнаты для ' + obj.offer.guests + ' гостей';
    card.querySelector('.popup__text--time').textContent = 'Заезд после ' + obj.offer.checkin + ' до ' + obj.offer.checkout;
    var features = card.querySelector('.popup__features ');
    for (var i = 0; i < features.childElementCount; i++) {
      features.children[i].textContent = obj.offer.features[i];
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
    card.dataset.user = i;
    window.data.map.insertBefore(card, filters);
  };

  window.card = {
    createCard: createCard
  };

})();
