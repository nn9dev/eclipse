var latest = "assets/json/eclipse.json".getJSON();
var $$ = Dom7;

var up_btn;
var down_btn;
var left_btn;
var right_btn;
var start_btn;
var select_btn;
var a_btn;
var b_btn;
var l_btn;
var r_btn;
var debuggerState = 0;
var check_status;
var check_status2;
var setupStageStorage;
var static;

//  messy bug fixes

//  enable/disable messy bug fixes
var messy_fixes = true;

var messy_fix_0 = document.createElement("style");
document.head.appendChild(messy_fix_0);
//  not messy bug fixes

//  extensions
/* switch two indexes in an array */
Array.prototype.switchIndexes = function(s0, s1) {
  if (!(typeof s0 == "number" && typeof s1 == "number")) return this;
  if (!(typeof this[s0] != "undefined" && typeof this[s1] != "undefined")) return this;
  var new_array = [];
  new_array = new_array.concat(this);
  var mem0 = this[s0];
  var mem1 = this[s1];
  new_array[s0] = mem1;
  new_array[s1] = mem0;
  return new_array;
}
//  not extensions

// Error notifications
var errorCount = 0;
var errorTexts = "";
window.onerror = function(line, error) {
  errorCount++;
  errorTexts = errorTexts + "[" + errorCount.toString() + "] " + error + " (" + line + ")\n\n";
  if (document.getElementById("splashScreen") != null && errorCount > 5) {
    alert("We're sorry, but Eclipse was unable to launch successfully.\nPlease file an issue at https://github.com/iGBAEmu/EclipseIssues/issues with more details so we can try to fix this as soon as possible.\n\n" + errorTexts);
    location.reload();
  }
  console.error(error);
}

var games = new Repos('games');
games.init(null);
var repos = new Repos('repos');
repos.init(null);
var skins = new Skins('skins');
skins.init("[\"//php.eclipseemu.me/dl/dl.php?dl=https://eclipseemu.me/play/json/skins/default.json\"]");

var uploaded_rom_value;

// Apply skin.
OpenSkin.getStr(localStorage.getItem("currentSkin"), true);

// Theme
var theme = 'auto';
if (document.location.search.indexOf('theme=') >= 0) {
  theme = document.location.search.split('theme=')[1].split('&')[0];
}

// Add new logging methods and modify current ones.

console.logOrg = console.log;
console.errorOrg = console.error;
console.warnOrg = console.warn;
console.traceOrg = console.trace;

console.toast = function(str) {
  eclipse.toast.create({
    text: str,
    closeTimeout: 2000,
  }).open();
  console.logOrg('%c[Toast] %c' + str.unpatch(), "color:#d21c46", "color: black");
  try {
    eclipse.methods.debug.console.createObj("[Toast] " + str);
  } catch (e) {

  }
}
console.alert = function(str) {
  eclipse.dialog.alert(str);
  try {
    eclipse.methods.debug.console.createObj("[Alert] " + str);
  } catch (e) {}
}
console.print = function(str) {
  console.traceOrg('%c[Eclipse] %c' + str, "color:#d21c46", "color: gray");
  try {
    eclipse.methods.debug.console.createObj("[Eclipse] " + str);
  } catch (e) {}
}
function encode_boxart(url) {
    if (url.indexOf(" ") > -1) {
      return encodeURI(url);
    } else {
      return url
    }
}
// Expand initials for supported systems - cannot be method
function expandPlatform(inp) {
  inp = inp.toUpperCase();
  if (inp == "NES") {
    return "Nintendo Entertainment System";
  } else if (inp == "GB") {
    return "Game Boy";
  } else if (inp == "GBA") {
    return "Game Boy Advance";
  } else if (inp == "GBC") {
    return "Game Boy Color";
  } else if (inp == "SNES") {
    return "Super Nintendo Entertainment System";
  } else if (inp == "SMS") {
    return "Sega Master System";
  } else if (inp == "SGG") {
    return "Sega Game Gear";
  } else {
    return "Not Supported";
  }
}

function origin(url) {
  if ((url.indexOf(".sfc") != -1) || (url.indexOf(".smc") != -1)) {
    return "<i class='f7-icons origin-ico'>flag_fill</i>"
  } else {
    return ""
  }
}

// atob, but deals with tokens
function atob_token(b64) {
  url = atob(b64)
  if (url.indexOf("googleapis.com") != -1) {
    try {
      if (GoogleDrive.getSigninStatus() == true) {
        url += "&token=" + gapi.auth.getToken().access_token;
      } else {
        console.alert("This games requires that your Google Drive account is linked with Eclipse. Please go into Settings and log in to Google Drive to play this game.");
      }
    } catch (err) {
      console.error(err);
      console.alert("We had issues connecting to Google Drive. Please ensure that you are connected to a strong Internet connection.");
    }
  }
  return url;
}

