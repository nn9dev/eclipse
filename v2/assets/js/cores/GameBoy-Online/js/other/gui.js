var currentEmu;
var inFullscreen = false;
var mainCanvas = null;
var fullscreenCanvas = null;
var showAsMinimal = false;
var GBOkeyZones = [
  ["right", [39]],
  ["left", [37]],
  ["up", [38]],
  ["down", [40]],
  ["a", [88, 74]],
  ["b", [90, 81, 89]],
  ["select", [8]],
  ["start", [13]]
];

function windowingInitialize() {
  eclipse.error("windowingInitialize() called.", 0);
  windowStacks[0] = windowCreate("GameBoy", true);
  windowStacks[1] = windowCreate("terminal", false);
  windowStacks[2] = windowCreate("about", false);
  windowStacks[3] = windowCreate("settings", false);
  windowStacks[4] = windowCreate("input_select", false);
  windowStacks[5] = windowCreate("instructions", false);
  windowStacks[6] = windowCreate("local_storage_popup", false);
  windowStacks[7] = windowCreate("local_storage_listing", false);
  windowStacks[8] = windowCreate("freeze_listing", false);
  windowStacks[9] = windowCreate("save_importer", false);
  mainCanvas = document.getElementById("mainCanvas");
  fullscreenCanvas = document.getElementById("fullscreen");
  try {
    //Hook the GUI controls.
    registerGUIEvents();
  } catch (error) {
    eclipse.error("Fatal windowing error: \"" + error.message + "\" file:" + error.fileName + " line: " + error.lineNumber, 2);
  }
  //Update the settings to the emulator's default:
  document.getElementById("enable_sound").checked = settings[0];
  document.getElementById("enable_gbc_bios").checked = settings[1];
  document.getElementById("disable_colors").checked = settings[2];
  document.getElementById("rom_only_override").checked = settings[9];
  document.getElementById("mbc_enable_override").checked = settings[10];
  document.getElementById("enable_colorization").checked = settings[4];
  document.getElementById("do_minimal").checked = showAsMinimal;
  document.getElementById("software_resizing").checked = settings[12];
  document.getElementById("typed_arrays_disallow").checked = settings[5];
  document.getElementById("gb_boot_rom_utilized").checked = settings[11];
  document.getElementById("resize_smoothing").checked = settings[13];
  document.getElementById("channel1").checked = settings[14][0];
  document.getElementById("channel2").checked = settings[14][1];
  document.getElementById("channel3").checked = settings[14][2];
  document.getElementById("channel4").checked = settings[14][3];
}


