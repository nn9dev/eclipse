
// FrameTimer Handler

class FrameTimer {
  constructor(props) {
    // Run at 60 FPS
    this.onGenerateFrame = props.onGenerateFrame;
    // Run on animation frame
    this.onWriteFrame = props.onWriteFrame;

    // Whether to fire events or not
    this.running = false;

    // Bodge mode and calibration
    this.bodgeMode = false;

    // Calibration config
    this.desiredFPS = 60;
    this.calibrationDelay = 200; // time to wait before starting
    this.calibrationFrames = 10; // number of frames to calibrate with
    this.calibrationTolerance = 5; // +/- desired FPS to consider correct

    // Calibration state
    this.calibrating = false;
    this.calibrationStartTime = null;
    this.calibrationCurrentFrames = null;

    // FIXME: disable bodge mode entirely. it's not really working.
    // if (window.requestAnimationFrame) {
    //   // wait a sec for it to settle down
    //   setTimeout(() => {
    //     this.calibrating = true;
    //   }, this.calibrationDelay);
    // } else {
    //   console.log("requestAnimationFrame is not supported");
    // }

    this.start = () => {
      this.running = true;
      this.requestAnimationFrame();
      if (this.bodgeMode) this.startBodgeMode();
    }

    this.stop = () => {
      this.running = false;
      if (this._requestID) window.cancelAnimationFrame(this._requestID);
      if (this.bodgeInterval) clearInterval(this.bodgeInterval);
    }

    this.requestAnimationFrame = () => {
      this._requestID = window.requestAnimationFrame(this.onAnimationFrame);
    }

    this.onAnimationFrame = () => {
      if (this.calibrating) {
        if (this.calibrationStartTime === null) {
          this.calibrationStartTime = new Date().getTime();
          this.calibrationCurrentFrames = 0;
        } else {
          this.calibrationCurrentFrames += 1;
        }

        // Calibration complete!
        if (this.calibrationCurrentFrames === this.calibrationFrames) {
          this.calibrating = false;

          var now = new Date().getTime();
          var delta = now - this.calibrationStartTime;
          var fps = 1000 / (delta / this.calibrationFrames);

          if (
            fps <= this.desiredFPS - this.calibrationTolerance ||
            fps >= this.desiredFPS + this.calibrationTolerance
          ) {
            console.log(
              `Enabling bodge mode. (Desired FPS is ${
                this.desiredFPS
              }, actual FPS is ${fps})`
            );
            this.startBodgeMode();
          }
        }
      }

      this.requestAnimationFrame();

      if (this.running) {
        if (!this.bodgeMode) {
          this.onGenerateFrame();
        }
        this.onWriteFrame();
      }
    };

    this.startBodgeMode = () => {
      this.bodgeMode = true;
      this.bodgeInterval = setInterval(this.onBodge, 1000 / this.desiredFPS);
    };

    this.onBodge = () => {
      if (this.running) {
        this.onGenerateFrame();
      }
    };
  }
}


// GamePad Controller

class GamepadController {
  constructor(options) {
    this.onButtonDown = options.onButtonDown;
    this.onButtonUp = options.onButtonUp;
    this.gamepadState = [];
    this.buttonCallback = null;
  }

  disableIfGamepadEnabled(callback) {
    var self = this;
    return (playerId, buttonId) => {
      if (!self.gamepadConfig) {
        return callback(playerId, buttonId);
      }

      var playerGamepadId = self.gamepadConfig.playerGamepadId;
      if (!playerGamepadId || !playerGamepadId[playerId - 1]) {
        // allow callback only if player is not associated to any gamepad
        return callback(playerId, buttonId);
      }
    };
  };

  _getPlayerNumberFromGamepad(gamepad) {
    if (this.gamepadConfig.playerGamepadId[0] === gamepad.id) {
      return 1;
    }

    if (this.gamepadConfig.playerGamepadId[1] === gamepad.id) {
      return 2;
    }

    return 1;
  };

