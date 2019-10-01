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

// Keyboard events are bound in the UI
JSNES.Keyboard = function() {
    var i;

    this.keys = {
        KEY_A: 0,
        KEY_B: 1,
        KEY_SELECT: 2,
        KEY_START: 3,
        KEY_UP: 4,
        KEY_DOWN: 5,
        KEY_LEFT: 6,
        KEY_RIGHT: 7
    };

    this.state1 = new Array(8);
    for (i = 0; i < this.state1.length; i++) {
        this.state1[i] = 0x40;
    }
    this.state2 = new Array(8);
    for (i = 0; i < this.state2.length; i++) {
        this.state2[i] = 0x40;
    }
};

JSNES.Keyboard.prototype = {
    setKey: function(key, value) {
        switch (key) {
            case eclipse.data.emu.controls.a: this.state1[this.keys.KEY_A] = value; break;      // X
            case eclipse.data.emu.controls.b: this.state1[this.keys.KEY_B] = value; break;      // Z
            case eclipse.data.emu.controls.select: this.state1[this.keys.KEY_SELECT] = value; break; // Right Ctrl
            case eclipse.data.emu.controls.start: this.state1[this.keys.KEY_START] = value; break;  // Enter
            case eclipse.data.emu.controls.up: this.state1[this.keys.KEY_UP] = value; break;     // Up
            case eclipse.data.emu.controls.down: this.state1[this.keys.KEY_DOWN] = value; break;   // Down
            case eclipse.data.emu.controls.left: this.state1[this.keys.KEY_LEFT] = value; break;   // Left
            case eclipse.data.emu.controls.right: this.state1[this.keys.KEY_RIGHT] = value; break;  // Right
            default: return true;
        }
        return false; // preventDefault
    },

    keyDown: function(evt) {
        if (!this.setKey(evt.keyCode, 0x41) && evt.preventDefault) {
            //evt.preventDefault();
        }
    },

    keyUp: function(evt) {
        if (!this.setKey(evt.keyCode, 0x40) && evt.preventDefault) {
            //evt.preventDefault();
        }
    },

    keyPress: function(evt) {
        //evt.preventDefault();
    }
};
