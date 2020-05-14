class OpenGamepad {
	constructor(options) {
		this.isSupported = !(navigator.getGamepads === undefined);
		this.options = options;
		this.inited = false;
		this.previousState = [];
	};
	init() {
		var _this = this;
		// Add Event Listeners
		if (this.options.on.connect) {
			window.addEventListener('gamepadconnected', this.options.on.connect);
		};
		if (this.options.on.disconnect) {
			window.addEventListener('gamepaddisconnected', this.options.on.disconnect);
		};
		this.inited = true;
		if (this.isSupported) {
			var runAnimation = function () {
				if (_this.inited) {
					window.requestAnimationFrame(runAnimation);
				};
				_this.previousState = _this.list();
				var gplist = _this.list();
				gplist.forEach((pad, i) => {
					pad.buttons.forEach((button, index) => {
						if (_this.options.on.buttonPress != null && button.pressed) {
							_this.options.on.buttonPress(index, button, pad);
						} else if (_this.options.on.buttonUp != null && !button.pressed) {
							_this.options.on.buttonUp(index, button, pad);
						};
					});
					if (_this.options.on.axisMoved != null) {
						pad.axes.forEach((a, index) => {
							if (a.toFixed(1) > _this.previousState[index].toFixed(1) || a.toFixed(1) < _this.previousState[index].toFixed(1)) {
								_this.options.on.axisMoved(a, index, pad);
							};
						});
					}
					_this.previousState = gplist;
				});
			}
			window.requestAnimationFrame(runAnimation);
		}
	};
	destroy() {
		this.inited = false;
	};
	list() {
		var gamepads = navigator.getGamepads();
		if (!Array.isArray(gamepads) && gamepads != null) {
			return Object.keys(gamepads).map(key => {
				if (gamepads[key] != null && key != "length") {
					return gamepads[key];
				};
			}).filter(function (val) {
				if (val) return val
			});
		} else if (Array.isArray(gamepads) && gamepads != null) {
			return gamepads.filter(function (val) {
				if (val) return val
			});
		} else {
			return [];
		}
	};
};