function registerGUIEvents() {
  // eclipse.error("In registerGUIEvents() : Registering GUI Events.", -1);
  // addEvent("click", document.getElementById("terminal_clear_button"), clear_terminal);
  // addEvent("click", document.getElementById("local_storage_list_refresh_button"), refreshStorageListing);
  // addEvent("click", document.getElementById("terminal_close_button"), function() {
  //   windowStacks[1].hide()
  // });
  // addEvent("click", document.getElementById("about_close_button"), function() {
  //   windowStacks[2].hide()
  // });
  // addEvent("click", document.getElementById("settings_close_button"), function() {
  //   windowStacks[3].hide()
  // });
  // addEvent("click", document.getElementById("input_select_close_button"), function() {
  //   windowStacks[4].hide()
  // });
  // addEvent("click", document.getElementById("instructions_close_button"), function() {
  //   windowStacks[5].hide()
  // });
  // addEvent("click", document.getElementById("local_storage_list_close_button"), function() {
  //   windowStacks[7].hide()
  // });
  // addEvent("click", document.getElementById("local_storage_popup_close_button"), function() {
  //   windowStacks[6].hide()
  // });
  // addEvent("click", document.getElementById("save_importer_close_button"), function() {
  //   windowStacks[9].hide()
  // });
  // addEvent("click", document.getElementById("freeze_list_close_button"), function() {
  //   windowStacks[8].hide()
  // });
  // addEvent("click", document.getElementById("GameBoy_about_menu"), function() {
  //   windowStacks[2].show()
  // });
  // addEvent("click", document.getElementById("GameBoy_settings_menu"), function() {
  //   windowStacks[3].show()
  // });
  // addEvent("click", document.getElementById("local_storage_list_menu"), function() {
  //   refreshStorageListing();
  //   windowStacks[7].show();
  // });
  // addEvent("click", document.getElementById("freeze_list_menu"), function() {
  //   refreshFreezeListing();
  //   windowStacks[8].show();
  // });
  // addEvent("click", document.getElementById("view_importer"), function() {
  //   windowStacks[9].show()
  // });
  addEvent("keydown", document, GkeyDown);
  addEvent("keyup", document, function(event) {
    if (event.keyCode == 27) {
      //Fullscreen on/off
      fullscreenPlayer();
    } else {
      //Control keys / other
      GkeyUp(event);
    }
  });
  Iodine.attachSpeedHandler(function(speed) {});
  // addEvent("MozOrientation", window, GameBoyGyroSignalHandler);
  // addEvent("deviceorientation", window, GameBoyGyroSignalHandler);
  // new popupMenu(document.getElementById("GameBoy_file_menu"), document.getElementById("GameBoy_file_popup"));
  // addEvent("click", document.getElementById("data_uri_clicker"), function() {
  //   var datauri = prompt("Please input the ROM image's Base 64 Encoded Text:", "");
  //   if (datauri != null && datauri.length > 0) {
  //     try {
  //       eclipse.error(Math.floor(datauri.length * 3 / 4) + " bytes of data submitted by form (text length of " + datauri.length + ").", 0);
  //       initPlayer();
  //       start(mainCanvas, base64_decode(datauri));
  //     } catch (error) {
  //       alert(error.message + " file: " + error.fileName + " line: " + error.lineNumber);
  //     }
  //   }
  // });
  // addEvent("click", document.getElementById("set_volume"), function() {
  //   if (GameBoyEmulatorInitialized()) {
  //     var volume = prompt("Set the volume here:", "1.0");
  //     if (volume != null && volume.length > 0) {
  //       settings[3] = Math.min(Math.max(parseFloat(volume), 0), 1);
  //       gameboy.changeVolume();
  //     }
  //   }
  // });
  // addEvent("click", document.getElementById("set_speed"), function() {
  //   if (GameBoyEmulatorInitialized()) {
  //     var speed = prompt("Set the emulator speed here:", "1.0");
  //     if (speed != null && speed.length > 0) {
  //       gameboy.setSpeed(Math.max(parseFloat(speed), 0.001));
  //     }
  //   }
  // });
  // addEvent("click", document.getElementById("internal_file_clicker"), function() {
  //   var file_opener = document.getElementById("local_file_open");
  //   windowStacks[4].show();
  //   file_opener.click();
  // });
  // addEvent("blur", document.getElementById("input_select"), function() {
  //   windowStacks[4].hide();
  // });
  // addEvent("change", document.getElementById("local_file_open"), function() {
  //   windowStacks[4].hide();
  //   if (typeof this.files != "undefined") {
  //     try {
  //       if (this.files.length >= 1) {
  //         eclipse.error("Reading the local file \"" + this.files[0].name + "\"", 0);
  //         try {
  //           //Gecko 1.9.2+ (Standard Method)
  //           var binaryHandle = new FileReader();
  //           binaryHandle.onload = function() {
  //             if (this.readyState == 2) {
  //               eclipse.error("file loaded.", 0);
  //               try {
  //                 initPlayer();
  //                 start(mainCanvas, this.result);
  //               } catch (error) {
  //                 alert(error.message + " file: " + error.fileName + " line: " + error.lineNumber);
  //               }
  //             } else {
  //               eclipse.error("loading file, please wait...", 0);
  //             }
  //           }
  //           binaryHandle.readAsBinaryString(this.files[this.files.length - 1]);
  //         } catch (error) {
  //           eclipse.error("Browser does not support the FileReader object, falling back to the non-standard File object access,", 2);
  //           //Gecko 1.9.0, 1.9.1 (Non-Standard Method)
  //           var romImageString = this.files[this.files.length - 1].getAsBinary();
  //           try {
  //             initPlayer();
  //             start(mainCanvas, romImageString);
  //           } catch (error) {
  //             alert(error.message + " file: " + error.fileName + " line: " + error.lineNumber);
  //           }
  //
  //         }
  //       } else {
  //         eclipse.error("Incorrect number of files selected for local loading.", 1);
  //       }
  //     } catch (error) {
  //       eclipse.error("Could not load in a locally stored ROM file.", 2);
  //     }
  //   } else {
  //     eclipse.error("could not find the handle on the file to open.", 2);
  //   }
  // });
  // addEvent("change", document.getElementById("save_open"), function() {
  //   windowStacks[9].hide();
  //   if (typeof this.files != "undefined") {
  //     try {
  //       if (this.files.length >= 1) {
  //         eclipse.error("Reading the local file \"" + this.files[0].name + "\" for importing.", 0);
  //         try {
  //           //Gecko 1.9.2+ (Standard Method)
  //           var binaryHandle = new FileReader();
  //           binaryHandle.onload = function() {
  //             if (this.readyState == 2) {
  //               eclipse.error("file imported.", 0);
  //               try {
  //                 import_save(this.result);
  //                 refreshStorageListing();
  //               } catch (error) {
  //                 alert(error.message + " file: " + error.fileName + " line: " + error.lineNumber);
  //               }
  //             } else {
  //               eclipse.error("importing file, please wait...", 0);
  //             }
  //           }
  //           binaryHandle.readAsBinaryString(this.files[this.files.length - 1]);
  //         } catch (error) {
  //           eclipse.error("Browser does not support the FileReader object, falling back to the non-standard File object access,", 2);
  //           //Gecko 1.9.0, 1.9.1 (Non-Standard Method)
  //           var romImageString = this.files[this.files.length - 1].getAsBinary();
  //           try {
  //             import_save(romImageString);
  //             refreshStorageListing();
  //           } catch (error) {
  //             alert(error.message + " file: " + error.fileName + " line: " + error.lineNumber);
  //           }
  //
  //         }
  //       } else {
  //         eclipse.error("Incorrect number of files selected for local loading.", 1);
  //       }
  //     } catch (error) {
  //       eclipse.error("Could not load in a locally stored ROM file.", 2);
  //     }
  //   } else {
  //     eclipse.error("could not find the handle on the file to open.", 2);
  //   }
  // });
  // addEvent("click", document.getElementById("restart_cpu_clicker"), function() {
  //   if (GameBoyEmulatorInitialized()) {
  //     try {
  //       if (!gameboy.fromSaveState) {
  //         initPlayer();
  //         start(mainCanvas, gameboy.getROMImage());
  //       } else {
  //         initPlayer();
  //         openState(gameboy.savedStateFileName, mainCanvas);
  //       }
  //     } catch (error) {
  //       alert(error.message + " file: " + error.fileName + " line: " + error.lineNumber);
  //     }
  //   } else {
  //     eclipse.error("Could not restart, as a previous emulation session could not be found.", 1);
  //   }
  // });
  // addEvent("click", document.getElementById("run_cpu_clicker"), function() {
  //   run();
  // });
  // addEvent("click", document.getElementById("kill_cpu_clicker"), function() {
  //   pause();
  // });
  // addEvent("click", document.getElementById("save_state_clicker"), function() {
  //   save();
  // });
  // addEvent("click", document.getElementById("save_SRAM_state_clicker"), function() {
  //   saveSRAM();
  // });
  // addEvent("click", document.getElementById("enable_sound"), function() {
  //   settings[0] = document.getElementById("enable_sound").checked;
  //   if (GameBoyEmulatorInitialized()) {
  //     gameboy.initSound();
  //   }
  // });
  // addEvent("click", document.getElementById("disable_colors"), function() {
  //   settings[2] = document.getElementById("disable_colors").checked;
  // });
  // addEvent("click", document.getElementById("rom_only_override"), function() {
  //   settings[9] = document.getElementById("rom_only_override").checked;
  // });
  // addEvent("click", document.getElementById("mbc_enable_override"), function() {
  //   settings[10] = document.getElementById("mbc_enable_override").checked;
  // });
  // addEvent("click", document.getElementById("enable_gbc_bios"), function() {
  //   settings[1] = document.getElementById("enable_gbc_bios").checked;
  // });
  // addEvent("click", document.getElementById("enable_colorization"), function() {
  //   settings[4] = document.getElementById("enable_colorization").checked;
  // });
  // addEvent("click", document.getElementById("do_minimal"), function() {
  //   showAsMinimal = document.getElementById("do_minimal").checked;
  //   fullscreenCanvas.className = (showAsMinimal) ? "minimum" : "maximum";
  // });
  // addEvent("click", document.getElementById("software_resizing"), function() {
  //   settings[12] = document.getElementById("software_resizing").checked;
  //   if (GameBoyEmulatorInitialized()) {
  //     gameboy.initLCD();
  //   }
  // });
  // addEvent("click", document.getElementById("typed_arrays_disallow"), function() {
  //   settings[5] = document.getElementById("typed_arrays_disallow").checked;
  // });
  // addEvent("click", document.getElementById("gb_boot_rom_utilized"), function() {
  //   settings[11] = document.getElementById("gb_boot_rom_utilized").checked;
  // });
  // addEvent("click", document.getElementById("resize_smoothing"), function() {
  //   settings[13] = document.getElementById("resize_smoothing").checked;
  //   if (GameBoyEmulatorInitialized()) {
  //     gameboy.initLCD();
  //   }
  // });
  // addEvent("click", document.getElementById("channel1"), function() {
  //   settings[14][0] = document.getElementById("channel1").checked;
  // });
  // addEvent("click", document.getElementById("channel2"), function() {
  //   settings[14][1] = document.getElementById("channel2").checked;
  // });
  // addEvent("click", document.getElementById("channel3"), function() {
  //   settings[14][2] = document.getElementById("channel3").checked;
  // });
  // addEvent("click", document.getElementById("channel4"), function() {
  //   settings[14][3] = document.getElementById("channel4").checked;
  // });
  // addEvent("click", document.getElementById("view_fullscreen"), fullscreenPlayer);
  // new popupMenu(document.getElementById("GameBoy_view_menu"), document.getElementById("GameBoy_view_popup"));
  // addEvent("click", document.getElementById("view_terminal"), function() {
  //   windowStacks[1].show()
  // });
  // addEvent("click", document.getElementById("view_instructions"), function() {
  //   windowStacks[5].show()
  // });
  addEvent("mouseup", document.getElementById("gfx"), initNewCanvasSize);
  addEvent("resize", window, initNewCanvasSize);
  addEvent("unload", window, function() {
    autoSave();
  });
}

