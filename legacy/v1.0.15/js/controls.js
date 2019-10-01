/* Keycode storage */
var A;
var B;
var L;
var R;
var Start;
var Select;
var Up;
var Down;
var Left;
var Right;
var A_;
var B_;
var L_;
var R_;
var Start_;
var Select_;
var Up_;
var Down_;
var Left_;
var Right_;
/* ----------------------- */
// Fix controls

function fixControls() {
loadControls();
}

function fixControls1() {
           var upLoop = null;
           var downLoop = null;
           var leftLoop = null;
           var rightLoop = null;
           var aLoop = null;
           var bLoop = null;
           var xLoop = null;
           var yLoop = null;
           var lLoop = null;
           var rLoop = null;
           var startLoop = null;
           var selectLoop = null;

           // EmulateKeys
           function emulateKeypress(code) {
             var down = new Event('keypress');
             down.keyCode = code;
             document.dispatchEvent(down);
           }

           function emulateKeydown(code) {
             var down = new Event('keydown');
             down.keyCode = code;
             document.dispatchEvent(down);
           }

           function emulateKeyup(code) {
             var up = new Event('keyup');
             up.keyCode = code;
             document.dispatchEvent(up);
           }

         if(!localStorage.controls) {
         // Start/Select
         $("#startbtn").on('touchstart touchenter touchup touchmove mousedown', function() {
           startLoop = setInterval(emulateKeydown(13), 100);
         }).on('touchend touchleave mouseup', function() {
           clearInterval(startLoop);
           emulateKeyup(13);
         });

         $("#select").on('touchstart touchenter touchup touchmove mousedown', function() {
           selectLoop = setInterval(emulateKeydown(16), 100);
         }).on('touchend touchleave mouseup', function() {
           clearInterval(selectLoop);
           emulateKeyup(16);
         });

         // D-Pad
         $("#up").on('touchstart touchenter touchup touchmove mousedown', function() {
           upLoop = setInterval(emulateKeydown(38), 100);
         }).on('touchend touchleave mouseup', function() {
           clearInterval(upLoop);
           emulateKeyup(38);
         });
         $("#down").on('touchstart touchenter touchup touchmove mousedown', function() {
           downLoop = setInterval(emulateKeydown(40), 100);
         }).on('touchend touchleave mouseup', function() {
           clearInterval(downLoop);
           emulateKeyup(40);
         });
         $("#left").on('touchstart touchenter touchup touchmove mousedown', function() {
           leftLoop = setInterval(emulateKeydown(37), 100);
         }).on('touchend touchleave mouseup', function() {
           clearInterval(leftLoop);
           emulateKeyup(37);
         });
         $("#right").on('touchstart touchenter touchup touchmove mousedown', function() {
           rightLoop = setInterval(emulateKeydown(39), 100);
         }).on('touchend touchleave mouseup', function() {
           clearInterval(rightLoop);
           emulateKeyup(39);
         });

         // Triggers
         $("#triggerL").on('touchstart touchenter touchup touchmove mousedown', function() {
           lLoop = setInterval(emulateKeydown(49), 100);
         }).on('touchend touchleave mouseup', function() {
           clearInterval(lLoop);
           emulateKeyup(49);
         });
         $("#triggerR").on('touchstart touchenter touchup touchmove mousedown', function() {
           rLoop = setInterval(emulateKeydown(50), 100);
         }).on('touchend touchleave mouseup', function() {
           clearInterval(rLoop);
           emulateKeyup(50);
         });

         // ABXY
         $("#aBtn").on('touchstart touchenter touchup touchmove mousedown', function() {
           upLoop = setInterval(emulateKeydown(88), 100);
         }).on('touchend touchleave mouseup', function() {
           clearInterval(upLoop);
           emulateKeyup(88);
         });
         $("#bBtn").on('touchstart touchenter touchup touchmove mousedown', function() {
           downLoop = setInterval(emulateKeydown(90), 100);
         }).on('touchend touchleave mouseup', function() {
           clearInterval(downLoop);
           emulateKeyup(90);
         });



// NES CONTROLS


// ABXY
$("#aBtnNES").on('touchstart touchenter touchup touchmove mousedown', function() {
  upLoop = setInterval(emulateKeydown(88), 100);
}).on('touchend touchleave mouseup', function() {
  clearInterval(upLoop);
  emulateKeyup(88);
});
$("#bBtnNES").on('touchstart touchenter touchup touchmove mousedown', function() {
  downLoop = setInterval(emulateKeydown(90), 100);
}).on('touchend touchleave mouseup', function() {
  clearInterval(downLoop);
  emulateKeyup(90);
});

$("#startbtnNES").on('touchstart touchenter touchup touchmove mousedown', function() {
  startLoop = setInterval(emulateKeydown(13), 100);
}).on('touchend touchleave mouseup', function() {
  clearInterval(startLoop);
  emulateKeyup(13);
});

$("#selectNES").on('touchstart touchenter touchup touchmove mousedown', function() {
  selectLoop = setInterval(emulateKeydown(17), 100);
}).on('touchend touchleave mouseup', function() {
  clearInterval(selectLoop);
  emulateKeyup(17);
});

// D-Pad
$("#upNES").on('touchstart touchenter touchup touchmove mousedown', function() {
  upLoop = setInterval(emulateKeydown(38), 100);
}).on('touchend touchleave mouseup', function() {
  clearInterval(upLoop);
  emulateKeyup(38);
});
$("#downNES").on('touchstart touchenter touchup touchmove mousedown', function() {
  downLoop = setInterval(emulateKeydown(40), 100);
}).on('touchend touchleave mouseup', function() {
  clearInterval(downLoop);
  emulateKeyup(40);
});
$("#leftNES").on('touchstart touchenter touchup touchmove mousedown', function() {
  leftLoop = setInterval(emulateKeydown(37), 100);
}).on('touchend touchleave mouseup', function() {
  clearInterval(leftLoop);
  emulateKeyup(37);
});
$("#rightNES").on('touchstart touchenter touchup touchmove mousedown', function() {
  rightLoop = setInterval(emulateKeydown(39), 100);
}).on('touchend touchleave mouseup', function() {
  clearInterval(rightLoop);
  emulateKeyup(39);
});



// GB CONTROLS


// ABXY
$("#aBtnGB").on('touchstart touchenter touchup touchmove mousedown', function() {
  upLoop = setInterval(emulateKeydown(88), 100);
}).on('touchend touchleave mouseup', function() {
  clearInterval(upLoop);
  emulateKeyup(88);
});
$("#bBtnGB").on('touchstart touchenter touchup touchmove mousedown', function() {
  downLoop = setInterval(emulateKeydown(90), 100);
}).on('touchend touchleave mouseup', function() {
  clearInterval(downLoop);
  emulateKeyup(90);
});

$("#startbtnGB").on('touchstart touchenter touchup touchmove mousedown', function() {
  startLoop = setInterval(emulateKeydown(13), 100);
}).on('touchend touchleave mouseup', function() {
  clearInterval(startLoop);
  emulateKeyup(13);
});

$("#selectGB").on('touchstart touchenter touchup touchmove mousedown', function() {
  selectLoop = setInterval(emulateKeydown(8), 100);
}).on('touchend touchleave mouseup', function() {
  clearInterval(selectLoop);
  emulateKeyup(8);
});

// D-Pad
$("#upGB").on('touchstart touchenter touchup touchmove mousedown', function() {
  upLoop = setInterval(emulateKeydown(38), 100);
}).on('touchend touchleave mouseup', function() {
  clearInterval(upLoop);
  emulateKeyup(38);
});
$("#downGB").on('touchstart touchenter touchup touchmove mousedown', function() {
  downLoop = setInterval(emulateKeydown(40), 100);
}).on('touchend touchleave mouseup', function() {
  clearInterval(downLoop);
  emulateKeyup(40);
});
$("#leftGB").on('touchstart touchenter touchup touchmove mousedown', function() {
  leftLoop = setInterval(emulateKeydown(37), 100);
}).on('touchend touchleave mouseup', function() {
  clearInterval(leftLoop);
  emulateKeyup(37);
});
$("#rightGB").on('touchstart touchenter touchup touchmove mousedown', function() {
  rightLoop = setInterval(emulateKeydown(39), 100);
}).on('touchend touchleave mouseup', function() {
  clearInterval(rightLoop);
  emulateKeyup(39);
});




         } else if(localStorage.controls) {
         // Start/Select
         $("#startbtn").on('touchstart touchenter touchup touchmove mousedown', function() {
           startLoop = setInterval(emulateKeydown(Start), 100);
         }).on('touchend touchleave mouseup', function() {
           clearInterval(startLoop);
           emulateKeyup(Start);
         });

         $("#select").on('touchstart touchenter touchup touchmove mousedown', function() {
           selectLoop = setInterval(emulateKeydown(Select), 100);
         }).on('touchend touchleave mouseup', function() {
           clearInterval(selectLoop);
           emulateKeyup(Select);
         });

         // D-Pad
         $("#up").on('touchstart touchenter touchup touchmove mousedown', function() {
           upLoop = setInterval(emulateKeydown(Up), 100);
         }).on('touchend touchleave mouseup', function() {
           clearInterval(upLoop);
           emulateKeyup(Up);
         });
         $("#down").on('touchstart touchenter touchup touchmove mousedown', function() {
           downLoop = setInterval(emulateKeydown(Down), 100);
         }).on('touchend touchleave mouseup', function() {
           clearInterval(downLoop);
           emulateKeyup(Down);
         });
         $("#left").on('touchstart touchenter touchup touchmove mousedown', function() {
           leftLoop = setInterval(emulateKeydown(Left), 100);
         }).on('touchend touchleave mouseup', function() {
           clearInterval(leftLoop);
           emulateKeyup(Left);
         });
         $("#right").on('touchstart touchenter touchup touchmove mousedown', function() {
           rightLoop = setInterval(emulateKeydown(Right), 100);
         }).on('touchend touchleave mouseup', function() {
           clearInterval(rightLoop);
           emulateKeyup(Right);
         });

         // Triggers
         $("#triggerL").on('touchstart touchenter touchup touchmove mousedown', function() {
           lLoop = setInterval(emulateKeydown(L), 100);
         }).on('touchend touchleave mouseup', function() {
           clearInterval(lLoop);
           emulateKeyup(L);
         });
         $("#triggerR").on('touchstart touchenter touchup touchmove mousedown', function() {
           rLoop = setInterval(emulateKeydown(R), 100);
         }).on('touchend touchleave mouseup', function() {
           clearInterval(rLoop);
           emulateKeyup(R);
         });

         // ABXY
         $("#aBtn").on('touchstart touchenter touchup touchmove mousedown', function() {
           upLoop = setInterval(emulateKeydown(A), 100);
         }).on('touchend touchleave mouseup', function() {
           clearInterval(upLoop);
           emulateKeyup(A);
         });
         $("#bBtn").on('touchstart touchenter touchup touchmove mousedown', function() {
           downLoop = setInterval(emulateKeydown(B), 100);
         }).on('touchend touchleave mouseup', function() {
           clearInterval(downLoop);
           emulateKeyup(B);
         });


$("#aBtnGB").on('touchstart touchenter touchup touchmove mousedown', function() {
  upLoop = setInterval(emulateKeydown(A), 100);
}).on('touchend touchleave mouseup', function() {
  clearInterval(upLoop);
  emulateKeyup(A);
});
$("#bBtnGB").on('touchstart touchenter touchup touchmove mousedown', function() {
  downLoop = setInterval(emulateKeydown(B), 100);
}).on('touchend touchleave mouseup', function() {
  clearInterval(downLoop);
  emulateKeyup(B);
});

$("#startbtnGB").on('touchstart touchenter touchup touchmove mousedown', function() {
  startLoop = setInterval(emulateKeydown(Start), 100);
}).on('touchend touchleave mouseup', function() {
  clearInterval(startLoop);
  emulateKeyup(Start);
});

$("#selectGB").on('touchstart touchenter touchup touchmove mousedown', function() {
  selectLoop = setInterval(emulateKeydown(Select), 100);
}).on('touchend touchleave mouseup', function() {
  clearInterval(selectLoop);
  emulateKeyup(Select);
});

// D-Pad
$("#upGB").on('touchstart touchenter touchup touchmove mousedown', function() {
  upLoop = setInterval(emulateKeydown(Up), 100);
}).on('touchend touchleave mouseup', function() {
  clearInterval(upLoop);
  emulateKeyup(Up);
});
$("#downGB").on('touchstart touchenter touchup touchmove mousedown', function() {
  downLoop = setInterval(emulateKeydown(Down), 100);
}).on('touchend touchleave mouseup', function() {
  clearInterval(downLoop);
  emulateKeyup(Down);
});
$("#leftGB").on('touchstart touchenter touchup touchmove mousedown', function() {
  leftLoop = setInterval(emulateKeydown(Left), 100);
}).on('touchend touchleave mouseup', function() {
  clearInterval(leftLoop);
  emulateKeyup(Left);
});
$("#rightGB").on('touchstart touchenter touchup touchmove mousedown', function() {
  rightLoop = setInterval(emulateKeydown(Right), 100);
}).on('touchend touchleave mouseup', function() {
  clearInterval(rightLoop);
  emulateKeyup(Right);
});

// ABXY
$("#aBtnNES").on('touchstart touchenter touchup touchmove mousedown', function() {
  upLoop = setInterval(emulateKeydown(A), 100);
}).on('touchend touchleave mouseup', function() {
  clearInterval(upLoop);
  emulateKeyup(A);
});
$("#bBtnNES").on('touchstart touchenter touchup touchmove mousedown', function() {
  downLoop = setInterval(emulateKeydown(B), 100);
}).on('touchend touchleave mouseup', function() {
  clearInterval(downLoop);
  emulateKeyup(B);
});

$("#startbtnNES").on('touchstart touchenter touchup touchmove mousedown', function() {
  startLoop = setInterval(emulateKeydown(Start), 100);
}).on('touchend touchleave mouseup', function() {
  clearInterval(startLoop);
  emulateKeyup(Start);
});

$("#selectNES").on('touchstart touchenter touchup touchmove mousedown', function() {
  selectLoop = setInterval(emulateKeydown(Select), 100);
}).on('touchend touchleave mouseup', function() {
  clearInterval(selectLoop);
  emulateKeyup(Select);
});

// D-Pad
$("#upNES").on('touchstart touchenter touchup touchmove mousedown', function() {
  upLoop = setInterval(emulateKeydown(Up), 100);
}).on('touchend touchleave mouseup', function() {
  clearInterval(upLoop);
  emulateKeyup(Up);
});
$("#downNES").on('touchstart touchenter touchup touchmove mousedown', function() {
  downLoop = setInterval(emulateKeydown(Down), 100);
}).on('touchend touchleave mouseup', function() {
  clearInterval(downLoop);
  emulateKeyup(Down);
});
$("#leftNES").on('touchstart touchenter touchup touchmove mousedown', function() {
  leftLoop = setInterval(emulateKeydown(Left), 100);
}).on('touchend touchleave mouseup', function() {
  clearInterval(leftLoop);
  emulateKeyup(Left);
});
$("#rightNES").on('touchstart touchenter touchup touchmove mousedown', function() {
  rightLoop = setInterval(emulateKeydown(Right), 100);
}).on('touchend touchleave mouseup', function() {
  clearInterval(rightLoop);
  emulateKeyup(Right);
});


         }

}
// Edits the keyZones variable
function editKeyZones() {
keyZones = [[A],[B],[Select],[Start],[Right],[Left],[Up],[Down],[R],[L]];
GBOkeyZones = [["right", [Right]],["left", [Left]],["up", [Up]],["down", [Down]],["a", [A]],["b", [B]],["select", [Select]],["start", [Start]]];
fixControls1();
}
function defaultKeyZones() {
keyZones = [[88, 74], [90, 81, 89], [16], [13], [39], [37], [38], [40], [50], [49]];
GBOkeyZones = [["right", [39]],["left", [37]],["up", [38]],["down", [40]],["a", [88, 74]],["b", [90, 81, 89]],["select", [8]],["start", [13]]];
A = 88;
B = 90;
Select = 17;
Start = 13;
Up = 38;
Down = 40;
Left = 37;
Right = 39;
fixControls1();
}
// Saves controls in controls.html
function saveControls() { 
  localStorage.setItem('controls', '{   "controls": [{       "ctrl": "A",       "keycode": "' + A_ + '"     },     {       "ctrl": "B",       "keycode": "' + B_ + '"     },     {       "ctrl": "L",       "keycode": "' + L_ + '"     },     {       "ctrl": "R",       "keycode": "' + R_ + '"     },     {       "ctrl": "Start",       "keycode": "' + Start_ + '"     },     {       "ctrl": "Select",       "keycode": "' + Select_ + '"     },     {       "ctrl": "Up",       "keycode": "' + Up_ + '"     },     {       "ctrl": "Down",       "keycode": "' + Down_ + '"     },     {       "ctrl": "Left",       "keycode": "' + Left_ + '"     },     {       "ctrl": "Right",       "keycode": "' + Right_ + '"     }   ] }'); eclipse.userLog('Your controls were updated.');
}

