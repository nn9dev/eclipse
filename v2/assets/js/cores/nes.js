!function(t, s) {
    "object" == typeof exports && "object" == typeof module ? module.exports = s() : "function" == typeof define && define.amd ? define("jsnes", [], s) : "object" == typeof exports ? exports.jsnes = s() : t.jsnes = s()
}("undefined" != typeof self ? self : this, function() {
    return function(t) {
        function s(e) {
            if (i[e])
                return i[e].exports;
            var h = i[e] = {
                i: e,
                l: !1,
                exports: {}
            };
            return t[e].call(h.exports, h, h.exports, s), h.l = !0, h.exports
        }
        var i = {};
        return s.m = t, s.c = i, s.d = function(t, i, e) {
            s.o(t, i) || Object.defineProperty(t, i, {
                configurable: !1,
                enumerable: !0,
                get: e
            })
        }, s.n = function(t) {
            var i = t && t.__esModule ? function() {
                return t.default
            } : function() {
                return t
            };
            return s.d(i, "a", i), i
        }, s.o = function(t, s) {
            return Object.prototype.hasOwnProperty.call(t, s)
        }, s.p = "", s(s.s = 3)
    }([function(t, s) {
        t.exports = {
            copyArrayElements: function(t, s, i, e, h) {
                for (var r = 0; r < h; ++r)
                    i[e + r] = t[s + r]
            },
            copyArray: function(t) {
                return t.slice(0)
            },
            fromJSON: function(t, s) {
                for (var i = 0; i < t.JSON_PROPERTIES.length; i++)
                    t[t.JSON_PROPERTIES[i]] = s[t.JSON_PROPERTIES[i]]
            },
            toJSON: function(t) {
                for (var s = {}, i = 0; i < t.JSON_PROPERTIES.length; i++)
                    s[t.JSON_PROPERTIES[i]] = t[t.JSON_PROPERTIES[i]];
                return s
            }
        }
    }, function(t, s) {
        var i = function() {
            this.state = new Array(8);
            for (var t = 0; t < this.state.length; t++)
                this.state[t] = 64
        };
        i.BUTTON_A = 0, i.BUTTON_B = 1, i.BUTTON_SELECT = 2, i.BUTTON_START = 3, i.BUTTON_UP = 4, i.BUTTON_DOWN = 5, i.BUTTON_LEFT = 6, i.BUTTON_RIGHT = 7, i.prototype = {
            buttonDown: function(t) {
                this.state[t] = 65
            },
            buttonUp: function(t) {
                this.state[t] = 64
            }
        }, t.exports = i
    }, function(t, s) {
        var i = function() {
            this.pix = new Array(64), this.fbIndex = null, this.tIndex = null, this.x = null, this.y = null, this.w = null, this.h = null, this.incX = null, this.incY = null, this.palIndex = null, this.tpri = null, this.c = null, this.initialized = !1, this.opaque = new Array(8)
        };
        i.prototype = {
            setBuffer: function(t) {
                for (this.y = 0; this.y < 8; this.y++)
                    this.setScanline(this.y, t[this.y], t[this.y + 8])
            },
            setScanline: function(t, s, i) {
                for (this.initialized = !0, this.tIndex = t << 3, this.x = 0; this.x < 8; this.x++)
                    this.pix[this.tIndex + this.x] = (s >> 7 - this.x & 1) + ((i >> 7 - this.x & 1) << 1), 0 === this.pix[this.tIndex + this.x] && (this.opaque[t] = !1)
            },
            render: function(t, s, i, e, h, r, n, a, o, l, p, u, m) {
                if (!(r < -7 || r >= 256 || n < -7 || n >= 240))
                    if (this.w = e - s, this.h = h - i, r < 0 && (s -= r), r + e >= 256 && (e = 256 - r), n < 0 && (i -= n), n + h >= 240 && (h = 240 - n), l || p)
                        if (l && !p)
                            for (this.fbIndex = (n << 8) + r, this.tIndex = 7, this.y = 0; this.y < 8; this.y++) {
                                for (this.x = 0; this.x < 8; this.x++)
                                    this.x >= s && this.x < e && this.y >= i && this.y < h && (this.palIndex = this.pix[this.tIndex], this.tpri = m[this.fbIndex], 0 !== this.palIndex && u <= (255 & this.tpri) && (t[this.fbIndex] = o[this.palIndex + a], this.tpri = 3840 & this.tpri | u, m[this.fbIndex] = this.tpri)), this.fbIndex++, this.tIndex--;
                                this.fbIndex -= 8, this.fbIndex += 256, this.tIndex += 16
                            }
                        else if (p && !l)
                            for (this.fbIndex = (n << 8) + r, this.tIndex = 56, this.y = 0; this.y < 8; this.y++) {
                                for (this.x = 0; this.x < 8; this.x++)
                                    this.x >= s && this.x < e && this.y >= i && this.y < h && (this.palIndex = this.pix[this.tIndex], this.tpri = m[this.fbIndex], 0 !== this.palIndex && u <= (255 & this.tpri) && (t[this.fbIndex] = o[this.palIndex + a], this.tpri = 3840 & this.tpri | u, m[this.fbIndex] = this.tpri)), this.fbIndex++, this.tIndex++;
                                this.fbIndex -= 8, this.fbIndex += 256, this.tIndex -= 16
                            }
                        else
                            for (this.fbIndex = (n << 8) + r, this.tIndex = 63, this.y = 0; this.y < 8; this.y++) {
                                for (this.x = 0; this.x < 8; this.x++)
                                    this.x >= s && this.x < e && this.y >= i && this.y < h && (this.palIndex = this.pix[this.tIndex], this.tpri = m[this.fbIndex], 0 !== this.palIndex && u <= (255 & this.tpri) && (t[this.fbIndex] = o[this.palIndex + a], this.tpri = 3840 & this.tpri | u, m[this.fbIndex] = this.tpri)), this.fbIndex++, this.tIndex--;
                                this.fbIndex -= 8, this.fbIndex += 256
                            }
                    else
                        for (this.fbIndex = (n << 8) + r, this.tIndex = 0, this.y = 0; this.y < 8; this.y++) {
                            for (this.x = 0; this.x < 8; this.x++)
                                this.x >= s && this.x < e && this.y >= i && this.y < h && (this.palIndex = this.pix[this.tIndex], this.tpri = m[this.fbIndex], 0 !== this.palIndex && u <= (255 & this.tpri) && (t[this.fbIndex] = o[this.palIndex + a], this.tpri = 3840 & this.tpri | u, m[this.fbIndex] = this.tpri)), this.fbIndex++, this.tIndex++;
                            this.fbIndex -= 8, this.fbIndex += 256
                        }
            },
            isTransparent: function(t, s) {
                return 0 === this.pix[(s << 3) + t]
            },
            toJSON: function() {
                return {
                    opaque: this.opaque,
                    pix: this.pix
                }
            },
            fromJSON: function(t) {
                this.opaque = t.opaque, this.pix = t.pix
            }
        }, t.exports = i
    }, function(t, s, i) {
        t.exports = {
            Controller: i(1),
            NES: i(4)
        }
    }, function(t, s, i) {
        var e = i(5),
            h = i(1),
            r = i(6),
            n = i(7),
            a = i(8),
            o = function(t) {
                if (this.opts = {
                    onFrame: function() {},
                    onAudioSample: null,
                    onStatusUpdate: function() {},
                    onBatteryRamWrite: function() {},
                    preferredFrameRate: 60,
                    emulateSound: !0,
                    sampleRate: 44100
                }, void 0 !== t) {
                    var s;
                    for (s in this.opts)
                        void 0 !== t[s] && (this.opts[s] = t[s])
                }
                this.frameTime = 1e3 / this.opts.preferredFrameRate, this.ui = {
                    writeFrame: this.opts.onFrame,
                    updateStatus: this.opts.onStatusUpdate
                }, this.cpu = new e(this), this.ppu = new r(this), this.papu = new n(this), this.mmap = null, this.controllers = {
                    1: new h,
                    2: new h
                }, this.ui.updateStatus("Ready to load a ROM."), this.frame = this.frame.bind(this), this.buttonDown = this.buttonDown.bind(this), this.buttonUp = this.buttonUp.bind(this), this.zapperMove = this.zapperMove.bind(this), this.zapperFireDown = this.zapperFireDown.bind(this), this.zapperFireUp = this.zapperFireUp.bind(this)
            };
        o.prototype = {
            fpsFrameCount: 0,
            romData: null,
            reset: function() {
                null !== this.mmap && this.mmap.reset(), this.cpu.reset(), this.ppu.reset(), this.papu.reset(), this.lastFpsTime = null, this.fpsFrameCount = 0
            },
            frame: function() {
                this.ppu.startFrame();
                var t = 0,
                    s = this.opts.emulateSound,
                    i = this.cpu,
                    e = this.ppu,
                    h = this.papu;
                t:
                for (;;)
                    for (0 === i.cyclesToHalt ? (t = i.emulate(), s && h.clockFrameCounter(t), t *= 3) : i.cyclesToHalt > 8 ? (t = 24, s && h.clockFrameCounter(8), i.cyclesToHalt -= 8) : (t = 3 * i.cyclesToHalt, s && h.clockFrameCounter(i.cyclesToHalt), i.cyclesToHalt = 0); t > 0; t--) {
                        if (e.curX === e.spr0HitX && 1 === e.f_spVisibility && e.scanline - 21 === e.spr0HitY && e.setStatusFlag(e.STATUS_SPRITE0HIT, !0), e.requestEndFrame && 0 === --e.nmiCounter) {
                            e.requestEndFrame = !1, e.startVBlank();
                            break t
                        }
                        e.curX++, 341 === e.curX && (e.curX = 0, e.endScanline())
                    }
                this.fpsFrameCount++
            },
            buttonDown: function(t, s) {
                this.controllers[t].buttonDown(s)
            },
            buttonUp: function(t, s) {
                this.controllers[t].buttonUp(s)
            },
            zapperMove: function(t, s) {
                this.mmap && (this.mmap.zapperX = t, this.mmap.zapperY = s)
            },
            zapperFireDown: function() {
                this.mmap && (this.mmap.zapperFired = !0)
            },
            zapperFireUp: function() {
                this.mmap && (this.mmap.zapperFired = !1)
            },
            getFPS: function() {
                var t = +new Date,
                    s = null;
                return this.lastFpsTime && (s = this.fpsFrameCount / ((t - this.lastFpsTime) / 1e3)), this.fpsFrameCount = 0, this.lastFpsTime = t, s
            },
            reloadROM: function() {
                null !== this.romData && this.loadROM(this.romData)
            },
            loadROM: function(t) {
                this.rom = new a(this), this.rom.load(t), this.reset(), this.mmap = this.rom.createMapper(), this.mmap.loadROM(), this.ppu.setMirroring(this.rom.getMirroringType()), this.romData = t
            },
            setFramerate: function(t) {
                this.opts.preferredFrameRate = t, this.frameTime = 1e3 / t, this.papu.setSampleRate(this.opts.sampleRate, !1)
            },
            toJSON: function() {
                return {
                    romData: this.romData,
                    cpu: this.cpu.toJSON(),
                    mmap: this.mmap.toJSON(),
                    ppu: this.ppu.toJSON()
                }
            },
            fromJSON: function(t) {
                this.loadROM(t.romData), this.cpu.fromJSON(t.cpu), this.mmap.fromJSON(t.mmap), this.ppu.fromJSON(t.ppu)
            }
        }, t.exports = o
    }, function(t, s, i) {
        var e = i(0),
            h = function(t) {
                this.nes = t, this.mem = null, this.REG_ACC = null, this.REG_X = null, this.REG_Y = null, this.REG_SP = null, this.REG_PC = null, this.REG_PC_NEW = null, this.REG_STATUS = null, this.F_CARRY = null, this.F_DECIMAL = null, this.F_INTERRUPT = null, this.F_INTERRUPT_NEW = null, this.F_OVERFLOW = null, this.F_SIGN = null, this.F_ZERO = null, this.F_NOTUSED = null, this.F_NOTUSED_NEW = null, this.F_BRK = null, this.F_BRK_NEW = null, this.opdata = null, this.cyclesToHalt = null, this.crash = null, this.irqRequested = null, this.irqType = null, this.reset()
            };
        h.prototype = {
            IRQ_NORMAL: 0,
            IRQ_NMI: 1,
            IRQ_RESET: 2,
            reset: function() {
                this.mem = new Array(65536);
                for (var t = 0; t < 8192; t++)
                    this.mem[t] = 255;
                for (var s = 0; s < 4; s++) {
                    var i = 2048 * s;
                    this.mem[i + 8] = 247, this.mem[i + 9] = 239, this.mem[i + 10] = 223, this.mem[i + 15] = 191
                }
                for (var e = 8193; e < this.mem.length; e++)
                    this.mem[e] = 0;
                this.REG_ACC = 0, this.REG_X = 0, this.REG_Y = 0, this.REG_SP = 511, this.REG_PC = 32767, this.REG_PC_NEW = 32767, this.REG_STATUS = 40, this.setStatus(40), this.F_CARRY = 0, this.F_DECIMAL = 0, this.F_INTERRUPT = 1, this.F_INTERRUPT_NEW = 1, this.F_OVERFLOW = 0, this.F_SIGN = 0, this.F_ZERO = 1, this.F_NOTUSED = 1, this.F_NOTUSED_NEW = 1, this.F_BRK = 1, this.F_BRK_NEW = 1, this.opdata = (new r).opdata, this.cyclesToHalt = 0, this.crash = !1, this.irqRequested = !1, this.irqType = null
            },
            emulate: function() {
                var t,
                    s;
                if (this.irqRequested) {
                    switch (t = this.F_CARRY | (0 === this.F_ZERO ? 1 : 0) << 1 | this.F_INTERRUPT << 2 | this.F_DECIMAL << 3 | this.F_BRK << 4 | this.F_NOTUSED << 5 | this.F_OVERFLOW << 6 | this.F_SIGN << 7, this.REG_PC_NEW = this.REG_PC, this.F_INTERRUPT_NEW = this.F_INTERRUPT, this.irqType) {
                    case 0:
                        if (0 !== this.F_INTERRUPT)
                            break;
                        this.doIrq(t);
                        break;
                    case 1:
                        this.doNonMaskableInterrupt(t);
                        break;
                    case 2:
                        this.doResetInterrupt()
                    }
                    this.REG_PC = this.REG_PC_NEW, this.F_INTERRUPT = this.F_INTERRUPT_NEW, this.F_BRK = this.F_BRK_NEW, this.irqRequested = !1
                }
                var i = this.opdata[this.nes.mmap.load(this.REG_PC + 1)],
                    e = i >> 24,
                    h = 0,
                    r = i >> 8 & 255,
                    n = this.REG_PC;
                this.REG_PC += i >> 16 & 255;
                var a = 0;
                switch (r) {
                case 0:
                    a = this.load(n + 2);
                    break;
                case 1:
                    a = this.load(n + 2), a += a < 128 ? this.REG_PC : this.REG_PC - 256;
                    break;
                case 2:
                    break;
                case 3:
                    a = this.load16bit(n + 2);
                    break;
                case 4:
                    a = this.REG_ACC;
                    break;
                case 5:
                    a = this.REG_PC;
                    break;
                case 6:
                    a = this.load(n + 2) + this.REG_X & 255;
                    break;
                case 7:
                    a = this.load(n + 2) + this.REG_Y & 255;
                    break;
                case 8:
                    a = this.load16bit(n + 2), (65280 & a) != (a + this.REG_X & 65280) && (h = 1), a += this.REG_X;
                    break;
                case 9:
                    a = this.load16bit(n + 2), (65280 & a) != (a + this.REG_Y & 65280) && (h = 1), a += this.REG_Y;
                    break;
                case 10:
                    a = this.load(n + 2), (65280 & a) != (a + this.REG_X & 65280) && (h = 1), a += this.REG_X, a &= 255, a = this.load16bit(a);
                    break;
                case 11:
                    a = this.load16bit(this.load(n + 2)), (65280 & a) != (a + this.REG_Y & 65280) && (h = 1), a += this.REG_Y;
                    break;
                case 12:
                    a = this.load16bit(n + 2), a = a < 8191 ? this.mem[a] + (this.mem[65280 & a | 1 + (255 & a) & 255] << 8) : this.nes.mmap.load(a) + (this.nes.mmap.load(65280 & a | 1 + (255 & a) & 255) << 8)
                }
                switch (a &= 65535, 255 & i) {
                case 0:
                    t = this.REG_ACC + this.load(a) + this.F_CARRY, 0 == (128 & (this.REG_ACC ^ this.load(a))) && 0 != (128 & (this.REG_ACC ^ t)) ? this.F_OVERFLOW = 1 : this.F_OVERFLOW = 0, this.F_CARRY = t > 255 ? 1 : 0, this.F_SIGN = t >> 7 & 1, this.F_ZERO = 255 & t, this.REG_ACC = 255 & t, e += h;
                    break;
                case 1:
                    this.REG_ACC = this.REG_ACC & this.load(a), this.F_SIGN = this.REG_ACC >> 7 & 1, this.F_ZERO = this.REG_ACC, 11 !== r && (e += h);
                    break;
                case 2:
                    4 === r ? (this.F_CARRY = this.REG_ACC >> 7 & 1, this.REG_ACC = this.REG_ACC << 1 & 255, this.F_SIGN = this.REG_ACC >> 7 & 1, this.F_ZERO = this.REG_ACC) : (t = this.load(a), this.F_CARRY = t >> 7 & 1, t = t << 1 & 255, this.F_SIGN = t >> 7 & 1, this.F_ZERO = t, this.write(a, t));
                    break;
                case 3:
                    0 === this.F_CARRY && (e += (65280 & n) != (65280 & a) ? 2 : 1, this.REG_PC = a);
                    break;
                case 4:
                    1 === this.F_CARRY && (e += (65280 & n) != (65280 & a) ? 2 : 1, this.REG_PC = a);
                    break;
                case 5:
                    0 === this.F_ZERO && (e += (65280 & n) != (65280 & a) ? 2 : 1, this.REG_PC = a);
                    break;
                case 6:
                    t = this.load(a), this.F_SIGN = t >> 7 & 1, this.F_OVERFLOW = t >> 6 & 1, t &= this.REG_ACC, this.F_ZERO = t;
                    break;
                case 7:
                    1 === this.F_SIGN && (e++, this.REG_PC = a);
                    break;
                case 8:
                    0 !== this.F_ZERO && (e += (65280 & n) != (65280 & a) ? 2 : 1, this.REG_PC = a);
                    break;
                case 9:
                    0 === this.F_SIGN && (e += (65280 & n) != (65280 & a) ? 2 : 1, this.REG_PC = a);
                    break;
                case 10:
                    this.REG_PC += 2, this.push(this.REG_PC >> 8 & 255), this.push(255 & this.REG_PC), this.F_BRK = 1, this.push(this.F_CARRY | (0 === this.F_ZERO ? 1 : 0) << 1 | this.F_INTERRUPT << 2 | this.F_DECIMAL << 3 | this.F_BRK << 4 | this.F_NOTUSED << 5 | this.F_OVERFLOW << 6 | this.F_SIGN << 7), this.F_INTERRUPT = 1, this.REG_PC = this.load16bit(65534), this.REG_PC--;
                    break;
                case 11:
                    0 === this.F_OVERFLOW && (e += (65280 & n) != (65280 & a) ? 2 : 1, this.REG_PC = a);
                    break;
                case 12:
                    1 === this.F_OVERFLOW && (e += (65280 & n) != (65280 & a) ? 2 : 1, this.REG_PC = a);
                    break;
                case 13:
                    this.F_CARRY = 0;
                    break;
                case 14:
                    this.F_DECIMAL = 0;
                    break;
                case 15:
                    this.F_INTERRUPT = 0;
                    break;
                case 16:
                    this.F_OVERFLOW = 0;
                    break;
                case 17:
                    t = this.REG_ACC - this.load(a), this.F_CARRY = t >= 0 ? 1 : 0, this.F_SIGN = t >> 7 & 1, this.F_ZERO = 255 & t, e += h;
                    break;
                case 18:
                    t = this.REG_X - this.load(a), this.F_CARRY = t >= 0 ? 1 : 0, this.F_SIGN = t >> 7 & 1, this.F_ZERO = 255 & t;
                    break;
                case 19:
                    t = this.REG_Y - this.load(a), this.F_CARRY = t >= 0 ? 1 : 0, this.F_SIGN = t >> 7 & 1, this.F_ZERO = 255 & t;
                    break;
                case 20:
                    t = this.load(a) - 1 & 255, this.F_SIGN = t >> 7 & 1, this.F_ZERO = t, this.write(a, t);
                    break;
                case 21:
                    this.REG_X = this.REG_X - 1 & 255, this.F_SIGN = this.REG_X >> 7 & 1, this.F_ZERO = this.REG_X;
                    break;
                case 22:
                    this.REG_Y = this.REG_Y - 1 & 255, this.F_SIGN = this.REG_Y >> 7 & 1, this.F_ZERO = this.REG_Y;
                    break;
                case 23:
                    this.REG_ACC = 255 & (this.load(a) ^ this.REG_ACC), this.F_SIGN = this.REG_ACC >> 7 & 1, this.F_ZERO = this.REG_ACC, e += h;
                    break;
                case 24:
                    t = this.load(a) + 1 & 255, this.F_SIGN = t >> 7 & 1, this.F_ZERO = t, this.write(a, 255 & t);
                    break;
                case 25:
                    this.REG_X = this.REG_X + 1 & 255, this.F_SIGN = this.REG_X >> 7 & 1, this.F_ZERO = this.REG_X;
                    break;
                case 26:
                    this.REG_Y++, this.REG_Y &= 255, this.F_SIGN = this.REG_Y >> 7 & 1, this.F_ZERO = this.REG_Y;
                    break;
                case 27:
                    this.REG_PC = a - 1;
                    break;
                case 28:
                    this.push(this.REG_PC >> 8 & 255), this.push(255 & this.REG_PC), this.REG_PC = a - 1;
                    break;
                case 29:
                    this.REG_ACC = this.load(a), this.F_SIGN = this.REG_ACC >> 7 & 1, this.F_ZERO = this.REG_ACC, e += h;
                    break;
                case 30:
                    this.REG_X = this.load(a), this.F_SIGN = this.REG_X >> 7 & 1, this.F_ZERO = this.REG_X, e += h;
                    break;
                case 31:
                    this.REG_Y = this.load(a), this.F_SIGN = this.REG_Y >> 7 & 1, this.F_ZERO = this.REG_Y, e += h;
                    break;
                case 32:
                    4 === r ? (t = 255 & this.REG_ACC, this.F_CARRY = 1 & t, t >>= 1, this.REG_ACC = t) : (t = 255 & this.load(a), this.F_CARRY = 1 & t, t >>= 1, this.write(a, t)), this.F_SIGN = 0, this.F_ZERO = t;
                    break;
                case 33:
                    break;
                case 34:
                    t = 255 & (this.load(a) | this.REG_ACC), this.F_SIGN = t >> 7 & 1, this.F_ZERO = t, this.REG_ACC = t, 11 !== r && (e += h);
                    break;
                case 35:
                    this.push(this.REG_ACC);
                    break;
                case 36:
                    this.F_BRK = 1, this.push(this.F_CARRY | (0 === this.F_ZERO ? 1 : 0) << 1 | this.F_INTERRUPT << 2 | this.F_DECIMAL << 3 | this.F_BRK << 4 | this.F_NOTUSED << 5 | this.F_OVERFLOW << 6 | this.F_SIGN << 7);
                    break;
                case 37:
                    this.REG_ACC = this.pull(), this.F_SIGN = this.REG_ACC >> 7 & 1, this.F_ZERO = this.REG_ACC;
                    break;
                case 38:
                    t = this.pull(), this.F_CARRY = 1 & t, this.F_ZERO = 1 == (t >> 1 & 1) ? 0 : 1, this.F_INTERRUPT = t >> 2 & 1, this.F_DECIMAL = t >> 3 & 1, this.F_BRK = t >> 4 & 1, this.F_NOTUSED = t >> 5 & 1, this.F_OVERFLOW = t >> 6 & 1, this.F_SIGN = t >> 7 & 1, this.F_NOTUSED = 1;
                    break;
                case 39:
                    4 === r ? (t = this.REG_ACC, s = this.F_CARRY, this.F_CARRY = t >> 7 & 1, t = (t << 1 & 255) + s, this.REG_ACC = t) : (t = this.load(a), s = this.F_CARRY, this.F_CARRY = t >> 7 & 1, t = (t << 1 & 255) + s, this.write(a, t)), this.F_SIGN = t >> 7 & 1, this.F_ZERO = t;
                    break;
                case 40:
                    4 === r ? (s = this.F_CARRY << 7, this.F_CARRY = 1 & this.REG_ACC, t = (this.REG_ACC >> 1) + s, this.REG_ACC = t) : (t = this.load(a), s = this.F_CARRY << 7, this.F_CARRY = 1 & t, t = (t >> 1) + s, this.write(a, t)), this.F_SIGN = t >> 7 & 1, this.F_ZERO = t;
                    break;
                case 41:
                    if (t = this.pull(), this.F_CARRY = 1 & t, this.F_ZERO = 0 == (t >> 1 & 1) ? 1 : 0, this.F_INTERRUPT = t >> 2 & 1, this.F_DECIMAL = t >> 3 & 1, this.F_BRK = t >> 4 & 1, this.F_NOTUSED = t >> 5 & 1, this.F_OVERFLOW = t >> 6 & 1, this.F_SIGN = t >> 7 & 1, this.REG_PC = this.pull(), this.REG_PC += this.pull() << 8, 65535 === this.REG_PC)
                        return;
                    this.REG_PC--, this.F_NOTUSED = 1;
                    break;
                case 42:
                    if (this.REG_PC = this.pull(), this.REG_PC += this.pull() << 8, 65535 === this.REG_PC)
                        return;
                    break;
                case 43:
                    t = this.REG_ACC - this.load(a) - (1 - this.F_CARRY), this.F_SIGN = t >> 7 & 1, this.F_ZERO = 255 & t, 0 != (128 & (this.REG_ACC ^ t)) && 0 != (128 & (this.REG_ACC ^ this.load(a))) ? this.F_OVERFLOW = 1 : this.F_OVERFLOW = 0, this.F_CARRY = t < 0 ? 0 : 1, this.REG_ACC = 255 & t, 11 !== r && (e += h);
                    break;
                case 44:
                    this.F_CARRY = 1;
                    break;
                case 45:
                    this.F_DECIMAL = 1;
                    break;
                case 46:
                    this.F_INTERRUPT = 1;
                    break;
                case 47:
                    this.write(a, this.REG_ACC);
                    break;
                case 48:
                    this.write(a, this.REG_X);
                    break;
                case 49:
                    this.write(a, this.REG_Y);
                    break;
                case 50:
                    this.REG_X = this.REG_ACC, this.F_SIGN = this.REG_ACC >> 7 & 1, this.F_ZERO = this.REG_ACC;
                    break;
                case 51:
                    this.REG_Y = this.REG_ACC, this.F_SIGN = this.REG_ACC >> 7 & 1, this.F_ZERO = this.REG_ACC;
                    break;
                case 52:
                    this.REG_X = this.REG_SP - 256, this.F_SIGN = this.REG_SP >> 7 & 1, this.F_ZERO = this.REG_X;
                    break;
                case 53:
                    this.REG_ACC = this.REG_X, this.F_SIGN = this.REG_X >> 7 & 1, this.F_ZERO = this.REG_X;
                    break;
                case 54:
                    this.REG_SP = this.REG_X + 256, this.stackWrap();
                    break;
                case 55:
                    this.REG_ACC = this.REG_Y, this.F_SIGN = this.REG_Y >> 7 & 1, this.F_ZERO = this.REG_Y;
                    break;
                default:
                    this.nes.stop(), this.nes.crashMessage = "Game crashed, invalid opcode at address $" + n.toString(16)
                }
                return e
            },
            load: function(t) {
                return t < 8192 ? this.mem[2047 & t] : this.nes.mmap.load(t)
            },
            load16bit: function(t) {
                return t < 8191 ? this.mem[2047 & t] | this.mem[t + 1 & 2047] << 8 : this.nes.mmap.load(t) | this.nes.mmap.load(t + 1) << 8
            },
            write: function(t, s) {
                t < 8192 ? this.mem[2047 & t] = s : this.nes.mmap.write(t, s)
            },
            requestIrq: function(t) {
                this.irqRequested && t === this.IRQ_NORMAL || (this.irqRequested = !0, this.irqType = t)
            },
            push: function(t) {
                this.nes.mmap.write(this.REG_SP, t), this.REG_SP--, this.REG_SP = 256 | 255 & this.REG_SP
            },
            stackWrap: function() {
                this.REG_SP = 256 | 255 & this.REG_SP
            },
            pull: function() {
                return this.REG_SP++, this.REG_SP = 256 | 255 & this.REG_SP, this.nes.mmap.load(this.REG_SP)
            },
            pageCrossed: function(t, s) {
                return (65280 & t) != (65280 & s)
            },
            haltCycles: function(t) {
                this.cyclesToHalt += t
            },
            doNonMaskableInterrupt: function(t) {
                0 != (128 & this.nes.mmap.load(8192)) && (this.REG_PC_NEW++, this.push(this.REG_PC_NEW >> 8 & 255), this.push(255 & this.REG_PC_NEW), this.push(t), this.REG_PC_NEW = this.nes.mmap.load(65530) | this.nes.mmap.load(65531) << 8, this.REG_PC_NEW--)
            },
            doResetInterrupt: function() {
                this.REG_PC_NEW = this.nes.mmap.load(65532) | this.nes.mmap.load(65533) << 8, this.REG_PC_NEW--
            },
            doIrq: function(t) {
                this.REG_PC_NEW++, this.push(this.REG_PC_NEW >> 8 & 255), this.push(255 & this.REG_PC_NEW), this.push(t), this.F_INTERRUPT_NEW = 1, this.F_BRK_NEW = 0, this.REG_PC_NEW = this.nes.mmap.load(65534) | this.nes.mmap.load(65535) << 8, this.REG_PC_NEW--
            },
            getStatus: function() {
                return this.F_CARRY | this.F_ZERO << 1 | this.F_INTERRUPT << 2 | this.F_DECIMAL << 3 | this.F_BRK << 4 | this.F_NOTUSED << 5 | this.F_OVERFLOW << 6 | this.F_SIGN << 7
            },
            setStatus: function(t) {
                this.F_CARRY = 1 & t, this.F_ZERO = t >> 1 & 1, this.F_INTERRUPT = t >> 2 & 1, this.F_DECIMAL = t >> 3 & 1, this.F_BRK = t >> 4 & 1, this.F_NOTUSED = t >> 5 & 1, this.F_OVERFLOW = t >> 6 & 1, this.F_SIGN = t >> 7 & 1
            },
            JSON_PROPERTIES: ["mem", "cyclesToHalt", "irqRequested", "irqType", "REG_ACC", "REG_X", "REG_Y", "REG_SP", "REG_PC", "REG_PC_NEW", "REG_STATUS", "F_CARRY", "F_DECIMAL", "F_INTERRUPT", "F_INTERRUPT_NEW", "F_OVERFLOW", "F_SIGN", "F_ZERO", "F_NOTUSED", "F_NOTUSED_NEW", "F_BRK", "F_BRK_NEW"],
            toJSON: function() {
                return e.toJSON(this)
            },
            fromJSON: function(t) {
                e.fromJSON(this, t)
            }
        };
        var r = function() {
            this.opdata = new Array(256);
            for (var t = 0; t < 256; t++)
                this.opdata[t] = 255;
            this.setOp(this.INS_ADC, 105, this.ADDR_IMM, 2, 2), this.setOp(this.INS_ADC, 101, this.ADDR_ZP, 2, 3), this.setOp(this.INS_ADC, 117, this.ADDR_ZPX, 2, 4), this.setOp(this.INS_ADC, 109, this.ADDR_ABS, 3, 4), this.setOp(this.INS_ADC, 125, this.ADDR_ABSX, 3, 4), this.setOp(this.INS_ADC, 121, this.ADDR_ABSY, 3, 4), this.setOp(this.INS_ADC, 97, this.ADDR_PREIDXIND, 2, 6), this.setOp(this.INS_ADC, 113, this.ADDR_POSTIDXIND, 2, 5), this.setOp(this.INS_AND, 41, this.ADDR_IMM, 2, 2), this.setOp(this.INS_AND, 37, this.ADDR_ZP, 2, 3), this.setOp(this.INS_AND, 53, this.ADDR_ZPX, 2, 4), this.setOp(this.INS_AND, 45, this.ADDR_ABS, 3, 4), this.setOp(this.INS_AND, 61, this.ADDR_ABSX, 3, 4), this.setOp(this.INS_AND, 57, this.ADDR_ABSY, 3, 4), this.setOp(this.INS_AND, 33, this.ADDR_PREIDXIND, 2, 6), this.setOp(this.INS_AND, 49, this.ADDR_POSTIDXIND, 2, 5), this.setOp(this.INS_ASL, 10, this.ADDR_ACC, 1, 2), this.setOp(this.INS_ASL, 6, this.ADDR_ZP, 2, 5), this.setOp(this.INS_ASL, 22, this.ADDR_ZPX, 2, 6), this.setOp(this.INS_ASL, 14, this.ADDR_ABS, 3, 6), this.setOp(this.INS_ASL, 30, this.ADDR_ABSX, 3, 7), this.setOp(this.INS_BCC, 144, this.ADDR_REL, 2, 2), this.setOp(this.INS_BCS, 176, this.ADDR_REL, 2, 2), this.setOp(this.INS_BEQ, 240, this.ADDR_REL, 2, 2), this.setOp(this.INS_BIT, 36, this.ADDR_ZP, 2, 3), this.setOp(this.INS_BIT, 44, this.ADDR_ABS, 3, 4), this.setOp(this.INS_BMI, 48, this.ADDR_REL, 2, 2), this.setOp(this.INS_BNE, 208, this.ADDR_REL, 2, 2), this.setOp(this.INS_BPL, 16, this.ADDR_REL, 2, 2), this.setOp(this.INS_BRK, 0, this.ADDR_IMP, 1, 7), this.setOp(this.INS_BVC, 80, this.ADDR_REL, 2, 2), this.setOp(this.INS_BVS, 112, this.ADDR_REL, 2, 2), this.setOp(this.INS_CLC, 24, this.ADDR_IMP, 1, 2), this.setOp(this.INS_CLD, 216, this.ADDR_IMP, 1, 2), this.setOp(this.INS_CLI, 88, this.ADDR_IMP, 1, 2), this.setOp(this.INS_CLV, 184, this.ADDR_IMP, 1, 2), this.setOp(this.INS_CMP, 201, this.ADDR_IMM, 2, 2), this.setOp(this.INS_CMP, 197, this.ADDR_ZP, 2, 3), this.setOp(this.INS_CMP, 213, this.ADDR_ZPX, 2, 4), this.setOp(this.INS_CMP, 205, this.ADDR_ABS, 3, 4), this.setOp(this.INS_CMP, 221, this.ADDR_ABSX, 3, 4), this.setOp(this.INS_CMP, 217, this.ADDR_ABSY, 3, 4), this.setOp(this.INS_CMP, 193, this.ADDR_PREIDXIND, 2, 6), this.setOp(this.INS_CMP, 209, this.ADDR_POSTIDXIND, 2, 5), this.setOp(this.INS_CPX, 224, this.ADDR_IMM, 2, 2), this.setOp(this.INS_CPX, 228, this.ADDR_ZP, 2, 3), this.setOp(this.INS_CPX, 236, this.ADDR_ABS, 3, 4), this.setOp(this.INS_CPY, 192, this.ADDR_IMM, 2, 2), this.setOp(this.INS_CPY, 196, this.ADDR_ZP, 2, 3), this.setOp(this.INS_CPY, 204, this.ADDR_ABS, 3, 4), this.setOp(this.INS_DEC, 198, this.ADDR_ZP, 2, 5), this.setOp(this.INS_DEC, 214, this.ADDR_ZPX, 2, 6), this.setOp(this.INS_DEC, 206, this.ADDR_ABS, 3, 6), this.setOp(this.INS_DEC, 222, this.ADDR_ABSX, 3, 7), this.setOp(this.INS_DEX, 202, this.ADDR_IMP, 1, 2), this.setOp(this.INS_DEY, 136, this.ADDR_IMP, 1, 2), this.setOp(this.INS_EOR, 73, this.ADDR_IMM, 2, 2), this.setOp(this.INS_EOR, 69, this.ADDR_ZP, 2, 3), this.setOp(this.INS_EOR, 85, this.ADDR_ZPX, 2, 4), this.setOp(this.INS_EOR, 77, this.ADDR_ABS, 3, 4), this.setOp(this.INS_EOR, 93, this.ADDR_ABSX, 3, 4), this.setOp(this.INS_EOR, 89, this.ADDR_ABSY, 3, 4), this.setOp(this.INS_EOR, 65, this.ADDR_PREIDXIND, 2, 6), this.setOp(this.INS_EOR, 81, this.ADDR_POSTIDXIND, 2, 5), this.setOp(this.INS_INC, 230, this.ADDR_ZP, 2, 5), this.setOp(this.INS_INC, 246, this.ADDR_ZPX, 2, 6), this.setOp(this.INS_INC, 238, this.ADDR_ABS, 3, 6), this.setOp(this.INS_INC, 254, this.ADDR_ABSX, 3, 7), this.setOp(this.INS_INX, 232, this.ADDR_IMP, 1, 2), this.setOp(this.INS_INY, 200, this.ADDR_IMP, 1, 2), this.setOp(this.INS_JMP, 76, this.ADDR_ABS, 3, 3), this.setOp(this.INS_JMP, 108, this.ADDR_INDABS, 3, 5), this.setOp(this.INS_JSR, 32, this.ADDR_ABS, 3, 6), this.setOp(this.INS_LDA, 169, this.ADDR_IMM, 2, 2), this.setOp(this.INS_LDA, 165, this.ADDR_ZP, 2, 3), this.setOp(this.INS_LDA, 181, this.ADDR_ZPX, 2, 4), this.setOp(this.INS_LDA, 173, this.ADDR_ABS, 3, 4), this.setOp(this.INS_LDA, 189, this.ADDR_ABSX, 3, 4), this.setOp(this.INS_LDA, 185, this.ADDR_ABSY, 3, 4), this.setOp(this.INS_LDA, 161, this.ADDR_PREIDXIND, 2, 6), this.setOp(this.INS_LDA, 177, this.ADDR_POSTIDXIND, 2, 5), this.setOp(this.INS_LDX, 162, this.ADDR_IMM, 2, 2), this.setOp(this.INS_LDX, 166, this.ADDR_ZP, 2, 3), this.setOp(this.INS_LDX, 182, this.ADDR_ZPY, 2, 4), this.setOp(this.INS_LDX, 174, this.ADDR_ABS, 3, 4), this.setOp(this.INS_LDX, 190, this.ADDR_ABSY, 3, 4), this.setOp(this.INS_LDY, 160, this.ADDR_IMM, 2, 2), this.setOp(this.INS_LDY, 164, this.ADDR_ZP, 2, 3), this.setOp(this.INS_LDY, 180, this.ADDR_ZPX, 2, 4), this.setOp(this.INS_LDY, 172, this.ADDR_ABS, 3, 4), this.setOp(this.INS_LDY, 188, this.ADDR_ABSX, 3, 4), this.setOp(this.INS_LSR, 74, this.ADDR_ACC, 1, 2), this.setOp(this.INS_LSR, 70, this.ADDR_ZP, 2, 5), this.setOp(this.INS_LSR, 86, this.ADDR_ZPX, 2, 6), this.setOp(this.INS_LSR, 78, this.ADDR_ABS, 3, 6), this.setOp(this.INS_LSR, 94, this.ADDR_ABSX, 3, 7), this.setOp(this.INS_NOP, 234, this.ADDR_IMP, 1, 2), this.setOp(this.INS_ORA, 9, this.ADDR_IMM, 2, 2), this.setOp(this.INS_ORA, 5, this.ADDR_ZP, 2, 3), this.setOp(this.INS_ORA, 21, this.ADDR_ZPX, 2, 4), this.setOp(this.INS_ORA, 13, this.ADDR_ABS, 3, 4), this.setOp(this.INS_ORA, 29, this.ADDR_ABSX, 3, 4), this.setOp(this.INS_ORA, 25, this.ADDR_ABSY, 3, 4), this.setOp(this.INS_ORA, 1, this.ADDR_PREIDXIND, 2, 6), this.setOp(this.INS_ORA, 17, this.ADDR_POSTIDXIND, 2, 5), this.setOp(this.INS_PHA, 72, this.ADDR_IMP, 1, 3), this.setOp(this.INS_PHP, 8, this.ADDR_IMP, 1, 3), this.setOp(this.INS_PLA, 104, this.ADDR_IMP, 1, 4), this.setOp(this.INS_PLP, 40, this.ADDR_IMP, 1, 4), this.setOp(this.INS_ROL, 42, this.ADDR_ACC, 1, 2), this.setOp(this.INS_ROL, 38, this.ADDR_ZP, 2, 5), this.setOp(this.INS_ROL, 54, this.ADDR_ZPX, 2, 6), this.setOp(this.INS_ROL, 46, this.ADDR_ABS, 3, 6), this.setOp(this.INS_ROL, 62, this.ADDR_ABSX, 3, 7), this.setOp(this.INS_ROR, 106, this.ADDR_ACC, 1, 2), this.setOp(this.INS_ROR, 102, this.ADDR_ZP, 2, 5), this.setOp(this.INS_ROR, 118, this.ADDR_ZPX, 2, 6), this.setOp(this.INS_ROR, 110, this.ADDR_ABS, 3, 6), this.setOp(this.INS_ROR, 126, this.ADDR_ABSX, 3, 7), this.setOp(this.INS_RTI, 64, this.ADDR_IMP, 1, 6), this.setOp(this.INS_RTS, 96, this.ADDR_IMP, 1, 6), this.setOp(this.INS_SBC, 233, this.ADDR_IMM, 2, 2), this.setOp(this.INS_SBC, 229, this.ADDR_ZP, 2, 3), this.setOp(this.INS_SBC, 245, this.ADDR_ZPX, 2, 4), this.setOp(this.INS_SBC, 237, this.ADDR_ABS, 3, 4), this.setOp(this.INS_SBC, 253, this.ADDR_ABSX, 3, 4), this.setOp(this.INS_SBC, 249, this.ADDR_ABSY, 3, 4), this.setOp(this.INS_SBC, 225, this.ADDR_PREIDXIND, 2, 6), this.setOp(this.INS_SBC, 241, this.ADDR_POSTIDXIND, 2, 5), this.setOp(this.INS_SEC, 56, this.ADDR_IMP, 1, 2), this.setOp(this.INS_SED, 248, this.ADDR_IMP, 1, 2), this.setOp(this.INS_SEI, 120, this.ADDR_IMP, 1, 2), this.setOp(this.INS_STA, 133, this.ADDR_ZP, 2, 3), this.setOp(this.INS_STA, 149, this.ADDR_ZPX, 2, 4), this.setOp(this.INS_STA, 141, this.ADDR_ABS, 3, 4), this.setOp(this.INS_STA, 157, this.ADDR_ABSX, 3, 5), this.setOp(this.INS_STA, 153, this.ADDR_ABSY, 3, 5), this.setOp(this.INS_STA, 129, this.ADDR_PREIDXIND, 2, 6), this.setOp(this.INS_STA, 145, this.ADDR_POSTIDXIND, 2, 6), this.setOp(this.INS_STX, 134, this.ADDR_ZP, 2, 3), this.setOp(this.INS_STX, 150, this.ADDR_ZPY, 2, 4), this.setOp(this.INS_STX, 142, this.ADDR_ABS, 3, 4), this.setOp(this.INS_STY, 132, this.ADDR_ZP, 2, 3), this.setOp(this.INS_STY, 148, this.ADDR_ZPX, 2, 4), this.setOp(this.INS_STY, 140, this.ADDR_ABS, 3, 4), this.setOp(this.INS_TAX, 170, this.ADDR_IMP, 1, 2), this.setOp(this.INS_TAY, 168, this.ADDR_IMP, 1, 2), this.setOp(this.INS_TSX, 186, this.ADDR_IMP, 1, 2), this.setOp(this.INS_TXA, 138, this.ADDR_IMP, 1, 2), this.setOp(this.INS_TXS, 154, this.ADDR_IMP, 1, 2), this.setOp(this.INS_TYA, 152, this.ADDR_IMP, 1, 2), this.cycTable = new Array(7, 6, 2, 8, 3, 3, 5, 5, 3, 2, 2, 2, 4, 4, 6, 6, 2, 5, 2, 8, 4, 4, 6, 6, 2, 4, 2, 7, 4, 4, 7, 7, 6, 6, 2, 8, 3, 3, 5, 5, 4, 2, 2, 2, 4, 4, 6, 6, 2, 5, 2, 8, 4, 4, 6, 6, 2, 4, 2, 7, 4, 4, 7, 7, 6, 6, 2, 8, 3, 3, 5, 5, 3, 2, 2, 2, 3, 4, 6, 6, 2, 5, 2, 8, 4, 4, 6, 6, 2, 4, 2, 7, 4, 4, 7, 7, 6, 6, 2, 8, 3, 3, 5, 5, 4, 2, 2, 2, 5, 4, 6, 6, 2, 5, 2, 8, 4, 4, 6, 6, 2, 4, 2, 7, 4, 4, 7, 7, 2, 6, 2, 6, 3, 3, 3, 3, 2, 2, 2, 2, 4, 4, 4, 4, 2, 6, 2, 6, 4, 4, 4, 4, 2, 5, 2, 5, 5, 5, 5, 5, 2, 6, 2, 6, 3, 3, 3, 3, 2, 2, 2, 2, 4, 4, 4, 4, 2, 5, 2, 5, 4, 4, 4, 4, 2, 4, 2, 4, 4, 4, 4, 4, 2, 6, 2, 8, 3, 3, 5, 5, 2, 2, 2, 2, 4, 4, 6, 6, 2, 5, 2, 8, 4, 4, 6, 6, 2, 4, 2, 7, 4, 4, 7, 7, 2, 6, 3, 8, 3, 3, 5, 5, 2, 2, 2, 2, 4, 4, 6, 6, 2, 5, 2, 8, 4, 4, 6, 6, 2, 4, 2, 7, 4, 4, 7, 7), this.instname = new Array(56), this.instname[0] = "ADC", this.instname[1] = "AND", this.instname[2] = "ASL", this.instname[3] = "BCC", this.instname[4] = "BCS", this.instname[5] = "BEQ", this.instname[6] = "BIT", this.instname[7] = "BMI", this.instname[8] = "BNE", this.instname[9] = "BPL", this.instname[10] = "BRK", this.instname[11] = "BVC", this.instname[12] = "BVS", this.instname[13] = "CLC", this.instname[14] = "CLD", this.instname[15] = "CLI", this.instname[16] = "CLV", this.instname[17] = "CMP", this.instname[18] = "CPX", this.instname[19] = "CPY", this.instname[20] = "DEC", this.instname[21] = "DEX", this.instname[22] = "DEY", this.instname[23] = "EOR", this.instname[24] = "INC", this.instname[25] = "INX", this.instname[26] = "INY", this.instname[27] = "JMP", this.instname[28] = "JSR", this.instname[29] = "LDA", this.instname[30] = "LDX", this.instname[31] = "LDY", this.instname[32] = "LSR", this.instname[33] = "NOP", this.instname[34] = "ORA", this.instname[35] = "PHA", this.instname[36] = "PHP", this.instname[37] = "PLA", this.instname[38] = "PLP", this.instname[39] = "ROL", this.instname[40] = "ROR", this.instname[41] = "RTI", this.instname[42] = "RTS", this.instname[43] = "SBC", this.instname[44] = "SEC", this.instname[45] = "SED", this.instname[46] = "SEI";
            this.instname[47] = "STA", this.instname[48] = "STX", this.instname[49] = "STY", this.instname[50] = "TAX", this.instname[51] = "TAY", this.instname[52] = "TSX", this.instname[53] = "TXA", this.instname[54] = "TXS", this.instname[55] = "TYA", this.addrDesc = new Array("Zero Page           ", "Relative            ", "Implied             ", "Absolute            ", "Accumulator         ", "Immediate           ", "Zero Page,X         ", "Zero Page,Y         ", "Absolute,X          ", "Absolute,Y          ", "Preindexed Indirect ", "Postindexed Indirect", "Indirect Absolute   ")
        };
        r.prototype = {
            INS_ADC: 0,
            INS_AND: 1,
            INS_ASL: 2,
            INS_BCC: 3,
            INS_BCS: 4,
            INS_BEQ: 5,
            INS_BIT: 6,
            INS_BMI: 7,
            INS_BNE: 8,
            INS_BPL: 9,
            INS_BRK: 10,
            INS_BVC: 11,
            INS_BVS: 12,
            INS_CLC: 13,
            INS_CLD: 14,
            INS_CLI: 15,
            INS_CLV: 16,
            INS_CMP: 17,
            INS_CPX: 18,
            INS_CPY: 19,
            INS_DEC: 20,
            INS_DEX: 21,
            INS_DEY: 22,
            INS_EOR: 23,
            INS_INC: 24,
            INS_INX: 25,
            INS_INY: 26,
            INS_JMP: 27,
            INS_JSR: 28,
            INS_LDA: 29,
            INS_LDX: 30,
            INS_LDY: 31,
            INS_LSR: 32,
            INS_NOP: 33,
            INS_ORA: 34,
            INS_PHA: 35,
            INS_PHP: 36,
            INS_PLA: 37,
            INS_PLP: 38,
            INS_ROL: 39,
            INS_ROR: 40,
            INS_RTI: 41,
            INS_RTS: 42,
            INS_SBC: 43,
            INS_SEC: 44,
            INS_SED: 45,
            INS_SEI: 46,
            INS_STA: 47,
            INS_STX: 48,
            INS_STY: 49,
            INS_TAX: 50,
            INS_TAY: 51,
            INS_TSX: 52,
            INS_TXA: 53,
            INS_TXS: 54,
            INS_TYA: 55,
            INS_DUMMY: 56,
            ADDR_ZP: 0,
            ADDR_REL: 1,
            ADDR_IMP: 2,
            ADDR_ABS: 3,
            ADDR_ACC: 4,
            ADDR_IMM: 5,
            ADDR_ZPX: 6,
            ADDR_ZPY: 7,
            ADDR_ABSX: 8,
            ADDR_ABSY: 9,
            ADDR_PREIDXIND: 10,
            ADDR_POSTIDXIND: 11,
            ADDR_INDABS: 12,
            setOp: function(t, s, i, e, h) {
                this.opdata[s] = 255 & t | (255 & i) << 8 | (255 & e) << 16 | (255 & h) << 24
            }
        }, t.exports = h
    }, function(t, s, i) {
        var e = i(2),
            h = i(0),
            r = function(t) {
                this.nes = t, this.vramMem = null, this.spriteMem = null, this.vramAddress = null, this.vramTmpAddress = null, this.vramBufferedReadValue = null, this.firstWrite = null, this.sramAddress = null, this.currentMirroring = null, this.requestEndFrame = null, this.nmiOk = null, this.dummyCycleToggle = null, this.validTileData = null, this.nmiCounter = null, this.scanlineAlreadyRendered = null, this.f_nmiOnVblank = null, this.f_spriteSize = null, this.f_bgPatternTable = null, this.f_spPatternTable = null, this.f_addrInc = null, this.f_nTblAddress = null, this.f_color = null, this.f_spVisibility = null, this.f_bgVisibility = null, this.f_spClipping = null, this.f_bgClipping = null, this.f_dispType = null, this.cntFV = null, this.cntV = null, this.cntH = null, this.cntVT = null, this.cntHT = null, this.regFV = null, this.regV = null, this.regH = null, this.regVT = null, this.regHT = null, this.regFH = null, this.regS = null, this.curNt = null, this.attrib = null, this.buffer = null, this.bgbuffer = null, this.pixrendered = null, this.validTileData = null, this.scantile = null, this.scanline = null, this.lastRenderedScanline = null, this.curX = null, this.sprX = null, this.sprY = null, this.sprTile = null, this.sprCol = null, this.vertFlip = null, this.horiFlip = null, this.bgPriority = null, this.spr0HitX = null, this.spr0HitY = null, this.hitSpr0 = null, this.sprPalette = null, this.imgPalette = null, this.ptTile = null, this.ntable1 = null, this.currentMirroring = null, this.nameTable = null, this.vramMirrorTable = null, this.palTable = null, this.showSpr0Hit = !1, this.clipToTvSize = !0, this.reset()
            };
        r.prototype = {
            STATUS_VRAMWRITE: 4,
            STATUS_SLSPRITECOUNT: 5,
            STATUS_SPRITE0HIT: 6,
            STATUS_VBLANK: 7,
            reset: function() {
                var t;
                for (this.vramMem = new Array(32768), this.spriteMem = new Array(256), t = 0; t < this.vramMem.length; t++)
                    this.vramMem[t] = 0;
                for (t = 0; t < this.spriteMem.length; t++)
                    this.spriteMem[t] = 0;
                for (this.vramAddress = null, this.vramTmpAddress = null, this.vramBufferedReadValue = 0, this.firstWrite = !0, this.sramAddress = 0, this.currentMirroring = -1, this.requestEndFrame = !1, this.nmiOk = !1, this.dummyCycleToggle = !1, this.validTileData = !1, this.nmiCounter = 0, this.scanlineAlreadyRendered = null, this.f_nmiOnVblank = 0, this.f_spriteSize = 0, this.f_bgPatternTable = 0, this.f_spPatternTable = 0, this.f_addrInc = 0, this.f_nTblAddress = 0, this.f_color = 0, this.f_spVisibility = 0, this.f_bgVisibility = 0, this.f_spClipping = 0, this.f_bgClipping = 0, this.f_dispType = 0, this.cntFV = 0, this.cntV = 0, this.cntH = 0, this.cntVT = 0, this.cntHT = 0, this.regFV = 0, this.regV = 0, this.regH = 0, this.regVT = 0, this.regHT = 0, this.regFH = 0, this.regS = 0, this.curNt = null, this.attrib = new Array(32), this.buffer = new Array(61440), this.bgbuffer = new Array(61440), this.pixrendered = new Array(61440), this.validTileData = null, this.scantile = new Array(32), this.scanline = 0, this.lastRenderedScanline = -1, this.curX = 0, this.sprX = new Array(64), this.sprY = new Array(64), this.sprTile = new Array(64), this.sprCol = new Array(64), this.vertFlip = new Array(64), this.horiFlip = new Array(64), this.bgPriority = new Array(64), this.spr0HitX = 0, this.spr0HitY = 0, this.hitSpr0 = !1, this.sprPalette = new Array(16), this.imgPalette = new Array(16), this.ptTile = new Array(512), t = 0; t < 512; t++)
                    this.ptTile[t] = new e;
                for (this.ntable1 = new Array(4), this.currentMirroring = -1, this.nameTable = new Array(4), t = 0; t < 4; t++)
                    this.nameTable[t] = new n(32, 32, "Nt" + t);
                for (this.vramMirrorTable = new Array(32768), t = 0; t < 32768; t++)
                    this.vramMirrorTable[t] = t;
                this.palTable = new a, this.palTable.loadNTSCPalette(), this.updateControlReg1(0), this.updateControlReg2(0)
            },
            setMirroring: function(t) {
                if (t !== this.currentMirroring) {
                    this.currentMirroring = t, this.triggerRendering(), null === this.vramMirrorTable && (this.vramMirrorTable = new Array(32768));
                    for (var s = 0; s < 32768; s++)
                        this.vramMirrorTable[s] = s;
                    this.defineMirrorRegion(16160, 16128, 32), this.defineMirrorRegion(16192, 16128, 32), this.defineMirrorRegion(16256, 16128, 32), this.defineMirrorRegion(16320, 16128, 32), this.defineMirrorRegion(12288, 8192, 3840), this.defineMirrorRegion(16384, 0, 16384), t === this.nes.rom.HORIZONTAL_MIRRORING ? (this.ntable1[0] = 0, this.ntable1[1] = 0, this.ntable1[2] = 1, this.ntable1[3] = 1, this.defineMirrorRegion(9216, 8192, 1024), this.defineMirrorRegion(11264, 10240, 1024)) : t === this.nes.rom.VERTICAL_MIRRORING ? (this.ntable1[0] = 0, this.ntable1[1] = 1, this.ntable1[2] = 0, this.ntable1[3] = 1, this.defineMirrorRegion(10240, 8192, 1024), this.defineMirrorRegion(11264, 9216, 1024)) : t === this.nes.rom.SINGLESCREEN_MIRRORING ? (this.ntable1[0] = 0, this.ntable1[1] = 0, this.ntable1[2] = 0, this.ntable1[3] = 0, this.defineMirrorRegion(9216, 8192, 1024), this.defineMirrorRegion(10240, 8192, 1024), this.defineMirrorRegion(11264, 8192, 1024)) : t === this.nes.rom.SINGLESCREEN_MIRRORING2 ? (this.ntable1[0] = 1, this.ntable1[1] = 1, this.ntable1[2] = 1, this.ntable1[3] = 1, this.defineMirrorRegion(9216, 9216, 1024), this.defineMirrorRegion(10240, 9216, 1024), this.defineMirrorRegion(11264, 9216, 1024)) : (this.ntable1[0] = 0, this.ntable1[1] = 1, this.ntable1[2] = 2, this.ntable1[3] = 3)
                }
            },
            defineMirrorRegion: function(t, s, i) {
                for (var e = 0; e < i; e++)
                    this.vramMirrorTable[t + e] = s + e
            },
            startVBlank: function() {
                this.nes.cpu.requestIrq(this.nes.cpu.IRQ_NMI), this.lastRenderedScanline < 239 && this.renderFramePartially(this.lastRenderedScanline + 1, 240 - this.lastRenderedScanline), this.endFrame(), this.lastRenderedScanline = -1
            },
            endScanline: function() {
                switch (this.scanline) {
                case 19:
                    this.dummyCycleToggle && (this.curX = 1, this.dummyCycleToggle = !this.dummyCycleToggle);
                    break;
                case 20:
                    this.setStatusFlag(this.STATUS_VBLANK, !1), this.setStatusFlag(this.STATUS_SPRITE0HIT, !1), this.hitSpr0 = !1, this.spr0HitX = -1, this.spr0HitY = -1, 1 !== this.f_bgVisibility && 1 !== this.f_spVisibility || (this.cntFV = this.regFV, this.cntV = this.regV, this.cntH = this.regH, this.cntVT = this.regVT, this.cntHT = this.regHT, 1 === this.f_bgVisibility && this.renderBgScanline(!1, 0)), 1 === this.f_bgVisibility && 1 === this.f_spVisibility && this.checkSprite0(0), 1 !== this.f_bgVisibility && 1 !== this.f_spVisibility || this.nes.mmap.clockIrqCounter();
                    break;
                case 261:
                    this.setStatusFlag(this.STATUS_VBLANK, !0), this.requestEndFrame = !0, this.nmiCounter = 9, this.scanline = -1;
                    break;
                default:
                    this.scanline >= 21 && this.scanline <= 260 && (1 === this.f_bgVisibility && (this.scanlineAlreadyRendered || (this.cntHT = this.regHT, this.cntH = this.regH, this.renderBgScanline(!0, this.scanline + 1 - 21)), this.scanlineAlreadyRendered = !1, this.hitSpr0 || 1 !== this.f_spVisibility || this.sprX[0] >= -7 && this.sprX[0] < 256 && this.sprY[0] + 1 <= this.scanline - 20 && this.sprY[0] + 1 + (0 === this.f_spriteSize ? 8 : 16) >= this.scanline - 20 && this.checkSprite0(this.scanline - 20) && (this.hitSpr0 = !0)), 1 !== this.f_bgVisibility && 1 !== this.f_spVisibility || this.nes.mmap.clockIrqCounter())
                }
                this.scanline++, this.regsToAddress(), this.cntsToAddress()
            },
            startFrame: function() {
                var t = 0;
                if (0 === this.f_dispType)
                    t = this.imgPalette[0];
                else
                    switch (this.f_color) {
                    case 0:
                        t = 0;
                        break;
                    case 1:
                        t = 65280;
                        break;
                    case 2:
                        t = 16711680;
                        break;
                    case 3:
                        t = 0;
                        break;
                    case 4:
                        t = 255;
                        break;
                    default:
                        t = 0
                    }
                var s,
                    i = this.buffer;
                for (s = 0; s < 61440; s++)
                    i[s] = t;
                var e = this.pixrendered;
                for (s = 0; s < e.length; s++)
                    e[s] = 65
            },
            endFrame: function() {
                var t,
                    s,
                    i,
                    e = this.buffer;
                if (this.showSpr0Hit) {
                    if (this.sprX[0] >= 0 && this.sprX[0] < 256 && this.sprY[0] >= 0 && this.sprY[0] < 240) {
                        for (t = 0; t < 256; t++)
                            e[(this.sprY[0] << 8) + t] = 16733525;
                        for (t = 0; t < 240; t++)
                            e[(t << 8) + this.sprX[0]] = 16733525
                    }
                    if (this.spr0HitX >= 0 && this.spr0HitX < 256 && this.spr0HitY >= 0 && this.spr0HitY < 240) {
                        for (t = 0; t < 256; t++)
                            e[(this.spr0HitY << 8) + t] = 5635925;
                        for (t = 0; t < 240; t++)
                            e[(t << 8) + this.spr0HitX] = 5635925
                    }
                }
                if (this.clipToTvSize || 0 === this.f_bgClipping || 0 === this.f_spClipping)
                    for (i = 0; i < 240; i++)
                        for (s = 0; s < 8; s++)
                            e[(i << 8) + s] = 0;
                if (this.clipToTvSize)
                    for (i = 0; i < 240; i++)
                        for (s = 0; s < 8; s++)
                            e[255 + (i << 8) - s] = 0;
                if (this.clipToTvSize)
                    for (i = 0; i < 8; i++)
                        for (s = 0; s < 256; s++)
                            e[(i << 8) + s] = 0, e[(239 - i << 8) + s] = 0;
                this.nes.ui.writeFrame(e)
            },
            updateControlReg1: function(t) {
                this.triggerRendering(), this.f_nmiOnVblank = t >> 7 & 1, this.f_spriteSize = t >> 5 & 1, this.f_bgPatternTable = t >> 4 & 1, this.f_spPatternTable = t >> 3 & 1, this.f_addrInc = t >> 2 & 1, this.f_nTblAddress = 3 & t, this.regV = t >> 1 & 1, this.regH = 1 & t, this.regS = t >> 4 & 1
            },
            updateControlReg2: function(t) {
                this.triggerRendering(), this.f_color = t >> 5 & 7, this.f_spVisibility = t >> 4 & 1, this.f_bgVisibility = t >> 3 & 1, this.f_spClipping = t >> 2 & 1, this.f_bgClipping = t >> 1 & 1, this.f_dispType = 1 & t, 0 === this.f_dispType && this.palTable.setEmphasis(this.f_color), this.updatePalettes()
            },
            setStatusFlag: function(t, s) {
                var i = 1 << t;
                this.nes.cpu.mem[8194] = this.nes.cpu.mem[8194] & 255 - i | (s ? i : 0)
            },
            readStatusRegister: function() {
                var t = this.nes.cpu.mem[8194];
                return this.firstWrite = !0, this.setStatusFlag(this.STATUS_VBLANK, !1), t
            },
            writeSRAMAddress: function(t) {
                this.sramAddress = t
            },
            sramLoad: function() {
                return this.spriteMem[this.sramAddress]
            },
            sramWrite: function(t) {
                this.spriteMem[this.sramAddress] = t, this.spriteRamWriteUpdate(this.sramAddress, t), this.sramAddress++, this.sramAddress %= 256
            },
            scrollWrite: function(t) {
                this.triggerRendering(), this.firstWrite ? (this.regHT = t >> 3 & 31, this.regFH = 7 & t) : (this.regFV = 7 & t, this.regVT = t >> 3 & 31), this.firstWrite = !this.firstWrite
            },
            writeVRAMAddress: function(t) {
                this.firstWrite ? (this.regFV = t >> 4 & 3, this.regV = t >> 3 & 1, this.regH = t >> 2 & 1, this.regVT = 7 & this.regVT | (3 & t) << 3) : (this.triggerRendering(), this.regVT = 24 & this.regVT | t >> 5 & 7, this.regHT = 31 & t, this.cntFV = this.regFV, this.cntV = this.regV, this.cntH = this.regH, this.cntVT = this.regVT, this.cntHT = this.regHT, this.checkSprite0(this.scanline - 20)), this.firstWrite = !this.firstWrite, this.cntsToAddress(), this.vramAddress < 8192 && this.nes.mmap.latchAccess(this.vramAddress)
            },
            vramLoad: function() {
                var t;
                return this.cntsToAddress(), this.regsToAddress(), this.vramAddress <= 16127 ? (t = this.vramBufferedReadValue, this.vramAddress < 8192 ? this.vramBufferedReadValue = this.vramMem[this.vramAddress] : this.vramBufferedReadValue = this.mirroredLoad(this.vramAddress), this.vramAddress < 8192 && this.nes.mmap.latchAccess(this.vramAddress), this.vramAddress += 1 === this.f_addrInc ? 32 : 1, this.cntsFromAddress(), this.regsFromAddress(), t) : (t = this.mirroredLoad(this.vramAddress), this.vramAddress += 1 === this.f_addrInc ? 32 : 1, this.cntsFromAddress(), this.regsFromAddress(), t)
            },
            vramWrite: function(t) {
                this.triggerRendering(), this.cntsToAddress(), this.regsToAddress(), this.vramAddress >= 8192 ? this.mirroredWrite(this.vramAddress, t) : (this.writeMem(this.vramAddress, t), this.nes.mmap.latchAccess(this.vramAddress)), this.vramAddress += 1 === this.f_addrInc ? 32 : 1, this.regsFromAddress(), this.cntsFromAddress()
            },
            sramDMA: function(t) {
                for (var s, i = 256 * t, e = this.sramAddress; e < 256; e++)
                    s = this.nes.cpu.mem[i + e], this.spriteMem[e] = s, this.spriteRamWriteUpdate(e, s);
                this.nes.cpu.haltCycles(513)
            },
            regsFromAddress: function() {
                var t = this.vramTmpAddress >> 8 & 255;
                this.regFV = t >> 4 & 7, this.regV = t >> 3 & 1, this.regH = t >> 2 & 1, this.regVT = 7 & this.regVT | (3 & t) << 3, t = 255 & this.vramTmpAddress, this.regVT = 24 & this.regVT | t >> 5 & 7, this.regHT = 31 & t
            },
            cntsFromAddress: function() {
                var t = this.vramAddress >> 8 & 255;
                this.cntFV = t >> 4 & 3, this.cntV = t >> 3 & 1, this.cntH = t >> 2 & 1, this.cntVT = 7 & this.cntVT | (3 & t) << 3, t = 255 & this.vramAddress, this.cntVT = 24 & this.cntVT | t >> 5 & 7, this.cntHT = 31 & t
            },
            regsToAddress: function() {
                var t = (7 & this.regFV) << 4;
                t |= (1 & this.regV) << 3, t |= (1 & this.regH) << 2, t |= this.regVT >> 3 & 3;
                var s = (7 & this.regVT) << 5;
                s |= 31 & this.regHT, this.vramTmpAddress = 32767 & (t << 8 | s)
            },
            cntsToAddress: function() {
                var t = (7 & this.cntFV) << 4;
                t |= (1 & this.cntV) << 3, t |= (1 & this.cntH) << 2, t |= this.cntVT >> 3 & 3;
                var s = (7 & this.cntVT) << 5;
                s |= 31 & this.cntHT, this.vramAddress = 32767 & (t << 8 | s)
            },
            incTileCounter: function(t) {
                for (var s = t; 0 !== s; s--)
                    32 === ++this.cntHT && (this.cntHT = 0, ++this.cntVT >= 30 && 2 === ++this.cntH && (this.cntH = 0, 2 === ++this.cntV && (this.cntV = 0, this.cntFV++, this.cntFV &= 7)))
            },
            mirroredLoad: function(t) {
                return this.vramMem[this.vramMirrorTable[t]]
            },
            mirroredWrite: function(t, s) {
                if (t >= 16128 && t < 16160)
                    16128 === t || 16144 === t ? (this.writeMem(16128, s), this.writeMem(16144, s)) : 16132 === t || 16148 === t ? (this.writeMem(16132, s), this.writeMem(16148, s)) : 16136 === t || 16152 === t ? (this.writeMem(16136, s), this.writeMem(16152, s)) : 16140 === t || 16156 === t ? (this.writeMem(16140, s), this.writeMem(16156, s)) : this.writeMem(t, s);
                else {
                    if (!(t < this.vramMirrorTable.length))
                        throw new Error("Invalid VRAM address: " + t.toString(16));
                    this.writeMem(this.vramMirrorTable[t], s)
                }
            },
            triggerRendering: function() {
                this.scanline >= 21 && this.scanline <= 260 && (this.renderFramePartially(this.lastRenderedScanline + 1, this.scanline - 21 - this.lastRenderedScanline), this.lastRenderedScanline = this.scanline - 21)
            },
            renderFramePartially: function(t, s) {
                if (1 === this.f_spVisibility && this.renderSpritesPartially(t, s, !0), 1 === this.f_bgVisibility) {
                    var i = t << 8,
                        e = t + s << 8;
                    e > 61440 && (e = 61440);
                    for (var h = this.buffer, r = this.bgbuffer, n = this.pixrendered, a = i; a < e; a++)
                        n[a] > 255 && (h[a] = r[a])
                }
                1 === this.f_spVisibility && this.renderSpritesPartially(t, s, !1), this.validTileData = !1
            },
            renderBgScanline: function(t, s) {
                var i = 0 === this.regS ? 0 : 256,
                    e = (s << 8) - this.regFH;
                if (this.curNt = this.ntable1[this.cntV + this.cntV + this.cntH], this.cntHT = this.regHT, this.cntH = this.regH, this.curNt = this.ntable1[this.cntV + this.cntV + this.cntH], s < 240 && s - this.cntFV >= 0) {
                    for (var h, r, n, a, o = this.cntFV << 3, l = this.scantile, p = this.attrib, u = this.ptTile, m = this.nameTable, c = this.imgPalette, R = this.pixrendered, d = t ? this.bgbuffer : this.buffer, _ = 0; _ < 32; _++) {
                        if (s >= 0) {
                            if (this.validTileData) {
                                if (void 0 === (h = l[_]))
                                    continue;
                                r = h.pix, n = p[_]
                            } else {
                                if (void 0 === (h = u[i + m[this.curNt].getTileIndex(this.cntHT, this.cntVT)]))
                                    continue;
                                r = h.pix, n = m[this.curNt].getAttrib(this.cntHT, this.cntVT), l[_] = h, p[_] = n
                            }
                            var S = 0,
                                g = (_ << 3) - this.regFH;
                            if (g > -8)
                                if (g < 0 && (e -= g, S = -g), h.opaque[this.cntFV])
                                    for (; S < 8; S++)
                                        d[e] = c[r[o + S] + n], R[e] |= 256, e++;
                                else
                                    for (; S < 8; S++)
                                        a = r[o + S], 0 !== a && (d[e] = c[a + n], R[e] |= 256), e++
                        }
                        32 == ++this.cntHT && (this.cntHT = 0, this.cntH++, this.cntH %= 2, this.curNt = this.ntable1[(this.cntV << 1) + this.cntH])
                    }
                    this.validTileData = !0
                }
                8 === ++this.cntFV && (this.cntFV = 0, this.cntVT++, 30 === this.cntVT ? (this.cntVT = 0, this.cntV++, this.cntV %= 2, this.curNt = this.ntable1[(this.cntV << 1) + this.cntH]) : 32 === this.cntVT && (this.cntVT = 0), this.validTileData = !1)
            },
            renderSpritesPartially: function(t, s, i) {
                if (1 === this.f_spVisibility)
                    for (var e = 0; e < 64; e++)
                        if (this.bgPriority[e] === i && this.sprX[e] >= 0 && this.sprX[e] < 256 && this.sprY[e] + 8 >= t && this.sprY[e] < t + s)
                            if (0 === this.f_spriteSize)
                                this.srcy1 = 0, this.srcy2 = 8, this.sprY[e] < t && (this.srcy1 = t - this.sprY[e] - 1), this.sprY[e] + 8 > t + s && (this.srcy2 = t + s - this.sprY[e] + 1), 0 === this.f_spPatternTable ? this.ptTile[this.sprTile[e]].render(this.buffer, 0, this.srcy1, 8, this.srcy2, this.sprX[e], this.sprY[e] + 1, this.sprCol[e], this.sprPalette, this.horiFlip[e], this.vertFlip[e], e, this.pixrendered) : this.ptTile[this.sprTile[e] + 256].render(this.buffer, 0, this.srcy1, 8, this.srcy2, this.sprX[e], this.sprY[e] + 1, this.sprCol[e], this.sprPalette, this.horiFlip[e], this.vertFlip[e], e, this.pixrendered);
                            else {
                                var h = this.sprTile[e];
                                0 != (1 & h) && (h = this.sprTile[e] - 1 + 256);
                                var r = 0,
                                    n = 8;
                                this.sprY[e] < t && (r = t - this.sprY[e] - 1), this.sprY[e] + 8 > t + s && (n = t + s - this.sprY[e]), this.ptTile[h + (this.vertFlip[e] ? 1 : 0)].render(this.buffer, 0, r, 8, n, this.sprX[e], this.sprY[e] + 1, this.sprCol[e], this.sprPalette, this.horiFlip[e], this.vertFlip[e], e, this.pixrendered), r = 0, n = 8, this.sprY[e] + 8 < t && (r = t - (this.sprY[e] + 8 + 1)), this.sprY[e] + 16 > t + s && (n = t + s - (this.sprY[e] + 8)), this.ptTile[h + (this.vertFlip[e] ? 0 : 1)].render(this.buffer, 0, r, 8, n, this.sprX[e], this.sprY[e] + 1 + 8, this.sprCol[e], this.sprPalette, this.horiFlip[e], this.vertFlip[e], e, this.pixrendered)
                            }
            },
            checkSprite0: function(t) {
                this.spr0HitX = -1, this.spr0HitY = -1;
                var s,
                    i,
                    e,
                    h,
                    r,
                    n,
                    a = 0 === this.f_spPatternTable ? 0 : 256;
                if (i = this.sprX[0], e = this.sprY[0] + 1, 0 === this.f_spriteSize) {
                    if (e <= t && e + 8 > t && i >= -7 && i < 256)
                        if (h = this.ptTile[this.sprTile[0] + a], this.sprCol[0], this.bgPriority[0], s = this.vertFlip[0] ? 7 - (t - e) : t - e, s *= 8, n = 256 * t + i, this.horiFlip[0])
                            for (r = 7; r >= 0; r--) {
                                if (i >= 0 && i < 256 && n >= 0 && n < 61440 && 0 !== this.pixrendered[n] && 0 !== h.pix[s + r])
                                    return this.spr0HitX = n % 256, this.spr0HitY = t, !0;
                                i++, n++
                            }
                        else
                            for (r = 0; r < 8; r++) {
                                if (i >= 0 && i < 256 && n >= 0 && n < 61440 && 0 !== this.pixrendered[n] && 0 !== h.pix[s + r])
                                    return this.spr0HitX = n % 256, this.spr0HitY = t, !0;
                                i++, n++
                            }
                } else if (e <= t && e + 16 > t && i >= -7 && i < 256)
                    if (s = this.vertFlip[0] ? 15 - (t - e) : t - e, s < 8 ? h = this.ptTile[this.sprTile[0] + (this.vertFlip[0] ? 1 : 0) + (0 != (1 & this.sprTile[0]) ? 255 : 0)] : (h = this.ptTile[this.sprTile[0] + (this.vertFlip[0] ? 0 : 1) + (0 != (1 & this.sprTile[0]) ? 255 : 0)], this.vertFlip[0] ? s = 15 - s : s -= 8), s *= 8, this.sprCol[0], this.bgPriority[0], n = 256 * t + i, this.horiFlip[0])
                        for (r = 7; r >= 0; r--) {
                            if (i >= 0 && i < 256 && n >= 0 && n < 61440 && 0 !== this.pixrendered[n] && 0 !== h.pix[s + r])
                                return this.spr0HitX = n % 256, this.spr0HitY = t, !0;
                            i++, n++
                        }
                    else
                        for (r = 0; r < 8; r++) {
                            if (i >= 0 && i < 256 && n >= 0 && n < 61440 && 0 !== this.pixrendered[n] && 0 !== h.pix[s + r])
                                return this.spr0HitX = n % 256, this.spr0HitY = t, !0;
                            i++, n++
                        }
                return !1
            },
            writeMem: function(t, s) {
                this.vramMem[t] = s, t < 8192 ? (this.vramMem[t] = s, this.patternWrite(t, s)) : t >= 8192 && t < 9152 ? this.nameTableWrite(this.ntable1[0], t - 8192, s) : t >= 9152 && t < 9216 ? this.attribTableWrite(this.ntable1[0], t - 9152, s) : t >= 9216 && t < 10176 ? this.nameTableWrite(this.ntable1[1], t - 9216, s) : t >= 10176 && t < 10240 ? this.attribTableWrite(this.ntable1[1], t - 10176, s) : t >= 10240 && t < 11200 ? this.nameTableWrite(this.ntable1[2], t - 10240, s) : t >= 11200 && t < 11264 ? this.attribTableWrite(this.ntable1[2], t - 11200, s) : t >= 11264 && t < 12224 ? this.nameTableWrite(this.ntable1[3], t - 11264, s) : t >= 12224 && t < 12288 ? this.attribTableWrite(this.ntable1[3], t - 12224, s) : t >= 16128 && t < 16160 && this.updatePalettes()
            },
            updatePalettes: function() {
                var t;
                for (t = 0; t < 16; t++)
                    0 === this.f_dispType ? this.imgPalette[t] = this.palTable.getEntry(63 & this.vramMem[16128 + t]) : this.imgPalette[t] = this.palTable.getEntry(32 & this.vramMem[16128 + t]);
                for (t = 0; t < 16; t++)
                    0 === this.f_dispType ? this.sprPalette[t] = this.palTable.getEntry(63 & this.vramMem[16144 + t]) : this.sprPalette[t] = this.palTable.getEntry(32 & this.vramMem[16144 + t])
            },
            patternWrite: function(t, s) {
                var i = Math.floor(t / 16),
                    e = t % 16;
                e < 8 ? this.ptTile[i].setScanline(e, s, this.vramMem[t + 8]) : this.ptTile[i].setScanline(e - 8, this.vramMem[t - 8], s)
            },
            nameTableWrite: function(t, s, i) {
                this.nameTable[t].tile[s] = i, this.checkSprite0(this.scanline - 20)
            },
            attribTableWrite: function(t, s, i) {
                this.nameTable[t].writeAttrib(s, i)
            },
            spriteRamWriteUpdate: function(t, s) {
                var i = Math.floor(t / 4);
                0 === i && this.checkSprite0(this.scanline - 20), t % 4 == 0 ? this.sprY[i] = s : t % 4 == 1 ? this.sprTile[i] = s : t % 4 == 2 ? (this.vertFlip[i] = 0 != (128 & s), this.horiFlip[i] = 0 != (64 & s), this.bgPriority[i] = 0 != (32 & s), this.sprCol[i] = (3 & s) << 2) : t % 4 == 3 && (this.sprX[i] = s)
            },
            doNMI: function() {
                this.setStatusFlag(this.STATUS_VBLANK, !0), this.nes.cpu.requestIrq(this.nes.cpu.IRQ_NMI)
            },
            isPixelWhite: function(t, s) {
                return this.triggerRendering(), 16777215 === this.nes.ppu.buffer[(s << 8) + t]
            },
            JSON_PROPERTIES: ["vramMem", "spriteMem", "cntFV", "cntV", "cntH", "cntVT", "cntHT", "regFV", "regV", "regH", "regVT", "regHT", "regFH", "regS", "vramAddress", "vramTmpAddress", "f_nmiOnVblank", "f_spriteSize", "f_bgPatternTable", "f_spPatternTable", "f_addrInc", "f_nTblAddress", "f_color", "f_spVisibility", "f_bgVisibility", "f_spClipping", "f_bgClipping", "f_dispType", "vramBufferedReadValue", "firstWrite", "currentMirroring", "vramMirrorTable", "ntable1", "sramAddress", "hitSpr0", "sprPalette", "imgPalette", "curX", "scanline", "lastRenderedScanline", "curNt", "scantile", "attrib", "buffer", "bgbuffer", "pixrendered", "requestEndFrame", "nmiOk", "dummyCycleToggle", "nmiCounter", "validTileData", "scanlineAlreadyRendered"],
            toJSON: function() {
                var t,
                    s = h.toJSON(this);
                for (s.nameTable = [], t = 0; t < this.nameTable.length; t++)
                    s.nameTable[t] = this.nameTable[t].toJSON();
                for (s.ptTile = [], t = 0; t < this.ptTile.length; t++)
                    s.ptTile[t] = this.ptTile[t].toJSON();
                return s
            },
            fromJSON: function(t) {
                var s;
                for (h.fromJSON(this, t), s = 0; s < this.nameTable.length; s++)
                    this.nameTable[s].fromJSON(t.nameTable[s]);
                for (s = 0; s < this.ptTile.length; s++)
                    this.ptTile[s].fromJSON(t.ptTile[s]);
                for (s = 0; s < this.spriteMem.length; s++)
                    this.spriteRamWriteUpdate(s, this.spriteMem[s])
            }
        };
        var n = function(t, s, i) {
            this.width = t, this.height = s, this.name = i, this.tile = new Array(t * s), this.attrib = new Array(t * s);
            for (var e = 0; e < t * s; e++)
                this.tile[e] = 0, this.attrib[e] = 0
        };
        n.prototype = {
            getTileIndex: function(t, s) {
                return this.tile[s * this.width + t]
            },
            getAttrib: function(t, s) {
                return this.attrib[s * this.width + t]
            },
            writeAttrib: function(t, s) {
                for (var i, e, h, r = t % 8 * 4, n = 4 * Math.floor(t / 8), a = 0; a < 2; a++)
                    for (var o = 0; o < 2; o++) {
                        i = s >> 2 * (2 * a + o) & 3;
                        for (var l = 0; l < 2; l++)
                            for (var p = 0; p < 2; p++)
                                e = r + 2 * o + p, h = n + 2 * a + l, h * this.width + e, this.attrib[h * this.width + e] = i << 2 & 12
                    }
            },
            toJSON: function() {
                return {
                    tile: this.tile,
                    attrib: this.attrib
                }
            },
            fromJSON: function(t) {
                this.tile = t.tile, this.attrib = t.attrib
            }
        };
        var a = function() {
            this.curTable = new Array(64), this.emphTable = new Array(8), this.currentEmph = -1
        };
        a.prototype = {
            reset: function() {
                this.setEmphasis(0)
            },
            loadNTSCPalette: function() {
                this.curTable = [5395026, 11796480, 10485760, 11599933, 7602281, 91, 95, 6208, 12048, 543240, 26368, 1196544, 7153664, 0, 0, 0, 12899815, 16728064, 14421538, 16729963, 14090399, 6818519, 6588, 21681, 27227, 35843, 43776, 2918400, 10777088, 0, 0, 0, 16316664, 16755516, 16742785, 16735173, 16730354, 14633471, 4681215, 46327, 57599, 58229, 259115, 7911470, 15065624, 7895160, 0, 0, 16777215, 16773822, 16300216, 16300248, 16758527, 16761855, 13095423, 10148607, 8973816, 8650717, 12122296, 16119980, 16777136, 16308472, 0, 0], this.makeTables(), this.setEmphasis(0)
            },
            loadPALPalette: function() {
                this.curTable = [5395026, 11796480, 10485760, 11599933, 7602281, 91, 95, 6208, 12048, 543240, 26368, 1196544, 7153664, 0, 0, 0, 12899815, 16728064, 14421538, 16729963, 14090399, 6818519, 6588, 21681, 27227, 35843, 43776, 2918400, 10777088, 0, 0, 0, 16316664, 16755516, 16742785, 16735173, 16730354, 14633471, 4681215, 46327, 57599, 58229, 259115, 7911470, 15065624, 7895160, 0, 0, 16777215, 16773822, 16300216, 16300248, 16758527, 16761855, 13095423, 10148607, 8973816, 8650717, 12122296, 16119980, 16777136, 16308472, 0, 0], this.makeTables(), this.setEmphasis(0)
            },
            makeTables: function() {
                for (var t, s, i, e, h, r, n, a, o = 0; o < 8; o++)
                    for (r = 1, n = 1, a = 1, 0 != (1 & o) && (r = .75, a = .75), 0 != (2 & o) && (r = .75, n = .75), 0 != (4 & o) && (n = .75, a = .75), this.emphTable[o] = new Array(64), h = 0; h < 64; h++)
                        e = this.curTable[h], t = Math.floor(this.getRed(e) * r), s = Math.floor(this.getGreen(e) * n), i = Math.floor(this.getBlue(e) * a), this.emphTable[o][h] = this.getRgb(t, s, i)
            },
            setEmphasis: function(t) {
                if (t !== this.currentEmph) {
                    this.currentEmph = t;
                    for (var s = 0; s < 64; s++)
                        this.curTable[s] = this.emphTable[t][s]
                }
            },
            getEntry: function(t) {
                return this.curTable[t]
            },
            getRed: function(t) {
                return t >> 16 & 255
            },
            getGreen: function(t) {
                return t >> 8 & 255
            },
            getBlue: function(t) {
                return 255 & t
            },
            getRgb: function(t, s, i) {
                return t << 16 | s << 8 | i
            },
            loadDefaultPalette: function() {
                this.curTable[0] = this.getRgb(117, 117, 117), this.curTable[1] = this.getRgb(39, 27, 143), this.curTable[2] = this.getRgb(0, 0, 171), this.curTable[3] = this.getRgb(71, 0, 159), this.curTable[4] = this.getRgb(143, 0, 119), this.curTable[5] = this.getRgb(171, 0, 19), this.curTable[6] = this.getRgb(167, 0, 0), this.curTable[7] = this.getRgb(127, 11, 0), this.curTable[8] = this.getRgb(67, 47, 0), this.curTable[9] = this.getRgb(0, 71, 0), this.curTable[10] = this.getRgb(0, 81, 0), this.curTable[11] = this.getRgb(0, 63, 23), this.curTable[12] = this.getRgb(27, 63, 95), this.curTable[13] = this.getRgb(0, 0, 0), this.curTable[14] = this.getRgb(0, 0, 0), this.curTable[15] = this.getRgb(0, 0, 0), this.curTable[16] = this.getRgb(188, 188, 188), this.curTable[17] = this.getRgb(0, 115, 239), this.curTable[18] = this.getRgb(35, 59, 239), this.curTable[19] = this.getRgb(131, 0, 243), this.curTable[20] = this.getRgb(191, 0, 191), this.curTable[21] = this.getRgb(231, 0, 91), this.curTable[22] = this.getRgb(219, 43, 0), this.curTable[23] = this.getRgb(203, 79, 15), this.curTable[24] = this.getRgb(139, 115, 0), this.curTable[25] = this.getRgb(0, 151, 0), this.curTable[26] = this.getRgb(0, 171, 0), this.curTable[27] = this.getRgb(0, 147, 59), this.curTable[28] = this.getRgb(0, 131, 139), this.curTable[29] = this.getRgb(0, 0, 0), this.curTable[30] = this.getRgb(0, 0, 0), this.curTable[31] = this.getRgb(0, 0, 0), this.curTable[32] = this.getRgb(255, 255, 255), this.curTable[33] = this.getRgb(63, 191, 255), this.curTable[34] = this.getRgb(95, 151, 255), this.curTable[35] = this.getRgb(167, 139, 253), this.curTable[36] = this.getRgb(247, 123, 255), this.curTable[37] = this.getRgb(255, 119, 183), this.curTable[38] = this.getRgb(255, 119, 99), this.curTable[39] = this.getRgb(255, 155, 59), this.curTable[40] = this.getRgb(243, 191, 63), this.curTable[41] = this.getRgb(131, 211, 19), this.curTable[42] = this.getRgb(79, 223, 75), this.curTable[43] = this.getRgb(88, 248, 152), this.curTable[44] = this.getRgb(0, 235, 219), this.curTable[45] = this.getRgb(0, 0, 0), this.curTable[46] = this.getRgb(0, 0, 0), this.curTable[47] = this.getRgb(0, 0, 0), this.curTable[48] = this.getRgb(255, 255, 255), this.curTable[49] = this.getRgb(171, 231, 255), this.curTable[50] = this.getRgb(199, 215, 255), this.curTable[51] = this.getRgb(215, 203, 255), this.curTable[52] = this.getRgb(255, 199, 255), this.curTable[53] = this.getRgb(255, 199, 219), this.curTable[54] = this.getRgb(255, 191, 179), this.curTable[55] = this.getRgb(255, 219, 171), this.curTable[56] = this.getRgb(255, 231, 163), this.curTable[57] = this.getRgb(227, 255, 163), this.curTable[58] = this.getRgb(171, 243, 191), this.curTable[59] = this.getRgb(179, 255, 207), this.curTable[60] = this.getRgb(159, 255, 243), this.curTable[61] = this.getRgb(0, 0, 0), this.curTable[62] = this.getRgb(0, 0, 0), this.curTable[63] = this.getRgb(0, 0, 0), this.makeTables(), this.setEmphasis(0)
            }
        }, t.exports = r
    }, function(t, s) {
        var i = function(t) {
            this.nes = t, this.square1 = new r(this, !0), this.square2 = new r(this, !1), this.triangle = new n(this), this.noise = new h(this), this.dmc = new e(this), this.frameIrqCounter = null, this.frameIrqCounterMax = 4, this.initCounter = 2048, this.channelEnableValue = null, this.sampleRate = 44100, this.lengthLookup = null, this.dmcFreqLookup = null, this.noiseWavelengthLookup = null, this.square_table = null, this.tnd_table = null, this.frameIrqEnabled = !1, this.frameIrqActive = null, this.frameClockNow = null, this.startedPlaying = !1, this.recordOutput = !1, this.initingHardware = !1, this.masterFrameCounter = null, this.derivedFrameCounter = null, this.countSequence = null, this.sampleTimer = null, this.frameTime = null, this.sampleTimerMax = null, this.sampleCount = null, this.triValue = 0, this.smpSquare1 = null, this.smpSquare2 = null, this.smpTriangle = null, this.smpDmc = null, this.accCount = null, this.prevSampleL = 0, this.prevSampleR = 0, this.smpAccumL = 0, this.smpAccumR = 0, this.dacRange = 0, this.dcValue = 0, this.masterVolume = 256, this.stereoPosLSquare1 = null, this.stereoPosLSquare2 = null, this.stereoPosLTriangle = null, this.stereoPosLNoise = null, this.stereoPosLDMC = null, this.stereoPosRSquare1 = null, this.stereoPosRSquare2 = null, this.stereoPosRTriangle = null, this.stereoPosRNoise = null, this.stereoPosRDMC = null, this.extraCycles = null, this.maxSample = null, this.minSample = null, this.panning = [80, 170, 100, 150, 128], this.setPanning(this.panning), this.initLengthLookup(), this.initDmcFrequencyLookup(), this.initNoiseWavelengthLookup(), this.initDACtables();
            for (var s = 0; s < 20; s++)
                16 === s ? this.writeReg(16400, 16) : this.writeReg(16384 + s, 0);
            this.reset()
        };
        i.prototype = {
            reset: function() {
                this.sampleRate = this.nes.opts.sampleRate, this.sampleTimerMax = Math.floor(1832727040 * this.nes.opts.preferredFrameRate / (60 * this.sampleRate)), this.frameTime = Math.floor(14915 * this.nes.opts.preferredFrameRate / 60), this.sampleTimer = 0, this.updateChannelEnable(0), this.masterFrameCounter = 0, this.derivedFrameCounter = 0, this.countSequence = 0, this.sampleCount = 0, this.initCounter = 2048, this.frameIrqEnabled = !1, this.initingHardware = !1, this.resetCounter(), this.square1.reset(), this.square2.reset(), this.triangle.reset(), this.noise.reset(), this.dmc.reset(), this.accCount = 0, this.smpSquare1 = 0, this.smpSquare2 = 0, this.smpTriangle = 0, this.smpDmc = 0, this.frameIrqEnabled = !1, this.frameIrqCounterMax = 4, this.channelEnableValue = 255, this.startedPlaying = !1, this.prevSampleL = 0, this.prevSampleR = 0, this.smpAccumL = 0, this.smpAccumR = 0, this.maxSample = -5e5, this.minSample = 5e5
            },
            readReg: function(t) {
                var s = 0;
                return s |= this.square1.getLengthStatus(), s |= this.square2.getLengthStatus() << 1, s |= this.triangle.getLengthStatus() << 2, s |= this.noise.getLengthStatus() << 3, s |= this.dmc.getLengthStatus() << 4, s |= (this.frameIrqActive && this.frameIrqEnabled ? 1 : 0) << 6, s |= this.dmc.getIrqStatus() << 7, this.frameIrqActive = !1, this.dmc.irqGenerated = !1, 65535 & s
            },
            writeReg: function(t, s) {
                t >= 16384 && t < 16388 ? this.square1.writeReg(t, s) : t >= 16388 && t < 16392 ? this.square2.writeReg(t, s) : t >= 16392 && t < 16396 ? this.triangle.writeReg(t, s) : t >= 16396 && t <= 16399 ? this.noise.writeReg(t, s) : 16400 === t ? this.dmc.writeReg(t, s) : 16401 === t ? this.dmc.writeReg(t, s) : 16402 === t ? this.dmc.writeReg(t, s) : 16403 === t ? this.dmc.writeReg(t, s) : 16405 === t ? (this.updateChannelEnable(s), 0 !== s && this.initCounter > 0 && (this.initingHardware = !0), this.dmc.writeReg(t, s)) : 16407 === t && (this.countSequence = s >> 7 & 1, this.masterFrameCounter = 0, this.frameIrqActive = !1, this.frameIrqEnabled = 0 == (s >> 6 & 1), 0 === this.countSequence ? (this.frameIrqCounterMax = 4, this.derivedFrameCounter = 4) : (this.frameIrqCounterMax = 5, this.derivedFrameCounter = 0, this.frameCounterTick()))
            },
            resetCounter: function() {
                0 === this.countSequence ? this.derivedFrameCounter = 4 : this.derivedFrameCounter = 0
            },
            updateChannelEnable: function(t) {
                this.channelEnableValue = 65535 & t, this.square1.setEnabled(0 != (1 & t)), this.square2.setEnabled(0 != (2 & t)), this.triangle.setEnabled(0 != (4 & t)), this.noise.setEnabled(0 != (8 & t)), this.dmc.setEnabled(0 != (16 & t))
            },
            clockFrameCounter: function(t) {
                if (this.initCounter > 0 && this.initingHardware)
                    return this.initCounter -= t, void (this.initCounter <= 0 && (this.initingHardware = !1));
                t += this.extraCycles;
                var s = this.sampleTimerMax - this.sampleTimer;
                t << 10 > s ? (this.extraCycles = (t << 10) - s >> 10, t -= this.extraCycles) : this.extraCycles = 0;
                var i = this.dmc,
                    e = this.triangle,
                    h = this.square1,
                    r = this.square2,
                    n = this.noise;
                if (i.isEnabled)
                    for (i.shiftCounter -= t << 3; i.shiftCounter <= 0 && i.dmaFrequency > 0;)
                        i.shiftCounter += i.dmaFrequency, i.clockDmc();
                if (e.progTimerMax > 0)
                    for (e.progTimerCount -= t; e.progTimerCount <= 0;)
                        e.progTimerCount += e.progTimerMax + 1, e.linearCounter > 0 && e.lengthCounter > 0 && (e.triangleCounter++, e.triangleCounter &= 31, e.isEnabled && (e.triangleCounter >= 16 ? e.sampleValue = 15 & e.triangleCounter : e.sampleValue = 15 - (15 & e.triangleCounter), e.sampleValue <<= 4));
                h.progTimerCount -= t, h.progTimerCount <= 0 && (h.progTimerCount += h.progTimerMax + 1 << 1, h.squareCounter++, h.squareCounter &= 7, h.updateSampleValue()), r.progTimerCount -= t, r.progTimerCount <= 0 && (r.progTimerCount += r.progTimerMax + 1 << 1, r.squareCounter++, r.squareCounter &= 7, r.updateSampleValue());
                var a = t;
                if (n.progTimerCount - a > 0)
                    n.progTimerCount -= a, n.accCount += a, n.accValue += a * n.sampleValue;
                else
                    for (; a-- > 0;)
                        --n.progTimerCount <= 0 && n.progTimerMax > 0 && (n.shiftReg <<= 1, n.tmp = 32768 & (n.shiftReg << (0 === n.randomMode ? 1 : 6) ^ n.shiftReg), 0 !== n.tmp ? (n.shiftReg |= 1, n.randomBit = 0, n.sampleValue = 0) : (n.randomBit = 1, n.isEnabled && n.lengthCounter > 0 ? n.sampleValue = n.masterVolume : n.sampleValue = 0), n.progTimerCount += n.progTimerMax), n.accValue += n.sampleValue, n.accCount++;
                this.frameIrqEnabled && this.frameIrqActive && this.nes.cpu.requestIrq(this.nes.cpu.IRQ_NORMAL), this.masterFrameCounter += t << 1, this.masterFrameCounter >= this.frameTime && (this.masterFrameCounter -= this.frameTime, this.frameCounterTick()), this.accSample(t), this.sampleTimer += t << 10, this.sampleTimer >= this.sampleTimerMax && (this.sample(), this.sampleTimer -= this.sampleTimerMax)
            },
            accSample: function(t) {
                this.triangle.sampleCondition && (this.triValue = Math.floor((this.triangle.progTimerCount << 4) / (this.triangle.progTimerMax + 1)), this.triValue > 16 && (this.triValue = 16), this.triangle.triangleCounter >= 16 && (this.triValue = 16 - this.triValue), this.triValue += this.triangle.sampleValue), 2 === t ? (this.smpTriangle += this.triValue << 1, this.smpDmc += this.dmc.sample << 1, this.smpSquare1 += this.square1.sampleValue << 1, this.smpSquare2 += this.square2.sampleValue << 1, this.accCount += 2) : 4 === t ? (this.smpTriangle += this.triValue << 2, this.smpDmc += this.dmc.sample << 2, this.smpSquare1 += this.square1.sampleValue << 2, this.smpSquare2 += this.square2.sampleValue << 2, this.accCount += 4) : (this.smpTriangle += t * this.triValue, this.smpDmc += t * this.dmc.sample, this.smpSquare1 += t * this.square1.sampleValue, this.smpSquare2 += t * this.square2.sampleValue, this.accCount += t)
            },
            frameCounterTick: function() {
                this.derivedFrameCounter++, this.derivedFrameCounter >= this.frameIrqCounterMax && (this.derivedFrameCounter = 0), 1 !== this.derivedFrameCounter && 3 !== this.derivedFrameCounter || (this.triangle.clockLengthCounter(), this.square1.clockLengthCounter(), this.square2.clockLengthCounter(), this.noise.clockLengthCounter(), this.square1.clockSweep(), this.square2.clockSweep()), this.derivedFrameCounter >= 0 && this.derivedFrameCounter < 4 && (this.square1.clockEnvDecay(), this.square2.clockEnvDecay(), this.noise.clockEnvDecay(), this.triangle.clockLinearCounter()), 3 === this.derivedFrameCounter && 0 === this.countSequence && (this.frameIrqActive = !0)
            },
            sample: function() {
                var t,
                    s;
                this.accCount > 0 ? (this.smpSquare1 <<= 4, this.smpSquare1 = Math.floor(this.smpSquare1 / this.accCount), this.smpSquare2 <<= 4, this.smpSquare2 = Math.floor(this.smpSquare2 / this.accCount), this.smpTriangle = Math.floor(this.smpTriangle / this.accCount), this.smpDmc <<= 4, this.smpDmc = Math.floor(this.smpDmc / this.accCount), this.accCount = 0) : (this.smpSquare1 = this.square1.sampleValue << 4, this.smpSquare2 = this.square2.sampleValue << 4, this.smpTriangle = this.triangle.sampleValue, this.smpDmc = this.dmc.sample << 4);
                var i = Math.floor((this.noise.accValue << 4) / this.noise.accCount);
                this.noise.accValue = i >> 4, this.noise.accCount = 1, t = this.smpSquare1 * this.stereoPosLSquare1 + this.smpSquare2 * this.stereoPosLSquare2 >> 8, s = 3 * this.smpTriangle * this.stereoPosLTriangle + (i << 1) * this.stereoPosLNoise + this.smpDmc * this.stereoPosLDMC >> 8, t >= this.square_table.length && (t = this.square_table.length - 1), s >= this.tnd_table.length && (s = this.tnd_table.length - 1);
                var e = this.square_table[t] + this.tnd_table[s] - this.dcValue;
                t = this.smpSquare1 * this.stereoPosRSquare1 + this.smpSquare2 * this.stereoPosRSquare2 >> 8, s = 3 * this.smpTriangle * this.stereoPosRTriangle + (i << 1) * this.stereoPosRNoise + this.smpDmc * this.stereoPosRDMC >> 8, t >= this.square_table.length && (t = this.square_table.length - 1), s >= this.tnd_table.length && (s = this.tnd_table.length - 1);
                var h = this.square_table[t] + this.tnd_table[s] - this.dcValue,
                    r = e - this.prevSampleL;
                this.prevSampleL += r, this.smpAccumL += r - (this.smpAccumL >> 10), e = this.smpAccumL;
                var n = h - this.prevSampleR;
                this.prevSampleR += n, this.smpAccumR += n - (this.smpAccumR >> 10), h = this.smpAccumR, e > this.maxSample && (this.maxSample = e), e < this.minSample && (this.minSample = e), this.nes.opts.onAudioSample && this.nes.opts.onAudioSample(e / 32768, h / 32768), this.smpSquare1 = 0, this.smpSquare2 = 0, this.smpTriangle = 0, this.smpDmc = 0
            },
            getLengthMax: function(t) {
                return this.lengthLookup[t >> 3]
            },
            getDmcFrequency: function(t) {
                return t >= 0 && t < 16 ? this.dmcFreqLookup[t] : 0
            },
            getNoiseWaveLength: function(t) {
                return t >= 0 && t < 16 ? this.noiseWavelengthLookup[t] : 0
            },
            setPanning: function(t) {
                for (var s = 0; s < 5; s++)
                    this.panning[s] = t[s];
                this.updateStereoPos()
            },
            setMasterVolume: function(t) {
                t < 0 && (t = 0), t > 256 && (t = 256), this.masterVolume = t, this.updateStereoPos()
            },
            updateStereoPos: function() {
                this.stereoPosLSquare1 = this.panning[0] * this.masterVolume >> 8, this.stereoPosLSquare2 = this.panning[1] * this.masterVolume >> 8, this.stereoPosLTriangle = this.panning[2] * this.masterVolume >> 8, this.stereoPosLNoise = this.panning[3] * this.masterVolume >> 8, this.stereoPosLDMC = this.panning[4] * this.masterVolume >> 8, this.stereoPosRSquare1 = this.masterVolume - this.stereoPosLSquare1, this.stereoPosRSquare2 = this.masterVolume - this.stereoPosLSquare2, this.stereoPosRTriangle = this.masterVolume - this.stereoPosLTriangle, this.stereoPosRNoise = this.masterVolume - this.stereoPosLNoise, this.stereoPosRDMC = this.masterVolume - this.stereoPosLDMC
            },
            initLengthLookup: function() {
                this.lengthLookup = [10, 254, 20, 2, 40, 4, 80, 6, 160, 8, 60, 10, 14, 12, 26, 14, 12, 16, 24, 18, 48, 20, 96, 22, 192, 24, 72, 26, 16, 28, 32, 30]
            },
            initDmcFrequencyLookup: function() {
                this.dmcFreqLookup = new Array(16), this.dmcFreqLookup[0] = 3424, this.dmcFreqLookup[1] = 3040, this.dmcFreqLookup[2] = 2720, this.dmcFreqLookup[3] = 2560, this.dmcFreqLookup[4] = 2288, this.dmcFreqLookup[5] = 2032, this.dmcFreqLookup[6] = 1808, this.dmcFreqLookup[7] = 1712, this.dmcFreqLookup[8] = 1520, this.dmcFreqLookup[9] = 1280, this.dmcFreqLookup[10] = 1136, this.dmcFreqLookup[11] = 1024, this.dmcFreqLookup[12] = 848, this.dmcFreqLookup[13] = 672, this.dmcFreqLookup[14] = 576, this.dmcFreqLookup[15] = 432
            },
            initNoiseWavelengthLookup: function() {
                this.noiseWavelengthLookup = new Array(16), this.noiseWavelengthLookup[0] = 4, this.noiseWavelengthLookup[1] = 8, this.noiseWavelengthLookup[2] = 16, this.noiseWavelengthLookup[3] = 32, this.noiseWavelengthLookup[4] = 64, this.noiseWavelengthLookup[5] = 96, this.noiseWavelengthLookup[6] = 128, this.noiseWavelengthLookup[7] = 160, this.noiseWavelengthLookup[8] = 202, this.noiseWavelengthLookup[9] = 254, this.noiseWavelengthLookup[10] = 380, this.noiseWavelengthLookup[11] = 508, this.noiseWavelengthLookup[12] = 762, this.noiseWavelengthLookup[13] = 1016, this.noiseWavelengthLookup[14] = 2034, this.noiseWavelengthLookup[15] = 4068
            },
            initDACtables: function() {
                var t,
                    s,
                    i,
                    e = 0,
                    h = 0;
                for (this.square_table = new Array(512), this.tnd_table = new Array(3264), i = 0; i < 512; i++)
                    t = 95.52 / (8128 / (i / 16) + 100), t *= .98411, t *= 5e4, s = Math.floor(t), this.square_table[i] = s, s > e && (e = s);
                for (i = 0; i < 3264; i++)
                    t = 163.67 / (24329 / (i / 16) + 100), t *= .98411, t *= 5e4, s = Math.floor(t), this.tnd_table[i] = s, s > h && (h = s);
                this.dacRange = e + h, this.dcValue = this.dacRange / 2
            }
        };
        var e = function(t) {
            this.papu = t, this.MODE_NORMAL = 0, this.MODE_LOOP = 1, this.MODE_IRQ = 2, this.isEnabled = null, this.hasSample = null, this.irqGenerated = !1, this.playMode = null, this.dmaFrequency = null, this.dmaCounter = null, this.deltaCounter = null, this.playStartAddress = null, this.playAddress = null, this.playLength = null, this.playLengthCounter = null, this.shiftCounter = null, this.reg4012 = null, this.reg4013 = null, this.sample = null, this.dacLsb = null, this.data = null, this.reset()
        };
        e.prototype = {
            clockDmc: function() {
                this.hasSample && (0 == (1 & this.data) ? this.deltaCounter > 0 && this.deltaCounter-- : this.deltaCounter < 63 && this.deltaCounter++, this.sample = this.isEnabled ? (this.deltaCounter << 1) + this.dacLsb : 0, this.data >>= 1), this.dmaCounter--, this.dmaCounter <= 0 && (this.hasSample = !1, this.endOfSample(), this.dmaCounter = 8), this.irqGenerated && this.papu.nes.cpu.requestIrq(this.papu.nes.cpu.IRQ_NORMAL)
            },
            endOfSample: function() {
                0 === this.playLengthCounter && this.playMode === this.MODE_LOOP && (this.playAddress = this.playStartAddress, this.playLengthCounter = this.playLength), this.playLengthCounter > 0 && (this.nextSample(), 0 === this.playLengthCounter && this.playMode === this.MODE_IRQ && (this.irqGenerated = !0))
            },
            nextSample: function() {
                this.data = this.papu.nes.mmap.load(this.playAddress), this.papu.nes.cpu.haltCycles(4), this.playLengthCounter--, this.playAddress++, this.playAddress > 65535 && (this.playAddress = 32768), this.hasSample = !0
            },
            writeReg: function(t, s) {
                16400 === t ? (s >> 6 == 0 ? this.playMode = this.MODE_NORMAL : 1 == (s >> 6 & 1) ? this.playMode = this.MODE_LOOP : s >> 6 == 2 && (this.playMode = this.MODE_IRQ), 0 == (128 & s) && (this.irqGenerated = !1), this.dmaFrequency = this.papu.getDmcFrequency(15 & s)) : 16401 === t ? (this.deltaCounter = s >> 1 & 63, this.dacLsb = 1 & s, this.sample = (this.deltaCounter << 1) + this.dacLsb) : 16402 === t ? (this.playStartAddress = s << 6 | 49152, this.playAddress = this.playStartAddress, this.reg4012 = s) : 16403 === t ? (this.playLength = 1 + (s << 4), this.playLengthCounter = this.playLength, this.reg4013 = s) : 16405 === t && (0 == (s >> 4 & 1) ? this.playLengthCounter = 0 : (this.playAddress = this.playStartAddress, this.playLengthCounter = this.playLength), this.irqGenerated = !1)
            },
            setEnabled: function(t) {
                !this.isEnabled && t && (this.playLengthCounter = this.playLength), this.isEnabled = t
            },
            getLengthStatus: function() {
                return 0 !== this.playLengthCounter && this.isEnabled ? 1 : 0
            },
            getIrqStatus: function() {
                return this.irqGenerated ? 1 : 0
            },
            reset: function() {
                this.isEnabled = !1, this.irqGenerated = !1, this.playMode = this.MODE_NORMAL, this.dmaFrequency = 0, this.dmaCounter = 0, this.deltaCounter = 0, this.playStartAddress = 0, this.playAddress = 0, this.playLength = 0, this.playLengthCounter = 0, this.sample = 0, this.dacLsb = 0, this.shiftCounter = 0, this.reg4012 = 0, this.reg4013 = 0, this.data = 0
            }
        };
        var h = function(t) {
            this.papu = t, this.isEnabled = null, this.envDecayDisable = null, this.envDecayLoopEnable = null, this.lengthCounterEnable = null, this.envReset = null, this.shiftNow = null, this.lengthCounter = null, this.progTimerCount = null, this.progTimerMax = null, this.envDecayRate = null, this.envDecayCounter = null, this.envVolume = null, this.masterVolume = null, this.shiftReg = 16384, this.randomBit = null, this.randomMode = null, this.sampleValue = null, this.accValue = 0, this.accCount = 1, this.tmp = null, this.reset()
        };
        h.prototype = {
            reset: function() {
                this.progTimerCount = 0, this.progTimerMax = 0, this.isEnabled = !1, this.lengthCounter = 0, this.lengthCounterEnable = !1, this.envDecayDisable = !1, this.envDecayLoopEnable = !1, this.shiftNow = !1, this.envDecayRate = 0, this.envDecayCounter = 0, this.envVolume = 0, this.masterVolume = 0, this.shiftReg = 1, this.randomBit = 0, this.randomMode = 0, this.sampleValue = 0, this.tmp = 0
            },
            clockLengthCounter: function() {
                this.lengthCounterEnable && this.lengthCounter > 0 && 0 === --this.lengthCounter && this.updateSampleValue()
            },
            clockEnvDecay: function() {
                this.envReset ? (this.envReset = !1, this.envDecayCounter = this.envDecayRate + 1, this.envVolume = 15) : --this.envDecayCounter <= 0 && (this.envDecayCounter = this.envDecayRate + 1, this.envVolume > 0 ? this.envVolume-- : this.envVolume = this.envDecayLoopEnable ? 15 : 0), this.envDecayDisable ? this.masterVolume = this.envDecayRate : this.masterVolume = this.envVolume, this.updateSampleValue()
            },
            updateSampleValue: function() {
                this.isEnabled && this.lengthCounter > 0 && (this.sampleValue = this.randomBit * this.masterVolume)
            },
            writeReg: function(t, s) {
                16396 === t ? (this.envDecayDisable = 0 != (16 & s), this.envDecayRate = 15 & s, this.envDecayLoopEnable = 0 != (32 & s), this.lengthCounterEnable = 0 == (32 & s), this.envDecayDisable ? this.masterVolume = this.envDecayRate : this.masterVolume = this.envVolume) : 16398 === t ? (this.progTimerMax = this.papu.getNoiseWaveLength(15 & s), this.randomMode = s >> 7) : 16399 === t && (this.lengthCounter = this.papu.getLengthMax(248 & s), this.envReset = !0)
            },
            setEnabled: function(t) {
                this.isEnabled = t, t || (this.lengthCounter = 0), this.updateSampleValue()
            },
            getLengthStatus: function() {
                return 0 !== this.lengthCounter && this.isEnabled ? 1 : 0
            }
        };
        var r = function(t, s) {
            this.papu = t, this.dutyLookup = [0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1], this.impLookup = [1, -1, 0, 0, 0, 0, 0, 0, 1, 0, -1, 0, 0, 0, 0, 0, 1, 0, 0, 0, -1, 0, 0, 0, -1, 0, 1, 0, 0, 0, 0, 0], this.sqr1 = s, this.isEnabled = null, this.lengthCounterEnable = null, this.sweepActive = null, this.envDecayDisable = null, this.envDecayLoopEnable = null, this.envReset = null, this.sweepCarry = null, this.updateSweepPeriod = null, this.progTimerCount = null, this.progTimerMax = null, this.lengthCounter = null, this.squareCounter = null, this.sweepCounter = null, this.sweepCounterMax = null, this.sweepMode = null, this.sweepShiftAmount = null, this.envDecayRate = null, this.envDecayCounter = null, this.envVolume = null, this.masterVolume = null, this.dutyMode = null, this.sweepResult = null, this.sampleValue = null, this.vol = null, this.reset()
        };
        r.prototype = {
            reset: function() {
                this.progTimerCount = 0, this.progTimerMax = 0, this.lengthCounter = 0, this.squareCounter = 0, this.sweepCounter = 0, this.sweepCounterMax = 0, this.sweepMode = 0, this.sweepShiftAmount = 0, this.envDecayRate = 0, this.envDecayCounter = 0, this.envVolume = 0, this.masterVolume = 0, this.dutyMode = 0, this.vol = 0, this.isEnabled = !1, this.lengthCounterEnable = !1, this.sweepActive = !1, this.sweepCarry = !1, this.envDecayDisable = !1, this.envDecayLoopEnable = !1
            },
            clockLengthCounter: function() {
                this.lengthCounterEnable && this.lengthCounter > 0 && 0 === --this.lengthCounter && this.updateSampleValue()
            },
            clockEnvDecay: function() {
                this.envReset ? (this.envReset = !1, this.envDecayCounter = this.envDecayRate + 1, this.envVolume = 15) : --this.envDecayCounter <= 0 && (this.envDecayCounter = this.envDecayRate + 1, this.envVolume > 0 ? this.envVolume-- : this.envVolume = this.envDecayLoopEnable ? 15 : 0), this.envDecayDisable ? this.masterVolume = this.envDecayRate : this.masterVolume = this.envVolume, this.updateSampleValue()
            },
            clockSweep: function() {
                --this.sweepCounter <= 0 && (this.sweepCounter = this.sweepCounterMax + 1, this.sweepActive && this.sweepShiftAmount > 0 && this.progTimerMax > 7 && (this.sweepCarry = !1, 0 === this.sweepMode ? (this.progTimerMax += this.progTimerMax >> this.sweepShiftAmount, this.progTimerMax > 4095 && (this.progTimerMax = 4095, this.sweepCarry = !0)) : this.progTimerMax = this.progTimerMax - ((this.progTimerMax >> this.sweepShiftAmount) - (this.sqr1 ? 1 : 0)))), this.updateSweepPeriod && (this.updateSweepPeriod = !1, this.sweepCounter = this.sweepCounterMax + 1)
            },
            updateSampleValue: function() {
                this.isEnabled && this.lengthCounter > 0 && this.progTimerMax > 7 ? 0 === this.sweepMode && this.progTimerMax + (this.progTimerMax >> this.sweepShiftAmount) > 4095 ? this.sampleValue = 0 : this.sampleValue = this.masterVolume * this.dutyLookup[(this.dutyMode << 3) + this.squareCounter] : this.sampleValue = 0
            },
            writeReg: function(t, s) {
                var i = this.sqr1 ? 0 : 4;
                t === 16384 + i ? (this.envDecayDisable = 0 != (16 & s), this.envDecayRate = 15 & s, this.envDecayLoopEnable = 0 != (32 & s), this.dutyMode = s >> 6 & 3, this.lengthCounterEnable = 0 == (32 & s), this.envDecayDisable ? this.masterVolume = this.envDecayRate : this.masterVolume = this.envVolume, this.updateSampleValue()) : t === 16385 + i ? (this.sweepActive = 0 != (128 & s), this.sweepCounterMax = s >> 4 & 7, this.sweepMode = s >> 3 & 1, this.sweepShiftAmount = 7 & s, this.updateSweepPeriod = !0) : t === 16386 + i ? (this.progTimerMax &= 1792, this.progTimerMax |= s) : t === 16387 + i && (this.progTimerMax &= 255, this.progTimerMax |= (7 & s) << 8, this.isEnabled && (this.lengthCounter = this.papu.getLengthMax(248 & s)), this.envReset = !0)
            },
            setEnabled: function(t) {
                this.isEnabled = t, t || (this.lengthCounter = 0), this.updateSampleValue()
            },
            getLengthStatus: function() {
                return 0 !== this.lengthCounter && this.isEnabled ? 1 : 0
            }
        };
        var n = function(t) {
            this.papu = t, this.isEnabled = null, this.sampleCondition = null, this.lengthCounterEnable = null, this.lcHalt = null, this.lcControl = null, this.progTimerCount = null, this.progTimerMax = null, this.triangleCounter = null, this.lengthCounter = null, this.linearCounter = null, this.lcLoadValue = null, this.sampleValue = null, this.tmp = null, this.reset()
        };
        n.prototype = {
            reset: function() {
                this.progTimerCount = 0, this.progTimerMax = 0, this.triangleCounter = 0, this.isEnabled = !1, this.sampleCondition = !1, this.lengthCounter = 0, this.lengthCounterEnable = !1, this.linearCounter = 0, this.lcLoadValue = 0, this.lcHalt = !0, this.lcControl = !1, this.tmp = 0, this.sampleValue = 15
            },
            clockLengthCounter: function() {
                this.lengthCounterEnable && this.lengthCounter > 0 && 0 === --this.lengthCounter && this.updateSampleCondition()
            },
            clockLinearCounter: function() {
                this.lcHalt ? (this.linearCounter = this.lcLoadValue, this.updateSampleCondition()) : this.linearCounter > 0 && (this.linearCounter--, this.updateSampleCondition()), this.lcControl || (this.lcHalt = !1)
            },
            getLengthStatus: function() {
                return 0 !== this.lengthCounter && this.isEnabled ? 1 : 0
            },
            readReg: function(t) {
                return 0
            },
            writeReg: function(t, s) {
                16392 === t ? (this.lcControl = 0 != (128 & s), this.lcLoadValue = 127 & s, this.lengthCounterEnable = !this.lcControl) : 16394 === t ? (this.progTimerMax &= 1792, this.progTimerMax |= s) : 16395 === t && (this.progTimerMax &= 255, this.progTimerMax |= (7 & s) << 8, this.lengthCounter = this.papu.getLengthMax(248 & s), this.lcHalt = !0), this.updateSampleCondition()
            },
            clockProgrammableTimer: function(t) {
                if (this.progTimerMax > 0)
                    for (this.progTimerCount += t; this.progTimerMax > 0 && this.progTimerCount >= this.progTimerMax;)
                        this.progTimerCount -= this.progTimerMax, this.isEnabled && this.lengthCounter > 0 && this.linearCounter > 0 && this.clockTriangleGenerator()
            },
            clockTriangleGenerator: function() {
                this.triangleCounter++, this.triangleCounter &= 31
            },
            setEnabled: function(t) {
                this.isEnabled = t, t || (this.lengthCounter = 0), this.updateSampleCondition()
            },
            updateSampleCondition: function() {
                this.sampleCondition = this.isEnabled && this.progTimerMax > 7 && this.linearCounter > 0 && this.lengthCounter > 0
            }
        }, t.exports = i
    }, function(t, s, i) {
        var e = i(9),
            h = i(2),
            r = function(t) {
                this.nes = t, this.mapperName = new Array(92);
                for (var s = 0; s < 92; s++)
                    this.mapperName[s] = "Unknown Mapper";
                this.mapperName[0] = "Direct Access", this.mapperName[1] = "Nintendo MMC1", this.mapperName[2] = "UNROM", this.mapperName[3] = "CNROM", this.mapperName[4] = "Nintendo MMC3", this.mapperName[5] = "Nintendo MMC5", this.mapperName[6] = "FFE F4xxx", this.mapperName[7] = "AOROM", this.mapperName[8] = "FFE F3xxx", this.mapperName[9] = "Nintendo MMC2", this.mapperName[10] = "Nintendo MMC4", this.mapperName[11] = "Color Dreams Chip", this.mapperName[12] = "FFE F6xxx", this.mapperName[15] = "100-in-1 switch", this.mapperName[16] = "Bandai chip", this.mapperName[17] = "FFE F8xxx", this.mapperName[18] = "Jaleco SS8806 chip", this.mapperName[19] = "Namcot 106 chip", this.mapperName[20] = "Famicom Disk System", this.mapperName[21] = "Konami VRC4a", this.mapperName[22] = "Konami VRC2a", this.mapperName[23] = "Konami VRC2a", this.mapperName[24] = "Konami VRC6", this.mapperName[25] = "Konami VRC4b", this.mapperName[32] = "Irem G-101 chip", this.mapperName[33] = "Taito TC0190/TC0350", this.mapperName[34] = "32kB ROM switch", this.mapperName[64] = "Tengen RAMBO-1 chip", this.mapperName[65] = "Irem H-3001 chip", this.mapperName[66] = "GNROM switch", this.mapperName[67] = "SunSoft3 chip", this.mapperName[68] = "SunSoft4 chip", this.mapperName[69] = "SunSoft5 FME-7 chip", this.mapperName[71] = "Camerica chip", this.mapperName[78] = "Irem 74HC161/32-based", this.mapperName[91] = "Pirate HK-SF3 chip"
            };
        r.prototype = {
            VERTICAL_MIRRORING: 0,
            HORIZONTAL_MIRRORING: 1,
            FOURSCREEN_MIRRORING: 2,
            SINGLESCREEN_MIRRORING: 3,
            SINGLESCREEN_MIRRORING2: 4,
            SINGLESCREEN_MIRRORING3: 5,
            SINGLESCREEN_MIRRORING4: 6,
            CHRROM_MIRRORING: 7,
            header: null,
            rom: null,
            vrom: null,
            vromTile: null,
            romCount: null,
            vromCount: null,
            mirroring: null,
            batteryRam: null,
            trainer: null,
            fourScreen: null,
            mapperType: null,
            valid: !1,
            load: function(t) {
                var s,
                    i,
                    e;
                if (-1 === t.indexOf("NES"))
                    throw new Error("Not a valid NES ROM.");
                for (this.header = new Array(16), s = 0; s < 16; s++)
                    this.header[s] = 255 & t.charCodeAt(s);
                this.romCount = this.header[4], this.vromCount = 2 * this.header[5], this.mirroring = 0 != (1 & this.header[6]) ? 1 : 0, this.batteryRam = 0 != (2 & this.header[6]), this.trainer = 0 != (4 & this.header[6]), this.fourScreen = 0 != (8 & this.header[6]), this.mapperType = this.header[6] >> 4 | 240 & this.header[7];
                var r = !1;
                for (s = 8; s < 16; s++)
                    if (0 !== this.header[s]) {
                        r = !0;
                        break
                    }
                r && (this.mapperType &= 15), this.rom = new Array(this.romCount);
                var n = 16;
                for (s = 0; s < this.romCount; s++) {
                    for (this.rom[s] = new Array(16384), i = 0; i < 16384 && !(n + i >= t.length); i++)
                        this.rom[s][i] = 255 & t.charCodeAt(n + i);
                    n += 16384
                }
                for (this.vrom = new Array(this.vromCount), s = 0; s < this.vromCount; s++) {
                    for (this.vrom[s] = new Array(4096), i = 0; i < 4096 && !(n + i >= t.length); i++)
                        this.vrom[s][i] = 255 & t.charCodeAt(n + i);
                    n += 4096
                }
                for (this.vromTile = new Array(this.vromCount), s = 0; s < this.vromCount; s++)
                    for (this.vromTile[s] = new Array(256), i = 0; i < 256; i++)
                        this.vromTile[s][i] = new h;
                var a,
                    o;
                for (e = 0; e < this.vromCount; e++)
                    for (s = 0; s < 4096; s++)
                        a = s >> 4, o = s % 16, o < 8 ? this.vromTile[e][a].setScanline(o, this.vrom[e][s], this.vrom[e][s + 8]) : this.vromTile[e][a].setScanline(o - 8, this.vrom[e][s - 8], this.vrom[e][s]);
                this.valid = !0
            },
            getMirroringType: function() {
                return this.fourScreen ? this.FOURSCREEN_MIRRORING : 0 === this.mirroring ? this.HORIZONTAL_MIRRORING : this.VERTICAL_MIRRORING
            },
            getMapperName: function() {
                return this.mapperType >= 0 && this.mapperType < this.mapperName.length ? this.mapperName[this.mapperType] : "Unknown Mapper, " + this.mapperType
            },
            mapperSupported: function() {
                return void 0 !== e[this.mapperType]
            },
            createMapper: function() {
                if (this.mapperSupported())
                    return new e[this.mapperType](this.nes);
                throw new Error("This ROM uses a mapper not supported by JSNES: " + this.getMapperName() + "(" + this.mapperType + ")")
            }
        }, t.exports = r
    }, function(t, s, i) {
        var e = i(0),
            h = {};
        h[0] = function(t) {
            this.nes = t
        }, h[0].prototype = {
            reset: function() {
                this.joy1StrobeState = 0, this.joy2StrobeState = 0, this.joypadLastWrite = 0, this.zapperFired = !1, this.zapperX = null, this.zapperY = null
            },
            write: function(t, s) {
                t < 8192 ? this.nes.cpu.mem[2047 & t] = s : t > 16407 ? (this.nes.cpu.mem[t] = s, t >= 24576 && t < 32768 && this.nes.opts.onBatteryRamWrite(t, s)) : t > 8199 && t < 16384 ? this.regWrite(8192 + (7 & t), s) : this.regWrite(t, s)
            },
            writelow: function(t, s) {
                t < 8192 ? this.nes.cpu.mem[2047 & t] = s : t > 16407 ? this.nes.cpu.mem[t] = s : t > 8199 && t < 16384 ? this.regWrite(8192 + (7 & t), s) : this.regWrite(t, s)
            },
            load: function(t) {
                return t &= 65535, t > 16407 ? this.nes.cpu.mem[t] : t >= 8192 ? this.regLoad(t) : this.nes.cpu.mem[2047 & t]
            },
            regLoad: function(t) {
                switch (t >> 12) {
                case 0:
                case 1:
                    break;
                case 2:
                case 3:
                    switch (7 & t) {
                    case 0:
                        return this.nes.cpu.mem[8192];
                    case 1:
                        return this.nes.cpu.mem[8193];
                    case 2:
                        return this.nes.ppu.readStatusRegister();
                    case 3:
                        return 0;
                    case 4:
                        return this.nes.ppu.sramLoad();
                    case 5:
                    case 6:
                        return 0;
                    case 7:
                        return this.nes.ppu.vramLoad()
                    }
                    break;
                case 4:
                    switch (t - 16405) {
                    case 0:
                        return this.nes.papu.readReg(t);
                    case 1:
                        return this.joy1Read();
                    case 2:
                        var s;
                        return s = null !== this.zapperX && null !== this.zapperY && this.nes.ppu.isPixelWhite(this.zapperX, this.zapperY) ? 0 : 8, this.zapperFired && (s |= 16), 65535 & (this.joy2Read() | s)
                    }
                }
                return 0
            },
            regWrite: function(t, s) {
                switch (t) {
                case 8192:
                    this.nes.cpu.mem[t] = s, this.nes.ppu.updateControlReg1(s);
                    break;
                case 8193:
                    this.nes.cpu.mem[t] = s, this.nes.ppu.updateControlReg2(s);
                    break;
                case 8195:
                    this.nes.ppu.writeSRAMAddress(s);
                    break;
                case 8196:
                    this.nes.ppu.sramWrite(s);
                    break;
                case 8197:
                    this.nes.ppu.scrollWrite(s);
                    break;
                case 8198:
                    this.nes.ppu.writeVRAMAddress(s);
                    break;
                case 8199:
                    this.nes.ppu.vramWrite(s);
                    break;
                case 16404:
                    this.nes.ppu.sramDMA(s);
                    break;
                case 16405:
                    this.nes.papu.writeReg(t, s);
                    break;
                case 16406:
                    0 == (1 & s) && 1 == (1 & this.joypadLastWrite) && (this.joy1StrobeState = 0, this.joy2StrobeState = 0), this.joypadLastWrite = s;
                    break;
                case 16407:
                    this.nes.papu.writeReg(t, s);
                    break;
                default:
                    t >= 16384 && t <= 16407 && this.nes.papu.writeReg(t, s)
                }
            },
            joy1Read: function() {
                var t;
                switch (this.joy1StrobeState) {
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                    t = this.nes.controllers[1].state[this.joy1StrobeState];
                    break;
                case 8:
                case 9:
                case 10:
                case 11:
                case 12:
                case 13:
                case 14:
                case 15:
                case 16:
                case 17:
                case 18:
                    t = 0;
                    break;
                case 19:
                    t = 1;
                    break;
                default:
                    t = 0
                }
                return this.joy1StrobeState++, 24 === this.joy1StrobeState && (this.joy1StrobeState = 0), t
            },
            joy2Read: function() {
                var t;
                switch (this.joy2StrobeState) {
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                    t = this.nes.controllers[2].state[this.joy2StrobeState];
                    break;
                case 8:
                case 9:
                case 10:
                case 11:
                case 12:
                case 13:
                case 14:
                case 15:
                case 16:
                case 17:
                case 18:
                    t = 0;
                    break;
                case 19:
                    t = 1;
                    break;
                default:
                    t = 0
                }
                return this.joy2StrobeState++, 24 === this.joy2StrobeState && (this.joy2StrobeState = 0), t
            },
            loadROM: function() {
                if (!this.nes.rom.valid || this.nes.rom.romCount < 1)
                    throw new Error("NoMapper: Invalid ROM! Unable to load.");
                this.loadPRGROM(), this.loadCHRROM(), this.loadBatteryRam(), this.nes.cpu.requestIrq(this.nes.cpu.IRQ_RESET)
            },
            loadPRGROM: function() {
                this.nes.rom.romCount > 1 ? (this.loadRomBank(0, 32768), this.loadRomBank(1, 49152)) : (this.loadRomBank(0, 32768), this.loadRomBank(0, 49152))
            },
            loadCHRROM: function() {
                this.nes.rom.vromCount > 0 && (1 === this.nes.rom.vromCount ? (this.loadVromBank(0, 0), this.loadVromBank(0, 4096)) : (this.loadVromBank(0, 0), this.loadVromBank(1, 4096)))
            },
            loadBatteryRam: function() {
                if (this.nes.rom.batteryRam) {
                    var t = this.nes.rom.batteryRam;
                    null !== t && 8192 === t.length && e.copyArrayElements(t, 0, this.nes.cpu.mem, 24576, 8192)
                }
            },
            loadRomBank: function(t, s) {
                t %= this.nes.rom.romCount, e.copyArrayElements(this.nes.rom.rom[t], 0, this.nes.cpu.mem, s, 16384)
            },
            loadVromBank: function(t, s) {
                if (0 !== this.nes.rom.vromCount) {
                    this.nes.ppu.triggerRendering(), e.copyArrayElements(this.nes.rom.vrom[t % this.nes.rom.vromCount], 0, this.nes.ppu.vramMem, s, 4096);
                    var i = this.nes.rom.vromTile[t % this.nes.rom.vromCount];
                    e.copyArrayElements(i, 0, this.nes.ppu.ptTile, s >> 4, 256)
                }
            },
            load32kRomBank: function(t, s) {
                this.loadRomBank(2 * t % this.nes.rom.romCount, s), this.loadRomBank((2 * t + 1) % this.nes.rom.romCount, s + 16384)
            },
            load8kVromBank: function(t, s) {
                0 !== this.nes.rom.vromCount && (this.nes.ppu.triggerRendering(), this.loadVromBank(t % this.nes.rom.vromCount, s), this.loadVromBank((t + 1) % this.nes.rom.vromCount, s + 4096))
            },
            load1kVromBank: function(t, s) {
                if (0 !== this.nes.rom.vromCount) {
                    this.nes.ppu.triggerRendering();
                    var i = Math.floor(t / 4) % this.nes.rom.vromCount,
                        h = t % 4 * 1024;
                    e.copyArrayElements(this.nes.rom.vrom[i], 0, this.nes.ppu.vramMem, h, 1024);
                    for (var r = this.nes.rom.vromTile[i], n = s >> 4, a = 0; a < 64; a++)
                        this.nes.ppu.ptTile[n + a] = r[(t % 4 << 6) + a]
                }
            },
            load2kVromBank: function(t, s) {
                if (0 !== this.nes.rom.vromCount) {
                    this.nes.ppu.triggerRendering();
                    var i = Math.floor(t / 2) % this.nes.rom.vromCount,
                        h = t % 2 * 2048;
                    e.copyArrayElements(this.nes.rom.vrom[i], h, this.nes.ppu.vramMem, s, 2048);
                    for (var r = this.nes.rom.vromTile[i], n = s >> 4, a = 0; a < 128; a++)
                        this.nes.ppu.ptTile[n + a] = r[(t % 2 << 7) + a]
                }
            },
            load8kRomBank: function(t, s) {
                var i = Math.floor(t / 2) % this.nes.rom.romCount,
                    h = t % 2 * 8192;
                e.copyArrayElements(this.nes.rom.rom[i], h, this.nes.cpu.mem, s, 8192)
            },
            clockIrqCounter: function() {},
            latchAccess: function(t) {},
            toJSON: function() {
                return {
                    joy1StrobeState: this.joy1StrobeState,
                    joy2StrobeState: this.joy2StrobeState,
                    joypadLastWrite: this.joypadLastWrite
                }
            },
            fromJSON: function(t) {
                this.joy1StrobeState = t.joy1StrobeState, this.joy2StrobeState = t.joy2StrobeState, this.joypadLastWrite = t.joypadLastWrite
            }
        }, h[1] = function(t) {
            this.nes = t
        }, h[1].prototype = new h[0], h[1].prototype.reset = function() {
            h[0].prototype.reset.apply(this), this.regBuffer = 0, this.regBufferCounter = 0, this.mirroring = 0, this.oneScreenMirroring = 0, this.prgSwitchingArea = 1, this.prgSwitchingSize = 1, this.vromSwitchingSize = 0, this.romSelectionReg0 = 0, this.romSelectionReg1 = 0, this.romBankSelect = 0
        }, h[1].prototype.write = function(t, s) {
            if (t < 32768)
                return void h[0].prototype.write.apply(this, arguments);
            0 != (128 & s) ? (this.regBufferCounter = 0, this.regBuffer = 0, 0 === this.getRegNumber(t) && (this.prgSwitchingArea = 1, this.prgSwitchingSize = 1)) : (this.regBuffer = this.regBuffer & 255 - (1 << this.regBufferCounter) | (1 & s) << this.regBufferCounter, 5 === ++this.regBufferCounter && (this.setReg(this.getRegNumber(t), this.regBuffer), this.regBuffer = 0, this.regBufferCounter = 0))
        }, h[1].prototype.setReg = function(t, s) {
            var i;
            switch (t) {
            case 0:
                i = 3 & s, i !== this.mirroring && (this.mirroring = i, 0 == (2 & this.mirroring) ? this.nes.ppu.setMirroring(this.nes.rom.SINGLESCREEN_MIRRORING) : 0 != (1 & this.mirroring) ? this.nes.ppu.setMirroring(this.nes.rom.HORIZONTAL_MIRRORING) : this.nes.ppu.setMirroring(this.nes.rom.VERTICAL_MIRRORING)), this.prgSwitchingArea = s >> 2 & 1, this.prgSwitchingSize = s >> 3 & 1, this.vromSwitchingSize = s >> 4 & 1;
                break;
            case 1:
                this.romSelectionReg0 = s >> 4 & 1, this.nes.rom.vromCount > 0 && (0 === this.vromSwitchingSize ? 0 === this.romSelectionReg0 ? this.load8kVromBank(15 & s, 0) : this.load8kVromBank(Math.floor(this.nes.rom.vromCount / 2) + (15 & s), 0) : 0 === this.romSelectionReg0 ? this.loadVromBank(15 & s, 0) : this.loadVromBank(Math.floor(this.nes.rom.vromCount / 2) + (15 & s), 0));
                break;
            case 2:
                this.romSelectionReg1 = s >> 4 & 1, this.nes.rom.vromCount > 0 && 1 === this.vromSwitchingSize && (0 === this.romSelectionReg1 ? this.loadVromBank(15 & s, 4096) : this.loadVromBank(Math.floor(this.nes.rom.vromCount / 2) + (15 & s), 4096));
                break;
            default:
                i = 15 & s;
                var e,
                    h = 0;
                this.nes.rom.romCount >= 32 ? 0 === this.vromSwitchingSize ? 1 === this.romSelectionReg0 && (h = 16) : h = (this.romSelectionReg0 | this.romSelectionReg1 << 1) << 3 : this.nes.rom.romCount >= 16 && 1 === this.romSelectionReg0 && (h = 8), 0 === this.prgSwitchingSize ? (e = h + (15 & s), this.load32kRomBank(e, 32768)) : (e = 2 * h + (15 & s), 0 === this.prgSwitchingArea ? this.loadRomBank(e, 49152) : this.loadRomBank(e, 32768))
            }
        }, h[1].prototype.getRegNumber = function(t) {
            return t >= 32768 && t <= 40959 ? 0 : t >= 40960 && t <= 49151 ? 1 : t >= 49152 && t <= 57343 ? 2 : 3
        }, h[1].prototype.loadROM = function() {
            if (!this.nes.rom.valid)
                throw new Error("MMC1: Invalid ROM! Unable to load.");
            this.loadRomBank(0, 32768), this.loadRomBank(this.nes.rom.romCount - 1, 49152), this.loadCHRROM(), this.loadBatteryRam(), this.nes.cpu.requestIrq(this.nes.cpu.IRQ_RESET)
        }, h[1].prototype.switchLowHighPrgRom = function(t) {}, h[1].prototype.switch16to32 = function() {}, h[1].prototype.switch32to16 = function() {}, h[1].prototype.toJSON = function() {
            var t = h[0].prototype.toJSON.apply(this);
            return t.mirroring = this.mirroring, t.oneScreenMirroring = this.oneScreenMirroring, t.prgSwitchingArea = this.prgSwitchingArea, t.prgSwitchingSize = this.prgSwitchingSize, t.vromSwitchingSize = this.vromSwitchingSize, t.romSelectionReg0 = this.romSelectionReg0, t.romSelectionReg1 = this.romSelectionReg1, t.romBankSelect = this.romBankSelect, t.regBuffer = this.regBuffer, t.regBufferCounter = this.regBufferCounter, t
        }, h[1].prototype.fromJSON = function(t) {
            h[0].prototype.fromJSON.apply(this, arguments), this.mirroring = t.mirroring, this.oneScreenMirroring = t.oneScreenMirroring, this.prgSwitchingArea = t.prgSwitchingArea, this.prgSwitchingSize = t.prgSwitchingSize, this.vromSwitchingSize = t.vromSwitchingSize, this.romSelectionReg0 = t.romSelectionReg0, this.romSelectionReg1 = t.romSelectionReg1, this.romBankSelect = t.romBankSelect, this.regBuffer = t.regBuffer, this.regBufferCounter = t.regBufferCounter
        }, h[2] = function(t) {
            this.nes = t
        }, h[2].prototype = new h[0], h[2].prototype.write = function(t, s) {
            if (t < 32768)
                return void h[0].prototype.write.apply(this, arguments);
            this.loadRomBank(s, 32768)
        }, h[2].prototype.loadROM = function() {
            if (!this.nes.rom.valid)
                throw new Error("UNROM: Invalid ROM! Unable to load.");
            this.loadRomBank(0, 32768), this.loadRomBank(this.nes.rom.romCount - 1, 49152), this.loadCHRROM(), this.nes.cpu.requestIrq(this.nes.cpu.IRQ_RESET)
        }, h[3] = function(t) {
            this.nes = t
        }, h[3].prototype = new h[0], h[3].prototype.write = function(t, s) {
            if (t < 32768)
                return void h[0].prototype.write.apply(this, arguments);
            var i = s % (this.nes.rom.vromCount / 2) * 2;
            this.loadVromBank(i, 0), this.loadVromBank(i + 1, 4096), this.load8kVromBank(2 * s, 0)
        }, h[4] = function(t) {
            this.nes = t, this.CMD_SEL_2_1K_VROM_0000 = 0, this.CMD_SEL_2_1K_VROM_0800 = 1, this.CMD_SEL_1K_VROM_1000 = 2, this.CMD_SEL_1K_VROM_1400 = 3, this.CMD_SEL_1K_VROM_1800 = 4, this.CMD_SEL_1K_VROM_1C00 = 5, this.CMD_SEL_ROM_PAGE1 = 6, this.CMD_SEL_ROM_PAGE2 = 7, this.command = null, this.prgAddressSelect = null, this.chrAddressSelect = null, this.pageNumber = null, this.irqCounter = null, this.irqLatchValue = null, this.irqEnable = null, this.prgAddressChanged = !1
        }, h[4].prototype = new h[0], h[4].prototype.write = function(t, s) {
            if (t < 32768)
                return void h[0].prototype.write.apply(this, arguments);
            switch (t) {
            case 32768:
                this.command = 7 & s;
                var i = s >> 6 & 1;
                i !== this.prgAddressSelect && (this.prgAddressChanged = !0), this.prgAddressSelect = i, this.chrAddressSelect = s >> 7 & 1;
                break;
            case 32769:
                this.executeCommand(this.command, s);
                break;
            case 40960:
                0 != (1 & s) ? this.nes.ppu.setMirroring(this.nes.rom.HORIZONTAL_MIRRORING) : this.nes.ppu.setMirroring(this.nes.rom.VERTICAL_MIRRORING);
                break;
            case 40961:
                break;
            case 49152:
                this.irqCounter = s;
                break;
            case 49153:
                this.irqLatchValue = s;
                break;
            case 57344:
                this.irqEnable = 0;
                break;
            case 57345:
                this.irqEnable = 1
            }
        }, h[4].prototype.executeCommand = function(t, s) {
            switch (t) {
            case this.CMD_SEL_2_1K_VROM_0000:
                0 === this.chrAddressSelect ? (this.load1kVromBank(s, 0), this.load1kVromBank(s + 1, 1024)) : (this.load1kVromBank(s, 4096), this.load1kVromBank(s + 1, 5120));
                break;
            case this.CMD_SEL_2_1K_VROM_0800:
                0 === this.chrAddressSelect ? (this.load1kVromBank(s, 2048), this.load1kVromBank(s + 1, 3072)) : (this.load1kVromBank(s, 6144), this.load1kVromBank(s + 1, 7168));
                break;
            case this.CMD_SEL_1K_VROM_1000:
                0 === this.chrAddressSelect ? this.load1kVromBank(s, 4096) : this.load1kVromBank(s, 0);
                break;
            case this.CMD_SEL_1K_VROM_1400:
                0 === this.chrAddressSelect ? this.load1kVromBank(s, 5120) : this.load1kVromBank(s, 1024);
                break;
            case this.CMD_SEL_1K_VROM_1800:
                0 === this.chrAddressSelect ? this.load1kVromBank(s, 6144) : this.load1kVromBank(s, 2048);
                break;
            case this.CMD_SEL_1K_VROM_1C00:
                0 === this.chrAddressSelect ? this.load1kVromBank(s, 7168) : this.load1kVromBank(s, 3072);
                break;
            case this.CMD_SEL_ROM_PAGE1:
                this.prgAddressChanged && (0 === this.prgAddressSelect ? this.load8kRomBank(2 * (this.nes.rom.romCount - 1), 49152) : this.load8kRomBank(2 * (this.nes.rom.romCount - 1), 32768), this.prgAddressChanged = !1), 0 === this.prgAddressSelect ? this.load8kRomBank(s, 32768) : this.load8kRomBank(s, 49152);
                break;
            case this.CMD_SEL_ROM_PAGE2:
                this.load8kRomBank(s, 40960), this.prgAddressChanged && (0 === this.prgAddressSelect ? this.load8kRomBank(2 * (this.nes.rom.romCount - 1), 49152) : this.load8kRomBank(2 * (this.nes.rom.romCount - 1), 32768), this.prgAddressChanged = !1)
            }
        }, h[4].prototype.loadROM = function() {
            if (!this.nes.rom.valid)
                throw new Error("MMC3: Invalid ROM! Unable to load.");
            this.load8kRomBank(2 * (this.nes.rom.romCount - 1), 49152), this.load8kRomBank(2 * (this.nes.rom.romCount - 1) + 1, 57344), this.load8kRomBank(0, 32768), this.load8kRomBank(1, 40960), this.loadCHRROM(), this.loadBatteryRam(), this.nes.cpu.requestIrq(this.nes.cpu.IRQ_RESET)
        }, h[4].prototype.clockIrqCounter = function() {
            1 === this.irqEnable && --this.irqCounter < 0 && (this.nes.cpu.requestIrq(this.nes.cpu.IRQ_NORMAL), this.irqCounter = this.irqLatchValue)
        }, h[4].prototype.toJSON = function() {
            var t = h[0].prototype.toJSON.apply(this);
            return t.command = this.command, t.prgAddressSelect = this.prgAddressSelect, t.chrAddressSelect = this.chrAddressSelect, t.pageNumber = this.pageNumber, t.irqCounter = this.irqCounter, t.irqLatchValue = this.irqLatchValue, t.irqEnable = this.irqEnable, t.prgAddressChanged = this.prgAddressChanged, t
        }, h[4].prototype.fromJSON = function(t) {
            h[0].prototype.fromJSON.apply(this, arguments), this.command = t.command, this.prgAddressSelect = t.prgAddressSelect, this.chrAddressSelect = t.chrAddressSelect, this.pageNumber = t.pageNumber, this.irqCounter = t.irqCounter, this.irqLatchValue = t.irqLatchValue, this.irqEnable = t.irqEnable, this.prgAddressChanged = t.prgAddressChanged
        }, h[5] = function(t) {
            this.nes = t
        }, h[5].prototype = new h[0], h[5].prototype.write = function(t, s) {
            t < 32768 ? h[0].prototype.write.apply(this, arguments) : this.load8kVromBank(s, 0)
        }, h[5].prototype.write = function(t, s) {
            if (t < 20480)
                return void h[0].prototype.write.apply(this, arguments);
            switch (t) {
            case 20736:
                this.prg_size = 3 & s;
                break;
            case 20737:
                this.chr_size = 3 & s;
                break;
            case 20738:
                this.sram_we_a = 3 & s;
                break;
            case 20739:
                this.sram_we_b = 3 & s;
                break;
            case 20740:
                this.graphic_mode = 3 & s;
                break;
            case 20741:
                this.nametable_mode = s, this.nametable_type[0] = 3 & s, this.load1kVromBank(3 & s, 8192), s >>= 2, this.nametable_type[1] = 3 & s, this.load1kVromBank(3 & s, 9216), s >>= 2, this.nametable_type[2] = 3 & s, this.load1kVromBank(3 & s, 10240), s >>= 2, this.nametable_type[3] = 3 & s, this.load1kVromBank(3 & s, 11264);
                break;
            case 20742:
                this.fill_chr = s;
                break;
            case 20743:
                this.fill_pal = 3 & s;
                break;
            case 20755:
                this.SetBank_SRAM(3, 3 & s);
                break;
            case 20756:
            case 20757:
            case 20758:
            case 20759:
                this.SetBank_CPU(t, s);
                break;
            case 20768:
            case 20769:
            case 20770:
            case 20771:
            case 20772:
            case 20773:
            case 20774:
            case 20775:
                this.chr_mode = 0, this.chr_page[0][7 & t] = s, this.SetBank_PPU();
                break;
            case 20776:
            case 20777:
            case 20778:
            case 20779:
                this.chr_mode = 1, this.chr_page[1][0 + (3 & t)] = s, this.chr_page[1][4 + (3 & t)] = s, this.SetBank_PPU();
                break;
            case 20992:
                this.split_control = s;
                break;
            case 20993:
                this.split_scroll = s;
                break;
            case 20994:
                this.split_page = 63 & s;
                break;
            case 20995:
                this.irq_line = s, this.nes.cpu.ClearIRQ();
                break;
            case 20996:
                this.irq_enable = s, this.nes.cpu.ClearIRQ();
                break;
            case 20997:
                this.mult_a = s;
                break;
            case 20998:
                this.mult_b = s;
                break;
            default:
                t >= 20480 && t <= 20501 ? this.nes.papu.exWrite(t, s) : t >= 23552 && t <= 24575 ? 2 === this.graphic_mode || 3 !== this.graphic_mode && this.irq_status : t >= 24576 && t <= 32767 && 2 === this.sram_we_a && this.sram_we_b
            }
        }, h[5].prototype.loadROM = function() {
            if (!this.nes.rom.valid)
                throw new Error("UNROM: Invalid ROM! Unable to load.");
            this.load8kRomBank(2 * this.nes.rom.romCount - 1, 32768), this.load8kRomBank(2 * this.nes.rom.romCount - 1, 40960), this.load8kRomBank(2 * this.nes.rom.romCount - 1, 49152), this.load8kRomBank(2 * this.nes.rom.romCount - 1, 57344), this.loadCHRROM(), this.nes.cpu.requestIrq(this.nes.cpu.IRQ_RESET)
        }, h[7] = function(t) {
            this.nes = t
        }, h[7].prototype = new h[0], h[7].prototype.write = function(t, s) {
            t < 32768 ? h[0].prototype.write.apply(this, arguments) : (this.load32kRomBank(7 & s, 32768), 16 & s ? this.nes.ppu.setMirroring(this.nes.rom.SINGLESCREEN_MIRRORING2) : this.nes.ppu.setMirroring(this.nes.rom.SINGLESCREEN_MIRRORING))
        }, h[7].prototype.loadROM = function() {
            if (!this.nes.rom.valid)
                throw new Error("AOROM: Invalid ROM! Unable to load.");
            this.loadPRGROM(), this.loadCHRROM(), this.nes.cpu.requestIrq(this.nes.cpu.IRQ_RESET)
        }, h[11] = function(t) {
            this.nes = t
        }, h[11].prototype = new h[0], h[11].prototype.write = function(t, s) {
            if (t < 32768)
                return void h[0].prototype.write.apply(this, arguments);
            var i = 2 * (15 & s) % this.nes.rom.romCount,
                e = (2 * (15 & s) + 1) % this.nes.rom.romCount;
            if (this.loadRomBank(i, 32768), this.loadRomBank(e, 49152), this.nes.rom.vromCount > 0) {
                var r = 2 * (s >> 4) % this.nes.rom.vromCount;
                this.loadVromBank(r, 0), this.loadVromBank(r + 1, 4096)
            }
        }, h[34] = function(t) {
            this.nes = t
        }, h[34].prototype = new h[0], h[34].prototype.write = function(t, s) {
            if (t < 32768)
                return void h[0].prototype.write.apply(this, arguments);
            this.load32kRomBank(s, 32768)
        }, h[66] = function(t) {
            this.nes = t, console.log("Mapper 66")
        }, h[66].prototype = new h[0], h[66].prototype.write = function(t, s) {
            if (t < 32768)
                return void h[0].prototype.write.apply(this, arguments);
            this.load32kRomBank(s >> 4 & 3, 32768), this.load8kVromBank(2 * (3 & s), 0)
        }, t.exports = h
    }])
});
//# sourceMappingURL=jsnes.min.js.map