// Init App
var eclipse = new Framework7({
  id: 'com.zenithdevs.eclipse',
  root: '#app',
  theme: theme,
  version: "2.0.8",
  touch: {
    tapHold: true,
  },
  dialog: {
    title: 'Eclipse',
  },
  data: {
    js_files: {
      loaded: 0,
      needed: 0,
    },
    emu: {
      name: "",
      screen_scale: 1.0,
      files: [],
      controls: {
        up: null,
        down: null,
        left: null,
        right: null,
        start: null,
        select: null,
        a: null,
        b: null,
        l: null,
        r: null,
      },
      menu: "",
      init: function() {
        console.log("Init function not overridden.");
      },
      close: function() {
        console.log("Close function not overridden.");
      },
      load_rom: function(url) {
        console.log("Load ROM function not overridden. URL passed: " + url);
      },
    },
  },
  methods: {
    init: {
      loaded: function() {
        GoogleDrive.init();
        document.getElementById("splashScreen").classList += "fadeOut";
        window.setTimeout(e => {
          document.getElementById("splashScreen").remove();
        }, 500);
        GoogleDrive.enforceGoodDomain();
      },
      endpoints: function() {
        // URL Scheme / Social Endpoints
        if (eclipse.methods.get_params("q") == "repo") {
          paramURL = "//php.eclipseemu.me/dl/dl.php?dl=" + eclipse.methods.get_params("url").patch();
          if (paramURL) {
            jQuery.getJSON(paramURL, function(json) {
              addDialog = eclipse.dialog.confirm("Are you sure you would like to add the repo \"" + json.reponame.patch() + "\" to Eclipse?", "Import Repo?", function() {
                addDialog.close();
                eclipse.methods.repos.addRepo(eclipse.methods.get_params("url").patch())
              })
            });

          } else {
            console.error("No URL was provided to the repo import endpoint.")
          }
        }

        if (eclipse.methods.get_params("q") == "skin") {
          paramURL = "//php.eclipseemu.me/dl/dl.php?dl=" + eclipse.methods.get_params("url").patch();
          if (paramURL) {
            jQuery.getJSON(paramURL, function(json) {
              addDialog = eclipse.dialog.confirm("Are you sure you would like to add the skin \"" + json.name.patch() + "\" to Eclipse?", "Import Skin?", function() {
                addDialog.close();
                eclipse.methods.skins.addSkin(eclipse.methods.get_params("url").patch());
              })
            });

          } else {
            console.error("No URL was provided to the skin import endpoint.")
          }
        }

        if (eclipse.methods.get_params("q") == "rom") {
          paramURL = eclipse.methods.get_params("url");
          paramArt = eclipse.methods.get_params("art");
          paramName = eclipse.methods.get_params("name");
          paramSys = eclipse.methods.get_params("sys");
          if (paramURL) {
            addDialog = eclipse.dialog.confirm("Are you sure you would like to add the game \"" + paramName.patch() + "\" to Eclipse?", "Import ROM?", function() {
              addDialog.close();
              eclipse.methods.games.addGame(paramName, paramArt, paramURL, paramSys)
              eclipse.methods.reload_view('/');
            })

          } else {
            console.error("No URL was provided to the ROM import endpoint.")
          }
        }

        if (eclipse.methods.get_params("q") == "raw") {
          element = eclipse.methods.get_params("url").patch();
          paramName = eclipse.methods.get_params("name").patch();
          if (element && paramName) {
            if (document.getElementById("openskinEditor_stylesheet")) {
              document.getElementById("openskinEditor_stylesheet").innerHTML = element;
            } else {
              var style = document.createElement("style");
              style.id = "openskinEditor_stylesheet";
              var toBeAppend = atob(element.replace(" ","+"));
              style.innerHTML = toBeAppend;
              document.head.appendChild(style);
            }
            window.setTimeout(function() {
              eclipse.dialog.alert("An external tool, " + paramName + ", is testing out a skin. It has applied its own skin for the duration of the current session, and your previous skin will have to be reapplied.", "Skin Debugger")
              skins.set('./json/skins/default.json')
            }, 1000)

          } else {
            console.error("No data was provided to the skin debugging endpoint.")
          }
        }
      },
    },
    // General
    log: function(message) {
      console.trace(message);
    },
    error: function(message) {
      console.error(message);
    },
    get_system: function(extension) {
      if (extension.toLowerCase() == "gba") {
        return "gba";
      } else if (extension.toLowerCase() == "gb") {
        return "gb";
      } else if (extension.toLowerCase() == "gbc") {
        return "gbc";
      } else if (extension.toLowerCase() == "nes") {
        return "nes";
      } else if (extension.toLowerCase() == "sfc" || extension.toLowerCase() == "smc") {
        return "snes";
      } else if (extension.toLowerCase() == "sms") {
        return "sms";
      } else if (extension.toLowerCase() == "gg") {
        return "sgg";
      }
    },
    reload_view: function(url) {
      eclipse.router.navigate(url, {
        reloadCurrent: true
      });
    },
    get_params: function(name, url) {
      if (!url) url = window.location.href;
      name = name.replace(/[\[\]]/g, "\\$&");
      var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return '';
      return decodeURIComponent(results[2].replace(/\+/g, " "));
    },
    webBrowser: function(url) {
      eclipse.popup.create({
        content: `<div class="popup">
                  <div class="navbar">
                    <div class="navbar-inner sliding">
                      <div class="left">
                        <a href="#" class="link popup-close">
                          <div class="tint ios-only">Close</div>
                          <i class="icon material-icons md-only">close</i>
                        </a>
                      </div>
                      <div class="title">Web</div>
                      <div class="right">
                        <a href="${url}" class="external link icon-only">
                          <i class="icon f7-icons ios-only">world</i>
                          <i class="icon material-icons md-only">explore</i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <iframe id="browserFrame" style="width:100%;height:87%;border:0"></iframe>
                </div>
      `
      }).open();
      window.setTimeout(function() {
        document.getElementById("browserFrame").src = url;
      }, 250);
    },
    // Manage adding/removing Scripts
    script: {
      load: function(url, is_emu) {
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = url;
        if (is_emu == true) {
          script.addEventListener("load", function(){
            eclipse.data.js_files.loaded += 1;
            console.print(`JS file ${eclipse.data.js_files.loaded}/${eclipse.data.js_files.needed} loaded.`);
          });
        }
        document.getElementsByTagName("head")[0].appendChild(script);
        return false;
      },
      unload: function(url) {
        var scripts = document.getElementsByTagName("script");
        for (var i = 0; i < scripts.length; i++) {
          if (scripts[i].getAttribute('src') == url) {
            console.print('Removing script with src "' + scripts[i].getAttribute('src') + '"');
            scripts[i].outerHTML = "";
          }
        }
      }
    },
    // Games
    games: {
      addGame: function(name, boxart, link, system) {
        if (String(system) !== "undefined") {
          var json = '{"name":"' + name.patch() + '", "boxart":"' + boxart.patch() + '", "link":"' + link.patch() + '", "system":"' + system.patch() + '"}';
          games.add(json);
          console.toast('"' + name.patch() + '" has been added.');
        } else {
          console.toast("That game could not be added. Did you type in the URL correctly?")
        }
      },
      addGameURL: function(url, stopRouter, doForce, forceExt, forceName) {
        eclipse.preloader.show();
        if (doForce == true) {
          var file_name = forceName
          var file_extension = forceExt;
        } else {
          var file_name = url.lastIndexOf('/');
          file_name = url.substring(file_name + 1);
          var file_extension = url.lastIndexOf('.');
          file_extension = url.substring(file_extension + 1);
          file_extension = file_extension.toLowerCase().replace("?dl=1", "");
        }
        file_name = decodeURIComponent(file_name).replace(/_/g, ' ').replace(/-/g, ' ').toLowerCase();
        var system = eclipse.methods.get_system(file_extension);
        var system_short_name = system;
        if (system_short_name == "sgg") {
          system_short_name = "gg";
        }
        var res = file_name.toLowerCase().replace('.' + file_extension, '').replace('?dl=1', '').split(" ");
        var query = "";
        for (i = 0; i < res.length; i++) {
          if (i == 0) {
            query += res[i];
          } else if (i > 4) {} else {
            query += "," + res[i];
          }
        }
        var apiURL = 'https://api.zenithdevs.com/eclipse/boxart/q/' + query;
        try {
          var gamesDB = apiURL.getJSON();
          var greatestMatches = 0;
          var gI = -1;
          var matches = 0;
          for (i = 0; i < gamesDB[system_short_name].length; i++) {
            var matches = 0;
            for (ii = 0; ii < res.length; ii++) {
              if (gamesDB[system_short_name][i].name.toLowerCase().indexOf(res[ii]) > -1) {
                var matches = matches + 1;
              }
            }
            if (matches > greatestMatches) {
              var greatestMatches = matches;
              var gI = i;
            }
          }
          if (gI > -1) {
            if (gamesDB[system_short_name][gI].boxart == "") {
              eclipse.methods.games.addGame(gamesDB[system_short_name][gI].name, 'assets/img/default-cover.png', url, system);
              console.print("No boxart");
            } else {
              eclipse.methods.games.addGame(gamesDB[system_short_name][gI].name, gamesDB[system_short_name][gI].boxart, url, system);
              console.print("Boxart found");
            }
          } else {
            eclipse.methods.games.addGame(file_name.capitalize().removeFileExt(), 'assets/img/default-cover.png', url, system);
            console.print("No matches");
          }
        } catch (err) {
          eclipse.methods.games.addGame(file_name.capitalize().removeFileExt(), 'assets/img/default-cover.png', url, system);
          console.print("Error loading");
          eclipse.preloader.hide();
        }
        eclipse.preloader.hide();
        if(stopRouter == false) {
          eclipse.methods.reload_view('/');
        }
      },
      addGamePopup: function() {
        var addPopup = eclipse.actions.create({
          buttons: [
            // First group
            [{
                text: 'Add Game',
                label: true
              },
              {
                text: 'Upload',
                icon: '<i class="icon f7-icons ios-only">folder_fill</i><i class="icon material-icons md-only">folder</i>',
                onClick: function() {
                  eclipse.methods.games.uploadGame();
                }
              },
              {
                text: 'URL',
                icon: '<i class="icon f7-icons ios-only">compass_fill</i><i class="icon material-icons md-only">explore</i>',
                onClick: function() {
                  eclipse.dialog.prompt('Enter the direct URL for the game you wish to add.', function(url) {
                    eclipse.methods.games.addGameURL(url, false);
                  });
                }
              },
              {
                text: 'Game Hub',
                icon: '<i class="icon f7-icons ios-only">collection_fill</i><i class="icon material-icons md-only">view_carousel</i>',
                onClick: function() {
                  eclipse.router.navigate("/repos/");
                }
              }
            ],
            // Second group
            [{
              text: 'Cancel',
              color: 'red'
            }]
          ],
          grid: false,
        });
        addPopup.open();
      },
      uploadGame: function() {
        var upload_element = document.getElementById('romUpload');
        upload_element.addEventListener("change", function() {
          var system = document.getElementById('romUpload').value.lastIndexOf('.');
          system = document.getElementById('romUpload').value.substring(system + 1);
          system = system.toLowerCase().replace("?dl=1", "");
          var files = document.getElementById('romUpload').files;
          var file = files[0];
          var reader = new FileReader();
          reader.onload = function() {
            uploaded_rom_value = "data:text/plain;charset=x-user-defined;base64," + btoa(reader.result);
            if (eclipse.methods.get_system(system) == "gba") {
              eclipse.methods.emu.systems.gba.init({
                local: true
              });
            } else if (eclipse.methods.get_system(system) == "gbc") {
              eclipse.methods.emu.systems.gbc.init({
                local: true
              });
            } else if (eclipse.methods.get_system(system) == "gb") {
              eclipse.methods.emu.systems.gb.init({
                local: true
              });
            } else if (eclipse.methods.get_system(system) == "nes") {
              eclipse.methods.emu.systems.nes.init({
                local: true
              });
            } else if (eclipse.methods.get_system(system) == "snes") {
              eclipse.methods.emu.systems.snes.init({
                local: true
              });
            } else if (eclipse.methods.get_system(system) == "sms") {
              eclipse.methods.emu.systems.sms.init({
                local: true
              });
            } else if (eclipse.methods.get_system(system) == "sgg") {
              eclipse.methods.emu.systems.sgg.init({
                local: true
              });
            } else {
              eclipse.dialog.alert("The file you uploaded isn't supported in any of Eclipse's cores.");
            }
          };
          reader.onerror = function(error) {
            console.log('Error: ', error);
          };
          reader.readAsBinaryString(file);
        });
        upload_element.click();
      },
      manageGamePopup: function(index, name, view_to_reload) {
        var gamesList = games.list();
        var manageGamePopup = eclipse.actions.create({
          buttons: [
            // First group
            [{
                text: name.patch() + " (" + JSON.parse(games.list()[index]).system.patch().toUpperCase() + ")",
                label: true
              },
              {
                text: 'Rename',
                onClick: function() {
                  var jsonItem = JSON.parse(gamesList[index]);
                  eclipse.dialog.confirm(`<p>Edit the name for "${name.patch()}"</p>
                    <div class="dialog-input-field item-input"><div class="item-input-wrap"><input type="name" value="${jsonItem.name}" placeholder="${jsonItem.name.patch()}" class="dialog-input" id="NameURL"></div></div>
                    `, function(evt) {
                    name = document.getElementById("NameURL").value;
                    if (name == "") {
                      name = jsonItem.link.patch();
                    }
                    var newJSON = '{"name":"' + name.patch() + '", "boxart":"' + jsonItem.boxart + '", "link":"' + jsonItem.link + '", "system":"' + jsonItem.system + '"}';
                    games.updateData(newJSON, index);
                    console.toast('"' + jsonItem.name + '" was renamed successfully.');
                    eclipse.methods.reload_view(view_to_reload);
                  })
                }
              },
              {
                text: 'Change Box Art',
                onClick: function() {
                  var jsonItem = JSON.parse(gamesList[index]);
                  eclipse.dialog.confirm(`<p>Update the box art for "${name.patch()}"</p>
                    <input style="display:none" type="file" name="boxart" accept="image/jpeg, image/png, image/gif" onchange="eclipse.methods.games.fileUploadURL(this)" id="BoxartUploader">
                    <center><img onerror="javascript:this.src='assets/img/default-cover.png'" src="${jsonItem.boxart.patch()}" onerror="javascript:this.src='assets/img/default-cover.png'" style="border-radius:5px;width:200px;height:auto" id="boxartPreview"></center>
                    <br><br>
                    <button onclick="document.getElementById('BoxartUploader').click()" class="button">Upload Box Art</button>
                    <div class="dialog-input-field item-input"><div class="item-input-wrap"><input onkeyup="eclipse.methods.games.updateBoxArtPreview('${jsonItem.boxart.patch()}')" type="url" placeholder="${jsonItem.boxart}" class="dialog-input" id="boxartURL"></div></div>
                    `, function(evt) {
                    boxart = document.getElementById("boxartURL").value;
                    if (boxart == "") {
                      boxart = jsonItem.boxart.patch();
                    }
                    // eclipse.dialog.prompt('Update the box art for "' + name + '"', function(boxart) {
                    var newJSON = '{"name":"' + jsonItem.name + '", "boxart":"' + boxart.patch() + '", "link":"' + jsonItem.link + '", "system":"' + jsonItem.system + '"}';
                    games.updateData(newJSON, index);
                    console.toast('The box art for "' + jsonItem.name + '" was changed.');
                    eclipse.methods.reload_view(view_to_reload);
                  });
                }
              },
              {
                text: 'Edit Link',
                onClick: function() {
                  var jsonItem = JSON.parse(gamesList[index]);
                  eclipse.dialog.confirm(`<p>Edit the link for "${name.patch()}"</p>
                    <div class="dialog-input-field item-input"><div class="item-input-wrap"><input type="url" value="${jsonItem.link.patch()}" placeholder="${jsonItem.link.patch()}" class="dialog-input" id="LinkURL"></div></div>
                    `, function(evt) {
                    link = document.getElementById("LinkURL").value;
                    if (link == "") {
                      link = jsonItem.link.patch();
                    }
                    var newJSON = '{"name":"' + jsonItem.name + '", "boxart":"' + jsonItem.boxart + '", "link":"' + link.patch() + '", "system":"' + jsonItem.system + '"}';
                    games.updateData(newJSON, index);
                    console.toast('The link for "' + jsonItem.name + '" has been changed to "' + link.patch().replace("http://", "").replace("https://", "").substring(0, link.patch().replace("http://", "").replace("https://", "").indexOf("/")) + '."');
                    eclipse.methods.reload_view(view_to_reload);
                  })
                }
              },
              {
                text: 'Change Platform',
                onClick: function() {
                  var jsonItem = JSON.parse(gamesList[index]);
                  var previousSystem = jsonItem.system.patch().toUpperCase();
                  if (previousSystem == "NES") {
                    isNES = "selected"
                  } else {
                    isNES = ""
                  }
                  if (previousSystem == "GB") {
                    isGB = "selected"
                  } else {
                    isGB = ""
                  }
                  if (previousSystem == "GBC") {
                    isGBC = "selected"
                  } else {
                    isGBC = ""
                  }
                  if (previousSystem == "GBA") {
                    isGBA = "selected"
                  } else {
                    isGBA = ""
                  }
                  if (previousSystem == "SNES") {
                    isSNES = "selected"
                  } else {
                    isSNES = ""
                  }
                  if (previousSystem == "SMS") {
                    isSMS = "selected"
                  } else {
                    isSMS = ""
                  }
                  if (previousSystem == "SGG") {
                    isSGG = "selected"
                  } else {
                    isSGG = ""
                  }
                  eclipse.dialog.confirm(`<p>Edit the platform of "${name.patch()}"</p>
                    <div class="dialog-input-field item-input"><div class="item-input-wrap">
                    <select style="border:1px #f44336 solid;padding:4px;border-radius:5px;width:100%" id="platformValue">
                      <option ${isNES} value="NES">Nintendo Entertainment System</option>
                      <option ${isSNES} value="SNES">Super Nintendo Entertainment System</option>
                      <option ${isGB} value="GB">Game Boy</option>
                      <option ${isGBC} value="GBC">Game Boy Color</option>
                      <option ${isGBA} value="GBA">Game Boy Advance</option>
                      <option ${isSMS} value="SMS">Sega Master System</option>
                      <option ${isSGG} value="SGG">Sega Game Gear</option>
                    </select>

                    </div></div>
                    `, function(evt) {
                    system = document.getElementById("platformValue").value;
                    var newJSON = '{"name":"' + jsonItem.name + '", "boxart":"' + jsonItem.boxart + '", "link":"' + jsonItem.link + '", "system":"' + system.patch() + '"}';
                    games.updateData(newJSON, index);
                    console.toast('The platform for "' + jsonItem.name + '" has been changed to ' + system.patch() + ".");
                    eclipse.methods.reload_view(view_to_reload);
                  })
                }
              },
              {
                text: 'Download',
                onClick: function() {
                  var game = JSON.parse(gamesList[index]);
                  var gameURL = game.link.patch();
                  if (gameURL.indexOf("googleapis.com") != -1) {
                    try {
                      if (GoogleDrive.getSigninStatus() == true) {
                        gameURL = "https://php.eclipseemu.me/dl/dl.php?dl=" + gameURL + "&token=" + gapi.auth.getToken().access_token + "&ext=" + game.system.patch().toLowerCase();
                      } else {
                        console.alert("This games requires that your Google Drive account is linked with Eclipse. Please go into Settings and log in to Google Drive to play this game.");
                      }
                    } catch (err) {
                      console.error(err);
                      console.alert("We had issues connecting to Google Drive. Please ensure that you are connected to a strong Internet connection.");
                    }
                  }
                  eclipse.popup.create({
                    content: `<div class="popup">
                                <div class="page">
                                  <div class="navbar">
                                    <div class="navbar-inner sliding">
                                      <div class="left">
                                        <a href="#" class="link popup-close">
                                          <div class="tint ios-only">Close</div>
                                          <i class="icon material-icons md-only">close</i>
                                        </a>
                                      </div>
                                      <div class="title">Download</div>
                                    </div>
                                  </div>
                                  <div class="page-content">
                                    <div class="block block-strong inset" style="text-align:center;">
                                    <img onerror="javascript:this.src='assets/img/default-cover.png'" src="${game.boxart}" onerror="javascript:this.src='assets/img/default-cover.png'" style="box-shadow:0 5px 15px 0 rgba(0,0,0,0.1); border-radius:3px; max-width:256px;" width="100%" />
                                      <h2>${game.name}</h2>
                                      <p>By downloading "${game.name}", you agree to not redistribute it. Although you already own the game, you do not have distribution rights to it, and sharing it violates the owner's copyright.</p>
                                      <p>If you wish to share a homebrew ROM, consult the repo's description for the original source, and share that instead, license-permitting.</p>
                                  </div>
                                    <div class="list inset">
                                      <ul>
                                        <li>
                                          <a href="${gameURL}" class="external item-link button-list-red list-button" style="text-align:center;">Download ROM</a>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>`,
                  }).open();
                }
              },
              {
                text: 'Remove',
                color: 'red',
                onClick: function() {
                  var jsonItem = JSON.parse(gamesList[index]);
                  games.remove(gamesList[index]);
                  console.toast('"' + jsonItem.name + '" has been removed.');
                  eclipse.methods.reload_view(view_to_reload);
                }
              }
            ],
            // Second group
            [{
              text: 'Cancel',
              color: 'red'
            }]
          ]
        });
        manageGamePopup.open();
      },
      updateBoxArtPreview: function(defImage) {
        if (!defImage) {
          defImage = "assets/img/default-cover.png";
        }
        x = document.getElementById('boxartURL').value
        if (x == "" || x == undefined || x == null) {
          document.getElementById('boxartPreview').src = defImage;
        } else {
          document.getElementById('boxartPreview').src = x;
        }
      },
      fileUploadURL: function(input) {
        if (input.files && input.files[0]) {
          var reader = new FileReader();
          reader.onload = function(e) {
            $('#BoxartUploader').attr('src', e.target.result);
            $('#boxartURL').val(e.target.result);
            document.getElementById('boxartURL').disabled = true;
            document.getElementById('boxartURL').style.color = "grey";
          };
          reader.readAsDataURL(input.files[0]);
        }
        window.setTimeout(function() {
          eclipse.methods.games.updateBoxArtPreview();
        }, 10);
      },
    },
    // Skins
    skins: {
      updateSkinLabel: function() {
        console.print("Updating skin icon...")
        document.getElementById("currentSkinName").innerHTML = OpenSkin.skin().name;
        document.getElementById("currentSkinArtist").innerHTML = OpenSkin.skin().author;
        document.getElementById("currentSkinLogo").src = OpenSkin.skin().logo;
      },
      fetchInstalledSkins: function() {
        // Updates skin labels
        eclipse.methods.skins.updateSkinLabel();

        // Get current skins
        sk = skins.list();
        if (sk.length > 0) {
          var skinsList = "<ul>";
          for (var i = 0; i < sk.length; i++) {
            try {
              json = sk[i].getJSON();
              if (json.name == undefined || json.name == null) {
                skinsList += '<li class="swipeout" >' +
                  '<div class="swipeout-content">' +
                  // i is == to 2 for some reason, all the time. ? ?? ?? ?¿
                  '<div class="item-content skin-item" data-url="' + sk[i] + '">' +
                  '<div class="item-media"><img onerror="javascript:this.src=\'assets/img/default-cover.png\'"id="skinIcon' + i + '" src="assets/img/default-cover.png" width="44px" style="border-radius:44px;"/></div>' +
                  '<div class="item-inner">' +
                  '<div class="item-title">' +
                  '<span id="skinName' + i + '">Unknown Skin</span>' +
                  '<div class="item-footer" id="skinAuthor' + i + '">' + sk[i].patch().substring(sk[i].patch().indexOf("?dl=") + 4) + '</div>' +
                  '</div>' +
                  '</div>' +
                  '</div>' +
                  '</div>' +
                  '<div class="swipeout-actions-right swipeout-delete">' +
                  '<a href="#" style="background: #fe3b30" onclick="eclipse.methods.skins.removeSkin(\'' + sk[i].patch() + '\')">Delete</a>' +
                  '</div>' +
                  '</li>';
              } else {
                skinsList += '<li class="swipeout" >' +
                  // i is == to 2 for some reason, all the time. ? ?? ?? ?¿
                  '<a draggable="false" href="#" onclick="skins.set(\'' + sk[i].patch() + '\')"   data-name="' + json.name.patch() + '" data-url="' + sk[i] + '" class="skin-item item-link item-content swipeout-content">' +
                  '<div class="item-media"><img onerror="javascript:this.src=\'assets/img/default-cover.png\'" id="skinIcon' + i + '" src="' + json.logo.patch() + '" width="44px" style="border-radius:44px;"/></div>' +
                  '<div class="item-inner">' +
                  '<div class="item-title">' +
                  '<span id="skinName' + i + '">' + json.name.patch() + '</span>' +
                  '<div class="item-footer" id="skinAuthor' + i + '">' + json.author.patch() + '</div>' +
                  '</div>' +
                  '</div>' +
                  '</a>' +
                  '<div class="swipeout-actions-right swipeout-delete">' +
                  '<a href="#" style="background: #fe3b30" onclick="eclipse.methods.skins.removeSkin(\'' + sk[i].patch() + '\')">Delete</a>' +
                  '</div>' +
                  '</li>';
              }
              document.getElementById("skins-list").innerHTML = skinsList + "</ul>";
              $$('.skin-item').on('taphold contextmenu', function(ev) {
                var name = $(this).attr('data-name');
                if (name == null) {
                  name = "Unknown Skin";
                }
                ev.preventDefault();
                console.log(ev);
                var url = $(this).attr('data-url');
                eclipse.actions.create({
                  buttons: [
                    // First group
                    [{
                        text: name,
                        label: true
                      },
                      {
                        text: 'Remove',
                        bold: true,
                        onClick: function() {
                          eclipse.methods.skins.removeSkin(url);
                          eclipse.methods.skins.fetchInstalledSkins();
                        }
                      },
                    ],
                    // Second group
                    [{
                      text: 'Cancel',
                      color: 'red'
                    }]
                  ]
                }).open();
                return false;
              });
            } catch (err) {
              console.error("Notice: Skin " + i + " is broken.")
            }
            // document.getElementById("skinIcon" + i).src = json.logo.patch();
            // });
          }
        } else {
          emptyList = "<div class=\"block\"><center style=\"padding:5px\"><h2 style=\"color:#333;\">No Skins</h2><p>Add some skins and they'll appear here.</p></center></div>"
          document.getElementById("skins-list").innerHTML = emptyList;
        }
      },
      addSkinPrompt: function() {
        eclipse.dialog.prompt('Enter a Skin URL:', function(url) {
          eclipse.methods.skins.addSkin(url);
        });
      },
      addSkinErr: function() {
        eclipse.dialog.prompt('That skin was not found. Please enter a Skin URL:', function(url) {
          eclipse.methods.skins.addSkin(url);
        });
      },
      fetchLastSkin: function() {
        sk = skins.list();
        i = sk.length - 1;
        json = sk[i].getJSON();
        skinsList = '<li class="swipeout">' +
          '<a draggable="false" href="#" onclick="skins.set(\'' + sk[i].patch() + '\')"   data-name="' + json.name.patch() + '" data-url="' + sk[i] + '" class="skin-item item-link item-content swipeout-content">' +
          '<div class="item-media"><img onerror="javascript:this.src=\'assets/img/default-cover.png\'" id="skinIcon' + i + '" src="' + json.logo.patch() + '" width="44px" style="border-radius:44px;"/></div>' +
          '<div class="item-inner">' +
          '<div class="item-title">' +
          '<span id="skinName' + i + '">' + json.name.patch() + '</span>' +
          '<div class="item-footer" id="skinAuthor' + i + '">' + json.author.patch() + '</div>' +
          '</div>' +
          '</div>' +
          '</a>' +
          '<div class="swipeout-actions-right swipeout-delete">' +
          '<a href="#" style="background: #fe3b30" onclick="eclipse.methods.skins.removeSkin(\'' + sk[i].patch() + '\')">Delete</a>' +
          '</div>' +
          '</li>';
        document.querySelector("#skins-list>ul").innerHTML += skinsList;
      },
      addSkin: function(url) {
        isDupe = Boolean(skins.list().search("//php.eclipseemu.me/dl/dl.php?dl=" + url)+1);
        if(isDupe) {
          console.toast("You already have that skin!");
        } else {
          skins.add("//php.eclipseemu.me/dl/dl.php?dl=" + url);
        }
      },
      removeSkin: function(url) {
        console.log(url)
        i = skins.list().search(url);
        // To prevent a possibly detrimental user experience, let's hide the skin so we don't have to refresh all of them.
        // console.log(i)
        // document.querySelectorAll("#skins-list>ul>li")[i].style.display = "none";
        skins.remove(url, true);

        // eclipse.methods.skins.fetchInstalledSkins();
      },
      listFeaturedSkins: function() {
        var skinsList = skins.list();
        var featured = "json/skins/featured.json".getJSON();
        var featured_shuffled = featured.shuffle();
        var libraryRows = featured.length % 5;
        var emptySlots = 5 - libraryRows;
        var featuredSlides = "";
        var featuredCards = "";
        for (i = 0; i < featured.length; i++) {
          featuredSlides += '<div class="gradient swiper-slide" style="height:300px; width: 85%; border-radius:10px;">' +
            '<div class="content-block" style="height:100%; width:100%; text-align:center; padding:16px; padding-top:64px;">' +
            '<img onerror="javascript:this.src=\'assets/img/default-cover.png\'" width="128px" style="border-radius:5px; box-shadow: 0 5px 15px 0 rgba(0, 0, 0, .1);" src="' + featured_shuffled[i].icon + '">' +
            '<h3 style="margin:5px;width:100%;text-align:center;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' + featured_shuffled[i].name + '</h3>' +
            '<div class="row">' +
            '<div class="col-100 tablet-33"></div>' +
            '<div class="col-100 tablet-33">' +
            '<a style="" href="#" onclick="eclipse.methods.skins.addSkin(\'' + featured_shuffled[i].link + '\')" class="button button-fill button-big color-white text-color-black white-button">Add Skin</a>' +
            '</div>' +
            '<div class="col-100 tablet-33"></div>' +
            '</div>' +
            '</div>' +
            '</div>';
        }

        document.getElementById('featured-skins-sliders').innerHTML = featuredSlides;

        for (i = 0; i < featured.length; i++) {
          featuredCards += '<div class="col-50 tablet-20">' +
            '<a href="#" onclick="eclipse.methods.skins.addSkin(\'' + featured[i].link + '\')">' +
            '<li class="card">' +
            '<div class="card-content">' +
            '<img onerror="javascript:this.src=\'assets/img/default-cover.png\'" src="' + featured[i].icon + '" class="boxart">' +
            '</div>' +
            '<div class="card-footer"><text class="card-footer-inner-text">' + featured[i].name + '</text></div>' +
            '</li>' +
            '</a>' +
            '</div>';
        }

        for (var ii = 0; ii < emptySlots; ii++) {
          featuredCards += "<div class=\"col-50 tablet-20\"></div>";
        }

        document.getElementById('featured-skins').innerHTML = featuredCards;

        var swiper = eclipse.swiper.create('.swiper-container', {
          speed: 400,
          spaceBetween: 10,
          slidesPerView: 'auto',
          centeredSlides: true,
          pagination: {
            el: '.swiper-pagination',
          },
          loop: true
        });
      },
    },
    // Repos
    repos: {
      addPrompt: function() {
        eclipse.dialog.prompt('Enter a Repo URL:', function(url) {
          eclipse.methods.repos.addRepo(url);
        });
      },
      addErr: function() {
        eclipse.dialog.prompt('That repo was not found. Please enter a Repo URL:', function(url) {
          eclipse.methods.repos.addRepo(url);
        });
      },
      addRepo: function(url) {
        repos.add("https://php.eclipseemu.me/dl/dl.php?dl=" + url.patch(), true);
        eclipse.methods.repos.list();
      },
      listFeatured: function() {
        var featured = "json/repos/featured.json".getJSON();
        var featured_shuffled = featured.shuffle();
        var libraryRows = featured.length % 5;
        var emptySlots = 5 - libraryRows;
        var featuredSlides = "";
        var featuredCards = "";

        for (i = 0; i < featured.length; i++) {
          featuredSlides += '<div class="swiper-slide gradient" style="height:300px; width: 85%; border-radius:10px;">' +
            '<div class="content-block" style="height:100%; width:100%; text-align:center; padding:16px; padding-top:64px;">' +
            '<img onerror="javascript:this.src=\'assets/img/default-cover.png\'" width="128px" style="border-radius:5px; box-shadow: 0 5px 15px 0 rgba(0, 0, 0, .1);" src="' + featured_shuffled[i].icon + '">' +
            '<h3 style="margin:5px;width:100%;text-align:center;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' + featured_shuffled[i].name + '</h3>' +
            '<div class="row">' +
            '<div class="col-100 tablet-33"></div>' +
            '<div class="col-100 tablet-33">' +
            '<a style="" href="#" onclick="eclipse.methods.repos.addRepo(\'' + featured_shuffled[i].link + '\');" class="button button-fill button-big color-white text-color-black white-button">Add Repo</a>' +
            '</div>' +
            '<div class="col-100 tablet-33"></div>' +
            '</div>' +
            '</div>' +
            '</div>';
        }

        document.getElementById('featured-repos-sliders').innerHTML = featuredSlides;

        for (i = 0; i < featured.length; i++) {
          featuredCards += '<div class="col-50 tablet-20">' +
            '<a href="#" onclick="eclipse.methods.repos.addRepo(\'' + featured[i].link + '\');">' +
            '<li class="card">' +
            '<div class="card-content">' +
            '<img onerror="javascript:this.src=\'assets/img/default-cover.png\'" src="' + featured[i].icon + '" class="boxart">' +
            '</div>' +
            '<div class="card-footer"><text class="card-footer-inner-text">' + featured[i].name + '</text></div>' +
            '</li>' +
            '</a>' +
            '</div>';
        }

        for (var ii = 0; ii < emptySlots; ii++) {
          featuredCards += "<div class=\"col-50 tablet-20\"></div>";
        }

        document.getElementById('featured-repos').innerHTML = featuredCards;

        var swiper = eclipse.swiper.create('.swiper-container', {
          speed: 400,
          spaceBetween: 10,
          slidesPerView: 'auto',
          centeredSlides: true,
          pagination: {
            el: '.swiper-pagination',
          },
          loop: true
        });
      },
      list: function() {
        var reposList = repos.list();
        if (reposList.length > -1) {
          var repoList = "";
          for (i = 0; i < reposList.length; i++) {
            try {
              var repoItem = repos.get(reposList[i]);
              if (repoItem == undefined || repoItem == null) {
                repoList += '<li class="swipeout">' +
                  '<div draggable="false" href="#" class="repo-item item-content swipeout-content" data-name="Unknown Repo" data-index="' + i + '" data-url="' + reposList[i].patch() + '">' +
                  '<div class="item-media"><img onerror="javascript:this.src=\'assets/img/default-cover.png\'" src="assets/img/default-cover.png" width="44px" style="border-radius:44px;"/></div>' +
                  '<div class="item-inner">' +
                  '<div class="item-title">' +
                  '<span>Unknown Repo</span>' +
                  '<div class="item-footer">' + reposList[i].patch().substring(reposList[i].patch().indexOf("?dl=") + 4) + '</div>' +
                  '</div>' +
                  '</div>' +
                  '</div>' +
                  '<div class="swipeout-actions-right">' +
                  '<a href="#" class="swipeout-delete" style="background: #fe3b30" onclick="repos.remove(\'' + reposList[i].patch() + '\',true,true)">Delete</a>' +
                  '</div>' +
                  '</li>';
              } else {
                var gameCount = 0;
                for (var x = 0; x < repoItem.categories.length; x++) {
                  gameCount += repoItem.categories[x].games.length;
                }
                repoList += '<li class="swipeout">' +
                  '<a draggable="false" href="/repo/?url=' + btoa(reposList[i]) + '" class="repo-item item-link item-content swipeout-content" data-name="' + repoItem.reponame.patch() + '" data-url="' + reposList[i].patch() + '">' +
                  '<div class="item-media"><img onerror="javascript:this.src=\'assets/img/default-cover.png\'" src="' + repoItem.repologo.patch() + '" width="44px" style="border-radius:44px;"/></div>' +
                  '<div class="item-inner">' +
                  '<div class="item-title">' +
                  '<span>' + repoItem.reponame.patch() + '</span>' +
                  '<div class="item-footer">' + repoItem.repoauthor.patch() + '</div>' +
                  '</div>' +
                  '<div class="item-after"><span class="badge">' + gameCount + '</span></div>' +
                  '</div>' +
                  '</a>' +
                  '<div class="swipeout-actions-right">' +
                  '<a href="#" class="swipeout-delete" style="background: #fe3b30" onclick="repos.remove(\'' + reposList[i].patch() + '\',true,true)">Delete</a>' +
                  '</div>' +
                  '</li>';
              }
            } catch (err) {
              console.error("Notice: Repo " + i + " is broken.")
              console.error(err)
            }
          }
          document.getElementById('repos-list').innerHTML = "<ul>" + repoList + "</ul>";
          $$('.repo-item').on('taphold contextmenu', function(ev) {
            ev.preventDefault();
            console.log(ev);
            var url = $(this).attr('data-url');
            eclipse.actions.create({
              buttons: [
                // First group
                [{
                    text: $(this).attr('data-name'),
                    label: true
                  },
                  {
                    text: 'Remove',
                    bold: true,
                    onClick: function() {
                      repos.remove(url, true, true);
                      eclipse.methods.repos.list();
                    }
                  },
                ],
                // Second group
                [{
                  text: 'Cancel',
                  color: 'red'
                }]
              ]
            }).open();
            return false;
          });
        }
        eclipse.methods.repos.checkIfEmpty();
      },
      checkIfEmpty: function() {
        var reposList = repos.list();
        if (reposList.length == 0) {
          repoList = `<div class="no-repo" style="text-align:center; padding:16px;">
                        <h2>No Repos</h2>
                        <p>You can add games by pressing the + button in the top right corner.</p>
                      </div>`;
          document.getElementById('repos-list').innerHTML = repoList;
        }
      }
    },
    // Settings
    storage: {
      wrapper: function() {
        if ('storage' in navigator && 'estimate' in navigator.storage) {
          // We've got the real thing! Return its response.
          return navigator.storage.estimate();
        }

        if ('webkitTemporaryStorage' in navigator && 'queryUsageAndQuota' in navigator.webkitTemporaryStorage) {
          // Return a promise-based wrapper that will follow the expected interface.
          return new Promise(function(resolve, reject) {
            navigator.webkitTemporaryStorage.queryUsageAndQuota(
              function(usage, quota) {
                resolve({
                  usage: usage,
                  quota: quota
                })
              },
              reject
            );
          });
        }

        if (navigator.userAgent.toLowerCase().search(/(chrome|android)/i) == -1 && navigator.userAgent.toLowerCase().search(/safari/i) != -1) {
          // return new Promise(function(resolve, reject) {
          usage = (JSON.stringify(localStorage).length) * 2; // Calculate the approximate length, in bytes. x2 due to UTF-16.
          console.print("Exact Usage: " + usage)
          quota = 5200000;
          //usage += 8000000 // Eclipse uses 7.0MB, but we'll report 8, just in case.
          console.print("Total Quota: " + quota)
          //   function(usage, quota) {resolve({usage: usage, quota: quota})}, reject
          // });
          return Promise.resolve({
            usage: usage,
            quota: quota
          });
        }

        // If we can't estimate the values, return a Promise that resolves with NaN.
        return Promise.resolve({
          usage: NaN,
          quota: NaN
        });
      },
      reset: {
        repos: function() {
          eclipse.dialog.confirm('Are you sure you want to clear your installed repos? This cannot be undone.', "Reset Repos?", function() {
            localStorage.setItem("repos", "[]");
            console.toast("Installed repos have been cleared.");
          });
        },
        games: function() {
          eclipse.dialog.confirm('Are you sure you want to clear your installed games? This cannot be undone.', "Reset Games?", function() {
            localStorage.setItem("games", "[]");
            console.toast("Installed games have been cleared.");
          });
        },
        skins: function() {
          eclipse.dialog.confirm('Are you sure you want to clear your installed skins? This cannot be undone.', "Reset Skins?", function() {
            localStorage.setItem("skins", '["https://eclipseemu.me/play/json/skins/default.json"]');
            localStorage.setItem("currentSkin", '{"name":"Default","logo":"https:\/\/eclipseemu.me\/play\/img\/icons\/icon_mobFull.png","author":"Eclipse Team","description":"The default theme for Eclipse.","styles":[[]]}');
            console.toast("Installed skins have been cleared.");
            window.location.reload();
          });
        },
        controls: function() {
          eclipse.dialog.confirm('Are you sure you want to reset your keybinds and paired controllers? This cannot be undone.', "Reset Controls?", function() {
            localStorage.removeItem("controls");
            localStorage.removeItem("controls_form");
            console.toast("Your controller and keybind settings have been cleared.");
          });
        },
        all: function() {
          eclipse.dialog.confirm('Are you sure you want to clear repos, games, skins, and controls? This cannot be undone.', "Reset Eclipse?", function() {
            localStorage.setItem("repos", "[]");
            localStorage.setItem("games", "[]");
            localStorage.setItem("skins", '["https://eclipseemu.me/play/json/skins/default.json"]');
            localStorage.setItem("currentSkin", '{"name":"Default","logo":"https:\/\/eclipseemu.me\/play\/img\/icons\/icon_mobFull.png","author":"Eclipse Team","description":"The default theme for Eclipse.","styles":[[]]}');
            localStorage.removeItem("controls");
            localStorage.removeItem("controls_form");
            console.toast("Eclipse has been reset.");
            window.location.reload();
          });
        }
      },
      nuke: function() {
        eclipse.dialog.confirm('Are you sure you want to initialize Eclipse? All data will be lost.', "Initialize Eclipse?", function() {
          localStorage.clear();
          console.toast("Eclipse has been initialized. Restarting...");
          window.location.reload();
        });
      },
    },
    backups: {
      export: function() {
        var json = "{\"notice\":\"Please copy the entirity of this page and create a new file with the extension '.eclipse'. Open the new file, and paste the copied text inside.  You will only see this page once, the next launch of Eclipse will not show this.\",\"backup_v2\":true,\"eclipse\":" + JSON.stringify(localStorage) + "}"
        if (window.navigator.standalone) {
          // iOS Device in WebClip
          prompt("This is the contents of the '.eclipse' file, copy and paste it to a safe location, so that you may import it later.", json)
        } else {
          // Not an iOS Device in a WebClip, can download
          var blob = new Blob([json], {
            type: "text/plain;charset=utf-8"
          });
          saveAs(blob, 'eclipse_backup_' + new Date().getTime() + ".eclipse");
        }
      },
      import: {
        text: function() {
          eclipse.dialog.prompt('Enter the text of the backup.', function(json) {
            eclipse.dialog.confirm('Performing this action will erase all of your data and overwrite it with the data contained in the file, are you sure you would like to continue?', function() {
              eclipse.methods.backups.import.import_data(json);
            });
          });
        },
        url: function() {
          eclipse.dialog.prompt('Enter the URL for the backup.', function(url) {
            eclipse.dialog.confirm('Performing this action will erase all of your data and overwrite it with the data contained in the file, are you sure you would like to continue?', function() {
              try {
                $.ajax({
                  url: "https://php.eclipseemu.me/dl/dl.php?dl=" + url,
                  async: false,
                  dataType: 'raw',
                  complete: function(data) {
                    json = data.responseText;
                    eclipse.methods.backups.import.import_data(json);
                  }
                });
              } catch (err) {
                magnetar.error("You need jQuery linked for fetching text like this to work\n" + err);
              }
            });
          });
        },
        upload: function() {
          var upload_element = document.getElementById('backup_upload');
          upload_element.click();
          upload_element.addEventListener("change", function() {
            var files = document.getElementById('backup_upload').files;
            var file = files[0];
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function() {
              eclipse.dialog.confirm('Performing this action will erase all of your data and overwrite it with the data contained in the file, are you sure you would like to continue?', function() {
                var result = reader.result;
                try {
                  var json = atob(result.replace('data:;base64,', '').replace('data:text/plain;charset=x-user-defined;base64,', '')).replace('ï»¿', '');
                  eclipse.methods.backups.import.import_data(json);
                } catch (err) {
                  eclipse.dialog.alert('Invalid file format. Please input an .igba or .eclipse file.')
                }
              });
            };
            reader.onerror = function(error) {
              console.log('Error: ', error);
            };
          });
        },
        menu: function() {
          var import_menu = eclipse.actions.create({
            buttons: [
              [{
                  text: 'Import Backup',
                  label: true
                },
                {
                  text: 'Upload',
                  icon: '<i class="icon f7-icons ios-only">folder_fill</i><i class="icon material-icons md-only">folder</i>',
                  onClick: function() {
                    eclipse.methods.backups.import.upload();
                  }
                },
                {
                  text: 'URL',
                  icon: '<i class="icon f7-icons ios-only">compass_fill</i><i class="icon material-icons md-only">explore</i>',
                  onClick: function() {
                    eclipse.methods.backups.import.url();
                  }
                },
                {
                  text: 'Text',
                  icon: '<i class="icon f7-icons ios-only">document_text_fill</i><i class="icon material-icons md-only">description</i>',
                  onClick: function() {
                    eclipse.methods.backups.import.text();
                  }
                }
              ],
              // Second group
              [{
                text: 'Cancel',
                color: 'red'
              }]
            ],
            grid: false,
          });
          import_menu.open();
        },
        import_data: function(json) {
          try {
            var data = JSON.parse(json.replace('{"name": "google_pub_config", "inner": "{"sraConfigs":{"2":{"sraTimeout":60000},"4":{"sraTimeout":60000}}}" }, ', ''));
            if (data.eclipse != null || data.igba != null) {
              // Its a state
              if (data.backup_v2 == true) {
                // Import Backups v2
                Object.keys(data.eclipse).forEach(function(key) {
                  localStorage.setItem(key, data.eclipse[key]);
                });
                location.reload();
              } else {
                // Import Backups v1
                if (data.eclipse != null || data.igba != null) {
                  var request = "b64=" + btoa(JSON.stringify(data));
                  var xhttp = new XMLHttpRequest();
                  xhttp.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                      var output = JSON.parse(this.responseText);
                      Object.keys(output.eclipse).forEach(function(key) {
                        localStorage.setItem(key, output.eclipse[key]);
                      });
                      location.reload();
                    }
                  };
                  xhttp.open("POST", "https://php.eclipseemu.me/states/", false);
                  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                  xhttp.send(request);
                } else {
                  eclipse.dialog.alert('The backup you imported is invalid');
                }
              }
            } else {
              eclipse.dialog.alert('The backup you imported is invalid');
            }
          } catch (err) {
            eclipse.dialog.alert(err);
          }
        }
      }
    },
    legacyStatusCorrector: function() {
      eclipse.statusbar.hide();
      var iXStyle = document.createElement("style");
      iXStyle.id = "statusCorrectorLegacy";
      iXStyle.innerHTML = "body {height:calc(100vh - 20px)!important}";
      document.head.appendChild(iXStyle);
    },
    toggle: {
      legacyStatusBar: function() {
        var legacyCorrect = localStorage.getItem('legacyCorrect');
        if (legacyCorrect == "false") {
          localStorage.setItem('legacyCorrect', "true");
          eclipse.methods.legacyStatusCorrector();
        } else {
          localStorage.setItem('legacyCorrect', "false");
          eclipse.statusbar.show();
          document.getElementById("statusCorrectorLegacy")
        }
      },
      autoSave: function() {
        var autoSave = localStorage.getItem('autoSave');
        if (autoSave == "false") {
          localStorage.setItem('autoSave', "true");
        } else {
          localStorage.setItem('autoSave', "false");
        }
      },
      audio: function() {
        var audioStatus = localStorage.getItem('audioStatus');
        if (audioStatus == "false") {
          localStorage.setItem('audioStatus', "true");
        } else {
          localStorage.setItem('audioStatus', "false");
        }
      },
      fillScreen: function() {
        var fillScreen = localStorage.getItem('fillScreen');
        if (fillScreen == "false") {
          localStorage.setItem('fillScreen', "true");
        } else {
          localStorage.setItem('fillScreen', "false");
        }
      },
      desktopMode: function() {
        var desktopMode = localStorage.getItem('desktopMode');
        if (desktopMode == "false") {
          localStorage.desktopMode = "true";
          document.getElementById("key_bindings_list_item").setAttribute("style", "display:block;")
        } else {
          localStorage.desktopMode = "false";
          document.getElementById("key_bindings_list_item").setAttribute("style", "display:none;")
        }
        OpenSkin.load() // Refresh skin to apply.
      },
      configDesktop: function() {
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
      },
      jsConsole: function() {
        if (document.getElementById('consoleToggle').style.display == '') {
          try {
            eclipse.methods.debug.console.init();
            console.toast("Initiated logging in the in-app JavaScript console This might cause subtle changes in behavior for the rest of the session.");
          } catch (err) {
            console.toast("Failed to enable logging in the in-app JavaScript console.")
            console.errorOrg(err);
          }
        }
        if (document.getElementById('consoleToggle').style.display == 'none' || document.getElementById('consoleToggle').style.display == '') {
          document.getElementById('consoleToggle').style.display = 'block';
        } else {
          document.getElementById('consoleToggle').style.display = 'none';
        }
      }
    },
    keybindings: {
      init: function() {
        if (localStorage.getItem("controls") === null) {
          var controls = {
            up: 38,
            down: 40,
            left: 37,
            right: 39,
            start: 13,
            select: 16,
            a: 88,
            b: 90,
            x: 83,
            y: 88,
            l: 49,
            r: 50
          };
          var controls_json = JSON.stringify(JSON.stringify(controls));
          var controls_form = JSON.stringify("{\"up\":\"ArrowUp\",\"down\":\"ArrowDown\",\"left\":\"ArrowLeft\",\"right\":\"ArrowRight\",\"start\":\"Enter\",\"select\":\"Shift\",\"a\":\"X\",\"b\":\"Z\",\"r\":\"1\",\"l\":\"2\"}");
          localStorage.setItem("controls", controls_json);
          localStorage.setItem("controls_form", controls_form);
        }
      },
      get_char_name: function(keycode) {
        var keyboardMap = ["", "", "", "CANCEL", "", "", "HELP", "", "BACK_SPACE", "TAB", "", "", "CLEAR", "ENTER", "ENTER_SPECIAL", "", "SHIFT", "CONTROL", "ALT", "PAUSE", "CAPS_LOCK", "KANA", "EISU", "JUNJA", "FINAL", "HANJA", "", "ESCAPE", "CONVERT", "NONCONVERT", "ACCEPT", "MODECHANGE", "SPACE", "PAGE_UP", "PAGE_DOWN", "END", "HOME", "LEFT", "UP", "RIGHT", "DOWN", "SELECT", "PRINT", "EXECUTE", "PRINTSCREEN", "INSERT", "DELETE", "", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "COLON", "SEMICOLON", "LESS_THAN", "EQUALS", "GREATER_THAN", "QUESTION_MARK", "AT", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "OS_KEY", "", "CONTEXT_MENU", "", "SLEEP", "NUMPAD0", "NUMPAD1", "NUMPAD2", "NUMPAD3", "NUMPAD4", "NUMPAD5", "NUMPAD6", "NUMPAD7", "NUMPAD8", "NUMPAD9", "MULTIPLY", "ADD", "SEPARATOR", "SUBTRACT", "DECIMAL", "DIVIDE", "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12", "F13", "F14", "F15", "F16", "F17", "F18", "F19", "F20", "F21", "F22", "F23", "F24", "", "", "", "", "", "", "", "", "NUM_LOCK", "SCROLL_LOCK", "WIN_OEM_FJ_JISHO", "WIN_OEM_FJ_MASSHOU", "WIN_OEM_FJ_TOUROKU", "WIN_OEM_FJ_LOYA", "WIN_OEM_FJ_ROYA", "", "", "", "", "", "", "", "", "", "CIRCUMFLEX", "EXCLAMATION", "DOUBLE_QUOTE", "HASH", "DOLLAR", "PERCENT", "AMPERSAND", "UNDERSCORE", "OPEN_PAREN", "CLOSE_PAREN", "ASTERISK", "PLUS", "PIPE", "HYPHEN_MINUS", "OPEN_CURLY_BRACKET", "CLOSE_CURLY_BRACKET", "TILDE", "", "", "", "", "VOLUME_MUTE", "VOLUME_DOWN", "VOLUME_UP", "", "", "SEMICOLON", "EQUALS", "COMMA", "MINUS", "PERIOD", "SLASH", "BACK_QUOTE", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "OPEN_BRACKET", "BACK_SLASH", "CLOSE_BRACKET", "QUOTE", "", "META", "ALTGR", "", "WIN_ICO_HELP", "WIN_ICO_00", "", "WIN_ICO_CLEAR", "", "", "WIN_OEM_RESET", "WIN_OEM_JUMP", "WIN_OEM_PA1", "WIN_OEM_PA2", "WIN_OEM_PA3", "WIN_OEM_WSCTRL", "WIN_OEM_CUSEL", "WIN_OEM_ATTN", "WIN_OEM_FINISH", "WIN_OEM_COPY", "WIN_OEM_AUTO", "WIN_OEM_ENLW", "WIN_OEM_BACKTAB", "ATTN", "CRSEL", "EXSEL", "EREOF", "PLAY", "ZOOM", "", "PA1", "WIN_OEM_CLEAR", ""];
        var name = keyboardMap[keycode].toLowerCase();
        return name[0].toUpperCase() + name.substr(1);
      },
      show_key: function(event) {
        var element_id = event.srcElement.getAttribute("id");
        document.getElementById(element_id).setAttribute("data-keycode", event.keyCode);
        document.getElementById(element_id).value = event.key[0].toUpperCase() + event.key.substr(1);
      },
      set: function() {
        var controls = {
          up: document.getElementById("up_input").getAttribute("data-keycode"),
          down: document.getElementById("down_input").getAttribute("data-keycode"),
          left: document.getElementById("left_input").getAttribute("data-keycode"),
          right: document.getElementById("right_input").getAttribute("data-keycode"),
          start: document.getElementById("start_input").getAttribute("data-keycode"),
          select: document.getElementById("select_input").getAttribute("data-keycode"),
          a: document.getElementById("a_input").getAttribute("data-keycode"),
          b: document.getElementById("b_input").getAttribute("data-keycode"),
          x: document.getElementById("x_input").getAttribute("data-keycode"),
          y: document.getElementById("y_input").getAttribute("data-keycode"),
          l: document.getElementById("r_input").getAttribute("data-keycode"),
          r: document.getElementById("l_input").getAttribute("data-keycode")
        };
        var form_data = eclipse.form.convertToData('#controls_form');
        var controls_json = JSON.stringify(JSON.stringify(controls));
        var form_json = JSON.stringify(JSON.stringify(form_data));
        localStorage.setItem("controls", controls_json);
        localStorage.setItem("controls_form", form_json);
      }
    },
    manage_games: {
      remove: function(index, is_popup) {
        var gamesList = games.list();
        var jsonItem = gamesList[index];
        console.toast('"' + JSON.parse(jsonItem).name.patch() + '" has been removed.');
        games.remove(jsonItem);
        gamesList = games.list();
        var library = "";
        if (gamesList.length > 0) {
          for (i = 0; i < gamesList.length; i++) {
            var game = JSON.parse(gamesList[i]);
            library += `<li class="swipeout">
                        <a class="game-item swipeout-content item-content item-link" onclick="eclipse.methods.emu.systems.${game.system.toLowerCase()}.init({url: '${btoa("https://php.eclipseemu.me/dl/dl.php?dl=" + game.link.patch())}'}); DiscordLink.set('${game.system.patch().toLowerCase()}','${game.name.patch()}');" data-index="${i}" data-name="${game.name}" data-url="${game.link}" data-system="${game.system}">
                          <div class="item-media">
                            <img onerror="javascript:this.src='assets/img/default-cover.png'" src="${game.boxart}" width="56" style="border-radius:3px;" />
                          </div>
                          <div class="item-inner">
                            <div class="item-title">
                              ${game.name}
                              <div class="item-footer">${expandPlatform(game.system)}</div>
                            </div>
                          </div>
                        </a>
                        <div class="sortable-handler"></div>
                        <div class="swipeout-actions-right">
                          <a href="#" class="swipeout-delete" style="background: #fe3b30" onclick="eclipse.methods.manage_games.remove('${i}', false)">Delete</a>
                        </div>
                      </li>`;
          }
          document.getElementById('manage_games_list').innerHTML = library;
          $$('.game-item').on('taphold contextmenu', function(ev) {
            ev.preventDefault();
            eclipse.methods.games.manageGamePopup($(this).attr('data-index'), $(this).attr('data-name'), "/settings/games/");
            return false;
          });
          eclipse.on('sortableSort', function(listEl, indexes) {
            eclipse.methods.rearrangeGames();
          });
        } else {
          document.getElementById('parent_manage_games_list').style = "display:none;";
          document.getElementById('no-games').style = "text-align:center;";
          console.print('There are no games!');
        }
      },
      move: function(arr, old_index, new_index) {
        if (new_index >= arr.length) {
          var k = new_index - arr.length + 1;
          while (k--) {
            arr.push(undefined);
          }
        }
        arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
        return arr; // for testing
      },
    },
    updates: {
      update: function() {
        eclipse.dialog.confirm('A new update is available, do you wish to update? The update will be available in settings if you decline. (Any unsaved progress in a game will be lost)', function() {
          eclipse.methods.updates.cache();
        });
      },
      cache: function() {
        try {
          window.applicationCache.swapCache();
        } catch (err) {
          try {
            window.applicationCache.update();
            // eclipse.log(err);
          } catch (err) {
            alert("Eclipse Error (0x90000)\n\nPurging the application cache was unsuccessful. Please screenshot this page and send it to @TryEclipse on Twitter so we can resolve this.\n\n" + err);
          }
        }
        location.reload(true);
      },
      reinstall: function() {
        try {
          window.applicationCache.update();
        } catch (err) {
          alert("Eclipse Error (0x90001)\n\nPurging the application cache was unsuccessful. Please screenshot this page and send it to @TryEclipse on Twitter so we can resolve this.\n\n" + err);
        }
        location.reload(true);
      },
    },
    // Emulator-Related
    emu: {
      load: function(options) {
        eclipse.data.emu = options;
        eclipse.data.js_files.needed = options.files.length;
        for (var i = 0; i < options.files.length; i++) {
          eclipse.methods.script.load(options.files[i], true);
        }
        window.onresize = function() {
          eclipse.methods.emu.resize_screen('emu_screen_container', 'emu_screen_canvas', options.screen_scale);
        };
        document.getElementById("emu_system_name").innerHTML = options.name;
        // Reset Controls State
        document.getElementById('desktop-notice').setAttribute('class', 'desktop-notice');
        document.getElementById('emu_up_btn').setAttribute('style', 'display:block;');
        document.getElementById('emu_down_btn').setAttribute('style', 'display:block;');
        document.getElementById('emu_center').setAttribute('style', 'display:block;');
        document.getElementById('emu_left_btn').setAttribute('style', 'display:block;');
        document.getElementById('emu_right_btn').setAttribute('style', 'display:block;');
        document.getElementById('emu_start_btn').setAttribute('style', 'display:inline-block;');
        document.getElementById('emu_select_btn').setAttribute('style', 'display:inline-block;');
        document.getElementById('emu_a_btn').setAttribute('style', 'display:block;');
        document.getElementById('emu_b_btn').setAttribute('style', 'display:block;');
        document.getElementById('emu_x_btn').setAttribute('style', 'display:block;');
        document.getElementById('emu_y_btn').setAttribute('style', 'display:block;');
        document.getElementById('emu_l_btn').setAttribute('style', 'display:block;');
        document.getElementById('emu_r_btn').setAttribute('style', 'display:block;');

        if (!options.controls.r) {
          document.getElementById('emu_r_btn').setAttribute('style', 'display:none;');
        }

        if (!options.controls.l) {
          document.getElementById('emu_l_btn').setAttribute('style', 'display:none;');
        }

        if (!options.controls.a) {
          document.getElementById('emu_x_a').setAttribute('style', 'display:none;');
        }

        if (!options.controls.b) {
          document.getElementById('emu_b_btn').setAttribute('style', 'display:none;');
        }

        if (!options.controls.x) {
          document.getElementById('emu_x_btn').setAttribute('style', 'display:none;');
        }

        if (!options.controls.y) {
          document.getElementById('emu_y_btn').setAttribute('style', 'display:none;');
        }

        if (!options.controls.y && !options.controls.x) {
          document.getElementById('emu_a_btn').setAttribute('style', 'bottom:140px;');
          document.getElementById('emu_b_btn').setAttribute('style', 'bottom:90px;');
        }

        if (!options.controls.up) {
          document.getElementById('emu_up_btn').setAttribute('style', 'display:none;');
        }

        if (!options.controls.down) {
          document.getElementById('emu_down_btn').setAttribute('style', 'display:none;');
        }

        if (!options.controls.left) {
          document.getElementById('emu_left_btn').setAttribute('style', 'display:none;');
        }

        if (!options.controls.right) {
          document.getElementById('emu_right_btn').setAttribute('style', 'display:none;');
        }

        if (!options.controls.start) {
          document.getElementById('emu_start_btn').setAttribute('style', 'display:none;');
        }

        if (!options.controls.select) {
          document.getElementById('emu_select_btn').setAttribute('style', 'display:none;');
        }

        var keybinds = JSON.parse(JSON.parse(localStorage.getItem('controls')));
        if (keybinds != null) {
          eclipse.data.emu.controls.up = parseInt(keybinds.up);
          eclipse.data.emu.controls.down = parseInt(keybinds.down);
          eclipse.data.emu.controls.left = parseInt(keybinds.left);
          eclipse.data.emu.controls.right = parseInt(keybinds.right);
          eclipse.data.emu.controls.start = parseInt(keybinds.start);
          eclipse.data.emu.controls.select = parseInt(keybinds.select);
          eclipse.data.emu.controls.a = parseInt(keybinds.a);
          eclipse.data.emu.controls.b = parseInt(keybinds.b);
          eclipse.data.emu.controls.x = parseInt(keybinds.x);
          eclipse.data.emu.controls.y = parseInt(keybinds.y);
          eclipse.data.emu.controls.l = parseInt(keybinds.l);
          eclipse.data.emu.controls.r = parseInt(keybinds.r);
        } else {
          eclipse.data.emu.controls.up = options.controls.up;
          eclipse.data.emu.controls.down = options.controls.down;
          eclipse.data.emu.controls.left = options.controls.left;
          eclipse.data.emu.controls.right = options.controls.right;
          eclipse.data.emu.controls.start = options.controls.start;
          eclipse.data.emu.controls.select = options.controls.select;
          eclipse.data.emu.controls.a = options.controls.a;
          eclipse.data.emu.controls.b = options.controls.b;
          eclipse.data.emu.controls.x = options.controls.x;
          eclipse.data.emu.controls.y = options.controls.y;
          eclipse.data.emu.controls.l = options.controls.l;
          eclipse.data.emu.controls.r = options.controls.r;
        }
        eclipse.methods.emu.controls.load(eclipse.data.emu.controls);
        // Show the emu now.
        document.getElementById("open_emulator_popup").click();
        eclipse.methods.emu.resize_screen('emu_screen_container', 'emu_screen_canvas', options.screen_scale);
        if (options.experimental == true) {
          eclipse.data.expirmental_alert = eclipse.dialog.alert('The ' + options.name + ' core is expirmental. It may not work on your device, and if it does there will probably be some issues. Don\'t expect to be able to save and such.');
          eclipse.data.expirmental_alert.open();
        }
        if (eclipse.data.emu.rom.local == null) {
          eclipse.methods.emu.download_dialog.open();
        }
        var loadInterval = setInterval(function() {
          if (eclipse.data.js_files.loaded >= eclipse.data.js_files.needed) {
            clearInterval(loadInterval);
            eclipse.data.js_files.needed = 0;
            eclipse.data.js_files.loaded = 0;
            setTimeout(function(){
              try {
                eclipse.data.emu.init();
                setTimeout(function() {
                  if (eclipse.data.emu.rom.local != null) {
                    eclipse.data.emu.load_rom(uploaded_rom_value);
                  } else {
                    eclipse.data.emu.load_rom(atob_token(eclipse.data.emu.rom.url));
                  }
                }, 100)
              } catch (err) {
                console.error(err);
                eclipse.methods.emu.download_dialog.close();
                eclipse.dialog.create({
                  title: 'Eclipse',
                  text: 'There was an error loading the ROM preventing the emulator to load, this could be a problem with the ROM itself.',
                  buttons: [{
                    text: 'Close Emulator',
                    onClick: function() {
                      eclipse.methods.emu.unload();
                    }
                  }],
                  verticalButtons: true,
                }).open();
              }
            }, 500);
          }
        }, 100);
      },
      unload: function() {
        try {
          eclipse.data.emu.close();
        } catch (err) {
          console.log("There was an error loading the ROM preventing the emulator to load, this could be a problem with the ROM itself.")
        }
        setTimeout(function() {
          for (var i = 0; i < eclipse.data.emu.files.length; i++) {
            eclipse.methods.script.unload(eclipse.data.emu.files[i]);
          }
        }, 200);
        eclipse.data.js_files.needed = 0;
        eclipse.data.js_files.loaded = 0;
        eclipse.popup.close();
        DiscordLink.set("na");
      },
      resize_screen: function(parent, child, scale) {
        var container = document.getElementById(parent);
        var containerHeight = container.clientHeight || container.offsetHeight || 0;
        var containerWidth = container.clientWidth || container.offsetWidth || 0;
        if (containerHeight > 0 && containerWidth > 0) {
          var canvas = document.getElementById(child);
          var maxWidth = Math.floor(containerHeight * scale);
          var maxHeight = Math.floor(containerWidth / scale);
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
      },
      download_dialog: {
        open: function() {
          eclipse.data.download_dialog = eclipse.dialog.create({
            title: '<div class="preloader ios-only" style="color:#000;"></div><span class="md-only">Eclipse</span>',
            text: 'Downloading...',
            verticalButtons: true,
          });
          eclipse.data.download_dialog.open();
        },
        close: function() {
          try {
            eclipse.data.download_dialog.close();
          } catch (e) {}
        }
      },
      controls: {
        emulate_keypress: function(code) {
          var down = new Event('keypress');
          down.keyCode = code;
          document.dispatchEvent(down);
        },
        emulate_keydown: function(code) {
          var down = new Event('keydown');
          down.keyCode = code;
          document.dispatchEvent(down);
        },
        emulate_keyup: function(code) {
          var up = new Event('keyup');
          up.keyCode = code;
          document.dispatchEvent(up);
        },
        load: function(options) {
          var desktopModeEnabled = localStorage.getItem('desktopMode');
          if (desktopModeEnabled == "true") {
            document.getElementById('desktop-notice').setAttribute('class', 'desktop-notice desktop_mode');
            document.getElementById('emu_up_btn').setAttribute('style', 'display:none;');
            document.getElementById('emu_down_btn').setAttribute('style', 'display:none;');
            document.getElementById('emu_center').setAttribute('style', 'display:none;');
            document.getElementById('emu_left_btn').setAttribute('style', 'display:none;');
            document.getElementById('emu_right_btn').setAttribute('style', 'display:none;');
            document.getElementById('emu_start_btn').setAttribute('style', 'display:none;');
            document.getElementById('emu_select_btn').setAttribute('style', 'display:none;');
            document.getElementById('emu_a_btn').setAttribute('style', 'display:none;');
            document.getElementById('emu_b_btn').setAttribute('style', 'display:none;');
            document.getElementById('emu_x_btn').setAttribute('style', 'display:none;');
            document.getElementById('emu_y_btn').setAttribute('style', 'display:none;');
            document.getElementById('emu_l_btn').setAttribute('style', 'display:none;');
            document.getElementById('emu_r_btn').setAttribute('style', 'display:none;');
          } else {
            static = nipplejs.create({
              zone: document.getElementById('dpad_child'),
              mode: 'static',
              size: 150, // 150
              position: {
                left: '72px',
                bottom: '72px'
              },
              color: 'rgba(0,0,0,0)'
            });
            var location_y = eclipse.height - 147;
            static[0].position = {
              x: 80,
              y: location_y
            };
            static.on('start move end dir plain', function(evt, data) {
              if (evt.type != "end") {
                if (data.angle) {
                  if (data.distance > 20) {
                    var ang = data.angle.degree;
                    if ((ang >= 0 && ang <= 30) || (ang > 330 && ang <= 360)) {
                      dir = "R";
                      eclipse.methods.emu.controls.emulate_keyup(eclipse.data.emu.controls.left);
                      eclipse.methods.emu.controls.emulate_keyup(eclipse.data.emu.controls.down);
                      eclipse.methods.emu.controls.emulate_keyup(eclipse.data.emu.controls.up);
                      eclipse.methods.emu.controls.emulate_keydown(eclipse.data.emu.controls.right);
                    } else if (ang > 30 && ang <= 60) {
                      dir = "RU";
                      eclipse.methods.emu.controls.emulate_keyup(eclipse.data.emu.controls.left);
                      eclipse.methods.emu.controls.emulate_keyup(eclipse.data.emu.controls.down);
                      eclipse.methods.emu.controls.emulate_keydown(eclipse.data.emu.controls.right);
                      eclipse.methods.emu.controls.emulate_keydown(eclipse.data.emu.controls.up);
                    } else if (ang > 60 && ang <= 120) {
                      dir = "U";
                      eclipse.methods.emu.controls.emulate_keyup(eclipse.data.emu.controls.right);
                      eclipse.methods.emu.controls.emulate_keyup(eclipse.data.emu.controls.left);
                      eclipse.methods.emu.controls.emulate_keyup(eclipse.data.emu.controls.down);
                      eclipse.methods.emu.controls.emulate_keydown(eclipse.data.emu.controls.up);
                    } else if (ang > 120 && ang <= 150) {
                      dir = "UL";
                      eclipse.methods.emu.controls.emulate_keyup(eclipse.data.emu.controls.right);
                      eclipse.methods.emu.controls.emulate_keyup(eclipse.data.emu.controls.down);
                      eclipse.methods.emu.controls.emulate_keydown(eclipse.data.emu.controls.left);
                      eclipse.methods.emu.controls.emulate_keydown(eclipse.data.emu.controls.up);
                    } else if (ang > 150 && ang <= 210) {
                      dir = "L";
                      eclipse.methods.emu.controls.emulate_keyup(eclipse.data.emu.controls.right);
                      eclipse.methods.emu.controls.emulate_keyup(eclipse.data.emu.controls.down);
                      eclipse.methods.emu.controls.emulate_keyup(eclipse.data.emu.controls.up);
                      eclipse.methods.emu.controls.emulate_keydown(eclipse.data.emu.controls.left);
                    } else if (ang > 210 && ang <= 240) {
                      dir = "DL";
                      eclipse.methods.emu.controls.emulate_keyup(eclipse.data.emu.controls.right);
                      eclipse.methods.emu.controls.emulate_keyup(eclipse.data.emu.controls.up);
                      eclipse.methods.emu.controls.emulate_keydown(eclipse.data.emu.controls.left);
                      eclipse.methods.emu.controls.emulate_keydown(eclipse.data.emu.controls.down);
                    } else if (ang > 240 && ang <= 300) {
                      dir = "D";
                      eclipse.methods.emu.controls.emulate_keyup(eclipse.data.emu.controls.right);
                      eclipse.methods.emu.controls.emulate_keyup(eclipse.data.emu.controls.left);
                      eclipse.methods.emu.controls.emulate_keyup(eclipse.data.emu.controls.up);
                      eclipse.methods.emu.controls.emulate_keydown(eclipse.data.emu.controls.down);
                    } else if (ang > 300 && ang <= 330) {
                      dir = "DR";
                      eclipse.methods.emu.controls.emulate_keyup(eclipse.data.emu.controls.left);
                      eclipse.methods.emu.controls.emulate_keyup(eclipse.data.emu.controls.up);
                      eclipse.methods.emu.controls.emulate_keydown(eclipse.data.emu.controls.right);
                      eclipse.methods.emu.controls.emulate_keydown(eclipse.data.emu.controls.down);
                    } else {
                      dir = "err"
                    }
                  }
                } else {
                  dir = "RESET";
                }
              } else {
                eclipse.methods.emu.controls.emulate_keyup(eclipse.data.emu.controls.right);
                eclipse.methods.emu.controls.emulate_keyup(eclipse.data.emu.controls.left);
                eclipse.methods.emu.controls.emulate_keyup(eclipse.data.emu.controls.down);
                eclipse.methods.emu.controls.emulate_keyup(eclipse.data.emu.controls.up);
                dir = "RESET";
              }
            });
            dir = "RESET"
            // if (eclipse.data.emu.controls.up != null) {
            //   $('#emu_up_btn').on('touchstart touchenter touchup touchmove mousedown', function() {
            //     this.loop = setInterval(function() {
            //       eclipse.methods.emu.controls.emulate_keydown(eclipse.data.emu.controls.up);
            //     }, 100);
            //   }).on('touchend touchleave mouseup', function() {
            //     clearInterval(this.loop);
            //     eclipse.methods.emu.controls.emulate_keyup(eclipse.data.emu.controls.up);
            //   });
            // }
            // if (eclipse.data.emu.controls.down != null) {
            //   $('#emu_down_btn').on('touchstart touchenter touchup touchmove mousedown', function() {
            //     this.loop = setInterval(function() {
            //       eclipse.methods.emu.controls.emulate_keydown(eclipse.data.emu.controls.down);
            //     }, 100);
            //   }).on('touchend touchleave mouseup', function() {
            //     clearInterval(this.loop);
            //     eclipse.methods.emu.controls.emulate_keyup(eclipse.data.emu.controls.down);
            //   });
            // }
            // if (eclipse.data.emu.controls.left != null) {
            //   $('#emu_left_btn').on('touchstart touchenter touchup touchmove mousedown', function() {
            //     this.loop = setInterval(function() {
            //       eclipse.methods.emu.controls.emulate_keydown(eclipse.data.emu.controls.left);
            //     }, 100);
            //   }).on('touchend touchleave mouseup', function() {
            //     clearInterval(this.loop);
            //     eclipse.methods.emu.controls.emulate_keyup(eclipse.data.emu.controls.left);
            //   });
            // }
            // if (eclipse.data.emu.controls.right != null) {
            //   $('#emu_right_btn').on('touchstart touchenter touchup touchmove mousedown', function() {
            //     this.loop = setInterval(function() {
            //       eclipse.methods.emu.controls.emulate_keydown(eclipse.data.emu.controls.right);
            //     }, 100);
            //   }).on('touchend touchleave mouseup', function() {
            //     clearInterval(this.loop);
            //     eclipse.methods.emu.controls.emulate_keyup(eclipse.data.emu.controls.right);
            //   });
            // }
            if (eclipse.data.emu.controls.a != null) {
              $('#emu_a_btn').on('touchstart touchenter touchup touchmove mousedown', function() {
                this.loop = setInterval(function() {
                  eclipse.methods.emu.controls.emulate_keydown(eclipse.data.emu.controls.a);
                }, 100);
              }).on('touchend touchleave mouseup', function() {
                clearInterval(this.loop);
                eclipse.methods.emu.controls.emulate_keyup(eclipse.data.emu.controls.a);
              });
            }
            if (eclipse.data.emu.controls.b != null) {
              $('#emu_b_btn').on('touchstart touchenter touchup touchmove mousedown', function() {
                this.loop = setInterval(function() {
                  eclipse.methods.emu.controls.emulate_keydown(eclipse.data.emu.controls.b);
                }, 100);
              }).on('touchend touchleave mouseup', function() {
                clearInterval(this.loop);
                eclipse.methods.emu.controls.emulate_keyup(eclipse.data.emu.controls.b);
              });
            }
            if (eclipse.data.emu.controls.x != null) {
              $('#emu_x_btn').on('touchstart touchenter touchup touchmove mousedown', function() {
                this.loop = setInterval(function() {
                  eclipse.methods.emu.controls.emulate_keydown(eclipse.data.emu.controls.x);
                }, 100);
              }).on('touchend touchleave mouseup', function() {
                clearInterval(this.loop);
                eclipse.methods.emu.controls.emulate_keyup(eclipse.data.emu.controls.x);
              });
            }
            if (eclipse.data.emu.controls.y != null) {
              $('#emu_y_btn').on('touchstart touchenter touchup touchmove mousedown', function() {
                this.loop = setInterval(function() {
                  eclipse.methods.emu.controls.emulate_keydown(eclipse.data.emu.controls.y);
                }, 100);
              }).on('touchend touchleave mouseup', function() {
                clearInterval(this.loop);
                eclipse.methods.emu.controls.emulate_keyup(eclipse.data.emu.controls.y);
              });
            }

            if (eclipse.data.emu.controls.start != null) {
              $('#emu_start_btn').on('touchstart touchenter touchup touchmove mousedown', function() {
                this.loop = setInterval(function() {
                  eclipse.methods.emu.controls.emulate_keydown(eclipse.data.emu.controls.start);
                }, 100);
              }).on('touchend touchleave mouseup', function() {
                clearInterval(this.loop);
                eclipse.methods.emu.controls.emulate_keyup(eclipse.data.emu.controls.start);
              });
            }
            if (eclipse.data.emu.controls.select != null) {
              $('#emu_select_btn').on('touchstart touchenter touchup touchmove mousedown', function() {
                this.loop = setInterval(function() {
                  eclipse.methods.emu.controls.emulate_keydown(eclipse.data.emu.controls.select);
                }, 100);
              }).on('touchend touchleave mouseup', function() {
                clearInterval(this.loop);
                eclipse.methods.emu.controls.emulate_keyup(eclipse.data.emu.controls.select);
              });
            }
            if (eclipse.data.emu.controls.l != null) {
              $('#emu_l_btn').on('touchstart touchenter touchup touchmove mousedown', function() {
                this.loop = setInterval(function() {
                  eclipse.methods.emu.controls.emulate_keydown(eclipse.data.emu.controls.l);
                }, 100);
              }).on('touchend touchleave mouseup', function() {
                clearInterval(this.loop);
                eclipse.methods.emu.controls.emulate_keyup(eclipse.data.emu.controls.l);
              });
            }
            if (eclipse.data.emu.controls.r != null) {
              $('#emu_r_btn').on('touchstart touchenter touchup touchmove mousedown', function() {
                this.loop = setInterval(function() {
                  eclipse.methods.emu.controls.emulate_keydown(eclipse.data.emu.controls.r);
                }, 100);
              }).on('touchend touchleave mouseup', function() {
                clearInterval(this.loop);
                eclipse.methods.emu.controls.emulate_keyup(eclipse.data.emu.controls.r);
              });
            }
          }
        },
      },
      systems: {
        gba: {
          init: function(options) {
            eclipse.methods.emu.load({
              name: "GBA",
              screen_scale: 1.5,
              rom: options,
              files: ["assets/js/cores/IodineGBA/XAudioJS/swfobject.js", "assets/js/cores/IodineGBA/XAudioJS/resampler.js", "assets/js/cores/IodineGBA/XAudioJS/XAudioServer.js", "assets/js/cores/gba.js"],
              controls: {
                up: 38,
                down: 40,
                left: 37,
                right: 39,
                start: 13,
                select: 16,
                a: 88,
                b: 90,
                l: 49,
                r: 50,
              },
              menu: eclipse.actions.create({
                grid: true,
                buttons: [
                  [{
                      text: 'Toggle Audio',
                      onClick: function() {
                        var audioStatus = localStorage.getItem('audioStatus');
                        if (audioStatus == "false") {
                          localStorage.setItem('audioStatus', "true");
                          Iodine.enableAudio();
                        } else {
                          localStorage.setItem('audioStatus', "false");
                          Iodine.disableAudio();
                        }
                      },
                      icon: '<i class="icon f7-icons ios-only color-black">volume_fill</i><i class="icon material-icons md-only">volume_up</i>'
                    },
                    {
                      text: 'Speed',
                      onClick: function() {
                        eclipse.dialog.create({
                          title: 'Eclipse',
                          text: 'Change Emulation Speed',
                          buttons: [{
                              text: 'Normal',
                              onClick: function() {
                                Iodine.setSpeed(1);
                              },
                            },
                            {
                              text: 'Fast Forward',
                              onClick: function() {
                                Iodine.setSpeed(2);
                              },
                            },
                          ],
                          verticalButtons: true,
                        }).open();
                      },
                      icon: '<i class="icon f7-icons ios-only color-black">fastforward_round_fill</i><i class="icon material-icons md-only">fast_forward</i>'
                    },
                    {
                      text: 'Fix Controls',
                      onClick: function() {
                        eclipse.methods.emu.controls.load(eclipse.data.emu.controls);
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
                        eclipse.popup.close();
                        DiscordLink.set("na");
                        eclipse.methods.emu.unload();
                      },
                      icon: '<i class="icon f7-icons ios-only color-black">close_round_fill</i><i class="icon material-icons md-only">close</i>'
                    },
                  ]
                ]
              }),
              init: function() {
                console.log("Loading GBA");
              },
              close: function() {
                Iodine.exportSave();
                Iodine.stop();
              },
              load_rom: function(url) {
                loadIodineCoreGlue(url);
              }
            });
          },
        },
        gbc: {
          init: function(options) {
            eclipse.methods.emu.load({
              name: "GBC",
              screen_scale: 1.3,
              rom: options,
              files: ["assets/js/cores/gbc.js", "assets/js/cores/GameBoy-Online/js/other/XAudioServer.js"],
              controls: {
                up: 38,
                down: 40,
                left: 37,
                right: 39,
                start: 13,
                select: 16,
                a: 88,
                b: 90,
                l: 49,
                r: 50,
              },
              menu: eclipse.actions.create({
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
                        eclipse.methods.emu.controls.load(eclipse.data.emu.controls);
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
                        eclipse.methods.emu.unload();
                      },
                      icon: '<i class="icon f7-icons ios-only color-black">close_round_fill</i><i class="icon material-icons md-only">close</i>'
                    },
                  ]
                ]
              }),
              init: function() {
                gbEmu.initEmu();
              },
              close: function() {
                settings[3] = Math.min(Math.max(parseFloat(0.0), 0), 1);
                gameboy.changeVolume();
                gbEmu.saveGame();
                gbEmu.stopEmu();
              },
              load_rom: function(url) {
                gbEmu.loadROMURL(url);
              }
            });
          },
        },
        gb: {
          init: function(options) {
            eclipse.methods.emu.load({
              name: "GB",
              screen_scale: 1.3,
              rom: options,
              files: ["assets/js/cores/gbc.js", "assets/js/cores/GameBoy-Online/js/other/XAudioServer.js"],
              controls: {
                up: 38,
                down: 40,
                left: 37,
                right: 39,
                start: 13,
                select: 16,
                a: 88,
                b: 90,
                l: 49,
                r: 50,
              },
              menu: eclipse.actions.create({
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
                        eclipse.methods.emu.controls.load(eclipse.data.emu.controls);
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
                        eclipse.methods.emu.unload();
                      },
                      icon: '<i class="icon f7-icons ios-only color-black">close_round_fill</i><i class="icon material-icons md-only">close</i>'
                    },
                  ]
                ]
              }),
              init: function() {
                gbEmu.initEmu();
              },
              close: function() {
                settings[3] = Math.min(Math.max(parseFloat(0.0), 0), 1);
                gameboy.changeVolume();
                gbEmu.saveGame();
                gbEmu.stopEmu();
              },
              load_rom: function(url) {
                gbEmu.loadROMURL(url);
              }
            });
          },
        },
        nes: {
          init: function(options) {
            eclipse.methods.emu.load({
              name: "NES",
              screen_scale: 1.3,
              rom: options,
              files: [],
              controls: {
                up: 38,
                down: 40,
                left: 37,
                right: 39,
                start: 13,
                select: 16,
                a: 88,
                b: 90,
              },
              menu: eclipse.actions.create({
                grid: true,
                buttons: [
                  [{
                      text: 'Toggle Audio',
                      onClick: function() {
                        $('#toggle-nes-sound').click();
                      },
                      icon: '<i class="icon f7-icons ios-only color-black">volume_fill</i><i class="icon material-icons md-only">volume_up</i>'
                    },
                    {
                      text: 'Restart',
                      onClick: function() {
                        $("#restart-nes-button").click();
                      },
                      icon: '<i class="icon f7-icons ios-only color-black">reload_round_fill</i><i class="icon material-icons md-only">refresh</i>'
                    },
                    {
                      text: 'Pause',
                      onClick: function() {
                        $("#pause-nes-button").click();
                      },
                      icon: '<i class="icon f7-icons ios-only color-black">pause_round_fill</i><i class="icon material-icons md-only">pause</i>'
                    },
                  ],
                  [{
                      text: 'Fix Controls',
                      onClick: function() {
                        eclipse.methods.emu.controls.load(eclipse.data.emu.controls);
                      },
                      icon: '<i class="icon material-icons color-black ios-only">videogame_asset</i><i class="icon material-icons md-only">videogame_asset</i>'
                    },
                    {
                      text: 'Close Emulator',
                      onClick: function() {
                        eclipse.dialog.confirm('Are you sure that you want to quit?', function() {
                          eclipse.methods.emu.unload();
                        });
                      },
                      icon: '<i class="icon f7-icons ios-only color-black">close_round_fill</i><i class="icon material-icons md-only">close</i>'
                    }
                  ]
                ]
              }),
              init: function() {
                var nes_stuff = document.createElement("script");
                nes_stuff.type = "text/javascript";
                nes_stuff.id = "nes_script"
                nes_stuff.innerHTML = `var nes;
                                      $(function() {
                                        nes = new JSNES({
                                          'ui': $('#emu_screen_container').JSNESUI({
                                            "Games": [
                                              ['Contra', 'https://fir.sh/projects/jsnes/roms/Contra%20(U)%20[!].nes'],
                                            ]
                                          })
                                        });
                                      });`;
                document.getElementsByTagName("head")[0].appendChild(nes_stuff);
              },
              close: function() {
                self.nes.stop();
                document.getElementById("emu_gfx").innerHTML = `<canvas id="emu_screen_canvas"></canvas>`;
              },
              load_rom: function(url) {
                try {
                  var ajax = new XMLHttpRequest();
                  ajax.open("GET", url, true);
                  ajax.overrideMimeType("text/plain; charset=x-user-defined");
                  ajax.send(null);
                  ajax.onreadystatechange = function() {
                    if (ajax.readyState === XMLHttpRequest.DONE) {
                      var i, data;
                      if (JSNES.Utils.isIE()) {
                        var charCodes = JSNESBinaryToArray(
                          ajax.responseBody
                        ).toArray();
                        data = String.fromCharCode.apply(
                          undefined,
                          charCodes
                        );
                      } else {
                        data = ajax.responseText;
                        nes.loadRom(data);
                        nes.start();
                        var audioStatus = localStorage.getItem('audioStatus');
                        if (audioStatus == "false") {
                          self.nes.opts.emulateSound = false;
                          var soundButton = '<input type="button" value="enable sound" id="toggle-nes-sound" class="nes-enablesound">';
                        } else {
                          self.nes.opts.emulateSound = true;
                          var soundButton = '<input type="button" value="disable sound" id="toggle-nes-sound" class="nes-enablesound">';
                        }
                        eclipse.methods.emu.download_dialog.close();
                        setTimeout(function() {
                          eclipse.methods.emu.resize_screen('emu_screen_container', 'emu_screen_canvas', 1.3);
                        }, 10);
                      }
                    }
                  }
                } catch (e) {
                  setTimeout(function(){
                    var ajax = new XMLHttpRequest();
                    ajax.open("GET", url, true);
                    ajax.overrideMimeType("text/plain; charset=x-user-defined");
                    ajax.send(null);
                    ajax.onreadystatechange = function() {
                      if (ajax.readyState === XMLHttpRequest.DONE) {
                        var i, data;
                        if (JSNES.Utils.isIE()) {
                          var charCodes = JSNESBinaryToArray(
                            ajax.responseBody
                          ).toArray();
                          data = String.fromCharCode.apply(
                            undefined,
                            charCodes
                          );
                        } else {
                          data = ajax.responseText;
                          nes.loadRom(data);
                          nes.start();
                          var audioStatus = localStorage.getItem('audioStatus');
                          if (audioStatus == "false") {
                            self.nes.opts.emulateSound = false;
                            var soundButton = '<input type="button" value="enable sound" id="toggle-nes-sound" class="nes-enablesound">';
                          } else {
                            self.nes.opts.emulateSound = true;
                            var soundButton = '<input type="button" value="disable sound" id="toggle-nes-sound" class="nes-enablesound">';
                          }
                          eclipse.methods.emu.download_dialog.close();
                          setTimeout(function() {
                            eclipse.methods.emu.resize_screen('emu_screen_container', 'emu_screen_canvas', 1.3);
                          }, 10);
                        }
                      }
                    }
                  }, 500);
                }
              },
            });
          }
        },
        snes: {
          init: function(options) {
            eclipse.data.snes = {};
            eclipse.data.snes.status = document.getElementById('tempMessage');
            eclipse.data.snes.progress = document.getElementById('tempMessage');
            eclipse.data.snes.spinner = document.getElementById('tempMessage');

            Module = {
              preRun: [],
              postRun: [],
              canvas: (function() {
                var canvas = document.getElementById('emu_screen_canvas');
                canvas.addEventListener("webglcontextlost", function(e) {
                  alert('WebGL context lost. You will need to reload the page.');
                  e.preventDefault();
                }, false);
                return canvas;
              })(),
              setStatus: function(text) {
                if (!Module.setStatus.last) Module.setStatus.last = {
                  time: Date.now(),
                  text: ''
                };
                if (text === Module.setStatus.text) return;
                var m = text.match(/([^(]+)\((\d+(\.\d+)?)\/(\d+)\)/);
                var now = Date.now();
                if (m && now - Date.now() < 30) return; // if this is a progress update, skip it if too soon
                if (m) {
                  text = m[1];
                  eclipse.data.snes.progress.value = parseInt(m[2]) * 100;
                  eclipse.data.snes.progress.max = parseInt(m[4]) * 100;
                  eclipse.data.snes.progress.hidden = false;
                  eclipse.data.snes.spinner.hidden = false;
                } else {
                  eclipse.data.snes.progress.value = null;
                  eclipse.data.snes.progress.max = null;
                  eclipse.data.snes.progress.hidden = true;
                  if (!text) eclipse.data.snes.spinner.hidden = true;
                }
                eclipse.data.snes.status.innerHTML = text;
              },
              totalDependencies: 0,
              monitorRunDependencies: function(left) {
                this.totalDependencies = Math.max(this.totalDependencies, left);
                Module.setStatus(left ? 'Preparing... (' + (this.totalDependencies - left) + '/' + this.totalDependencies + ')' : 'All downloads complete.');
              }
            };
            eclipse.methods.emu.load({
              name: "SNES",
              screen_scale: 1.14,
              rom: options,
              files: ["assets/js/cores/snes.js"],
              experimental: true,
              controls: {
                up: 38,
                down: 40,
                left: 37,
                right: 39,
                start: 13,
                select: 32,
                a: 68,
                b: 67,
                x: 83,
                y: 88,
                l: 65,
                r: 90,
              },
              menu: eclipse.actions.create({
                grid: true,
                buttons: [
                  [{
                      text: 'Fix Controls',
                      onClick: function() {
                        eclipse.methods.emu.controls.load({
                          up: 38,
                          down: 40,
                          left: 37,
                          right: 39,
                          start: 13,
                          select: 32,
                          a: 68,
                          b: 67,
                          x: 83,
                          y: 88,
                          l: 65,
                          r: 90,
                        });
                      },
                      icon: '<i class="icon material-icons ios-only color-black">videogame_asset</i><i class="icon material-icons md-only">videogame_asset</i>'
                    },
                    {
                      text: 'Toggle Transparency',
                      onClick: function() {
                        eclipse.methods.emu.systems.snes.toggle_transparency();
                      },
                      icon: '<i class="icon f7-icons ios-only color-black">circle_half</i><i class="icon material-icons md-only">opacity</i>'
                    },
                    {
                      text: 'Toggle FPS',
                      onClick: function() {
                        Module._toggle_display_framerate();
                      },
                      icon: '<i class="icon f7-icons ios-only color-black">eye_fill</i><i class="icon material-icons md-only">visibility</i>'
                    },
                  ],
                  [{
                    text: 'Close Emulator',
                    onClick: function() {
                      eclipse.methods.emu.unload();
                    },
                    icon: '<i class="icon f7-icons ios-only color-black">close_round_fill</i><i class="icon material-icons md-only">close</i>'
                  }, ]
                ]
              }),
              init: function() {
                eclipse.methods.emu.controls.load({
                  up: 38,
                  down: 40,
                  left: 37,
                  right: 39,
                  start: 13,
                  select: 32,
                  a: 68,
                  b: 67,
                  x: 83,
                  y: 88,
                  l: 65,
                  r: 90,
                });
              },
              close: function() {
                try {
                  Module.abort();
                } catch (e) {
                  console.log('SNES Stopped');
                }
                document.getElementById('emu_gfx').innerHTML = '<canvas id="emu_screen_canvas"></canvas>';
                Module = null;
              },
              load_rom: function(url) {
                var self = this;
                var ajax = new XMLHttpRequest();
                ajax.open("GET", url, true);
                ajax.overrideMimeType("text/plain; charset=x-user-defined");
                ajax.send(null);
                ajax.onreadystatechange = function() {
                  console.log(ajax.status);
                  if (ajax.readyState === XMLHttpRequest.DONE) {
                    try {
                      try {
                        eclipse.data.expirmental_alert.close();
                      } catch (err) {
                        // Already Closed
                      }
                      eclipse.methods.emu.download_dialog.close();
                      Module.FS_createDataFile("/", "_.smc", ajax.responseText, true, true);
                      Module._run();
                      eclipse.methods.emu.systems.snes.set_vars();
                      setTimeout(function() {
                        eclipse.methods.emu.resize_screen('emu_screen_container', 'emu_screen_canvas', 1.14);
                      }, 10);
                      Module._toggle_display_framerate();
                    } catch (err) {
                      try {
                        eclipse.data.expirmental_alert.close();
                      } catch (err) {
                        // Already Closed
                      }
                      eclipse.methods.emu.download_dialog.close();
                      eclipse.dialog.alert('Error loading the core. Relaunching Eclipse is necessary in order to use it again.', 'Eclipse', function() {
                        eclipse.methods.emu.unload();
                      });
                    }
                  }
                }
              }
            });
          },
          adjust_frameskip: function(n) {
            frameskip += n
            if (frameskip < 0) frameskip = 0
            frameskip_text.value = frameskip
            set_frameskip(frameskip);
          },
          set_vars: function() {
            frameskip = 0
            frameskip_text = document.getElementById("tempMessage")
            frameskip_text.value = frameskip
            snes_transparency = 1
          },
          toggle_transparency: function() {
            snes_transparency = !snes_transparency
            Module._set_transparency(snes_transparency)
            console.log("Transparency is now " + (snes_transparency ? "on" : "off"))
          },
          start: function() {
            set_frameskip = Module.cwrap('set_frameskip', 'number', ['number'])
            ToggleDisplayFramerate = Module._toggle_display_framerate
            reboot_romnum = -1
            frames = 0
            fps_text = document.getElementById("tempMessage");
            frameskipped = 0
            Module._run();
          }
        },
        sms: {
          init: function(options) {
            eclipse.methods.emu.load({
              name: "SMS",
              screen_scale: 1.3,
              rom: options,
              files: ["assets/js/cores/jssms/min/jssms.min.js", "assets/js/cores/jssms/lib/escodegen.browser.js"],
              controls: {
                up: 38,
                down: 40,
                left: 37,
                right: 39,
                start: 13,
                a: 88,
                b: 90,
              },
              menu: eclipse.actions.create({
                grid: true,
                buttons: [
                  [{
                      text: 'Toggle Audio',
                      onClick: function() {
                        self.sms.soundEnabled = !(self.sms.soundEnabled)
                        if (localStorage.getItem("audioStatus") == "true") {
                          localStorage.setItem("audioStatus", "false");
                        } else {
                          localStorage.setItem("audioStatus", "true");
                        }
                      },
                      icon: '<i class="icon f7-icons ios-only color-black">volume_fill</i><i class="icon material-icons md-only">volume_up</i>'
                    },
                    {
                      text: 'Play',
                      onClick: function() {
                        self.sms.start();
                      },
                      icon: '<i class="icon f7-icons ios-only color-black">play_round_fill</i><i class="icon material-icons md-only">play_arrow</i>'
                    },
                    {
                      text: 'Pause',
                      onClick: function() {
                        self.sms.stop();
                      },
                      icon: '<i class="icon f7-icons ios-only color-black">pause_round_fill</i><i class="icon material-icons md-only">pause</i>'
                    },
                  ],
                  [{
                      text: 'Fix Controls',
                      onClick: function() {
                        eclipse.methods.emu.controls.load(eclipse.data.emu.controls);
                      },
                      icon: '<i class="icon material-icons color-black ios-only">videogame_asset</i><i class="icon material-icons md-only">videogame_asset</i>'
                    },
                    {
                      text: 'Close Emulator',
                      onClick: function() {
                        eclipse.dialog.confirm('Are you sure that you want to quit?', function() {
                          eclipse.methods.emu.unload();
                        });
                      },
                      icon: '<i class="icon f7-icons ios-only color-black">close_round_fill</i><i class="icon material-icons md-only">close</i>'
                    }
                  ]
                ]
              }),
              init: function() {
                var sms_stuff = document.createElement("script");
                sms_stuff.type = "text/javascript";
                sms_stuff.id = "sms_stuff";
                sms_stuff.innerHTML = `
                var sms = new JSSMS({
                  'ui': $('#emu_screen_container').JSSMSUI({
                    'Homebrew Master System not working': [
                      ['vpoker', 'rom/homebrew/vpoker.sms']
                    ],
                  })
                });
                `;
                document.getElementsByTagName("head")[0].appendChild(sms_stuff);
              },
              close: function() {
                self.sms.stop();
                document.getElementById("emu_gfx").innerHTML = `<canvas id="emu_screen_canvas"></canvas>`;
                document.getElementById("sms_stuff").outerHTML = "";
                sms = null;
              },
              load_rom: function(url) {
                setTimeout(function() {
                  var ajax = new XMLHttpRequest();
                  ajax.open("GET", url, true);
                  ajax.overrideMimeType("text/plain; charset=x-user-defined");
                  ajax.send(null);
                  ajax.onreadystatechange = function() {
                    console.log(ajax.status);
                    if (ajax.readyState === XMLHttpRequest.DONE) {
                      eclipse.methods.emu.download_dialog.close();
                      data = ajax.responseText;
                      sms.readRomDirectly(data, ".sms");
                      sms.reset();
                      sms.vdp.forceFullRedraw();
                      sms.start();
                      eclipse.methods.emu.resize_screen('emu_screen_container', 'emu_screen_canvas', 1.3);
                      if (localStorage.getItem("audioStatus") == "true") {
                        self.sms.soundEnabled = true;
                      } else {
                        self.sms.soundEnabled = false;
                      }
                    }
                  }
                }, 500);
              }
            });
          }
        },
        sgg: {
          init: function(options) {
            eclipse.methods.emu.load({
              name: "SGG",
              screen_scale: 1.3,
              rom: options,
              files: ["assets/js/cores/jssms/min/jssms.min.js", "assets/js/cores/jssms/lib/escodegen.browser.js"],
              controls: {
                up: 38,
                down: 40,
                left: 37,
                right: 39,
                start: 13,
                a: 88,
                b: 90,
              },
              menu: eclipse.actions.create({
                grid: true,
                buttons: [
                  [{
                      text: 'Toggle Audio',
                      onClick: function() {
                        self.sms.soundEnabled = !(self.sms.soundEnabled)
                        if (localStorage.getItem("audioStatus") == "true") {
                          localStorage.setItem("audioStatus", "false");
                        } else {
                          localStorage.setItem("audioStatus", "true");
                        }
                      },
                      icon: '<i class="icon f7-icons ios-only color-black">volume_fill</i><i class="icon material-icons md-only">volume_up</i>'
                    },
                    {
                      text: 'Play',
                      onClick: function() {
                        self.sms.start();
                      },
                      icon: '<i class="icon f7-icons ios-only color-black">play_round_fill</i><i class="icon material-icons md-only">play_arrow</i>'
                    },
                    {
                      text: 'Pause',
                      onClick: function() {
                        self.sms.stop();
                      },
                      icon: '<i class="icon f7-icons ios-only color-black">pause_round_fill</i><i class="icon material-icons md-only">pause</i>'
                    },
                  ],
                  [{
                      text: 'Fix Controls',
                      onClick: function() {
                        eclipse.methods.emu.controls.load(eclipse.data.emu.controls);
                      },
                      icon: '<i class="icon material-icons color-black ios-only">videogame_asset</i><i class="icon material-icons md-only">videogame_asset</i>'
                    },
                    {
                      text: 'Close Emulator',
                      onClick: function() {
                        eclipse.dialog.confirm('Are you sure that you want to quit?', function() {
                          eclipse.methods.emu.unload();
                        });
                      },
                      icon: '<i class="icon f7-icons ios-only color-black">close_round_fill</i><i class="icon material-icons md-only">close</i>'
                    }
                  ]
                ]
              }),
              init: function() {
                var sms_stuff = document.createElement("script");
                sms_stuff.type = "text/javascript";
                sms_stuff.id = "sms_stuff";
                sms_stuff.innerHTML = `
                var sms = new JSSMS({
                  'ui': $('#emu_screen_container').JSSMSUI({
                    'Homebrew Master System not working': [
                      ['vpoker', 'rom/homebrew/vpoker.sms']
                    ],
                  })
                });
                `;
                document.getElementsByTagName("head")[0].appendChild(sms_stuff);
              },
              close: function() {
                self.sms.stop();
                self.sms.start();
                self.sms.stop();
                document.getElementById("emu_gfx").innerHTML = `<canvas id="emu_screen_canvas"></canvas>`;
                document.getElementById("sms_stuff").outerHTML = "";
                sms = null;
              },
              load_rom: function(url) {
                setTimeout(function() {
                  var ajax = new XMLHttpRequest();
                  ajax.open("GET", url, true);
                  ajax.overrideMimeType("text/plain; charset=x-user-defined");
                  ajax.send(null);
                  ajax.onreadystatechange = function() {
                    console.log(ajax.status);
                    if (ajax.readyState === XMLHttpRequest.DONE) {
                      eclipse.methods.emu.download_dialog.close();
                      data = ajax.responseText;
                      sms.readRomDirectly(data, ".gg");
                      sms.reset();
                      sms.vdp.forceFullRedraw();
                      sms.start();
                      eclipse.methods.emu.resize_screen('emu_screen_container', 'emu_screen_canvas', 1.3);
                      if (localStorage.getItem("audioStatus") == "true") {
                        self.sms.soundEnabled = true;
                      } else {
                        self.sms.soundEnabled = false;
                      }
                    }
                  }
                }, 500);
              }
            });
          }
        },
      },
    },
    offlineCheck: function() {
      if (!navigator.onLine) {
        console.print("Eclipse is offline! Loading offline mode...");
        var style = document.createElement("style");
        style.id = "offline_mode";
        cssStuff = `
        .offline-blur {
          z-index: -1;
          filter: blur(5px);
          opacity: .4;
          pointer-events: none!important;
          position: absolute;
        }

        .offline-only {
          opacity: 1;
          z-index: 1;
          margin: 20px;
        }

        .online-only {
          display: none!important;
        }
        `;
        style.innerHTML = cssStuff;
        document.head.appendChild(style);
      } else {
        var style = document.createElement("style");
        style.id = "offline_mode";
        cssStuff = `
        .offline-only {
          display: none;
        }`;
        style.innerHTML = cssStuff;
        document.head.appendChild(style);
      }
    },
    debug: {
      view: function() {
        debuggerState++;
        if (debuggerState == 5) {
          console.toast("Advanced settings are now visible.");
          document.getElementById("debugModeSettingsPanel").style.display = "block";
          document.getElementById("textCopyAgent").innerHTML = decodeURI(eclipse.methods.debug.string()).replace(/%23/g, "#");
          document.getElementById("copyLinkGen").onclick = (e) => {
            copy = document.getElementById("textCopyAgent");
            copy.style.display = "block";
            copy.select();
            document.execCommand("copy");
            copy.style.display = "none";
            prompt("This is your instance information. It includes data on your Eclipse install that is important for reporting issues. Copy the text below and paste it with your bug report.", document.getElementById("textCopyAgent").innerHTML)
            console.toast('Copied text to clipboard.')
          };
        } else if (debuggerState > 1 && debuggerState < 5) {
          console.toast((5 - debuggerState) + " more taps until Advanced settings are revealed for the rest of the session.");
        }
      },
      string: function() {
        var devStr = "";
        if (eclipse.device.android == true) {
          devStr += "Android "
        }
        if (eclipse.device.androidChrome == true) {
          devStr += "AndroidChrome "
        }
        if (eclipse.device.desktop == true) {
          devStr += "Desktop "
        }
        if (eclipse.device.ios == true) {
          devStr += "iOS "
        }
        if (eclipse.device.ipad == true) {
          devStr += "iPad "
        }
        if (eclipse.device.iphone == true) {
          devStr += "iPhone "
        }
        if (eclipse.device.iphoneX == true) {
          devStr += "iPhoneX "
        }
        if (eclipse.device.ipod == true) {
          devStr += "iPod "
        }

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
        ghStr += "User Agent: " + encodeURI(navigator.userAgent.replace(/\;/g, "-")) + " %0A";
        if (navigator.doNotTrack) {
          dntState = navigator.doNotTrack
        } else {
          dntState = "Not Set"
        }
        ghStr += "Do Not Track: " + dntState + " %0A";
        ghStr += "Cookies Enabled?: " + navigator.cookieEnabled + " %0A";
        ghStr += "ServiceWorker Support: " + String(Boolean(navigator.serviceWorker)) + " %0A";
        ghStr += "Languages: " + String(navigator.languages) + " %0A";
        ghStr += "Vendor: " + navigator.vendor + " %0A";
        ghStr += "Platform: " + navigator.platform + " %0A";

        return ghStr
      },
      console: {
        createObj: function(str, color) {
          try {
            if (color) {
              document.getElementById("debugConsole").innerHTML += `<p style="color:${color.patch()}">${String(str).patch()}</p>`;
            } else {
              document.getElementById("debugConsole").innerHTML += `<p style="color:white">${String(str).patch()}</p>`;
            }
          } catch (err) {
            console.errorOrg(err);
          }
        },
        init: function() {
          console.log = function(txt) {
            console.logOrg(txt);
            eclipse.methods.debug.console.createObj(txt);
          }
          console.error = function(txt) {
            console.errorOrg(txt);
            eclipse.methods.debug.console.createObj(txt, "#ff2222");
          }
          console.warn = function(txt) {
            console.warnOrg(txt);
            eclipse.methods.debug.console.createObj(txt, "#ffff22");
          }
        }
      }
    },
    // Cloud stuff
    online: {
      list: function() {
        isGD = GoogleDrive.getSigninStatus();
        isDB = Dropbox.isBrowserSupported();
        var inner = "";
        if (isGD) {
          GoogleDrive.getFiles();
          inner += `
             <li>
                   <a href="/sync/drive/" class="item-link item-content">
                      <div class="item-media"><img src="assets/img/drive.png" width="44px" style="border-radius:44px;"></div>
                      <div class="item-inner">
                         <div class="item-title">
                            <span>Google Drive</span>
                            <div class="item-footer">View ROMs from Google Drive.</div>
                         </div>
                      </div>
                   </a>
             </li>
          `;
        }
        if (isDB) {
          inner += `
             <li>
                   <a href="#" onclick="DropboxHelper.launch()" class="item-link item-content">
                      <div class="item-media"><img src="assets/img/dropbox.png" width="44px" style="border-radius:44px;"></div>
                      <div class="item-inner">
                         <div class="item-title">
                            <span>Dropbox</span>
                            <div class="item-footer">View ROMs from Dropbox.</div>
                         </div>
                      </div>
                   </a>
             </li>
          `;
        }
        if (inner != "") {
          document.getElementById("cloud-list").innerHTML = "<ul>" + inner + "</ul>";
        }
      },
      syncPage: function() {
        var linkedAcct = "";
        var addAcct = "";
        if (GoogleDrive.getSigninStatus()) {
          linkedAcct += `
            <li class="swipeout needsDrive">
              <div class="swipeout-content item-content">
                <div class="item-media"><img style="border-radius:22px" src="assets/img/drive.png" width="44" /></div>
                <div class="item-inner">
                  <div class="item-title-row">
                    <div class="item-title">Google Drive</div>
                  </div>
                  <div id="driveStatus" class="item-subtitle">Logged In.</div>
                </div>
              </div>
              <div class="swipeout-actions-right">
                <a onclick="GoogleDrive.signout();window.setTimeout(function(){eclipse.methods.online.syncPage()},500);" href="#" class="swipeout-delete">Sign Out</a>
              </div>
            </li>
          `;
        } else {
          addAcct += `
            <li class="needsDrive">
              <div onclick="GoogleDrive.signin();window.setTimeout(function(){eclipse.methods.online.syncPage()},500);" class="swipeout-content item-content">
                <div class="item-media"><img style="border-radius:22px" src="assets/img/drive.png" width="44" /></div>
                <div class="item-inner">
                  <div class="item-title-row">
                    <div class="item-title">Google Drive</div>
                  </div>
                  <div id="driveStatus" class="item-subtitle">Tap to Log In</div>
                </div>
              </div>
            </li>
          `;
        }
        // Dropbox check here
        if (linkedAcct != "") {
          document.getElementById("linkedAcct").innerHTML = "<ul>" + linkedAcct + "</ul>";
          document.getElementById("linkedAcctLabel").style.display = "block";
        } else {
          document.getElementById("linkedAcct").innerHTML = "";
          document.getElementById("linkedAcctLabel").style.display = "none";
        }
        if (addAcct != "") {
          document.getElementById("addAcct").innerHTML = "<ul>" + addAcct + "</ul>";
          document.getElementById("addAcctLabel").style.display = "block";
        } else {
          document.getElementById("addAcct").innerHTML = "";
          document.getElementById("addAcctLabel").style.display = "none";
        }
      },
      syncLite: function() {
        if (GoogleDrive.getSigninStatus()) {
          document.getElementById("driveStatus").innerHTML = "Logged In.";
        } else {
          document.getElementById("driveStatus").innerHTML = "Tap to Log In";
        }
      }
    },
    toggleEditLabel: function() {
      if (document.getElementById("editGamesBtn").innerHTML == "Edit") {
        document.getElementById("editGamesBtn").innerHTML = "Done";
      } else {
        document.getElementById("editGamesBtn").innerHTML = "Edit";
      }
    },
    rearrangeGames: function() {
      // create new games array
      var arr = [];
      // populate
      var games_list = document.getElementById("manage_games_list");
      for (var i = 0; i < games_list.children.length; i++) {
        var elem = games_list.children[i];
        var a = elem.children[0];
        var name = a.dataset.name;
        var boxart = a.getElementsByTagName("img")[0].getAttribute("data-image-url");
        var link = a.dataset.link;
        var system = a.dataset.system;
        var obj = {
          "name": name,
          "boxart": boxart,
          "link": link,
          "system": system
        };
        arr[arr.length] = JSON.stringify(obj);
      }
      // set
      localStorage.games = JSON.stringify(arr);
    },
    // Onboarding
    welcome: {
      new: function() {
        // Web clip tip
        if(navigator.standalone == false && eclipse.device.ios == true) {
          tip = `<p><b>Tip: </b>If you want to add Eclipse to your home screen (using Safari), click the <b>Share</b> button, then <b>Add to Home Screen</b>. Eclipse will then function like a normal app without the need for a configuration profile!</p>`;
        } else {
          tip = "";
        }
        eclipse.popup.create({
          content: `<div class="page-content popup">
                      <div style="padding: 25px;padding-top: 0">
                        <div style="width: 100%; overflow-x: hidden;" class="block">
                          <h1 style="color:#333;margin:0;font-size:42px;text-align:center">Welcome to Eclipse.</h1><br>
                          <img src="assets/img/icon_mobFull.png" style="box-shadow: 0 5px 13px 0 rgba(0, 0, 0, .1);border-radius:21%;width:75px;height:75px;float:left;" class="">
                            <h2 class="" style="margin: 0;&nbsp;margin: 0; margin-left: calc(0% + 75px + 15px);">About Eclipse</h2><p style="margin: 0; margin-left: calc(0% + 75px + 15px);" class="">Eclipse is a web-based emulator that allows you to easily emulate various home and portable consoles on most devices.<br><br>Eclipse currently supports the Game Boy line of portable consoles, the Nintendo Entertainment System, the Super Nintendo Entertainment System, the Sega Game Gear, and the Sega Master System.</p>
                        </div>
                        ${tip}
                        <br>
                        <center>
                        <a href="#" onclick="setupStageStorage = 'normal'; eclipse.methods.welcome.display()" class="button active button-big button-list-red popup-close" style="box-shadow: 0 5px 13px 0 rgba(0, 0, 0, .1); border:none; font-weight:bold;">Continue</a>
                        <br>
                        <a href="#" onclick="eclipse.methods.welcome.restore()" class="button popup-close" style="border:none; font-weight:bold;">Import Backup</a><a href="#" onclick="setupStageStorage = 'skip'; eclipse.methods.welcome.tos()" class="button popup-close" style="border:none; font-weight:bold; margin-top: 10px;">Skip Setup</a></center>
                      </div>
                    </div>`,
          closeByBackdropClick: false,
        }).open();
      },
      tos: function() {
        eclipse.popup.create({
          content: `<div class="page-content popup">
                            <div class="block">
                                <center>
                                    <div class="row"><i onclick="if(setupStageStorage == 'skip') {eclipse.methods.welcome.new()} else {eclipse.methods.welcome.sync()}" class="icon icon-back color-black popup-close" style="position: absolute; height: 42px; cursor: pointer;padding-top:15px" id="restoreBack"></i><h1 style="color:#333;margin:0;width:80%;font-size:42px;;padding-left:10%">Terms of Service</h1></div>
                                    <p>To use Eclipse, you must agree to the following Terms of Service. Please read and accept it in order to use Eclipse.</p>
                                    <br>
                                    <h3>Copyright and Licensing</h3>
                                    <p>Eclipse does not condone the use of illegally obtained game ROMS, such as those found on the Internet or shared by others without permission. Eclipse requires that the games used were either obtained via you extracting the ROM yourself, be a homebrew ROM that offers a public download, or you otherwise have the rights to use the game. Our featured repos consist of free-to-use games, and we encourage that you host a repo on a home server to organize your game collection.</p>
                                    <p>Using illegally obtained ROMs from any source, even if it is in a repo, is a violation of copyright law.</p>
                                    <h3>Legal Compliance</h3>
                                    <p>Eclipse reserves the right to block content, such as repos and skins, that violate any laws, such as copyright law.</p>
                                    <p>Although we store little to no data on our users, in the case a warrant is recieved, we (or partners like GitHub) will comply with it. As of July 2018, we have not recieved any requests by law enforcement.</p>
                                    <p>Eclipse's servers and primary development is done in the United States of America, and we will comply with American laws.</p>
                                    <h3>Tracking</h3>
                                    <p>Eclipse does not track the user, but partners such as CloudFlare might collect basic data in order to protect Eclipse from cyber-attacks.</p>
                                    <p>In addition, our link shortener partners might collect data to improve advertisements served. To avoid our link shorteners, go to https://eclipseemu.me/play/ directly. Ads are not shown in-app.</p>
                                    <h3>Data Storage and Gameplay</h3>
                                    <p>All game storage data is stored locally on your device. You can export or import this data in Settings.</p>
                                    <p>We do operate a CORS-induced mirroring service, located on the php.eclipseemu.me subdomain, that will allow your browser to download ROMs, JSON, and other resources. This mirrorer is to be used exclusively by those who have permission to do so from Zenith (Eclipse Team) and, while it does take a URL and (for Google Drive users) a token for auth, nothing is logged.</p>
                                    <p>All emulation is done locally and on-device. Disconnecting from the Internet after downloading/launching a game will still allow for emulation of a game.</p>
                                    <h3>App Linking</h3>
                                    <p>In the Eclipse interface, you have the option to link with other data providers, such as Dropbox or Google Drive. Outside of the CORS mirror, which is required for auth and downloading the ROMs, we do not store any data.</p>

                                    <p><b>By using Eclipse, you agree to the Terms listed above.</b></p>
                                    <br><a onclick="eclipse.methods.welcome.done()" href="#" class="button active button-big button-list-red popup-close" style="box-shadow: 0 5px 13px 0 rgba(0, 0, 0, .1); border:none; font-weight:bold;">I Agree.</a>
                                    <p><i>You are required to agree to the Terms of Service to progress.</i></p>
                                  </center>
                                  </div>
                                  </div>`,
        }).open();
      },
      display: function() {
        eclipse.popup.create({
          content: `<div class="page-content popup">
                            <div class="block">
                                <center>
                                    <div class="row"><i onclick="eclipse.methods.welcome.new(false)" class="icon icon-back color-black popup-close" style="position: absolute; height: 42px; cursor: pointer;padding-top:15px" id="restoreBack"></i><h1 style="color:#333;margin:0;width:80%;font-size:42px;;padding-left:10%">Select Display Mode</h1></div>
                                    <p>When playing in Landscape mode, you can either have the game run in the correct aspect ratio, or disregard traditional aspect ratios so your game can cover the whole screen. This option can be changed later in Settings.</p>
                                    <br>
                                    <div class="segmented"><a onclick="eclipse.methods.welcome.setDisplay.fit()" id="fit" class="button button-active">Fit</a><a onclick="eclipse.methods.welcome.setDisplay.stretch()" id="stretch" class="button">Fill Screen</a>
                                    </div>
                                    <img id="fillPreview" src="assets/img/fit/fit.png" style="width:70%">
                                    <br><a href="#" onclick="eclipse.methods.welcome.skin()" class="button active button-big button-list-red popup-close" style="box-shadow: 0 5px 13px 0 rgba(0, 0, 0, .1); border:none; font-weight:bold;">Continue...</a>
                                    <br>
                                </center>
                            </div>
                        </div>`,
          closeByBackdropClick: false,
        }).open();
      },
      skin: function() {
        eclipse.popup.create({
          content: `<div class="page-content popup">
                            <div class="block">
                                <center>
                                    <div class="row"><i onclick="if(setupStageStorage == 'update') {eclipse.methods.welcome.update()} else {eclipse.methods.welcome.display()}" class="icon icon-back color-black popup-close" style="position: absolute; height: 42px; cursor: pointer;padding-top:15px" id="restoreBack"></i><h1 style="color:#333;margin:0;width:80%;font-size:42px;;padding-left:10%">Select Skin</h1></div>
                                    <p>You can customize what Eclipse would look like using skins. You can change this later or add your own in Settings.</p>
                                    <br>
                                    <div id="skinSelector">
                                        <img onerror="javascript:this.src='assets/img/default-cover.png'" onclick="skins.set('//php.eclipseemu.me/dl/dl.php?dl=https://eclipseemu.me/play/json/skins/default.json');eclipse.methods.skins.addSkin('https://eclipseemu.me/play/json/skins/default.json')" style="cursor:pointer;width:80px;height:80px;border-radius:21%" src="./assets/img/skin/red.png">
                                        <txt style="visibility:hidden">---</txt>
                                        <img onerror="javascript:this.src='assets/img/default-cover.png'" onclick="skins.set('//php.eclipseemu.me/dl/dl.php?dl=https://eclipseemu.me/play/json/skins/teal.json');eclipse.methods.skins.addSkin('https://eclipseemu.me/play/json/skins/teal.json')" style="cursor:pointer;width:80px;height:80px;border-radius:21%" src="./assets/img/skin/teal.png">
                                        <txt style="visibility:hidden">---</txt>
                                        <img onerror="javascript:this.src='assets/img/default-cover.png'" onclick="skins.set('//php.eclipseemu.me/dl/dl.php?dl=https://eclipseemu.me/play/json/skins/blue.json');eclipse.methods.skins.addSkin('https://eclipseemu.me/play/json/skins/blue.json')" style="cursor:pointer;width:80px;height:80px;border-radius:21%" src="./assets/img/skin/blue.png">
                                        <txt style="visibility:hidden">---</txt>
                                        <img onerror="javascript:this.src='assets/img/default-cover.png'" onclick="skins.set('//php.eclipseemu.me/dl/dl.php?dl=https://eclipseemu.me/play/json/skins/green.json');eclipse.methods.skins.addSkin('https://eclipseemu.me/play/json/skins/green.json')" style="cursor:pointer;width:80px;height:80px;border-radius:21%" src="./assets/img/skin/green.png">
                                        <txt style="visibility:hidden">---</txt>
                                        <img onerror="javascript:this.src='assets/img/default-cover.png'" onclick="skins.set('//php.eclipseemu.me/dl/dl.php?dl=https://eclipseemu.me/play/json/skins/grey.json');eclipse.methods.skins.addSkin('https://eclipseemu.me/play/json/skins/grey.json')" style="cursor:pointer;width:80px;height:80px;border-radius:21%" src="./assets/img/skin/grey.png">
                                        <txt style="visibility:hidden">---</txt>
                                        <img onerror="javascript:this.src='assets/img/default-cover.png'" onclick="skins.set('//php.eclipseemu.me/dl/dl.php?dl=https://eclipseemu.me/play/json/skins/magenta.json');eclipse.methods.skins.addSkin('https://eclipseemu.me/play/json/skins/magenta.json')" style="cursor:pointer;width:80px;height:80px;border-radius:21%" src="./assets/img/skin/magenta.png">
                                        <txt style="visibility:hidden">---</txt>
                                        <img onerror="javascript:this.src='assets/img/default-cover.png'" onclick="skins.set('//php.eclipseemu.me/dl/dl.php?dl=https://eclipseemu.me/play/json/skins/orange.json');eclipse.methods.skins.addSkin('https://eclipseemu.me/play/json/skins/orange.json')" style="cursor:pointer;width:80px;height:80px;border-radius:21%" src="./assets/img/skin/orange.png">
                                        <txt style="visibility:hidden">---</txt>
                                        <img onerror="javascript:this.src='assets/img/default-cover.png'" onclick="skins.set('//php.eclipseemu.me/dl/dl.php?dl=https://eclipseemu.me/play/json/skins/iGBAModern.json');eclipse.methods.skins.addSkin('https://eclipseemu.me/play/json/skins/iGBAModern.json')" style="cursor:pointer;width:80px;height:80px;border-radius:21%" src="//eclipseemu.me/play/assets/img/skin/igba.jpeg">
                                        <txt style="visibility:hidden">---</txt>
                                        <img onerror="javascript:this.src='assets/img/default-cover.png'" onclick="skins.set('//php.eclipseemu.me/dl/dl.php?dl=https://eclipseemu.me/play/json/skins/iGBALegacy.json');eclipse.methods.skins.addSkin('https://eclipseemu.me/play/json/skins/iGBALegacy.json')" style="cursor:pointer;width:80px;height:80px;border-radius:21%" src="./assets/img/skin/igba.png">
                                        <txt style="visibility:hidden">---</txt>
                                        <img onerror="javascript:this.src='assets/img/default-cover.png'" onclick="skins.set('//php.eclipseemu.me/dl/dl.php?dl=https://igba.shuga.co/theme/darkMode/index.json');eclipse.methods.skins.addSkin('https://igba.shuga.co/theme/darkMode/index.json')" style="cursor:pointer;width:80px;height:80px;border-radius:21%" src="//igba.shuga.co/theme/darkMode/icon.png">
                                        <txt style="visibility:hidden">---</txt>
                                        <img onerror="javascript:this.src='assets/img/default-cover.png'" onclick="skins.set('//php.eclipseemu.me/dl/dl.php?dl=https://igba.shuga.co/theme/twitterDark/index.json');eclipse.methods.skins.addSkin('https://igba.shuga.co/theme/twitterDark/index.json')" style="cursor:pointer;width:80px;height:80px;border-radius:21%" src="//igba.shuga.co/img/twitterDark.png">
                                        <txt style="visibility:hidden">---</txt>
                                    </div>
                                    <br><a href="#" onclick="eclipse.methods.welcome.sync()" class="button active button-big button-list-red popup-close" style="box-shadow: 0 5px 13px 0 rgba(0, 0, 0, .1); border:none; font-weight:bold;">Continue...</a>
                                    <br>
                                </center>
                            </div>
                        </div>`,
          closeByBackdropClick: false,
        }).open();
      },
      sync: function() {
        eclipse.popup.create({
          content: `<div class="page-content popup">
                            <div class="block">
                                <center>
                                    <div class="row"><i onclick="eclipse.methods.welcome.skin()" class="icon icon-back color-black popup-close" style="position: absolute; height: 42px; cursor: pointer;padding-top:15px" id="restoreBack"></i><h1 style="color:#333;margin:0;width:80%;font-size:42px;;padding-left:10%">Link with Google Drive</h1></div>
                                    <p>Eclipse can optionally be linked with your Google Drive account, allowing you to add ROMs stored in Google Drive with ease.</p>
                                    <p>Google Drive integration can be managed in Settings under "Linked Applications."</p>
                                    <br><a href="#" onclick="GoogleDrive.signin();eclipse.methods.welcome.tos()" class="needsDrive button active button-big button-list-red popup-close" style="box-shadow: 0 5px 13px 0 rgba(0, 0, 0, .1); border:none; font-weight:bold;">Link with Google Drive</a>
                                    <br><a href="#" onclick="eclipse.methods.welcome.tos()" class="popup-close" style="text-decoration:none;color:grey;">I Don't Want to Link with Google Drive.</a>
                                    <br>
                                </center>
                            </div>
                        </div>`,
          closeByBackdropClick: false,
        }).open();
      },
      done: function() {
        eclipse.popup.create({
          content: `<div class="page-content popup">
                            <div class="block">
                                <center>
                                    <div class="row"><i onclick="eclipse.methods.welcome.tos()" class="icon icon-back color-black popup-close" style="position: absolute; height: 42px; cursor: pointer;padding-top:15px" id="restoreBack"></i><h1 style="color:#333;margin:0;width:80%;font-size:42px;;padding-left:10%">Setup Complete!</h1></div>
                                    <p>Eclipse has been configured successfully and is ready for some games! Here are some ways to get some:</p>
                                    <div class="welcomeGridWrapper">
                                      <img class="welcomeGridIcon" src="assets/img/onboarding/add-games.png">
                                      <p class="welcomeGridText">No matter where your games will originate, you need to press the + button to get started. This will bring up the Add Games menu.</p>
                                    </div>
                                    <div class="welcomeGridWrapper">
                                      <img class="welcomeGridIcon" src="assets/img/onboarding/add-web.png">
                                      <p class="welcomeGridText">If you have a URL to a ROM on your personal server or from an unsupported cloud provider, you can add it via URL. Eclipse will attempt to get the box art and name and add it to your library.</p>
                                    </div>
                                    <div class="welcomeGridWrapper">
                                      <img class="welcomeGridIcon" src="assets/img/onboarding/add-upload.png">
                                      <p class="welcomeGridText">If you have the ROM stored locally and want to play it, use the Upload feature. Although it may not be added to your Library, it will save. Uploaded games have the added benefit of being able to be used offline.</p>
                                    </div>
                                    <div class="welcomeGridWrapper">
                                      <img class="welcomeGridIcon" src="assets/img/onboarding/add-hub.png">
                                      <p class="welcomeGridText">If you use Google Drive, Dropbox, or made a repo to organize your game colleciton, it will be in the Game Hub. If you own no games, don’t worry! Our featured repos have some great homebrew titles for your enjoyment!</p>
                                    </div>
                                    <p>To play a game from your Library, simply tap its box art. To edit the game itself, either right-click it or hold onto it until the game’s options show up. Games can also be rearranged in Search.</p>
                                    <p>If you are ever confused about anything in Eclipse, go to Help in Settings and you can see the most asked questions and their answers.</p>


                                    <br><a href="#" class="button active button-big button-list-red popup-close" style="box-shadow: 0 5px 13px 0 rgba(0, 0, 0, .1); border:none; font-weight:bold;">Go to My Library</a>
                                    <br><a href="#" onclick="eclipse.router.navigate('/settings/faq/')" class="popup-close" style="text-decoration:none;color:grey;">Go to Help</a>
                                    <br>
                                </center>
                            </div>
                        </div>`,
          closeByBackdropClick: false,
        }).open();
      },
      restore: function() {
        eclipse.popup.create({
          content: `<div class="page-content popup">
                            <div class="block">
                                <div class="block" style="margin-top: 0">
                                    <center class="">
                                        <div class="row"><i onclick="eclipse.methods.welcome.new(false)" class="icon icon-back color-black popup-close" style="position: absolute; height: 42px; cursor: pointer;padding-top:15px" id="restoreBack"></i><h1 style="color:#333;margin:0;width:80%;font-size:42px;;padding-left:10%">Import Backup</h1></div>

                                        <p>Eclipse can be restored from both iGBA and Eclipse backups.</p>
                                        <p>Please upload your <code>.eclipse</code> or <code>.igba</code> file to complete the restore. iGBA repos will not be saved, but all games and their save data will persist.</p>
                                        <p><i>Reminder: To export your state file, go to iGBA or Eclipse's Settings, then Save Backup (or Save State), and then upload the generated file here.</i>
                                        </p>
                                    </center>
                                </div>
                                <div class="list inset">
                                    <ul>
                                        <li>
                                            <a href="#" onclick="eclipse.methods.backups.import.upload();" class="item-link">
                                                <div class="item-content">
                                                    <div class="item-media">
                                                        <i class="icon f7-icons ios-only">folder_fill</i><i class="icon material-icons md-only">folder</i>
                                                    </div>
                                                    <div class="item-inner">
                                                        <div class="item-title">
                                                            Import from Upload
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" onclick="eclipse.methods.backups.import.url();" class="item-link">
                                                <div class="item-content">
                                                    <div class="item-media">
                                                        <i class="icon f7-icons ios-only">compass_fill</i><i class="icon material-icons md-only">explore</i>
                                                    </div>
                                                    <div class="item-inner">
                                                        <div class="item-title">
                                                            Import from URL
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" onclick="eclipse.methods.backups.import.text();" class="item-link">
                                                <div class="item-content">
                                                    <div class="item-media">
                                                        <i class="icon f7-icons ios-only">document_text_fill</i><i class="icon material-icons md-only">description</i>
                                                    </div>
                                                    <div class="item-inner">
                                                        <div class="item-title">
                                                            Import from Text
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>`,
          closeByBackdropClick: false,
        }).open();
      },
      update: function() {
        setupStageStorage = "update";
        // Update if its an old state.
        if (localStorage.getItem("setup") == "done") {
          var keyboardMap = ["", "", "", "CANCEL", "", "", "HELP", "", "BACK_SPACE", "TAB", "", "", "CLEAR", "ENTER", "ENTER_SPECIAL", "", "SHIFT", "CONTROL", "ALT", "PAUSE", "CAPS_LOCK", "KANA", "EISU", "JUNJA", "FINAL", "HANJA", "", "ESCAPE", "CONVERT", "NONCONVERT", "ACCEPT", "MODECHANGE", "SPACE", "PAGE_UP", "PAGE_DOWN", "END", "HOME", "LEFT", "UP", "RIGHT", "DOWN", "SELECT", "PRINT", "EXECUTE", "PRINTSCREEN", "INSERT", "DELETE", "", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "COLON", "SEMICOLON", "LESS_THAN", "EQUALS", "GREATER_THAN", "QUESTION_MARK", "AT", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "OS_KEY", "", "CONTEXT_MENU", "", "SLEEP", "NUMPAD0", "NUMPAD1", "NUMPAD2", "NUMPAD3", "NUMPAD4", "NUMPAD5", "NUMPAD6", "NUMPAD7", "NUMPAD8", "NUMPAD9", "MULTIPLY", "ADD", "SEPARATOR", "SUBTRACT", "DECIMAL", "DIVIDE", "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12", "F13", "F14", "F15", "F16", "F17", "F18", "F19", "F20", "F21", "F22", "F23", "F24", "", "", "", "", "", "", "", "", "NUM_LOCK", "SCROLL_LOCK", "WIN_OEM_FJ_JISHO", "WIN_OEM_FJ_MASSHOU", "WIN_OEM_FJ_TOUROKU", "WIN_OEM_FJ_LOYA", "WIN_OEM_FJ_ROYA", "", "", "", "", "", "", "", "", "", "CIRCUMFLEX", "EXCLAMATION", "DOUBLE_QUOTE", "HASH", "DOLLAR", "PERCENT", "AMPERSAND", "UNDERSCORE", "OPEN_PAREN", "CLOSE_PAREN", "ASTERISK", "PLUS", "PIPE", "HYPHEN_MINUS", "OPEN_CURLY_BRACKET", "CLOSE_CURLY_BRACKET", "TILDE", "", "", "", "", "VOLUME_MUTE", "VOLUME_DOWN", "VOLUME_UP", "", "", "SEMICOLON", "EQUALS", "COMMA", "MINUS", "PERIOD", "SLASH", "BACK_QUOTE", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "OPEN_BRACKET", "BACK_SLASH", "CLOSE_BRACKET", "QUOTE", "", "META", "ALTGR", "", "WIN_ICO_HELP", "WIN_ICO_00", "", "WIN_ICO_CLEAR", "", "", "WIN_OEM_RESET", "WIN_OEM_JUMP", "WIN_OEM_PA1", "WIN_OEM_PA2", "WIN_OEM_PA3", "WIN_OEM_WSCTRL", "WIN_OEM_CUSEL", "WIN_OEM_ATTN", "WIN_OEM_FINISH", "WIN_OEM_COPY", "WIN_OEM_AUTO", "WIN_OEM_ENLW", "WIN_OEM_BACKTAB", "ATTN", "CRSEL", "EXSEL", "EREOF", "PLAY", "ZOOM", "", "PA1", "WIN_OEM_CLEAR", ""];
          var controls = JSON.parse(localStorage.getItem('controls')).controls;
          var controls_json = {
            up: parseInt(controls[6].keycode),
            down: parseInt(controls[7].keycode),
            left: parseInt(controls[8].keycode),
            right: parseInt(controls[9].keycode),
            start: parseInt(controls[4].keycode),
            select: parseInt(controls[5].keycode),
            a: parseInt(controls[0].keycode),
            b: parseInt(controls[1].keycode),
            x: 83,
            y: 88,
            l: parseInt(controls[2].keycode),
            r: parseInt(controls[3].keycode)
          }
          var controls_form = {
            up: keyboardMap[controls[6].keycode].toLowerCase()[0].toUpperCase() + keyboardMap[controls[6].keycode].toLowerCase().substr(1),
            down: keyboardMap[controls[7].keycode].toLowerCase()[0].toUpperCase() + keyboardMap[controls[7].keycode].toLowerCase().substr(1),
            left: keyboardMap[controls[8].keycode].toLowerCase()[0].toUpperCase() + keyboardMap[controls[8].keycode].toLowerCase().substr(1),
            right: keyboardMap[controls[9].keycode].toLowerCase()[0].toUpperCase() + keyboardMap[controls[9].keycode].toLowerCase().substr(1),
            start: keyboardMap[controls[4].keycode].toLowerCase()[0].toUpperCase() + keyboardMap[controls[4].keycode].toLowerCase().substr(1),
            select: keyboardMap[controls[5].keycode].toLowerCase()[0].toUpperCase() + keyboardMap[controls[5].keycode].toLowerCase().substr(1),
            a: keyboardMap[controls[0].keycode].toLowerCase()[0].toUpperCase() + keyboardMap[controls[0].keycode].toLowerCase().substr(1),
            b: keyboardMap[controls[1].keycode].toLowerCase()[0].toUpperCase() + keyboardMap[controls[1].keycode].toLowerCase().substr(1),
            x: keyboardMap[83].toLowerCase()[0].toUpperCase() + keyboardMap[83].toLowerCase().substr(1),
            y: keyboardMap[88].toLowerCase()[0].toUpperCase() + keyboardMap[88].toLowerCase().substr(1),
            l: keyboardMap[controls[2].keycode].toLowerCase()[0].toUpperCase() + keyboardMap[controls[2].keycode].toLowerCase().substr(1),
            r: keyboardMap[controls[3].keycode].toLowerCase()[0].toUpperCase() + keyboardMap[controls[3].keycode].toLowerCase().substr(1)
          }
          localStorage.setItem("controls", JSON.stringify(controls_json));
          localStorage.setItem("controls_form", JSON.stringify(controls_form));
          localStorage.setItem("setup", "2.0.0");
        }
        // Show popup.
        eclipse.popup.create({
          content: `<div class="page-content popup">
                            <div class="block">
                                <center>
                                    <div class="row"><h1 style="color:#333;margin:0;width:80%;font-size:42px;;padding-left:10%">Welcome to Eclipse 2.0!</h1></div>
                                    <p>Eclipse has undergone a major update and with that, some changes. Here are some things that have changed:</p>
                                </center>
                                    <ul>
                                        <li>Eclipse was <b>rewritten</b> from the ground up, <b>optimizing it and fixing bugs</b> in the process.</li>
                                        <li>A <b>new UI</b> has been implemented, making Eclipse more intuitive to use.</li>
                                        <li>Three new platforms have been added: the <b>Sega Master System</b>, <b>Game Gear</b>, and the Super Nintendo Entertainment System (experimental).</li>
                                        <li>You can now link your <b>Google Drive</b> account with Eclipse and browse games from <b>Dropbox</b> with the <b>redesigned Game Hub</b>.</li>
                                        <li>Introducing <b>OpenSkin 2.0.0</b>, which allows for more capable skins.</li>
                                        <li>Repos now support <b>Markdown</b> for descriptions, which can be used for notifying you of updates, linking to external pages, and more!</li>
                                        <li>Eclipse will now <b>attempt to find box art</b> for games you add.</li>
                                        <li><b>Tapping a game now opens it immediately</b>. To edit its entry, either hold on it or right-click it.</li>
                                        <li>When editing a game's entry, you can now <b>upload box art</b> from your device, as well as <b>change its position</b> in the <b>more compact Search view</b>.</li>
                                        <li>There is now a <b>built-in FAQ</b> for anything you might need help with!</li>
                                        <li>Eclipse is now updated to Framework7 3.0, which can be seen in various areas throughout Eclipse.</li>
                                    </ul>
                                <center>
                                    <p>We have spent a long time preparing this update for you, adding features and enhancements based on your feedback, and we hope you enjoy it as much as, if not more than, the previous version. Enjoy Eclipse 2.0!</p>
                                    <br><a href="#" onclick="eclipse.methods.welcome.skin()" class="button active button-big button-list-red popup-close" style="box-shadow: 0 5px 13px 0 rgba(0, 0, 0, .1); border:none; font-weight:bold;">Continue...</a>
                                    <br>
                                </center>
                            </div>
                        </div>`,
          closeByBackdropClick: false,
        }).open();
      },
      setDisplay: {
        fit: function() {
          document.querySelector("#fit").className = "button button-active";
          document.querySelector("#stretch").className = "button";
          localStorage.setItem('fillScreen', 'false');
          document.querySelector("#fillPreview").src = "assets/img/fit/fit.png";
        },
        stretch: function() {
          document.querySelector("#stretch").className = "button button-active";
          document.querySelector("#fit").className = "button";
          localStorage.setItem('fillScreen', 'true');
          document.querySelector("#fillPreview").src = "assets/img/fit/stretch.png";
        }
      },
    },
  },
  routes: [
    // Index page
    {
      path: '/',
      url: './index.html',
      name: 'home',
      on: {
        pageInit: function() {
          var gamesList = games.list();
          var library = "";
          var libraryRows = gamesList.length % 6;
          var emptySlots = 6 - libraryRows;
          if (gamesList.length > 0) {
            document.querySelector('.no-games').style = "display:none;";
            for (i = 0; i < gamesList.length; i++) {
              var game = JSON.parse(gamesList[i]);
              library += '<div class="col-50 tablet-25 desktop-20">' +
                '<a onclick="eclipse.methods.emu.systems.' + game.system.toLowerCase() + '.init({url: \'' + btoa("https://php.eclipseemu.me/dl/dl.php?dl=" + game.link.patch()) + '\'}); DiscordLink.set(\'' + game.system.patch().toLowerCase() + '\',\'' + game.name.patch() + '\');" href="#" class="game-card" data-index="' + i + '" data-name="' + game.name + '">' +
                '<div class="card">' +
                '<div class="card-content entry">' +
                '<div class="game-card-boxart lazy lazy-fade-in" data-background="' + encode_boxart(game.boxart) + '">' +
                '<i class="origin-parent">' + origin(game.link) + '</i>' +
                '</div>' +
                '</div>' +
                '<div class="card-footer"><div class="card-footer-inner-text">' + game.name + '</div></div>' +
                '<div class="subtitle">' + expandPlatform(game.system) + '</div>' +
                '</div>' +
                '</a>' +
                '</div>';
            }
            for (var ii = 0; ii < emptySlots; ii++) {
              library += "<div class=\"col-50 tablet-25 desktop-20\"></div>";
            }
            document.querySelector('.games').innerHTML = '<div class="row">' + library + '</div>';
            $$('div.lazy').trigger('lazy');
          } else {
            console.print('There are no games!');
          }
          $$('.game-card').on('taphold contextmenu', function(ev) {
            ev.preventDefault();
            eclipse.methods.games.manageGamePopup($(this).attr('data-index'), $(this).attr('data-name'), "/");
            return false;
          });
        },
      },
    },
    // Game Hub
    {
      path: '/repos/',
      url: './pages/repos.html',
      name: 'repos',
      on: {
        pageInit: function() {
          eclipse.preloader.show();
          document.querySelectorAll(".page-content")[1].style.opacity = "0";
        },
        pageAfterIn: function() {
          eclipse.methods.repos.listFeatured();
          eclipse.methods.repos.list();
          document.querySelectorAll(".page-content")[1].style.opacity = "1";
          eclipse.preloader.hide();
          eclipse.methods.online.list();
        },
        pageBeforeRemove: function () {
          $$('div.lazy').trigger('lazy');
        },
      },
    },
    // Repo
    {
      path: '/repo/',
      url: './pages/repo.html',
      name: 'repo',
      on: {
        pageBeforeIn: function(e, page) {
          var url = atob(page.route.query.url);
          var json = url.getJSON();
          document.getElementById("repoNameNavbar").innerHTML = json.reponame.patch();
          document.getElementById("repoName").innerHTML = json.reponame.patch();
          document.getElementById("repoAuthor").innerHTML = json.repoauthor.patch();
          document.getElementById("repoLogo").src = json.repologo.patch();
          if (json.repodesc != null) {
            document.getElementById("repoDesc").style.display = "block";
            document.getElementById("repoDesc").innerHTML = md(json.repodesc.patch().replace(/\n/g, "\n<br>"));
          } else {
            document.getElementById("repoDesc").style.display = "none";
            document.getElementById("repoDesc").innerHTML = "\x00";
          }
          var categories = json.categories;
          if (categories.length > 0) {
            var categoriesList = "";
            for (var i = 0; i < categories.length; i++) {
              categoriesList += '<li class="item-divider">' + categories[i].categoryname.patch() + '</li>';
              for (var ii = 0; ii < categories[i].games.length; ii++) {
                categoriesList += '<li>' +
                  '<a href="#" onclick="eclipse.methods.games.addGame(\'' + categories[i].games[ii].name.patch() + '\', \'' + categories[i].games[ii].boxart.patch() + '\', \'' + categories[i].games[ii].link.patch() + '\', \'' + categories[i].games[ii].system.patch() + '\')" class="item-link item-content">' +
                  '<div class="item-media"><img onerror="javascript:this.src=\'assets/img/default-cover.png\'" src="' + categories[i].games[ii].boxart.patch() + '" width="44px" style="border-radius:3px;"/></div>' +
                  '<div class="item-inner">' +
                  '<div class="item-title">' +
                  '<span>' + categories[i].games[ii].name.patch() + '</span>' +
                  '<div class="item-footer">' + expandPlatform(categories[i].games[ii].system.patch()) + '</div>' +
                  '</div>' +
                  '</div>' +
                  '</a>' +
                  '</li>';
              }
              document.getElementById("categories").innerHTML = categoriesList;
            }
          } else {
            emptyList = "<div style=\"padding:16px;\" class=\"block\"><center><h1 style=\"color:#333;\">No ROMs</h1><p>The maintainer of this repo hasn't added any ROMs yet.</p></center></div>"
            document.getElementById("categories").innerHTML = emptyList;
          }
          do {
            if (messy_fixes) {
              var style = ``;
              var RPLC = document.getElementById("repoPageList").children[0].children;
              for (var i = 0; i < RPLC.length; i++) {
                if (RPLC[i].className.includes("item-divider") && i != 0) {
                  style += "#repoPageList > ul > li:nth-of-type(" + (i).toString() + ") .item-inner:last-of-type:after { display: none }\n";
                }
              }
              messy_fix_0.innerHTML = style;
            }
          } while (0);
        },
      },
    },
    // Settings
    {
      path: '/settings/',
      url: './pages/settings.html',
      name: 'settings',
      on: {
        pageBeforeIn: function() {
          if (!localStorage.autoSave) {
            document.getElementById("autoSaveSwitch").checked = true;
            localStorage.autoSave = "true";
          } else if (localStorage.autoSave == "true") {
            document.getElementById("autoSaveSwitch").checked = true;
          } else {
            document.getElementById("autoSaveSwitch").checked = false;
          }
          if (!localStorage.legacyCorrect) {
            document.getElementById("legacySwitch").checked = false;
            localStorage.legacyCorrect = "false";
          } else if (localStorage.legacyCorrect == "true") {
            document.getElementById("legacySwitch").checked = true;
          } else {
            document.getElementById("legacySwitch").checked = false;
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
              document.getElementById("key_bindings_list_item").setAttribute("style", "display:none;")
            } else if (localStorage.desktopMode == "true") {
              document.getElementById("desktopModeSwitch").checked = true;
            } else {
              document.getElementById("key_bindings_list_item").setAttribute("style", "display:none;")
              document.getElementById("desktopModeSwitch").checked = false;
            }
          } catch (err) {
            console.error("Desktop Mode cannot be initialized. This is probably a caching issue.")
          }
          document.getElementById("currentEclipseVersion").innerHTML = eclipse.version;

          if (document.getElementById('consoleToggle').style.display == 'none' || document.getElementById('consoleToggle').style.display == '') {
            document.getElementById("jsConsoleSwitch").checked = false;
          } else {
            document.getElementById("jsConsoleSwitch").checked = true;
          }
          if(eclipse.device.ios == false || navigator.standalone != true) {
            document.getElementById("legacyModeToggle").style.display = "none";
          }
          if (debuggerState >= 5) {
            document.getElementById("debugModeSettingsPanel").style.display = "block";
          }
        },
        pageBeforeRemove: function () {
          $$('div.lazy').trigger('lazy');
        },
      },
    },
    // Update View
    {
      path: '/settings/update/',
      url: './pages/settings/update.html',
      name: 'update',
      on: {
        pageInit: function() {
          if (eclipse.version != latest.version) {
            document.querySelector('#update').innerHTML = `<div>
                                                            <div class="block block-strong inset" style="box-shadow: 0 5px 15px 0 rgba(0, 0, 0, .1);">
                                                              <center>
                                                                <img onerror="javascript:this.src='assets/img/default-cover.png'" src="assets/img/icon_mobFull.png" style="width: 96px; height: 96px;border-radius:21.3%;">
                                                                <br>
                                                                <h1 style="">Eclipse ${latest.version}</h1>
                                                                <h4 style="">Zenith Dev Team</h4>
                                                                <p>${latest.changelog}</p>
                                                              </center>
                                                            </div>
                                                          </div>
                                                          <div class="list inset">
                                                            <ul>
                                                              <li>
                                                                <a href="#" onclick="eclipse.methods.updates.cache();" class="item-link button-list-red list-button" style="text-align:center;">Install Update</a>
                                                              </li>
                                                            </ul>
                                                          </div>`;
          } else {
            document.querySelector('#update').innerHTML = `<div class="block block-strong inset">
                                                            <center>
                                                              <h1>You're Up To Date</h1>
                                                              <p>The latest available version is ${latest.version}, and you're on it.</p>
                                                            </center>
                                                          </div>`;
          }
        }
      },
    },
    // Controls View
    {
      path: '/settings/controls/',
      url: './pages/settings/controls.html',
      name: 'controls',
      on: {
        pageInit: function() {
          eclipse.methods.keybindings.init();
          var form_data = JSON.parse(JSON.parse(localStorage.getItem("controls_form")));
          console.log(form_data);
          var controls = JSON.parse(JSON.parse(localStorage.getItem("controls")));
          eclipse.form.fillFromData('#controls_form', form_data);
          console.log(controls.up);
          document.getElementById("up_input").setAttribute("data-keycode", controls.up);
          document.getElementById("down_input").setAttribute("data-keycode", controls.down);
          document.getElementById("left_input").setAttribute("data-keycode", controls.left);
          document.getElementById("right_input").setAttribute("data-keycode", controls.right);
          document.getElementById("start_input").setAttribute("data-keycode", controls.start);
          document.getElementById("select_input").setAttribute("data-keycode", controls.select);
          document.getElementById("a_input").setAttribute("data-keycode", controls.a);
          document.getElementById("b_input").setAttribute("data-keycode", controls.b);
          document.getElementById("l_input").setAttribute("data-keycode", controls.l);
          document.getElementById("r_input").setAttribute("data-keycode", controls.r);
        }
      },
    },
    // Skins
    {
      path: '/skins/',
      url: './pages/skins.html',
      name: 'skins',
      on: {
        pageInit: function() {
          eclipse.preloader.show()
        },
        pageAfterIn: function() {

          console.print("Loading skins...");

          // List current skins
          eclipse.methods.skins.fetchInstalledSkins();

          // Featured skins
          eclipse.methods.skins.listFeaturedSkins();

          // Make visible
          document.querySelectorAll(".page-content")[1].style.opacity = "1";
          eclipse.preloader.hide()
        }
      },
    },
    // Debugger
    {
      path: '/settings/debug/',
      url: './pages/settings/debug.html',
      name: 'debug',
      on: {
        pageInit: function() {
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
          if (eclipse.device.android == true) {
            devStr += "Android "
          }
          if (eclipse.device.androidChrome == true) {
            devStr += "AndroidChrome "
          }
          if (eclipse.device.desktop == true) {
            devStr += "Desktop "
          }
          if (eclipse.device.ios == true) {
            devStr += "iOS "
          }
          if (eclipse.device.ipad == true) {
            devStr += "iPad "
          }
          if (eclipse.device.iphone == true) {
            devStr += "iPhone "
          }
          if (eclipse.device.iphoneX == true) {
            devStr += "iPhoneX "
          }
          if (eclipse.device.ipod == true) {
            devStr += "iPod "
          }
          document.getElementById("debugDeviceType").innerHTML = devStr;

          document.getElementById("debugUA").innerHTML = navigator.userAgent;
          document.getElementById("debugCookie").innerHTML = navigator.cookieEnabled;
          document.getElementById("debugServiceWorkers").innerHTML = Boolean(navigator.serviceWorker);
          document.getElementById("debugLang").innerHTML = String(navigator.languages);
          document.getElementById("debugVendor").innerHTML = navigator.vendor;
          document.getElementById("debugPlatform").innerHTML = navigator.platform;
          if (navigator.doNotTrack) {
            dntState = navigator.doNotTrack
          } else {
            dntState = "Not Set"
          }
          document.getElementById("debugTrack").innerHTML = dntState;
        }
      }
    },
    // Storage
    {
      path: '/settings/storage/',
      url: './pages/settings/storage.html',
      name: 'storage',
      on: {
        pageInit: function() {
          var percentUsed;
          var usageInMib;
          var quotaInMib;
          eclipse.methods.storage.wrapper().then(function(estimate) {
            percentUsed = Math.round(estimate.usage / estimate.quota * 100);
            percentHundreths = Math.round(100 * (estimate.usage / estimate.quota * 100)) / 100
            usageInMib = Math.round((estimate.usage / (1024 * 1024)) * 100) / 100;
            quotaInMib = Math.round((estimate.quota / (1024 * 1024)) * 100) / 100;
            var demoGauge = eclipse.gauge.create({
              el: '.storage-gauge',
              type: 'circle',
              value: percentHundreths / 100,
              size: 200,
              borderColor: '#ff3b30',
              borderWidth: 10,
              valueText: usageInMib + ' MiB',
              valueFontSize: 33,
              valueTextColor: '#ff3b30',
              labelText: 'of ' + quotaInMib + ' MiB',
            });
            // if (document.getElementById("quotaTotal").innerHTML == "NaN") {
            //   document.getElementById("quotaLabel").innerHTML = "Storage information cannot be loaded. Please ensure that your browser is loading content over HTTPS.";
            // }

          });
          if (navigator.userAgent.toLowerCase().search(/(chrome|android)/i) == -1 && navigator.userAgent.toLowerCase().search(/safari/i) != -1) {
            document.getElementById("safariStorageNotice").style.display = "inline";
          }
        }
      },
    },
    // Credits
    {
      path: '/settings/credits/',
      url: './pages/settings/credits.html',
      name: 'credits',
    },
    // FAQ
    {
      path: '/settings/faq/',
      url: './pages/settings/faq.html',
      name: 'faq',
      on: {
        pageInit: function() {
          var items = "json/faq.json".getJSON().faq;
          var virtualList = eclipse.virtualList.create({
            el: '.faq-list',
            items: items,
            itemTemplate: `
            <li class="accordion-item"><a href="#" class="item-content item-link">
                <div class="item-inner">
                  <div style="white-space:initial" class="item-title">{{question}}</div>
                </div></a>
              <div class="accordion-item-content">
                <div class="block">
                  <p>{{answer}}</p>
                </div>
              </div>
            </li>`,
            height: eclipse.theme === 'ios' ? 63 : 73,
          });
          document.querySelector(".faq-list>ul").style.height = "";
        }
      }
    },
    // Donate
    {
      path: '/settings/donate/',
      url: './pages/settings/donate.html',
      name: 'donate',
    },
    // Manage Games
    {
      path: '/settings/games/',
      url: './pages/settings/manage-games.html',
      name: 'manage-games',
      beforeLeave: function(routeTo, routeFrom, resolve, reject) {
        if (routeTo.path == "/") {
          console.print('Leaving Manage Games view...')
          var gamesList = games.list();
          var library = "";
          var libraryRows = gamesList.length % 5;
          var emptySlots = 5 - libraryRows;
          if (gamesList.length > 0) {
            for (i = 0; i < gamesList.length; i++) {
              var game = JSON.parse(gamesList[i]);
              library += '<div class="col-50 tablet-25 desktop-20">' +
                '<a onclick="eclipse.methods.emu.systems.' + game.system.toLowerCase() + '.init({url: \'' + btoa("https://php.eclipseemu.me/dl/dl.php?dl=" + game.link.patch()) + '\'}); DiscordLink.set(\'' + game.system.patch().toLowerCase() + '\',\'' + game.name.patch() + '\');" href="#" class="game-card" data-index="' + i + '" data-name="' + game.name + '">' +
                '<div class="card">' +
                '<div class="card-content entry">' +
                '<div class="game-card-boxart lazy lazy-fade-in" data-background="' + encode_boxart(game.boxart) + '">' +
                '<i class="origin-parent">' + origin(game.link) + '</i>' +
                '</div>' +
                '</div>' +
                '<div class="card-footer"><div class="card-footer-inner-text">' + game.name + '</div></div>' +
                '<div class="subtitle">' + expandPlatform(game.system) + '</div>' +
                '</div>' +
                '</a>' +
                '</div>';
            }
            for (var ii = 0; ii < emptySlots; ii++) {
              library += "<div class=\"col-50 tablet-25 desktop-20\"></div>";
            }
            document.querySelector('.games').innerHTML = '<div class="row">' + library + '</div>';
            $$('div.lazy').trigger('lazy');
          } else {
            console.print('There are no games!');
            document.querySelector('.games').innerHTML = `              <div class="no-games" style="text-align:center;">
                            <br>
                            <h1>No Games</h1>
                            <p>You can add games by pressing the + button in the top right corner.</p>
                          </div>`
          }
          $$('.game-card').on('taphold contextmenu', function(ev) {
            ev.preventDefault();
            eclipse.methods.games.manageGamePopup($(this).attr('data-index'), $(this).attr('data-name'), "/");
            return false;
          });
        } else {
          // Do nothing
        }
        resolve();
      },
      on: {
        pageInit: function(e, page) {
          var gamesList = games.list();
          var library = "";
          if (page.route.query.title != null) {
            document.getElementById("mg_title").innerHTML = page.route.query.title;
          }
          if (gamesList.length > 0) {
            for (i = 0; i < gamesList.length; i++) {
              var game = JSON.parse(gamesList[i]);
              library += `<li class="swipeout">
                        <a class="game-item swipeout-content item-content item-link" onclick="eclipse.methods.emu.systems.${game.system.toLowerCase()}.init({url: '${btoa("https://php.eclipseemu.me/dl/dl.php?dl=" + game.link.patch())}'}); DiscordLink.set('${game.system.patch().toLowerCase()}','${game.name.patch()}');" data-index="${i}" data-name="${game.name}" data-link="${game.link}" data-system="${game.system}">
                          <div class="item-media">
                            <img onerror="javascript:this.src='assets/img/default-cover.png'" class="lazy lazy-fade-in" data-src="${encode_boxart(game.boxart)}" data-image-url="${encode_boxart(game.boxart)}" width="56" style="border-radius:3px;" />
                          </div>
                          <div class="item-inner">
                            <div class="item-title">
                              ${game.name}
                              <div class="item-footer">${expandPlatform(game.system)}</div>
                            </div>
                          </div>
                        </a>
                        <div class="sortable-handler"></div>
                        <div class="swipeout-actions-right">
                          <a href="#" class="swipeout-delete" style="background: #fe3b30" onclick="eclipse.methods.manage_games.remove('${i}', false)">Delete</a>
                        </div>
                      </li>`;
            }
            document.getElementById('manage_games_list').innerHTML = library;
          } else {
            document.getElementById('parent_manage_games_list').style = "display:none;";
            document.getElementById('no-games').style = "text-align:center;";
            console.print('There are no games!');
          }
          $$('.game-item').on('taphold contextmenu', function(ev) {
            ev.preventDefault();
            eclipse.methods.games.manageGamePopup($(this).attr('data-index'), $(this).attr('data-name'), "/settings/games/");
            return false;
          });
          eclipse.on('sortableSort', function(listEl, indexes) {
            eclipse.methods.rearrangeGames(indexes, listEl);
          });
        },
      },
    },
    // Cloud Login Page
    {
      path: '/settings/sync/',
      url: './pages/settings/sync.html',
      name: 'cloud-login',
      on: {
        pageInit: function() {
          eclipse.methods.online.syncPage();
          check_status = window.setInterval(function() {
            eclipse.methods.online.syncLite();
          }, 1000);
          check_status2 = window.setInterval(function() {
            eclipse.methods.online.syncPage();
          }, 5000);
        },
        pageBeforeRemove: function() {
          window.clearInterval(check_status);
          window.clearInterval(check_status2);
        }
      }
    },
    // Cloud File Browsers
    {
      path: '/sync/drive/',
      url: './pages/sync/drive.html',
      name: 'sync-drive',
      on: {
        pageInit: function() {
          files = GoogleDrive.files;
          var inner = "";
          for (var i = 0; i < files.length; i++) {
            ext = files[i].name.substring(files[i].name.lastIndexOf(".") + 1);
            inner += `
                    <li>
                       <a href="#" onclick="eclipse.methods.games.addGameURL('${files[i].link.patch()}', false, true, '${ext.patch()}', '${files[i].name.patch()}')" class="item-link item-content">
                          <div class="item-media"><img onerror="javascript:this.src='assets/img/default-cover.png'" src="assets/img/drive_generic.png" width="44px" style="border-radius:3px;"></div>
                          <div class="item-inner">
                             <div class="item-title">
                                <span>${files[i].name.patch()}</span>
                                <div class="item-footer">${expandPlatform(ext)}</div>
                             </div>
                          </div>
                       </a>
                    </li>
                `;
          }
          if (inner == "") {
            inner = "<div style=\"padding:16px;\" class=\"block\"><center><h1 style=\"color:#333;\">No ROMs</h1><p>You haven't added any ROMs to your Google Drive account yet.</p></center></div>"
          } else {
            inner = "<ul>" + inner + "</ul>"
          }
          document.getElementById("repoPageList").innerHTML = inner;
        }
      },
    },
    // 404 Page
    {
      path: '(.*)',
      url: './pages/404.html',
    },
  ],
});