function GkeyDown(event) {
  if (currentEmu == "GBA") {
    var keyCode = event.keyCode | 0;
  for (var keyMapIndex = 0;
    (keyMapIndex | 0) < 10; keyMapIndex = ((keyMapIndex | 0) + 1) | 0) {
    var keysMapped = keyZones[keyMapIndex | 0];
    var keysTotal = keysMapped.length | 0;
    for (var matchingIndex = 0;
      (matchingIndex | 0) < (keysTotal | 0); matchingIndex = ((matchingIndex | 0) + 1) | 0) {
      if ((keysMapped[matchingIndex | 0] | 0) == (keyCode | 0)) {
        Iodine.keyDown(keyMapIndex | 0);
        //if (e.preventDefault) {
          //e.preventDefault();
        //}
      }
    }
  }
} else {
  var keyCode = event.keyCode;
  var keyMapLength = GBOkeyZones.length;
  for (var keyMapIndex = 0; keyMapIndex < keyMapLength; ++keyMapIndex) {
    var keyCheck = GBOkeyZones[keyMapIndex];
    var keysMapped = keyCheck[1];
    var keysTotal = keysMapped.length;
    for (var index = 0; index < keysTotal; ++index) {
      if (keysMapped[index] == keyCode) {
        GameBoyKeyDown(keyCheck[0]);
        try {
          //event.preventDefault();
        } catch (error) {}
      }
    }
  }
}
}

