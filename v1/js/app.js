// Dom7
var $$ = Dom7;
var $ = jQuery;
var repoURL = "";
var repoIndex;
// Theme
var theme = 'auto';
if (document.location.search.indexOf('theme=') >= 0) {
  theme = document.location.search.split('theme=')[1].split('&')[0];
}

// Intended for DEBUGGING purposes, this is never called from anywhere in Eclipse.
function readFunction(fname) {
  return eval(fname).toString();
}

// Keycode to string.  This function took an eternity to write.
function convertKeyCode(evt, key) {
  var char;
  var keyCode;
  if (key) {
    keyCode = key;
  } else {
    var char = "";
    var keyCode = (evt.which) ? evt.which : evt.keyCode;
  }
  if (keyCode == 7)
    char = "&";
  else if (keyCode == 8)
    char = "⌫";
  else if (keyCode == 9)
    char = "⇥";
  else if (keyCode == 13)
    char = "↵";
  else if (keyCode == 16)
    char = "⇧";
  else if (keyCode == 17)
    char = "CTRL";
  else if (keyCode == 18)
    char = "ALT";
  else if (keyCode == 19)
    char = "19";
  // pause / break
  else if (keyCode == 20)
    char = "⇪";
  else if (keyCode == 27)
    char = "ESC";
  else if (keyCode == 32)
    char = "SPACE";
  else if (keyCode == 33)
    char = "↑";
  else if (keyCode == 34)
    char = "↓";
  else if (keyCode == 35)
    char = "⤓";
  else if (keyCode == 36)
    char = "⤒";
  else if (keyCode == 37)
    char = "◄";
  else if (keyCode == 38)
    char = "▲";
  else if (keyCode == 39)
    char = "►";
  else if (keyCode == 40)
    char = "▼";
  else if (keyCode == 45)
    char = "INS";
  else if (keyCode == 46)
    char = "DEL";
  else if (keyCode == 48)
    char = "0";
  else if (keyCode == 49)
    char = "1";
  else if (keyCode == 50)
    char = "2";
  else if (keyCode == 51)
    char = "3";
  else if (keyCode == 52)
    char = "4";
  else if (keyCode == 53)
    char = "5";
  else if (keyCode == 54)
    char = "6";
  else if (keyCode == 55)
    char = "7";
  else if (keyCode == 56)
    char = "8";
  else if (keyCode == 57)
    char = "9";
  else if (keyCode == 65)
    char = "A";
  else if (keyCode == 66)
    char = "B";
  else if (keyCode == 67)
    char = "C";
  else if (keyCode == 68)
    char = "D";
  else if (keyCode == 69)
    char = "E";
  else if (keyCode == 70)
    char = "F";
  else if (keyCode == 71)
    char = "G";
  else if (keyCode == 72)
    char = "H";
  else if (keyCode == 73)
    char = "I";
  else if (keyCode == 74)
    char = "J";
  else if (keyCode == 75)
    char = "K";
  else if (keyCode == 76)
    char = "L";
  else if (keyCode == 77)
    char = "M";
  else if (keyCode == 78)
    char = "N";
  else if (keyCode == 79)
    char = "O";
  else if (keyCode == 80)
    char = "P";
  else if (keyCode == 81)
    char = "Q";
  else if (keyCode == 82)
    char = "R";
  else if (keyCode == 83)
    char = "S";
  else if (keyCode == 84)
    char = "T";
  else if (keyCode == 85)
    char = "U";
  else if (keyCode == 86)
    char = "V";
  else if (keyCode == 87)
    char = "W";
  else if (keyCode == 88)
    char = "X";
  else if (keyCode == 89)
    char = "Y";
  else if (keyCode == 90)
    char = "Z";
  else if (keyCode == 93)
    char = "93";
  else if (keyCode == 96)
    char = "N0";
  else if (keyCode == 97)
    char = "N1";
  else if (keyCode == 98)
    char = "N2";
  else if (keyCode == 99)
    char = "N3";
  else if (keyCode == 100)
    char = "N4";
  else if (keyCode == 101)
    char = "N5";
  else if (keyCode == 102)
    char = "N6";
  else if (keyCode == 103)
    char = "N7";
  else if (keyCode == 104)
    char = "N8";
  else if (keyCode == 105)
    char = "N9";
  else if (keyCode == 106)
    char = "*";
  else if (keyCode == 107)
    char = "+";
  else if (keyCode == 109)
    char = "-";
  else if (keyCode == 110)
    char = ".";
  else if (keyCode == 111)
    char = "/";
  else if (keyCode == 186)
    char = ";";
  else if (keyCode == 187)
    char = "=";
  else if (keyCode == 188)
    char = ",";
  else if (keyCode == 189)
    char = "-";
  else if (keyCode == 190)
    char = ".";
  else if (keyCode == 191)
    char = "/";
  else if (keyCode == 192)
    char = "`";
  else if (keyCode == 219)
    char = "{";
  else if (keyCode == 220)
    char = "\\";
  else if (keyCode == 221)
    char = "}";
  else if (keyCode == 222)
    char = "'";
  else
    char = "(" + keyCode.toString() + ")";
  return char;
}

/* Variables used to update */
var settingsUpdateLinkHREF = "";
var changelogLinkHREF = "";
var latestVersion = "";
var currentVersion = "";
var changelogExec = "";

/* Some page init stuff */

function settingsPageInit() {
  if (!localStorage.autoSave) {
    document.getElementById("autoSaveSwitch").checked = true;
    localStorage.autoSave = "true";
  } else if (localStorage.autoSave == "true") {
    document.getElementById("autoSaveSwitch").checked = true;
  } else {
    document.getElementById("autoSaveSwitch").checked = false;
  }
  if (!localStorage.audioStatus) {
    document.getElementById("audioStatusSwitch").checked = true;
    localStorage.audioStatus = "true";
  } else if (localStorage.audioStatus == "true") {
    document.getElementById("audioStatusSwitch").checked = true;
  } else {
    document.getElementById("audioStatusSwitch").checked = false;
  }

  if (!localStorage.fillScreen) {
    document.getElementById("fillScreenSwitch").checked = false;
    localStorage.fillScreen = "false";
  } else if (localStorage.fillScreen == "true") {
    document.getElementById("fillScreenSwitch").checked = true;
  } else {
    document.getElementById("fillScreenSwitch").checked = false;
  }

  try {
    if (!localStorage.desktopMode) {
      document.getElementById("desktopModeSwitch").checked = false;
      localStorage.desktopMode = "false";
    } else if (localStorage.desktopMode == "true") {
      document.getElementById("desktopModeSwitch").checked = true;
    } else {
      document.getElementById("desktopModeSwitch").checked = false;
    }
  } catch (err) {
    eclipse.error("Desktop Mode cannot be initialized. This is probably a caching issue.")
  }
  eclipse.isOffline(); // For offline stuff that is needed in settings.
  currentVersion = document.getElementById("currentEclipseVersion").innerHTML;
}

function updatePageInit() {
  var versionRequest = new XMLHttpRequest();
  versionRequest.open('GET', 'pages/latestVersion.txt?uncache=' + randomNumber(8));
  versionRequest.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
    latestVersion = versionRequest.responseText;
      var echo;
      var gv;

      if (!document.getElementById('currentEclipseVersion').innerHTML) {
        echo = "Error";
      } else {
        gv = document.getElementById('currentEclipseVersion').innerHTML.replace(">", "&gt;").replace("<", "&lt;");
      }
      var intFriendly = document.getElementById('currentEclipseVersion').innerHTML.replace(/\n/g, "").replace(/\./g, "");
      var intFriendlyLatestVersion = latestVersion.replace(/\n/g, "").replace(/\./g, "");

      if (parseInt(intFriendly) > parseInt(intFriendlyLatestVersion)) {
        echo = '<div class="content-block-inner eclipse-header" style="box-shadow: 0 5px 13px 0 rgba(0, 0, 0, .1);"><br><center><img src="img/icons/icon_mobFull.png" width="100" height="100" style="box-shadow: 0 5px 13px 0 rgba(0, 0, 0, .1); border-radius: 21%;"></center><center><h1 style="color:#fff;">Eclipse ' + gv + '</h1></center><div class="list inset" style="margin-top:0;margin-bottom:0;background:white"><ul><li><a href="#" class="list-button item-link" onclick="reinstallEclipseUpdate()">Reinstall Update</a></li></ul></div><br></div><center><br><div class="padding-left:15px;padding-right:15px;">You\'re using a beta of Eclipse.</div></center><br>';
      }

      if (parseInt(intFriendly) != parseInt(intFriendlyLatestVersion)) {
        echo = '<div class="content-block-inner eclipse-header" style="box-shadow: 0 5px 13px 0 rgba(0, 0, 0, .1);padding-bottom:0;"><br><center><img src="img/icons/icon_mobFull.png" width="100" height="100" style="box-shadow: 0 5px 13px 0 rgba(0, 0, 0, .1); border-radius: 21%;"></center><center><h1 style="color:#fff;">Eclipse ' + latestVersion + '</h1><div class="list" style="background:white"><ul><li><a href="#" onclick="updateEclipse()" class="item-link list-button">Update</a></li><li><a href="/changelog/?version=' + gv + '&latestVersion=' + latestVersion + '" class="item-link list-button" id="changeLogBtn">Changelog</a></li></ul></div></center></div>';
      } else {
        echo = '<div class="content-block-inner eclipse-header" style="box-shadow: 0 5px 13px 0 rgba(0, 0, 0, .1);"><br><center><img src="img/icons/icon_mobFull.png" width="100" height="100" style="box-shadow: 0 5px 13px 0 rgba(0, 0, 0, .1); border-radius: 21%;"></center><center><h1 style="color:#fff;">Eclipse ' + gv + '</h1></center><div class="list inset" style="margin-top:0;margin-bottom:0;background:white"><ul><li><a href="#" class="list-button item-link" onclick="reinstallEclipseUpdate()">Reinstall Update</a></li></ul></div><br></div><center><br><div class="padding-left:15px;padding-right:15px;">You\'re already using the latest version of Eclipse.</div></center><br>';
      }

      if (!document.getElementById('currentEclipseVersion').innerHTML) {
        echo = "Error";
      } else {
        gv = document.getElementById('currentEclipseVersion').innerHTML.replace(">", "&gt;").replace("<", "&lt;");
      }

      if (parseInt(intFriendly) > parseInt(intFriendlyLatestVersion)) {
        echo = '<div class="content-block-inner eclipse-header" style="box-shadow: 0 5px 13px 0 rgba(0, 0, 0, .1);"><br><center><img src="img/icons/icon_mobFull.png" width="100" height="100" style="box-shadow: 0 5px 13px 0 rgba(0, 0, 0, .1); border-radius: 21%;"></center><center><h1 style="color:#fff;">Eclipse ' + gv + '</h1></center><div class="list inset" style="margin-top:0;margin-bottom:0;background:white"><ul><li><a href="#" class="list-button item-link" onclick="reinstallEclipseUpdate();">Clear Cache</a></li></ul></div><br></div><center><br><div class="padding-left:15px;padding-right:15px;">You\'re using a beta version of Eclipse.</div></center><br>';
      }

      if (document.getElementById('updatePageContent')) {
        document.getElementById('updatePageContent').innerHTML = echo;
      }

      if (document.getElementById('changeLogBtn')) {
        changelogLinkHREF = document.getElementById('changeLogBtn').href;
      }
    }
  }
  versionRequest.send();
}

