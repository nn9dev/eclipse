(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{183:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return m}));var o=n(0),r=n.n(o),a=n(1);function c(e){return(c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function l(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function u(e,t){return!t||"object"!==c(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function i(e){return(i=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function s(e,t){return(s=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var m=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),u(this,i(t).apply(this,arguments))}var n,o,c;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&s(e,t)}(t,e),n=t,(o=[{key:"render",value:function(){return r.a.createElement(a.v,{className:"emulation-popup",tabletFullscreen:!0},r.a.createElement(a.s,{pageContent:!1},r.a.createElement("div",{className:"screen"},r.a.createElement("canvas",{id:"screen"})),this.$theme.aurora?r.a.createElement("div",{className:"emulation-menu-bar"},r.a.createElement("div",{className:"emu-menu"},r.a.createElement(a.e,{onClick:this.closeHandler.bind(this)},"Quit"))):r.a.createElement("div",{className:"controls"},r.a.createElement("p",{className:"system"},"GBA"),r.a.createElement("div",{className:"top-controls"},r.a.createElement(a.e,{className:"control shoulder left-shoulder"},"L"),r.a.createElement(a.e,{className:"control shoulder right-shoulder"},"R")),r.a.createElement("div",{className:"dpad"},r.a.createElement("div",{className:"direction up-direction"}),r.a.createElement("div",{className:"direction left-direction"}),r.a.createElement("div",{className:"direction center-direction"}),r.a.createElement("div",{className:"direction right-direction"}),r.a.createElement("div",{className:"direction down-direction"})),r.a.createElement("div",{className:"bottom-controls"},r.a.createElement(a.e,{className:"control menu-button",onClick:this.emulationMenu.bind(this),round:!0},"MENU"),r.a.createElement("div",{className:"start-select"},r.a.createElement(a.e,{className:"control",round:!0},"START"),r.a.createElement(a.e,{className:"control",round:!0},"SELECT"))))))}},{key:"componentDidMount",value:function(){window.addEventListener("beforeunload",this.unloadHandler),document.querySelector("canvas#screen").addEventListener("mousemove",this.handleMouseMove),document.querySelector("canvas#screen").style.cursor="default"}},{key:"componentWillUnmount",value:function(){window.removeEventListener("beforeunload",this.unloadHandler),document.querySelector("canvas#screen").removeEventListener("mousemove",this.handleMouseMove)}},{key:"emulationMenu",value:function(){var e=this;this.$f7.actions.create({buttons:[[{text:"Game",label:!0},{text:"Enable Audio",color:"blue",onClick:function(){}},{text:"Fast Forward",color:"blue",onClick:function(){}},{text:"Enable Cheats",color:"blue",onClick:function(){}},{text:"Quit",color:"red",onClick:function(){return e.closeHandler()}}].filter((function(e){return!!e})),[{text:"Cancel",color:"red"}]]}).open()}},{key:"closeHandler",value:function(){var e=this;this.$f7.dialog.confirm("Are you sure you want to quit? Any unsaved data will be lost.",(function(){e.$f7.popup.close()}))}},{key:"handleMouseMove",value:function(){var e,t=!1;!t&&e?(clearTimeout(e),e=0,document.querySelector("canvas#screen").style.cursor="",document.querySelector("div.emu-menu").style.opacity="",document.querySelector("div.emu-menu").style.pointerEvents="",document.querySelector("div.emulation-menu-bar").style.pointerEvents=""):(document.querySelector("canvas#screen").style.cursor="default",document.querySelector("div.emu-menu").style.opacity="1",document.querySelector("div.emu-menu").style.pointerEvents="initial",document.querySelector("div.emulation-menu-bar").style.pointerEvents="initial",t=!1),e=setTimeout((function(){document.querySelector("canvas#screen").style.cursor="none",document.querySelector("div.emu-menu").style.opacity="0",document.querySelector("div.emu-menu").style.pointerEvents="none",document.querySelector("div.emulation-menu-bar").style.pointerEvents="none",t=!0}),5e3)}},{key:"unloadHandler",value:function(e){}}])&&l(n.prototype,o),c&&l(n,c),t}(o.Component)}}]);