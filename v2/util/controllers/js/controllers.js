//don't steal ffs
//I'm daddy Dan
//Daddy Dan is only dad
//Warsame is a flat earther furry
//© Daddy Dan

var dpad = document.getElementById('dpad');
var mc = new Hammer(dpad);
mc.get('pan').set({ direction: Hammer.DIRECTION_ALL });
mc.on("panup", function(ev) {
  document.getElementById("clicked").innerHTML = "Clicked the up button"
  ;
});
mc.on("pandown", function(ev) {
  document.getElementById("clicked").innerHTML = "Clicked the down button"
  ;
});
mc.on("panleft", function(ev) {
  document.getElementById("clicked").innerHTML = "Clicked the left button"
  ;
}); 
mc.on("panright", function(ev) {
  document.getElementById("clicked").innerHTML = "Clicked the right button"
  ;
});
