"use strict";
/*
 Copyright (C) 2012-2013 Grant Galitz

 Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
/*
Audio
*/


function GlueCodeMixer() {
  var parentObj = this;
  this.audio = new XAudioServer(2, this.sampleRate, 0, this.bufferAmount, null, 1, function() {
    //Disable audio in the callback here:
    parentObj.disableAudio();
  });
  this.outputUnits = [];
  this.outputUnitsValid = [];
  setInterval(function() {
    parentObj.checkAudio();
  }, 16);
  this.initializeBuffer();
}
GlueCodeMixer.prototype.sampleRate = 44100;
GlueCodeMixer.prototype.bufferAmount = 44100;
GlueCodeMixer.prototype.channelCount = 2;
GlueCodeMixer.prototype.initializeBuffer = function() {
  this.buffer = new AudioSimpleBuffer(this.channelCount,
    this.bufferAmount);
}
GlueCodeMixer.prototype.appendInput = function(inUnit) {
  if (this.audio) {
    for (var index = 0; index < this.outputUnits.length; index++) {
      if (!this.outputUnits[index]) {
        break;
      }
    }
    this.outputUnits[index] = inUnit;
    this.outputUnitsValid.push(inUnit);
    inUnit.registerStackPosition(index);
  } else if (typeof inUnit.errorCallback == "function") {
    inUnit.errorCallback();
  }
}
GlueCodeMixer.prototype.unregister = function(stackPosition) {
  this.outputUnits[stackPosition] = null;
  this.outputUnitsValid = [];
  for (var index = 0, length = this.outputUnits.length; index < length; ++index) {
    if (this.outputUnits[index]) {
      this.outputUnitsValid.push(this.outputUnits);
    }
  }
}
GlueCodeMixer.prototype.checkAudio = function() {
  if (this.audio) {
    var inputCount = this.outputUnitsValid.length;
    for (var inputIndex = 0, output = 0; inputIndex < inputCount; ++inputIndex) {
      this.outputUnitsValid[inputIndex].prepareShift();
    }
    for (var count = 0, requested = this.findLowestBufferCount(); count < requested; ++count) {
      for (var inputIndex = 0, output = 0; inputIndex < inputCount; ++inputIndex) {
        output += this.outputUnitsValid[inputIndex].shift();
      }
      this.buffer.push(output);
    }
    this.audio.writeAudioNoCallback(this.buffer.getSlice());
  }
}
GlueCodeMixer.prototype.findLowestBufferCount = function() {
  var count = 0;
  for (var inputIndex = 0, inputCount = this.outputUnitsValid.length; inputIndex < inputCount; ++inputIndex) {
    var tempCount = this.outputUnitsValid[inputIndex].buffer.remainingBuffer();
    if (tempCount > 0) {
      if (count > 0) {
        count = Math.min(count, tempCount);
      } else {
        count = tempCount;
      }
    }
  }
  return count;
}
GlueCodeMixer.prototype.disableAudio = function() {
  this.audio = null;
}

function GlueCodeMixerInput(mixer) {
  this.mixer = mixer;
}
GlueCodeMixerInput.prototype.initialize = function(channelCount, sampleRate, bufferAmount, startingVolume, errorCallback) {
  this.channelCount = channelCount;
  this.sampleRate = sampleRate;
  this.bufferAmount = bufferAmount;
  this.volume = startingVolume;
  this.errorCallback = errorCallback;
  this.buffer = new AudioBufferWrapper(this.channelCount,
    this.mixer.channelCount,
    this.bufferAmount,
    this.sampleRate,
    this.mixer.sampleRate);

}
GlueCodeMixerInput.prototype.register = function(volume) {
  this.mixer.appendInput(this);
}
GlueCodeMixerInput.prototype.changeVolume = function(volume) {
  this.volume = volume;
}
GlueCodeMixerInput.prototype.prepareShift = function() {
  this.buffer.resampleRefill();
}
GlueCodeMixerInput.prototype.shift = function() {
  return this.buffer.shift() * this.volume;
}
GlueCodeMixerInput.prototype.push = function(buffer) {
  this.buffer.push(buffer);
  this.mixer.checkAudio();
}
GlueCodeMixerInput.prototype.remainingBuffer = function() {
  return this.buffer.remainingBuffer() + (Math.floor((this.mixer.audio.remainingBuffer() * this.sampleRate / this.mixer.sampleRate) / this.mixer.channelCount) * this.mixer.channelCount);
}
GlueCodeMixerInput.prototype.registerStackPosition = function(stackPosition) {
  this.stackPosition = stackPosition;
}
GlueCodeMixerInput.prototype.unregister = function() {
  this.mixer.unregister(this.stackPosition);
}