function GkeyUp(event) {
  if (currentEmu == "GBA") {
    var keyCode = event.keyCode | 0;
  switch (keyCode | 0) {
    case 68:
      lowerVolume();
      break;
    case 82:
      raiseVolume();
      break;
    case 51:
      Iodine.incrementSpeed(0.10);
      break;
    case 52:
      Iodine.incrementSpeed(-0.10);
      break;
    default:
      //Control keys / other
      GBAkeyUp(keyCode);
  }
  } else {
  var keyCode = event.keyCode;
  var keyMapLength = GBOkeyZones.length;
  for (var keyMapIndex = 0; keyMapIndex < keyMapLength; ++keyMapIndex) {
    var keyCheck = GBOkeyZones[keyMapIndex];
    var keysMapped = keyCheck[1];
    var keysTotal = keysMapped.length;
    for (var index = 0; index < keysTotal; ++index) {
      if (keysMapped[index] == keyCode) {
        GameBoyKeyUp(keyCheck[0]);
        try {
          //event.preventDefault();
        } catch (error) {}
      }
    }
  }
}
}

function initPlayer() {
  // document.getElementById("title").style.display = "none";
  // document.getElementById("port_title").style.display = "none";
  // document.getElementById("fullscreenContainer").style.display = "none";
}

function fullscreenPlayer() {
  if (GameBoyEmulatorInitialized()) {
    if (!inFullscreen) {
      gameboy.canvas = fullscreenCanvas;
      fullscreenCanvas.className = (showAsMinimal) ? "minimum" : "maximum";
      document.getElementById("fullscreenContainer").style.display = "block";
      windowStacks[0].hide();
    } else {
      gameboy.canvas = mainCanvas;
      document.getElementById("fullscreenContainer").style.display = "none";
      windowStacks[0].show();
    }
    gameboy.initLCD();
    inFullscreen = !inFullscreen;
  } else {
    eclipse.error("Cannot go into fullscreen mode.", 2);
  }
}