  poll() {
    const gamepads = navigator.getGamepads
      ? navigator.getGamepads()
      : navigator.webkitGetGamepads();

    const usedPlayers = [];

    for (let gamepadIndex = 0; gamepadIndex < gamepads.length; gamepadIndex++) {
      const gamepad = gamepads[gamepadIndex];
      const previousGamepad = this.gamepadState[gamepadIndex];

      if (!gamepad) {
        continue;
      }

      if (!previousGamepad) {
        this.gamepadState[gamepadIndex] = gamepad;
        continue;
      }

      const buttons = gamepad.buttons;
      const previousButtons = previousGamepad.buttons;

      if (this.buttonCallback) {
        for (let code = 0; code < gamepad.axes.length; code++) {
          const axis = gamepad.axes[code];
          const previousAxis = previousGamepad.axes[code];

          if (axis === -1 && previousAxis !== -1) {
            this.buttonCallback({
              gamepadId: gamepad.id,
              type: "axis",
              code: code,
              value: axis
            });
          }

          if (axis === 1 && previousAxis !== 1) {
            this.buttonCallback({
              gamepadId: gamepad.id,
              type: "axis",
              code: code,
              value: axis
            });
          }
        }

        for (let code = 0; code < buttons.length; code++) {
          const button = buttons[code];
          const previousButton = previousButtons[code];
          if (button.pressed && !previousButton.pressed) {
            this.buttonCallback({
              gamepadId: gamepad.id,
              type: "button",
              code: code
            });
          }
        }
      } else if (this.gamepadConfig) {
        let playerNumber = this._getPlayerNumberFromGamepad(gamepad);
        if (usedPlayers.length < 2) {
          if (usedPlayers.indexOf(playerNumber) !== -1) {
            playerNumber++;
            if (playerNumber > 2) playerNumber = 1;
          }
          usedPlayers.push(playerNumber);

          if (this.gamepadConfig.configs[gamepad.id]) {
            const configButtons = this.gamepadConfig.configs[gamepad.id]
              .buttons;

            for (let i = 0; i < configButtons.length; i++) {
              const configButton = configButtons[i];
              if (configButton.type === "button") {
                const code = configButton.code;
                const button = buttons[code];
                const previousButton = previousButtons[code];

                if (button.pressed && !previousButton.pressed) {
                  this.onButtonDown(playerNumber, configButton.buttonId);
                } else if (!button.pressed && previousButton.pressed) {
                  this.onButtonUp(playerNumber, configButton.buttonId);
                }
              } else if (configButton.type === "axis") {
                const code = configButton.code;
                const axis = gamepad.axes[code];
                const previousAxis = previousGamepad.axes[code];

                if (
                  axis === configButton.value &&
                  previousAxis !== configButton.value
                ) {
                  this.onButtonDown(playerNumber, configButton.buttonId);
                }

                if (
                  axis !== configButton.value &&
                  previousAxis === configButton.value
                ) {
                  this.onButtonUp(playerNumber, configButton.buttonId);
                }
              }
            }
          }
        }
      }

      this.gamepadState[gamepadIndex] = {
        buttons: buttons.map(b => {
          return { pressed: b.pressed };
        }),
        axes: gamepad.axes.slice(0)
      };
    }
  };

  promptButton(f) {
    if (!f) {
      this.buttonCallback = f;
    } else {
      this.buttonCallback = buttonInfo => {
        this.buttonCallback = null;
        f(buttonInfo);
      };
    }
  };

  loadGamepadConfig() {
    var gamepadConfig;
    try {
      gamepadConfig = localStorage.getItem("gamepadConfig");
      if (gamepadConfig) {
        gamepadConfig = JSON.parse(gamepadConfig);
      }
    } catch (e) {
      console.log("Failed to get gamepadConfig from localStorage.", e);
    }

    this.gamepadConfig = gamepadConfig;
  };

  setGamepadConfig(gamepadConfig) {
    try {
      localStorage.setItem("gamepadConfig", JSON.stringify(gamepadConfig));
      this.gamepadConfig = gamepadConfig;
    } catch (e) {
      console.log("Failed to set gamepadConfig in localStorage");
    }
  };

  startPolling() {
    if (!(navigator.getGamepads || navigator.webkitGetGamepads)) {
      return { stop: () => {} };
    }

    let stopped = false;
    const loop = () => {
      if (stopped) return;

      this.poll();
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);

    return {
      stop: () => {
        stopped = true;
      }
    };
  };
}
// Controller 