function AudioBufferWrapper(channelCount,
  mixerChannelCount,
  bufferAmount,
  sampleRate,
  mixerSampleRate) {
  this.channelCount = channelCount;
  this.mixerChannelCount = mixerChannelCount;
  this.bufferAmount = bufferAmount;
  this.sampleRate = sampleRate;
  this.mixerSampleRate = mixerSampleRate;
  this.initialize();
}
AudioBufferWrapper.prototype.initialize = function() {
  this.inBufferSize = this.bufferAmount * this.mixerChannelCount;
  this.inBuffer = getFloat32Array(this.inBufferSize);
  this.outBufferSize = (Math.ceil(this.inBufferSize * this.mixerSampleRate / this.sampleRate / this.mixerChannelCount) * this.mixerChannelCount) + this.mixerChannelCount;
  this.outBuffer = getFloat32Array(this.outBufferSize);
  this.resampler = new Resampler(this.sampleRate, this.mixerSampleRate, this.mixerChannelCount, this.outBufferSize, true);
  this.inputOffset = 0;
  this.resampleBufferStart = 0;
  this.resampleBufferEnd = 0;
}
AudioBufferWrapper.prototype.push = function(buffer) {
  var length = buffer.length;
  if (this.channelCount < this.mixerChannelCount) {
    for (var bufferCounter = 0; bufferCounter < length && this.inputOffset < this.inBufferSize;) {
      for (var index = this.channelCount; index < this.mixerChannelCount; ++index) {
        this.inBuffer[this.inputOffset++] = buffer[bufferCounter];
      }
      for (index = 0; index < this.channelCount && bufferCounter < length; ++index) {
        this.inBuffer[this.inputOffset++] = buffer[bufferCounter++];
      }
    }
  } else if (this.channelCount == this.mixerChannelCount) {
    for (var bufferCounter = 0; bufferCounter < length && this.inputOffset < this.inBufferSize;) {
      this.inBuffer[this.inputOffset++] = buffer[bufferCounter++];
    }
  } else {
    for (var bufferCounter = 0; bufferCounter < length && this.inputOffset < this.inBufferSize;) {
      for (index = 0; index < this.mixerChannelCount && bufferCounter < length; ++index) {
        this.inBuffer[this.inputOffset++] = buffer[bufferCounter++];
      }
      bufferCounter += this.channelCount - this.mixerChannelCount;
    }
  }
}
AudioBufferWrapper.prototype.shift = function() {
  var output = 0;
  if (this.resampleBufferStart != this.resampleBufferEnd) {
    output = this.outBuffer[this.resampleBufferStart++];
    if (this.resampleBufferStart == this.outBufferSize) {
      this.resampleBufferStart = 0;
    }
  }
  return output;
}
AudioBufferWrapper.prototype.resampleRefill = function() {
  if (this.inputOffset > 0) {
    //Resample a chunk of audio:
    var resampleLength = this.resampler.resampler(this.getSlice(this.inBuffer, this.inputOffset));
    var resampledResult = this.resampler.outputBuffer;
    for (var index2 = 0; index2 < resampleLength;) {
      this.outBuffer[this.resampleBufferEnd++] = resampledResult[index2++];
      if (this.resampleBufferEnd == this.outBufferSize) {
        this.resampleBufferEnd = 0;
      }
      if (this.resampleBufferStart == this.resampleBufferEnd) {
        this.resampleBufferStart += this.mixerChannelCount;
        if (this.resampleBufferStart == this.outBufferSize) {
          this.resampleBufferStart = 0;
        }
      }
    }
    this.inputOffset = 0;
  }
}
AudioBufferWrapper.prototype.remainingBuffer = function() {
  return (Math.floor((this.resampledSamplesLeft() * this.resampler.ratioWeight) / this.mixerChannelCount) * this.mixerChannelCount) + this.inputOffset;
}
AudioBufferWrapper.prototype.resampledSamplesLeft = function() {
  return ((this.resampleBufferStart <= this.resampleBufferEnd) ? 0 : this.outBufferSize) + this.resampleBufferEnd - this.resampleBufferStart;
}
AudioBufferWrapper.prototype.getSlice = function(buffer, lengthOf) {
  //Typed array and normal array buffer section referencing:
  try {
    return buffer.subarray(0, lengthOf);
  } catch (error) {
    try {
      //Regular array pass:
      buffer.length = lengthOf;
      return buffer;
    } catch (error) {
      //Nightly Firefox 4 used to have the subarray function named as slice:
      return buffer.slice(0, lengthOf);
    }
  }
}