function runFreeze(keyName) {
  try {
    windowStacks[8].hide();
    initPlayer();
    openState(keyName, mainCanvas);
  } catch (error) {
    eclipse.error("A problem with attempting to open the selected save state occurred.", 2);
  }
}
//Wrapper for localStorage getItem, so that data can be retrieved in various types.
function findValue(key) {
  try {
    if (window.localStorage.getItem(key) != null) {
      return JSON.parse(window.localStorage.getItem(key));
    }
  } catch (error) {
    //An older Gecko 1.8.1/1.9.0 method of storage (Deprecated due to the obvious security hole):
    if (window.globalStorage[location.hostname].getItem(key) != null) {
      return JSON.parse(window.globalStorage[location.hostname].getItem(key));
    }
  }
  return null;
}
//Wrapper for localStorage setItem, so that data can be set in various types.
function setValue(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    //An older Gecko 1.8.1/1.9.0 method of storage (Deprecated due to the obvious security hole):
    window.globalStorage[location.hostname].setItem(key, JSON.stringify(value));
  }
}
//Wrapper for localStorage removeItem, so that data can be set in various types.
function deleteValue(key) {
  try {
    window.localStorage.removeItem(key);
  } catch (error) {
    //An older Gecko 1.8.1/1.9.0 method of storage (Deprecated due to the obvious security hole):
    window.globalStorage[location.hostname].removeItem(key);
  }
}

function outputLocalStorageLink(keyName, dataFound, downloadName) {
  return generateDownloadLink("data:application/octet-stream;base64," + dataFound, keyName, downloadName);
}

function refreshFreezeListing() {
  var storageListMasterDivSub = document.getElementById("freezeListingMasterContainerSub");
  var storageListMasterDiv = document.getElementById("freezeListingMasterContainer");
  storageListMasterDiv.removeChild(storageListMasterDivSub);
  storageListMasterDivSub = document.createElement("div");
  storageListMasterDivSub.id = "freezeListingMasterContainerSub";
  var keys = getLocalStorageKeys();
  while (keys.length > 0) {
    key = keys.shift();
    if (key.substring(0, 7) == "FREEZE_") {
      storageListMasterDivSub.appendChild(outputFreezeStateRequestLink(key));
    }
  }
  storageListMasterDiv.appendChild(storageListMasterDivSub);
}

function outputFreezeStateRequestLink(keyName) {
  var linkNode = generateLink("javascript:runFreeze(\"" + keyName + "\")", keyName);
  var storageContainerDiv = document.createElement("div");
  storageContainerDiv.className = "storageListingContainer";
  storageContainerDiv.appendChild(linkNode)
  return storageContainerDiv;
}

function refreshStorageListing() {
  var storageListMasterDivSub = document.getElementById("storageListingMasterContainerSub");
  var storageListMasterDiv = document.getElementById("storageListingMasterContainer");
  storageListMasterDiv.removeChild(storageListMasterDivSub);
  storageListMasterDivSub = document.createElement("div");
  storageListMasterDivSub.id = "storageListingMasterContainerSub";
  var keys = getLocalStorageKeys();
  var blobPairs = [];
  for (var index = 0; index < keys.length; ++index) {
    blobPairs[index] = getBlobPreEncoded(keys[index]);
    storageListMasterDivSub.appendChild(outputLocalStorageRequestLink(keys[index]));
  }
  storageListMasterDiv.appendChild(storageListMasterDivSub);
  var linkToManipulate = document.getElementById("download_local_storage_dba");
  linkToManipulate.href = "data:application/octet-stream;base64," + base64(generateMultiBlob(blobPairs));
  linkToManipulate.download = "gameboy_color_saves.export";
}

function getBlobPreEncoded(keyName) {
  if (keyName.substring(0, 9) == "B64_SRAM_") {
    return [keyName.substring(4), base64_decode(findValue(keyName))];
  } else if (keyName.substring(0, 5) == "SRAM_") {
    return [keyName, convertToBinary(findValue(keyName))];
  } else {
    return [keyName, JSON.stringify(findValue(keyName))];
  }
}