// iPhone X Setup
if (eclipse.device.iphoneX == true) {
  console.print("iPhone X detected. Applying styles...");
  document.querySelector("body").style.height = "100vh";
  // document.querySelector(".navbar").height = "30px";
  var iXStyle = document.createElement("style");
  iXStyle.id = "iX";
  iXStyle.innerHTML = `.statusbar.statusbar.statusbar.statusbar {height:30px}
  @media screen and (orientation:landscape) {
       #dpad {left: 30px!important}
       #emu_up_btn {left: 78px!important}
       #emu_down_btn {left: 78px!important}
       #emu_left_btn {left: 30px!important}
       #emu_right_btn {left: 126px!important}
       #emu_center {left: 78px!important}

       .btns {margin-right: 30px!important}
       #emu_a_btn {right: 30px!important}
       #emu_b_btn {right: 78px!important}
       #emu_x_btn {right: 78px!important}
       #emu_y_btn {right: 126px!important}
  }
  @media screen and (orientation:portrait) {
       .startselect {bottom: 15px!important}
       .btn-menu  {bottom: 25px!important}
  }

  `;
  document.head.appendChild(iXStyle);
}

eclipse.methods.offlineCheck();

// iOS Statusbar fix
if (eclipse.device.ios == true && navigator.standalone == true) {
  if (Math.abs(window.orientation) === 90 && eclipse.device.ipad == false) {
    eclipse.statusbar.hide();
  } else {
    eclipse.statusbar.show();
  }
}
// Detect on resize
window.onresize = function() {
  if (eclipse.device.ios == true && navigator.standalone == true && eclipse.device.ipad == false) {
    if (Math.abs(window.orientation) === 90) {
      eclipse.statusbar.hide();
    } else {
      eclipse.statusbar.show();
    }
  }
}