function changelogPageInit() {
  $.get('js/changelog.js?uncache=' + randomNumber(8).toString(), function(dac0d3) {
    //document.createElement("script").innerHTML = dac0d3;
    eval(dac0d3);
  });
};

function storagePageInit() {
  var percentUsed;
  var usageInMib;
  var quotaInMib;
  storageEstimateWrapper().then(function(estimate) {
    percentUsed = Math.round(estimate.usage / estimate.quota * 100);
    percentHundreths = Math.round(100 * (estimate.usage / estimate.quota * 100)) / 100
    usageInMib = Math.round(estimate.usage / (1024 * 1024));
    quotaInMib = Math.round(estimate.quota / (1024 * 1024));
    document.getElementById("quotaUsed").innerHTML = usageInMib;
    document.getElementById("quotaTotal").innerHTML = quotaInMib;
    document.getElementById("progressBar").style.width = percentUsed + "%";
    document.getElementById("quotaPercent").innerHTML = percentHundreths;

    if(document.getElementById("quotaTotal").innerHTML == "NaN") {
      document.getElementById("quotaLabel").innerHTML = "Storage information cannot be loaded. Please ensure that your browser is loading content over HTTPS.";
    }

  });
  if(navigator.userAgent.toLowerCase().search(/(chrome|android)/i) == -1 && navigator.userAgent.toLowerCase().search(/safari/i) != -1) {
    document.getElementById("safariStorageNotice").style.display = "inline";
  }
}

function bugReportTxt() {
  var devStr = "";
  if(eclipse.device.android == true) { devStr += "Android "}
  if(eclipse.device.androidChrome == true) { devStr += "AndroidChrome "}
  if(eclipse.device.desktop == true) { devStr += "Desktop "}
  if(eclipse.device.ios == true) { devStr += "iOS "}
  if(eclipse.device.ipad == true) { devStr += "iPad "}
  if(eclipse.device.iphone == true) { devStr += "iPhone "}
  if(eclipse.device.iphoneX == true) { devStr += "iPhoneX "}
  if(eclipse.device.ipod == true) { devStr += "iPod "}

  var ghStr = "";
  ghStr += "%23 Description%0A";
  ghStr += "*Please describe your issue here.*%0A";
  ghStr += "%23 Device Information%0A";

  ghStr += "%23%23 States%0A";
  ghStr += "Audio Enabled: " + localStorage.getItem("audioStatus") + " %0A";
  ghStr += "Auto-Save Enabled: " + localStorage.getItem("autoSave") + " %0A";
  ghStr += "Current Skin Set?: " + String(Boolean(localStorage.getItem("currentSkin"))) + " %0A";
  ghStr += "Desktop Mode Enabled: " + localStorage.getItem("desktopMode") + " %0A";
  ghStr += "Full Screen Enabled: " + localStorage.getItem("fillScreen") + " %0A";
  ghStr += "Game List Initialized?: " + String(Boolean(localStorage.getItem("games"))) + " %0A";
  ghStr += "Repo List Initialized?: " + String(Boolean(localStorage.getItem("repos"))) + " %0A";
  ghStr += "Skin List Initialized?: " + String(Boolean(localStorage.getItem("skins"))) + " %0A";
  ghStr += "Set-Up Successful?: " + localStorage.getItem("setup") + " %0A";

  ghStr += "%23%23 Device%0A";
  ghStr += "Device (F7): " + devStr + " %0A";
  ghStr += "User Agent: " + encodeURI(navigator.userAgent.replace(/\;/g,"-")) + " %0A";
  if(navigator.doNotTrack) {dntState = navigator.doNotTrack} else {dntState = "Not Set"}
  ghStr += "Do Not Track: " + dntState + " %0A";
  ghStr += "Cookies Enabled?: " + navigator.cookieEnabled + " %0A";
  ghStr += "ServiceWorker Support: " + String(Boolean(navigator.serviceWorker)) + " %0A";
  ghStr += "Languages: " + String(navigator.languages) + " %0A";
  ghStr += "Vendor: " + navigator.vendor + " %0A";
  ghStr += "Platform: " + navigator.platform + " %0A";

  ghStr += "%23%23 Benchmarking%0A";
  // Some people sometimes exit Eclipse during benchmarking.
  bench = JSON.parse(localStorage.getItem("benchmark"));
  try {
    ghStr += "Frames Rendered: " + bench[0] + " %0A";
    ghStr += "Number of Squares: " + bench[1] + " %0A";
    ghStr += "Last Frame Time: " + bench[2] + " %0A";
    ghStr += "Average (Mean) Time: " + bench[5] + " %0A";
    ghStr += "Maximum Time: " + bench[4] + " %0A";
    ghStr += "Minimum Time: " + bench[3] + " %0A";
  } catch(err) {
    ghStr += "%0A*No benchmarking data is available.*";
  }

  return ghStr
}

function debugPageInit() {
  document.getElementById("debugAudio").innerHTML = localStorage.getItem("audioStatus");
  document.getElementById("debugAutoSave").innerHTML = localStorage.getItem("autoSave");
  document.getElementById("debugCurrentSkin").innerHTML = String(Boolean(localStorage.getItem("currentSkin")));
  document.getElementById("debugDesktopMode").innerHTML = localStorage.getItem("desktopMode");
  document.getElementById("debugFillScreen").innerHTML = localStorage.getItem("fillScreen");
  document.getElementById("debugGameList").innerHTML = String(Boolean(localStorage.getItem("games")));
  document.getElementById("debugRepoList").innerHTML = String(Boolean(localStorage.getItem("repos")));
  document.getElementById("debugSkinList").innerHTML = String(Boolean(localStorage.getItem("skins")));
  document.getElementById("debugSetup").innerHTML = localStorage.getItem("setup");

  var devStr = "";
  if(eclipse.device.android == true) { devStr += "Android "}
  if(eclipse.device.androidChrome == true) { devStr += "AndroidChrome "}
  if(eclipse.device.desktop == true) { devStr += "Desktop "}
  if(eclipse.device.ios == true) { devStr += "iOS "}
  if(eclipse.device.ipad == true) { devStr += "iPad "}
  if(eclipse.device.iphone == true) { devStr += "iPhone "}
  if(eclipse.device.iphoneX == true) { devStr += "iPhoneX "}
  if(eclipse.device.ipod == true) { devStr += "iPod "}
  document.getElementById("debugDeviceType").innerHTML = devStr;

  document.getElementById("debugUA").innerHTML = navigator.userAgent;
  document.getElementById("debugCookie").innerHTML = navigator.cookieEnabled;
  document.getElementById("debugServiceWorkers").innerHTML = Boolean(navigator.serviceWorker);
  document.getElementById("debugLang").innerHTML = String(navigator.languages);
  document.getElementById("debugVendor").innerHTML = navigator.vendor;
  document.getElementById("debugPlatform").innerHTML = navigator.platform;
  if(navigator.doNotTrack) {dntState = navigator.doNotTrack} else {dntState = "Not Set"}
  document.getElementById("debugTrack").innerHTML = dntState;

  bench = JSON.parse(localStorage.getItem("benchmark"));
  if(bench) {
    document.getElementById("debugFrameNo").innerHTML = bench[0];
    document.getElementById("debugNumSquares").innerHTML = bench[1];
    document.getElementById("debugLastTime").innerHTML = bench[2];
    document.getElementById("debugMeanTime").innerHTML = bench[5];
    document.getElementById("debugMaxT").innerHTML = bench[4];
    document.getElementById("debugMinT").innerHTML = bench[3];
  }

  document.getElementById("ghIssueLink").href = "https://github.com/iGBAEmu/EclipseIssues/issues/new?body=" + bugReportTxt();

}

// Output errors from JS console into debugger: https://stackoverflow.com/a/33418493
  try {
    var baseLogFunction = console.log;
    console.log = function(){
      baseLogFunction.apply(console, arguments);

      try {
        var args = Array.prototype.slice.call(arguments);
        for(var i=0;i<args.length;i++){
          var node = createLogNode(args[i]);
          document.querySelector("#debugConsole").appendChild(node);
        }
      } catch(err) {}

    }

    function createLogNode(message, isError){
      var node = document.createElement("div");
      message = message.replace("%c[Eclipse] %c","").replace("color:#d21c46","").replace("color: gray","");
      var textNode = document.createTextNode(message);
      node.appendChild(textNode);
      if(isError) {
        node.style.color = "#ff8c82";
      }
      return node;
    }

    window.onerror = function(message, url, linenumber) {
      // console.log("<div>Error: \"" + message + "\" on line " +
      //             linenumber + " for " + url + </div>);
      var node = createLogNode("Error: \"" + message + "\" on line " + linenumber + " for " + url, true);
      document.querySelector("#debugConsole").appendChild(node);
    };
  } catch(err) {
    eclipse.error("Ironically, there was an error with the console logger: " + err);
  }

// Init eclipse
var eclipse = new Framework7({
  id: 'com.alphix.Eclipse',
  name: 'Eclipse',
  root: '#app',
  theme: theme,
  data: function() {
    return {
      user: {
        firstName: 'John',
        lastName: 'Doe',
      },
    };
  },
  methods: {
    helloWorld: function() {
      eclipse.dialog.alert('Hello World!');
    },
  },
  routes: routes,
  vi: {
    placementId: 'pltd4o7ibb9rc653x14',
  },
  popup: {
    closeByBackdropClick: false,
  },
});

eclipse.userLog = function(str) {
  eclipse.toast.create({
    text: str,
    closeTimeout: 2000,
  }).open();
  console.info("%c[Eclipse Toast] %c" + str, "color:#d21c46", "color: gray");
}

var addROMs = eclipse.actions.create({
  grid: true,
  buttons: [
    [{
        text: 'Repos',
        onClick: function() {
          eclipse.router.navigate('/gamehub/');
        },
        icon: '<i class="icon f7-icons ios-only color-black">collection_fill</i><i class="icon material-icons md-only">view_carousel</i>'
      },
      {
        text: 'Upload',
        onClick: function() {
          eclipse.uploadROM();
        },
        icon: '<i class="icon f7-icons ios-only color-black">cloud_upload_fill</i><i class="icon material-icons md-only">cloud_upload</i>'
      },
      {
        text: 'Manually',
        onClick: function() {
          eclipse.manuallyAddROM()
        },
        icon: '<i class="icon f7-icons ios-only color-black">add_round_fill</i><i class="icon material-icons md-only">add_circle</i>'
      },
    ]
  ]
});

