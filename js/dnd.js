'use strict';
(function () {
  var shouldRenderPins = true;

  window.data.mainPin.addEventListener('mousedown', function (evt) {
    window.map();

    var startCoords = {
      x: evt.pageX,
      y: evt.pageY
    };

    var onMainPinMousemoveHandler = function (moveEvt) {
      var shift = {
        x: startCoords.x - moveEvt.pageX,
        y: startCoords.y - moveEvt.pageY
      };

      startCoords = {
        x: moveEvt.pageX,
        y: moveEvt.pageY
      };
      var newPinTop = window.data.mainPin.offsetTop - shift.y;
      var newPinLeft = window.data.mainPin.offsetLeft - shift.x;
      if (newPinTop > window.data.MapRestrictions.TOP && newPinTop < window.data.MapRestrictions.BOTTOM - window.data.pinSizes.HEIGHT) { // устанавливаем границы по перемещению на карте
        window.data.mainPin.style.top = newPinTop + 'px';
      }
      if (newPinLeft > 0 && newPinLeft < window.data.mapWidth - window.data.pinSizes.WIDTH) { // устанавливаем границы по перемещению на карте
        window.data.mainPin.style.left = newPinLeft + 'px';
      }
      var mainPinCoords = window.utils.getCoords(window.data.mainPin);
      window.data.adress.value = Math.round(mainPinCoords.top) + ',' + Math.round(mainPinCoords.left);
    };

    var onMainPinMouseupHandler = function () {
      if (shouldRenderPins) {
        window.load(window.pin.onSuccess, window.pin.onError);
        shouldRenderPins = false;
      }
      document.removeEventListener('mousemove', onMainPinMousemoveHandler);
      document.removeEventListener('mouseup', onMainPinMouseupHandler);
    };

    document.addEventListener('mousemove', onMainPinMousemoveHandler);
    document.addEventListener('mouseup', onMainPinMouseupHandler);
  });
})();