function AudioSimpleBuffer(channelCount, bufferAmount) {
  this.channelCount = channelCount;
  this.bufferAmount = bufferAmount;
  this.outBufferSize = this.channelCount * this.bufferAmount;
  this.stackLength = 0;
  this.buffer = getFloat32Array(this.outBufferSize);
}
AudioSimpleBuffer.prototype.push = function(data) {
  if (this.stackLength < this.outBufferSize) {
    this.buffer[this.stackLength++] = data;
  }
}
AudioSimpleBuffer.prototype.getSlice = function() {
  var lengthOf = this.stackLength;
  this.stackLength = 0;
  //Typed array and normal array buffer section referencing:
  try {
    return this.buffer.subarray(0, lengthOf);
  } catch (error) {
    try {
      //Regular array pass:
      this.buffer.length = lengthOf;
      return this.buffer;
    } catch (error) {
      //Nightly Firefox 4 used to have the subarray function named as slice:
      return this.buffer.slice(0, lengthOf);
    }
  }
}


/*
Graphics
*/


function GlueCodeGfx() {
  this.didRAF = false; //Set when rAF has been used.
  this.graphicsFound = 0; //Do we have graphics output sink found yet?
  this.offscreenWidth = 240; //Width of the GBA screen.
  this.offscreenHeight = 160; //Height of the GBA screen.
  this.doSmoothing = true;
  //Cache some frame buffer lengths:
  var offscreenRGBCount = this.offscreenWidth * this.offscreenHeight * 3;
  this.swizzledFrameFree = [getUint8Array(offscreenRGBCount), getUint8Array(offscreenRGBCount)];
  this.swizzledFrameReady = [];
  this.initializeGraphicsBuffer(); //Pre-set the swizzled buffer for first frame.
}
GlueCodeGfx.prototype.attachCanvas = function(canvas) {
  this.canvas = canvas;
  this.graphicsFound = this.initializeCanvasTarget();
  this.setSmoothScaling(this.doSmoothing);
}
GlueCodeGfx.prototype.detachCanvas = function() {
  this.canvas = null;
}
GlueCodeGfx.prototype.recomputeDimension = function() {
  //Cache some dimension info:
  this.canvasLastWidth = this.canvas.clientWidth;
  this.canvasLastHeight = this.canvas.clientHeight;
  if (window.mozRequestAnimationFrame) { //Sniff out firefox for selecting this path.
    //Set target as unscaled:
    this.onscreenWidth = this.canvas.width = this.offscreenWidth;
    this.onscreenHeight = this.canvas.height = this.offscreenHeight;
  } else {
    //Set target canvas as scaled:
    this.onscreenWidth = this.canvas.width = this.canvas.clientWidth;
    this.onscreenHeight = this.canvas.height = this.canvas.clientHeight;
  }
}
GlueCodeGfx.prototype.initializeCanvasTarget = function() {
  try {
    //Obtain dimensional information:
    this.recomputeDimension();
    //Get handles on the canvases:
    this.canvasOffscreen = document.createElement("canvas");
    this.canvasOffscreen.width = this.offscreenWidth;
    this.canvasOffscreen.height = this.offscreenHeight;
    this.drawContextOffscreen = this.canvasOffscreen.getContext("2d");
    this.drawContextOnscreen = this.canvas.getContext("2d");
    //Get a CanvasPixelArray buffer:
    this.canvasBuffer = this.getBuffer(this.drawContextOffscreen, this.offscreenWidth, this.offscreenHeight);
    //Initialize Alpha Channel:
    this.initializeAlpha(this.canvasBuffer.data);
    //Draw swizzled buffer out as a test:
    this.requestDraw();
    this.checkRAF();
    //Success:
    return true;
  } catch (error) {
    //Failure:
    return false;
  }
}
GlueCodeGfx.prototype.setSmoothScaling = function(doSmoothing) {
  this.doSmoothing = doSmoothing;
  if (this.graphicsFound) {
    this.canvas.setAttribute("style", (this.canvas.getAttribute("style") || "") + "; image-rendering: " + ((doSmoothing) ? "auto" : "-webkit-optimize-contrast") + ";" +
      "image-rendering: " + ((doSmoothing) ? "optimizeQuality" : "-o-crisp-edges") + ";" +
      "image-rendering: " + ((doSmoothing) ? "optimizeQuality" : "-moz-crisp-edges") + ";" +
      "-ms-interpolation-mode: " + ((doSmoothing) ? "bicubic" : "nearest-neighbor") + ";");
    this.drawContextOnscreen.mozImageSmoothingEnabled = doSmoothing;
    this.drawContextOnscreen.webkitImageSmoothingEnabled = doSmoothing;
    this.drawContextOnscreen.imageSmoothingEnabled = doSmoothing;
  }
}
GlueCodeGfx.prototype.initializeAlpha = function(canvasData) {
  var length = canvasData.length;
  for (var indexGFXIterate = 3; indexGFXIterate < length; indexGFXIterate += 4) {
    canvasData[indexGFXIterate] = 0xFF;
  }
}
GlueCodeGfx.prototype.getBuffer = function(canvasContext, width, height) {
  //Get a CanvasPixelArray buffer:
  var buffer = null;
  try {
    buffer = this.drawContextOffscreen.createImageData(width, height);
  } catch (error) {
    buffer = this.drawContextOffscreen.getImageData(0, 0, width, height);
  }
  return buffer;
}
GlueCodeGfx.prototype.copyBuffer = function(buffer) {
  if (this.graphicsFound) {
    if (this.swizzledFrameFree.length == 0) {
      if (this.didRAF) {
        this.requestDrawSingle();
      } else {
        this.swizzledFrameFree.push(this.swizzledFrameReady.shift());
      }
    }
    var swizzledFrame = this.swizzledFrameFree.shift();
    var length = swizzledFrame.length;
    if (buffer.buffer) {
      swizzledFrame.set(buffer);
    } else {
      for (var bufferIndex = 0; bufferIndex < length; ++bufferIndex) {
        swizzledFrame[bufferIndex] = buffer[bufferIndex];
      }
    }
    this.swizzledFrameReady.push(swizzledFrame);
    if (!window.requestAnimationFrame) {
      this.requestDraw();
    } else if (!this.didRAF) {
      //Prime RAF draw:
      var parentObj = this;
      window.requestAnimationFrame(function() {
        if (parentObj.canvas) {
          parentObj.requestRAFDraw();
        }
      });
    }
  }
}
GlueCodeGfx.prototype.requestRAFDraw = function() {
  this.didRAF = true;
  this.requestDraw();
}
GlueCodeGfx.prototype.requestDrawSingle = function() {
  if (this.swizzledFrameReady.length > 0) {
    var canvasData = this.canvasBuffer.data;
    var bufferIndex = 0;
    var swizzledFrame = this.swizzledFrameReady.shift();
    var length = canvasData.length;
    for (var canvasIndex = 0; canvasIndex < length; ++canvasIndex) {
      canvasData[canvasIndex++] = swizzledFrame[bufferIndex++];
      canvasData[canvasIndex++] = swizzledFrame[bufferIndex++];
      canvasData[canvasIndex++] = swizzledFrame[bufferIndex++];
    }
    this.swizzledFrameFree.push(swizzledFrame);
    this.graphicsBlit();
  }
}
GlueCodeGfx.prototype.requestDraw = function() {
  this.requestDrawSingle();
  if (this.didRAF) {
    var parentObj = this;
    window.requestAnimationFrame(function() {
      if (parentObj.canvas) {
        parentObj.requestDraw();
      }
    });
  }
}
GlueCodeGfx.prototype.graphicsBlit = function() {
  if (this.canvasLastWidth != this.canvas.clientWidth || this.canvasLastHeight != this.canvas.clientHeight) {
    this.recomputeDimension();
    this.setSmoothScaling(this.doSmoothing);
  }
  if (this.offscreenWidth == this.onscreenWidth && this.offscreenHeight == this.onscreenHeight) {
    //Canvas does not need to scale, draw directly to final:
    this.drawContextOnscreen.putImageData(this.canvasBuffer, 0, 0);
  } else {
    //Canvas needs to scale, draw to offscreen first:
    this.drawContextOffscreen.putImageData(this.canvasBuffer, 0, 0);
    //Scale offscreen canvas image onto the final:
    this.drawContextOnscreen.drawImage(this.canvasOffscreen, 0, 0, this.onscreenWidth, this.onscreenHeight);
  }
}
GlueCodeGfx.prototype.initializeGraphicsBuffer = function() {
  //Initialize the first frame to a white screen:
  var swizzledFrame = this.swizzledFrameFree.shift();
  var length = swizzledFrame.length;
  for (var bufferIndex = 0; bufferIndex < length; ++bufferIndex) {
    swizzledFrame[bufferIndex] = 0xF8;
  }
  this.swizzledFrameReady.push(swizzledFrame);
}
GlueCodeGfx.prototype.checkRAF = function() {
  window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
}


