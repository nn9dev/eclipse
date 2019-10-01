//       function collision($div1, $div2) {
//       var x1 = $div1.offset().left;
//       var y1 = $div1.offset().top;
//       var h1 = $div1.outerHeight(true);
//       var w1 = $div1.outerWidth(true);
//       var b1 = y1 + h1;
//       var r1 = x1 + w1;
//       var x2 = $div2.offset().left;
//       var y2 = $div2.offset().top;
//       var h2 = $div2.outerHeight(true);
//       var w2 = $div2.outerWidth(true);
//       var b2 = y2 + h2;
//       var r2 = x2 + w2;
        
//       if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
//       return true;
//     }


// window.setInterval(function() {
//     $('#result').text(collision($('#div1'), $('#div2')));
// }, 200);


// $('#div1').draggable();

var static = nipplejs.create({
      zone: document.querySelector('.arrow-button-touchPad'),
      mode: 'static',
      position: {left: '50%', top: '50%'},
      color: 'transparent'
  });

static.on('start move end dir plain', function (evt, data) {
    // console.log(data.direction)
    if(data.angle) {
      if(data.distance > 20) {
        var ang = data.angle.degree;
        if((ang >= 0 && ang <= 30) || (ang > 330 && ang <= 360)) {
          dir = "R";
        } else if(ang > 30 && ang <= 60) {
            dir = "RU";
        } else if(ang > 60 && ang <= 120) {
            dir = "U";
        } else if(ang > 120 && ang <= 150) {
            dir = "UL";
        } else if(ang > 150 && ang <= 210) {
            dir = "L";
        } else if(ang > 210 && ang <= 240) {
            dir = "DL";
        } else if(ang > 240 && ang <= 300) {
            dir = "D";
        } else if(ang > 300 && ang <= 330) {
            dir = "DR";
        } else {dir="err"}
        // console.error("ERROR!")
        }
      } else {
      dir = "RESET";
      }
});

dir = "RESET"
interval = window.setInterval(function() {
  if(dir != "RESET") {
    console.log(dir);
  }
  document.getElementById("result").innerHTML = dir.replace("RESET","[idle]").replace("R","Right ").replace("L","Left ").replace("U","Up ").replace("D","Down ");
}, 10);