// Loads the user's controls
function loadControls() {
if(localStorage.controls) {
function attemptToLoadControls() {
  window.setTimeout(function(){
  try {
    ctrls = JSON.parse(localStorage.controls);
    for (var i = 0; i <= 9; i++) {
      ctrls.controls[i].keycode = parseInt(ctrls.controls[i].keycode);
      if(ctrls.controls[i].ctrl == "A") { A = ctrls.controls[i].keycode; /*console.log(ctrls.controls[i].ctrl + " = " + ctrls.controls[i].keycode);*/ }
      if(ctrls.controls[i].ctrl == "B") { B = ctrls.controls[i].keycode; /*console.log(ctrls.controls[i].ctrl + " = " + ctrls.controls[i].keycode);*/ }
      if(ctrls.controls[i].ctrl == "L") { L = ctrls.controls[i].keycode; /*console.log(ctrls.controls[i].ctrl + " = " + ctrls.controls[i].keycode);*/ }
      if(ctrls.controls[i].ctrl == "R") { R = ctrls.controls[i].keycode; /*console.log(ctrls.controls[i].ctrl + " = " + ctrls.controls[i].keycode);*/ }
      if(ctrls.controls[i].ctrl == "Start") { Start = ctrls.controls[i].keycode; /*console.log(ctrls.controls[i].ctrl + " = " + ctrls.controls[i].keycode);*/ }
      if(ctrls.controls[i].ctrl == "Select") { Select = ctrls.controls[i].keycode; /*console.log(ctrls.controls[i].ctrl + " = " + ctrls.controls[i].keycode);*/ }
      if(ctrls.controls[i].ctrl == "Up") { Up = ctrls.controls[i].keycode; /*console.log(ctrls.controls[i].ctrl + " = " + ctrls.controls[i].keycode);*/ }
      if(ctrls.controls[i].ctrl == "Down") { Down = ctrls.controls[i].keycode; /*console.log(ctrls.controls[i].ctrl + " = " + ctrls.controls[i].keycode);*/ }
      if(ctrls.controls[i].ctrl == "Left") { Left = ctrls.controls[i].keycode; /*console.log(ctrls.controls[i].ctrl + " = " + ctrls.controls[i].keycode);*/ }
      if(ctrls.controls[i].ctrl == "Right") { Right = ctrls.controls[i].keycode; /*console.log(ctrls.controls[i].ctrl + " = " + ctrls.controls[i].keycode);*/ }
      if(i == 9) {
        editKeyZones();
      }
    }
    return true;
    } catch(err) {
      attemptToLoadControls();
    }
  }, 0);
}
attemptToLoadControls();
} else {
defaultKeyZones();
}
}
// Lists the user's current controls on controls.html
function listCurrentControls() {
  function tryListCurrentControls() {
    try {
    if (!localStorage.controls) {
    document.getElementById('A_input').value = convertKeyCode(null, 88); document.getElementById('B_input').value = convertKeyCode(null, 90); document.getElementById('Select_input').value = convertKeyCode(null, 16); document.getElementById('Start_input').value = convertKeyCode(null, 13); document.getElementById('Right_input').value = convertKeyCode(null, 39); document.getElementById('Left_input').value = convertKeyCode(null, 37); document.getElementById('Up_input').value = convertKeyCode(null, 38); document.getElementById('Down_input').value = convertKeyCode(null, 40); document.getElementById('R_input').value = convertKeyCode(null, 50); document.getElementById('L_input').value = convertKeyCode(null, 49);
    A_ = 88;
    B_ = 90;
    Select_ = 16;
    Start_ = 13
    L_ = 49;
    R_ = 50;
    Up_ = 38;
    Down_ = 40;
    Left_ = 37;
    Right_ = 39;
    } else {
    ctrls = JSON.parse(localStorage.controls);
    A_ = ctrls.controls[0].keycode;
    B_ = ctrls.controls[1].keycode;
    Select_ = ctrls.controls[5].keycode;
    Start_ = ctrls.controls[4].keycode;
    L_ = ctrls.controls[2].keycode;
    R_ = ctrls.controls[3].keycode;
    Up_ = ctrls.controls[6].keycode;
    Down_ = ctrls.controls[7].keycode;
    Left_ = ctrls.controls[8].keycode;
    Right_ = ctrls.controls[9].keycode;
    document.getElementById('A_input').value = convertKeyCode(null, ctrls.controls[0].keycode); document.getElementById('B_input').value = convertKeyCode(null, ctrls.controls[1].keycode); document.getElementById('Select_input').value = convertKeyCode(null, ctrls.controls[5].keycode); document.getElementById('Start_input').value = convertKeyCode(null, ctrls.controls[4].keycode); document.getElementById('Right_input').value = convertKeyCode(null, ctrls.controls[9].keycode); document.getElementById('Left_input').value = convertKeyCode(null, ctrls.controls[8].keycode); document.getElementById('Up_input').value = convertKeyCode(null, ctrls.controls[6].keycode); document.getElementById('Down_input').value = convertKeyCode(null, ctrls.controls[7].keycode); document.getElementById('R_input').value = convertKeyCode(null, ctrls.controls[3].keycode); document.getElementById('L_input').value = convertKeyCode(null, ctrls.controls[2].keycode);;
    }} catch(err) {
      tryListCurrentControls();
    }
  }
  tryListCurrentControls();
}