/*
Joy Pad
*/


var keyZones = [
  //Use this to control the key mapping:
  //A:
  [88, 74],
  //B:
  [90, 81, 89],
  //Select:
  [16],
  //Start:
  [13],
  //Right:
  [39],
  //Left:
  [37],
  //Up:
  [38],
  //Down:
  [40],
  //R:
  [50],
  //L:
  [49]
];

function GBAkeyUp(keyCode) {
  keyCode = keyCode | 0;
  for (var keyMapIndex = 0;
    (keyMapIndex | 0) < 10; keyMapIndex = ((keyMapIndex | 0) + 1) | 0) {
    var keysMapped = keyZones[keyMapIndex | 0];
    var keysTotal = keysMapped.length | 0;
    for (var matchingIndex = 0;
      (matchingIndex | 0) < (keysTotal | 0); matchingIndex = ((matchingIndex | 0) + 1) | 0) {
      if ((keysMapped[matchingIndex | 0] | 0) == (keyCode | 0)) {
        Iodine.keyUp(keyMapIndex | 0);
      }
    }
  }
}

/*
ROM Load
*/


function attachBIOS(BIOS) {
  try {
    Iodine.attachBIOS(new Uint8Array(BIOS));
  } catch (error) {
    Iodine.attachBIOS(BIOS);
  }
}