function outputLocalStorageRequestLink(keyName) {
  var linkNode = generateLink("javascript:popupStorageDialog(\"" + keyName + "\")", keyName);
  var storageContainerDiv = document.createElement("div");
  storageContainerDiv.className = "storageListingContainer";
  storageContainerDiv.appendChild(linkNode)
  return storageContainerDiv;
}

function popupStorageDialog(keyName) {
  var subContainer = document.getElementById("storagePopupMasterContainer");
  var parentContainer = document.getElementById("storagePopupMasterParent");
  parentContainer.removeChild(subContainer);
  subContainer = document.createElement("div");
  subContainer.id = "storagePopupMasterContainer";
  parentContainer.appendChild(subContainer);
  var downloadDiv = document.createElement("div");
  downloadDiv.id = "storagePopupDownload";
  if (keyName.substring(0, 9) == "B64_SRAM_") {
    var downloadDiv2 = document.createElement("div");
    downloadDiv2.id = "storagePopupDownloadRAW";
    downloadDiv2.appendChild(outputLocalStorageLink("Download RAW save data.", findValue(keyName), keyName));
    subContainer.appendChild(downloadDiv2);
    downloadDiv.appendChild(outputLocalStorageLink("Download in import compatible format.", base64(generateBlob(keyName.substring(4), base64_decode(findValue(keyName)))), keyName));
  } else if (keyName.substring(0, 5) == "SRAM_") {
    var downloadDiv2 = document.createElement("div");
    downloadDiv2.id = "storagePopupDownloadRAW";
    downloadDiv2.appendChild(outputLocalStorageLink("Download RAW save data.", base64(convertToBinary(findValue(keyName))), keyName));
    subContainer.appendChild(downloadDiv2);
    downloadDiv.appendChild(outputLocalStorageLink("Download in import compatible format.", base64(generateBlob(keyName, convertToBinary(findValue(keyName)))), keyName));
  } else {
    downloadDiv.appendChild(outputLocalStorageLink("Download in import compatible format.", base64(generateBlob(keyName, JSON.stringify(findValue(keyName)))), keyName));
  }
  var deleteLink = generateLink("javascript:deleteStorageSlot(\"" + keyName + "\")", "Delete data item from HTML5 local storage.");
  deleteLink.id = "storagePopupDelete";
  subContainer.appendChild(downloadDiv);
  subContainer.appendChild(deleteLink);
  windowStacks[6].show();
}

function convertToBinary(jsArray) {
  var length = jsArray.length;
  var binString = "";
  for (var indexBin = 0; indexBin < length; indexBin++) {
    binString += String.fromCharCode(jsArray[indexBin]);
  }
  return binString;
}

function deleteStorageSlot(keyName) {
  deleteValue(keyName);
  windowStacks[6].hide();
  refreshStorageListing();
}

function generateLink(address, textData) {
  var link = document.createElement("a");
  link.href = address;
  link.appendChild(document.createTextNode(textData));
  return link;
}

function generateDownloadLink(address, textData, keyName) {
  var link = generateLink(address, textData);
  link.download = keyName + ".sav";
  return link;
}

function checkStorageLength() {
  try {
    return window.localStorage.length;
  } catch (error) {
    //An older Gecko 1.8.1/1.9.0 method of storage (Deprecated due to the obvious security hole):
    return window.globalStorage[location.hostname].length;
  }
}

function getLocalStorageKeys() {
  var storageLength = checkStorageLength();
  var keysFound = [];
  var index = 0;
  var nextKey = null;
  while (index < storageLength) {
    nextKey = findKey(index++);
    if (nextKey !== null && nextKey.length > 0) {
      if (nextKey.substring(0, 5) == "SRAM_" || nextKey.substring(0, 9) == "B64_SRAM_" || nextKey.substring(0, 7) == "FREEZE_" || nextKey.substring(0, 4) == "RTC_") {
        keysFound.push(nextKey);
      }
    } else {
      break;
    }
  }
  return keysFound;
}

function findKey(keyNum) {
  try {
    return window.localStorage.key(keyNum);
  } catch (error) {
    //An older Gecko 1.8.1/1.9.0 method of storage (Deprecated due to the obvious security hole):
    return window.globalStorage[location.hostname].key(keyNum);
  }
  return null;
}
//Some wrappers and extensions for non-DOM3 browsers:
function isDescendantOf(ParentElement, toCheck) {
  if (!ParentElement || !toCheck) {
    return false;
  }
  //Verify an object as either a direct or indirect child to another object.
  function traverseTree(domElement) {
    while (domElement != null) {
      if (domElement.nodeType == 1) {
        if (isSameNode(domElement, toCheck)) {
          return true;
        }
        if (hasChildNodes(domElement)) {
          if (traverseTree(domElement.firstChild)) {
            return true;
          }
        }
      }
      domElement = domElement.nextSibling;
    }
    return false;
  }
  return traverseTree(ParentElement.firstChild);
}