window.applicationCache.addEventListener('updateready', eclipse.methods.updates.update, false);

// Setup/Init
if (localStorage.getItem("setup") == null || localStorage.getItem("setup") == undefined) {
  eclipse.methods.toggle.configDesktop();
  eclipse.methods.welcome.new();
} else if (localStorage.getItem("setup") == "done") {
  eclipse.methods.welcome.update();
}

// Forever: Respect Legacy Mode settings.
if(window.localStorage.getItem("legacyCorrect") == "true") {
  eclipse.methods.legacyStatusCorrector();
}

// For now: Ask if enable Legacy Mode.
if((window.localStorage.getItem("setup") == "2.0.0" || window.localStorage.getItem("setup") == "2.0.1") && eclipse.device.ios == true && navigator.standalone == true) {
  eclipse.dialog.confirm(`<p>Eclipse 2.0 has added a new status bar system that causes issues with older users. As we cannot detect if you are experiencing this issue, we ask: <b>do you see a grey bar <i>underneath</i> the status bar?</b></p><p>Press <b>OK</b> if you are, and <b>Cancel</b> if you aren't.</p>`, "Set Status Bar Setings", function(evt) {
    window.localStorage.setItem("legacyCorrect","true");
    eclipse.methods.legacyStatusCorrector();
  });
} else if(window.localStorage.getItem("setup") == "done") {
  window.localStorage.setItem("legacyCorrect","true");
  eclipse.methods.legacyStatusCorrector();
} else {
  window.localStorage.setItem("legacyCorrect","false");
}