function attachROM(ROM) {
  try {
    Iodine.attachROM(new Uint8Array(ROM));
  } catch (error) {
    Iodine.attachROM(ROM);
  }
}

function fileLoadShimCode(file, attachHandler) {
  if (typeof files != "undefined") {
    if (file.files.length >= 1) {
      //Gecko 1.9.2+ (Standard Method)
      try {
        var binaryHandle = new FileReader();
        binaryHandle.onloadend = function() {
          attachHandler(this.result);
        }
        binaryHandle.readAsArrayBuffer(file.files[file.files.length - 1]);
      } catch (error) {
        try {
          var result = file.files[file.files.length - 1].getAsBinary();
          var resultConverted = [];
          for (var index = 0; index < result.length; ++index) {
            resultConverted[index] = result.charCodeAt(index) & 0xFF;
          }
          attachHandler(resultConverted);
        } catch (error) {
          alert("Could not load the processed ROM file!");
        }
      }
    }
  }
}

function fileLoadBIOS() {
  fileLoadShimCode(this.files, attachBIOS);
}

function fileLoadROM(file) {
  fileLoadShimCode(file, attachROM);
}

function downloadFile(fileName, registrationHandler) {
  var ajax = new XMLHttpRequest();
  ajax.onload = registrationHandler;
  ajax.open("GET", fileName, true);
  ajax.responseType = "arraybuffer";
  ajax.overrideMimeType("text/plain; charset=x-user-defined");
  ajax.send(null);
  ajax.onreadystatechange = function() {
    if (ajax.readyState === XMLHttpRequest.DONE) {
      if (ajax.status === 404) {
        eclipse.dialog.alert("An error occured (" + ajax.status + ")")
      }
      eclipse.methods.log("ROM downloaded with HTTP status " + ajax.status);
    }
  }
}

