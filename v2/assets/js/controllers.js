click = {};
click.keydown = function(k) {
  var oEvent = document.createEvent('KeyboardEvent');
  Object.defineProperty(oEvent, 'keyCode', {
    get: function() {
      return this.keyCodeVal;
    }
  });
  Object.defineProperty(oEvent, 'which', {
    get: function() {
      return this.keyCodeVal;
    }
  });
  if (oEvent.initKeyboardEvent) {
    oEvent.initKeyboardEvent("keydown", true, true, document.defaultView, k, k, "", "", false, "");
  } else {
    oEvent.initKeyEvent("keydown", true, true, document.defaultView, false, false, false, false, k, 0);
  }
  oEvent.keyCodeVal = k;
  if (oEvent.keyCode !== k) {
    alert("keyCode mismatch " + oEvent.keyCode + "(" + oEvent.which + ")");
  }
  document.body.dispatchEvent(oEvent);
}

var dpad = document.getElementById('dpad');
var mc = new Hammer(dpad);
mc.get('pan').set({
  direction: Hammer.DIRECTION_ALL
});
mc.on("panup", function(ev) {
  click.keydown(38);
});
mc.on("pandown", function(ev) {
  click.keydown(40);
});
mc.on("panleft", function(ev) {
  click.keydown(37);
});
mc.on("panright", function(ev) {
  click.keydown(39);
});