localStorage.setItem("setup", eclipse.version);
eclipse.methods.init.endpoints();

/* FileSaver.js
 * A saveAs() FileSaver implementation.
 * 1.3.2
 * 2016-06-16 18:25:19
 *
 * By Eli Grey, http://eligrey.com
 * License: MIT
 *   See https://github.com/eligrey/FileSaver.js/blob/master/LICENSE.md
 */

/*global self */
/*jslint bitwise: true, indent: 4, laxbreak: true, laxcomma: true, smarttabs: true, plusplus: true */

/*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/FileSaver.js */

var saveAs = saveAs || (function(view) {
  "use strict";
  // IE <10 is explicitly unsupported
  if (typeof view === "undefined" || typeof navigator !== "undefined" && /MSIE [1-9]\./.test(navigator.userAgent)) {
    return;
  }
  var
    doc = view.document
    // only get URL when necessary in case Blob.js hasn't overridden it yet
    ,
    get_URL = function() {
      return view.URL || view.webkitURL || view;
    },
    save_link = doc.createElementNS("http://www.w3.org/1999/xhtml", "a"),
    can_use_save_link = "download" in save_link,
    click = function(node) {
      var event = new MouseEvent("click");
      node.dispatchEvent(event);
    },
    is_safari = /constructor/i.test(view.HTMLElement) || view.safari,
    is_chrome_ios = /CriOS\/[\d]+/.test(navigator.userAgent),
    throw_outside = function(ex) {
      (view.setImmediate || view.setTimeout)(function() {
        throw ex;
      }, 0);
    },
    force_saveable_type = "application/octet-stream"
    // the Blob API is fundamentally broken as there is no "downloadfinished" event to subscribe to
    ,
    arbitrary_revoke_timeout = 1000 * 40 // in ms
    ,
    revoke = function(file) {
      var revoker = function() {
        if (typeof file === "string") { // file is an object URL
          get_URL().revokeObjectURL(file);
        } else { // file is a File
          file.remove();
        }
      };
      setTimeout(revoker, arbitrary_revoke_timeout);
    },
    dispatch = function(filesaver, event_types, event) {
      event_types = [].concat(event_types);
      var i = event_types.length;
      while (i--) {
        var listener = filesaver["on" + event_types[i]];
        if (typeof listener === "function") {
          try {
            listener.call(filesaver, event || filesaver);
          } catch (ex) {
            throw_outside(ex);
          }
        }
      }
    },
    auto_bom = function(blob) {
      // prepend BOM for UTF-8 XML and text/* types (including HTML)
      // note: your browser will automatically convert UTF-16 U+FEFF to EF BB BF
      if (/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(blob.type)) {
        return new Blob([String.fromCharCode(0xFEFF), blob], {
          type: blob.type
        });
      }
      return blob;
    },
    FileSaver = function(blob, name, no_auto_bom) {
      if (!no_auto_bom) {
        blob = auto_bom(blob);
      }
      // First try a download, then web filesystem, then object URLs
      var
        filesaver = this,
        type = blob.type,
        force = type === force_saveable_type,
        object_url, dispatch_all = function() {
          dispatch(filesaver, "writestart progress write writeend".split(" "));
        }
        // on any filesys errors revert to saving with object URLs
        ,
        fs_error = function() {
          if ((is_chrome_ios || (force && is_safari)) && view.FileReader) {
            // Safari doesn't allow downloading of blob urls
            var reader = new FileReader();
            reader.onloadend = function() {
              var url = is_chrome_ios ? reader.result : reader.result.replace(/^data:[^;]*;/, 'data:attachment/file;');
              var popup = view.open(url, '_blank');
              if (!popup) view.location.href = url;
              url = undefined; // release reference before dispatching
              filesaver.readyState = filesaver.DONE;
              dispatch_all();
            };
            reader.readAsDataURL(blob);
            filesaver.readyState = filesaver.INIT;
            return;
          }
          // don't create more object URLs than needed
          if (!object_url) {
            object_url = get_URL().createObjectURL(blob);
          }
          if (force) {
            view.location.href = object_url;
          } else {
            var opened = view.open(object_url, "_blank");
            if (!opened) {
              // Apple does not allow window.open, see https://developer.apple.com/library/safari/documentation/Tools/Conceptual/SafariExtensionGuide/WorkingwithWindowsandTabs/WorkingwithWindowsandTabs.html
              view.location.href = object_url;
            }
          }
          filesaver.readyState = filesaver.DONE;
          dispatch_all();
          revoke(object_url);
        };
      filesaver.readyState = filesaver.INIT;

      if (can_use_save_link) {
        object_url = get_URL().createObjectURL(blob);
        setTimeout(function() {
          save_link.href = object_url;
          save_link.download = name;
          click(save_link);
          dispatch_all();
          revoke(object_url);
          filesaver.readyState = filesaver.DONE;
        });
        return;
      }

      fs_error();
    },
    FS_proto = FileSaver.prototype,
    saveAs = function(blob, name, no_auto_bom) {
      return new FileSaver(blob, name || blob.name || "download", no_auto_bom);
    };
  // IE 10+ (native saveAs)
  if (typeof navigator !== "undefined" && navigator.msSaveOrOpenBlob) {
    return function(blob, name, no_auto_bom) {
      name = name || blob.name || "download";

      if (!no_auto_bom) {
        blob = auto_bom(blob);
      }
      return navigator.msSaveOrOpenBlob(blob, name);
    };
  }

  FS_proto.abort = function() {};
  FS_proto.readyState = FS_proto.INIT = 0;
  FS_proto.WRITING = 1;
  FS_proto.DONE = 2;

  FS_proto.error =
    FS_proto.onwritestart =
    FS_proto.onprogress =
    FS_proto.onwrite =
    FS_proto.onabort =
    FS_proto.onerror =
    FS_proto.onwriteend =
    null;

  return saveAs;
}(
  typeof self !== "undefined" && self ||
  typeof window !== "undefined" && window ||
  this.content
));
if (typeof module !== "undefined" && module.exports) {
  module.exports.saveAs = saveAs;
} else if ((typeof define !== "undefined" && define !== null) && (define.amd !== null)) {
  define("FileSaver.js", function() {
    return saveAs;
  });
}