function processDownload(parentObj, attachHandler) {
  try {
    attachHandler(new Uint8Array(parentObj.response));
  } catch (error) {
    var data = parentObj.responseText;
    var length = data.length;
    var dataArray = [];
    for (var index = 0; index < length; index++) {
      dataArray[index] = data.charCodeAt(index) & 0xFF;
    }
    attachHandler(dataArray);
  }
}


/*
Saves
*/


function ImportSaveCallback(name) {
  try {
    var save = findValue("SAVE_" + name);
    if (save != null) {
      writeRedTemporaryText("Loaded save");
      console.log(name)
      return base64ToArray(save);
    } else {
      console.log("Save not loaded");
    }
  } catch (error) {
    alert("Could not read save: " + error.message);
  }
  return null;
}

function ExportSave() {
  Iodine.exportSave();
  // writeRedTemporaryText("Game Saved");
}

function ExportSaveCallback(name, save) {
  console.log(name + save);

  if (name != "") {
    try {
      setValue("SAVE_" + name, arrayToBase64(save));
    } catch (error) {
      alert("Could not store save: " + error.message);
    }
  }
}

function registerSaveHandlers() {
  Iodine.attachSaveExportHandler(ExportSaveCallback);
  Iodine.attachSaveImportHandler(ImportSaveCallback);
}
//Wrapper for localStorage getItem, so that data can be retrieved in various types.
function findValue(key) {
  try {
    if (localStorage.getItem(key) != null) {
      return JSON.parse(localStorage.getItem(key));
      console.log(JSON.parse(localStorage.getItem(key)));
    }
  } catch (error) {
    //An older Gecko 1.8.1/1.9.0 method of storage (Deprecated due to the obvious security hole):
    if (globalStorage[location.hostname].getItem(key) != null) {
      return JSON.parse(globalStorage[location.hostname].getItem(key));
    }
  }
  return null;
}
//Wrapper for localStorage setItem, so that data can be set in various types.
function setValue(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    console.log(key + " - " + value)
  } catch (error) {
    //An older Gecko 1.8.1/1.9.0 method of storage (Deprecated due to the obvious security hole):
    globalStorage[location.hostname].setItem(key, JSON.stringify(value));
  }
}
//Wrapper for localStorage removeItem, so that data can be set in various types.
function deleteValue(key) {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    //An older Gecko 1.8.1/1.9.0 method of storage (Deprecated due to the obvious security hole):
    globalStorage[location.hostname].removeItem(key);
  }
}



/*
Core
*/


var Iodine = null;
var Blitter = null;
var Mixer = null;
var MixerInput = null;
var timerID = null;

