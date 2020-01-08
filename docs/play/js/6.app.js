(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{182:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return d}));var l=a(0),r=a.n(l),n=a(1);function i(e){return(i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function s(e,t){for(var a=0;a<t.length;a++){var l=t[a];l.enumerable=l.enumerable||!1,l.configurable=!0,"value"in l&&(l.writable=!0),Object.defineProperty(e,l.key,l)}}function o(e,t){return!t||"object"!==i(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function m(e){return(m=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function c(e,t){return(c=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var d=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),o(this,m(t).apply(this,arguments))}var a,l,i;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&c(e,t)}(t,e),a=t,(l=[{key:"render",value:function(){return r.a.createElement(n.s,null,r.a.createElement(n.r,{title:"Settings",large:!this.$theme.md,largeTransparent:!this.$theme.md,backLink:"Back"}),r.a.createElement(n.d,null,"About"),r.a.createElement(n.j,{inset:!0},r.a.createElement(n.m,{title:"Version",after:this.$f7.version},r.a.createElement("div",{slot:"media",className:"sidebar-media sb-system-bg"},r.a.createElement(n.h,{ios:"f7:info",md:"material:add",aurora:"f7:info"}))),r.a.createElement(n.m,{link:"/settings/versions/",title:"Version History"},r.a.createElement("div",{slot:"media",className:"sidebar-media sb-system-bg"},r.a.createElement(n.h,{ios:"f7:clock",md:"material:add",aurora:"f7:clock"}))),r.a.createElement(n.m,{link:"/settings/help/",title:"Help"},r.a.createElement("div",{slot:"media",className:"sidebar-media sb-system-bg"},r.a.createElement(n.h,{ios:"f7:question",md:"material:help",aurora:"f7:question"}))),r.a.createElement(n.m,{link:"/settings/credits/",title:"Credits & Support"},r.a.createElement("div",{slot:"media",className:"sidebar-media sb-system-bg"},r.a.createElement(n.h,{ios:"f7:person_2",md:"material:add",aurora:"f7:person_2"}))),r.a.createElement(n.m,{link:"/settings/credits/",title:"Issue Tracker"},r.a.createElement("div",{slot:"media",className:"sidebar-media sb-system-bg"},r.a.createElement(n.h,{ios:"f7:logo_github",md:"material:add",aurora:"f7:logo_github"})))),r.a.createElement(n.d,null,"Library"),r.a.createElement(n.j,{inset:!0,color:"green"},r.a.createElement(n.m,{title:"List View"},r.a.createElement("div",{slot:"media",className:"sidebar-media sb-system-bg"},r.a.createElement(n.h,{ios:"f7:list_bullet",md:"material:add",aurora:"f7:list_bullet"})),r.a.createElement(n.A,{slot:"after",defaultChecked:!1})),r.a.createElement(n.m,{title:"Sort Library",smartSelect:!0,smartSelectParams:{openIn:"popover"}},r.a.createElement("div",{slot:"media",className:"sidebar-media sb-system-bg"},r.a.createElement(n.h,{ios:"f7:sort_down",md:"material:add",aurora:"f7:sort_down"})),r.a.createElement("select",{name:"sortlibraryby",defaultValue:"name"},r.a.createElement("option",{value:"name"},"Name"),r.a.createElement("option",{value:"system"},"System"),r.a.createElement("option",{value:"recentlyAdded"},"Recently Added"),r.a.createElement("option",{value:"recentlyPlayed"},"Recently Played")))),r.a.createElement(n.d,null,"Emulation"),r.a.createElement(n.j,{inset:!0,color:"green"},r.a.createElement(n.m,{title:"Auto-save Rate",smartSelect:!0,smartSelectParams:{openIn:"sheet"}},r.a.createElement("div",{slot:"media",className:"sidebar-media sb-system-bg"},r.a.createElement(n.h,{ios:"f7:floppy_disk",md:"material:save",aurora:"f7:floppy_disk"})),r.a.createElement("select",{name:"autosaverate",defaultValue:"60000"},r.a.createElement("option",{value:"never"},"Never"),r.a.createElement("option",{value:"1000"},"1s"),r.a.createElement("option",{value:"5000"},"5s"),r.a.createElement("option",{value:"10000"},"10s"),r.a.createElement("option",{value:"15000"},"15s"),r.a.createElement("option",{value:"30000"},"30s"),r.a.createElement("option",{value:"45000"},"45s"),r.a.createElement("option",{value:"60000"},"1m"),r.a.createElement("option",{value:"300000"},"5m"),r.a.createElement("option",{value:"600000"},"10m"),r.a.createElement("option",{value:"900000"},"15m"),r.a.createElement("option",{value:"1800000"},"30m"),r.a.createElement("option",{value:"2700000"},"45m"),r.a.createElement("option",{value:"3600000"},"1h"))),r.a.createElement(n.m,{title:"Audio"},r.a.createElement("div",{slot:"media",className:"sidebar-media sb-system-bg"},r.a.createElement(n.h,{ios:"f7:speaker_2",md:"material:add",aurora:"f7:speaker_2"})),r.a.createElement(n.A,{slot:"after",defaultChecked:!0})),r.a.createElement(n.m,{title:"Aspect Ratio"},r.a.createElement("div",{slot:"media",className:"sidebar-media sb-system-bg"},r.a.createElement(n.h,{ios:"f7:tv",md:"material:add",aurora:"f7:tv"})),r.a.createElement(n.A,{slot:"after",defaultChecked:!0})),r.a.createElement(n.m,{title:"Hide Controls"},r.a.createElement("div",{slot:"media",className:"sidebar-media sb-system-bg"},r.a.createElement(n.h,{ios:"f7:eye_slash",md:"material:add",aurora:"f7:eye_slash"})),r.a.createElement(n.A,{slot:"after",defaultChecked:!1})),r.a.createElement(n.l,{label:"Controller Opacity",input:!1},r.a.createElement("div",{slot:"media",className:"sidebar-media sb-system-bg"},r.a.createElement(n.h,{ios:"f7:eyeglasses",md:"material:add",aurora:"f7:eyeglasses"})),r.a.createElement(n.w,{color:"blue",slot:"input",label:!0,value:60,min:0,max:100,step:1}))),r.a.createElement(n.d,null,"Cloud"),r.a.createElement(n.j,{inset:!0},r.a.createElement(n.m,{link:"#",title:"Google Drive",footer:"Importing games from Google Drive"},r.a.createElement("div",{slot:"media",className:"sidebar-media sb-system-bg"},r.a.createElement(n.h,{f7:"logo_google"}))),r.a.createElement(n.m,{link:"/cloud/dropbox/",title:"Dropbox",footer:"Sync saves, games, and other settings."},r.a.createElement("div",{slot:"media",className:"sidebar-media sb-system-bg"},r.a.createElement(n.h,{f7:"cube_fill"})))),r.a.createElement(n.d,null,"Social"),r.a.createElement(n.j,{inset:!0},r.a.createElement(n.m,{link:"#",external:!0,title:"Discord",footer:"Official Zenith Devs Discord"},r.a.createElement("img",{slot:"media",className:"social-icons",src:"static/img/discord.png"})),r.a.createElement(n.m,{link:"https://reddit.com/r/eclipseemu",external:!0,title:"Reddit",footer:"Offical Subreddit"},r.a.createElement("img",{slot:"media",className:"social-icons",src:"static/img/reddit.png"})),r.a.createElement(n.m,{link:"https://twitter.com/tryeclipse",external:!0,title:"Twitter",footer:"Offical Twitter"},r.a.createElement("img",{slot:"media",className:"social-icons",src:"static/img/twitter.png"}))),r.a.createElement(n.d,null,"Backups"),r.a.createElement(n.j,{inset:!0},r.a.createElement(n.k,{color:"blue",title:"Import Backup"}),r.a.createElement(n.k,{color:"blue",title:"Export Backup"})),r.a.createElement(n.d,null,"Reset"),r.a.createElement(n.j,{inset:!0},r.a.createElement(n.k,{title:"Reset Games"}),r.a.createElement(n.k,{title:"Reset Sources"}),r.a.createElement(n.k,{title:"Reset Skins"}),r.a.createElement(n.k,{title:"Reset All Content & Settings"})))}}])&&s(a.prototype,l),i&&s(a,i),t}(r.a.Component)}}]);