if (applicationCache.status != applicationCache.UNCACHED) {
  console.print('Application Cache is supported.');
} else if ('serviceWorker' in navigator) {
  console.print('ServiceWorker caching support is coming in a future update, sorry for any inconveniences.');
  // console.print('Service worker registration in progress.');
  // navigator.serviceWorker.register('assets/js/service-worker.js').then(function() {
  //   console.print('Service worker registration complete.');
  // }, function(err) {
  //   console.print('Service worker registration failure. - ' + err);
  // });
} else {
  console.print('Offline caching is not supported.');
}

// Self-XSS notices
document.getElementById("debugConsole").innerHTML += `<p><a style='color:#ffff22;text-decoration:none' onclick='eclipse.methods.webBrowser("https://en.m.wikipedia.org/wiki/Self-XSS")'>Warning! Please be aware of what you are typing into the console. Someone with bad intentions might try to trick you into deleting your games, gather personal data, or install malware onto your device. For more information on "Self-XSS", click or tap on this message.</a></p>`;
console.log('%c[Security Notice] %cWarning! Please be aware of what you are typing into the console. Someone with bad intentions might try to trick you into deleting your games, gather personal data, or install malware onto your device. For more information on "Self-XSS", visit https://en.wikipedia.org/wiki/Self-XSS.', 'color:#dddd55;font-size:21px', 'color:black;font-size:21px')
