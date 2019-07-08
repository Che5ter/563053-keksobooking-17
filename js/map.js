'use strict';
(function () {
  window.map = function () {
    window.data.map.classList.remove('map--faded');
    var form = document.querySelector('.ad-form');
    form.classList.remove('ad-form--disabled');
    var fieldsets = document.querySelectorAll('fieldset');
    for (var i = 0; i < fieldsets.length; i++) {
      fieldsets[i].disabled = false;
    }
    var headerUpload = document.querySelector('.ad-form-header__input');
    headerUpload.disabled = false;
    var filters = document.querySelectorAll('.map__filter');
    for (i = 0; i < filters.length; i++) {
      filters[i].disabled = false;
    }
  };
})();
