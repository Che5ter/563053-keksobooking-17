'use strict';
(function () {
  var shouldRenderPins = true;

  window.data.mainPin.addEventListener('mousedown', function (evt) {
    window.map.open();

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
      if (newPinTop > window.data.MapRestrictions.TOP && newPinTop < window.data.MapRestrictions.BOTTOM - window.data.PinSizes.HEIGHT) { // устанавливаем границы по перемещению на карте
        window.data.mainPin.style.top = newPinTop + 'px';
      }
      if (newPinLeft > 0 && newPinLeft < window.data.mapWidth - window.data.PinSizes.WIDTH) { // устанавливаем границы по перемещению на карте
        window.data.mainPin.style.left = newPinLeft + 'px';
      }
      var mainPinCoords = window.utils.getCoords(window.data.mainPin);
      window.data.address.value = Math.round(mainPinCoords.top) + ', ' + Math.round(mainPinCoords.left);
    };

    var onMainPinMouseupHandler = function () {
      if (window.dnd.shouldRender) {
        window.backend.load(window.pin.onSuccess, window.pin.onError);
        window.dnd.shouldRender = false;
      }
      document.removeEventListener('mousemove', onMainPinMousemoveHandler);
      document.removeEventListener('mouseup', onMainPinMouseupHandler);
    };

    document.addEventListener('mousemove', onMainPinMousemoveHandler);
    document.addEventListener('mouseup', onMainPinMouseupHandler);
  });

  window.dnd = {
    shouldRender: shouldRenderPins
  };
})();