var gbaEmulationMenu = eclipse.actions.create({
  grid: true,
  buttons: [
    [{
        text: 'Toggle Audio',
        onClick: function() {
          eclipse.gbaToggleEmulationAudio();
        },
        icon: '<i class="icon f7-icons ios-only color-black">volume_fill</i><i class="icon material-icons md-only">volume_up</i>'
      },
      {
        text: 'Speed',
        onClick: function() {
          eclipse.gbaSpeed();
        },
        icon: '<i class="icon f7-icons ios-only color-black">fastforward_round_fill</i><i class="icon material-icons md-only">fast_forward</i>'
      },
      {
        text: 'Fix Controls',
        onClick: function() {
          fixControls();
        },
        icon: '<i class="icon material-icons ios-only color-black">videogame_asset</i><i class="icon material-icons md-only">videogame_asset</i>'
      },
    ],
    [{
        text: 'Save Progress',
        onClick: function() {
          Iodine.exportSave();
          eclipse.dialog.alert('Progress Saved');
        },
        icon: '<i class="icon f7-icons ios-only color-black">folder_fill</i><i class="icon material-icons md-only">save</i>'
      },
      {
        text: 'Close Emulator',
        onClick: function() {
          Iodine.exportSave();
          Iodine.stop();
          eclipse.resetDiscordRPC();
          eclipse.popup.close();
        },
        icon: '<i class="icon f7-icons ios-only color-black">close_round_fill</i><i class="icon material-icons md-only">close</i>'
      },
    ]
  ]
});

var gbEmulationMenu = eclipse.actions.create({
  grid: true,
  buttons: [
    [{
        text: 'Toggle Audio',
        onClick: function() {
          gbEmu.toggleAudio();
        },
        icon: '<i class="icon f7-icons ios-only color-black">volume_fill</i><i class="icon material-icons md-only">volume_up</i>'
      },
      {
        text: 'Speed',
        onClick: function() {
          gbEmu.setSpeed();
        },
        icon: '<i class="icon f7-icons ios-only color-black">fastforward_round_fill</i><i class="icon material-icons md-only">fast_forward</i>'
      },
      {
        text: 'Fix Controls',
        onClick: function() {
          fixControls();
        },
        icon: '<i class="icon material-icons ios-only color-black">videogame_asset</i><i class="icon material-icons md-only">videogame_asset</i>'
      },
    ],
    [{
        text: 'Save Progress',
        onClick: function() {
          gbEmu.saveGame();
          eclipse.dialog.alert('Progress Saved');
        },
        icon: '<i class="icon f7-icons ios-only color-black">folder_fill</i><i class="icon material-icons md-only">save</i>'
      },
      {
        text: 'Close Emulator',
        onClick: function() {
          gbEmu.stopEmu();
          eclipse.resetDiscordRPC();
          eclipse.popup.close();

        },
        icon: '<i class="icon f7-icons ios-only color-black">close_round_fill</i><i class="icon material-icons md-only">close</i>'
      },
    ]
  ]
});

/*var nesEmulationMenu = eclipse.actions.create({
  grid: true,
  buttons: [
    [{
        text: 'Toggle Audio',
        onClick: function() {
          nesEmu.toggleAudio();
        },
        icon: '<i class="icon f7-icons ios-only color-black">volume_fill</i><i class="icon material-icons md-only">volume_up</i>'
      },
      {
        text: 'Speed',
        onClick: function() {
          nesEmu.setSpeed();
        },
        icon: '<i class="icon f7-icons ios-only color-black">fastforward_round_fill</i><i class="icon material-icons md-only">fast_forward</i>'
      },
      {
        text: 'Fix Controls',
        onClick: function() {
          fixControls();
        },
        icon: '<i class="icon f7-icons ios-only color-black">reload_round_fill</i><i class="icon material-icons md-only">videogame_asset</i>'
      },
    ],
    [{
        text: 'Save Progress',
        onClick: function() {
          nesEmu.saveGame();
          eclipse.dialog.alert('Progress Saved');
        },
        icon: '<i class="icon f7-icons ios-only color-black">folder_fill</i><i class="icon material-icons md-only">save</i>'
      },
      {
        text: 'Close Emulator',
        onClick: function() {
          nesEmu.stopEmu();
          eclipse.resetDiscordRPC();
          eclipse.popup.close();
        },
        icon: '<i class="icon f7-icons ios-only color-black">close_round_fill</i><i class="icon material-icons md-only">close</i>'
      },
    ]
  ]
});*/

eclipse.openEmulationMenu = function(system) {
  if (system == "NES") {
    nesEmulationMenu.open();
  } else if (system == "GB") {
    gbEmulationMenu.open();
  } else if (system == "GBC") {
    gbEmulationMenu.open();
  } else if (system == "GBA") {
    gbaEmulationMenu.open();
  } else {
    eclipse.dialog.alert('Invalid System')
  }
}

/* Onload  */

eclipse.load = function() {
  var setup = localStorage.getItem('setup');
  console.log('%c[Eclipse Setup] %c' + setup, "color:#d21c46", "color: gray");
  if (setup === null) {
    eclipse.setup();
  } else {
    eclipse.log('Setup already done');
    eclipse.listLibrary();
    try {
        OpenSkin.getStr(localStorage.getItem('currentSkin'), true);
    } catch(err) {
        // This shouldn't run, but it's fallback. Will reset a bad skin to default.
        //eclipse.userLog("Your skin was reset due to a critical issue. We are sorry for the inconvienence.")
        localStorage.setItem("currentSkin", '{"name":"Default","logo":"https:\/\/eclipseemu.me\/play\/img\/icons\/icon_mobFull.png","author":"Eclipse Team","description":"The default theme for Eclipse.","styles":[[]]}');
    }
    eclipse.updateCurrentSkin();
    eclipse.resizeItems();
  }
  // document.getElementById("splashScreen").fadeOut(1500);
  document.getElementById("splashScreen").classList += "fadeOut"
  window.setTimeout(e => {
    document.getElementById("splashScreen").remove();
  }, 500);
  eclipse.isOffline();
}
/* Basic Functions */