class KeyboardController {
  constructor(options) {
    this.onButtonDown = options.onButtonDown;
    this.onButtonUp = options.onButtonUp;
    this.loadKeys = () => {
      var keys;
      try {
        keys = localStorage.getItem("keys");
        if (keys) {
          keys = JSON.parse(keys);
        }
      } catch (e) {
        console.log("Failed to get keys from localStorage.", e);
      }

      this.keys = {
        88: [1, jsnes.Controller.BUTTON_A, "X"], // X
        89: [1, jsnes.Controller.BUTTON_B, "Y"], // Y (Central European keyboard)
        90: [1, jsnes.Controller.BUTTON_B, "Z"], // Z
        17: [1, jsnes.Controller.BUTTON_SELECT, "Right Ctrl"], // Right Ctrl
        13: [1, jsnes.Controller.BUTTON_START, "Enter"], // Enter
        38: [1, jsnes.Controller.BUTTON_UP, "Up"], // Up
        40: [1, jsnes.Controller.BUTTON_DOWN, "Down"], // Down
        37: [1, jsnes.Controller.BUTTON_LEFT, "Left"], // Left
        39: [1, jsnes.Controller.BUTTON_RIGHT, "Right"], // Right
      };
    };

    this.setKeys = (newKeys) => {
      try {
        localStorage.setItem("keys", JSON.stringify(newKeys));
        this.keys = newKeys;
      } catch (e) {
        console.log("Failed to set keys in localStorage");
      }
    };

    this.handleKeyDown = (e) => {
      var key = this.keys[e.keyCode];
      if (key) {
        this.onButtonDown(key[0], key[1]);
        e.preventDefault();
      }
    };

    this.handleKeyUp = (e) => {
      var key = this.keys[e.keyCode];
      if (key) {
        this.onButtonUp(key[0], key[1]);
        e.preventDefault();
      }
    };

    this.handleKeyPress = (e) => {
      e.preventDefault();
    };
  }
}

// Screen

const SCREEN_WIDTH = 256;
const SCREEN_HEIGHT = 240;