loadControls();

function desktopModeTing() {
var controlVis;
if (localStorage.desktopMode == "true") {
  controlVis = "none";
} else {
  controlVis = "block";
}
document.getElementById("centerNES").style.display = controlVis; document.getElementById("upNES").style.display = controlVis; document.getElementById("downNES").style.display = controlVis; document.getElementById("leftNES").style.display = controlVis; document.getElementById("rightNES").style.display = controlVis; document.getElementById("selectNES").style.display = controlVis; document.getElementById("startbtnNES").style.display = controlVis; document.getElementById("aBtnNES").style.display = controlVis; document.getElementById("bBtnNES").style.display = controlVis; document.getElementById("centerGB").style.display = controlVis; document.getElementById("upGB").style.display = controlVis; document.getElementById("downGB").style.display = controlVis; document.getElementById("leftGB").style.display = controlVis; document.getElementById("rightGB").style.display = controlVis; document.getElementById("selectGB").style.display = controlVis; document.getElementById("startbtnGB").style.display = controlVis; document.getElementById("aBtnGB").style.display = controlVis; document.getElementById("bBtnGB").style.display = controlVis; document.getElementById("center").style.display = controlVis; document.getElementById("up").style.display = controlVis; document.getElementById("down").style.display = controlVis; document.getElementById("left").style.display = controlVis; document.getElementById("right").style.display = controlVis; document.getElementById("select").style.display = controlVis; document.getElementById("startbtn").style.display = controlVis; document.getElementById("aBtn").style.display = controlVis; document.getElementById("bBtn").style.display = controlVis; document.getElementById("triggerL").style.display = controlVis;document.getElementById("triggerR").style.display = controlVis;
}