function hasChildNodes(oElement) {
  return (typeof oElement.hasChildNodes == "function") ? oElement.hasChildNodes() : ((oElement.firstChild != null) ? true : false);
}

function isSameNode(oCheck1, oCheck2) {
  return (typeof oCheck1.isSameNode == "function") ? oCheck1.isSameNode(oCheck2) : (oCheck1 === oCheck2);
}

function pageXCoord(event) {
  if (typeof event.pageX == "undefined") {
    return event.clientX + document.documentElement.scrollLeft;
  }
  return event.pageX;
}

function pageYCoord(event) {
  if (typeof event.pageY == "undefined") {
    return event.clientY + document.documentElement.scrollTop;
  }
  return event.pageY;
}

function mouseLeaveVerify(oElement, event) {
  //Hook target element with onmouseout and use this function to verify onmouseleave.
  return isDescendantOf(oElement, (typeof event.target != "undefined") ? event.target : event.srcElement) && !isDescendantOf(oElement, (typeof event.relatedTarget != "undefined") ? event.relatedTarget : event.toElement);
}

function mouseEnterVerify(oElement, event) {
  //Hook target element with onmouseover and use this function to verify onmouseenter.
  return !isDescendantOf(oElement, (typeof event.target != "undefined") ? event.target : event.srcElement) && isDescendantOf(oElement, (typeof event.relatedTarget != "undefined") ? event.relatedTarget : event.fromElement);
}

function addEvent(sEvent, oElement, fListener) {
  try {
    oElement.addEventListener(sEvent, fListener, false);
    //console.debug("In addEvent() : Standard addEventListener() called to add a(n) \"" + sEvent + "\" event.", -1);
  } catch (error) {
    oElement.attachEvent("on" + sEvent, fListener); //Pity for IE.
    //console.debug("In addEvent() : Nonstandard attachEvent() called to add an \"on" + sEvent + "\" event.", -1);
  }
}

function removeEvent(sEvent, oElement, fListener) {
  try {
    oElement.removeEventListener(sEvent, fListener, false);
    //console.debug("In removeEvent() : Standard removeEventListener() called to remove a(n) \"" + sEvent + "\" event.", -1);
  } catch (error) {
    oElement.detachEvent("on" + sEvent, fListener); //Pity for IE.
    //console.debug("In removeEvent() : Nonstandard detachEvent() called to remove an \"on" + sEvent + "\" event.", -1);
  }
}


// Custom Eclipse stuff
var gbEmu = this;

gbEmu.initEmu = function() {



	mainCanvas = document.getElementById("mainCanvas");
	try {
		//Hook the GUI controls.
		registerGUIEvents();
	} catch (error) {
		eclipse.error("Fatal windowing error: \"" + error.message + "\" file:" + error.fileName + " line: " + error.lineNumber, 2);
	}
	//Update the settings to the emulator's default:
	// document.getElementById("enable_sound").checked = settings[0];
	// document.getElementById("enable_gbc_bios").checked = settings[1];
	// document.getElementById("disable_colors").checked = settings[2];
	// document.getElementById("rom_only_override").checked = settings[9];
	// document.getElementById("mbc_enable_override").checked = settings[10];
	// document.getElementById("enable_colorization").checked = settings[4];
	// document.getElementById("do_minimal").checked = showAsMinimal;
	// document.getElementById("software_resizing").checked = settings[12];
	// document.getElementById("typed_arrays_disallow").checked = settings[5];
	// document.getElementById("gb_boot_rom_utilized").checked = settings[11];
	// document.getElementById("resize_smoothing").checked = settings[13];
	// document.getElementById("channel1").checked = settings[14][0];
	// document.getElementById("channel2").checked = settings[14][1];
	// document.getElementById("channel3").checked = settings[14][2];
	// document.getElementById("channel4").checked = settings[14][3];
  eclipse.resizeItems();
}