class Screen {
  constructor(canvas) {
    this.canvas = canvas;
    this.initCanvas = () => {
      this.canvas.width = SCREEN_WIDTH
      this.canvas.height = SCREEN_HEIGHT
      this.context = this.canvas.getContext("2d");
      this.imageData = this.context.getImageData(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
      this.context.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
      // buffer to write on next animation frame
      this.buf = new ArrayBuffer(this.imageData.data.length);
      // Get the canvas buffer in 8bit and 32bit
      this.buf8 = new Uint8ClampedArray(this.buf);
      this.buf32 = new Uint32Array(this.buf);

      // Set alpha
      for (var i = 0; i < this.buf32.length; ++i) {
        this.buf32[i] = 0xff000000;
      }
    }

    this.setBuffer = (buffer) => {
      var i = 0;
      for (var y = 0; y < SCREEN_HEIGHT; ++y) {
        for (var x = 0; x < SCREEN_WIDTH; ++x) {
          i = y * 256 + x;
          // Convert pixel from NES BGR to canvas ABGR
          this.buf32[i] = 0xff000000 | buffer[i]; // Full alpha
        }
      }
    };

    this.writeBuffer = () => {
      this.imageData.data.set(this.buf8);
      this.context.putImageData(this.imageData, 0, 0);
    };

    this.fitInParent = () => {
    };

    this.screenshot = () => {
      var img = new Image();
      img.src = this.canvas.toDataURL("image/png");
      return img;
    }

    this.handleMouseDown = (e) => {
      if (!this.props.onMouseDown) return;
      // Make coordinates unscaled
      let scale = SCREEN_WIDTH / parseFloat(this.canvas.style.width);
      let rect = this.canvas.getBoundingClientRect();
      let x = Math.round((e.clientX - rect.left) * scale);
      let y = Math.round((e.clientY - rect.top) * scale);
      this.props.onMouseDown(x, y);
    };
  }
}

function RingBuffer(capacity, evictedCb) {
  this._elements = new Array(capacity || 50);
  this._first = 0;
  this._last = 0;
  this._size = 0;
  this._evictedCb = evictedCb;
}

/**
 * Returns the capacity of the ring buffer.
 *
 * @return {Number}
 * @api public
 */
RingBuffer.prototype.capacity = function() {
  return this._elements.length;
};

/**
 * Returns whether the ring buffer is empty or not.
 *
 * @return {Boolean}
 * @api public
 */
RingBuffer.prototype.isEmpty = function() {
  return this.size() === 0;
};

/**
 * Returns whether the ring buffer is full or not.
 *
 * @return {Boolean}
 * @api public
 */
RingBuffer.prototype.isFull = function() {
  return this.size() === this.capacity();
};

/**
 * Peeks at the top element of the queue.
 *
 * @return {Object}
 * @throws {Error} when the ring buffer is empty.
 * @api public
 */
RingBuffer.prototype.peek = function() {
  if (this.isEmpty()) throw new Error('RingBuffer is empty');

  return this._elements[this._first];
};

/**
 * Peeks at multiple elements in the queue.
 *
 * @return {Array}
 * @throws {Error} when there are not enough elements in the buffer.
 * @api public
 */
RingBuffer.prototype.peekN = function(count) {
  if (count > this._size) throw new Error('Not enough elements in RingBuffer');

  var end = Math.min(this._first + count, this.capacity());
  var firstHalf = this._elements.slice(this._first, end);
  if (end < this.capacity()) {
    return firstHalf;
  }
  var secondHalf = this._elements.slice(0, count - firstHalf.length);
  return firstHalf.concat(secondHalf);
};

/**
 * Dequeues the top element of the queue.
 *
 * @return {Object}
 * @throws {Error} when the ring buffer is empty.
 * @api public
 */
RingBuffer.prototype.deq = function() {
  var element = this.peek();

  this._size--;
  this._first = (this._first + 1) % this.capacity();

  return element;
};

/**
 * Dequeues multiple elements of the queue.
 *
 * @return {Array}
 * @throws {Error} when there are not enough elements in the buffer.
 * @api public
 */
RingBuffer.prototype.deqN = function(count) {
  var elements = this.peekN(count);

  this._size -= count;
  this._first = (this._first + count) % this.capacity();

  return elements;
};

/**
 * Enqueues the `element` at the end of the ring buffer and returns its new size.
 *
 * @param {Object} element
 * @return {Number}
 * @api public
 */
RingBuffer.prototype.enq = function(element) {
  this._end = (this._first + this.size()) % this.capacity();
  var full = this.isFull()
  if (full && this._evictedCb) {
    this._evictedCb(this._elements[this._end]);
  }
  this._elements[this._end] = element;

  if (full) {
    this._first = (this._first + 1) % this.capacity();
  } else {
    this._size++;
  }

  return this.size();
};

/**
 * Returns the size of the queue.
 *
 * @return {Number}
 * @api public
 */
RingBuffer.prototype.size = function() {
  return this._size;
};


class Speakers {
  constructor({ onBufferUnderrun }) {
    this.onBufferUnderrun = onBufferUnderrun;
    this.bufferSize = 8192;
    this.buffer = new RingBuffer(this.bufferSize * 2);

    this.start = () => {
      // Detect if Audio is Supported
      if (window.AudioContext) {
        this.audioCtx = new window.AudioContext();
        this.scriptNode = this.audioCtx.createScriptProcessor(1024, 0, 2);
        this.scriptNode.onaudioprocess = this.onaudioprocess;
        this.scriptNode.connect(this.audioCtx.destination);
      } else if (window.webkitAudioContext) {
        this.audioCtx = new window.webkitAudioContext();
        this.scriptNode = this.audioCtx.createScriptProcessor(1024, 0, 2);
        this.scriptNode.onaudioprocess = this.onaudioprocess;
        this.scriptNode.connect(this.audioCtx.destination);
      } else {
        return;
      }
    }

    this.stop = () => {
      if (this.scriptNode) {
        this.scriptNode.disconnect(this.audioCtx.destination);
        this.scriptNode.onaudioprocess = null;
        this.scriptNode = null;
      }
      if (this.audioCtx) {
        this.audioCtx.close().catch(this.handleError);
        this.audioCtx = null;
      }
    }

    this.handleError = (err) => {
      console.log(err);
    }

    this.writeSample = (left, right) => {
      if (this.buffer.size() / 2 >= this.bufferSize) {
        // console.log(`Buffer overrun`);
      }
      this.buffer.enq(left);
      this.buffer.enq(right);
    };

    this.onaudioprocess = (e) => {
      var left = e.outputBuffer.getChannelData(0);
      var right = e.outputBuffer.getChannelData(1);
      var size = left.length;

      // We're going to buffer underrun. Attempt to fill the buffer.
      if (this.buffer.size() < size * 2 && this.onBufferUnderrun) {
        this.onBufferUnderrun(this.buffer.size(), size * 2);
      }

      try {
        var samples = this.buffer.deqN(size * 2);
      } catch (e) {
        // onBufferUnderrun failed to fill the buffer, so handle a real buffer
        // underrun

        // ignore empty buffers... assume audio has just stopped
        var bufferSize = this.buffer.size() / 2;
        if (bufferSize > 0) {
          // console.log(`Buffer underrun (needed ${size}, got ${bufferSize})`);
        }
        for (var j = 0; j < size; j++) {
          left[j] = 0;
          right[j] = 0;
        }
        return;
      }
      for (var i = 0; i < size; i++) {
        left[i] = samples[i * 2];
        right[i] = samples[i * 2 + 1];
      }
    };
  }
}

class NESCoreHandler {
  constructor(romData) {
    this.paused = true;
    this.romData = romData;
    this.screen = new Screen(document.getElementById("emu_screen_canvas"));
    this.screen.initCanvas();
    this.init = () => {
      // Initial layout
      this.speakers = new Speakers({
        onBufferUnderrun: (actualSize, desiredSize) => {
          if (this.paused) {
            return;
          }
          console.log(
            "Buffer underrun, running another frame to try and catch up"
          );
          this.nes.frame();
          if (this.speakers.buffer.size() < desiredSize) {
            console.log("Still buffer underrun, running a second frame");
            this.nes.frame();
          }
        }
      });

      this.nes = new jsnes.NES({
        onFrame: this.screen.setBuffer,
        onStatusUpdate: console.log,
        onAudioSample: this.speakers.writeSample
      });
      
      // For debugging. (["nes"] instead of .nes to avoid VS Code type errors.)
      window["nes"] = this.nes;

      this.frameTimer = new FrameTimer({
        onGenerateFrame: this.nes.frame,
        onWriteFrame: this.screen.writeBuffer
      });

      // Set up gamepad and keyboard
      this.gamepadController = new GamepadController({
        onButtonDown: this.nes.buttonDown,
        onButtonUp: this.nes.buttonUp
      });

      this.gamepadController.loadGamepadConfig();
      this.gamepadPolling = this.gamepadController.startPolling();

      this.keyboardController = new KeyboardController({
        onButtonDown: this.gamepadController.disableIfGamepadEnabled(
          this.nes.buttonDown
        ),
        onButtonUp: this.gamepadController.disableIfGamepadEnabled(
          this.nes.buttonUp
        )
      });

      // Load keys from localStorage (if they exist)
      this.keyboardController.loadKeys();

      document.addEventListener("keydown", this.keyboardController.handleKeyDown);
      document.addEventListener("keyup", this.keyboardController.handleKeyUp);
      document.addEventListener(
        "keypress",
        this.keyboardController.handleKeyPress
      );

      this.nes.loadROM(this.romData);
      this.start();
    }
    this.loadControls = (controls) => {
      console.log(controls);
      this.keyboardController.keys = JSON.parse(`{\"${controls.a}\":[1,0,\"X\"],\"${controls.b}\":[1,1,\"Z\"],\"${controls.select}\":[1,2,\"Right Ctrl\"],\"${controls.start}\":[1,3,\"Enter\"],\"${controls.up}\":[1,4,\"Up\"],\"${controls.down}\":[1,5,\"Down\"],\"${controls.left}\":[1,6,\"Left\"],\"${controls.right}\":[1,7,\"Right\"]}`);
    };
    this.destroy = () => {
      this.stop();
      document.removeEventListener(
        "keydown",
        this.keyboardController.handleKeyDown
      );
      document.removeEventListener("keyup", this.keyboardController.handleKeyUp);
      document.removeEventListener(
        "keypress",
        this.keyboardController.handleKeyPress
      );

      // Stop gamepad
      this.gamepadPolling.stop();

      window["nes"] = undefined;
    }

    this.start = () => {
      this.frameTimer.start();
      // this.speakers.start();
      this.fpsInterval = setInterval(() => {
        // console.log(`FPS: ${this.nes.getFPS()}`);
      }, 1000);
    };

    this.stop = () => {
      this.frameTimer.stop();
      this.speakers.stop();
      clearInterval(this.fpsInterval);
    };
  }
}