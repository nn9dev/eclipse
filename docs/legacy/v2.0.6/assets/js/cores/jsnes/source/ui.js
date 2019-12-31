/*
JSNES, based on Jamie Sanders' vNES
Copyright (C) 2010 Ben Firshman

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

JSNES.DummyUI = function(nes) {
  this.nes = nes;
  this.enable = function() {};
  //  this.updateStatus = function() {};
  this.writeAudio = function() {};
  this.writeFrame = function() {};
};

if (typeof jQuery !== 'undefined') {
  (function($) {
    $.fn.JSNESUI = function(roms) {
      var parent = this;
      var buf = null;
      var buf8 = null;
      var buf32 = null;
      var UI = function(nes) {
        var self = this;
        self.nes = nes;

        /*
         * Create UI
         */
        document.getElementById("emu_gfx").innerHTML = "";
        self.root = $('<span></span>');

        self.screen = $('<canvas id="emu_screen_canvas" width="256" height="240"></canvas>').appendTo(self.root);
        if (!self.screen[0].getContext) {
          parent.html("Your browser doesn't support the <code>&lt;canvas&gt;</code> tag. Try Google Chrome, Safari, Opera or Firefox!");
          return;
        }
        self.romContainer = $('<div class="nes-roms" style="display:none;"></div>').appendTo(self.root);
        self.romSelect = $('<select></select>').appendTo(self.romContainer);
        self.controls = $('<div class="nes-controls" style="display:none;"></div>').appendTo(self.root);
        var audioStatus = localStorage.getItem('audioStatus');
        if (audioStatus == "false") {
          self.nes.opts.emulateSound = false;
          var soundButton = '<input type="button" value="enable sound" id="toggle-nes-sound" class="nes-enablesound">';
        } else {
          self.nes.opts.emulateSound = true;
          var soundButton = '<input type="button" value="disable sound" id="toggle-nes-sound" class="nes-enablesound">';
        }
        self.buttons = {
          pause: $('<input type="button" value="pause" id="pause-nes-button" class="nes-pause">').appendTo(self.controls),
          restart: $('<input type="button" value="restart" id="restart-nes-button" class="nes-restart">').appendTo(self.controls),
          sound: $(soundButton).appendTo(self.controls),
          zoom: $('<input type="button" value="zoom in" class="nes-zoom">').appendTo(self.controls)
        };
        // Don't blur the screen when resized
        self.screen[0].style.imageRendering = "-moz-crisp-edges";
        self.screen[0].style.imageRendering = "pixelated";
        // self.status = $('<p class="nes-status">Booting up...</p>').appendTo(self.root);
        console.log(self.root);
        self.root.appendTo(document.getElementById("emu_gfx"));
        /*
         * ROM loading
         */
        self.romSelect.change(function() {
          self.loadROM(url);
        });

        /*
         * Buttons
         */
        self.buttons.pause.click(function() {
          if (self.nes.isRunning) {
            self.nes.stop();
            //  self.updateStatus("Paused");
            self.buttons.pause.attr("value", "resume");
          } else {
            self.nes.start();
            self.buttons.pause.attr("value", "pause");
          }
        });

        self.buttons.restart.click(function() {
          self.nes.reloadRom();
          self.nes.start();
        });

        self.buttons.sound.click(function() {
          if (localStorage.getItem('audioStatus') == "true") {
            self.nes.opts.emulateSound = false;
            localStorage.setItem('audioStatus', "false");
            self.buttons.sound.attr("value", "enable sound");
          } else {
            self.nes.opts.emulateSound = true;
            localStorage.setItem('audioStatus', "true");
            self.buttons.sound.attr("value", "disable sound");
          }
        });

        self.zoomed = false;
        self.buttons.zoom.ready(function() {
          // if (self.zoomed) {
          //   self.screen.animate({
          //     width: '100%',
          //     height: '100%'
          //   });
          //   self.buttons.zoom.attr("value", "zoom in");
          //   self.zoomed = false;
          // } else {
          //   self.screen.animate({
          //     width: '100%',
          //     height: '100%'
          //   });
          //   self.buttons.zoom.attr("value", "zoom out");
          //   self.zoomed = true;
          // }
        });

        /*
         * Lightgun experiments with mouse
         * (Requires jquery.dimensions.js)
         */
        if ($.offset) {
          self.screen.mousedown(function(e) {
            if (self.nes.mmap) {
              self.nes.mmap.mousePressed = true;
              // FIXME: does not take into account zoom
              self.nes.mmap.mouseX = e.pageX - self.screen.offset().left;
              self.nes.mmap.mouseY = e.pageY - self.screen.offset().top;
            }
          }).mouseup(function() {
            setTimeout(function() {
              if (self.nes.mmap) {
                self.nes.mmap.mousePressed = false;
                self.nes.mmap.mouseX = 0;
                self.nes.mmap.mouseY = 0;
              }
            }, 500);
          });
        }

        if (typeof roms != 'undefined') {
          self.setRoms(roms);
        }

        /*
         * Canvas
         */
        self.canvasContext = self.screen[0].getContext('2d');

        if (!self.canvasContext.getImageData) {
          parent.html("Your browser doesn't support writing pixels directly to the <code>&lt;canvas&gt;</code> tag. Try the latest versions of Google Chrome, Safari, Opera or Firefox!");
          return;
        }

        self.canvasImageData = self.canvasContext.getImageData(0, 0, 256, 240);
        self.resetCanvas();

        /*
         * Keyboard
         */
        $(document).
        bind('keydown', function(evt) {
          self.nes.keyboard.keyDown(evt);
        }).
        bind('keyup', function(evt) {
          self.nes.keyboard.keyUp(evt);
        }).
        bind('keypress', function(evt) {
          self.nes.keyboard.keyPress(evt);
        });

        /*
         * Sound
         */
        self.dynamicaudio = new DynamicAudio({
          swf: nes.opts.swfPath + 'dynamicaudio.swf'
        });
      };

      UI.prototype = {
        loadROM: function(link) {
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
              if (JSNES.Utils.isIE()) {
                var charCodes = JSNESBinaryToArray(
                  xhr.responseBody
                ).toArray();
                data = String.fromCharCode.apply(
                  undefined,
                  charCodes
                );
              } else {
                data = xhr.responseText;
              }
              self.nes.loadRom(data);
              self.nes.start();
              self.enable();
            }
          });
        },

        resetCanvas: function() {
          // Get the canvas buffer in 8bit and 32bit
          this.buf = new ArrayBuffer(this.canvasImageData.data.length);
          this.buf8 = new Uint8ClampedArray(this.buf);
          this.buf32 = new Uint32Array(this.buf);

          // Fill the canvas with black
          this.canvasContext.fillStyle = 'black';
          // set alpha to opaque
          this.canvasContext.fillRect(0, 0, 256, 240);

          // Set alpha
          for (var i = 0; i < this.buf32.length; ++i) {
            this.buf32[i] = 0xFF000000;
          }
        },

        /*
         *
         * nes.ui.screenshot() --> return <img> element :)
         */
        screenshot: function() {
          var data = this.screen[0].toDataURL("image/png"),
            img = new Image();
          img.src = data;
          return img;
        },

        /*
         * Enable and reset UI elements
         */
        enable: function() {
          this.buttons.pause.attr("disabled", null);
          if (this.nes.isRunning) {
            this.buttons.pause.attr("value", "pause");
          } else {
            this.buttons.pause.attr("value", "resume");
          }
          this.buttons.restart.attr("disabled", null);
          var audioStatus = localStorage.getItem('audioStatus');
          if (audioStatus == "false") {
            this.buttons.sound.attr("value", "enable sound");
          } else {
            this.buttons.sound.attr("value", "disable sound");
          }
        },

        updateStatus: function(s) {
          //this.status.text(s);
        },

        setRoms: function(roms) {
          this.romSelect.children().remove();
          $("<option>Select a ROM...</option>").appendTo(this.romSelect);
          for (var groupName in roms) {
            if (roms.hasOwnProperty(groupName)) {
              var optgroup = $('<optgroup></optgroup>').
              attr("label", groupName);
              for (var i = 0; i < roms[groupName].length; i++) {
                $('<option>' + roms[groupName][i][0] + '</option>')
                  .attr("value", roms[groupName][i][1])
                  .appendTo(optgroup);
              }
              this.romSelect.append(optgroup);
            }
          }
        },

        writeAudio: function(samples) {
          return this.dynamicaudio.writeInt(samples);
        },

        writeFrame: function(buffer) {
          var i = 0;
          for (var y = 0; y < 240; ++y) {
            for (var x = 0; x < 256; ++x) {
              i = y * 256 + x;
              // Convert pixel from NES BGR to canvas ABGR
              this.buf32[i] = 0xFF000000 | buffer[i]; // Full alpha
            }
          }

          this.canvasImageData.data.set(this.buf8);
          this.canvasContext.putImageData(this.canvasImageData, 0, 0);
        }
      };

      return UI;
    };
  })(jQuery);
}