gbEmu.toggleAudio = function() {
	var audioStatus = localStorage.getItem('audioStatus');
	if (audioStatus == "false") {
		localStorage.setItem('audioStatus', "true");
		settings[3] = Math.min(Math.max(parseFloat(1.0), 0), 1);
		gameboy.changeVolume();
	} else {
		localStorage.setItem('audioStatus', "false");
		settings[3] = Math.min(Math.max(parseFloat(0.0), 0), 1);
		gameboy.changeVolume();
	}
}

gbEmu.setSpeed = function() {
	eclipse.dialog.create({
    title: 'Eclipse',
    text: 'Change Emulation Speed',
    buttons: [
      {
        text: 'Normal',
        onClick: function() {
					gameboy.setSpeed(Math.max(parseFloat(1.0), 0.001));
        },
      },
      {
        text: 'Fast Forward',
        onClick: function() {
					gameboy.setSpeed(Math.max(parseFloat(2.0), 0.001));
        },
      },
    ],
    verticalButtons: true,
  }).open();
}

gbEmu.saveGame = function() {
	saveSRAM();
}

gbEmu.stopEmu = function() {
	gbEmu.saveGame();
	pause();
	document.getElementById('gfx').innerHTML = "<canvas id=\"mainCanvas\" />";
}

gbEmu.loadROMURL = function(link) {
	var self = this;
//  self.updateStatus("Downloading...");
	$.ajax({
			url: link,
			xhr: function() {
					var xhr = $.ajaxSettings.xhr();
					if (typeof xhr.overrideMimeType !== 'undefined') {
							// Download as binary
							xhr.overrideMimeType('text/plain; charset=x-user-defined');
					}
					self.xhr = xhr;
					return xhr;
			},
			complete: function(xhr, status) {
					var i, data;
					data = xhr.responseText;
					console.log(data);
			    try {
		        console.debug(Math.floor(data.length * 3 / 4) + " bytes of data submitted by form (text length of " + data.length + ").", 0);
		        initPlayer();
		        start(mainCanvas, data);
            gameboy.initSound();
						var audioStatus = localStorage.getItem('audioStatus');
						if (audioStatus == "false") {
							settings[3] = Math.min(Math.max(parseFloat(0.0), 0), 1);
							gameboy.changeVolume();
						} else {
							settings[3] = Math.min(Math.max(parseFloat(1.0), 0), 1);
							gameboy.changeVolume();
						}
		      } catch (error) {
		        alert(error.message);
		      }
			}
	});
}

gbEmu.uploadROM = function(file) {
  if (typeof file.files != "undefined") {
    try {
      if (file.files.length >= 1) {
        console.debug("Reading the local file \"" + file.files[0].name + "\"", 0);
        try {
          //Gecko 1.9.2+ (Standard Method)
          var binaryHandle = new FileReader();
          binaryHandle.onload = function() {
            if (this.readyState == 2) {
              console.debug("file loaded.", 0);
              try {
                initPlayer();
                start(mainCanvas, this.result);
								var audioStatus = localStorage.getItem('audioStatus');
								if (audioStatus == "false") {
									settings[3] = Math.min(Math.max(parseFloat(0.0), 0), 1);
									gameboy.changeVolume();
								} else {
									settings[3] = Math.min(Math.max(parseFloat(1.0), 0), 1);
									gameboy.changeVolume();
								}
              } catch (error) {
                alert(error.message + " file: " + error.fileName + " line: " + error.lineNumber);
              }
            } else {
              console.debug("loading file, please wait...", 0);
            }
          }
          binaryHandle.readAsBinaryString(file.files[file.files.length - 1]);
        } catch (error) {
          eclipse.error("Browser does not support the FileReader object, falling back to the non-standard File object access,", 2);
          //Gecko 1.9.0, 1.9.1 (Non-Standard Method)
          var romImageString = file.files[file.files.length - 1].getAsBinary();
          try {
            initPlayer();
            start(mainCanvas, romImageString);
						var audioStatus = localStorage.getItem('audioStatus');
						if (audioStatus == "false") {
							settings[3] = Math.min(Math.max(parseFloat(0.0), 0), 1);
							gameboy.changeVolume();
						} else {
							settings[3] = Math.min(Math.max(parseFloat(1.0), 0), 1);
							gameboy.changeVolume();
						}
          } catch (error) {
            alert(error.message + " file: " + error.fileName + " line: " + error.lineNumber);
          }
        }
      } else {
        eclipse.error("Incorrect number of files selected for local loading.", 1);
      }
    } catch (error) {
      eclipse.error("Could not load in a locally stored ROM file.", 2);
    }
  } else {
    eclipse.error("could not find the handle on the file to open.", 2);
  }
}