function registerBlitterHandler() {
  Blitter = new GlueCodeGfx();
  Blitter.attachCanvas(document.getElementById("gbaScreen"));
  Blitter.setSmoothScaling(false);
  Iodine.attachGraphicsFrameHandler(function(buffer) {
    Blitter.copyBuffer(buffer);
  });
}

function loadIodineCoreGlue(url) {
  // Initialize Iodine:
  Iodine = new GameBoyAdvanceEmulator();
  // Initialize the graphics:
  registerBlitterHandler();
  // Initialize the audio:
  registerAudioHandler();
  // Register the save handler callbacks:
  registerSaveHandlers();
  // Hook the GUI controls.
  // registerGUIEvents();
  // Enable Sound:
  Iodine.enableAudio();
  // Download BIOS & ROM, then hide the preloader.
  downloadBIOS(function(){downloadROM(url, function(){setTimeout(function(){eclipse.preloader.hide()},1500)})});
}

function downloadBIOS() {
  downloadFile("assets/binaries/gba_bios.bin", registerBIOS);
}

function registerBIOS() {
  processDownload(this, attachBIOS);
}

function downloadROM(url) {
  Iodine.pause();
  showTempString("Downloading ROM");
  downloadFile(url, registerROM);
  callbackFunc();
}

function registerROM() {
  clearTempString();
  processDownload(this, attachROM);
  var audioStatus = localStorage.getItem('audioStatus');
  if (audioStatus == "false") {
    Iodine.disableAudio();
  } else {
    Iodine.enableAudio();
  }
  Iodine.play();
}

function registerAudioHandler() {
  Mixer = new GlueCodeMixer();
  MixerInput = new GlueCodeMixerInput(Mixer);
  Iodine.attachAudioHandler(MixerInput);
}

function lowerVolume() {
  Iodine.incrementVolume(-0.04);
}

function raiseVolume() {
  Iodine.incrementVolume(0.04);
}

function writeRedTemporaryText(textString) {
  if (timerID) {
    clearTimeout(timerID);
  }
  showTempString(textString);
  timerID = setTimeout(clearTempString, 5000);
}

function showTempString(textString) {
  document.getElementById("tempMessage").style.display = "block";
  document.getElementById("tempMessage").textContent = textString;
}

function clearTempString() {
  document.getElementById("tempMessage").style.display = "none";
}
//Some wrappers and extensions for non-DOM3 browsers:
function addEvent(sEvent, oElement, fListener) {
  try {
    oElement.addEventListener(sEvent, fListener, false);
  } catch (error) {
    oElement.attachEvent("on" + sEvent, fListener); //Pity for IE.
  }
}

function removeEvent(sEvent, oElement, fListener) {
  try {
    oElement.removeEventListener(sEvent, fListener, false);
  } catch (error) {
    oElement.detachEvent("on" + sEvent, fListener); //Pity for IE.
  }
}

function setupAudio() {
  localStorage.setItem('audioStatus', "true");
}

eclipse.gbaToggleEmulationAudio = function() {
  var audioStatus = localStorage.getItem('audioStatus');
  if (audioStatus == "false") {
    localStorage.setItem('audioStatus', "true");
    Iodine.enableAudio();
  } else {
    localStorage.setItem('audioStatus', "false");
    Iodine.disableAudio();
  }
}

eclipse.gbaSpeed = function() {
  eclipse.dialog.create({
    title: 'Eclipse',
    text: 'Change Emulation Speed',
    buttons: [
      {
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
}

function closeEmulator() {
  Iodine.stop();
  keyZones = [];
  iGBA.closeModal('.popup-load');
}

function setupAutoSave() {
  localStorage.setItem('autoSave', "true");
}

function toggleAutoSave() {
  var audioStatus = localStorage.getItem('autoSave');
  if (audioStatus == "false") {
    localStorage.setItem('autoSave', "true");
    setInterval(function() {
      ExportSave();
    }, 60 * 1000);
  } else {
    localStorage.setItem('autoSave', "false");
    setInterval(function() {
      ExportSave();
    }, 60 * 1000);
  }
}


// Text here
// Text here
// Text here
// Text here
// Text here
// Text here
// Text here
// Text here