const patchConst = function(str){
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "").replace(/\\/g, "").replace(/`/g, "");
}
Object.defineProperty(eclipse, "patch", {
  value: patchConst,
  writable: false,
  enumerable: false,
  configurable: false
});

eclipse.log = function(message) {
  console.log('%c[Eclipse] %c' + message, "color:#d21c46", "color: gray");
}

eclipse.error = function(message) {
  console.error('%c[Eclipse] %c' + message, "color:#d21c46", "color: gray");
}

eclipse.purgeDuplicates = function(array) {
  eclipse.log('Purging duplicates');
  var obj = {};
  for (var i = 0; i < array.length; i++) {
    obj[array[i]] = true;
  }
  array = [];
  for (var key in obj) {
    array.push(key);
  }
  return array;
}

/* Setup */

eclipse.setup = function() {
  eclipse.setupGamesLibrary();
  eclipse.setupRepos();
  eclipse.setupSkins();
  localStorage.setItem('setup', 'done');
}

eclipse.setupGamesLibrary = function() {
  var games = [];
  localStorage.setItem('games', JSON.stringify(games));
  eclipse.listLibrary();
}

eclipse.setupRepos = function() {
  //var repos = [];
  //repos.push(eclipse.patch('//php.eclipseemu.me/dl/dl.php?dl=http://eclipseemu.me/play/json/repos/eclipse-official.json'));
  //localStorage.setItem('repos', JSON.stringify(repos));
  localStorage.setItem('repos', '[]');
}

eclipse.setupSkins = function() {
  var skins = [];
  skins.push(eclipse.patch('//php.eclipseemu.me/dl/dl.php?dl=https://eclipseemu.me/play/json/skins/default.json')); // default skin
  localStorage.setItem('skins', JSON.stringify(skins));
  localStorage.setItem('currentSkin', '{\"name\":\"Default\",\"logo\":\"https://eclipseemu.me/play/img/icons/icon_mobFull.png\",\"author\":\"Eclipse Team\",\"description\":\"The default theme for Eclipse.\",\"styles\":[[]]}'); // default skin
}

eclipse.parseOldRepo = function(url) {
  jQuery.getJSON(url, function(json) {
    var gamesList = "";
    for (var i = 0; i < json.games.length; i++) {
      gamesList += '{"name":"' + json.games[i].name + '", "link":"' + json.games[i].url + '", "boxart":"' + json.games[i].boxart + '","system":"GBA"},';
    }
    document.write(gamesList);
  });
}

/* Open Emulator Popup */

eclipse.openNES = function(link) {
  //eclipse.preloader.show();
  setTimeout(function() {
    eclipse.popup.open(".popup-nes")
    eclipse.resizeItems();
    loadNESROM(link);
  }, 100);
}

eclipse.openGB = function(link) {
  //eclipse.preloader.show();
  setTimeout(function() {
    document.getElementById("gb-title").innerHTML = "GB";
    eclipse.popup.open(".popup-gb")
    gbEmu.initEmu();
    gbEmu.loadROMURL("//php.eclipseemu.me/dl/dl.php?dl=" + link);
    try {
      registerAudioHandler();
      Iodine.enableAudio()
    } catch (err) { /* so the ting closes */ }
  }, 100);
}

eclipse.openGBC = function(link) {
  //eclipse.preloader.show();
  setTimeout(function() {
    document.getElementById("gb-title").innerHTML = "GBC";
    eclipse.popup.open(".popup-gb")
    gbEmu.initEmu();
    gbEmu.loadROMURL("//php.eclipseemu.me/dl/dl.php?dl=" + link);
    try {
      registerAudioHandler();
      Iodine.enableAudio()
    } catch (err) { /* so the ting closes */ }
  }, 100);
}

eclipse.openGBA = function(link) {
  eclipse.preloader.show();
  setTimeout(function() {
    eclipse.popup.open(".popup-gba")
    eclipse.resizeItems();
    loadIodineCoreGlue(link);
  }, 100);
}

/* ROM Library */

eclipse.addROM = function(name, boxart, link, system) {

  link = eclipse.patch(link);
  name = eclipse.patch(name);
  system = eclipse.patch(system);
  boxart = eclipse.patch(boxart);

  if (boxart.toLowerCase().match(/\.(jpeg|jpg|gif|png)$/)) {} else if (boxart.toLowerCase().startsWith("data:image")) {} else {
    console.error(boxart + " is not an image.");
    eclipse.dialog.alert('Incorrect image format.');
    return false;
  }
  // if (link.toLowerCase().includes(".gba") == true) {} else {
  //   console.error(link + " is not a GBA ROM.");
  //   eclipse.dialog.alert('Incorrect GBA ROM format.');
  //   return false;
  // }
  var json = '{"name":"' + name + '", "boxart":"' + boxart + '", "link":"' + link + '", "system":"' + system + '"}';
  var games = JSON.parse(localStorage.getItem('games'));
  games.push(json);
  localStorage.setItem('games', JSON.stringify(eclipse.purgeDuplicates(games)));
  // eclipse.dialog.alert(name + ' has been added to your library');
  eclipse.userLog(name + ' has been added to your library')
  eclipse.listLibrary()
}

eclipse.removeROM = function(index) {
  var games = JSON.parse(localStorage.getItem('games'));
  var name = JSON.parse(games[index]).name;
  eclipse.dialog.confirm('Are you sure you want to remove ' + name + '?', function() {
    games.splice(index, 1);
    localStorage.setItem("games", JSON.stringify(games));
    eclipse.listLibrary();
    // eclipse.dialog.alert(name + ' has been removed.');
    eclipse.userLog(name + ' has been removed.');
  });
}

eclipse.loadROM = function(index) {
  fixControls();
  var games = JSON.parse(localStorage.getItem('games'));
  var link = JSON.parse(games[index]).link;
  var system = JSON.parse(games[index]).system;
  if (system == "NES") {
    eclipse.openNES(link);
  } else if (system == "GB") {
    currentEmu = "GB";
    eclipse.openGB(link);
  } else if (system == "GBC") {
    currentEmu = "GBC";
    eclipse.openGBC(link);
  } else if (system == "GBA") {
    currentEmu = "GBA";
    eclipse.openGBA(link);
  } else {
    eclipse.dialog.alert('Invalid System')
  }

  try {
    gameName = JSON.parse(games[index]).name
    document.getElementById("discordGameName").innerHTML = gameName;
    document.getElementById("discordPlatformName").innerHTML = system;
    // This code will err unless Desktop is running
    try {
      sendGameInfo(gameName, system)
    } catch (err) {
      eclipse.log("Desktop client not detected.")
    }
  } catch (err) {
    eclipse.log("Cannot load ROM into Discord elements: " + err);
  }

}

eclipse.uploadROM = function() {
  var uploadROMPopup = eclipse.popup.create({
    content: '<div class="popup">' +
      '<div class="navbar">' +
      '<div class="navbar-inner sliding">' +
      '<div class="left">' +
      '<a href="#" class="link popup-close back"><i class="icon material-icons md-only">close</i><div class="ios-only">Close</div></a>' +
      '</div>' +
      '<div class="title">Upload ROM</div>' +
      '</div>' +
      '</div>' +
      '<div class="list inset">' +
      '<ul>' +
      '<li>' +
      '<div class="item-content item-input">' +
      '<div class="item-inner">' +
      '<div class="item-title item-label">File</div>' +
      '<div class="item-input-wrap">' +
      '<input id="romUpload" name="romUpload" type="file">' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</li>' +
      /*'<li>' +
      '<div class="item-content item-input">' +
      '<div class="item-inner">' +
      '<div class="item-title item-label">System</div>' +
      '<div class="item-input-wrap">' +
      '<select id="systemsList">' +
      '<option value="NES">NES</option>' +
      '<option value="GB">GB</option>' +
      '<option value="GBC">GBC</option>' +
      '<option value="GBA">GBA</option>' +
      '</select>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</li>' +*/
      '</ul>' +
      '</div>' +
      '<div class="block">' +
      // '<p>As of now the only emulators with upload support are:</p>' +
      // '<ul>' +
      // '<li>NES</li>' +
      // '<li>GB</li>' +
      // '<li>GBC</li>' +
      // '</ul>' +
      '<div class="col-100 tablet-33">' +
      '</div>' +
      '<div class="col-100 tablet-33">' +
      '<a href="#" onclick="eclipse.loadUploadedROM();" class="gradient button active button-big button-round popup-close" style="box-shadow: 0 5px 13px 0 rgba(0, 0, 0, .1); border:none; color:#fff; font-weight:bold; margin:16px;">LOAD ROM</a>' +
      '</div>' +
      '<div class="col-100 tablet-33">' +
      '</div>' +
      '</div>' +
      '</div>',
    // Events
    on: {
      open: function(popup) {
        console.log('Popup open');
      },
      opened: function(popup) {
        console.log('Popup opened');
      },
    }
  });
  uploadROMPopup.open();
  document.getElementById('romUpload').addEventListener('change', handleUploadROM, false);
}

eclipse.loadUploadedROM = function() {
  //var systemList = document.getElementById("systemsList");
  //var system = systemList.options[systemList.selectedIndex].value;
  var system = document.getElementById("romUpload").value.lastIndexOf('.');
  system = document.getElementById("romUpload").value.substring(system + 1);
  system = system.toUpperCase().replace("?DL=1", "");
  var file = document.getElementById("romUpload");
  if (system == "NES") {
    eclipse.popup.open(".popup-nes");
    eclipse.loadNESROM(file);
    eclipse.resizeItems();
  } else if (system == "GB") {
    currentEmu = "GB";
    document.getElementById("gb-title").innerHTML = "GB";
    eclipse.popup.open(".popup-gb")
    var DEBUG_MESSAGES = false;
    var DEBUG_WINDOWING = false;
    gbEmu.initEmu();
    gbEmu.uploadROM(file);
    eclipse.resizeItems();
  } else if (system == "GBC") {
    currentEmu = "GBC";
    document.getElementById("gb-title").innerHTML = "GBC";
    eclipse.popup.open(".popup-gb")
    var DEBUG_MESSAGES = false;
    var DEBUG_WINDOWING = false;
    gbEmu.initEmu();
    gbEmu.uploadROM(file);
    eclipse.resizeItems();
  } else if (system == "GBA") {
    currentEmu = "GBA";
    // Some code below deals with the uploadROMBase64 element.
    uploadROMBase64 = document.getElementById("uploadROMBase64").innerHTML;
    eclipse.popup.open(".popup-gba")
    eclipse.resizeItems();
    loadUploadedGBAGame("data:text/plain;charset=x-user-defined;base64," + uploadROMBase64);
    loadControls();
  } else {
    eclipse.dialog.alert('Invalid System');
  }
}

// Upload change tracker: I honestly hate the code, but it's better than working with file uploads. Stolen from fontPages.
var uploadROMBase64;
var handleUploadROM = function(evt) {
  var files = evt.target.files;
  var file = files[0];
  if (files && file) {
    var reader = new FileReader();
    reader.onload = function(readerEvt) {
      uploadROMBase64 = window.btoa(readerEvt.target.result);
      document.getElementById("uploadROMBase64").innerHTML = uploadROMBase64;
    };
    reader.readAsBinaryString(file);
  }
};

eclipse.manuallyAddROM = function() {

  var manuallyROMPopup = eclipse.popup.create({
    content: '<div class="popup">' +
      '<div class="navbar">' +
      '<div class="navbar-inner sliding">' +
      '<div class="left">' +
      '<a href="#" class="link popup-close back"><i class="icon material-icons md-only">close</i><div class="ios-only">Close</div></a>' +
      '</div>' +
      '<div class="title">Manually Add ROM</div>' +
      '</div>' +
      '</div>' +
      '<div class="list inset">' +
      '<ul>' +
      '<li>' +
      '<div class="item-content item-input">' +
      '<div class="item-inner">' +
      '<div class="item-title item-label">Name</div>' +
      '<div class="item-input-wrap">' +
      '<input type="text" name="name" placeholder="Name" id="Name">' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</li>' +
      '<li>' +
      '<div class="item-content item-input">' +
      '<div class="item-inner">' +
      '<div class="item-title item-label">Boxart</div>' +
      '<div class="item-input-wrap">' +
      '<input type="url" name="boxart" placeholder="Boxart" id="Boxart">' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</li>' +
      '<li>' +
      '<div class="item-content item-input">' +
      '<div class="item-inner">' +
      '<div class="item-title item-label">Link</div>' +
      '<div class="item-input-wrap">' +
      '<input type="url" name="link" placeholder="Link" id="Link">' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</li>' +
      /*'<li>' +
      '<div class="item-content item-input">' +
      '<div class="item-inner">' +
      '<div class="item-title item-label">System</div>' +
      '<div class="item-input-wrap">' +
      '<select id="systemsList">' +
      '<option value="NES">NES</option>' +
      '<option value="GB">GB</option>' +
      '<option value="GBC">GBC</option>' +
      '<option value="GBA">GBA</option>' +
      '</select>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</li>' +*/
      '</ul>' +
      '</div>' +
      '<div class="col-100 tablet-33">' +
      '</div>' +
      '<div class="col-100 tablet-33">' +
      '<a href="#" onclick="eclipse.addManually();" class="gradient button active button-big button-round popup-close" style="box-shadow: 0 5px 13px 0 rgba(0, 0, 0, .1); border:none; color:#fff; font-weight:bold; margin:16px;">ADD ROM</a>' +
      '</div>' +
      '<div class="col-100 tablet-33">' +
      '</div>' +
      '</div>',
    // Events
    on: {
      open: function(popup) {
        console.log('Popup open');
      },
      opened: function(popup) {
        console.log('Popup opened');
      },
    }
  });
  manuallyROMPopup.open();
}

eclipse.addManually = function() {
  var name = document.getElementById("Name").value
  var link = document.getElementById("Link").value
  //var systemList = document.getElementById("systemsList");
  //var system = systemList.options[systemList.selectedIndex].value;
  var system = document.getElementById("Link").value.lastIndexOf('.');
  system = document.getElementById("Link").value.substring(system + 1);
  system = system.toUpperCase().replace("?DL=1", "");
  var boxart = document.getElementById("Boxart").value
  eclipse.addROM(name, boxart, link, system);
}

eclipse.editROM = function(index) {
  var games = JSON.parse(localStorage.getItem('games'));

  var editROMPopup = eclipse.popup.create({
    content: '<div class="popup">' +
      '<div class="navbar">' +
      '<div class="navbar-inner sliding">' +
      '<div class="left">' +
      '<a href="#" class="link popup-close back"><i class="icon material-icons md-only">close</i><div class="ios-only">Close</div></a>' +
      '</div>' +
      '<div class="title">Edit “' + JSON.parse(games[index]).name + '”</div>' +
      '</div>' +
      '</div>' +
      '<div class="list inset">' +
      '<ul>' +
      '<li>' +
      '<div class="item-content item-input">' +
      '<div class="item-inner">' +
      '<div class="item-title item-label">Name</div>' +
      '<div class="item-input-wrap">' +
      '<input type="text" name="name" placeholder="Name" id="Name" value="' + JSON.parse(games[index]).name + '">' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</li>' +
      '<li>' +
      '<div class="item-content item-input">' +
      '<div class="item-inner">' +
      '<div class="item-title item-label">Boxart</div>' +
      '<div class="item-input-wrap">' +
      '<input type="url" name="boxart" placeholder="Boxart" id="Boxart" value="' + JSON.parse(games[index]).boxart + '">' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</li>' +
      '<li>' +
      '<div class="item-content item-input">' +
      '<div class="item-inner">' +
      '<div class="item-title item-label">Link</div>' +
      '<div class="item-input-wrap">' +
      '<input type="url" name="link" placeholder="Link" id="Link" value="' + JSON.parse(games[index]).link + '">' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</li>' +
      '<li>' +
      '<div class="item-content item-input">' +
      '<div class="item-inner">' +
      '<div class="item-title item-label">System</div>' +
      '<div class="item-input-wrap">' +
      '<select id="systemsList">' +
      '<option id="NESOption" value="NES">NES</option>' +
      '<option id="GBOption" value="GB">GB</option>' +
      '<option id="GBCOption" value="GBC">GBC</option>' +
      '<option id="GBAOption" value="GBA">GBA</option>' +
      '</select>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</li>' +
      '</ul>' +
      '</div>' +
      '<div class="col-100 tablet-33">' +
      '</div>' +
      '<div class="col-100 tablet-33">' +
      '<a href="#" onclick="eclipse.editROMValues(' + index + ')" class="gradient button active button-big button-round popup-close" style="box-shadow: 0 5px 13px 0 rgba(0, 0, 0, .1); border:none; color:#fff; font-weight:bold; margin:16px;">SAVE CHANGES</a>' +
      '</div>' +
      '<div class="col-100 tablet-33">' +
      '</div>' +
      '</div>',
    // Events
    on: {
      open: function(popup) {
        document.getElementById(JSON.parse(games[index]).system + "Option").selected = "true";
      },
      opened: function(popup) {
        console.log('Popup opened');
      },
    }
  });
  editROMPopup.open();
}

eclipse.editROMValues = function(index) {
  var name = document.getElementById("Name").value;
  var link = document.getElementById("Link").value;
  var systemList = document.getElementById("systemsList");
  var system = systemList.options[systemList.selectedIndex].value;
  var boxart = document.getElementById("Boxart").value;
  var games = JSON.parse(localStorage.getItem('games'));
  games.splice(index, 1);
  localStorage.setItem("games", JSON.stringify(games));

  link = eclipse.patch(link);
  name = eclipse.patch(name);
  system = eclipse.patch(system);
  boxart = eclipse.patch(boxart);

  if (boxart.toLowerCase().match(/\.(jpeg|jpg|gif|png)$/)) {} else if (boxart.toLowerCase().startsWith("data:image")) {} else {
    console.error(boxart + " is not an image.");
    eclipse.dialog.alert('Incorrect image format.');
    return false;
  }
  var json = '{"name":"' + name + '", "boxart":"' + boxart + '", "link":"' + link + '", "system":"' + system + '"}';
  var games = JSON.parse(localStorage.getItem('games'));
  games.push(json);
  localStorage.setItem('games', JSON.stringify(eclipse.purgeDuplicates(games)));

  eclipse.listLibrary();
}

eclipse.listLibrary = function() {
  var games = localStorage.getItem('games');
  games = JSON.parse(games);
  if (games.length > 0) {
    var gamesList = "<div class=\"row\">";

    var libraryRows = games.length % 5;
    var emptySlots = 5 - libraryRows;

    for (var i = 0; i < games.length; i++) {
      gamesList += "<div class=\"col-50 tablet-20\">" +
        "<a href=\"#\" onclick=\"eclipse.romMenu('" + i + "')\">" +
        "<li class=\"card\">" +
        "<div class=\"card-content\">" +
        "<img src=\"" + eclipse.patch(JSON.parse(games[i]).boxart) + "\" class=\"boxart\">" +
        "</div>" +
        "<div class=\"card-footer\"><text class=\"card-footer-inner-text\">" + eclipse.patch(JSON.parse(games[i]).name) + "</text></div>" +
        "</li>" +
        "</a>" +
        "</div>";
    }
    for (var ii = 0; ii < emptySlots; ii++) {
      gamesList += "<div class=\"col-50 tablet-20\"></div>";
    }
    try {
      document.getElementById("games-list").innerHTML = gamesList + "</div>"
    } catch (err) {
      eclipse.error(err)
    }
  } else {
    emptyLibrary = "<div class=\"block\"><center><h1 style=\"color:#333;\">Empty Library!</h1><h2>Press \"+\" to add some games.</h2></center></div>"
    document.getElementById("games-list").innerHTML = emptyLibrary;
  }
  // Reset RPC for Desktop users
  eclipse.resetDiscordRPC();
}

eclipse.romMenu = function(index) {
  if (navigator.onLine == false) {
    var romMenu = eclipse.actions.create({
      grid: true,
      buttons: [
        [{
            text: 'Remove',
            onClick: function() {
              eclipse.removeROM(index)
            },
            icon: '<i class="icon f7-icons ios-only color-black">trash_fill</i><i class="icon material-icons md-only">delete</i>'
          },
          {
            text: 'Play',
            disabled: true,
            onClick: function() {
              // eclipse.loadROM(index)
            },
            icon: '<i class="icon f7-icons ios-only color-black disabled">play_round_fill</i><i class="icon material-icons md-only disabled">play_circle_filled</i>'
          },
          {
            text: 'Edit',
            onClick: function() {
              eclipse.editROM(index)
            },
            icon: '<i class="icon f7-icons ios-only color-black">compose_fill</i><i class="icon material-icons md-only">mode_edit</i>'
          },
        ]
      ]
    });
  } else {
    var romMenu = eclipse.actions.create({
      grid: true,
      buttons: [
        [{
            text: 'Remove',
            onClick: function() {
              eclipse.removeROM(index)
            },
            icon: '<i class="icon f7-icons ios-only color-black">trash_fill</i><i class="icon material-icons md-only">delete</i>'
          },
          {
            text: 'Play',
            onClick: function() {
              eclipse.loadROM(index)
            },
            icon: '<i class="icon f7-icons ios-only color-black">play_round_fill</i><i class="icon material-icons md-only">play_circle_filled</i>'
          },
          {
            text: 'Edit',
            onClick: function() {
              eclipse.editROM(index)
            },
            icon: '<i class="icon f7-icons ios-only color-black">compose_fill</i><i class="icon material-icons md-only">mode_edit</i>'
          },
        ]
      ]
    });
  }
  romMenu.open();

}
/*
  Repos
*/

eclipse.addRepoPrompt = function() {
  eclipse.dialog.prompt('Enter a Repo URL', function(url) {
    eclipse.addRepo(url);
  });
}

eclipse.addRepo = function(url) {
  url = eclipse.patch(url);
  if (!url.toLowerCase().includes(".json") && !url.toLowerCase().includes(".php")) {
    eclipse.error(url + " is not a repo.");
    eclipse.dialog.alert('Incorrect repo format.');
    return false;
  }
  var repoValidationCheck = new XMLHttpRequest();
  repoValidationCheck.onreadystatechange = function() {
    if (this.readyState == 4) {
      if (repoValidationCheck.responseText == null || repoValidationCheck.responseText == "null") {
        eclipse.dialog.alert('The specified URL is invalid.');
        return false;
      } else {
        var reponame = "";
        try { 
          if (JSON.parse(repoValidationCheck.responseText).categories == null) { 
            eclipse.dialog.alert('The repo contains invalid JSON.'); console.warn(repoValidationCheck.responseText); return false; 
          }
          reponame = eclipse.patch(JSON.parse(repoValidationCheck.responseText).reponame);
        } catch (e) {
          eclipse.dialog.alert('The repo contains invalid JSON.'); console.warn(repoValidationCheck.responseText);
          return false;
        }
        var repos = JSON.parse(localStorage.getItem('repos'));
        repos.push("//php.eclipseemu.me/dl/dl.php?dl=" + eclipse.patch(url));
        localStorage.setItem('repos', JSON.stringify(eclipse.purgeDuplicates(repos)));
        eclipse.userLog(reponame + ' has been added.');
        eclipse.listRepos();
        return true;
      }
  }
}
repoValidationCheck.open("GET", "//php.eclipseemu.me/dl/dl.php?dl=" + url, true);
repoValidationCheck.send();
}

eclipse.removeRepo = function(index) {
  var repos = JSON.parse(localStorage.getItem('repos'));
  eclipse.dialog.confirm('Are you sure you want to remove this repo?', function() {
    games.splice(index, 1);
    localStorage.setItem("repos", JSON.stringify(repos));
    eclipse.listRepos();
    jQuery.getJSON(repos[index], function(json) {
      // eclipse.dialog.alert(eclipse.patch(json.reponame) + ' has been removed.');
      eclipse.userLog(eclipse.patch(json.reponame) + ' has been removed.');
    });
  });
}

function getRepoIcon(i) {
  var repos = JSON.parse(localStorage.getItem('repos'));
  jQuery.getJSON(repos[i], function(json) {
    document.getElementById("repoIcon" + i).src = eclipse.patch(json.repologo);
  });
}

function getRepoName(i) {
  var repos = JSON.parse(localStorage.getItem('repos'));
  jQuery.getJSON(repos[i], function(json) {
    document.getElementById("repoName" + i).innerHTML = eclipse.patch(json.reponame);
  });
}

function getRepoAuthor(i) {
  var repos = JSON.parse(localStorage.getItem('repos'));
  jQuery.getJSON(repos[i], function(json) {
    document.getElementById("repoAuthor" + i).innerHTML = eclipse.patch(json.repoauthor);
  });
}

function getRepoURL(i) {
  var repos = JSON.parse(localStorage.getItem('repos'));
  return repos[i];
}

eclipse.listRepos = function() {
  var repos = localStorage.getItem('repos');
  repos = JSON.parse(repos);
  if (repos.length > 0) {
    var reposList = "<ul>";
    for (var i = 0; i < repos.length; i++) {
      jQuery.getJSON(repos[i], function(json) {
        reposList += '<li class="swipeout">' +
          '<div class="swipeout-content">' +
          '<a href="#" onclick="eclipse.showRepo(\'' + getRepoURL(i) + '\', \'' + i + '\'); eclipse.dialog.preloader(\'Loading\');" class="item-link item-content">' +
          '<div class="item-media"><img id="repoIcon' + i + '" src="'+loadingGIF+'" width="44px" style="border-radius:44px;border:none"/></div>' +
          '<div class="item-inner">' +
          '<div class="item-title">' +
          '<span id="repoName' + i + '"></span>' +
          '<div class="item-footer" id="repoAuthor' + i + '"></div>' +
          '</div>' +
          '</div>' +
          '</a>' +
          '</div>' +
          '<div class="swipeout-actions-right">' +
          '<a href="#" style="background: #fe3b30" onclick="eclipse.deleteRepo(' + i + ')">Delete</a>' +
          '</div>' +
          '</li>';
        document.getElementById("repos-list").innerHTML = reposList + "</ul>";
        getRepoAuthor(i);
        getRepoName(i);
        getRepoIcon(i);
      }(i));
    }
  } else {
    emptyList = "<div class=\"block\"><center><h1 style=\"color:#333;\">No Repos!</h1><h2>Add some repos and they'll appear here.</h2></center></div>"
    document.getElementById("repos-list").innerHTML = emptyList;
  }
}

eclipse.listFeaturedRepos = function() {
  eclipse.log('Initiated Loading Featured Repos');
  jQuery.getJSON("//php.eclipseemu.me/dl/dl.php?dl=https://eclipseemu.me/play/json/repos/featured.json", function(json) {
    var featuredList = "<div class=\"row\">";
    var libraryRows = json.length % 5;
    var emptySlots = 5 - libraryRows;
    for (var i = 0; i < json.length; i++) {
      featuredList += "<div class=\"col-50 tablet-20\">" +
        "<a href=\"#\" onclick=\"eclipse.addRepo('" + json[i].link + "')\">" +
        "<li class=\"card\">" +
        "<div class=\"card-content\">" +
        "<img src=\"" + json[i].icon + "\" class=\"boxart\">" +
        "</div>" +
        "<div class=\"card-footer\"><text class=\"card-footer-inner-text\">" + json[i].name + "</text></div>" +
        "</li>" +
        "</a>" +
        "</div>";
    }
    for (var ii = 0; ii < emptySlots; ii++) {
      featuredList += "<div class=\"col-50 tablet-20\"></div>";
    }
    document.getElementById("featured-repos").innerHTML = featuredList + "</div>";
  });
}

eclipse.showRepoData = function() {
  jQuery.getJSON(repoURL, function(json) {
    document.getElementById("repoNameNavbar").innerHTML = eclipse.patch(json.reponame);
    document.getElementById("repoName").innerHTML = eclipse.patch(json.reponame);
    document.getElementById("repoAuthor").innerHTML = eclipse.patch(json.repoauthor);
    document.getElementById("repoLogo").src = eclipse.patch(json.repologo);
    if (json.repodesc != null) {
      document.getElementById("repoDesc").style.display = "block";
      document.getElementById("repoDesc").innerHTML = eclipse.patch(json.repodesc);
    } else {
      document.getElementById("repoDesc").style.display = "none";
      document.getElementById("repoDesc").innerHTML = "\x00";
    }
    document.getElementById("repoPageHead").className += "faded-in-loaded";
    var categories = json.categories;
    if (categories.length > 0) {
      var categoriesList = "";
      for (var i = 0; i < categories.length; i++) {
        categoriesList += '<li class="item-divider">' + eclipse.patch(categories[i].categoryname) + '</li>';
        for (var ii = 0; ii < categories[i].games.length; ii++) {
          categoriesList += '<li>' +
            '<a href="#" onclick="eclipse.addROM(\'' + eclipse.patch(categories[i].games[ii].name) + '\', \'' + eclipse.patch(categories[i].games[ii].boxart) + '\', \'' + eclipse.patch(categories[i].games[ii].link) + '\', \'' + eclipse.patch(categories[i].games[ii].system) + '\')" class="item-link item-content">' +
            '<div class="item-media"><img src="' + eclipse.patch(categories[i].games[ii].boxart) + '" width="44px" style="border-radius:3px;"/></div>' +
            '<div class="item-inner">' +
            '<div class="item-title">' +
            '<span>' + eclipse.patch(categories[i].games[ii].name) + '</span>' +
            '<div class="item-footer">' + eclipse.patch(categories[i].games[ii].system) + '</div>' +
            '</div>' +
            '</div>' +
            '</a>' +
            '</li>';
        }
        document.getElementById("categories").innerHTML = categoriesList;
      }
      document.getElementById("categories").parentElement.className += "faded-in-loaded";
    } else {
      emptyList = "<div class=\"block\"><center><h1 style=\"color:#333;\">No ROMs!</h1><h2>The maintainer of this repo hasn't added any ROMs yet.</h2></center></div>"
      document.getElementById("categories").innerHTML = emptyList;
    }
    eclipse.dialog.close();
  });
}

eclipse.showRepo = function(url, i) {
  repoURL = url;
  repoIndex = i;
  eclipse.router.navigate('/repo/');
}

eclipse.deleteRepo = function(i) {
  var repos = JSON.parse(localStorage.getItem('repos'));
  repos.splice(i, 1);
  localStorage.setItem("repos", JSON.stringify(repos));
  eclipse.listRepos();
}

/*
  Skins
*/

eclipse.addSkinPrompt = function() {
  eclipse.dialog.prompt('Enter a Skin URL', function(url) {
    eclipse.addSkin(url);
  });
}

eclipse.addSkin = function(url) {
  url = eclipse.patch("//php.eclipseemu.me/dl/dl.php?dl=" + url);
  if (!url.toLowerCase().includes(".json") && !url.toLowerCase().includes(".php")) {
    eclipse.error(url + " is not a skin.");
    eclipse.dialog.alert('Incorrect skin format.');
    return false;
  }
  var skins = JSON.parse(localStorage.getItem('skins'));
  skins.push(eclipse.patch(url));
  localStorage.setItem('skins', JSON.stringify(eclipse.purgeDuplicates(skins)));
  jQuery.getJSON(url, function(json) {
    // eclipse.dialog.alert(eclipse.patch(json.skinname) + ' has been added.');
    eclipse.userLog(eclipse.patch(json.name) + ' has been added.');
  });
  eclipse.listSkins()
}

eclipse.removeSkin = function(index) {
  var skins = JSON.parse(localStorage.getItem('skins'));
  eclipse.dialog.confirm('Are you sure you want to remove this skin?', function() {
    games.splice(index, 1);
    localStorage.setItem("skins", JSON.stringify(skins));
    eclipse.listSkins();
    jQuery.getJSON(skins[index], function(json) {
      // eclipse.dialog.alert(eclipse.patch(json.skinname) + ' has been removed.');
      eclipse.userLog(eclipse.patch(json.name) + ' has been removed.');
    });
  });
}

function getSkinIcon(i) {
  var skins = JSON.parse(localStorage.getItem('skins'));
  jQuery.getJSON(skins[i], function(json) {
    document.getElementById("skinIcon" + i).src = eclipse.patch(json.logo);
  });
}

function getSkinName(i) {
  var skins = JSON.parse(localStorage.getItem('skins'));
  jQuery.getJSON(skins[i], function(json) {
    document.getElementById("skinName" + i).innerHTML = eclipse.patch(json.name);
  });
}

function getSkinAuthor(i) {
  var skins = JSON.parse(localStorage.getItem('skins'));
  jQuery.getJSON(skins[i], function(json) {
    document.getElementById("skinAuthor" + i).innerHTML = eclipse.patch(json.author);
  });
}

function getSkinURL(i) {
  var skins = JSON.parse(localStorage.getItem('skins'));
  return skins[i];
}

eclipse.setDefaultSkin = function(url) {
  // OpenSkin.getJSON(url, true)
  jQuery.getJSON(url, function(json) {
    try {
      curSkin = JSON.stringify(json);
      localStorage.setItem('currentSkin', curSkin);
      OpenSkin.getStr(curSkin,true);
      eclipse.updateCurrentSkin(true);
    } catch (err) {
      eclipse.error(err);
    }
  });
}

eclipse.updateCurrentSkin = function(isSetDefault) {
  var currentSkin = localStorage.getItem('currentSkin');
  json = JSON.parse(currentSkin);
    try {
      document.getElementById("currentSkinName").innerHTML = eclipse.patch(json.name);
      document.getElementById("currentSkinArtist").innerHTML = eclipse.patch(json.author);
      document.getElementById("currentSkinLogo").src = eclipse.patch(json.logo);
      if (isSetDefault) {
        eclipse.userLog(eclipse.patch(json.name) + ' was applied.');
      }
    } catch (err) {
      eclipse.error(err);
    }

}

eclipse.deleteSkin = function(i) {
  var skins = JSON.parse(localStorage.getItem('skins'));
  skins.splice(i, 1);
  localStorage.setItem("skins", JSON.stringify(skins));
  eclipse.listSkins();
}

eclipse.listSkins = function() {
  var skins = localStorage.getItem('skins');
  var currentSkin = localStorage.getItem('currentSkin');
  eclipse.updateCurrentSkin();

  skins = JSON.parse(skins);
  if (skins.length > 0) {
    var skinsList = "<ul>";
    for (var i = 0; i < skins.length; i++) {
      jQuery.getJSON(skins[i], function(json) {
        skinsList += '<li class="swipeout" >' +
          '<div class="swipeout-content">' +
          '<a href="#" onclick="eclipse.setDefaultSkin(\'' + getSkinURL(i) + '\')" class="item-link item-content">' +
          '<div class="item-media"><img id="skinIcon' + i + '" src="'+loadingGIF+'" width="44px" style="border-radius:44px;"/></div>' +
          '<div class="item-inner">' +
          '<div class="item-title">' +
          '<span id="skinName' + i + '"></span>' +
          '<div class="item-footer" id="skinAuthor' + i + '">Author</div>' +
          '</div>' +
          '</div>' +
          '</a>' +
          '</div>' +
          '<div class="swipeout-actions-right">' +
          '<a href="#" style="background: #fe3b30" onclick="eclipse.deleteSkin(' + i + ')">Delete</a>' +
          '</div>' +
          '</li>';
        document.getElementById("skins-list").innerHTML = skinsList + "</ul>";
        getSkinAuthor(i);
        getSkinName(i);
        getSkinIcon(i);
      }(i));
    }
  } else {
    emptyList = "<div class=\"block\"><center><h1 style=\"color:#333;\">No Skins!</h1><h2>Add some skins and they'll appear here.</h2></center></div>"
    document.getElementById("skins-list").innerHTML = emptyList;
  }
}


eclipse.listFeaturedSkins = function() {
  eclipse.log('Initiated Loading Featured Skins');
  jQuery.getJSON("//php.eclipseemu.me/dl/dl.php?dl=https://eclipseemu.me/play/json/skins/featured.json", function(json) {
    var featuredList = "<div class=\"row\">";
    var libraryRows = json.length % 5;
    var emptySlots = 5 - libraryRows;
    for (var i = 0; i < json.length; i++) {
      featuredList += "<div class=\"col-50 tablet-20\">" +
        "<a href=\"#\" onclick=\"eclipse.addSkin('" + json[i].link + "')\">" +
        "<li class=\"card\">" +
        "<div class=\"card-content\">" +
        "<img src=\"" + json[i].icon + "\" class=\"boxart\">" +
        "</div>" +
        "<div class=\"card-footer\"><text class=\"card-footer-inner-text\">" + json[i].name + "</text></div>" +
        "</li>" +
        "</a>" +
        "</div>";
    }
    for (var ii = 0; ii < emptySlots; ii++) {
      featuredList += "<div class=\"col-50 tablet-20\"></div>";
    }
    document.getElementById("featured-skins").innerHTML = featuredList + "</div>";
  });
}

eclipse.showSkinData = function() {
  jQuery.getJSON(skinURL, function(json) {
    document.getElementById("skinNameNavbar").innerHTML = eclipse.patch(json.skinname);
    document.getElementById("skinName").innerHTML = eclipse.patch(json.skinname);
    document.getElementById("skinAuthor").innerHTML = eclipse.patch(json.skinauthor);
    document.getElementById("skinLogo").src = eclipse.patch(json.skinlogo);
    document.getElementById("skinDesc").innerHTML = eclipse.patch(json.skindesc);
    var categories = json.categories;
    if (categories.length > 0) {
      var categoriesList = "";
      for (var i = 0; i < categories.length; i++) {
        categoriesList += '<li class="item-divider">' + eclipse.patch(categories[i].categoryname) + '</li>';
        for (var ii = 0; ii < categories[i].games.length; ii++) {
          categoriesList += '<li>' +
            '<a href="#" onclick="eclipse.addROM(\'' + eclipse.patch(categories[i].games[ii].name) + '\', \'' + eclipse.patch(categories[i].games[ii].boxart) + '\', \'' + eclipse.patch(categories[i].games[ii].link) + '\', \'' + eclipse.patch(categories[i].games[ii].system) + '\')" class="item-link item-content">' +
            '<div class="item-media"><img src="' + eclipse.patch(categories[i].games[ii].boxart) + '" width="44px" style="border-radius:3px;"/></div>' +
            '<div class="item-inner">' +
            '<div class="item-title">' +
            '<span>' + eclipse.patch(categories[i].games[ii].name) + '</span>' +
            '<div class="item-footer">' + eclipse.patch(categories[i].games[ii].system) + '</div>' +
            '</div>' +
            '</div>' +
            '</a>' +
            '</li>';
        }
        document.getElementById("categories").innerHTML = categoriesList;
      }
    } else {
      emptyList = "<div class=\"block\"><center><h1 style=\"color:#333;\">No ROMs!</h1><h2>The maintainer of this skin hasn't added any ROMs yet.</h2></center></div>"
      document.getElementById("categories").innerHTML = emptyList;
    }
  });
}

eclipse.resetRepo = function() {
  eclipse.dialog.confirm('Are you sure you want to clear your installed repos? This cannot be undone.', "Reset Repos?", function() {
    localStorage.setItem("repos", "[]");
    eclipse.userLog("Installed repos have been cleared.");
  });
}

eclipse.resetGames = function() {
  eclipse.dialog.confirm('Are you sure you want to clear your installed games? This cannot be undone.', "Reset Games?", function() {
    localStorage.setItem("games", "[]");
    eclipse.userLog("Installed games have been cleared.");
  });
}

eclipse.resetSkins = function() {
  eclipse.dialog.confirm('Are you sure you want to clear your installed skins? This cannot be undone.', "Reset Skins?", function() {
    localStorage.setItem("skins", "https://eclipseemu.me/play/json/skins/default.json");
    localStorage.setItem("currentSkin", '{"name":"Default","logo":"https:\/\/eclipseemu.me\/play\/img\/icons\/icon_mobFull.png","author":"Eclipse Team","description":"The default theme for Eclipse.","styles":[[]]}');
    eclipse.userLog("Installed skins have been cleared.");
  });
}

eclipse.resetControls = function() {
  eclipse.dialog.confirm('Are you sure you want to reset your keybinds and paired controllers? This cannot be undone.', "Reset Controls?", function() {
    //localStorage.setItem("controls", "{\"controls\":[{\"ctrl\":\"A\",\"keycode\":\"88\"},{\"ctrl\":\"B\",\"keycode\":\"90\"},{\"ctrl\":\"L\",\"keycode\":\"49\"},{\"ctrl\":\"R\",\"keycode\":\"50\"},{\"ctrl\":\"Start\",\"keycode\":\"13\"},{\"ctrl\":\"Select\",\"keycode\":\"16\"},{\"ctrl\":\"Up\",\"keycode\":\"38\"},{\"ctrl\":\"Down\",\"keycode\":\"40\"},{\"ctrl\":\"Left\",\"keycode\":\"37\"},{\"ctrl\":\"Right\",\"keycode\":\"39\"}]}");
    localStorage.removeItem("controls");
    //eclipse.userLog("Saved keybinds and controller settings have been cleared.");
    eclipse.userLog("Your controller settings have been cleared.");
  });
}

eclipse.resetAll = function() {
  eclipse.dialog.confirm('Are you sure you want to clear repos, games, skins, and controls? This cannot be undone.', "Reset Eclipse?", function() {
    localStorage.setItem("repos", "[]");
    localStorage.setItem("games", "[]");
    localStorage.setItem("skins", "https://eclipseemu.me/play/json/skins/default.json");
    localStorage.setItem("currentSkin", '{"name":"Default","logo":"https:\/\/eclipseemu.me\/play\/img\/icons\/icon_mobFull.png","author":"Eclipse Team","description":"The default theme for Eclipse.","styles":[[]]}');
    localStorage.setItem("controls", "[]");
    eclipse.userLog("Eclipse has been reset.");
  });
}

eclipse.purge = function() {
  eclipse.dialog.confirm('Are you sure you want to initialize Eclipse? All data will be lost.', "Initialize Eclipse?", function() {
    localStorage.clear();
    location.reload();
    eclipse.userLog("Eclipse has been initialized. Restarting...");
    window.location.reload();
  });
}

// Init Controls

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

// Eclipse Global Emulation settings
eclipse.toggleAudio = function() {
  var audioStatus = localStorage.getItem('audioStatus');
  if (audioStatus == "false") {
    localStorage.setItem('audioStatus', "true");
  } else {
    localStorage.setItem('audioStatus', "false");
  }
}

eclipse.toggleAutoSave = function() {
  var autoSave = localStorage.getItem('autoSave');
  if (autoSave == "false") {
    localStorage.setItem('autoSave', "true");
  } else {
    localStorage.setItem('autoSave', "false");
  }
}

eclipse.setupFillScreenToggle = function() {
  localStorage.setItem('fillScreen', 'false');
}

eclipse.toggleFillScreen = function() {
  var fillScreen = localStorage.getItem('fillScreen');
  if (fillScreen == "false") {
    localStorage.setItem('fillScreen', "true");
  } else {
    localStorage.setItem('fillScreen', "false");
  }
}

eclipse.setupDesktopModeToggle = function() {
  var isMobile = {
    Android: function() {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
      return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
    },
    any: function() {
      return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
  }
  var isiOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  if (isMobile.any() || isiOS) {
    localStorage.desktopMode = "false";
  } else {
    localStorage.desktopMode = "true";
  }
}

eclipse.toggleDesktopMode = function() {
  var desktopMode = localStorage.getItem('desktopMode');
  if (desktopMode == "false") {
    localStorage.desktopMode = "true";
  } else {
    localStorage.desktopMode = "false";
  }
  OpenSkin.load() // Refresh skin to apply.
}

eclipse.resizeItems = function() {
  eclipse.resizeGBCanvasFunc();
  eclipse.resizeGBACanvasFunc();
  eclipse.resizeNESCanvasFunc();
}

eclipse.resizeGBACanvasFunc = function() {
  var container = document.getElementById("gbaScreenContainer");
  var containerHeight = container.clientHeight || container.offsetHeight || 0;
  var containerWidth = container.clientWidth || container.offsetWidth || 0;
  if (containerHeight > 0 && containerWidth > 0) {
    var canvas = document.getElementById("gbaScreen");
    var maxWidth = Math.floor(containerHeight * 1.5);
    var maxHeight = Math.floor(containerWidth / 1.5);
    var height = Math.min(maxHeight, containerHeight);
    var width = Math.min(maxWidth, containerWidth);
    if (localStorage.getItem('fillScreen') == 'false') {
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      canvas.style.top = "0px"
      canvas.style.bottom = "0px"
      canvas.style.left = "0px"
      canvas.style.right = "0px"
      canvas.style.position = "absolute"
    } else {
      canvas.style.width = containerWidth + "px";
      canvas.style.height = containerHeight + "px";
      canvas.style.top = "0px"
      canvas.style.bottom = "0px"
      canvas.style.left = "0px"
      canvas.style.right = "0px"
      canvas.style.position = "absolute"
    }
  }
}

eclipse.resizeNESCanvasFunc = function() {
  var container = document.getElementById("nesScreenContainer");
  var containerHeight = container.clientHeight || container.offsetHeight || 0;
  var containerWidth = container.clientWidth || container.offsetWidth || 0;
  if (containerHeight > 0 && containerWidth > 0) {
    var canvas = document.getElementById("nes-screen");
    var maxWidth = Math.floor(containerHeight * 1.3);
    var maxHeight = Math.floor(containerWidth / 1.3);
    var height = Math.min(maxHeight, containerHeight);
    var width = Math.min(maxWidth, containerWidth);
    if (localStorage.getItem('fillScreen') == 'false') {
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      canvas.style.top = "0px"
      canvas.style.bottom = "0px"
      canvas.style.left = "0px"
      canvas.style.right = "0px"
      canvas.style.position = "absolute"
    } else {
      canvas.style.width = containerWidth + "px";
      canvas.style.height = containerHeight + "px";
      canvas.style.top = "0px"
      canvas.style.bottom = "0px"
      canvas.style.left = "0px"
      canvas.style.right = "0px"
      canvas.style.position = "absolute"
    }
  }
}

eclipse.resizeGBCanvasFunc = function() {
  var container = document.getElementById("gbScreenContainer");
  var containerHeight = container.clientHeight || container.offsetHeight || 0;
  var containerWidth = container.clientWidth || container.offsetWidth || 0;
  if (containerHeight > 0 && containerWidth > 0) {
    var canvas = document.getElementById("mainCanvas");
    var maxWidth = Math.floor(containerHeight * 1.3);
    var maxHeight = Math.floor(containerWidth / 1.);
    var height = Math.min(maxHeight, containerHeight);
    var width = Math.min(maxWidth, containerWidth);
    if (localStorage.getItem('fillScreen') == 'false') {
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      canvas.style.top = "0px"
      canvas.style.bottom = "0px"
      canvas.style.left = "0px"
      canvas.style.right = "0px"
      canvas.style.position = "absolute"
    } else {
      canvas.style.width = containerWidth + "px";
      canvas.style.height = containerHeight + "px";
      canvas.style.top = "0px"
      canvas.style.bottom = "0px"
      canvas.style.left = "0px"
      canvas.style.right = "0px"
      canvas.style.position = "absolute"
    }
  }
}

window.onresize = eclipse.resizeItems;

eclipse.getParams = function(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

if (eclipse.getParams("q") == "repo") {
  paramURL = "//php.eclipseemu.me/dl/dl.php?dl=" + eclipse.patch(eclipse.getParams("url"));
  if (paramURL) {
    jQuery.getJSON(paramURL, function(json) {
      addDialog = eclipse.dialog.confirm("Are you sure you would like to add the repo \"" + json.reponame + "\" to Eclipse?", "Import Repo?", function() {
        addDialog.close();
        eclipse.addRepo(eclipse.patch(eclipse.getParams("url")))
      })
    });

  } else {
    eclipse.error("No URL was provided to the repo import endpoint.")
  }
}

if (eclipse.getParams("q") == "skin") {
  paramURL = "//php.eclipseemu.me/dl/dl.php?dl=" + eclipse.patch(eclipse.getParams("url"));
  if (paramURL) {
    jQuery.getJSON(paramURL, function(json) {
      addDialog = eclipse.dialog.confirm("Are you sure you would like to add the skin \"" + json.name + "\" to Eclipse?", "Import Skin?", function() {
        addDialog.close();
        eclipse.addSkin(eclipse.patch(eclipse.getParams("url")));
      })
    });

  } else {
    eclipse.error("No URL was provided to the skin import endpoint.")
  }
}

if (eclipse.getParams("q") == "rom") {
  paramURL = eclipse.patch(eclipse.getParams("url"));
  paramArt = eclipse.patch(eclipse.getParams("art"));
  paramName = eclipse.patch(eclipse.getParams("name"));
  paramSys = eclipse.patch(eclipse.getParams("sys"));
  if (paramURL) {
    addDialog = eclipse.dialog.confirm("Are you sure you would like to add the game \"" + paramName + "\" to Eclipse?", "Import ROM?", function() {
      addDialog.close();
      eclipse.addROM(paramName, paramArt, paramURL, paramSys)
    })

  } else {
    eclipse.error("No URL was provided to the ROM import endpoint.")
  }
}

if (eclipse.getParams("q") == "raw") {
  element = eclipse.patch(eclipse.getParams("url"));
  paramName = eclipse.patch(eclipse.getParams("name"));
  if (element && paramName) {
    if (document.getElementById("openskinEditor_stylesheet")) {
      document.getElementById("openskinEditor_stylesheet").innerHTML = element;
    } else {
      var style = document.createElement("style");
      style.id = "openskinEditor_stylesheet";
      style.innerHTML = atob(element);
      document.head.appendChild(style);
    }
    window.setTimeout(function() {
      eclipse.dialog.alert("An external tool, " + paramName + ", is testing out a skin. It has applied its own skin for the duration of the current session, and your previous skin will have to be reapplied.", "Skin Debugger")
      eclipse.setDefaultSkin("./json/skins/default.json")
    }, 1000)

  } else {
    eclipse.error("No data was provided to the skin debugging endpoint.")
  }
}

eclipse.resetDiscordRPC = function() {
  // This code will communicate with the desktop client.
  try {
    document.getElementById("discordGameName").innerHTML = "";
    document.getElementById("discordPlatformName").innerHTML = "";
    // This code will err unless Desktop is running
    try {
      sendGameInfo("No Game Playing", "na")
    } catch (err) {
      eclipse.log("Desktop client not detected.")
    }
  } catch (err) {
    eclipse.log("Cannot load ROM into Discord elements: " + err);
  }
}

eclipse.isOffline = function() {
  // I am going to mention that the condition below has to change if we use ServiceWorkers in the future.
  if (!navigator.onLine) {
    // This code runs if Eclipse is loaded when the user is offline.
    // This will disable repos and adding new ROMs when offline.
    addROMs = eclipse.actions.create({
      grid: true,
      buttons: [
        [{
            text: 'Repos',
            disabled: true,
            onClick: function() {},
            icon: '<i class="icon f7-icons ios-only color-black disabled">collection_fill</i><i class="icon material-icons md-only disabled">view_carousel</i>'
          },
          {
            text: 'Upload',
            onClick: function() {
              eclipse.uploadROM();
            },
            icon: '<i class="icon f7-icons ios-only color-black">cloud_upload_fill</i><i class="icon material-icons md-only">cloud_upload</i>'
          },
          {
            text: 'Manually',
            disabled: true,
            onClick: function() {
              eclipse.manuallyAddROM()
            },
            icon: '<i class="icon f7-icons ios-only color-black">add_round_fill</i><i class="icon material-icons md-only">add_circle</i>'
          },
        ]
      ]
    });
    // Disable ability to select games
    var style = document.createElement("style");
    style.id = "offlineMode_stylesheet";
    style.innerHTML = "#games-list {filter: blur(5px);opacity:0.6;pointer-events:none!important}#offlineModeNotice{display:table}";
    document.head.appendChild(style);

    // This will deal with stuff in Settings.
    try {
      // This will disable anything that needs Internet.
      document.querySelector("a[href='/settings/skin/']").className += " disabled";
      document.querySelector("a[href='/credits/']").className += " disabled";
      document.querySelector("a[href='https://discord.gg/QcX8FQR']").className += " disabled";
      document.querySelector("a[href='https://www.reddit.com/r/EclipseEmu']").className += " disabled";
      document.querySelector("a[href='/settings/donate/']").className += " disabled";
      //document.querySelector("a[href='/update/']").className += " disabled";
      document.querySelector("img[src='https://twitter.com/discordapp/profile_image?size=original']").parentElement.remove();
      document.querySelector("img[src='https://twitter.com/reddit/profile_image?size=original']").parentElement.remove();
      document.querySelector("img[src='https://twitter.com/paypal/profile_image?size=original']").parentElement.remove();
    } catch (err) {
      // do nothing.
    }
  }
}

var debugTapTrack = 0;
eclipse.debugShow = function() {
  debugTapTrack++;
  if(debugTapTrack === 5) {
    document.getElementById("debugModeSettingsPanel").style.display = "block";
    debugTapTrack = 0;
    document.getElementById("reportBugLinkGen").href = "https://github.com/iGBAEmu/EclipseIssues/issues/new?body=" + bugReportTxt();
    document.getElementById("textCopyAgent").value = decodeURI(bugReportTxt()).replace(/%23/g,"#");
    document.getElementById("copyLinkGen").onclick = (e) => {copy = document.getElementById("textCopyAgent");copy.style.display="block";copy.select();document.execCommand("copy");copy.style.display="none";eclipse.userLog('Copied text to clipboard.')};
    eclipse.userLog("Debug Mode is now visible.");
  } else if(debugTapTrack >= 2) {
    eclipse.userLog((5 - debugTapTrack) + " more taps until Debug Mode")
  }
}

// Storage polyfill - https://thimbleprojects.org/startpolymer/361372/


function storageEstimateWrapper() {
  if ('storage' in navigator && 'estimate' in navigator.storage) {
    // We've got the real thing! Return its response.
    return navigator.storage.estimate();
  }

  if ('webkitTemporaryStorage' in navigator &&
      'queryUsageAndQuota' in navigator.webkitTemporaryStorage) {
    // Return a promise-based wrapper that will follow the expected interface.
    return new Promise(function(resolve, reject) {
      navigator.webkitTemporaryStorage.queryUsageAndQuota(
        function(usage, quota) {resolve({usage: usage, quota: quota})},
        reject
      );
    });
  }

  if(navigator.userAgent.toLowerCase().search(/(chrome|android)/i) == -1 && navigator.userAgent.toLowerCase().search(/safari/i) != -1) {
    // return new Promise(function(resolve, reject) {
    usage = (JSON.stringify(localStorage).length)*2; // Calculate the approximate length, in bytes. x2 due to UTF-16. 
    eclipse.log("Exact Usage: " + usage)
    quota = 5200000;
    //usage += 8000000 // Eclipse uses 7.0MB, but we'll report 8, just in case.
    eclipse.log("Total Quota: " + quota)
    //   function(usage, quota) {resolve({usage: usage, quota: quota})}, reject
    // });
    return Promise.resolve({usage: usage, quota: quota});
  }

  // If we can't estimate the values, return a Promise that resolves with NaN.
  return Promise.resolve({usage: NaN, quota: NaN});
}

// https://developers.google.com/web/updates/2017/08/estimating-available-storage-space
// https://love2dev.com/blog/what-is-the-service-worker-cache-storage-limit/


// storageEstimateWrapper().then(({usage, quota}) => {
//   const percentUsed = Math.round(usage / quota * 100);
//   const usageInMib = Math.round(usage / (1024 * 1024));
//   const quotaInMib = Math.round(quota / (1024 * 1024));
//   const exactUsage = usage;
//   const exactMib = quota;
//   const details = `${usageInMib} out of ${quotaInMib} MiB used (${percentUsed}%)`;
  
//   eclipse.log(`Storage: ${details}`);
// }); 


//  Document ending randomly so heres some lorem ipsum

// Aute officia esse pariatur proident Lorem id officia. Eiusmod elit cillum in quis voluptate deserunt occaecat consequat et aliqua irure in id magna. Dolor cupidatat proident Lorem incididunt ut pariatur commodo consequat commodo mollit est aliqua.
// Laborum velit adipisicing anim irure ut minim tempor deserunt officia mollit commodo. Id consectetur qui ullamco tempor occaecat ad id non ut commodo veniam voluptate deserunt officia laboris dolor dolore. Anim irure minim id ea eu ea cupidatat deserunt nisi ut.
// Occaecat incididunt cillum ad et laboris quis cupidatat excepteur qui laborum. Occaecat sunt ex deserunt minim minim duis sunt id consequat est aute ex commodo velit laboris labore. Ullamco dolor excepteur nostrud consequat ipsum culpa nostrud eu ea cupidatat dolore eu id amet sint sint. Aute enim Lorem voluptate id eu et cupidatat dolore eu sunt commodo. Eiusmod minim qui eu adipisicing culpa sint fugiat elit velit velit anim est nisi id consectetur reprehenderit elit.
// Occaecat aliqua nostrud id in magna duis voluptate et cupidatat labore. Do cupidatat consectetur quis consequat nisi aliquip officia fugiat adipisicing duis ullamco ut fugiat aliquip irure. Incididunt ipsum do reprehenderit voluptate non cupidatat consequat magna aliqua non minim do cillum reprehenderit. Eiusmod voluptate consequat fugiat et nulla Lorem aliqua ullamco voluptate culpa occaecat consequat laboris non. Dolor ullamco consequat proident enim enim excepteur nisi voluptate.*/
//  Aute officia esse pariatur proident Lorem id officia. Eiusmod elit cillum in quis voluptate deserunt occaecat consequat et aliqua irure in id magna. Dolor cupidatat proident Lorem incididunt ut pariatur commodo consequat commodo mollit est aliqua.
// Laborum velit adipisicing anim irure ut minim tempor deserunt officia mollit commodo. Id consectetur qui ullamco tempor occaecat ad id non ut commodo veniam voluptate deserunt officia laboris dolor dolore. Anim irure minim id ea eu ea cupidatat deserunt nisi ut.
// Occaecat incididunt cillum ad et laboris quis cupidatat excepteur qui laborum. Occaecat sunt ex deserunt minim minim duis sunt id consequat est aute ex commodo velit laboris labore. Ullamco dolor excepteur nostrud consequat ipsum culpa nostrud eu ea cupidatat dolore eu id amet sint sint. Aute enim Lorem voluptate id eu et cupidatat dolore eu sunt commodo. Eiusmod minim qui eu adipisicing culpa sint fugiat elit velit velit anim est nisi id consectetur reprehenderit elit.
// Occaecat aliqua nostrud id in magna duis voluptate et cupidatat labore. Do cupidatat consectetur quis consequat nisi aliquip officia fugiat adipisicing duis ullamco ut fugiat aliquip irure. Incididunt ipsum do reprehenderit voluptate non cupidatat consequat magna aliqua non minim do cillum reprehenderit. Eiusmod voluptate consequat fugiat et nulla Lorem aliqua ullamco voluptate culpa occaecat consequat laboris non. Dolor ullamco consequat proident enim enim excepteur nisi voluptate.*/
