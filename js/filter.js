'use strict';
(function () {
  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRooms = document.querySelector('#housing-rooms');
  var housingGuest = document.querySelector('#housing-guests');
  var checkWifi = document.querySelector('#filter-wifi');
  var checkDishwasher = document.querySelector('#filter-dishwasher');
  var checkParking = document.querySelector('#filter-parking');
  var checkWasher = document.querySelector('#filter-washer');
  var checkElevator = document.querySelector('#filter-elevator');
  var checkConditioner = document.querySelector('#filter-conditioner');

  var priceMap = {
    'high': 50000,
    'low': 10000
  };

  window.filter = {
    filtering: function (dataPins) {
      var filteredPins = dataPins.filter(function (it) {
        return housingType.value !== 'any' ? it.offer.type === housingType.value : dataPins;
      })
      .filter(function (it) {
        if (housingPrice.value !== 'any') {
          if (housingPrice.value === 'high') {
            return it.offer.price >= priceMap.high;
          }
          if (housingPrice.value === 'low') {
            return it.offer.price <= priceMap.low;
          }
          return (it.offer.price >= priceMap.low && it.offer.price < priceMap.high);
        }
        return dataPins;
      })
      .filter(function (it) {
        return housingRooms.value !== 'any' ? it.offer.rooms === +housingRooms.value : dataPins;
      })
      .filter(function (it) {
        if (housingGuest.value !== 'any') {
          if (housingGuest.value === '0') {
            return it.offer.guests === +housingGuest.value;
          }
          return it.offer.guests >= +housingGuest.value;
        }
        return dataPins;
      })
      .filter(function (it) {
        return checkWifi.checked ? it.offer.features.indexOf(checkWifi.value) >= 0 : dataPins;
      })
      .filter(function (it) {
        return checkDishwasher.checked ? it.offer.features.indexOf(checkDishwasher.value) >= 0 : dataPins;
      })
      .filter(function (it) {
        return checkParking.checked ? it.offer.features.indexOf(checkParking.value) >= 0 : dataPins;
      })
      .filter(function (it) {
        return checkWasher.checked ? it.offer.features.indexOf(checkWasher.value) >= 0 : dataPins;
      })
      .filter(function (it) {
        return checkElevator.checked ? it.offer.features.indexOf(checkElevator.value) >= 0 : dataPins;
      })
      .filter(function (it) {
        return checkConditioner.checked ? it.offer.features.indexOf(checkConditioner.value) >= 0 : dataPins;
      });
      var createFilteredPins = function () {
        window.pin.createElements(filteredPins, window.data.mapPin);
      };
      window.utils.debounce(createFilteredPins);
    }
  };
})();