// Bottom of the file keeps getting cut off, so adding text to try to circumvent the issue
// Sit consequat ullamco do ad mollit sunt officia velit commodo sint voluptate est non. Excepteur enim pariatur exercitation sunt aliquip exercitation minim ea adipisicing et qui voluptate ut proident. Ex et est qui consectetur cillum sit duis sunt est commodo laboris sint nulla nostrud culpa ea. Exercitation excepteur ex adipisicing dolore et labore Lorem cupidatat non enim aliquip commodo consequat. Esse proident eu laboris tempor excepteur id fugiat ullamco consectetur excepteur duis duis consequat nulla Lorem Lorem. Cupidatat laborum elit quis deserunt consequat adipisicing exercitation eiusmod fugiat eu tempor aliquip ea id ea et cillum. Id magna non esse officia fugiat nisi commodo nulla amet eiusmod est ad.
//
// Occaecat duis mollit cillum ad non cillum fugiat qui enim qui voluptate magna nisi esse tempor ipsum. Dolore consectetur commodo qui Lorem fugiat et minim est fugiat anim. Est anim quis amet irure qui excepteur labore. Est magna id velit consectetur sunt nulla adipisicing esse nisi proident magna exercitation deserunt consectetur exercitation dolor. Non non dolore eiusmod nisi ullamco qui irure aute laboris incididunt elit.
//
// Mollit eiusmod reprehenderit consectetur id minim laboris officia. Non esse aute proident dolor qui in dolor anim. Dolor minim cillum esse eiusmod culpa cupidatat duis sit dolor sit duis ea.
//
// Minim do adipisicing nisi commodo esse ea ipsum elit dolor est voluptate ut in. Mollit duis id qui mollit amet nulla exercitation proident laborum magna aute duis nostrud. Sint est minim fugiat fugiat cillum consequat eu deserunt esse commodo ex elit velit cillum consectetur est incididunt. Qui cupidatat ad laborum pariatur in elit do eiusmod aliqua nulla Lorem sint enim nisi consectetur nisi.
// Sit consequat ullamco do ad mollit sunt officia velit commodo sint voluptate est non. Excepteur enim pariatur exercitation sunt aliquip exercitation minim ea adipisicing et qui voluptate ut proident. Ex et est qui consectetur cillum sit duis sunt est commodo laboris sint nulla nostrud culpa ea. Exercitation excepteur ex adipisicing dolore et labore Lorem cupidatat non enim aliquip commodo consequat. Esse proident eu laboris tempor excepteur id fugiat ullamco consectetur excepteur duis duis consequat nulla Lorem Lorem. Cupidatat laborum elit quis deserunt consequat adipisicing exercitation eiusmod fugiat eu tempor aliquip ea id ea et cillum. Id magna non esse officia fugiat nisi commodo nulla amet eiusmod est ad.
//
// Occaecat duis mollit cillum ad non cillum fugiat qui enim qui voluptate magna nisi esse tempor ipsum. Dolore consectetur commodo qui Lorem fugiat et minim est fugiat anim. Est anim quis amet irure qui excepteur labore. Est magna id velit consectetur sunt nulla adipisicing esse nisi proident magna exercitation deserunt consectetur exercitation dolor. Non non dolore eiusmod nisi ullamco qui irure aute laboris incididunt elit.
//
// Mollit eiusmod reprehenderit consectetur id minim laboris officia. Non esse aute proident dolor qui in dolor anim. Dolor minim cillum esse eiusmod culpa cupidatat duis sit dolor sit duis ea.
//
// Minim do adipisicing nisi commodo esse ea ipsum elit dolor est voluptate ut in. Mollit duis id qui mollit amet nulla exercitation proident laborum magna aute duis nostrud. Sint est minim fugiat fugiat cillum consequat eu deserunt esse commodo ex elit velit cillum consectetur est incididunt. Qui cupidatat ad laborum pariatur in elit do eiusmod aliqua nulla Lorem sint enim nisi consectetur nisi.
// Sit consequat ullamco do ad mollit sunt officia velit commodo sint voluptate est non. Excepteur enim pariatur exercitation sunt aliquip exercitation minim ea adipisicing et qui voluptate ut proident. Ex et est qui consectetur cillum sit duis sunt est commodo laboris sint nulla nostrud culpa ea. Exercitation excepteur ex adipisicing dolore et labore Lorem cupidatat non enim aliquip commodo consequat. Esse proident eu laboris tempor excepteur id fugiat ullamco consectetur excepteur duis duis consequat nulla Lorem Lorem. Cupidatat laborum elit quis deserunt consequat adipisicing exercitation eiusmod fugiat eu tempor aliquip ea id ea et cillum. Id magna non esse officia fugiat nisi commodo nulla amet eiusmod est ad.
//
// Occaecat duis mollit cillum ad non cillum fugiat qui enim qui voluptate magna nisi esse tempor ipsum. Dolore consectetur commodo qui Lorem fugiat et minim est fugiat anim. Est anim quis amet irure qui excepteur labore. Est magna id velit consectetur sunt nulla adipisicing esse nisi proident magna exercitation deserunt consectetur exercitation dolor. Non non dolore eiusmod nisi ullamco qui irure aute laboris incididunt elit.
//
// Mollit eiusmod reprehenderit consectetur id minim laboris officia. Non esse aute proident dolor qui in dolor anim. Dolor minim cillum esse eiusmod culpa cupidatat duis sit dolor sit duis ea.
//
// Minim do adipisicing nisi commodo esse ea ipsum elit dolor est voluptate ut in. Mollit duis id qui mollit amet nulla exercitation proident laborum magna aute duis nostrud. Sint est minim fugiat fugiat cillum consequat eu deserunt esse commodo ex elit velit cillum consectetur est incididunt. Qui cupidatat ad laborum pariatur in elit do eiusmod aliqua nulla Lorem sint enim nisi consectetur nisi.
